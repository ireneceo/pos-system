/**
 * BrandRevenueReportPage — 브랜드제너럴 **판매·매출 통계** (/pos/brand/general/reports).
 *
 * 2026-09-07 Irene: 리포트는 브랜드가 파는 것(프로덕트·구독·개별 청구) 기준 → 청구서 원장(GET /api/brand/revenue-report).
 * 2026-10-05 Irene: 「카테고리별로 매출보는 탭도 추가 … 브랜드별로도 볼 수 있어야 … 레스토랑 매출통계처럼」
 *                   「매출통계 잡을 때 레스토랑들, 브랜드들 체크해서 볼 수 있게 쉬운 UI/UX」(직영 with MIN 은 따로 봐야 한다)
 *                   「주문시점으로 기준이 맞아」
 *   → 판매 통계(요약·카테고리·상품·매장)는 **주문 시점** 발주 품목 기준(GET /api/brand/sales-report),
 *     청구·수금 숫자와 청구서 목록은 청구서 원장 그대로. 둘 다 같은 브랜드·매장 체크를 따른다.
 *   체크 해제한 매장·브랜드는 이 브라우저에 기억한다(직영점을 매번 끄지 않게). 서버 범위 검사는 별개로 항상 돈다.
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content, StatsGrid, StatCard, StatValue, StatLabel, StatDescription,
  DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow,
  DataTableCell, DataTableAmount, DataTableStatus, DataTableEmpty, ThemedButton
} from '../../components/UI';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useStore } from '../../contexts/StoreContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency as formatCurrencyUtil } from '../../utils/currency';
import { getAuthToken } from '../../utils/auth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ── 청구서 원장 (기존) ───────────────────────────────────────────────
interface Bucket { invoiced: number; paid: number; outstanding: number; discounted: number; count: number; }
interface InvoiceRow {
  id: number; invoice_number: string; category: string; bucket: string; status: string;
  amount: number; paid: number; outstanding: number; discounted: number; currency: string;
  brand_name: string | null; buyer_name: string | null; issued_at: string; due_date: string | null;
}
interface RevenueData {
  buckets: { product_sales: Bucket; subscription_sales: Bucket; fees_other: Bucket };
  totals: Bucket;
  invoices: InvoiceRow[];
  uninvoiced_received_pos: { count: number; amount: number };
}
// ── 판매 통계 (주문 시점) ───────────────────────────────────────────
interface ProductRow { product_id: number | null; name: string; category_id: number | null; category_name: string | null; unit: string; qty: number; amount: number; orders: number; stores: number; }
interface CategoryRow { category_id: number | null; name: string | null; amount: number; orders: number; share: number; products: ProductRow[]; }
interface SalesData {
  totals: { orders: number; amount: number; delivery: number; stores: number; lines: number };
  by_category: CategoryRow[];
  by_product: ProductRow[];
  by_store: Array<{ restaurant_id: number; name: string; amount: number; orders: number }>;
  by_brand: Array<{ brand_id: number; name: string; amount: number; orders: number }>;
  trend: Array<{ key: string; amount: number }>;
  trend_unit: 'day' | 'month';
  options: { brands: Array<{ id: number; name: string }>; stores: Array<{ id: number; name: string }> };
}
type TabType = 'overview' | 'categories' | 'products' | 'stores' | 'invoices';

const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'default' => {
  if (s === 'paid') return 'success';
  if (s === 'overdue') return 'danger';
  if (s === 'pending_payment' || s === 'payment_submitted') return 'warning';
  return 'default';
};

// 체크 해제 기억 — 이 브라우저의 편의 기능일 뿐(실패해도 화면은 전부 선택으로 동작)
const LS_KEY = 'brandSalesReport.excluded.v1';
const loadExcluded = (): { brands: number[]; stores: number[] } => {
  try { const v = JSON.parse(localStorage.getItem(LS_KEY) || '{}'); return { brands: v.brands || [], stores: v.stores || [] }; }
  catch { return { brands: [], stores: [] }; }
};
const saveExcluded = (v: { brands: number[]; stores: number[] }) => { try { localStorage.setItem(LS_KEY, JSON.stringify(v)); } catch { /* 저장 못 해도 동작 */ } };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const BrandRevenueReportPage: React.FC = () => {
  const { t } = useTranslation(['brand', 'common']);
  const { operationSettings } = useStore();
  const storeTimeZone = operationSettings?.timeZone;
  const { defaultCurrency } = useBrandCurrency();
  const [activeTab, handleTabChange] = useTabParam<TabType>('overview');

  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month', operationSettings?.timeZone));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [excluded, setExcluded] = useState(loadExcluded);
  const [options, setOptions] = useState<SalesData['options']>({ brands: [], stores: [] });
  const [sales, setSales] = useState<SalesData | null>(null);
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [openCats, setOpenCats] = useState<Set<string>>(new Set());

  const fmt = useCallback((v: number) => formatCurrencyUtil(v ?? 0, defaultCurrency || 'MYR'), [defaultCurrency]);

  // 선택 → 요청 값. 전부 선택이면 보내지 않는다(서버가 범위 전체). 하나도 없으면 'none'.
  // 브랜드가 하나뿐이면 고르는 줄을 숨기므로 예전에 꺼 둔 기록도 무시한다(막힌 화면 방지)
  const selectedBrandIds = options.brands.map(b => b.id).filter(id => options.brands.length <= 1 || !excluded.brands.includes(id));
  const selectedStoreIds = options.stores.map(s => s.id).filter(id => !excluded.stores.includes(id));
  const scopeQuery = useMemo(() => {
    const q: string[] = [];
    if (options.brands.length && selectedBrandIds.length < options.brands.length && selectedBrandIds.length > 0) q.push(`brand_ids=${selectedBrandIds.join(',')}`);
    if (options.stores.length && selectedStoreIds.length < options.stores.length) q.push(`restaurant_ids=${selectedStoreIds.length ? selectedStoreIds.join(',') : 'none'}`);
    return q.join('&');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, excluded]);
  const noBrandSelected = options.brands.length > 0 && selectedBrandIds.length === 0;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError('');
      if (noBrandSelected) { setSales(null); setRevenue(null); setLoading(false); return; }
      try {
        const base = `start=${dateRange.start}&end=${dateRange.end}${scopeQuery ? `&${scopeQuery}` : ''}`;
        const tz = storeTimeZone ? `&tz=${encodeURIComponent(storeTimeZone)}` : '';
        const headers = { Authorization: `Bearer ${getAuthToken()}` };
        const [sRes, rRes] = await Promise.all([
          fetch(`/api/brand/sales-report?${base}${tz}`, { headers }),
          fetch(`/api/brand/revenue-report?${base}`, { headers })
        ]);
        const [sJson, rJson] = await Promise.all([sRes.json(), rRes.json()]);
        if (cancelled) return;
        if (!sRes.ok || !sJson?.success || !rRes.ok || !rJson?.success) {
          setLoadError(t('brand:brandRevenue.loadFailed', 'Could not load the revenue report.'));
          setSales(null); setRevenue(null);
        } else {
          setSales(sJson.data); setRevenue(rJson.data);
          setOptions(sJson.data.options);
        }
      } catch {
        if (!cancelled) { setLoadError(t('brand:brandRevenue.loadFailed', 'Could not load the revenue report.')); setSales(null); setRevenue(null); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [dateRange.start, dateRange.end, scopeQuery, noBrandSelected, storeTimeZone, t]);

  const toggle = (kind: 'brands' | 'stores', id: number) => {
    const list = excluded[kind];
    const next = { ...excluded, [kind]: list.includes(id) ? list.filter(x => x !== id) : [...list, id] };
    setExcluded(next); saveExcluded(next);
  };
  const setAll = (kind: 'brands' | 'stores', on: boolean) => {
    const ids = (kind === 'brands' ? options.brands : options.stores).map(x => x.id);
    const next = { ...excluded, [kind]: on ? [] : ids };
    setExcluded(next); saveExcluded(next);
  };

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period); setIsCustomDateRange(false); setDateRange(calculatePeriodDateRange(period, storeTimeZone));
  };
  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true); setActivePeriod('all'); setDateRange({ start, end });
  };

  const trendData = useMemo(() => (sales?.trend || []).map(p => ({
    label: sales?.trend_unit === 'month'
      ? `${MONTHS[Number(p.key.slice(5, 7)) - 1]} '${p.key.slice(2, 4)}`
      : `${p.key.slice(8, 10)}/${p.key.slice(5, 7)}`,
    amount: p.amount
  })), [sales]);

  const catLabel = (name: string | null) => name || t('brand:brandSales.uncategorized', 'Uncategorized');
  const b = revenue?.buckets;
  const gap = revenue?.uninvoiced_received_pos;
  const dash = (v: string) => (loading ? '—' : v);

  return (
    <Container>
      <Header>
        <Title>{t('brand:brandRevenue.title', 'Brand Revenue')}</Title>
      </Header>

      <Content>
        <DatePeriodFilter
          activePeriod={activePeriod}
          dateRange={dateRange}
          isCustomDateRange={isCustomDateRange}
          onPeriodChange={handlePeriodChange}
          onCalendarRangeSelect={handleCalendarRangeSelect}
          includeToday
        />

        {/* 보는 범위 — 브랜드·매장을 켜고 끈다. 직영점(with MIN Cafe 등)을 빼고 볼 때 여기서 끈다 */}
        <ScopePanel>
          {options.brands.length > 1 && (
            <ScopeRow>
              <ScopeTitle>{t('brand:brandSales.brands', 'Brands')}</ScopeTitle>
              <ChipList>
                {options.brands.map(br => (
                  <Chip key={br.id} $on={!excluded.brands.includes(br.id)}>
                    <input type="checkbox" checked={!excluded.brands.includes(br.id)} onChange={() => toggle('brands', br.id)} />
                    {br.name}
                  </Chip>
                ))}
              </ChipList>
              <ScopeActions>
                <ThemedButton size="small" variant="outline" onClick={() => setAll('brands', true)}>{t('brand:brandSales.selectAll', 'All')}</ThemedButton>
              </ScopeActions>
            </ScopeRow>
          )}
          <ScopeRow>
            <ScopeTitle>{t('brand:brandSales.stores', 'Stores')}</ScopeTitle>
            <ChipList>
              {options.stores.length === 0 && <ScopeHint>{t('brand:brandSales.noStores', 'No store has ordered yet')}</ScopeHint>}
              {options.stores.map(st => (
                <Chip key={st.id} $on={!excluded.stores.includes(st.id)}>
                  <input type="checkbox" checked={!excluded.stores.includes(st.id)} onChange={() => toggle('stores', st.id)} />
                  {st.name}
                </Chip>
              ))}
            </ChipList>
            {options.stores.length > 1 && (
              <ScopeActions>
                <ThemedButton size="small" variant="outline" onClick={() => setAll('stores', true)}>{t('brand:brandSales.selectAll', 'All')}</ThemedButton>
                <ThemedButton size="small" variant="outline" onClick={() => setAll('stores', false)}>{t('brand:brandSales.selectNone', 'None')}</ThemedButton>
              </ScopeActions>
            )}
          </ScopeRow>
          <ScopeHint>
            {t('brand:brandSales.scopeSummary', 'Showing {{brands}} of {{brandTotal}} brands · {{stores}} of {{storeTotal}} stores', {
              brands: selectedBrandIds.length, brandTotal: options.brands.length,
              stores: selectedStoreIds.length, storeTotal: options.stores.length
            })}
          </ScopeHint>
        </ScopePanel>

        {noBrandSelected && <DataTableEmpty>{t('brand:brandSales.pickBrand', 'Select at least one brand.')}</DataTableEmpty>}
        {loadError && <DataTableEmpty>{loadError}</DataTableEmpty>}

        {!loadError && !noBrandSelected && (
          <>
            <Tabs>
              <Tab active={activeTab === 'overview'} onClick={() => handleTabChange('overview')}>{t('brand:brandSales.tabOverview', 'Overview')}</Tab>
              <Tab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>{t('brand:brandSales.tabCategories', 'By category')}</Tab>
              <Tab active={activeTab === 'products'} onClick={() => handleTabChange('products')}>{t('brand:brandSales.tabProducts', 'By product')}</Tab>
              <Tab active={activeTab === 'stores'} onClick={() => handleTabChange('stores')}>{t('brand:brandSales.tabStores', 'By store')}</Tab>
              <Tab active={activeTab === 'invoices'} onClick={() => handleTabChange('invoices')}>{t('brand:brandSales.tabInvoices', 'Invoices & collection')}</Tab>
            </Tabs>
            <BasisNote>
              {activeTab === 'invoices'
                ? t('brand:brandSales.basisInvoices', 'Based on invoices issued in this period.')
                : t('brand:brandSales.basisOrders', 'Based on order date — received or invoiced orders, cancelled excluded. Delivery fees counted separately.')}
            </BasisNote>

            {activeTab === 'overview' && (
              <>
                <StatsGrid>
                  <StatCard>
                    <StatValue>{dash(fmt(sales?.totals.amount ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandSales.sales', 'Product sales')}</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{dash(String(sales?.totals.orders ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandSales.orders', 'Orders')}</StatLabel>
                    <StatDescription>
                      {t('brand:brandSales.avgOrder', 'Avg {{amount}} per order', { amount: fmt(sales && sales.totals.orders ? sales.totals.amount / sales.totals.orders : 0) })}
                    </StatDescription>
                  </StatCard>
                  <StatCard>
                    <StatValue>{dash(String(sales?.totals.stores ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandSales.buyingStores', 'Buying stores')}</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{dash(fmt(sales?.totals.delivery ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandSales.delivery', 'Delivery fees')}</StatLabel>
                  </StatCard>
                </StatsGrid>

                <Panel>
                  <PanelTitle>{t('brand:brandSales.trend', 'Sales trend')}</PanelTitle>
                  {trendData.length === 0
                    ? <DataTableEmpty>{t('brand:brandSales.noSales', 'No sales in this period.')}</DataTableEmpty>
                    : (
                      <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F4F6F9" />
                          <XAxis dataKey="label" stroke="#4B5563" fontSize={12} />
                          <YAxis stroke="#4B5563" fontSize={12} width={60} />
                          <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'white', border: '1px solid #C7CED6', borderRadius: '6px' }} />
                          <Line type="monotone" dataKey="amount" stroke="#635BFF" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                </Panel>

                {(sales?.by_brand.length ?? 0) > 1 && (
                  <DataTableContainer>
                    <DataTable>
                      <DataTableHead>
                        <tr>
                          <DataTableHeaderCell>{t('brand:brandSales.brand', 'Brand')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="center">{t('brand:brandSales.orders', 'Orders')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="right">{t('brand:brandSales.sales', 'Product sales')}</DataTableHeaderCell>
                        </tr>
                      </DataTableHead>
                      <tbody>
                        {sales!.by_brand.map(br => (
                          <DataTableRow key={br.brand_id}>
                            <DataTableCell data-label={t('brand:brandSales.brand', 'Brand')}>{br.name}</DataTableCell>
                            <DataTableCell data-label={t('brand:brandSales.orders', 'Orders')} align="center">{br.orders}</DataTableCell>
                            <DataTableCell data-label={t('brand:brandSales.sales', 'Product sales')} align="right"><DataTableAmount highlight>{fmt(br.amount)}</DataTableAmount></DataTableCell>
                          </DataTableRow>
                        ))}
                      </tbody>
                    </DataTable>
                  </DataTableContainer>
                )}

                <PanelTitle>{t('brand:brandSales.topCategories', 'Top categories')}</PanelTitle>
                <CategoryTable rows={(sales?.by_category || []).slice(0, 5)} fmt={fmt} catLabel={catLabel} openCats={openCats} setOpenCats={setOpenCats} loading={loading} t={t} />
              </>
            )}

            {activeTab === 'categories' && (
              <CategoryTable rows={sales?.by_category || []} fmt={fmt} catLabel={catLabel} openCats={openCats} setOpenCats={setOpenCats} loading={loading} t={t} total={sales?.totals.amount} />
            )}

            {activeTab === 'products' && (
              <DataTableContainer>
                <DataTable>
                  <DataTableHead>
                    <tr>
                      <DataTableHeaderCell>{t('brand:brandSales.product', 'Product')}</DataTableHeaderCell>
                      <DataTableHeaderCell>{t('brand:brandSales.category', 'Category')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('brand:brandSales.qty', 'Qty')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="center">{t('brand:brandSales.orders', 'Orders')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="center">{t('brand:brandSales.buyingStores', 'Buying stores')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('brand:brandSales.sales', 'Product sales')}</DataTableHeaderCell>
                    </tr>
                  </DataTableHead>
                  <tbody>
                    {(sales?.by_product || []).map((p, i) => (
                      <DataTableRow key={`${p.product_id ?? p.name}-${i}`}>
                        <DataTableCell data-label={t('brand:brandSales.product', 'Product')}>{p.name}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.category', 'Category')}>{catLabel(p.category_name)}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.qty', 'Qty')} align="right">{p.qty} {p.unit}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.orders', 'Orders')} align="center">{p.orders}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.buyingStores', 'Buying stores')} align="center">{p.stores}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.sales', 'Product sales')} align="right"><DataTableAmount highlight>{fmt(p.amount)}</DataTableAmount></DataTableCell>
                      </DataTableRow>
                    ))}
                  </tbody>
                </DataTable>
                {!loading && (sales?.by_product || []).length === 0 && <DataTableEmpty>{t('brand:brandSales.noSales', 'No sales in this period.')}</DataTableEmpty>}
              </DataTableContainer>
            )}

            {activeTab === 'stores' && (
              <DataTableContainer>
                <DataTable>
                  <DataTableHead>
                    <tr>
                      <DataTableHeaderCell>{t('brand:brandSales.store', 'Store')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="center">{t('brand:brandSales.orders', 'Orders')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('brand:brandSales.share', 'Share')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('brand:brandSales.sales', 'Product sales')}</DataTableHeaderCell>
                    </tr>
                  </DataTableHead>
                  <tbody>
                    {(sales?.by_store || []).map(s => (
                      <DataTableRow key={s.restaurant_id}>
                        <DataTableCell data-label={t('brand:brandSales.store', 'Store')}>{s.name}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.orders', 'Orders')} align="center">{s.orders}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.share', 'Share')} align="right">
                          {sales && sales.totals.amount ? `${Math.round((s.amount / sales.totals.amount) * 1000) / 10}%` : '—'}
                        </DataTableCell>
                        <DataTableCell data-label={t('brand:brandSales.sales', 'Product sales')} align="right"><DataTableAmount highlight>{fmt(s.amount)}</DataTableAmount></DataTableCell>
                      </DataTableRow>
                    ))}
                  </tbody>
                </DataTable>
                {!loading && (sales?.by_store || []).length === 0 && <DataTableEmpty>{t('brand:brandSales.noSales', 'No sales in this period.')}</DataTableEmpty>}
              </DataTableContainer>
            )}

            {activeTab === 'invoices' && (
              <>
                <StatsGrid>
                  <StatCard>
                    <StatValue>{dash(fmt(revenue?.totals.invoiced ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandRevenue.invoiced', 'Invoiced')}</StatLabel>
                    <StatDescription>{t('brand:brandRevenue.invoiceCount', '{{count}} invoices', { count: revenue?.totals.count ?? 0 })}</StatDescription>
                  </StatCard>
                  <StatCard>
                    <StatValue>{dash(fmt(revenue?.totals.paid ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandRevenue.collected', 'Collected')}</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{dash(fmt(revenue?.totals.outstanding ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandRevenue.outstanding', 'Outstanding')}</StatLabel>
                  </StatCard>
                  {/* 깎아 준 금액 — 청구·수금만 보면 «얼마를 할인해 줬는가» 가 어디에도 안 남는다 */}
                  <StatCard>
                    <StatValue>{dash(fmt(revenue?.totals.discounted ?? 0))}</StatValue>
                    <StatLabel>{t('brand:brandRevenue.discounted', 'Discounted')}</StatLabel>
                  </StatCard>
                </StatsGrid>

                {!loading && gap && gap.count > 0 && (
                  <DataTableEmpty>
                    {t('brand:brandRevenue.uninvoicedPos',
                      '{{count}} received purchase orders ({{amount}}) have no trade invoice yet — that amount is missing from the figures above.',
                      { count: gap.count, amount: fmt(gap.amount) })}
                  </DataTableEmpty>
                )}

                <DataTableContainer>
                  <DataTable>
                    <DataTableHead>
                      <tr>
                        <DataTableHeaderCell>{t('brand:brandRevenue.stream', 'Revenue stream')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="center">{t('brand:brandRevenue.count', 'Invoices')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('brand:brandRevenue.invoiced', 'Invoiced')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('brand:brandRevenue.collected', 'Collected')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('brand:brandRevenue.outstanding', 'Outstanding')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('brand:brandRevenue.discounted', 'Discounted')}</DataTableHeaderCell>
                      </tr>
                    </DataTableHead>
                    <tbody>
                      {([
                        ['product_sales', t('brand:brandRevenue.productSales', 'Product sales (per order)')],
                        ['subscription_sales', t('brand:brandRevenue.subscriptionSales', 'Subscription sales (brand plan)')],
                        ['fees_other', t('brand:brandRevenue.feesOther', 'Fees & other charges')]
                      ] as const).map(([key, label]) => {
                        const row = b?.[key];
                        return (
                          <DataTableRow key={key}>
                            <DataTableCell data-label={t('brand:brandRevenue.stream', 'Revenue stream')}>{label}</DataTableCell>
                            <DataTableCell data-label={t('brand:brandRevenue.count', 'Invoices')} align="center">{row?.count ?? 0}</DataTableCell>
                            <DataTableCell data-label={t('brand:brandRevenue.invoiced', 'Invoiced')} align="right"><DataTableAmount highlight>{fmt(row?.invoiced ?? 0)}</DataTableAmount></DataTableCell>
                            <DataTableCell data-label={t('brand:brandRevenue.collected', 'Collected')} align="right">{fmt(row?.paid ?? 0)}</DataTableCell>
                            <DataTableCell data-label={t('brand:brandRevenue.outstanding', 'Outstanding')} align="right">{fmt(row?.outstanding ?? 0)}</DataTableCell>
                            <DataTableCell data-label={t('brand:brandRevenue.discounted', 'Discounted')} align="right">{fmt(row?.discounted ?? 0)}</DataTableCell>
                          </DataTableRow>
                        );
                      })}
                    </tbody>
                  </DataTable>
                </DataTableContainer>

                <DataTableContainer>
                  <DataTable>
                    <DataTableHead>
                      <tr>
                        <DataTableHeaderCell>{t('brand:brandRevenue.invoiceNo', 'Invoice')}</DataTableHeaderCell>
                        <DataTableHeaderCell>{t('brand:brandSales.brand', 'Brand')}</DataTableHeaderCell>
                        <DataTableHeaderCell>{t('brand:brandRevenue.buyer', 'Buyer')}</DataTableHeaderCell>
                        <DataTableHeaderCell>{t('brand:brandRevenue.stream', 'Revenue stream')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="center">{t('common:status', 'Status')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('brand:brandRevenue.invoiced', 'Invoiced')}</DataTableHeaderCell>
                      </tr>
                    </DataTableHead>
                    <tbody>
                      {(revenue?.invoices || []).slice(0, 200).map(inv => (
                        <DataTableRow key={inv.id}>
                          <DataTableCell data-label={t('brand:brandRevenue.invoiceNo', 'Invoice')}>{inv.invoice_number}</DataTableCell>
                          <DataTableCell data-label={t('brand:brandSales.brand', 'Brand')}>{inv.brand_name || '—'}</DataTableCell>
                          <DataTableCell data-label={t('brand:brandRevenue.buyer', 'Buyer')}>{inv.buyer_name || '—'}</DataTableCell>
                          <DataTableCell data-label={t('brand:brandRevenue.stream', 'Revenue stream')}>{inv.category}</DataTableCell>
                          <DataTableCell data-label={t('common:status', 'Status')} align="center">
                            <DataTableStatus variant={statusVariant(inv.status)}>{inv.status}</DataTableStatus>
                          </DataTableCell>
                          <DataTableCell data-label={t('brand:brandRevenue.invoiced', 'Invoiced')} align="right"><DataTableAmount highlight>{fmt(inv.amount)}</DataTableAmount></DataTableCell>
                        </DataTableRow>
                      ))}
                    </tbody>
                  </DataTable>
                  {!loading && (revenue?.invoices || []).length === 0 && (
                    <DataTableEmpty>{t('brand:brandRevenue.noInvoices', 'No invoices in this period.')}</DataTableEmpty>
                  )}
                </DataTableContainer>
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

/** 카테고리 표 — 줄을 누르면 그 카테고리의 상품이 펼쳐진다 */
const CategoryTable: React.FC<{
  rows: CategoryRow[]; fmt: (v: number) => string; catLabel: (n: string | null) => string;
  openCats: Set<string>; setOpenCats: (s: Set<string>) => void; loading: boolean; t: any; total?: number;
}> = ({ rows, fmt, catLabel, openCats, setOpenCats, loading, t, total }) => {
  const keyOf = (c: CategoryRow) => String(c.category_id ?? 'none');
  const flip = (k: string) => { const n = new Set(openCats); if (n.has(k)) n.delete(k); else n.add(k); setOpenCats(n); };
  return (
    <DataTableContainer>
      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell>{t('brand:brandSales.category', 'Category')}</DataTableHeaderCell>
            <DataTableHeaderCell align="center">{t('brand:brandSales.orders', 'Orders')}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('brand:brandSales.share', 'Share')}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('brand:brandSales.sales', 'Product sales')}</DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {rows.map(c => {
            const k = keyOf(c); const open = openCats.has(k);
            return (
              <React.Fragment key={k}>
                <DataTableRow onClick={() => flip(k)} style={{ cursor: 'pointer' }}>
                  <DataTableCell data-label={t('brand:brandSales.category', 'Category')}>
                    <Caret>{open ? '▾' : '▸'}</Caret>{catLabel(c.name)}
                  </DataTableCell>
                  <DataTableCell data-label={t('brand:brandSales.orders', 'Orders')} align="center">{c.orders}</DataTableCell>
                  <DataTableCell data-label={t('brand:brandSales.share', 'Share')} align="right">
                    <ShareBar><span style={{ width: `${Math.min(100, c.share)}%` }} /></ShareBar>{c.share}%
                  </DataTableCell>
                  <DataTableCell data-label={t('brand:brandSales.sales', 'Product sales')} align="right"><DataTableAmount highlight>{fmt(c.amount)}</DataTableAmount></DataTableCell>
                </DataTableRow>
                {open && c.products.map((p, i) => (
                  <DataTableRow key={`${k}-${p.product_id ?? i}`}>
                    <DataTableCell data-label={t('brand:brandSales.product', 'Product')}><SubName>{p.name}</SubName></DataTableCell>
                    <DataTableCell data-label={t('brand:brandSales.qty', 'Qty')} align="center">{p.qty} {p.unit}</DataTableCell>
                    <DataTableCell data-label={t('brand:brandSales.share', 'Share')} align="right">
                      {c.amount ? `${Math.round((p.amount / c.amount) * 1000) / 10}%` : '—'}
                    </DataTableCell>
                    <DataTableCell data-label={t('brand:brandSales.sales', 'Product sales')} align="right">{fmt(p.amount)}</DataTableCell>
                  </DataTableRow>
                ))}
              </React.Fragment>
            );
          })}
          {total != null && rows.length > 0 && (
            <DataTableRow>
              <DataTableCell><strong>{t('brand:brandSales.total', 'Total')}</strong></DataTableCell>
              <DataTableCell />
              <DataTableCell align="right">100%</DataTableCell>
              <DataTableCell align="right"><DataTableAmount highlight>{fmt(total)}</DataTableAmount></DataTableCell>
            </DataTableRow>
          )}
        </tbody>
      </DataTable>
      {!loading && rows.length === 0 && <DataTableEmpty>{t('brand:brandSales.noSales', 'No sales in this period.')}</DataTableEmpty>}
    </DataTableContainer>
  );
};

const ScopePanel = styled.div`
  background: #FFFFFF; border: 1px solid #E3E8EE; border-radius: 8px; padding: 12px 16px; margin: 12px 0 16px;
  display: flex; flex-direction: column; gap: 10px;
`;
const ScopeRow = styled.div` display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; `;
const ScopeTitle = styled.div` font-size: 12px; font-weight: 600; color: #4B5563; text-transform: uppercase; min-width: 64px; padding-top: 7px; `;
const ChipList = styled.div` display: flex; flex-wrap: wrap; gap: 8px; flex: 1; min-width: 0; `;
const ScopeActions = styled.div` display: flex; gap: 6px; `;
const ScopeHint = styled.div` font-size: 12px; color: #6B7280; `;
const Chip = styled.label<{ $on: boolean }>`
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; font-size: 13px; cursor: pointer;
  border: 1px solid ${p => (p.$on ? '#635BFF' : '#D1D5DB')}; background: ${p => (p.$on ? '#EEF0FF' : '#FFFFFF')};
  color: ${p => (p.$on ? '#3F37C9' : '#6B7280')}; user-select: none;
  input { margin: 0; accent-color: #635BFF; }
`;
const BasisNote = styled.div` font-size: 12px; color: #6B7280; margin: 8px 0 12px; `;
const Panel = styled.div` background: #FFFFFF; border: 1px solid #E3E8EE; border-radius: 8px; padding: 16px; margin: 16px 0; `;
const PanelTitle = styled.div` font-size: 14px; font-weight: 600; color: #0A2540; margin: 16px 0 8px; `;
const Caret = styled.span` display: inline-block; width: 16px; color: #6B7280; `;
const SubName = styled.span` padding-left: 20px; color: #4B5563; `;
const ShareBar = styled.span`
  display: inline-block; width: 60px; height: 6px; background: #F1F4F8; border-radius: 3px; margin-right: 8px; vertical-align: middle; overflow: hidden;
  span { display: block; height: 100%; background: #635BFF; }
`;

export default BrandRevenueReportPage;
