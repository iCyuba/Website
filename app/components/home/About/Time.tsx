import { useEffect, useRef, useState } from "react";

import Card from "@/components/home/Card";

import {
  container,
  cycle as cycleClass,
  divider,
  label,
  time as timeClass,
} from "@/styles/home/time.css";

function Time() {
  const intl = useRef(
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",

      hour: "numeric",
      minute: "numeric",
      hourCycle: "h12",

      timeZone: "Europe/Prague",
      timeZoneName: "short",
    }),
  );

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const parts = intl.current.formatToParts(date);
  const dateText = parts
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

  return (
    <Card title="local time" className={container}>
      <span className={label} suppressHydrationWarning>
        <span className={timeClass} suppressHydrationWarning>
          {time}
        </span>{" "}
        <span className={cycleClass} suppressHydrationWarning>
          {cycle}
        </span>{" "}
        {zone}
      </span>

      <span className={divider} />

      <span className={label} suppressHydrationWarning>
        {dateText}
      </span>
    </Card>
  );
}

export default Time;