import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { colors } from "@/styles/theme.css";

const width = createVar();
export const columns = createVar();

export const container = style({
  vars: {
    [width]: "12rem",
    [columns]: "4",
  },

  display: "grid",

  gridTemplateColumns: `repeat(${columns}, ${width})`,
  gridAutoRows: "8rem",

  gap: "1em",

  margin: "1em",
  marginLeft: "calc(1em + env(safe-area-inset-left))",
  marginRight: "calc(1em + env(safe-area-inset-right))",

  zIndex: 2,

  "@media": {
    "(max-width: 64rem)": {
      vars: {
        [columns]: "2",
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
    gap: "0.125em",

    padding: "0.125rem 0.25rem",

    backgroundColor: colors.bg[2],
    color: colors.fg[1],

    border: `0.25rem solid ${colors.fg[3]}`,
    borderRadius: "0.5rem",
  },

  variants: {
    double_: { true: { gridColumn: "span 2" } },
  },
});

export const title = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.25em",

  margin: 0,

  fontSize: "1.125rem",
  lineHeight: "1em",
  fontWeight: 800,
  fontVariantCaps: "small-caps",
  textTransform: "lowercase",

  color: colors.fg[2],

  transform: "translateY(-0.25rem)",
});

export const icon = style({
  height: "0.75em",

  transform: "translateY(0.0625em)",
});
