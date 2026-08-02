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
import { ProofStatus } from "../generated/client/index.js";

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
    const paymentProof = await db.paymentProof.create({
      data: {
        userId,
        transactionRedId: validated.transactionRedId,
        sha256Hash,
        amount: toDecimal(validated.amount),
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
 * @route   PATCH /api/v1/payments/:id/approve
 * @desc    Approve a pending payment proof & deduct from creditBalance (Admin only)
 * @access  Protected (ADMIN)
 */
export const approvePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id  = String(req.params.id);
    const validated = reviewPaymentSchema.parse(req.body);

    const proof = await db.paymentProof.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!proof) {
      throw new NotFoundError("Payment proof not found");
    }

    if (proof.status !== ProofStatus.PENDING) {
      throw new BadRequestError(
        `Payment proof has already been processed with status: ${proof.status}`
      );
    }

    // ACID Transaction: 1. Approve status -> 2. Subtract ETB from user's creditBalance
    const result = await db.$transaction(async (tx) => {
      const updatedProof = await tx.paymentProof.update({
        where: { id: proof.id },
        data: {
          status: ProofStatus.APPROVED,
          adminRemark: validated.adminRemark,
        },
      });

      const newBalance = toDecimal(proof.user.creditBalance).sub(
        toDecimal(proof.amount)
      );

      const updatedUser = await tx.user.update({
        where: { id: proof.userId },
        data: {
          creditBalance: newBalance,
        },
      });

      return { updatedProof, updatedUser };
    });

    res.status(200).json({
      status: "success",
      message: "Payment approved and credit balance reduced successfully",
      data: {
        paymentProof: {
          id: result.updatedProof.id,
          transactionRedId: result.updatedProof.transactionRedId,
          amount: formatETB(result.updatedProof.amount),
          status: result.updatedProof.status,
          adminRemark: result.updatedProof.adminRemark,
        },
        salesRep: {
          id: result.updatedUser.id,
          fullName: result.updatedUser.fullName,
          newCreditBalance: formatETB(result.updatedUser.creditBalance),
          creditLimit: formatETB(result.updatedUser.creditLimit),
        },
      },
    });
  } catch (err) {
    next(err);
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
    const id  = String(req.params.id);
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