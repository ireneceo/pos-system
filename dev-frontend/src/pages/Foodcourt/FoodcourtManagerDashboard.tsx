import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

interface TenantSummary {
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

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
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

const Subtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
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

const QuickStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const QuickStatLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
`;

const QuickStatValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const TenantItem = styled.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #059669;
    background: #ECFDF5;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TenantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const TenantName = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#059669';
      case 'trial': return '#2563EB';
      case 'expired': return '#DC2626';
      case 'suspended': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const TenantInfo = styled.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const QuickAction = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #059669;
    background: #ECFDF5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15);
  }
`;

const QuickActionIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #059669;
`;

const QuickActionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const QuickActionDesc = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const FoodcourtManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, handleTabChange] = useTabParam('overview');
  const [tenants, setTenants] = useState<TenantSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [foodcourtName, setFoodcourtName] = useState('');
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

        // Fetch foodcourt info
        const fcRes = await fetch('/api/foodcourts', { headers });
        if (fcRes.ok) {
          const foodcourts = await fcRes.json();
          const fcData = Array.isArray(foodcourts) ? foodcourts : (foodcourts.data || []);
          if (fcData.length > 0) {
            setFoodcourtName(fcData[0].name || '');
          }
        }

        // Fetch restaurants (API filters by user role automatically)
        const restRes = await fetch('/api/restaurants', { headers });
        if (restRes.ok) {
          const restData = await restRes.json();

          // Fetch orders for today's stats
          const todayStr = new Date().toISOString().split('T')[0];
          const ordersRes = await fetch('/api/orders', { headers });
          const ordersData = ordersRes.ok ? await ordersRes.json() : [];
          const orders = ordersData.data || ordersData || [];

          const transformed: TenantSummary[] = restData.map((r: any) => {
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

          setTenants(transformed);
        }
      } catch (error) {
        console.error('Error fetching foodcourt manager data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(r => r.status === 'active').length;
  const totalTodayRevenue = tenants.reduce((sum, r) => sum + r.todayRevenue, 0);
  const totalTodayOrders = tenants.reduce((sum, r) => sum + r.todayOrders, 0);
  const totalMonthlyRevenue = tenants.reduce((sum, r) => sum + r.monthlyRevenue, 0);
  const occupancyRate = totalTenants > 0 ? Math.round((activeTenants / totalTenants) * 100) : 0;

  if (loading) {
    return (
      <>
        <Container>
          <Header><Title>Foodcourt Manager Dashboard</Title></Header>
          <Content>
            <EmptyState>Loading dashboard data...</EmptyState>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>Foodcourt Manager Dashboard</Title>
            {foodcourtName && <Subtitle>{foodcourtName}</Subtitle>}
          </div>
        </Header>

        <Content>
          <Tabs>
            <Tab active={activeTab === 'overview'} onClick={() => handleTabChange('overview')}>
              Overview
            </Tab>
            <Tab active={activeTab === 'tenants'} onClick={() => handleTabChange('tenants')}>
              Tenants <Badge count={totalTenants} showZero />
            </Tab>
          </Tabs>

          {activeTab === 'overview' && (
            <>
              <DashboardStatsGrid>
                <DashboardStatCard>
                  <DashboardStatValue>{totalTenants}</DashboardStatValue>
                  <DashboardStatLabel>Total Tenants</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{activeTenants}</DashboardStatValue>
                  <DashboardStatLabel>Active Tenants</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{formatCurrency(totalTodayRevenue, selectedCurrency)}</DashboardStatValue>
                  <DashboardStatLabel>Today's Revenue</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{occupancyRate}%</DashboardStatValue>
                  <DashboardStatLabel>Occupancy Rate</DashboardStatLabel>
                </DashboardStatCard>
              </DashboardStatsGrid>

              <QuickActionsGrid>
                <QuickAction onClick={() => navigate('/pos/manager/restaurants')}>
                  <QuickActionIcon>&#9881;</QuickActionIcon>
                  <QuickActionTitle>Manage Tenants</QuickActionTitle>
                  <QuickActionDesc>Add, edit, view tenant restaurants</QuickActionDesc>
                </QuickAction>
                <QuickAction onClick={() => navigate('/pos/foodcourt/rent-management')}>
                  <QuickActionIcon>&#9776;</QuickActionIcon>
                  <QuickActionTitle>Rent Management</QuickActionTitle>
                  <QuickActionDesc>Rental billing and tracking</QuickActionDesc>
                </QuickAction>
                <QuickAction onClick={() => navigate('/pos/foodcourt/tenant-support')}>
                  <QuickActionIcon>&#9993;</QuickActionIcon>
                  <QuickActionTitle>Support Tickets</QuickActionTitle>
                  <QuickActionDesc>Tenant support requests</QuickActionDesc>
                </QuickAction>
                <QuickAction onClick={() => navigate('/pos/manager/subscriptions')}>
                  <QuickActionIcon>&#9733;</QuickActionIcon>
                  <QuickActionTitle>Subscriptions</QuickActionTitle>
                  <QuickActionDesc>Manage subscription plans</QuickActionDesc>
                </QuickAction>
              </QuickActionsGrid>

              <MainGrid>
                <Card>
                  <h3>Tenant Performance</h3>
                  {tenants.length === 0 ? (
                    <EmptyState>No tenants registered yet. Add your first tenant restaurant to see performance data.</EmptyState>
                  ) : (
                    tenants.slice(0, 5).map((tenant) => (
                      <TenantItem
                        key={tenant.id}
                        onClick={() => navigate(`/pos/manager/restaurants`)}
                      >
                        <TenantHeader>
                          <TenantName>{tenant.name}</TenantName>
                          <StatusBadge status={tenant.status}>
                            {tenant.status}
                          </StatusBadge>
                        </TenantHeader>
                        <TenantInfo>
                          <span>{tenant.cuisine} - {tenant.adminName}</span>
                          <span>Today: {formatCurrency(tenant.todayRevenue, selectedCurrency)} ({tenant.todayOrders} orders)</span>
                        </TenantInfo>
                      </TenantItem>
                    ))
                  )}
                </Card>

                <Card>
                  <h3>Foodcourt Summary</h3>
                  <QuickStatItem>
                    <QuickStatLabel>Monthly Revenue</QuickStatLabel>
                    <QuickStatValue>{formatCurrency(totalMonthlyRevenue, selectedCurrency)}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Occupancy Rate</QuickStatLabel>
                    <QuickStatValue>{occupancyRate}%</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Active Tenants</QuickStatLabel>
                    <QuickStatValue>{activeTenants} / {totalTenants}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Today's Total Orders</QuickStatLabel>
                    <QuickStatValue>{totalTodayOrders}</QuickStatValue>
                  </QuickStatItem>
                </Card>
              </MainGrid>
            </>
          )}

          {activeTab === 'tenants' && (
            <Card>
              <h3>All Tenants</h3>
              {tenants.length === 0 ? (
                <EmptyState>
                  No tenants found. Click "Manage Tenants" to add your first tenant restaurant.
                </EmptyState>
              ) : (
                tenants.map((tenant) => (
                  <TenantItem
                    key={tenant.id}
                    onClick={() => navigate(`/pos/manager/reports?tab=sales&restaurantId=${tenant.id}&restaurantName=${encodeURIComponent(tenant.name)}`)}
                  >
                    <TenantHeader>
                      <TenantName>{tenant.name}</TenantName>
                      <StatusBadge status={tenant.status}>
                        {tenant.status}
                      </StatusBadge>
                    </TenantHeader>
                    <TenantInfo>
                      <span>{tenant.address}</span>
                      <span>{tenant.planType}</span>
                    </TenantInfo>
                    <TenantInfo style={{ marginTop: '4px' }}>
                      <span>Admin: {tenant.adminName} - {tenant.cuisine}</span>
                      <span>Monthly: {formatCurrency(tenant.monthlyRevenue, selectedCurrency)}</span>
                    </TenantInfo>
                  </TenantItem>
                ))
              )}
            </Card>
          )}
        </Content>
      </Container>
    </>
  );
};

export default FoodcourtManagerDashboard;
