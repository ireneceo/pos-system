#!/usr/bin/env node
/**
 * Migration — 무료 발주 등급 «카탈로그 링크 + 외부 구매자 판매» 뼈대
 * (2026-09-12 · docs/BUYER_FREE_TIER_DESIGN.md §5-4 · §5-6)
 *
 * 두 가지만 한다. 둘 다 **칸 추가·값 추가**뿐이고 행 데이터는 건드리지 않는다.
 *
 *  1) `brand_products.distribution_mode` 에 **'external_buyers' 한 값 추가**
 *     — 브랜드가 «가맹점 밖 구매자에게도 판다» 를 고를 수 있게. 기존 3값 무접촉.
 *     ⛔ `MODIFY ... ENUM(하드코딩 목록)` 금지 — 남의 값을 지운다(2026-08-30 사고).
 *        반드시 expandEnum 으로 **부족한 값만** 더한다.
 *
 *  2) `brands.shop_slug` 추가(varchar(50) UNIQUE, NULL 허용)
 *     — 카탈로그 링크의 열쇠. 공급업체(`supplier_companies.shop_slug`)에 이미 있는 것과
 *       **같은 규칙·같은 이름**을 쓴다. 새 개념을 만들지 않는다.
 *
 * 멱등: 이미 있으면 건너뛴다. process.exit 필수(메모리 reference_deploy_migration_must_exit).
 * 사용: node scripts/migrate-buyer-free-catalog.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  try {
    // ── 1) distribution_mode += external_buyers ──────────────────────────────
    // 내가 담당하는 값 **하나만** 넘긴다. 남의 값까지 나열하는 순간 그게 소거 장치가 된다.
    const r1 = await expandEnum(sequelize, 'brand_products', 'distribution_mode', ['external_buyers']);
    if (r1.added.length) console.log(`  ✓ brand_products.distribution_mode += ${r1.added.join(', ')}`);
    else console.log('  · brand_products.distribution_mode 이미 최신 (건너뜀)');
    console.log(`    현재 값: ${r1.current.join(', ')}`);

    // ── 2) brands.shop_slug ─────────────────────────────────────────────────
    const [col] = await sequelize.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brands' AND COLUMN_NAME = 'shop_slug'`
    );
    if (col.length) {
      console.log('  · brands.shop_slug 이미 있음 (건너뜀)');
    } else {
      await sequelize.query('ALTER TABLE brands ADD COLUMN shop_slug VARCHAR(50) NULL');
      console.log('  ✓ brands.shop_slug 추가');
    }

    // UNIQUE 는 컬럼 추가와 나눠서 — 이미 인덱스만 있는 중간 상태에서도 멱등하게 끝나야 한다.
    const [idx] = await sequelize.query(
      `SELECT INDEX_NAME FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brands' AND COLUMN_NAME = 'shop_slug'`
    );
    if (idx.length) {
      console.log('  · brands.shop_slug 인덱스 이미 있음 (건너뜀)');
    } else {
      await sequelize.query('ALTER TABLE brands ADD UNIQUE KEY uniq_brands_shop_slug (shop_slug)');
      console.log('  ✓ brands.shop_slug UNIQUE 인덱스 추가');
    }

    process.exit(0);
  } catch (err) {
    console.error('✗ migrate-buyer-free-catalog 실패:', err.message);
    process.exit(1);
  }
})();
