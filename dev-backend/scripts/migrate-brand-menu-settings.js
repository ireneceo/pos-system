// One-off: add brands.menu_settings JSON column.
// Idempotent — checks information_schema first.
//
// Usage: node scripts/migrate-brand-menu-settings.js

const { sequelize } = require('../config/database');

(async () => {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'brands' AND COLUMN_NAME = 'menu_settings'`
  );
  if (rows.length > 0) {
    console.log('= menu_settings already exists, skipping');
  } else {
    await sequelize.query(
      `ALTER TABLE brands ADD COLUMN menu_settings JSON NULL DEFAULT NULL
       COMMENT 'Brand-level menu defaults: default_distribution_mode, default_locks, default_push_target'`
    );
    console.log('+ added brands.menu_settings JSON');
  }
  console.log('Done.');
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
