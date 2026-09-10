import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getPrerenderRoutes, SITE_ORIGIN } from "./site-routes.mjs";

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toLoc(origin, route) {
  if (route === "/") return `${origin}/`;
  return `${origin}${route}`;
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, ".output", "public");
const locs = [...new Set(getPrerenderRoutes().map((r) => toLoc(SITE_ORIGIN, r)))];
const body = locs.map((loc) => `  <url><loc>${escapeXml(loc)}</loc></url>`).join("\n");

writeFileSync(
  join(pub, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);
writeFileSync(
  join(pub, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
);
