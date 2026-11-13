/**
 * Migration: user_contexts.pin_code 칸 추가 (2026-11-13 · Fable 설계 .claude/fable-design-20261113-hat-admin-pin.md §2.1).
 * 연결(모자) 관리자가 그 매장 기기에서 PIN 으로 들어오게 — PIN 은 «사람 × 매장» 값이라 모자 행에 둔다.
 * 안전: 칸 하나 덧붙이기만(NULL 허용 · 기존 행 전부 NULL) · 있으면 skip · 멱등 · sync --alter 안 씀 · process.exit 필수.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
(async () => {
  try {
    const [cols] = await sequelize.query("SHOW COLUMNS FROM user_contexts LIKE 'pin_code'");
    if (cols.length > 0) { console.log('  ✓ user_contexts.pin_code already exists — skip'); process.exit(0); }
    await sequelize.query('ALTER TABLE user_contexts ADD COLUMN pin_code VARCHAR(8) NULL AFTER permissions');
    console.log('  ✓ user_contexts.pin_code added');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
