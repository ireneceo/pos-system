#!/usr/bin/env node
/**
 * 오너 공급업체 — 등록자·계약 주체에 'owner' 추가 · expand-only · 멱등
 * (2026-09-24 · Fable «오너=슈퍼바이저» 판정 §1-A · docs/SUPPLIER_CONTRACT_SYSTEM.md §H-3)
 *
 * supplier_companies.registered_by_entity_type · supplier_contracts.entity_type 에 'owner' 만 보장한다.
 * entity_id = 오너 계정 users.id (poOwnerApproval·restaurant_managers 가 이미 계정 id 기준).
 * purchase_orders.entity_type 은 건드리지 않는다 — 발주 주인은 항상 매장.
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

const TAG = '[migrate-owner-supplier-enum]';

(async () => {
  try {
    for (const [table, column] of [['supplier_companies', 'registered_by_entity_type'], ['supplier_contracts', 'entity_type']]) {
      const r = await expandEnum(sequelize, table, column, ['owner']);
      console.log(`${TAG} ${table}.${column}: ${r.added.length ? `추가 ${r.added.join(',')}` : '이미 있음'} → (${r.current.join(',')})`);
    }
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error(`${TAG} 실패:`, e.message);
    try { await sequelize.close(); } catch {}
    process.exit(1);
  }
})();
