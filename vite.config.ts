import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import codegen from "vite-plugin-graphql-codegen";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    vanillaExtractPlugin(),

    // Graphql codegen
    codegen({
      config: {
        overwrite: true,
        schema: "https://docs.github.com/public/schema.docs.graphql",
        documents: "./app/**/*.ts",
        generates: {
          "app/generated/gql/": { preset: "client-preset" },
        },
      },
    }),
  ],

  // Using lightningcss, because it can transform `color-mix()` to a hex value.
  build: { sourcemap: true, cssMinify: "lightningcss" },
});
