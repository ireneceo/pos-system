// 발주점·제안 수량 단일 공식 — utils/reorderMath.js (2026-10-08 · Fable 판정 Ⅱ-4)
const { compute, pickDailyUsage } = require('../utils/reorderMath');

describe('reorderMath.compute', () => {
  test('최소재고(발주 기준)가 있으면 발주점 = 그 숫자 그대로 (2026-11-10 개정 — 예전 10×2+15=35)', () => {
    const r = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 15, onHand: 30, onOrder: 0 });
    expect(r.reorder_point).toBe(15);
    expect(r.level_source).toBe('manual');
    expect(r.suggested_qty).toBe(55);          // 15 + 70 − 30
    expect(r.needs_order).toBe(false);         // 30 > 15
  });
  test('최소재고가 없으면 안전재고 = 사용량 × 리드타임 × 안전%', () => {
    const r = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 0, safetyStockPercent: 20, onHand: 100 });
    expect(r.safety_stock).toBe(4);
    expect(r.reorder_point).toBe(24);
    expect(r.needs_order).toBe(false);         // 100 > 24
  });
  test('이미 오는 중인 발주량을 뺀다', () => {
    const a = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 15, onHand: 30, onOrder: 0 });
    const b = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 15, onHand: 30, onOrder: 50 });
    expect(b.suggested_qty).toBe(a.suggested_qty - 50);
    const c = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 15, onHand: 10, onOrder: 10 });
    expect(c.needs_order).toBe(false);         // 10 + 10 > 15 → 아직 발주점 위
  });
  test('사용량 0 · 최소재고 0 이면 제안 없음', () => {
    const r = compute({ dailyUsage: 0, leadTimeDays: 2, minStock: 0, onHand: 0 });
    expect(r.suggested_qty).toBe(0);
    expect(r.needs_order).toBe(false);
  });
});

describe('reorderMath.pickDailyUsage', () => {
  test('장부 기록 7일 이상이면 장부 값', () => {
    expect(pickDailyUsage({ used: 70, days_with_data: 7 }, 99)).toEqual({ daily: 10, source: 'ledger', days: 7 });
  });
  test('7일 미만이면 수동값', () => {
    expect(pickDailyUsage({ used: 30, days_with_data: 3 }, 5)).toEqual({ daily: 5, source: 'manual', days: 3 });
  });
  test('둘 다 없으면 0', () => {
    expect(pickDailyUsage(null, null)).toEqual({ daily: 0, source: 'none', days: 0 });
  });
});

// 2026-11-03 Fable 설계 §3-5 검산 사례 (.claude/fable-design-20261103-stock-foresight-oneclick-po.md)
const { classify, orderQtyFor } = require('../utils/reorderMath');
function flow({ onHand, committed = 0, daily = 0, lead = 2, min = 0, safety = 20, onOrder = 0, conv = 1, moq = null }) {
  const available = onHand - committed;
  const c = compute({ dailyUsage: daily, leadTimeDays: lead, minStock: min, safetyStockPercent: safety, onHand: available, onOrder });
  const k = classify({ available, on_order: onOrder, daily, min_stock: min, reorder_point: c.reorder_point, committed });
  const o = orderQtyFor({ suggest_stock: c.suggested_qty, unit_conversion: conv, moq });
  return { c, k, o, available };
}

