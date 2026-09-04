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

    const validated = submitPaymentSchema.parse(req.body);
    const userId = req.user.id;

    // 1. Generate deterministic SHA-256 fingerprint for anti-duplication shield
    const signatureString = `${userId}:${validated.transactionRedId.toLowerCase()}:${validated.amount}`;
    const sha256Hash = crypto
      .createHash("sha256")
      .update(signatureString)
      .digest("hex");

    // 2. Check if transaction reference or hash already exists
    const existingProof = await db.paymentProof.findFirst({
      where: {
        OR: [
          { transactionRedId: validated.transactionRedId },
          { sha256Hash: sha256Hash },
        ],
      },
    });

    if (existingProof) {
      throw new ConflictError(
        "A payment proof with this transaction reference or fingerprint already exists."
      );
    }

    // 3. Create the pending payment proof
   // 3. Create the pending payment proof
    // 3. Create the pending payment proof
    const paymentProof = await db.paymentProof.create({
      data: {
        userId,
        transactionRedId: validated.transactionRedId,
        sha256Hash,
        amount: toDecimal(validated.amount),
        bankName: validated.bankName, // <--- ADD THIS LINE HERE!
        senderName: validated.senderName,
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
        transactionRedId: paymentProof.transactionRedId,
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