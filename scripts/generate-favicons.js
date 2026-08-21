/**
 * generate-favicons.js
 * Run once:  node scripts/generate-favicons.js
 * Requires:  npm install --save-dev sharp
 *
 * Outputs:
 *   public/apple-touch-icon.png  (180×180)
 *   public/favicon-32.png        (32×32)
 *   public/favicon-16.png        (16×16)
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svgPath = resolve(root, 'public', 'favicon.svg');

const svg = readFileSync(svgPath);

const targets = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'favicon-32.png',       size: 32  },
  { file: 'favicon-16.png',       size: 16  },
];

for (const { file, size } of targets) {
  const out = resolve(root, 'public', file);
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(out);
  console.log(`✓  ${file}  (${size}×${size})`);
}
