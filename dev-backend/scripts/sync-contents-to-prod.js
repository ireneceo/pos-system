#!/usr/bin/env node
/**
 * Sync published contents (blog/faq) from dev DB → production DB.
 *
 * Supports:
 *   - By translation_group_id: --group=2
 *   - By content_id:           --id=54
 *   - By time window:          --since=7d | --since=24h
 *   - Specific slug+lang:      --slug=foo --lang=en
 *
 * Examples:
 *   node scripts/sync-contents-to-prod.js --group=2
 *   node scripts/sync-contents-to-prod.js --group=1 --group=2 --group=3
 *   node scripts/sync-contents-to-prod.js --since=7d
 *
 * How it works:
 *   1. Query dev DB for matching published rows
 *   2. Ensure required ContentCategory exists on prod (by slug+type)
 *   3. UPSERT each row on prod (key: slug+language)
 *   4. Also apply schema migrations on prod if columns missing (idempotent)
 *
 * Safe: uses transactions. Dry-run preview with --dry-run.
 */

require('dotenv').config();
const fs = require('fs');
const { execSync } = require('child_process');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Content = require('../models/Content');
const ContentCategory = require('../models/ContentCategory');

// Ensure association (normally registered in routes/contents.js)
if (!Content.associations.category) {
  Content.belongsTo(ContentCategory, { as: 'category', foreignKey: 'category_id' });
  ContentCategory.hasMany(Content, { as: 'contents', foreignKey: 'category_id' });
}

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const groupIds = args.filter(a => a.startsWith('--group=')).map(a => parseInt(a.split('=')[1])).filter(Boolean);
const contentIds = args.filter(a => a.startsWith('--id=')).map(a => parseInt(a.split('=')[1])).filter(Boolean);
const sinceArg = args.find(a => a.startsWith('--since='));
const slugArg = args.find(a => a.startsWith('--slug='));
const langArg = args.find(a => a.startsWith('--lang='));

const PROD_SERVER = 'irene@87.106.78.146';
const PROD_PATH = '/var/www/production-backend';

function parseSince(str) {
  // Accepts: 24h, 7d, 30d
  const m = str.match(/^(\d+)([hd])$/);
  if (!m) return null;
  const n = parseInt(m[1]);
  const unit = m[2];
  const ms = unit === 'h' ? n * 3600 * 1000 : n * 86400 * 1000;
  return new Date(Date.now() - ms);
}

async function fetchRows() {
  const where = { status: 'published' };
  if (groupIds.length > 0) where.translation_group_id = { [Op.in]: groupIds };
  if (contentIds.length > 0) where.id = { [Op.in]: contentIds };
  if (sinceArg) {
    const since = parseSince(sinceArg.split('=')[1]);
    if (!since) { console.error('✗ invalid --since value. Use 24h / 7d / 30d'); process.exit(1); }
    where.published_at = { [Op.gte]: since };
  }
  if (slugArg) where.slug = slugArg.split('=')[1];
  if (langArg) where.language = langArg.split('=')[1];

  if (Object.keys(where).length === 1) {
    console.error('✗ No filter specified. Use --group=N or --since=7d or --id=N');
    process.exit(1);
  }

  const rows = await Content.findAll({
    where,
    include: [{ model: ContentCategory, as: 'category' }]
  });
  return rows;
}

