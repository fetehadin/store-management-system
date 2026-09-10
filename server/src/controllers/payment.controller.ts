import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { db } from "../config/db.js";
import {
  submitPaymentSchema,
  reviewPaymentSchema,
} from "../validations/payment.validation.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors.js";
import { toDecimal, formatETB } from "../utils/decimal.js";
import { ProofStatus, AuditEntity } from "../generated/client/index.js";

/**
 * @route   POST /api/v1/payments
 * @desc    Submit a bank payment proof for debt repayment (Sales Rep)
 * @access  Protected (Authenticated Users)
 */
export const submitPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("User authentication required");
    }

    // 1. Validate incoming payload
    const validated = submitPaymentSchema.parse(req.body);
    const userId = req.user.id;

    // 2. Fetch the user's actual name securely from the database
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { fullName: true }
    });

    if (!user) {
      throw new UnauthorizedError("Authenticated user not found in database");
    }

    // 3. Create the pending payment proof
    const paymentProof = await db.paymentProof.create({
      data: {
        userId,
        amount: toDecimal(validated.amount),
        bankName: validated.bankName, 
        senderName: user.fullName, // <--- TAKEN SECURELY FROM THE SYSTEM
        reasonRemark: validated.reasonRemark,
        receipeImageUrl: validated.receipeImageUrl,
        status: ProofStatus.PENDING,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Payment proof submitted successfully and is PENDING review",
      data: {
        id: paymentProof.id,
        amount: formatETB(paymentProof.amount),
        status: paymentProof.status,
        createdAt: paymentProof.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/payments/pending
 * @desc    Get all pending payment proofs (Admin only)
 * @access  Protected (ADMIN)
 */
export const getPendingPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pendingProofs = await db.paymentProof.findMany({
      where: { status: ProofStatus.PENDING },
      include: {
        user: { select: { fullName: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      data: pendingProofs,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   PATCH /api/v1/payments/:id/approve
 * @desc    Approve a pending payment proof & deduct from creditBalance (Admin only)
 * @access  Protected (ADMIN)
 */
export const approvePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const adminId = req.user?.id;
    
    const payment = await db.paymentProof.findUnique({ where: { id } });
    if (!payment || payment.status !== 'PENDING') {
      res.status(400).json({ message: "Payment not found or already processed." });
      return;
    }

    // Atomic Mathematical Transaction
    await db.$transaction([
      db.paymentProof.update({
        where: { id },
        data: { status: 'APPROVED', adminRemark: req.body.adminRemark || 'Approved' }
      }),
      db.user.update({
        where: { id: payment.userId },
        data: { creditBalance: { decrement: payment.amount } }
      }),
      db.user.update({
        where: { id: adminId }, // Assuming the admin's account holds company funds
        data: { creditBalance: { increment: payment.amount } }
      }),
      db.ledgerEntry.create({
        data: {
          fromEntity: 'SALES_REP',
          fromEntityId: payment.userId,
          toEntity: 'ADMIN_STORE',
          toEntityId: adminId, 
          amount: payment.amount,
          transferMethod: payment.bankName,
          transactionRefId: payment.transactionRedId,
          auditRemark: "Admin approved payment",
        }
      })
    ]);

    res.status(200).json({ message: "Payment approved. Balances updated." });
  } catch (error) {
    console.error("Ledger Transaction Error:", error);
    res.status(500).json({ message: "Critical math error during approval." });
  }
};

/**
 * @route   PATCH /api/v1/payments/:id/reject
 * @desc    Reject a pending payment proof (Admin only)
 * @access  Protected (ADMIN)
 */
export const rejectPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const validated = reviewPaymentSchema.parse(req.body);

    const proof = await db.paymentProof.findUnique({
      where: { id },
    });

    if (!proof) {
      throw new NotFoundError("Payment proof not found");
    }

    if (proof.status !== ProofStatus.PENDING) {
      throw new BadRequestError(
        `Payment proof has already been processed with status: ${proof.status}`
      );
    }

    const updatedProof = await db.paymentProof.update({
      where: { id: proof.id },
      data: {
        status: ProofStatus.REJECTED,
        adminRemark: validated.adminRemark,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Payment proof rejected",
      data: {
        id: updatedProof.id,
        transactionRedId: updatedProof.transactionRedId,
        amount: formatETB(updatedProof.amount),
        status: updatedProof.status,
        adminRemark: updatedProof.adminRemark,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    let messages = [];

    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      // ADMIN: Generate alerts for Pending Receipts
      const pending = await db.paymentProof.findMany({ 
        where: { status: 'PENDING' }, 
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      
      messages = pending.map(p => ({
        id: `msg_admin_${p.id}`,
        title: 'New Receipt Uploaded',
        body: `${p.user?.fullName || 'A rep'} uploaded a receipt for ETB ${Number(p.amount).toLocaleString()}. Please verify in Approvals.`,
        date: p.createdAt,
        type: 'WARNING'
      }));
    } else {
      // REP: Generate alerts for Approved/Rejected Receipts
      const processed = await db.paymentProof.findMany({
        where: { userId: user.id, status: { in: ['REJECTED', 'APPROVED'] } },
        orderBy: { updatedAt: 'desc' }
      });
      
      messages = processed.map(p => ({
        id: `msg_rep_${p.id}`,
        title: p.status === 'APPROVED' ? 'Receipt Approved' : 'Receipt Rejected',
        body: p.status === 'APPROVED' 
          ? `Your receipt for ETB ${Number(p.amount).toLocaleString()} has been verified and your debt is cleared.` 
          : `Your receipt for ETB ${Number(p.amount).toLocaleString()} was rejected. Reason: "${p.adminRemark || 'No reason provided.'}"`,
        date: p.updatedAt,
        type: p.status === 'REJECTED' ? 'ERROR' : 'SUCCESS'
      }));
    }

    res.status(200).json({ status: 'success', data: messages });
  } catch (err) {
    next(err);
  }
};