/**
 * Migration: 2026-03-18
 * - activity_logs.restaurant_id → NULL 허용
 * - restaurants.currency RM → MYR
 * - addon_modules: brand/foodcourt/owner activity_logs 추가
 * - plan_templates: activity_logs 모듈 포함
 *
 * 실행: node migrate-2026-03-18.js
 * 멱등성: 여러 번 실행해도 안전
 */
require('dotenv/config');
const { sequelize } = require('./config/database');
const { QueryTypes } = require('sequelize');

async function migrate() {
  console.log('🚀 Migration 2026-03-18 시작...\n');

  // 1. activity_logs.restaurant_id NULL 허용
  try {
    const [cols] = await sequelize.query(
      "SELECT IS_NULLABLE FROM information_schema.COLUMNS WHERE TABLE_NAME='activity_logs' AND COLUMN_NAME='restaurant_id' AND TABLE_SCHEMA=DATABASE()"
    );
    if (cols[0]?.IS_NULLABLE === 'NO') {
      await sequelize.query("ALTER TABLE activity_logs MODIFY COLUMN restaurant_id INT NULL");
      console.log('✅ activity_logs.restaurant_id → NULL 허용');
    } else {
      console.log('✅ activity_logs.restaurant_id 이미 NULL 허용');
    }
  } catch (e) {
    console.error('❌ activity_logs ALTER 실패:', e.message);
  }

  // 2. restaurants.currency RM → MYR
  try {
    const [result] = await sequelize.query("UPDATE restaurants SET currency='MYR' WHERE currency='RM'");
    console.log(`✅ restaurants.currency RM→MYR: ${result.affectedRows || 0}개 변경`);
  } catch (e) {
    console.error('❌ currency 변경 실패:', e.message);
  }

  // 3. addon_modules 추가 (멱등)
  const modules = [
    { code: 'brand_activity_logs', target: 'brand', routes: '/pos/brand/history' },
    { code: 'fc_activity_logs', target: 'foodcourt', routes: '/pos/foodcourt/history' },
    { code: 'owner_activity_logs', target: 'owner', routes: '/pos/owner/history' },
  ];

  for (const m of modules) {
    try {
      const existing = await sequelize.query(
        "SELECT id FROM addon_modules WHERE module_code=?",
        { replacements: [m.code], type: QueryTypes.SELECT }
      );
      if (existing.length > 0) {
        console.log(`✅ ${m.code} 이미 존재`);
        continue;
      }
      await sequelize.query(
        "INSERT INTO addon_modules (module_code, name, description, category, target_user_type, base_price_monthly, base_price_annual, ui_routes, features, is_active, sort_order, created_at, updated_at) VALUES (?, 'Change History', 'View change history and activity logs', 'advanced', ?, 0, 0, ?, ?, true, ?, NOW(), NOW())",
        { replacements: [m.code, m.target, JSON.stringify([m.routes]), JSON.stringify(['Activity log viewing']), m.target === 'brand' ? 11 : m.target === 'foodcourt' ? 10 : 7] }
      );
      console.log(`✅ ${m.code} 추가 완료`);
    } catch (e) {
      console.error(`❌ ${m.code} 추가 실패:`, e.message);
    }
  }

  // 4. plan_templates에 activity_logs 모듈 포함
  const planModuleMap = {
    'brand': 'brand_activity_logs',
    'foodcourt': 'fc_activity_logs',
    'owner': 'owner_activity_logs'
  };

  try {
    const plans = await sequelize.query(
      "SELECT id, name, plan_target, included_modules FROM plan_templates WHERE plan_target IN ('brand', 'foodcourt', 'owner')",
      { type: QueryTypes.SELECT }
    );

    for (const plan of plans) {
      let mods = plan.included_modules;
      if (typeof mods === 'string') try { mods = JSON.parse(mods); } catch { mods = []; }
      if (!Array.isArray(mods)) mods = [];

      const targetCode = planModuleMap[plan.plan_target];
      if (!targetCode || mods.includes(targetCode)) continue;

      mods.push(targetCode);
      await sequelize.query(
        "UPDATE plan_templates SET included_modules=? WHERE id=?",
        { replacements: [JSON.stringify(mods), plan.id] }
      );
      console.log(`✅ 플랜 ${plan.name} → ${targetCode} 추가`);
    }
  } catch (e) {
    console.error('❌ 플랜 모듈 추가 실패:', e.message);
  }

  // 5. sort_order 정리
  try {
    // Brand: inquiry 뒤 (10 다음)
    await sequelize.query("UPDATE addon_modules SET sort_order=11 WHERE module_code='brand_activity_logs'");
    // Foodcourt: inquiry 뒤 (9 다음)
    await sequelize.query("UPDATE addon_modules SET sort_order=10 WHERE module_code='fc_activity_logs'");
    // Owner: inquiry 뒤 (6 다음)
    await sequelize.query("UPDATE addon_modules SET sort_order=7 WHERE module_code='owner_activity_logs'");
    console.log('✅ sort_order 정리 완료');
  } catch (e) {
    console.error('❌ sort_order 정리 실패:', e.message);
  }

  console.log('\n🎉 Migration 완료!');
  process.exit(0);
}

migrate().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
