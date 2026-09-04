import { Router } from "express";
import {
  createStockBatch,
  issueStock,
  getMyStock // <-- 1. Import the new function
} from "../controllers/inventory.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// 2. REP ENDPOINT: Only requires basic authentication so Sales Reps can see their own items
router.get("/my-stock", authenticate, getMyStock);

// 3. ADMIN ENDPOINTS: Explicitly protect the admin-only routes
router.post("/batches", authenticate, authorize(Role.ADMIN), createStockBatch);
router.post("/issue", authenticate, issueStock);

export default router;