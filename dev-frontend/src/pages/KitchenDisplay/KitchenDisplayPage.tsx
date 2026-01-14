import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import io, { Socket } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import { formatTime } from '../../utils/timezone';

// Helper function to format pickup time as range (e.g., "9:00 - 9:30 AM")
const formatPickupTimeRange = (dateString: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

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

  // If periods are the same, show period only at the end
  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
};

const Container = styled.div`
  background: #FAFBFC;
  min-height: 100vh;
  color: #0A2540;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

const HeaderInfo = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const Clock = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #6B7C93;
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${props => props.connected ? '#059669' : '#DC2626'};
`;

const ConnectionDot = styled.div<{ connected: boolean }>`
  width: 8px;
  height: 8px;
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
  gap: 20px;
  height: calc(100vh - 180px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 16px;
  }
`;

const Column = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`;

const ColumnHeader = styled.div<{ status: string }>`
  padding: 20px;
  background: ${props => {
    switch (props.status) {
      case 'pending': return '#FFF4E6';
      case 'preparing': return '#EFF6FF';
      case 'ready': return '#ECFDF5';
      case 'served': return '#ECFDF5';
      default: return '#F6F9FC';
    }
  }};
  border-bottom: 2px solid ${props => {
    switch (props.status) {
      case 'pending': return '#F59E0B';
      case 'preparing': return '#3B82F6';
      case 'ready': return '#10B981';
      case 'served': return '#10B981';
      default: return '#E6EBF1';
    }
  }};
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #0A2540;
`;

const ColumnCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.color || '#0A2540'};
`;

const ColumnSubtitle = styled.div`
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`;

const OrdersContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`;

const OrderCard = styled.div`
  background: #FAFBFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.15s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #C7D2FE;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const OrderNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OrderTypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: #FEF3C7;
  color: #F59E0B;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`;

const OrderTime = styled.div`
  text-align: right;
`;

const TimeLabel = styled.div`
  font-size: 11px;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const TimeValue = styled.div<{ urgent?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.urgent ? '#DC2626' : '#0A2540'};
  margin-top: 2px;
`;

const OrderMeta = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6B7C93;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OrderItems = styled.div`
  margin-bottom: 16px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F6F9FC;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`;

const SetItemsContainer = styled.div`
  margin-left: 16px;
  margin-top: 8px;
  border-left: 2px solid #667eea;
  padding-left: 12px;
`;

const SetItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
`;

const SetItemName = styled.div`
  font-size: 13px;
  color: #667eea;
  font-weight: 500;
  flex: 1;
`;

const ItemQuantity = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 12px;
`;

const ItemButton = styled.button`
  padding: 4px 8px;
  font-size: 11px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #10B981;
    color: #10B981;
    background: #ECFDF5;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'success' | 'secondary' | 'preparing' | 'ready' }>`
  flex: ${props => props.variant === 'secondary' ? '0 0 auto' : '1'};
  padding: 10px 16px;
  border: ${props => props.variant === 'secondary' ? '1px solid #E6EBF1' : 'none'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => {
    if (props.variant === 'secondary') return 'white';
    if (props.variant === 'preparing') return '#3B82F6'; // Blue for preparing
    if (props.variant === 'ready') return '#10B981'; // Green for ready
    return props.variant === 'primary' ? '#F59E0B' : '#10B981'; // Orange for pending, green for others
  }};
  color: ${props => props.variant === 'secondary' ? '#6B7C93' : 'white'};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    background: ${props => props.variant === 'secondary' ? '#F6F9FC' : undefined};
  }

  &:active {
    transform: translateY(0);
  }
