import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { io, Socket } from 'socket.io-client';
import { getTodayInTimezone, getRestaurantTimezone } from '../../utils/timezone';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface DbOrder {
  id: number;
  restaurant_id: number;
  order_number: string;
  customer_name: string | null;
  customer_phone: string | null;
  table_number: string | null;
  total_amount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  order_type: 'dine_in' | 'takeaway' | 'delivery';
  payment_method: string | null;
  payment_status: 'pending' | 'completed' | 'failed';
  order_date: string;
  order_items: any;
  createdAt: string;
  updatedAt: string;
}

interface DisplayOrder {
  id: string;
  orderNumber: string;
  pickupNumber: string;
  tableNumber: string | null;  // Table number for dine-in QR orders
  orderType: 'dine_in' | 'takeaway' | 'delivery' | 'pickup';  // Order type
  status: 'preparing' | 'ready' | 'completed';
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  createdAt: string;
  estimatedTime?: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  background: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.lg};

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }
`;

const HeaderCenter = styled.div`
  text-align: center;
  flex: 1;
`;

const HeaderRight = styled.div`
  text-align: right;
  min-width: 180px;
  flex-shrink: 0;
`;

const CurrentDate = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 4px;
`;

const CurrentTime = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const OrderCard = styled.div<{ status: string; isNew?: boolean }>`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  border: 3px solid ${props =>
    props.status === 'ready' ? theme.colors.status.success :
    props.status === 'preparing' ? theme.colors.status.warning :
    theme.colors.border
  };
  animation: ${props => props.isNew ? css`${fadeIn} 0.5s ease-out` : 'none'};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  ${props => props.status === 'ready' && css`
    animation: ${pulse} 2s infinite;
  `}

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PickupNumberSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const PickupNumber = styled.div<{ status: string }>`
  font-size: 4rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${props => 
    props.status === 'ready' ? theme.colors.status.success :
    props.status === 'preparing' ? theme.colors.status.warning :
    theme.colors.text.primary
  };
  line-height: 1;
  margin-bottom: ${theme.spacing.sm};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  background: ${props => 
    props.status === 'ready' ? theme.colors.status.success :
    props.status === 'preparing' ? theme.colors.status.warning :
    theme.colors.status.info
  };
  color: ${theme.colors.surface};
`;

const CustomerInfo = styled.div`
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const CustomerName = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const OrderTime = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const ItemsList = styled.div`
  margin-top: ${theme.spacing.md};
`;

const ItemsTitle = styled.h4`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.xs} 0;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const EstimatedTime = styled.div<{ status: string }>`
  text-align: center;
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${props =>
    props.status === 'preparing' ?
    `${theme.colors.status.warning}20` :
    `${theme.colors.status.success}20`
  };
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
`;


const NoOrdersMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
`;

