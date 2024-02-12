import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { colors } from "@/styles/theme.css";

export const chart = style({
  display: "grid",

  height: "100%",

  gridTemplateRows: "repeat(7, 1fr)",
  gridAutoFlow: "column",
  placeItems: "center",
});

export const level = createVar();
export const day = recipe({
  base: {
    width: "0.75rem",
    aspectRatio: "1/1",

    backgroundColor: level,
    borderRadius: "0.125em",

    "@media": {
      "(max-width: 32rem) or (max-height: 32rem)": {
        width: "0.5rem",
      },
    },
  },

  variants: {
    level: {
      0: { backgroundColor: colors.fg[3] },
      1: { backgroundColor: colors.chart[1] },
      2: { backgroundColor: colors.chart[2] },
      3: { backgroundColor: colors.chart[3] },
      4: { backgroundColor: colors.chart[4] },
    },
  },
});
