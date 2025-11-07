import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { io, Socket } from 'socket.io-client';

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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
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
  const { user } = useAuth();
  const [dbOrders, setDbOrders] = useState<DbOrder[]>([]);
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());
  const [socket, setSocket] = useState<Socket | null>(null);

  // Fetch orders from database
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;

    try {
      const response = await fetch(`/api/orders/restaurant/${user.restaurantId}`, {
        credentials: 'include'
      });
      const result = await response.json();

      if (result.success && result.data) {
        setDbOrders(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, [user?.restaurantId]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!user?.restaurantId) return;

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling']
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
        .filter(order => order.status === 'preparing' || order.status === 'ready')
        .map(order => ({
          id: String(order.id),
          orderNumber: order.order_number,
          pickupNumber: order.order_number.split('-')[1] || String(order.id).padStart(3, '0'),
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
    // Handle both timestamp and time string formats
    let date: Date;
    if (dateString.includes(':') && !dateString.includes('T')) {
      // If it's a time string like "10:25 AM", use today's date
      const today = new Date();
      const timeStr = dateString.replace(/\s*(AM|PM)/i, ' $1');
      date = new Date(`${today.toDateString()} ${timeStr}`);
    } else {
      // If it's an ISO string or timestamp
      date = new Date(dateString);
    }
    
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
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

  const readyOrders = orders.filter(order => order.status === 'ready');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const sortedOrders = [...readyOrders, ...preparingOrders];

  return (
    <Container>
      <Header>
        <Title>Order Status</Title>
        <Subtitle>Please check your pickup number</Subtitle>
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
                  {order.pickupNumber}
                </PickupNumber>
                <StatusBadge status={order.status}>
                  {order.status === 'ready' ? 'Ready for Pickup' : 
                   order.status === 'preparing' ? 'Preparing' : 'Completed'}
                </StatusBadge>
              </PickupNumberSection>

              <CustomerInfo>
                {order.customerName && (
                  <CustomerName>{order.customerName}</CustomerName>
                )}
                <OrderTime>Order Time: {formatTime(order.createdAt)}</OrderTime>
              </CustomerInfo>

              <EstimatedTime status={order.status}>
                {getEstimatedWaitTime(order)}
              </EstimatedTime>

              <ItemsList>
                <ItemsTitle>Order Items</ItemsTitle>
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