#!/usr/bin/env node
/**
 * Migration — 발주↔인보이스 원가 대조 (설계: docs/PURCHASE_ORDER_SYSTEM.md §2)
 *
 * 세 가지를 만든다. 전부 **추가 전용** — 기존 값은 한 칸도 건드리지 않는다.
 *   ① purchase_order_items: invoiced_unit_price, invoiced_quantity (null = 미대조)
 *   ② purchase_orders: 업로드 인보이스 헤더값 + 대조 담당자/시각
 *   ③ cost_change_logs: 원가 변경 이력 표 (models/CostChangeLog.js)
 *
 * ⛔ purchase_order_items.unit_price 는 **절대 덮어쓰지 않는다.**
 *    "예상(발주) vs 실제(청구)" 두 값이 나란히 남는 것이 이 기능의 존재 이유다.
 *    세금·배송·할인은 라인 단가에 섞지 않고 발주 헤더에 따로 둔다.
 *
 * Usage:
 *   node scripts/migrate-cost-reconciliation.js --dry-run
 *   node scripts/migrate-cost-reconciliation.js
 *
 * 멱등성: 컬럼·인덱스·테이블이 이미 있으면 건너뛴다. 몇 번 돌려도 같은 결과.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-cost-reconciliation]${DRY ? ' [DRY]' : ''} ${m}`);

async function hasColumn(table, column) {
  const rows = await sequelize.query(
    `SELECT COLUMN_NAME c FROM information_schema.columns
      WHERE table_schema = DATABASE() AND table_name = :t AND column_name = :c`,
    { type: QueryTypes.SELECT, replacements: { t: table, c: column } });
  return rows.length > 0;
}

async function hasTable(table) {
  const rows = await sequelize.query(
    `SELECT TABLE_NAME t FROM information_schema.tables
      WHERE table_schema = DATABASE() AND table_name = :t`,
    { type: QueryTypes.SELECT, replacements: { t: table } });
  return rows.length > 0;
}

async function addColumn(table, column, ddl) {
  if (await hasColumn(table, column)) { log(`  skip ${table}.${column} (이미 있음)`); return 0; }
  if (DRY) { log(`  would add ${table}.${column}`); return 1; }
  await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN ${ddl}`);
  log(`  ✓ added ${table}.${column}`);
  return 1;
}

async function run() {
  let changes = 0;

  // ── ① 발주 라인: 청구된 실제 수량·단가
  log('[1/3] purchase_order_items — 청구 실측값 칸');
  changes += await addColumn('purchase_order_items', 'invoiced_unit_price',
    "`invoiced_unit_price` DECIMAL(12,4) NULL COMMENT '업로드 인보이스로 확정된 실제 단가. null = 미대조'");
  changes += await addColumn('purchase_order_items', 'invoiced_quantity',
    "`invoiced_quantity` DECIMAL(12,3) NULL COMMENT '업로드 인보이스로 확정된 실제 수량. null = 미대조'");

  // ── ② 발주 헤더: 인보이스 원본 정보 + 대조 기록
  log('[2/3] purchase_orders — 인보이스 헤더값 + 대조 기록');
  const poCols = [
    ['external_invoice_uploaded_by_user_id', "`external_invoice_uploaded_by_user_id` INT NULL COMMENT '인보이스를 올린 사람'"],
    ['invoice_number', "`invoice_number` VARCHAR(100) NULL COMMENT '공급업체가 발행한 인보이스 번호(우리 청구서 번호 아님)'"],
    ['invoice_date', "`invoice_date` DATE NULL COMMENT '공급업체 인보이스 일자'"],
    ['invoice_total', "`invoice_total` DECIMAL(12,2) NULL COMMENT '인보이스 총액(원본)'"],
    ['invoice_tax', "`invoice_tax` DECIMAL(12,2) NULL COMMENT '세금 — 라인 단가에 섞지 않는다'"],
    ['invoice_delivery', "`invoice_delivery` DECIMAL(12,2) NULL COMMENT '배송비 — 라인 단가에 섞지 않는다'"],
    ['invoice_discount', "`invoice_discount` DECIMAL(12,2) NULL COMMENT '할인 — 라인 단가에 섞지 않는다'"],
    ['invoice_reconciled_at', "`invoice_reconciled_at` DATETIME NULL COMMENT '대조 확정 시각. null = 미대조'"],
    ['invoice_reconciled_by_user_id', "`invoice_reconciled_by_user_id` INT NULL COMMENT '대조를 확정한 사람'"]
  ];
  for (const [name, ddl] of poCols) changes += await addColumn('purchase_orders', name, ddl);

  // ── ③ 원가 변경 이력 표
  log('[3/3] cost_change_logs — 원가 변경 이력');
  if (await hasTable('cost_change_logs')) {
    log('  skip cost_change_logs (이미 있음)');
  } else if (DRY) {
    log('  would create cost_change_logs');
    changes += 1;
  } else {
    await sequelize.query(`
      CREATE TABLE \`cost_change_logs\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`subject_type\` ENUM('seller_product','ingredient','product_ingredient','po_item') NOT NULL,
        \`subject_id\` INT NOT NULL,
        \`entity_type\` ENUM('restaurant','brand','foodcourt') NULL,
        \`entity_id\` INT NULL,
        \`seller_type\` ENUM('system_admin','brand','foodcourt','supplier') NULL,
        \`seller_entity_id\` INT NULL,
        \`old_value\` DECIMAL(12,4) NULL,
        \`new_value\` DECIMAL(12,4) NOT NULL,
        \`unit\` VARCHAR(50) NULL,
        \`source\` ENUM('invoice_reconcile','seller_edit','manual','backfill','retro_apply') NOT NULL,
        \`purchase_order_id\` INT NULL,
        \`batch_id\` VARCHAR(64) NULL,
        \`changed_by_user_id\` INT NULL,
        \`changed_by_name\` VARCHAR(255) NULL,
        \`note\` VARCHAR(500) NULL,
        \`changed_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`idx_ccl_subject\` (\`subject_type\`, \`subject_id\`, \`changed_at\`),
        KEY \`idx_ccl_buyer\` (\`entity_type\`, \`entity_id\`, \`changed_at\`),
        KEY \`idx_ccl_po\` (\`purchase_order_id\`),
        KEY \`idx_ccl_batch\` (\`batch_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='원가 변경 이력 — 누가 언제 왜 바꿨나'
    `);
    log('  ✓ created cost_change_logs');
    changes += 1;
  }

  log(`=== 완료 — 변경 ${changes}건${DRY ? ' (dry-run, 실제 적용 안 함)' : ''} ===`);
}

run()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[migrate-cost-reconciliation] 실패:', e.message); process.exit(1); });
