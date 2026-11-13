/**
 * Migration: print_watch_findings 표 만들기 (인쇄 지킴이 · 2026-11-13).
 * 설계 = .claude/fable-design-20261113-print-monitoring.md §2-3.
 * 안전: 새 표만 CREATE(있으면 skip) · 기존 표·데이터 무수정 · ENUM 없음 · 멱등 · process.exit 필수.
 * 사용: node scripts/migrate-create-print-watch-findings.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-create-print-watch-findings] Starting...');
    const [tbls] = await sequelize.query("SHOW TABLES LIKE 'print_watch_findings'");
    if (tbls.length > 0) {
      console.log('  ✓ print_watch_findings already exists — skip');
      process.exit(0);
    }
    await sequelize.query(`
      CREATE TABLE print_watch_findings (
        id BIGINT NOT NULL AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        code VARCHAR(48) NOT NULL,
        severity VARCHAR(16) NOT NULL,
        status VARCHAR(16) NOT NULL DEFAULT 'open',
        evidence JSON NULL,
        first_seen_at DATETIME NOT NULL,
        last_seen_at DATETIME NOT NULL,
        resolved_at DATETIME NULL,
        seen_count INT NOT NULL DEFAULT 1,
        PRIMARY KEY (id),
        INDEX pwf_status_severity (status, severity),
        INDEX pwf_rest_code_status (restaurant_id, code, status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ print_watch_findings created');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
