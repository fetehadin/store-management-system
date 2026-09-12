"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const env_js_1 = require("./config/env.js");
const db_js_1 = require("./config/db.js");
// ADD '0.0.0.0' RIGHT HERE:
const server = app_js_1.default.listen(env_js_1.env.PORT, '0.0.0.0', () => {
    console.log(`Server running in ${env_js_1.env.NODE_ENV} mode on port ${env_js_1.env.PORT}`);
});
const gracefulShutdown = async (signal) => {
    console.log(`Received ${signal}. Starting graceful shutdown...`);
    server.close(async () => {
        console.log("HTTP server closed.");
        try {
            await db_js_1.db.$disconnect();
            console.log("PostgreSQL database connection closed.");
            process.exit(0);
        }
        catch (err) {
            console.error("Error during database disconnection:", err);
            process.exit(1);
        }
    });
};
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
