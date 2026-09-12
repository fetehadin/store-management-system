"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const index_js_1 = require("../generated/client/index.js");
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(100),
    username: zod_1.z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50),
    password: zod_1.z
        .string()
        .min(4, "Password or PIN must be at least 4 characters long"),
    role: zod_1.z.nativeEnum(index_js_1.Role).optional().default(index_js_1.Role.SALES_REP),
    creditLimit: zod_1.z.number().nonnegative().optional().default(0),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    password: zod_1.z.string().min(1, "Password is required"),
});
