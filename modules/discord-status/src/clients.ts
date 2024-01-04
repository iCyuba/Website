import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Redis } from "ioredis";

export const redis = new Redis(Bun.env.REDIS_URL ?? "localhost:6379");
export const discord = new Client({
  intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
  partials: [Partials.GuildMember, Partials.User],
});

async function close() {
  await discord.destroy();
  await redis.quit();

  process.exit(0);
}

process.on("SIGTERM", close);
process.on("SIGINT", close);
