/**
 * 수익성 분석 API — 매장 1개 /api/restaurants/:id/profitability/... · 범위 /api/profitability/...
 * 설계 .claude/fable-design-20261029-brand-profitability.md §5.
 * 실패 본문(code·message)을 그대로 돌려준다 — 공용 fetchAPI 는 실패 본문을 버린다([[reference_fetchapi_drops_error_body]]).
 */
import { getAuthHeaders } from '../../utils/auth';

export interface ApiResult<T = any> {
  ok: boolean;
  status: number;
  data: T;
  code?: string;
  message?: string;
}

async function call<T>(url: string, init: { method?: string; body?: unknown } = {}): Promise<ApiResult<T>> {
  const res = await fetch(url, {
    method: init.method || 'GET',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let json: any = null;
  try { json = await res.json(); } catch { json = null; }
  return {
    ok: res.ok && json?.success !== false,
    status: res.status,
    data: json?.data,
    code: json?.code || json?.error?.code,
    message: json?.message || json?.error?.message,
  };
}

const qs = (p: Record<string, string | undefined>) => {
  const u = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => { if (v) u.set(k, v); });
  const s = u.toString();
  return s ? `?${s}` : '';
};

export const storeApi = <T = any>(restaurantId: string | number, path: string, init?: { method?: string; body?: unknown }) =>
  call<T>(`/api/restaurants/${restaurantId}/profitability${path}`, init);

export const scopeApi = <T = any>(path: string) => call<T>(`/api/profitability${path}`);

export const periodQuery = (start?: string, end?: string) => qs({ start, end });

export interface Readiness {
  menus_total: number;
  menus_costed: number;
  menu_cost_pct: number | null;
  costed_sales_pct: number | null;
  last_stock_take: string | null;
  fees_configured: boolean;
  cost_rules: number;
}

export interface Targets { food_cost_pct: number; prime_cost_pct: number; variance_alert_pct: number }

export interface Headline {
  orders: number;
  net_sales?: number;
  avg_ticket?: number | null;
  contribution?: number;
  contribution_pct: number | null;
  food_cost_pct: number | null;
  costed_sales_pct: number | null;
}

export interface Summary extends Headline {
  restaurant: { id: number; name: string; brand_id: number | null; currency: string; time_zone: string };
  period: { start: string; end: string; days: number };
  previous: Headline & { start: string; end: string };
  staff_meal?: { orders: number; cost: number; uncosted_lines: number };
  options_unknown_lines: number;
  targets: Targets;
  readiness: Readiness;
  financial_redacted?: boolean;
}

export type Quadrant = 'star' | 'plowhorse' | 'puzzle' | 'dog' | 'unknown';

export interface MenuRow {
  key: string;
  name: string;
  category: string;
  product_id: number | null;
  quantity: number;
  avg_price?: number | null;
  net_sales?: number;
  unit_cost?: number | null;
  contribution?: number | null;
  unit_contribution?: number | null;
  contribution_pct: number | null;
  partly_costed: boolean;
  options_unknown: boolean;
  quadrant: Quadrant;
}

export interface MenusData {
  currency: string;
  baseline: 'median' | 'avg70';
  qty_line: number | null;
  contribution_line?: number | null;
  costed_sales_pct: number | null;
  menus: MenuRow[];
}

export interface OrderMix {
  currency: string;
  orders: number;
  avg_ticket?: number | null;
  contribution_per_order?: number | null;
  costed_sales_pct: number | null;
  option_attach_pct: number | null;
  set_order_pct: number | null;
  channels: Array<{ order_type: string; source: string; orders: number; net_sales?: number; share_pct: number | null; avg_ticket?: number | null; contribution_per_order?: number | null; costed_sales_pct: number | null; fees?: number }>;
  categories: Array<{ category: string; orders: number; attach_pct: number | null }>;
  combos: Array<{ a: string; b: string; orders: number; support_pct: number | null; contribution?: number | null }>;
}

export interface CostEntry {
  id: number;
  category: 'rent' | 'royalty' | 'marketing_fund' | 'utilities' | 'other_fixed';
  label: string | null;
  rule: 'fixed' | 'pct' | 'max';
  fixed_amount: number | null;
  pct: number | null;
  effective_from: string | null;
  effective_to: string | null;
  note: string | null;
}

export interface SimBaseline {
  currency: string;
  window: { start: string; end: string; days: number; open_days: number };
  orders: number;
  net_sales: number;
  avg_ticket: number | null;
  orders_per_day: number | null;
  open_days_per_month: number;
  monthly_net_sales: number;
  discount_pct: number | null;
  food_cost_pct: number | null;
  fee_pct: number | null;
  costed_sales_pct: number | null;
  menus: Array<{ key: string; name: string; share_pct: number | null; food_cost_pct: number | null }>;
  others_share_pct: number | null;
  cost_rules: CostEntry[];
  targets: Targets;
}

export interface Settings {
  fees: Record<string, number>;
  channel_fees: Record<string, number>;
  targets: Targets;
  quadrant_baseline: 'median' | 'avg70';
  share_with_brand: 'operations' | 'full';
  fees_configured: boolean;
  fee_keys: string[];
  channel_fee_keys: string[];
}

export interface StoreRow {
  restaurant_id: number;
  name?: string;
  currency?: string;
  orders?: number;
  net_sales?: number;
  avg_ticket?: number | null;
  contribution?: number;
  contribution_pct?: number | null;
  food_cost_pct?: number | null;
  costed_sales_pct?: number | null;
  previous?: { net_sales?: number; contribution_pct: number | null };
  readiness?: Readiness;
  targets?: Targets;
  module_missing?: boolean;
  error?: boolean;
}
