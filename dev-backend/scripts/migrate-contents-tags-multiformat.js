/**
 * Migration: Add tag taxonomy + multi-format fields to contents.
 *
 * Adds:
 *   - problem_category VARCHAR(30)  — 문제 분류 태그
 *   - video_script TEXT              — 15-30초 짧은 영상 스크립트 (Hook/Problem/Solution/CTA)
 *   - thumbnail_copy VARCHAR(100)    — SNS 썸네일용 짧은 카피
 *   - social_captions JSON           — { linkedin, instagram, twitter, tiktok }
 *
 * Index: (target_persona, problem_category, language) for filter queries.
 *
 * Idempotent.
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
  console.log('=== Contents tag+multiformat migration ===\n');

  const cols = [
    { name: 'problem_category', ddl: "ADD COLUMN problem_category VARCHAR(30) NULL COMMENT 'operations/customer_experience/data_decisions/management/organization/automation'" },
    { name: 'video_script', ddl: "ADD COLUMN video_script TEXT NULL COMMENT 'Short-form video script (15-30s): hook/problem/solution/cta'" },
    { name: 'thumbnail_copy', ddl: "ADD COLUMN thumbnail_copy VARCHAR(100) NULL COMMENT 'Punchy copy for SNS thumbnails'" },
    { name: 'social_captions', ddl: "ADD COLUMN social_captions JSON NULL COMMENT 'Per-platform captions'" },
  ];
  for (const c of cols) {
    if (await columnExists('contents', c.name)) {
      console.log(`  = exists: ${c.name}`);
    } else {
      await sequelize.query(`ALTER TABLE contents ${c.ddl}`);
      console.log(`  + added: ${c.name}`);
    }
  }

  if (!(await indexExists('contents', 'idx_persona_problem_lang'))) {
    await sequelize.query('ALTER TABLE contents ADD INDEX idx_persona_problem_lang (target_persona, problem_category, language)');
    console.log('  + index: idx_persona_problem_lang');
  } else {
    console.log('  = index exists: idx_persona_problem_lang');
  }

  console.log('\nDone.');
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
