// One-off: register `brand_menus` AddonModule for Brand Menu System (BG menu templates
// pushed to franchisees with lock/version sync). Adds the module to all brand plan
// templates so it's visible under every brand plan. Also extends `menu_management`
// ui_routes with `/restaurant/*/brand-menu-updates` so RA franchisees with a plan
// can see the pending updates page.
//
// Idempotent: re-running has no effect.
//
// Usage: node scripts/register-brand-menus-module.js

const AddonModule = require('../models/AddonModule');
const PlanTemplate = require('../models/PlanTemplate');

const BRAND_MENUS_MODULE = {
  module_code: 'brand_menus',
  name: 'Brand Menu Management',
  description: 'Centralized brand menu templates pushed to franchise restaurants with lock and version sync',
  category: 'basic',
  target_user_type: 'brand',
  ui_routes: [
    '/pos/brand-menus',
    '/pos/brand-menu-categories',
    '/pos/brand-menu-option-groups'
  ],
  features: [
    'Brand menu CRUD',
    'Menu categories',
    'Option groups + options',
    'Push to franchisees',
    'Field-level locks',
    'Version bump propagation'
  ],
  dependencies: []
};

const BRAND_PLANS = ['brand_basic', 'brand_professional', 'brand_enterprise'];

// All basic-category brand modules that should be in every brand plan.
// brand_basic / brand_professional were missing these from inception.
const ALL_BASIC_BRAND_MODULES = [
  'brand_dashboard',
  'brand_franchise',
  'brand_management',
  'brand_restaurant_mgmt',
  'brand_admin_staff',
  'brand_manager_mgmt',
  'brand_invoices',
  'brand_reports',
  'brand_notices',
  'brand_payment_settings',
  'brand_menus'
];

const RA_PENDING_ROUTE = '/restaurant/*/brand-menu-updates';

(async () => {
  console.log('[1/3] Upserting brand_menus AddonModule');
  const [mod, created] = await AddonModule.findOrCreate({
    where: { module_code: BRAND_MENUS_MODULE.module_code },
    defaults: {
      ...BRAND_MENUS_MODULE,
      is_active: true,
      base_price_monthly: 0,
      base_price_annual: 0,
      sort_order: 5
    }
  });
  if (!created) {
    await mod.update({
      name: BRAND_MENUS_MODULE.name,
      description: BRAND_MENUS_MODULE.description,
      category: BRAND_MENUS_MODULE.category,
      target_user_type: BRAND_MENUS_MODULE.target_user_type,
      ui_routes: BRAND_MENUS_MODULE.ui_routes,
      features: BRAND_MENUS_MODULE.features,
      dependencies: BRAND_MENUS_MODULE.dependencies,
      is_active: true
    });
  }
  console.log(`  ${created ? '+ created' : '~ updated'} brand_menus`);

  console.log('[2/3] Ensuring all basic brand modules are in every brand plan');
  for (const planName of BRAND_PLANS) {
    const plan = await PlanTemplate.findOne({ where: { name: planName } });
    if (!plan) {
      console.log(`  ? plan not found: ${planName}`);
      continue;
    }
    const current = Array.isArray(plan.included_modules) ? plan.included_modules : [];
    const missing = ALL_BASIC_BRAND_MODULES.filter(m => !current.includes(m));
    if (missing.length > 0) {
      await plan.update({ included_modules: [...current, ...missing] });
      console.log(`  + ${planName}: added ${missing.length} basic modules → ${missing.join(', ')}`);
    } else {
      console.log(`  = ${planName}: already has all basic brand modules`);
    }
  }

  console.log('[3/3] Extending menu_management ui_routes with RA pending page');
  const menuMod = await AddonModule.findOne({ where: { module_code: 'menu_management' } });
  if (!menuMod) {
    console.log('  ? menu_management module not found');
  } else {
    const current = Array.isArray(menuMod.ui_routes) ? menuMod.ui_routes : [];
    if (!current.includes(RA_PENDING_ROUTE)) {
      await menuMod.update({ ui_routes: [...current, RA_PENDING_ROUTE] });
      console.log(`  + menu_management: added ${RA_PENDING_ROUTE}`);
    } else {
      console.log(`  = menu_management: already has ${RA_PENDING_ROUTE}`);
    }
  }

  console.log('Done.');
  process.exit(0);
})().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
