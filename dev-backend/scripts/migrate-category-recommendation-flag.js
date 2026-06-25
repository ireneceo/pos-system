/**
 * Migration (#11c 모바일 크로스셀): categories.is_recommendation_source 컬럼 추가.
 * 설계: docs/MOBILE_ADDON_CROSS_SELL.md §2.2
 *   NULL = 자동감지(이름 키워드) / 1 = 강제 추천 카테고리 / 0 = 강제 제외.
 *
 * 안전:
 *   - 새 nullable 컬럼만. 기존 데이터 미수정. 멱등(INFORMATION_SCHEMA 체크).
 *   - sync --alter 의존 금지([[reference_sync_alter_drops_columns]]). 인쇄 무관.
 *   - process.exit 필수.
 * 사용: node scripts/migrate-category-recommendation-flag.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-category-recommendation-flag] Starting...');
    const [cols] = await sequelize.query("SHOW COLUMNS FROM categories LIKE 'is_recommendation_source'");
    if (cols.length > 0) {
      console.log('  ✓ categories.is_recommendation_source already exists —', cols[0].Type);
    } else {
      console.log('  Adding categories.is_recommendation_source (TINYINT(1) NULL)...');
      await sequelize.query("ALTER TABLE categories ADD COLUMN is_recommendation_source TINYINT(1) NULL DEFAULT NULL");
      console.log('  ✓ categories.is_recommendation_source column added');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
