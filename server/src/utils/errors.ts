/**
 * Base Operational Error:
 * Distinguishes between expected business rule violations (operational)
 * and unexpected runtime/system crashes (programmer errors).
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request — Validation or business rule failure
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// 401 Unauthorized — Missing or invalid authentication token
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

// 403 Forbidden — Authenticated but lacks RBAC permission (e.g., Sales Rep trying to add Supplier)
export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403);
  }
}

// 404 Not Found — Resource does not exist
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

// 409 Conflict — Duplicate CBE Ref ID, duplicate phone, or duplicate SHA-256 hash
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}