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
  name as nameClass,
  title as titleClass,
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

function Media({ icon, title, name }: MediaProps) {
  return (
    <a className={media} href={`https://icy.cx/${title.toLowerCase()}`}>
      <FontAwesomeSvgIcon
        className={iconClass}
        icon={icon}
        width={40}
        height={40}
      />

      <div className={label}>
        <span className={titleClass}>{title}</span>
        <span className={nameClass}>{name}</span>
      </div>
    </a>
  );
}
