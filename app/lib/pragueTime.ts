import { time as currentTime, useCurrentTime } from "@/lib/currentTime";

const intl = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",

  hour: "numeric",
  minute: "numeric",
  hourCycle: "h12",

  timeZone: "Europe/Prague",
  timeZoneName: "short",
});

export interface FormattedDate {
  date: string;
  time: string;
  cycle: string;
  zone: string;
}

let snapshot: FormattedDate | undefined;

function getPragueTimeSnapshot(): FormattedDate {
  const parts = intl.formatToParts(currentTime);
  const date = parts
    .splice(0, 5)
    .map(part => part.value)
    .join("");

  parts.shift();

  const time = parts
    .splice(0, 3)
    .map(part => part.value)
    .join("");

  const cycle = parts[1].value;
  const zone = parts[3].value;

  // Only update the snapshot if the date or time has changed. This prevents unnecessary re-renders.
  if (snapshot?.date !== date || snapshot?.time !== time)
    snapshot = { date, time, cycle, zone };

  return snapshot;
}

/**
 * Get the current time and date in Prague.
 *
 * This will only update when the time changes.
 * @returns The current time and date in Prague in the FormattedDate format.
 */
export function usePragueTime(): FormattedDate {
  return useCurrentTime(getPragueTimeSnapshot);
}
