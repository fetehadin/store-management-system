"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_js_1 = __importDefault(require("./auth.routes.js"));
const inventory_routes_js_1 = __importDefault(require("./inventory.routes.js"));
const payment_routes_js_1 = __importDefault(require("./payment.routes.js"));
const ledger_routes_js_1 = __importDefault(require("./ledger.routes.js"));
const supplier_routes_js_1 = __importDefault(require("./supplier.routes.js"));
const product_routes_js_1 = __importDefault(require("./product.routes.js"));
const report_routes_js_1 = __importDefault(require("./report.routes.js"));
const router = (0, express_1.Router)();
// Mount API v1 Routes
router.use("/auth", auth_routes_js_1.default);
router.use("/inventory", inventory_routes_js_1.default);
router.use("/payments", payment_routes_js_1.default);
router.use("/ledger", ledger_routes_js_1.default);
router.use("/suppliers", supplier_routes_js_1.default);
router.use("/products", product_routes_js_1.default);
router.use("/reports", report_routes_js_1.default);
exports.default = router;
