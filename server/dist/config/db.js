"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = __importDefault(require("pg"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const index_js_1 = require("../generated/client/index.js");
const env_js_1 = require("./env.js");
// 1. Initialize a native PostgreSQL connection pool
const pool = new pg_1.default.Pool({ connectionString: env_js_1.env.DATABASE_URL });
// 2. Wrap the pool in Prisma v7's driver adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
// 3. Singleton pattern to prevent connection pool exhaustion in development
const globalForPrisma = globalThis;
exports.db = globalForPrisma.prisma ??
    new index_js_1.PrismaClient({
        adapter,
        log: env_js_1.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });
if (env_js_1.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.db;
