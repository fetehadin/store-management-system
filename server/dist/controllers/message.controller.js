"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dismissMessage = exports.getMessages = void 0;
const db_js_1 = require("../config/db.js");
const errors_js_1 = require("../utils/errors.js");
const index_js_1 = require("../generated/client/index.js");
// GET /api/v1/messages
const getMessages = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        const userId = req.user.id;
        const userRole = req.user.role;
        let dynamicMessages = [];
        if (userRole === index_js_1.Role.ADMIN) {
            // 1. Fetch Admin Alerts: Pending Payment Proofs waiting for review
            const pendingProofs = await db_js_1.db.paymentProof.findMany({
                where: { status: index_js_1.ProofStatus.PENDING },
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
        }
        else {
            // 2. Fetch Sales Rep Alerts: Processed Payments (Approved or Rejected)
            const processedProofs = await db_js_1.db.paymentProof.findMany({
                where: {
                    userId,
                    status: { in: [index_js_1.ProofStatus.APPROVED, index_js_1.ProofStatus.REJECTED] }
                },
                orderBy: { updatedAt: 'desc' }
            });
            dynamicMessages = processedProofs.map(p => {
                const isApproved = p.status === index_js_1.ProofStatus.APPROVED;
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
        const rawMessages = await db_js_1.db.message.findMany({
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
        const combined = [...dynamicMessages, ...formattedRaw].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        res.status(200).json({ status: 'success', data: combined });
    }
    catch (err) {
        next(err);
    }
};
exports.getMessages = getMessages;
// PATCH /api/v1/messages/:id/dismiss
const dismissMessage = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        const id = req.params.id;
        // If it's a virtual payment proof message, we handle dismissal gracefully or save to a read list
        if (id.startsWith('proof_')) {
            res.status(200).json({ status: 'success', message: 'Alert dismissed.' });
            return;
        }
        await db_js_1.db.message.updateMany({
            where: { id, userId: req.user.id },
            data: { isRead: true }
        });
        res.status(200).json({ status: 'success', message: 'Message dismissed.' });
    }
    catch (err) {
        next(err);
    }
};
exports.dismissMessage = dismissMessage;
