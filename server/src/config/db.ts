import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client/index.js";
import { env } from "./env.js";

// 1. Initialize a native PostgreSQL connection pool
const pool = new pg.Pool({ connectionString: env.DATABASE_URL });

// 2. Wrap the pool in Prisma v7's driver adapter
const adapter = new PrismaPg(pool);

// 3. Singleton pattern to prevent connection pool exhaustion in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;