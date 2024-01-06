import { style } from "@vanilla-extract/css";

import { color } from "@/styles/color";

export const container = style({
  display: "grid",

  placeItems: "center",

  width: "100%",
  height: "100%",

  paddingTop: "0.25em",
  paddingBottom: "0.5em",
});

export const icon = style({
  width: "0.8em",

  marginInline: "0.25em",
});

export const status = style({
  fontWeight: 700,
  fontSize: "1.5em",
  textTransform: "capitalize",
});

export const lastOnline = style({
  display: "flex",

  flexDirection: "column",
  gap: "0.25em",

  width: "100%",
});

export const lastOnlineLabel = style({
  color: color[400],

  fontWeight: 800,
  fontVariant: "small-caps",
  textTransform: "lowercase",
});

export const lastOnlineValue = style({
  fontWeight: 700,
  paddingInline: "0.375em",
});

export const fail = style({
  fontWeight: 500,
  marginInline: "0.25em",
  textAlign: "center",
});
