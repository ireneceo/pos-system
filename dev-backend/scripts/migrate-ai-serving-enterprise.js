/**
 * migrate-ai-serving-enterprise.js — AI 카메라 서빙(ai_serving) 판매 등록 (2026-07-27)
 *
 * 배경: 기능은 코드·라우트·화면까지 전부 배포돼 있었는데 **운영 Enterprise 요금제의
 * included_modules 에 `ai_serving` 이 없어서** 매장이 쓰면 403 MODULE_NOT_INCLUDED 였다.
 * (dev 에만 들어 있고 운영엔 반영된 적 없음 — 2026-07-27 실측으로 발견.)
 *
 * 이 스크립트가 하는 일 (둘 다 멱등):
 *   ① addon_modules 에 ai_serving 행 보장 — 관리자 플랜 편집 화면에서 모듈로 보이게 한다.
 *      ui_routes 는 **빈 배열**: 이 기능은 전용 페이지가 없고 Floor Plan > Items 안에서 동작한다.
 *      (라우트를 넣으면 사이드바/라우트 게이트가 없는 페이지를 허용하려 든다.)
 *   ② 레스토랑 Enterprise 요금제에만 included_modules 에 ai_serving 추가.
 *      basic/professional 은 건드리지 않는다 — 설계 §0 결정 #3 "Enterprise 전용".
 *
 * 실행: node scripts/migrate-ai-serving-enterprise.js
 * 재실행 안전(이미 있으면 건너뜀). 배포 레지스트리 분류 = deploy.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
require('../models');
const AddonModule = require('../models/AddonModule');
const PlanTemplate = require('../models/PlanTemplate');

const MODULE_CODE = 'ai_serving';

async function ensureAddonModule() {
  const existing = await AddonModule.findOne({ where: { module_code: MODULE_CODE } });
  if (existing) {
    console.log(`  · addon_modules: ${MODULE_CODE} 이미 있음 (id=${existing.id}) — 건너뜀`);
    return false;
  }
  const created = await AddonModule.create({
    module_code: MODULE_CODE,
    name: 'AI Camera Serving',
    description: 'Photograph a ready dish to identify it and serve the matching order item. Runs inside Floor Plan > Items.',
    category: 'advanced',
    target_user_type: 'restaurant',
    base_price_monthly: 0,      // Enterprise 포함 = 건당/모듈 추가과금 없음 (설계 §9)
    base_price_annual: 0,
    ui_routes: [],              // 전용 페이지 없음 — Floor Plan 안에서 동작
    features: ['photo_recognition', 'menu_reference_photos', 'serve_from_photo'],
    dependencies: [],
    is_active: true,
    sort_order: 251
  });
  console.log(`  ✓ addon_modules: ${MODULE_CODE} 생성 (id=${created.id})`);
  return true;
}

async function ensureEnterpriseIncludes() {
  // 레스토랑 최상위 티어에만. name/display_name 둘 다로 찾는다(환경별 표기 차이 방어).
  const plans = await PlanTemplate.findAll({ where: { plan_target: 'restaurant' } });
  let changed = 0;
  for (const plan of plans) {
    const isEnterprise = String(plan.name || '').toLowerCase() === 'enterprise'
      || String(plan.display_name || '').toLowerCase() === 'enterprise plan';
    if (!isEnterprise) continue;

    const mods = Array.isArray(plan.included_modules)
      ? [...plan.included_modules]
      : JSON.parse(plan.included_modules || '[]');

    if (mods.includes(MODULE_CODE)) {
      console.log(`  · plan_templates[${plan.id}] ${plan.name}: 이미 포함 — 건너뜀`);
      continue;
    }
    mods.push(MODULE_CODE);
    await plan.update({ included_modules: mods });
    console.log(`  ✓ plan_templates[${plan.id}] ${plan.name}: ${MODULE_CODE} 추가 (모듈 ${mods.length}개)`);
    changed++;
  }
  if (!plans.length) console.log('  ⚠ plan_target=restaurant 요금제를 찾지 못함');
  return changed;
}

(async () => {
  try {
    console.log('🎥 AI 카메라 서빙 판매 등록 (ai_serving)');
    await ensureAddonModule();
    await ensureEnterpriseIncludes();

    // 검증: Enterprise 가 실제로 포함하는지 되읽어 확인 (조용한 실패 방지)
    const [rows] = await sequelize.query(
      "SELECT id, name, included_modules FROM plan_templates WHERE plan_target='restaurant'"
    );
    let ok = false;
    for (const r of rows) {
      const m = Array.isArray(r.included_modules) ? r.included_modules : JSON.parse(r.included_modules || '[]');
      const isEnt = String(r.name || '').toLowerCase() === 'enterprise';
      if (isEnt && m.includes(MODULE_CODE)) ok = true;
      if (!isEnt && m.includes(MODULE_CODE)) {
        console.error(`  ✗ ${r.name} 에 ${MODULE_CODE} 가 잘못 들어감 — Enterprise 전용이어야 함`);
        process.exit(1);
      }
    }
    if (!ok) { console.error('  ✗ Enterprise 에 ai_serving 이 없음 — 실패'); process.exit(1); }
    console.log('✅ 완료 — Enterprise 전용으로 ai_serving 판매 등록됨');
    process.exit(0);
  } catch (e) {
    console.error('✗ 실패:', e.message);
    process.exit(1);
  }
})();
