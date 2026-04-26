/**
 * Sprint 4 Migration:
 * - purchase_orders.tracking_info JSON
 * - purchase_orders.trade_invoice_id INT FK
 * - buyer_purchase_invoices module + plan inclusion
 * Idempotent.
 */
const { sequelize } = require('../config/database');
const { AddonModule, PlanTemplate } = require('../models');

async function addColumnIfMissing(table, column, def) {
  const [rows] = await sequelize.query(`SHOW COLUMNS FROM ${table} WHERE Field = ?`, { replacements: [column] });
  if (rows.length) {
    console.log(`  [skip] ${table}.${column} exists`);
    return;
  }
  await sequelize.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`);
  console.log(`  [ok]   ${table}.${column} added`);
}

(async () => {
  console.log('\n=== Sprint 4 Migration ===\n');
  console.log('[1/2] PurchaseOrder columns');
  await addColumnIfMissing('purchase_orders', 'tracking_info', "JSON NULL COMMENT 'Shipping carrier/tracking'");
  await addColumnIfMissing('purchase_orders', 'trade_invoice_id', "INT NULL COMMENT 'FK to invoices'");

  console.log('\n[2/2] buyer_purchase_invoices module + plan inclusion');
  const m = {
    module_code: 'buyer_purchase_invoices',
    name: 'Purchase Invoices',
    description: 'Receive and pay trade invoices from suppliers/sellers',
    category: 'basic',
    target_user_type: 'all',
    ui_routes: ['/pos/purchase-invoices'],
    features: ['View trade invoices', 'Pay individual', 'Pay All (Monthly SOA)'],
    dependencies: ['buyer_purchase_orders']
  };
  const [mod, created] = await AddonModule.findOrCreate({
    where: { module_code: m.module_code },
    defaults: { ...m, is_active: true, base_price_monthly: 0, base_price_annual: 0 }
  });
  if (!created) await mod.update({ ...m, is_active: true });
  console.log(`  ${created ? '+' : '~'} ${m.module_code}`);

  const plans = [
    'basic', 'professional', 'enterprise',
    'brand_basic', 'brand_professional', 'brand_enterprise',
    'foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise',
    'owner_basic_plan', 'owner_professional', 'owner_enterprise'
  ];
  for (const planName of plans) {
    const plan = await PlanTemplate.findOne({ where: { name: planName } });
    if (!plan) continue;
    const cur = Array.isArray(plan.included_modules) ? plan.included_modules : [];
    if (!cur.includes(m.module_code)) {
      await plan.update({ included_modules: [...cur, m.module_code] });
      console.log(`  + ${m.module_code} → ${planName}`);
    }
  }

  console.log('\n=== Migration complete ===\n');
  process.exit(0);
})();
