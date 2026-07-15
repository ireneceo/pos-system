/**
 * Migration: Add brand_menus.recipe_id (Brand Menu → Recipe 링크).
 *
 * 배경 (2026-07-15, BG 데모 버그):
 *   브랜드 메뉴의 "Linked Recipe" 드롭다운이 잘못된 모델(ProductRecipe, product_recipe_id)에
 *   물려 있어, 사용자가 "Brand Recipes(레시피 관리)"에 등록한 Recipe(recipes 테이블)가
 *   드롭다운에 뜨지 않았다. 레스토랑 메뉴는 recipe_id(Recipe 모델)로 링크하고, 재고 차감
 *   (inventoryDeductionService.getProductRecipeIngredients)도 Product.recipe_id → Recipe 를
 *   쓴다. 즉 메뉴의 "Linked Recipe" 는 recipe_id 여야 정합. brand_menus 에 recipe_id 를 신설한다.
 *
 * 안전:
 *   - 새 nullable 컬럼만 추가 (ADD COLUMN). 기존 row/데이터/ product_recipe_id 미수정.
 *   - 멱등 (이미 있으면 skip). sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - 인쇄 무관 (billPrint 무변경).
 *   - FK 는 recipes(id) ON DELETE SET NULL — 레시피 삭제 시 링크만 해제(메뉴 보존).
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-brand-menu-recipe-link.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-brand-menu-recipe-link] Starting...');
    const [cols] = await sequelize.query("SHOW COLUMNS FROM brand_menus LIKE 'recipe_id'");
    if (cols.length > 0) {
      console.log('  ✓ brand_menus.recipe_id already exists —', cols[0].Type);
    } else {
      console.log('  Adding brand_menus.recipe_id (INT NULL)...');
      await sequelize.query("ALTER TABLE brand_menus ADD COLUMN recipe_id INT NULL AFTER product_recipe_id");
      console.log('  ✓ brand_menus.recipe_id column added');
    }

    // FK (recipes.id, ON DELETE SET NULL) — 멱등: 이미 있으면 skip
    const [fks] = await sequelize.query(`
      SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brand_menus'
        AND COLUMN_NAME = 'recipe_id' AND REFERENCED_TABLE_NAME = 'recipes'
    `);
    if (fks.length > 0) {
      console.log('  ✓ FK brand_menus.recipe_id → recipes already exists —', fks[0].CONSTRAINT_NAME);
    } else {
      console.log('  Adding FK brand_menus.recipe_id → recipes(id) ON DELETE SET NULL...');
      await sequelize.query(`
        ALTER TABLE brand_menus
        ADD CONSTRAINT fk_brand_menus_recipe_id
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL
      `);
      console.log('  ✓ FK added');
    }

    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
