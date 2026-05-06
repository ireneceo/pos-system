/**
 * v3.25 — AddonModule sort_order + category 정합화
 *
 * 목적: 사이드바 메뉴 순서대로 모듈을 정렬해서 PricingPage 에서 자연스럽게 보이도록.
 *
 * 변경:
 *   - 93 모듈에 sort_order 부여 (사이드바 메뉴 순서 = sort_order)
 *   - buyer_* 4개: category 'basic' → 'advanced'
 *   - target_user_type 은 변경하지 않음 (PricingPage 필터에서 owner+buyer_* 제외 처리)
 *
 * 안전: idempotent — UPDATE 만, 신규 row 안 만듦.
 *       매트릭스에 명시된 module_code 만 변경, 미명시 모듈은 그대로.
 */
const { AddonModule } = require('../models');
const database = require('../config/database');
const sequelize = database.sequelize;

const MATRIX = [
  // ─── Restaurant (target='all' or 'restaurant') ─────────────────────────
  { code: 'dashboard',                sort: 10,  category: 'basic' },
  { code: 'live_orders',              sort: 20,  category: 'basic' },
  { code: 'pos_terminal',             sort: 30,  category: 'basic' },
  { code: 'kitchen_display',          sort: 40,  category: 'basic' },
  { code: 'customer_display',         sort: 50,  category: 'basic' },
  { code: 'invoice_billing',          sort: 60,  category: 'basic' },
  { code: 'reports',                  sort: 70,  category: 'basic' },
  { code: 'menu_management',          sort: 80,  category: 'basic' },
  { code: 'recipe_management',        sort: 90,  category: 'advanced' },
  { code: 'ingredients',              sort: 100, category: 'advanced' },
  { code: 'inventory_management',     sort: 110, category: 'advanced' },
  { code: 'advanced_inventory',       sort: 120, category: 'advanced' },
  { code: 'suppliers',                sort: 130, category: 'advanced' },
  // Buyer 4 (Advanced — Supply Chain 매입)
  { code: 'buyer_supplier_directory', sort: 140, category: 'advanced' },
  { code: 'buyer_supplier_contracts', sort: 150, category: 'advanced' },
  { code: 'buyer_purchase_orders',    sort: 160, category: 'advanced' },
  { code: 'buyer_purchase_invoices',  sort: 170, category: 'advanced' },
  { code: 'staff_management',         sort: 180, category: 'basic' },
  { code: 'customer_crm',             sort: 190, category: 'basic' },
  { code: 'coupons',                  sort: 200, category: 'basic' },
  { code: 'membership',               sort: 210, category: 'basic' },
  { code: 'notices',                  sort: 220, category: 'basic' },
  { code: 'work_manuals',             sort: 230, category: 'advanced' },
  { code: 'system_inquiry',           sort: 240, category: 'advanced' },
  { code: 'operation_inquiry',        sort: 250, category: 'advanced' },

  // ─── Brand General (target='brand') ────────────────────────────────────
  { code: 'brand_dashboard',          sort: 10,  category: 'basic' },
  { code: 'brand_franchise',          sort: 20,  category: 'basic' },
  { code: 'brand_management',         sort: 30,  category: 'basic' },
  { code: 'brand_restaurant_mgmt',    sort: 40,  category: 'basic' },
  { code: 'brand_admin_staff',        sort: 50,  category: 'basic' },
  { code: 'brand_manager_mgmt',       sort: 60,  category: 'basic' },
  { code: 'brand_products',           sort: 70,  category: 'advanced' },
  { code: 'brand_recipes',            sort: 80,  category: 'advanced' },
  { code: 'brand_product_recipes',    sort: 90,  category: 'advanced' },
  { code: 'brand_ingredients',        sort: 100, category: 'advanced' },
  { code: 'brand_suppliers',          sort: 110, category: 'advanced' },
  { code: 'brand_inventory',          sort: 120, category: 'advanced' },
  { code: 'brand_invoices',           sort: 130, category: 'basic' },
  { code: 'brand_reports',            sort: 140, category: 'basic' },
  { code: 'brand_performance',        sort: 150, category: 'advanced' },
  { code: 'brand_notices',            sort: 160, category: 'basic' },
  { code: 'brand_work_manuals',       sort: 170, category: 'advanced' },
  { code: 'brand_system_inquiry',     sort: 180, category: 'advanced' },
  { code: 'brand_operation_inquiry',  sort: 190, category: 'advanced' },
  { code: 'brand_plans',              sort: 200, category: 'advanced' },
  { code: 'brand_subscriptions',      sort: 210, category: 'advanced' },
  { code: 'brand_payment_settings',   sort: 220, category: 'basic' },

  // ─── Foodcourt General (target='foodcourt') ────────────────────────────
  { code: 'fc_dashboard',             sort: 10,  category: 'basic' },
  { code: 'fc_tenancy',               sort: 20,  category: 'basic' },
  { code: 'fc_management',            sort: 30,  category: 'basic' },
  { code: 'fc_branches',              sort: 40,  category: 'basic' },
  { code: 'fc_floor_plan',            sort: 50,  category: 'advanced' },
  { code: 'fc_restaurant_mgmt',       sort: 60,  category: 'basic' },
  { code: 'fc_admin_staff',           sort: 70,  category: 'basic' },
  { code: 'fc_manager_mgmt',          sort: 80,  category: 'basic' },
  { code: 'fc_products',              sort: 90,  category: 'advanced' },
  { code: 'fc_inventory',             sort: 100, category: 'advanced' },
  { code: 'fc_customers',             sort: 110, category: 'advanced' },
  { code: 'fc_coupons',               sort: 120, category: 'advanced' },
  { code: 'fc_invoices',              sort: 130, category: 'basic' },
  { code: 'fc_work_manuals',          sort: 140, category: 'advanced' },
  { code: 'fc_system_inquiry',        sort: 150, category: 'advanced' },
  { code: 'fc_operation_inquiry',     sort: 160, category: 'advanced' },
  { code: 'fc_plans',                 sort: 170, category: 'advanced' },
  { code: 'fc_subscriptions',         sort: 180, category: 'advanced' },
  { code: 'fc_payment_settings',      sort: 190, category: 'basic' },
  { code: 'fc_activity_logs',         sort: 200, category: 'advanced' },
  { code: 'fc_stats',                 sort: 210, category: 'advanced' },
  { code: 'fc_notices',               sort: 220, category: 'basic' },

  // ─── Supplier (target='supplier') ──────────────────────────────────────
  { code: 'supplier_directory',       sort: 10,  category: 'basic' },
  { code: 'supplier_orders',          sort: 20,  category: 'basic' },
  { code: 'supplier_products',        sort: 30,  category: 'basic' },
  { code: 'supplier_inventory',       sort: 40,  category: 'basic' },
  { code: 'supplier_customers',       sort: 50,  category: 'basic' },
  { code: 'supplier_admin_staff',     sort: 60,  category: 'advanced' },
  { code: 'supplier_contracts',       sort: 70,  category: 'basic' },
  { code: 'supplier_trade_invoices',  sort: 80,  category: 'basic' },
  { code: 'supplier_soa',             sort: 90,  category: 'basic' },
  { code: 'supplier_shipping',        sort: 100, category: 'basic' },
  { code: 'supplier_multi_warehouse', sort: 110, category: 'advanced' },
  { code: 'supplier_performance',     sort: 120, category: 'advanced' },
  { code: 'supplier_activity_logs',   sort: 130, category: 'advanced' },

  // ─── Owner (target='owner') ────────────────────────────────────────────
  { code: 'owner_dashboard',          sort: 10,  category: 'basic' },
  { code: 'owner_restaurants',        sort: 20,  category: 'basic' },
  { code: 'owner_invoices',           sort: 30,  category: 'basic' },
  { code: 'owner_performance',        sort: 40,  category: 'advanced' },
  { code: 'owner_reports',            sort: 50,  category: 'advanced' },
  { code: 'owner_notices',            sort: 60,  category: 'basic' },
  { code: 'owner_work_manuals',       sort: 70,  category: 'advanced' },
  { code: 'owner_system_inquiry',     sort: 80,  category: 'advanced' },
  { code: 'owner_operation_inquiry',  sort: 90,  category: 'advanced' },
  { code: 'owner_activity_logs',      sort: 100, category: 'advanced' },
];

