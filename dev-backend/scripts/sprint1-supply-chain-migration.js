/**
 * Sprint 1 (Supply Chain - Design 1) Migration
 * - ENUM extensions: User.role, PlanTemplate.plan_target, Invoice.issuer_type, Ingredient.owner_type, AddonModule.target_user_type
 * - Column additions: plan_templates.product_limit, customer_limit + ingredients.supplier_product_id, foodcourt_product_id
 * - Idempotent: safe to re-run
 *
 * Note: New tables (supplier_companies, supplier_products, etc.) created via sequelize.sync() after this migration
 * because Sequelize models reference these tables; running model loads requires schema to exist or be created via sync.
 */
const { sequelize } = require('../config/database');

async function alterEnum(table, column, newValuesArray) {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM ${table} WHERE Field = ?`, {
    replacements: [column]
  });
  if (!rows.length) {
    console.log(`  [skip] ${table}.${column} does not exist`);
    return;
  }
  const currentType = rows[0].Type; // e.g., enum('a','b','c')
  const match = currentType.match(/^enum\((.+)\)$/i);
  if (!match) {
    console.log(`  [skip] ${table}.${column} is not ENUM (got: ${currentType})`);
    return;
  }
  const currentValues = match[1].split(',').map(s => s.trim().replace(/^'|'$/g, ''));
  const missing = newValuesArray.filter(v => !currentValues.includes(v));
  if (!missing.length) {
    console.log(`  [skip] ${table}.${column} already has all values`);
    return;
  }
  const allValues = [...currentValues, ...missing];
  const enumDef = allValues.map(v => `'${v.replace(/'/g, "''")}'`).join(',');
  // Preserve nullability/default
  const nullPart = rows[0].Null === 'NO' ? 'NOT NULL' : 'NULL';
  const defaultPart = rows[0].Default !== null ? `DEFAULT '${rows[0].Default}'` : '';
  const sql = `ALTER TABLE ${table} MODIFY ${column} ENUM(${enumDef}) ${nullPart} ${defaultPart}`.trim();
  await sequelize.query(sql);
  console.log(`  [ok]   ${table}.${column} += [${missing.join(', ')}]`);
}

async function addColumnIfMissing(table, column, definition) {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM ${table} WHERE Field = ?`, {
    replacements: [column]
  });
  if (rows.length) {
    console.log(`  [skip] ${table}.${column} already exists`);
    return;
  }
  await sequelize.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  console.log(`  [ok]   ${table}.${column} added (${definition})`);
}

async function addForeignKeyIfMissing(table, fkName, sql) {
  const [rows] = await sequelize.query(
    `SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND CONSTRAINT_NAME = ?`,
    { replacements: [table, fkName] }
  );
  if (rows.length) {
    console.log(`  [skip] FK ${fkName} on ${table} already exists`);
    return;
  }
  try {
    await sequelize.query(sql);
    console.log(`  [ok]   FK ${fkName} on ${table} added`);
  } catch (e) {
    console.log(`  [warn] FK ${fkName} on ${table} skipped: ${e.message}`);
  }
}

async function run() {
  console.log('\n=== Sprint 1 Supply Chain Migration ===\n');

  console.log('[1/4] ENUM extensions');
  await alterEnum('users', 'role', ['Supplier Admin']);
  await alterEnum('plan_templates', 'plan_target', ['supplier']);
  await alterEnum('invoices', 'issuer_type', ['supplier']);
  await alterEnum('ingredients', 'owner_type', ['foodcourt', 'supplier']);
  await alterEnum('addon_modules', 'target_user_type', ['supplier']);

  console.log('\n[2/4] Plan template column additions');
  await addColumnIfMissing('plan_templates', 'product_limit',
    "INT NULL DEFAULT NULL COMMENT '-1 unlimited, NULL not applicable'");
  await addColumnIfMissing('plan_templates', 'customer_limit',
    "INT NULL DEFAULT NULL COMMENT '-1 unlimited, NULL not applicable'");

  console.log('\n[3/4] Ingredient FK extensions (Sprint 3 PO 준비)');
  await addColumnIfMissing('ingredients', 'supplier_product_id', 'INT NULL');
  await addColumnIfMissing('ingredients', 'foodcourt_product_id', 'INT NULL');

  console.log('\n[4/4] InvoiceCategory seed (trade)');
  // Seed 'trade' invoice_category for Sprint 4 use (Sprint 1 = registration only)
  const [existingTrade] = await sequelize.query(
    `SELECT id FROM invoice_categories WHERE code = 'trade'`
  );
  if (!existingTrade.length) {
    await sequelize.query(
      `INSERT INTO invoice_categories (code, name, description, display_order, is_system, is_active, created_at, updated_at)
       VALUES ('trade', 'Trade Invoice', 'B2B trade invoice for purchase orders (Sprint 4)', 100, 1, 1, NOW(), NOW())`
    );
    console.log("  [ok]   invoice_categories += 'trade'");
  } else {
    console.log("  [skip] invoice_categories.trade already exists");
  }

  console.log('\n=== Migration complete ===\n');
  console.log('Next: run sync-database.js to create new tables (supplier_companies, supplier_products, etc.)');
  console.log('Then: run seed-supplier-modules.js + seed-supplier-plans.js for AddonModule + PlanTemplate seed\n');

  process.exit(0);
}

run().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});
