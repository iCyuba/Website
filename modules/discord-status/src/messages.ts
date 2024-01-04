export interface RequestMessage {
  type: "request";
}

export const requestMessage = JSON.stringify({
  type: "request",
} satisfies RequestMessage);

export interface PingMessage {
  type: "ping";
}

export const pingMessage = JSON.stringify({
  type: "ping",
} satisfies PingMessage);

export interface StatusMessage {
  type: "status";
  status: string;
}

export function statusMessage(status: string): string {
  return JSON.stringify({ type: "status", status } satisfies StatusMessage);
}

export interface ErrorMessage {
  type: "error";
  error: string;
}

export function errorMessage(error: Error | string) {
  return JSON.stringify({
    type: "error",
    error: error instanceof Error ? error.message : error,
  } satisfies ErrorMessage);
}

export type Message =
  | RequestMessage
  | PingMessage
  | StatusMessage
  | ErrorMessage;
