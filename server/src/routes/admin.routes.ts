import { Router } from "express";
import { getSalesReps, enrollSalesRep, removeSalesRep } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { 
  getSuppliers, 
  enrollSupplier, 
  addSupplierBatch, 
  paySupplierBatch, 
  refundSupplierBatch 
} from '../controllers/supplier.controller.js';
const router = Router();

// Secure all admin routes
router.use(authenticate);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

router.get("/reps", getSalesReps);
router.post("/reps", enrollSalesRep);
router.delete("/reps/:id", removeSalesRep);

// Supplier Management Routes ---
router.get('/suppliers', getSuppliers);
router.post('/suppliers', enrollSupplier);
router.post('/suppliers/:id/batches', addSupplierBatch);
router.post('/suppliers/:supplierId/batches/:batchId/pay', paySupplierBatch);
router.post('/suppliers/:supplierId/batches/:batchId/refund', refundSupplierBatch);

export default router;