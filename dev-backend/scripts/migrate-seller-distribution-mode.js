/**
 * Migration — Add `distribution_mode` to brand_products / foodcourt_products
 * and create brand_product_restaurants / foodcourt_product_restaurants M:N tables.
 *
 * distribution_mode ENUM:
 *   'all'                  — 모든 가맹/입점 지점에 자동 노출
 *   'specific_brands'      — brand_product_brands 매핑된 brand 가맹점만 (BG 전용)
 *   'specific_restaurants' — brand/foodcourt_product_restaurants 매핑된 Restaurant만
 *
 * Idempotent — column/table 존재 검사 후 skip.
 */
const { sequelize } = require('../config/database');

async function columnExists(table, column) {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM \`${table}\` LIKE :col`, { replacements: { col: column } });
  return rows.length > 0;
}
async function tableExists(table) {
  const [rows] = await sequelize.query(`SHOW TABLES LIKE :t`, { replacements: { t: table } });
  return rows.length > 0;
}

(async () => {
  try {
    console.log('[migrate-seller-distribution-mode] start');

    // 1. brand_products.distribution_mode
    if (!await columnExists('brand_products', 'distribution_mode')) {
      await sequelize.query(`ALTER TABLE brand_products
        ADD COLUMN distribution_mode ENUM('all','specific_brands','specific_restaurants')
        NOT NULL DEFAULT 'specific_brands' AFTER is_active`);
      console.log('  + brand_products.distribution_mode added');
    } else console.log('  ✓ brand_products.distribution_mode exists');

    // 2. foodcourt_products.distribution_mode
    if (!await columnExists('foodcourt_products', 'distribution_mode')) {
      await sequelize.query(`ALTER TABLE foodcourt_products
        ADD COLUMN distribution_mode ENUM('all','specific_restaurants')
        NOT NULL DEFAULT 'all' AFTER is_active`);
      console.log('  + foodcourt_products.distribution_mode added');
    } else console.log('  ✓ foodcourt_products.distribution_mode exists');

    // 3. brand_product_restaurants table
    if (!await tableExists('brand_product_restaurants')) {
      await sequelize.query(`CREATE TABLE brand_product_restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        restaurant_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uq_bpr (product_id, restaurant_id),
        CONSTRAINT fk_bpr_product FOREIGN KEY (product_id) REFERENCES brand_products(id) ON DELETE CASCADE,
        CONSTRAINT fk_bpr_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      )`);
      console.log('  + brand_product_restaurants created');
    } else console.log('  ✓ brand_product_restaurants exists');

    // 4. foodcourt_product_restaurants table
    if (!await tableExists('foodcourt_product_restaurants')) {
      await sequelize.query(`CREATE TABLE foodcourt_product_restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        restaurant_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uq_fpr (product_id, restaurant_id),
        CONSTRAINT fk_fpr_product FOREIGN KEY (product_id) REFERENCES foodcourt_products(id) ON DELETE CASCADE,
        CONSTRAINT fk_fpr_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      )`);
      console.log('  + foodcourt_product_restaurants created');
    } else console.log('  ✓ foodcourt_product_restaurants exists');

    // 5. Back-fill — 기존 brand_product_brands 매핑 있는 product → distribution_mode='specific_brands'
    //    (default 이미 specific_brands 이므로 추가 작업 불필요)

    console.log('[migrate-seller-distribution-mode] done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-seller-distribution-mode] error:', e.message);
    process.exit(1);
  }
})();
