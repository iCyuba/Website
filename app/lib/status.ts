import { SerializeFrom } from "@remix-run/node";
import { type Message, toDisplayStatus } from "discord-status";
import { useCallback, useEffect, useRef, useState } from "react";

import type { loader } from "@/routes/_index";

export function useStatus(defaultState?: SerializeFrom<typeof loader>) {
  const [status, setStatus] = useState(defaultState?.status ?? null);
  const [lastOnline, setLastOnline] = useState<Date | null>(
    defaultState?.lastOnline ? new Date(defaultState.lastOnline) : null
  );

  const websocket = useRef<WebSocket | null>(null);

  const onMessage = useCallback((ev: MessageEvent<string>) => {
    // Ignore messages that aren't strings
    if (typeof ev.data !== "string") return;

    // Parse the message as JSON
    try {
      const data = JSON.parse(ev.data) as Message;

      switch (data.type) {
        // Update the status
        case "status":
          setStatus(data.status);
          setLastOnline(data.lastOnline ? new Date(data.lastOnline) : null);
          break;

        // Valid, but no response needed
        case "ping":
          break;

        case "error":
          throw new Error(data.error);

        default:
          throw new Error(`Unknown message type: ${data.type}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onClose = useCallback(() => {
    // Clear the websocket reference
    websocket.current = null;

    // Reset the status to null
    setStatus(null);
    setLastOnline(null);

    // Log the close event
    console.log("[Status] Websocket closed");
  }, []);

  const connect = useCallback(() => {
    // Create a new websocket connection
    const url =
      import.meta.env.VITE_WS_URL ??
      `${location.protocol === "https:" ? "wss" : "ws"}://${
        location.host
      }/status`;

    const ws = new WebSocket(url);
    console.log("[Status] Opening websocket", ws);

    // Store the websocket connection
    websocket.current = ws;

    // Add event listeners
    ws.addEventListener(
      "open",
      () => console.log("[Status] Websocket opened"),
      {
        once: true,
      }
    );
    ws.addEventListener("message", onMessage);
    ws.addEventListener("close", onClose);

    return ws;
  }, [onClose, onMessage]);

  useEffect(() => {
    const ws = connect();

    return () => {
      // Remove close event listener
      ws?.removeEventListener("close", onClose);

      // Close the websocket connection
      ws?.close();
    };
  }, [connect, onClose]);

  // Change the title when the status changes
  useEffect(() => {
    document.title = status ? `iCyuba - ${toDisplayStatus(status)}` : "iCyuba";

    return () => {
      document.title = "iCyuba";
    };
  }, [status]);

  return { status, lastOnline, connect };
}
