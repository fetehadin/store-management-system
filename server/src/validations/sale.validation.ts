import { z } from "zod";

export const createSaleSchema = z.object({
  retailerId: z.string().uuid("Invalid Retailer ID"),
  productId: z.string().min(1, "Product ID is required"),
  quantitySold: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Must sell at least 1 item"),
  salePrice: z
    .number()
    .positive("Price must be greater than zero"),
  paymentMethod: z.enum(["CASH", "CREDIT"], {
    required_error: "Payment method must be exactly CASH or CREDIT",
  }),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;