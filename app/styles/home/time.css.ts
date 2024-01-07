import { style } from "@vanilla-extract/css";

import { colors } from "@/styles/theme.css";

export const container = style({
  display: "flex",

  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "100%",
});

export const label = style({
  fontWeight: 500,
});

export const time = style({
  fontSize: "1.75em",
  fontWeight: 700,
});

export const cycle = style({
  fontSize: "1.25em",
  fontWeight: 600,
});

export const divider = style({
  width: "90%",
  height: "0.25em",

  marginBlock: "0.25em",

  backgroundColor: colors.fg[2],
  borderRadius: "0.5em",
});
