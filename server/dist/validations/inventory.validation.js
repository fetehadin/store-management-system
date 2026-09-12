"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueStockSchema = exports.createStockBatchSchema = void 0;
const zod_1 = require("zod");
exports.createStockBatchSchema = zod_1.z.object({
    productId: zod_1.z
        .string()
        .min(1, "Product ID is required"),
    batchNumber: zod_1.z
        .string()
        .min(2, "Batch number is required")
        .max(50),
    quantity: zod_1.z
        .number()
        .int("Quantity must be a whole integer")
        .positive("Quantity must be greater than zero"),
    wholesalePrice: zod_1.z
        .number()
        .positive("Wholesale price must be greater than zero"),
});
exports.issueStockSchema = zod_1.z.object({
    salesRepId: zod_1.z
        .string()
        .min(1, "Sales Rep ID is required"), // Changed from .uuid() to .min(1)
    productId: zod_1.z
        .string()
        .min(1, "Product ID is required"),
    qtyIssued: zod_1.z
        .number()
        .int("Quantity issued must be a whole integer")
        .positive("Quantity issued must be greater than zero"),
    wholesalePrice: zod_1.z
        .number()
        .positive("Wholesale price must be greater than zero"),
    cogsCalculated: zod_1.z
        .number()
        .nonnegative("COGS cannot be negative")
        .optional(),
});
