"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ledger_controller_js_1 = require("../controllers/ledger.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
const index_js_1 = require("../generated/client/index.js");
const router = (0, express_1.Router)();
// Every ledger endpoint requires authentication
router.use(authenticate_js_1.authenticate);
// Sales Reps & Admins can read their scoped audit trail
router.get("/", ledger_controller_js_1.getLedgerHistory);
// Only ADMIN users can write manual adjustment ledger entries
router.post("/", (0, authorize_js_1.authorize)(index_js_1.Role.ADMIN), ledger_controller_js_1.createLedgerEntry);
exports.default = router;
