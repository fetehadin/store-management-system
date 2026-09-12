"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const supplier_controller_js_1 = require("../controllers/supplier.controller.js");
const router = (0, express_1.Router)();
router.use(authenticate_js_1.authenticate, (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN));
// 1. Static Root Routes
router.get("/", supplier_controller_js_1.getSuppliers);
router.post("/", supplier_controller_js_1.enrollSupplier);
// 2. CRITICAL FIX: Specific multi-parameter nested routes MUST be defined FIRST
router.post("/:supplierId/batches/:batchCode/pay", supplier_controller_js_1.paySupplierBatch);
router.post("/:supplierId/batches/:batchCode/refund", supplier_controller_js_1.refundSupplierBatch);
router.delete('/:supplierId/batches/:batchCode', supplier_controller_js_1.deleteSupplierBatch);
// 3. Generic wildcard /:id routes fall to the bottom to prevent swallowing
router.post("/:id/batches", supplier_controller_js_1.addSupplierBatch);
router.delete('/:id', supplier_controller_js_1.deleteSupplier);
exports.default = router;
