import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [remix(), tsconfigPaths(), vanillaExtractPlugin(), svgr()],

  // Using lightningcss, because it can transform `color-mix()` to a hex value.
  build: { sourcemap: true, cssMinify: "lightningcss" },
});