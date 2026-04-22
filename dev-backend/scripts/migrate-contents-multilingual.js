/**
 * Migration: Add multilingual + marketing metadata columns to contents table.
 *
 * Adds:
 *   - language VARCHAR(5) DEFAULT 'en'
 *   - translation_group_id INT NULL
 *   - target_persona VARCHAR(30) NULL
 *   - funnel_stage VARCHAR(10) NULL
 *   - content_tier VARCHAR(15) NULL
 *
 * Index changes:
 *   - drops contents_type_slug (type, slug) unique
 *   - adds idx_slug_lang (slug, language) unique
 *   - adds idx_contents_pub (type, language, status, published_at)
 *   - adds idx_contents_group (translation_group_id)
 *
 * Backfill: all existing rows set to language='en'
 *
 * Idempotent — safe to re-run.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

async function columnExists(table, col) {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM ${table} LIKE '${col}'`);
  return rows.length > 0;
}

async function indexExists(table, idxName) {
  const [rows] = await sequelize.query(`SHOW INDEX FROM ${table} WHERE Key_name = '${idxName}'`);
  return rows.length > 0;
}

(async () => {
  console.log('=== Contents multilingual migration ===\n');

  // 1. Add columns
  const cols = [
    { name: 'language', ddl: "ADD COLUMN language VARCHAR(5) NOT NULL DEFAULT 'en' COMMENT 'ISO 639-1 2-letter code (en/ms/zh/ko)'" },
    { name: 'translation_group_id', ddl: "ADD COLUMN translation_group_id INT NULL COMMENT 'Links translated versions of the same article'" },
    { name: 'target_persona', ddl: "ADD COLUMN target_persona VARCHAR(30) NULL COMMENT 'restaurant_owner / brand_general / foodcourt_operator / owner'" },
    { name: 'funnel_stage', ddl: "ADD COLUMN funnel_stage VARCHAR(10) NULL COMMENT 'TOFU / MOFU / BOFU'" },
    { name: 'content_tier', ddl: "ADD COLUMN content_tier VARCHAR(15) NULL COMMENT 'pillar / cluster / tactical / case_study / news_jack'" },
  ];
  for (const c of cols) {
    if (await columnExists('contents', c.name)) {
      console.log(`  = column exists: ${c.name}`);
    } else {
      await sequelize.query(`ALTER TABLE contents ${c.ddl}`);
      console.log(`  + added column: ${c.name}`);
    }
  }

  // 2. Backfill language='en' for existing rows (where null/empty)
  const [result] = await sequelize.query("UPDATE contents SET language = 'en' WHERE language IS NULL OR language = ''");
  console.log(`\n  backfill language='en': affected rows = ${result.affectedRows || 0}`);

  // 3. Drop old (type, slug) unique; add (slug, language) unique
  if (await indexExists('contents', 'contents_type_slug')) {
    await sequelize.query('ALTER TABLE contents DROP INDEX contents_type_slug');
    console.log('  - dropped index: contents_type_slug');
  } else {
    console.log('  = already dropped: contents_type_slug');
  }

  if (await indexExists('contents', 'idx_slug_lang')) {
    console.log('  = index exists: idx_slug_lang');
  } else {
    // Note: blog slugs are unique, faq slugs are typically null — only enforce uniqueness when slug is present.
    // MySQL NULL values are allowed in unique index (treated as distinct).
    await sequelize.query('ALTER TABLE contents ADD UNIQUE KEY idx_slug_lang (slug, language)');
    console.log('  + added unique index: idx_slug_lang (slug, language)');
  }

  // 4. Composite index for public listing queries
  if (await indexExists('contents', 'idx_contents_pub')) {
    console.log('  = index exists: idx_contents_pub');
  } else {
    await sequelize.query('ALTER TABLE contents ADD INDEX idx_contents_pub (type, language, status, published_at)');
    console.log('  + added index: idx_contents_pub');
  }

  // 5. translation_group_id index
  if (await indexExists('contents', 'idx_contents_group')) {
    console.log('  = index exists: idx_contents_group');
  } else {
    await sequelize.query('ALTER TABLE contents ADD INDEX idx_contents_group (translation_group_id)');
    console.log('  + added index: idx_contents_group');
  }

  // 6. Verification summary
  const [summary] = await sequelize.query('SELECT language, type, COUNT(*) AS count FROM contents GROUP BY language, type ORDER BY language, type');
  console.log('\n=== Post-migration summary ===');
  summary.forEach(r => console.log(`  ${r.language} | ${r.type} | ${r.count} rows`));

  console.log('\nDone.');
  process.exit(0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
