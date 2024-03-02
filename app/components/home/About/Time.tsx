import { usePragueTime } from "@/lib/pragueTime";

import Card from "@/components/home/Card";

import {
  container,
  cycle as cycleClass,
  divider,
  label,
  time as timeClass,
} from "@/styles/home/time.css";

function Time() {
  const { time, cycle, zone, date } = usePragueTime();

  return (
    <Card title="local time" className={container}>
      <span className={label} suppressHydrationWarning>
        <span className={timeClass} suppressHydrationWarning>
          {time}
        </span>
        <span className={cycleClass} suppressHydrationWarning>
          {cycle}
        </span>{" "}
        {zone}
      </span>

      <span className={divider} />

      <span className={label} suppressHydrationWarning>
        {date}
      </span>
    </Card>
  );
}

export default Time;
