/**
 * suites/stock-ledger.js — «재고 장부 = 단일 진실» 불변식 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-2-F)
 *
 * 재고 수량을 바꾸는 코드는 services/stockLedger.record() 하나를 지난다. 그 약속이 깨지면(장부를 안 거치는 문이
 * 다시 열리면) 재고 총액·기간 원가·폐기 금액이 전부 틀어진다. 사람이 기억하는 규칙은 잊히므로 게이트가 막는다.
 *
 * 창(window) 원칙 — ingredient-unification 과 같다:
 *   LEDGER-001  전수 «장부 합 = 현재고» 어긋남 — **목록(warn, 비차단)**. 장부 단일화 전의 옛 누수가 남아 있다.
 *               배포 뒤 scripts/reconcile-ledger-drift.js(드라이런 → Irene 표 → --apply)로 맞춘 다음 차단으로 올린다.
 *   LEDGER-004  CUTOFF 이후 장부 줄 사슬(앞 줄 stock_after + 이 줄 변화 = 이 줄 stock_after) — **차단**.
 *               장부를 안 거친 변경이 두 줄 사이에 끼면 여기서 끊긴다 = 새 누수를 막는 살아 있는 게이트.
 *   LEDGER-002  CUTOFF 이후 재료 장부 줄 중 원가를 아는데 금액이 빈 줄 0 — **차단**.
 *   LEDGER-003  CUTOFF 이후 폐기 줄 사유 코드 빈 것 0 — **차단**.
 * 단위: 전부 행 수(건). 금액 비교 없음.
 */
const { findLedgerDrift, chainBreakSql } = require('../../../utils/ledgerDrift');

// 장부 단일 함수(stockLedger) 가 들어간 날 — 이 날 이후 줄만 차단 대상
const CUTOFF = '2026-10-08';

module.exports = {
  name: 'stock-ledger',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail, warn = false) => checks.push({ name, pass, detail, warn });
    const cnt = async (sql) => Number((await q(sql))[0].c);

    // LEDGER-001 (목록) — 대상 종류별 어긋남 건수
    const drift = await findLedgerDrift(q);
    const byKind = {};
    drift.forEach(d => { byKind[d.kind] = (byKind[d.kind] || 0) + 1; });
    add('LEDGER-001 장부 합 = 현재고 (전수 · 목록)', drift.length === 0,
      drift.length ? `${drift.length}건 어긋남 ${JSON.stringify(byKind)} — scripts/reconcile-ledger-drift.js 로 드라이런` : '', true);

    // LEDGER-004 (차단) — 새 장부 줄 사슬
    const breaks = (await q(chainBreakSql(CUTOFF))).length;
    add(`LEDGER-004 장부 줄 사슬 끊김 0 (>=${CUTOFF})`, breaks === 0,
      breaks ? `${breaks}줄 — 장부를 안 거친 재고 변경이 다시 생겼다(services/stockLedger 우회)` : '');

    // LEDGER-002 (차단) — 원가를 아는 재료인데 금액 빈 줄
    // 분모 = 그 매장이 보는 원가(services/storeCost.effectiveStoreCost 와 같은 규칙): 매장 소유 재료 → 재료 행,
    //   브랜드 공유 재료 → 그 매장 오버레이(없으면 브랜드 원가). 오버레이 원가 0 인 브랜드 재료를 «원가 있음» 으로 세지 않는다.
    const noCost = await cnt(`SELECT COUNT(*) c FROM inventory_transactions t
        JOIN ingredients i ON i.id = t.ingredient_id
        LEFT JOIN restaurant_ingredient_costs o
          ON i.owner_type = 'brand' AND o.ingredient_id = i.id AND t.entity_type = 'restaurant' AND o.restaurant_id = t.entity_id
       WHERE t.created_at >= '${CUTOFF}' AND t.cost_value IS NULL
         AND (CASE WHEN o.id IS NOT NULL THEN o.unit_cost ELSE i.unit_cost END) > 0`);
    add(`LEDGER-002 원가 있는 재료 장부 줄 금액 빈 것 0 (>=${CUTOFF})`, noCost === 0,
      noCost ? `${noCost}줄 — stockLedger 를 안 거친 쓰기이거나 원가 읽기 실패` : '');

    // LEDGER-003 (차단) — 폐기 사유 코드
    const noReason = await cnt(`SELECT COUNT(*) c FROM inventory_transactions
       WHERE created_at >= '${CUTOFF}' AND transaction_type = 'waste' AND (reason_code IS NULL OR reason_code = '')`);
    add(`LEDGER-003 폐기 줄 사유 코드 빈 것 0 (>=${CUTOFF})`, noReason === 0,
      noReason ? `${noReason}줄 — 폐기 리포트가 사유로 못 나눈다` : '');

    return checks;
  },
};
