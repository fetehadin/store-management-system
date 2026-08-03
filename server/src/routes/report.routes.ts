import { Router } from "express";
import {
  getGrossProfitReport,
  getSalesRepPerformanceReport,
} from "../controllers/report.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// Protect ALL report endpoints: Authenticated AND Admin only
router.use(authenticate, authorize(Role.ADMIN));

router.get("/gross-profit", getGrossProfitReport);
router.get("/sales-performance", getSalesRepPerformanceReport);

export default router;