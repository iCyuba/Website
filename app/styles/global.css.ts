import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  width: "100%",
  height: "100%",

  margin: 0,
  padding: 0,

  fontFamily: "'Inter', sans-serif",
  fontFeatureSettings: "'tnum'",

  "@supports": {
    "(font-variation-settings: normal)": {
      fontFamily: "'InterVariable', sans-serif",
    },
  },
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});
