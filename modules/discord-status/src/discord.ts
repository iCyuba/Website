import { Client, GatewayIntentBits, Partials } from "discord.js";

import { Status, statusMessage } from "./messages";
import { redis } from "./redis";
import { sockets } from "./websocket";

export const discord = new Client({
  intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
  partials: [Partials.GuildMember, Partials.User],
});

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
  await redis.set("discord:status", status);

  // If the status was changed to offline or away, set the last online time
  let lastOnline: Date | null = null;
  if (
    (status === Status.Offline && old?.status === Status.Away) ||
    (status === Status.Away && old?.status === Status.Offline)
  ) {
    const timestamp = await redis.get("discord:last-seen");

    if (timestamp) lastOnline = new Date(Number(timestamp));
  } else if (status === Status.Offline || status === Status.Away) {
    lastOnline = new Date();

    await redis.set("discord:last-seen", lastOnline.getTime());
  }

  // Send the update to all connected clients
  for (const socket of sockets) socket.send(statusMessage(status, lastOnline));
});

await discord.login(Bun.env.DISCORD_TOKEN);