const CustomerDisplayPage: React.FC = () => {
  const { t } = useTranslation('pos');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { operationSettings } = useStore();
  const [dbOrders, setDbOrders] = useState<DbOrder[]>([]);
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());
  const [, setSocket] = useState<Socket | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<{ date: string; time: string }>({ date: '', time: '' });

  const timezone = getRestaurantTimezone(operationSettings);

  // Update current date/time display every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentDateTime({ date: dateStr, time: timeStr });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  // Fetch orders from database - only today's preparing and ready status for display
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;

    try {
      const token = getAuthToken();
      const fetchOptions = {
        credentials: 'include' as RequestCredentials,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      };
      const today = getTodayInTimezone(timezone);
      const [preparingRes, readyRes] = await Promise.all([
        fetch(`/api/orders/restaurant/${user.restaurantId}?status=preparing&limit=100&startDate=${today}&endDate=${today}`, fetchOptions),
        fetch(`/api/orders/restaurant/${user.restaurantId}?status=ready&limit=100&startDate=${today}&endDate=${today}`, fetchOptions)
      ]);

      const preparingResult = await preparingRes.json();
      const readyResult = await readyRes.json();

      const allOrders = [
        ...(preparingResult.success ? preparingResult.data : []),
        ...(readyResult.success ? readyResult.data : [])
      ];

      setDbOrders(allOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, [user?.restaurantId, timezone]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!user?.restaurantId) return;

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling'],
      auth: { token: getAuthToken() } // socket auth (Expand 단계): 서버 미강제 시 무시됨 — 동작 무변경
    });

    newSocket.on('connect', () => {
      console.log('Connected to /orders namespace');
      newSocket.emit('join-restaurant', user.restaurantId);
    });

    newSocket.on('order-created', (order: DbOrder) => {
      console.log('New order received:', order);
      setDbOrders(prev => [order, ...prev]);
    });

    newSocket.on('order-updated', (order: DbOrder) => {
      console.log('Order updated:', order);
      setDbOrders(prev => prev.map(o => o.id === order.id ? order : o));
    });

    newSocket.on('order-deleted', ({ id }: { id: number }) => {
      console.log('Order deleted:', id);
      setDbOrders(prev => prev.filter(o => o.id !== id));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.restaurantId]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Convert DB orders to DisplayOrders format
  useEffect(() => {
    const convertToDisplayOrders = (dbOrders: DbOrder[]): DisplayOrder[] => {
      return dbOrders
        // Filter: only preparing/ready orders, exclude delivery orders (delivery orders don't need pickup display)
        .filter(order =>
          (order.status === 'preparing' || order.status === 'ready') &&
          order.order_type !== 'delivery'
        )
        .map(order => ({
          id: String(order.id),
          orderNumber: order.order_number,
          pickupNumber: order.order_number.split('-')[1] || String(order.id).padStart(3, '0'),
          tableNumber: order.table_number,  // Include table number
          orderType: order.order_type as 'dine_in' | 'takeaway' | 'delivery' | 'pickup',  // Include order type
          status: order.status as 'preparing' | 'ready' | 'completed',
          customerName: order.customer_name || 'Guest',
          items: Array.isArray(order.order_items) ? order.order_items.map((item: any) => ({
            name: item.name || item.menuItem?.name || 'Item',
            quantity: item.quantity || 1
          })) : [],
          createdAt: order.createdAt,
          estimatedTime: 15 // Default estimated time
        }));
    };

    const displayOrders = convertToDisplayOrders(dbOrders);

    // Mark new orders for animation
    setOrders(prevOrders => {
      const currentOrderIds = new Set(prevOrders.map(o => o.id));
      const newIds = displayOrders
        .filter(order => !currentOrderIds.has(order.id))
        .map(order => order.id);

      if (newIds.length > 0) {
        setNewOrderIds(new Set(newIds));
        setTimeout(() => {
          setNewOrderIds(new Set());
        }, 1000);
      }

      return displayOrders;
    });
  }, [dbOrders]);

  const formatTime = (dateString: string) => {
    let date: Date;
    if (dateString.includes(':') && !dateString.includes('T')) {
      const today = new Date();
      const timeStr = dateString.replace(/\s*(AM|PM)/i, ' $1');
      date = new Date(`${today.toDateString()} ${timeStr}`);
    } else {
      date = new Date(dateString);
    }

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone
    });
  };

  const getEstimatedWaitTime = (order: DisplayOrder) => {
    if (order.status === 'ready') return 'Ready for Pickup';
    
    const orderTime = new Date(order.createdAt);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - orderTime.getTime()) / 1000 / 60);
    const estimated = order.estimatedTime || 15;
    const remaining = Math.max(0, estimated - elapsed);
    
    if (remaining === 0) return 'Almost Ready';
    return `About ${remaining} min wait`;
  };

  const getOrderTypeLabel = (orderType: string) => {
    switch (orderType) {
      case 'dine_in': return 'Dine In';
      case 'takeaway': return 'Takeaway';
      case 'pickup': return 'Pre-order';
      default: return '';
    }
  };

  const readyOrders = orders.filter(order => order.status === 'ready');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const sortedOrders = [...readyOrders, ...preparingOrders];

  return (
    <Container>
      <Header>
        <div style={{ minWidth: 180, display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => navigate(`/restaurant/${user?.restaurantId}/dashboard`)}
            title={t('common:backToDashboard', 'Back to Dashboard')}
            style={{
              background: 'none',
              border: '1px solid #C7CED6',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: 'pointer',
              color: '#4B5563',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← {t('common:dashboard', 'Dashboard')}
          </button>
        </div>
        <HeaderCenter>
          <Title>{t('pos:customerDisplayPage.orderStatus')}</Title>
          <Subtitle>{t('pos:customerDisplayPage.pleaseCheckYourPickupNumber')}</Subtitle>
        </HeaderCenter>
        <HeaderRight>
          <CurrentDate>{currentDateTime.date}</CurrentDate>
          <CurrentTime>{currentDateTime.time}</CurrentTime>
        </HeaderRight>
      </Header>

      <OrdersGrid>
        {sortedOrders.length === 0 ? (
          <NoOrdersMessage>
            No orders in progress
          </NoOrdersMessage>
        ) : (
          sortedOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              status={order.status}
              isNew={newOrderIds.has(order.id)}
            >
              <PickupNumberSection>
                <PickupNumber status={order.status}>
                  {order.tableNumber ? `T${order.tableNumber.replace(/^T/i, '')}` : order.pickupNumber}
                </PickupNumber>
                <StatusBadge status={order.status}>
                  {order.tableNumber
                    ? (order.status === 'ready' ? 'Ready - Table Service' : 'Preparing')
                    : (order.status === 'ready' ? 'Ready for Pickup' :
                       order.status === 'preparing' ? 'Preparing' : 'Completed')}
                </StatusBadge>
              </PickupNumberSection>

              <CustomerInfo>
                {order.customerName && (
                  <CustomerName>{order.customerName}</CustomerName>
                )}
                <OrderTime>
                  {formatTime(order.createdAt)}
                  {order.orderType && getOrderTypeLabel(order.orderType) && (
                    <> / {getOrderTypeLabel(order.orderType)}</>
                  )}
                </OrderTime>
              </CustomerInfo>

              <EstimatedTime status={order.status}>
                {getEstimatedWaitTime(order)}
              </EstimatedTime>

              <ItemsList>
                <ItemsTitle>{t('pos:customerDisplayPage.orderItems')}</ItemsTitle>
                {order.items.map((item, index) => (
                  <Item key={index}>
                    <span>{item.name}</span>
                    <span>{item.quantity}x</span>
                  </Item>
                ))}
              </ItemsList>
            </OrderCard>
          ))
        )}
      </OrdersGrid>
    </Container>
  );
};

export default CustomerDisplayPage;