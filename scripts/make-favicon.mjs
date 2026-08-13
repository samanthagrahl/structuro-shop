import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#1c2433"/>
  <text x="16" y="22.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', Times, serif" font-size="14" font-weight="700" fill="#f7f4ee">C<tspan fill="#3d6b78">&amp;</tspan>S</text>
</svg>`;

const input = Buffer.from(svg);

async function pngAt(size) {
  return sharp(input).resize(size, size).png().toBuffer();
}

function icoFromRgba(width, height, rgba) {
  const xorSize = width * height * 4;
  const andRow = Math.ceil(width / 32) * 4;
  const andSize = andRow * height;
  const headerSize = 40;
  const imageSize = headerSize + xorSize + andSize;

  const dib = Buffer.alloc(imageSize);
  dib.writeUInt32LE(40, 0);
  dib.writeInt32LE(width, 4);
  dib.writeInt32LE(height * 2, 8);
  dib.writeUInt16LE(1, 12);
  dib.writeUInt16LE(32, 14);
  dib.writeUInt32LE(0, 16);
  dib.writeUInt32LE(xorSize + andSize, 20);

  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const src = (srcY * width + x) * 4;
      const dst = headerSize + (y * width + x) * 4;
      dib[dst] = rgba[src + 2];
      dib[dst + 1] = rgba[src + 1];
      dib[dst + 2] = rgba[src];
      dib[dst + 3] = rgba[src + 3];
    }
  }

  return dib;
}

async function icoFromSizes(sizes) {
  const images = [];
  for (const size of sizes) {
    const { data } = await sharp(input)
      .resize(size, size)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    images.push({ size, dib: icoFromRgba(size, size, data) });
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const dirs = [];
  const bodies = [];
  for (const image of images) {
    const dir = Buffer.alloc(16);
    dir[0] = image.size === 256 ? 0 : image.size;
    dir[1] = image.size === 256 ? 0 : image.size;
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(image.dib.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirs.push(dir);
    bodies.push(image.dib);
    offset += image.dib.length;
  }

  return Buffer.concat([header, ...dirs, ...bodies]);
}

const png32 = await pngAt(32);
const png16 = await pngAt(16);
writeFileSync("public/favicon-32x32.png", png32);
writeFileSync("public/favicon-16x16.png", png16);
writeFileSync("public/favicon.ico", await icoFromSizes([16, 32]));
console.log("wrote classic BMP favicon.ico plus PNG fallbacks");
