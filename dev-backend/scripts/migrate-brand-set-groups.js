/**
 * Idempotent migration — add set_groups JSON column to brand_menus AND products
 * (v2 set slots). sync-database.js does NOT reliably ALTER these, so guarantee here.
 * Safe to run repeatedly.
 */
require('dotenv').config();
const db = require('../models');

(async () => {
  const seq = db.BrandMenu.sequelize;
  try {
    const qi = seq.getQueryInterface();
    for (const table of ['products', 'brand_menus']) {
      const cols = await qi.describeTable(table);
      if (cols.set_groups) {
        console.log(`✓ ${table}.set_groups already exists — no change`);
      } else {
        await seq.query(`ALTER TABLE ${table} ADD COLUMN set_groups JSON NULL AFTER set_items`);
        console.log(`✓ ${table}.set_groups column added (migrated)`);
      }
    }
    await seq.close();
    process.exit(0);
  } catch (e) {
    console.error('✗ migrate-brand-set-groups failed:', e.message);
    process.exit(1);
  }
})();
