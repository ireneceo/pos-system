import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue,
  Container, Header, Title, Content
} from '../../components/UI';
import { StatusBadge as CommonStatusBadge } from '../../components/UI/CommonStyles';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell } from '../../components/UI/DataTable';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';
import { Walkthrough, TourTrigger, type TourStep } from '../../components/Walkthrough';

interface SubscriptionInfo {
  plan_name: string | null;
  status: string | null;
  trial_end_date: string | null;
  days_until_trial_end: number | null;
}

interface RecentOrder {
  id: number;
  po_number: string;
  status: string;
  total_amount: number;
  currency: string;
  customer: string;
  created_at: string;
}

interface RecentInvoice {
  id: number;
  invoice_number: string;
  status: string;
  total_amount: number;
  customer: string;
  issued_at: string | null;
  due_date: string | null;
}

interface DashboardAlert {
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  link?: string;
}

interface DashboardData {
  products_total: number;
  products_active: number;
  low_stock_count: number;
  inventory_value: number;
  orders_pending: number;
  orders_confirmed: number;
  orders_shipped: number;
  orders_received_this_month: number;
  monthly_revenue: number;
  outstanding_balance: number;
  overdue_invoices_count: number;
  active_customers: number;
  pending_contract_requests: number;
  currency: string;
  recent_orders: RecentOrder[];
  recent_invoices: RecentInvoice[];
  revenue_trend_6m: Array<{ month: string; revenue: number }>;
  alerts: DashboardAlert[];
  subscription: SubscriptionInfo;
}

// Container/Header/Title now imported from components/UI (B3 refactor — UI_DESIGN_GUIDE 2.1).

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4B5563;
`;

const SubscriptionBadge = styled.span<{ variant: 'trial' | 'active' | 'expiring' | 'expired' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${({ variant }) => {
    switch (variant) {
      case 'trial': return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
      case 'active': return 'background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;';
      case 'expiring': return 'background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;';
      case 'expired': return 'background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;';
      default: return 'background: #F1F4F8; color: #1F2937; border: 1px solid #C7CED6;';
    }
  }}
`;

