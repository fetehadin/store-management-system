import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors.js";
import { env } from "../config/env.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
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

  if (err instanceof AppError) {
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
    message:
      env.NODE_ENV === "development"
        ? err.message
        : "An unexpected internal server error occurred",
  });
};