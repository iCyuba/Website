import type { ReactNode } from "react";

import { cls } from "@/lib/cls";

import {
  card,
  cardDouble,
  title as titleClass,
} from "@/styles/home/card.module.scss";

interface CardProps {
  title: ReactNode;
  children?: ReactNode;
  double?: boolean;
  className?: string;
}

function Card({ title, children, double, className }: CardProps) {
  return (
    <div className={cls(card, double && cardDouble)}>
      <h2 className={titleClass}>{title}</h2>

      <div className={className}>{children}</div>
    </div>
  );
}

export default Card;
