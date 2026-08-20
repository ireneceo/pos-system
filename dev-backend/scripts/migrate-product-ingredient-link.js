#!/usr/bin/env node
'use strict';
/**
 * `product_ingredients.linked_ingredient_id` 컬럼 추가 — 매입 계층 → 판매 계층 소프트 링크.
 * docs/BRAND_STOCK_SHARING_DESIGN.md 2026-08-20 절(P2-구조).
 *
 * **컬럼만 만든다. 값은 채우지 않는다.** 어떤 매입 자재가 어떤 판매 재료와 같은 물건인지는
 * 이름이 비슷하다고 기계가 단정할 일이 아니다 — 연결은 별도 도구(`link-product-ingredients.js`)가
 * **사람 확인을 거쳐** 채운다(레시피 연결과 동일 규율).
 *
 * 멱등: 컬럼이 이미 있으면 아무것도 하지 않는다.
 *
 * Usage: node scripts/migrate-product-ingredient-link.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [cols] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.columns
        WHERE table_schema = DATABASE()
          AND table_name = 'product_ingredients'
          AND column_name = 'linked_ingredient_id'`
    );
    if (Number(cols[0].c) > 0) {
      console.log('- linked_ingredient_id 이미 존재 — no-op');
      console.log('✓ done');
      process.exit(0);
    }

    await sequelize.query(
      `ALTER TABLE product_ingredients
         ADD COLUMN linked_ingredient_id INT NULL COMMENT '같은 물건인 ingredients.id (소프트 링크)'`
    );
    // 조회 성능용 인덱스(외래키 제약은 걸지 않는다 — 판매 재료가 비활성/삭제돼도 매입 자재는 살아야 한다)
    await sequelize.query(
      `CREATE INDEX idx_product_ingredients_linked ON product_ingredients (linked_ingredient_id)`
    );
    console.log('- linked_ingredient_id 컬럼 + 인덱스 생성 (값 0건 — 연결은 별도 도구가 사람 확인 후)');
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
