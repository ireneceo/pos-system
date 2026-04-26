/**
 * Sprint 1 Seed: 13 Supplier modules + 2 Foodcourt modules + 2 Supplier plans
 * - 9 Basic modules (전 supplier 플랜 포함, Sprint 1 active: products/inventory)
 * - 4 Advanced modules (supplier_advanced 플랜만)
 * - 2 Foodcourt modules (fc_products, fc_inventory)
 * - PlanTemplate: supplier_basic, supplier_advanced
 * - Idempotent (재실행 안전)
 */
const { AddonModule, PlanTemplate } = require('../models');
const { sequelize } = require('../config/database');

const SUPPLIER_MODULES = [
  // Basic 9 (모든 supplier 플랜)
  { module_code: 'supplier_products', name: 'Product Management', description: 'Catalog of products for sale to buyers', category: 'basic', target_user_type: 'supplier', ui_routes: ['/pos/supplier/products'], features: ['Product CRUD', 'Categories', 'Option groups', 'Min order quantity'], dependencies: [] },
  { module_code: 'supplier_inventory', name: 'Inventory Management', description: 'Track own stock levels per product', category: 'basic', target_user_type: 'supplier', ui_routes: ['/pos/supplier/inventory'], features: ['Stock list', 'Manual adjust', 'Manual receive', 'Transactions'], dependencies: ['supplier_products'] },
  { module_code: 'supplier_directory', name: 'Directory Listing', description: 'Public listing visible to buyers searching for suppliers', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Public profile', 'Searchable by buyers'], dependencies: ['supplier_products'] },
  { module_code: 'supplier_contracts', name: 'Contract Management', description: 'Receive, review and approve buyer contract requests', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Incoming contract requests', 'Approval workflow', 'Status tracking'], dependencies: [] },
  { module_code: 'supplier_customers', name: 'Customer Management', description: 'Manage contracted buyers and per-customer payment terms (Immediate / Monthly SOA)', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Customer list', 'Payment terms per customer', 'Credit limits'], dependencies: ['supplier_contracts'] },
  { module_code: 'supplier_orders', name: 'Order Management', description: 'Receive and process incoming purchase orders from buyers', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Incoming PO list', 'Confirm/Ship/Reject', 'Order status'], dependencies: ['supplier_customers'] },
  { module_code: 'supplier_shipping', name: 'Shipping & Delivery', description: 'Track shipments and delivery confirmations', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Shipping tracking', 'Delivery confirmation', 'Carrier info'], dependencies: ['supplier_orders'] },
  { module_code: 'supplier_trade_invoices', name: 'Trade Invoice', description: 'Auto-issued trade invoices per delivered purchase order', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Auto invoice on PO Received', 'Invoice list', 'Resend email'], dependencies: ['supplier_orders'] },
  { module_code: 'supplier_soa', name: 'Statement of Account', description: 'Monthly SOA summary email + Pay All for Monthly SOA customers', category: 'basic', target_user_type: 'supplier', ui_routes: [], features: ['Monthly SOA generation', 'Pay all flow', 'Email notification'], dependencies: ['supplier_trade_invoices'] },

  // Advanced 4 (supplier_advanced 플랜만)
  { module_code: 'supplier_admin_staff', name: 'Admin & Staff Management', description: 'Add staff users with role-based permissions', category: 'advanced', target_user_type: 'supplier', ui_routes: [], features: ['Staff CRUD', 'Role permissions'], dependencies: [] },
  { module_code: 'supplier_performance', name: 'Performance Analytics', description: 'Sales/turnover/best seller analytics', category: 'advanced', target_user_type: 'supplier', ui_routes: [], features: ['Revenue trend', 'Best sellers', 'Customer rankings'], dependencies: ['supplier_orders'] },
  { module_code: 'supplier_activity_logs', name: 'Change History', description: 'Audit log of all data changes', category: 'advanced', target_user_type: 'supplier', ui_routes: [], features: ['Activity timeline', 'Filter by user/entity'], dependencies: [] },
  { module_code: 'supplier_multi_warehouse', name: 'Multi-Warehouse', description: 'Track inventory across multiple physical warehouses (post-MVP)', category: 'advanced', target_user_type: 'supplier', ui_routes: [], features: ['Warehouse CRUD', 'Stock per warehouse'], dependencies: ['supplier_inventory'] }
];

const FOODCOURT_MODULES = [
  { module_code: 'fc_products', name: 'Product Management', description: 'Foodcourt own product catalog (sold to tenant restaurants in Sprint 3)', category: 'advanced', target_user_type: 'foodcourt', ui_routes: ['/pos/foodcourt/general/products'], features: ['Product CRUD', 'Categories', 'Option groups'], dependencies: [] },
  { module_code: 'fc_inventory', name: 'Inventory Management', description: 'Foodcourt own stock levels', category: 'advanced', target_user_type: 'foodcourt', ui_routes: ['/pos/foodcourt/general/inventory'], features: ['Stock list', 'Manual adjust', 'Manual receive'], dependencies: ['fc_products'] }
];

const SUPPLIER_PLANS = [
  {
    name: 'supplier_basic',
    display_name: 'Supplier Basic',
    base_price_monthly: 0,        // Irene 운영에서 조정
    base_price_annual: 0,
    plan_target: 'supplier',
    category: 'basic',
    sort_order: 1,
    is_active: true,
    order_limit: 1000,
    menu_item_limit: 0,
    staff_limit: 1,
    restaurant_limit: 0,
    manager_limit: 0,
    product_limit: 100,
    customer_limit: 50,
    features: ['Product Catalog', 'Inventory', 'Receive Orders', 'Trade Invoices'],
    included_modules: [
      'supplier_products', 'supplier_inventory', 'supplier_directory',
      'supplier_contracts', 'supplier_customers', 'supplier_orders',
      'supplier_shipping', 'supplier_trade_invoices', 'supplier_soa'
    ]
  },
  {
    name: 'supplier_advanced',
    display_name: 'Supplier Advanced',
    base_price_monthly: 0,        // Irene 운영에서 조정
    base_price_annual: 0,
    plan_target: 'supplier',
    category: 'basic',
    sort_order: 2,
    is_active: true,
    order_limit: -1,
    menu_item_limit: 0,
    staff_limit: 10,
    restaurant_limit: 0,
    manager_limit: 0,
    product_limit: -1,
    customer_limit: -1,
    features: ['Everything in Basic', 'Staff Management', 'Performance Analytics', 'Activity Logs', 'Multi-Warehouse'],
    included_modules: [
      'supplier_products', 'supplier_inventory', 'supplier_directory',
      'supplier_contracts', 'supplier_customers', 'supplier_orders',
      'supplier_shipping', 'supplier_trade_invoices', 'supplier_soa',
      'supplier_admin_staff', 'supplier_performance', 'supplier_activity_logs', 'supplier_multi_warehouse'
    ]
  }
];

const FOODCOURT_PLAN_INCLUSIONS = {
  fc_products: ['foodcourt_enterprise'],
  fc_inventory: ['foodcourt_enterprise']
};

(async () => {
  try {
    console.log('\n=== Sprint 1 Seed — Supplier Modules + Plans ===\n');

    console.log(`[1/3] Upserting ${SUPPLIER_MODULES.length + FOODCOURT_MODULES.length} AddonModule entries`);
    const allModules = [...SUPPLIER_MODULES, ...FOODCOURT_MODULES];
    for (const m of allModules) {
      const [mod, created] = await AddonModule.findOrCreate({
        where: { module_code: m.module_code },
        defaults: { ...m, is_active: true, base_price_monthly: 0, base_price_annual: 0 }
      });
      if (!created) {
        await mod.update({
          name: m.name, description: m.description, category: m.category,
          target_user_type: m.target_user_type,
          ui_routes: m.ui_routes, features: m.features, dependencies: m.dependencies,
          is_active: true
        });
      }
      console.log(`  ${created ? '+' : '~'} ${m.module_code}`);
    }

    console.log(`\n[2/3] Upserting ${SUPPLIER_PLANS.length} Supplier plan templates`);
    for (const p of SUPPLIER_PLANS) {
      const existing = await PlanTemplate.findOne({ where: { name: p.name } });
      if (existing) {
        await existing.update(p);
        console.log(`  ~ ${p.name}`);
      } else {
        await PlanTemplate.create(p);
        console.log(`  + ${p.name}`);
      }
    }

    console.log('\n[3/3] Adding fc_products/fc_inventory to Foodcourt enterprise plan');
    for (const [moduleCode, planNames] of Object.entries(FOODCOURT_PLAN_INCLUSIONS)) {
      for (const planName of planNames) {
        const plan = await PlanTemplate.findOne({ where: { name: planName } });
        if (!plan) { console.log(`  ? plan not found: ${planName}`); continue; }
        const current = Array.isArray(plan.included_modules) ? plan.included_modules : [];
        if (!current.includes(moduleCode)) {
          await plan.update({ included_modules: [...current, moduleCode] });
          console.log(`  + ${moduleCode} → ${planName}`);
        } else {
          console.log(`  ~ ${moduleCode} already in ${planName}`);
        }
      }
    }

    console.log('\n=== Seed complete ===\n');
    process.exit(0);
  } catch (e) {
    console.error('Seed failed:', e);
    process.exit(1);
  }
})();
