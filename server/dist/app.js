"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_js_1 = require("./config/env.js");
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const errors_js_1 = require("./utils/errors.js");
const index_js_1 = __importDefault(require("./routes/index.js")); // <-- 1. IMPORT MASTER ROUTER
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_js_1.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, morgan_1.default)(env_js_1.env.NODE_ENV === "production" ? "combined" : "dev"));
app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "b2b-distro-management-system-api",
        timestamp: new Date().toISOString(),
    });
});
// <-- 2. MOUNT API V1 ENDPOINTS HERE
app.use("/api/v1", index_js_1.default);
// Catch-all route for undefined endpoints (404 Not Found)
app.use((_req, _res) => {
    throw new errors_js_1.NotFoundError("Endpoint not found on this server");
});
app.use(errorHandler_js_1.errorHandler);
exports.default = app;