`;

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
    status?: 'pending' | 'completed';
    is_set_menu?: boolean;
    set_items?: Array<{
      id?: string;
      name: string;
      quantity: number;
      status?: 'pending' | 'completed';
    }>;
  }>;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  orderTime: Date;
  paymentStatus?: 'pending' | 'completed';
  customerName?: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery' | 'pickup';
  scheduledPickupTime?: string | null;
}

const KitchenDisplayPage: React.FC = () => {
  const { user } = useAuth();
  const { menuItems } = useMenu();
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [operationSettings, setOperationSettings] = useState<any>(null);

  // Fetch orders from database
  const fetchOrders = useCallback(async () => {
    console.log('🍳 Kitchen Display - fetchOrders called');
    console.log('User:', user);
    console.log('Restaurant ID:', user?.restaurantId);

    if (!user?.restaurantId) {
      console.log('❌ No restaurant ID found');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      console.log('Token exists:', !!token);

      const response = await fetch(`/api/orders/restaurant/${user.restaurantId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('API Result:', result);

      if (result.success && result.data) {
        const dbOrders = result.data;
        console.log('Total orders from DB:', dbOrders.length);

        const kitchenOrders: KitchenOrder[] = dbOrders
          .filter((order: any) => {
            // Only show orders that are in kitchen workflow (NOT served or completed)
            // awaiting_payment, served, completed orders should NOT appear in Kitchen Display
            return ['pending', 'preparing', 'ready'].includes(order.status);
          })
          .map((order: any) => {
            // Parse order_items if it's a string
            let orderItems = order.order_items || [];
            if (typeof orderItems === 'string') {
              try {
                orderItems = JSON.parse(orderItems);
              } catch (e) {
                console.error('Failed to parse order_items:', e);
                orderItems = [];
              }
            }

            // Process order items (regular and set menus)
            const processedItems: any[] = [];
            orderItems.forEach((item: any, itemIndex: number) => {
              // Check if this is a set menu from the database
              if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
                // This is a set menu - keep parent item and sub-items
                const setItems = item.set_items.map((setItem: any, setIndex: number) => ({
                  id: `item-${order.id}-${itemIndex}-set-${setIndex}`,
                  name: setItem.name,
                  quantity: setItem.quantity * (item.quantity || 1),
                  status: setItem.status || 'pending'
                }));

                processedItems.push({
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
                // Regular item - add as is
                processedItems.push({
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
              status: order.status as 'pending' | 'preparing' | 'ready' | 'served' | 'completed',
              orderTime: new Date(order.createdAt),
              paymentStatus: order.payment_status as 'pending' | 'completed',
              customerName: order.customer_name || undefined,
              tableNumber: order.table_number || undefined,
              orderType: (order.order_type || 'dine-in') as 'dine-in' | 'takeaway' | 'delivery' | 'pickup',
              scheduledPickupTime: order.scheduled_pickup_time || null
            } as KitchenOrder;
          });

        console.log('Kitchen orders after filter:', kitchenOrders.length);

        // Check for new orders and play sound
        setOrders(prevOrders => {
          // Find new orders by comparing IDs
          const prevOrderIds = new Set(prevOrders.map(o => o.id));
          const newOrders = kitchenOrders.filter(o => !prevOrderIds.has(o.id));

          // Play notification sound for each new order
          if (newOrders.length > 0) {
            console.log('New orders detected:', newOrders.length);
            playNotificationSound();
          }

          return kitchenOrders;
        });
      } else {
        console.error('API error:', result.error);
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
    const interval = setInterval(fetchOrders, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);



  // Socket.IO 연결
  useEffect(() => {
    if (!user?.restaurantId) return;

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    newSocket.on('connect', () => {
      console.log('✅ Kitchen Display connected to /orders namespace');
      setIsConnected(true);
      newSocket.emit('join-restaurant', user.restaurantId);
      console.log(`✅ Joined restaurant_${user.restaurantId}`);
      // Fetch orders immediately on connection
      fetchOrders();
    });

    newSocket.on('disconnect', () => {
      console.log('⚠️ Kitchen Display disconnected from /orders namespace');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
      setIsConnected(false);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log(`🔄 Reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
      fetchOrders();
    });

    newSocket.on('order-created', (order: any) => {
      console.log('🔔 KITCHEN: New order received:', {
        orderId: order.id,
        orderNumber: order.order_number,
        restaurant_id: order.restaurant_id,
        status: order.status,
        timestamp: new Date().toISOString()
      });
      if (order.restaurant_id !== user.restaurantId) {
        console.log('⚠️ Order restaurant_id mismatch, ignoring');
        return;
      }

      // Parse order_items if it's a string
      let orderItems = order.order_items || [];
      if (typeof orderItems === 'string') {
        try {
          orderItems = JSON.parse(orderItems);
        } catch (e) {
          console.error('Failed to parse order_items:', e);
          orderItems = [];
        }
      }

      // Expand set menu items into individual items for kitchen preparation
      const expandedItems: any[] = [];
      orderItems.forEach((item: any, itemIndex: number) => {
        const specialInstructions = item.special_instructions || '';

        // Check if this is a set menu by looking for [item1 x1, item2 x2] pattern
        const setMenuMatch = specialInstructions.match(/^\[(.*?)\]/);

        if (setMenuMatch) {
          // This is a set menu - extract individual items
          const setItemsText = setMenuMatch[1];
          const setItems = setItemsText.split(',').map((s: string) => s.trim());

          // Add each set item as a separate kitchen item
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

          // Also add options if the set menu has any
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
          // Regular item - add as is
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
        scheduledPickupTime: order.scheduled_pickup_time || null
      };

      console.log('✅ KITCHEN: Adding order to display:', newOrder.orderNumber);
      setOrders(prev => {
        console.log(`📊 KITCHEN: Current orders count: ${prev.length}, adding new order`);
        return [newOrder, ...prev];
      });
      playNotificationSound();
      console.log('🔔 KITCHEN: Notification sound played');
    });

    newSocket.on('order-updated', (order: any) => {
      console.log('Order updated:', order);
      if (order.restaurant_id !== user.restaurantId) return;

      setOrders(prev =>
        prev.map(o =>
          o.id === order.id.toString() ? {
            ...o,
            status: order.status,
            orderTime: new Date(order.createdAt)
          } : o
        ).filter(o => {
          // Only show orders that are in kitchen workflow (NOT served or completed)
          // awaiting_payment, served, completed orders should NOT appear in Kitchen Display
          return ['pending', 'preparing', 'ready'].includes(o.status);
        })
      );
    });

    newSocket.on('order-deleted', ({ id }: { id: number }) => {
      console.log('Order deleted:', id);
      setOrders(prev => prev.filter(o => o.id !== id.toString()));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  // 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.log('Could not play notification sound:', e));
  };

  // Helper function to get item code from menu items by matching name
  const getItemCode = (itemName: string): string => {
    const menuItem = menuItems.find(m => m.name === itemName);
    return menuItem?.code || '';
  };

  // Helper function to format item name with code
  const formatItemName = (itemName: string): string => {
    const code = getItemCode(itemName);
    return code ? `${code} ${itemName}` : itemName;
  };

  const getElapsedTime = (orderTime: Date) => {
    const elapsed = Math.floor((currentTime.getTime() - orderTime.getTime()) / 1000 / 60);
    return elapsed;
  };

  const updateOrderStatus = async (orderId: string, newStatus: KitchenOrder['status'], updateUI: boolean = true) => {
    // Optimistically update UI immediately (only if updateUI is true)
    if (updateUI) {
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ).filter(o => {
        // Only show orders that are in kitchen workflow (NOT served or completed)
        // awaiting_payment, served, completed orders should NOT appear in Kitchen Display
        return ['pending', 'preparing', 'ready'].includes(o.status);
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
      if (result.success) {
        console.log('Status updated successfully');
      } else {
        // Revert on error
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      // Revert on error
      fetchOrders();
    }
  };

  const updateItemStatus = async (orderId: string, itemId: string) => {
    // Save to database first
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const updatedItems = order.items.map(item => {
        if (item.id === itemId) {
          // Toggle status
          const newStatus = item.status === 'completed' ? 'pending' : 'completed';
          return { ...item, status: newStatus };
        }
        return item;
      });

      // Check if all items will be completed
      const allItemsCompleted = updatedItems.every(item => item.status === 'completed');

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          order_items: updatedItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            options: item.options || [],
            status: item.status
          }))
        })
      });

      const result = await response.json();
      if (!result.success) {
        console.error('Failed to update item status');
        return;
      }

      // Update UI after successful save
      setOrders(prevOrders =>
        prevOrders.map(o => {
          if (o.id === orderId) {
            return {
              ...o,
              items: updatedItems as any,
              status: o.status
            };
          }
          return o;
        })
      );

      // If all items completed, auto-advance to ready
      if (allItemsCompleted && order.status === 'preparing') {
        console.log('All items completed, advancing to ready:', orderId);
        await updateOrderStatus(orderId, 'ready', true);
      }
    } catch (error) {
      console.error('Failed to update item status:', error);
      fetchOrders();
    }
  };

  // Update set menu sub-item status (toggle between pending and completed)
  const updateSetItemStatus = async (orderId: string, parentItemId: string, setItemId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const updatedItems = order.items.map(item => {
        if (item.id === parentItemId && item.set_items) {
          const updatedSetItems = item.set_items.map(setItem => {
            if (setItem.id === setItemId) {
              // Toggle status
              const newStatus = setItem.status === 'completed' ? 'pending' : 'completed';
              return { ...setItem, status: newStatus };
            }
            return setItem;
          });

          // Check if all set items are completed
          const allSetItemsCompleted = updatedSetItems.every(si => si.status === 'completed');

          return {
            ...item,
            set_items: updatedSetItems,
            status: allSetItemsCompleted ? 'completed' : 'pending'
          };
        }
        return item;
      });

      // Check if all items (including set menus) are completed
      const allItemsCompleted = updatedItems.every(item => item.status === 'completed');

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          order_items: updatedItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            options: item.options || [],
            status: item.status,
            is_set_menu: item.is_set_menu,
            set_items: item.set_items
          }))
        })
      });

      const result = await response.json();
      if (!result.success) {
        console.error('Failed to update set item status');
        return;
      }

      // Update UI after successful save
      setOrders(prevOrders =>
        prevOrders.map(o => {
          if (o.id === orderId) {
            return {
              ...o,
              items: updatedItems as any,
              status: o.status
            };
          }
          return o;
        })
      );

      // If all items completed, auto-advance to ready
      if (allItemsCompleted && order.status === 'preparing') {
        console.log('All items completed, advancing to ready:', orderId);
        await updateOrderStatus(orderId, 'ready', true);
      }
    } catch (error) {
      console.error('Failed to update set item status:', error);
      fetchOrders();
    }
  };

  const getOrdersByStatus = (status: KitchenOrder['status']) => {
    return orders
      .filter(order => order.status === status)
      .sort((a, b) => a.orderTime.getTime() - b.orderTime.getTime()); // 오래된 주문 먼저 (오름차순)
  };

  const getStatusCounts = () => {
    return {
      pending: getOrdersByStatus('pending').length,
      preparing: getOrdersByStatus('preparing').length,
      ready: getOrdersByStatus('ready').length
    };
  };

  const counts = getStatusCounts();

  return (
    <Container>
      <Header>
        <Title>Kitchen Display</Title>
        <HeaderInfo>
          <ConnectionStatus connected={isConnected}>
            <ConnectionDot connected={isConnected} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </ConnectionStatus>
          <Clock>{formatTime(currentTime, operationSettings)}</Clock>
        </HeaderInfo>
      </Header>

      <KanbanBoard>
        {/* Pending Column */}
        <Column>
          <ColumnHeader status="pending">
            <ColumnTitle>Pending Orders</ColumnTitle>
            <ColumnCount color="#F59E0B">{counts.pending}</ColumnCount>
            <ColumnSubtitle>Waiting to start</ColumnSubtitle>
          </ColumnHeader>
          <OrdersContainer>
            {getOrdersByStatus('pending').map(order => {
              const elapsedTime = getElapsedTime(order.orderTime);
              const isUrgent = elapsedTime > 15;

              const completedItems = order.items.filter(item => item.status === 'completed').length;

              return (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <OrderNumber>
                      {order.tableNumber ? `T${order.tableNumber.replace(/^T/i, '')}` :
                       order.pagerNumber ? `Pager #${order.pagerNumber}` : `#${order.pickupNumber}`}
                      {order.orderType === 'takeaway' && (
                        <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>
                      )}
                      {order.orderType === 'pickup' && (
                        <OrderTypeBadge style={{ background: '#EDE9FE', color: '#7C3AED' }}>PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime) : 'ASAP'}</OrderTypeBadge>
                      )}
                      {order.orderType === 'delivery' && (
                        <OrderTypeBadge style={{ background: '#D1FAE5', color: '#059669' }}>DELIVERY</OrderTypeBadge>
                      )}
                    </OrderNumber>
                    <OrderTime>
                      <TimeLabel>Waiting</TimeLabel>
                      <TimeValue urgent={isUrgent}>{elapsedTime} min</TimeValue>
                    </OrderTime>
                  </OrderHeader>

                  <OrderMeta>
                    {order.orderType === 'dine-in' && order.tableNumber && (
                      <MetaItem>
                        📍 Table Order
                      </MetaItem>
                    )}
                    {order.orderType === 'dine-in' && !order.tableNumber && (
                      <MetaItem>
                        📍 Free Seating
                      </MetaItem>
                    )}
                    {order.orderType === 'takeaway' && order.customerName && (
                      <MetaItem>
                        👤 {order.customerName}
                      </MetaItem>
                    )}
                    {order.orderType === 'takeaway' && (
                      <MetaItem>
                        🥡 TAKEAWAY
                      </MetaItem>
                    )}
                    {order.orderType === 'delivery' && (
                      <MetaItem>
                        🚚 DELIVERY
                      </MetaItem>
                    )}
                    <MetaItem>
                      ✓ {completedItems}/{order.items.length} items
                    </MetaItem>
                  </OrderMeta>

                  <OrderItems>
                    {order.items.map((item) => (
                      <React.Fragment key={item.id}>
                        <OrderItem>
                          <ItemInfo style={{ opacity: item.status === 'completed' ? 0.5 : 1 }}>
                            <ItemName style={{ textDecoration: item.status === 'completed' ? 'line-through' : 'none' }}>
                              {formatItemName(item.name)}
                            </ItemName>
                            {item.options && item.options.length > 0 && (() => {
                              // Separate set menu items and regular options
                              const setItems: string[] = [];
                              const regularOptions: string[] = [];

                              item.options.forEach(option => {
                                // Check if this is a set menu item (format: "item name xN")
                                if (/^.+\sx\d+$/.test(option)) {
                                  setItems.push(option);
                                } else {
                                  regularOptions.push(option);
                                }
                              });

                              return (
                                <>
                                  {setItems.length > 0 && (
                                    <ItemOptions style={{ fontWeight: 600 }}>
                                      {setItems.join(', ')}
                                    </ItemOptions>
                                  )}
                                  {regularOptions.length > 0 && (
                                    <ItemOptions>
                                      ⭐ {regularOptions.join(', ')}
                                    </ItemOptions>
                                  )}
                                </>
                              );
                            })()}
                            {item.special_instructions && (
                              <ItemOptions style={{ color: '#DC2626', fontStyle: 'italic' }}>
                                📝 {item.special_instructions}
                              </ItemOptions>
                            )}
                          </ItemInfo>
                          <ItemQuantity>×{item.quantity}</ItemQuantity>
                          {!item.is_set_menu && (
                            <ItemActions>
                              <ItemButton
                                onClick={() => updateItemStatus(order.id, item.id!)}
                                style={{
                                  background: item.status === 'completed' ? '#F59E0B' : '#F3F4F6',
                                  color: item.status === 'completed' ? 'white' : '#6B7280',
                                  border: item.status === 'completed' ? '1px solid #F59E0B' : '1px solid #E5E7EB'
                                }}
                              >
                                {item.status === 'completed' ? '✓ Done' : 'Done'}
                              </ItemButton>
                            </ItemActions>
                          )}
                        </OrderItem>

                        {/* Show set menu items individually */}
                        {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                          <SetItemsContainer>
                            {item.set_items.map((setItem) => (
                              <SetItemRow key={setItem.id}>
                                <SetItemName style={{
                                  textDecoration: setItem.status === 'completed' ? 'line-through' : 'none',
                                  opacity: setItem.status === 'completed' ? 0.5 : 1
                                }}>
                                  • {formatItemName(setItem.name)} x{setItem.quantity}
                                </SetItemName>
                                <ItemActions>
                                  <ItemButton
                                    onClick={() => updateSetItemStatus(order.id, item.id!, setItem.id!)}
                                    style={{
                                      background: setItem.status === 'completed' ? '#F59E0B' : '#F3F4F6',
                                      color: setItem.status === 'completed' ? 'white' : '#6B7280',
                                      border: setItem.status === 'completed' ? '1px solid #F59E0B' : '1px solid #E5E7EB'
                                    }}
                                  >
                                    {setItem.status === 'completed' ? '✓' : 'Done'}
                                  </ItemButton>
                                </ItemActions>
                              </SetItemRow>
                            ))}
                          </SetItemsContainer>
                        )}
                      </React.Fragment>
                    ))}
                  </OrderItems>

                  <ActionButton
                    variant="primary"
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                  >
                    Start Cooking →
                  </ActionButton>
                </OrderCard>
              );
            })}
          </OrdersContainer>
        </Column>

        {/* Preparing Column */}
        <Column>
          <ColumnHeader status="preparing">
            <ColumnTitle>Preparing</ColumnTitle>
            <ColumnCount color="#3B82F6">{counts.preparing}</ColumnCount>
            <ColumnSubtitle>In progress</ColumnSubtitle>
          </ColumnHeader>
          <OrdersContainer>
            {getOrdersByStatus('preparing').map(order => {
              const elapsedTime = getElapsedTime(order.orderTime);
              const completedItems = order.items.filter(item => item.status === 'completed').length;

              return (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <OrderNumber>
                      {order.tableNumber ? `T${order.tableNumber.replace(/^T/i, '')}` :
                       order.pagerNumber ? `Pager #${order.pagerNumber}` : `#${order.pickupNumber}`}
                      {order.orderType === 'takeaway' && (
                        <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>
                      )}
                      {order.orderType === 'pickup' && (
                        <OrderTypeBadge style={{ background: '#EDE9FE', color: '#7C3AED' }}>PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime) : 'ASAP'}</OrderTypeBadge>
                      )}
                      {order.orderType === 'delivery' && (
                        <OrderTypeBadge style={{ background: '#D1FAE5', color: '#059669' }}>DELIVERY</OrderTypeBadge>
                      )}
                    </OrderNumber>
                    <OrderTime>
                      <TimeLabel>Cooking</TimeLabel>
                      <TimeValue>{elapsedTime} min</TimeValue>
                    </OrderTime>
                  </OrderHeader>

                  <OrderMeta>
                    {order.orderType === 'dine-in' && order.tableNumber && (
                      <MetaItem>
                        📍 Table Order
                      </MetaItem>
                    )}
                    {order.orderType === 'dine-in' && !order.tableNumber && (
                      <MetaItem>
                        📍 Free Seating
                      </MetaItem>
                    )}
                    {order.orderType === 'takeaway' && order.customerName && (
                      <MetaItem>
                        👤 {order.customerName}
                      </MetaItem>
                    )}
                    {order.orderType === 'delivery' && (
                      <MetaItem>
                        🚚 DELIVERY
                      </MetaItem>
                    )}
                    <MetaItem>
                      ✓ {completedItems}/{order.items.length} items
                    </MetaItem>
                  </OrderMeta>

                  <OrderItems>
                    {order.items.map((item) => (
                      <React.Fragment key={item.id}>
                        <OrderItem>
                          <ItemInfo style={{ opacity: item.status === 'completed' ? 0.5 : 1 }}>
                            <ItemName style={{ textDecoration: item.status === 'completed' ? 'line-through' : 'none' }}>
                              {formatItemName(item.name)}
                            </ItemName>
                            {item.options && item.options.length > 0 && (() => {
                              // Separate set menu items and regular options
                              const setItems: string[] = [];
                              const regularOptions: string[] = [];

                              item.options.forEach(option => {
                                // Check if this is a set menu item (format: "item name xN")
                                if (/^.+\sx\d+$/.test(option)) {
                                  setItems.push(option);
                                } else {
                                  regularOptions.push(option);
                                }
                              });

                              return (
                                <>
                                  {setItems.length > 0 && (
                                    <ItemOptions style={{ fontWeight: 600 }}>
                                      {setItems.join(', ')}
                                    </ItemOptions>
                                  )}
                                  {regularOptions.length > 0 && (
                                    <ItemOptions>
                                      ⭐ {regularOptions.join(', ')}
                                    </ItemOptions>
                                  )}
                                </>
                              );
                            })()}
                            {item.special_instructions && (
                              <ItemOptions style={{ color: '#DC2626', fontStyle: 'italic' }}>
                                📝 {item.special_instructions}
                              </ItemOptions>
                            )}
                          </ItemInfo>
                          <ItemQuantity>×{item.quantity}</ItemQuantity>
                          {!item.is_set_menu && (
                            <ItemActions>
                              <ItemButton
                                onClick={() => updateItemStatus(order.id, item.id!)}
                                style={{
                                  background: item.status === 'completed' ? '#3B82F6' : '#F3F4F6',
                                  color: item.status === 'completed' ? 'white' : '#6B7280',
                                  border: item.status === 'completed' ? '1px solid #3B82F6' : '1px solid #E5E7EB'
                                }}
                              >
                                {item.status === 'completed' ? '✓ Done' : 'Done'}
                              </ItemButton>
                            </ItemActions>
                          )}
                        </OrderItem>

                        {/* Show set menu items individually */}
                        {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                          <SetItemsContainer>
                            {item.set_items.map((setItem) => (
                              <SetItemRow key={setItem.id}>
                                <SetItemName style={{
                                  textDecoration: setItem.status === 'completed' ? 'line-through' : 'none',
                                  opacity: setItem.status === 'completed' ? 0.5 : 1
                                }}>
                                  • {formatItemName(setItem.name)} x{setItem.quantity}
                                </SetItemName>
                                <ItemActions>
                                  <ItemButton
                                    onClick={() => updateSetItemStatus(order.id, item.id!, setItem.id!)}
                                    style={{
                                      background: setItem.status === 'completed' ? '#3B82F6' : '#F3F4F6',
                                      color: setItem.status === 'completed' ? 'white' : '#6B7280',
                                      border: setItem.status === 'completed' ? '1px solid #3B82F6' : '1px solid #E5E7EB'
                                    }}
                                  >
                                    {setItem.status === 'completed' ? '✓ Done' : 'Done'}
                                  </ItemButton>
                                </ItemActions>
                              </SetItemRow>
                            ))}
                          </SetItemsContainer>
                        )}
                      </React.Fragment>
                    ))}
                  </OrderItems>

                  <ActionButtonGroup>
                    <ActionButton
                      variant="preparing"
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                    >
                      Mark Ready →
                    </ActionButton>
                    <ActionButton
                      variant="secondary"
                      onClick={() => updateOrderStatus(order.id, 'pending')}
                      title="Revert to pending"
                    >
                      ↺
                    </ActionButton>
                  </ActionButtonGroup>
                </OrderCard>
              );
            })}
          </OrdersContainer>
        </Column>

        {/* Ready Column */}
        <Column>
          <ColumnHeader status="ready">
            <ColumnTitle>Ready for Pickup</ColumnTitle>
            <ColumnCount color="#10B981">{counts.ready}</ColumnCount>
            <ColumnSubtitle>Waiting for pickup</ColumnSubtitle>
          </ColumnHeader>
          <OrdersContainer>
            {getOrdersByStatus('ready').map(order => {
              const elapsedTime = getElapsedTime(order.orderTime);

              return (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <OrderNumber>
                      {order.tableNumber ? `T${order.tableNumber.replace(/^T/i, '')}` :
                       order.pagerNumber ? `Pager #${order.pagerNumber}` : `#${order.pickupNumber}`}
                      {order.orderType === 'takeaway' && (
                        <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>
                      )}
                      {order.orderType === 'pickup' && (
                        <OrderTypeBadge style={{ background: '#EDE9FE', color: '#7C3AED' }}>PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime) : 'ASAP'}</OrderTypeBadge>
                      )}
                      {order.orderType === 'delivery' && (
                        <OrderTypeBadge style={{ background: '#D1FAE5', color: '#059669' }}>DELIVERY</OrderTypeBadge>
                      )}
                    </OrderNumber>
                    <OrderTime>
                      <TimeLabel>Ready</TimeLabel>
                      <TimeValue>{elapsedTime} min ago</TimeValue>
                    </OrderTime>
                  </OrderHeader>

                  <OrderMeta>
                    {order.orderType === 'dine-in' && order.tableNumber && (
                      <MetaItem>
                        📍 Table Order - Ready to Serve
                      </MetaItem>
                    )}
                    {order.orderType === 'dine-in' && !order.tableNumber && (
                      <MetaItem>
                        📍 Free Seating
                      </MetaItem>
                    )}
                    {order.orderType === 'takeaway' && order.customerName && (
                      <MetaItem>
                        👤 {order.customerName}
                      </MetaItem>
                    )}
                    {order.orderType === 'takeaway' && (
                      <MetaItem>
                        🥡 TAKEAWAY
                      </MetaItem>
                    )}
                    {order.orderType === 'delivery' && (
                      <MetaItem>
                        🚚 DELIVERY - Ready for Driver
                      </MetaItem>
                    )}
                  </OrderMeta>

                  <OrderItems>
                    {order.items.map((item, index) => (
                      <OrderItem key={index}>
                        <ItemInfo>
                          <ItemName>{formatItemName(item.name)}</ItemName>
                          {item.options && item.options.length > 0 && (
                            <ItemOptions>⭐ {item.options.join(', ')}</ItemOptions>
                          )}
                          {item.special_instructions && (
                            <ItemOptions style={{ color: '#DC2626', fontStyle: 'italic' }}>
                              📝 {item.special_instructions}
                            </ItemOptions>
                          )}
                        </ItemInfo>
                        <ItemQuantity>×{item.quantity}</ItemQuantity>
                      </OrderItem>
                    ))}
                  </OrderItems>

                  <ActionButtonGroup>
                    <ActionButton
                      variant="ready"
                      onClick={() => {
                        // Mark as served (which removes it from Kitchen Display)
                        updateOrderStatus(order.id, 'served');
                      }}
                    >
                      Served ✓
                    </ActionButton>
                    <ActionButton
                      variant="secondary"
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      title="Revert to preparing"
                    >
                      ↺
                    </ActionButton>
                  </ActionButtonGroup>
                </OrderCard>
              );
            })}
          </OrdersContainer>
        </Column>
      </KanbanBoard>
    </Container>
  );
};

export default KitchenDisplayPage;