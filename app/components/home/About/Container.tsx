import Socials from "@/components/home/About/Socials";
import Time from "@/components/home/About/Time";
import Card from "@/components/home/Card";

import { container } from "@/styles/home/card.css";

function About() {
  return (
    <div className={container}>
      <Time />

      {/* Placeholder */}
      <Card title="status" />

      <Socials />
    </div>
  );
}

export default About;
