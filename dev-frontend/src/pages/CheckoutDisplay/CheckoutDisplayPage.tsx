import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { formatCurrency } from '../../utils/currency';
import { COUNTRIES, formatPhoneNumber } from '../../utils/phoneUtils';
import { useTranslation } from 'react-i18next';

const fadeIn = keyframes`from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}`;

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const Header = styled.div`
  background: white;
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #C7CED6;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

// 좌측: 전화번호 + 고객정보
const LeftPanel = styled.div`
  width: 360px;
  min-width: 360px;
  background: white;
  border-right: 1px solid #C7CED6;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    padding: 16px;
  }
`;

// 우측: 주문 내역
const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  overflow-y: auto;
`;

const KeypadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const Key = styled.button`
  padding: 14px;
  font-size: 20px;
  font-weight: 500;
  background: #F4F6F9;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  color: #0A2540;
  cursor: pointer;
  &:active { background: #635BFF; color: white; }
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #F1F4F8;
  animation: ${fadeIn} 0.2s ease;
  &:last-child { border-bottom: none; }
`;

const SummaryRow = styled.div<{ bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: ${p => p.bold ? '18px' : '13px'};
  font-weight: ${p => p.bold ? 700 : 400};
  color: ${p => p.bold ? '#0A2540' : '#4B5563'};
`;

interface CartItem { name: string; quantity: number; price: number; options?: string[]; }
interface OrderSnapshot {
  orderNumber?: string;
  orderType?: string;       // dine_in / takeaway / delivery
  sourceLabel?: string;     // pos / mobile / pos-terminal / floor-plan
  createdAt?: string | null;
  paymentStatus?: string;
  paymentMethod?: string | null;
  cashierName?: string | null;
  orderStatus?: string | null;
  guestCount?: number | null;
}
interface CartCustomer {
  id?: number;
  name?: string;
  phone?: string;
  loyaltyTier?: string;
  tier?: string;
  points?: number;
}
interface CartData {
  restaurantId: number;
  items: CartItem[];
  subtotal: number; tax: number; taxRate: number;
  serviceCharge: number; serviceChargeRate: number;
  discount: number; total: number; currency: string;
  tableNumber?: string | null;
  orderNumber?: string;
  source?: string;          // floor-plan / pos-terminal
  orderInfo?: OrderSnapshot;
  customer?: CartCustomer | null;
}
interface CustomerInfo { id: number; name: string; phone: string; points: number; tier: string; totalOrders: number; }

const CheckoutDisplayPage: React.FC = () => {
  const { t } = useTranslation('pos');
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('MY');
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registering, setRegistering] = useState(false);
  const [cart, setCart] = useState<CartData | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [customerStatus, setCustomerStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [connected, setConnected] = useState(false);
  const [storeName, setStoreName] = useState('');
  // Membership phone collection — defaults to ON (preserves existing behavior).
  // Toggle off in Settings → Printer → Customer Display card if membership isn't used.
  const [showPhoneInput, setShowPhoneInput] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    fetch(`/api/restaurants/${restaurantId}`).then(r => r.json()).then(d => {
      const rest = d.data || d;
      setStoreName(rest.name || '');
      // 레스토랑 국가 설정 → 전화번호 국가코드 자동 매핑
      const restCountry = rest.country || 'MY';
      if (COUNTRIES.find(c => c.code === restCountry)) {
        setCountryCode(restCountry);
      }
      // Read checkout-display settings (defaults to true if unset)
      const cd = rest.operation_settings?.checkout_display;
      if (cd && typeof cd.show_phone_input === 'boolean') {
        setShowPhoneInput(cd.show_phone_input);
      }
    }).catch(() => {});
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) return;
    const socket = io('/checkout-display', { transports: ['websocket', 'polling'] });
    socketRef.current = socket;
    socket.on('connect', () => { socket.emit('join-restaurant', restaurantId); setConnected(true); });
    socket.on('disconnect', () => setConnected(false));
    socket.on('cart-update', (data: CartData) => {
      setCart(data);
      if (showThankYou) setShowThankYou(false);
      // 2026-05-27 — if the payload carries customer info, light up the
      // customer slot too so the guest sees their name / phone / tier.
      if (data?.customer && data.customer.name) {
        setCustomer({
          id: data.customer.id || 0,
          name: data.customer.name,
          phone: data.customer.phone || '',
          points: data.customer.points || 0,
          tier: data.customer.tier || data.customer.loyaltyTier || 'Bronze',
          totalOrders: 0
        });
        setCustomerStatus('found');
        setPhoneNumber(data.customer.phone || '');
      }
    });
    // Floor Plan deselected the table → return to idle screen
    socket.on('cart-clear', () => { setCart(null); if (showThankYou) setShowThankYou(false); });
    // 2026-05-27: POS picked / cleared a member — mirror it to the guest screen
    // so they see their name, tier and points before checkout.
    socket.on('pos-customer-update', (data: { customer: CustomerInfo | null }) => {
      if (data?.customer) {
        setCustomer({
          id: data.customer.id,
          name: data.customer.name,
          phone: data.customer.phone,
          points: data.customer.points || 0,
          tier: data.customer.tier || (data.customer as any).loyaltyTier || 'Bronze',
          totalOrders: data.customer.totalOrders || 0
        });
        setCustomerStatus('found');
        setPhoneNumber(data.customer.phone || '');
        setShowRegister(false);
      } else {
        setCustomer(null);
        setCustomerStatus('idle');
        setPhoneNumber('');
        setShowRegister(false);
        setRegisterName('');
      }
    });
    socket.on('checkout-complete', (data) => {
      setCompletedOrder(data);
      setShowThankYou(true);
      setCart(null);
      setTimeout(() => { setShowThankYou(false); setCompletedOrder(null); setPhoneNumber(''); setCustomer(null); setCustomerStatus('idle'); setShowRegister(false); setRegisterName(''); }, 5000);
    });
  // useTranslation moved to component level

  return () => { socket.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
  // 고객은 0으로 시작하는 로컬 번호를 그대로 입력 (010, 017 등)
  // 화면에도 그대로 표시, 저장 시에만 formatPhoneNumber로 E.164 변환 (0 제거 + 국가코드)
  const inputMaxLength = selectedCountry.maxLength + 1; // 앞 0 포함 허용
  const handleKeyPress = (key: string) => { if (phoneNumber.length < inputMaxLength) setPhoneNumber(prev => prev + key); };
  const handleBackspace = () => { setPhoneNumber(prev => prev.slice(0, -1)); if (customerStatus !== 'idle') { setCustomerStatus('idle'); setCustomer(null); setShowRegister(false); } };
  const handleClear = () => { setPhoneNumber(''); setCustomerStatus('idle'); setCustomer(null); setShowRegister(false); setRegisterName(''); };
  const getFullPhone = () => formatPhoneNumber(phoneNumber, countryCode);

  const handlePhoneSubmit = async () => {
    const digits = phoneNumber.startsWith('0') ? phoneNumber.length - 1 : phoneNumber.length;
    if (digits < selectedCountry.minLength) return;
    const fullPhone = getFullPhone();
    setCustomerStatus('searching');
    try {
      const res = await fetch(`/api/customers/phone/${encodeURIComponent(fullPhone)}`);
      const data = await res.json();
      if (data.success && data.data) {
        const c = data.data;
        const rel = c.restaurants?.find((r: any) => r.id === parseInt(restaurantId || '0'));
        setCustomer({ id: c.id, name: c.name, phone: c.phone, points: rel?.RestaurantCustomer?.points || 0, tier: rel?.RestaurantCustomer?.loyalty_tier || 'Bronze', totalOrders: rel?.RestaurantCustomer?.total_orders || 0 });
        setCustomerStatus('found');
      } else { setCustomerStatus('not_found'); }
    } catch { setCustomerStatus('not_found'); }
    if (socketRef.current) socketRef.current.emit('customer-checkin', { phone: fullPhone, restaurantId });
  };

  const handleRegister = async () => {
    if (!registerName.trim()) return;
    setRegistering(true);
    const fullPhone = getFullPhone();
    try {
      const res = await fetch('/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerName.trim(), phone: fullPhone, restaurantId: restaurantId })
      });
      const data = await res.json();
      if (data.success || res.ok) {
        const newCust = { id: data.data?.id || 0, name: registerName.trim(), phone: fullPhone, points: 0, tier: 'Bronze', totalOrders: 0 };
        setCustomer(newCust);
        setCustomerStatus('found');
        setShowRegister(false);
        if (socketRef.current) {
          socketRef.current.emit('customer-checkin', { phone: fullPhone, restaurantId });
        }
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch { /* silent */ }
    setRegistering(false);
  };

  const currency = cart?.currency || 'MYR';
  const hasItems = cart && cart.items.length > 0;

  // Thank you 전체화면
  if (showThankYou && completedOrder) {
    return (
      <Container>
        <Header>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540', margin: 0 }}>{storeName}</h1>
        </Header>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ fontSize: '48px' }}>✓</div>
          <div style={{ fontSize: '28px', fontWeight: 300, color: '#10B981' }}>{t('pos:checkoutDisplayPage.thankYou')}</div>
          <div style={{ fontSize: '16px', color: '#4B5563' }}>Order {completedOrder.orderNumber}</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0A2540', marginTop: '8px' }}>{formatCurrency(completedOrder.total, completedOrder.currency)}</div>
          {customer && <div style={{ fontSize: '14px', color: '#635BFF', marginTop: '4px' }}>⭐ Points earned</div>}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540', margin: 0 }}>{storeName || 'POS'}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: connected ? '#10B981' : '#EF4444', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', color: '#6B7280' }}>{connected ? 'Connected' : 'Connecting...'}</span>
        </div>
      </Header>

      <Main>
        {/* ===== LEFT: cart 가 active 면 주문/회원 정보 패널, 아니면 phone 키패드 =====
            2026-05-27: Floor Plan / POS Terminal 에서 cart-update 가 오면 orderInfo
            가 함께 박힘. 그 시점엔 좌측에 OrderInfo 카드 표시 (키패드 hide).
            cart 가 cleared 되거나 아직 안 받았으면 기존 phone 키패드 표시. */}
        {cart?.orderInfo ? (
          <LeftPanel>
            <div style={{ fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 600 }}>
              {t('pos:checkoutDisplayPage.orderInfo', 'Order Details')}
            </div>
            {/* Order header */}
            <div style={{ padding: '14px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <div style={{ fontSize: '17px', fontWeight: 700, color: '#0A2540' }}>
                  {cart.orderInfo.orderNumber ? `#${cart.orderInfo.orderNumber}` : '—'}
                </div>
                {cart.tableNumber && (
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#635BFF', padding: '4px 10px', background: '#EEF2FF', borderRadius: '6px' }}>
                    {cart.tableNumber}
                  </div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '6px 10px', fontSize: '13px' }}>
                <div style={{ color: '#6B7280' }}>{t('pos:checkoutDisplayPage.type', 'Type')}</div>
                <div style={{ color: '#0A2540', fontWeight: 500, textTransform: 'uppercase' }}>{String(cart.orderInfo.orderType || '').replace('_', '-')}</div>
                <div style={{ color: '#6B7280' }}>{t('pos:checkoutDisplayPage.source', 'Source')}</div>
                <div style={{ color: '#0A2540', fontWeight: 500 }}>{cart.orderInfo.sourceLabel === 'mobile' ? 'Mobile' : cart.orderInfo.sourceLabel === 'pos-terminal' ? 'POS Terminal' : cart.orderInfo.sourceLabel === 'floor-plan' ? 'Floor Plan' : 'POS'}</div>
                {cart.orderInfo.createdAt && (<>
                  <div style={{ color: '#6B7280' }}>{t('pos:checkoutDisplayPage.time', 'Time')}</div>
                  <div style={{ color: '#0A2540', fontWeight: 500 }}>{new Date(cart.orderInfo.createdAt).toLocaleString()}</div>
                </>)}
                <div style={{ color: '#6B7280' }}>{t('pos:checkoutDisplayPage.payment', 'Payment')}</div>
                <div style={{ color: cart.orderInfo.paymentStatus === 'completed' ? '#10B981' : '#F59E0B', fontWeight: 600, textTransform: 'capitalize' }}>{cart.orderInfo.paymentStatus || 'pending'}</div>
                {cart.orderInfo.cashierName && (<>
                  <div style={{ color: '#6B7280' }}>{t('pos:checkoutDisplayPage.cashier', 'Cashier')}</div>
                  <div style={{ color: '#0A2540', fontWeight: 500 }}>{cart.orderInfo.cashierName}</div>
                </>)}
              </div>
            </div>
            {/* Member card (when present) */}
            {cart.customer && cart.customer.name ? (
              <div style={{ padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#065F46', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px' }}>{t('pos:checkoutDisplayPage.member', 'MEMBER')}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#065F46' }}>{cart.customer.name}</div>
                {cart.customer.phone && <div style={{ fontSize: '12px', color: '#047857', marginTop: '2px' }}>{cart.customer.phone}</div>}
                {(typeof cart.customer.points === 'number' || cart.customer.tier || cart.customer.loyaltyTier) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    {typeof cart.customer.points === 'number' && (
                      <div>
                        <div style={{ fontSize: '11px', color: '#065F46' }}>{t('pos:checkoutDisplayPage.points', 'Points')}</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#635BFF' }}>{cart.customer.points.toLocaleString()}</div>
                      </div>
                    )}
                    {(cart.customer.tier || cart.customer.loyaltyTier) && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: '#065F46' }}>{t('pos:checkoutDisplayPage.tier', 'Tier')}</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540' }}>{cart.customer.tier || cart.customer.loyaltyTier}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ padding: '12px', background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '10px', textAlign: 'center', fontSize: '12px', color: '#6B7280' }}>
                {t('pos:checkoutDisplayPage.walkInGuest', 'Walk-in guest (no member info)')}
              </div>
            )}
          </LeftPanel>
        ) : showPhoneInput && (
        <LeftPanel>
          <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '8px', textAlign: 'center' }}>
            Enter phone number for points
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0A2540', textAlign: 'center', padding: '10px 0', minHeight: '40px', letterSpacing: '2px' }}>
            {phoneNumber || '—'}
          </div>

          {/* 고객 정보 */}
          {customerStatus === 'found' && customer && (
            <div style={{ padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', marginBottom: '12px', animation: 'fadeIn 0.3s' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#065F46' }}>{customer.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#4B5563' }}>{t('pos:checkoutDisplayPage.points')}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#635BFF' }}>{customer.points.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#4B5563' }}>{t('pos:checkoutDisplayPage.tier')}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540' }}>{customer.tier}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#4B5563' }}>{t('pos:checkoutDisplayPage.orders')}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540' }}>{customer.totalOrders}</div>
                </div>
              </div>
            </div>
          )}
          {customerStatus === 'searching' && (
            <div style={{ textAlign: 'center', color: '#4B5563', fontSize: '14px', padding: '12px 0' }}>{t('pos:checkoutDisplayPage.checking')}</div>
          )}
          {customerStatus === 'not_found' && !showRegister && (
            <div style={{ padding: '12px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#92400E', marginBottom: '8px' }}>{t('pos:checkoutDisplayPage.noAccountFound')}</div>
              <button onClick={() => setShowRegister(true)} style={{ padding: '10px', fontSize: '13px', fontWeight: 600, width: '100%', border: 'none', borderRadius: '6px', background: '#F59E0B', color: 'white', cursor: 'pointer' }}>
                Register for Points
              </button>
            </div>
          )}
          {showRegister && (
            <div style={{ padding: '12px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', marginBottom: '12px' }}>
              <input type="text" placeholder="Your name" value={registerName} onChange={e => setRegisterName(e.target.value)} autoFocus
                style={{ width: '100%', padding: '10px', border: '1px solid #BAE6FD', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '8px' }} />
              <button onClick={handleRegister} disabled={!registerName.trim() || registering} style={{
                padding: '10px', fontSize: '13px', fontWeight: 600, width: '100%', border: 'none', borderRadius: '6px', background: '#635BFF', color: 'white', cursor: 'pointer', opacity: !registerName.trim() ? 0.5 : 1
              }}>{registering ? 'Registering...' : 'Complete'}</button>
            </div>
          )}

          {/* 키패드 — 고객 찾았으면 숨김 */}
          {customerStatus !== 'found' && customerStatus !== 'not_found' && !showRegister && (
            <>
              <KeypadGrid>
                {['1','2','3','4','5','6','7','8','9'].map(k => <Key key={k} onClick={() => handleKeyPress(k)}>{k}</Key>)}
                <Key onClick={handleClear} style={{ fontSize: '13px', color: '#4B5563' }}>{t('pos:checkoutDisplayPage.clear')}</Key>
                <Key onClick={() => handleKeyPress('0')}>0</Key>
                <Key onClick={handleBackspace} style={{ fontSize: '16px' }}>⌫</Key>
              </KeypadGrid>
              {(() => { const d = phoneNumber.startsWith('0') ? phoneNumber.length - 1 : phoneNumber.length; const ok = d >= selectedCountry.minLength; return (
              <button onClick={handlePhoneSubmit} disabled={!ok} style={{ width: '100%', marginTop: '10px', padding: '14px', fontSize: '15px', fontWeight: 600, border: 'none', borderRadius: '8px', background: '#635BFF', color: 'white', cursor: 'pointer', opacity: ok ? 1 : 0.5 }}>{t('pos:checkoutDisplayPage.done')}</button>
              ); })()}
            </>
          )}
          {/* 처음으로 돌아가기 — 모든 상태에서 표시 */}
          {(customerStatus !== 'idle' || phoneNumber) && (
            <button onClick={handleClear} style={{ marginTop: '12px', padding: '10px', fontSize: '13px', border: 'none', borderRadius: '6px', background: 'transparent', color: '#635BFF', cursor: 'pointer', width: '100%', textDecoration: 'underline' }}>
              {customerStatus === 'found' ? 'Change Number' : 'Start Over'}
            </button>
          )}
        </LeftPanel>
        )}

        {/* ===== RIGHT: 주문 내역 ===== */}
        <RightPanel>
          {hasItems ? (
            <>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#4B5563', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('pos:checkoutDisplayPage.yourOrder')}</h3>
              <div style={{ flex: 1, overflow: 'auto' }}>
                {cart!.items.map((item, i) => (
                  <ItemRow key={i}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A2540' }}>{item.quantity > 1 ? `${item.quantity}× ` : ''}{item.name}</div>
                      {item.options?.map((opt, j) => <div key={j} style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>+ {opt}</div>)}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#0A2540', whiteSpace: 'nowrap', marginLeft: '16px' }}>{formatCurrency(item.price * item.quantity, currency)}</div>
                  </ItemRow>
                ))}
              </div>
              <div style={{ background: '#F1F4F8', borderRadius: '10px', padding: '14px', marginTop: '12px' }}>
                {cart!.subtotal !== cart!.total && <SummaryRow><span>{t('pos:checkoutDisplayPage.subtotal')}</span><span>{formatCurrency(cart!.subtotal, currency)}</span></SummaryRow>}
                {cart!.tax > 0 && <SummaryRow><span>Tax ({cart!.taxRate}%)</span><span>{formatCurrency(cart!.tax, currency)}</span></SummaryRow>}
                {cart!.serviceCharge > 0 && <SummaryRow><span>Service ({cart!.serviceChargeRate}%)</span><span>{formatCurrency(cart!.serviceCharge, currency)}</span></SummaryRow>}
                {cart!.discount > 0 && <SummaryRow><span>{t('pos:checkoutDisplayPage.discount')}</span><span style={{ color: '#10B981' }}>-{formatCurrency(cart!.discount, currency)}</span></SummaryRow>}
                <div style={{ borderTop: '1px solid #C7CED6', margin: '6px 0' }} />
                <SummaryRow bold><span>{t('pos:checkoutDisplayPage.total')}</span><span>{formatCurrency(cart!.total, currency)}</span></SummaryRow>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.3 }}>🛒</div>
              <div style={{ fontSize: '16px' }}>{t('pos:checkoutDisplayPage.waitingForOrder')}</div>
              <div style={{ fontSize: '13px', marginTop: '4px' }}>{t('pos:checkoutDisplayPage.itemsWillAppearHereAsTheCashierAddsThem')}</div>
            </div>
          )}
        </RightPanel>
      </Main>
    </Container>
  );
};

export default CheckoutDisplayPage;
