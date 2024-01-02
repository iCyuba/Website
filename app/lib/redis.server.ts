import { Redis } from "ioredis";

// Add redis to globalThis
declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis;
}

// Create a new Redis instance if one doesn't exist (for hot module reloading)
if (!globalThis.__redis)
  globalThis.__redis = new Redis(process.env.REDIS_URL ?? "localhost:6379");

export const redis = globalThis.__redis;
