import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useLoaderData } from "@remix-run/react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";

import { time, useCurrentTime } from "@/lib/currentTime";
import type { loader } from "@/routes/_index";

import Card from "@/components/home/Card";

import { columns, container, icon } from "@/styles/home/card.css";
import { chart, day } from "@/styles/home/chart.css";

/** 27 weeks, on mobile only 26 will be shown */
export const DAYS = 27 * 7;

function Title() {
  return (
    <>
      chart
      <FontAwesomeSvgIcon className={icon} icon={faGithub} width="1rem" />
    </>
  );
}

function getDaySnapshot() {
  return time.getDay();
}

function Chart() {
  const today = useCurrentTime(getDaySnapshot);
  const data = useLoaderData<typeof loader>();

  return (
    <div className={container} style={assignInlineVars({ [columns]: "2" })}>
      <Card title={<Title />} double className={chart}>
        {/* Length = All days - days in the future */}
        {Array.from({ length: DAYS - 7 + (today ? today : 7) }).map((_, i) => (
          <span
            className={day({ level_: data.chart[i], old_: i < 7 })}
            key={i}
          />
        ))}
      </Card>
    </div>
  );
}

export default Chart;
