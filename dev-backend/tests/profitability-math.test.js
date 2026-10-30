// 수익성 분석 계산 검산 사례 (순수 함수, DB 불필요) — 설계 .claude/fable-design-20261029-brand-profitability.md §3-10
//
// 1단계에서 쓰는 사례만 박제한다: 1·2·3·4·11·12 + 분면·운영비 규칙.
//   5·6(손익분기)은 화면 시뮬레이터 계산(dev-frontend/src/utils/profitSim.ts)과 그 테스트,
//   7(월 금액 기간 배분)은 아래 prorateMonthly, 8~10(인건비·재료 차이)은 2·3단계.

const M = require('../utils/profitabilityMath');

const settings = { fees: { card: 1.5, cash: 0, ewallet: 1.0 }, channel_fees: {} };
const byName = (it) => ({ key: it.name, name: it.name, category: it.category || 'Mains', product_id: null });

describe('사례 1 — 할인 10 % · 원가 9.50 · 카드 1.5 %', () => {
  const order = { id: 1, subtotal: 28.90, takeaway_charge: 0, discount: 2.89, payment_method: 'card', order_type: 'dine_in', order_items: [{ name: 'Bulgogi', price: 28.90, quantity: 1 }] };
  const r = M.analyzeOrders([order], { resolveLine: byName, costOfLine: () => ({ unit_cost: 9.50, options_unknown: false }), settings });
  const m = r.menus.get('Bulgogi');
  test('라인 순매출 26.01 · 수수료 0.39 · 공헌이익 16.12', () => {
    expect(M.r2(m.net)).toBe(26.01);
    expect(M.r2(m.fees)).toBe(0.39);
    expect(M.r2(m.contribution)).toBe(16.12);
  });
  test('공헌이익률 62.0 % (비율은 1자리)', () => {
    expect(M.pct(m.contribution, m.costed_net)).toBe(62.0);
  });
});

describe('사례 2 — 100 % 할인(서비스 제공)', () => {
  const lc = M.lineContribution({ net: 0, cost: 9.50, feeRate: 1.5 });
  test('순매출 0 · 공헌이익 −9.50 · 률 null', () => {
    expect(lc.net).toBe(0);
    expect(lc.contribution).toBe(-9.5);
    expect(lc.margin_pct).toBeNull();
  });
  test('주문 순매출은 음수가 되지 않는다', () => {
    expect(M.orderNetSales({ subtotal: 20, discount: 25 })).toBe(0);
  });
});

describe('사례 3 — 원가 모르는 라인 1 + 아는 라인 1', () => {
  const order = { id: 3, subtotal: 20, payment_method: 'cash', order_items: [{ name: 'A', price: 10, quantity: 1 }, { name: 'B', price: 10, quantity: 1 }] };
  const r = M.analyzeOrders([order], { resolveLine: byName, costOfLine: (it) => ({ unit_cost: it.name === 'A' ? 4 : null, options_unknown: false }), settings });
  test('집계 공헌이익은 아는 라인만', () => {
    expect(M.r2(r.totals.costed_contribution)).toBe(6);
    expect(r.menus.get('B').uncosted_lines).toBe(1);
  });
  test('원가 아는 매출 비중 50 %', () => {
    expect(M.pct(r.totals.costed_net, r.totals.net)).toBe(50);
  });
});

describe('사례 4 — 직원 식사 주문', () => {
  const sale = { id: 10, subtotal: 30, payment_method: 'cash', order_items: [{ name: 'A', price: 30, quantity: 1 }] };
  const meal = { id: 11, subtotal: 15, payment_method: 'staffMeal', order_items: [{ name: 'A', price: 15, quantity: 1 }] };
  const r = M.analyzeOrders([sale, meal], { resolveLine: byName, costOfLine: () => ({ unit_cost: 5, options_unknown: false }), settings });
  test('순매출·주문 수에서 빠진다', () => {
    expect(r.totals.orders).toBe(1);
    expect(r.totals.net).toBe(30);
  });
  test('원가는 직원 식사 비용으로 따로 센다', () => {
    expect(r.totals.staff_meal.orders).toBe(1);
    expect(r.totals.staff_meal.cost).toBe(5);
  });
});

describe('사례 7 — 월 금액 기간 배분', () => {
  test('월 3,100 · 10/1~10/15 → 1,500.00', () => {
    expect(M.prorateMonthly(3100, 15, 31)).toBe(1500);
  });
});

