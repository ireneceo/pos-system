/**
 * suites/plan-modules.js — 플랜 모듈 완결성 불변식.
 * 2026-07-05 운영에서 브랜드 플랜 3종에 buyer_supplier_directory/buyer_purchase_orders 모듈이
 * 빠져 있어, BG가 공급업체 "Products" 버튼·발주 페이지를 누르면 모듈 게이트(ProtectedRoute)가
 * 대시보드로 튕기던 dead-end. dev엔 시드가 돌아 통과 → dev/prod 시드 드리프트. 그 클래스를 박제.
 *
 * 규칙: 특정 역할(구매자)이 쓰는 플랜은 그 역할이 접근하는 게이트 모듈을 반드시 포함해야 한다.
 * 없으면 = 화면엔 버튼이 보이는데 클릭만 튕기는 dead-end.
 */
module.exports = {
  name: 'plan-modules',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });

    // 구매(발주) 역할이 반드시 가져야 하는 buyer 모듈. plan_templates.included_modules(JSON)에 존재해야.
    const BUYER_MODULES = ['buyer_supplier_directory', 'buyer_purchase_orders'];
    // 이 역할군의 플랜은 발주/공급업체 화면을 쓴다 (게이트 대상).
    const BUYER_PLAN_TARGETS = ['brand', 'foodcourt', 'owner', 'restaurant'];

    let planRows = [];
    try {
      planRows = await q(
        `SELECT name, plan_target, included_modules FROM plan_templates
         WHERE plan_target IN (${BUYER_PLAN_TARGETS.map(() => '?').join(',')})`,
        BUYER_PLAN_TARGETS
      );
    } catch (e) {
      add('plan-modules 조회', false, 'plan_templates 조회 실패: ' + e.message.slice(0, 100));
      return checks;
    }

    for (const mod of BUYER_MODULES) {
      const missing = planRows.filter(p => {
        let mods = [];
        try { mods = Array.isArray(p.included_modules) ? p.included_modules : JSON.parse(p.included_modules || '[]'); } catch { mods = []; }
        return !mods.includes(mod);
      });
      add(`P-MOD 모든 구매자 플랜에 ${mod} 포함`,
        missing.length === 0,
        missing.length ? `누락 ${missing.length}개 플랜: ${missing.slice(0, 6).map(p => p.name).join(', ')} → 화면 버튼이 대시보드로 튕기는 dead-end` : '');
    }

    return checks;
  },
};
