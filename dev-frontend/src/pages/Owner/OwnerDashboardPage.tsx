import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { formatCurrency } from '../../utils/currency';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

// Restaurant Cards (Owner-specific)
const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const RestaurantCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const RestaurantName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`;

const AdminName = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#D1FAE5';
      case 'trial': return '#FEF3C7';
      case 'inactive': case 'overdue': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#065F46';
      case 'trial': return '#92400E';
      case 'inactive': case 'overdue': return '#991B1B';
      default: return '#6B7280';
    }
  }};
`;

const CardStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const CardStatLabel = styled.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`;

const CardStatValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #0A2540;
  font-size: 18px;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`;

const PIE_COLORS = ['#635BFF', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF', '#EEF2FF', '#F5F3FF'];

// ============================================================================
// Component
// ============================================================================

interface RestaurantSummary {
  id: number;
  name: string;
  status: string;
  plan_type: string;
  currency: string;
  admin_name: string | null;
  todayRevenue: number;
  monthRevenue: number;
}

const OwnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('month');

  const [stats, setStats] = useState({
    totalRestaurants: 0,
    todayRevenue: 0,
    monthRevenue: 0,
    monthOrders: 0,
    pendingInvoices: 0,
    avgOrderValue: 0,
    bestRestaurant: '-',
    activeRestaurants: 0,
  });

  const [restaurants, setRestaurants] = useState<RestaurantSummary[]>([]);
  const [compareData, setCompareData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }>>([]);
  const [currency, setCurrency] = useState('RM');
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });

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
    fetchCompareData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartPeriod]);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getHeaders();

      const [dashRes, compareRes, invoicesRes] = await Promise.all([
        fetch('/api/owner/dashboard', { headers }),
        fetch(`/api/owner/statistics/compare?period=${chartPeriod}`, { headers }),
        fetch('/api/owner/invoices?status=overdue', { headers }),
      ]);

      const [dashData, compareResult, overdueData] = await Promise.all([
        dashRes.json(), compareRes.json(), invoicesRes.json(),
      ]);

      const dash = dashData.data || dashData;
      const restaurantList: RestaurantSummary[] = dash.restaurants || [];
      setRestaurants(restaurantList);

      if (restaurantList.length > 0 && restaurantList[0].currency) {
        setCurrency(restaurantList[0].currency);
      }

      const compare = compareResult.data || compareResult || [];
      setCompareData(compare);

      const totalRevenue = compare.reduce((sum: number, r: any) => sum + parseFloat(r.revenue || 0), 0);
      const totalOrders = compare.reduce((sum: number, r: any) => sum + (r.orderCount || 0), 0);
      const avgOrderVal = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const bestRest = compare.length > 0
        ? compare.reduce((best: any, r: any) => parseFloat(r.revenue || 0) > parseFloat(best.revenue || 0) ? r : best, compare[0])
        : null;

      const overdue = overdueData.data || [];
      const overdueCount = Array.isArray(overdue) ? overdue.length : 0;
      const activeCount = restaurantList.filter((r: RestaurantSummary) => r.status !== 'inactive').length;

      setStats({
        totalRestaurants: dash.totalRestaurants || restaurantList.length,
        todayRevenue: dash.todayRevenue || 0,
        monthRevenue: dash.monthRevenue || 0,
        monthOrders: dash.totalOrders || totalOrders,
        pendingInvoices: dash.pendingInvoices || 0,
        avgOrderValue: avgOrderVal,
        bestRestaurant: bestRest?.restaurantName || '-',
        activeRestaurants: activeCount,
      });

      // Alerts
      const alertList: Array<{ type: 'warning' | 'info' | 'success'; title: string; message: string; link?: string }> = [];
      if (overdueCount > 0) {
        alertList.push({ type: 'warning', title: 'Overdue Invoices', message: `${overdueCount} invoice(s) need attention`, link: '/pos/owner/invoices' });
      }
      if ((dash.pendingInvoices || 0) > 0) {
        alertList.push({ type: 'info', title: 'Pending Invoices', message: `${dash.pendingInvoices} invoice(s) pending payment`, link: '/pos/owner/invoices' });
      }
      const inactiveRestaurants = restaurantList.filter((r: RestaurantSummary) => r.status === 'inactive');
      if (inactiveRestaurants.length > 0) {
        alertList.push({ type: 'warning', title: 'Inactive Restaurants', message: `${inactiveRestaurants.length} restaurant(s) currently inactive`, link: '/pos/owner/restaurants' });
      }
      const noRevenueToday = restaurantList.filter((r: RestaurantSummary) => (r.todayRevenue || 0) === 0 && r.status === 'active');
      if (noRevenueToday.length > 0 && noRevenueToday.length < restaurantList.length) {
        alertList.push({ type: 'info', title: 'No Orders Today', message: `${noRevenueToday.length} active restaurant(s) with no orders today`, link: '/pos/owner/restaurants' });
      }
      if (badgeCounts.notices > 0) {
        alertList.push({ type: 'info', title: 'Unread Notices', message: `${badgeCounts.notices} unread notice(s)`, link: '/pos/owner/notices' });
      }
      if (badgeCounts.systemInquiry > 0) {
        alertList.push({ type: 'info', title: 'System Inquiry', message: `${badgeCounts.systemInquiry} inquiry(s) with new replies`, link: '/pos/owner/system-inquiry' });
      }
      if (badgeCounts.operationInquiry > 0) {
        alertList.push({ type: 'info', title: 'Operation Inquiry', message: `${badgeCounts.operationInquiry} inquiry(s) with responses`, link: '/pos/owner/operation-inquiry' });
      }
      if (alertList.length === 0) {
        alertList.push({ type: 'success', title: 'All Clear', message: 'All systems running smoothly. No issues detected.' });
      }
      setAlerts(alertList);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompareData = async () => {
    try {
      const headers = getHeaders();
      const res = await fetch(`/api/owner/statistics/compare?period=${chartPeriod}`, { headers });
      const data = await res.json();
      setCompareData(data.data || data || []);
    } catch (error) {
      console.error('Error fetching compare data:', error);
    }
  };

  const barData = compareData.map((r: any) => ({
    name: (r.restaurantName || 'Unknown').length > 12
      ? (r.restaurantName || 'Unknown').substring(0, 12) + '...'
      : (r.restaurantName || 'Unknown'),
    revenue: parseFloat(r.revenue || 0),
    orders: r.orderCount || 0,
  }));

  const pieData = compareData
    .filter((r: any) => parseFloat(r.revenue || 0) > 0)
    .map((r: any) => ({ name: r.restaurantName || 'Unknown', value: parseFloat(r.revenue || 0) }));

  if (loading) {
    return (
      <Container>
        <Header><Title>Owner Dashboard</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard...</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Owner Dashboard</Title>
      </Header>

      <Content>
        {/* KPI Cards */}
        <DashboardStatsGrid>
          <DashboardStatCard color="#635BFF">
            <DashboardStatLabel>My Restaurants</DashboardStatLabel>
            <DashboardStatValue>{stats.totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#059669">
            <DashboardStatLabel>Today's Revenue</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.todayRevenue, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#10B981">
            <DashboardStatLabel>Monthly Revenue</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.monthRevenue, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#2563EB">
            <DashboardStatLabel>Monthly Orders</DashboardStatLabel>
            <DashboardStatValue>{stats.monthOrders.toLocaleString()}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#F59E0B">
            <DashboardStatLabel>Pending Invoices</DashboardStatLabel>
            <DashboardStatValue>{stats.pendingInvoices}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#7C3AED">
            <DashboardStatLabel>Avg Order Value</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.avgOrderValue, currency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#DC2626">
            <DashboardStatLabel>Best Restaurant</DashboardStatLabel>
            <DashboardStatValue style={{ fontSize: stats.bestRestaurant.length > 15 ? '16px' : undefined }}>
              {stats.bestRestaurant}
            </DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#059669">
            <DashboardStatLabel>Active Restaurants</DashboardStatLabel>
            <DashboardStatValue>{stats.activeRestaurants}</DashboardStatValue>
          </DashboardStatCard>
        </DashboardStatsGrid>

        {/* Chart + Notifications */}
        <MainGrid>
          <ChartContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Revenue Comparison</h3>
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
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7C93' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7C93' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      name === 'revenue' ? formatCurrency(value, currency) : value,
                      name === 'revenue' ? 'Revenue' : 'Orders'
                    ]}
                    labelStyle={{ color: '#0A2540', fontWeight: 600 }}
                    contentStyle={{ borderRadius: 8, border: '1px solid #E6EBF1' }}
                  />
                  <Bar dataKey="revenue" fill="#635BFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <LoadingContainer>No comparison data available</LoadingContainer>
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
            <QuickActionCard onClick={() => navigate('/pos/owner/restaurants')}>
              <div className="icon">&#9835;</div>
              <div className="title">My Restaurants</div>
              <div className="description">Restaurant management</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/owner/invoices')}>
              <div className="icon">&#9783;</div>
              <div className="title">Invoices</div>
              <div className="description">View invoices</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/owner/reports')}>
              <div className="icon">&#9776;</div>
              <div className="title">Reports</div>
              <div className="description">Cross-restaurant analytics</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/profile')}>
              <div className="icon">&#9881;</div>
              <div className="title">Settings</div>
              <div className="description">Profile settings</div>
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

        {/* Restaurant Performance Cards */}
        <SectionTitle>Restaurant Performance</SectionTitle>
        <RestaurantGrid>
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              onClick={() => navigate(`/pos/owner/reports?tab=sales&restaurantId=${restaurant.id}`)}
            >
              <CardHeader>
                <div>
                  <RestaurantName>{restaurant.name}</RestaurantName>
                  <AdminName>{restaurant.admin_name || 'No admin assigned'}</AdminName>
                </div>
                <StatusBadge status={restaurant.status}>{restaurant.status}</StatusBadge>
              </CardHeader>
              <CardStats>
                <div>
                  <CardStatLabel>Today</CardStatLabel>
                  <CardStatValue>{formatCurrency(restaurant.todayRevenue, restaurant.currency || currency)}</CardStatValue>
                </div>
                <div>
                  <CardStatLabel>This Month</CardStatLabel>
                  <CardStatValue>{formatCurrency(restaurant.monthRevenue, restaurant.currency || currency)}</CardStatValue>
                </div>
              </CardStats>
            </RestaurantCard>
          ))}
        </RestaurantGrid>
      </Content>
    </Container>
  );
};

export default OwnerDashboardPage;
