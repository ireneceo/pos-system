import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';

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

const FilterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: ${props => props.active ? '#5A51E6' : '#F8FAFC'}; }
`;

const DateRangeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  &:focus { outline: none; border-color: #635BFF; }
`;

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  border-bottom: 2px solid #E6EBF1;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #0A2540;
  border-bottom: 1px solid #F3F4F6;
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
type PeriodType = 'all' | 'month' | '3months' | '6months' | 'year' | 'custom';

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
  const { operationSettings, siteTimezone } = useStore();
  const defaultCurrency = operationSettings?.currency || 'MYR';
  const [activeTab, handleTabChange] = useTabParam<TabType>('revenue');
  const [period, setPeriod] = useState<PeriodType>('month');
  const [currency, setCurrency] = useState('');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [currencyLoaded, setCurrencyLoaded] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);

  // Fetch supported currencies and set default to highest-revenue
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('auth_token');
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

  const getDateParams = useCallback(() => {
    // Use site timezone for date calculations
    const tz = siteTimezone || 'Asia/Kuala_Lumpur';
    const nowStr = new Date().toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD
    const [yearStr, monthStr] = nowStr.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr) - 1; // 0-based

    let start: Date, end: Date;
    switch (period) {
      case 'all':
        return 'period=all'; // No date filter = all time
      case '3months':
        start = new Date(year, month - 2, 1);
        end = new Date(year, month + 1, 0);
        break;
      case '6months':
        start = new Date(year, month - 5, 1);
        end = new Date(year, month + 1, 0);
        break;
      case 'year':
        start = new Date(year, 0, 1);
        end = new Date(year, 11, 31);
        break;
      case 'custom':
        if (customStart && customEnd) {
          return `start_date=${customStart}&end_date=${customEnd}`;
        }
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 0);
        break;
      default: // month
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 0);
    }
    return `start_date=${start.toISOString().split('T')[0]}&end_date=${end.toISOString().split('T')[0]}`;
  }, [period, customStart, customEnd, siteTimezone]);

  const fetchApi = useCallback(async (endpoint: string, params = '') => {
    const token = localStorage.getItem('auth_token');
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
  }, [activeTab, period, currency, customStart, customEnd, currencyLoaded]);

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
    if (loading) return <LoadingMessage>Loading revenue data...</LoadingMessage>;
    if (!revenueSummary) return <NoDataMessage>No data available</NoDataMessage>;

    const totalGrand = revenueByCategory.reduce((s, r) => s + r.total, 0);

    return (
      <>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(revenueSummary.totalRevenue, currency)}</StatValue>
            <StatLabel>Total Revenue</StatLabel>
            <StatDescription>Collected payments</StatDescription>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{formatCurrency(revenueSummary.pendingAmount, currency)}</StatValue>
            <StatLabel>Pending Amount</StatLabel>
            <StatDescription>Awaiting payment</StatDescription>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{revenueSummary.paidInvoices} / {revenueSummary.totalInvoices}</StatValue>
            <StatLabel>Paid Invoices</StatLabel>
            <StatDescription>Completed / Total</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{revenueSummary.collectionRate}%</StatValue>
            <StatLabel>Collection Rate</StatLabel>
            <StatDescription>Payment success rate</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <ChartCard>
            <ChartTitle>Revenue Trend (Last 12 Months)</ChartTitle>
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
            ) : <NoDataMessage>No trend data</NoDataMessage>}
          </ChartCard>

          <ChartCard>
            <ChartTitle>Revenue by Category</ChartTitle>
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
            ) : <NoDataMessage>No category data</NoDataMessage>}
          </ChartCard>
        </ChartGrid>

        <TableCard>
          <ChartTitle>Revenue by Category (Detail)</ChartTitle>
          <Table>
            <thead>
              <tr>
                <Th>Category</Th>
                <Th style={{ textAlign: 'right' }}>Invoices</Th>
                <Th style={{ textAlign: 'right' }}>Amount</Th>
                <Th style={{ textAlign: 'right' }}>Share</Th>
              </tr>
            </thead>
            <tbody>
              {revenueByCategory.map((r, i) => (
                <tr key={i}>
                  <Td>{CATEGORY_LABELS[r.category] || r.category}</Td>
                  <Td style={{ textAlign: 'right' }}>{r.count}</Td>
                  <Td style={{ textAlign: 'right' }}>{formatCurrency(r.total, currency)}</Td>
                  <Td style={{ textAlign: 'right' }}>{totalGrand > 0 ? ((r.total / totalGrand) * 100).toFixed(1) : 0}%</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>
      </>
    );
  };

  // Payment Tab
  const renderPayment = () => {
    if (loading) return <LoadingMessage>Loading payment data...</LoadingMessage>;
    if (!paymentAnalysis) return <NoDataMessage>No data available</NoDataMessage>;

    return (
      <>
        <StatsGrid>
          <StatCard color="#DC2626">
            <StatValue>{paymentAnalysis.overdueCount}</StatValue>
            <StatLabel>Overdue Invoices</StatLabel>
            <StatDescription>{formatCurrency(paymentAnalysis.overdueAmount, currency)}</StatDescription>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{paymentAnalysis.avgPaymentDays} days</StatValue>
            <StatLabel>Avg Payment Time</StatLabel>
            <StatDescription>Issue to payment</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{paymentAnalysis.awaitingCount}</StatValue>
            <StatLabel>Awaiting Confirmation</StatLabel>
            <StatDescription>Payment submitted</StatDescription>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(paymentAnalysis.thisMonthCollected, currency)}</StatValue>
            <StatLabel>This Month Collected</StatLabel>
            <StatDescription>Current month</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <TableCard>
            <ChartTitle>Payment Status Breakdown</ChartTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Status</Th>
                  <Th style={{ textAlign: 'right' }}>Count</Th>
                  <Th style={{ textAlign: 'right' }}>Amount</Th>
                </tr>
              </thead>
              <tbody>
                {paymentAnalysis.statusBreakdown.map((s, i) => (
                  <tr key={i}>
                    <Td><StatusBadge status={s.status}>{STATUS_LABELS[s.status] || s.status}</StatusBadge></Td>
                    <Td style={{ textAlign: 'right' }}>{s.count}</Td>
                    <Td style={{ textAlign: 'right' }}>{formatCurrency(s.total, currency)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableCard>

          <ChartCard>
            <ChartTitle>Payment Methods</ChartTitle>
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
            ) : <NoDataMessage>No payment method data</NoDataMessage>}
          </ChartCard>
        </ChartGrid>

        {overdueInvoices.length > 0 && (
          <TableCard>
            <ChartTitle>Overdue Invoices ({overdueInvoices.length})</ChartTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Invoice #</Th>
                  <Th>Restaurant</Th>
                  <Th style={{ textAlign: 'right' }}>Amount</Th>
                  <Th>Due Date</Th>
                  <Th style={{ textAlign: 'right' }}>Days Overdue</Th>
                </tr>
              </thead>
              <tbody>
                {overdueInvoices.map(inv => (
                  <tr key={inv.id}>
                    <Td style={{ fontWeight: 500 }}>{inv.invoiceNumber}</Td>
                    <Td>{inv.restaurantName}</Td>
                    <Td style={{ textAlign: 'right' }}>{formatCurrency(inv.amount, inv.currency)}</Td>
                    <Td>{new Date(inv.dueDate).toLocaleDateString('en-GB', { timeZone: siteTimezone || 'Asia/Kuala_Lumpur' })}</Td>
                    <Td style={{ textAlign: 'right', color: inv.daysOverdue > 30 ? '#DC2626' : '#D97706', fontWeight: 600 }}>
                      {inv.daysOverdue}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableCard>
        )}
      </>
    );
  };

  // Customer Tab
  const renderCustomer = () => {
    if (loading) return <LoadingMessage>Loading customer data...</LoadingMessage>;
    if (!customerData) return <NoDataMessage>No data available</NoDataMessage>;

    return (
      <>
        <StatsGrid>
          <StatCard color="#6366F1">
            <StatValue>{customerData.totalRestaurants}</StatValue>
            <StatLabel>Total Restaurants</StatLabel>
            <StatDescription>All registered</StatDescription>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{customerData.activeRestaurants}</StatValue>
            <StatLabel>Active Restaurants</StatLabel>
            <StatDescription>With invoices (3 months)</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{customerData.newThisMonth}</StatValue>
            <StatLabel>New This Month</StatLabel>
            <StatDescription>Recently registered</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{formatCurrency(customerData.arpu, currency)}</StatValue>
            <StatLabel>ARPU</StatLabel>
            <StatDescription>Avg revenue per restaurant</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <ChartCard>
            <ChartTitle>Monthly Registration Trend</ChartTitle>
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
            ) : <NoDataMessage>No registration data</NoDataMessage>}
          </ChartCard>

          <ChartCard>
            <ChartTitle>Payer Type Distribution</ChartTitle>
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
            ) : <NoDataMessage>No payer data</NoDataMessage>}
          </ChartCard>
        </ChartGrid>

        <TableCard>
          <ChartTitle>Top 10 Restaurants by Revenue</ChartTitle>
          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Restaurant</Th>
                <Th style={{ textAlign: 'right' }}>Total Revenue</Th>
                <Th style={{ textAlign: 'right' }}>Invoices</Th>
                <Th style={{ textAlign: 'right' }}>Overdue</Th>
              </tr>
            </thead>
            <tbody>
              {customerData.topRestaurants.map((r, i) => (
                <tr key={i}>
                  <Td style={{ fontWeight: 600, color: i < 3 ? '#635BFF' : '#6B7280' }}>{i + 1}</Td>
                  <Td style={{ fontWeight: 500 }}>{r.restaurantName}</Td>
                  <Td style={{ textAlign: 'right' }}>{formatCurrency(r.totalRevenue, currency)}</Td>
                  <Td style={{ textAlign: 'right' }}>{r.invoiceCount}</Td>
                  <Td style={{ textAlign: 'right', color: r.overdueCount > 0 ? '#DC2626' : '#059669' }}>
                    {r.overdueCount}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>
      </>
    );
  };

  // Subscription Tab
  const renderSubscription = () => {
    if (loading) return <LoadingMessage>Loading subscription data...</LoadingMessage>;
    if (!subscriptionData) return <NoDataMessage>No data available</NoDataMessage>;

    const totalRevenue = subscriptionData.planDistribution.reduce((s, p) => s + p.monthlyRevenue, 0);

    return (
      <>
        <StatsGrid>
          <StatCard color="#7C3AED">
            <StatValue>{subscriptionData.activePlans}</StatValue>
            <StatLabel>Active Plans</StatLabel>
            <StatDescription>Currently available</StatDescription>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(subscriptionData.mrr, currency)}</StatValue>
            <StatLabel>MRR</StatLabel>
            <StatDescription>Monthly Recurring Revenue</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{formatCurrency(subscriptionData.arpu, currency)}</StatValue>
            <StatLabel>ARPU</StatLabel>
            <StatDescription>Avg per subscriber</StatDescription>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue style={{ fontSize: '16px' }}>{subscriptionData.mostPopularPlan}</StatValue>
            <StatLabel>Most Popular</StatLabel>
            <StatDescription>{subscriptionData.activeSubscribers} subscribers</StatDescription>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <TableCard>
            <ChartTitle>Plan Revenue Breakdown</ChartTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Plan</Th>
                  <Th style={{ textAlign: 'right' }}>Subscribers</Th>
                  <Th style={{ textAlign: 'right' }}>Monthly Revenue</Th>
                  <Th style={{ textAlign: 'right' }}>Share</Th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.planDistribution.map((p, i) => (
                  <tr key={i}>
                    <Td style={{ fontWeight: 500 }}>{p.planName}</Td>
                    <Td style={{ textAlign: 'right' }}>{p.subscriberCount}</Td>
                    <Td style={{ textAlign: 'right' }}>{formatCurrency(p.monthlyRevenue, currency)}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      {totalRevenue > 0 ? ((p.monthlyRevenue / totalRevenue) * 100).toFixed(1) : 0}%
                    </Td>
                  </tr>
                ))}
                {subscriptionData.planDistribution.length === 0 && (
                  <tr><Td colSpan={4} style={{ textAlign: 'center', color: '#9CA3AF' }}>No subscription data yet</Td></tr>
                )}
              </tbody>
            </Table>
          </TableCard>

          <ChartCard>
            <ChartTitle>Plan Distribution</ChartTitle>
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
            ) : <NoDataMessage>No plan data</NoDataMessage>}
          </ChartCard>
        </ChartGrid>
      </>
    );
  };

  return (
    <>
      <ReportsContainer>
        <Header>
          <HeaderTitle>Reports</HeaderTitle>
          <HeaderActions>
            <ExportButton onClick={handleExport}>Export CSV</ExportButton>
          </HeaderActions>
        </Header>

        <Content>
          <Tabs>
            <Tab active={activeTab === 'revenue'} onClick={() => handleTabChange('revenue')}>Revenue</Tab>
            <Tab active={activeTab === 'payment'} onClick={() => handleTabChange('payment')}>Payment</Tab>
            <Tab active={activeTab === 'customer'} onClick={() => handleTabChange('customer')}>Customer</Tab>
            <Tab active={activeTab === 'subscription'} onClick={() => handleTabChange('subscription')}>Subscription</Tab>
          </Tabs>

          <FilterControls>
            <DateButton active={period === 'all'} onClick={() => setPeriod('all')}>All</DateButton>
            <DateButton active={period === 'month'} onClick={() => setPeriod('month')}>This Month</DateButton>
            <DateButton active={period === '3months'} onClick={() => setPeriod('3months')}>3 Months</DateButton>
            <DateButton active={period === '6months'} onClick={() => setPeriod('6months')}>6 Months</DateButton>
            <DateButton active={period === 'year'} onClick={() => setPeriod('year')}>This Year</DateButton>
            <DateButton active={period === 'custom'} onClick={() => setPeriod('custom')}>Custom</DateButton>
            {period === 'custom' && (
              <>
                <DateRangeInput type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} />
                <span style={{ color: '#6B7280' }}>to</span>
                <DateRangeInput type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} />
              </>
            )}
            <CurrencySelect value={currency} onChange={e => setCurrency(e.target.value)}>
              {supportedCurrencies.map(cur => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </CurrencySelect>
          </FilterControls>

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
