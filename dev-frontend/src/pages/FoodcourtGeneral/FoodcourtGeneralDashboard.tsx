import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    border-color: #FDBA74;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const QuickBtnIcon = styled.div`
  color: #EA580C;
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
  &:focus { outline: none; border-color: #EA580C; }
`;

const TableCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Td = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
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
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`;

const PIE_COLORS = ['#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA', '#FFF7ED', '#FFFBEB'];

// ============================================================================
// Component
// ============================================================================

const FoodcourtGeneralDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { defaultCurrency } = useBrandCurrency();
  const [currency, setCurrency] = useState('RM');
  const [loading, setLoading] = useState(true);
  const [foodcourtId, setFoodcourtId] = useState<number | null>(null);
  const [chartPeriod, setChartPeriod] = useState('month');

  const [stats, setStats] = useState({
    totalRestaurants: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    avgRevenuePerTenant: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    activePlans: 0,
    totalManagers: 0,
  });

  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<Array<{ type: 'warning' | 'info' | 'success'; message: string }>>([]);
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
    } catch (e) { /* silent */ }
  };

  useEffect(() => {
    if (foodcourtId) fetchTrendData(foodcourtId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartPeriod, foodcourtId]);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getHeaders();

      // 1. Get foodcourt ID
      const foodcourtsRes = await fetch('/api/foodcourts', { headers });
      const foodcourtsData = await foodcourtsRes.json();
      const foodcourts = foodcourtsData.data || foodcourtsData || [];
      const foodcourt = foodcourts[0];
      if (!foodcourt) { setLoading(false); return; }
      setFoodcourtId(foodcourt.id);

      if (foodcourt.restaurants && foodcourt.restaurants.length > 0 && foodcourt.restaurants[0].currency) {
        setCurrency(foodcourt.restaurants[0].currency);
      }

      // 2. Fetch all data in parallel
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const today = now.toISOString().split('T')[0];

      const [revenueRes, plansRes, invoicesRes, managersRes, subsRes] = await Promise.all([
        fetch(`/api/foodcourts/${foodcourt.id}/revenue?start_date=${monthStart}&end_date=${today}`, { headers }),
        fetch(`/api/foodcourts/${foodcourt.id}/plans`, { headers }),
        fetch('/api/invoices', { headers }),
        fetch('/api/users?role=Foodcourt Manager', { headers }),
        fetch(`/api/foodcourts/${foodcourt.id}/subscriptions`, { headers }),
      ]);

      const [revenueData, plansData, invoicesData, managersData, subsData] = await Promise.all([
        revenueRes.json(),
        plansRes.json(),
        invoicesRes.json(),
        managersRes.json(),
        subsRes.json(),
      ]);

      const revenue = revenueData.data || revenueData;
      const totalRevenue = parseFloat(revenue.total_revenue || 0);
      const restaurantRevenues = revenue.restaurants || [];
      const totalOrders = restaurantRevenues.reduce((sum: number, r: any) => sum + (r.order_count || 0), 0);
      setRestaurants(restaurantRevenues);

      const plans = plansData.data || plansData || [];
      const activePlans = plans.filter((p: any) => p.is_active !== false).length;

      const invoices = invoicesData.data || invoicesData || [];
      const pendingInvoices = invoices.filter((inv: any) =>
        inv.status === 'pending_payment' || inv.status === 'sent'
      ).length;
      const overdueInvoices = invoices.filter((inv: any) => inv.status === 'overdue').length;

      const managers = Array.isArray(managersData) ? managersData : (managersData.data || []);

      const subs = subsData.data || subsData || [];
      setSubscriptions(subs);

      setStats({
        totalRestaurants: restaurantRevenues.length,
        monthlyRevenue: totalRevenue,
        monthlyOrders: totalOrders,
        avgRevenuePerTenant: restaurantRevenues.length > 0 ? totalRevenue / restaurantRevenues.length : 0,
        pendingInvoices,
        overdueInvoices,
        activePlans,
        totalManagers: managers.length,
      });

      const alertList: Array<{ type: 'warning' | 'info' | 'success'; message: string }> = [];
      if (overdueInvoices > 0) {
        alertList.push({ type: 'warning', message: `${overdueInvoices} overdue invoice${overdueInvoices > 1 ? 's' : ''} need attention` });
      }
      if (pendingInvoices > 0) {
        alertList.push({ type: 'info', message: `${pendingInvoices} invoice${pendingInvoices > 1 ? 's' : ''} pending payment` });
      }
      const noOrderTenants = restaurantRevenues.filter((r: any) => (r.order_count || 0) === 0);
      if (noOrderTenants.length > 0) {
        alertList.push({ type: 'info', message: `${noOrderTenants.length} tenant${noOrderTenants.length > 1 ? 's' : ''} with no orders this month` });
      }
      if (badgeCounts.notices > 0) {
        alertList.push({ type: 'info', message: `${badgeCounts.notices} unread notice(s)` });
      }
      if (badgeCounts.systemInquiry > 0) {
        alertList.push({ type: 'info', message: `${badgeCounts.systemInquiry} system inquiry(s) with new replies` });
      }
      if (badgeCounts.operationInquiry > 0) {
        alertList.push({ type: 'info', message: `${badgeCounts.operationInquiry} open operation inquiry(s)` });
      }
      if (alertList.length === 0) {
        alertList.push({ type: 'success', message: 'All systems running smoothly. No issues detected.' });
      }
      setAlerts(alertList);

      fetchTrendData(foodcourt.id);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendData = async (fcId: number) => {
    try {
      const headers = getHeaders();
      const res = await fetch(`/api/foodcourts/${fcId}/sales-trend?period=${chartPeriod}`, { headers });
      const data = await res.json();
      setTrendData(data.data || []);
    } catch (error) {
      console.error('Error fetching trend data:', error);
    }
  };

  const pieData = restaurants
    .filter((r: any) => parseFloat(r.revenue || 0) > 0)
    .map((r: any) => ({
      name: r.restaurant_name || r.name || 'Unknown',
      value: parseFloat(r.revenue || 0)
    }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 7);

  const topSubscriptions = [...subscriptions]
    .sort((a: any, b: any) => (b.current_month?.revenue || 0) - (a.current_month?.revenue || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <>
        <Container>
          <Header>
            <HeaderTitle>Foodcourt Dashboard</HeaderTitle>
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
          <HeaderTitle>Foodcourt Dashboard</HeaderTitle>
        </Header>

        <Content>
          {/* KPI Cards */}
          <StatsGrid>
            <StatCard color="#EA580C">
              <StatValue>{stats.totalRestaurants}</StatValue>
              <StatLabel>Tenant Restaurants</StatLabel>
            </StatCard>
            <StatCard color="#059669">
              <StatValue>{formatCurrency(stats.monthlyRevenue, currency)}</StatValue>
              <StatLabel>Monthly Revenue</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{stats.monthlyOrders.toLocaleString()}</StatValue>
              <StatLabel>Monthly Orders</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{formatCurrency(stats.avgRevenuePerTenant, currency)}</StatValue>
              <StatLabel>Avg Revenue / Tenant</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.pendingInvoices}</StatValue>
              <StatLabel>Pending Invoices</StatLabel>
            </StatCard>
            <StatCard color={stats.overdueInvoices > 0 ? '#EF4444' : '#059669'}>
              <StatValue>{stats.overdueInvoices}</StatValue>
              <StatLabel>Overdue Invoices</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.activePlans}</StatValue>
              <StatLabel>Active Plans</StatLabel>
            </StatCard>
            <StatCard color="#6366F1">
              <StatValue>{stats.totalManagers}</StatValue>
              <StatLabel>Foodcourt Managers</StatLabel>
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
              <QuickBtnDiv onClick={() => navigate('/pos/foodcourt/general/management')}>
                <QuickBtnIcon>◫</QuickBtnIcon>
                <QuickBtnTitle>Manage Tenants</QuickBtnTitle>
                <QuickBtnDesc>Tenant management</QuickBtnDesc>
              </QuickBtnDiv>
              <QuickBtnDiv onClick={() => navigate('/pos/foodcourt/invoices')}>
                <QuickBtnIcon>◧</QuickBtnIcon>
                <QuickBtnTitle>Invoices</QuickBtnTitle>
                <QuickBtnDesc>Invoice management</QuickBtnDesc>
              </QuickBtnDiv>
              <QuickBtnDiv onClick={() => navigate('/pos/foodcourt/plans')}>
                <QuickBtnIcon>◨</QuickBtnIcon>
                <QuickBtnTitle>Subscription Plans</QuickBtnTitle>
                <QuickBtnDesc>Plan configuration</QuickBtnDesc>
              </QuickBtnDiv>
              <QuickBtnDiv onClick={() => navigate('/pos/foodcourt/general/stats')}>
                <QuickBtnIcon>◩</QuickBtnIcon>
                <QuickBtnTitle>Reports</QuickBtnTitle>
                <QuickBtnDesc>Performance analytics</QuickBtnDesc>
              </QuickBtnDiv>
            </QuickButtons>
          </QuickAccess>

          {/* Charts */}
          <ChartGrid>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Revenue Trend</ChartTitle>
                <PeriodSelect value={chartPeriod} onChange={e => setChartPeriod(e.target.value)}>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </PeriodSelect>
              </ChartHeader>
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7C93' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#6B7C93' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                    <Tooltip
                      formatter={(value: any) => [formatCurrency(value, currency), 'Revenue']}
                      labelStyle={{ color: '#0A2540', fontWeight: 600 }}
                      contentStyle={{ borderRadius: 8, border: '1px solid #E6EBF1' }}
                    />
                    <Line type="monotone" dataKey="sales" stroke="#EA580C" strokeWidth={2} dot={{ r: 4, fill: '#EA580C' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <LoadingContainer>No sales data for this period</LoadingContainer>
              )}
            </ChartCard>

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

          {/* Tenant Performance Table */}
          <TableCard>
            <ChartHeader>
              <SectionTitle style={{ margin: 0 }}>Tenant Performance</SectionTitle>
              <span style={{ fontSize: 12, color: '#6B7C93', cursor: 'pointer' }} onClick={() => navigate('/pos/foodcourt-general/restaurants')}>
                View All →
              </span>
            </ChartHeader>
            <Table>
              <thead>
                <tr>
                  <Th>Tenant</Th>
                  <Th>Plan</Th>
                  <Th>Monthly Revenue</Th>
                  <Th>Orders</Th>
                  <Th>Estimated Charges</Th>
                  <Th>Invoice Status</Th>
                </tr>
              </thead>
              <tbody>
                {topSubscriptions.length > 0 ? (
                  topSubscriptions.map((sub: any, idx: number) => (
                    <tr key={idx}>
                      <Td style={{ fontWeight: 600 }}>{sub.restaurant_name || '-'}</Td>
                      <Td>{sub.plan?.name || 'No Plan'}</Td>
                      <Td>{formatCurrency(sub.current_month?.revenue || 0, currency)}</Td>
                      <Td>{sub.current_month?.order_count || 0}</Td>
                      <Td>{formatCurrency(sub.current_month?.estimated_charges || 0, currency)}</Td>
                      <Td>
                        <StatusBadge status={sub.latest_invoice?.status || 'none'}>
                          {(sub.latest_invoice?.status || 'N/A').replace(/_/g, ' ')}
                        </StatusBadge>
                      </Td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Td colSpan={6} style={{ textAlign: 'center', color: '#6B7280' }}>
                      No tenant data available
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableCard>
        </Content>
      </Container>
    </>
  );
};

export default FoodcourtGeneralDashboard;
