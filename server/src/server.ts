import app from "./app.js";
import { env } from "./config/env.js";
import { db } from "./config/db.js";

// ADD '0.0.0.0' RIGHT HERE:
const server = app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await db.$disconnect();
      console.log("PostgreSQL database connection closed.");
      process.exit(0);
    } catch (err) {
      console.error("Error during database disconnection:", err);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));