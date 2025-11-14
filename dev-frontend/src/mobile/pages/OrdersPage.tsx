import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderNumber = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`;

const OrderDate = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const OrderStatus = styled.div<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#D1FAE5';
      case 'preparing': return '#FEF3C7';
      case 'ready': return '#DBEAFE';
      case 'cancelled': return '#FEE2E2';
      case 'payment_verification_pending': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#065F46';
      case 'preparing': return '#92400E';
      case 'ready': return '#1E40AF';
      case 'cancelled': return '#991B1B';
      case 'payment_verification_pending': return '#92400E';
      default: return '#374151';
    }
  }};
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const OrderItem = styled.div`
  font-size: 14px;
  color: #4B5563;
  display: flex;
  justify-content: space-between;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
`;

const OrderTotal = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`;

const OrderType = styled.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [orders, setOrders] = useState<any[]>([]);
  const { currentStore, setCurrentStore } = useMobileOrder();

  // Load restaurant data from slug on mount
  useEffect(() => {
    const loadRestaurant = async () => {
      if (!currentStore && slug) {
        try {
          const response = await fetch(`/api/restaurants/slug/${slug}`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setCurrentStore({
                id: result.data.id.toString(),
                name: result.data.name,
                slug: result.data.slug,
                description: result.data.description || '',
                logo: result.data.logo || '',
                isOpen: result.data.is_open || true,
                openingHours: result.data.opening_hours || {}
              });
            }
          }
        } catch (error) {
          console.error('Failed to load restaurant:', error);
        }
      }
    };
    loadRestaurant();
  }, [slug, currentStore, setCurrentStore]);

  useEffect(() => {
    if (currentStore) {
      loadOrders();

      // Poll for updates every 5 seconds
      const interval = setInterval(() => {
        loadOrders();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStore]);

  const loadOrders = async () => {
    if (!currentStore) {
      console.warn('No currentStore available');
      return;
    }

    try {
      console.log('🔄 Loading orders from DATABASE...');

      // Get restaurant ID from currentStore context
      const restaurantId = currentStore.id || 1;

      // Fetch orders from database API
      try {
        const response = await fetch(`/api/orders/restaurant/${restaurantId}?limit=50`);

        if (!response.ok) {
          throw new Error('Failed to fetch orders from database');
        }

        const result = await response.json();
        const dbOrders = result.data || [];

        console.log(`✅ Loaded ${dbOrders.length} orders from database`);

        // Sort by date (newest first)
        const sortedOrders = [...dbOrders].sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt || a.order_date || a.created_at).getTime();
          const dateB = new Date(b.createdAt || b.order_date || b.created_at).getTime();
          return dateB - dateA;
        });

        setOrders(sortedOrders);
      } catch (apiError) {
        console.error('❌ Failed to load orders from database:', apiError);
        setOrders([]);
      }
    } catch (error) {
      console.error('❌ Error loading orders:', error);
      setOrders([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      })}`;
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Order Placed';
      case 'payment_verification_pending': return 'Payment Verification';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/mobile/${slug}/order/${orderId}`);
  };

  return (
    <MobileLayout title="My Orders" currentPage="orders">
      <OrdersContainer>
        {orders.length === 0 ? (
          <EmptyState>
            <EmptyTitle>No orders yet</EmptyTitle>
            <EmptyDescription>
              Your order history will appear here
            </EmptyDescription>
          </EmptyState>
        ) : (
          orders.map((order, orderIndex) => {
            // Safely extract order data
            if (!order || !order.id) {
              console.warn('Invalid order data:', order);
              return null;
            }

            const orderId = order.id;

            // Generate pickup number from order ID if not available
            const pickupNumber = order.pickup_number ||
                                 order.pickupNumber ||
                                 (order.order_number ? String(order.order_number).split('-').pop() : null) ||
                                 (order.orderNumber ? String(order.orderNumber).split('-').pop() : null) ||
                                 String(orderId).padStart(3, '0');

            const createdAt = order.createdAt || order.order_date || order.created_at || new Date().toISOString();
            const orderItems = order.order_items || order.items || [];
            const totalAmount = order.total_amount || order.total || 0;
            const orderType = order.order_type || order.orderType || 'takeaway';
            const paymentStatus = order.payment_status || order.paymentStatus;
            const orderStatus = order.status || 'pending';

            // Determine display status based on both payment and order status
            let displayStatus: string;
            if (paymentStatus === 'payment_verification_pending') {
              displayStatus = 'payment_verification_pending';
            } else if (paymentStatus === 'completed' || paymentStatus === 'paid') {
              // Payment is confirmed, show actual order status
              displayStatus = orderStatus;
            } else {
              // Default to order status
              displayStatus = orderStatus;
            }

            console.log(`Order ${orderId}: pickupNumber=${pickupNumber}, paymentStatus=${paymentStatus}, orderStatus=${orderStatus}, displayStatus=${displayStatus}, items=${orderItems.length}`);

            return (
              <OrderCard key={`order-${orderId}-${orderIndex}`} onClick={() => handleOrderClick(String(orderId))}>
                <OrderHeader>
                  <OrderInfo>
                    <OrderNumber>Order #{pickupNumber}</OrderNumber>
                    <OrderDate>{formatDate(createdAt)}</OrderDate>
                  </OrderInfo>
                  <OrderStatus status={displayStatus}>
                    {getStatusText(displayStatus)}
                  </OrderStatus>
                </OrderHeader>

                {orderItems.length > 0 ? (
                  <OrderItems>
                    {orderItems.slice(0, 2).map((item: any, index: number) => {
                      const itemName = item.name || item.menuItem?.name || 'Item';
                      const itemQuantity = item.quantity || 1;
                      // Support both snake_case (API) and camelCase (localStorage)
                      const itemPrice = item.item_price || item.price || item.menuItem?.price || 0;

                      return (
                        <OrderItem key={`item-${index}`}>
                          <span>{itemQuantity}x {itemName}</span>
                          <span>RM {(Number(itemPrice) * itemQuantity).toFixed(2)}</span>
                        </OrderItem>
                      );
                    })}
                    {orderItems.length > 2 && (
                      <OrderItem>
                        <span style={{ color: '#6B7280' }}>
                          +{orderItems.length - 2} more items
                        </span>
                      </OrderItem>
                    )}
                  </OrderItems>
                ) : (
                  <OrderItems>
                    <OrderItem>
                      <span style={{ color: '#6B7280' }}>No items</span>
                    </OrderItem>
                  </OrderItems>
                )}

                <OrderFooter>
                  <OrderTotal>RM {Number(totalAmount).toFixed(2)}</OrderTotal>
                  <OrderType>
                    {orderType === 'dine-in' || orderType === 'dine_in' ? 'Dine In' : 'Takeaway'}
                  </OrderType>
                </OrderFooter>
              </OrderCard>
            );
          }).filter(Boolean)
        )}
      </OrdersContainer>
    </MobileLayout>
  );
};

export default OrdersPage;