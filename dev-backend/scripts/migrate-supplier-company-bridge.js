/**
 * migrate-supplier-company-bridge.js (2026-06-22, Irene)
 *
 * 레거시 `suppliers`(OWN/brand 디렉토리)를 신 공급망 체계(`supplier_companies` + 상품 + 발주)에
 * 안전하게 잇기 위한 브리지 컬럼. 통째 마이그레이션(FK 6개 재배선, 고위험) 대신, 레거시 supplier 가
 * "상품 등록/발주"가 필요할 때만 대응 supplier_company 를 find-or-create 해서 이 컬럼으로 링크한다.
 * (재고/배치/BG/상품 FK 는 그대로 — 회귀 0.)
 *
 * 멱등: 컬럼이 이미 있으면 skip.
 */
require('dotenv').config({ quiet: true });
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

(async () => {
  try {
    const col = await sequelize.query(
      "SHOW COLUMNS FROM suppliers LIKE 'supplier_company_id'",
      { type: QueryTypes.SELECT }
    );
    if (col.length > 0) {
      console.log('[migrate-supplier-company-bridge] ✓ suppliers.supplier_company_id already exists — done (skip)');
      process.exit(0);
    }
    await sequelize.query(
      "ALTER TABLE suppliers ADD COLUMN supplier_company_id INT NULL COMMENT 'Bridge → supplier_companies (외부공급업체 체계). 상품등록/발주 시 find-or-create 링크'"
    );
    console.log('[migrate-supplier-company-bridge] ✓ migrated: added suppliers.supplier_company_id — done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-supplier-company-bridge] ERROR', e.message);
    process.exit(1);
  }
})();
