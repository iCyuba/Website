import type { ReactNode } from "react";

import { card, title as titleClass } from "@/styles/home/card.css";

interface CardProps {
  title: ReactNode;
  children?: ReactNode;
  double?: boolean;
  className?: string;
}

function Card({ title, children, double, className }: CardProps) {
  return (
    <div className={card({ double_: double })}>
      <h2 className={titleClass}>{title}</h2>

      <div className={className}>{children}</div>
    </div>
  );
}

export default Card;
