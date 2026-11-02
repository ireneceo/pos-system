/**
 * 브랜드 Performance(Overview) 계산 — 순수 함수 (2026-11-01 Fable 설계
 * .claude/fable-design-20261101-brand-performance.md §2-3-8). 화면은 호출만 한다.
 *
 * 정의
 *   - 매출 주문 = isRevenueOrder (completed/served · 삭제 아님) — 서버 utils/revenueOrders 와 같다.
 *   - 기간 = 그 주문 매장 시간대의 createdAt 날짜가 [start, end] 안 (orderLocalTime).
 *   - Customers = 매출 주문의 고유 customer_id. 총계는 매장별 합이 아니라 합집합.
 *   - Avg Fulfillment = createdAt→served_at 분의 주문 가중 평균(총계도 Σ분 ÷ Σ건).
 *   - Growth = 이전 기간 매출이 0 이면 null(정의 안 됨 — 화면은 «—»).
 */
import { isRevenueOrder } from './orderRevenue';
import { localDateKey, inDateRange, previousPeriod } from './orderLocalTime';

export interface PerfRestaurant {
  id: number;
  name: string;
  branch_name?: string | null;
  brandId: number;
  brandName: string;
  brandCode: string;
  currency: string;
  timeZone: string;
}

export interface PerfOrder {
  restaurant_id: number | string;
  total_amount?: string | number | null;
  status?: string | null;
  is_deleted?: boolean | number | null;
  createdAt: string;
  customer_id?: number | string | null;
  served_at?: string | null;
}

export interface RestaurantPerformanceData extends PerfRestaurant {
  totalOrders: number;
  completedOrders: number;
  sales: number;
  previousSales: number;
  growth: number | null;
  avgOrder: number;
  maxOrder: number;
  uniqueCustomers: number;
  avgServiceTime: number;
  customerIds: string[];
  servedCount: number;
  servedMinutesSum: number;
}

export interface PerformanceStats {
  totalSales: number;
  totalRestaurants: number;
  totalOrders: number;
  totalCustomers: number;
  maxOrderValue: number;
  overallAvgOrder: number;
  overallAvgServiceTime: number;
  overallGrowth: number | null;
}

const r2 = (n: number) => Math.round(n * 100) / 100;
const r1 = (n: number) => Math.round(n * 10) / 10;
const amount = (o: PerfOrder) => parseFloat(String(o.total_amount ?? '0')) || 0;

export const growthPct = (cur: number, prev: number): number | null =>
  prev > 0 ? r1(((cur - prev) / prev) * 100) : null;

export function computeRestaurantMetrics(
  restaurants: PerfRestaurant[], orders: PerfOrder[], range: { start: string; end: string }
): RestaurantPerformanceData[] {
  const prev = previousPeriod(range.start, range.end);
  const byRest = new Map<number, PerfOrder[]>();
  for (const o of orders) {
    const rid = Number(o.restaurant_id);
    if (!byRest.has(rid)) byRest.set(rid, []);
    byRest.get(rid)!.push(o);
  }
  return restaurants.map(r => {
    const mine = byRest.get(Number(r.id)) || [];
    const cur: PerfOrder[] = [];
    const prv: PerfOrder[] = [];
    for (const o of mine) {
      const k = localDateKey(o.createdAt, r.timeZone);
      if (inDateRange(k, range.start, range.end)) cur.push(o);
      else if (inDateRange(k, prev.start, prev.end)) prv.push(o);
    }
    const rev = cur.filter(o => isRevenueOrder(o as any));
    const prevRev = prv.filter(o => isRevenueOrder(o as any));
    const sales = rev.reduce((s, o) => s + amount(o), 0);
    const previousSales = prevRev.reduce((s, o) => s + amount(o), 0);
    const maxOrder = rev.reduce((m, o) => Math.max(m, amount(o)), 0);
    const customerIds = Array.from(new Set(rev.filter(o => o.customer_id != null && o.customer_id !== '').map(o => String(o.customer_id))));
    let servedCount = 0;
    let servedMinutesSum = 0;
    for (const o of rev) {
      if (!o.served_at || !o.createdAt) continue;
      const diff = (new Date(o.served_at).getTime() - new Date(o.createdAt).getTime()) / 60000;
      if (!isFinite(diff)) continue;
      servedCount += 1;
      servedMinutesSum += diff > 0 ? diff : 0;
    }
    return {
      ...r,
      totalOrders: cur.length,
      completedOrders: rev.length,
      sales: r2(sales),
      previousSales: r2(previousSales),
      growth: growthPct(sales, previousSales),
      avgOrder: rev.length ? r2(sales / rev.length) : 0,
      maxOrder: r2(maxOrder),
      uniqueCustomers: customerIds.length,
      avgServiceTime: servedCount ? Math.round(servedMinutesSum / servedCount) : 0,
      customerIds,
      servedCount,
      servedMinutesSum
    };
  });
}

export function summarize(rows: RestaurantPerformanceData[]): PerformanceStats {
  const totalSales = r2(rows.reduce((s, r) => s + r.sales, 0));
  const totalOrders = rows.reduce((s, r) => s + r.completedOrders, 0);
  const previousTotalSales = rows.reduce((s, r) => s + r.previousSales, 0);
  const customers = new Set<string>();
  rows.forEach(r => r.customerIds.forEach(c => customers.add(c)));
  const servedCount = rows.reduce((s, r) => s + r.servedCount, 0);
  const servedMinutes = rows.reduce((s, r) => s + r.servedMinutesSum, 0);
  return {
    totalSales,
    totalRestaurants: rows.length,
    totalOrders,
    totalCustomers: customers.size,
    maxOrderValue: Math.max(0, ...rows.map(r => r.maxOrder)),
    overallAvgOrder: totalOrders ? r2(totalSales / totalOrders) : 0,
    overallAvgServiceTime: servedCount ? Math.round(servedMinutes / servedCount) : 0,
    overallGrowth: growthPct(totalSales, previousTotalSales)
  };
}
