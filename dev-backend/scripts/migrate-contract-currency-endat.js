// Phase 1 migration: contracts.currency + contract_plans.end_at + backfill.
// Idempotent — safe to run multiple times.
//
// 1. ALTER TABLE contracts ADD COLUMN currency VARCHAR(3) NULL
// 2. ALTER TABLE contract_plans ADD COLUMN end_at DATETIME NULL
// 3. Backfill contracts.currency from foodcourts.currency / brands.currency

const { sequelize } = require('/var/www/dev-backend/config/database');

async function columnExists(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  return Number(rows[0].c) > 0;
}

async function run() {
  try {
    console.log('→ Checking contracts.currency …');
    if (await columnExists('contracts', 'currency')) {
      console.log('  already exists, skipping ALTER');
    } else {
      await sequelize.query(
        `ALTER TABLE contracts
         ADD COLUMN currency VARCHAR(3) NULL
         COMMENT 'ISO 4217 code. Inherited from entity default at creation; stored explicitly so historical contracts stay stable when entity default changes.'
         AFTER entity_id`
      );
      console.log('  ✓ contracts.currency added');
    }

    console.log('→ Checking contract_plans.end_at …');
    if (await columnExists('contract_plans', 'end_at')) {
      console.log('  already exists, skipping ALTER');
    } else {
      await sequelize.query(
        `ALTER TABLE contract_plans
         ADD COLUMN end_at DATETIME NULL
         COMMENT 'When this plan attachment ended. Auto-set on Contract.stage → expired/terminated.'
         AFTER assigned_at`
      );
      console.log('  ✓ contract_plans.end_at added');
    }

    // Backfill — safe to re-run (only touches NULL rows)
    console.log('→ Backfilling contracts.currency (foodcourt-owned) …');
    const [r1] = await sequelize.query(
      `UPDATE contracts c
       JOIN foodcourts f ON c.entity_id = f.id
       SET c.currency = COALESCE(f.currency, 'MYR')
       WHERE c.entity_type = 'foodcourt' AND c.currency IS NULL`
    );
    console.log(`  updated ${(r1 && r1.affectedRows) || 0} rows`);

    console.log('→ Backfilling contracts.currency (brand-owned) …');
    const [r2] = await sequelize.query(
      `UPDATE contracts c
       JOIN brands b ON c.entity_id = b.id
       SET c.currency = COALESCE(b.currency, 'MYR')
       WHERE c.entity_type = 'brand' AND c.currency IS NULL`
    );
    console.log(`  updated ${(r2 && r2.affectedRows) || 0} rows`);

    // Sanity check
    const [remaining] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM contracts WHERE currency IS NULL`
    );
    console.log(`→ Contracts still without currency: ${remaining[0].c} (should be 0)`);

    console.log('\n✓ Migration complete');
    process.exit(0);
  } catch (e) {
    console.error('✗ Migration failed:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
}

run();
