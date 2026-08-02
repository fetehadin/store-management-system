import { z } from "zod";

const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)[79]\d{8}$/;

export const createSupplierSchema = z.object({
  name: z
    .string()
    .min(2, "Supplier name must be at least 2 characters")
    .max(100),
  phone: z
    .string()
    .regex(
      ETHIOPIAN_PHONE_REGEX,
      "Invalid Ethiopian phone number format (e.g., 0911223344 or +251911223344)"
    ),
  creditBalance: z
    .number()
    .nonnegative("Credit balance cannot be negative")
    .optional()
    .default(0),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100),
  description: z
    .string()
    .max(255)
    .optional(),
  price: z
    .number()
    .positive("Default wholesale price must be greater than zero"),
});

export const receiveBatchSchema = z.object({
  batchCode: z
    .string()
    .min(2, "Batch code is required")
    .max(50)
    .toUpperCase(),
  productId: z
    .string()
    .uuid("Invalid Product UUID format"),
  supplierId: z
    .string()
    .uuid("Invalid Supplier UUID format"),
  quantityRecieved: z
    .number()
    .int("Quantity must be a whole integer")
    .positive("Quantity received must be greater than zero"),
  unitCostPrice: z
    .number()
    .positive("Unit cost price must be greater than zero"),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ReceiveBatchInput = z.infer<typeof receiveBatchSchema>;