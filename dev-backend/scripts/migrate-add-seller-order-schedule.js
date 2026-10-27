#!/usr/bin/env node
/**
 * 판매자 발주 마감·배송일 칸 추가 — brands · foodcourts · supplier_companies 의 order_schedule JSON NULL (2026-10-27 Fable)
 * 멱등 · 백필 없음(NULL = 마감 정보 없음 = 화면에 안 보임). 설명: utils/orderSchedule.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TABLES = ['brands', 'foodcourts', 'supplier_companies'];

(async () => {
  for (const table of TABLES) {
    const cols = await sequelize.query(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = 'order_schedule'",
      { replacements: [table], type: QueryTypes.SELECT });
    if (cols.length) {
      console.log(`[migrate-add-seller-order-schedule] ${table}: 이미 있음 — 건너뜀`);
      continue;
    }
    await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN order_schedule JSON NULL COMMENT '발주 마감 요일·시각과 배송일 규칙 — 안내 전용(발주를 막지 않음)'`);
    console.log(`[migrate-add-seller-order-schedule] ${table}: 칸 추가`);
  }
  await sequelize.close(); process.exit(0);
})().catch(async (e) => { console.error('[migrate-add-seller-order-schedule] 실패:', e.message); try { await sequelize.close(); } catch {} process.exit(1); });
