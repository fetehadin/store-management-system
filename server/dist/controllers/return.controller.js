"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processReturn = exports.getPendingReturns = exports.submitReturn = void 0;
const db_js_1 = require("../config/db.js");
const decimal_js_1 = require("../utils/decimal.js");
const index_js_1 = require("../generated/client/index.js");
const errors_js_1 = require("../utils/errors.js");
// 1. Rep Submits Return Request
const submitReturn = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            throw new errors_js_1.UnauthorizedError("User authentication required");
        const { items, totalValue, reason } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new errors_js_1.BadRequestError("Return request must contain at least one item.");
        }
        const stockReturn = await db_js_1.db.stockReturn.create({
            data: {
                userId,
                totalValue: (0, decimal_js_1.toDecimal)(totalValue),
                reason,
                status: 'PENDING',
                items: {
                    create: items.map((item) => ({
                        itemId: item.itemId,
                        quantity: item.quantity
                    }))
                }
            }
        });
        res.status(201).json({ status: "success", message: "Return request submitted.", data: stockReturn });
    }
    catch (error) {
        next(error);
    }
};
exports.submitReturn = submitReturn;
// 2. Admin Fetches Pending Returns (with Product Names)
const getPendingReturns = async (_req, res, next) => {
    try {
        const pendingReturns = await db_js_1.db.stockReturn.findMany({
            where: { status: 'PENDING' },
            include: {
                user: { select: { fullName: true } },
                items: true
            },
            orderBy: { createdAt: "desc" },
        });
        const productIds = [...new Set(pendingReturns.flatMap(r => r.items.map(i => i.itemId)))];
        const products = await db_js_1.db.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, price: true }
        });
        const productMap = new Map(products.map(p => [p.id, p]));
        const formattedReturns = pendingReturns.map(ret => ({
            ...ret,
            items: ret.items.map(item => {
                const prod = productMap.get(item.itemId);
                return {
                    ...item,
                    product: { name: prod?.name || 'Unknown Product', price: prod?.price || 0 }
                };
            })
        }));
        res.status(200).json({ status: "success", data: formattedReturns });
    }
    catch (err) {
        next(err);
    }
};
exports.getPendingReturns = getPendingReturns;
// 3. Admin Approves Return (Adds directly back to batch & clears debt)
const processReturn = async (req, res, next) => {
    try {
        const { id } = req.params;
        const adminId = req.user?.id;
        if (!adminId)
            throw new errors_js_1.UnauthorizedError("Admin authorization required");
        const pendingReturn = await db_js_1.db.stockReturn.findUnique({
            where: { id },
            include: { items: true }
        });
        if (!pendingReturn || pendingReturn.status !== 'PENDING') {
            throw new errors_js_1.BadRequestError("Return request not found or already processed.");
        }
        const operations = [
            // 1. Approve the return
            db_js_1.db.stockReturn.update({
                where: { id },
                data: { status: 'APPROVED', destination: index_js_1.ReturnDestination.WAREHOUSE }
            }),
            // 2. Decrement the Rep's Debt
            db_js_1.db.user.update({
                where: { id: pendingReturn.userId },
                data: { creditBalance: { decrement: pendingReturn.totalValue } }
            }),
            // 3. Ledger Audit
            db_js_1.db.ledgerEntry.create({
                data: {
                    fromEntity: index_js_1.AuditEntity.SALES_REP,
                    fromEntityId: pendingReturn.userId,
                    toEntity: index_js_1.AuditEntity.ADMIN_STORE,
                    toEntityId: adminId,
                    amount: pendingReturn.totalValue,
                    transferMethod: 'STOCK_RETURN',
                    transactionRefId: pendingReturn.id,
                    auditRemark: `Stock returned by Rep to WAREHOUSE. Reason: ${pendingReturn.reason}`,
                }
            })
        ];
        // 4. Add items back into their most recent batch live stock
        for (const item of pendingReturn.items) {
            const latestBatch = await db_js_1.db.inventoryBatch.findFirst({
                where: { productId: item.itemId },
                orderBy: { createdAt: 'desc' },
            });
            if (!latestBatch) {
                throw new errors_js_1.BadRequestError(`Cannot return to stock: No batch found for item ${item.itemId}.`);
            }
            operations.push(db_js_1.db.inventoryBatch.update({
                where: { id: latestBatch.id },
                data: { remainingQty: { increment: item.quantity } }
            }));
        }
        await db_js_1.db.$transaction(operations);
        res.status(200).json({ status: "success", message: "Return processed and added to stock." });
    }
    catch (error) {
        next(error);
    }
};
exports.processReturn = processReturn;
