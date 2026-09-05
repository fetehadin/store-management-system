import { Router } from "express";
import { getSalesReps, enrollSalesRep, removeSalesRep } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

// Secure all admin routes
router.use(authenticate);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

router.get("/reps", getSalesReps);
router.post("/reps", enrollSalesRep);
router.delete("/reps/:id", removeSalesRep);

export default router;