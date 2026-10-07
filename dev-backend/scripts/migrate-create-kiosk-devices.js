/**
 * Migration: Create kiosk_devices table (매장이 등록한 키오스크 태블릿 — 1대 = 1행).
 *
 * 설계: .claude/fable-verdict-20261007-kiosk-payment-split.md D2 (Fable 판정 2026-10-07, Irene 승인).
 *   기기 토큰은 sha256 만 저장한다. 기존 표 변경 0.
 *
 * 안전: 신규 테이블만(SHOW TABLES 확인 후 CREATE) · 멱등 · process.exit 필수.
 *
 * 사용: node scripts/migrate-create-kiosk-devices.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-create-kiosk-devices] Starting...');
    const [tbls] = await sequelize.query("SHOW TABLES LIKE 'kiosk_devices'");
    if (tbls.length > 0) {
      console.log('  ✓ kiosk_devices table already exists');
    } else {
      await sequelize.query(`
        CREATE TABLE kiosk_devices (
          id INT NOT NULL AUTO_INCREMENT,
          restaurant_id INT NOT NULL,
          name VARCHAR(80) NOT NULL,
          token_hash CHAR(64) NOT NULL,
          status ENUM('active','revoked') NOT NULL DEFAULT 'active',
          terminal_host VARCHAR(64) NULL,
          terminal_port INT NULL,
          last_seen_at DATETIME NULL,
          created_by INT NULL,
          revoked_at DATETIME NULL,
          revoked_by INT NULL,
          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY kiosk_device_token (token_hash),
          INDEX kiosk_device_rest_status (restaurant_id, status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('  ✓ kiosk_devices table created');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
