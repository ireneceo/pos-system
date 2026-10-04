/**
 * ingredient_seller_products.buyer_restaurant_id 추가 (2026-09-29 Fable 구조 판정 §2-3 · Irene 2026-10-04 「권고대로 해」)
 *
 * 왜 필요한가
 *   브랜드 재료(거울 행)는 형제 매장이 함께 쓴다. 매장이 거기에 자기 외부 공급업체를 붙이면
 *   그 연결은 **그 매장만** 봐야 한다(Irene 「공급업체는 매장이 알아서」). 연결 표에 매장 칸 하나.
 *   NULL = 공용(GIT 처럼 브랜드 자신이 파는 물건의 출처 연결, 매장 소유 재료의 연결 전부).
 *
 * 성질: 칸 추가만. 기존 데이터 변경 0 · 백필 0 · NULL 허용.
 * 되돌리기: 옛 코드로 복원(칸이 남아도 옛 코드는 안 읽음). 칸까지 지우려면
 *   -- ALTER TABLE ingredient_seller_products DROP FOREIGN KEY fk_isp_buyer_restaurant, DROP COLUMN buyer_restaurant_id;
 *   단, 그 전에 buyer_restaurant_id 가 채워진 연결은 매장 소유 재료로 옮기거나 끈다(형제 매장 노출 방지).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TABLE = 'ingredient_seller_products';
const COL = 'buyer_restaurant_id';

async function main() {
  const have = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { type: QueryTypes.SELECT, replacements: { t: TABLE, c: COL } }
  );
  if (have.length) {
    console.log(`[seller-link-buyer] ${COL} 이미 존재 — skip`);
  } else {
    await sequelize.query(
      `ALTER TABLE \`${TABLE}\` ADD COLUMN \`${COL}\` INT NULL
         COMMENT "브랜드 재료에 매장이 붙인 연결의 매장 id. NULL=공용" AFTER \`brand_product_id\``
    );
    console.log(`[seller-link-buyer] ${COL} 추가`);
  }
  const idx = await sequelize.query(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND INDEX_NAME = 'idx_isp_buyer_restaurant'`,
    { type: QueryTypes.SELECT, replacements: { t: TABLE } }
  );
  if (!idx.length) {
    await sequelize.query(`CREATE INDEX idx_isp_buyer_restaurant ON \`${TABLE}\` (\`${COL}\`)`);
    console.log('[seller-link-buyer] 인덱스 추가');
  }
  const fk = await sequelize.query(
    `SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND CONSTRAINT_NAME = 'fk_isp_buyer_restaurant'`,
    { type: QueryTypes.SELECT, replacements: { t: TABLE } }
  );
  if (!fk.length) {
    await sequelize.query(
      `ALTER TABLE \`${TABLE}\` ADD CONSTRAINT fk_isp_buyer_restaurant
         FOREIGN KEY (\`${COL}\`) REFERENCES restaurants(id) ON DELETE SET NULL ON UPDATE CASCADE`
    );
    console.log('[seller-link-buyer] FK 추가');
  }
  console.log('[seller-link-buyer] 완료 (데이터 변경 없음)');
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[seller-link-buyer] 실패:', e.message); process.exit(1); });
