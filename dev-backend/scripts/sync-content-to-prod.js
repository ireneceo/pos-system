/**
 * One-shot content sync — dev → prod
 * UPSERT by slug+type. Preserves prod-only legacy content.
 * Used when --sync-content was forgotten during deploy.
 *
 * Usage (run from dev):
 *   node scripts/sync-content-to-prod.js --export    # writes /tmp/content_sync.json
 *   scp /tmp/content_sync.json irene@PROD:/tmp/
 *   ssh irene@PROD "cd /var/www/production-backend && node scripts/sync-content-to-prod.js --import"
 */
const fs = require('fs');
const m = require('../models');
const sequelize = m.User.sequelize;

const MODE = process.argv.includes('--import') ? 'import' : 'export';
const FILE = '/tmp/content_sync.json';

async function exportContent() {
  const [cats] = await sequelize.query('SELECT * FROM content_categories');
  const [contents] = await sequelize.query(
    "SELECT * FROM contents WHERE type IN ('faq','blog') AND status='published'"
  );
  fs.writeFileSync(FILE, JSON.stringify({ categories: cats, contents }, null, 2));
  console.log(`Exported ${cats.length} categories, ${contents.length} contents → ${FILE}`);
}

async function importContent() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  let catUpserts = 0, catInserts = 0;
  for (const c of data.categories) {
    const [exist] = await sequelize.query('SELECT id FROM content_categories WHERE id=?', { replacements: [c.id] });
    if (exist.length > 0) {
      await sequelize.query(
        'UPDATE content_categories SET name=?, slug=?, type=?, icon=?, is_active=?, sort_order=?, updated_at=NOW() WHERE id=?',
        { replacements: [c.name, c.slug, c.type, c.icon, c.is_active, c.sort_order, c.id] }
      );
      catUpserts++;
    } else {
      await sequelize.query(
        'INSERT INTO content_categories (id,name,slug,type,icon,is_active,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,NOW(),NOW())',
        { replacements: [c.id, c.name, c.slug, c.type, c.icon, c.is_active, c.sort_order] }
      );
      catInserts++;
    }
  }
  let contentUpserts = 0, contentInserts = 0;
  for (const ct of data.contents) {
    const [exist] = await sequelize.query('SELECT id FROM contents WHERE slug=? AND type=?', { replacements: [ct.slug, ct.type] });
    if (exist.length > 0) {
      await sequelize.query(
        'UPDATE contents SET category_id=?, title=?, content=?, excerpt=?, status=?, sort_order=?, updated_at=NOW() WHERE slug=? AND type=?',
        { replacements: [ct.category_id, ct.title, ct.content, ct.excerpt, ct.status, ct.sort_order, ct.slug, ct.type] }
      );
      contentUpserts++;
    } else {
      await sequelize.query(
        'INSERT INTO contents (category_id,type,status,title,content,excerpt,slug,sort_order,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),NOW())',
        { replacements: [ct.category_id, ct.type, ct.status, ct.title, ct.content, ct.excerpt, ct.slug, ct.sort_order] }
      );
      contentInserts++;
    }
  }
  console.log(`Categories: ${catInserts} inserted, ${catUpserts} updated`);
  console.log(`Contents: ${contentInserts} inserted, ${contentUpserts} updated`);
}

(async () => {
  try {
    if (MODE === 'export') await exportContent();
    else await importContent();
    await sequelize.close();
  } catch (e) {
    console.error('ERR:', e.message);
    process.exit(1);
  }
})();
