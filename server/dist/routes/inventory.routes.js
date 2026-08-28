"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_js_1 = require("../controllers/inventory.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
// Protect ALL inventory endpoints: Must be authenticated AND have ADMIN role
router.use(authenticate_js_1.authenticate, (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN));
router.post("/batches", inventory_controller_js_1.createStockBatch);
router.post("/issue", inventory_controller_js_1.issueStock);
exports.default = router;
