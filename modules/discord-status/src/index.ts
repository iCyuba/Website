// Purpose: Entry point for the discord-status module.
import { discord } from "./discord";
import "./http";
import { redis } from "./redis";

// Exit handler
async function close() {
  await discord.destroy();
  await redis.quit();

  process.exit(0);
}

process.on("SIGTERM", close);
process.on("SIGINT", close);
