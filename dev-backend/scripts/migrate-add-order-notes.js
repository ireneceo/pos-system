/**
 * Migration: Add orders.notes (order-level remark / 주문 메모).
 *
 * 배경 (#11 리마크, 2026-06-26):
 *   주문에 품목별 special_instructions 는 order_items JSON 안에 있으나, 주문 전체에
 *   대한 메모(예: "알레르기 — 땅콩 빼주세요", "생일 — 케이크 같이")를 담을 컬럼이 없었다.
 *   POS/모바일 주문 메모 기능을 위해 orders.notes (TEXT, nullable) 를 추가한다.
 *
 * 안전:
 *   - 새 nullable 컬럼만 추가 (ADD COLUMN). 기존 row/데이터 미수정.
 *   - 멱등 (이미 있으면 skip). sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - 인쇄 무관 (billPrint 무변경). 표시는 POS/모바일 UI.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-add-order-notes.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-add-order-notes] Starting...');
    const [cols] = await sequelize.query("SHOW COLUMNS FROM orders LIKE 'notes'");
    if (cols.length > 0) {
      console.log('  ✓ orders.notes already exists —', cols[0].Type);
    } else {
      console.log('  Adding orders.notes (TEXT NULL)...');
      await sequelize.query("ALTER TABLE orders ADD COLUMN notes TEXT NULL AFTER guest_count");
      console.log('  ✓ orders.notes column added');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
