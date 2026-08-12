/**
 * Maakt het clubwapen vrijstaand: de witte achtergrond wordt transparant,
 * zodat het wapen op de donkere balk staat zonder wit blok eromheen.
 *
 * De vulling start alléén vanaf de rand en loopt naar binnen tot ze op de
 * donkere omtrek stuit. Een simpele "alle witte pixels weg" zou ook het wit
 * ín het wapen wegnemen: de panelen van de bal, de maan en ster, en de
 * letters van RANGERS.
 *
 * Gebruik: node scripts/logo-vrijstaand.mjs <bron> <doel>
 */
import sharp from "sharp";

const [, , source, target] = process.argv;
if (!source || !target) {
  console.error("gebruik: node scripts/logo-vrijstaand.mjs <bron> <doel>");
  process.exit(1);
}

// Pixels boven deze drempel gelden als achtergrond; daaronder begint de omtrek.
const WHITE = 236;
// Rand-pixels die nog lichtgrijs zijn krijgen deels doorzichtigheid, anders
// blijft er een lichte halo om het wapen hangen.
const HALO = 205;

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const at = (x, y) => (y * width + x) * channels;
const isLight = (i, cutoff) =>
  data[i] >= cutoff && data[i + 1] >= cutoff && data[i + 2] >= cutoff;

const background = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  queue.push([x, 0], [x, height - 1]);
}
for (let y = 0; y < height; y++) {
  queue.push([0, y], [width - 1, y]);
}

while (queue.length) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;
  const index = y * width + x;
  if (background[index]) continue;
  if (!isLight(at(x, y), WHITE)) continue;

  background[index] = 1;
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

let cleared = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const index = y * width + x;
    const i = at(x, y);

    if (background[index]) {
      data[i + 3] = 0;
      cleared++;
      continue;
    }

    // Nog opaak, maar grenst aan achtergrond en is bleek: zachte rand maken.
    const touchesBackground =
      (x > 0 && background[index - 1]) ||
      (x < width - 1 && background[index + 1]) ||
      (y > 0 && background[index - width]) ||
      (y < height - 1 && background[index + width]);

    if (touchesBackground && isLight(i, HALO)) {
      const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i + 3] = Math.round(255 * (1 - (lightness - HALO) / (255 - HALO)));
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .trim() // witruimte rond het wapen wegsnijden
  .png({ compressionLevel: 9 })
  .toFile(target);

const pct = ((cleared / (width * height)) * 100).toFixed(1);
console.log(`achtergrond weggehaald: ${pct}% van het beeld → ${target}`);
