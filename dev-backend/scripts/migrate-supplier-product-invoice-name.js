/**
 * supplier_products.invoice_name 추가 (2026-09-10 · Fable 판정 D3)
 *
 * 왜: 공급업체가 자기 인보이스에 찍는 이름이 우리 이름과 다르다.
 *   실측(발주 33, TAIYANG FRESH) — 우리 «Yellow Onion» ↔ 인보이스 «BAWANG HOLLAND»,
 *   19줄 중 6줄이 이름이 전혀 안 겹쳐 자동 매칭이 안 됐다.
 *   사람이 한 번 짝지어 주면 이 칸에 남고 다음 인보이스부터 자동으로 붙는다.
 *
 * ⛔ 새 표를 만들지 않는다 — 판매자 상품 행의 속성이다(기존 개념에 새 목록 금지).
 * 멱등: 이미 있으면 건너뛴다. 값은 채우지 않는다(사람이 쓰면서 쌓인다).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  const tag = '[migrate-supplier-product-invoice-name]';
  try {
    const [cols] = await sequelize.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'supplier_products'
         AND COLUMN_NAME = 'invoice_name'`);
    if (cols.length) {
      console.log(`${tag} invoice_name already exists — skip`);
    } else {
      await sequelize.query(`
        ALTER TABLE supplier_products
          ADD COLUMN invoice_name VARCHAR(255) NULL
          COMMENT '공급업체 인보이스에 인쇄되는 이름 (대조 자동매칭용)'
          AFTER sku`);
      console.log(`${tag} invoice_name 추가 완료`);
    }
    const [check] = await sequelize.query(`
      SELECT COUNT(*) c FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'supplier_products'
         AND COLUMN_NAME = 'invoice_name'`);
    const [filled] = await sequelize.query(
      `SELECT COUNT(*) c FROM supplier_products WHERE invoice_name IS NOT NULL AND invoice_name <> ''`);
    console.log(`${tag} 검증: 칸 존재=${check[0].c === 1 ? 'YES' : 'NO'} · 채워진 행=${filled[0].c}`);
    if (check[0].c !== 1) { console.error(`${tag} ✗ 칸이 없다`); process.exit(1); }
    console.log(`${tag} ✓ done`);
    process.exit(0);
  } catch (e) {
    console.error(`${tag} 실패:`, e.message);
    process.exit(1);
  }
})();
