import { Router } from "express";
import {
  createLedgerEntry,
  getLedgerHistory,
} from "../controllers/ledger.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// Every ledger endpoint requires authentication
router.use(authenticate);

// Sales Reps & Admins can read their scoped audit trail
router.get("/", getLedgerHistory);

// Only ADMIN users can write manual adjustment ledger entries
router.post("/", authorize(Role.ADMIN), createLedgerEntry);

export default router;