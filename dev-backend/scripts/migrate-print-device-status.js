/**
 * Migration: print_device_status (인쇄 자가진단 — 기기별 상태 스냅샷).
 *
 * 배경 (2026-07-16, PRINT_SELF_DIAGNOSE_DESIGN.md §4):
 *   인쇄 자가진단/원격뷰가 "각 POS 기기가 지금 어떤 상태인가"(브릿지·프린터모드·앱버전·
 *   자동인쇄 담당 여부)를 알려면, 기기가 스스로 서버에 스냅샷을 올리는 저장소가 필요하다.
 *   로그가 아니라 **기기당 1행 upsert**(무한증가 없음). 이력은 기존 print_events 재사용.
 *
 * 안전:
 *   - 새 테이블만 생성(CREATE TABLE IF NOT EXISTS). 기존 데이터·인쇄 경로 무관.
 *   - 멱등(이미 있으면 skip). 인쇄 보호파일 무접촉.
 *   - (restaurant_id, device_id) UNIQUE — 기기당 1행.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-print-device-status.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-print-device-status] Starting...');
    const [tbl] = await sequelize.query("SHOW TABLES LIKE 'print_device_status'");
    if (tbl.length > 0) {
      console.log('  ✓ print_device_status already exists');
    } else {
      console.log('  Creating print_device_status...');
      await sequelize.query(`
        CREATE TABLE print_device_status (
          id             BIGINT NOT NULL AUTO_INCREMENT,
          restaurant_id  INT NOT NULL,
          device_id      VARCHAR(64) NOT NULL,
          workstation_id VARCHAR(64) NULL,
          label          VARCHAR(120) NULL,
          platform       VARCHAR(32) NULL,
          app_version    VARCHAR(32) NULL,
          printer_mode   VARCHAR(16) NULL,
          is_auto_print  TINYINT(1) NOT NULL DEFAULT 0,
          qz_active      TINYINT(1) NULL,
          snapshot       JSON NULL,
          last_report_at DATETIME NULL,
          last_diag_at   DATETIME NULL,
          createdAt      DATETIME NOT NULL,
          updatedAt      DATETIME NOT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY uq_pds_restaurant_device (restaurant_id, device_id),
          KEY idx_pds_restaurant (restaurant_id),
          KEY idx_pds_last_report (last_report_at),
          CONSTRAINT fk_pds_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
      console.log('  ✓ print_device_status created');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
