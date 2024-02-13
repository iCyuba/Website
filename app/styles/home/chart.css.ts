import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { colors } from "@/styles/theme.css";

const size = createVar();
export const chart = style({
  vars: {
    [size]: "0.75rem",
  },

  display: "grid",
  gap: "0.125em",

  height: "100%",
  margin: "auto",

  gridTemplateRows: `repeat(7, ${size})`,
  gridAutoColumns: size,
  gridAutoFlow: "column",

  "@media": {
    "(max-width: 32rem) or (max-height: 32rem)": {
      vars: {
        [size]: "0.5rem",
      },
    },
  },
});

export const level = createVar();
export const day = recipe({
  base: {
    width: "100%",
    height: "100%",

    backgroundColor: level,
    borderRadius: "0.125em",
  },

  variants: {
    level: {
      0: { backgroundColor: colors.fg[3] },
      1: { backgroundColor: colors.chart[1] },
      2: { backgroundColor: colors.chart[2] },
      3: { backgroundColor: colors.chart[3] },
      4: { backgroundColor: colors.chart[4] },
    },

    old: {
      // Don't render old days on small screens
      true: {
        "@media": {
          "(max-width: 32rem) or (max-height: 32rem)": {
            display: "none",
          },
        },
      },
    },
  },
});
