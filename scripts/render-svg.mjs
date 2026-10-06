// Uso: node scripts/render-svg.mjs <input.svg> <output.png> <size>
import sharp from "sharp";

const [, , input, output, size] = process.argv;
await sharp(input, { density: 600 }).resize(Number(size), Number(size)).png().toFile(output);
