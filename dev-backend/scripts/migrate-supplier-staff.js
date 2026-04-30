/**
 * Migration: Supplier Staff (B2)
 *
 * - ADD users.supplier_company_id INT NULL with FK + INDEX
 * - 멱등 (이미 존재하면 skip)
 *
 * 실행:
 *   node scripts/migrate-supplier-staff.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [cols] = await sequelize.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'supplier_company_id'
    `);
    if (cols.length > 0) {
      console.log('✓ users.supplier_company_id already exists — skipping');
    } else {
      console.log('→ Adding users.supplier_company_id ...');
      // Note: users table is at MySQL 64-key limit — column only, no separate index/FK.
      // Queries on supplier_company_id are role-scoped (small result set), full-table-scan acceptable.
      await sequelize.query(`
        ALTER TABLE users
        ADD COLUMN supplier_company_id INT NULL
      `);
      console.log('✓ Added users.supplier_company_id column (no index — table at 64-key MySQL limit)');
    }

    // Extend users.role ENUM to include 'Supplier Staff' (B2 Advanced module)
    const [roleCol] = await sequelize.query(`
      SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
    `);
    if (roleCol[0]?.COLUMN_TYPE && !roleCol[0].COLUMN_TYPE.includes('Supplier Staff')) {
      console.log('→ Extending users.role ENUM with Supplier Staff ...');
      await sequelize.query(`
        ALTER TABLE users MODIFY COLUMN role
        ENUM('System Admin','Foodcourt General','Brand General','Foodcourt Manager','Brand Manager','Restaurant Owner','Restaurant Admin','Staff','Supplier Admin','Supplier Staff') DEFAULT 'Staff'
      `);
      console.log('✓ users.role ENUM extended');
    } else {
      console.log('✓ users.role ENUM already includes Supplier Staff');
    }

    // Verify
    const [check] = await sequelize.query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'supplier_company_id'
    `);
    console.log('Final state:', check[0]);

    process.exit(0);
  } catch (err) {
    console.error('✗ Migration failed:', err.message);
    process.exit(1);
  }
})();
