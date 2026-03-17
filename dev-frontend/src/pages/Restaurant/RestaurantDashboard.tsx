import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { SetupGuide } from '../../components/Common';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { useSetupStatus } from '../../hooks/useSetupStatus';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';

interface DashboardData {
  restaurant: {
    id: string | number;
    name: string;
    planType: string;
    status: string;
    subscriptionStart?: string;
    subscriptionEnd?: string;
    trialEndDate?: string;
  };
  today: {
    orders: number;
    revenue: number;
    completedOrders: number;
    pendingOrders: number;
  };
  monthly: {
    orders: number;
    revenue: number;
    completedOrders: number;
  };
  yearly: {
    orders: number;
    revenue: number;
    completedOrders: number;
  };
  total: {
    orders: number;
    revenue: number;
    completedOrders: number;
  };
  billing: {
    unpaidInvoices: number;
    totalUnpaidAmount: number;
    nextDueDate: string | null;
  };
  recentOrders: any[];
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

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`;

const SubscriptionBadge = styled.span<{ variant: 'trial' | 'active' | 'expiring' | 'expired' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
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
    }
  }}
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

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
`;

const Alert = styled.div<{ type: 'warning' | 'error' | 'info' }>`
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
      case 'info': return '#EFF6FF';
      default: return '#F8FAFC';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'error': return '#FECACA';
      case 'warning': return '#FDE68A';
      case 'info': return '#BFDBFE';
      default: return '#E6EBF1';
    }
  }};
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;


const AlertContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const AlertTitle = styled.div<{ type: 'warning' | 'error' | 'info' }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => {
    switch(props.type) {
      case 'error': return '#DC2626';
      case 'warning': return '#D97706';
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

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`;

const OrderNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const CustomerInfo = styled.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`;

const ItemsList = styled.div`
  line-height: 1.6;
`;

const ItemWithOptions = styled.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemQuantity = styled.span`
  color: #6B7280;
  margin-right: 8px;
`;

const ItemOptionsInline = styled.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`;

const TimeInfo = styled.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`;

const Amount = styled.div`
  font-weight: 600;
  color: #0A2540;
`;

const PaymentMethod = styled.div<{ isPending?: boolean }>`
  color: ${props => props.isPending ? '#FF6B6B' : '#6B7280'};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${props => props.isPending ? '500' : 'normal'};
`;

const Badge = styled.span<{ variant: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${props => {
    switch(props.variant) {
      case 'awaiting_payment':
        return 'background: #FEF3C7; color: #F59E0B;'; // Yellow/Orange for awaiting payment (Outstanding)
      case 'pending':
        return 'background: #FEF3C7; color: #92400E;'; // Yellow for pending (kitchen)
      case 'preparing':
        return 'background: #DBEAFE; color: #1E40AF;'; // Blue for preparing
      case 'ready':
        return 'background: #D1FAE5; color: #065F46;'; // Green for ready
      case 'served':
        return 'background: #D1FAE5; color: #065F46;'; // Green for served
      case 'completed':
        return 'background: #E5E7EB; color: #374151;'; // Gray for completed
      case 'cancelled':
        return 'background: #FEE2E2; color: #991B1B;'; // Red for cancelled
      default:
        return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
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

    .icon {
      color: #0A2540;
    }

    .title {
      color: #0A2540;
    }
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

interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
}

const RestaurantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { paymentSettings } = useStore();
  const restaurantId = user?.restaurantId || user?.id || '';
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year'>('week');
  const [salesChartData, setSalesChartData] = useState<SalesChartData[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });
  const { items: setupItems } = useSetupStatus({ role: user?.role || '', restaurantId });

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  useEffect(() => {
    const fetchBadges = async () => {
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
    fetchBadges();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log('🔍 Fetching dashboard data from DATABASE for user:', user);
      console.log('🔍 User ID:', user?.id);
      console.log('🔍 Restaurant ID:', user?.restaurantId);

      if (!user?.restaurantId) {
        console.log('❌ No restaurant ID found for this user');
        setLoading(false);
        return;
      }

      try {
        // Get authentication token
        const token = localStorage.getItem('auth_token');
        if (!token) {
          console.error('❌ No auth token found');
          setLoading(false);
          return;
        }

        // Fetch from database API using restaurantId instead of user.id
        const response = await fetch(`/api/dashboard/restaurant/${user.restaurantId}/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('📡 Dashboard API response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API error:', response.status, errorText);
          setLoading(false);
          return;
        }

        const result = await response.json();
        console.log('✅ Dashboard data from DB:', result);

        const data = result.data || result;

        console.log('📊 Today orders:', data.today.orders);
        console.log('📊 Today revenue:', data.today.revenue);
        console.log('📊 Monthly orders:', data.monthly.orders);
        console.log('📊 Monthly revenue:', data.monthly.revenue);
        console.log('📊 Recent orders:', data.recentOrders.length);

        setDashboardData(data);
      } catch (error) {
        console.error('❌ Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  useEffect(() => {
    const fetchSalesChart = async () => {
      const restaurantId = user?.restaurantId || user?.id;
      if (!restaurantId) return;

      try {
        // Get authentication token
        const token = localStorage.getItem('auth_token');
        if (!token) {
          console.error('❌ No auth token found for sales chart');
          return;
        }

        const response = await fetch(`/api/dashboard/restaurant/${restaurantId}/sales-chart?period=${timePeriod}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          setSalesChartData(result.data || []);
        } else {
          console.error('❌ Sales chart API error:', response.status);
        }
      } catch (error) {
        console.error('❌ Error fetching sales chart:', error);
      }
    };

    if (user) {
      fetchSalesChart();
    }
  }, [user, timePeriod]);

  if (loading) {
    return (
      <>
        <Container>
          <Header>
            <Title>Restaurant Dashboard</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              Loading dashboard...
            </div>
          </Content>
        </Container>
      </>
    );
  }

  if (!dashboardData) {
    return (
      <>
        <Container>
          <Header>
            <Title>Restaurant Dashboard</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              No data available
            </div>
          </Content>
        </Container>
      </>
    );
  }

  const { restaurant, today, monthly, yearly, total, billing, recentOrders } = dashboardData;

  return (
    <>
      <Container>
        <Header>
          <Title>Restaurant Dashboard</Title>
          <Subtitle>
            <span>{restaurant.name} • {restaurant.planType}</span>
            {(() => {
              const endDate = restaurant.subscriptionEnd ? new Date(restaurant.subscriptionEnd) : null;
              const now = new Date();
              if (restaurant.status === 'trial') {
                const trialEnd = restaurant.trialEndDate ? new Date(restaurant.trialEndDate) : endDate;
                if (trialEnd) {
                  const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  return <SubscriptionBadge variant="trial">Trial • {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}</SubscriptionBadge>;
                }
                return <SubscriptionBadge variant="trial">Trial</SubscriptionBadge>;
              }
              if (endDate) {
                const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                if (daysLeft <= 0) return <SubscriptionBadge variant="expired">Subscription expired</SubscriptionBadge>;
                if (daysLeft <= 30) return <SubscriptionBadge variant="expiring">{daysLeft} days left</SubscriptionBadge>;
                return <SubscriptionBadge variant="active">{daysLeft} days left</SubscriptionBadge>;
              }
              return null;
            })()}
          </Subtitle>
        </Header>

        <Content>
          {setupItems.length > 0 && (
            <SetupGuide items={setupItems} entityId={restaurantId} />
          )}

          <DashboardStatsGrid>
            <DashboardStatCard color="#F59E0B">
              <DashboardStatLabel>Today's Sales</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(today.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#2563EB">
              <DashboardStatLabel>Today's Orders</DashboardStatLabel>
              <DashboardStatValue>{today.orders || 0}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#10B981">
              <DashboardStatLabel>Monthly Revenue</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(monthly.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#7C3AED">
              <DashboardStatLabel>Monthly Orders</DashboardStatLabel>
              <DashboardStatValue>{monthly.orders || 0}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#059669">
              <DashboardStatLabel>This Year Revenue</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(yearly.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#6366F1">
              <DashboardStatLabel>This Year Orders</DashboardStatLabel>
              <DashboardStatValue>{yearly.orders || 0}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#8B5CF6">
              <DashboardStatLabel>Total Revenue</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(total.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#EF4444">
              <DashboardStatLabel>Total Orders</DashboardStatLabel>
              <DashboardStatValue>{total.orders || 0}</DashboardStatValue>
            </DashboardStatCard>
          </DashboardStatsGrid>

          <MainGrid>
            <ChartContainer>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Sales & Orders Overview</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setTimePeriod('week')}
                    style={{
                      padding: '6px 12px',
                      background: timePeriod === 'week' ? '#635BFF' : 'transparent',
                      color: timePeriod === 'week' ? 'white' : '#6B7280',
                      border: '1px solid #E6EBF1',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setTimePeriod('month')}
                    style={{
                      padding: '6px 12px',
                      background: timePeriod === 'month' ? '#635BFF' : 'transparent',
                      color: timePeriod === 'month' ? 'white' : '#6B7280',
                      border: '1px solid #E6EBF1',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setTimePeriod('year')}
                    style={{
                      padding: '6px 12px',
                      background: timePeriod === 'year' ? '#635BFF' : 'transparent',
                      color: timePeriod === 'year' ? 'white' : '#6B7280',
                      border: '1px solid #E6EBF1',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Year
                  </button>
                </div>
              </div>

              {salesChartData.length > 0 ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '120px', gap: '8px', marginBottom: '16px' }}>
                    {salesChartData.map((data, index) => {
                      const maxRevenue = Math.max(...salesChartData.map(d => d.revenue), 1);
                      const dateObj = new Date(data.date);

                      return (
                        <div key={data.date} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          flex: 1
                        }}>
                          <div
                            style={{
                              width: '100%',
                              maxWidth: '40px',
                              height: `${Math.max(20, (data.revenue / maxRevenue) * 80)}px`,
                              background: data.revenue === 0 ? '#E5E7EB' : '#635BFF',
                              borderRadius: '4px 4px 0 0',
                              marginBottom: '8px',
                              cursor: 'pointer',
                              transition: 'opacity 0.2s'
                            }}
                            title={`${dateObj.toLocaleDateString()}: RM ${data.revenue.toLocaleString()}`}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                          />
                          <div style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center' }}>
                            {timePeriod === 'week'
                              ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : timePeriod === 'month'
                              ? `Week ${index + 1}`
                              : dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                            }
                          </div>
                          <div style={{ fontSize: '10px', color: '#6B7280', textAlign: 'center' }}>
                            {formatCurrency(data.revenue, selectedCurrency)}
                          </div>
                          <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'center' }}>
                            {data.orders || 0} ord
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>
                      {timePeriod === 'week' ? 'Last 7 days' : timePeriod === 'month' ? 'Last 12 weeks' : 'Last 12 months'}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669' }}>
                      {(() => {
                        const firstPeriod = salesChartData.find(d => d.revenue > 0);
                        const lastPeriod = salesChartData[salesChartData.length - 1];
                        if (firstPeriod && lastPeriod && firstPeriod.revenue > 0) {
                          const growth = ((lastPeriod.revenue - firstPeriod.revenue) / firstPeriod.revenue) * 100;
                          return growth > 0 ? `↗ +${growth.toFixed(1)}%` : growth < 0 ? `↘ ${growth.toFixed(1)}%` : '→ 0%';
                        }
                        return '→ No change';
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '12px', minHeight: '160px' }}>
                  <div style={{ textAlign: 'center', paddingTop: '40px', color: '#6B7280' }}>
                    <p>Total Revenue: {formatCurrency(monthly.revenue, selectedCurrency)}</p>
                    <p>Loading chart data...</p>
                  </div>
                </div>
              )}
            </ChartContainer>

            <AlertsPanel>
              <h3>Notifications</h3>

              <AlertsList>
                {(today.pendingOrders || 0) > 0 && (
                  <Alert type="warning" onClick={() => navigate(`/restaurant/${restaurantId}/live-orders`)}>
                    <AlertContent>
                      <AlertTitle type="warning">Pending Orders</AlertTitle>
                      <AlertDescription>{today.pendingOrders} order(s) waiting to be processed</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {(billing.unpaidInvoices || 0) > 0 && (
                  <Alert type="warning" onClick={() => navigate(`/restaurant/${restaurantId}/invoices`)}>
                    <AlertContent>
                      <AlertTitle type="warning">Unpaid Invoices</AlertTitle>
                      <AlertDescription>{billing.unpaidInvoices} invoice(s) • {formatCurrency(billing.totalUnpaidAmount || 0, selectedCurrency)} due</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {badgeCounts.notices > 0 && (
                  <Alert type="info" onClick={() => navigate(`/restaurant/${restaurantId}/notices`)}>
                    <AlertContent>
                      <AlertTitle type="info">Unread Notices</AlertTitle>
                      <AlertDescription>{badgeCounts.notices} unread notice(s)</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {badgeCounts.systemInquiry > 0 && (
                  <Alert type="info" onClick={() => navigate(`/restaurant/${restaurantId}/support`)}>
                    <AlertContent>
                      <AlertTitle type="info">System Inquiry Updates</AlertTitle>
                      <AlertDescription>{badgeCounts.systemInquiry} inquiry(s) with new replies</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {badgeCounts.operationInquiry > 0 && (
                  <Alert type="info" onClick={() => navigate(`/restaurant/${restaurantId}/operation-inquiry`)}>
                    <AlertContent>
                      <AlertTitle type="info">Operation Inquiry Updates</AlertTitle>
                      <AlertDescription>{badgeCounts.operationInquiry} inquiry(s) with responses</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {(today.pendingOrders || 0) === 0 && (billing.unpaidInvoices || 0) === 0 && badgeCounts.notices === 0 && badgeCounts.systemInquiry === 0 && badgeCounts.operationInquiry === 0 && (
                  <div style={{
                    padding: '16px',
                    textAlign: 'center',
                    color: '#9CA3AF',
                    fontSize: '13px',
                    fontStyle: 'italic'
                  }}>
                    No new notifications
                  </div>
                )}
              </AlertsList>
            </AlertsPanel>
          </MainGrid>

          <QuickActionsSection>
            <h3>Quick Actions</h3>
            <QuickActionsGrid>
              <QuickActionCard onClick={() => window.open(`/restaurant/${restaurantId}/pos-terminal`, '_blank')}>
                <div className="icon">▦</div>
                <div className="title">POS Terminal</div>
                <div className="description">Process orders</div>
              </QuickActionCard>

              <QuickActionCard onClick={() => window.open(`/restaurant/${restaurantId}/kitchen`, '_blank')}>
                <div className="icon">◐</div>
                <div className="title">Kitchen Display</div>
                <div className="description">View kitchen orders</div>
              </QuickActionCard>

              <QuickActionCard onClick={() => navigate(`/restaurant/${restaurantId}/live-orders`)}>
                <div className="icon">◉</div>
                <div className="title">Live Orders</div>
                <div className="description">Monitor all orders</div>
              </QuickActionCard>

              <QuickActionCard onClick={() => navigate(`/restaurant/${restaurantId}/menu`)}>
                <div className="icon">≡</div>
                <div className="title">Menu</div>
                <div className="description">Edit menu items</div>
              </QuickActionCard>
            </QuickActionsGrid>
          </QuickActionsSection>

          <RecentOrdersSection>
            <h3>Recent Orders</h3>
          </RecentOrdersSection>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Order</Th>
                  <Th>Items</Th>
                  <Th>Status</Th>
                  <Th>Time</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentOrders.length === 0 ? (
                  <Tr>
                    <Td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                      No recent orders
                    </Td>
                  </Tr>
                ) : (
                  recentOrders.map(order => (
                    <Tr key={order.id}>
                      <Td>
                        <OrderNumber>
                          {order.order_number}
                        </OrderNumber>
                        <CustomerInfo>
                          {order.customer_name || 'Guest'}<br />
                          {order.customer_phone || 'N/A'}
                          {order.table_number && (
                            <><br />Table: {order.table_number}</>
                          )}
                        </CustomerInfo>
                      </Td>
                      <Td>
                        <ItemsList>
                          {(() => {
                            // 안전하게 items 배열 추출
                            const items = order.items || order.order_items || [];
                            if (!Array.isArray(items) || items.length === 0) {
                              return <span style={{ color: '#6B7280', fontSize: '13px' }}>No items</span>;
                            }

                            return items.map((item: any, index: number) => {
                              if (!item) return null;
                              return (
                                <ItemWithOptions key={index}>
                                  <div>
                                    <ItemQuantity>{item.quantity || 1}x</ItemQuantity>
                                    {item.name || item.menu_item_name || 'Unknown Item'}
                                  </div>
                                  {item.options && item.options.length > 0 && (
                                    <ItemOptionsInline>
                                      {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                                    </ItemOptionsInline>
                                  )}
                                </ItemWithOptions>
                              );
                            });
                          })()}
                        </ItemsList>
                      </Td>
                      <Td>
                        <Badge variant={order.status}>
                          {(() => {
                            switch(order.status) {
                              case 'awaiting_payment': return 'Outstanding';
                              case 'pending': return 'Pending';
                              case 'preparing': return 'Preparing';
                              case 'ready': return 'Ready';
                              case 'served': return 'Served';
                              case 'completed': return 'Completed';
                              case 'cancelled': return 'Cancelled';
                              default: return order.status.charAt(0).toUpperCase() + order.status.slice(1);
                            }
                          })()}
                        </Badge>
                      </Td>
                      <Td>
                        <TimeInfo>
                          {new Date(order.order_date).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TimeInfo>
                      </Td>
                      <Td>
                        <Amount>{formatCurrency(parseFloat(order.total_amount || 0), selectedCurrency)}</Amount>
                        <PaymentMethod isPending={order.payment_status === 'pending'}>
                          {order.payment_status === 'pending' ? 'Pending' : formatPaymentDisplay(order.payment_method, (order as any).card_type, paymentSettings || undefined)}
                        </PaymentMethod>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Content>
      </Container>
    </>
  );
};

export default RestaurantDashboard;
