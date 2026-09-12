"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_js_1 = require("../controllers/inventory.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
// 2. REP ENDPOINT: Only requires basic authentication so Sales Reps can see their own items
router.get("/my-stock", authenticate_js_1.authenticate, inventory_controller_js_1.getMyStock);
// 3. PRODUCT & SUGGESTIONS ENDPOINTS
// CRITICAL: Specific /suggestions route MUST come before /:id routes
router.get("/products/suggestions", authenticate_js_1.authenticate, (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), inventory_controller_js_1.getProductSuggestions);
router.get("/products", inventory_controller_js_1.getInventory);
router.patch("/products/:id/price", inventory_controller_js_1.updateSellingPrice);
// 4. ADMIN ENDPOINTS: Explicitly protect the admin-only routes
router.post("/batches", authenticate_js_1.authenticate, (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), inventory_controller_js_1.createStockBatch);
router.post("/issue", authenticate_js_1.authenticate, inventory_controller_js_1.issueStock);
exports.default = router;
