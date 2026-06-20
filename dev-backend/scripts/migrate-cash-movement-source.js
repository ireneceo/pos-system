#!/usr/bin/env node
/**
 * Migration — cash_movements.source 컬럼
 *
 * source ENUM('manual','settlement') DEFAULT 'manual'
 *   - manual     : 직원이 직접 넣은 입출금 (Cash in/out)
 *   - settlement : 파이널 마감 확정 시 현금 차이(over/short) 자동 조정 한 줄
 *
 * settlement 행은 시스템 감사기록 → 수정/삭제 불가, 시재 원장에서 구분 표시.
 * 운영은 sync-database --alter 를 돌리지 않으므로([[reference_sync_alter_drops_columns]])
 * 명시적 멱등 마이그. deploy-to-production.sh 9a-2 등록.
 *
 * Usage: node scripts/migrate-cash-movement-source.js [--dry-run]
 * 멱등성: 컬럼이 이미 있으면 skip.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-cash-movement-source]${DRY ? ' [DRY]' : ''} ${m}`);

async function columnExists(table, col) {
  const r = await sequelize.query(
    `SELECT 1 AS x FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = :table AND column_name = :col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0;
}

async function run() {
  try {
    if (await columnExists('cash_movements', 'source')) {
      log('skip — cash_movements.source already present');
    } else if (!DRY) {
      await sequelize.query(
        `ALTER TABLE cash_movements ADD COLUMN source ENUM('manual','settlement') NOT NULL DEFAULT 'manual' AFTER reason`);
      log('✓ added cash_movements.source');
    } else { log('would add cash_movements.source'); }

    log('done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-cash-movement-source] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
