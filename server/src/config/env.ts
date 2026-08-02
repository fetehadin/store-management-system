import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Enterprise Security Schema:
 * - Enforces minimum 32-character JWT secrets to prevent brute-force attacks.
 * - Enforces valid PostgreSQL URL syntax.
 * - Enforces explicit CORS origins.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000").transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),
  JWT_SECRET: z
    .string()
    .min(32, "SECURITY FATAL: JWT_SECRET must be at least 32 characters long"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN must be explicitly defined"),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(" CRITICAL: Invalid or missing environment variables:");
    console.error(JSON.stringify(parsed.error.format(), null, 2));
    process.exit(1); // Fail fast: immediately kill process if security rules fail
  }

  return parsed.data;
};

// Export a guaranteed type-safe, validated environment object
export const env = parseEnv();