/**
 * BG 제품체인을 공용 공급망(공급업체상품·발주·재고)에 연결.
 * BrandProduct→ProductRecipe→ProductIngredient(BG 재고아이템) 를 그대로 두고,
 * 공용 PO/재고/공급업체 테이블이 ProductIngredient 를 참조할 수 있게 nullable 컬럼만 추가.
 * Ingredient(RA) 경로는 무변경. 멱등(idempotent). 운영은 sync --alter 안 돎 → 전용 마이그.
 *
 *   ingredient_seller_products.product_ingredient_id  (재고아이템 ↔ 공급업체상품 매핑)
 *   purchase_order_items.product_ingredient_id        (발주 라인이 재고아이템 주문)
 *   inventory_transactions.product_ingredient_id      (입고/조정 거래로그)
 *   + purchase_order_items.ingredient_id / inventory_transactions.ingredient_id → NULL 허용
 *     (BG 라인은 ingredient_id 대신 product_ingredient_id 사용. 앱단 "둘 중 하나만" 가드)
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-bg-supply]${DRY ? ' [DRY]' : ''} ${m}`);

async function columnExists(table, col) {
  const r = await sequelize.query(
    `SELECT 1 x FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name=:table AND column_name=:col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0;
}
async function columnIsNullable(table, col) {
  const r = await sequelize.query(
    `SELECT IS_NULLABLE n FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name=:table AND column_name=:col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0 && r[0].n === 'YES';
}
async function fkExists(table, name) {
  const r = await sequelize.query(
    `SELECT 1 x FROM information_schema.table_constraints WHERE table_schema=DATABASE() AND table_name=:table AND constraint_name=:name AND constraint_type='FOREIGN KEY'`,
    { type: QueryTypes.SELECT, replacements: { table, name } });
  return r.length > 0;
}

// 재고아이템 참조 컬럼(+FK+index) 추가
async function addProductIngredientRef(table, fkName, idxName) {
  if (await columnExists(table, 'product_ingredient_id')) { log(`skip — ${table}.product_ingredient_id 이미 존재`); return; }
  if (DRY) { log(`would add ${table}.product_ingredient_id (+FK ${fkName})`); return; }
  await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN product_ingredient_id INT NULL AFTER ingredient_id`);
  await sequelize.query(`ALTER TABLE \`${table}\` ADD INDEX \`${idxName}\` (product_ingredient_id)`);
  if (!(await fkExists(table, fkName))) {
    await sequelize.query(`ALTER TABLE \`${table}\` ADD CONSTRAINT \`${fkName}\` FOREIGN KEY (product_ingredient_id) REFERENCES product_ingredients(id) ON DELETE SET NULL`);
  }
  log(`✓ ${table}.product_ingredient_id 추가 (+FK +index)`);
}

// ingredient_id NOT NULL → NULL 허용 (BG 라인 위해). FK 는 유지.
async function relaxIngredientId(table) {
  if (await columnIsNullable(table, 'ingredient_id')) { log(`skip — ${table}.ingredient_id 이미 nullable`); return; }
  if (DRY) { log(`would relax ${table}.ingredient_id → NULL`); return; }
  await sequelize.query(`ALTER TABLE \`${table}\` MODIFY COLUMN ingredient_id INT NULL`);
  log(`✓ ${table}.ingredient_id → NULL 허용`);
}

async function run() {
  try {
    log('시작');
    // 1) 공급업체상품 매핑 (RA: ingredient_id 만 → BG 용 product_ingredient_id 추가 + ingredient_id nullable)
    await addProductIngredientRef('ingredient_seller_products', 'isp_product_ingredient_fk', 'idx_isp_product_ingredient');
    await relaxIngredientId('ingredient_seller_products');
    // 2) 발주 라인
    await addProductIngredientRef('purchase_order_items', 'poi_product_ingredient_fk', 'idx_poi_product_ingredient');
    await relaxIngredientId('purchase_order_items');
    // 3) 재고 거래
    await addProductIngredientRef('inventory_transactions', 'it_product_ingredient_fk', 'idx_it_product_ingredient');
    await relaxIngredientId('inventory_transactions');
    log('완료');
    process.exit(0);
  } catch (e) {
    console.error(`[migrate-bg-supply] ✗ 실패:`, e.message);
    process.exit(1);
  }
}
run();
