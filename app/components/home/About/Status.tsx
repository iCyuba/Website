import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { loader } from "@/routes/_index";

import Discord from "@/assets/discord.svg?react";

import Card from "@/components/home/Card";

import { container, icon } from "@/styles/home/status.css";

function Status() {
  const data = useLoaderData<typeof loader>();
  const [status, setStatus] = useState(data);

  // Connect to the websocket for updates
  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL ?? "/status");

    // Update the status when a message is received
    socket.addEventListener("message", event => setStatus(event.data));

    // Close the socket on unmount
    return () => socket.close();
  }, []);

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
      {displayStatus}
    </Card>
  );
}

export default Status;
