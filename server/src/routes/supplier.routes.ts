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

router.get("/", getSuppliers);
router.post("/", enrollSupplier);
router.post("/:id/batches", addSupplierBatch);

// CRITICAL: Specific Batch actions MUST come before /:id deletions
router.post("/:supplierId/batches/:batchCode/pay", paySupplierBatch);
router.post("/:supplierId/batches/:batchCode/refund", refundSupplierBatch);
router.delete('/:supplierId/batches/:batchCode', deleteSupplierBatch);

// Generic ID action at the very bottom
router.delete('/:id', deleteSupplier);

export default router;