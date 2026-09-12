"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const return_controller_js_1 = require("../controllers/return.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
// All return routes require authentication
router.use(authenticate_js_1.authenticate);
// Admin fetches all pending stock returns
router.get("/pending", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), return_controller_js_1.getPendingReturns);
// Sales Rep submits a return request for their checked-out stock
router.post("/", (0, authorize_js_1.authorize)(index_js_1.Role.SALES_REP, index_js_1.Role.ADMIN), return_controller_js_1.submitReturn);
// Admin processes/approves the return and assigns a destination (WAREHOUSE or SUPPLIER)
router.post("/:id/approve", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), return_controller_js_1.processReturn);
exports.default = router;
