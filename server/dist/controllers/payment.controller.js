"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectPayment = exports.approvePayment = exports.submitPayment = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_js_1 = require("../config/db.js");
const payment_validation_js_1 = require("../validations/payment.validation.js");
const errors_js_1 = require("../utils/errors.js");
const decimal_js_1 = require("../utils/decimal.js");
const index_js_1 = require("../generated/client/index.js");
/**
 * @route   POST /api/v1/payments
 * @desc    Submit a bank payment proof for debt repayment (Sales Rep)
 * @access  Protected (Authenticated Users)
 */
const submitPayment = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_js_1.UnauthorizedError("User authentication required");
        }
        const validated = payment_validation_js_1.submitPaymentSchema.parse(req.body);
        const userId = req.user.id;
        // 1. Generate deterministic SHA-256 fingerprint for anti-duplication shield
        const signatureString = `${userId}:${validated.transactionRedId.toLowerCase()}:${validated.amount}`;
        const sha256Hash = crypto_1.default
            .createHash("sha256")
            .update(signatureString)
            .digest("hex");
        // 2. Check if transaction reference or hash already exists
        const existingProof = await db_js_1.db.paymentProof.findFirst({
            where: {
                OR: [
                    { transactionRedId: validated.transactionRedId },
                    { sha256Hash: sha256Hash },
                ],
            },
        });
        if (existingProof) {
            throw new errors_js_1.ConflictError("A payment proof with this transaction reference or fingerprint already exists.");
        }
        // 3. Create the pending payment proof
        const paymentProof = await db_js_1.db.paymentProof.create({
            data: {
                userId,
                transactionRedId: validated.transactionRedId,
                sha256Hash,
                amount: (0, decimal_js_1.toDecimal)(validated.amount),
                senderName: validated.senderName,
                reasonRemark: validated.reasonRemark,
                receipeImageUrl: validated.receipeImageUrl,
                status: index_js_1.ProofStatus.PENDING,
            },
        });
        res.status(201).json({
            status: "success",
            message: "Payment proof submitted successfully and is PENDING review",
            data: {
                id: paymentProof.id,
                transactionRedId: paymentProof.transactionRedId,
                amount: (0, decimal_js_1.formatETB)(paymentProof.amount),
                status: paymentProof.status,
                createdAt: paymentProof.createdAt,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.submitPayment = submitPayment;
/**
 * @route   PATCH /api/v1/payments/:id/approve
 * @desc    Approve a pending payment proof & deduct from creditBalance (Admin only)
 * @access  Protected (ADMIN)
 */
const approvePayment = async (req, res, next) => {
    try {
        const id = String(req.params.id);
        const validated = payment_validation_js_1.reviewPaymentSchema.parse(req.body);
        const proof = await db_js_1.db.paymentProof.findUnique({
            where: { id },
        });
        if (!proof) {
            throw new errors_js_1.NotFoundError("Payment proof not found");
        }
        if (proof.status !== index_js_1.ProofStatus.PENDING) {
            throw new errors_js_1.BadRequestError(`Payment proof has already been processed with status: ${proof.status}`);
        }
        // Explicitly fetch the associated Sales Rep
        const salesRep = await db_js_1.db.user.findUnique({
            where: { id: proof.userId },
        });
        if (!salesRep) {
            throw new errors_js_1.NotFoundError("Associated Sales Rep account not found");
        }
        // ACID Transaction: 1. Approve status -> 2. Subtract ETB -> 3. Write Ledger Entry
        const result = await db_js_1.db.$transaction(async (tx) => {
            const updatedProof = await tx.paymentProof.update({
                where: { id: proof.id },
                data: {
                    status: index_js_1.ProofStatus.APPROVED,
                    adminRemark: validated.adminRemark,
                },
            });
            const newBalance = (0, decimal_js_1.toDecimal)(salesRep.creditBalance).sub((0, decimal_js_1.toDecimal)(proof.amount));
            const updatedUser = await tx.user.update({
                where: { id: proof.userId },
                data: {
                    creditBalance: newBalance,
                },
            });
            // AUTOMATED LEDGER WIRE: record credit payment entry
            const ledgerEntry = await tx.ledgerEntry.create({
                data: {
                    fromEntity: index_js_1.AuditEntity.SALES_REP,
                    fromEntityId: salesRep.id,
                    toEntity: index_js_1.AuditEntity.ADMIN_STORE, // <-- MATCHED TO YOUR EXACT SCHEMA ENUM!
                    amount: proof.amount,
                    transferMethod: "BANK_PAYMENT_PROOF",
                    receiptUrl: proof.receipeImageUrl,
                    auditRemark: `Auto-ledger: Approved bank receipt (Ref: ${proof.transactionRedId})`,
                    transactionRefId: `PAY-${proof.id}`,
                },
            });
            return { updatedProof, updatedUser, ledgerEntry };
        });
        res.status(200).json({
            status: "success",
            message: "Payment approved, credit balance reduced, and ledger entry recorded successfully",
            data: {
                paymentProof: {
                    id: result.updatedProof.id,
                    transactionRedId: result.updatedProof.transactionRedId,
                    amount: (0, decimal_js_1.formatETB)(result.updatedProof.amount),
                    status: result.updatedProof.status,
                    adminRemark: result.updatedProof.adminRemark,
                },
                salesRep: {
                    id: result.updatedUser.id,
                    fullName: result.updatedUser.fullName,
                    newCreditBalance: (0, decimal_js_1.formatETB)(result.updatedUser.creditBalance),
                    creditLimit: (0, decimal_js_1.formatETB)(result.updatedUser.creditLimit),
                },
                auditLedgerEntryId: result.ledgerEntry.id,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.approvePayment = approvePayment;
/**
 * @route   PATCH /api/v1/payments/:id/reject
 * @desc    Reject a pending payment proof (Admin only)
 * @access  Protected (ADMIN)
 */
const rejectPayment = async (req, res, next) => {
    try {
        const id = String(req.params.id);
        const validated = payment_validation_js_1.reviewPaymentSchema.parse(req.body);
        const proof = await db_js_1.db.paymentProof.findUnique({
            where: { id },
        });
        if (!proof) {
            throw new errors_js_1.NotFoundError("Payment proof not found");
        }
        if (proof.status !== index_js_1.ProofStatus.PENDING) {
            throw new errors_js_1.BadRequestError(`Payment proof has already been processed with status: ${proof.status}`);
        }
        const updatedProof = await db_js_1.db.paymentProof.update({
            where: { id: proof.id },
            data: {
                status: index_js_1.ProofStatus.REJECTED,
                adminRemark: validated.adminRemark,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Payment proof rejected",
            data: {
                id: updatedProof.id,
                transactionRedId: updatedProof.transactionRedId,
                amount: (0, decimal_js_1.formatETB)(updatedProof.amount),
                status: updatedProof.status,
                adminRemark: updatedProof.adminRemark,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.rejectPayment = rejectPayment;
