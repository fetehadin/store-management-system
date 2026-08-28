"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errors_js_1 = require("../utils/errors.js");
const env_js_1 = require("../config/env.js");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof zod_1.ZodError) {
        const issues = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        res.status(400).json({
            status: "error",
            code: "VALIDATION_ERROR",
            message: "Invalid request payload",
            errors: issues,
        });
        return;
    }
    if (err instanceof errors_js_1.AppError) {
        res.status(err.statusCode).json({
            status: "error",
            code: err.constructor.name,
            message: err.message,
        });
        return;
    }
    console.error("CRITICAL UNHANDLED ERROR:", err);
    res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: env_js_1.env.NODE_ENV === "development"
            ? err.message
            : "An unexpected internal server error occurred",
    });
};
exports.errorHandler = errorHandler;
