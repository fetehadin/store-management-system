import { Router } from "express";
import { submitReturn, processReturn } from "../controllers/return.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

// All return routes require authentication
router.use(authenticate);

// Sales Rep submits a return request for their checked-out stock
router.post("/", authorize(Role.SALES_REP, Role.ADMIN), submitReturn); 

// Admin processes/approves the return and assigns a destination (WAREHOUSE or SUPPLIER)
router.post("/:id/approve", authorize(Role.ADMIN), processReturn); 

export default router;