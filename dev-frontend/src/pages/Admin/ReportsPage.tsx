import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// Styled Components (AnalyticsPage 패턴)
const ReportsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  @media (max-width: 768px) { font-size: 20px; }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Content = styled.div`
  padding: 24px 32px;
  @media (max-width: 768px) { padding: 16px; }
`;

// FilterControls, DateButton, DateRangeInput replaced by DatePeriodFilter component

const CurrencySelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`;

const ExportButton = styled.button`
  padding: 8px 16px;
  background: white;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  &:hover { background: #F8FAFC; }
`;

const ChartCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const TableCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  overflow-x: auto;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'paid': return '#DCFCE7';
      case 'pending_payment': return '#FEF3C7';
      case 'payment_submitted': return '#DBEAFE';
      case 'overdue': return '#FEE2E2';
      case 'draft': return '#F3F4F6';
      case 'cancelled': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'paid': return '#059669';
      case 'pending_payment': return '#D97706';
      case 'payment_submitted': return '#2563EB';
      case 'overdue': return '#DC2626';
      case 'draft': return '#6B7280';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
  font-size: 14px;
`;

const COLORS = ['#635BFF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const CATEGORY_LABELS: Record<string, string> = {
  subscription: 'Subscription',
  service: 'Service',
  consulting: 'Consulting',
  rent: 'Rent',
  others: 'Others'
};
const METHOD_LABELS: Record<string, string> = {
  stripe: 'Stripe',
  paypal: 'PayPal',
  bank_transfer: 'Bank Transfer',
  qr_payment: 'QR Payment'
};
const PAYER_LABELS: Record<string, string> = {
  restaurant: 'Restaurant',
  brand_manager: 'Brand Manager',
  foodcourt_manager: 'Foodcourt Manager',
  restaurant_owner: 'Restaurant Owner'
};
const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  pending_payment: 'Pending Payment',
  payment_submitted: 'Payment Submitted',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled'
};

type TabType = 'revenue' | 'payment' | 'customer' | 'subscription';
// PeriodType imported from DatePeriodFilter

interface RevenueSummary {
  totalRevenue: number;
  pendingAmount: number;
  paidInvoices: number;
  totalInvoices: number;
  collectionRate: number;
}

interface PaymentAnalysis {
  statusBreakdown: { status: string; count: number; total: number }[];
  paymentMethods: { method: string; count: number; total: number }[];
  avgPaymentDays: number;
  overdueCount: number;
  overdueAmount: number;
  awaitingCount: number;
  thisMonthCollected: number;
}

interface OverdueInvoice {
  id: number;
  invoiceNumber: string;
  restaurantName: string;
  amount: number;
  currency: string;
  dueDate: string;
  daysOverdue: number;
}

interface CustomerData {
  totalRestaurants: number;
  activeRestaurants: number;
  newThisMonth: number;
  arpu: number;
  topRestaurants: { restaurantName: string; totalRevenue: number; invoiceCount: number; overdueCount: number }[];
  payerDistribution: { payerType: string; count: number; total: number }[];
  registrationTrend: { month: string; count: number }[];
}

interface SubscriptionData {
  activePlans: number;
  mrr: number;
  activeSubscribers: number;
  arpu: number;
  mostPopularPlan: string;
  planDistribution: { planName: string; subscriberCount: number; monthlyRevenue: number }[];
}

const ReportsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { operationSettings, siteTimezone } = useStore();
  const defaultCurrency = operationSettings?.currency || 'MYR';
  const [activeTab, handleTabChange] = useTabParam<TabType>('revenue');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState(false);
  const [currencyLoaded, setCurrencyLoaded] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);

  // Fetch supported currencies and set default to highest-revenue
  useEffect(() => {
    const init = async () => {
      const token = getAuthToken();
      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

      // Fetch supported currencies
      let supported: string[] = [];
      try {
        const res = await fetch('/api/currencies/supported', { headers });
        if (res.ok) {
          const data = await res.json();
          supported = (data.data || data || []).map((c: any) => typeof c === 'string' ? c : c.code);
        }
      } catch {}
      if (supported.length === 0) supported = [defaultCurrency];
      setSupportedCurrencies(supported);

      // Fetch the most-used currency and use it as default
      try {
        const res = await fetch('/api/admin-reports/default-currency', { headers });
        const data = await res.json();
        if (data.success && data.data?.currency && supported.includes(data.data.currency)) {
          setCurrency(data.data.currency);
        } else {
          setCurrency(supported[0]);
        }
      } catch {
        setCurrency(supported[0]);
      }
      setCurrencyLoaded(true);
    };
    init();
  }, [defaultCurrency]);

  // Data states
  const [revenueSummary, setRevenueSummary] = useState<RevenueSummary | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [revenueByCategory, setRevenueByCategory] = useState<any[]>([]);
  const [paymentAnalysis, setPaymentAnalysis] = useState<PaymentAnalysis | null>(null);
  const [overdueInvoices, setOverdueInvoices] = useState<OverdueInvoice[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  const getDateParams = useCallback(() => {
    if (activePeriod === 'all' && !isCustomDateRange) {
      return 'period=all';
    }
    return `start_date=${dateRange.start}&end_date=${dateRange.end}`;
  }, [activePeriod, isCustomDateRange, dateRange]);

  const fetchApi = useCallback(async (endpoint: string, params = '') => {
    const token = getAuthToken();
    const sep = params ? '?' + params : '';
    const currParam = currency ? (sep ? `&currency=${currency}` : `?currency=${currency}`) : '';
    const response = await fetch(`/api/admin-reports/${endpoint}${sep}${currParam}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'API Error');
    return data.data;
  }, [currency]);

  // Fetch revenue data
  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    try {
      const dateParams = getDateParams();
      const [summary, trend, byCategory] = await Promise.all([
        fetchApi('revenue-summary', dateParams),
        fetchApi('revenue-trend'),
        fetchApi('revenue-by-category', dateParams)
      ]);
      setRevenueSummary(summary);
      setRevenueTrend(trend);
      setRevenueByCategory(byCategory);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
    setLoading(false);
  }, [fetchApi, getDateParams]);

  // Fetch payment data
  const fetchPayment = useCallback(async () => {
    setLoading(true);
    try {
      const dateParams = getDateParams();
      const [analysis, overdue] = await Promise.all([
        fetchApi('payment-analysis', dateParams),
        fetchApi('overdue-invoices')
      ]);
      setPaymentAnalysis(analysis);
      setOverdueInvoices(overdue);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
    setLoading(false);
  }, [fetchApi, getDateParams]);

  // Fetch customer data
  const fetchCustomer = useCallback(async () => {
    setLoading(true);
    try {
      const dateParams = getDateParams();
      const data = await fetchApi('customer-analysis', dateParams);
      setCustomerData(data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
    setLoading(false);
  }, [fetchApi, getDateParams]);

  // Fetch subscription data
  const fetchSubscription = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApi('subscription-stats');
      setSubscriptionData(data);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    }
    setLoading(false);
  }, [fetchApi]);

  useEffect(() => {
    if (!currencyLoaded || !currency) return;
    switch (activeTab) {
      case 'revenue': fetchRevenue(); break;
      case 'payment': fetchPayment(); break;
      case 'customer': fetchCustomer(); break;
      case 'subscription': fetchSubscription(); break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, activePeriod, currency, dateRange, currencyLoaded]);

  // CSV Export
  const handleExport = () => {
    let csv = '';
    let filename = '';

    if (activeTab === 'revenue' && revenueSummary) {
      csv = 'Metric,Value\n';
      csv += `Total Revenue,${revenueSummary.totalRevenue}\n`;
      csv += `Pending Amount,${revenueSummary.pendingAmount}\n`;
      csv += `Paid Invoices,${revenueSummary.paidInvoices}/${revenueSummary.totalInvoices}\n`;
      csv += `Collection Rate,${revenueSummary.collectionRate}%\n\n`;
      csv += 'Category,Count,Total\n';
      revenueByCategory.forEach(r => { csv += `${r.category},${r.count},${r.total}\n`; });
      filename = 'revenue-report.csv';
    } else if (activeTab === 'payment' && paymentAnalysis) {
      csv = 'Status,Count,Amount\n';
      paymentAnalysis.statusBreakdown.forEach(s => { csv += `${s.status},${s.count},${s.total}\n`; });
      csv += '\nPayment Method,Count,Amount\n';
      paymentAnalysis.paymentMethods.forEach(m => { csv += `${m.method},${m.count},${m.total}\n`; });
      filename = 'payment-report.csv';
    } else if (activeTab === 'customer' && customerData) {
      csv = 'Restaurant,Revenue,Invoices,Overdue\n';
      customerData.topRestaurants.forEach(r => { csv += `${r.restaurantName},${r.totalRevenue},${r.invoiceCount},${r.overdueCount}\n`; });
      filename = 'customer-report.csv';
    } else if (activeTab === 'subscription' && subscriptionData) {
      csv = 'Plan,Subscribers,Monthly Revenue\n';
      subscriptionData.planDistribution.forEach(p => { csv += `${p.planName},${p.subscriberCount},${p.monthlyRevenue}\n`; });
      filename = 'subscription-report.csv';
    }

    if (csv) {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Revenue Tab
  const renderRevenue = () => {
    if (loading) return <LoadingMessage>{t('admin:reportsPage.loadingRevenueData')}</LoadingMessage>;
    if (!revenueSummary) return <NoDataMessage>{t('admin:reportsPage.noDataAvailable')}</NoDataMessage>;

    const totalGrand = revenueByCategory.reduce((s, r) => s + r.total, 0);

    return (
      <>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(revenueSummary.totalRevenue, currency)}</StatValue>
            <StatLabel>{t('admin:reportsPage.totalRevenue')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.collectedPayments')}</StatDescription>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{formatCurrency(revenueSummary.pendingAmount, currency)}</StatValue>
            <StatLabel>{t('admin:reportsPage.pendingAmount')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.awaitingPayment')}</StatDescription>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{revenueSummary.paidInvoices} / {revenueSummary.totalInvoices}</StatValue>
            <StatLabel>{t('admin:reportsPage.paidInvoices')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.completedTotal')}</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{revenueSummary.collectionRate}%</StatValue>
            <StatLabel>{t('admin:reportsPage.collectionRate')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.paymentSuccessRate')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <ChartCard>
            <ChartTitle>{t('admin:reportsPage.revenueTrendLast12Months')}</ChartTitle>
            {revenueTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6EBF1" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
                  <Legend />
                  <Line type="monotone" dataKey="billed" stroke="#635BFF" strokeWidth={2} name="Billed" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="collected" stroke="#059669" strokeWidth={2} name="Collected" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : <NoDataMessage>{t('admin:reportsPage.noTrendData')}</NoDataMessage>}
          </ChartCard>

          <ChartCard>
            <ChartTitle>{t('admin:reportsPage.revenueByCategory')}</ChartTitle>
            {revenueByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueByCategory.map(r => ({ ...r, name: CATEGORY_LABELS[r.category] || r.category }))}
                    dataKey="total"
                    nameKey="name"
                    cx="50%" cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
                </PieChart>
              </ResponsiveContainer>
            ) : <NoDataMessage>{t('admin:reportsPage.noCategoryData')}</NoDataMessage>}
          </ChartCard>
        </ChartGrid>

        <TableCard>
          <ChartTitle>{t('admin:reportsPage.revenueByCategoryDetail')}</ChartTitle>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('admin:reportsPage.category')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:reportsPage.invoices')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:reportsPage.amount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:reportsPage.share')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {revenueByCategory.map((r, i) => (
                <DataTableRow key={i}>
                  <DataTableCell data-label={t('admin:reportsPage.category')}>{CATEGORY_LABELS[r.category] || r.category}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.invoices')} align="right">{r.count}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.amount')} align="right">{formatCurrency(r.total, currency)}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.share')} align="right">{totalGrand > 0 ? ((r.total / totalGrand) * 100).toFixed(1) : 0}%</DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </TableCard>
      </>
    );
  };

  // Payment Tab
  const renderPayment = () => {
    if (loading) return <LoadingMessage>{t('admin:reportsPage.loadingPaymentData')}</LoadingMessage>;
    if (!paymentAnalysis) return <NoDataMessage>{t('admin:reportsPage.noDataAvailable')}</NoDataMessage>;

    return (
      <>
        <StatsGrid>
          <StatCard color="#DC2626">
            <StatValue>{paymentAnalysis.overdueCount}</StatValue>
            <StatLabel>{t('admin:reportsPage.overdueInvoices')}</StatLabel>
            <StatDescription>{formatCurrency(paymentAnalysis.overdueAmount, currency)}</StatDescription>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{paymentAnalysis.avgPaymentDays} days</StatValue>
            <StatLabel>{t('admin:reportsPage.avgPaymentTime')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.issueToPayment')}</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{paymentAnalysis.awaitingCount}</StatValue>
            <StatLabel>{t('admin:reportsPage.awaitingConfirmation')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.paymentSubmitted')}</StatDescription>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(paymentAnalysis.thisMonthCollected, currency)}</StatValue>
            <StatLabel>{t('admin:reportsPage.thisMonthCollected')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.currentMonth')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <TableCard>
            <ChartTitle>{t('admin:reportsPage.paymentStatusBreakdown')}</ChartTitle>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('admin:reportsPage.status')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:reportsPage.count')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:reportsPage.amount')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {paymentAnalysis.statusBreakdown.map((s, i) => (
                  <DataTableRow key={i}>
                    <DataTableCell data-label={t('admin:reportsPage.status')}><StatusBadge status={s.status}>{STATUS_LABELS[s.status] || s.status}</StatusBadge></DataTableCell>
                    <DataTableCell data-label={t('admin:reportsPage.count')} align="right">{s.count}</DataTableCell>
                    <DataTableCell data-label={t('admin:reportsPage.amount')} align="right">{formatCurrency(s.total, currency)}</DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          </TableCard>

          <ChartCard>
            <ChartTitle>{t('admin:reportsPage.paymentMethods')}</ChartTitle>
            {paymentAnalysis.paymentMethods.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentAnalysis.paymentMethods.map(m => ({ ...m, name: METHOD_LABELS[m.method] || m.method }))}
                    dataKey="count"
                    nameKey="name"
                    cx="50%" cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentAnalysis.paymentMethods.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : <NoDataMessage>{t('admin:reportsPage.noPaymentMethodData')}</NoDataMessage>}
          </ChartCard>
        </ChartGrid>

        {overdueInvoices.length > 0 && (
          <TableCard>
            <ChartTitle>Overdue Invoices ({overdueInvoices.length})</ChartTitle>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">Invoice #</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:reportsPage.restaurant')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:reportsPage.amount')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:reportsPage.dueDate')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:reportsPage.daysOverdue')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {overdueInvoices.map(inv => (
                  <DataTableRow key={inv.id}>
                    <DataTableCell data-label="Invoice #" style={{ fontWeight: 500 }}>{inv.invoiceNumber}</DataTableCell>
                    <DataTableCell data-label={t('admin:reportsPage.restaurant')}>{inv.restaurantName}</DataTableCell>
                    <DataTableCell data-label={t('admin:reportsPage.amount')} align="right">{formatCurrency(inv.amount, inv.currency)}</DataTableCell>
                    <DataTableCell data-label={t('admin:reportsPage.dueDate')}>{new Date(inv.dueDate).toLocaleDateString('en-GB', { timeZone: siteTimezone || 'Asia/Kuala_Lumpur' })}</DataTableCell>
                    <DataTableCell data-label={t('admin:reportsPage.daysOverdue')} align="right" style={{ color: inv.daysOverdue > 30 ? '#DC2626' : '#D97706', fontWeight: 600 }}>
                      {inv.daysOverdue}
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          </TableCard>
        )}
      </>
    );
  };

  // Customer Tab
  const renderCustomer = () => {
    if (loading) return <LoadingMessage>{t('admin:reportsPage.loadingCustomerData')}</LoadingMessage>;
    if (!customerData) return <NoDataMessage>{t('admin:reportsPage.noDataAvailable')}</NoDataMessage>;

    return (
      <>
        <StatsGrid>
          <StatCard color="#6366F1">
            <StatValue>{customerData.totalRestaurants}</StatValue>
            <StatLabel>{t('admin:reportsPage.totalRestaurants')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.allRegistered')}</StatDescription>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{customerData.activeRestaurants}</StatValue>
            <StatLabel>{t('admin:reportsPage.activeRestaurants')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.withInvoices3Months')}</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{customerData.newThisMonth}</StatValue>
            <StatLabel>{t('admin:reportsPage.newThisMonth')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.recentlyRegistered')}</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{formatCurrency(customerData.arpu, currency)}</StatValue>
            <StatLabel>{t('admin:reportsPage.arpu')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.avgRevenuePerRestaurant')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <ChartCard>
            <ChartTitle>{t('admin:reportsPage.monthlyRegistrationTrend')}</ChartTitle>
            {customerData.registrationTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData.registrationTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6EBF1" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#635BFF" radius={[4, 4, 0, 0]} name="New Restaurants" />
                </BarChart>
              </ResponsiveContainer>
            ) : <NoDataMessage>{t('admin:reportsPage.noRegistrationData')}</NoDataMessage>}
          </ChartCard>

          <ChartCard>
            <ChartTitle>{t('admin:reportsPage.payerTypeDistribution')}</ChartTitle>
            {customerData.payerDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerData.payerDistribution.map(p => ({ ...p, name: PAYER_LABELS[p.payerType] || p.payerType }))}
                    dataKey="total"
                    nameKey="name"
                    cx="50%" cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerData.payerDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
                </PieChart>
              </ResponsiveContainer>
            ) : <NoDataMessage>{t('admin:reportsPage.noPayerData')}</NoDataMessage>}
          </ChartCard>
        </ChartGrid>

        <TableCard>
          <ChartTitle>{t('admin:reportsPage.top10RestaurantsByRevenue')}</ChartTitle>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">#</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('admin:reportsPage.restaurant')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:reportsPage.totalRevenue')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:reportsPage.invoices')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:reportsPage.overdue')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {customerData.topRestaurants.map((r, i) => (
                <DataTableRow key={i}>
                  <DataTableCell data-label="#" style={{ fontWeight: 600, color: i < 3 ? '#635BFF' : '#6B7280' }}>{i + 1}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.restaurant')} style={{ fontWeight: 500 }}>{r.restaurantName}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.totalRevenue')} align="right">{formatCurrency(r.totalRevenue, currency)}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.invoices')} align="right">{r.invoiceCount}</DataTableCell>
                  <DataTableCell data-label={t('admin:reportsPage.overdue')} align="right" style={{ color: r.overdueCount > 0 ? '#DC2626' : '#059669' }}>
                    {r.overdueCount}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </TableCard>
      </>
    );
  };

  // Subscription Tab
  const renderSubscription = () => {
    if (loading) return <LoadingMessage>{t('admin:reportsPage.loadingSubscriptionData')}</LoadingMessage>;
    if (!subscriptionData) return <NoDataMessage>{t('admin:reportsPage.noDataAvailable')}</NoDataMessage>;

    const totalRevenue = subscriptionData.planDistribution.reduce((s, p) => s + p.monthlyRevenue, 0);

    return (
      <>
        <StatsGrid>
          <StatCard color="#7C3AED">
            <StatValue>{subscriptionData.activePlans}</StatValue>
            <StatLabel>{t('admin:reportsPage.activePlans')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.currentlyAvailable')}</StatDescription>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(subscriptionData.mrr, currency)}</StatValue>
            <StatLabel>{t('admin:reportsPage.mrr')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.monthlyRecurringRevenue')}</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{formatCurrency(subscriptionData.arpu, currency)}</StatValue>
            <StatLabel>{t('admin:reportsPage.arpu')}</StatLabel>
            <StatDescription>{t('admin:reportsPage.avgPerSubscriber')}</StatDescription>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue style={{ fontSize: '16px' }}>{subscriptionData.mostPopularPlan}</StatValue>
            <StatLabel>{t('admin:reportsPage.mostPopular')}</StatLabel>
            <StatDescription>{subscriptionData.activeSubscribers} subscribers</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <TableCard>
            <ChartTitle>{t('admin:reportsPage.planRevenueBreakdown')}</ChartTitle>
            {subscriptionData.planDistribution.length === 0 ? (
              <DataTableEmpty>{t('admin:reportsPage.noSubscriptionDataYet')}</DataTableEmpty>
            ) : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('admin:reportsPage.plan')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('admin:reportsPage.subscribers')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('admin:reportsPage.monthlyRevenue')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('admin:reportsPage.share')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {subscriptionData.planDistribution.map((p, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell data-label={t('admin:reportsPage.plan')} style={{ fontWeight: 500 }}>{p.planName}</DataTableCell>
                      <DataTableCell data-label={t('admin:reportsPage.subscribers')} align="right">{p.subscriberCount}</DataTableCell>
                      <DataTableCell data-label={t('admin:reportsPage.monthlyRevenue')} align="right">{formatCurrency(p.monthlyRevenue, currency)}</DataTableCell>
                      <DataTableCell data-label={t('admin:reportsPage.share')} align="right">
                        {totalRevenue > 0 ? ((p.monthlyRevenue / totalRevenue) * 100).toFixed(1) : 0}%
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            )}
          </TableCard>

          <ChartCard>
            <ChartTitle>{t('admin:reportsPage.planDistribution')}</ChartTitle>
            {subscriptionData.planDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionData.planDistribution}
                    dataKey="subscriberCount"
                    nameKey="planName"
                    cx="50%" cy="50%"
                    outerRadius={100}
                    label={({ planName, percent }) => `${planName} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subscriptionData.planDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : <NoDataMessage>{t('admin:reportsPage.noPlanData')}</NoDataMessage>}
          </ChartCard>
        </ChartGrid>
      </>
    );
  };

  return (
    <>
      <ReportsContainer>
        <Header>
          <HeaderTitle>{t('admin:reportsPage.reports')}</HeaderTitle>
          <HeaderActions>
            <ExportButton onClick={handleExport}>{t('admin:reportsPage.exportCsv')}</ExportButton>
          </HeaderActions>
        </Header>

        <Content>
          <Tabs>
            <Tab active={activeTab === 'revenue'} onClick={() => handleTabChange('revenue')}>{t('admin:reportsPage.revenue')}</Tab>
            <Tab active={activeTab === 'payment'} onClick={() => handleTabChange('payment')}>{t('admin:reportsPage.payment')}</Tab>
            <Tab active={activeTab === 'customer'} onClick={() => handleTabChange('customer')}>{t('admin:reportsPage.customer')}</Tab>
            <Tab active={activeTab === 'subscription'} onClick={() => handleTabChange('subscription')}>{t('admin:reportsPage.subscription')}</Tab>
          </Tabs>

          <DatePeriodFilter
            activePeriod={activePeriod}
            dateRange={dateRange}
            isCustomDateRange={isCustomDateRange}
            onPeriodChange={handlePeriodChange}
            onCalendarRangeSelect={handleCalendarRangeSelect}
          >
            <CurrencySelect value={currency} onChange={e => setCurrency(e.target.value)}>
              {supportedCurrencies.map(cur => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </CurrencySelect>
          </DatePeriodFilter>

          {activeTab === 'revenue' && renderRevenue()}
          {activeTab === 'payment' && renderPayment()}
          {activeTab === 'customer' && renderCustomer()}
          {activeTab === 'subscription' && renderSubscription()}
        </Content>
      </ReportsContainer>
    </>
  );
};

export default ReportsPage;
