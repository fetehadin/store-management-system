"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewPaymentSchema = exports.submitPaymentSchema = void 0;
const zod_1 = require("zod");
exports.submitPaymentSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be greater than zero"),
    bankName: zod_1.z.string().min(1, "Bank name is required"),
    reasonRemark: zod_1.z.string().optional(),
    // Accepts standard URLs or Expo ImagePicker Base64 strings
    receipeImageUrl: zod_1.z.string().url("Must be a valid URL").or(zod_1.z.string().startsWith("data:image/")).optional(),
});
exports.reviewPaymentSchema = zod_1.z.object({
    adminRemark: zod_1.z.string().max(255).optional(),
});
