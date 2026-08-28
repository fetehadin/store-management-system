"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLedgerQuerySchema = exports.createLedgerEntrySchema = void 0;
const zod_1 = require("zod");
const index_js_1 = require("../generated/client/index.js");
exports.createLedgerEntrySchema = zod_1.z
    .object({
    fromEntity: zod_1.z.nativeEnum(index_js_1.AuditEntity),
    fromEntityId: zod_1.z.string().optional(),
    toEntity: zod_1.z.nativeEnum(index_js_1.AuditEntity),
    toEntityId: zod_1.z.string().optional(),
    amount: zod_1.z
        .number()
        .positive("Ledger entry amount must be greater than zero"),
    transferMethod: zod_1.z
        .string()
        .min(2, "Transfer method is required")
        .max(50)
        .toUpperCase(),
    receiptUrl: zod_1.z
        .string()
        .url("Must be a valid image or document URL")
        .optional(),
    auditRemark: zod_1.z
        .string()
        .max(255)
        .optional(),
    transactionRefId: zod_1.z
        .string()
        .max(100)
        .optional(),
})
    .refine((data) => Boolean(data.receiptUrl) ||
    Boolean(data.auditRemark && data.auditRemark.trim().length > 0), {
    message: "Audit remark is mandatory when a receipt URL is not provided",
    path: ["auditRemark"],
});
exports.getLedgerQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
    fromEntity: zod_1.z.nativeEnum(index_js_1.AuditEntity).optional(),
    toEntity: zod_1.z.nativeEnum(index_js_1.AuditEntity).optional(),
    transferMethod: zod_1.z.string().optional(),
});
