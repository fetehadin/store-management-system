"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveBatchSchema = exports.createProductSchema = exports.createSupplierSchema = void 0;
const zod_1 = require("zod");
const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)[79]\d{8}$/;
exports.createSupplierSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Supplier name must be at least 2 characters")
        .max(100),
    phone: zod_1.z
        .string()
        .regex(ETHIOPIAN_PHONE_REGEX, "Invalid Ethiopian phone number format (e.g., 0911223344 or +251911223344)"),
    creditBalance: zod_1.z
        .number()
        .nonnegative("Credit balance cannot be negative")
        .optional()
        .default(0),
});
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .max(100),
    description: zod_1.z
        .string()
        .max(255)
        .optional(),
    price: zod_1.z
        .number()
        .positive("Default wholesale price must be greater than zero"),
});
exports.receiveBatchSchema = zod_1.z.object({
    batchCode: zod_1.z
        .string()
        .min(2, "Batch code is required")
        .max(50)
        .toUpperCase(),
    productId: zod_1.z
        .string()
        .uuid("Invalid Product UUID format"),
    supplierId: zod_1.z
        .string()
        .uuid("Invalid Supplier UUID format"),
    quantityRecieved: zod_1.z
        .number()
        .int("Quantity must be a whole integer")
        .positive("Quantity received must be greater than zero"),
    unitCostPrice: zod_1.z
        .number()
        .positive("Unit cost price must be greater than zero"),
});
