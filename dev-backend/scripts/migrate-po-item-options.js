// 발주 줄 «고른 옵션» 스냅샷 (2026-10-15 Fable 설계 · .claude/fable-design-20261015-supplier-product-options.md D3)
//   purchase_order_items.options — [{group_id, group_name, option_id, option_name, price_adjustment}] · NULL = 옵션 없음.
//   base_quantity·base_unit 스냅샷과 같은 성격(«주문 시점에 판매자가 뭘 팔았나»). 새 목록이 아니라 기존 줄의 칸 하나.
//   줄 단가 = 연결 단가 + 이 스냅샷의 조정액 합(utils/poLineOptions.js) — 가격 다시 불러오기·판매자 수정이 다시 더한다.
//
// 멱등 — 칸은 없을 때만 더한다. 백필 없음(옛 줄은 NULL = 옵션 없음. 옛 «[Options]» 메모는 글자 그대로 둔다).
// 운영 sync 는 안전모드라 칸을 안 넣는다 → 이 전용 마이그가 필수(registry deploy).
// Usage: node scripts/migrate-po-item-options.js

const { sequelize } = require('../config/database');

(async () => {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'purchase_order_items' AND COLUMN_NAME = 'options'`
  );
  if (rows.length > 0) {
    console.log('= purchase_order_items.options 이미 있음');
  } else {
    await sequelize.query(
      `ALTER TABLE \`purchase_order_items\` ADD COLUMN \`options\` JSON NULL DEFAULT NULL
        COMMENT '고른 공급업체 상품 옵션 스냅샷. NULL = 옵션 없음 (2026-10-15)'`
    );
    console.log('+ purchase_order_items.options 추가');
  }
  console.log('Done.');
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
