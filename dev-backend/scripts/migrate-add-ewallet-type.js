/**
 * Migration: Add orders.ewallet_type + order_payments.ewallet_type (이월렛 서브타입).
 *
 * 배경 (2026-07-23, IOI Mall 매출보고):
 *   우리 POS 이월렛은 단일 'ewallet' 키(TnG/GrabPay/Boost 한 버튼)라 하위종류를 구분 못 했다.
 *   몰(Tangent SalesHourly) 표준은 tender 를 cash/tng/visa/master/amex/voucher/others 로 나누는데,
 *   이월렛 중 Touch'n Go(tng)만 별도 필드가 있다 → TnG 를 구분하려면 서브타입 캡처가 필요하다.
 *   카드의 card_type 과 대칭인 전용 컬럼(정석 — card_type 오버로드 금지). dashboard/cash-management/
 *   billPrint 은 card_type 을 method==='card' 일 때만 읽으므로 무영향.
 *
 * 안전:
 *   - 새 nullable 컬럼만 ADD COLUMN. 기존 row/데이터 미수정. 인쇄 무관(billPrint 무변경).
 *   - 멱등(이미 있으면 skip). sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-add-ewallet-type.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

async function addCol(table, after) {
  const [cols] = await sequelize.query(`SHOW COLUMNS FROM ${table} LIKE 'ewallet_type'`);
  if (cols.length > 0) {
    console.log(`  ✓ ${table}.ewallet_type already exists — ${cols[0].Type}`);
    return;
  }
  const [afterCol] = await sequelize.query(`SHOW COLUMNS FROM ${table} LIKE '${after}'`);
  const afterClause = afterCol.length > 0 ? ` AFTER ${after}` : '';
  await sequelize.query(`ALTER TABLE ${table} ADD COLUMN ewallet_type VARCHAR(20) NULL${afterClause}`);
  console.log(`  ✓ ${table}.ewallet_type column added`);
}

(async () => {
  try {
    console.log('[migrate-add-ewallet-type] Starting...');
    await addCol('orders', 'card_type');
    await addCol('order_payments', 'card_type');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
