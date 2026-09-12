"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_js_1 = require("../controllers/admin.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const supplier_controller_js_1 = require("../controllers/supplier.controller.js");
const router = (0, express_1.Router)();
// Secure all admin routes
router.use(authenticate_js_1.authenticate);
router.use((0, authorize_js_1.authorize)('ADMIN'));
router.get("/reps", admin_controller_js_1.getSalesReps);
router.post("/reps", admin_controller_js_1.enrollSalesRep);
router.delete("/reps/:id", admin_controller_js_1.removeSalesRep);
// Supplier Management Routes ---
router.get('/suppliers', supplier_controller_js_1.getSuppliers);
router.post('/suppliers', supplier_controller_js_1.enrollSupplier);
router.post('/suppliers/:id/batches', supplier_controller_js_1.addSupplierBatch);
// Nested Batch Routes
router.post('/suppliers/:supplierId/batches/:batchCode/pay', supplier_controller_js_1.paySupplierBatch);
router.post('/suppliers/:supplierId/batches/:batchCode/refund', supplier_controller_js_1.refundSupplierBatch);
// THE MISSING ENDPOINTS: Hard Delete Routes
router.delete('/suppliers/:supplierId/batches/:batchCode', supplier_controller_js_1.deleteSupplierBatch);
router.delete('/suppliers/:id', supplier_controller_js_1.deleteSupplier);
exports.default = router;
