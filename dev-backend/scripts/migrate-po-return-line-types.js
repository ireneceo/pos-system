#!/usr/bin/env node
/**
 * 반품 라인이 **BG 재고아이템(ProductIngredient)** 도 가리킬 수 있게 — 멱등.
 *
 * 발주 라인은 두 모양이다: 매장/푸드코트 = `ingredient_id`, BG 본사 = `product_ingredient_id`.
 * 그런데 `purchase_order_returns.ingredient_id` 가 **NOT NULL** 이라 BG 구매자가 반품을 생성하면
 * `notNull Violation` 으로 **500** 이 났다(반품 자체가 불가능). 라인 FK 를 발주와 같은 모양으로 맞춘다.
 *
 * 순수 additive(+ nullable 완화) → 롤백 안전. 데이터 이관 0.
 * 설계: Fable 2026-07-13 (B2)
 */
require('dotenv').config({ quiet: true });
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [cols] = await sequelize.query(
      "SELECT column_name AS name, is_nullable AS nullable FROM information_schema.columns " +
      "WHERE table_schema = DATABASE() AND table_name = 'purchase_order_returns'"
    );
    const byName = Object.fromEntries(cols.map((c) => [String(c.name || c.COLUMN_NAME).toLowerCase(), c]));

    let changed = 0;

    // ① BG 재고아이템 라인용 FK
    if (!byName['product_ingredient_id']) {
      await sequelize.query(
        "ALTER TABLE purchase_order_returns ADD COLUMN product_ingredient_id INT NULL " +
        "COMMENT 'BG 재고아이템(ProductIngredient) 라인 반품. ingredient_id 와 둘 중 하나' AFTER ingredient_id"
      );
      changed++;
    }

    // ② ingredient_id 를 nullable 로 (BG 라인은 이 값이 없다)
    const ing = byName['ingredient_id'];
    const isNotNull = ing && String(ing.nullable || ing.IS_NULLABLE).toUpperCase() === 'NO';
    if (isNotNull) {
      await sequelize.query('ALTER TABLE purchase_order_returns MODIFY ingredient_id INT NULL');
      changed++;
    }

    console.log(`✓ purchase_order_returns 라인 FK 정리 완료 (변경 ${changed}건 — 이관 없음)`);
    process.exit(0);
  } catch (e) {
    console.error('✗ migrate-po-return-line-types 실패:', e.message);
    process.exit(1);
  }
})();
