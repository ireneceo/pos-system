import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

const DashboardContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
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

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #635BFF;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 12px;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: block;
    margin-left: 0;
    margin-top: 8px;
    width: fit-content;
  }
`;


const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;


const QuickAccess = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
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
  text-decoration: none;
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

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AlertBox = styled.div<{ type: 'warning' | 'info' | 'success' }>`
  background: ${props =>
    props.type === 'warning' ? '#FEF2F2' :
    props.type === 'success' ? '#ECFDF5' :
    '#EFF6FF'
  };
  border-left: 4px solid ${props =>
    props.type === 'warning' ? '#DC2626' :
    props.type === 'success' ? '#059669' :
    '#2563EB'
  };
  color: ${props =>
    props.type === 'warning' ? '#991B1B' :
    props.type === 'success' ? '#064E3B' :
    '#1E3A8A'
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
  font-size: 16px;
`;

const StatusCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    margin: 0 -24px;
    padding: 0 24px;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const TableHeader = styled.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const TableCell = styled.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: 'pending' | 'preparing' | 'cooking' | 'ready' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${props => {
    switch(props.status) {
      case 'pending':
        return `
          background: #FEF3C7;
          color: #92400E;
        `;
      case 'preparing':
      case 'cooking':
        return `
          background: #DBEAFE;
          color: #1E40AF;
        `;
      case 'ready':
        return `
          background: #D1FAE5;
          color: #065F46;
        `;
    }
  }}
`;

const StatusItem = styled.div`
  margin-bottom: 15px;
`;

const StatusLabel = styled.div`
  color: #6B7C93;
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const StatusValue = styled.div<{ color?: string; size?: string }>`
  color: ${props => props.color || '#0A2540'};
  font-weight: 600;
  font-size: ${props => props.size || 'inherit'};
`;

interface SystemAlert {
  type: 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
}

const DashboardContent: React.FC = () => {
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

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch managers
        const managersResponse = await fetch('/api/users?role=Manager', { headers });
        const managersData = await managersResponse.json();

        // Fetch restaurants
        const restaurantsResponse = await fetch('/api/restaurants', { headers });
        const restaurantsData = await restaurantsResponse.json();

        // Fetch staff
        const staffResponse = await fetch('/api/users?role=Staff', { headers });
        const staffData = await staffResponse.json();

        // Fetch subscriptions
        let subscriptions: any[] = [];
        try {
          const subscriptionsResponse = await fetch('/api/subscriptions', { headers });
          if (subscriptionsResponse.ok) {
            const subscriptionsData = await subscriptionsResponse.json();
            subscriptions = subscriptionsData.data || subscriptionsData || [];
          }
        } catch { /* graceful fallback */ }

        // Fetch invoices
        const invoicesResponse = await fetch('/api/invoices', { headers });
        const invoicesData = await invoicesResponse.json();
        const invoices = invoicesData.data || invoicesData || [];

        // Fetch orders
        const ordersResponse = await fetch('/api/orders', { headers });
        const ordersData = await ordersResponse.json();
        const orders = ordersData.data || ordersData;

        // Fetch support tickets from API
        const ticketsResponse = await fetch('/api/support-tickets', { headers });
        const ticketsResult = ticketsResponse.ok ? await ticketsResponse.json() : { data: [] };
        const tickets = ticketsResult.data || ticketsResult || [];

        // Count only open tickets
        const openTicketsOnly = tickets.filter((t: any) => t.status === 'open').length;
        const inProgressTickets = tickets.filter((t: any) => t.status === 'in-progress').length;

        // Create system alerts with recent activities
        const alerts: SystemAlert[] = [];
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Check for new managers (added in last 24 hours)
        const recentManagers = managersData.filter((m: any) => {
          if (!m.createdAt) return false;
          const created = new Date(m.createdAt);
          return created >= yesterday;
        });
        if (recentManagers.length > 0) {
          alerts.push({
            type: 'info',
            message: `${recentManagers.length} new manager${recentManagers.length > 1 ? 's' : ''} added`,
            timestamp: new Date().toISOString()
          });
        }

        // Check for new restaurants (added in last 24 hours)
        const recentRestaurants = restaurantsData.filter((r: any) => {
          if (!r.createdAt) return false;
          const created = new Date(r.createdAt);
          return created >= yesterday;
        });
        if (recentRestaurants.length > 0) {
          alerts.push({
            type: 'info',
            message: `${recentRestaurants.length} new restaurant${recentRestaurants.length > 1 ? 's' : ''} registered`,
            timestamp: new Date().toISOString()
          });
        }

        // Check for new staff (added in last 24 hours)
        const recentStaff = staffData.filter((s: any) => {
          if (!s.createdAt) return false;
          const created = new Date(s.createdAt);
          return created >= yesterday;
        });
        if (recentStaff.length > 0) {
          alerts.push({
            type: 'info',
            message: `${recentStaff.length} new staff member${recentStaff.length > 1 ? 's' : ''} added`,
            timestamp: new Date().toISOString()
          });
        }

        // Check for new subscriptions (added in last 24 hours)
        const recentSubscriptions = subscriptions.filter((sub: any) => {
          if (!sub.createdAt) return false;
          const created = new Date(sub.createdAt);
          return created >= yesterday;
        });
        if (recentSubscriptions.length > 0) {
          alerts.push({
            type: 'success',
            message: `${recentSubscriptions.length} new subscription${recentSubscriptions.length > 1 ? 's' : ''} activated`,
            timestamp: new Date().toISOString()
          });
        }

        // Check for new invoices (issued in last 24 hours)
        const recentInvoices = invoices.filter((inv: any) => {
          if (!inv.invoice_date && !inv.invoiceDate) return false;
          const issued = new Date(inv.invoice_date || inv.invoiceDate);
          return issued >= yesterday;
        });
        if (recentInvoices.length > 0) {
          alerts.push({
            type: 'info',
            message: `${recentInvoices.length} invoice${recentInvoices.length > 1 ? 's' : ''} issued`,
            timestamp: new Date().toISOString()
          });
        }

        // Alert for open tickets needing response
        if (openTicketsOnly > 0) {
          alerts.push({
            type: 'warning',
            message: `${openTicketsOnly} support ticket${openTicketsOnly > 1 ? 's' : ''} waiting for response`,
            timestamp: new Date().toISOString()
          });
        }

        // Check for urgent/high priority tickets that are still open
        const urgentOpenTickets = tickets.filter((t: any) =>
          t.status === 'open' && (t.priority === 'urgent' || t.priority === 'high')
        );
        if (urgentOpenTickets.length > 0) {
          alerts.unshift({
            type: 'warning',
            message: `⚠️ ${urgentOpenTickets.length} high priority ticket${urgentOpenTickets.length > 1 ? 's' : ''} need immediate attention`,
            timestamp: new Date().toISOString()
          });
        }

        setSystemAlerts(alerts);

        // Calculate stats from real data
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

        // Set recent orders (max 5)
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Get role display name
  const getRoleDisplayName = () => {
    if (!user) return 'Dashboard';

    switch(user.role) {
      case 'System Admin':
        return 'System Admin';
      case 'Foodcourt General':
        return 'Foodcourt General Manager';
      case 'Foodcourt Manager':
        return 'Foodcourt Manager';
      case 'Brand General':
        return 'Brand General Manager';
      case 'Brand Manager':
        return 'Brand Manager';
      case 'Restaurant Admin':
        return 'Restaurant Admin';
      default:
        return user.role;
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <div>
          <HeaderTitle>
            Dashboard
            <RoleBadge>{getRoleDisplayName()}</RoleBadge>
          </HeaderTitle>
        </div>
      </Header>

      <Content>
        {/* Statistics Cards */}
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{formatCurrency(stats.todaySales, selectedCurrency)}</StatValue>
            <StatLabel>Today's Sales</StatLabel>
            <StatDescription>Revenue generated today</StatDescription>
          </StatCard>

          <StatCard color="#2563EB">
            <StatValue>{stats.totalOrders}</StatValue>
            <StatLabel>Total Orders Today</StatLabel>
            <StatDescription>Orders placed today</StatDescription>
          </StatCard>

          <StatCard color="#DC2626">
            <StatValue>{stats.pendingOrders}</StatValue>
            <StatLabel>Pending Orders</StatLabel>
            <StatDescription>Awaiting processing</StatDescription>
          </StatCard>

          <StatCard color="#7C3AED">
            <StatValue>{stats.totalManagers} / {stats.totalRestaurants}</StatValue>
            <StatLabel>Managers / Restaurants</StatLabel>
            <StatDescription>Total registered</StatDescription>
          </StatCard>

          <StatCard color="#F59E0B">
            <StatValue>{stats.totalSubscriptions}</StatValue>
            <StatLabel>Active Subscriptions</StatLabel>
            <StatDescription>Currently active plans</StatDescription>
          </StatCard>

          <StatCard color="#10B981">
            <StatValue>{stats.totalInvoices}</StatValue>
            <StatLabel>Total Invoices</StatLabel>
            <StatDescription>All time invoices</StatDescription>
          </StatCard>

          <StatCard color="#6366F1">
            <StatValue>{stats.totalStaff}</StatValue>
            <StatLabel>Total Staff</StatLabel>
            <StatDescription>Registered staff members</StatDescription>
          </StatCard>

          <StatCard color={stats.openTickets > 0 ? "#EF4444" : "#059669"}>
            <StatValue>{stats.openTickets}</StatValue>
            <StatLabel>Open Support Tickets</StatLabel>
            <StatDescription>{stats.openTickets > 0 ? 'Need attention' : 'All resolved'}</StatDescription>
          </StatCard>
        </StatsGrid>

        {/* System Alerts */}
        <QuickAccess style={{ marginBottom: '24px' }}>
          <SectionTitle>Recent System Activities (Last 24 Hours)</SectionTitle>
          {systemAlerts.length > 0 ? (
            systemAlerts.map((alert, index) => (
              <AlertBox key={index} type={alert.type}>
                <AlertIcon>
                  {alert.type === 'warning' ? '⚠️' :
                   alert.type === 'success' ? '✓' : 'ℹ'}
                </AlertIcon>
                {alert.message}
              </AlertBox>
            ))
          ) : (
            <AlertBox type="success">
              <AlertIcon>✓</AlertIcon>
              No new activities today. All systems running smoothly.
            </AlertBox>
          )}
        </QuickAccess>

        {/* Quick Access */}
        <QuickAccess>
          <SectionTitle>System Quick Access</SectionTitle>
          <QuickButtons>
            <QuickBtnDiv onClick={() => window.open('/pos/pos-terminal', '_blank')}>
              <QuickBtnIcon>▦</QuickBtnIcon>
              <QuickBtnTitle>POS Terminal</QuickBtnTitle>
              <QuickBtnDesc>Order processing and payment</QuickBtnDesc>
            </QuickBtnDiv>

            <QuickBtnDiv onClick={() => window.open('/pos/kitchen', '_blank')}>
              <QuickBtnIcon>◐</QuickBtnIcon>
              <QuickBtnTitle>Kitchen Display</QuickBtnTitle>
              <QuickBtnDesc>Cooking status and order management</QuickBtnDesc>
            </QuickBtnDiv>

            <QuickBtnDiv onClick={() => window.open('/pos/display', '_blank')}>
              <QuickBtnIcon>□</QuickBtnIcon>
              <QuickBtnTitle>Customer Display</QuickBtnTitle>
              <QuickBtnDesc>Pickup number display screen</QuickBtnDesc>
            </QuickBtnDiv>
            
            <QuickBtnDiv onClick={async () => {
              const restaurantId = user?.restaurantId || '1';
              console.log('Dashboard: Fetching restaurant:', restaurantId);
              try {
                const response = await fetch(`/api/restaurants/${restaurantId}`);
                console.log('Dashboard: Response status:', response.status);

                if (response.ok) {
                  const data = await response.json();
                  console.log('Dashboard: Restaurant data:', data);
                  const slug = data.slug || `restaurant-${restaurantId}`;
                  console.log('Dashboard: Using slug:', slug);
                  window.open(`/mobile/${slug}`, '_blank');
                } else {
                  console.error('Dashboard: Failed to fetch restaurant');
                  window.open(`/mobile/restaurant-${restaurantId}`, '_blank');
                }
              } catch (error) {
                console.error('Dashboard: Error fetching restaurant slug:', error);
                window.open(`/mobile/restaurant-${restaurantId}`, '_blank');
              }
            }}>
              <QuickBtnIcon>◯</QuickBtnIcon>
              <QuickBtnTitle>Mobile Order</QuickBtnTitle>
              <QuickBtnDesc>Customer mobile ordering system</QuickBtnDesc>
            </QuickBtnDiv>
          </QuickButtons>
        </QuickAccess>

        {/* Live Status */}
        <StatusGrid>
          <StatusCard>
            <SectionTitle>Live Order Status</SectionTitle>
            <TableContainer>
              <OrdersTable>
                <thead>
                  <tr>
                    <TableHeader>Order #</TableHeader>
                    <TableHeader>Items</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Time</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <tr key={order.id || index}>
                        <TableCell>{order.order_number || `#${order.id}`}</TableCell>
                        <TableCell>
                          {order.order_items ?
                            (typeof order.order_items === 'string' ?
                              JSON.parse(order.order_items).map((item: any) => item.name).join(', ') :
                              order.order_items.map((item: any) => item.name).join(', ')
                            ) : 'No items'
                          }
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={
                            order.status === 'preparing' ? 'cooking' :
                            order.status === 'ready' ? 'ready' : 'pending'
                          }>
                            {order.status || 'pending'}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          {order.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          }) : '-'}
                        </TableCell>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <TableCell colSpan={4} style={{ textAlign: 'center', color: '#6B7280' }}>
                        No orders yet
                      </TableCell>
                    </tr>
                  )}
                </tbody>
              </OrdersTable>
            </TableContainer>
          </StatusCard>
          
          <StatusCard>
            <SectionTitle>Store Status</SectionTitle>
            <div style={{ marginTop: '20px' }}>
              <StatusItem>
                <StatusLabel>
                  <span style={{ marginRight: '8px' }}>⚙</span>Operation Status
                </StatusLabel>
                <StatusValue color="#059669">● Open & Operating</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel>
                  <span style={{ marginRight: '8px' }}>◯</span>Total Managers
                </StatusLabel>
                <StatusValue>{stats.totalManagers} Managers</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel>
                  <span style={{ marginRight: '8px' }}>◐</span>Kitchen Status
                </StatusLabel>
                <StatusValue color="#059669">● Normal Operation</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel>
                  <span style={{ marginRight: '8px' }}>◉</span>Next Pickup
                </StatusLabel>
                <StatusValue color="#635BFF" size="18px">#002</StatusValue>
              </StatusItem>
            </div>
          </StatusCard>
        </StatusGrid>
      </Content>
    </DashboardContainer>
  );
};

export default DashboardContent;