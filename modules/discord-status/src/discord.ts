import { discord, redis } from "./clients";
import { statusMessage } from "./messages";
import { sockets } from "./websocket";

discord.on("ready", () => console.log(`Logged in as ${discord.user?.tag}!`));

// Update the status on status change
discord.on("presenceUpdate", async (_, presence) => {
  // Ignore the event if the user is not the one we're watching
  if (presence.userId !== Bun.env.DISCORD_USER_ID) return;

  // Update the stored status in Redis
  await redis.set("discord-status", presence.status);

  // Send the update to all connected clients
  for (const socket of sockets) socket.send(statusMessage(presence.status));
});

await discord.login(Bun.env.DISCORD_TOKEN);
