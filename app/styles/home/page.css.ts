import { globalStyle, style } from "@vanilla-extract/css";

import { colors } from "@/styles/theme.css";

export const home = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  alignItems: "safe center",
  justifyContent: "safe center",

  minWidth: "100%",
  width: "max-content",
  minHeight: "100%",

  backgroundColor: colors.bg[1],

  "::before": {
    content: "''",

    position: "fixed",
    display: "block",

    inset: 0,
    left: "auto",

    width: "2.5rem",

    backgroundColor: "#fff",

    zIndex: 1,
  },

  "::after": {
    content: "''",

    position: "fixed",
    display: "block",

    inset: 0,
    right: "2.5rem",
    left: "auto",

    borderBottom: "100vh solid transparent",
    borderBottomWidth: "100dvh", // Newer browsers
    borderRight: "7.5rem solid #fff",

    zIndex: 1,
  },

  "@media": {
    "(max-width: 64rem) or (max-height: 36rem)": {
      gap: "0.5rem",
    },

    "(max-width: 64rem)": {
      "::before": {
        left: 0,
        bottom: "auto",

        width: "auto",
        height: "2.5rem",
      },

      "::after": {
        left: 0,
        right: 0,
        top: "2.5rem",
        bottom: "auto",

        borderTop: "2.5rem solid #fff",
        borderRight: "100vw solid transparent",
        borderRightWidth: "100dvw",
        borderBottom: "none",
      },
    },
  },
});

globalStyle(`${home} ::selection`, {
  backgroundColor: colors.fg[2],
  color: "#fff",
});

export const title = style({
  margin: 0,

  fontSize: "8rem",
  fontWeight: 900,

  color: colors.fg[1],

  zIndex: 2,

  "@media": {
    "(max-height: 36rem)": {
      fontSize: "6.5rem",
    },

    "(max-width: 32rem) or (max-height: 32rem)": {
      fontSize: "5rem",
    },
  },
});

export const divider = style({
  content: "''",
  display: "block",

  width: "35rem",
  height: "0.25rem",

  backgroundColor: colors.fg[2],
  borderRadius: "0.5rem",

  "@media": {
    "(max-width: 64rem) or (max-height: 36rem)": {
      width: "25rem",

      transform: "unset",
    },

    "(max-width: 32rem) or (max-height: 32rem)": {
      width: "15rem",
    },
  },
});
