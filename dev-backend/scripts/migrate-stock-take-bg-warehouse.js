/**
 * 본사 창고(BG 재고아이템) 실사 칸 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-3-E)
 *
 * BG 재고는 매장이 아니라 **소유 계정(product_ingredients.owner_user_id)** 단위다. 같은 실사 표를 쓰되:
 * ① stock_takes.owner_user_id INT NULL 추가 · restaurant_id 를 NULL 허용으로(본사 실사는 매장이 없다)
 * ② stock_take_items.product_ingredient_id INT NULL 추가 · ingredient_id 를 NULL 허용으로(본사 실사 줄은 재고아이템을 가리킨다)
 * 매장 실사(restaurant_id·ingredient_id 가 차 있는 행)는 그대로 — 칸을 늘리고 NOT NULL 을 푸는 것뿐(expand-only).
 * 성질: 멱등(이미 되어 있으면 건너뜀) · 옛 코드와 공존(옛 코드는 새 칸을 안 읽고, 늘 값을 채워 넣는다).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function column(table, col) {
  const r = await sequelize.query(`SELECT IS_NULLABLE n FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table AND COLUMN_NAME = :col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r[0] || null;
}

async function main() {
  let changed = 0;
  if (!(await column('stock_takes', 'owner_user_id'))) {
    await sequelize.query("ALTER TABLE `stock_takes` ADD COLUMN `owner_user_id` INT NULL COMMENT '본사 창고 실사 — product_ingredients.owner_user_id'");
    await sequelize.query('ALTER TABLE `stock_takes` ADD INDEX `idx_stock_takes_owner` (`owner_user_id`, `status`)');
    changed++; console.log('[stock-take-bg] stock_takes.owner_user_id 추가');
  }
  const rid = await column('stock_takes', 'restaurant_id');
  if (rid && rid.n === 'NO') {
    await sequelize.query('ALTER TABLE `stock_takes` MODIFY `restaurant_id` INT NULL');
    changed++; console.log('[stock-take-bg] stock_takes.restaurant_id NULL 허용');
  }
  if (!(await column('stock_take_items', 'product_ingredient_id'))) {
    await sequelize.query("ALTER TABLE `stock_take_items` ADD COLUMN `product_ingredient_id` INT NULL COMMENT '본사 창고 실사 줄 — product_ingredients.id'");
    await sequelize.query('ALTER TABLE `stock_take_items` ADD INDEX `idx_sti_product_ingredient` (`product_ingredient_id`)');
    changed++; console.log('[stock-take-bg] stock_take_items.product_ingredient_id 추가');
  }
  const iid = await column('stock_take_items', 'ingredient_id');
  if (iid && iid.n === 'NO') {
    await sequelize.query('ALTER TABLE `stock_take_items` MODIFY `ingredient_id` INT NULL');
    changed++; console.log('[stock-take-bg] stock_take_items.ingredient_id NULL 허용');
  }
  console.log(`[stock-take-bg] 완료 — 변경 ${changed}건`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[stock-take-bg] 실패:', e.message); process.exit(1); });
