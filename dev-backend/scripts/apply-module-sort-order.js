/**
 * Apply sort_order to AddonModule records based on sidebar menu order.
 * Idempotent — safe to re-run.
 *
 * Each list below mirrors the sidebar order in MainLayout.tsx for that role.
 * sort_order values are spaced by 10 so new modules can slot in between.
 */

const AddonModule = require('../models/AddonModule');

const ORDER = {
  restaurant: [
    'dashboard',
    'live_orders',
    'pos_terminal',
    'kitchen_display',
    'customer_display',
    'invoice_billing',
    'reports',
    'menu_management',
    'recipe_management',
    'ingredients',
    'inventory_management',
    'advanced_inventory',
    'suppliers',
    'staff_management',
    'customer_crm',
    'coupons',
    'membership',
    'notices',
    'work_manuals',
    'system_inquiry',
    'operation_inquiry',
    'floor_plan',
    'mobile_ordering',
    'activity_logs',
  ],
  brand: [
    'brand_dashboard',
    'brand_franchise',
    'brand_management',
    'brand_restaurant_mgmt',
    'brand_admin_staff',
    'brand_manager_mgmt',
    'brand_products',
    'brand_recipes',
    'brand_product_recipes',
    'brand_ingredients',
    'brand_suppliers',
    'brand_inventory',
    'brand_invoices',
    'brand_reports',
    'brand_performance',
    'brand_notices',
    'brand_work_manuals',
    'brand_system_inquiry',
    'brand_operation_inquiry',
    'brand_plans',
    'brand_subscriptions',
    'brand_payment_settings',
    'brand_activity_logs',
  ],
  foodcourt: [
    'fc_dashboard',
    'fc_tenancy',
    'fc_management',
    'fc_branches',
    'fc_floor_plan',
    'fc_restaurant_mgmt',
    'fc_admin_staff',
    'fc_manager_mgmt',
    'fc_invoices',
    'fc_stats',
    'fc_customers',
    'fc_coupons',
    'fc_notices',
    'fc_work_manuals',
    'fc_system_inquiry',
    'fc_operation_inquiry',
    'fc_plans',
    'fc_subscriptions',
    'fc_payment_settings',
    'fc_activity_logs',
  ],
  owner: [
    'owner_dashboard',
    'owner_restaurants',
    'owner_invoices',
    'owner_performance',
    'owner_reports',
    'owner_notices',
    'owner_work_manuals',
    'owner_system_inquiry',
    'owner_operation_inquiry',
    'owner_activity_logs',
  ],
};

(async () => {
  let applied = 0, missing = 0, unordered = 0;

  for (const [group, codes] of Object.entries(ORDER)) {
    console.log(`\n[${group}]`);
    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];
      const order = (i + 1) * 10;
      const mod = await AddonModule.findOne({ where: { module_code: code } });
      if (!mod) {
        console.log(`  ? missing: ${code}`);
        missing++;
        continue;
      }
      if (mod.sort_order === order) {
        console.log(`  = ${code.padEnd(30)} → ${order}`);
      } else {
        await mod.update({ sort_order: order });
        console.log(`  + ${code.padEnd(30)} → ${order}`);
        applied++;
      }
    }
  }

  // Any active module that wasn't listed above still has sort_order=0 and will
  // sort before everything — force large value so ordered modules come first.
  const orderedCodes = Object.values(ORDER).flat();
  const stragglers = await AddonModule.findAll({
    where: { is_active: true, module_code: { [require('sequelize').Op.notIn]: orderedCodes } }
  });
  for (const m of stragglers) {
    await m.update({ sort_order: 9999 });
    console.log(`  # unordered → 9999: ${m.module_code} (${m.target_user_type})`);
    unordered++;
  }

  console.log(`\nDone. Applied: ${applied}, Missing: ${missing}, Unordered→9999: ${unordered}`);
  process.exit(0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
