import { ComponentProps, ComponentType } from "react";

import Discord from "@/assets/discord.svg?react";
import GitHub from "@/assets/github.svg?react";
import Instagram from "@/assets/instagram.svg?react";
import Steam from "@/assets/steam.svg?react";

import Card from "@/components/home/Card";

import {
  container,
  icon,
  label,
  media,
  name,
  title,
} from "@/styles/home/socials.css";

function Socials() {
  return (
    <Card title="socials" double className={container}>
      <Media icon={Discord} title="Discord" name="@icyuba" />
      <Media icon={Instagram} title="Instagram" name="@icyuba_" />
      <Media icon={GitHub} title="GitHub" name="iCyuba" />
      <Media icon={Steam} title="Steam" name="icyuba" />
    </Card>
  );
}

export default Socials;

interface MediaProps {
  icon: ComponentType<ComponentProps<"svg">>;
  title: string;
  name: string;
}

function Media({ icon: Icon, ...props }: MediaProps) {
  return (
    <a className={media} href={`https://icy.cx/${props.title.toLowerCase()}`}>
      <Icon className={icon} width={40} height={40} />

      <div className={label}>
        <span className={title}>{props.title}</span>
        <span className={name}>{props.name}</span>
      </div>
    </a>
  );
}
