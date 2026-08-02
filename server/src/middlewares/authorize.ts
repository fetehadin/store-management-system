import { Request, Response, NextFunction } from "express";
import { Role } from "../generated/client/index.js";
import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";

/**
 * Enterprise RBAC Guard:
 * Intercepts requests after authentication to enforce strict role boundaries.
 *
 * @param allowedRoles - List of roles permitted to access the endpoint
 */
export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    // Fail-Secure: Guarantee the authenticate middleware ran first
    if (!req.user) {
      next(new UnauthorizedError("User not authenticated"));
      return;
    }

    // Role Verification: Check if user's role exists in the whitelist
    if (!allowedRoles.includes(req.user.role)) {
      next(
        new ForbiddenError(
          `Access denied. Role '${req.user.role}' is not authorized to access this endpoint.`
        )
      );
      return;
    }

    next();
  };
};