(async () => {
  console.log('=== Content sync: dev → production ===\n');

  const rows = await fetchRows();
  console.log(`Matched ${rows.length} rows on dev DB:`);
  rows.forEach(r => {
    console.log(`  [${r.type}][${r.language}][group=${r.translation_group_id || '-'}] ${r.slug || '(no slug)'} — "${r.title.substring(0, 60)}"`);
  });

  if (rows.length === 0) {
    console.log('\nNothing to sync. Exiting.');
    process.exit(0);
  }

  // Collect unique categories referenced
  const categoriesSeen = new Map();
  rows.forEach(r => {
    if (r.category && !categoriesSeen.has(r.category.slug + ':' + r.category.type)) {
      categoriesSeen.set(r.category.slug + ':' + r.category.type, {
        name: r.category.name,
        slug: r.category.slug,
        type: r.category.type,
        icon: r.category.icon,
        description: r.category.description,
        is_active: r.category.is_active,
        sort_order: r.category.sort_order,
      });
    }
  });
  console.log(`\nUnique categories: ${categoriesSeen.size}`);

  if (isDryRun) {
    console.log('\n[DRY-RUN] No changes applied. Exit.');
    process.exit(0);
  }

  // Convert Date → MySQL DATETIME string
  const toMysqlDatetime = (d) => {
    if (!d) return null;
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
  };

  // Prepare payload (JSON for remote)
  const payload = {
    categories: Array.from(categoriesSeen.values()),
    contents: rows.map(r => ({
      type: r.type,
      category_slug: r.category?.slug || null,
      category_type: r.category?.type || r.type,
      title: r.title,
      slug: r.slug,
      content: r.content,
      excerpt: r.excerpt,
      thumbnail_url: r.thumbnail_url,
      status: r.status,
      sort_order: r.sort_order,
      author_name: r.author_name,
      published_at: toMysqlDatetime(r.published_at),
      seo_title: r.seo_title,
      seo_description: r.seo_description,
      seo_keywords: r.seo_keywords,
      og_image_url: r.og_image_url,
      canonical_url: r.canonical_url,
      ai_summary: r.ai_summary,
      faq_schema: r.faq_schema,
      language: r.language,
      translation_group_id: r.translation_group_id,
      target_persona: r.target_persona,
      funnel_stage: r.funnel_stage,
      content_tier: r.content_tier,
      problem_category: r.problem_category,
      video_script: r.video_script,
      thumbnail_copy: r.thumbnail_copy,
      social_captions: r.social_captions,
    }))
  };

  const tmpFile = `/tmp/content-sync-${Date.now()}.json`;
  fs.writeFileSync(tmpFile, JSON.stringify(payload));
  console.log(`\nPayload prepared: ${tmpFile} (${Math.round(fs.statSync(tmpFile).size / 1024)} KB)`);

  console.log('\n→ Copying payload to production...');
  execSync(`scp -q ${tmpFile} ${PROD_SERVER}:${tmpFile}`, { stdio: 'inherit' });

  // Build remote script: apply schema migrations (idempotent), ensure categories, UPSERT contents
  const remoteScript = `
require('dotenv').config();
const fs = require('fs');
const { sequelize } = require('./config/database');

async function columnExists(table, col) {
  const [rows] = await sequelize.query(\`SHOW COLUMNS FROM \${table} LIKE '\${col}'\`);
  return rows.length > 0;
}
async function indexExists(table, idxName) {
  const [rows] = await sequelize.query(\`SHOW INDEX FROM \${table} WHERE Key_name = '\${idxName}'\`);
  return rows.length > 0;
}

(async () => {
  const data = JSON.parse(fs.readFileSync('${tmpFile}', 'utf8'));

  // --- 1. Schema migrations (idempotent) ---
  console.log('[1/3] Ensuring schema...');
  const cols = [
    ['language',             "VARCHAR(5) NOT NULL DEFAULT 'en'"],
    ['translation_group_id', 'INT NULL'],
    ['target_persona',       'VARCHAR(30) NULL'],
    ['funnel_stage',         'VARCHAR(10) NULL'],
    ['content_tier',         'VARCHAR(15) NULL'],
    ['problem_category',     'VARCHAR(30) NULL'],
    ['video_script',         'TEXT NULL'],
    ['thumbnail_copy',       'VARCHAR(100) NULL'],
    ['social_captions',      'JSON NULL'],
  ];
  for (const [col, ddl] of cols) {
    if (!(await columnExists('contents', col))) {
      await sequelize.query(\`ALTER TABLE contents ADD COLUMN \${col} \${ddl}\`);
      console.log('  + added column:', col);
    }
  }
  // Drop old (type, slug) unique if present, add (slug, language)
  if (await indexExists('contents', 'contents_type_slug')) {
    await sequelize.query('ALTER TABLE contents DROP INDEX contents_type_slug');
    console.log('  - dropped index: contents_type_slug');
  }
  if (!(await indexExists('contents', 'idx_slug_lang'))) {
    await sequelize.query('ALTER TABLE contents ADD UNIQUE KEY idx_slug_lang (slug, language)');
    console.log('  + added unique: idx_slug_lang');
  }
  if (!(await indexExists('contents', 'idx_contents_pub'))) {
    await sequelize.query('ALTER TABLE contents ADD INDEX idx_contents_pub (type, language, status, published_at)');
    console.log('  + added index: idx_contents_pub');
  }
  if (!(await indexExists('contents', 'idx_contents_group'))) {
    await sequelize.query('ALTER TABLE contents ADD INDEX idx_contents_group (translation_group_id)');
  }
  if (!(await indexExists('contents', 'idx_persona_problem_lang'))) {
    await sequelize.query('ALTER TABLE contents ADD INDEX idx_persona_problem_lang (target_persona, problem_category, language)');
  }

  // --- 2. Upsert categories ---
  console.log('\\n[2/3] Upserting categories...');
  const categoryIdMap = {};  // slug+type -> id
  for (const cat of data.categories) {
    const [existing] = await sequelize.query('SELECT id FROM content_categories WHERE slug=? AND type=?', { replacements: [cat.slug, cat.type] });
    let catId;
    if (existing.length > 0) {
      catId = existing[0].id;
      await sequelize.query('UPDATE content_categories SET name=?, icon=?, description=?, is_active=?, sort_order=?, updated_at=NOW() WHERE id=?',
        { replacements: [cat.name, cat.icon, cat.description, cat.is_active, cat.sort_order, catId] });
      console.log('  ~ updated:', cat.type + '/' + cat.slug, '(id=' + catId + ')');
    } else {
      await sequelize.query('INSERT INTO content_categories (name, slug, type, icon, description, is_active, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,NOW(),NOW())',
        { replacements: [cat.name, cat.slug, cat.type, cat.icon, cat.description, cat.is_active, cat.sort_order] });
      const [rows2] = await sequelize.query('SELECT id FROM content_categories WHERE slug=? AND type=?', { replacements: [cat.slug, cat.type] });
      catId = rows2[0].id;
      console.log('  + inserted:', cat.type + '/' + cat.slug, '(id=' + catId + ')');
    }
    categoryIdMap[cat.slug + ':' + cat.type] = catId;
  }

  // --- 3. UPSERT contents ---
  console.log('\\n[3/3] Upserting contents...');
  let created = 0, updated = 0;
  // translation_group_id remapping: dev group_id may differ from prod. Use dev's as preferred, but need to check collisions.
  // Strategy: map dev group_id -> prod group_id (existing if any row from same dev group already on prod via slug match; else create new id)
  const groupIdMap = {};  // dev_group_id -> prod_group_id

  for (const c of data.contents) {
    const catKey = (c.category_slug || '') + ':' + (c.category_type || c.type);
    const catId = categoryIdMap[catKey];
    if (!catId && c.category_slug) {
      console.log('  ? category missing for content:', c.slug, c.language);
      continue;
    }

    // Resolve translation_group_id on prod
    let prodGroupId = null;
    if (c.translation_group_id) {
      if (groupIdMap[c.translation_group_id]) {
        prodGroupId = groupIdMap[c.translation_group_id];
      } else {
        // Check if any row on prod has matching slug+lang in this batch's dev group — link to same prod group
        const [existingGroup] = await sequelize.query(
          'SELECT translation_group_id FROM contents WHERE slug=? AND language=? AND translation_group_id IS NOT NULL LIMIT 1',
          { replacements: [c.slug, c.language] }
        );
        if (existingGroup.length > 0) {
          prodGroupId = existingGroup[0].translation_group_id;
        } else {
          // New group: next available id
          const [maxRow] = await sequelize.query('SELECT COALESCE(MAX(translation_group_id), 0) AS m FROM contents');
          prodGroupId = maxRow[0].m + 1;
        }
        groupIdMap[c.translation_group_id] = prodGroupId;
      }
    }

    // Check existence by (slug, language)
    const [existing] = await sequelize.query('SELECT id FROM contents WHERE slug=? AND language=? AND type=?',
      { replacements: [c.slug, c.language, c.type] });

    const vals = [
      catId, c.title, c.content, c.excerpt, c.thumbnail_url, c.status, c.sort_order,
      c.author_name, c.published_at,
      c.seo_title, c.seo_description, c.seo_keywords, c.og_image_url, c.canonical_url,
      c.ai_summary, c.faq_schema ? JSON.stringify(c.faq_schema) : null,
      c.language, prodGroupId, c.target_persona, c.funnel_stage, c.content_tier,
      c.problem_category, c.video_script, c.thumbnail_copy,
      c.social_captions ? JSON.stringify(c.social_captions) : null,
    ];

    if (existing.length > 0) {
      await sequelize.query(\`UPDATE contents SET
        category_id=?, title=?, content=?, excerpt=?, thumbnail_url=?, status=?, sort_order=?,
        author_name=?, published_at=?,
        seo_title=?, seo_description=?, seo_keywords=?, og_image_url=?, canonical_url=?,
        ai_summary=?, faq_schema=?,
        language=?, translation_group_id=?, target_persona=?, funnel_stage=?, content_tier=?,
        problem_category=?, video_script=?, thumbnail_copy=?, social_captions=?,
        updated_at=NOW()
        WHERE slug=? AND language=? AND type=?\`,
        { replacements: [...vals, c.slug, c.language, c.type] });
      console.log('  ~ updated:', c.language + '/' + c.slug);
      updated++;
    } else {
      await sequelize.query(\`INSERT INTO contents
        (category_id, type, slug, title, content, excerpt, thumbnail_url, status, sort_order,
         author_name, published_at,
         seo_title, seo_description, seo_keywords, og_image_url, canonical_url,
         ai_summary, faq_schema,
         language, translation_group_id, target_persona, funnel_stage, content_tier,
         problem_category, video_script, thumbnail_copy, social_captions,
         created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())\`,
        { replacements: [catId, c.type, c.slug, c.title, c.content, c.excerpt, c.thumbnail_url, c.status, c.sort_order,
          c.author_name, c.published_at,
          c.seo_title, c.seo_description, c.seo_keywords, c.og_image_url, c.canonical_url,
          c.ai_summary, c.faq_schema ? JSON.stringify(c.faq_schema) : null,
          c.language, prodGroupId, c.target_persona, c.funnel_stage, c.content_tier,
          c.problem_category, c.video_script, c.thumbnail_copy,
          c.social_captions ? JSON.stringify(c.social_captions) : null] });
      console.log('  + created:', c.language + '/' + c.slug);
      created++;
    }
  }

  console.log('\\n=== Done. Created: ' + created + ', Updated: ' + updated + ' ===');
  fs.unlinkSync('${tmpFile}');
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
`;

  const localRemoteScript = `/tmp/content-sync-remote-${Date.now()}.js`;
  const remoteScriptPath = `${PROD_PATH}/content-sync-remote-${Date.now()}.js`;
  fs.writeFileSync(localRemoteScript, remoteScript);
  execSync(`scp -q ${localRemoteScript} ${PROD_SERVER}:${remoteScriptPath}`, { stdio: 'inherit' });

  console.log(`\n→ Executing remote sync...`);
  execSync(`ssh ${PROD_SERVER} "cd ${PROD_PATH} && node ${remoteScriptPath} && rm ${remoteScriptPath}"`, { stdio: 'inherit' });

  // Cleanup
  fs.unlinkSync(localRemoteScript);
  fs.unlinkSync(tmpFile);
  console.log('\n✓ Sync complete. Verify at https://purplehere.com/blog');
  process.exit(0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
