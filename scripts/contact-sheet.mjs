// Builds labelled contact sheets of source-assets/originals for visual review.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'source-assets/originals';
const OUT = 'source-assets/sheets';
fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f)).sort();
const COLS = 6, ROWS = 4, T = 250, LAB = 34;
const per = COLS * ROWS;
const index = [];
for (let s = 0; s * per < files.length; s++) {
  const chunk = files.slice(s * per, (s + 1) * per);
  const comps = [];
  for (let i = 0; i < chunk.length; i++) {
    const f = chunk[i];
    const n = s * per + i;
    index.push(`${n}\t${f}`);
    let buf;
    try {
      buf = await sharp(path.join(SRC, f)).resize(T, T, { fit: 'contain', background: '#cccccc' }).flatten({ background: '#cccccc' }).jpeg({ quality: 70 }).toBuffer();
    } catch (e) {
      buf = await sharp({ create: { width: T, height: T, channels: 3, background: '#ff0000' } }).jpeg().toBuffer();
      index[index.length - 1] += '\tUNREADABLE ' + e.message;
    }
    const x = (i % COLS) * T, y = Math.floor(i / COLS) * (T + LAB);
    comps.push({ input: buf, left: x, top: y });
    const label = `<svg width="${T}" height="${LAB}"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="14" font-size="13" font-family="Arial" fill="#000">${n}</text><text x="4" y="29" font-size="9" font-family="Arial" fill="#444">${f.slice(-34).replace(/&/g, '&amp;')}</text></svg>`;
    comps.push({ input: Buffer.from(label), left: x, top: y + T });
  }
  await sharp({ create: { width: COLS * T, height: ROWS * (T + LAB), channels: 3, background: '#fff' } })
    .composite(comps).jpeg({ quality: 75 }).toFile(path.join(OUT, `sheet-${String(s).padStart(2, '0')}.jpg`));
}
fs.writeFileSync(path.join(OUT, 'index.tsv'), index.join('\n'));
console.log(files.length, 'files,', Math.ceil(files.length / per), 'sheets');
