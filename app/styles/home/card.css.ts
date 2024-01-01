import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { color } from "@/styles/color";

const width = createVar();
const rows = createVar();
export const container = style({
  vars: {
    [width]: "12rem",
    [rows]: "4",
  },

  display: "grid",

  gridTemplateColumns: `repeat(${rows}, ${width})`,
  gridAutoRows: "8rem",

  gap: "1rem",

  padding: "1rem",
  paddingLeft: "calc(1rem + env(safe-area-inset-left))",
  paddingRight: "calc(1rem + env(safe-area-inset-right))",

  zIndex: 2,

  "@media": {
    "(max-width: 64rem)": {
      vars: {
        [rows]: "2",
      },
    },

    "(max-width: 32rem) or (max-height: 32rem)": {
      vars: {
        [width]: "8rem",
      },

      fontSize: "0.75rem",
      gridAutoRows: "6rem",
    },
  },
});

export const card = recipe({
  base: {
    display: "flex",
    flexDirection: "column",

    padding: "0.125rem 0.25rem",

    backgroundColor: `color-mix(in srgb, ${color[300]}, ${color[100]})`,
    color: color[500],

    border: `0.25rem solid ${color[300]}`,
    borderRadius: "0.5rem",
  },

  variants: {
    double: { true: { gridColumn: "span 2" } },
  },
});

export const title = style({
  margin: 0,

  fontSize: "1.125rem",
  fontWeight: 800,
  fontVariantCaps: "small-caps",
  textTransform: "lowercase",

  color: color[400],

  transform: "translateY(-0.25rem)",
});
