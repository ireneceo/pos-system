/**
 * Migration: 수익성 분석 1단계 — restaurant_cost_entries 표 + profit_analysis 모듈 등록.
 *
 * 설계: .claude/fable-design-20261029-brand-profitability.md §4-2 · §4-4 (Fable 설계, Irene «권고대로» 2026-10-29 — Q1~Q4 = A · Q5 예).
 *   Q4=A: 모듈 키 profit_analysis, 매장이 모듈을 받는 모든 요금제(매장 · 브랜드/푸드코트/오너 요금제)에 포함.
 *   직원 시급·월급 칸(§4-1)은 2단계 — 여기서 만들지 않는다.
 *
 * 안전: 새 표는 SHOW TABLES 확인 후 CREATE · 기존 표 변경 0 · 기존 ENUM 변경 0 · 멱등 · process.exit 필수.
 *
 * 사용: node scripts/migrate-create-profitability.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

const MODULE_CODE = 'profit_analysis';
const MODULE_PLAN_TARGETS = ['restaurant', 'brand', 'foodcourt', 'owner'];

const TABLES = {
  restaurant_cost_entries: `
    CREATE TABLE restaurant_cost_entries (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      category ENUM('rent','royalty','marketing_fund','utilities','other_fixed','external_channel') NOT NULL,
      label VARCHAR(60) NULL,
      rule ENUM('fixed','pct','max') NOT NULL DEFAULT 'fixed',
      fixed_amount DECIMAL(12,2) NULL,
      pct DECIMAL(5,2) NULL,
      period_month DATE NULL,
      external_sales DECIMAL(12,2) NULL,
      effective_from DATE NULL,
      effective_to DATE NULL,
      note VARCHAR(255) NULL,
      created_by INT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      INDEX cost_entry_rest_cat_month (restaurant_id, category, period_month)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
};

const parseMods = (v) => {
  if (Array.isArray(v)) return [...v];
  try { const a = JSON.parse(v || '[]'); return Array.isArray(a) ? a : []; } catch { return []; }
};

(async () => {
  try {
    console.log('[migrate-create-profitability] Starting...');

    for (const [name, ddl] of Object.entries(TABLES)) {
      const [t] = await sequelize.query(`SHOW TABLES LIKE '${name}'`);
      if (t.length) { console.log(`  ✓ ${name} already exists`); continue; }
      await sequelize.query(ddl);
      console.log(`  ✓ ${name} created`);
    }

    // 모듈 행 — 관리자 요금제 편집 화면에 보이게 · 화면 경로는 사이드바·가드가 읽는다
    const [mods] = await sequelize.query('SELECT id FROM addon_modules WHERE module_code = :c', { replacements: { c: MODULE_CODE } });
    if (mods.length) console.log(`  ✓ addon_modules: ${MODULE_CODE} already exists`);
    else {
      await sequelize.query(
        `INSERT INTO addon_modules (module_code, name, description, category, target_user_type, base_price_monthly, base_price_annual,
           ui_routes, features, dependencies, is_active, sort_order, created_at, updated_at)
         VALUES (:c, 'Profit Analysis', 'Menu contribution margin, menu matrix, order mix, profit simulator and store comparison',
           'basic', 'restaurant', 0, 0, :ui, :features, '[]', 1, 270, NOW(), NOW())`,
        { replacements: {
          c: MODULE_CODE,
          ui: JSON.stringify(['/restaurant/*/profitability', '/pos/owner/profitability', '/pos/brand/general/profitability']),
          features: JSON.stringify(['menu_contribution', 'menu_matrix', 'order_mix', 'profit_simulator', 'store_comparison']),
        } }
      );
      console.log(`  ✓ addon_modules: ${MODULE_CODE} created`);
    }

    // Q4=A — 매장이 모듈을 받는 모든 요금제에 포함(공급업체 요금제 제외)
    const [plans] = await sequelize.query(
      'SELECT id, name, included_modules FROM plan_templates WHERE plan_target IN (:t)',
      { replacements: { t: MODULE_PLAN_TARGETS } }
    );
    for (const p of plans) {
      const m = parseMods(p.included_modules);
      if (m.includes(MODULE_CODE)) continue;
      m.push(MODULE_CODE);
      await sequelize.query('UPDATE plan_templates SET included_modules = :m WHERE id = :id', { replacements: { m: JSON.stringify(m), id: p.id } });
      console.log(`  + ${MODULE_CODE} → plan ${p.name}`);
    }

    // 되읽어 확인 (조용한 실패 방지)
    const [after] = await sequelize.query('SELECT name, included_modules FROM plan_templates WHERE plan_target IN (:t)', { replacements: { t: MODULE_PLAN_TARGETS } });
    const missing = after.filter(p => !parseMods(p.included_modules).includes(MODULE_CODE)).map(p => p.name);
    if (missing.length) { console.error('  ✗ module missing in plans:', missing.join(', ')); process.exit(1); }
    console.log(`  ✓ ${MODULE_CODE} in ${after.length} plans`);

    console.log('[migrate-create-profitability] Done');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
