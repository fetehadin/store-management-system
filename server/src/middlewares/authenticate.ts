import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../utils/errors.js";
import { db } from "../config/db.js";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    // Step 1: Enforce Authorization header presence and standard "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid Authorization header");
    }

    // Step 2: Extract token and cryptographically verify signature
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Step 3: Database Liveness Check (prevents deleted/terminated employees from accessing APIs)
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new UnauthorizedError("The user account belonging to this token no longer exists");
    }

    // Step 4: Attach verified user to the request for downstream controllers
    req.user = user;
    next();
  } catch (err) {
    next(err); // Passes errors cleanly to our global errorHandler middleware from Step 4
  }
};