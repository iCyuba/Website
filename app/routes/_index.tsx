import type { MetaFunction } from "@remix-run/node";
import type { Status } from "discord-status";

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
export function loader() {
  return redis.get("discord-status") as Promise<Status | null>;
}

export default function Index() {
  return (
    <div className={home}>
      <h1 className={title}>iCyuba</h1>

      <AboutContainer />
    </div>
  );
}
