"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const router = (0, express_1.Router)();
// Public Authentication Endpoints
router.post("/register", auth_controller_js_1.registerUser);
router.post("/login", auth_controller_js_1.loginUser);
// Protected Session Endpoints
router.get("/me", authenticate_js_1.authenticate, auth_controller_js_1.getMe);
exports.default = router;
