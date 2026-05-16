import sharp from "sharp";
import { readFile } from "node:fs/promises";

const APP_ICON = await readFile("public/brand/app-icon-master.svg");
const FAVICON  = await readFile("public/brand/favicon-master.svg");

const targets = [
  { src: FAVICON,  out: "app/icon.png",        size: 512 },
  { src: APP_ICON, out: "app/apple-icon.png",  size: 180 },
  { src: APP_ICON, out: "public/icon-192.png", size: 192 },
  { src: APP_ICON, out: "public/icon-512.png", size: 512 },
];

for (const { src, out, size } of targets) {
  await sharp(src, { density: 512 }).resize(size, size).png().toFile(out);
  console.log(`✓ ${out} (${size}×${size})`);
}
