import { json, type MetaFunction } from "@remix-run/node";
import { Status } from "discord-status";

import { getChart } from "@/lib/contributions.server";
import { redis } from "@/lib/redis.server";

import About from "@/components/home/About/Container";
import Chart from "@/components/home/Chart";

import { divider, home, title } from "@/styles/home/page.css";

export const meta: MetaFunction = () => {
  return [
    { title: "iCyuba" },
    { name: "description", content: "iCyuba's website" },
    { name: "theme-color", content: "#ffffff" },
  ];
};

// Return the Discord status from Redis
export async function loader() {
  const [[status, lastOnline], chart] = await Promise.all([
    // Status and last seen
    redis.mget("discord:status", "discord:last-seen"),

    // Chart data
    getChart(),
  ]);

  return json({
    status: status as Status | null,
    lastOnline:
      lastOnline && (status === Status.Offline || status === Status.Away)
        ? new Date(Number(lastOnline))
        : null,
    chart,
  });
}

export default function Index() {
  return (
    <div className={home}>
      <h1 className={title}>iCyuba</h1>
      <span className={divider} />

      <About />

      <span className={divider} />

      <Chart />
    </div>
  );
}
