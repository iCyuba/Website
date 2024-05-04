import { useSyncExternalStore } from "react";

/**
 * Automatically updates the current time every second.
 *
 * If you want to use a custom getSnapshot function, you can pass it as the first argument.
 * To get the current time in your custom getSnapshot function, you can use the exported `getTimeSnapshot` function.
 * @param getSnapshot Function for getting current time. Defaults to the exported `getTimeSnapshot` function.
 * @param getServerSnapshot The function to get the current time on the server. Defaults to the same as `getSnapshot`.
 * @returns The current time.
 */
export function useCurrentTime<T>(
  getSnapshot?: () => T,
  getServerSnapshot?: () => T
): T;
export function useCurrentTime(): Date;
export function useCurrentTime(
  getSnapshot: () => Date = () => time,
  getServerSnapshot: () => Date = getSnapshot
): Date {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Code to make the above work
// It runs the subscribers every second, and returns the current time
// This is to avoid making a timer for each component that uses the hook

const subscribers = new Set<() => void>();
export let time = new Date();

if (typeof window !== "undefined")
  setInterval(() => {
    time = new Date();

    subscribers.forEach(fn => fn());
  }, 1000);

function subscribe(fn: () => void) {
  subscribers.add(fn);

  return () => subscribers.delete(fn);
}
