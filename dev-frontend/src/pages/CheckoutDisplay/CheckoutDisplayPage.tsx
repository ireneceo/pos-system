import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { formatCurrency } from '../../utils/currency';

// ============================================
// Styled Components
// ============================================

const Container = styled.div`
  min-height: 100vh;
  background: #0A0A0A;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const Header = styled.div`
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1A1A2E;
`;

const StoreName = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const StatusDot = styled.span<{ connected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.connected ? '#10B981' : '#EF4444'};
  display: inline-block;
  margin-right: 8px;
`;

// Welcome screen
const WelcomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 40px;
`;

const WelcomeText = styled.h2`
  font-size: 36px;
  font-weight: 300;
  color: #E5E7EB;
  margin: 0;
`;

const PhonePrompt = styled.div`
  padding: 20px 32px;
  background: #1A1A2E;
  border: 1px solid #2D2D44;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    background: #252540;
    border-color: #635BFF;
  }
`;

// Keypad
const KeypadOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const KeypadCard = styled.div`
  background: #1A1A2E;
  border-radius: 16px;
  padding: 32px;
  width: 340px;
`;

const PhoneDisplay = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  padding: 16px;
  margin-bottom: 20px;
  min-height: 50px;
  letter-spacing: 2px;
`;

const KeypadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const Key = styled.button`
  padding: 16px;
  font-size: 24px;
  font-weight: 500;
  background: #252540;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #353555; }
  &:active { background: #635BFF; }
`;

const KeypadActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const KeypadBtn = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: ${p => p.variant === 'primary' ? '#635BFF' : '#252540'};
  color: #fff;
  &:hover { opacity: 0.9; }
`;

// Order display
const OrderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32px 32px;
  animation: ${fadeIn} 0.3s ease;
`;

const OrderTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #9CA3AF;
  margin: 24px 0 16px;
`;

const ItemList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #1A1A2E;
  animation: ${fadeIn} 0.3s ease;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #E5E7EB;
`;

const ItemOption = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  margin-left: 16px;
`;

const Divider = styled.div`
  border-top: 1px solid #2D2D44;
  margin: 16px 0;
`;

const SummaryRow = styled.div<{ bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: ${p => p.bold ? '22px' : '15px'};
  font-weight: ${p => p.bold ? 700 : 400};
  color: ${p => p.bold ? '#fff' : '#9CA3AF'};
`;

