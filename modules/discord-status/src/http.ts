import { redis } from "./clients";
import * as websocket from "./websocket";

// Create the websocket server for updates
Bun.serve({
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

  websocket,
});
