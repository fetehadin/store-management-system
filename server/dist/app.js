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
const index_js_1 = __importDefault(require("./routes/index.js"));
const return_routes_js_1 = __importDefault(require("./routes/return.routes.js")); // <-- Added .js to match your setup!
const note_routes_js_1 = __importDefault(require("./routes/note.routes.js"));
const message_routes_js_1 = __importDefault(require("./routes/message.routes.js"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, cors_1.default)({
    origin: env_js_1.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, morgan_1.default)(env_js_1.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use('/uploads', express_1.default.static('uploads'));
app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "b2b-distro-management-system-api",
        timestamp: new Date().toISOString(),
    });
});
// <-- 3. MOUNT API V1 ENDPOINTS HERE
app.use("/api/v1/returns", return_routes_js_1.default); // <-- ADDED THIS LINE TO ACTIVATE THE ROUTE!
app.use("/api/v1/notes", note_routes_js_1.default);
app.use("/api/v1/messages", message_routes_js_1.default);
app.use("/api/v1", index_js_1.default);
// Catch-all route for undefined endpoints (404 Not Found)
app.use((_req, _res) => {
    throw new errors_js_1.NotFoundError("Endpoint not found on this server");
});
app.use(errorHandler_js_1.errorHandler);
exports.default = app;
