import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis instance with proper error handling
let redis = null;

try {
  if (process.env.UPSTASH_REDIS_URL) {
    redis = new Redis(process.env.UPSTASH_REDIS_URL, {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      connectTimeout: 5000,
      enableReadyCheck: false,
    });

    // Handle Redis connection errors gracefully
    redis.on("error", (err) => {
      console.log("Redis connection error:", err.message);
      console.log("Continuing without Redis cache...");
    });

    redis.on("connect", () => {
      console.log("Redis connected successfully");
    });

    redis.on("ready", () => {
      console.log("Redis is ready");
    });

    // Don't let Redis errors crash the app
    redis.on("unhandledRejection", (err) => {
      console.log("Redis unhandled rejection:", err.message);
    });
  } else {
    console.log("No Redis URL provided, running without cache");
  }
} catch (error) {
  console.log("Failed to initialize Redis:", error.message);
  console.log("Continuing without Redis cache...");
}

// Export Redis instance or null
export { redis };
