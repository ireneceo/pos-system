// 발주 배송비 (2026-09-17 Fable 판정 ⑦) — 컬럼 5개 추가.
//   purchase_orders.delivery_fee        총액식에 들어가는 배송비 (total = subtotal + tax + delivery_fee)
//   purchase_orders.delivery_fee_basis  «왜 이 배송비인가» 근거 스냅샷
//   supplier_companies.delivery_fee     판매자가 적는 «기준 미만 고정 배송비»
//   brands.min_order_amount/delivery_fee        브랜드도 판매자다(실거래 8건)
//   foodcourts.min_order_amount/delivery_fee    같은 해석기를 타므로 칸도 같이 연다
//
// 멱등 — information_schema 를 먼저 보고 없는 것만 더한다. 기존 행은 delivery_fee=0(=총액 불변).
// Usage: node scripts/migrate-po-delivery-fee.js

const { sequelize } = require('../config/database');

const COLUMNS = [
  ['purchase_orders', 'delivery_fee',
    "DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT '배송비 — 판매자 조건으로 자동 계산. total = subtotal + tax + delivery_fee'"],
  ['purchase_orders', 'delivery_fee_basis',
    "JSON NULL DEFAULT NULL COMMENT '계산 근거 {free_above, fee, subtotal_at_calc, seller_currency, rule, computed_at}'"],
  ['supplier_companies', 'delivery_fee',
    "DECIMAL(10,2) NULL DEFAULT NULL COMMENT '무료배송 기준 미만일 때 고정 배송비. NULL = 미설정(규칙 미적용)'"],
  ['brands', 'min_order_amount',
    "DECIMAL(10,2) NULL DEFAULT NULL COMMENT '무료배송 기준 금액 — 이 금액 이상이면 배송비 0'"],
  ['brands', 'delivery_fee',
    "DECIMAL(10,2) NULL DEFAULT NULL COMMENT '기준 미만일 때 고정 배송비. NULL = 미설정(규칙 미적용)'"],
  ['foodcourts', 'min_order_amount',
    "DECIMAL(10,2) NULL DEFAULT NULL COMMENT '무료배송 기준 금액 — 이 금액 이상이면 배송비 0'"],
  ['foodcourts', 'delivery_fee',
    "DECIMAL(10,2) NULL DEFAULT NULL COMMENT '기준 미만일 때 고정 배송비. NULL = 미설정(규칙 미적용)'"]
];

(async () => {
  let added = 0;
  for (const [table, column, ddl] of COLUMNS) {
    const [rows] = await sequelize.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
      { replacements: { t: table, c: column } }
    );
    if (rows.length > 0) {
      console.log(`= ${table}.${column} 이미 있음`);
      continue;
    }
    await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${ddl}`);
    console.log(`+ ${table}.${column} 추가`);
    added++;
  }
  console.log(`Done. 추가 ${added}건 / 전체 ${COLUMNS.length}건`);
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
