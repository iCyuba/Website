import { createTheme } from "@vanilla-extract/css";
import { blue, emerald, neutral, rose, sky, slate } from "tailwindcss/colors";

export const [slateTheme, colors] = createTheme({
  bg: {
    1: slate[100],
    2: `color-mix(in srgb, ${slate[300]}, ${slate[100]})`,
  },

  fg: {
    1: slate[500],
    2: slate[400],
    3: slate[300],
  },
});

export const pinkTheme = createTheme(colors, {
  bg: {
    1: rose[100],
    2: rose[200],
  },

  fg: {
    1: `color-mix(in srgb, ${rose[600]}, ${rose[500]})`,
    2: `color-mix(in srgb, ${rose[500]}, ${rose[400]})`,
    3: `color-mix(in srgb, ${rose[300]}, ${rose[200]})`,
  },
});

/* Looks ugly */
// export const yellowTheme = createTheme(colors, {
//   bg: {
//     1: amber[100],
//     2: `color-mix(in srgb, ${yellow[300]}, ${stone[100]})`,
//   },

//   fg: {
//     1: `color-mix(in srgb, ${yellow[600]}, ${yellow[500]} 75%)`,
//     2: yellow[500],
//     3: yellow[300],
//   },
// });

export const greenTheme = createTheme(colors, {
  bg: {
    1: `color-mix(in srgb, ${emerald[100]}, ${emerald[50]} 75%)`,
    2: `color-mix(in srgb, ${emerald[200]}, ${neutral[200]} 25%)`,
  },

  fg: {
    1: emerald[600],
    2: emerald[500],
    3: `color-mix(in hsl, ${emerald[400]}, ${emerald[300]})`,
  },
});

export const blueTheme = createTheme(colors, {
  bg: {
    1: sky[100],
    2: `color-mix(in srgb, ${blue[300]}, ${sky[100]})`,
  },

  fg: {
    1: blue[500],
    2: blue[400],
    3: blue[300],
  },
});
