"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const index_js_1 = require("../generated/client/index.js");
// Regex matching valid Ethio Telecom (09/2519) and Safaricom Ethiopia (07/2517) numbers
const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)[79]\d{8}$/;
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(100),
    phone: zod_1.z
        .string()
        .regex(ETHIOPIAN_PHONE_REGEX, "Invalid Ethiopian phone number format (e.g., 0911223344 or +251911223344)"),
    password: zod_1.z
        .string()
        .min(6, "Password or PIN must be at least 6 characters long"),
    role: zod_1.z.nativeEnum(index_js_1.Role).optional().default(index_js_1.Role.SALES_REP),
    creditLimit: zod_1.z.number().nonnegative().optional().default(0),
});
exports.loginSchema = zod_1.z.object({
    phone: zod_1.z
        .string()
        .regex(ETHIOPIAN_PHONE_REGEX, "Invalid Ethiopian phone number format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
