// One-off: register AddonModule entries for Franchise/Tenancy/Branches routes (+ map views)
// and add them to all Brand/Foodcourt plan templates so they're visible under every plan.
// Idempotent: uses findOrCreate and array merge.

const AddonModule = require('../models/AddonModule');
const PlanTemplate = require('../models/PlanTemplate');

const MODULES = [
  {
    module_code: 'brand_franchise',
    name: 'Franchise Management & Map',
    description: 'Franchise contracts, applicants, and geographic map',
    category: 'basic',
    target_user_type: 'brand',
    ui_routes: ['/pos/brand/franchise', '/pos/brand/franchise-map'],
    features: ['Contract list', 'Pipeline', 'Archive', 'Map view'],
    dependencies: []
  },
  {
    module_code: 'fc_tenancy',
    name: 'Tenancy Management & Map',
    description: 'Foodcourt tenancy contracts, applicants, and geographic map',
    category: 'basic',
    target_user_type: 'foodcourt',
    ui_routes: ['/pos/foodcourt/tenancy', '/pos/foodcourt/tenancy-map'],
    features: ['Contract list', 'Pipeline', 'Archive', 'Map view (branches + tenants)'],
    dependencies: []
  },
  {
    module_code: 'fc_branches',
    name: 'Branch Management & Unit Numbering',
    description: 'Foodcourt multi-branch support with flexible unit numbering',
    category: 'basic',
    target_user_type: 'foodcourt',
    ui_routes: ['/pos/foodcourt/branches'],
    features: ['Branch CRUD', 'Units per branch', 'Coordinates'],
    dependencies: []
  },
  {
    module_code: 'fc_floor_plan',
    name: 'Floor Plan & Store Management',
    description: 'Visual floor plan with unit coordinates and drag-drop placement',
    category: 'advanced',
    target_user_type: 'foodcourt',
    ui_routes: ['/pos/foodcourt/floor-plan'],
    features: ['Multi-level floor plans', 'Drag-drop unit placement', 'Status color overlay', 'Tenant info on hover'],
    dependencies: ['fc_branches']
  }
];

// Which plan templates should include each module
const PLAN_INCLUSIONS = {
  brand_franchise: ['brand_basic', 'brand_professional', 'brand_enterprise'],
  fc_tenancy: ['foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise'],
  fc_branches: ['foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise'],
  fc_floor_plan: ['foodcourt_basic', 'foodcourt_professional', 'foodcourt_enterprise']
};

(async () => {
  console.log('[1/2] Upserting AddonModule entries');
  for (const m of MODULES) {
    const [mod, created] = await AddonModule.findOrCreate({
      where: { module_code: m.module_code },
      defaults: { ...m, is_active: true, base_price_monthly: 0, base_price_annual: 0 }
    });
    if (!created) {
      await mod.update({
        name: m.name, description: m.description, category: m.category,
        target_user_type: m.target_user_type,
        ui_routes: m.ui_routes, features: m.features, dependencies: m.dependencies, is_active: true
      });
    }
    console.log(`  ${created ? '+' : '~'} ${m.module_code}`);
  }

  console.log('[2/2] Adding modules to plan templates');
  for (const [moduleCode, planNames] of Object.entries(PLAN_INCLUSIONS)) {
    for (const planName of planNames) {
      const plan = await PlanTemplate.findOne({ where: { name: planName } });
      if (!plan) { console.log(`  ? plan not found: ${planName}`); continue; }
      const current = Array.isArray(plan.included_modules) ? plan.included_modules : [];
      if (!current.includes(moduleCode)) {
        await plan.update({ included_modules: [...current, moduleCode] });
        console.log(`  + ${planName}: added ${moduleCode}`);
      } else {
        console.log(`  = ${planName}: already has ${moduleCode}`);
      }
    }
  }

  console.log('Done.');
  process.exit(0);
})();
