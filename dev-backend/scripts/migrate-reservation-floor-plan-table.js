#!/usr/bin/env node
/**
 * Migration — reservations.floor_plan_table_id 컬럼 추가 (P2-6 예약↔플로어플랜 연동)
 *
 * 배경: 예약은 그동안 table_number(텍스트)만 보관해 플로어플랜 v2 테이블(FPTI =
 *       floor_plan.tables[].id, 예: t_abc123)과 구조적으로 연결되지 않았다. 이 컬럼은
 *       Order.floor_plan_table_id 와 동일한 FPTI 참조로, 예약을 특정 테이블에 묶어
 *       플로어플랜 '예약됨' 표시 + 체크인 흐름을 가능하게 한다. FK 아님(플로어플랜은
 *       Restaurant JSON). 기존 모든 행은 NULL(미배정/레거시) — 아무 영향 없음.
 *
 *       운영은 sync-database --alter 를 돌리지 않으므로(컬럼 드롭 사고 방지) 명시적
 *       멱등 ALTER 필요. deploy-to-production.sh 9a-2 목록에 등록.
 *
 * Usage:
 *   node scripts/migrate-reservation-floor-plan-table.js --dry-run
 *   node scripts/migrate-reservation-floor-plan-table.js
 *
 * 멱등성: reservations.floor_plan_table_id 가 이미 있으면 skip.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (msg) => console.log(`[migrate-reservation-fpti]${DRY ? ' [DRY]' : ''} ${msg}`);

async function run() {
  try {
    const rows = await sequelize.query(
      `SELECT COLUMN_NAME AS c FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = 'reservations' AND column_name = 'floor_plan_table_id'`,
      { type: QueryTypes.SELECT }
    );
    if (rows.length) {
      log('skip — reservations.floor_plan_table_id already present');
      process.exit(0);
    }

    const sql = `ALTER TABLE reservations ADD COLUMN floor_plan_table_id VARCHAR(64) NULL AFTER table_number`;
    log(`적용 SQL: ${sql}`);
    if (DRY) { log('DRY-RUN — 적용 안 함'); process.exit(0); }

    await sequelize.query(sql);
    log('✓ done — reservations.floor_plan_table_id 추가 (기존 행 NULL)');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-reservation-fpti] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
