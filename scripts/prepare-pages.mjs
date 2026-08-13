import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const indexHtml = join(dist, "index.html");

if (!existsSync(indexHtml)) {
  console.error("dist/index.html missing – run vite build first.");
  process.exit(1);
}

// SPA fallback for unknown paths (still HTTP 404, but app boots in browsers)
copyFileSync(indexHtml, join(dist, "404.html"));

// Known routes as real files so GitHub Pages returns HTTP 200
// (needed for WAVE, crawlers, and shared links)
const spaRoutes = ["impressum", "datenschutz"];

for (const route of spaRoutes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, join(dir, "index.html"));
  // Pretty URL without trailing slash
  copyFileSync(indexHtml, join(dist, `${route}.html`));
}

console.log(
  `Prepared Pages fallbacks: 404.html + ${spaRoutes.join(", ")} (dir + .html)`,
);
