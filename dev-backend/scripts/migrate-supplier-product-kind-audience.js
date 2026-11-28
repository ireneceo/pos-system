/**
 * 공급업체 상품 — 종류 칸 + 전용 상품(보이는 손님 고르기) (2026-11-28 · 맞춤 제작 루트 1단계)
 * 설계: docs/TRADE_STRUCTURE.md §2-6 · .claude/fable-design-20261128-quote-custom-product-route.md (N1·N2)
 *
 *   supplier_products.product_kind ENUM('stock','made_to_order','service') 기본 stock — brand_products 와 같은 세 값
 *   supplier_products.audience_mode ENUM('all','selected') 기본 all — selected 면 아래 표의 손님에게만 보이고 주문된다
 *   supplier_product_buyers(supplier_product_id, entity_type, entity_id) — 그 손님 목록
 *
 * 늘리기만 한다(칸·표 추가). 기존 행은 기본값(stock · all) = 지금 동작 그대로. 멱등.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const hasCol = async (table, col) => {
  const [rows] = await sequelize.query(`
    SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t: table, c: col } });
  return rows.length > 0;
};
const hasTable = async (table) => {
  const [rows] = await sequelize.query(`
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
    { replacements: { t: table } });
  return rows.length > 0;
};

(async () => {
  const tag = '[migrate-supplier-product-kind-audience]';
  try {
    if (await hasCol('supplier_products', 'product_kind')) {
      console.log(`${tag} product_kind already exists — skip`);
    } else {
      await sequelize.query(`
        ALTER TABLE supplier_products
          ADD COLUMN product_kind ENUM('stock','made_to_order','service') NOT NULL DEFAULT 'stock'
            COMMENT '상품 종류 — stock 재고/배송 · made_to_order 재고없음/배송 · service 재고없음/배송없음'`);
      console.log(`${tag} product_kind 추가`);
    }

    if (await hasCol('supplier_products', 'audience_mode')) {
      console.log(`${tag} audience_mode already exists — skip`);
    } else {
      await sequelize.query(`
        ALTER TABLE supplier_products
          ADD COLUMN audience_mode ENUM('all','selected') NOT NULL DEFAULT 'all'
            COMMENT 'all=모든 거래처 · selected=supplier_product_buyers 의 손님에게만 (맞춤 제작·견적 상품)'`);
      console.log(`${tag} audience_mode 추가`);
    }

    if (await hasTable('supplier_product_buyers')) {
      console.log(`${tag} supplier_product_buyers already exists — skip`);
    } else {
      await sequelize.query(`
        CREATE TABLE supplier_product_buyers (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          supplier_product_id INT NOT NULL,
          entity_type ENUM('restaurant','brand','foodcourt') NOT NULL,
          entity_id INT NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY uq_spb_product_buyer (supplier_product_id, entity_type, entity_id),
          KEY idx_spb_buyer (entity_type, entity_id),
          CONSTRAINT fk_spb_product FOREIGN KEY (supplier_product_id) REFERENCES supplier_products(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      console.log(`${tag} supplier_product_buyers 만듦`);
    }

    const [dist] = await sequelize.query(
      `SELECT product_kind, audience_mode, COUNT(*) c FROM supplier_products GROUP BY product_kind, audience_mode`);
    console.log(`${tag} 검증: ` + dist.map(d => `${d.product_kind}/${d.audience_mode}=${d.c}`).join(' · '));
    for (const [t, c] of [['supplier_products', 'product_kind'], ['supplier_products', 'audience_mode']]) {
      if (!(await hasCol(t, c))) { console.error(`${tag} ✗ ${t}.${c} 없음`); process.exit(1); }
    }
    if (!(await hasTable('supplier_product_buyers'))) { console.error(`${tag} ✗ 표 없음`); process.exit(1); }
    console.log(`${tag} ✓ done`);
    process.exit(0);
  } catch (e) {
    console.error(`${tag} 실패:`, e.message);
    process.exit(1);
  }
})();
