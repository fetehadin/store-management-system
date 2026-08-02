import { z } from "zod";

export const submitPaymentSchema = z.object({
  transactionRedId: z
    .string()
    .min(3, "Transaction reference ID is required")
    .max(100)
    .trim(),
  amount: z
    .number()
    .positive("Payment amount must be greater than zero"),
  senderName: z
    .string()
    .max(100)
    .optional(),
  reasonRemark: z
    .string()
    .max(255)
    .optional(),
  receipeImageUrl: z
    .string()
    .url("Must be a valid image URL")
    .optional(),
});

export const reviewPaymentSchema = z.object({
  adminRemark: z
    .string()
    .max(255)
    .optional(),
});

export type SubmitPaymentInput = z.infer<typeof submitPaymentSchema>;
export type ReviewPaymentInput = z.infer<typeof reviewPaymentSchema>;