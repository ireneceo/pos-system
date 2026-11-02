import { computeRestaurantMetrics, summarize } from '../brandPerformanceMath';
import { localDateKey, localHour, previousPeriod, fetchWindow, shiftDateKey } from '../orderLocalTime';

const KL = 'Asia/Kuala_Lumpur';
const rest = (id: number) => ({ id, name: 'R' + id, brandId: 1, brandName: 'B', brandCode: 'B', currency: 'MYR', timeZone: KL });
const o = (rid: number, createdAt: string, amt: number, extra: any = {}) =>
  ({ restaurant_id: rid, createdAt, total_amount: String(amt), status: 'completed', ...extra });

describe('orderLocalTime', () => {
  test('KL 00:30 주문(UTC 전날 16:30)은 KL 그날', () => {
    expect(localDateKey('2026-10-31T16:30:00.000Z', KL)).toBe('2026-11-01');
    expect(localHour('2026-10-31T16:30:00.000Z', KL)).toBe(0);
  });
  test('이전 기간 = 같은 길이 바로 앞 · 서버 창은 앞뒤 하루', () => {
    expect(previousPeriod('2026-10-03', '2026-11-01')).toEqual({ start: '2026-09-03', end: '2026-10-02' });
    expect(previousPeriod('2026-11-01', '2026-11-01')).toEqual({ start: '2026-10-31', end: '2026-10-31' });
    expect(fetchWindow('2026-09-03', '2026-11-01')).toEqual({ start_date: '2026-09-02', end_date: '2026-11-02' });
    expect(shiftDateKey('2026-03-01', -1)).toBe('2026-02-28');
  });
});

describe('brandPerformanceMath', () => {
  const range = { start: '2026-11-01', end: '2026-11-01' };
  test('경계: KL 오늘 00:30 → 오늘 · KL 어제 07:30(UTC 그제 23:30) → 이전 기간', () => {
    const [m] = computeRestaurantMetrics([rest(1)], [
      o(1, '2026-10-31T16:30:00.000Z', 10),
      o(1, '2026-10-30T23:30:00.000Z', 40)
    ], range);
    expect(m.completedOrders).toBe(1);
    expect(m.sales).toBe(10);
    expect(m.previousSales).toBe(40);
    expect(m.growth).toBe(-75);
  });
  test('served 포함 · cancelled 제외 · 삭제 제외 · 취소만 한 손님은 손님 아님', () => {
    const [m] = computeRestaurantMetrics([rest(1)], [
      o(1, '2026-11-01T02:00:00Z', 10, { status: 'served', customer_id: 7 }),
      o(1, '2026-11-01T03:00:00Z', 99, { status: 'cancelled', customer_id: 8 }),
      o(1, '2026-11-01T04:00:00Z', 50, { is_deleted: 1, customer_id: 9 })
    ], range);
    expect(m.totalOrders).toBe(3);
    expect(m.completedOrders).toBe(1);
    expect(m.sales).toBe(10);
    expect(m.uniqueCustomers).toBe(1);
  });
  test('두 매장 같은 손님 = 총계 1 · 이행시간 주문 가중 · 이전 0 → null', () => {
    const rows = computeRestaurantMetrics([rest(1), rest(2)], [
      o(1, '2026-11-01T02:00:00Z', 10, { customer_id: 7, served_at: '2026-11-01T02:10:00Z' }),
      o(2, '2026-11-01T02:00:00Z', 20, { customer_id: 7, served_at: '2026-11-01T02:30:00Z' }),
      o(2, '2026-11-01T03:00:00Z', 30, { served_at: '2026-11-01T03:30:00Z' }),
      o(2, '2026-11-01T04:00:00Z', 40, { served_at: '2026-11-01T04:30:00Z' })
    ], range);
    const s = summarize(rows);
    expect(rows[0].uniqueCustomers + rows[1].uniqueCustomers).toBe(2);
    expect(s.totalCustomers).toBe(1);
    expect(s.overallAvgServiceTime).toBe(Math.round((10 + 30 + 30 + 30) / 4)); // 25 (단순평균이면 20)
    expect(s.overallGrowth).toBeNull();
    expect(s.totalSales).toBe(100);
    expect(s.overallAvgOrder).toBe(25);
    expect(s.maxOrderValue).toBe(40);
  });
});