(async () => {
  const t = await sequelize.transaction();
  try {
    let updated = 0;
    let unchanged = 0;
    let notFound = 0;

    for (const row of MATRIX) {
      const m = await AddonModule.findOne({ where: { module_code: row.code }, transaction: t });
      if (!m) {
        console.log(`  ✗ NOT FOUND: ${row.code}`);
        notFound++;
        continue;
      }
      const before = { sort_order: m.sort_order, category: m.category };
      const changed = before.sort_order !== row.sort || before.category !== row.category;
      if (!changed) {
        unchanged++;
        continue;
      }
      m.sort_order = row.sort;
      m.category = row.category;
      await m.save({ transaction: t });
      console.log(`  ✓ ${row.code}: sort ${before.sort_order}→${row.sort}, category ${before.category}→${row.category}`);
      updated++;
    }

    await t.commit();
    console.log(`\nDone. updated=${updated}, unchanged=${unchanged}, not_found=${notFound}, total=${MATRIX.length}`);

    // Show modules in matrix not actually updated to surface mismatches
    if (notFound > 0) {
      console.log('\n⚠ Some matrix entries did not match DB rows. Review the NOT FOUND list above.');
    }

    // Sanity: list any DB rows still at sort_order=0
    const stillZero = await AddonModule.findAll({ where: { sort_order: 0 }, attributes: ['module_code', 'category', 'target_user_type'], raw: true });
    if (stillZero.length > 0) {
      console.log(`\n⚠ ${stillZero.length} modules still have sort_order=0:`);
      for (const r of stillZero) console.log(`   - ${r.module_code} (${r.category}, target=${r.target_user_type})`);
    }
  } catch (e) {
    await t.rollback();
    console.error('FATAL:', e);
    process.exit(1);
  } finally {
    if (sequelize) await sequelize.close();
  }
})();
