"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_js_1 = require("../controllers/payment.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
// All payment endpoints require authentication
router.use(authenticate_js_1.authenticate);
// Sales Reps (and Admins) can submit new payment proofs
router.post("/", payment_controller_js_1.submitPayment);
// Only ADMIN users can approve or reject payment proofs
router.patch("/:id/approve", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), payment_controller_js_1.approvePayment);
router.patch("/:id/reject", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), payment_controller_js_1.rejectPayment);
exports.default = router;
