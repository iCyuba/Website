import type { ReactNode } from "react";

import { card, title } from "@/styles/home/card.css";

interface CardProps {
  title: ReactNode;
  children?: ReactNode;
  double?: boolean;
  className?: string;
}

function Card(props: CardProps) {
  return (
    <div className={card({ double: props.double })}>
      <h2 className={title}>{props.title}</h2>

      <div className={props.className}>{props.children}</div>
    </div>
  );
}

export default Card;
