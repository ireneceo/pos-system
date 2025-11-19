import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
`;

const PickupNumberCard = styled.div`
  background: linear-gradient(135deg, #635BFF 0%, #4F46E5 100%);
  color: white;
  border-radius: 20px;
  padding: 32px 48px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(99, 91, 255, 0.3);
  margin-bottom: 32px;
`;

const PickupLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const PickupNumber = styled.div`
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
`;

const StatusContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 32px;
`;

const StatusStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.completed ? '#10B981' : props.active ? '#635BFF' : '#E5E7EB'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin-right: 16px;
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3px solid #635BFF;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.3);
        opacity: 0;
      }
    }
  `}
`;

const StatusInfo = styled.div`
  flex: 1;
`;

const StatusTitle = styled.div<{ active: boolean; completed: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.active || props.completed ? '#1F2937' : '#9CA3AF'};
  margin-bottom: 4px;
`;

const StatusTime = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const OrderDetails = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemsList = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`;

const Item = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`;

const NewOrderButton = styled(Button)`
  background: #635BFF;
  color: white;
  border: none;
  
  &:active {
    background: #5A51E6;
  }
`;

const HomeButton = styled(Button)`
  background: white;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  
  &:active {
    background: #F9FAFB;
  }
`;

const OrderTrackingPage: React.FC = () => {
  const { slug, orderId } = useParams<{ slug: string; orderId: string }>();
  const navigate = useNavigate();
  const { currency } = useMobileOrder();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    if (orderId) {
      loadOrder();
    }

    // Listen for storage events (updates from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === 'pos_orders' || e.key === 'guestOrders') && orderId) {
        loadOrder(true);
      }
    };

    // Listen for custom storage events (same tab updates)
    const handleCustomStorageChange = () => {
      if (orderId) {
        loadOrder(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage', handleCustomStorageChange);

    // Poll for updates every 3 seconds for real-time updates (only if not completed)
    const interval = setInterval(() => {
      if (orderId && order?.status !== 'completed') {
        loadOrder(true);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage', handleCustomStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);
  
  const loadOrder = async (silent = false) => {
    if (!orderId) {
      setError('No order ID provided');
      setLoading(false);
      return;
    }

    if (!silent) {
      setLoading(true);
      setError(null);
    }

    try {
      // Try to fetch from API first for real-time data
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          const apiOrder = data.data || data;

          if (apiOrder && apiOrder.id) {
            console.log('✅ Loaded order from API:', apiOrder);
            setOrder({
              ...apiOrder,
              estimatedPickupTime: apiOrder.estimatedPickupTime ||
                new Date(new Date(apiOrder.createdAt || apiOrder.order_date || Date.now()).getTime() + 15 * 60000)
            });
            setError(null);
            if (!silent) setLoading(false);
            return;
          }
        } else {
          console.log('⚠️ API response not OK:', response.status);
        }
      } catch (apiError) {
        console.error('❌ Failed to load order from database:', apiError);
        if (!silent) {
          setError('Order not found');
        }
      }
    } catch (error) {
      console.error('❌ Error loading order:', error);
      if (!silent) {
        setError('Failed to load order');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };
  
  const getStatusSteps = () => {
    if (!order) return [];

    // Check if payment verification is pending (support both camelCase and snake_case)
    const paymentStatus = order.payment_status || order.paymentStatus;
    const isPaymentVerificationPending = paymentStatus === 'payment_verification_pending';
    const isAwaitingPayment = order?.status === 'awaiting_payment';

    const steps = isPaymentVerificationPending
      ? [
          { id: 'payment_verification_pending', title: 'Payment Verification', icon: '1', time: 'Verifying payment...' },
          { id: 'pending', title: 'Order Placed', icon: '2', time: 'Pending' },
          { id: 'preparing', title: 'Preparing', icon: '3', time: 'Waiting' },
          { id: 'ready', title: 'Ready for Pickup', icon: '4', time: 'Waiting' },
          { id: 'completed', title: 'Completed', icon: '✓', time: '' }
        ]
      : isAwaitingPayment
      ? [
          { id: 'awaiting_payment', title: 'Awaiting Payment', icon: '1', time: 'Staff is waiting at counter...' },
          { id: 'pending', title: 'Order Placed', icon: '2', time: 'Pending' },
          { id: 'preparing', title: 'Preparing', icon: '3', time: 'Waiting' },
          { id: 'ready', title: 'Ready for Pickup', icon: '4', time: 'Waiting' },
          { id: 'completed', title: 'Completed', icon: '✓', time: '' }
        ]
      : [
          { id: 'pending', title: 'Order Placed', icon: '1', time: 'Just now' },
          { id: 'preparing', title: 'Preparing', icon: '2', time: 'In 2 min' },
          { id: 'ready', title: 'Ready for Pickup', icon: '3', time: 'In 15 min' },
          { id: 'completed', title: 'Completed', icon: '✓', time: '' }
        ];

    // Determine current step based on payment and order status
    let currentStepId = order?.status;
    if (isPaymentVerificationPending) {
      currentStepId = 'payment_verification_pending';
    } else if (isAwaitingPayment) {
      currentStepId = 'awaiting_payment';
    }

    const currentStepIndex = steps.findIndex(s => s.id === currentStepId);

    return steps.map((step, index) => ({
      ...step,
      active: index === currentStepIndex,
      completed: index < currentStepIndex
    }));
  };
  
  const handleNewOrder = () => {
    navigate(`/mobile/${slug}/menu`);
  };

  const handleHome = () => {
    navigate(`/mobile/${slug}`);
  };
  
  if (loading) {
    return (
      <MobileLayout title="Loading Order...">
        <Container>
          <div style={{ color: '#9CA3AF', fontSize: '16px', textAlign: 'center', padding: '48px 24px' }}>
            Loading your order...
          </div>
        </Container>
      </MobileLayout>
    );
  }

  if (error || !order) {
    return (
      <MobileLayout title="Order Not Found">
        <Container>
          <div style={{ color: '#9CA3AF', fontSize: '16px', textAlign: 'center', padding: '48px 24px' }}>
            {error || 'This order could not be found.'}
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <HomeButton onClick={() => navigate(`/mobile/${slug}`)}>
              Back to Home
            </HomeButton>
          </div>
        </Container>
      </MobileLayout>
    );
  }
  
  // Safe getter functions to prevent render crashes
  const getPickupNumber = () => {
    try {
      if (order.pickup_number) return order.pickup_number;
      if (order.pickupNumber) return order.pickupNumber;

      // Try extracting from order number
      const orderNum = order.order_number || order.orderNumber;
      if (orderNum && typeof orderNum === 'string' && orderNum.includes('-')) {
        const parts = orderNum.split('-');
        if (parts.length > 1) return parts[parts.length - 1];
      }

      // Use order ID as fallback
      if (order.id) {
        return String(order.id).padStart(3, '0');
      }

      return '000';
    } catch (error) {
      console.error('Error getting pickup number:', error);
      return '000';
    }
  };

  const getOrderNumber = () => {
    try {
      return order.order_number || order.orderNumber || order.id || 'N/A';
    } catch (error) {
      console.error('Error getting order number:', error);
      return 'N/A';
    }
  };

  const getTotalAmount = () => {
    try {
      const total = order.total_amount || order.total || 0;
      return Number(total).toFixed(2);
    } catch (error) {
      console.error('Error getting total amount:', error);
      return '0.00';
    }
  };

  const getPaymentStatus = () => {
    try {
      return order.payment_status || order.paymentStatus || 'pending';
    } catch (error) {
      console.error('Error getting payment status:', error);
      return 'pending';
    }
  };

  const getOrderItems = () => {
    try {
      return order.order_items || order.items || [];
    } catch (error) {
      console.error('Error getting order items:', error);
      return [];
    }
  };

  const statusSteps = getStatusSteps();

  // Wrap render in try-catch for safety
  try {
    return (
      <MobileLayout title="Order Status" currentPage="orders">
        <Container>
          <PickupNumberCard>
            <PickupLabel>Your Pickup Number</PickupLabel>
            <PickupNumber>
              {getPickupNumber()}
            </PickupNumber>
          </PickupNumberCard>
        
        <StatusContainer>
          {statusSteps.map(step => (
            <StatusStep 
              key={step.id}
              active={step.active}
              completed={step.completed}
            >
              <StatusIcon active={step.active} completed={step.completed}>
                {step.icon}
              </StatusIcon>
              <StatusInfo>
                <StatusTitle active={step.active} completed={step.completed}>
                  {step.title}
                </StatusTitle>
                {step.time && (
                  <StatusTime>{step.time}</StatusTime>
                )}
              </StatusInfo>
            </StatusStep>
          ))}
        </StatusContainer>
        
        <OrderDetails>
          <DetailRow>
            <span style={{ color: '#6B7280' }}>Order Number</span>
            <span style={{ fontWeight: 600 }}>{getOrderNumber()}</span>
          </DetailRow>
          <DetailRow>
            <span style={{ color: '#6B7280' }}>Total Amount</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(getTotalAmount(), currency)}</span>
          </DetailRow>
          <DetailRow>
            <span style={{ color: '#6B7280' }}>Payment</span>
            <span style={{
              fontWeight: 600,
              color: getPaymentStatus() === 'payment_verification_pending' ? '#F59E0B' :
                    (getPaymentStatus() === 'completed' || getPaymentStatus() === 'paid' ? '#10B981' : '#6B7280')
            }}>
              {getPaymentStatus() === 'payment_verification_pending' ? 'Verifying Payment' :
               (getPaymentStatus() === 'completed' || getPaymentStatus() === 'paid' ? '✓ Paid' : 'Pay at Counter')}
            </span>
          </DetailRow>

          {getOrderItems().length > 0 && (
            <ItemsList>
              {getOrderItems().map((item: any, index: number) => {
                try {
                  const itemName = item?.menuItem?.name || item?.name || 'Item';
                  const itemQuantity = item?.quantity || 1;
                  const itemOptions = item?.options || [];

                  return (
                    <Item key={item?.id || `item-${index}`}>
                      {itemQuantity}x {itemName}
                      {itemOptions.length > 0 && ` (${itemOptions.join(', ')})`}
                    </Item>
                  );
                } catch (err) {
                  console.error('Error rendering item:', err);
                  return null;
                }
              })}
            </ItemsList>
          )}
        </OrderDetails>

        {getPaymentStatus() === 'payment_verification_pending' && (
          <div style={{
            background: '#FEF3C7',
            border: '1px solid #F59E0B',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ color: '#92400E', fontWeight: 600, marginBottom: '8px' }}>
              Payment Verification in Progress
            </div>
            <div style={{ color: '#92400E', fontSize: '13px' }}>
              Your payment is being verified by our staff. You will be notified once confirmed.
            </div>
            {(() => {
              try {
                const proof = order.payment_proof || order.paymentProof;
                if (proof && typeof proof === 'object') {
                  const reference = proof.reference;
                  const fileName = proof.file_name || proof.fileName;

                  if (reference || fileName) {
                    return (
                      <div style={{ marginTop: '12px', padding: '8px', background: 'white', borderRadius: '6px', fontSize: '12px', color: '#6B7280' }}>
                        {reference && <div>Reference: <strong>{reference}</strong></div>}
                        {fileName && <div>Receipt: {fileName}</div>}
                      </div>
                    );
                  }
                }
              } catch (err) {
                console.error('Error rendering payment proof:', err);
              }
              return null;
            })()}
          </div>
        )}

        {order?.status === 'awaiting_payment' && order?.payment_method === 'counter' && (
          <div style={{
            background: '#EBF8FF',
            border: '1px solid #635BFF',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ color: '#1E40AF', fontWeight: 600, marginBottom: '8px' }}>
              Awaiting Payment at Counter
            </div>
            <div style={{ color: '#1E40AF', fontSize: '13px' }}>
              Please proceed to the counter to complete your payment. Our staff is waiting to assist you.
            </div>
          </div>
        )}

        {order?.status === 'ready' && (
          <div style={{
            background: '#D1FAE5',
            border: '1px solid #10B981',
            borderRadius: '8px',
            padding: '12px 16px',
            textAlign: 'center',
            marginBottom: '24px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ color: '#065F46', fontWeight: 600 }}>
              Your order is ready for pickup!
            </div>
          </div>
        )}

        {order?.status === 'completed' && (
          <ActionButtons>
            <HomeButton onClick={handleHome}>Home</HomeButton>
            <NewOrderButton onClick={handleNewOrder}>New Order</NewOrderButton>
          </ActionButtons>
        )}
      </Container>
    </MobileLayout>
  );
  } catch (renderError) {
    console.error('❌ Error rendering order tracking page:', renderError);
    return (
      <MobileLayout title="Error">
        <Container>
          <div style={{ color: '#EF4444', fontSize: '16px', textAlign: 'center', padding: '48px 24px' }}>
            An error occurred while displaying your order.
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <HomeButton onClick={() => navigate(`/mobile/${slug}`)}>
              Back to Home
            </HomeButton>
          </div>
        </Container>
      </MobileLayout>
    );
  }
};

export default OrderTrackingPage;