#!/usr/bin/env node
/**
 * supplier_companies.shared_with_stores 추가 — 멱등 (2026-09-22)
 * 기본값 1(true) = 종전 동작(브랜드 등록 외부 업체를 산하 매장이 상속) 유지. 기존 행 값은 건드리지 않는다.
 * 새로 BG 가 등록·이관하는 업체만 코드가 0 으로 만든다. 설명: models/SupplierCompany.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

(async () => {
  const cols = await sequelize.query(
    "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'supplier_companies' AND COLUMN_NAME = 'shared_with_stores'",
    { type: QueryTypes.SELECT });
  if (cols.length) {
    console.log('[migrate-add-supplier-company-shared] 이미 있음 — 건너뜀');
  } else {
    await sequelize.query("ALTER TABLE supplier_companies ADD COLUMN shared_with_stores TINYINT(1) NOT NULL DEFAULT 1 COMMENT '브랜드 등록 외부 업체를 산하 매장이 상속하는가'");
    console.log('[migrate-add-supplier-company-shared] 칸 추가 (기존 행 전부 1 = 종전 동작)');
  }
  const [r] = await sequelize.query('SELECT shared_with_stores v, COUNT(*) n FROM supplier_companies GROUP BY 1');
  console.log('[migrate-add-supplier-company-shared] 분포', JSON.stringify(r));
  await sequelize.close(); process.exit(0);
})().catch(async (e) => { console.error('[migrate-add-supplier-company-shared] 실패:', e.message); try { await sequelize.close(); } catch {} process.exit(1); });
