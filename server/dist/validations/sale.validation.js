"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleSchema = void 0;
const zod_1 = require("zod");
exports.createSaleSchema = zod_1.z.object({
    retailerId: zod_1.z.string().uuid("Invalid Retailer ID"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
    quantitySold: zod_1.z
        .number()
        .int("Quantity must be a whole number")
        .positive("Must sell at least 1 item"),
    salePrice: zod_1.z
        .number()
        .positive("Price must be greater than zero"),
    paymentMethod: zod_1.z.enum(["CASH", "CREDIT"], {
        message: "Payment method must be exactly CASH or CREDIT",
    }),
});
