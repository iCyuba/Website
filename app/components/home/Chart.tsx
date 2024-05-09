import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useLoaderData } from "@remix-run/react";

import { cls } from "@/lib/cls";
import { time, useCurrentTime } from "@/lib/currentTime";
import type { loader } from "@/routes/_index";

import Card from "@/components/home/Card";
import Icon from "@/components/Icon";

import { container, icon } from "@/styles/home/card.module.scss";
import * as styles from "@/styles/home/chart.module.scss";
import { chart, old } from "@/styles/home/chart.module.scss";

const dayStyles = [
  styles.day,
  styles.day1,
  styles.day2,
  styles.day3,
  styles.day4,
];

/** 27 weeks, on mobile only 26 will be shown */
export const DAYS = 27 * 7;

function Title() {
  return (
    <>
      chart
      <Icon className={icon} fa={faGithub} width="1rem" />
    </>
  );
}

function getDaySnapshot(t = time) {
  return t.getDay();
}

const getServerDaySnapshot = () => getDaySnapshot(new Date());

function Chart() {
  const today = useCurrentTime(getDaySnapshot, getServerDaySnapshot);
  const data = useLoaderData<typeof loader>();

  return (
    <div className={container} style={{ ["--columns"]: "2" } as object}>
      <Card title={<Title />} double className={chart}>
        {/* Length = All days - days in the future */}
        {Array.from({ length: DAYS - 6 + today }).map((_, i) => (
          <span
            className={cls(dayStyles[data.chart[i]], i < 7 && old)}
            suppressHydrationWarning
            key={i}
          />
        ))}
      </Card>
    </div>
  );
}

export default Chart;
