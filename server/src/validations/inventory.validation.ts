import { z } from "zod";

export const createStockBatchSchema = z.object({
  productId: z
    .string()
    .min(1, "Product ID is required"),
  batchNumber: z
    .string()
    .min(2, "Batch number is required")
    .max(50),
  quantity: z
    .number()
    .int("Quantity must be a whole integer")
    .positive("Quantity must be greater than zero"),
  wholesalePrice: z
    .number()
    .positive("Wholesale price must be greater than zero"),
});

export const issueStockSchema = z.object({
  salesRepId: z
    .string()
    .min(1, "Sales Rep ID is required"), // Changed from .uuid() to .min(1)
  productId: z
    .string()
    .min(1, "Product ID is required"),
  qtyIssued: z
    .number()
    .int("Quantity issued must be a whole integer")
    .positive("Quantity issued must be greater than zero"),
  wholesalePrice: z
    .number()
    .positive("Wholesale price must be greater than zero"),
  cogsCalculated: z
    .number()
    .nonnegative("COGS cannot be negative")
    .optional(),
});

export type CreateStockBatchInput = z.infer<typeof createStockBatchSchema>;
export type IssueStockInput = z.infer<typeof issueStockSchema>;