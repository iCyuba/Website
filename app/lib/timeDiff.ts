import { useCallback } from "react";

import { time, useCurrentTime } from "@/lib/currentTime";

const day = 86_400_000;
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", day * 365],
  ["month", day * 30],
  ["week", day * 7],
  ["day", day],
  ["hour", 3_600_000],
  ["minute", 60_000],
  ["second", 1000],
];

const intl = new Intl.RelativeTimeFormat("en-GB", {
  numeric: "auto",
});

/**
 * Formats the time difference between the current time and the given date.
 *
 * If the given date is not provided, undefined will be returned.
 * @param date The date to compare the current time to.
 * @returns The formatted time difference.
 */
export function useTimeDifference(date?: Date | null) {
  const getSnapshot = useCallback(() => {
    if (!date) return;

    const diff = date.getTime() - time.getTime();
    for (const [name, ms] of units) {
      if (Math.abs(diff) >= ms) {
        return intl.format(Math.ceil(diff / ms), name);
      }
    }

    return intl.format(0, "second");
  }, [date]);

  return useCurrentTime(getSnapshot);
}
