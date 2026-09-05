import { Router } from "express";
import { getFinancialSummary } from "../controllers/analytics.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

router.get("/summary", getFinancialSummary);

export default router;