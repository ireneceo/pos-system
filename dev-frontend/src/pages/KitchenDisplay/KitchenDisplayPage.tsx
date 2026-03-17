import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import io, { Socket } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import PageHeader from '../../components/Common/PageHeader';
import { formatTime } from '../../utils/timezone';

// Helper function to format pickup time as range (e.g., "9:00 - 9:30 AM")
const formatPickupTimeRange = (dateString: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000);

  const formatTimeSlot = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    const displayMin = minutes.toString().padStart(2, '0');
    return { time: `${displayHour}:${displayMin}`, period };
  };

  const start = formatTimeSlot(date);
  const end = formatTimeSlot(endDate);

  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
};

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ContentArea = styled.div`
  padding: 16px 20px;
`;

const HeaderInfo = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Clock = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.connected ? '#059669' : '#DC2626'};
`;

const ConnectionDot = styled.div<{ connected: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.connected ? '#059669' : '#DC2626'};
  animation: ${props => props.connected ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const KanbanBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`;

const ColumnHeader = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${props => {
    switch (props.status) {
      case 'pending': return '#FFF7ED';
      case 'preparing': return '#EFF6FF';
      case 'ready': return '#ECFDF5';
      default: return '#F6F9FC';
    }
  }};
  border: 2px solid ${props => {
    switch (props.status) {
      case 'pending': return '#FBBF24';
      case 'preparing': return '#60A5FA';
      case 'ready': return '#34D399';
      default: return '#E6EBF1';
    }
  }};
`;

const ColumnTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColumnTitle = styled.h2<{ status?: string }>`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#D97706';
      case 'preparing': return '#2563EB';
      case 'ready': return '#059669';
      default: return '#0A2540';
    }
  }};
`;

const ColumnCount = styled.div<{ color?: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color || '#0A2540'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CountNumber = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const CountLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  opacity: 0.7;
`;

const OrdersContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const OrderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const OrderNumber = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`;

const OrderTypeBadge = styled.span<{ variant?: 'takeaway' | 'pickup' | 'delivery' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch (props.variant) {
      case 'pickup': return '#EDE9FE';
      case 'delivery': return '#D1FAE5';
      default: return '#FEF3C7';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'pickup': return '#7C3AED';
      case 'delivery': return '#059669';
      default: return '#D97706';
    }
  }};
`;

const OrderRight = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const OrderId = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`;

const ElapsedTime = styled.div<{ urgent?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.urgent ? '#DC2626' : '#6B7C93'};
`;

// ─── Progress Bar ─────────────────────────────────────────────

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percent: number; color: string }>`
  height: 100%;
  width: ${props => props.percent}%;
  background: ${props => props.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`;

// ─── Item Styles ──────────────────────────────────────────────

