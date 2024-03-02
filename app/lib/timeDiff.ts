import { useCallback } from "react";

import { getTimeSnapshot, useCurrentTime } from "@/lib/currentTime";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = month * 12;

const units: { ms: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { ms: year, name: "year" },
  { ms: month, name: "month" },
  { ms: week, name: "week" },
  { ms: day, name: "day" },
  { ms: hour, name: "hour" },
  { ms: minute, name: "minute" },
  { ms: second, name: "second" },
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

    const time = getTimeSnapshot();
    const diff = date.getTime() - time.getTime();

    for (const { ms, name } of units) {
      if (Math.abs(diff) >= ms) {
        return intl.format(Math.ceil(diff / ms), name);
      }
    }

    return intl.format(0, "second");
  }, [date]);

  return useCurrentTime(getSnapshot);
}
