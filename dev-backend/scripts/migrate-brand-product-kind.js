/**
 * brand_products.product_kind 추가 (2026-09-13 · Irene 「주문제작 / 서비스·기타 이렇게 나눠져야 하는 거 아니야?」)
 *
 * 상품 종류 세 갈래 — «재고를 세는가» 와 «배송이 있는가» 는 서로 다른 축이라 하나의 참/거짓으로는 못 담는다.
 *   stock          재고 셈 · 배송 함   (기본 = 지금까지의 동작)
 *   made_to_order  재고 안 셈 · 배송 함 (주문 받으면 만드는 소스류)
 *   service        재고 안 셈 · 배송 **없음** → 판매자가 «완료 처리» 하면 바로 끝 (컨설팅 시간 등)
 *
 * 효과:
 *   - stock 이 아니면 출고에서 자체 재고를 깎지 않고 «모자람» 기록도 남기지 않는다(seller-orders.js).
 *   - service 만 담긴 발주는 배송·도착·입고 단계를 건너뛴다(줄이 하나라도 물건이면 배송 있는 주문으로 본다).
 *
 * 멱등. 같은 날 먼저 만든 임시 칸 `made_to_order`(참/거짓)는 값을 옮긴 뒤 지운다 —
 * 운영에 나간 적이 없는 칸이라 흔적을 남기지 않는다.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const has = async (col) => {
  const [rows] = await sequelize.query(`
    SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brand_products' AND COLUMN_NAME = :c`,
    { replacements: { c: col } });
  return rows.length > 0;
};

(async () => {
  const tag = '[migrate-brand-product-kind]';
  try {
    if (await has('product_kind')) {
      console.log(`${tag} product_kind already exists — skip`);
    } else {
      await sequelize.query(`
        ALTER TABLE brand_products
          ADD COLUMN product_kind ENUM('stock','made_to_order','service')
            NOT NULL DEFAULT 'stock'
            COMMENT '상품 종류 — stock 재고/배송 · made_to_order 재고없음/배송 · service 재고없음/배송없음'
          AFTER track_stock`);
      console.log(`${tag} product_kind 추가 완료`);
    }

    // 같은 날 먼저 만든 임시 칸에서 값 이관 후 제거 (운영 미배포 칸)
    if (await has('made_to_order')) {
      const [moved] = await sequelize.query(
        `UPDATE brand_products SET product_kind = 'made_to_order' WHERE made_to_order = 1 AND product_kind = 'stock'`);
      await sequelize.query(`ALTER TABLE brand_products DROP COLUMN made_to_order`);
      console.log(`${tag} 임시 칸 made_to_order 이관 후 제거 (옮긴 행 ${moved?.affectedRows ?? 0})`);
    }

    const [dist] = await sequelize.query(
      `SELECT product_kind, COUNT(*) c FROM brand_products GROUP BY product_kind`);
    console.log(`${tag} 검증: ` + dist.map(d => `${d.product_kind}=${d.c}`).join(' · '));
    if (await has('made_to_order')) { console.error(`${tag} ✗ 임시 칸이 남아 있다`); process.exit(1); }
    if (!(await has('product_kind'))) { console.error(`${tag} ✗ product_kind 가 없다`); process.exit(1); }
    console.log(`${tag} ✓ done`);
    process.exit(0);
  } catch (e) {
    console.error(`${tag} 실패:`, e.message);
    process.exit(1);
  }
})();
