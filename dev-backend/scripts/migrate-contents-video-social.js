/**
 * Migration: Add simplified distribution fields.
 *
 * video_prompt (LONGTEXT) — Full AI video production prompt including:
 *   - Scene-by-scene descriptions
 *   - Voice-over script
 *   - Text overlays per timestamp
 *   - Thumbnail = first frame spec
 *   - Visual style guide
 *
 * social_post (JSON) — Unified package for ALL social platforms (FB/LinkedIn/Threads/YouTube/TikTok):
 *   { title: string, body: string, hashtags: string[] }
 *
 * Keeps legacy video_script / thumbnail_copy / social_captions columns for backward compat.
 * Frontend UI now only renders video_prompt + social_post.
 *
 * Idempotent.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

async function columnExists(table, col) {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM ${table} LIKE '${col}'`);
  return rows.length > 0;
}

(async () => {
  console.log('=== Video prompt + social post migration ===\n');

  if (!(await columnExists('contents', 'video_prompt'))) {
    await sequelize.query("ALTER TABLE contents ADD COLUMN video_prompt LONGTEXT NULL COMMENT 'Full AI video production prompt — scene, VO, overlays, thumbnail, style'");
    console.log('  + added column: video_prompt');
  } else {
    console.log('  = column exists: video_prompt');
  }

  if (!(await columnExists('contents', 'social_post'))) {
    await sequelize.query("ALTER TABLE contents ADD COLUMN social_post JSON NULL COMMENT 'Unified social package: { title, body, hashtags[] }'");
    console.log('  + added column: social_post');
  } else {
    console.log('  = column exists: social_post');
  }

  console.log('\nDone.');
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
