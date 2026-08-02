import { Router } from "express";
import {
  createProduct,
  receiveInventoryBatch,
  getProductsWithStock,
} from "../controllers/catalog.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";

const router = Router();

router.use(authenticate);

// Sales Reps & Admins can view available products and stock
router.get("/", getProductsWithStock);

// Only Admins can define new products or receive physical warehouse batches
router.post("/", authorize(Role.ADMIN), createProduct);
router.post("/batches", authorize(Role.ADMIN), receiveInventoryBatch);

export default router;