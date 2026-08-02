import { Router } from "express";
import { createSupplier } from "../controllers/catalog.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

router.use(authenticate, authorize(Role.ADMIN));
router.post("/", createSupplier);

export default router;