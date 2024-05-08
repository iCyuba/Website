import { vitePlugin as remix } from "@remix-run/dev";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import crypto from "crypto";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [remix(), tsconfigPaths(), vanillaExtractPlugin()],

  css: {
    devSourcemap: true,
    modules: {
      generateScopedName(...args: string[]) {
        let hash = crypto
          .createHash("md5")
          .update(args.join(":"))
          .digest("base64url");

        hash = `${hash}_${hash}`;
        while (hash[0] === "-" || (hash[0] >= "0" && hash[0] <= "9")) {
          hash = hash.slice(1);
        }
        hash = hash.slice(0, 5);

        return command === "serve" ? `${args[0]}_${hash}` : hash;
      },

      localsConvention: "camelCaseOnly" as const,
    },
  },

  // Using lightningcss, because it can transform `color-mix()` to a hex value.
  build: { sourcemap: true, cssMinify: "lightningcss" as const },

  esbuild: {
    mangleProps: /[^_]_$/,
  },
}));
