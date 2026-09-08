import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../generated/client/index.js";
import { 
  getSuppliers, enrollSupplier, addSupplierBatch, 
  paySupplierBatch, refundSupplierBatch, 
  deleteSupplier, deleteSupplierBatch 
} from "../controllers/supplier.controller.js";

const router = Router();
router.use(authenticate, authorize(Role.ADMIN));

// 1. Static Root Routes
router.get("/", getSuppliers);
router.post("/", enrollSupplier);

// 2. CRITICAL FIX: Specific multi-parameter nested routes MUST be defined FIRST
router.post("/:supplierId/batches/:batchCode/pay", paySupplierBatch);
router.post("/:supplierId/batches/:batchCode/refund", refundSupplierBatch);
router.delete('/:supplierId/batches/:batchCode', deleteSupplierBatch);

// 3. Generic wildcard /:id routes fall to the bottom to prevent swallowing
router.post("/:id/batches", addSupplierBatch);
router.delete('/:id', deleteSupplier);

export default router;