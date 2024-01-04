import { useLoaderData } from "@remix-run/react";

import { useStatus } from "@/lib/status";
import type { loader } from "@/routes/_index";

import Discord from "@/assets/discord.svg?react";

import Card from "@/components/home/Card";

import { button } from "@/styles/components/button.css";
import {
  container,
  fail,
  icon,
  status as statusClass,
} from "@/styles/home/status.css";

function Status() {
  const data = useLoaderData<typeof loader>();
  const { status, connect } = useStatus(data ?? undefined);

  const displayStatus =
    status === "dnd" ? "do not disturb" : status === "idle" ? "away" : status;

  return (
    <Card
      title={
        <>
          status <Discord className={icon} width="1em" />
        </>
      }
      className={container}
    >
      {status ? (
        <span className={statusClass}>{displayStatus}</span>
      ) : (
        <>
          <span className={fail}>Status failed to load.</span>

          <button onClick={connect} className={button}>
            Retry
          </button>
        </>
      )}
    </Card>
  );
}

export default Status;
