/**
 * Zet een clubfoto om naar een webversie.
 *
 * De originelen komen rechtstreeks uit de camera: 6000 pixels breed en zeven
 * tot negen megabyte per stuk. Zo'n bestand op de pagina zetten kost een
 * bezoeker op mobiel data en seconden, terwijl er nooit meer dan ~2400 pixels
 * getoond wordt. Dit script schaalt bij en comprimeert.
 *
 *   node scripts/foto-web.mjs bronbestanden/fotos/DSC_4907.JPG terrein-tribune
 *   node scripts/foto-web.mjs bronbestanden/fotos/DSC_4907.JPG terrein-tribune 1600
 *
 * Resultaat: public/images/<naam>.jpg, plus <naam>-klein.jpg voor plekken waar
 * de foto niet schermbreed staat.
 */
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

const [, , source, name, widthArg] = process.argv;

if (!source || !name) {
  console.error("gebruik: node scripts/foto-web.mjs <bronbestand> <naam> [breedte]");
  process.exit(1);
}

if (!fs.existsSync(source)) {
  console.error(`bronbestand niet gevonden: ${source}`);
  process.exit(1);
}

const width = Number.parseInt(widthArg ?? "2400", 10);
const outputDir = "public/images";
fs.mkdirSync(outputDir, { recursive: true });

async function write(targetWidth, suffix) {
  const target = path.join(outputDir, `${name}${suffix}.jpg`);
  const meta = await sharp(source).metadata();

  await sharp(source)
    // Nooit opschalen: een kleine bron oprekken maakt hem alleen zachter.
    .resize({ width: Math.min(targetWidth, meta.width ?? targetWidth) })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target);

  const kb = (fs.statSync(target).size / 1024).toFixed(0);
  console.log(`${target} — ${kb} kB`);
}

const original = (fs.statSync(source).size / 1024 / 1024).toFixed(1);
console.log(`bron: ${source} (${original} MB)`);

await write(width, "");
await write(Math.round(width * 0.58), "-klein");
