// 발주 결제수단 «개인금액» + 정산(상환) + 영수증 (2026-09-18 Fable 판정 ⑨ · Irene 승인 A·B·C)
//
// Irene 원문: 「개인돈으로 쓴 건 비용처리가 안되고 개인에게 돈을 줘야 하는 거야. 회계처리에 안들어가야 해.」
//             「캐시랑 개인비용 쓴 거에 영수증 넣게 해야 하지 않아? 인보이스랑 다르잖아.
//               영수증은 이미 사용한 돈이니까.」
//
// 뜻: 개인금액 = «공급업체에는 냈고, 회사는 아직 안 낸 돈».
//   - 결제 시점: 드로어 무접촉(회사 돈이 안 나갔다) · 발주·청구서는 결제됨(공급업체는 받았다)
//   - 정산 시점: 개인에게 갚을 때 비로소 회사 돈이 나간다 → 현금이면 드로어 out(source='reimbursement')
//   - 갚을 목록은 **새 표가 아니라 발주 행** — payment_method='personal' AND reimbursed_at IS NULL
//
// 영수증은 인보이스와 다르다 — 인보이스는 «앞으로 낼 청구서», 영수증은 «이미 나간 돈의 증빙».
//   그래서 external_invoice_* 에 얹지 않고 receipt_* 로 따로 둔다(대조 흐름과 섞이지 않게).
//
// ⛔ ENUM 은 expand-only — 목록을 하드코딩하면 다른 마이그가 넣은 값을 지운다(2026-08-30 사고).
// 멱등 — information_schema 를 먼저 보고 없는 것만 더한다.
// Usage: node scripts/migrate-po-personal-payment.js

const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

const COLUMNS = [
  ['purchase_orders', 'reimbursed_at',
    "DATETIME NULL DEFAULT NULL COMMENT '개인금액을 그 사람에게 갚은 시각. NULL = 아직 안 갚음(= 갚을 목록)'"],
  ['purchase_orders', 'reimbursed_by_user_id',
    "INT NULL DEFAULT NULL COMMENT '정산을 기록한 사용자'"],
  ['purchase_orders', 'reimbursement_method',
    "ENUM('cash','bank_transfer') NULL DEFAULT NULL COMMENT '갚은 방법 — cash 면 드로어에서 나간다'"],
  ['purchase_orders', 'receipt_url',
    "VARCHAR(500) NULL DEFAULT NULL COMMENT '영수증 파일 (이미 나간 돈의 증빙 — 인보이스와 별개)'"],
  ['purchase_orders', 'receipt_filename',
    "VARCHAR(255) NULL DEFAULT NULL COMMENT '영수증 원본 파일명'"],
  ['purchase_orders', 'receipt_uploaded_at',
    "DATETIME NULL DEFAULT NULL COMMENT '영수증 올린 시각'"],
  ['purchase_orders', 'receipt_uploaded_by_user_id',
    "INT NULL DEFAULT NULL COMMENT '영수증 올린 사용자'"],
];

(async () => {
  // ① ENUM 확장 — **내가 담당하는 값만** 넘긴다(남의 값까지 나열하면 그게 소거 장치다)
  await expandEnum(sequelize, 'purchase_orders', 'payment_method', ['personal']);
  console.log('+ purchase_orders.payment_method 에 personal 보장');
  await expandEnum(sequelize, 'cash_movements', 'source', ['reimbursement']);
  console.log('+ cash_movements.source 에 reimbursement 보장');

  // ② 칸 추가 (멱등)
  let added = 0;
  for (const [table, column, ddl] of COLUMNS) {
    const [rows] = await sequelize.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
      { replacements: { t: table, c: column } }
    );
    if (rows.length > 0) { console.log(`= ${table}.${column} 이미 있음`); continue; }
    await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${ddl}`);
    console.log(`+ ${table}.${column} 추가`);
    added++;
  }
  console.log(`Done. 칸 추가 ${added}건 / 전체 ${COLUMNS.length}건`);
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
