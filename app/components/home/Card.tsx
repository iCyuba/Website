import { card, title } from "@/styles/home/card.css";

interface CardProps {
  title: string;
  children?: React.ReactNode;
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
