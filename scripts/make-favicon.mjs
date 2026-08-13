import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#1c2433"/>
  <text x="16" y="22" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" font-weight="700" fill="#f7f4ee">C<tspan fill="#3d6b78">&amp;</tspan>S</text>
</svg>`;

const input = Buffer.from(svg);
const png32 = await sharp(input).resize(32, 32).png().toBuffer();
const png16 = await sharp(input).resize(16, 16).png().toBuffer();

writeFileSync("public/favicon-32x32.png", png32);
writeFileSync("public/favicon-16x16.png", png16);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const dir = Buffer.alloc(16);
dir[0] = 32;
dir[1] = 32;
dir[2] = 0;
dir[3] = 0;
dir.writeUInt16LE(1, 4);
dir.writeUInt16LE(32, 6);
dir.writeUInt32LE(png32.length, 8);
dir.writeUInt32LE(22, 12);

writeFileSync("public/favicon.ico", Buffer.concat([header, dir, png32]));
console.log("favicon.ico, favicon-16x16.png, favicon-32x32.png written");
