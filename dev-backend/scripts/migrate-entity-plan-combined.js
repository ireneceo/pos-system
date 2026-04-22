// Phase 2-A: Extend EntityPlan.charge_type ENUM to include 'combined'.
// Idempotent. Combined = max(EntityPlanPrice.monthly_price, percentage_value × revenue).

const { sequelize } = require('/var/www/dev-backend/config/database');

async function enumIncludes(table, column, value) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_TYPE FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  if (!rows[0]) return false;
  return String(rows[0].COLUMN_TYPE).includes(`'${value}'`);
}

async function run() {
  try {
    console.log('→ Checking entity_plans.charge_type for combined …');
    if (await enumIncludes('entity_plans', 'charge_type', 'combined')) {
      console.log('  already has combined, skipping ALTER');
    } else {
      await sequelize.query(
        `ALTER TABLE entity_plans
         MODIFY COLUMN charge_type ENUM('fixed', 'percentage', 'combined')
         DEFAULT 'fixed'
         COMMENT 'fixed=EntityPlanPrice.monthly_price / percentage=percentage_value*revenue / combined=MAX(both)'`
      );
      console.log('  ✓ entity_plans.charge_type ENUM extended');
    }
    console.log('\n✓ Migration complete');
    process.exit(0);
  } catch (e) {
    console.error('✗ Migration failed:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
}

run();
