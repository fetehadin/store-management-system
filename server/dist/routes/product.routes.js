"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalog_controller_js_1 = require("../controllers/catalog.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
router.use(authenticate_js_1.authenticate);
// Sales Reps & Admins can view available products and stock
router.get("/", catalog_controller_js_1.getProductsWithStock);
// Only Admins can define new products or receive physical warehouse batches
router.post("/", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), catalog_controller_js_1.createProduct);
router.post("/batches", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), catalog_controller_js_1.receiveInventoryBatch);
exports.default = router;