describe('재고 전망 — 단계 판정 + 주문 수량 (Fable §3-5)', () => {
  test('A 지금 발주: 약속한 양 차감 · 500g/pack 올림 · MOQ 10', () => {
    const { c, k, o, available } = flow({ onHand: 2000, committed: 1500, daily: 400, lead: 3, conv: 500, moq: 10 });
    expect(c.safety_stock).toBe(240);
    expect(c.reorder_point).toBe(1440);
    expect(available).toBe(500);
    expect(k.status).toBe('order_now');
    expect(k.days_of_cover).toBe(1.3);
    expect(c.suggested_qty).toBe(3740);
    expect(o.steps.s2).toBe(8);
    expect(o.order_qty).toBe(10);
    expect(o.stock_qty).toBe(5000);
  });
  test('B 곧 부족 → soon · 1 pack', () => {
    const { c, k, o } = flow({ onHand: 4000, daily: 400, lead: 3, conv: 500 });
    expect(k.status).toBe('soon');
    expect(k.days_of_cover).toBe(10);
    expect(c.suggested_qty).toBe(240);
    expect(o.order_qty).toBe(1);
  });
  test('B′ 괜찮음 → ok · 제안 0', () => {
    const { c, k } = flow({ onHand: 6000, daily: 400, lead: 3, conv: 500 });
    expect(k.status).toBe('ok');
    expect(k.days_of_cover).toBe(15);
    expect(c.suggested_qty).toBe(0);
  });
  test('C 최소치만 → order_now · 5 + 2.5 − 3 = 4.5 → MOQ 10 (2026-11-10 ② 채울 여유 = 발주점×0.5)', () => {
    const { c, k, o } = flow({ onHand: 3, min: 5, conv: 1, moq: 10 });
    expect(c.reorder_point).toBe(5);
    expect(k.status).toBe('order_now');
    expect(k.days_of_cover).toBeNull();
    expect(c.suggested_qty).toBe(4.5);
    expect(o.order_qty).toBe(10);
  });
  test('D 기준 없음 → no_basis', () => {
    expect(flow({ onHand: 0 }).k.status).toBe('no_basis');
  });
  test('E 약속 초과 → 기준 없어도 out', () => {
    expect(flow({ onHand: 3, committed: 5 }).k.status).toBe('out');
  });
  test('F MOQ 미정(null) → 올림만', () => {
    expect(orderQtyFor({ suggest_stock: 3, unit_conversion: 1, moq: null }).order_qty).toBe(3);
  });
  test('G 소수: 올림이 먼저 · MOQ 0.5', () => {
    expect(orderQtyFor({ suggest_stock: 0.3, unit_conversion: 1, moq: 0.5 }).order_qty).toBe(1);
  });
  test('제안 0 이면 MOQ 를 붙이지 않는다', () => {
    expect(orderQtyFor({ suggest_stock: 0, unit_conversion: 500, moq: 10 }).order_qty).toBe(0);
  });
});

// 2026-11-10 Fable 설계 §5-1 (.claude/fable-design-20261110-stock-simple-reorder.md) — «정한 숫자 = 기준»
describe('발주 기준 한 숫자 (2026-11-10)', () => {
  test('a min 5 · 하루 10 · 리드 2: 재고 6 → 지금 발주 아님(곧 부족) · 재고 5 → 지금 발주', () => {
    const six = flow({ onHand: 6, daily: 10, lead: 2, min: 5 });
    expect(six.c.reorder_point).toBe(5);
    expect(six.k.status).toBe('soon');
    const five = flow({ onHand: 5, daily: 10, lead: 2, min: 5 });
    expect(five.k.status).toBe('order_now');
  });
  test('b min 10 · 사용량 0 · 재고 2 → 제안 13 · 받은 뒤 15 → ok', () => {
    const b = flow({ onHand: 2, min: 10 });
    expect(b.c.suggested_qty).toBe(13);
    expect(b.k.status).toBe('order_now');
    const after = flow({ onHand: 15, min: 10 });
    expect(after.k.status).toBe('ok');
  });
  test('c 숫자 안 정함 · 하루 10 · 리드 2 · 20% → 자동 24 (변화 없음)', () => {
    const r = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 0, safetyStockPercent: 20, onHand: 100 });
    expect(r.reorder_point).toBe(24);
    expect(r.level_source).toBe('auto');
  });
  test('d 둘 다 0 → no_basis', () => {
    const d = flow({ onHand: 4 });
    expect(d.k.status).toBe('no_basis');
    expect(d.c.level_source).toBe('none');
  });
});
