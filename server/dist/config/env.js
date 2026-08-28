"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
/**
 * Enterprise Security Schema:
 * - Enforces minimum 32-character JWT secrets to prevent brute-force attacks.
 * - Enforces valid PostgreSQL URL syntax.
 * - Enforces explicit CORS origins.
 */
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    PORT: zod_1.z.string().default("5000").transform((val) => parseInt(val, 10)),
    DATABASE_URL: zod_1.z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),
    JWT_SECRET: zod_1.z
        .string()
        .min(32, "SECURITY FATAL: JWT_SECRET must be at least 32 characters long"),
    CORS_ORIGIN: zod_1.z.string().min(1, "CORS_ORIGIN must be explicitly defined"),
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
exports.env = parseEnv();
