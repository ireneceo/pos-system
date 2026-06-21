#!/usr/bin/env node
/**
 * Migration — purchase_orders 오너 승인 워크플로우 (2026-06-21)
 *
 * with MIN Cafe 발주관리 추가요청 #2: 레스토랑 발주를 연결된 Owner 가 승인/반려.
 *   - status ENUM 에 'pending_approval' 추가 (draft 다음)
 *   - approval_required (BOOLEAN)         : 제출 시점 스냅샷
 *   - approved_by_user_id / approved_at   : 승인 기록
 *   - rejected_by_user_id / rejected_at / rejected_reason : 반려 기록
 *
 * 운영은 sync-database --alter 를 돌리지 않으므로([[reference_sync_alter_drops_columns]])
 * 명시적 멱등 마이그. deploy-to-production.sh 9a-2 등록.
 *
 * Usage: node scripts/migrate-po-owner-approval.js [--dry-run]
 * 멱등성: ENUM 값/컬럼이 이미 있으면 skip.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-po-owner-approval]${DRY ? ' [DRY]' : ''} ${m}`);

async function columnExists(table, col) {
  const r = await sequelize.query(
    `SELECT 1 AS x FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = :table AND column_name = :col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0;
}

async function statusEnumHasPending() {
  const r = await sequelize.query(
    `SELECT COLUMN_TYPE AS t FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'purchase_orders' AND column_name = 'status'`,
    { type: QueryTypes.SELECT });
  return r.length > 0 && /'pending_approval'/.test(r[0].t);
}

const COLUMNS = [
  { name: 'approval_required',     ddl: `ADD COLUMN approval_required TINYINT(1) NOT NULL DEFAULT 0` },
  { name: 'approved_by_user_id',   ddl: `ADD COLUMN approved_by_user_id INT NULL` },
  { name: 'approved_at',           ddl: `ADD COLUMN approved_at DATETIME NULL` },
  { name: 'rejected_by_user_id',   ddl: `ADD COLUMN rejected_by_user_id INT NULL` },
  { name: 'rejected_at',           ddl: `ADD COLUMN rejected_at DATETIME NULL` },
  { name: 'rejected_reason',       ddl: `ADD COLUMN rejected_reason TEXT NULL` }
];

async function run() {
  try {
    // 1) status ENUM 확장 — draft 바로 다음에 pending_approval
    if (await statusEnumHasPending()) {
      log('skip — purchase_orders.status already has pending_approval');
    } else if (!DRY) {
      await sequelize.query(
        `ALTER TABLE purchase_orders MODIFY COLUMN status ` +
        `ENUM('draft','pending_approval','submitted','confirmed','shipped','in_transit',` +
        `'delivered','partial_received','received','cancelled','closed','delivery_failed') ` +
        `NOT NULL DEFAULT 'draft'`);
      log('✓ added pending_approval to purchase_orders.status ENUM');
    } else { log('would add pending_approval to status ENUM'); }

    // 2) approval 컬럼들
    for (const c of COLUMNS) {
      if (await columnExists('purchase_orders', c.name)) {
        log(`skip — purchase_orders.${c.name} already present`);
      } else if (!DRY) {
        await sequelize.query(`ALTER TABLE purchase_orders ${c.ddl}`);
        log(`✓ added purchase_orders.${c.name}`);
      } else { log(`would add purchase_orders.${c.name}`); }
    }

    log('done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-po-owner-approval] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
