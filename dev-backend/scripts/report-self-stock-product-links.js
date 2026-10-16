#!/usr/bin/env node
'use strict';
/**
 * 읽기 전용 보고 — 자체재고 메뉴/브랜드 프로덕트에 걸린 판매자 연결 수 (2026-10-15 Fable 설계 D5).
 *
 * 2026-10-15 부터 발주 카탈로그 «Add as menu / Add as product» 는 재고아이템 + 직접 FK 로만 만든다
 * (.claude/fable-design-20261015-catalog-add-menu.md D1). 그 전에 만들어진 «자체재고 메뉴/프로덕트 ↔ 판매자» 연결
 * (ingredient_seller_products.product_id / brand_product_id)이 몇 개 남았는지 센다. 쓰기 0.
 *   0 이면 → 다음 정리 때 연결 모드(existing_product_id·existing_brand_product_id)와 stock-products 목록도 지울 수 있다(별건).
 *   0 이 아니면 → 그대로 둔다. 재고아이템으로 옮기는 것은 사람이 화면에서(기계가 같은 물건 두 줄을 만들지 않게).
 *
 * 사용: node scripts/report-self-stock-product-links.js   (운영은 `운영검증` 때 같은 방식으로)
 */
const path = require('path');
require(path.join(__dirname, '..', 'node_modules', 'dotenv')).config({ path: path.join(__dirname, '..', '.env') });
const { sequelize } = require(path.join(__dirname, '..', 'config', 'database'));

(async () => {
  try {
    const q = (sql) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    const prod = await q(`SELECT isp.id AS link_id, isp.product_id, p.restaurant_id, p.name, isp.seller_type, isp.seller_product_id
      FROM ingredient_seller_products isp LEFT JOIN products p ON p.id = isp.product_id
      WHERE isp.is_active = 1 AND isp.product_id IS NOT NULL ORDER BY isp.id`);
    const bp = await q(`SELECT isp.id AS link_id, isp.brand_product_id, b.owner_user_id, b.name, isp.seller_type, isp.seller_product_id
      FROM ingredient_seller_products isp LEFT JOIN brand_products b ON b.id = isp.brand_product_id
      WHERE isp.is_active = 1 AND isp.brand_product_id IS NOT NULL ORDER BY isp.id`);
    console.log(`자체재고 메뉴(products) 연결: ${prod.length}건`);
    prod.forEach((r) => console.log(`  link#${r.link_id} 매장 ${r.restaurant_id} · 메뉴 #${r.product_id} ${r.name} ← ${r.seller_type} 상품 #${r.seller_product_id}`));
    console.log(`자체재고 브랜드 프로덕트(brand_products) 연결: ${bp.length}건`);
    bp.forEach((r) => console.log(`  link#${r.link_id} 소유자 ${r.owner_user_id} · 프로덕트 #${r.brand_product_id} ${r.name} ← ${r.seller_type} 상품 #${r.seller_product_id}`));
    process.exit(0);
  } catch (e) {
    console.error('보고 실패:', e.message);
    process.exit(1);
  }
})();
