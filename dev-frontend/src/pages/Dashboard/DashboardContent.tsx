import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatTime as formatTimeTz } from '../../utils/timezone';
// ============================================================================
// Styled Components — RestaurantDashboard 기준 통일
// ============================================================================

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
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
  background: #F9FAFB;
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
  color: #4B5563;
  margin: 8px 0 0 16px;
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: #635BFF;
  color: white;
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
  border: 1px solid #C7CED6;

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
  border: 1px solid #C7CED6;
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
    background: #64748B;
    border-radius: 4px;
  }
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
      default: return '#F1F4F8';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'error': return '#FECACA';
      case 'warning': return '#FDE68A';
      case 'success': return '#A7F3D0';
      case 'info': return '#BFDBFE';
      default: return '#C7CED6';
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

const AlertTitle = styled.div<{ type: 'warning' | 'error' | 'info' | 'success' }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => {
    switch(props.type) {
      case 'error': return '#DC2626';
      case 'warning': return '#D97706';
      case 'success': return '#059669';
      case 'info': return '#2563EB';
      default: return '#1F2937';
    }
  }};
`;

const AlertDescription = styled.div`
  font-size: 12px;
  color: #4B5563;
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
  border: 1px solid #C7CED6;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F4F6F9;

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
    color: #4B5563;
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
    color: #4B5563;
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
    border: 1px solid #C7CED6;
    border-radius: 16px 16px 0 0;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #C7CED6;
  border-top: none;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background: #F1F4F8;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #F1F4F8;
  transition: background 0.2s;

  &:hover {
    background: #F1F4F8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #1F2937;
  vertical-align: middle;
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
        return 'background: #FEF3C7; color: #F59E0B;';
      case 'pending':
        return 'background: #FEF3C7; color: #92400E;';
      case 'preparing':
        return 'background: #DBEAFE; color: #1E40AF;';
      case 'ready':
        return 'background: #D1FAE5; color: #065F46;';
      case 'served':
        return 'background: #D1FAE5; color: #065F46;';
      case 'completed':
        return 'background: #C7CED6; color: #1F2937;';
      case 'cancelled':
        return 'background: #FEE2E2; color: #991B1B;';
      default:
        return 'background: #F1F4F8; color: #4B5563;';
    }
  }}
