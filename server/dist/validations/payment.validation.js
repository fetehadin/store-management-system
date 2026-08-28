"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewPaymentSchema = exports.submitPaymentSchema = void 0;
const zod_1 = require("zod");
exports.submitPaymentSchema = zod_1.z.object({
    transactionRedId: zod_1.z
        .string()
        .min(3, "Transaction reference ID is required")
        .max(100)
        .trim(),
    amount: zod_1.z
        .number()
        .positive("Payment amount must be greater than zero"),
    senderName: zod_1.z
        .string()
        .max(100)
        .optional(),
    reasonRemark: zod_1.z
        .string()
        .max(255)
        .optional(),
    receipeImageUrl: zod_1.z
        .string()
        .url("Must be a valid image URL")
        .optional(),
});
exports.reviewPaymentSchema = zod_1.z.object({
    adminRemark: zod_1.z
        .string()
        .max(255)
        .optional(),
});
