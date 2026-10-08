/**
 * 기간 원가 계산 — 단일 소스 (2026-10-08 · Fable 판정 `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-3-B)
 *
 * 재료 한 줄마다(그리고 합계):
 *   실제 사용액   = 기초 재고액 + 매입액 − 기말 재고액
 *   이론 사용액   = 판매 차감(order_deduct) 장부 금액 — 팔린 메뉴의 레시피대로라면 썼어야 할 값
 *   설명되는 사용 = 폐기(waste) + 조정(adjustment) + 만들기(production) + 초기재고(initial) 장부 금액
 *   설명 안 되는 차이 = 실제 − 이론 − 설명되는 사용
 *                    = 실사 차이(stock_take: 셌더니 모자람) + 원가 변동분(기초·기말을 지금 원가로 매긴 차이)
 *   ※ Fable 판정 예시(실제 1.05 · 이론 0.40 · 설명 0.10 · 설명 불가 0.05)와 같게 — 실사 차이는 «원인 모름» 쪽이다.
 *
 * 장부 금액(cost_value)은 부호 = 수량 부호(들어오면 +, 나가면 −). 사용액은 «나간 값» 이라 부호를 뒤집는다.
 * 매입액 = purchase + return_in + return_out(반품은 − 라 매입을 줄인다).
 * 금액 모르는 장부 줄(cost_value NULL)은 합에서 빠지고 unknown_rows 로 센다 — 숨기지 않는다.
 */
const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const PURCHASE_TYPES = ['purchase', 'return_in', 'return_out'];
const EXPLAINED_TYPES = ['waste', 'adjustment', 'production', 'initial'];

/**
 * @param {{opening_value:number, closing_value:number, by_type:Object<string,number>, unknown_rows?:number}} x
 *        by_type = 기간 안 장부 금액 합(부호 그대로) — 유형별
 */
function ingredientPeriod(x) {
  const t = x.by_type || {};
  const sum = (types) => types.reduce((a, k) => a + (Number(t[k]) || 0), 0);
  const opening = r2(x.opening_value);
  const closing = r2(x.closing_value);
  const purchases = r2(sum(PURCHASE_TYPES));
  const actual = r2(opening + purchases - closing);
  const theoretical = r2(-(Number(t.order_deduct) || 0));
  const waste = r2(-(Number(t.waste) || 0));
  const explained = r2(-sum(EXPLAINED_TYPES));
  const stockTake = r2(-(Number(t.stock_take) || 0));
  const unexplained = r2(actual - theoretical - explained);
  return {
    opening_value: opening, purchase_value: purchases, closing_value: closing,
    actual_usage: actual, theoretical_usage: theoretical,
    waste_value: waste, explained_usage: explained,
    stock_take_variance: stockTake,          // 실사 차이(설명 안 되는 차이의 몸통)
    unexplained_variance: unexplained,
    revaluation: r2(unexplained - stockTake), // 원가 변동분(기초·기말을 지금 원가로 매긴 차이 등)
    unknown_rows: Number(x.unknown_rows) || 0,
  };
}

/** 재료 줄들을 더하고 매출 대비 비율을 붙인다. 매출 0 이면 비율은 null(0 으로 나누지 않는다). */
function totals(lines, revenue) {
  const keys = ['opening_value', 'purchase_value', 'closing_value', 'actual_usage', 'theoretical_usage',
    'waste_value', 'explained_usage', 'stock_take_variance', 'unexplained_variance', 'revaluation', 'unknown_rows'];
  const out = {};
  for (const k of keys) out[k] = r2(lines.reduce((a, l) => a + (Number(l[k]) || 0), 0));
  const rev = r2(revenue);
  out.revenue = rev;
  out.actual_cost_pct = rev > 0 ? r2((out.actual_usage / rev) * 100) : null;
  out.theoretical_cost_pct = rev > 0 ? r2((out.theoretical_usage / rev) * 100) : null;
  return out;
}

module.exports = { ingredientPeriod, totals, PURCHASE_TYPES, EXPLAINED_TYPES };
