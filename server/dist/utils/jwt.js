"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const errors_js_1 = require("./errors.js");
/**
 * Signs a secure JWT expiring in 7 days.
 * - Why 7 days? Long enough for field Sales Reps with intermittent internet,
 *   short enough to limit exposure if a device is lost.
 */
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_js_1.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.signToken = signToken;
/**
 * Verifies and decodes a JWT token.
 * - Converts raw jsonwebtoken errors (like JsonWebTokenError or TokenExpiredError)
 *   into our clean, operational UnauthorizedError so the API returns a structured 401 JSON response.
 */
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_SECRET);
    }
    catch (err) {
        throw new errors_js_1.UnauthorizedError("Invalid or expired authentication token");
    }
};
exports.verifyToken = verifyToken;
