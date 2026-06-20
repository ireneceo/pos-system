#!/usr/bin/env node
/**
 * Migration — Cash-up Phase 2 (인출/입금 + Z-Report + 결제수단 사전등록)
 *
 *   1) cash_movements (신규 테이블) — 교대 중 paid in/out
 *   2) payment_method_settings (신규 테이블) — 결제수단 사전등록
 *   3) cash_reconciliations.zreport (JSON) + zreport_printed_at (DATETIME) 컬럼
 *
 * 운영은 sync-database --alter 를 돌리지 않으므로([[reference_sync_alter_drops_columns]])
 * 명시적 멱등 마이그. deploy-to-production.sh 9a-2 등록.
 *
 * Usage: node scripts/migrate-cash-phase2.js [--dry-run]
 * 멱등성: 테이블/컬럼이 이미 있으면 각 단계 skip.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-cash-phase2]${DRY ? ' [DRY]' : ''} ${m}`);

async function tableExists(name) {
  const r = await sequelize.query(
    `SELECT 1 AS x FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = :name`,
    { type: QueryTypes.SELECT, replacements: { name } });
  return r.length > 0;
}
async function columnExists(table, col) {
  const r = await sequelize.query(
    `SELECT 1 AS x FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = :table AND column_name = :col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0;
}

async function run() {
  try {
    // 1) cash_movements
    if (await tableExists('cash_movements')) {
      log('skip — cash_movements already exists');
    } else if (!DRY) {
      await sequelize.query(`
        CREATE TABLE cash_movements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          shift_id INT NOT NULL,
          restaurant_id INT NOT NULL,
          type ENUM('in','out') NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          reason VARCHAR(255) NULL,
          created_by_id INT NULL,
          created_by_name VARCHAR(255) NULL,
          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL,
          INDEX cash_movement_shift (shift_id),
          INDEX cash_movement_restaurant (restaurant_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      log('✓ created cash_movements');
    } else { log('would create cash_movements'); }

    // 2) payment_method_settings
    if (await tableExists('payment_method_settings')) {
      log('skip — payment_method_settings already exists');
    } else if (!DRY) {
      await sequelize.query(`
        CREATE TABLE payment_method_settings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          restaurant_id INT NOT NULL,
          method_key VARCHAR(64) NOT NULL,
          label VARCHAR(100) NOT NULL,
          type ENUM('cash','card','ewallet','other') NOT NULL DEFAULT 'other',
          sort_order INT NOT NULL DEFAULT 0,
          enabled TINYINT(1) NOT NULL DEFAULT 1,
          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL,
          UNIQUE KEY pms_restaurant_method (restaurant_id, method_key)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      log('✓ created payment_method_settings');
    } else { log('would create payment_method_settings'); }

    // 3) cash_reconciliations.zreport + zreport_printed_at
    for (const [col, ddl] of [
      ['zreport', 'ADD COLUMN zreport JSON NULL'],
      ['zreport_printed_at', 'ADD COLUMN zreport_printed_at DATETIME NULL']
    ]) {
      if (await columnExists('cash_reconciliations', col)) {
        log(`skip — cash_reconciliations.${col} already present`);
      } else if (!DRY) {
        await sequelize.query(`ALTER TABLE cash_reconciliations ${ddl}`);
        log(`✓ added cash_reconciliations.${col}`);
      } else { log(`would add cash_reconciliations.${col}`); }
    }

    log('done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-cash-phase2] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
