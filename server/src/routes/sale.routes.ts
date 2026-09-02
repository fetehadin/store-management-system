import { Router } from "express";
import { processSale } from "../controllers/sale.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

// Sales Rep Checkout Endpoint (Requires authentication and SALES_REP role)
router.post("/", authenticate, authorize("SALES_REP"), processSale);

export default router;