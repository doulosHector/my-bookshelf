/**
 * Generates the PWA icons from the app's design tokens, with no image
 * dependencies: a tiny RGB rasterizer plus a minimal PNG encoder.
 *
 * Run with: npm run icons
 */
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const BACKGROUND = "#1E4E5F";
// Three spines, echoing the empty-shelf motif of the app.
const SPINES = ["#F4F4F1", "#DBE3E6", "#8A6A34"];

const hexToRgb = (hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

// ---------- raster ----------
function createCanvas(size, background) {
  const pixels = Buffer.alloc(size * size * 3);
  const [r, g, b] = hexToRgb(background);
  for (let i = 0; i < size * size; i++) {
    pixels[i * 3] = r;
    pixels[i * 3 + 1] = g;
    pixels[i * 3 + 2] = b;
  }
  return { size, pixels };
}

function fillRect(canvas, x0, y0, width, height, color) {
  const [r, g, b] = hexToRgb(color);
  const xEnd = Math.min(canvas.size, Math.round(x0 + width));
  const yEnd = Math.min(canvas.size, Math.round(y0 + height));
  for (let y = Math.max(0, Math.round(y0)); y < yEnd; y++) {
    for (let x = Math.max(0, Math.round(x0)); x < xEnd; x++) {
      const offset = (y * canvas.size + x) * 3;
      canvas.pixels[offset] = r;
      canvas.pixels[offset + 1] = g;
      canvas.pixels[offset + 2] = b;
    }
  }
}

// ---------- PNG encoding ----------
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng({ size, pixels }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // color type: truecolor RGB
  // bytes 10-12: compression, filter and interlace methods, all zero

  // Each scanline is prefixed with its filter type (0 = none).
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 3 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * size * 3, (y + 1) * size * 3);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---------- icon ----------
/**
 * @param {number} size
 * @param {number} scale fraction of the canvas the artwork may use; maskable
 *   icons keep it small so nothing is cropped by the launcher's mask.
 */
function drawIcon(size, scale) {
  const canvas = createCanvas(size, BACKGROUND);
  const artWidth = size * scale;
  const gap = artWidth * 0.09;
  const spineWidth = (artWidth - gap * (SPINES.length - 1)) / SPINES.length;
  const maxHeight = size * scale * 1.15;
  const left = (size - artWidth) / 2;

  SPINES.forEach((color, index) => {
    // Slightly uneven heights, like books leaning on a shelf.
    const height = maxHeight * [1, 0.86, 0.94][index];
    const x = left + index * (spineWidth + gap);
    fillRect(canvas, x, (size - maxHeight) / 2 + (maxHeight - height), spineWidth, height, color);
  });

  return encodePng(canvas);
}

const ICONS = [
  { file: "pwa-192x192.png", size: 192, scale: 0.56 },
  { file: "pwa-512x512.png", size: 512, scale: 0.56 },
  { file: "maskable-512x512.png", size: 512, scale: 0.42 },
  { file: "apple-touch-icon.png", size: 180, scale: 0.5 },
];

for (const { file, size, scale } of ICONS) {
  writeFileSync(join(PUBLIC_DIR, file), drawIcon(size, scale));
  console.log(`✓ public/${file} (${size}×${size})`);
}
