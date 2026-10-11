'use strict';
/**
 * 브랜드 매니저 범위 — «회사 브랜드 전체» 칸 + 매니저×브랜드 연결표 (2026-10-11)
 * 판정: backups/fable-pending/fable-verdict-20261011-brand-manager-scope.md §2-1 (C안 · Irene «권고대로 진행해 줘»)
 *
 *  - users.brand_scope_all TINYINT(1) NOT NULL DEFAULT 0 — Brand Manager 만 의미. 1 = 홈 브랜드 소유자의 브랜드 전부.
 *  - brand_manager_brands(user_id, brand_id) — 부분 배정. users.brand_id(홈 브랜드)는 그대로 둔다(기존 판정 무회귀).
 *  - 백필: 기존 Brand Manager 는 «전체 아니오 + 홈 브랜드 1행» — 지금 보이는 범위 그대로.
 *
 * ⚠ registry `deploy` **맨 앞** — User 모델에 칸이 생기므로, 뒤 마이그가 User 를 읽기 전에 칸이 있어야 한다
 *   (2026-10-11 배포 실패: 칸 추가가 뒤에 있어 앞 마이그가 Unknown column 으로 멈췄다).
 *   그래서 이 스크립트는 모델을 쓰지 않고 raw SQL 만 쓴다. 멱등.
 *
 * Usage: node scripts/migrate-brand-manager-scope-20261011.js
 */
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [[col]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'brand_scope_all'`
    );
    if (Number(col.c)) {
      console.log('- users.brand_scope_all already exists (skip)');
    } else {
      await sequelize.query('ALTER TABLE users ADD COLUMN brand_scope_all TINYINT(1) NOT NULL DEFAULT 0 AFTER brand_id');
      console.log('- users.brand_scope_all added');
    }

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS brand_manager_brands (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        brand_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_bmb_user_brand (user_id, brand_id),
        KEY idx_bmb_brand (brand_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    console.log('- brand_manager_brands ready');

    // 백필 — 홈 브랜드가 있는 Brand Manager 에게 홈 1행(이미 있으면 그대로). 전체 칸은 건드리지 않는다.
    const [r] = await sequelize.query(`
      INSERT IGNORE INTO brand_manager_brands (user_id, brand_id)
      SELECT u.id, u.brand_id FROM users u
        JOIN brands b ON b.id = u.brand_id
       WHERE u.role = 'Brand Manager' AND u.brand_id IS NOT NULL`);
    console.log(`- backfill home rows: ${r && r.affectedRows != null ? r.affectedRows : 0} inserted`);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
