import jwt from "jsonwebtoken";
import { Role } from "../generated/client/index.js";
import { env } from "../config/env.js";
import { UnauthorizedError } from "./errors.js";

/**
 * Enforces the exact structure of data embedded inside our JWTs.
 */
export interface JwtPayload {
  userId: string;
  role: Role;
}

/**
 * Signs a secure JWT expiring in 7 days.
 * - Why 7 days? Long enough for field Sales Reps with intermittent internet,
 *   short enough to limit exposure if a device is lost.
 */
export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * Verifies and decodes a JWT token.
 * - Converts raw jsonwebtoken errors (like JsonWebTokenError or TokenExpiredError)
 *   into our clean, operational UnauthorizedError so the API returns a structured 401 JSON response.
 */
export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired authentication token");
  }
};