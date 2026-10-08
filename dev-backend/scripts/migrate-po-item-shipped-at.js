// 판매자 품목별 발송 표시 (2026-10-08 Fable 판정 · .claude/fable-verdict-20261008-partial-shipment.md 개정 Ⅱ-1)
//   purchase_order_items.shipped_at — 판매자가 이 줄을 보낸 시각. null = 미발송.
//   «받은 양(quantity_received)» 의 거울이지만 수량이 아니라 «보냈다/안 보냈다» 표시 하나다(Irene 10-08).
//
// 백필: 옛 «보내기» 는 주문 전량을 한 번에 보냈다(전 줄 차감) → 헤더 shipped_at 이 있는 발주의 줄은
//   전부 같은 시각으로 «보냄» 표시. 그래야 옛 주문이 «다 보낸 주문» 으로 보이고 다시 못 보낸다.
//
// 멱등 — 칸은 없을 때만 더하고, 백필은 줄 shipped_at 이 비어 있는 것만 채운다(2회차 영향 0).
// 운영 sync 는 안전모드라 칸을 안 넣는다 → 이 전용 마이그가 필수(registry deploy).
// Usage: node scripts/migrate-po-item-shipped-at.js

const { sequelize } = require('../config/database');

(async () => {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'purchase_order_items' AND COLUMN_NAME = 'shipped_at'`
  );
  if (rows.length > 0) {
    console.log('= purchase_order_items.shipped_at 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE \`purchase_order_items\` ADD COLUMN \`shipped_at\` DATETIME NULL DEFAULT NULL
        COMMENT '판매자가 이 줄을 보낸 시각. null = 미발송 (2026-10-08 품목별 발송 표시)'`
    );
    console.log('+ purchase_order_items.shipped_at 추가');
  }

  const [, meta] = await sequelize.query(
    `UPDATE purchase_order_items i
       JOIN purchase_orders po ON po.id = i.purchase_order_id
        SET i.shipped_at = po.shipped_at
      WHERE po.shipped_at IS NOT NULL AND i.shipped_at IS NULL`
  );
  const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : (meta || 0);
  console.log(`백필: 줄 ${affected}건 shipped_at 채움 (헤더 shipped_at 있는 발주)`);
  console.log('Done.');
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
