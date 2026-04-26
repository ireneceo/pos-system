/**
 * Sprint 3 Seed: buyer_purchase_orders module + plan inclusion.
 */
const { AddonModule, PlanTemplate } = require('../models');

const MODULE = {
  module_code: 'buyer_purchase_orders',
  name: 'Purchase Orders',
  description: 'Create and manage purchase orders to suppliers',
  category: 'basic',
  target_user_type: 'all',
  ui_routes: ['/pos/purchase-orders'],
  features: ['Create PO', 'Receive', 'PAR Level suggestions', 'Status tracking'],
  dependencies: ['buyer_supplier_directory', 'buyer_supplier_contracts']
};

const PLAN_NAMES = [
  'basic', 'professional', 'enterprise',
  'brand_basic', 'brand_professional', 'brand_enterprise',
  'foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise',
  'owner_basic_plan', 'owner_professional', 'owner_enterprise'
];

(async () => {
  console.log('\n=== Sprint 3 Seed — buyer_purchase_orders ===\n');
  const [mod, created] = await AddonModule.findOrCreate({
    where: { module_code: MODULE.module_code },
    defaults: { ...MODULE, is_active: true, base_price_monthly: 0, base_price_annual: 0 }
  });
  if (!created) await mod.update({ ...MODULE, is_active: true });
  console.log(`  ${created ? '+' : '~'} ${MODULE.module_code}`);

  for (const planName of PLAN_NAMES) {
    const plan = await PlanTemplate.findOne({ where: { name: planName } });
    if (!plan) continue;
    const current = Array.isArray(plan.included_modules) ? plan.included_modules : [];
    if (!current.includes(MODULE.module_code)) {
      await plan.update({ included_modules: [...current, MODULE.module_code] });
      console.log(`  + ${MODULE.module_code} → ${planName}`);
    }
  }

  console.log('\n=== Seed complete ===\n');
  process.exit(0);
})();
