/**
 * Migration: Create print_events table (인쇄 가시성/진단).
 *
 * 배경 (2026-06-26, Irene 아이디어):
 *   매장 인쇄 누락을 직원이 "솔루션 문제"로 오해. 인쇄가 안 됐을 때 사유를 누적
 *   기록 → 미인쇄 팝업 표시 + 환경/인터넷 문제 패턴 추적(진단 화면).
 *   설계 = docs/PRINT_VISIBILITY_DIAGNOSTICS.md.
 *
 * 안전:
 *   - 신규 테이블만 생성(CREATE TABLE IF NOT EXISTS). 기존 테이블/데이터 미수정.
 *   - 멱등 (이미 있으면 skip). sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - 인쇄 동작 무관 (billPrint/poller 무변경) — 로그 적재 전용.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-create-print-events.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-create-print-events] Starting...');
    const [tbls] = await sequelize.query("SHOW TABLES LIKE 'print_events'");
    if (tbls.length > 0) {
      console.log('  ✓ print_events table already exists — skip');
      process.exit(0);
    }
    console.log('  Creating print_events...');
    await sequelize.query(`
      CREATE TABLE print_events (
        id BIGINT NOT NULL AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        order_id INT NULL,
        order_number VARCHAR(64) NULL,
        station_id INT NULL,
        station_name VARCHAR(120) NULL,
        outcome ENUM('success','failed','skipped','fallback') NOT NULL,
        reason_code VARCHAR(48) NULL,
        reason_detail TEXT NULL,
        intended_printer VARCHAR(160) NULL,
        actual_printer VARCHAR(160) NULL,
        workstation_id VARCHAR(64) NULL,
        created_at DATETIME NOT NULL,
        PRIMARY KEY (id),
        INDEX print_event_rest_time (restaurant_id, created_at),
        INDEX print_event_order (order_id),
        INDEX print_event_reason_time (reason_code, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ print_events table created');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
