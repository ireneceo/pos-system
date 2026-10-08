// 기간 원가 계산 단일 소스 — utils/foodCostMath.js (2026-10-08 · Fable 판정 Ⅱ-3-G)
const { ingredientPeriod, totals } = require('../utils/foodCostMath');

describe('foodCostMath.ingredientPeriod', () => {
  test('데모 시나리오 모양: 매입 1.00 · 판매 0.40 · 폐기 0.10 · 실사 −0.05 → 실제 0.55 = 이론 0.40 + 설명 0.10 + 설명 불가 0.05', () => {
    // 기초 0 · 매입 100 g @RM10/1000 g = 1.00 · 판매 40 g · 폐기 10 g · 실사에서 5 g 모자람 → 기말 45 g = 0.45
    const r = ingredientPeriod({
      opening_value: 0, closing_value: 0.45,
      by_type: { purchase: 1.0, order_deduct: -0.40, waste: -0.10, stock_take: -0.05 },
    });
    expect(r.actual_usage).toBe(0.55);
    expect(r.theoretical_usage).toBe(0.4);
    expect(r.explained_usage).toBe(0.1);
    expect(r.unexplained_variance).toBe(0.05);
    expect(r.stock_take_variance).toBe(0.05);
    expect(r.revaluation).toBe(0);
  });

  test('장부가 완전하고 원가가 그대로면 설명 안 되는 차이 = 실사 차이, 원가 변동분 0', () => {
    // 기초 10 · 매입 +5 · 판매 −3 · 폐기 −1 · 실사 −0.5 → 기말 10.5
    const r = ingredientPeriod({ opening_value: 10, closing_value: 10.5,
      by_type: { purchase: 5, order_deduct: -3, waste: -1, stock_take: -0.5 } });
    expect(r.actual_usage).toBe(4.5);
    expect(r.unexplained_variance).toBe(0.5);
    expect(r.stock_take_variance).toBe(0.5);
    expect(r.revaluation).toBe(0);
  });

  test('반품은 매입을 줄인다(return_out 은 −)', () => {
    const r = ingredientPeriod({ opening_value: 0, closing_value: 3, by_type: { purchase: 5, return_out: -2 } });
    expect(r.purchase_value).toBe(3);
    expect(r.actual_usage).toBe(0);
  });

  test('만들기(원재료 −·준비재료 +)·조정·초기재고는 «설명되는 사용»', () => {
    const r = ingredientPeriod({ opening_value: 0, closing_value: 1, by_type: { initial: 2, production: -0.5, adjustment: -0.5 } });
    // 기초 0 + 매입 0 − 기말 1 = −1 (초기재고 +2 가 들어와 늘어남) · 설명 = −(2 −0.5 −0.5) = −1
    expect(r.actual_usage).toBe(-1);
    expect(r.explained_usage).toBe(-1);
    expect(r.unexplained_variance).toBe(0);
  });

  test('원가가 올라 기말을 새 원가로 매기면 그 차이는 원가 변동분', () => {
    // 기초 100 g 을 10 으로, 기말 100 g 을 12 로(원가 인상) · 움직임 없음
    const r = ingredientPeriod({ opening_value: 10, closing_value: 12, by_type: {} });
    expect(r.actual_usage).toBe(-2);
    expect(r.stock_take_variance).toBe(0);
    expect(r.revaluation).toBe(-2);
  });

  test('금액 모르는 줄 수는 그대로 실어 나른다', () => {
    expect(ingredientPeriod({ opening_value: 0, closing_value: 0, by_type: {}, unknown_rows: 3 }).unknown_rows).toBe(3);
  });
});

describe('foodCostMath.totals', () => {
  test('재료 줄 합 + 매출 대비 비율', () => {
    const a = ingredientPeriod({ opening_value: 10, closing_value: 10.5, by_type: { purchase: 5, order_deduct: -3, waste: -1, stock_take: -0.5 } });
    const b = ingredientPeriod({ opening_value: 0, closing_value: 0, by_type: { purchase: 2, order_deduct: -2 } });
    const t = totals([a, b], 20);
    expect(t.actual_usage).toBe(6.5);
    expect(t.theoretical_usage).toBe(5);
    expect(t.actual_cost_pct).toBe(32.5);
    expect(t.theoretical_cost_pct).toBe(25);
  });

  test('매출 0 이면 비율 null (0 으로 나누지 않는다)', () => {
    const t = totals([ingredientPeriod({ opening_value: 1, closing_value: 0, by_type: {} })], 0);
    expect(t.actual_cost_pct).toBeNull();
    expect(t.theoretical_cost_pct).toBeNull();
  });
});
