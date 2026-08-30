#!/usr/bin/env node
/**
 * Sprint 7 — Operational Hardening Migration
 *
 * Applies:
 *  - ALTER inventory_transactions (entity_type, entity_id, purchase_order_id, ENUM 확장, restaurant_id NULL 허용)
 *  - ALTER inventory_batches (entity_type, entity_id, restaurant_id NULL 허용)
 *  - ALTER purchase_orders.status ENUM 확장 (in_transit, delivery_failed)
 *  - ALTER purchase_order_items (discrepancy_*)
 *  - ALTER purchase_order_returns (auto_generated, source_event)
 *  - ALTER carriers (webhook_*)
 *  - CREATE TABLE carrier_webhook_events
 *  - Backfill inventory_transactions (entity_type='restaurant', entity_id=restaurant_id)
 *  - Backfill inventory_batches (동일 패턴)
 *
 * Usage:
 *   node scripts/sprint7-migration.js --dry-run    # plan만 출력
 *   node scripts/sprint7-migration.js              # 실제 실행
 *
 * 멱등성: ALTER는 information_schema 사전 검사 (이미 존재하는 컬럼/인덱스 skip)
 *         Backfill은 WHERE entity_type IS NULL 조건이라 자동 멱등
 *
 * Rollback: scripts/sprint7-migration-rollback.js (별도)
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
// ENUM 은 expand-only — 목록 하드코딩 금지 (scripts/lib/enumExpand.js 주석 참조)
const { expandEnum } = require('./lib/enumExpand');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const CHUNK = 1000;

const log = (msg) => console.log(`[sprint7-migration]${DRY ? ' [DRY]' : ''} ${msg}`);

// ─── helpers: introspection ──────────────────────────
async function columnExists(table, column) {
  const r = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    { replacements: [table, column], type: QueryTypes.SELECT }
  );
  return r[0].c > 0;
}

async function indexExists(table, indexName) {
  const r = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.statistics
     WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?`,
    { replacements: [table, indexName], type: QueryTypes.SELECT }
  );
  return r[0].c > 0;
}

async function tableExists(table) {
  const r = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.tables
     WHERE table_schema = DATABASE() AND table_name = ?`,
    { replacements: [table], type: QueryTypes.SELECT }
  );
  return r[0].c > 0;
}

async function getColumnDef(table, column) {
  const r = await sequelize.query(
    `SELECT COLUMN_TYPE AS column_type, IS_NULLABLE AS is_nullable, COLUMN_DEFAULT AS column_default
     FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    { replacements: [table, column], type: QueryTypes.SELECT }
  );
  return r[0] || null;
}

// ─── runner ──────────────────────────────────────────
async function exec(sql, label) {
  log(`→ ${label}`);
  if (DRY) { console.log(`    SQL: ${sql.slice(0, 200)}${sql.length > 200 ? '...' : ''}`); return; }
  await sequelize.query(sql);
}

// ─── A1. inventory_transactions ──────────────────────
async function alterInventoryTransactions() {
  log('=== A1. inventory_transactions ===');

  if (!(await columnExists('inventory_transactions', 'entity_type'))) {
    await exec(
      `ALTER TABLE inventory_transactions
         ADD COLUMN entity_type ENUM('restaurant','brand','foodcourt') NULL AFTER restaurant_id`,
      'add column entity_type'
    );
  } else log('skip — entity_type exists');

  if (!(await columnExists('inventory_transactions', 'entity_id'))) {
    await exec(
      `ALTER TABLE inventory_transactions
         ADD COLUMN entity_id INT NULL AFTER entity_type`,
      'add column entity_id'
    );
  } else log('skip — entity_id exists');

  if (!(await columnExists('inventory_transactions', 'purchase_order_id'))) {
    await exec(
      `ALTER TABLE inventory_transactions
         ADD COLUMN purchase_order_id INT NULL AFTER stock_take_id`,
      'add column purchase_order_id'
    );
  } else log('skip — purchase_order_id exists');

  // restaurant_id NULL 허용 (기존 NOT NULL → NULL)
  const def = await getColumnDef('inventory_transactions', 'restaurant_id');
  if (def && def.is_nullable === 'NO') {
    await exec(
      `ALTER TABLE inventory_transactions MODIFY COLUMN restaurant_id INT NULL`,
      'restaurant_id allow NULL'
    );
  } else log('skip — restaurant_id already nullable');

  // ENUM 확장 — expand-only. 이 마이그가 담당하는 값만 보장한다(목록 하드코딩 금지).
  {
    const r = await expandEnum(sequelize, 'inventory_transactions', 'transaction_type',
      ['return_in', 'return_out']);
    log(r.added.length
      ? `transaction_type ENUM 확장 — 추가: ${r.added.join(', ')}`
      : 'skip — transaction_type ENUM already extended');
  }

  if (!(await indexExists('inventory_transactions', 'idx_entity'))) {
    await exec(
      `ALTER TABLE inventory_transactions ADD INDEX idx_entity (entity_type, entity_id)`,
      'add index idx_entity'
    );
  } else log('skip — idx_entity exists');

  if (!(await indexExists('inventory_transactions', 'idx_po'))) {
    await exec(
      `ALTER TABLE inventory_transactions ADD INDEX idx_po (purchase_order_id)`,
      'add index idx_po'
    );
  } else log('skip — idx_po exists');

  // FK 추가 (이미 있으면 skip)
  const fk = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.table_constraints
     WHERE table_schema = DATABASE() AND table_name = 'inventory_transactions'
       AND constraint_type = 'FOREIGN KEY' AND constraint_name = 'fk_inv_trans_po'`,
    { type: QueryTypes.SELECT }
  );
  if (fk[0].c === 0) {
    await exec(
      `ALTER TABLE inventory_transactions
         ADD CONSTRAINT fk_inv_trans_po FOREIGN KEY (purchase_order_id)
             REFERENCES purchase_orders(id) ON DELETE SET NULL`,
      'add FK fk_inv_trans_po'
    );
  } else log('skip — fk_inv_trans_po exists');
}

// ─── A2. inventory_batches ───────────────────────────
async function alterInventoryBatches() {
  log('=== A2. inventory_batches ===');

  if (!(await columnExists('inventory_batches', 'entity_type'))) {
    await exec(
      `ALTER TABLE inventory_batches
         ADD COLUMN entity_type ENUM('restaurant','brand','foodcourt') NULL AFTER restaurant_id`,
      'add column entity_type'
    );
  } else log('skip — entity_type exists');

  if (!(await columnExists('inventory_batches', 'entity_id'))) {
    await exec(
      `ALTER TABLE inventory_batches
         ADD COLUMN entity_id INT NULL AFTER entity_type`,
      'add column entity_id'
    );
  } else log('skip — entity_id exists');

  const def = await getColumnDef('inventory_batches', 'restaurant_id');
  if (def && def.is_nullable === 'NO') {
    await exec(
      `ALTER TABLE inventory_batches MODIFY COLUMN restaurant_id INT NULL`,
      'restaurant_id allow NULL'
    );
  } else log('skip — restaurant_id already nullable');

  if (!(await indexExists('inventory_batches', 'idx_entity'))) {
    await exec(
      `ALTER TABLE inventory_batches ADD INDEX idx_entity (entity_type, entity_id)`,
      'add index idx_entity'
    );
  } else log('skip — idx_entity exists');
}

// ─── A3. purchase_orders.status ──────────────────────
async function alterPurchaseOrders() {
  log('=== A3. purchase_orders.status ===');
  // expand-only. 이 마이그가 담당하는 값은 in_transit·delivery_failed 둘뿐이다.
  // 예전엔 11개 목록을 하드코딩해, 가드가 걸릴 때마다 남의 값(pending_approval)을 지울 수 있었다.
  {
    const r = await expandEnum(sequelize, 'purchase_orders', 'status',
      ['in_transit', 'delivery_failed']);
    log(r.added.length
      ? `status ENUM 확장 — 추가: ${r.added.join(', ')}`
      : 'skip — status ENUM already extended');
  }
}

// ─── A4. purchase_order_items ────────────────────────
async function alterPurchaseOrderItems() {
  log('=== A4. purchase_order_items ===');

  if (!(await columnExists('purchase_order_items', 'discrepancy_reason'))) {
    await exec(
      `ALTER TABLE purchase_order_items
         ADD COLUMN discrepancy_reason ENUM('short','damaged','wrong_item','pending') NULL`,
      'add discrepancy_reason'
    );
  } else log('skip — discrepancy_reason exists');

  if (!(await columnExists('purchase_order_items', 'discrepancy_note'))) {
    await exec(
      `ALTER TABLE purchase_order_items
         ADD COLUMN discrepancy_note VARCHAR(500) NULL`,
      'add discrepancy_note'
    );
  } else log('skip — discrepancy_note exists');

  if (!(await columnExists('purchase_order_items', 'discrepancy_reported_at'))) {
    await exec(
      `ALTER TABLE purchase_order_items
         ADD COLUMN discrepancy_reported_at DATETIME NULL`,
      'add discrepancy_reported_at'
    );
  } else log('skip — discrepancy_reported_at exists');

  if (!(await columnExists('purchase_order_items', 'discrepancy_reported_by_user_id'))) {
    await exec(
      `ALTER TABLE purchase_order_items
         ADD COLUMN discrepancy_reported_by_user_id INT NULL`,
      'add discrepancy_reported_by_user_id'
    );
  } else log('skip — discrepancy_reported_by_user_id exists');

  if (!(await indexExists('purchase_order_items', 'idx_discrepancy'))) {
    await exec(
      `ALTER TABLE purchase_order_items ADD INDEX idx_discrepancy (discrepancy_reason)`,
      'add index idx_discrepancy'
    );
  } else log('skip — idx_discrepancy exists');
}

// ─── A5. purchase_order_returns ──────────────────────
async function alterPurchaseOrderReturns() {
  log('=== A5. purchase_order_returns ===');

  if (!(await columnExists('purchase_order_returns', 'auto_generated'))) {
    await exec(
      `ALTER TABLE purchase_order_returns
         ADD COLUMN auto_generated BOOLEAN NOT NULL DEFAULT FALSE`,
      'add auto_generated'
    );
  } else log('skip — auto_generated exists');

  if (!(await columnExists('purchase_order_returns', 'source_event'))) {
    await exec(
      `ALTER TABLE purchase_order_returns
         ADD COLUMN source_event ENUM('manual','receive_damage','receive_wrong_item') NOT NULL DEFAULT 'manual'`,
      'add source_event'
    );
  } else log('skip — source_event exists');

  if (!(await indexExists('purchase_order_returns', 'idx_auto'))) {
    await exec(
      `ALTER TABLE purchase_order_returns ADD INDEX idx_auto (auto_generated, status)`,
      'add index idx_auto'
    );
  } else log('skip — idx_auto exists');
}

// ─── A6. carriers ────────────────────────────────────
async function alterCarriers() {
  log('=== A6. carriers ===');

  const cols = [
    ['webhook_secret', 'VARCHAR(128) NULL'],
    ['webhook_event_path', 'VARCHAR(255) NULL'],
    ['webhook_tracking_path', 'VARCHAR(255) NULL'],
    ['webhook_idempotency_path', 'VARCHAR(255) NULL'],
    ['webhook_status_map', 'JSON NULL']
  ];
  for (const [name, type] of cols) {
    if (!(await columnExists('carriers', name))) {
      await exec(`ALTER TABLE carriers ADD COLUMN ${name} ${type}`, `add ${name}`);
    } else log(`skip — ${name} exists`);
  }
}

// ─── B1. carrier_webhook_events ──────────────────────
async function createCarrierWebhookEvents() {
  log('=== B1. carrier_webhook_events ===');
  if (await tableExists('carrier_webhook_events')) {
    log('skip — table exists');
    return;
  }
  await exec(
    `CREATE TABLE carrier_webhook_events (
       id INT PRIMARY KEY AUTO_INCREMENT,
       carrier_id INT NOT NULL,
       carrier_event_id VARCHAR(255) NULL,
       payload_hash CHAR(64) NOT NULL,
       signature_valid BOOLEAN NOT NULL,
       payload JSON NOT NULL,
       raw_body MEDIUMTEXT NOT NULL,
       purchase_order_id INT NULL,
       mapped_status VARCHAR(40) NULL,
       status ENUM('pending_apply','applied','ignored_duplicate','ignored_regress','failed') NOT NULL DEFAULT 'pending_apply',
       applied_at DATETIME NULL,
       error TEXT NULL,
       retry_count INT NOT NULL DEFAULT 0,
       simulated BOOLEAN NOT NULL DEFAULT FALSE,
       source_ip VARCHAR(45) NULL,
       received_at DATETIME NOT NULL,
       created_at DATETIME NOT NULL,
       updated_at DATETIME NOT NULL,
       UNIQUE KEY uk_payload_hash (payload_hash),
       INDEX idx_carrier_received (carrier_id, received_at),
       INDEX idx_po (purchase_order_id),
       INDEX idx_status_received (status, received_at),
       INDEX idx_simulated (simulated),
       FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE RESTRICT,
       FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE SET NULL
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    'CREATE TABLE carrier_webhook_events'
  );
}

// ─── Backfill ────────────────────────────────────────
async function backfillTable(table) {
  log(`=== Backfill ${table} ===`);

  // dry-run에서는 entity_type 컬럼이 아직 없을 수 있으므로 컬럼 존재 확인 후 진행
  if (!(await columnExists(table, 'entity_type'))) {
    log(`  [DRY] entity_type column not yet added — skip count (would backfill after ALTER)`);
    return;
  }

  // Count first
  const total = await sequelize.query(
    `SELECT COUNT(*) AS c FROM ${table}
     WHERE entity_type IS NULL AND restaurant_id IS NOT NULL`,
    { type: QueryTypes.SELECT }
  );
  const cnt = total[0].c;
  log(`  candidates: ${cnt} rows`);
  if (cnt === 0) { log('  nothing to backfill'); return; }
  if (DRY) { log(`  [DRY] would backfill ${cnt} rows in chunks of ${CHUNK}`); return; }

  let updated = 0;
  while (true) {
    const r = await sequelize.query(
      `UPDATE ${table}
         SET entity_type = 'restaurant', entity_id = restaurant_id
       WHERE entity_type IS NULL AND restaurant_id IS NOT NULL
       LIMIT ${CHUNK}`
    );
    const affected = r[0].affectedRows ?? r[0];
    if (!affected || affected === 0) break;
    updated += affected;
    log(`  ... ${updated} / ${cnt}`);
  }
  log(`  ✓ ${updated} rows updated`);
}

// ─── Verification ────────────────────────────────────
async function verify() {
  log('=== Verification ===');
  for (const tbl of ['inventory_transactions', 'inventory_batches']) {
    const r = await sequelize.query(
      `SELECT COUNT(*) AS c FROM ${tbl}
       WHERE entity_type IS NULL AND restaurant_id IS NOT NULL`,
      { type: QueryTypes.SELECT }
    );
    if (r[0].c > 0) {
      log(`  ✗ ${tbl}: ${r[0].c} rows still have NULL entity_type — FAILED`);
      throw new Error(`Backfill incomplete for ${tbl}`);
    } else {
      log(`  ✓ ${tbl}: 0 rows with NULL entity_type`);
    }
  }
  // 신규 컬럼 존재 확인
  const checks = [
    ['inventory_transactions', 'entity_type'],
    ['inventory_transactions', 'purchase_order_id'],
    ['inventory_batches', 'entity_type'],
    ['purchase_order_items', 'discrepancy_reason'],
    ['purchase_order_returns', 'auto_generated'],
    ['carriers', 'webhook_secret']
  ];
  for (const [tbl, col] of checks) {
    if (!(await columnExists(tbl, col))) throw new Error(`${tbl}.${col} missing`);
  }
  log('  ✓ all expected columns exist');

  if (!(await tableExists('carrier_webhook_events'))) throw new Error('carrier_webhook_events missing');
  log('  ✓ carrier_webhook_events table exists');
}

// ─── Main ────────────────────────────────────────────
(async () => {
  const t0 = Date.now();
  try {
    log(DRY ? 'DRY RUN — no changes will be applied' : 'APPLY MODE — changes will be committed');
    log('Database connection check...');
    await sequelize.authenticate();
    log('✓ DB connected');

    await alterInventoryTransactions();
    await alterInventoryBatches();
    await alterPurchaseOrders();
    await alterPurchaseOrderItems();
    await alterPurchaseOrderReturns();
    await alterCarriers();
    await createCarrierWebhookEvents();

    await backfillTable('inventory_transactions');
    await backfillTable('inventory_batches');

    if (!DRY) await verify();

    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    log(`✓ Sprint 7 migration complete (${elapsed}s)`);
    process.exit(0);
  } catch (err) {
    log(`✗ FAILED: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
})();
