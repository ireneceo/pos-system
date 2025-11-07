import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMobileOrder } from '../../contexts/MobileOrderContext';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
  
  /* PWA safe area handling */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
`;

const Header = styled.header`
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 12px 16px;
  min-height: 64px; /* Fixed height to match back button height */
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
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
    background: #F3F4F6;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #374151;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
`;

const HeaderAction = styled.div`
  width: 40px; /* Match back button width for centering */
  height: 40px; /* Match back button height */
`;

const Content = styled.main`
  flex: 1;
  padding: 16px;
  padding-bottom: 80px; /* Space for bottom navigation */
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const BottomNav = styled.nav`
  background: white;
  border-top: 1px solid #E5E7EB;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  z-index: 100;
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
  color: ${props => props.active ? '#635BFF' : '#9CA3AF'};
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

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  currentPage?: 'menu' | 'cart' | 'orders';
  cartItemCount?: number;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  onBack,
  currentPage,
  cartItemCount = 0
}) => {
  const navigate = useNavigate();
  const { currentStore } = useMobileOrder();

  // Get slug from currentStore or sessionStorage
  const slug = currentStore?.slug || sessionStorage.getItem('restaurantSlug') || 'default';

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <LayoutContainer>
      {title && (
        <Header>
          {showBack ? (
            <BackButton onClick={onBack}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </BackButton>
          ) : (
            <HeaderAction />
          )}
          <Title>{title}</Title>
          <HeaderAction />
        </Header>
      )}
      
      <Content>{children}</Content>

      <BottomNav>
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
          {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
          <span>Cart</span>
        </NavItem>

        <NavItem
          active={currentPage === 'orders'}
          onClick={() => handleNavigation(`/mobile/${slug}/orders`)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Orders</span>
        </NavItem>
      </BottomNav>
    </LayoutContainer>
  );
};

export default MobileLayout;