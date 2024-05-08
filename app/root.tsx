import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import fontUrl from "inter-ui/variable-latin/InterVariable-subset.woff2?url";

import "@/styles/global.scss";
import { slateTheme } from "@/styles/theme.css";

export default function App() {
  return (
    <html lang="en" className={slateTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Preload Inter Variable font */}
        <link
          rel="preload"
          href={fontUrl}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <Meta />
        <Links />
      </head>

      <body>
        <Outlet />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