const PhoneLink = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  &:hover { color: #635BFF; }
`;

// Thank you screen
const ThankYouContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  animation: ${fadeIn} 0.5s ease;
`;

const ThankYouText = styled.h2`
  font-size: 42px;
  font-weight: 300;
  color: #10B981;
  margin: 0;
`;

const OrderNumber = styled.div`
  font-size: 20px;
  color: #9CA3AF;
`;

const TotalPaid = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-top: 8px;
`;

// ============================================
// Component
// ============================================

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface CartData {
  restaurantId: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  serviceCharge: number;
  serviceChargeRate: number;
  discount: number;
  total: number;
  currency: string;
}

const CheckoutDisplayPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [screen, setScreen] = useState<'welcome' | 'order' | 'thankyou'>('welcome');
  const [showKeypad, setShowKeypad] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cart, setCart] = useState<CartData | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{ orderNumber: string; total: number; currency: string } | null>(null);
  const [connected, setConnected] = useState(false);
  const [storeName, setStoreName] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const thankYouTimerRef = useRef<any>(null);

  // Load store name
  useEffect(() => {
    if (!restaurantId) return;
    fetch(`/api/restaurants/${restaurantId}`)
      .then(r => r.json())
      .then(d => setStoreName(d.name || d.data?.name || ''))
      .catch(() => {});
  }, [restaurantId]);

  // WebSocket connection
  useEffect(() => {
    if (!restaurantId) return;

    const socket = io('/checkout-display', { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join-restaurant', restaurantId);
      setConnected(true);
    });

    socket.on('disconnect', () => setConnected(false));

    socket.on('cart-update', (data: CartData) => {
      setCart(data);
      if (data.items.length > 0) {
        setScreen('order');
        setShowKeypad(false);
      } else {
        setScreen('welcome');
      }
    });

    socket.on('checkout-complete', (data: { orderNumber: string; total: number; currency: string }) => {
      setCompletedOrder(data);
      setScreen('thankyou');
      setCart(null);

      // 5초 후 welcome으로 복귀
      if (thankYouTimerRef.current) clearTimeout(thankYouTimerRef.current);
      thankYouTimerRef.current = setTimeout(() => {
        setScreen('welcome');
        setCompletedOrder(null);
        setPhoneNumber('');
      }, 5000);
    });

    return () => {
      socket.disconnect();
      if (thankYouTimerRef.current) clearTimeout(thankYouTimerRef.current);
    };
  }, [restaurantId]);

  // Phone keypad handlers
  const handleKeyPress = (key: string) => {
    if (phoneNumber.length < 15) setPhoneNumber(prev => prev + key);
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 8 && socketRef.current) {
      socketRef.current.emit('customer-checkin', { phone: phoneNumber, restaurantId });
      setShowKeypad(false);
    }
  };

  const currency = cart?.currency || 'MYR';

  return (
    <Container>
      <Header>
        <StoreName>{storeName || 'POS'}</StoreName>
        <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center' }}>
          <StatusDot connected={connected} />
          {connected ? 'Connected' : 'Connecting...'}
        </div>
      </Header>

      {/* Welcome Screen */}
      {screen === 'welcome' && (
        <WelcomeContainer>
          <WelcomeText>Welcome</WelcomeText>
          <PhonePrompt onClick={() => setShowKeypad(true)}>
            <div style={{ fontSize: '16px', color: '#E5E7EB', marginBottom: '6px' }}>
              Enter your phone number
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>
              Earn points & view your order history
            </div>
          </PhonePrompt>
        </WelcomeContainer>
      )}

      {/* Order Screen */}
      {screen === 'order' && cart && (
        <OrderContainer>
          <OrderTitle>Your Order</OrderTitle>
          <ItemList>
            {cart.items.map((item, i) => (
              <Item key={i}>
                <ItemInfo>
                  <ItemName>{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}</ItemName>
                  {item.options?.map((opt, j) => (
                    <ItemOption key={j}>★ {opt}</ItemOption>
                  ))}
                </ItemInfo>
                <ItemPrice>{formatCurrency(item.price * item.quantity, currency)}</ItemPrice>
              </Item>
            ))}
          </ItemList>

          <Divider />
          {cart.subtotal !== cart.total && (
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatCurrency(cart.subtotal, currency)}</span>
            </SummaryRow>
          )}
          {cart.tax > 0 && (
            <SummaryRow>
              <span>Tax ({cart.taxRate}%)</span>
              <span>{formatCurrency(cart.tax, currency)}</span>
            </SummaryRow>
          )}
          {cart.serviceCharge > 0 && (
            <SummaryRow>
              <span>Service Charge ({cart.serviceChargeRate}%)</span>
              <span>{formatCurrency(cart.serviceCharge, currency)}</span>
            </SummaryRow>
          )}
          {cart.discount > 0 && (
            <SummaryRow>
              <span>Discount</span>
              <span style={{ color: '#10B981' }}>-{formatCurrency(cart.discount, currency)}</span>
            </SummaryRow>
          )}
          <Divider />
          <SummaryRow bold>
            <span>Total</span>
            <span>{formatCurrency(cart.total, currency)}</span>
          </SummaryRow>

          {!phoneNumber && (
            <PhoneLink onClick={() => setShowKeypad(true)}>
              📱 Tap to enter phone number for points
            </PhoneLink>
          )}
        </OrderContainer>
      )}

      {/* Thank You Screen */}
      {screen === 'thankyou' && completedOrder && (
        <ThankYouContainer>
          <ThankYouText>Thank You!</ThankYouText>
          <OrderNumber>Order {completedOrder.orderNumber}</OrderNumber>
          <TotalPaid>{formatCurrency(completedOrder.total, completedOrder.currency)}</TotalPaid>
        </ThankYouContainer>
      )}

      {/* Phone Keypad Overlay */}
      {showKeypad && (
        <KeypadOverlay onClick={(e) => { if (e.target === e.currentTarget) setShowKeypad(false); }}>
          <KeypadCard>
            <div style={{ fontSize: '14px', color: '#9CA3AF', textAlign: 'center', marginBottom: '8px' }}>
              Enter your phone number
            </div>
            <PhoneDisplay>{phoneNumber || '—'}</PhoneDisplay>
            <KeypadGrid>
              {['1','2','3','4','5','6','7','8','9'].map(k => (
                <Key key={k} onClick={() => handleKeyPress(k)}>{k}</Key>
              ))}
              <Key onClick={handleBackspace}>←</Key>
              <Key onClick={() => handleKeyPress('0')}>0</Key>
              <Key onClick={() => handleKeyPress('+')}>+</Key>
            </KeypadGrid>
            <KeypadActions>
              <KeypadBtn variant="secondary" onClick={() => setShowKeypad(false)}>Skip</KeypadBtn>
              <KeypadBtn
                variant="primary"
                onClick={handlePhoneSubmit}
                style={{ opacity: phoneNumber.length < 8 ? 0.5 : 1 }}
              >
                Done
              </KeypadBtn>
            </KeypadActions>
          </KeypadCard>
        </KeypadOverlay>
      )}
    </Container>
  );
};

export default CheckoutDisplayPage;
