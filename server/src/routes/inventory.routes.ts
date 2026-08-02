import { Router } from "express";
import {
  createStockBatch,
  issueStock,
} from "../controllers/inventory.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// Protect ALL inventory endpoints: Must be authenticated AND have ADMIN role
router.use(authenticate, authorize(Role.ADMIN));

router.post("/batches", createStockBatch);
router.post("/issue", issueStock);

export default router;