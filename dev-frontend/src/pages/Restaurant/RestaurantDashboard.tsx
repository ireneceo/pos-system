import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { SetupGuide, WelcomeModal } from '../../components/Common';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { useSetupStatus } from '../../hooks/useSetupStatus';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { formatPaymentDisplay } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useRoleDisplayName } from '../../utils/roleDisplay';

import { getAuthToken } from '../../utils/auth';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
interface DashboardData {
  restaurant: {
    id: string | number;
    name: string;
    branch_name?: string;
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
  padding: 28px;
  border: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 20px;
  }

  h3 {
    margin: 0 0 24px 0;
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
  background: white;
  border-radius: 16px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  h3 {
    padding: 20px 24px;
    margin: 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #F3F4F6;
  }

  /* DataTable 가 1024px 이하에서 카드 그리드로 변하므로
     컨테이너의 border/배경은 그 시점에 제거해 카드를 직접 노출시킨다. */
  @media (max-width: 1024px) {
    background: transparent;
    border: none;
    overflow: visible;
    border-radius: 0;

    h3 {
      padding: 8px 0 12px;
      border-bottom: none;
    }
  }
`;

interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
}

const RestaurantDashboard: React.FC = () => {
  const { t } = useTranslation('settings');
  const displayRole = useRoleDisplayName();
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
  const { isRouteAllowed } = useAllowedRoutes(
    user?.role ? { role: user.role, restaurantId: Number(restaurantId) || null, brandId: null, foodcourtId: null } : null
  );

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const token = getAuthToken();
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
        const token = getAuthToken();
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
        const token = getAuthToken();
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
            <Title>{t('settings:restaurantDashboard.restaurantDashboard')}</Title>
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
            <Title>{t('settings:restaurantDashboard.restaurantDashboard')}</Title>
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
          <Title>{t('settings:restaurantDashboard.restaurantDashboard')}</Title>
          <Subtitle>
            <span>{getRestaurantDisplayName(restaurant)} • {restaurant.planType}</span>
            {(() => {
              const endDate = restaurant.subscriptionEnd ? new Date(restaurant.subscriptionEnd) : null;
              const now = new Date();
              if (restaurant.status === 'trial') {
                const trialEnd = restaurant.trialEndDate ? new Date(restaurant.trialEndDate) : endDate;
                if (trialEnd) {
                  const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  return <SubscriptionBadge variant="trial">Trial • {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}</SubscriptionBadge>;
                }
                return <SubscriptionBadge variant="trial">{t('settings:restaurantDashboard.trial')}</SubscriptionBadge>;
              }
              if (endDate) {
                const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                if (daysLeft <= 0) return <SubscriptionBadge variant="expired">{t('settings:restaurantDashboard.subscriptionExpired')}</SubscriptionBadge>;
                if (daysLeft <= 30) return <SubscriptionBadge variant="expiring">{daysLeft} days left</SubscriptionBadge>;
                return <SubscriptionBadge variant="active">{daysLeft} days left</SubscriptionBadge>;
              }
              return null;
            })()}
          </Subtitle>
        </Header>

        <Content>
          {user?.id && (
            <WelcomeModal
              userKey={user.id}
              userName={user.fullName || user.username}
              roleLabel={displayRole(user.role)}
              items={setupItems}
            />
          )}
          {setupItems.length > 0 && (
            <SetupGuide items={setupItems} entityId={restaurantId} />
          )}

          <DashboardStatsGrid>
            <DashboardStatCard color="#F59E0B">
              <DashboardStatLabel>{t('settings:restaurantDashboard.todaysSales')}</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(today.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#2563EB">
              <DashboardStatLabel>{t('settings:restaurantDashboard.todaysOrders')}</DashboardStatLabel>
              <DashboardStatValue>{today.orders || 0}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#10B981">
              <DashboardStatLabel>{t('settings:restaurantDashboard.monthlyRevenue')}</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(monthly.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#7C3AED">
              <DashboardStatLabel>{t('settings:restaurantDashboard.monthlyOrders')}</DashboardStatLabel>
              <DashboardStatValue>{monthly.orders || 0}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#059669">
              <DashboardStatLabel>{t('settings:restaurantDashboard.thisYearRevenue')}</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(yearly.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#6366F1">
              <DashboardStatLabel>{t('settings:restaurantDashboard.thisYearOrders')}</DashboardStatLabel>
              <DashboardStatValue>{yearly.orders || 0}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#8B5CF6">
              <DashboardStatLabel>{t('settings:restaurantDashboard.totalRevenue')}</DashboardStatLabel>
              <DashboardStatValue>{formatCurrency(total.revenue || 0, selectedCurrency)}</DashboardStatValue>
            </DashboardStatCard>

            <DashboardStatCard color="#EF4444">
              <DashboardStatLabel>{t('settings:restaurantDashboard.totalOrders')}</DashboardStatLabel>
              <DashboardStatValue>{total.orders || 0}</DashboardStatValue>
            </DashboardStatCard>
          </DashboardStatsGrid>

          <MainGrid>
            <ChartContainer>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>{t('settings:restaurantDashboard.salesOrdersOverview')}</h3>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '160px', gap: '8px', marginBottom: '24px' }}>
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
                            title={`${formatDateTime(dateObj, null, { year: 'numeric', month: '2-digit', day: '2-digit' })}: RM ${data.revenue.toLocaleString()}`}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                          />
                          <div style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center' }}>
                            {timePeriod === 'week'
                              ? formatDateTime(dateObj, null, { month: 'short', day: 'numeric' })
                              : timePeriod === 'month'
                              ? `Week ${index + 1}`
                              : formatDateTime(dateObj, null, { month: 'short', year: '2-digit' })
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
                    <p>{t('settings:restaurantDashboard.loadingChartData')}</p>
                  </div>
                </div>
              )}
            </ChartContainer>

            <AlertsPanel>
              <h3>{t('settings:restaurantDashboard.notifications')}</h3>

              <AlertsList>
                {(today.pendingOrders || 0) > 0 && (
                  <Alert type="warning" onClick={() => navigate(`/restaurant/${restaurantId}/live-orders`)}>
                    <AlertContent>
                      <AlertTitle type="warning">{t('settings:restaurantDashboard.pendingOrders')}</AlertTitle>
                      <AlertDescription>{today.pendingOrders} order(s) waiting to be processed</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {(billing.unpaidInvoices || 0) > 0 && (
                  <Alert type="warning" onClick={() => navigate(`/restaurant/${restaurantId}/invoices`)}>
                    <AlertContent>
                      <AlertTitle type="warning">{t('settings:restaurantDashboard.unpaidInvoices')}</AlertTitle>
                      <AlertDescription>{billing.unpaidInvoices} invoice(s) • {formatCurrency(billing.totalUnpaidAmount || 0, selectedCurrency)} due</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {badgeCounts.notices > 0 && (
                  <Alert type="info" onClick={() => navigate(`/restaurant/${restaurantId}/notices`)}>
                    <AlertContent>
                      <AlertTitle type="info">{t('settings:restaurantDashboard.unreadNotices')}</AlertTitle>
                      <AlertDescription>{badgeCounts.notices} unread notice(s)</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {badgeCounts.systemInquiry > 0 && (
                  <Alert type="info" onClick={() => navigate(`/restaurant/${restaurantId}/support`)}>
                    <AlertContent>
                      <AlertTitle type="info">{t('settings:restaurantDashboard.systemInquiryUpdates')}</AlertTitle>
                      <AlertDescription>{badgeCounts.systemInquiry} inquiry(s) with new replies</AlertDescription>
                    </AlertContent>
                  </Alert>
                )}

                {badgeCounts.operationInquiry > 0 && (
                  <Alert type="info" onClick={() => navigate(`/restaurant/${restaurantId}/operation-inquiry`)}>
                    <AlertContent>
                      <AlertTitle type="info">{t('settings:restaurantDashboard.operationInquiryUpdates')}</AlertTitle>
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
            <h3>{t('settings:restaurantDashboard.quickActions')}</h3>
            <QuickActionsGrid>
              {(() => {
                // System Access 항목 (새 창) — 사이드바와 동일 아이콘
                const systemItems: { icon: string; title: string; desc: string; onClick: () => void }[] = [];
                if (isRouteAllowed(`/restaurant/${restaurantId}/pos-terminal`))
                  systemItems.push({ icon: '▦', title: t('common:nav.posTerminal'), desc: t('settings:restaurantDashboard.processOrders'), onClick: () => window.open(`/restaurant/${restaurantId}/pos-terminal`, '_blank') });
                if (isRouteAllowed(`/restaurant/${restaurantId}/floor-plan`))
                  systemItems.push({ icon: '\u25A6', title: t('common:nav.floorPlan'), desc: t('settings:restaurantDashboard.tableLayout'), onClick: () => window.open(`/restaurant/${restaurantId}/floor-plan`, '_blank') });
                if (isRouteAllowed(`/restaurant/${restaurantId}/kitchen`))
                  systemItems.push({ icon: '◐', title: t('common:nav.kitchenDisplay'), desc: t('settings:restaurantDashboard.viewKitchenOrders'), onClick: () => window.open(`/restaurant/${restaurantId}/kitchen`, '_blank') });
                if (isRouteAllowed(`/restaurant/${restaurantId}/display`))
                  systemItems.push({ icon: '□', title: t('settings:restaurantDashboard.customerDisplay'), desc: t('settings:restaurantDashboard.pickupNumber'), onClick: () => window.open(`/restaurant/${restaurantId}/display`, '_blank') });
                if (isRouteAllowed(`/mobile/:slug/menu`))
                  systemItems.push({ icon: '◯', title: t('common:nav.mobileOrder'), desc: t('settings:restaurantDashboard.customerOrdering'), onClick: async () => {
                    try {
                      const token = getAuthToken();
                      const res = await fetch(`/api/restaurants/${restaurantId}`, { headers: token ? { 'Authorization': `Bearer ${token}` } : {} });
                      if (res.ok) { const d = await res.json(); window.open(`/mobile/${(d.data || d).slug || `restaurant-${restaurantId}`}`, '_blank'); }
                      else window.open(`/mobile/restaurant-${restaurantId}`, '_blank');
                    } catch { window.open(`/mobile/restaurant-${restaurantId}`, '_blank'); }
                  }});

                // 5개 이상이면 Customer Display 제외하여 4개로
                let items = systemItems.length >= 5
                  ? systemItems.filter(i => i.title !== 'Customer Display').slice(0, 4)
                  : [...systemItems];

                // 4개 미만이면 일반 메뉴로 채움 (같은 탭)
                if (items.length < 4) {
                  items.push({ icon: '◉', title: t('common:nav.liveOrders'), desc: t('settings:restaurantDashboard.monitorAllOrders'), onClick: () => navigate(`/restaurant/${restaurantId}/live-orders`) });
                }
                if (items.length < 4) {
                  items.push({ icon: '≡', title: t('common:nav.menu'), desc: t('settings:restaurantDashboard.editMenuItems'), onClick: () => navigate(`/restaurant/${restaurantId}/menu`) });
                }

                return items.slice(0, 4).map((item, idx) => (
                  <QuickActionCard key={idx} onClick={item.onClick}>
                    <div className="icon">{item.icon}</div>
                    <div className="title">{item.title}</div>
                    <div className="description">{item.desc}</div>
                  </QuickActionCard>
                ));
              })()}
            </QuickActionsGrid>
          </QuickActionsSection>

          <RecentOrdersSection>
            <h3>{t('settings:restaurantDashboard.recentOrders')}</h3>
            {recentOrders.length === 0 ? (
              <DataTableEmpty>{t('settings:restaurantDashboard.noRecentOrders', 'No recent orders')}</DataTableEmpty>
            ) : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('settings:restaurantDashboard.order')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('settings:restaurantDashboard.items')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('settings:restaurantDashboard.status')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('settings:restaurantDashboard.time')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('settings:restaurantDashboard.amount')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {recentOrders.map(order => (
                    <DataTableRow key={order.id}>
                      <DataTableCell data-label={t('settings:restaurantDashboard.order')}>
                        <OrderNumber>{order.order_number}</OrderNumber>
                        <CustomerInfo>
                          {order.customer_name || 'Guest'}<br />
                          {order.customer_phone || 'N/A'}
                          {order.table_number && (
                            <><br />Table: {order.table_number}</>
                          )}
                        </CustomerInfo>
                      </DataTableCell>
                      <DataTableCell data-label={t('settings:restaurantDashboard.items')}>
                        <ItemsList>
                          {(() => {
                            const items = order.items || order.order_items || [];
                            if (!Array.isArray(items) || items.length === 0) {
                              return <span style={{ color: '#6B7280', fontSize: '13px' }}>{t('settings:restaurantDashboard.noItems')}</span>;
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
                      </DataTableCell>
                      <DataTableCell data-label={t('settings:restaurantDashboard.status')}>
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
                      </DataTableCell>
                      <DataTableCell data-label={t('settings:restaurantDashboard.time')}>
                        <TimeInfo>
                          {formatDateTime(order.order_date, null, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TimeInfo>
                      </DataTableCell>
                      <DataTableCell align="right" data-label={t('settings:restaurantDashboard.amount')}>
                        <Amount>{formatCurrency(parseFloat(order.total_amount || 0), selectedCurrency)}</Amount>
                        <PaymentMethod isPending={order.payment_status === 'pending'}>
                          {order.payment_status === 'pending' ? 'Pending' : formatPaymentDisplay(order.payment_method, (order as any).card_type, paymentSettings || undefined)}
                        </PaymentMethod>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            )}
          </RecentOrdersSection>
        </Content>
      </Container>
    </>
  );
};

export default RestaurantDashboard;
