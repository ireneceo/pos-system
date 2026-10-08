// 발주점·제안 수량 단일 공식 — utils/reorderMath.js (2026-10-08 · Fable 판정 Ⅱ-4)
const { compute, pickDailyUsage } = require('../utils/reorderMath');

describe('reorderMath.compute', () => {
  test('최소재고가 있으면 안전재고 = 최소재고', () => {
    const r = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 15, onHand: 30, onOrder: 0 });
    expect(r.reorder_point).toBe(35);          // 10×2 + 15
    expect(r.suggested_qty).toBe(75);          // 35 + 70 − 30
    expect(r.needs_order).toBe(true);
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
    const c = compute({ dailyUsage: 10, leadTimeDays: 2, minStock: 15, onHand: 30, onOrder: 10 });
    expect(c.needs_order).toBe(false);         // 30 + 10 > 35 → 아직 발주점 위
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
