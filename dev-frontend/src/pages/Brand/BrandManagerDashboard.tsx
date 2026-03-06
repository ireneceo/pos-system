import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

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

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
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

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
`;

const SummaryValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
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
  cursor: pointer;
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
      case 'active': return 'background: #D1FAE5; color: #065F46;';
      case 'trial': return 'background: #DBEAFE; color: #1E40AF;';
      case 'expired': return 'background: #FEE2E2; color: #991B1B;';
      case 'suspended': return 'background: #FEF3C7; color: #92400E;';
      default: return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
`;

// ============================================================================
// Component
// ============================================================================

interface RestaurantSummary {
  id: number;
  name: string;
  status: string;
  address: string;
  cuisine: string;
  planType: string;
  adminName: string;
  todayOrders: number;
  todayRevenue: number;
  monthlyRevenue: number;
}

const BrandManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<RestaurantSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState('');
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) setSelectedCurrency(defaultCurrency);
  }, [defaultCurrency]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const brandRes = await fetch('/api/brands', { headers });
        if (brandRes.ok) {
          const brands = await brandRes.json();
          if (brands.length > 0) {
            setBrandName(brands[0].name || '');
          }
        }

        const restRes = await fetch('/api/restaurants', { headers });
        if (restRes.ok) {
          const restData = await restRes.json();

          const todayStr = new Date().toISOString().split('T')[0];
          const ordersRes = await fetch('/api/orders', { headers });
          const ordersData = ordersRes.ok ? await ordersRes.json() : [];
          const orders = ordersData.data || ordersData || [];

          const transformed: RestaurantSummary[] = restData.map((r: any) => {
            const restaurantOrders = orders.filter((o: any) =>
              o.restaurant_id?.toString() === r.id?.toString()
            );
            const todayOrders = restaurantOrders.filter((o: any) =>
              o.order_date?.startsWith(todayStr)
            );
            const todayRevenue = todayOrders.reduce((sum: number, o: any) =>
              sum + parseFloat(o.total_amount || 0), 0
            );
            const monthStart = new Date();
            monthStart.setDate(1);
            const monthStr = monthStart.toISOString().split('T')[0];
            const monthlyOrders = restaurantOrders.filter((o: any) =>
              o.order_date && o.order_date >= monthStr
            );
            const monthlyRevenue = monthlyOrders.reduce((sum: number, o: any) =>
              sum + parseFloat(o.total_amount || 0), 0
            );

            return {
              id: r.id,
              name: r.name,
              status: r.status || 'active',
              address: r.address || 'No address',
              cuisine: r.cuisine || 'Various',
              planType: r.plan_type || r.planType || 'Basic Plan',
              adminName: r.admin_name || r.managerName || '-',
              todayOrders: todayOrders.length,
              todayRevenue,
              monthlyRevenue
            };
          });

          setRestaurants(transformed);
        }
      } catch (error) {
        console.error('Error fetching brand manager data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalTodayRevenue = restaurants.reduce((sum, r) => sum + r.todayRevenue, 0);
  const totalTodayOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);
  const totalMonthlyRevenue = restaurants.reduce((sum, r) => sum + r.monthlyRevenue, 0);
  const avgRevenuePerStore = totalRestaurants > 0 ? totalMonthlyRevenue / totalRestaurants : 0;

  if (loading) {
    return (
      <Container>
        <Header><Title>Brand Manager Dashboard</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard...</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Brand Manager Dashboard</Title>
        {brandName && (
          <Subtitle>
            <span>{brandName}</span>
          </Subtitle>
        )}
      </Header>

      <Content>
        {/* KPI Cards */}
        <DashboardStatsGrid>
          <DashboardStatCard color="#DC2626">
            <DashboardStatLabel>Total Restaurants</DashboardStatLabel>
            <DashboardStatValue>{totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#059669">
            <DashboardStatLabel>Active Restaurants</DashboardStatLabel>
            <DashboardStatValue>{activeRestaurants}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#F59E0B">
            <DashboardStatLabel>Today's Revenue</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(totalTodayRevenue, selectedCurrency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#2563EB">
            <DashboardStatLabel>Today's Orders</DashboardStatLabel>
            <DashboardStatValue>{totalTodayOrders}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#10B981">
            <DashboardStatLabel>Monthly Revenue</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(totalMonthlyRevenue, selectedCurrency)}</DashboardStatValue>
          </DashboardStatCard>
          <DashboardStatCard color="#7C3AED">
            <DashboardStatLabel>Avg Revenue / Store</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(avgRevenuePerStore, selectedCurrency)}</DashboardStatValue>
          </DashboardStatCard>
        </DashboardStatsGrid>

        {/* Summary + Quick Actions */}
        <MainGrid>
          <ChartContainer>
            <h3>Brand Summary</h3>
            <SummaryItem>
              <SummaryLabel>Monthly Revenue</SummaryLabel>
              <SummaryValue>{formatCurrency(totalMonthlyRevenue, selectedCurrency)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Avg Revenue / Store</SummaryLabel>
              <SummaryValue>{formatCurrency(avgRevenuePerStore, selectedCurrency)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Active Restaurants</SummaryLabel>
              <SummaryValue>{activeRestaurants} / {totalRestaurants}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Today's Total Orders</SummaryLabel>
              <SummaryValue>{totalTodayOrders}</SummaryValue>
            </SummaryItem>
          </ChartContainer>

          <AlertsPanel>
            <h3>Notifications</h3>
            <div style={{ padding: '16px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic' }}>
              No new notifications
            </div>
          </AlertsPanel>
        </MainGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <h3>Quick Actions</h3>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/pos/manager/restaurants')}>
              <div className="icon">◐</div>
              <div className="title">Restaurants</div>
              <div className="description">Restaurant management</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/invoices')}>
              <div className="icon">▦</div>
              <div className="title">Invoices</div>
              <div className="description">Invoice management</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/brand/general/reports')}>
              <div className="icon">◉</div>
              <div className="title">Reports</div>
              <div className="description">Performance analytics</div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/pos/manager/admins')}>
              <div className="icon">◆</div>
              <div className="title">Restaurant Admins</div>
              <div className="description">Admin management</div>
            </QuickActionCard>
          </QuickActionsGrid>
        </QuickActionsSection>

        {/* Restaurant Performance Table */}
        <RecentOrdersSection>
          <h3>Restaurant Performance</h3>
        </RecentOrdersSection>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Restaurant</Th>
                <Th>Admin</Th>
                <Th>Status</Th>
                <Th>Today's Orders</Th>
                <Th>Today's Revenue</Th>
                <Th>Monthly Revenue</Th>
              </Tr>
            </Thead>
            <Tbody>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <Tr key={restaurant.id} onClick={() => navigate(`/pos/brand/reports?restaurantId=${restaurant.id}&restaurantName=${encodeURIComponent(restaurant.name)}`)}>
                    <Td style={{ fontWeight: 600, color: '#0A2540' }}>{restaurant.name}</Td>
                    <Td>{restaurant.adminName}</Td>
                    <Td>
                      <StatusBadge status={restaurant.status}>{restaurant.status}</StatusBadge>
                    </Td>
                    <Td>{restaurant.todayOrders}</Td>
                    <Td>{formatCurrency(restaurant.todayRevenue, selectedCurrency)}</Td>
                    <Td style={{ fontWeight: 600 }}>{formatCurrency(restaurant.monthlyRevenue, selectedCurrency)}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                    No restaurants registered yet
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

export default BrandManagerDashboard;
