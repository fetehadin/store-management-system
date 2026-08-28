"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
/**
 * Base Operational Error:
 * Distinguishes between expected business rule violations (operational)
 * and unexpected runtime/system crashes (programmer errors).
 */
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode = 400, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// 400 Bad Request — Validation or business rule failure
class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
// 401 Unauthorized — Missing or invalid authentication token
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized access") {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
// 403 Forbidden — Authenticated but lacks RBAC permission (e.g., Sales Rep trying to add Supplier)
class ForbiddenError extends AppError {
    constructor(message = "You do not have permission to perform this action") {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
// 404 Not Found — Resource does not exist
class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
// 409 Conflict — Duplicate CBE Ref ID, duplicate phone, or duplicate SHA-256 hash
class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
