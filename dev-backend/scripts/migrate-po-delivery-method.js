// 발주 수령 방식 · 판매자 배송비 면제 (2026-11-20 Fable 설계 D1) — 컬럼 2개 추가.
//   purchase_orders.delivery_method      'delivery' | 'pickup' — 구매자가 초안 단계에서 고른다(셀프픽업 = 배송비 0)
//   purchase_orders.delivery_fee_waived  판매자가 «이 주문은 배송비 없이» 를 켰다(주문 추가·품목 수정 창)
//
// 멱등 — information_schema 를 먼저 보고 없는 것만 더한다. 기존 행은 기본값(delivery · 0) = 총액 불변. 백필 없음.
// Usage: node scripts/migrate-po-delivery-method.js

const { sequelize } = require('../config/database');

const COLUMNS = [
  ['purchase_orders', 'delivery_method',
    "VARCHAR(16) NOT NULL DEFAULT 'delivery' COMMENT '수령 방식 delivery|pickup — pickup 이면 배송비 0'"],
  ['purchase_orders', 'delivery_fee_waived',
    "TINYINT(1) NOT NULL DEFAULT 0 COMMENT '판매자가 이 주문의 배송비를 받지 않음'"]
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
