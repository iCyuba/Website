import { discord, redis } from "./clients";
import { Status, statusMessage } from "./messages";
import { sockets } from "./websocket";

discord.on("ready", async () => {
  // Prefetch the guild and user
  const guild = await discord.guilds.fetch(Bun.env.DISCORD_GUILD_ID!);
  const user = await guild.members.fetch(Bun.env.DISCORD_USER_ID!);

  console.log(`Logged in as ${discord.user?.tag}!`);
  console.log(`Watching ${user.user.tag} in ${guild.name}`);
});

// Update the status on status change
discord.on("presenceUpdate", async (old, presence) => {
  // Only allow the event if all of the following are true:
  // 1. User id matches the configured user id
  // 2. Guild id matches the configured guild id
  // 3. The Status has changed
  if (
    presence.userId !== Bun.env.DISCORD_USER_ID ||
    presence.guild?.id !== Bun.env.DISCORD_GUILD_ID ||
    old?.status === presence.status
  )
    return;

  const status = presence.status as Status;

  // Update the stored status in Redis
  await redis.set("discord-status", status);

  // Send the update to all connected clients
  for (const socket of sockets) socket.send(statusMessage(status));
});

await discord.login(Bun.env.DISCORD_TOKEN);
