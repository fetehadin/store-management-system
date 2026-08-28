"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_js_1 = require("../controllers/report.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
// Protect ALL report endpoints: Authenticated AND Admin only
router.use(authenticate_js_1.authenticate, (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN));
router.get("/gross-profit", report_controller_js_1.getGrossProfitReport);
router.get("/sales-performance", report_controller_js_1.getSalesRepPerformanceReport);
exports.default = router;
