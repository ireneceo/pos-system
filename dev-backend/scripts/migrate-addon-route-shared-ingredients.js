/**
 * Migration: BG "매장 공유 표준 재료" 화면을 사이드바에 띄운다 (2026-09-02).
 *
 * 무엇을 하나: `addon_modules` 의 `brand_ingredients` 모듈 `ui_routes` 에
 *   `/pos/brand/general/ingredients` 를 **없을 때만 추가**한다.
 *
 * 왜 필요한가: 사이드바 노출은 역할이 아니라 **요금제 모듈**이 정한다
 *   (hooks/useAllowedRoutes.ts → GET /brands/:id/allowed-routes → AddonModule.ui_routes 합집합).
 *   새 화면이 어느 모듈에도 없어 라우트는 열리는데 **메뉴에 안 보였다.**
 *   Stock Items(매입자재)와 같은 관리 주체·같은 요금 계층이라 같은 모듈에 붙인다
 *   (새 모듈을 만들면 기존 구독자에게 자동으로 안 붙는다).
 *
 * 왜 안전한가:
 *   - **append-only**: 현재 목록을 읽어 없는 값만 더한다. 목록 교체 금지
 *     (ENUM expand-only 와 같은 규율 — 하드코딩 목록은 남의 값을 지운다).
 *   - 멱등: 이미 있으면 skip. 매 배포 재실행 안전.
 *   - 모듈 행이 없으면 아무것도 하지 않는다(만들지 않는다 — 요금 항목을 마이그가 창조하면 안 된다).
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-addon-route-shared-ingredients.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const MODULE_CODE = 'brand_ingredients';
const NEW_ROUTE = '/pos/brand/general/ingredients';

(async () => {
  try {
    console.log('[migrate-addon-route-shared-ingredients] Start');
    const rows = await sequelize.query(
      'SELECT id, module_code, ui_routes FROM addon_modules WHERE module_code = :c LIMIT 1',
      { replacements: { c: MODULE_CODE }, type: sequelize.QueryTypes.SELECT }
    );
    if (!rows.length) {
      console.log(`  – ${MODULE_CODE} 모듈이 없다 — skip (모듈을 만들지 않는다)`);
      process.exit(0);
    }
    const row = rows[0];
    let list = row.ui_routes;
    if (typeof list === 'string') { try { list = JSON.parse(list); } catch { list = []; } }
    if (!Array.isArray(list)) list = [];

    if (list.includes(NEW_ROUTE)) {
      console.log(`  ✓ 이미 있음 — skip (현재: ${JSON.stringify(list)})`);
      process.exit(0);
    }
    const next = [...list, NEW_ROUTE];
    await sequelize.query(
      'UPDATE addon_modules SET ui_routes = :v WHERE id = :id',
      { replacements: { v: JSON.stringify(next), id: row.id } }
    );
    // 추가만 했는지 증명 — 하나라도 사라졌으면 실패시킨다(조용한 소거 금지)
    const after = await sequelize.query(
      'SELECT ui_routes FROM addon_modules WHERE id = :id',
      { replacements: { id: row.id }, type: sequelize.QueryTypes.SELECT }
    );
    let now = after[0].ui_routes;
    if (typeof now === 'string') { try { now = JSON.parse(now); } catch { now = []; } }
    const lost = list.filter((r) => !now.includes(r));
    if (lost.length) throw new Error(`기존 경로가 사라졌다: ${lost.join(', ')}`);
    if (!now.includes(NEW_ROUTE)) throw new Error('추가가 반영되지 않았다');
    console.log(`  ✓ ${MODULE_CODE}.ui_routes 에 ${NEW_ROUTE} 추가 (현재: ${JSON.stringify(now)})`);
    console.log('[migrate-addon-route-shared-ingredients] Done.');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
