import { useCallback, useEffect, useState } from "react";

const url =
  import.meta.env.VITE_WS_URL ??
  `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/status`;

export function useWebSocketConnection() {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [failed, setFailed] = useState(false);

  const onClose = useCallback((ev: CloseEvent) => {
    setWebsocket(null);
    setFailed(true);
    console.log(ev, "Websocket closed");
  }, []);

  const close = useCallback(
    (ws: WebSocket) => {
      ws.removeEventListener("close", onClose);
      ws.close();

      setWebsocket(null);
      setFailed(false);
    },
    [onClose],
  );

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    console.log("Connecting to websocket");

    ws.addEventListener("open", () => {
      setWebsocket(ws);
      setFailed(false);
    });

    ws.addEventListener("close", onClose);

    return ws;
  }, [onClose]);

  useEffect(() => {
    const ws = connect();

    return () => close(ws);
  }, [onClose, close, connect]);

  return { websocket, connect, close, failed };
}
