import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { SetupGuide } from '../../components/Common';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { useSetupStatus } from '../../hooks/useSetupStatus';
import { formatCurrency } from '../../utils/currency';
import { useAuth } from '../../contexts/AuthContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============================================================================
// Styled Components — RestaurantDashboard 기준 통일
// ============================================================================

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const AlertsPanel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 16px 0;
    color: #0A2540;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`;

const Alert = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => {
    switch(props.type) {
      case 'error': return '#FEF2F2';
      case 'warning': return '#FFFBEB';
      case 'success': return '#ECFDF5';
      case 'info': return '#EFF6FF';
      default: return '#F8FAFC';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'error': return '#FECACA';
      case 'warning': return '#FDE68A';
      case 'success': return '#A7F3D0';
      case 'info': return '#BFDBFE';
      default: return '#E6EBF1';
    }
  }};
  flex-shrink: 0;

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
`;

const AlertContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const AlertTitle = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => {
    switch(props.type) {
      case 'error': return '#DC2626';
      case 'warning': return '#D97706';
      case 'success': return '#059669';
      case 'info': return '#2563EB';
      default: return '#374151';
    }
  }};
`;

const AlertDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`;

const QuickActionsSection = styled.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const QuickActionCard = styled.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;
    .icon { color: #0A2540; }
    .title { color: #0A2540; }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
    transition: color 0.2s;
    font-family: 'Lucida Console', 'Courier New', monospace;
  }

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #0A2540;
    margin-bottom: 4px;
    transition: color 0.2s;
  }

  .description {
    font-size: 13px;
    color: #6B7280;
  }
`;

// Charts
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

// Table
const RecentOrdersSection = styled.div`
  h3 {
    background: white;
    padding: 20px 24px;
    margin: 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    border: 1px solid #E6EBF1;
    border-radius: 16px 16px 0 0;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background: #F8FAFC;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${props => {
    switch (props.status) {
      case 'paid': return 'background: #D1FAE5; color: #065F46;';
      case 'pending_payment': return 'background: #FEF3C7; color: #92400E;';
      case 'overdue': return 'background: #FEE2E2; color: #991B1B;';
      case 'sent': return 'background: #DBEAFE; color: #1E40AF;';
      default: return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`;

const PIE_COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2', '#FFF5F5'];

// ============================================================================
// Component
// ============================================================================

const BrandGeneralDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [currency, setCurrency] = useState('RM');
  const [loading, setLoading] = useState(true);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [chartPeriod, setChartPeriod] = useState('year');
  const { items: setupItems } = useSetupStatus({ role: user?.role || '', brandId: user?.brand_id });

  const [stats, setStats] = useState({
    totalRestaurants: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    avgRevenuePerRestaurant: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    activePlans: 0,
    totalManagers: 0,
  });

  const [trendData, setTrendData] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }>>([]);
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });

  useEffect(() => {
    if (defaultCurrency) setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  useEffect(() => {
    fetchDashboardData();
    fetchBadgeCounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBadgeCounts = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      const res = await fetch('/api/badge-counts', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        if (data.success) setBadgeCounts(data.data);
      }
    } catch { /* silent */ }
  };

  useEffect(() => {
    if (brandId) fetchTrendData(brandId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartPeriod, brandId]);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      setLoading(true);
      const headers = getHeaders();

      const brandsRes = await fetch('/api/brands', { headers });
      const brandsData = await brandsRes.json();
      const brands = brandsData.data || brandsData || [];
      const brand = brands[0];
      if (!brand) { setLoading(false); return; }
      setBrandId(brand.id);

      if (brand.restaurants && brand.restaurants.length > 0 && brand.restaurants[0].currency) {
        setCurrency(brand.restaurants[0].currency);
      }

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const today = now.toISOString().split('T')[0];

      const [revenueRes, plansRes, invoicesRes, managersRes, subsRes] = await Promise.all([
        fetch(`/api/brands/${brand.id}/revenue?start_date=${monthStart}&end_date=${today}`, { headers }),
        fetch(`/api/brands/${brand.id}/plans`, { headers }),
        fetch('/api/invoices', { headers }),
        fetch('/api/users?role=Brand Manager', { headers }),
        fetch(`/api/brands/${brand.id}/subscriptions`, { headers }),
      ]);

      const [revenueData, plansData, invoicesData, managersData, subsData] = await Promise.all([
        revenueRes.json(), plansRes.json(), invoicesRes.json(), managersRes.json(), subsRes.json(),
      ]);

      const revenue = revenueData.data || revenueData;
      const totalRevenue = parseFloat(revenue.total_revenue || 0);
      const restaurantRevenues = revenue.restaurants || [];
      const totalOrders = restaurantRevenues.reduce((sum: number, r: any) => sum + (r.order_count || 0), 0);
      setRestaurants(restaurantRevenues);

      const plans = plansData.data || plansData || [];
      const activePlans = plans.filter((p: any) => p.is_active !== false).length;

      const invoices = invoicesData.data || invoicesData || [];
      const pendingInvoices = invoices.filter((inv: any) => inv.status === 'pending_payment' || inv.status === 'sent').length;
      const overdueInvoices = invoices.filter((inv: any) => inv.status === 'overdue').length;

      const managers = Array.isArray(managersData) ? managersData : (managersData.data || []);
      const subs = subsData.data || subsData || [];
      setSubscriptions(subs);

      setStats({
        totalRestaurants: restaurantRevenues.length,
        monthlyRevenue: totalRevenue,
        monthlyOrders: totalOrders,
        avgRevenuePerRestaurant: restaurantRevenues.length > 0 ? totalRevenue / restaurantRevenues.length : 0,
        pendingInvoices,
        overdueInvoices,
        activePlans,
        totalManagers: managers.length,
      });

      // Generate alerts
      const alertList: Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }> = [];
      if (overdueInvoices > 0) {
        alertList.push({ type: 'warning', title: 'Overdue Invoices', message: `${overdueInvoices} invoice(s) need attention`, link: '/pos/brand/invoices' });
      }
      if (pendingInvoices > 0) {
        alertList.push({ type: 'info', title: 'Pending Invoices', message: `${pendingInvoices} invoice(s) pending payment`, link: '/pos/brand/invoices' });
      }
      const noOrderRestaurants = restaurantRevenues.filter((r: any) => (r.order_count || 0) === 0);
      if (noOrderRestaurants.length > 0) {
        alertList.push({ type: 'info', title: 'No Orders', message: `${noOrderRestaurants.length} restaurant(s) with no orders this month`, link: '/pos/brand/general/management' });
      }
      if (badgeCounts.notices > 0) {
        alertList.push({ type: 'info', title: 'Unread Notices', message: `${badgeCounts.notices} unread notice(s)`, link: '/pos/brand/notices' });
      }
      if (badgeCounts.systemInquiry > 0) {
        alertList.push({ type: 'info', title: 'System Inquiry', message: `${badgeCounts.systemInquiry} inquiry(s) with new replies`, link: '/pos/brand/system-inquiry' });
      }
      if (badgeCounts.operationInquiry > 0) {
        alertList.push({ type: 'info', title: 'Operation Inquiry', message: `${badgeCounts.operationInquiry} open inquiry(s)`, link: '/pos/brand/operation-inquiry' });
      }
      if (alertList.length === 0) {
        alertList.push({ type: 'success', title: 'All Clear', message: 'All systems running smoothly. No issues detected.' });
      }
      setAlerts(alertList);

      fetchTrendData(brand.id);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendData = async (bId: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      const headers = getHeaders();
      const res = await fetch(`/api/brands/${bId}/sales-trend?period=${chartPeriod}`, { headers });
      const data = await res.json();
      setTrendData(data.data || []);
    } catch (error) {
      console.error('Error fetching trend data:', error);
    }
  };

  const pieData = restaurants
    .filter((r: any) => parseFloat(r.revenue || 0) > 0)
    .map((r: any) => ({ name: r.restaurant_name || r.name || 'Unknown', value: parseFloat(r.revenue || 0) }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 7);

  const topSubscriptions = [...subscriptions]
    .sort((a: any, b: any) => (b.current_month?.revenue || 0) - (a.current_month?.revenue || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <Container>
        <Header><Title>Brand Dashboard</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard...</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Brand Dashboard</Title>
      </Header>

      <Content>
        {setupItems.length > 0 && (
          <SetupGuide items={setupItems} entityId={`brand_${user?.brand_id}`} />
        )}

        {/* KPI Cards */}
        <DashboardStatsGrid>
          <DashboardStatCard color="#DC2626">
            <DashboardStatLabel>Franchise Restaurants</DashboardStatLabel>
            <DashboardStatValue>{stats.totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#059669">
            <DashboardStatLabel>Monthly Revenue</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.monthlyRevenue, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#2563EB">
            <DashboardStatLabel>Monthly Orders</DashboardStatLabel>
            <DashboardStatValue>{stats.monthlyOrders.toLocaleString()}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#7C3AED">
            <DashboardStatLabel>Avg Revenue / Restaurant</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.avgRevenuePerRestaurant, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#F59E0B">
            <DashboardStatLabel>Pending Invoices</DashboardStatLabel>
            <DashboardStatValue>{stats.pendingInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color={stats.overdueInvoices > 0 ? '#EF4444' : '#059669'}>
            <DashboardStatLabel>Overdue Invoices</DashboardStatLabel>
            <DashboardStatValue>{stats.overdueInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#10B981">
            <DashboardStatLabel>Active Plans</DashboardStatLabel>
            <DashboardStatValue>{stats.activePlans}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#6366F1">
            <DashboardStatLabel>Brand Managers</DashboardStatLabel>
            <DashboardStatValue>{stats.totalManagers}</DashboardStatValue>
          </DashboardStatCard>
        </DashboardStatsGrid>

        {/* Chart + Notifications */}
        <MainGrid>
          <ChartContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Revenue Trend</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['week', 'month', 'year'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    style={{
                      padding: '6px 12px',
                      background: chartPeriod === p ? '#635BFF' : 'transparent',
                      color: chartPeriod === p ? 'white' : '#6B7280',
                      border: '1px solid #E6EBF1',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7C93' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7C93' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value, currency), 'Revenue']}
                    labelStyle={{ color: '#0A2540', fontWeight: 600 }}
                    contentStyle={{ borderRadius: 8, border: '1px solid #E6EBF1' }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#DC2626" strokeWidth={2} dot={{ r: 4, fill: '#DC2626' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <LoadingContainer>No sales data for this period</LoadingContainer>
            )}
          </ChartContainer>

          <AlertsPanel>
            <h3>Notifications</h3>
            <AlertsList>
              {alerts.map((alert, idx) => (
                <Alert key={idx} type={alert.type} onClick={() => alert.link && navigate(alert.link)}>
                  <AlertContent>
                    <AlertTitle type={alert.type}>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </AlertContent>
                </Alert>
              ))}
            </AlertsList>
          </AlertsPanel>
        </MainGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <h3>Quick Actions</h3>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/pos/brand/general/management')}>
              <div className="icon">▬</div>
              <div className="title">Brands</div>
              <div className="description">Brand management</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/invoices')}>
              <div className="icon">▦</div>
              <div className="title">Invoices</div>
              <div className="description">Invoice management</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/plans')}>
              <div className="icon">☰</div>
              <div className="title">Subscription Plans</div>
              <div className="description">Plan configuration</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/general/reports')}>
              <div className="icon">◉</div>
              <div className="title">Reports</div>
              <div className="description">Performance analytics</div>
            </QuickActionCard>
          </QuickActionsGrid>
        </QuickActionsSection>

        {/* Revenue Distribution Chart */}
        <ChartGrid>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>Revenue Distribution</ChartTitle>
            </ChartHeader>
            {pieData.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                      {pieData.map((_: any, index: number) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(value, currency)} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {pieData.map((item: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, color: '#374151' }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[idx % PIE_COLORS.length], flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{item.name}</span>
                      <span style={{ fontWeight: 600, flexShrink: 0 }}>{formatCurrency(item.value, currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <LoadingContainer>No revenue data available</LoadingContainer>
            )}
          </ChartCard>
        </ChartGrid>

        {/* Restaurant Performance Table */}
        <RecentOrdersSection>
          <h3>Restaurant Performance</h3>
        </RecentOrdersSection>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Restaurant</Th>
                <Th>Plan</Th>
                <Th>Monthly Revenue</Th>
                <Th>Orders</Th>
                <Th>Estimated Charges</Th>
                <Th>Invoice Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {topSubscriptions.length > 0 ? (
                topSubscriptions.map((sub: any, idx: number) => (
                  <Tr key={idx}>
                    <Td style={{ fontWeight: 600, color: '#0A2540' }}>{sub.restaurant_name || '-'}</Td>
                    <Td>{sub.plan?.name || 'No Plan'}</Td>
                    <Td>{formatCurrency(sub.current_month?.revenue || 0, currency)}</Td>
                    <Td>{sub.current_month?.order_count || 0}</Td>
                    <Td>{formatCurrency(sub.current_month?.estimated_charges || 0, currency)}</Td>
                    <Td>
                      <StatusBadge status={sub.latest_invoice?.status || 'none'}>
                        {(sub.latest_invoice?.status || 'N/A').replace(/_/g, ' ')}
                      </StatusBadge>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                    No restaurant data available
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default BrandGeneralDashboard;
