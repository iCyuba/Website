import { style } from "@vanilla-extract/css";

import { colors } from "@/styles/theme.css";

export const container = style({
  display: "flex",

  gap: "1rem",
  alignItems: "center",
  justifyContent: "space-evenly",

  "@media": {
    "(max-width: 32rem) or (max-height: 32rem)": {
      gap: "0.25rem",
    },
  },
});

export const media = style({
  display: "flex",

  flexDirection: "column",
  gap: "0.25rem",
  alignItems: "center",

  textDecoration: "none",
  color: colors.fg[1],
});

export const icon = style({
  width: "2.5rem",
  height: "2.5rem",

  "@media": {
    "(max-width: 32rem) or (max-height: 32rem)": {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
});

export const label = style({
  display: "flex",

  flexDirection: "column",
  alignItems: "center",
});

export const title = style({
  margin: 0,

  fontSize: "1.125em",
  fontWeight: 900,
});

export const name = style({
  margin: 0,

  fontSize: "0.9em",
  fontWeight: 600,

  color: colors.fg[2],
});
