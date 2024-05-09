import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /* FontAwesome icon definition */
  fa: IconDefinition;
}

/**
 * Minimal svg icon component for FontAwesome icons.
 * Inspired by `react-fontawesome-svg-icon` but with no additional functionality.
 */
function Icon({
  fa: {
    icon: [w, h, _, __, paths],
  },
  ...rest
}: IconProps) {
  paths = Array.isArray(paths) ? paths : [paths];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      fill="currentColor"
      {...rest}
    >
      {paths.map((path, i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  );
}

export default Icon;
