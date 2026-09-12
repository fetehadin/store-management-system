"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_js_1 = require("../controllers/sale.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const router = (0, express_1.Router)();
// Sales Rep Checkout Endpoint (Requires authentication and SALES_REP role)
router.post("/", authenticate_js_1.authenticate, (0, authorize_js_1.authorize)("SALES_REP"), sale_controller_js_1.processSale);
exports.default = router;
