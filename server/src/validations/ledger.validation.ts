import { z } from "zod";
import { AuditEntity } from "../generated/client/index.js";

export const createLedgerEntrySchema = z
  .object({
    fromEntity: z.nativeEnum(AuditEntity),
    fromEntityId: z.string().optional(),
    toEntity: z.nativeEnum(AuditEntity),
    toEntityId: z.string().optional(),
    amount: z
      .number()
      .positive("Ledger entry amount must be greater than zero"),
    transferMethod: z
      .string()
      .min(2, "Transfer method is required")
      .max(50)
      .toUpperCase(),
    receiptUrl: z
      .string()
      .url("Must be a valid image or document URL")
      .optional(),
    auditRemark: z
      .string()
      .max(255)
      .optional(),
    transactionRefId: z
      .string()
      .max(100)
      .optional(),
  })
  .refine(
    (data) =>
      Boolean(data.receiptUrl) ||
      Boolean(data.auditRemark && data.auditRemark.trim().length > 0),
    {
      message: "Audit remark is mandatory when a receipt URL is not provided",
      path: ["auditRemark"],
    }
  );

export const getLedgerQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  fromEntity: z.nativeEnum(AuditEntity).optional(),
  toEntity: z.nativeEnum(AuditEntity).optional(),
  transferMethod: z.string().optional(),
});

export type CreateLedgerEntryInput = z.infer<typeof createLedgerEntrySchema>;
export type GetLedgerQueryInput = z.infer<typeof getLedgerQuerySchema>;