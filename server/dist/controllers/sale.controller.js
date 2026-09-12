"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSale = void 0;
const db_js_1 = require("../config/db.js");
const sale_validation_js_1 = require("../validations/sale.validation.js");
const processSale = async (req, res, next) => {
    try {
        const data = sale_validation_js_1.createSaleSchema.parse(req.body);
        const salesRepId = req.user.id;
        const totalAmount = data.quantitySold * data.salePrice;
        const transactionResult = await db_js_1.db.$transaction(async (tx) => {
            // 1. Fetch sales rep state for credit limits
            const rep = await tx.user.findUnique({
                where: { id: salesRepId }
            });
            if (!rep) {
                throw new Error("USER_NOT_FOUND");
            }
            // 2. Enforce Credit Ceiling Logic
            if (data.paymentMethod === "CREDIT") {
                const availableCredit = Number(rep.creditLimit) - Number(rep.creditBalance);
                if (totalAmount > availableCredit) {
                    throw new Error("INSUFFICIENT_CREDIT");
                }
                await tx.user.update({
                    where: { id: salesRepId },
                    data: { creditBalance: { increment: totalAmount } }
                });
            }
            // 3. Find available stock from the sales rep's issued items (Van Stock)
            // We look through StockIssuances assigned to this user where qtyRemaining is sufficient
            const issuanceItem = await tx.issuanceItem.findFirst({
                where: {
                    productId: data.productId,
                    issuance: {
                        userId: salesRepId,
                        status: "ISSUED"
                    },
                    qtyRemaining: { gte: data.quantitySold }
                }
            });
            if (!issuanceItem) {
                throw new Error("INSUFFICIENT_STOCK");
            }
            // 4. Decrement the remaining quantity in the van allocation
            await tx.issuanceItem.update({
                where: { id: issuanceItem.id },
                data: { qtyRemaining: { decrement: data.quantitySold } }
            });
            // 5. Record the retail sale
            return await tx.sale.create({
                data: {
                    salesRepId,
                    retailerId: data.retailerId,
                    productId: data.productId,
                    quantity: data.quantitySold,
                    totalAmount,
                    paymentMethod: data.paymentMethod,
                }
            });
        });
        res.status(201).json({
            status: "success",
            message: "Sale processed successfully",
            data: transactionResult
        });
    }
    catch (error) {
        if (error.message === "INSUFFICIENT_CREDIT") {
            res.status(400).json({ status: "error", message: "Sale exceeds authorized credit limit." });
            return;
        }
        if (error.message === "INSUFFICIENT_STOCK") {
            res.status(400).json({ status: "error", message: "Not enough stock in van allocation." });
            return;
        }
        if (error.message === "USER_NOT_FOUND") {
            res.status(404).json({ status: "error", message: "Sales rep not found." });
            return;
        }
        next(error);
    }
};
exports.processSale = processSale;
