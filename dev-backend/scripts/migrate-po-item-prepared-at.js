// 판매자 «주문 준비 보드» — 품목 «준비함» 표시 (2026-11-05 Fable 판정 · .claude/fable-verdict-20261105-bg-order-kds.md Ⅱ-1)
//   purchase_order_items.prepared_at — 판매자가 이 줄을 준비 완료로 표시한 시각. null = 미준비.
//   주문 상태 목록은 안 건드린다(매장 화면·통계·메일이 같이 읽음). 재고·금액 무관.
//
// 백필 없음 — 옛 줄은 미준비로 둔다. 이미 보낸 줄(shipped_at)은 «보냄 = 준비됨» 으로 취급하므로
//   화면·집계(unprepared_count)는 안 보낸 줄만 센다.
// 멱등 — 칸이 없을 때만 더한다(2회차 영향 0). 운영 sync 는 안전모드라 이 전용 마이그가 필수(registry deploy).
// Usage: node scripts/migrate-po-item-prepared-at.js

const { sequelize } = require('../config/database');

(async () => {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'purchase_order_items' AND COLUMN_NAME = 'prepared_at'`
  );
  if (rows.length > 0) {
    console.log('= purchase_order_items.prepared_at 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE \`purchase_order_items\` ADD COLUMN \`prepared_at\` DATETIME NULL DEFAULT NULL
        COMMENT '판매자가 이 줄을 준비 완료로 표시한 시각. null = 미준비 (2026-11-05 주문 준비 보드)'`
    );
    console.log('+ purchase_order_items.prepared_at 추가');
  }
  console.log('Done.');
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
