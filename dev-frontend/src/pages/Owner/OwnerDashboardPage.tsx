import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============================================================================
// Styled Components
// ============================================================================

const Container = styled.div`
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
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`;

const Content = styled.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`;

const AlertBox = styled.div<{ type: 'warning' | 'info' | 'success' }>`
  background: ${props =>
    props.type === 'warning' ? '#FEF2F2' :
    props.type === 'success' ? '#ECFDF5' : '#EFF6FF'
  };
  border-left: 4px solid ${props =>
    props.type === 'warning' ? '#DC2626' :
    props.type === 'success' ? '#059669' : '#2563EB'
  };
  color: ${props =>
    props.type === 'warning' ? '#991B1B' :
    props.type === 'success' ? '#064E3B' : '#1E3A8A'
  };
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlertIcon = styled.span`
  font-size: 14px;
  flex-shrink: 0;
`;

const QuickAccess = styled.div`
  margin-bottom: 32px;
`;

const QuickButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const QuickBtnDiv = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: #0A2540;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  cursor: pointer;

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const QuickBtnIcon = styled.div`
  color: #635BFF;
  font-size: 20px;
  margin-bottom: 12px;
`;

const QuickBtnTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`;

const QuickBtnDesc = styled.div`
  font-size: 12px;
  color: #6B7C93;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
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
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`;

const PeriodSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; }
`;

