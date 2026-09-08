#!/usr/bin/env node
/**
 * Migration — 반품서를 외부 공급업체에 보낸 기록 (2026-09-08)
 *
 * 배경 (Irene): "외부공급업체는 발주처럼 왓츠앱 메일, pdf 로 보내게 해줘야지."
 *   외부 공급업체는 로그인이 없어 반품을 승인할 사람이 없다. 그래서 발주와 같은 모양으로 간다 —
 *   **반품서를 왓츠앱·메일·PDF 로 밖에 보내고**, 보냈다는 사실을 남긴다.
 *   운영 실측(2026-09-08): 외부 반품 1건이 `requested` 로 멈춰 있었고 그동안 재고도 안 돌아왔다.
 *
 * 추가 전용 — 기존 값은 건드리지 않는다.
 *   sent_to_seller_at : 보낸 시각 (null = 아직 안 보냄)
 *   sent_channel      : 무엇으로 보냈나 (whatsapp | email | pdf | manual)
 *   sent_by_user_id   : 누가 보냈나
 *
 * 사용:
 *   node scripts/migrate-return-external-send.js --dry-run
 *   node scripts/migrate-return-external-send.js
 *
 * 멱등: 컬럼이 이미 있으면 건너뛴다.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-return-external-send]${DRY ? ' [DRY]' : ''} ${m}`);

async function hasColumn(table, column) {
  const rows = await sequelize.query(
    `SELECT COLUMN_NAME c FROM information_schema.columns
      WHERE table_schema = DATABASE() AND table_name = :t AND column_name = :c`,
    { type: QueryTypes.SELECT, replacements: { t: table, c: column } });
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
  log('purchase_order_returns — 외부 발송 기록 칸');
  changes += await addColumn('purchase_order_returns', 'sent_to_seller_at',
    "`sent_to_seller_at` DATETIME NULL COMMENT '외부 공급업체에 반품서를 보낸 시각. null = 아직 안 보냄'");
  changes += await addColumn('purchase_order_returns', 'sent_channel',
    "`sent_channel` VARCHAR(20) NULL COMMENT 'whatsapp | email | pdf | manual'");
  changes += await addColumn('purchase_order_returns', 'sent_by_user_id',
    "`sent_by_user_id` INT NULL COMMENT '반품서를 보낸 사람'");
  log(`=== 완료 — 변경 ${changes}건${DRY ? ' (dry-run)' : ''} ===`);
}

run()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[migrate-return-external-send] 실패:', e.message); process.exit(1); });
