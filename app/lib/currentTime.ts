import { useSyncExternalStore } from "react";

/**
 * Automatically updates the current time every second.
 * @returns The current time.
 */
export function useCurrentTime(): Date {
  const time = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return time;
}

// Code to make the above work
// It runs the subscribers every second, and returns the current time
// This is to avoid making a timer for each component that uses the hook

const subscribers = new Set<() => void>();
let time = new Date();

setInterval(() => {
  time = new Date();

  subscribers.forEach(fn => fn());
}, 1000);

function subscribe(fn: () => void) {
  subscribers.add(fn);

  return () => subscribers.delete(fn);
}

export function getSnapshot() {
  return time;
}
