import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

// Mount API v1 Routes
router.use("/auth", authRoutes);

export default router;