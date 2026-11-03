// 브랜드 판매 재고 «가용량» — 접수 순 배정 (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-phase2.md §3-3)
const { allocate, availableUnitsFor, committedByPi } = require('../utils/sellerStockPool');

const rulesOf = (obj) => new Map(Object.entries(obj).map(([k, v]) => [Number(k), v]));
const pool = (obj) => new Map(Object.entries(obj));

describe('sellerStockPool.allocate — 접수 순 배정', () => {
  // 프로덕트 1 = 다이렉트 500 g/pack (재고아이템 pi:10)
  const direct = rulesOf({ 1: [{ key: 'pi:10', per: 500 }] });

  test('A 둘 다 됨 — 남는 것 0 · 새 주문은 Out', () => {
    const r = allocate({ lines: [{ item_id: 'a', qty: 3, bp_id: 1 }, { item_id: 'b', qty: 1, bp_id: 1 }], rules: direct, onHand: pool({ 'pi:10': 2000 }) });
    expect(r.lines.a.short_units).toBe(0);
    expect(r.lines.b.short_units).toBe(0);
    expect(r.pool.get('pi:10')).toBe(0);
    expect(availableUnitsFor(direct.get(1), r.pool)).toBe(0);
  });

  test('B 둘째가 모자람 — short 1 · pool −500 · available −1', () => {
    const r = allocate({ lines: [{ item_id: 'a', qty: 3, bp_id: 1 }, { item_id: 'b', qty: 2, bp_id: 1 }], rules: direct, onHand: pool({ 'pi:10': 2000 }) });
    expect(r.lines.a.short_units).toBe(0);
    expect(r.lines.b.short_units).toBe(1);
    expect(r.lines.a.available_units).toBe(4);   // 2,000 g = 4 pack 있을 때 3 pack
    expect(r.lines.b.available_units).toBe(1);   // 앞 주문 뒤 500 g = 1 pack 남은 채로 2 pack
    expect(r.pool.get('pi:10')).toBe(-500);
    expect(availableUnitsFor(direct.get(1), r.pool)).toBe(-1);
  });

  test('C 레시피 — 가장 모자란 재료 기준', () => {
    const rec = rulesOf({ 2: [{ key: 'pi:1', per: 100 }, { key: 'pi:2', per: 50 }] });
    const r = allocate({ lines: [{ item_id: 'x', qty: 5, bp_id: 2 }], rules: rec, onHand: pool({ 'pi:1': 1000, 'pi:2': 120 }) });
    expect(r.lines.x.short_units).toBe(3);        // pi:2 250 필요 · 120 있음 → 130 부족 → ceil(130/50)
    expect(r.pool.get('pi:1')).toBe(500);
    expect(r.pool.get('pi:2')).toBe(-130);
    expect(availableUnitsFor(rec.get(2), r.pool)).toBe(-3);   // floor(min(500/100, −130/50))
  });

  test('D 자체 재고 — 주문 단위로 센다', () => {
    const self = rulesOf({ 3: [{ key: 'bp:3', per: 1 }] });
    const r = allocate({ lines: [{ item_id: 'p', qty: 3, bp_id: 3 }, { item_id: 'q', qty: 3, bp_id: 3 }], rules: self, onHand: pool({ 'bp:3': 4 }) });
    expect(r.lines.p.short_units).toBe(0);
    expect(r.lines.q.short_units).toBe(2);
    expect(availableUnitsFor(self.get(3), r.pool)).toBe(-2);
  });

  test('E 안 세는 종류(주문제작·서비스) — tracked false · available null', () => {
    const none = rulesOf({ 4: [] });
    const r = allocate({ lines: [{ item_id: 'm', qty: 9, bp_id: 4 }], rules: none, onHand: pool({}) });
    expect(r.lines.m.tracked).toBe(false);
    expect(r.lines.m.short_units).toBe(0);
    expect(availableUnitsFor(none.get(4), r.pool)).toBeNull();
  });

  test('F 접수 순서 — 먼저 들어온 줄이 먼저 가져간다(배열 순서 = 접수 순)', () => {
    const self = rulesOf({ 3: [{ key: 'bp:3', per: 1 }] });
    // openOutboundLines 가 submitted_at 순으로 준다 — B(먼저) 다음 A(id 는 작아도 나중)
    const r = allocate({ lines: [{ item_id: 'B', qty: 3, bp_id: 3 }, { item_id: 'A', qty: 3, bp_id: 3 }], rules: self, onHand: pool({ 'bp:3': 4 }) });
    expect(r.lines.B.short_units).toBe(0);
    expect(r.lines.A.short_units).toBe(2);
  });

  test('G 1단계 «약속한 양» 과 같은 수 — committedByPi = on_hand − pool', () => {
    const lines = [{ item_id: 'a', qty: 3, bp_id: 1 }, { item_id: 'b', qty: 1, bp_id: 1 }];
    const c = committedByPi({ lines, rules: direct });
    expect(c.get(10)).toBe(2000);
    const r = allocate({ lines, rules: direct, onHand: pool({ 'pi:10': 2000 }) });
    expect(2000 - r.pool.get('pi:10')).toBe(c.get(10));
  });
});
