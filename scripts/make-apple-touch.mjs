import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#1c2433"/>
  <text x="90" y="112" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="600" fill="#f7f4ee">C<tspan fill="#3d6b78">&amp;</tspan>S</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/apple-touch-icon.png");
writeFileSync("scripts/.apple-touch-done", "ok");
console.log("apple-touch-icon.png written");
