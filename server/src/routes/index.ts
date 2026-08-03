import { Router } from "express";
import authRoutes from "./auth.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import paymentRoutes from "./payment.routes.js";
import ledgerRoutes from "./ledger.routes.js";
import supplierRoutes from "./supplier.routes.js";
import productRoutes from "./product.routes.js";
import reportRoutes from "./report.routes.js";

const router = Router();

// Mount API v1 Routes
router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/payments", paymentRoutes);
router.use("/ledger", ledgerRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/products", productRoutes);
router.use("/reports", reportRoutes);

export default router;