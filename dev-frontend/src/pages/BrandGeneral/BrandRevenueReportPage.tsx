/**
 * BrandRevenueReportPage — 브랜드제너럴 **자기 매출** 리포트.
 *
 * Irene 2026-09-07: "리포트는 브랜드제너럴이 파는 프로덕트랑 구독판매 또는 개별판매(인보이스)랑
 *   연결해줘. 브랜드제너럴 매출을 봐야지."
 *
 * 종전 이 경로(/pos/brand/general/reports)에 있던 6탭은 전부 **매장 주문** 집계라
 * Performance 와 같은 물건이었다 → `/pos/brand/general/performance/stores` 로 옮겼다.
 *
 * 진실원장은 **브랜드가 발행한 인보이스** 하나다(GET /api/brand/revenue-report).
 * 발주(PO)는 주문이지 매출이 아니므로 금액에 넣지 않는다 —
 * 다만 "수령됐는데 인보이스가 안 나간 발주" 는 매출 누락 신호라 한 줄로 보여준다.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content, StatsGrid, StatCard, StatValue, StatLabel, StatDescription,
  DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow,
  DataTableCell, DataTableAmount, DataTableStatus, DataTableEmpty
} from '../../components/UI';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useStore } from '../../contexts/StoreContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency as formatCurrencyUtil } from '../../utils/currency';
import { getAuthToken } from '../../utils/auth';

interface Bucket { invoiced: number; paid: number; outstanding: number; count: number; }
interface ByRestaurant extends Bucket { restaurant_id: number | null; name: string; }
interface InvoiceRow {
  id: number; invoice_number: string; category: string; bucket: string; status: string;
  amount: number; paid: number; outstanding: number; currency: string;
  brand_name: string | null; buyer_name: string | null; issued_at: string; due_date: string | null;
}
interface RevenueData {
  buckets: { product_sales: Bucket; subscription_sales: Bucket; fees_other: Bucket };
  totals: Bucket;
  by_restaurant: ByRestaurant[];
  invoices: InvoiceRow[];
  uninvoiced_received_pos: { count: number; amount: number };
}

// 상태 배지 색 — 공용 DataTableStatus 팔레트만 쓴다(로컬 색 신규 금지).
const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'default' => {
  if (s === 'paid') return 'success';
  if (s === 'overdue') return 'danger';
  if (s === 'pending_payment' || s === 'payment_submitted') return 'warning';
  return 'default';
};

const BrandRevenueReportPage: React.FC = () => {
  const { t } = useTranslation(['brand', 'common']);
  const { operationSettings } = useStore();
  const storeTimeZone = operationSettings?.timeZone;
  const { defaultCurrency } = useBrandCurrency();

  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month', operationSettings?.timeZone));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const fmt = useCallback(
    (v: number) => formatCurrencyUtil(v ?? 0, defaultCurrency || 'MYR'),
    [defaultCurrency]
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError('');
      try {
        const res = await fetch(
          `/api/brand/revenue-report?start=${dateRange.start}&end=${dateRange.end}`,
          { headers: { Authorization: `Bearer ${getAuthToken()}` } }
        );
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json?.success) {
          setLoadError(t('brand:brandRevenue.loadFailed', 'Could not load the revenue report.'));
          setData(null);
        } else {
          setData(json.data);
        }
      } catch {
        if (!cancelled) {
          setLoadError(t('brand:brandRevenue.loadFailed', 'Could not load the revenue report.'));
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [dateRange.start, dateRange.end, t]);

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period, storeTimeZone));
  };
  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  const b = data?.buckets;
  const gap = data?.uninvoiced_received_pos;

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

        {loadError && <DataTableEmpty>{loadError}</DataTableEmpty>}

        {!loadError && (
          <>
            <StatsGrid>
              <StatCard>
                <StatValue>{loading ? '—' : fmt(data?.totals.invoiced ?? 0)}</StatValue>
                <StatLabel>{t('brand:brandRevenue.invoiced', 'Invoiced')}</StatLabel>
                <StatDescription>
                  {t('brand:brandRevenue.invoiceCount', '{{count}} invoices', { count: data?.totals.count ?? 0 })}
                </StatDescription>
              </StatCard>
              <StatCard>
                <StatValue>{loading ? '—' : fmt(data?.totals.paid ?? 0)}</StatValue>
                <StatLabel>{t('brand:brandRevenue.collected', 'Collected')}</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{loading ? '—' : fmt(data?.totals.outstanding ?? 0)}</StatValue>
                <StatLabel>{t('brand:brandRevenue.outstanding', 'Outstanding')}</StatLabel>
              </StatCard>
            </StatsGrid>

            {/* 매출 누락 신호 — 수령까지 끝났는데 청구서가 안 나간 발주.
                리포트가 비어 보이는 이유가 여기 있을 수 있어서 숫자로 드러낸다. */}
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
                        <DataTableCell data-label={t('brand:brandRevenue.invoiced', 'Invoiced')} align="right">
                          <DataTableAmount highlight>{fmt(row?.invoiced ?? 0)}</DataTableAmount>
                        </DataTableCell>
                        <DataTableCell data-label={t('brand:brandRevenue.collected', 'Collected')} align="right">{fmt(row?.paid ?? 0)}</DataTableCell>
                        <DataTableCell data-label={t('brand:brandRevenue.outstanding', 'Outstanding')} align="right">{fmt(row?.outstanding ?? 0)}</DataTableCell>
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
                    <DataTableHeaderCell>{t('brand:brandRevenue.buyer', 'Buyer')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('brand:brandRevenue.count', 'Invoices')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('brand:brandRevenue.invoiced', 'Invoiced')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('brand:brandRevenue.outstanding', 'Outstanding')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {(data?.by_restaurant || []).map(r => (
                    <DataTableRow key={`${r.restaurant_id ?? r.name}`}>
                      <DataTableCell data-label={t('brand:brandRevenue.buyer', 'Buyer')}>{r.name}</DataTableCell>
                      <DataTableCell data-label={t('brand:brandRevenue.count', 'Invoices')} align="center">{r.count}</DataTableCell>
                      <DataTableCell data-label={t('brand:brandRevenue.invoiced', 'Invoiced')} align="right">
                        <DataTableAmount highlight>{fmt(r.invoiced)}</DataTableAmount>
                      </DataTableCell>
                      <DataTableCell data-label={t('brand:brandRevenue.outstanding', 'Outstanding')} align="right">{fmt(r.outstanding)}</DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
              {!loading && (data?.by_restaurant || []).length === 0 && (
                <DataTableEmpty>{t('brand:brandRevenue.noRevenue', 'No revenue recorded for this period.')}</DataTableEmpty>
              )}
            </DataTableContainer>

            <DataTableContainer>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell>{t('brand:brandRevenue.invoiceNo', 'Invoice')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('brand:brandRevenue.buyer', 'Buyer')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('brand:brandRevenue.stream', 'Revenue stream')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('common:status', 'Status')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('brand:brandRevenue.invoiced', 'Invoiced')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {(data?.invoices || []).slice(0, 200).map(inv => (
                    <DataTableRow key={inv.id}>
                      <DataTableCell data-label={t('brand:brandRevenue.invoiceNo', 'Invoice')}>{inv.invoice_number}</DataTableCell>
                      <DataTableCell data-label={t('brand:brandRevenue.buyer', 'Buyer')}>{inv.buyer_name || '—'}</DataTableCell>
                      <DataTableCell data-label={t('brand:brandRevenue.stream', 'Revenue stream')}>{inv.category}</DataTableCell>
                      <DataTableCell data-label={t('common:status', 'Status')} align="center">
                        <DataTableStatus variant={statusVariant(inv.status)}>{inv.status}</DataTableStatus>
                      </DataTableCell>
                      <DataTableCell data-label={t('brand:brandRevenue.invoiced', 'Invoiced')} align="right">
                        <DataTableAmount highlight>{fmt(inv.amount)}</DataTableAmount>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
              {!loading && (data?.invoices || []).length === 0 && (
                <DataTableEmpty>{t('brand:brandRevenue.noInvoices', 'No invoices in this period.')}</DataTableEmpty>
              )}
            </DataTableContainer>
          </>
        )}
      </Content>
    </Container>
  );
};

export default BrandRevenueReportPage;
