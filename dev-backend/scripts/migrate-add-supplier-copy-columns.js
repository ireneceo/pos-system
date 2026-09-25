#!/usr/bin/env node
/**
 * 브랜드 공급업체 «매장에 공유» = 복사본 — 출처 칸 추가 · 멱등 (2026-09-24 · Fable ⑥ 판정 · docs/SUPPLIER_CONTRACT_SYSTEM.md §H)
 *
 * supplier_companies
 *   copied_from_supplier_company_id · copied_at · copied_by_user_id — 추적용(동기화 아님). FK 없음 — 원본이 지워져도 사본은 산다.
 *   copy_live_key (생성 칸) = 살아 있는 사본일 때만 출처 id, 지운 사본·원본은 NULL
 *   UNIQUE(registered_by_entity_type, registered_by_entity_id, copy_live_key)
 *     → 한 매장이 같은 원본의 살아 있는 사본을 둘 가질 수 없다(DB 가 강제).
 *       지운 사본(soft delete)은 NULL 이 되어 재공유를 막지 않는다.
 * supplier_products
 *   copied_from_supplier_product_id — 사본 상품의 출처(매장 재료 연결을 옮길 때 짝 찾기).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TAG = '[migrate-add-supplier-copy-columns]';

async function hasColumn(table, col) {
  const r = await sequelize.query(
    'SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?',
    { replacements: [table, col], type: QueryTypes.SELECT });
  return r.length > 0;
}
async function hasIndex(table, name) {
  const r = await sequelize.query(
    'SELECT 1 FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?',
    { replacements: [table, name], type: QueryTypes.SELECT });
  return r.length > 0;
}

(async () => {
  const adds = [
    ['supplier_companies', 'copied_from_supplier_company_id', "INT NULL COMMENT '복사본의 출처 업체(추적용·동기화 아님)'"],
    ['supplier_companies', 'copied_at', "DATETIME NULL COMMENT '복사한 시각'"],
    ['supplier_companies', 'copied_by_user_id', "INT NULL COMMENT '복사한 사용자'"],
    ['supplier_products', 'copied_from_supplier_product_id', "INT NULL COMMENT '복사본 상품의 출처 상품'"],
  ];
  for (const [t, c, def] of adds) {
    if (await hasColumn(t, c)) { console.log(`${TAG} ${t}.${c} 이미 있음`); continue; }
    await sequelize.query(`ALTER TABLE ${t} ADD COLUMN ${c} ${def}`);
    console.log(`${TAG} ${t}.${c} 추가`);
  }
  if (!(await hasColumn('supplier_companies', 'copy_live_key'))) {
    await sequelize.query("ALTER TABLE supplier_companies ADD COLUMN copy_live_key INT GENERATED ALWAYS AS (IF(deleted_at IS NULL, copied_from_supplier_company_id, NULL)) VIRTUAL COMMENT '살아 있는 사본의 출처(고유 제약용)'");
    console.log(`${TAG} supplier_companies.copy_live_key 추가`);
  } else console.log(`${TAG} supplier_companies.copy_live_key 이미 있음`);
  if (!(await hasIndex('supplier_companies', 'uq_supplier_company_live_copy'))) {
    await sequelize.query('CREATE UNIQUE INDEX uq_supplier_company_live_copy ON supplier_companies (registered_by_entity_type, registered_by_entity_id, copy_live_key)');
    console.log(`${TAG} UNIQUE uq_supplier_company_live_copy 추가`);
  } else console.log(`${TAG} UNIQUE uq_supplier_company_live_copy 이미 있음`);
  if (!(await hasIndex('supplier_products', 'idx_supplier_products_copied_from'))) {
    await sequelize.query('CREATE INDEX idx_supplier_products_copied_from ON supplier_products (copied_from_supplier_product_id)');
    console.log(`${TAG} INDEX idx_supplier_products_copied_from 추가`);
  }
  await sequelize.close(); process.exit(0);
})().catch(async (e) => { console.error(`${TAG} 실패:`, e.message); try { await sequelize.close(); } catch {} process.exit(1); });
