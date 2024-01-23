import {
  faDiscord,
  faGithub,
  faInstagram,
  faSteam,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";

import Card from "@/components/home/Card";

import {
  container,
  icon as iconClass,
  label,
  media,
  name,
  title,
} from "@/styles/home/socials.css";

function Socials() {
  return (
    <Card title="socials" double className={container}>
      <Media icon={faDiscord} title="Discord" name="@icyuba" />
      <Media icon={faInstagram} title="Instagram" name="@icyuba_" />
      <Media icon={faGithub} title="GitHub" name="iCyuba" />
      <Media icon={faSteam} title="Steam" name="icyuba" />
    </Card>
  );
}

export default Socials;

interface MediaProps {
  icon: IconDefinition;
  title: string;
  name: string;
}

function Media(props: MediaProps) {
  return (
    <a className={media} href={`https://icy.cx/${props.title.toLowerCase()}`}>
      <FontAwesomeSvgIcon
        className={iconClass}
        icon={props.icon}
        width={40}
        height={40}
      />

      <div className={label}>
        <span className={title}>{props.title}</span>
        <span className={name}>{props.name}</span>
      </div>
    </a>
  );
}