// Content imported from components/UI

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  align-items: stretch;
  @media (max-width: 1200px) { grid-template-columns: 1fr; }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #C7CED6;

  @media (max-width: 768px) {
    padding: 20px;
  }

  h3 { margin: 0 0 24px 0; color: #0A2540; font-size: 18px; font-weight: 600; }
`;

const AlertsPanel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #C7CED6;
  display: flex;
  flex-direction: column;
  h3 { margin: 0 0 16px 0; color: #0A2540; font-size: 16px; font-weight: 600; }
`;

const AlertsList = styled.div`display: flex; flex-direction: column; gap: 10px; flex: 1;`;

const Alert = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  padding: 12px 14px;
  border-radius: 10px;
  border-left: 4px solid ${p => p.type === 'error' ? '#EF4444' : p.type === 'warning' ? '#F59E0B' : p.type === 'info' ? '#3B82F6' : '#10B981'};
  background: ${p => p.type === 'error' ? '#FEF2F2' : p.type === 'warning' ? '#FFFBEB' : p.type === 'info' ? '#EFF6FF' : '#ECFDF5'};
  cursor: ${p => 'pointer'};
  transition: transform 0.15s ease;
  &:hover { transform: translateX(2px); }
`;

const AlertTitle = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.type === 'error' ? '#991B1B' : p.type === 'warning' ? '#92400E' : p.type === 'info' ? '#1E40AF' : '#065F46'};
  margin-bottom: 4px;
`;

const AlertDescription = styled.div`font-size: 12px; color: #4B5563;`;

const NoAlerts = styled.div`
  padding: 24px;
  text-align: center;
  color: #4B5563;
  font-size: 13px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const TableCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #C7CED6;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 20px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #C7CED6;
  h3 { margin: 0; color: #0A2540; font-size: 16px; font-weight: 600; }
  a { font-size: 13px; color: #2563EB; text-decoration: none; cursor: pointer; }
  a:hover { text-decoration: underline; }
`;


// StatusBadge — map supplier domain status → CommonStatusBadge variant
function mapSupplierStatusVariant(s: string): 'success' | 'warning' | 'error' | 'info' | '' {
  if (['received', 'paid'].includes(s)) return 'success';
  if (['submitted', 'pending_payment'].includes(s)) return 'warning';
  if (['cancelled', 'overdue'].includes(s)) return 'error';
  if (['confirmed', 'shipped'].includes(s)) return 'info';
  return '';
}

const EmptyTable = styled.div`padding: 32px; text-align: center; color: #4B5563; font-size: 13px;`;

const SubscriptionCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 16px;
  padding: 24px;
  margin-top: 24px;
  h3 { font-size: 18px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; }
`;

const SubscriptionRow = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;`;

const SubscriptionItem = styled.div`
  .label { font-size: 12px; font-weight: 600; color: #4B5563; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 6px; }
  .value { font-size: 16px; font-weight: 600; color: #0A2540; }
`;

const LoadingSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const SkeletonCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  height: 96px;
  animation: pulse 1.5s ease-in-out infinite;
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
`;

const ErrorBanner = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
`;

// Supplier walkthrough — 5 step over sidebar items + header trigger.
const supplierTourSteps = (t: (k: string, fallback?: string) => string): TourStep[] => ([
  {
    selector: '[data-tour="sidebar-supplier-company-info"]',
    title: t('walkthrough:supplier.step1.title', 'Set company info'),
    description: t('walkthrough:supplier.step1.description', "Add your supplier company's business registration, tax ID and contact details."),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-supplier-products"]',
    title: t('walkthrough:supplier.step2.title', 'Build your product catalog'),
    description: t('walkthrough:supplier.step2.description', 'Register the products you sell. Buyers see this catalog when placing orders.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-supplier-orders"]',
    title: t('walkthrough:supplier.step3.title', 'Process incoming purchase orders'),
    description: t('walkthrough:supplier.step3.description', 'Confirm, dispatch and invoice purchase orders from buyers.'),
    position: 'right'
  },
  {
    selector: '[data-tour="sidebar-supplier-customers"]',
    title: t('walkthrough:supplier.step4.title', 'Manage buyer accounts'),
    description: t('walkthrough:supplier.step4.description', 'View who is buying from you and set credit limits per buyer.'),
    position: 'right'
  },
  {
    selector: '[data-tour="header-tour-trigger"]',
    title: t('walkthrough:supplier.step5.title', 'Replay anytime'),
    description: t('walkthrough:supplier.step5.description', 'Use Show me around in the header to see this tour again whenever you need.'),
    position: 'bottom'
  }
]);

const SupplierDashboard: React.FC = () => {
  const { t } = useTranslation('supplier');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const res = await fetch('/api/supplier/dashboard', { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load dashboard');
      setData(json.data);
    } catch (e: any) {
      console.error('[SupplierDashboard] fetch error:', e);
      setError(e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const subscriptionVariant = (): 'trial' | 'active' | 'expiring' | 'expired' | 'neutral' => {
    if (!data?.subscription) return 'neutral';
    const { status, days_until_trial_end } = data.subscription;
    if (status === 'trial') {
      if (days_until_trial_end !== null && days_until_trial_end <= 0) return 'expired';
      return 'trial';
    }
    if (status === 'expired' || status === 'suspended' || status === 'cancelled') return 'expired';
    if (status === 'overdue') return 'expiring';
    if (status === 'active') return 'active';
    return 'neutral';
  };

  const formatTrialDate = (iso: string | null): string => {
    if (!iso) return '-';
    try { return formatDate(iso) || '-'; } catch { return '-'; }
  };

  const formatMonthLabel = (key: string): string => {
    const [, m] = key.split('-');
    const idx = parseInt(m, 10) - 1;
    const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return names[idx] || key;
  };

  const handleAlertClick = (alert: DashboardAlert) => {
    if (alert.link) navigate(alert.link);
  };

  const ccy = data?.currency || 'MYR';

  return (
    <Container>
      <Walkthrough tourKey="supplier_dashboard" steps={supplierTourSteps(t)} version={1} autoStart />
      <Header>
        <Title>{t('dashboard.title')}</Title>
        <TourTrigger tourKey="supplier_dashboard" />
        {data?.subscription?.status && (
          <Subtitle>
            {data.subscription.plan_name && <span>{data.subscription.plan_name}</span>}
            <SubscriptionBadge variant={subscriptionVariant()} onClick={() => navigate('/pos/profile?tab=subscription')} style={{ cursor: 'pointer' }}>
              {data.subscription.status === 'trial' && data.subscription.days_until_trial_end !== null
                ? `${t('dashboard.trial')} - ${t('dashboard.daysLeft', { n: Math.max(0, data.subscription.days_until_trial_end) })}`
                : data.subscription.status}
            </SubscriptionBadge>
          </Subtitle>
        )}
      </Header>

      <Content>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        {loading && !data ? (
          <LoadingSkeleton>
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </LoadingSkeleton>
        ) : data ? (
          <>
            {/* Stats Grid (8 KPIs) */}
            <DashboardStatsGrid>
              <DashboardStatCard color="#F59E0B">
                <DashboardStatLabel>{t('dashboard.pendingOrders', 'Pending Orders')}</DashboardStatLabel>
                <DashboardStatValue>{data.orders_pending.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#3B82F6">
                <DashboardStatLabel>{t('dashboard.confirmedOrders', 'Confirmed Orders')}</DashboardStatLabel>
                <DashboardStatValue>{data.orders_confirmed.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#6366F1">
                <DashboardStatLabel>{t('dashboard.shippedOrders', 'Shipped Orders')}</DashboardStatLabel>
                <DashboardStatValue>{data.orders_shipped.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#10B981">
                <DashboardStatLabel>{t('dashboard.receivedThisMonth', 'Received This Month')}</DashboardStatLabel>
                <DashboardStatValue>{data.orders_received_this_month.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#059669">
                <DashboardStatLabel>{t('dashboard.monthlyRevenue', 'Monthly Revenue')}</DashboardStatLabel>
                <DashboardStatValue>{formatCurrency(data.monthly_revenue, ccy)}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color={data.overdue_invoices_count > 0 ? '#EF4444' : '#7C3AED'}>
                <DashboardStatLabel>{t('dashboard.outstandingBalance', 'Outstanding Balance')}</DashboardStatLabel>
                <DashboardStatValue>{formatCurrency(data.outstanding_balance, ccy)}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#0891B2">
                <DashboardStatLabel>{t('dashboard.activeCustomers', 'Active Customers')}</DashboardStatLabel>
                <DashboardStatValue>{data.active_customers.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color={data.low_stock_count > 0 ? '#EF4444' : '#10B981'}>
                <DashboardStatLabel>{t('dashboard.lowStockAlert', 'Low Stock Items')}</DashboardStatLabel>
                <DashboardStatValue>{data.low_stock_count.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
            </DashboardStatsGrid>

            {/* Revenue Trend + Alerts */}
            <MainGrid>
              <ChartContainer>
                <h3>{t('dashboard.revenueTrend6m', 'Revenue Trend (Last 6 Months)')}</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={data.revenue_trend_6m.map(p => ({ ...p, label: formatMonthLabel(p.month) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C7CED6" />
                    <XAxis dataKey="label" stroke="#4B5563" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#4B5563" tick={{ fontSize: 12 }} tickFormatter={(v) => `${ccy} ${v}`} />
                    <Tooltip formatter={(v: number) => formatCurrency(v, ccy)} />
                    <Line type="monotone" dataKey="revenue" stroke="#9333EA" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>

              <AlertsPanel>
                <h3>{t('dashboard.alerts', 'Alerts & Notifications')}</h3>
                <AlertsList>
                  {data.alerts.length === 0 ? (
                    <NoAlerts>{t('dashboard.allClear', "All clear — no items need your attention.")}</NoAlerts>
                  ) : data.alerts.map((alert, idx) => (
                    <Alert key={idx} type={alert.type} onClick={() => handleAlertClick(alert)}>
                      <AlertTitle type={alert.type}>{alert.title}</AlertTitle>
                      <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                  ))}
                </AlertsList>
              </AlertsPanel>
            </MainGrid>

            {/* Recent Orders + Recent Trade Invoices */}
            <TwoCol>
              <TableCard>
                <TableHeader>
                  <h3>{t('dashboard.recentOrders', 'Recent Orders')}</h3>
                  <a onClick={() => navigate('/pos/supplier/orders')}>{t('common.viewAll', 'View all')} →</a>
                </TableHeader>
                {data.recent_orders.length === 0 ? (
                  <EmptyTable>{t('dashboard.noRecentOrders', 'No orders yet.')}</EmptyTable>
                ) : (
                  <DataTable>
                    <DataTableHead>
                      <tr>
                        <DataTableHeaderCell align="left">{t('dashboard.poNumber', 'PO #')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="left">{t('dashboard.customer', 'Customer')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="left">{t('dashboard.status', 'Status')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('dashboard.total', 'Total')}</DataTableHeaderCell>
                      </tr>
                    </DataTableHead>
                    <tbody>
                      {data.recent_orders.map(po => (
                        <DataTableRow key={po.id} onClick={() => navigate(`/pos/supplier/orders/${po.id}`)} style={{ cursor: 'pointer' }}>
                          <DataTableCell data-label={t('dashboard.poNumber', 'PO #')}><strong>{po.po_number}</strong></DataTableCell>
                          <DataTableCell data-label={t('dashboard.customer', 'Customer')}>{po.customer}</DataTableCell>
                          <DataTableCell data-label={t('dashboard.status', 'Status')}><CommonStatusBadge status={mapSupplierStatusVariant(po.status)} size="small">{po.status}</CommonStatusBadge></DataTableCell>
                          <DataTableCell align="right" data-label={t('dashboard.total', 'Total')}>{formatCurrency(po.total_amount, po.currency || ccy)}</DataTableCell>
                        </DataTableRow>
                      ))}
                    </tbody>
                  </DataTable>
                )}
              </TableCard>

              <TableCard>
                <TableHeader>
                  <h3>{t('dashboard.recentTradeInvoices', 'Recent Trade Invoices')}</h3>
                  <a onClick={() => navigate('/pos/supplier/trade-invoices')}>{t('common.viewAll', 'View all')} →</a>
                </TableHeader>
                {data.recent_invoices.length === 0 ? (
                  <EmptyTable>{t('dashboard.noRecentInvoices', 'No invoices yet.')}</EmptyTable>
                ) : (
                  <DataTable>
                    <DataTableHead>
                      <tr>
                        <DataTableHeaderCell align="left">{t('dashboard.invoiceNumber', 'Invoice #')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="left">{t('dashboard.customer', 'Customer')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="left">{t('dashboard.status', 'Status')}</DataTableHeaderCell>
                        <DataTableHeaderCell align="right">{t('dashboard.total', 'Total')}</DataTableHeaderCell>
                      </tr>
                    </DataTableHead>
                    <tbody>
                      {data.recent_invoices.map(inv => (
                        <DataTableRow key={inv.id} onClick={() => navigate('/pos/supplier/trade-invoices')} style={{ cursor: 'pointer' }}>
                          <DataTableCell data-label={t('dashboard.invoiceNumber', 'Invoice #')}><strong>{inv.invoice_number}</strong></DataTableCell>
                          <DataTableCell data-label={t('dashboard.customer', 'Customer')}>{inv.customer}</DataTableCell>
                          <DataTableCell data-label={t('dashboard.status', 'Status')}><CommonStatusBadge status={mapSupplierStatusVariant(inv.status)} size="small">{inv.status.replace('_', ' ')}</CommonStatusBadge></DataTableCell>
                          <DataTableCell align="right" data-label={t('dashboard.total', 'Total')}>{formatCurrency(inv.total_amount, ccy)}</DataTableCell>
                        </DataTableRow>
                      ))}
                    </tbody>
                  </DataTable>
                )}
              </TableCard>
            </TwoCol>

            {/* Subscription card */}
            <SubscriptionCard>
              <h3>{t('dashboard.subscription')}</h3>
              <SubscriptionRow>
                <SubscriptionItem>
                  <div className="label">Plan</div>
                  <div className="value">{data.subscription?.plan_name || '-'}</div>
                </SubscriptionItem>
                <SubscriptionItem>
                  <div className="label">Status</div>
                  <div className="value">
                    <SubscriptionBadge variant={subscriptionVariant()}>
                      {data.subscription?.status || '-'}
                    </SubscriptionBadge>
                  </div>
                </SubscriptionItem>
                <SubscriptionItem>
                  <div className="label">Inventory Value</div>
                  <div className="value">{formatCurrency(data.inventory_value, ccy)}</div>
                </SubscriptionItem>
                <SubscriptionItem>
                  <div className="label">Active Products</div>
                  <div className="value">{data.products_active} / {data.products_total}</div>
                </SubscriptionItem>
                {data.subscription?.status === 'trial' && (
                  <>
                    <SubscriptionItem>
                      <div className="label">Trial Ends</div>
                      <div className="value">{formatTrialDate(data.subscription.trial_end_date)}</div>
                    </SubscriptionItem>
                    <SubscriptionItem>
                      <div className="label">Days Left</div>
                      <div className="value">
                        {data.subscription.days_until_trial_end !== null
                          ? Math.max(0, data.subscription.days_until_trial_end)
                          : '-'}
                      </div>
                    </SubscriptionItem>
                  </>
                )}
              </SubscriptionRow>
            </SubscriptionCard>
          </>
        ) : null}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
