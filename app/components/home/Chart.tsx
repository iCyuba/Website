import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useLoaderData } from "@remix-run/react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { memo } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";

import type { Level } from "@/lib/contributions.server";
import { useCurrentTime } from "@/lib/currentTime";
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

function Chart() {
  const today = useCurrentTime().getDay();
  const data = useLoaderData<typeof loader>();

  return (
    <div className={container} style={assignInlineVars({ [columns]: "2" })}>
      <Card title={<Title />} double className={chart}>
        {data.chart.map((level, i) => (
          <Day
            key={i}
            level={level}
            enabled={i < DAYS - 7 || i % 7 <= today}
            number={i}
          />
        ))}
      </Card>
    </div>
  );
}

const Day = memo(function Day({
  level,
  enabled,
  number,
}: {
  level: Level;
  enabled: boolean;
  number: number;
}) {
  if (!enabled) return null;

  return (
    <span
      className={day({ level, old: number < 7 })}
    />
  );
});

export default Chart;
