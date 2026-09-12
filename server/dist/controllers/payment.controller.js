"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.getMyPayments = exports.rejectPayment = exports.approvePayment = exports.getPendingPayments = exports.submitPayment = void 0;
const db_js_1 = require("../config/db.js");
const payment_validation_js_1 = require("../validations/payment.validation.js");
const errors_js_1 = require("../utils/errors.js");
const decimal_js_1 = require("../utils/decimal.js");
const index_js_1 = require("../generated/client/index.js");
/**
 * @route   POST /api/v1/payments
 * @desc    Submit a bank payment proof for debt repayment (Sales Rep)
 */
const submitPayment = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User authentication required");
        const validated = payment_validation_js_1.submitPaymentSchema.parse(req.body);
        const userId = req.user.id;
        const user = await db_js_1.db.user.findUnique({
            where: { id: userId },
            select: { fullName: true }
        });
        if (!user)
            throw new errors_js_1.UnauthorizedError("Authenticated user not found in database");
        const paymentProof = await db_js_1.db.paymentProof.create({
            data: {
                userId,
                amount: (0, decimal_js_1.toDecimal)(validated.amount),
                bankName: validated.bankName,
                senderName: user.fullName,
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
 * @route   GET /api/v1/payments/pending
 * @desc    Get all pending payment proofs (Admin only)
 */
const getPendingPayments = async (_req, res, next) => {
    try {
        const pendingProofs = await db_js_1.db.paymentProof.findMany({
            where: { status: index_js_1.ProofStatus.PENDING },
            include: { user: { select: { fullName: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ status: "success", data: pendingProofs });
    }
    catch (err) {
        next(err);
    }
};
exports.getPendingPayments = getPendingPayments;
/**
 * @route   PATCH /api/v1/payments/:id/approve
 * @desc    Approve a pending payment proof & deduct from creditBalance (Admin only)
 */
const approvePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const adminId = req.user?.id;
        // Safety check: Prevent Prisma crash if admin ID is missing
        if (!adminId)
            throw new errors_js_1.UnauthorizedError("Admin authorization required");
        const payment = await db_js_1.db.paymentProof.findUnique({ where: { id } });
        if (!payment || payment.status !== index_js_1.ProofStatus.PENDING) {
            res.status(400).json({ message: "Payment not found or already processed." });
            return;
        }
        await db_js_1.db.$transaction([
            db_js_1.db.paymentProof.update({
                where: { id },
                data: { status: index_js_1.ProofStatus.APPROVED, adminRemark: req.body.adminRemark || 'Approved' }
            }),
            db_js_1.db.user.update({
                where: { id: payment.userId },
                data: { creditBalance: { decrement: payment.amount } }
            }),
            db_js_1.db.user.update({
                where: { id: adminId },
                data: { creditBalance: { increment: payment.amount } }
            }),
            db_js_1.db.ledgerEntry.create({
                data: {
                    fromEntity: index_js_1.AuditEntity.SALES_REP,
                    fromEntityId: payment.userId,
                    toEntity: index_js_1.AuditEntity.ADMIN_STORE,
                    toEntityId: adminId,
                    amount: payment.amount,
                    transferMethod: payment.bankName,
                    transactionRefId: payment.id,
                    auditRemark: "Admin approved payment",
                }
            })
        ]);
        res.status(200).json({ message: "Payment approved. Balances updated." });
    }
    catch (error) {
        console.error("Ledger Transaction Error:", error);
        next(error);
    }
};
exports.approvePayment = approvePayment;
/**
 * @route   PATCH /api/v1/payments/:id/reject
 * @desc    Reject a pending payment proof (Admin only)
 */
const rejectPayment = async (req, res, next) => {
    try {
        const id = String(req.params.id);
        const validated = payment_validation_js_1.reviewPaymentSchema.parse(req.body);
        const proof = await db_js_1.db.paymentProof.findUnique({ where: { id } });
        if (!proof)
            throw new errors_js_1.NotFoundError("Payment proof not found");
        if (proof.status !== index_js_1.ProofStatus.PENDING)
            throw new errors_js_1.BadRequestError(`Payment proof has already been processed.`);
        const updatedProof = await db_js_1.db.paymentProof.update({
            where: { id: proof.id },
            data: { status: index_js_1.ProofStatus.REJECTED, adminRemark: validated.adminRemark },
        });
        res.status(200).json({ status: "success", data: updatedProof });
    }
    catch (err) {
        next(err);
    }
};
exports.rejectPayment = rejectPayment;
/**
 * @route   GET /api/v1/payments/my-history
 * @desc    Get the authenticated user's payment history (Approved & Pending only)
 * @access  Protected (Sales Rep)
 */
const getMyPayments = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User authentication required");
        const history = await db_js_1.db.paymentProof.findMany({
            where: {
                userId: req.user.id,
                status: { in: [index_js_1.ProofStatus.PENDING, index_js_1.ProofStatus.APPROVED] }
            },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ status: "success", data: history });
    }
    catch (err) {
        next(err);
    }
};
exports.getMyPayments = getMyPayments;
/**
 * @route   GET /api/v1/payments/messages
 * @desc    Get notification messages for the authenticated user
 * @access  Protected
 */
const getMessages = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            throw new errors_js_1.UnauthorizedError("Unauthorized");
        let messages = [];
        if (user.role === index_js_1.Role.ADMIN) {
            // ADMIN: Generate alerts for Pending Receipts
            const pending = await db_js_1.db.paymentProof.findMany({
                where: { status: index_js_1.ProofStatus.PENDING },
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
        }
        else {
            // REP: Generate alerts for Approved/Rejected Receipts
            const processed = await db_js_1.db.paymentProof.findMany({
                where: { userId: user.id, status: { in: [index_js_1.ProofStatus.REJECTED, index_js_1.ProofStatus.APPROVED] } },
                orderBy: { updatedAt: 'desc' }
            });
            messages = processed.map(p => ({
                id: `msg_rep_${p.id}`,
                title: p.status === index_js_1.ProofStatus.APPROVED ? 'Receipt Approved' : 'Receipt Rejected',
                body: p.status === index_js_1.ProofStatus.APPROVED
                    ? `Your receipt for ETB ${Number(p.amount).toLocaleString()} has been verified and your debt is cleared.`
                    : `Your receipt for ETB ${Number(p.amount).toLocaleString()} was rejected. Reason: "${p.adminRemark || 'No reason provided.'}"`,
                date: p.updatedAt,
                type: p.status === index_js_1.ProofStatus.REJECTED ? 'ERROR' : 'SUCCESS'
            }));
        }
        res.status(200).json({ status: 'success', data: messages });
    }
    catch (err) {
        next(err);
    }
};
exports.getMessages = getMessages;
