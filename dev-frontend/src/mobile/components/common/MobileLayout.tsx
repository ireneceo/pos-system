import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMobileOrder } from '../../contexts/MobileOrderContext';
import { setupMobileInputHandlers } from '../../utils/mobileInputFix';
import { getActiveTable } from '../../utils/tableSession';

const LayoutContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: none; /* Prevent horizontal overscroll bounce */

  /* PWA safe area handling */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);

  /* Tablet support - center content */
  @media (min-width: 768px) {
    background: #E9EDF2;
  }
`;

/**
 * Thin brand ribbon at the very top of every mobile page.
 * Slogan on the left, "Visit purplehere.com →" link on the right.
 * Subtle violet (#635BFF) so it adds brand presence without dominating.
 */
const BrandTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #635BFF;
  color: #fff;
  padding: 4px 14px;
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.2px;
  flex-shrink: 0;

  .slogan { font-weight: 600; opacity: 0.95; }
  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    opacity: 0.95;
    white-space: nowrap;
    &:hover { opacity: 1; text-decoration: underline; }
  }
`;

// Full-width single-row header. Left = back action (or empty), center grows to
// fit page title, right = combined context chip (table · order type). The
// previous layout had a center-aligned title + separate right chip, which
// shoved the title off-center whenever the chip was wider than the back button
// and felt cramped. This balances by collapsing visually so content breathes.
const Header = styled.header`
  background: white;
  border-bottom: 1px solid #F1F4F8;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 10px 16px;
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 0 0 12px 12px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s;

  &:active {
    background: #F1F4F8;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #1F2937;
  }
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Combined context chip — table + order type in one element so the two pieces
// of information that belong together visually sit together. Right-aligned.
const ContextChip = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #F5F3FF;
  color: #635BFF;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  border: 1px solid #DDD6FE;
  letter-spacing: 0.2px;
  svg { display: block; }
  .divider {
    width: 1px;
    height: 12px;
    background: #C7BCFB;
  }
`;

const Content = styled.main<{ $bg?: string }>`
  flex: 1;
  background: ${props => props.$bg || 'transparent'};
  padding: 16px;
  padding-bottom: 80px; /* Space for bottom navigation */
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scroll in content */
  word-wrap: break-word; /* Prevent long words from causing overflow */

  /* Tablet support */
  @media (min-width: 768px) {
    background: #F9FAFB;
    padding: 24px;
    padding-bottom: 100px;
    border-radius: 12px;
    margin-top: 16px;
  }
`;

const BottomNav = styled.nav`
  background: white;
  border-top: 1px solid #C7CED6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  z-index: 100;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  transition: color 0.2s;
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

const CartBadge = styled.div`
  position: absolute;
  top: -4px;
  right: 8px;
  background: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

const OrderTypeLabel = styled.div<{ orderType: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => {
    switch (props.orderType) {
      case 'dine-in': return '#059669';
      case 'takeaway': return '#D97706';
      case 'delivery': return '#2563EB';
      case 'pickup': return '#7C3AED';
      default: return '#4B5563';
    }
  }};
  white-space: nowrap;
