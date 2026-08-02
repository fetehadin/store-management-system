import { User } from "../generated/client/index.js";

declare global {
  namespace Express {
    /**
     * Extends the default Express Request interface to include our authenticated user.
     * Optional (?) because unauthenticated public routes (like /api/v1/auth/login) won't have it.
     */
    interface Request {
      user?: User;
    }
  }
}

export {};