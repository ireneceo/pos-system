#!/usr/bin/env node
'use strict';
/**
 * **레시피 없는 상품은 그 상품 자체가 재고 단위** — 그걸 담을 칸을 만든다.
 *
 * ── 확정된 모델 (2026-08-22 Irene) ─────────────────────────────────────────
 * 상품은 둘 중 하나다. 레스토랑 관리자·브랜드 제너럴 **완전 대칭**이다.
 *   ① 레시피 있음 → 팔리면 레시피대로 재료가 빠진다        (이미 동작)
 *   ② 레시피 없음 → **그 상품 자체가 재고 단위**, 팔리면 그 상품이 빠진다  (여기서 만든다)
 * RA 는 메뉴(`products`)가 상품이고, BG 는 프로덕트(`brand_products`)가 상품이며
 * **다른 레스토랑에 판매**된다(`docs/BG_OPERATION_MENU_PARITY.md` §0 두 체인 대칭).
 *
 * ② 가 없어서 캔음료·병맥주·완제품·포장재는 팔려도 재고가 전혀 안 줄었다.
 * `products` 에는 칸이 이미 있었으나(track_stock/current_stock) **깎는 코드가 없어** 죽은 칸이었고,
 * `brand_products` 에는 칸 자체가 없었다.
 *
 * 이 마이그레이션은 **칸만 만든다.** 값은 사람이 넣는다(재고 수량은 세어야 아는 정보다).
 * `track_stock` 기본값은 **꺼짐** — 재고를 세겠다고 정한 상품만 켠다(재료와 같은 규칙).
 *
 * 멱등: 이미 있으면 건너뛴다.
 *
 * Usage: node scripts/migrate-product-level-stock.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

async function hasColumn(table, column) {
  const rows = await sequelize.query(
    `SELECT COUNT(*) c FROM information_schema.columns
      WHERE table_schema = DATABASE() AND table_name = :t AND column_name = :c`,
    { replacements: { t: table, c: column }, type: sequelize.QueryTypes.SELECT }
  );
  return Number(rows[0].c) > 0;
}

(async () => {
  try {
    // ① 브랜드 프로덕트에 재고 칸 (매장 메뉴의 products 와 같은 모양)
    const bpCols = [
      ['track_stock', "TINYINT(1) NOT NULL DEFAULT 0 COMMENT '재고 추적 여부(기본 꺼짐 — 사람이 켠다)'"],
      ['current_stock', "DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT '레시피 없는 상품의 자체 재고'"],
      ['min_stock', "DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT '부족 알림 임계치(0=알림 없음)'"],
      ['stock_unit', "VARCHAR(20) NULL COMMENT '재고 단위(판매 단위와 다를 수 있다)'"],
    ];
    for (const [col, ddl] of bpCols) {
      if (await hasColumn('brand_products', col)) { console.log(`- brand_products.${col} 이미 존재`); continue; }
      await sequelize.query(`ALTER TABLE brand_products ADD COLUMN ${col} ${ddl}`);
      console.log(`- brand_products.${col} 추가`);
    }

    // ② 거래기록에 상품 단위 칸 — 재료 차감과 같은 표에 남아야 이력이 한곳에서 보인다
    if (await hasColumn('inventory_transactions', 'product_id')) {
      console.log('- inventory_transactions.product_id 이미 존재');
    } else {
      await sequelize.query(
        `ALTER TABLE inventory_transactions
           ADD COLUMN product_id INT NULL COMMENT '레시피 없는 상품의 자체 재고 이동(products.id)'`
      );
      await sequelize.query('CREATE INDEX idx_inventory_transactions_product ON inventory_transactions (product_id)');
      console.log('- inventory_transactions.product_id + 인덱스 추가');
    }
    if (await hasColumn('inventory_transactions', 'brand_product_id')) {
      console.log('- inventory_transactions.brand_product_id 이미 존재');
    } else {
      await sequelize.query(
        `ALTER TABLE inventory_transactions
           ADD COLUMN brand_product_id INT NULL COMMENT '레시피 없는 브랜드 프로덕트의 자체 재고 이동'`
      );
      await sequelize.query('CREATE INDEX idx_inventory_transactions_brand_product ON inventory_transactions (brand_product_id)');
      console.log('- inventory_transactions.brand_product_id + 인덱스 추가');
    }
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
