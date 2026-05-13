// Migrate base64 inline images stored in DB to disk files + URL columns.
// Targets:
//   - ingredients.image_url   (data:image/...;base64,... → /uploads/ingredients/...)
//   - company_settings.og_image_url (→ /uploads/site/...)
// Idempotent — already-URL values are skipped.
// Run: node scripts/migrate-base64-images.js [--dry-run]

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');

async function decodeBase64(value) {
  if (!value || typeof value !== 'string') return null;
  if (!value.startsWith('data:image/')) return null;
  const m = value.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!m) return null;
  return { mime: m[1].toLowerCase(), buffer: Buffer.from(m[2], 'base64') };
}

async function saveBuffer(decoded, dir, basename, { maxWidth = 600, maxHeight = 600, quality = 90 } = {}) {
  await fs.mkdir(dir, { recursive: true });
  if (decoded.mime === 'svg+xml' || decoded.mime === 'svg') {
    const p = path.join(dir, `${basename}.svg`);
    await fs.writeFile(p, decoded.buffer);
    return p;
  }
  const out = await sharp(decoded.buffer)
    .resize(maxWidth, maxHeight, { fit: 'inside', withoutEnlargement: true })
    .png({ quality })
    .toBuffer();
  const p = path.join(dir, `${basename}.png`);
  await fs.writeFile(p, out);
  return p;
}

async function migrateIngredients() {
  console.log('\n=== ingredients.image_url ===');
  const [rows] = await sequelize.query(
    `SELECT id, restaurant_id, brand_id, image_url FROM ingredients WHERE image_url LIKE 'data:image/%'`
  );
  console.log('candidates:', rows.length);
  let ok = 0, failed = 0;
  for (const r of rows) {
    const decoded = await decodeBase64(r.image_url);
    if (!decoded) { console.log('  [skip-invalid] id=' + r.id); continue; }
    const scope = r.restaurant_id ? `rest${r.restaurant_id}` : `brand${r.brand_id || 0}`;
    const basename = `ingredient_${scope}_${r.id}_${Date.now()}`;
    const dir = '/var/www/uploads/ingredients';
    if (DRY) {
      console.log('  [dry] id=' + r.id + ' → ' + path.join(dir, basename) + ' (' + Math.round(decoded.buffer.length / 1024) + 'KB raw)');
      continue;
    }
    try {
      const fullPath = await saveBuffer(decoded, dir, basename);
      const url = '/uploads/ingredients/' + path.basename(fullPath);
      await sequelize.query(`UPDATE ingredients SET image_url = ? WHERE id = ?`, { replacements: [url, r.id] });
      const stat = await fs.stat(fullPath);
      console.log('  [ok]  id=' + r.id + ' → ' + url + ' (' + Math.round(stat.size / 1024) + 'KB)');
      ok++;
    } catch (e) {
      console.error('  [err] id=' + r.id + ' ' + e.message);
      failed++;
    }
  }
  console.log('ingredients: ok=' + ok + ' failed=' + failed);
}

async function migrateCompanySettings() {
  console.log('\n=== company_settings.og_image_url ===');
  const [rows] = await sequelize.query(
    `SELECT id, og_image_url FROM company_settings WHERE og_image_url LIKE 'data:image/%'`
  );
  console.log('candidates:', rows.length);
  let ok = 0, failed = 0;
  for (const r of rows) {
    const decoded = await decodeBase64(r.og_image_url);
    if (!decoded) { console.log('  [skip-invalid] id=' + r.id); continue; }
    const basename = `og_image_${r.id}_${Date.now()}`;
    const dir = '/var/www/uploads/site';
    if (DRY) {
      console.log('  [dry] id=' + r.id + ' (' + Math.round(decoded.buffer.length / 1024) + 'KB raw)');
      continue;
    }
    try {
      const fullPath = await saveBuffer(decoded, dir, basename, { maxWidth: 1200, maxHeight: 1200 });
      const url = '/uploads/site/' + path.basename(fullPath);
      await sequelize.query(`UPDATE company_settings SET og_image_url = ? WHERE id = ?`, { replacements: [url, r.id] });
      const stat = await fs.stat(fullPath);
      console.log('  [ok]  id=' + r.id + ' → ' + url + ' (' + Math.round(stat.size / 1024) + 'KB)');
      ok++;
    } catch (e) {
      console.error('  [err] id=' + r.id + ' ' + e.message);
      failed++;
    }
  }
  console.log('company_settings: ok=' + ok + ' failed=' + failed);
}

async function cleanupBrokenProductImages() {
  console.log('\n=== products.image — clear references to missing files ===');
  const [rows] = await sequelize.query(
    `SELECT id, name, image FROM products WHERE image LIKE '/uploads/products/%'`
  );
  let cleared = 0, kept = 0;
  for (const r of rows) {
    try {
      const fullPath = '/var/www' + r.image;
      await fs.stat(fullPath);
      kept++;
    } catch (e) {
      if (DRY) {
        console.log('  [dry-clear] id=' + r.id + ' missing: ' + r.image);
      } else {
        await sequelize.query(`UPDATE products SET image = NULL WHERE id = ?`, { replacements: [r.id] });
        console.log('  [ok-clear] id=' + r.id + ' (' + r.name + ') missing: ' + r.image);
      }
      cleared++;
    }
  }
  console.log('products: cleared=' + cleared + ' kept=' + kept);
}

(async () => {
  console.log(DRY ? '*** DRY RUN ***' : '*** APPLY ***');
  await migrateIngredients();
  await migrateCompanySettings();
  await cleanupBrokenProductImages();
  console.log('\nDone.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
