/**
 * scripts/migrate-brand-performance-stores-route.js
 *   브랜드 "매장 판매 분석" 화면의 새 경로를 모듈 허용목록에 **덧붙인다**.
 *
 * 배경 (Irene 2026-09-07 · Fable 설계):
 *   BG 의 Reports 6탭은 전부 매장 주문 데이터라 Performance 와 같은 물건이었다.
 *   그쪽을 `/pos/brand/general/performance/stores` 로 옮기고, `/pos/brand/general/reports` 는
 *   **브랜드 자신의 매출** 화면이 차지한다.
 *   프론트 `useAllowedRoutes.isRouteAllowed` 는 `addon_modules.ui_routes` 와 **정확히 일치**해야
 *   통과시키므로(하위 경로 자동 허용 없음), 새 경로를 목록에 넣지 않으면 메뉴가 안 보인다.
 *
 * 🔴 **덧붙이기만 한다(expand-only).** 목록을 통째로 써넣으면 다른 마이그가 넣은 경로를 지운다 —
 *    2026-08-30 sprint6 ENUM 사고와 같은 종류다(CLAUDE.md ENUM expand-only 조항).
 *
 * 멱등: 이미 있으면 아무것도 하지 않는다. 매 배포 재실행 안전 → registry `deploy`.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const MODULE_CODE = 'brand_performance';
const ADD_ROUTES = ['/pos/brand/general/performance/stores'];

async function run() {
  const rows = await sequelize.query(
    'SELECT id, module_code, ui_routes FROM addon_modules WHERE module_code = :code',
    { type: QueryTypes.SELECT, replacements: { code: MODULE_CODE } });

  if (!rows.length) {
    console.log(`[brand-performance-stores-route] 모듈 ${MODULE_CODE} 없음 — 건너뜀(경고 아님)`);
    return;
  }

  const row = rows[0];
  let current = row.ui_routes;
  if (typeof current === 'string') { try { current = JSON.parse(current); } catch { current = []; } }
  if (!Array.isArray(current)) current = [];

  const missing = ADD_ROUTES.filter(r => !current.includes(r));
  if (missing.length === 0) {
    console.log(`[brand-performance-stores-route] 이미 있음 (${current.length}개 경로) — 변경 없음`);
    return;
  }

  const next = [...current, ...missing];               // ⛔ 교체 금지 — 기존 + 없는 것만
  await sequelize.query(
    'UPDATE addon_modules SET ui_routes = :routes WHERE id = :id',
    { replacements: { routes: JSON.stringify(next), id: row.id } });

  console.log(`[brand-performance-stores-route] 추가: ${missing.join(', ')} (${current.length} → ${next.length})`);
}

if (require.main === module) {
  run()
    .then(() => { console.log('[brand-performance-stores-route] 완료'); process.exit(0); })
    .catch((e) => { console.error('[brand-performance-stores-route] 실패:', e.message); process.exit(1); });
}

module.exports = { run };
