import { Router } from "express";
import authRoutes from "./auth.routes.js";
import inventoryRoutes from "./inventory.routes.js";

const router = Router();

// Mount API v1 Routes
router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);

export default router;