`;

// ============================================================================
// Component
// ============================================================================

interface SystemAlert {
  type: 'warning' | 'info' | 'success';
  message: string;
  title: string;
  link?: string;
}

const DashboardContent: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = React.useState({
    todaySales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalManagers: 0,
    totalRestaurants: 0,
    totalStaff: 0,
    totalSubscriptions: 0,
    totalInvoices: 0,
    openTickets: 0
  });
  const [recentOrders, setRecentOrders] = React.useState<any[]>([]);
  const [systemAlerts, setSystemAlerts] = React.useState<SystemAlert[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [loading, setLoading] = useState(true);
  const [badgeCounts, setBadgeCounts] = useState({ systemInquiry: 0, operationInquiry: 0, notices: 0, invoices: 0 });

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

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getAuthToken();
        const headers = { 'Authorization': `Bearer ${token}` };

        const [managersResponse, restaurantsResponse, staffResponse, invoicesResponse, ordersResponse, ticketsResponse] = await Promise.all([
          fetch('/api/users?role=Manager', { headers }),
          fetch('/api/restaurants', { headers }),
          fetch('/api/users?role=Staff', { headers }),
          fetch('/api/invoices', { headers }),
          fetch('/api/orders', { headers }),
          fetch('/api/support-tickets', { headers }),
        ]);

        const managersData = await managersResponse.json();
        const restaurantsData = await restaurantsResponse.json();
        const staffData = await staffResponse.json();
        const invoicesData = await invoicesResponse.json();
        const ordersData = await ordersResponse.json();
        const ticketsResult = ticketsResponse.ok ? await ticketsResponse.json() : { data: [] };

        const invoices = (Array.isArray(invoicesData?.data) ? invoicesData.data : Array.isArray(invoicesData) ? invoicesData : []);
        const orders = ordersData.data || ordersData;
        const tickets = (Array.isArray(ticketsResult?.data) ? ticketsResult.data : Array.isArray(ticketsResult) ? ticketsResult : []);

        let subscriptions: any[] = [];
        try {
          const subscriptionsResponse = await fetch('/api/subscriptions', { headers });
          if (subscriptionsResponse.ok) {
            const subscriptionsData = await subscriptionsResponse.json();
            subscriptions = (Array.isArray(subscriptionsData?.data) ? subscriptionsData.data : Array.isArray(subscriptionsData) ? subscriptionsData : []);
          }
        } catch { /* graceful fallback */ }

        const openTicketsOnly = tickets.filter((t: any) => t.status === 'open').length;

        // Create system alerts
        const alerts: SystemAlert[] = [];
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const urgentOpenTickets = tickets.filter((t: any) =>
          t.status === 'open' && (t.priority === 'urgent' || t.priority === 'high')
        );
        if (urgentOpenTickets.length > 0) {
          alerts.push({
            type: 'warning',
            title: 'High Priority Tickets',
            message: `${urgentOpenTickets.length} high priority ticket(s) need immediate attention`,
            link: '/pos/admin/support-tickets'
          });
        }

        if (openTicketsOnly > 0) {
          alerts.push({
            type: 'warning',
            title: 'Open Support Tickets',
            message: `${openTicketsOnly} ticket(s) waiting for response`,
            link: '/pos/admin/support-tickets'
          });
        }

        const recentManagers = managersData.filter((m: any) => {
          if (!m.createdAt) return false;
          return new Date(m.createdAt) >= yesterday;
        });
        if (recentManagers.length > 0) {
          alerts.push({
            type: 'info',
            title: 'New Managers',
            message: `${recentManagers.length} new manager(s) added in last 24h`,
            link: '/pos/admin/managers'
          });
        }

        const recentRestaurants = restaurantsData.filter((r: any) => {
          if (!r.createdAt) return false;
          return new Date(r.createdAt) >= yesterday;
        });
        if (recentRestaurants.length > 0) {
          alerts.push({
            type: 'info',
            title: 'New Restaurants',
            message: `${recentRestaurants.length} restaurant(s) registered in last 24h`,
            link: '/pos/admin/restaurants'
          });
        }

        const recentInvoices = invoices.filter((inv: any) => {
          if (!inv.invoice_date && !inv.invoiceDate) return false;
          return new Date(inv.invoice_date || inv.invoiceDate) >= yesterday;
        });
        if (recentInvoices.length > 0) {
          alerts.push({
            type: 'info',
            title: 'New Invoices',
            message: `${recentInvoices.length} invoice(s) issued in last 24h`,
            link: '/pos/admin/invoices'
          });
        }

        const recentSubscriptions = subscriptions.filter((sub: any) => {
          if (!sub.createdAt) return false;
          return new Date(sub.createdAt) >= yesterday;
        });
        if (recentSubscriptions.length > 0) {
          alerts.push({
            type: 'success',
            title: 'New Subscriptions',
            message: `${recentSubscriptions.length} subscription(s) activated in last 24h`,
            link: '/pos/admin/subscriptions'
          });
        }

        setSystemAlerts(alerts);

        // Calculate stats
        const todayStr = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter((order: any) =>
          order.order_date && order.order_date.startsWith(todayStr)
        );
        const pendingOrders = orders.filter((order: any) =>
          order.status === 'pending' || order.status === 'preparing'
        );
        const todaySales = todayOrders.reduce((sum: number, order: any) =>
          sum + parseFloat(order.total_amount || 0), 0
        );

        setStats({
          todaySales,
          totalOrders: todayOrders.length,
          pendingOrders: pendingOrders.length,
          totalManagers: managersData.length || 0,
          totalRestaurants: restaurantsData.length || 0,
          totalStaff: staffData.length || 0,
          totalSubscriptions: subscriptions.length || 0,
          totalInvoices: invoices.length || 0,
          openTickets: openTicketsOnly
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>{t('dashboard:dashboardContent.systemAdminDashboard')}</Title>
        </Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px' }}>{t('dashboard:dashboardContent.loadingDashboard')}</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('dashboard:dashboardContent.systemAdminDashboard')}</Title>
        <Subtitle>
          <span>{user?.full_name || 'Admin'}</span>
          <RoleBadge>{t('dashboard:dashboardContent.systemAdmin')}</RoleBadge>
        </Subtitle>
      </Header>

      <Content>
        {/* Statistics Cards */}
        <DashboardStatsGrid>
          <DashboardStatCard color="#F59E0B">
            <DashboardStatLabel>{t('dashboard:dashboardContent.todaysSales')}</DashboardStatLabel>
            <DashboardStatValue>{formatCurrency(stats.todaySales, selectedCurrency)}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color="#2563EB">
            <DashboardStatLabel>{t('dashboard:dashboardContent.todaysOrders')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalOrders}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color="#DC2626">
            <DashboardStatLabel>{t('dashboard:dashboardContent.pendingOrders')}</DashboardStatLabel>
            <DashboardStatValue>{stats.pendingOrders}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color="#7C3AED">
            <DashboardStatLabel>{t('dashboard:dashboardContent.managersRestaurants')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalManagers} / {stats.totalRestaurants}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color="#10B981">
            <DashboardStatLabel>{t('dashboard:dashboardContent.activeSubscriptions')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalSubscriptions}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color="#059669">
            <DashboardStatLabel>{t('dashboard:dashboardContent.totalInvoices')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalInvoices}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color="#6366F1">
            <DashboardStatLabel>{t('dashboard:dashboardContent.totalStaff')}</DashboardStatLabel>
            <DashboardStatValue>{stats.totalStaff}</DashboardStatValue>
          </DashboardStatCard>

          <DashboardStatCard color={stats.openTickets > 0 ? "#EF4444" : "#059669"}>
            <DashboardStatLabel>{t('dashboard:dashboardContent.openSupportTickets')}</DashboardStatLabel>
            <DashboardStatValue>{stats.openTickets}</DashboardStatValue>
          </DashboardStatCard>
        </DashboardStatsGrid>

        {/* Chart + Notifications */}
        <MainGrid>
          <ChartContainer>
            <h3>{t('dashboard:dashboardContent.platformOverview')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#F1F4F8', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{t('dashboard:dashboardContent.restaurants')}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540' }}>{stats.totalRestaurants}</div>
                <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>{t('dashboard:dashboardContent.registeredRestaurants')}</div>
              </div>
              <div style={{ padding: '16px', background: '#F1F4F8', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{t('dashboard:dashboardContent.managers')}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540' }}>{stats.totalManagers}</div>
                <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>{t('dashboard:dashboardContent.activeManagers')}</div>
              </div>
              <div style={{ padding: '16px', background: '#F1F4F8', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{t('dashboard:dashboardContent.subscriptions')}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540' }}>{stats.totalSubscriptions}</div>
                <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>{t('dashboard:dashboardContent.activePlans')}</div>
              </div>
              <div style={{ padding: '16px', background: '#F1F4F8', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{t('dashboard:dashboardContent.staff')}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540' }}>{stats.totalStaff}</div>
                <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>{t('dashboard:dashboardContent.registeredStaff')}</div>
              </div>
            </div>
          </ChartContainer>

          <AlertsPanel>
            <h3>{t('dashboard:dashboardContent.notifications')}</h3>
            <AlertsList>
              {systemAlerts.length > 0 ? (
                systemAlerts.map((alert, index) => (
                  <Alert key={index} type={alert.type} onClick={() => alert.link && navigate(alert.link)}>
                    <AlertContent>
                      <AlertTitle type={alert.type}>{alert.title}</AlertTitle>
                      <AlertDescription>{alert.message}</AlertDescription>
                    </AlertContent>
                  </Alert>
                ))
              ) : (
                <Alert type="success" onClick={() => {}}>
                  <AlertContent>
                    <AlertTitle type="success">{t('dashboard:dashboardContent.allClear')}</AlertTitle>
                    <AlertDescription>{t('dashboard:dashboardContent.noNewActivitiesAllSystemsRunningSmoothly')}</AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              {badgeCounts.notices > 0 && (
                <Alert type="info" onClick={() => navigate('/pos/admin/notices')}>
                  <AlertContent>
                    <AlertTitle type="info">{t('dashboard:dashboardContent.unreadNotices')}</AlertTitle>
                    <AlertDescription>{badgeCounts.notices} unread notice(s)</AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              {badgeCounts.systemInquiry > 0 && (
                <Alert type="info" onClick={() => navigate('/pos/admin/system-inquiry')}>
                  <AlertContent>
                    <AlertTitle type="info">{t('dashboard:dashboardContent.systemInquiryUpdates')}</AlertTitle>
                    <AlertDescription>{badgeCounts.systemInquiry} inquiry(s) with new replies</AlertDescription>
                  </AlertContent>
                </Alert>
              )}
            </AlertsList>
          </AlertsPanel>
        </MainGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <h3>{t('dashboard:dashboardContent.quickActions')}</h3>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/pos/admin/restaurants')}>
              <div className="icon">◐</div>
              <div className="title">{t('dashboard:dashboardContent.restaurants')}</div>
              <div className="description">{t('dashboard:dashboardContent.manageAllRestaurants')}</div>
            </QuickActionCard>

            <QuickActionCard onClick={() => navigate('/pos/admin/invoices')}>
              <div className="icon">▦</div>
              <div className="title">{t('dashboard:dashboardContent.invoices')}</div>
              <div className="description">{t('dashboard:dashboardContent.invoiceManagement')}</div>
            </QuickActionCard>

            <QuickActionCard onClick={() => navigate('/pos/admin/notices')}>
              <div className="icon">◈</div>
              <div className="title">{t('dashboard:dashboardContent.notices')}</div>
              <div className="description">{t('dashboard:dashboardContent.communicationHub')}</div>
            </QuickActionCard>

            <QuickActionCard onClick={() => navigate('/pos/admin/report')}>
              <div className="icon">☰</div>
              <div className="title">{t('dashboard:dashboardContent.report')}</div>
              <div className="description">{t('dashboard:dashboardContent.platformAnalytics')}</div>
            </QuickActionCard>
          </QuickActionsGrid>
        </QuickActionsSection>

        {/* Recent Orders Table */}
        <RecentOrdersSection>
          <h3>{t('dashboard:dashboardContent.recentOrders')}</h3>
        </RecentOrdersSection>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>{t('dashboard:dashboardContent.order')}</Th>
                <Th>{t('dashboard:dashboardContent.items')}</Th>
                <Th>{t('dashboard:dashboardContent.status')}</Th>
                <Th>{t('dashboard:dashboardContent.time')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <Tr key={order.id || index}>
                    <Td style={{ fontWeight: 600, color: '#0A2540' }}>
                      {order.order_number || `#${order.id}`}
                    </Td>
                    <Td>
                      {order.order_items ?
                        (typeof order.order_items === 'string' ?
                          JSON.parse(order.order_items).map((item: any) => item.name).join(', ') :
                          order.order_items.map((item: any) => item.name).join(', ')
                        ) : 'No items'
                      }
                    </Td>
                    <Td>
                      <Badge variant={order.status || 'pending'}>
                        {(() => {
                          switch(order.status) {
                            case 'awaiting_payment': return 'Outstanding';
                            case 'pending': return 'Pending';
                            case 'preparing': return 'Preparing';
                            case 'ready': return 'Ready';
                            case 'served': return 'Served';
                            case 'completed': return 'Completed';
                            case 'cancelled': return 'Cancelled';
                            default: return order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending';
                          }
                        })()}
                      </Badge>
                    </Td>
                    <Td style={{ color: '#4B5563', fontSize: '13px' }}>
                      {order.createdAt ? formatTimeTz(order.createdAt, null) : '-'}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
                    No recent orders
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

export default DashboardContent;
