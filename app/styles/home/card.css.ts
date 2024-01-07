import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { colors } from "@/styles/theme.css";

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

    backgroundColor: colors.bg[2],
    color: colors.fg[1],

    border: `0.25rem solid ${colors.fg[3]}`,
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

  color: colors.fg[2],

  transform: "translateY(-0.25rem)",
});
