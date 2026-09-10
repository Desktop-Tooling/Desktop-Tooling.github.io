import { defineConfig } from "@solidjs/start/config";
import { getPrerenderRoutes } from "./scripts/site-routes.mjs";

export default defineConfig({
  server: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: getPrerenderRoutes(),
    },
  },
});
