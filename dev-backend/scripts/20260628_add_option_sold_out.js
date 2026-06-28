/**
 * 2026-06-28 (2-1): options.sold_out 컬럼 추가 (옵션 품절 — 상품 soldOut 과 동일 개념).
 * 멱등(idempotent). 운영은 sync --alter 안 돎 → 전용 마이그(배포 목록 등록). process.exit() 필수.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function columnExists(table, col) {
  const r = await sequelize.query(
    `SELECT 1 x FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name=:table AND column_name=:col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0;
}

(async () => {
  try {
    if (await columnExists('options', 'sold_out')) {
      console.log('[migrate-option-soldout] options.sold_out 이미 존재 — skip');
    } else {
      await sequelize.query('ALTER TABLE options ADD COLUMN sold_out TINYINT(1) NOT NULL DEFAULT 0');
      console.log('[migrate-option-soldout] options.sold_out 추가 완료');
    }
    process.exit(0);
  } catch (e) {
    console.error('[migrate-option-soldout] ERROR', e.message);
    process.exit(1);
  }
})();
