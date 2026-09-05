import { Router } from "express";
import authRoutes from "./auth.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import paymentRoutes from "./payment.routes.js";
import ledgerRoutes from "./ledger.routes.js";
import supplierRoutes from "./supplier.routes.js";
import productRoutes from "./product.routes.js";
import reportRoutes from "./report.routes.js";
import saleRoutes from "./sale.routes.js";
import analyticsRoutes from './analytics.routes.js';

const router = Router();

// Mount API v1 Routes
router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/payments", paymentRoutes);
router.use("/ledger", ledgerRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/products", productRoutes);
router.use("/reports", reportRoutes);
router.use("/sales", saleRoutes); 
router.use('/analytics', analyticsRoutes);

export default router;