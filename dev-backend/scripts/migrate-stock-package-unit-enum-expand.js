#!/usr/bin/env node
/**
 * 재고 행 기준단위(package_unit) ENUM 확장 — expand-only · 멱등 (2026-10-15 Fable 설계 D3)
 *   Irene: «Package Unit이 재고아이템에는 부족한데 공급업체 상품등록 나올 때 나오는 것처럼 카톤도 나오고 그래야 해.»
 * ingredients.package_unit · product_ingredients.package_unit 에 utils/stockUnits.STOCK_PACKAGE_UNIT_ENUM 전부를 보장한다.
 * unit(취급단위)·레시피 줄 ENUM 은 건드리지 않는다.
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');
const { STOCK_PACKAGE_UNIT_ENUM } = require('../utils/stockUnits');

const TAG = '[migrate-stock-package-unit-enum-expand]';

(async () => {
  try {
    for (const table of ['ingredients', 'product_ingredients']) {
      const r = await expandEnum(sequelize, table, 'package_unit', STOCK_PACKAGE_UNIT_ENUM);
      console.log(`${TAG} ${table}.package_unit: ${r.added.length ? `추가 ${r.added.join(',')}` : '이미 있음'} → (${r.current.join(',')})`);
    }
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error(`${TAG} 실패:`, e.message);
    try { await sequelize.close(); } catch {}
    process.exit(1);
  }
})();
