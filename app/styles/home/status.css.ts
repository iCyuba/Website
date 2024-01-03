import { style } from "@vanilla-extract/css";

export const container = style({
  display: "grid",

  placeItems: "center",

  width: "100%",
  height: "100%",

  paddingBottom: "0.25em",
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

export const fail = style({
  fontWeight: 500,
  marginInline: "0.25em",
  textAlign: "center",
});
