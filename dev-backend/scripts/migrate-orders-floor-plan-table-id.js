/**
 * Migration: add orders.floor_plan_table_id + backfill legacy orders.
 *
 * Issue: orders.table_number is a free-form STRING(10). Floor Plan v2 can have the
 *        same number ("20") under different zones (Zone1-T20 vs Zone2-T20), so
 *        order routing/grouping collides.
 *
 * Fix:   add orders.floor_plan_table_id pointing at the Floor Plan v2 tables[].id.
 *        Backfill best-effort:
 *          - if the restaurant has a single zone or every floor-plan table with
 *            this number belongs to one table_groups/zone, use that table id;
 *          - otherwise leave NULL (legacy) — the lookup falls back to table_number.
 *
 * Idempotent. Safe to re-run.
 *
 *   node scripts/migrate-orders-floor-plan-table-id.js          # apply
 *   node scripts/migrate-orders-floor-plan-table-id.js --dry    # dry run
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry');

async function columnExists(table, col) {
  const [rows] = await sequelize.query(
    `SHOW COLUMNS FROM \`${table}\` LIKE :col`,
    { replacements: { col } }
  );
  return rows.length > 0;
}

async function indexExists(table, idxName) {
  const [rows] = await sequelize.query(
    `SHOW INDEX FROM \`${table}\` WHERE Key_name = :name`,
    { replacements: { name: idxName } }
  );
  return rows.length > 0;
}

async function run() {
  console.log(`[migrate] orders.floor_plan_table_id (dry=${DRY})`);

  // 1) Schema — add column
  if (!(await columnExists('orders', 'floor_plan_table_id'))) {
    if (DRY) {
      console.log('  [dry] would ALTER TABLE orders ADD COLUMN floor_plan_table_id VARCHAR(64) NULL');
    } else {
      await sequelize.query(
        `ALTER TABLE orders ADD COLUMN floor_plan_table_id VARCHAR(64) NULL
         COMMENT 'Floor plan v2 tables[].id (disambiguates same table_number across zones)'`
      );
      console.log('  ✓ column added');
    }
  } else {
    console.log('  • column already exists, skip');
  }

  // 2) Index — speed up grouping
  if (!(await indexExists('orders', 'idx_orders_floor_plan_table_id'))) {
    if (DRY) {
      console.log('  [dry] would CREATE INDEX idx_orders_floor_plan_table_id');
    } else {
      await sequelize.query(
        `CREATE INDEX idx_orders_floor_plan_table_id ON orders (floor_plan_table_id)`
      );
      console.log('  ✓ index added');
    }
  } else {
    console.log('  • index already exists, skip');
  }

  // Skip backfill if column wasn't created (dry-run first execution)
  if (!(await columnExists('orders', 'floor_plan_table_id'))) {
    console.log('\n[backfill] skipped — column not present (dry run before apply).');
    await sequelize.close();
    process.exit(0);
  }

  // 3) Backfill — for each (restaurant, table_number) on a dine-in order with
  //    NULL floor_plan_table_id, look up the floor_plan and resolve a unique id.
  console.log('\n[backfill] scanning orders with floor_plan_table_id IS NULL ...');

  const restaurants = await sequelize.query(
    `SELECT id, floor_plan FROM restaurants WHERE floor_plan IS NOT NULL`,
    { type: QueryTypes.SELECT }
  );

  let scanned = 0, filled = 0, ambiguous = 0;
  for (const r of restaurants) {
    let plan;
    try {
      plan = typeof r.floor_plan === 'string' ? JSON.parse(r.floor_plan) : r.floor_plan;
    } catch { continue; }
    if (!plan || !Array.isArray(plan.tables) || plan.tables.length === 0) continue;

    // Map: tableNumber → [{id, zone_id}]
    const byNumber = new Map();
    for (const t of plan.tables) {
      if (!t || !t.tableNumber) continue;
      const arr = byNumber.get(String(t.tableNumber)) || [];
      arr.push({ id: t.id, group_id: t.group_id || null });
      byNumber.set(String(t.tableNumber), arr);
    }

    const orderRows = await sequelize.query(
      `SELECT id, table_number FROM orders
       WHERE restaurant_id = :rid
         AND order_type = 'dine_in'
         AND table_number IS NOT NULL
         AND floor_plan_table_id IS NULL`,
      { replacements: { rid: r.id }, type: QueryTypes.SELECT }
    );

    for (const o of orderRows) {
      scanned++;
      const candidates = byNumber.get(String(o.table_number)) || [];
      if (candidates.length === 1) {
        // Single match → safe to backfill
        if (!DRY) {
          await sequelize.query(
            `UPDATE orders SET floor_plan_table_id = :tid WHERE id = :oid`,
            { replacements: { tid: candidates[0].id, oid: o.id } }
          );
        }
        filled++;
      } else if (candidates.length > 1) {
        // Multiple zones have this number → ambiguous, leave NULL (legacy fallback)
        ambiguous++;
      }
    }
  }

  console.log(`  scanned=${scanned}  filled=${filled}  ambiguous=${ambiguous}${DRY ? ' (dry — no writes)' : ''}`);

  await sequelize.close();
  process.exit(0);
}

run().catch(err => {
  console.error('FAIL:', err);
  process.exit(1);
});
