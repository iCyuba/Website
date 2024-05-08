import { createTheme } from "@vanilla-extract/css";
import { blue, emerald, neutral, rose, sky, slate } from "tailwindcss/colors";

export const colors = {
  bg: {
    1: "var(--bg-1)",
    2: "var(--bg-2)",
  },

  fg: {
    1: "var(--fg-1)",
    2: "var(--fg-2)",
    3: "var(--fg-3)",
  },

  chart: {
    1: "var(--chart-1)",
    2: "var(--chart-2)",
    3: "var(--chart-3)",
    4: "var(--chart-4)",
  },
} as const;

export const slateTheme = createTheme(colors, {
  bg: {
    1: slate[100],
    2: `color-mix(in srgb, ${slate[300]}, ${slate[100]})`,
  },

  fg: {
    1: slate[500],
    2: slate[400],
    3: slate[300],
  },

  chart: {
    1: `color-mix(in srgb, ${slate[400]}, ${slate[300]})`,
    2: `color-mix(in srgb, ${slate[500]} 25%, ${slate[400]})`,
    3: slate[500],
    4: `color-mix(in srgb, ${slate[700]} 25%, ${slate[600]})`,
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

  chart: {
    1: `color-mix(in srgb, ${rose[400]} 25%, ${rose[300]})`,
    2: `color-mix(in srgb, ${rose[500]}, ${rose[400]})`,
    3: rose[600],
    4: rose[700],
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
    3: `color-mix(in srgb, ${emerald[400]} 25%, ${emerald[300]})`,
  },

  chart: {
    1: `color-mix(in srgb, ${emerald[500]}, ${emerald[400]})`,
    2: `color-mix(in srgb, ${emerald[600]} 66%, ${emerald[500]})`,
    3: `color-mix(in srgb, ${emerald[700]}, ${emerald[600]})`,
    4: emerald[800],
  },
});

export const blueTheme = createTheme(colors, {
  bg: {
    1: sky[100],
    2: `color-mix(in srgb, ${blue[300]}, ${sky[100]})`,
  },

  fg: {
    1: blue[600],
    2: `color-mix(in srgb, ${blue[500]}, ${blue[400]})`,
    3: blue[300],
  },

  chart: {
    1: blue[400],
    2: `color-mix(in srgb, ${blue[600]} 33%, ${blue[500]})`,
    3: `color-mix(in srgb, ${blue[700]}, ${blue[600]})`,
    4: blue[800],
  },
});
