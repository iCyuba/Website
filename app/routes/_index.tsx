import { json, type MetaFunction } from "@remix-run/node";
import { Status } from "discord-status";

import { redis } from "@/lib/redis.server";

import AboutContainer from "@/components/home/About/Container";

import { home, title } from "@/styles/home/page.css";

export const meta: MetaFunction = () => {
  return [
    { title: "iCyuba" },
    { name: "description", content: "iCyuba's website" },
    { name: "theme-color", content: "#ffffff" },
  ];
};

// Return the Discord status from Redis
export async function loader() {
  const [status, lastOnline] = await redis.mget(
    "discord:status",
    "discord:last-seen"
  );

  return json({
    status: status as Status | null,
    lastOnline:
      lastOnline && (status === Status.Offline || status === Status.Away)
        ? new Date(Number(lastOnline))
        : null,
  });
}

export default function Index() {
  return (
    <div className={home}>
      <h1 className={title}>iCyuba</h1>

      <AboutContainer />
    </div>
  );
}