`;

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  currentPage?: 'home' | 'menu' | 'cart' | 'orders' | 'reserve';
  cartItemCount?: number;
  contentBg?: string; // 콘텐츠 영역 배경색 (연회색 위 흰 카드 대비용) — 미지정 시 흰색
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  onBack,
  currentPage,
  cartItemCount = 0,
  contentBg
}) => {
  const navigate = useNavigate();
  const { currentStore, orderType, cartItems } = useMobileOrder();
  // 장바구니 배지는 컨텍스트의 실제 카트 수로 표시 → 모든 페이지(상세 포함)에서 항상 정확.
  // prop cartItemCount 는 폴백.
  const cartCount = (cartItems && cartItems.length) || cartItemCount || 0;

  // iOS Safari input zoom 문제 해결 - 전역 핸들러 설정
  useEffect(() => {
    const cleanup = setupMobileInputHandlers();
    return cleanup;
  }, []);

  // 하단 nav 컨텍스트 영속화 — Account 등 공유 페이지를 reserve 흐름에서 진입해도
  // 그 흐름에 맞는 nav 가 유지되도록 sessionStorage 에 마지막 컨텍스트를 저장.
  useEffect(() => {
    if (currentPage === 'reserve') {
      sessionStorage.setItem('mobile_nav_context', 'reserve');
    } else if (currentPage === 'menu' || currentPage === 'cart') {
      sessionStorage.setItem('mobile_nav_context', 'order');
    }
    // 'home' 또는 'orders' (Account) 는 컨텍스트 변경 안 함 — 직전 흐름 유지
  }, [currentPage]);

  // 효과적인 nav 컨텍스트 결정 — 현재 페이지가 명시적이면 그것, 아니면 sessionStorage
  const lastContext = typeof window !== 'undefined' ? sessionStorage.getItem('mobile_nav_context') : null;
  const navContext: 'reserve' | 'order' =
    currentPage === 'reserve' ? 'reserve' :
    (currentPage === 'menu' || currentPage === 'cart') ? 'order' :
    (lastContext === 'reserve' ? 'reserve' : 'order');

  // Get order type label
  const getOrderTypeLabel = (type: string | null) => {
    switch (type) {
      case 'dine-in': return 'Dine-In';
      case 'takeaway': return 'Takeaway';
      case 'delivery': return 'Delivery';
      case 'pickup': return 'Pre-Order Pickup';
      default: return null;
    }
  };

  // Get order type icon
  const getOrderTypeIcon = (type: string | null) => {
    switch (type) {
      case 'dine-in': return '🍽️';
      case 'takeaway': return '🛍️';
      case 'delivery': return '🚚';
      case 'pickup': return '⏰';
      default: return '';
    }
  };

  // Get slug from currentStore or sessionStorage
  const slug = currentStore?.slug || sessionStorage.getItem('restaurantSlug') || 'default';

  // Table number: prefer this tab's scan (sessionStorage) over the durable value,
  // falling back to localStorage so it survives mobile tab eviction (cart is
  // localStorage too — keep them aligned). See utils/tableSession.
  const tableNumber = getActiveTable();

  const handleNavigation = (path: string) => {
    // Home from bottom nav: explicitly show the order-type picker. Previously we
    // only forwarded `?table=…`, which OrderTypePage auto-resolved into dine-in
    // and immediately bounced to MenuPage — so the user could never reach the
    // home picker to switch to takeaway/pickup mid-session. `picker=1` keeps
    // the table context but tells OrderTypePage NOT to auto-skip.
    if (path === `/mobile/${slug}`) {
      const qs = tableNumber
        ? `?table=${encodeURIComponent(tableNumber)}&picker=1`
        : '?picker=1';
      navigate(`${path}${qs}`);
    } else {
      navigate(path);
    }
  };
  
  return (
    <LayoutContainer>
      <BrandTopBar>
        {/* 2026-06-28 (Irene): PWA 좌측 상단은 이 한 줄만 — 슬로건+브랜드 통합. */}
        <a href="https://purplehere.com" target="_blank" rel="noopener noreferrer">Solving Real F&amp;B Problems - Purple here</a>
      </BrandTopBar>
      {title && (
        <Header>
          {showBack && (
            <BackButton onClick={onBack} aria-label="Back">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </BackButton>
          )}
          <Title>{title}</Title>
          {/* Combined table + order type pill — sits together because the two
              facts always travel together; previously a separate empty spacer
              made the right side feel hollow and misaligned. */}
          {(tableNumber || orderType) && (
            <ContextChip title={[tableNumber && `Table ${tableNumber}`, orderType && orderType.replace('-', ' ')].filter(Boolean).join(' · ')}>
              {tableNumber && (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10H21M5 10V18C5 18.5304 5.21 19.04 5.59 19.41C5.96 19.79 6.47 20 7 20H17C17.53 20 18.04 19.79 18.41 19.41C18.79 19.04 19 18.53 19 18V10M5 10V8C5 7.47 5.21 6.96 5.59 6.59C5.96 6.21 6.47 6 7 6H17C17.53 6 18.04 6.21 18.41 6.59C18.79 6.96 19 7.47 19 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{tableNumber}</span>
                </>
              )}
              {tableNumber && orderType && <span className="divider" />}
              {orderType && (
                <span style={{ textTransform: 'capitalize' }}>
                  {orderType === 'dine-in' ? 'Dine-in' : orderType === 'takeaway' ? 'Takeaway' : orderType === 'pickup' ? 'Pickup' : orderType === 'delivery' ? 'Delivery' : orderType}
                </span>
              )}
            </ContextChip>
          )}
        </Header>
      )}

      <Content $bg={contentBg}>{children}</Content>

      <BottomNav>
        {/* 컨텍스트별 하단 nav 분리:
            - reserve 페이지: Home + Reserve + Account (Menu/Cart 미노출 — 주문 흐름과 무관)
            - 주문 페이지 / 그 외: Home + Menu + Cart + Account (Reserve 미노출 — 주문 중 혼동 방지)
            홈(OrderTypePage) 에서 Reserve 카드를 클릭해야 reserve 흐름에 진입. */}
        <NavItem
          active={currentPage === 'home'}
          onClick={() => handleNavigation(`/mobile/${slug}`)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Home</span>
        </NavItem>

        {navContext === 'order' && (
          <>
            <NavItem
              active={currentPage === 'menu'}
              onClick={() => handleNavigation(`/mobile/${slug}/menu`)}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Menu</span>
            </NavItem>

            <NavItem
              active={currentPage === 'cart'}
              style={{ position: 'relative' }}
              onClick={() => handleNavigation(`/mobile/${slug}/cart`)}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
              <span>Cart</span>
            </NavItem>
          </>
        )}

        {navContext === 'reserve' && (
          <NavItem
            active={currentPage === 'reserve'}
            onClick={() => handleNavigation(`/mobile/${slug}/reservations`)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Reserve</span>
          </NavItem>
        )}

        <NavItem
          active={currentPage === 'orders'}
          onClick={() => handleNavigation(`/mobile/${slug}/account`)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Account</span>
        </NavItem>
      </BottomNav>
    </LayoutContainer>
  );
};

export default MobileLayout;