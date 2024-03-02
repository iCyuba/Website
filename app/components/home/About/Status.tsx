import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useLoaderData } from "@remix-run/react";
import { Status as StatusEnum, toDisplayStatus } from "discord-status";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";

import { useStatus } from "@/lib/status";
import { useTimeDifference } from "@/lib/timeDiff";
import type { loader } from "@/routes/_index";

import Card from "@/components/home/Card";

import { button } from "@/styles/components/button.css";
import { icon } from "@/styles/home/card.css";
import {
  container,
  fail,
  lastOnline as lastOnlineClass,
  lastOnlineLabel,
  lastOnlineValue,
  status as statusClass,
} from "@/styles/home/status.css";

function Title() {
  return (
    <>
      status
      <FontAwesomeSvgIcon className={icon} icon={faDiscord} width="1rem" />
    </>
  );
}

function Status() {
  const data = useLoaderData<typeof loader>();
  const { status, lastOnline, connect } = useStatus(data);

  const formattedLastOnline = useTimeDifference(lastOnline);

  if (!status)
    return (
      <Card title={<Title />} className={container}>
        <span className={fail}>Status failed to load.</span>

        <button onClick={connect} className={button}>
          Retry
        </button>
      </Card>
    );

  return (
    <Card title={<Title />} className={container}>
      <span className={statusClass}>{toDisplayStatus(status)}</span>

      {(status === StatusEnum.Offline || status === StatusEnum.Away) && (
        <div className={lastOnlineClass}>
          <span className={lastOnlineLabel}>Last online:</span>

          <span className={lastOnlineValue} suppressHydrationWarning>
            {formattedLastOnline}
          </span>
        </div>
      )}
    </Card>
  );
}

export default Status;
