/**
 * Sprint 2 Seed: 2 buyer-side modules for Supplier Directory + Contracts.
 * Idempotent.
 */
const { AddonModule, PlanTemplate } = require('../models');

const MODULES = [
  {
    module_code: 'buyer_supplier_directory',
    name: 'Supplier Directory',
    description: 'Search and view supplier companies with their product catalogs',
    category: 'basic',
    target_user_type: 'all',
    ui_routes: ['/pos/suppliers/directory'],
    features: ['Browse suppliers', 'View profiles', 'View product catalog'],
    dependencies: []
  },
  {
    module_code: 'buyer_supplier_contracts',
    name: 'Supplier Contracts',
    description: 'Request and manage contracts with suppliers',
    category: 'basic',
    target_user_type: 'all',
    ui_routes: ['/pos/suppliers/contracts'],
    features: ['Request contract', 'View status', 'Terminate'],
    dependencies: ['buyer_supplier_directory']
  }
];

// Add to all basic-tier plans for buyer roles
const PLAN_INCLUSIONS = {
  buyer_supplier_directory: ['basic', 'professional', 'enterprise', 'brand_basic', 'brand_professional', 'brand_enterprise', 'foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise', 'owner_basic_plan', 'owner_professional', 'owner_enterprise'],
  buyer_supplier_contracts: ['basic', 'professional', 'enterprise', 'brand_basic', 'brand_professional', 'brand_enterprise', 'foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise', 'owner_basic_plan', 'owner_professional', 'owner_enterprise']
};

(async () => {
  console.log('\n=== Sprint 2 Seed — Buyer Supplier Modules ===\n');

  for (const m of MODULES) {
    const [mod, created] = await AddonModule.findOrCreate({
      where: { module_code: m.module_code },
      defaults: { ...m, is_active: true, base_price_monthly: 0, base_price_annual: 0 }
    });
    if (!created) {
      await mod.update({ ...m, is_active: true });
    }
    console.log(`  ${created ? '+' : '~'} ${m.module_code}`);
  }

  console.log('\n  Adding modules to plan templates...');
  for (const [moduleCode, planNames] of Object.entries(PLAN_INCLUSIONS)) {
    for (const planName of planNames) {
      const plan = await PlanTemplate.findOne({ where: { name: planName } });
      if (!plan) continue;
      const current = Array.isArray(plan.included_modules) ? plan.included_modules : [];
      if (!current.includes(moduleCode)) {
        await plan.update({ included_modules: [...current, moduleCode] });
        console.log(`  + ${moduleCode} → ${planName}`);
      }
    }
  }

  console.log('\n=== Seed complete ===\n');
  process.exit(0);
})();
