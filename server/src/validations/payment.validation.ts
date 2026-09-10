import { z } from "zod";

export const submitPaymentSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  bankName: z.string().min(1, "Bank name is required"), 
  reasonRemark: z.string().optional(),
  // Accepts standard URLs or Expo ImagePicker Base64 strings
  receipeImageUrl: z.string().url("Must be a valid URL").or(z.string().startsWith("data:image/")).optional(),
});

export const reviewPaymentSchema = z.object({
  adminRemark: z.string().max(255).optional(),
});

export type SubmitPaymentInput = z.infer<typeof submitPaymentSchema>;
export type ReviewPaymentInput = z.infer<typeof reviewPaymentSchema>;