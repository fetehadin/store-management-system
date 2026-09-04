import { z } from "zod";

export const submitPaymentSchema = z.object({
  transactionRedId: z.string().min(1, "Transaction reference ID is required"),
  amount: z.number().positive("Amount must be greater than zero"),
  bankName: z.string().min(1, "Bank name is required"), // <--- ADD THIS LINE
  senderName: z.string().optional(),
  reasonRemark: z.string().optional(),
  receipeImageUrl: z.string().optional(),
});

export const reviewPaymentSchema = z.object({
  adminRemark: z
    .string()
    .max(255)
    .optional(),
});

export type SubmitPaymentInput = z.infer<typeof submitPaymentSchema>;
export type ReviewPaymentInput = z.infer<typeof reviewPaymentSchema>;