describe('사례 11 — 세트 원가', () => {
  test('구성품 하나 미등록 → 세트 원가 null(부분합 금지)', () => {
    const c = M.lineUnitCost({ body: null, isSet: true, components: [{ cost: 4, qty: 1 }, { cost: 3.5, qty: 1 }, { cost: null, qty: 1 }], options: [] });
    expect(c.unit_cost).toBeNull();
  });
  test('구성품 4.00 + 3.50 → 7.50', () => {
    const c = M.lineUnitCost({ body: null, isSet: true, components: [{ cost: 4, qty: 1 }, { cost: 3.5, qty: 1 }], options: [] });
    expect(c.unit_cost).toBe(7.5);
  });
  test('옵션 재료 미등록은 0 + 표시만(본체 원가 유지)', () => {
    const c = M.lineUnitCost({ body: 9.5, isSet: false, components: [], options: [0.8, null] });
    expect(c.unit_cost).toBe(10.3);
    expect(c.options_unknown).toBe(true);
  });
  test('본체 모르면 null', () => {
    expect(M.lineUnitCost({ body: null, isSet: false, components: [], options: [1] }).unit_cost).toBeNull();
  });
});

describe('사례 12 — 반올림 · 배분 잔차', () => {
  test('3줄 배분 합 = 주문 순매출(잔차는 마지막 라인)', () => {
    const parts = M.allocateNet([10, 10, 10], 20);
    expect(parts).toEqual([6.67, 6.67, 6.66]);
    expect(M.r2(parts.reduce((s, v) => s + v, 0))).toBe(20);
  });
  test('포장요금은 라인에 비례로 들어간다', () => {
    const order = { id: 12, subtotal: 20, takeaway_charge: 2, payment_method: 'cash', order_items: [{ name: 'A', price: 10, quantity: 1 }, { name: 'B', price: 10, quantity: 1 }] };
    const r = M.analyzeOrders([order], { resolveLine: byName, costOfLine: () => ({ unit_cost: null, options_unknown: false }), settings });
    expect(r.menus.get('A').net + r.menus.get('B').net).toBe(22);
  });
});

describe('수수료 — 결제 줄 비중 · 결제수단 어휘', () => {
  test('카드 50 + 현금 50 → 0.75 %', () => {
    expect(M.orderFeeRate({}, [{ method: 'card', amount: 50 }, { method: 'cash', amount: 50 }], settings)).toBeCloseTo(0.75);
  });
  test('e_wallet 은 ewallet 키로 읽는다', () => {
    expect(M.orderFeeRate({ payment_method: 'e_wallet' }, [], settings)).toBe(1.0);
  });
  test('채널 수수료를 더한다', () => {
    expect(M.orderFeeRate({ payment_method: 'cash', order_type: 'delivery' }, [], { fees: {}, channel_fees: { delivery: 30 } })).toBe(30);
  });
});

describe('메뉴 성과판 4분면', () => {
  const menus = [
    { key: 'A', quantity: 100, unit_contribution: 10 },
    { key: 'B', quantity: 100, unit_contribution: 2 },
    { key: 'C', quantity: 10, unit_contribution: 10 },
    { key: 'D', quantity: 10, unit_contribution: 2 },
    { key: 'E', quantity: 50, unit_contribution: null },
  ];
  const q = M.quadrants(menus, 'median');
  test('분면 4개 + 원가 미등록', () => {
    expect(q.quadrant.get('A')).toBe('star');
    expect(q.quadrant.get('B')).toBe('plowhorse');
    expect(q.quadrant.get('C')).toBe('puzzle');
    expect(q.quadrant.get('D')).toBe('dog');
    expect(q.quadrant.get('E')).toBe('unknown');
  });
  test('기준선 = 원가 아는 메뉴 수 기준 중앙값', () => {
    expect(q.qty_line).toBe(55);
    expect(q.contribution_line).toBe(6);
  });
});

describe('운영비 규칙', () => {
  test('max(6,000, 13 %) — 매출 40,000 → 6,000 / 60,000 → 7,800', () => {
    const rule = { rule: 'max', fixed_amount: 6000, pct: 13 };
    expect(M.ruleAmount(rule, 40000)).toBe(6000);
    expect(M.ruleAmount(rule, 60000)).toBe(7800);
  });
  test('pct · fixed', () => {
    expect(M.ruleAmount({ rule: 'pct', pct: 5 }, 30000)).toBe(1500);
    expect(M.ruleAmount({ rule: 'fixed', fixed_amount: 800 }, 30000)).toBe(800);
  });
});
