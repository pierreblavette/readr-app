import sharp from "sharp";
import { readFile } from "node:fs/promises";

const MASTER   = await readFile("public/brand/app-icon-master.svg");
const IOS      = await readFile("public/brand/app-icon-ios.svg");
const MASKABLE = await readFile("public/brand/maskable-master.svg");

const targets = [
  // Favicon + PWA Android `any` : rounded master (#0D0F1A R on white, rx 200).
  { src: MASTER,   out: "app/icon.png",                  size: 512 },
  { src: MASTER,   out: "public/icon-192.png",           size: 192 },
  { src: MASTER,   out: "public/icon-512.png",           size: 512 },
  // iOS Apple touch : square full-bleed — iOS applies its own squircle mask.
  { src: IOS,      out: "app/apple-icon.png",            size: 180 },
  // Android adaptive maskable : square full-bleed, R inside the 80% safe zone.
  { src: MASKABLE, out: "public/icon-maskable-512.png",  size: 512 },
];

for (const { src, out, size } of targets) {
  await sharp(src, { density: 512 }).resize(size, size).png().toFile(out);
  console.log(`✓ ${out} (${size}×${size})`);
}
