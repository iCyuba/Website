import Socials from "@/components/home/About/Socials";
import Status from "@/components/home/About/Status";
import Time from "@/components/home/About/Time";

import { container } from "@/styles/home/card.module.scss";

function About() {
  return (
    <div className={container}>
      <Time />

      <Status />

      <Socials />
    </div>
  );
}

export default About;
