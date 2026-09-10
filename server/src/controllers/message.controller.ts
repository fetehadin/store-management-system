import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { UnauthorizedError } from "../utils/errors.js";
import { Role, ProofStatus } from "../generated/client/index.js";

// GET /api/v1/messages
export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");

    const userId = req.user.id;
    const userRole = req.user.role;

    let dynamicMessages = [];

    if (userRole === Role.ADMIN) {
      // 1. Fetch Admin Alerts: Pending Payment Proofs waiting for review
      const pendingProofs = await db.paymentProof.findMany({
        where: { status: ProofStatus.PENDING },
        include: { user: { select: { fullName: true } } },
        orderBy: { createdAt: 'desc' }
      });

      dynamicMessages = pendingProofs.map(p => ({
        id: `proof_admin_${p.id}`,
        title: 'New Payment Proof',
        body: `${p.user?.fullName || 'A sales rep'} uploaded a deposit receipt of ETB ${Number(p.amount).toLocaleString()} via ${p.bankName}.`,
        type: 'WARNING',
        date: p.createdAt,
        isRead: false
      }));
    } else {
      // 2. Fetch Sales Rep Alerts: Processed Payments (Approved or Rejected)
      const processedProofs = await db.paymentProof.findMany({
        where: {
          userId,
          status: { in: [ProofStatus.APPROVED, ProofStatus.REJECTED] }
        },
        orderBy: { updatedAt: 'desc' }
      });

      dynamicMessages = processedProofs.map(p => {
        const isApproved = p.status === ProofStatus.APPROVED;
        return {
          id: `proof_rep_${p.id}`,
          title: isApproved ? 'Payment Approved' : 'Payment Rejected',
          body: isApproved
            ? `Your deposit of ETB ${Number(p.amount).toLocaleString()} via ${p.bankName} has been approved and deducted from your debt.`
            : `Your deposit of ETB ${Number(p.amount).toLocaleString()} via ${p.bankName} was rejected. Reason: "${p.adminRemark || 'No specific reason provided.'}"`,
          type: isApproved ? 'SUCCESS' : 'ERROR',
          date: p.updatedAt,
          // We can track dismissed status using local state or a lightweight flag if needed
          isRead: false 
        };
      });
    }

    // 3. Fetch any raw persistent messages from the Message table as well
    const rawMessages = await db.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const formattedRaw = rawMessages.map(m => ({
      id: m.id,
      title: m.title,
      body: m.body,
      type: m.type,
      date: m.createdAt,
      isRead: m.isRead
    }));

    // Merge both streams
    const combined = [...dynamicMessages, ...formattedRaw].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    res.status(200).json({ status: 'success', data: combined });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/v1/messages/:id/dismiss
export const dismissMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");
    const id = req.params.id as string;

    // If it's a virtual payment proof message, we handle dismissal gracefully or save to a read list
    if (id.startsWith('proof_')) {
      res.status(200).json({ status: 'success', message: 'Alert dismissed.' });
      return;
    }

    await db.message.updateMany({
      where: { id, userId: req.user.id },
      data: { isRead: true }
    });

    res.status(200).json({ status: 'success', message: 'Message dismissed.' });
  } catch (err) {
    next(err);
  }
};