const ItemRow = styled.div<{ done?: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px 8px;
  margin: 0 -8px;
  border-bottom: 1px solid #F6F9FC;
  border-radius: 4px;
  background: ${props => props.done ? '#F3F4F6' : 'transparent'};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div<{ done?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.done ? '#D1D5DB' : '#0A2540'};
`;

const OptionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

const OptionTag = styled.span<{ done?: boolean }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.done ? '#E5E7EB' : '#EDE9FE'};
  color: ${props => props.done ? '#9CA3AF' : '#6D28D9'};
`;

const SpecialTag = styled.span<{ done?: boolean }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${props => props.done ? '#E5E7EB' : '#FEF2F2'};
  color: ${props => props.done ? '#9CA3AF' : '#DC2626'};
`;

const ItemQty = styled.span<{ highlight?: boolean; done?: boolean }>`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${props => props.highlight ? `
    padding: 1px 7px;
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: 0.5px;
    ${props.done
      ? `background: #E5E7EB; color: #9CA3AF;`
      : `background: #FEF2F2; color: #DC2626;`
    }
  ` : `
    color: inherit;
  `}
`;

const ItemActionButton = styled.button<{ done?: boolean; statusColor?: string }>`
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  border: 1px solid ${props => props.done ? '#E6EBF1' : (props.statusColor || '#10B981')};
  background: ${props => props.done ? '#F3F4F6' : (props.statusColor || '#10B981')};
  color: ${props => props.done ? '#9CA3AF' : 'white'};

  &:hover {
    ${props => !props.done && `
      opacity: 0.85;
    `}
  }
`;

const SetItemsWrap = styled.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`;

const SetItemRow = styled.div<{ done?: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${props => props.done ? '#F3F4F6' : 'transparent'};
`;

const SetItemName = styled.div<{ done?: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.done ? '#D1D5DB' : '#0A2540'};
  flex: 1;
`;

// ─── Action Buttons ───────────────────────────────────────────

const ActionRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

const solidMap: Record<string, { bg: string; hoverBg: string }> = {
  '#F59E0B': { bg: '#F59E0B', hoverBg: '#D97706' },
  '#3B82F6': { bg: '#3B82F6', hoverBg: '#2563EB' },
  '#10B981': { bg: '#10B981', hoverBg: '#059669' },
};

const pastelMap: Record<string, { bg: string; text: string; hoverBg: string }> = {
  '#F59E0B': { bg: '#FFF7ED', text: '#D97706', hoverBg: '#FEF3C7' },
  '#3B82F6': { bg: '#EFF6FF', text: '#1D4ED8', hoverBg: '#DBEAFE' },
  '#10B981': { bg: '#ECFDF5', text: '#047857', hoverBg: '#D1FAE5' },
};

const ActionBtn = styled.button<{ color: string; solid?: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border: ${props => props.solid ? 'none' : `1px solid ${pastelMap[props.color]?.text || props.color}`};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.solid
    ? (solidMap[props.color]?.bg || props.color)
    : (pastelMap[props.color]?.bg || props.color)};
  color: ${props => props.solid ? '#FFFFFF' : (pastelMap[props.color]?.text || 'white')};

  &:hover {
    background: ${props => props.solid
      ? (solidMap[props.color]?.hoverBg || props.color)
      : (pastelMap[props.color]?.hoverBg || props.color)};
  }
`;

const RevertBtn = styled.button`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #6B7C93;
  flex-shrink: 0;

  &:hover {
    background: #F6F9FC;
    border-color: #D1D5DB;
  }
`;

const ItemsContainer = styled.div`
  margin-bottom: 4px;
`;

// ─── Types ────────────────────────────────────────────────────

interface KitchenOrder {
  id: string;
  orderNumber: string;
  pickupNumber: string;
  pagerNumber?: string;
  items: Array<{
    id?: string;
    name: string;
    quantity: number;
    options?: string[];
    special_instructions?: string;
    status?: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
    is_set_menu?: boolean;
    set_items?: Array<{
      id?: string;
      name: string;
      quantity: number;
      status?: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
    }>;
  }>;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  orderTime: Date;
  paymentStatus?: 'pending' | 'completed';
  customerName?: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery' | 'pickup';
  source?: 'pos' | 'mobile' | 'kiosk';
  scheduledPickupTime?: string | null;
}

interface PreparingBatch {
  batchId: string;
  menuName: string;
  formattedName: string;
  itemIds: Set<string>;
}

// ─── View Toggle ─────────────────────────────────────────────

const ViewToggle = styled.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`;

const ViewToggleBtn = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#0A2540' : '#6B7C93'};
  box-shadow: ${props => props.active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'};
`;

// ─── Item View Styles ────────────────────────────────────────

const GroupCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`;

const GroupMenuName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const GroupOrderList = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`;


// ─── Component ────────────────────────────────────────────────

const KitchenDisplayPage: React.FC = () => {
  const { user } = useAuth();
  const { menuItems } = useMenu();
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [operationSettings, setOperationSettings] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'order' | 'item'>(() => {
    return (localStorage.getItem('kitchenDisplayViewMode') as 'order' | 'item') || 'order';
  });

  const [preparingBatches, setPreparingBatches] = useState<PreparingBatch[]>([]);

  // Fetch orders from database
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/restaurant/${user.restaurantId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      const result = await response.json();

      if (result.success && result.data) {
        const dbOrders = result.data;

        const kitchenOrders: KitchenOrder[] = dbOrders
          .filter((order: any) => {
            // Exclude orders that are already served/completed
            if (!['pending', 'preparing', 'ready'].includes(order.status)) return false;
            // For 'ready' orders, also exclude if all items are served/completed
            if (order.status === 'ready') {
              let items = order.order_items || [];
              if (typeof items === 'string') {
                try { items = JSON.parse(items); } catch { items = []; }
              }
              const allServed = items.length > 0 && items.every((item: any) => {
                if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
                  return item.set_items.every((si: any) => si.status === 'served' || si.status === 'completed');
                }
                return item.status === 'served' || item.status === 'completed';
              });
              if (allServed) return false;
            }
            return true;
          })
          .map((order: any) => {
            let orderItems = order.order_items || [];
            if (typeof orderItems === 'string') {
              try { orderItems = JSON.parse(orderItems); } catch { orderItems = []; }
            }

            const processedItems: any[] = [];
            orderItems.forEach((item: any, itemIndex: number) => {
              if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
                const setItems = item.set_items.map((setItem: any, setIndex: number) => ({
                  ...setItem,
                  id: `item-${order.id}-${itemIndex}-set-${setIndex}`,
                  name: setItem.name,
                  quantity: setItem.quantity * (item.quantity || 1),
                  status: setItem.status || 'pending'
                }));

                processedItems.push({
                  ...item,
                  id: `item-${order.id}-${itemIndex}`,
                  name: item.name || item.menuItem?.name || 'Set Menu',
                  quantity: item.quantity,
                  options: item.options || [],
                  special_instructions: item.special_instructions || item.specialInstructions || '',
                  status: item.status || 'pending',
                  is_set_menu: true,
                  set_items: setItems
                });
              } else {
                processedItems.push({
                  ...item,
                  id: `item-${order.id}-${itemIndex}`,
                  name: item.name || item.menuItem?.name || 'Item',
                  quantity: item.quantity,
                  options: item.options || [],
                  special_instructions: item.special_instructions || item.specialInstructions || '',
                  status: item.status || 'pending',
                  is_set_menu: false
                });
              }
            });

            return {
              id: order.id.toString(),
              orderNumber: order.order_number,
              pickupNumber: order.order_number.split('-')[1] || order.order_number.slice(-3),
              pagerNumber: order.pager_number || undefined,
              items: processedItems,
              status: order.status as KitchenOrder['status'],
              orderTime: new Date(order.createdAt),
              paymentStatus: order.payment_status,
              customerName: order.customer_name || undefined,
              tableNumber: order.table_number || undefined,
              orderType: (order.order_type || 'dine-in') as KitchenOrder['orderType'],
              source: order.source || 'pos',
              scheduledPickupTime: order.scheduled_pickup_time || null
            } as KitchenOrder;
          });

        setOrders(prevOrders => {
          const prevOrderIds = new Set(prevOrders.map(o => o.id));
          const newOrders = kitchenOrders.filter(o => !prevOrderIds.has(o.id));
          if (newOrders.length > 0) playNotificationSound();
          return kitchenOrders;
        });
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  // Load operation settings for timezone
  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.restaurantId) return;
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        if (response.ok) {
          const data = await response.json();
          setOperationSettings(data.operation_settings);
        }
      } catch (error) {
        console.error('Failed to load operation settings:', error);
      }
    };
    loadSettings();
  }, [user?.restaurantId]);

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Socket.IO
  useEffect(() => {
    if (!user?.restaurantId) return;

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      timeout: 10000
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join-restaurant', user.restaurantId);
      fetchOrders();
    });

    newSocket.on('disconnect', () => setIsConnected(false));
    newSocket.on('connect_error', () => setIsConnected(false));
    newSocket.on('reconnect', () => {
      setIsConnected(true);
      newSocket.emit('join-restaurant', user.restaurantId);
      fetchOrders();
    });

    newSocket.on('order-created', (order: any) => {
      if (order.restaurant_id !== user.restaurantId) return;

      let orderItems = order.order_items || [];
      if (typeof orderItems === 'string') {
        try { orderItems = JSON.parse(orderItems); } catch { orderItems = []; }
      }

      const expandedItems: any[] = [];
      orderItems.forEach((item: any, itemIndex: number) => {
        const specialInstructions = item.special_instructions || '';
        const setMenuMatch = specialInstructions.match(/^\[(.*?)\]/);

        if (setMenuMatch) {
          const setItemsText = setMenuMatch[1];
          const setItems = setItemsText.split(',').map((s: string) => s.trim());
          setItems.forEach((setItemText: string, setIndex: number) => {
            const match = setItemText.match(/^(.*?)\s+x(\d+)$/);
            if (match) {
              const [, itemName, itemQty] = match;
              expandedItems.push({
                id: `item-${order.id}-${itemIndex}-set-${setIndex}`,
                name: itemName.trim(),
                quantity: parseInt(itemQty) * item.quantity,
                options: [],
                status: item.status || 'pending',
                isSetItem: true,
                parentSetName: item.name
              });
            }
          });
          if (item.options && item.options.length > 0) {
            expandedItems.push({
              id: `item-${order.id}-${itemIndex}`,
              name: `${item.name} (Options)`,
              quantity: item.quantity,
              options: item.options,
              status: item.status || 'pending'
            });
          }
        } else {
          expandedItems.push({
            id: `item-${order.id}-${itemIndex}`,
            name: item.name || item.menuItem?.name || 'Item',
            quantity: item.quantity,
            options: item.options || [],
            status: item.status || 'pending'
          });
        }
      });

      const newOrder: KitchenOrder = {
        id: order.id.toString(),
        orderNumber: order.order_number,
        pickupNumber: order.order_number.split('-')[1] || order.order_number.slice(-3),
        items: expandedItems,
        status: order.status || 'pending',
        orderTime: new Date(order.createdAt || Date.now()),
        tableNumber: order.table_number,
        customerName: order.customer_name,
        orderType: order.order_type || 'dine-in',
        source: order.source || 'pos',
        scheduledPickupTime: order.scheduled_pickup_time || null
      };

      setOrders(prev => [newOrder, ...prev]);
      playNotificationSound();
    });

    newSocket.on('order-updated', (order: any) => {
      console.log('🍳 [KDS] order-updated received:', order.id, order.status, 'at', new Date().toISOString());
      if (order.restaurant_id !== user.restaurantId) return;

      // Parse order_items from socket data
      let orderItems = order.order_items || [];
      if (typeof orderItems === 'string') {
        try { orderItems = JSON.parse(orderItems); } catch { orderItems = []; }
      }

      // Process items (same logic as fetchOrders)
      const processedItems: any[] = [];
      orderItems.forEach((item: any, itemIndex: number) => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          const setItems = item.set_items.map((setItem: any, setIndex: number) => ({
            ...setItem,
            id: `item-${order.id}-${itemIndex}-set-${setIndex}`,
            name: setItem.name,
            quantity: setItem.quantity * (item.quantity || 1),
            status: setItem.status || 'pending'
          }));
          processedItems.push({
            ...item,
            id: `item-${order.id}-${itemIndex}`,
            name: item.name || item.menuItem?.name || 'Set Menu',
            quantity: item.quantity,
            options: item.options || [],
            special_instructions: item.special_instructions || item.specialInstructions || '',
            status: item.status || 'pending',
            is_set_menu: true,
            set_items: setItems
          });
        } else {
          processedItems.push({
            ...item,
            id: `item-${order.id}-${itemIndex}`,
            name: item.name || item.menuItem?.name || 'Item',
            quantity: item.quantity,
            options: item.options || [],
            special_instructions: item.special_instructions || item.specialInstructions || '',
            status: item.status || 'pending',
            is_set_menu: false
          });
        }
      });

      const updatedKitchenOrder: KitchenOrder = {
        id: order.id.toString(),
        orderNumber: order.order_number,
        pickupNumber: (order.order_number || '').split('-')[1] || (order.order_number || '').slice(-3),
        pagerNumber: order.pager_number || undefined,
        items: processedItems,
        status: order.status as KitchenOrder['status'],
        orderTime: new Date(order.createdAt || Date.now()),
        paymentStatus: order.payment_status,
        customerName: order.customer_name || undefined,
        tableNumber: order.table_number || undefined,
        orderType: (order.order_type || 'dine-in') as KitchenOrder['orderType'],
        source: order.source || 'pos',
        scheduledPickupTime: order.scheduled_pickup_time || null
      };

      setOrders(prev => {
        // Check if this order already exists
        const exists = prev.some(o => o.id === order.id.toString());
        let updated;
        if (exists) {
          updated = prev.map(o => o.id === order.id.toString() ? updatedKitchenOrder : o);
        } else {
          // New order coming in (e.g. status changed to pending/preparing/ready from outside)
          updated = [updatedKitchenOrder, ...prev];
        }
        return updated.filter(o => {
          if (!['pending', 'preparing', 'ready'].includes(o.status)) return false;
          if (o.status === 'ready' && areAllItemsServed(o)) return false;
          return true;
        });
      });
    });

    newSocket.on('order-deleted', ({ id }: { id: number }) => {
      setOrders(prev => prev.filter(o => o.id !== id.toString()));
    });

    setSocket(newSocket);
    return () => { newSocket.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => {});
  };

  const getItemCode = (itemName: string): string => {
    const menuItem = menuItems.find(m => m.name === itemName);
    return menuItem?.code || '';
  };

  const formatItemName = (itemName: string): string => {
    const code = getItemCode(itemName);
    return code ? `${code} ${itemName}` : itemName;
  };

  const getElapsedTime = (orderTime: Date) => {
    return Math.floor((currentTime.getTime() - orderTime.getTime()) / 1000 / 60);
  };

  const updateOrderStatus = async (orderId: string, newStatus: KitchenOrder['status'], updateUI: boolean = true) => {
    if (updateUI) {
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ).filter(o => {
        if (!['pending', 'preparing', 'ready'].includes(o.status)) return false;
        if (o.status === 'ready' && areAllItemsServed(o)) return false;
        return true;
      }));
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await response.json();
      if (!result.success) fetchOrders();
    } catch {
      fetchOrders();
    }
  };

  // Get the next item status based on order status
  type ItemStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'completed';

  const getNextItemStatus = (orderStatus: string, currentItemStatus: string): ItemStatus => {
    // Each column: click toggles between the column's "done" state and "active" state
    const columnTarget: Record<string, string> = {
      pending: 'preparing',    // Pending column: Start → preparing
      preparing: 'ready',      // Preparing column: Done → ready
      ready: 'served',         // Ready column: Serve → served
    };
    const target = columnTarget[orderStatus] || 'completed';
    // Toggle: if already at target (or completed for backward compat), revert to base
    const isDone = currentItemStatus === target || (orderStatus === 'ready' && currentItemStatus === 'completed');
    return (isDone ? orderStatus : target) as ItemStatus;
  };

  // Check if all items in an order are fully served (should be removed from Kitchen Display)
  const areAllItemsServed = (order: KitchenOrder): boolean => {
    return order.items.every(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        return item.set_items.every(si => si.status === 'served' || si.status === 'completed');
      }
      return item.status === 'served' || item.status === 'completed';
    });
  };

  // Check if item is "done" for its current column
  const isItemDoneForColumn = (orderStatus: string, itemStatus: string): boolean => {
    switch (orderStatus) {
      case 'pending': return itemStatus === 'preparing' || itemStatus === 'ready' || itemStatus === 'served' || itemStatus === 'completed';
      case 'preparing': return itemStatus === 'ready' || itemStatus === 'served' || itemStatus === 'completed';
      case 'ready': return itemStatus === 'served' || itemStatus === 'completed';
      default: return false;
    }
  };

  // Check if all items are done for the current column
  const areAllItemsDoneForColumn = (items: KitchenOrder['items'], orderStatus: string): boolean => {
    return items.every(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        return item.set_items.every(si => isItemDoneForColumn(orderStatus, si.status || 'pending'));
      }
      return isItemDoneForColumn(orderStatus, item.status || 'pending');
    });
  };

  const updateItemStatus = async (orderId: string, itemId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const updatedItems = order.items.map(item => {
        if (item.id === itemId) {
          const newStatus = getNextItemStatus(order.status, item.status || 'pending');
          return { ...item, status: newStatus };
        }
        return item;
      });

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ order_items: updatedItems.map(item => ({ ...item, status: item.status })) })
      });

      const result = await response.json();
      if (!result.success) return;

      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o)
      );

      // If all items are done for this column, move order to next status
      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const nextOrderStatus: Record<string, KitchenOrder['status']> = {
          pending: 'preparing',
          preparing: 'ready',
          ready: 'served',
        };
        const next = nextOrderStatus[order.status];
        if (next) {
          await updateOrderStatus(orderId, next, true);
        }
      }
    } catch (error) {
      console.error('updateItemStatus error:', error);
      fetchOrders();
    }
  };

  const updateSetItemStatus = async (orderId: string, parentItemId: string, setItemId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const updatedItems = order.items.map(item => {
        if (item.id === parentItemId && item.set_items) {
          const updatedSetItems = item.set_items.map(setItem => {
            if (setItem.id === setItemId) {
              const newStatus = getNextItemStatus(order.status, setItem.status || 'pending');
              return { ...setItem, status: newStatus };
            }
            return setItem;
          });
          const allSetDone = updatedSetItems.every(si => isItemDoneForColumn(order.status, si.status || 'pending'));
          const parentStatus: ItemStatus = allSetDone ? getNextItemStatus(order.status, order.status) : (order.status as ItemStatus);
          return { ...item, set_items: updatedSetItems, status: parentStatus };
        }
        return item;
      });

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ order_items: updatedItems.map(item => ({ ...item, status: item.status })) })
      });

      const result = await response.json();
      if (!result.success) return;

      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o)
      );

      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const nextOrderStatus: Record<string, KitchenOrder['status']> = {
          pending: 'preparing',
          preparing: 'ready',
          ready: 'served',
        };
        const next = nextOrderStatus[order.status];
        if (next) {
          await updateOrderStatus(orderId, next, true);
        }
      }
    } catch {
      fetchOrders();
    }
  };

  const markAllItemsCompletedAndReady = async (orderId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      // Mark all items as 'ready' so they show as active Serve buttons in Ready column
      const updatedItems = order.items.map(item => {
        const updatedItem = { ...item, status: 'ready' as const };
        if (item.set_items && item.set_items.length > 0) {
          updatedItem.set_items = item.set_items.map(setItem => ({ ...setItem, status: 'ready' as const }));
        }
        return updatedItem;
      });

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ order_items: updatedItems.map(item => ({ ...item, status: item.status })) })
      });

      const result = await response.json();
      if (!result.success) return;

      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o)
      );

      await updateOrderStatus(orderId, 'ready', true);
    } catch {
      fetchOrders();
    }
  };

  const markAllItemsAndMove = async (orderId: string, targetStatus: KitchenOrder['status']) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      // Set items to target status (preparing when moving to preparing)
      const resetItems = order.items.map(item => {
        const resetItem = { ...item, status: targetStatus as ItemStatus };
        if (item.set_items && item.set_items.length > 0) {
          resetItem.set_items = item.set_items.map(setItem => ({ ...setItem, status: targetStatus as ItemStatus }));
        }
        return resetItem;
      });

      const token = localStorage.getItem('auth_token');
      await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ order_items: resetItems.map(item => ({ ...item, status: item.status })) })
      });

      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? { ...o, items: resetItems as any } : o)
      );

      await updateOrderStatus(orderId, targetStatus, true);
    } catch {
      fetchOrders();
    }
  };

  const markAllServed = async (orderId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const updatedItems = order.items.map(item => {
        const updatedItem = { ...item, status: 'served' as const };
        if (item.set_items && item.set_items.length > 0) {
          updatedItem.set_items = item.set_items.map(setItem => ({ ...setItem, status: 'served' as const }));
        }
        return updatedItem;
      });

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ order_items: updatedItems.map(item => ({ ...item, status: item.status })) })
      });

      const result = await response.json();
      if (!result.success) return;

      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o)
      );

      await updateOrderStatus(orderId, 'served', true);
    } catch {
      fetchOrders();
    }
  };

  const getOrdersByStatus = (status: KitchenOrder['status']) => {
    return orders
      .filter(order => order.status === status)
      .sort((a, b) => a.orderTime.getTime() - b.orderTime.getTime());
  };

  const counts = {
    pending: getOrdersByStatus('pending').length,
    preparing: getOrdersByStatus('preparing').length,
    ready: getOrdersByStatus('ready').length
  };

  // 주문단위: 총 아이템 수 (세트메뉴는 set_items 개별 카운트)
  const getOrderItemCount = (status: KitchenOrder['status']): number => {
    return getOrdersByStatus(status).reduce((sum, o) => {
      return sum + o.items.reduce((iSum, item) => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          return iSum + item.set_items.length;
        }
        return iSum + 1;
      }, 0);
    }, 0);
  };

  // 아이템단위: 해당 item.status인 아이템 수
  const getItemStatusCount = (status: string): number => {
    // pending: order.status==='pending'인 주문에서 item.status==='pending'인 것만
    // (preparing 주문의 되돌린 pending 아이템은 Pending 카드에 보이지만 카운트는 주문단위와 정합성 유지)
    const targetOrders = orders.filter(o => o.status === status);
    return targetOrders.reduce((sum, o) => {
      return sum + o.items.reduce((iSum, item) => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          return iSum + item.set_items.filter(si => (si.status || 'pending') === status).length;
        }
        return iSum + ((item.status || 'pending') === status ? 1 : 0);
      }, 0);
    }, 0);
  };

  // ─── Render helpers ─────────────────────────────────────────

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'preparing': return '#3B82F6';
      case 'ready': return '#10B981';
      default: return '#6B7C93';
    }
  };

  const renderOrderCard = (order: KitchenOrder) => {
    const elapsedTime = getElapsedTime(order.orderTime);
    const isUrgent = elapsedTime > 15 && order.status === 'pending';
    // Count set_items individually instead of parent set menu item
    let totalItems = 0;
    let completedItems = 0;
    order.items.forEach(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        totalItems += item.set_items.length;
        completedItems += item.set_items.filter(si => isItemDoneForColumn(order.status, si.status || 'pending')).length;
      } else {
        totalItems += 1;
        if (isItemDoneForColumn(order.status, item.status || 'pending')) completedItems += 1;
      }
    });
    const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const statusColor = getStatusColor(order.status);

    return (
      <OrderCard key={order.id}>
        {/* Header: Order identifier + elapsed time */}
        <OrderHeader>
          <OrderLeft>
            <OrderNumber>
              {order.tableNumber ? `T${order.tableNumber.replace(/^T/i, '')}` :
               order.pagerNumber ? `P${order.pagerNumber}` : `#${order.pickupNumber}`}
            </OrderNumber>
            {order.orderType === 'takeaway' && (
              <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>
            )}
            {order.orderType === 'pickup' && (
              <OrderTypeBadge variant="pickup">
                PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime) : 'ASAP'}
              </OrderTypeBadge>
            )}
            {order.orderType === 'delivery' && (
              <OrderTypeBadge variant="delivery">DELIVERY</OrderTypeBadge>
            )}
          </OrderLeft>
          <OrderRight>
            <OrderId>{order.orderNumber}</OrderId>
            <ElapsedTime urgent={isUrgent}>{elapsedTime}m</ElapsedTime>
          </OrderRight>
        </OrderHeader>

        {/* Progress: visual bar + count */}
        {totalItems > 1 && <ProgressContainer>
          <ProgressBar>
            <ProgressFill percent={progressPercent} color={statusColor} />
          </ProgressBar>
          <ProgressText>{completedItems}/{totalItems}</ProgressText>
        </ProgressContainer>}

        {/* Items */}
        <ItemsContainer>
          {order.items.map((item) => (
            <React.Fragment key={item.id}>
              <ItemRow done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>
                <ItemInfo>
                  {item.is_set_menu ? (
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B7C93' }}>
                      {formatItemName(item.name)} {item.quantity > 1 && <ItemQty highlight done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>x {item.quantity}</ItemQty>}
                    </div>
                  ) : (
                    <ItemName done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>
                      {formatItemName(item.name)} {item.quantity > 1 && <ItemQty highlight done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>x {item.quantity}</ItemQty>}
                    </ItemName>
                  )}
                  {(() => {
                    const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
                    if (regularOptions.length === 0 && !item.special_instructions) return null;
                    return (
                      <OptionTags>
                        {regularOptions.map((option, idx) => (
                          <OptionTag key={idx} done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>{option}</OptionTag>
                        ))}
                        {item.special_instructions && (
                          <SpecialTag done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>{item.special_instructions}</SpecialTag>
                        )}
                      </OptionTags>
                    );
                  })()}
                </ItemInfo>
                {!item.is_set_menu && totalItems === 1 && (
                  <RevertBtn
                    style={{ padding: '6px 10px', fontSize: '12px', marginRight: 4 }}
                    onClick={() => {
                      const prevStatus = order.status === 'preparing' ? 'pending' : order.status === 'ready' ? 'preparing' : null;
                      if (prevStatus) updateOrderStatus(order.id, prevStatus);
                    }}
                  >↺</RevertBtn>
                )}
                {!item.is_set_menu && (
                  <ItemActionButton
                    done={isItemDoneForColumn(order.status, item.status || 'pending')}
                    statusColor={statusColor}
                    onClick={() => updateItemStatus(order.id, item.id!)}
                  >
                    {isItemDoneForColumn(order.status, item.status || 'pending')
                      ? (order.status === 'pending' ? 'Started' : order.status === 'preparing' ? 'Done ✓' : 'Served')
                      : (order.status === 'pending' ? 'Start' : order.status === 'preparing' ? 'Done' : 'Serve')
                    }
                  </ItemActionButton>
                )}
              </ItemRow>

              {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                <SetItemsWrap>
                  {item.set_items.map((setItem) => (
                    <SetItemRow key={setItem.id} done={isItemDoneForColumn(order.status, setItem.status || 'pending') && order.status !== 'pending'}>
                      <SetItemName done={isItemDoneForColumn(order.status, setItem.status || 'pending') && order.status !== 'pending'}>
                        {formatItemName(setItem.name)} {setItem.quantity > 1 && <ItemQty highlight done={isItemDoneForColumn(order.status, setItem.status || 'pending') && order.status !== 'pending'}>x {setItem.quantity}</ItemQty>}
                      </SetItemName>
                      <ItemActionButton
                        done={isItemDoneForColumn(order.status, setItem.status || 'pending')}
                        statusColor={statusColor}
                        onClick={() => updateSetItemStatus(order.id, item.id!, setItem.id!)}
                      >
                        {isItemDoneForColumn(order.status, setItem.status || 'pending')
                          ? (order.status === 'pending' ? 'Started' : order.status === 'preparing' ? 'Done ✓' : 'Served')
                          : (order.status === 'pending' ? 'Start' : order.status === 'preparing' ? 'Done' : 'Serve')
                        }
                      </ItemActionButton>
                    </SetItemRow>
                  ))}
                </SetItemsWrap>
              )}
            </React.Fragment>
          ))}
        </ItemsContainer>

        {/* Actions */}
        {order.status === 'pending' && totalItems > 1 && (
          <ActionRow>
            <ActionBtn color="#F59E0B" onClick={() => markAllItemsAndMove(order.id, 'preparing')}>
              Start All
            </ActionBtn>
          </ActionRow>
        )}
        {order.status === 'preparing' && totalItems > 1 && (
          <ActionRow>
            <RevertBtn onClick={() => updateOrderStatus(order.id, 'pending')}>
              ↺
            </RevertBtn>
            <ActionBtn color="#3B82F6" onClick={() => markAllItemsCompletedAndReady(order.id)}>
              Mark Ready
            </ActionBtn>
          </ActionRow>
        )}
        {order.status === 'ready' && totalItems > 1 && (
          <ActionRow>
            <RevertBtn onClick={() => updateOrderStatus(order.id, 'preparing')}>
              ↺
            </RevertBtn>
            <ActionBtn color="#10B981" onClick={() => markAllServed(order.id)}>
              Serve All
            </ActionBtn>
          </ActionRow>
        )}
      </OrderCard>
    );
  };

  // ─── Item View: Pending (메뉴 그룹핑) ───────────────────────

  interface ItemSource {
    orderId: string;
    itemId: string;
    label: string;
    orderNumber: string;
    quantity: number;
    options?: string[];
    special_instructions?: string;
    is_set_menu?: boolean;
  }

  interface MenuGroup {
    menuName: string;
    formattedName: string;
    plainQty: number;       // 옵션 없는 아이템 합산 수량
    plainSources: ItemSource[];
    optionSources: ItemSource[]; // 옵션/특별지시 있는 아이템 (개별 표시)
    earliestTime: Date;
  }

  // 아이템 뷰 Pending 그룹핑 — item.status === 'pending'인 모든 아이템 수집 (주문 상태 무관)
  const getItemViewPendingGroups = (): MenuGroup[] => {
    const groupMap = new Map<string, MenuGroup>();

    // pending/preparing 주문에서 item.status가 pending인 아이템 수집
    orders.filter(o => ['pending', 'preparing'].includes(o.status)).forEach(order => {
      const label = order.tableNumber
        ? `T${order.tableNumber.replace(/^T/i, '')}`
        : order.pagerNumber
        ? `P${order.pagerNumber}`
        : `#${order.pickupNumber}`;

      order.items.forEach(item => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          item.set_items.forEach(setItem => {
            if ((setItem.status || 'pending') !== 'pending') return;
            const key = setItem.name;
            if (!groupMap.has(key)) {
              groupMap.set(key, {
                menuName: setItem.name, formattedName: formatItemName(setItem.name),
                plainQty: 0, plainSources: [], optionSources: [],
                earliestTime: order.orderTime
              });
            }
            const group = groupMap.get(key)!;
            group.plainQty += setItem.quantity;
            if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;
            group.plainSources.push({
              orderId: order.id, itemId: setItem.id!, label, orderNumber: order.orderNumber,
              quantity: setItem.quantity, is_set_menu: true
            });
          });
        } else {
          if ((item.status || 'pending') !== 'pending') return;
          const key = item.name;
          if (!groupMap.has(key)) {
            groupMap.set(key, {
              menuName: item.name, formattedName: formatItemName(item.name),
              plainQty: 0, plainSources: [], optionSources: [],
              earliestTime: order.orderTime
            });
          }
          const group = groupMap.get(key)!;
          if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;

          const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
          const hasCustomization = regularOptions.length > 0 || !!item.special_instructions;

          if (hasCustomization) {
            group.optionSources.push({
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity,
              options: regularOptions,
              special_instructions: item.special_instructions
            });
          } else {
            group.plainQty += item.quantity;
            group.plainSources.push({
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity
            });
          }
        }
      });
    });

    return Array.from(groupMap.values()).sort((a, b) => a.earliestTime.getTime() - b.earliestTime.getTime());
  };

  // 그룹 아이템들을 주문 단위로 모아서 한 번에 상태 변경 + 자동전진
  const handleGroupBatch = async (group: MenuGroup, direction: 'forward' | 'revert', column?: 'pending' | 'preparing') => {
    const allSources = [...group.plainSources, ...group.optionSources];

    // 주문별로 아이템 ID 모으기
    const orderItemMap = new Map<string, Set<string>>();
    allSources.forEach(s => {
      if (!orderItemMap.has(s.orderId)) orderItemMap.set(s.orderId, new Set());
      orderItemMap.get(s.orderId)!.add(s.itemId);
    });

    const token = localStorage.getItem('auth_token');

    // 주문별 업데이트 데이터 준비
    const updates = Array.from(orderItemMap.entries()).map(([orderId, itemIds]) => {
      const order = orders.find(o => o.id === orderId);
      if (!order) return null;

      const updatedItems = order.items.map(item => {
        if (item.is_set_menu && item.set_items) {
          // column 기반 다음 상태: pending→preparing, preparing→ready
          const forwardTarget: Record<string, ItemStatus> = { pending: 'preparing', preparing: 'ready' };
          const revertTarget: Record<string, ItemStatus> = { preparing: 'pending', ready: 'preparing', served: 'ready' };
          const effectiveColumn = column || order.status;

          const updatedSetItems = item.set_items.map(si => {
            if (!itemIds.has(si.id!)) return si;
            if (direction === 'forward') {
              return { ...si, status: forwardTarget[effectiveColumn] || 'preparing' };
            } else {
              return { ...si, status: revertTarget[si.status || 'pending'] || si.status };
            }
          });
          // 세트 부모 상태: 모든 세트 아이템이 해당 컬럼 done이면 전진
          const allSetDone = updatedSetItems.every(si => isItemDoneForColumn(order.status, si.status || 'pending'));
          const parentStatus: ItemStatus = allSetDone ? (forwardTarget[order.status] || order.status as ItemStatus) : (order.status as ItemStatus);
          return { ...item, set_items: updatedSetItems, status: parentStatus };
        }
        if (!itemIds.has(item.id!)) return item;
        const forwardTarget: Record<string, ItemStatus> = { pending: 'preparing', preparing: 'ready' };
        const revertTarget: Record<string, ItemStatus> = { preparing: 'pending', ready: 'preparing', served: 'ready' };
        const effectiveColumn = column || order.status;
        if (direction === 'forward') {
          return { ...item, status: forwardTarget[effectiveColumn] || 'preparing' };
        } else {
          return { ...item, status: revertTarget[item.status || 'pending'] || item.status };
        }
      });

      return { orderId, order, updatedItems };
    }).filter(Boolean) as Array<{ orderId: string; order: KitchenOrder; updatedItems: any[] }>;

    // 모든 주문 동시에 API 호출
    try {
      const results = await Promise.all(updates.map(({ orderId, updatedItems }) =>
        fetch(`/api/orders/${orderId}/items`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ order_items: updatedItems.map(item => ({ ...item, status: item.status })) })
        }).then(r => r.json())
      ));

      if (results.some(r => !r.success)) { fetchOrders(); return; }

      // 모든 주문의 아이템 상태 한 번에 업데이트
      setOrders(prev => prev.map(o => {
        const update = updates.find(u => u.orderId === o.id);
        return update ? { ...o, items: update.updatedItems as any } : o;
      }));

      // Preparing 배치 관리
      const allItemIds = new Set(allSources.map(s => s.itemId));
      if (direction === 'forward' && column === 'pending') {
        // Pending → Preparing: 배치 등록
        const batchId = `batch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setPreparingBatches(prev => [...prev, {
          batchId,
          menuName: group.menuName,
          formattedName: group.formattedName,
          itemIds: allItemIds
        }]);
      } else if (direction === 'revert' && column === 'preparing') {
        // Preparing → Pending: 배치에서 해당 아이템 제거
        setPreparingBatches(prev => prev
          .map(b => {
            const remaining = new Set(Array.from(b.itemIds).filter(id => !allItemIds.has(id)));
            return { ...b, itemIds: remaining };
          })
          .filter(b => b.itemIds.size > 0)
        );
      }

      // 자동전진/롤백 처리 (동시에)
      const statusUpdates = updates.map(({ orderId, order, updatedItems }) => {
        if (direction === 'forward') {
          if (areAllItemsDoneForColumn(updatedItems, order.status)) {
            const nextOrderStatus: Record<string, KitchenOrder['status']> = {
              pending: 'preparing', preparing: 'ready', ready: 'served',
            };
            const next = nextOrderStatus[order.status];
            if (next) return updateOrderStatus(orderId, next, true);
          }
        } else {
          const prevOrderStatus: Record<string, KitchenOrder['status']> = {
            preparing: 'pending', ready: 'preparing', served: 'ready',
          };
          const prevStatus = prevOrderStatus[order.status];
          if (prevStatus) {
            const allReverted = updatedItems.every(it => {
              if (it.is_set_menu && it.set_items && it.set_items.length > 0) {
                return it.set_items.every(si => (si.status || 'pending') === prevStatus);
              }
              return (it.status || 'pending') === prevStatus;
            });
            if (allReverted) return updateOrderStatus(orderId, prevStatus, true);
          }
        }
        return Promise.resolve();
      });
      await Promise.all(statusUpdates);
    } catch {
      fetchOrders();
    }
  };

  // Pending/Preparing 공통 그룹 카드 렌더링
  const renderGroupCard = (group: MenuGroup, idx: number, column: 'pending' | 'preparing') => {
    const totalQty = group.plainQty + group.optionSources.reduce((s, o) => s + o.quantity, 0);


    const plainLabelMap = new Map<string, number>();
    group.plainSources.forEach(s => {
      plainLabelMap.set(s.label, (plainLabelMap.get(s.label) || 0) + s.quantity);
    });
    const plainLabelText = Array.from(plainLabelMap.entries())
      .map(([label, qty]) => qty > 1 ? `${label} x${qty}` : label)
      .join(', ');

    const actionColor = column === 'pending' ? '#F59E0B' : '#3B82F6';
    const isSingle = totalQty <= 1;
    const actionLabel = column === 'pending'
      ? (isSingle ? 'Start' : 'Start All')
      : (isSingle ? 'Done' : 'Done All');
    return (
      <GroupCard key={`${column}-group-${idx}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <GroupMenuName>
            {group.formattedName}
            {totalQty > 1 && <ItemQty highlight>x {totalQty}</ItemQty>}
          </GroupMenuName>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {column === 'preparing' && (
              <RevertBtn style={{ padding: '10px 14px', fontSize: '16px' }}
                onClick={() => handleGroupBatch(group, 'revert', column)}>↺</RevertBtn>
            )}
            <ActionBtn color={actionColor} solid={isSingle} style={{ flex: 'none', padding: '10px 20px', fontSize: '14px' }}
              onClick={() => handleGroupBatch(group, 'forward', column)}>
              {actionLabel}
            </ActionBtn>
          </div>
        </div>

        {group.plainQty > 0 && (
          <GroupOrderList>{plainLabelText}</GroupOrderList>
        )}

        {group.optionSources.length > 0 && (
          <div style={{
            marginTop: 8,
            paddingTop: group.plainQty > 0 ? 8 : 0,
            borderTop: group.plainQty > 0 ? '1px solid #E6EBF1' : 'none'
          }}>
            {group.optionSources.map((src, si) => (
              <div key={`opt-${si}`} style={{
                padding: '6px 0',
                borderBottom: si < group.optionSources.length - 1 ? '1px dashed #E6EBF1' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF' }}>{src.label}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{src.orderNumber}</span>
                  {src.quantity > 1 && <span style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF' }}>x{src.quantity}</span>}
                </div>
                  <OptionTags>
                    {src.options?.map((opt, i) => <OptionTag key={i}>{opt}</OptionTag>)}
                    {src.special_instructions && <SpecialTag>{src.special_instructions}</SpecialTag>}
                  </OptionTags>
                </div>
              ))}
            </div>
          )}
        </GroupCard>
      );
  };

  const renderItemViewPending = () => {
    return getItemViewPendingGroups().map((group, idx) => renderGroupCard(group, idx, 'pending'));
  };

  const renderItemViewPreparing = () => {
    // Preparing: 배치 기반 — Pending에서 보낸 카드 그대로 유지
    // 배치에 등록된 아이템은 배치별 카드로, 미등록 아이템(페이지 새로고침 등)은 Pending과 동일 그룹핑
    const groups: MenuGroup[] = [];
    const batchedItemIds = new Set<string>();

    // 1) 배치별 카드 생성
    preparingBatches.forEach(batch => {
      const group: MenuGroup = {
        menuName: batch.menuName,
        formattedName: batch.formattedName,
        plainQty: 0, plainSources: [], optionSources: [],
        earliestTime: new Date()
      };
      let hasItems = false;

      orders.filter(o => ['preparing', 'pending'].includes(o.status)).forEach(order => {
        const label = order.tableNumber
          ? `T${order.tableNumber.replace(/^T/i, '')}`
          : order.pagerNumber
          ? `P${order.pagerNumber}`
          : `#${order.pickupNumber}`;

        order.items.forEach(item => {
          if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
            item.set_items.forEach(setItem => {
              if (!batch.itemIds.has(setItem.id!)) return;
              if ((setItem.status || 'pending') !== 'preparing') return;
              batchedItemIds.add(setItem.id!);
              hasItems = true;
              group.plainQty += setItem.quantity;
              group.plainSources.push({
                orderId: order.id, itemId: setItem.id!, label, orderNumber: order.orderNumber,
                quantity: setItem.quantity, is_set_menu: true
              });
              if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;
            });
          } else {
            if (!batch.itemIds.has(item.id!)) return;
            if ((item.status || 'pending') !== 'preparing') return;
            batchedItemIds.add(item.id!);
            hasItems = true;
            if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;
            const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
            const hasCustomization = regularOptions.length > 0 || !!item.special_instructions;
            if (hasCustomization) {
              group.optionSources.push({
                orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
                quantity: item.quantity, options: regularOptions,
                special_instructions: item.special_instructions
              });
            } else {
              group.plainQty += item.quantity;
              group.plainSources.push({
                orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
                quantity: item.quantity
              });
            }
          }
        });
      });

      if (hasItems) groups.push(group);
    });

    // 2) 배치에 없는 preparing 아이템 — 각각 개별 카드 (합치지 않음)
    orders.filter(o => o.status === 'preparing').forEach(order => {
      const label = order.tableNumber
        ? `T${order.tableNumber.replace(/^T/i, '')}`
        : order.pagerNumber
        ? `P${order.pagerNumber}`
        : `#${order.pickupNumber}`;

      order.items.forEach(item => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          item.set_items.forEach(setItem => {
            if (batchedItemIds.has(setItem.id!)) return;
            if ((setItem.status || 'pending') !== 'preparing') return;
            groups.push({
              menuName: setItem.name, formattedName: formatItemName(setItem.name),
              plainQty: setItem.quantity,
              plainSources: [{
                orderId: order.id, itemId: setItem.id!, label, orderNumber: order.orderNumber,
                quantity: setItem.quantity, is_set_menu: true
              }],
              optionSources: [],
              earliestTime: order.orderTime
            });
          });
        } else {
          if (batchedItemIds.has(item.id!)) return;
          if ((item.status || 'pending') !== 'preparing') return;
          const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
          const hasCustomization = regularOptions.length > 0 || !!item.special_instructions;
          groups.push({
            menuName: item.name, formattedName: formatItemName(item.name),
            plainQty: hasCustomization ? 0 : item.quantity,
            plainSources: hasCustomization ? [] : [{
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity
            }],
            optionSources: hasCustomization ? [{
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity, options: regularOptions,
              special_instructions: item.special_instructions
            }] : [],
            earliestTime: order.orderTime
          });
        }
      });
    });

    groups.sort((a, b) => a.earliestTime.getTime() - b.earliestTime.getTime());
    return groups.map((group, idx) => renderGroupCard(group, idx, 'preparing'));
  };

  // ─── Item View: Ready (주문 단위, preparing 중 부분 ready 포함) ──

  const getItemViewReadyOrders = (): KitchenOrder[] => {
    // 아이템 상태 기준: ready 또는 served 아이템이 있는 모든 주문 (모든 아이템 served면 제외)
    return orders
      .filter(o => ['pending', 'preparing', 'ready'].includes(o.status))
      .filter(o => !areAllItemsServed(o))
      .filter(o => {
        return o.items.some(item => {
          if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
            return item.set_items.some(si => si.status === 'ready' || si.status === 'served' || si.status === 'completed');
          }
          return item.status === 'ready' || item.status === 'served' || item.status === 'completed';
        });
      })
      .sort((a, b) => a.orderTime.getTime() - b.orderTime.getTime());
  };

  const renderItemViewReady = () => {
    const readyOrders = getItemViewReadyOrders();
    return readyOrders.map(order => {
      const elapsedTime = getElapsedTime(order.orderTime);
      const statusColor = '#10B981';

      // 전체 아이템/ready 아이템 카운트
      let totalItems = 0;
      let readyItems = 0;
      let servedItems = 0;
      const allFlatItems: Array<{
        id: string;
        parentId?: string;
        name: string;
        quantity: number;
        options?: string[];
        special_instructions?: string;
        status: string;
        isSetItem: boolean;
      }> = [];

      order.items.forEach(item => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          item.set_items.forEach(si => {
            totalItems++;
            const st = si.status || 'pending';
            if (st === 'ready') readyItems++;
            if (st === 'served' || st === 'completed') servedItems++;
            allFlatItems.push({
              id: si.id!, parentId: item.id, name: si.name,
              quantity: si.quantity, status: st, isSetItem: true
            });
          });
        } else {
          totalItems++;
          const st = item.status || 'pending';
          if (st === 'ready') readyItems++;
          if (st === 'served' || st === 'completed') servedItems++;
          allFlatItems.push({
            id: item.id!, name: item.name, quantity: item.quantity,
            options: item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)),
            special_instructions: item.special_instructions,
            status: st, isSetItem: false
          });
        }
      });

      const waitingCount = totalItems - readyItems - servedItems;
      const progressPercent = totalItems > 0 ? (servedItems / totalItems) * 100 : 0;

      // ready/served 아이템만 표시 (preparing/pending은 "waiting"으로)
      const visibleItems = allFlatItems.filter(i => i.status === 'ready' || i.status === 'served' || i.status === 'completed');

      // ready/served 아이템이 하나도 없으면 카드 표시 안 함
      if (visibleItems.length === 0) return null;

      return (
        <OrderCard key={order.id}>
          <OrderHeader>
            <OrderLeft>
              <OrderNumber>
                {order.tableNumber ? `T${order.tableNumber.replace(/^T/i, '')}` :
                 order.pagerNumber ? `P${order.pagerNumber}` : `#${order.pickupNumber}`}
              </OrderNumber>
              {order.orderType === 'takeaway' && <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>}
              {order.orderType === 'pickup' && (
                <OrderTypeBadge variant="pickup">
                  PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime) : 'ASAP'}
                </OrderTypeBadge>
              )}
              {order.orderType === 'delivery' && <OrderTypeBadge variant="delivery">DELIVERY</OrderTypeBadge>}
            </OrderLeft>
            <OrderRight>
              <OrderId>{order.orderNumber}</OrderId>
              <ElapsedTime>{elapsedTime}m</ElapsedTime>
            </OrderRight>
          </OrderHeader>

          {/* Progress - 아이템 2개 이상일 때만 */}
          {totalItems > 1 && (
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill percent={progressPercent} color={statusColor} />
              </ProgressBar>
              <ProgressText>{servedItems}/{totalItems}</ProgressText>
            </ProgressContainer>
          )}

          {/* Ready/Served 아이템 */}
          <ItemsContainer>
            {visibleItems.map((fi, idx) => {
              const isServed = fi.status === 'served' || fi.status === 'completed';
              return (
                <ItemRow key={idx} done={isServed}>
                  <ItemInfo>
                    <ItemName done={isServed}>
                      {formatItemName(fi.name)} {fi.quantity > 1 && <ItemQty highlight done={isServed}>x {fi.quantity}</ItemQty>}
                    </ItemName>
                    {((fi.options && fi.options.length > 0) || fi.special_instructions) && (
                      <OptionTags>
                        {fi.options?.map((opt, i) => <OptionTag key={i} done={isServed}>{opt}</OptionTag>)}
                        {fi.special_instructions && <SpecialTag done={isServed}>{fi.special_instructions}</SpecialTag>}
                      </OptionTags>
                    )}
                  </ItemInfo>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {!isServed && (
                      <RevertBtn style={{ padding: '4px 8px', fontSize: '11px' }}
                        onClick={async () => {
                          const updatedItems = order.items.map(it => {
                            if (fi.isSetItem && fi.parentId && it.id === fi.parentId && it.set_items) {
                              return { ...it, set_items: it.set_items.map(si => si.id === fi.id ? { ...si, status: 'preparing' } : si) };
                            }
                            if (!fi.isSetItem && it.id === fi.id) {
                              return { ...it, status: 'preparing' };
                            }
                            return it;
                          });
                          const token = localStorage.getItem('auth_token');
                          try {
                            const response = await fetch(`/api/orders/${order.id}/items`, {
                              method: 'PATCH', credentials: 'include',
                              headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
                              body: JSON.stringify({ order_items: updatedItems.map(it => ({ ...it, status: it.status })) })
                            });
                            const result = await response.json();
                            if (!result.success) { fetchOrders(); return; }
                            setOrders(prev => prev.map(o => o.id === order.id ? { ...o, items: updatedItems as any } : o));
                            // 되돌린 아이템을 개별 배치로 등록 (Preparing에서 합쳐지지 않도록)
                            setPreparingBatches(prev => [...prev, {
                              batchId: `batch-revert-${Date.now()}`,
                              menuName: fi.name,
                              formattedName: formatItemName(fi.name),
                              itemIds: new Set([fi.id])
                            }]);
                            // ready/served 아이템이 하나도 없으면 주문을 preparing으로
                            const hasReadyOrServed = updatedItems.some(it => {
                              if (it.is_set_menu && it.set_items && it.set_items.length > 0) {
                                return it.set_items.some(si => si.status === 'ready' || si.status === 'served' || si.status === 'completed');
                              }
                              return it.status === 'ready' || it.status === 'served' || it.status === 'completed';
                            });
                            if (!hasReadyOrServed && order.status === 'ready') {
                              await updateOrderStatus(order.id, 'preparing', true);
                            }
                          } catch { fetchOrders(); }
                        }}>↺</RevertBtn>
                    )}
                    <ItemActionButton
                      done={isServed}
                      statusColor={statusColor}
                      onClick={() => {
                        if (fi.isSetItem && fi.parentId) {
                          updateSetItemStatus(order.id, fi.parentId, fi.id);
                        } else {
                          updateItemStatus(order.id, fi.id);
                        }
                      }}
                    >
                      {isServed ? 'Served' : 'Serve'}
                    </ItemActionButton>
                  </div>
                </ItemRow>
              );
            })}
          </ItemsContainer>

          {/* Waiting 표시 */}
          {waitingCount > 0 && (
            <div style={{ marginTop: 8, padding: '6px 10px', background: '#FEF3C7', borderRadius: 4, fontSize: 12, fontWeight: 600, color: '#D97706', textAlign: 'center' }}>
              Waiting {waitingCount} item{waitingCount > 1 ? 's' : ''} from kitchen
            </div>
          )}

          {/* Serve All (아이템 2개 이상 + 모든 아이템 ready일 때만) */}
          {waitingCount === 0 && visibleItems.length > 1 && visibleItems.some(i => i.status === 'ready') && (
            <ActionRow>
              <ActionBtn color="#10B981" onClick={() => markAllServed(order.id)}>Serve All</ActionBtn>
            </ActionRow>
          )}
        </OrderCard>
      );
    });
  };

  return (
    <Container>
      <PageHeader title="Kitchen Display">
        <HeaderInfo>
          <ViewToggle>
            <ViewToggleBtn active={viewMode === 'order'} onClick={() => { setViewMode('order'); localStorage.setItem('kitchenDisplayViewMode', 'order'); }}>Order</ViewToggleBtn>
            <ViewToggleBtn active={viewMode === 'item'} onClick={() => { setViewMode('item'); localStorage.setItem('kitchenDisplayViewMode', 'item'); }}>Item</ViewToggleBtn>
          </ViewToggle>
          <ConnectionStatus connected={isConnected}>
            <ConnectionDot connected={isConnected} />
            {isConnected ? 'Live' : 'Offline'}
          </ConnectionStatus>
          <Clock>{formatTime(currentTime, operationSettings)}</Clock>
        </HeaderInfo>
      </PageHeader>

      <ContentArea>
      <KanbanBoard>
        {/* Pending */}
        <Column>
          <ColumnHeader status="pending">
            <ColumnTitleGroup>
              <ColumnTitle status="pending">Pending</ColumnTitle>
            </ColumnTitleGroup>
            <ColumnCount color="#F59E0B">
              {viewMode === 'order'
                ? <><CountNumber>{counts.pending}</CountNumber><CountLabel>Orders</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getOrderItemCount('pending')}</CountNumber><CountLabel>Items</CountLabel></>
                : <><CountNumber>{getItemViewPendingGroups().length}</CountNumber><CountLabel>Menus</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getItemStatusCount('pending')}</CountNumber><CountLabel>Items</CountLabel></>
              }
            </ColumnCount>
          </ColumnHeader>
          <OrdersContainer>
            {viewMode === 'order'
              ? getOrdersByStatus('pending').map(renderOrderCard)
              : renderItemViewPending()
            }
          </OrdersContainer>
        </Column>

        {/* Preparing */}
        <Column>
          <ColumnHeader status="preparing">
            <ColumnTitleGroup>
              <ColumnTitle status="preparing">Preparing</ColumnTitle>
            </ColumnTitleGroup>
            <ColumnCount color="#3B82F6">
              {viewMode === 'order'
                ? <><CountNumber>{counts.preparing}</CountNumber><CountLabel>Orders</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getOrderItemCount('preparing')}</CountNumber><CountLabel>Items</CountLabel></>
                : <><CountNumber>{getItemStatusCount('preparing')}</CountNumber><CountLabel>Menus</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getItemStatusCount('preparing')}</CountNumber><CountLabel>Items</CountLabel></>
              }
            </ColumnCount>
          </ColumnHeader>
          <OrdersContainer>
            {viewMode === 'order'
              ? getOrdersByStatus('preparing').map(renderOrderCard)
              : renderItemViewPreparing()
            }
          </OrdersContainer>
        </Column>

        {/* Ready */}
        <Column>
          <ColumnHeader status="ready">
            <ColumnTitleGroup>
              <ColumnTitle status="ready">Ready</ColumnTitle>
            </ColumnTitleGroup>
            <ColumnCount color="#10B981">
              {viewMode === 'order'
                ? <><CountNumber>{counts.ready}</CountNumber><CountLabel>Orders</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getOrderItemCount('ready')}</CountNumber><CountLabel>Items</CountLabel></>
                : <><CountNumber>{getItemViewReadyOrders().length}</CountNumber><CountLabel>Orders</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getItemStatusCount('ready')}</CountNumber><CountLabel>Items</CountLabel></>
              }
            </ColumnCount>
          </ColumnHeader>
          <OrdersContainer>
            {viewMode === 'order'
              ? getOrdersByStatus('ready').map(renderOrderCard)
              : renderItemViewReady()
            }
          </OrdersContainer>
        </Column>
      </KanbanBoard>
      </ContentArea>
    </Container>
  );
};

export default KitchenDisplayPage;
