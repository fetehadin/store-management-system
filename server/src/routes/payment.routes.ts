import { Router } from "express";
import {
  submitPayment,
  getPendingPayments,
  approvePayment,
  rejectPayment,
} from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// All payment endpoints require authentication
router.use(authenticate);

// Admin-only route to view pending receipts 
// NOTE: MUST be placed above the /:id routes so "pending" isn't treated as an ID
router.get("/pending", authorize(Role.ADMIN), getPendingPayments);

// Sales Reps (and Admins) can submit new payment proofs
router.post("/", submitPayment);

// Only ADMIN users can approve or reject payment proofs
router.patch("/:id/approve", authorize(Role.ADMIN), approvePayment);
router.patch("/:id/reject", authorize(Role.ADMIN), rejectPayment);

export default router;