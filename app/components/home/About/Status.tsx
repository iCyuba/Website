import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { useWebSocketConnection } from "@/lib/websocket";
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
  const [status, setStatus] = useState(data);

  // Listen for status updates from the websocket
  const { websocket, connect, failed } = useWebSocketConnection();
  useEffect(() => {
    if (!websocket) return;

    const listener = (event: MessageEvent<string>) => setStatus(event.data);
    websocket.addEventListener("message", listener);

    return () => websocket.removeEventListener("message", listener);
  }, [websocket]);

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
      {failed ? (
        <>
          <span className={fail}>Status failed to load.</span>

          <button onClick={connect} className={button}>
            Retry
          </button>
        </>
      ) : (
        <span className={statusClass}>{displayStatus}</span>
      )}
    </Card>
  );
}

export default Status;
