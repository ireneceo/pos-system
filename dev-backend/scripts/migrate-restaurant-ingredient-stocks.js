#!/usr/bin/env node
/**
 * restaurant_ingredient_stocks 생성 — 멱등.
 *
 * 브랜드 소유 재료(ingredients.owner_type='brand')는 소속 매장이 공유하는 행이라,
 * 입고/폐기/조정이 ingredients.current_stock 을 직접 갱신하면 형제 매장 재고가 오염된다.
 * 단가가 이미 restaurant_ingredient_costs 로 매장별 분리돼 있는 것과 대칭으로
 * 재고도 매장별 오버레이로 분리한다.
 *
 * 데이터 이관 0건 — 신규 테이블만 만든다. 매장 소유 재료는 기존대로 ingredients.current_stock 사용.
 * 롤백 = 미사용 방치(기존 행 UPDATE 없음).
 * 설계: docs/BRAND_STOCK_SHARING_DESIGN.md §③
 */
require('dotenv').config({ quiet: true });
const { sequelize } = require('../config/database');

(async () => {
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS restaurant_ingredient_stocks (
        id INT NOT NULL AUTO_INCREMENT,
        restaurant_id INT NOT NULL COMMENT 'Restaurant FK',
        ingredient_id INT NOT NULL COMMENT 'Brand Ingredient FK (owner_type=brand only)',
        current_stock DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'This restaurant stock on hand',
        last_stock_take_at DATETIME NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uq_restaurant_ingredient_stock (restaurant_id, ingredient_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    const [[{ cnt }]] = await sequelize.query(
      "SELECT COUNT(*) AS cnt FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'restaurant_ingredient_stocks'"
    ).then((r) => [r[0]]);

    if (!Number(cnt)) throw new Error('restaurant_ingredient_stocks 생성 실패');

    const [rows] = await sequelize.query('SELECT COUNT(*) AS n FROM restaurant_ingredient_stocks');
    console.log(`✓ restaurant_ingredient_stocks 준비 완료 (기존 행 ${rows[0].n}건 — 이관 없음)`);
    process.exit(0);
  } catch (e) {
    console.error('✗ migrate-restaurant-ingredient-stocks 실패:', e.message);
    process.exit(1);
  }
})();
