import type { ServerWebSocket } from "bun";
import { Client, GatewayIntentBits } from "discord.js";
import { Redis } from "ioredis";

const redis = new Redis(Bun.env.REDIS_URL ?? "localhost:6379");
const discord = new Client({
  intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});

const sockets = new Set<ServerWebSocket<string>>();

discord.on("ready", async () => {
  console.log(`Logged in as ${discord.user?.tag}!`);
});

// Update the status on status change
discord.on("presenceUpdate", async (_, presence) => {
  // Ignore the event if the user is not the one we're watching
  if (presence.userId !== Bun.env.DISCORD_USER_ID) return;

  // Update the status in Redis
  await redis.set("discord-status", presence.status);

  // Send the update to all connected clients
  for (const socket of sockets) socket.send(presence.status);
});

discord.login(Bun.env.DISCORD_TOKEN);

// Create the websocket server for updates
Bun.serve<string>({
  async fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname !== "/status") return new Response(null, { status: 404 });

    // Upgrade the request to a websocket connection, if possible
    const success = server.upgrade(req);
    if (success) return;

    // Otherwise, return the current status (GET only)
    if (req.method !== "GET") return new Response(null, { status: 405 });
    return new Response(await redis.get("discord-status"));
  },

  websocket: {
    open: socket => void sockets.add(socket),
    close: socket => void sockets.delete(socket),

    // Incoming messages are ignored...
    message() {},
  },
});

function close() {
  discord.destroy();
  redis.disconnect();
}

process.on("SIGTERM", close);
process.on("SIGINT", close);
