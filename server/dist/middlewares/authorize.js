"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const errors_js_1 = require("../utils/errors.js");
/**
 * Enterprise RBAC Guard:
 * Intercepts requests after authentication to enforce strict role boundaries.
 *
 * @param allowedRoles - List of roles permitted to access the endpoint
 */
const authorize = (...allowedRoles) => {
    return (req, _res, next) => {
        // Fail-Secure: Guarantee the authenticate middleware ran first
        if (!req.user) {
            next(new errors_js_1.UnauthorizedError("User not authenticated"));
            return;
        }
        // Role Verification: Check if user's role exists in the whitelist
        if (!allowedRoles.includes(req.user.role)) {
            next(new errors_js_1.ForbiddenError(`Access denied. Role '${req.user.role}' is not authorized to access this endpoint.`));
            return;
        }
        next();
    };
};
exports.authorize = authorize;
