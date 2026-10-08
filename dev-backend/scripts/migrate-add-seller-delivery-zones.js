#!/usr/bin/env node
/**
 * 판매자 배송 지역 칸 추가 — brands · foodcourts · supplier_companies 의 delivery_zones JSON NULL (2026-10-07 Fable)
 * 멱등 · 백필 없음(NULL = 지역 없음 = 지금과 같은 기본 배송비). 설명: utils/deliveryZones.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TABLES = ['brands', 'foodcourts', 'supplier_companies'];

(async () => {
  for (const table of TABLES) {
    const cols = await sequelize.query(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = 'delivery_zones'",
      { replacements: [table], type: QueryTypes.SELECT });
    if (cols.length) {
      console.log(`[migrate-add-seller-delivery-zones] ${table}: 이미 있음 — 건너뜀`);
      continue;
    }
    await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN delivery_zones JSON NULL COMMENT '배송 지역 목록 — 구매자 주소 주(州)로 자동 매칭, 미매칭은 delivery_fee'`);
    console.log(`[migrate-add-seller-delivery-zones] ${table}: 칸 추가`);
  }
  await sequelize.close(); process.exit(0);
})().catch(async (e) => { console.error('[migrate-add-seller-delivery-zones] 실패:', e.message); try { await sequelize.close(); } catch {} process.exit(1); });
