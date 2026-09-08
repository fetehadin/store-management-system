import { Router } from "express";
import {
  createStockBatch,
  issueStock,
  getInventory,
  updateSellingPrice,
  getMyStock,
  getProductSuggestions // <-- 1. Import the new suggestions function
} from "../controllers/inventory.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// 2. REP ENDPOINT: Only requires basic authentication so Sales Reps can see their own items
router.get("/my-stock", authenticate, getMyStock);

// 3. PRODUCT & SUGGESTIONS ENDPOINTS
// CRITICAL: Specific /suggestions route MUST come before /:id routes
router.get("/products/suggestions", authenticate, authorize(Role.ADMIN), getProductSuggestions);
router.get("/products", getInventory);
router.patch("/products/:id/price", updateSellingPrice);

// 4. ADMIN ENDPOINTS: Explicitly protect the admin-only routes
router.post("/batches", authenticate, authorize(Role.ADMIN), createStockBatch);
router.post("/issue", authenticate, issueStock);

export default router;