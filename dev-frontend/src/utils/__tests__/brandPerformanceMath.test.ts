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
  test('주문 금액 = 주문 관리 Total Sales: 완료 전 포함 · 취소/삭제 제외 · 날짜는 order_date', () => {
    const [m] = computeRestaurantMetrics([rest(1)], [
      o(1, '2026-11-01T02:00:00Z', 10, { status: 'completed' }),
      o(1, '2026-11-01T03:00:00Z', 20, { status: 'pending' }),
      o(1, '2026-11-01T03:10:00Z', 5, { status: 'outstanding' }),
      o(1, '2026-11-01T03:30:00Z', 99, { status: 'cancelled' }),
      o(1, '2026-11-01T04:00:00Z', 50, { status: 'preparing', is_deleted: true }),
      // 오프라인 동기화: 어제(KL) 받은 주문이 오늘 올라옴 → order_date 기준 어제라 빠짐
      o(1, '2026-11-01T05:00:00Z', 70, { status: 'pending', order_date: '2026-10-31T10:00:00Z' }),
      // 반대로 어제 생성됐지만 order_date 가 오늘
      o(1, '2026-10-31T15:00:00Z', 3, { status: 'ready', order_date: '2026-10-31T16:30:00Z' })
    ], range);
    expect(m.sales).toBe(10);
    expect(m.orderValue).toBe(38);
    expect(m.orderValueCount).toBe(4);
    const s = summarize([m, ...computeRestaurantMetrics([rest(2)], [o(2, '2026-11-01T02:00:00Z', 2, { status: 'served' })], range)]);
    expect(s.totalOrderValue).toBe(40);
    expect(s.totalOrderValueCount).toBe(5);
  });
  test('Max Fulfillment = 매출 주문 중 가장 오래 걸린 분 · 없으면 0', () => {
    const rows = computeRestaurantMetrics([rest(1), rest(2), rest(3)], [
      o(1, '2026-11-01T02:00:00Z', 10, { served_at: '2026-11-01T02:10:00Z' }),
      o(1, '2026-11-01T03:00:00Z', 10, { served_at: '2026-11-01T03:47:20Z' }),
      o(1, '2026-11-01T04:00:00Z', 10, { status: 'cancelled', served_at: '2026-11-01T09:00:00Z' }),
      o(2, '2026-11-01T02:00:00Z', 10, { status: 'served', served_at: '2026-11-01T03:05:00Z' }),
      o(3, '2026-11-01T02:00:00Z', 10)
    ], range);
    expect(rows[0].maxServiceTime).toBe(47);
    expect(rows[0].avgServiceTime).toBe(Math.round((10 + 47 + 20 / 60) / 2));
    expect(rows[1].maxServiceTime).toBe(65);
    expect(rows[2].maxServiceTime).toBe(0);
    expect(summarize(rows).overallMaxServiceTime).toBe(65);
    expect(summarize([]).overallMaxServiceTime).toBe(0);
  });
});
