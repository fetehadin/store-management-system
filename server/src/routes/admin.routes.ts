import { Router } from "express";
import { getSalesReps, enrollSalesRep, removeSalesRep } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { 
  getSuppliers, 
  enrollSupplier, 
  addSupplierBatch, 
  paySupplierBatch, 
  refundSupplierBatch,
  deleteSupplier,        // <-- ADDED
  deleteSupplierBatch    // <-- ADDED
} from '../controllers/supplier.controller.js';

const router = Router();

// Secure all admin routes
router.use(authenticate);
router.use(authorize('ADMIN'));

router.get("/reps", getSalesReps);
router.post("/reps", enrollSalesRep);
router.delete("/reps/:id", removeSalesRep);

// Supplier Management Routes ---
router.get('/suppliers', getSuppliers);
router.post('/suppliers', enrollSupplier);
router.post('/suppliers/:id/batches', addSupplierBatch);

// Nested Batch Routes
router.post('/suppliers/:supplierId/batches/:batchCode/pay', paySupplierBatch);
router.post('/suppliers/:supplierId/batches/:batchCode/refund', refundSupplierBatch);

// THE MISSING ENDPOINTS: Hard Delete Routes
router.delete('/suppliers/:supplierId/batches/:batchCode', deleteSupplierBatch);
router.delete('/suppliers/:id', deleteSupplier);

export default router;