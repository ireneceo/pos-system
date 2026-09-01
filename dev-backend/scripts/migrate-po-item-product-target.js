/**
 * Migration: 발주 라인·공급처 연결이 "프로덕트"를 직접 가리킬 수 있게 컬럼 4개 추가
 *            + 재고추적 스위치(track_stock) 전부 켜기.
 *
 * 배경 (2026-09-01 실측 · Fable 판정 v2):
 *   레시피 없는 프로덕트는 **그 자체가 재고아이템**이고 수량이 프로덕트에 산다(이 구조는 원래 맞았다).
 *   판매 차감도 이미 두 루트(레시피 있으면 재료, 없으면 프로덕트)로 되어 있었다.
 *   그런데 **입고가 프로덕트로 들어올 길이 없었다** — purchase_order_items 와
 *   ingredient_seller_products 가 재료(ingredient / product_ingredient)만 가리킬 수 있었다.
 *   그래서 GIT 이 사온 컵 18 pack 이 프로덕트가 아니라 따로 만든 재고아이템에 쌓였고,
 *   같은 물건이 둘로 갈라졌다. 컬럼 2개씩을 더해 그 길을 연다.
 *
 *   두 번째 결함: track_stock 이 꺼져 있으면 차감을 건너뛴다. GIT 포장재 6개가 전부 꺼져 있었다.
 *   스위치 자체를 없애기로 했으므로(항상 추적) 기존 행을 전부 1 로 올린다.
 *   운영 실측상 "꺼져 있는데 수량>0" 인 행은 전체에서 1건뿐이라 갑자기 차감이 시작될 물건이 없다.
 *
 * 안전:
 *   - 컬럼 **추가만** (드롭·타입변경 없음). 기존 데이터 미수정(track_stock 제외).
 *   - track_stock UPDATE 는 0→1 한 방향뿐이고 수량·이름·가격을 건드리지 않는다.
 *   - 멱등: 컬럼이 이미 있으면 skip, track_stock 은 이미 1 이면 0 rows.
 *   - 인쇄/주문 무관. process.exit 필수 ([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-po-item-product-target.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const COLUMNS = [
  { table: 'purchase_order_items', column: 'product_id',
    comment: 'RA 레시피 없는 프로덕트 = 재고아이템 자체. 넷 중 하나만' },
  { table: 'purchase_order_items', column: 'brand_product_id',
    comment: 'BG 레시피 없는 브랜드 프로덕트. 넷 중 하나만' },
  { table: 'ingredient_seller_products', column: 'product_id',
    comment: 'RA 레시피 없는 프로덕트 ↔ 공급업체상품. 넷 중 하나만' },
  { table: 'ingredient_seller_products', column: 'brand_product_id',
    comment: 'BG 레시피 없는 브랜드 프로덕트 ↔ 공급업체상품. 넷 중 하나만' },
];

// 스위치를 없애므로 기존 행을 전부 추적 상태로. 테이블마다 컬럼이 있는 것만 건드린다.
const TRACK_TABLES = ['products', 'brand_products', 'ingredients', 'product_ingredients'];

async function hasColumn(table, column) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t: table, c: column } }
  );
  return rows.length > 0;
}

async function hasIndex(table, name) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND INDEX_NAME = :n`,
    { replacements: { t: table, n: name } }
  );
  return rows.length > 0;
}

(async () => {
  console.log('▶ 발주 라인·공급처 연결의 프로덕트 타깃 컬럼 + track_stock 정리');
  try {
    for (const { table, column, comment } of COLUMNS) {
      if (await hasColumn(table, column)) {
        console.log(`  – ${table}.${column} 이미 있음 (skip)`);
      } else {
        await sequelize.query(
          `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` INT NULL COMMENT '${comment.replace(/'/g, "''")}'`
        );
        console.log(`  ✓ ${table}.${column} 추가`);
      }
      const idx = `idx_${table}_${column}`;
      if (await hasIndex(table, idx)) {
        console.log(`  – ${idx} 이미 있음 (skip)`);
      } else {
        await sequelize.query(`ALTER TABLE \`${table}\` ADD INDEX \`${idx}\` (\`${column}\`)`);
        console.log(`  ✓ ${idx} 생성`);
      }
    }

    for (const table of TRACK_TABLES) {
      if (!(await hasColumn(table, 'track_stock'))) {
        console.log(`  – ${table}.track_stock 없음 (skip)`);
        continue;
      }
      const [res] = await sequelize.query(
        `UPDATE \`${table}\` SET track_stock = 1 WHERE track_stock = 0 OR track_stock IS NULL`
      );
      const n = (res && (res.affectedRows ?? res.changedRows)) ?? 0;
      console.log(`  ✓ ${table}.track_stock → 1 (${n} rows)`);
    }

    // 확인: 넷 중 둘 이상 채워진 행이 생기지 않았는지(이 마이그는 NULL 만 넣으므로 0 이어야 한다)
    for (const table of ['purchase_order_items', 'ingredient_seller_products']) {
      const [bad] = await sequelize.query(
        `SELECT COUNT(*) AS n FROM \`${table}\`
          WHERE (ingredient_id IS NOT NULL) + (product_ingredient_id IS NOT NULL)
              + (product_id IS NOT NULL) + (brand_product_id IS NOT NULL) > 1`
      );
      if (Number(bad[0].n) > 0) throw new Error(`${table}: 타깃이 둘 이상인 행 ${bad[0].n}건`);
    }

    console.log('✓ 완료');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
