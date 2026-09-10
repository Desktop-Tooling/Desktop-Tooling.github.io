import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_ORIGIN = "https://desktop-tooling.github.io";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

const STATIC_ROUTES = [
  "/",
  "/news",
  "/demos",
  "/demos/thumbelina",
  "/demos/thumbelina/both",
  "/demos/thumbelina/installed",
  "/demos/thumbelina/live-iso",
];

function collectNewsSlugs() {
  const newsTs = join(rootDir, "src", "lib", "news.ts");
  if (!existsSync(newsTs)) return [];
  const text = readFileSync(newsTs, "utf8");
  return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

export function getPrerenderRoutes() {
  const newsRoutes = collectNewsSlugs().map((slug) => `/news/${slug}`);
  return [...new Set([...STATIC_ROUTES, ...newsRoutes])];
}
