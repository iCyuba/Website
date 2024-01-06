import { Redis } from "ioredis";

import { Status } from "./messages";

export const redis = new Redis(Bun.env.REDIS_URL ?? "localhost:6379");

export function getStatus(): Promise<Status | null> {
  return redis.get("discord:status") as Promise<Status | null>;
}

export async function getLastOnline(): Promise<Date | null> {
  const lastOnline = await redis.get("discord:last-seen");
  if (!lastOnline) return null;

  return new Date(Number(lastOnline));
}

export async function getStatusAndLastOnline() {
  const [status, lastOnline] = await redis.mget(
    "discord:status",
    "discord:last-seen"
  );

  return {
    status: status as Status | null,
    lastOnline:
      lastOnline && (status === Status.Offline || status === Status.Away)
        ? new Date(Number(lastOnline))
        : null,
  };
}
