import { style } from "@vanilla-extract/css";

import { color } from "@/styles/color";

export const button = style({
  display: "flex",

  gap: "0.5em",
  alignItems: "center",
  justifyContent: "center",

  padding: "0.5em 1em",

  border: "0.2em solid currentColor",
  borderBottomWidth: "0.3em",
  borderRadius: "0.5em",

  backgroundColor: "transparent",
  color: color[500],

  cursor: "pointer",

  ":focus": {
    outline: "none",
    boxShadow: "0 0 0 0.25em rgba(0, 0, 0, 0.25)",
  },

  "@media": {
    "(max-width: 32rem) or (max-height: 32rem)": {
      gap: "0.25em",
      padding: "0.25em 0.75em",
    },
  },
});
