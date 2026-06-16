import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// "AV" logo matching the header's text-gradient.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="20%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#bfc7ff"/>
      <stop offset="100%" stop-color="#808fff"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="#07070D"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-weight="900"
        font-size="300" letter-spacing="-14" fill="url(#g)">AV</text>
</svg>`;

const file = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

// SVG (vector, used as the primary favicon — crisp and supported by Chrome/Firefox/Safari).
await writeFile(file("favicon.svg"), svg, "utf8");

// Raster fallbacks generated from the same SVG.
const raster = sharp(Buffer.from(svg), { density: 384 }).resize(512, 512);
await raster.clone().png().toFile(file("favicon.png"));
await raster.clone().webp({ quality: 95 }).toFile(file("favicon.webp"));

console.log("Wrote favicon.svg, favicon.png and favicon.webp to /public");