// Restaurant Cards
const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const RestaurantCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
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
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#FFF7ED';
      case 'inactive': case 'overdue': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'trial': return '#EA580C';
      case 'inactive': case 'overdue': return '#DC2626';
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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
  const { user } = useAuth();
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
  const [alerts, setAlerts] = useState<Array<{ type: 'warning' | 'info' | 'success'; message: string }>>([]);
  const [currency, setCurrency] = useState('RM');
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });

  useEffect(() => {
    fetchDashboardData();
    fetchBadgeCounts();
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
    } catch (e) { /* silent */ }
  };

  useEffect(() => {
    fetchCompareData();
  }, [chartPeriod]);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getHeaders();

      // Fetch dashboard + compare + invoices in parallel
      const [dashRes, compareRes, invoicesRes] = await Promise.all([
        fetch('/api/owner/dashboard', { headers }),
        fetch(`/api/owner/statistics/compare?period=${chartPeriod}`, { headers }),
        fetch('/api/owner/invoices?status=overdue', { headers }),
      ]);

      const [dashData, compareResult, overdueData] = await Promise.all([
        dashRes.json(),
        compareRes.json(),
        invoicesRes.json(),
      ]);

      // Dashboard data
      const dash = dashData.data || dashData;
      const restaurantList: RestaurantSummary[] = dash.restaurants || [];
      setRestaurants(restaurantList);

      // Set currency from first restaurant
      if (restaurantList.length > 0 && restaurantList[0].currency) {
        setCurrency(restaurantList[0].currency);
      }

      // Compare data for charts
      const compare = compareResult.data || compareResult || [];
      setCompareData(compare);

      // Calculate stats from compare data
      const totalRevenue = compare.reduce((sum: number, r: any) => sum + parseFloat(r.revenue || 0), 0);
      const totalOrders = compare.reduce((sum: number, r: any) => sum + (r.orderCount || 0), 0);
      const avgOrderVal = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const bestRest = compare.length > 0
        ? compare.reduce((best: any, r: any) => parseFloat(r.revenue || 0) > parseFloat(best.revenue || 0) ? r : best, compare[0])
        : null;

      // Overdue invoices
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
      const alertList: Array<{ type: 'warning' | 'info' | 'success'; message: string }> = [];
      if (overdueCount > 0) {
        alertList.push({ type: 'warning', message: `${overdueCount} overdue invoice${overdueCount > 1 ? 's' : ''} need attention` });
      }
      if ((dash.pendingInvoices || 0) > 0) {
        alertList.push({ type: 'info', message: `${dash.pendingInvoices} invoice${dash.pendingInvoices > 1 ? 's' : ''} pending payment` });
      }
      const inactiveRestaurants = restaurantList.filter((r: RestaurantSummary) => r.status === 'inactive');
      if (inactiveRestaurants.length > 0) {
        alertList.push({ type: 'warning', message: `${inactiveRestaurants.length} restaurant${inactiveRestaurants.length > 1 ? 's' : ''} currently inactive` });
      }
      const noRevenueToday = restaurantList.filter((r: RestaurantSummary) => (r.todayRevenue || 0) === 0 && r.status === 'active');
      if (noRevenueToday.length > 0 && noRevenueToday.length < restaurantList.length) {
        alertList.push({ type: 'info', message: `${noRevenueToday.length} active restaurant${noRevenueToday.length > 1 ? 's' : ''} with no orders today` });
      }
      if (badgeCounts.notices > 0) {
        alertList.push({ type: 'info', message: `${badgeCounts.notices} unread notice(s)` });
      }
      if (badgeCounts.systemInquiry > 0) {
        alertList.push({ type: 'info', message: `${badgeCounts.systemInquiry} system inquiry(s) with new replies` });
      }
      if (badgeCounts.operationInquiry > 0) {
        alertList.push({ type: 'info', message: `${badgeCounts.operationInquiry} operation inquiry(s) with responses` });
      }
      if (alertList.length === 0) {
        alertList.push({ type: 'success', message: 'All systems running smoothly. No issues detected.' });
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

  // Bar chart data
  const barData = compareData.map((r: any) => ({
    name: (r.restaurantName || 'Unknown').length > 12
      ? (r.restaurantName || 'Unknown').substring(0, 12) + '...'
      : (r.restaurantName || 'Unknown'),
    revenue: parseFloat(r.revenue || 0),
    orders: r.orderCount || 0,
  }));

  // Pie chart data
  const pieData = compareData
    .filter((r: any) => parseFloat(r.revenue || 0) > 0)
    .map((r: any) => ({
      name: r.restaurantName || 'Unknown',
      value: parseFloat(r.revenue || 0),
    }));

  if (loading) {
    return (
      <>
        <Container>
          <Header>
            <HeaderTitle>Owner Dashboard</HeaderTitle>
          </Header>
          <LoadingContainer>Loading dashboard data...</LoadingContainer>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>Owner Dashboard</HeaderTitle>
        </Header>

        <Content>
          {/* KPI Cards */}
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{stats.totalRestaurants}</StatValue>
              <StatLabel>My Restaurants</StatLabel>
            </StatCard>
            <StatCard color="#059669">
              <StatValue>{formatCurrency(stats.todayRevenue, currency)}</StatValue>
              <StatLabel>Today's Revenue</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{formatCurrency(stats.monthRevenue, currency)}</StatValue>
              <StatLabel>Monthly Revenue</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{stats.monthOrders.toLocaleString()}</StatValue>
              <StatLabel>Monthly Orders</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.pendingInvoices}</StatValue>
              <StatLabel>Pending Invoices</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{formatCurrency(stats.avgOrderValue, currency)}</StatValue>
              <StatLabel>Avg Order Value</StatLabel>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue style={{ fontSize: stats.bestRestaurant.length > 15 ? '16px' : '24px' }}>
                {stats.bestRestaurant}
              </StatValue>
              <StatLabel>Best Restaurant</StatLabel>
            </StatCard>
            <StatCard color="#059669">
              <StatValue>{stats.activeRestaurants}</StatValue>
              <StatLabel>Active Restaurants</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* System Alerts */}
          <QuickAccess>
            <SectionTitle>System Alerts</SectionTitle>
            {alerts.map((alert, idx) => (
              <AlertBox key={idx} type={alert.type}>
                <AlertIcon>
                  {alert.type === 'warning' ? '⚠️' : alert.type === 'success' ? '✓' : 'ℹ'}
                </AlertIcon>
                {alert.message}
              </AlertBox>
            ))}
          </QuickAccess>

          {/* Quick Access */}
          <QuickAccess>
            <SectionTitle>Quick Access</SectionTitle>
            <QuickButtons>
              <QuickBtnDiv onClick={() => navigate('/pos/owner/restaurants')}>
                <QuickBtnIcon>◫</QuickBtnIcon>
                <QuickBtnTitle>My Restaurants</QuickBtnTitle>
                <QuickBtnDesc>Restaurant management</QuickBtnDesc>
              </QuickBtnDiv>
              <QuickBtnDiv onClick={() => navigate('/pos/owner/invoices')}>
                <QuickBtnIcon>◧</QuickBtnIcon>
                <QuickBtnTitle>Invoices</QuickBtnTitle>
                <QuickBtnDesc>View invoices</QuickBtnDesc>
              </QuickBtnDiv>
              <QuickBtnDiv onClick={() => navigate('/pos/owner/reports')}>
                <QuickBtnIcon>◩</QuickBtnIcon>
                <QuickBtnTitle>Reports</QuickBtnTitle>
                <QuickBtnDesc>Cross-restaurant analytics</QuickBtnDesc>
              </QuickBtnDiv>
              <QuickBtnDiv onClick={() => navigate('/pos/profile')}>
                <QuickBtnIcon>◉</QuickBtnIcon>
                <QuickBtnTitle>Settings</QuickBtnTitle>
                <QuickBtnDesc>Profile settings</QuickBtnDesc>
              </QuickBtnDiv>
            </QuickButtons>
          </QuickAccess>

          {/* Charts */}
          <ChartGrid>
            {/* Revenue Comparison Bar Chart */}
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Revenue Comparison</ChartTitle>
                <PeriodSelect value={chartPeriod} onChange={e => setChartPeriod(e.target.value)}>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </PeriodSelect>
              </ChartHeader>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
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
            </ChartCard>

            {/* Revenue Distribution Pie Chart */}
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Revenue Distribution</ChartTitle>
              </ChartHeader>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((_: any, index: number) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(value, currency)} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <LoadingContainer>No revenue data available</LoadingContainer>
              )}
              <div style={{ marginTop: 8 }}>
                {pieData.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 12, color: '#374151' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[idx % PIE_COLORS.length], flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </ChartGrid>

          {/* Restaurant Cards */}
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
    </>
  );
};

export default OwnerDashboardPage;
