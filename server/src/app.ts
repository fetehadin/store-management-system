import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { NotFoundError } from "./utils/errors.js";
import routes from "./routes/index.js"; // <-- 1. IMPORT MASTER ROUTER

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "b2b-distro-management-system-api",
    timestamp: new Date().toISOString(),
  });
});

// <-- 2. MOUNT API V1 ENDPOINTS HERE
app.use("/api/v1", routes);

// Catch-all route for undefined endpoints (404 Not Found)
app.use((_req: Request, _res: Response) => {
  throw new NotFoundError("Endpoint not found on this server");
});

app.use(errorHandler);

export default app;