import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStaff } from '../../contexts/StaffContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePaymentStatus } from '../../contexts/PaymentStatusContext';
import { useOrders } from '../../contexts/OrderContext';
import { BrandThemeProvider } from '../../contexts/BrandThemeContext';
import { PaymentStatusModals } from '../PaymentStatus/PaymentStatusModals';
import { AccessBlocked } from '../PaymentStatus/AccessBlocked';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';

const LayoutContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`;

const Sidebar = styled.div<{ isOpen?: boolean; isCollapsed?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.isCollapsed ? '0px' : '220px'};
  height: 100vh;
  background: #FAFBFC;
  border-right: ${props => props.isCollapsed ? 'none' : '1px solid #E6EBF1'};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow-x: hidden;

  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s, width 0.3s ease;
  }
`;

const SidebarHeader = styled.div<{ isCollapsed?: boolean }>`
  padding: ${props => props.isCollapsed ? '16px 8px' : '16px'};
  border-bottom: 1px solid #E6EBF1;
  flex-shrink: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'space-between'};
`;

const SidebarToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SidebarOpenButton = styled.button<{ isCollapsed?: boolean }>`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  display: ${props => props.isCollapsed ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
`;

const SidebarNav = styled.nav`
  padding: 8px 0 24px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
    transition: background 0.2s;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
  
  /* 모바일에서 스무스 스크롤 */
  -webkit-overflow-scrolling: touch;
  
  /* 스크롤 페이드 효과 */
  mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  
  @media (max-width: 768px) {
    padding-bottom: 30px;
    mask-image: none;
    -webkit-mask-image: none;
  }
`;

const NavSection = styled.div`
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NavTitle = styled.div`
  color: #8898AA;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 6px;
  margin-top: 20px;
`;

const NavItem = styled(Link)<{ active?: boolean; hasPending?: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #6B7C93;
  text-decoration: none;
  transition: all 0.15s;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  min-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
  }

  ${props => props.active && `
    background: #F0F4FF;
    color: #635BFF;
    border-right: 2px solid #635BFF;
  `}

  ${props => props.hasPending && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #FF6B6B;
      border-radius: 50%;
      animation: blink 1s infinite;
    }
  `}

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const NavIcon = styled.span<{ hasPending?: boolean }>`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  flex-shrink: 0;

  ${props => props.hasPending && `
    animation: pulse 1.5s infinite;
  `}

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const MainContent = styled.div<{ isCollapsed?: boolean }>`
  margin-left: ${props => props.isCollapsed ? '0px' : '220px'};
  min-height: 100vh;
  background: #FAFBFC;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MobileHeader = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  z-index: 999;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  color: #0A2540;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #F6F9FC;
    border-radius: 4px;
  }
`;

const MobileTitle = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
  }
`;

const StaffAvatar = styled.div<{ role: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: white;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand General': return '#DC2626';
      case 'Foodcourt Manager': return '#F59E0B';
      case 'Brand Manager': return '#EF4444';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const StaffInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const StaffName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1;
`;

const StaffRole = styled.div`
  font-size: 10px;
  color: #6B7280;
  text-transform: capitalize;
  line-height: 1;
`;

const MobileContent = styled.div`
  @media (max-width: 768px) {
    padding-top: 56px;
  }
`;

const Overlay = styled.div<{ isOpen?: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
`;

const UserInfo = styled.div`
  padding: 16px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #F0F4FF;
  }
`;

const UserAvatar = styled.div<{ role: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand General': return '#DC2626';
      case 'Foodcourt Manager': return '#F59E0B';
      case 'Brand Manager': return '#EF4444';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`;

const UserEmail = styled.div`
  font-size: 10px;
  color: #8898AA;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');
  const sidebarNavRef = React.useRef<HTMLDivElement>(null);
  const savedScrollPosition = React.useRef<number>(0);
  const { logout, currentStaff, isLoggedIn } = useStaff();
  const { user, logout: authLogout } = useAuth();
  const { paymentStatus, canAccess } = usePaymentStatus();
  const { orders } = useOrders();

  // Get restaurantId from URL or user context
  const urlRestaurantId = location.pathname.match(/\/restaurant\/(\d+)/)?.[1];
  const restaurantId = urlRestaurantId || user?.restaurantId || user?.restaurant_id?.toString() || '1';

  // Debug logging - CRITICAL: Check if this appears in console!
  console.log('='.repeat(80));
  console.log('MainLayout Debug - PLEASE CHECK THIS LOG:');
  console.log('='.repeat(80));
  console.log('User object:', user);
  console.log('User role:', user?.role);
  console.log('URL restaurantId:', urlRestaurantId);
  console.log('Final restaurantId:', restaurantId);
  console.log('user.restaurantId:', user?.restaurantId);
  console.log('user.restaurant_id:', user?.restaurant_id);
  console.log('pathname:', location.pathname);
  console.log('='.repeat(80));

  // EMERGENCY: Alert if user is null
  if (!user) {
    console.error('❌ USER IS NULL! Not logged in or auth context failed!');
  }
  if (user && !user.role) {
    console.error('❌ USER HAS NO ROLE!', user);
  }

  // Get allowed routes based on restaurant's subscription plan
  const { isRouteAllowed } = useAllowedRoutes(
    (user?.role === 'Restaurant Admin' || user?.role === 'Staff') ? Number(restaurantId) : null
  );

  // Count pending orders (새 주문만) - orders가 있을 때만 필터링
  const pendingOrders = orders && Array.isArray(orders) ? orders.filter(order => order.status === 'pending').length : 0;

  const handleLogout = () => {
    logout();
    authLogout();
    navigate('/pos');
  };

  const isActive = (path: string) => location.pathname === path;

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '?';

    const words = name.trim().split(' ').filter(word => word.length > 0);

    if (words.length === 0) return '?';

    // If single word, take first 2 characters
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    // If multiple words, take first character of each word (max 2)
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // Only close sidebar on mobile (when it's in overlay mode)
    // Desktop sidebar stays open and maintains scroll position
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 페이지 접근 권한 체크

  // Load brand logo from API only (no localStorage)
  useEffect(() => {
    const loadBrandLogo = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const settings = await response.json();
          if (settings.brand_logo) {
            setBrandLogo(settings.brand_logo);
          } else if (settings.brandLogo) {
            setBrandLogo(settings.brandLogo);
          } else if (settings.logo) {
            // Fallback to old 'logo' field for backward compatibility
            setBrandLogo(settings.logo);
          } else {
            setBrandLogo('');
          }
        }
      } catch (error) {
        console.error('Failed to load brand logo from API:', error);
        setBrandLogo('');
      }
    };

    loadBrandLogo();

    // Listen for custom brand logo update event to reload from API
    const handleBrandLogoUpdate = async () => {
      console.log('Brand logo update event received, reloading from API...');
      await loadBrandLogo();
    };

    window.addEventListener('brandLogoUpdated', handleBrandLogoUpdate);

    return () => {
      window.removeEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    // 인보이스 페이지는 항상 접근 가능
    if (currentPath.includes('/invoices') || currentPath.includes('/profile') || currentPath.includes('/settings')) {
      return;
    }

    // 시스템 관리자는 제외
    if (user?.role === 'System Admin') {
      return;
    }

    // 접근 불가능한 페이지인 경우 리다이렉트
    if (!canAccess(currentPath)) {
      if (paymentStatus.restrictionLevel !== 'blocked') {
        // 부분 제한시에는 대시보드로 리다이렉트
        navigate('/pos/dashboard');
      }
    }
  }, [location.pathname, paymentStatus.restrictionLevel, canAccess, navigate, user]);

  // Save sidebar scroll position before navigation and restore after
  useEffect(() => {
    const sidebarNav = sidebarNavRef.current;
    if (!sidebarNav) return;

    // Save current scroll position
    savedScrollPosition.current = sidebarNav.scrollTop;

    // Restore scroll position after navigation
    const timer = setTimeout(() => {
      if (sidebarNav && savedScrollPosition.current !== undefined) {
        sidebarNav.scrollTop = savedScrollPosition.current;
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Inactive 레스토랑 체크 (Restaurant Admin과 Staff만)
  if ((user?.role === 'Restaurant Admin' || user?.role === 'Staff') && user?.restaurantStatus === 'inactive') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#F8FAFC',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '48px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#0A2540',
            marginBottom: '16px'
          }}>Restaurant Inactive</h2>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            {user.restaurantName ? `"${user.restaurantName}"` : 'Your restaurant'} is currently inactive.
            All features have been temporarily disabled.
          </p>
          <p style={{
            fontSize: '14px',
            color: '#8898AA',
            marginBottom: '32px'
          }}>
            Please contact your system administrator to reactivate your account.
          </p>
          <button
            onClick={handleLogout}
            style={{
              background: '#635BFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#5A51E6'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#635BFF'}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // 완전 차단된 경우 AccessBlocked 컴포넌트 표시
  if (paymentStatus.restrictionLevel === 'blocked' && user?.role !== 'System Admin') {
    return <AccessBlocked />;
  }

  return (
    <BrandThemeProvider>
      <LayoutContainer>
        {/* Payment Status Modals */}
        <PaymentStatusModals />
        
        <MobileHeader>
        <HamburgerButton onClick={toggleSidebar}>
          ☰
        </HamburgerButton>
        <MobileTitle>
          {brandLogo && (
            <img src={brandLogo} alt="Brand Logo" style={{ maxHeight: '32px', objectFit: 'contain' }} />
          )}
        </MobileTitle>
        <HeaderActions>
          {isLoggedIn && currentStaff ? (
            <ProfileButton onClick={() => window.location.href = '/profile'}>
              <StaffAvatar role={currentStaff.role}>
                {getInitials(currentStaff.name)}
              </StaffAvatar>
              <StaffInfo>
                <StaffName>{currentStaff.name}</StaffName>
                <StaffRole>{currentStaff.role}</StaffRole>
              </StaffInfo>
            </ProfileButton>
          ) : (
            <ProfileButton onClick={() => window.location.href = '/profile'}>
              <StaffAvatar role="default">?</StaffAvatar>
            </ProfileButton>
          )}
        </HeaderActions>
      </MobileHeader>

      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed}>
        <SidebarHeader isCollapsed={isSidebarCollapsed}>
          {!isSidebarCollapsed && (
            <Logo>
              {brandLogo && (
                <LogoImage src={brandLogo} alt="Brand Logo" />
              )}
            </Logo>
          )}
          <SidebarToggleButton onClick={toggleSidebarCollapse} title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isSidebarCollapsed ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            )}
          </SidebarToggleButton>
        </SidebarHeader>

        <SidebarNav ref={sidebarNavRef}>
          <NavSection>
            {/* System Admin Menu - Dashboard */}
            {user?.role === 'System Admin' && (
              <>
                <NavItem to="/pos/admin/dashboard" active={isActive('/pos/admin/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  Dashboard
                </NavItem>
              </>
            )}

            {/* System Admin - Management Section */}
            {user?.role === 'System Admin' && (
              <>
                <NavTitle>Management</NavTitle>
                <NavItem to="/pos/admin/managers" active={isActive('/pos/admin/managers')} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  Managers
                </NavItem>
                <NavItem to="/pos/admin/restaurants" active={isActive('/pos/admin/restaurants')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  Restaurants
                </NavItem>
                <NavItem to="/pos/admin/staff" active={isActive('/pos/admin/staff')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  Staff
                </NavItem>
              </>
            )}

            {/* System Admin - Billing Section */}
            {user?.role === 'System Admin' && (
              <>
                <NavTitle>Billing</NavTitle>
                <NavItem to="/pos/admin/subscriptions" active={isActive('/pos/admin/subscriptions')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Subscriptions
                </NavItem>
                <NavItem to="/pos/admin/invoices" active={isActive('/pos/admin/invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  Invoices⟤
                </NavItem>
                <NavItem to="/pos/admin/plans" active={isActive('/pos/admin/plans')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  Subscription Plans
                </NavItem>
              </>
            )}

            {/* System Admin - Analytics Section */}
            {user?.role === 'System Admin' && (
              <>
                <NavTitle>Analytics</NavTitle>
                <NavItem to="/pos/admin/report" active={isActive('/pos/admin/report')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Report⟤
                </NavItem>
              </>
            )}

            {/* System Admin - Support Section */}
            {user?.role === 'System Admin' && (
              <>
                <NavTitle>Support</NavTitle>
                <NavItem to="/pos/admin/support" active={isActive('/pos/admin/support')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  System Inquiry⟤
                </NavItem>
              </>
            )}
            
            {/* Foodcourt General Menu */}
            {user?.role === 'Foodcourt General' && (
              <>
                <NavItem to="/pos/foodcourt/general/dashboard" active={isActive('/pos/foodcourt/general/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  Dashboard
                </NavItem>
                <NavItem to="/pos/foodcourt/general/management" active={isActive('/pos/foodcourt/general/management')} onClick={closeSidebar}>
                  <NavIcon>◉</NavIcon>
                  Foodcourt Management
                </NavItem>
                <NavItem to="/pos/foodcourt/general/stats" active={isActive('/pos/foodcourt/general/stats')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Statistics Analysis
                </NavItem>
                <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  Restaurants
                </NavItem>
                <NavItem to="/pos/manager/invoices" active={isActive('/pos/manager/invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  Invoices
                </NavItem>
                <NavItem to="/pos/manager/subscriptions" active={isActive('/pos/manager/subscriptions')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Subscriptions
                </NavItem>
                <NavItem to="/pos/manager/staff" active={isActive('/pos/manager/staff')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  Staff
                </NavItem>
                <NavItem to="/pos/manager/sales" active={isActive('/pos/manager/sales')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  Sales
                </NavItem>
                <NavItem to="/pos/manager/reports" active={isActive('/pos/manager/reports')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  Reports
                </NavItem>
                <NavItem to="/pos/manager/customers" active={isActive('/pos/manager/customers')} onClick={closeSidebar}>
                  <NavIcon>○</NavIcon>
                  Customers
                </NavItem>
                <NavItem to="/pos/manager/promotions" active={isActive('/pos/manager/promotions')} onClick={closeSidebar}>
                  <NavIcon>%</NavIcon>
                  Promotions
                </NavItem>
                <NavItem to="/pos/manager/plans" active={isActive('/pos/manager/plans')} onClick={closeSidebar}>
                  <NavIcon>⊡</NavIcon>
                  Plans
                </NavItem>
                <NavItem to="/pos/manager/support" active={isActive('/pos/manager/support')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  Support Tickets
                </NavItem>
                <NavItem to="/pos/manager/operation-inquiry" active={isActive('/pos/manager/operation-inquiry')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Operation Inquiry
                </NavItem>
              </>
            )}

            {/* Brand General Menu */}
            {user?.role === 'Brand General' && (
              <>
                <NavItem to="/pos/brand/general/dashboard" active={isActive('/pos/brand/general/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  Dashboard
                </NavItem>
              </>
            )}

            {/* Brand General - Management Section */}
            {user?.role === 'Brand General' && (
              <>
                <NavTitle>Management</NavTitle>
                <NavItem to="/pos/brand/general/management" active={isActive('/pos/brand/general/management')} onClick={closeSidebar}>
                  <NavIcon>▬</NavIcon>
                  Brands
                </NavItem>
                <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  Restaurants
                </NavItem>
                <NavItem to="/pos/brand-products" active={isActive('/pos/brand-products')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  Products
                </NavItem>
                <NavItem to="/pos/recipes" active={isActive('/pos/recipes')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Recipes
                </NavItem>
                <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  Suppliers
                </NavItem>
                <NavItem to="/pos/brand-inventory" active={isActive('/pos/brand-inventory')} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  Inventory
                </NavItem>
              </>
            )}

            {/* Brand General - Analytics Section */}
            {user?.role === 'Brand General' && (
              <>
                <NavTitle>Analytics</NavTitle>
                <NavItem to="/pos/brand/general/performance" active={isActive('/pos/brand/general/performance')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Performance
                </NavItem>
                <NavItem to="/pos/brand/general/reports" active={isActive('/pos/brand/general/reports')} onClick={closeSidebar}>
                  <NavIcon>◉</NavIcon>
                  Reports
                </NavItem>
              </>
            )}

            {/* Brand General - Administration Section */}
            {user?.role === 'Brand General' && (
              <>
                <NavTitle>Administration</NavTitle>
                <NavItem to="/pos/manager/invoices" active={isActive('/pos/manager/invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  Invoices
                </NavItem>
                <NavItem to="/pos/manager/subscriptions" active={isActive('/pos/manager/subscriptions')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Subscriptions
                </NavItem>
                <NavItem to="/pos/manager/staff" active={isActive('/pos/manager/staff')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  Staff
                </NavItem>
              </>
            )}

            {/* Foodcourt Manager Menu */}
            {user?.role === 'Foodcourt Manager' && (
              <>
                <NavItem to="/pos/foodcourt/dashboard" active={isActive('/pos/foodcourt/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  Dashboard
                </NavItem>
                <NavItem to="/pos/foodcourt/rent-management" active={isActive('/pos/foodcourt/rent-management')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  Rent Management
                </NavItem>
                <NavItem to="/pos/foodcourt/tenant-support" active={isActive('/pos/foodcourt/tenant-support')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  Tenant Support
                </NavItem>
                <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  Restaurants
                </NavItem>
                <NavItem to="/pos/manager/invoices" active={isActive('/pos/manager/invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  Invoices
                </NavItem>
                <NavItem to="/pos/manager/subscriptions" active={isActive('/pos/manager/subscriptions')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Subscriptions
                </NavItem>
                <NavItem to="/pos/manager/staff" active={isActive('/pos/manager/staff')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  Staff
                </NavItem>
                <NavItem to="/pos/manager/sales" active={isActive('/pos/manager/sales')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  Sales
                </NavItem>
                <NavItem to="/pos/manager/reports" active={isActive('/pos/manager/reports')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  Reports
                </NavItem>
                <NavItem to="/pos/manager/customers" active={isActive('/pos/manager/customers')} onClick={closeSidebar}>
                  <NavIcon>○</NavIcon>
                  Customers
                </NavItem>
                <NavItem to="/pos/manager/promotions" active={isActive('/pos/manager/promotions')} onClick={closeSidebar}>
                  <NavIcon>%</NavIcon>
                  Promotions
                </NavItem>
                <NavItem to="/pos/manager/plans" active={isActive('/pos/manager/plans')} onClick={closeSidebar}>
                  <NavIcon>⊡</NavIcon>
                  Plans
                </NavItem>
                <NavItem to="/pos/manager/support" active={isActive('/pos/manager/support')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  Support Tickets
                </NavItem>
                <NavItem to="/pos/manager/operation-inquiry" active={isActive('/pos/manager/operation-inquiry')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Operation Inquiry
                </NavItem>
              </>
            )}

            {/* Brand Manager Menu */}
            {user?.role === 'Brand Manager' && (
              <>
                <NavItem to="/pos/brand/dashboard" active={isActive('/pos/brand/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  Dashboard
                </NavItem>
              </>
            )}

            {/* Brand Manager - Management Section */}
            {user?.role === 'Brand Manager' && (
              <>
                <NavTitle>Management</NavTitle>
                <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  Restaurants
                </NavItem>
                <NavItem to="/pos/brand-products" active={isActive('/pos/brand-products')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  Products
                </NavItem>
                <NavItem to="/pos/recipes" active={isActive('/pos/recipes')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Recipes
                </NavItem>
                <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  Suppliers
                </NavItem>
                <NavItem to="/pos/brand-inventory" active={isActive('/pos/brand-inventory')} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  Inventory
                </NavItem>
                <NavItem to="/pos/manager/staff" active={isActive('/pos/manager/staff')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  Staff
                </NavItem>
                <NavItem to="/pos/manager/customers" active={isActive('/pos/manager/customers')} onClick={closeSidebar}>
                  <NavIcon>○</NavIcon>
                  Customers
                </NavItem>
                <NavItem to="/pos/manager/promotions" active={isActive('/pos/manager/promotions')} onClick={closeSidebar}>
                  <NavIcon>%</NavIcon>
                  Promotions
                </NavItem>
              </>
            )}

            {/* Brand Manager - Analytics Section */}
            {user?.role === 'Brand Manager' && (
              <>
                <NavTitle>Analytics</NavTitle>
                <NavItem to="/pos/brand/reports" active={isActive('/pos/brand/reports')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Brand Reports
                </NavItem>
                <NavItem to="/pos/manager/sales" active={isActive('/pos/manager/sales')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  Sales
                </NavItem>
                <NavItem to="/pos/manager/reports" active={isActive('/pos/manager/reports')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  Reports
                </NavItem>
              </>
            )}

            {/* Brand Manager - Administration Section */}
            {user?.role === 'Brand Manager' && (
              <>
                <NavTitle>Administration</NavTitle>
                <NavItem to="/pos/manager/invoices" active={isActive('/pos/manager/invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  Invoices
                </NavItem>
                <NavItem to="/pos/manager/subscriptions" active={isActive('/pos/manager/subscriptions')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Subscriptions
                </NavItem>
                <NavItem to="/pos/manager/plans" active={isActive('/pos/manager/plans')} onClick={closeSidebar}>
                  <NavIcon>⊡</NavIcon>
                  Plans
                </NavItem>
              </>
            )}

            {/* Brand Manager - Support Section */}
            {user?.role === 'Brand Manager' && (
              <>
                <NavTitle>Support</NavTitle>
                <NavItem to="/pos/brand/franchise-support" active={isActive('/pos/brand/franchise-support')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  Franchise Support
                </NavItem>
                <NavItem to="/pos/manager/support" active={isActive('/pos/manager/support')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  Support Tickets
                </NavItem>
                <NavItem to="/pos/manager/operation-inquiry" active={isActive('/pos/manager/operation-inquiry')} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Operation Inquiry
                </NavItem>
              </>
            )}

            
            {/* Restaurant Admin & Staff Common Menu */}
            {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
              <>
                <NavItem to={`/restaurant/${restaurantId}/dashboard`} active={isActive(`/restaurant/${restaurantId}/dashboard`)} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  Dashboard
                </NavItem>
              </>
            )}

            {/* Restaurant Operations - Only for Restaurant Admin & Staff */}
            {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
              <>
                <NavItem to={`/restaurant/${restaurantId}/live-orders`} active={isActive(`/restaurant/${restaurantId}/live-orders`)} hasPending={pendingOrders > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={pendingOrders > 0}>◉</NavIcon>
                  Live Orders
                </NavItem>
              </>
            )}
          </NavSection>
          
          {/* System Access - Only for Restaurant Admin & Staff */}
          {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
            <NavSection>
              <NavTitle>System Access</NavTitle>
              {(isRouteAllowed(`/restaurant/${restaurantId}/pos-terminal`) || true) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/pos-terminal`}
                  active={isActive(`/restaurant/${restaurantId}/pos-terminal`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    window.open(`/restaurant/${restaurantId}/pos-terminal`, '_blank');
                  }}
                >
                  <NavIcon>▦</NavIcon>
                  POS Terminal
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/kitchen`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/kitchen`}
                  active={isActive(`/restaurant/${restaurantId}/kitchen`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    window.open(`/restaurant/${restaurantId}/kitchen`, '_blank');
                  }}
                >
                  <NavIcon>◐</NavIcon>
                  Kitchen Display
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/display`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/display`}
                  active={isActive(`/restaurant/${restaurantId}/display`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    window.open(`/restaurant/${restaurantId}/display`, '_blank');
                  }}
                >
                  <NavIcon>□</NavIcon>
                  Customer Display
                </NavItem>
              )}
              {isRouteAllowed(`/mobile/:slug/menu`) && (
                <NavItem
                  to="/mobile"
                  active={isActive('/mobile')}
                  onClick={async (e) => {
                  e.preventDefault();
                  closeSidebar();

                  // Check if user has restaurantId
                  if (!user?.restaurantId) {
                    console.error('No restaurant ID found for user');
                    alert('Unable to open mobile order - no restaurant associated with your account');
                    return;
                  }

                  // Fetch restaurant slug
                  const restaurantId = user.restaurantId;
                  console.log('Fetching restaurant:', restaurantId);

                  try {
                    const token = localStorage.getItem('auth_token');
                    const response = await fetch(`/api/restaurants/${restaurantId}`, {
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                      }
                    });
                    console.log('Response status:', response.status);

                    if (response.ok) {
                      const result = await response.json();
                      console.log('Restaurant result:', result);
                      const data = result.success ? result.data : result;
                      const slug = data.slug || `restaurant-${restaurantId}`;
                      console.log('Using slug:', slug);
                      window.open(`/mobile/${slug}`, '_blank');
                    } else {
                      console.error('Failed to fetch restaurant, status:', response.status);
                      // Fallback to default slug format
                      window.open(`/mobile/restaurant-${restaurantId}`, '_blank');
                    }
                  } catch (error) {
                    console.error('Error fetching restaurant slug:', error);
                    // Fallback to default slug format
                    window.open(`/mobile/restaurant-${restaurantId}`, '_blank');
                  }
                }}
              >
                <NavIcon>◯</NavIcon>
                Mobile Order
              </NavItem>
              )}
            </NavSection>
          )}
          
          {/* Restaurant Admin - Products Management */}
          {user?.role === 'Restaurant Admin' && (
            <NavSection>
              <NavTitle>Products</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/menu`) && (
                <NavItem to={`/restaurant/${restaurantId}/menu`} active={isActive(`/restaurant/${restaurantId}/menu`)} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  Menu
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/categories`) && (
                <NavItem to={`/restaurant/${restaurantId}/categories`} active={isActive(`/restaurant/${restaurantId}/categories`)} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Categories
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/options`) && (
                <NavItem to={`/restaurant/${restaurantId}/options`} active={isActive(`/restaurant/${restaurantId}/options`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  Options
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/recipe-management`) && (
                <NavItem to={`/restaurant/${restaurantId}/recipe-management`} active={isActive(`/restaurant/${restaurantId}/recipe-management`)} onClick={closeSidebar}>
                  <NavIcon>◘</NavIcon>
                  Recipe
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/suppliers`) && (
                <NavItem to={`/restaurant/${restaurantId}/suppliers`} active={isActive(`/restaurant/${restaurantId}/suppliers`)} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  Suppliers
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/inventory`) && (
                <NavItem to={`/restaurant/${restaurantId}/inventory`} active={isActive(`/restaurant/${restaurantId}/inventory`)} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  Inventory
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/product-recipes`) && (
                <NavItem to={`/restaurant/${restaurantId}/product-recipes`} active={isActive(`/restaurant/${restaurantId}/product-recipes`)} onClick={closeSidebar}>
                  <NavIcon>▧</NavIcon>
                  Product Recipes
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin - Team & Marketing */}
          {user?.role === 'Restaurant Admin' && (
            <NavSection>
              <NavTitle>Team</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/staff`) && (
                <NavItem to={`/restaurant/${restaurantId}/staff`} active={isActive(`/restaurant/${restaurantId}/staff`)} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  Staff⟤
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/customers`) && (
                <NavItem to={`/restaurant/${restaurantId}/customers`} active={isActive(`/restaurant/${restaurantId}/customers`)} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  Customers⟤
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/promotions`) && (
                <NavItem to={`/restaurant/${restaurantId}/promotions`} active={isActive(`/restaurant/${restaurantId}/promotions`)} onClick={closeSidebar}>
                  <NavIcon>%</NavIcon>
                  Promotions⟤
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin - Analytics */}
          {user?.role === 'Restaurant Admin' && (
            <NavSection>
              <NavTitle>Analytics</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/reports`) && (
                <NavItem to={`/restaurant/${restaurantId}/reports`} active={isActive(`/restaurant/${restaurantId}/reports`)} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  Reports
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/history`) && (
                <NavItem to={`/restaurant/${restaurantId}/history`} active={isActive(`/restaurant/${restaurantId}/history`)} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  Activity History⟤
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin - Billing & Support */}
          {user?.role === 'Restaurant Admin' && (
            <NavSection>
              <NavTitle>Billing & Support</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/invoices`) && (
                <NavItem to={`/restaurant/${restaurantId}/invoices`} active={isActive(`/restaurant/${restaurantId}/invoices`)} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  Invoices⟤
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/support`) && (
                <NavItem to={`/restaurant/${restaurantId}/support`} active={isActive(`/restaurant/${restaurantId}/support`)} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  System Inquiry⟤
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/operation-inquiry`) && (
                <NavItem to={`/restaurant/${restaurantId}/operation-inquiry`} active={isActive(`/restaurant/${restaurantId}/operation-inquiry`)} onClick={closeSidebar}>
                  <NavIcon>▲</NavIcon>
                  Operation Inquiry⟤
                </NavItem>
              )}
            </NavSection>
          )}
          
          {/* Settings Section - Role-based */}
          <NavSection>
            <NavTitle>Settings</NavTitle>
            
            {/* Profile for all users */}
            {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') ? (
              <NavItem to={`/restaurant/${restaurantId}/profile`} active={isActive(`/restaurant/${restaurantId}/profile`)} onClick={closeSidebar}>
                <NavIcon>◯</NavIcon>
                My Profile
              </NavItem>
            ) : (
              <NavItem to="/pos/profile" active={isActive('/pos/profile')} onClick={closeSidebar}>
                <NavIcon>◯</NavIcon>
                My Profile
              </NavItem>
            )}

            {/* System Admin Settings */}
            {user?.role === 'System Admin' && (
              <>
                <NavItem to="/pos/admin/settings" active={isActive('/pos/admin/settings')} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  Company Information
                </NavItem>
                <NavItem to="/pos/admin/site-settings" active={isActive('/pos/admin/site-settings')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  Site Settings
                </NavItem>
                <NavItem to="/pos/admin/notification-settings" active={isActive('/pos/admin/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  Notification Settings
                </NavItem>
                <NavItem to="/pos/admin/system-config" active={isActive('/pos/admin/system-config')} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  System Config⟤
                </NavItem>
                <NavItem to="/pos/admin/security" active={isActive('/pos/admin/security')} onClick={closeSidebar}>
                  <NavIcon>◎</NavIcon>
                  Security⟤
                </NavItem>
                <NavItem to="/pos/admin/backup" active={isActive('/pos/admin/backup')} onClick={closeSidebar}>
                  <NavIcon>□</NavIcon>
                  Backup & Restore⟤
                </NavItem>
                <NavItem to="/pos/admin/logs" active={isActive('/pos/admin/logs')} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  System Logs⟤
                </NavItem>
              </>
            )}

            {/* Restaurant Admin & Staff Settings */}
            {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
              <>
                <NavItem to={`/restaurant/${restaurantId}/settings`} active={isActive(`/restaurant/${restaurantId}/settings`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  Store Settings
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/company-information`} active={isActive(`/restaurant/${restaurantId}/company-information`)} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  Company Information
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/notification-settings`} active={isActive(`/restaurant/${restaurantId}/notification-settings`)} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  Notification Settings
                </NavItem>
              </>
            )}

            {/* Other Manager roles keep minimal settings */}
            {(user?.role !== 'System Admin' && user?.role !== 'Restaurant Admin' && user?.role !== 'Staff') && (
              <>
                <NavItem to="/pos/settings" active={isActive('/pos/settings')} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  Settings
                </NavItem>
                <NavItem to="/pos/manager/notification-settings" active={isActive('/pos/manager/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  Notification Settings
                </NavItem>
              </>
            )}
            
            {/* Logout for all */}
            <NavItem to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <NavIcon>↩</NavIcon>
              Logout
            </NavItem>
          </NavSection>
        </SidebarNav>

        <SidebarFooter>
          {/* User Information */}
          {user && (
            <UserInfo>
            <UserCard onClick={() => {
              if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
                navigate(`/restaurant/${restaurantId}/profile`);
              } else {
                navigate('/pos/profile');
              }
            }}>
              <UserAvatar role={user.role}>
                {getInitials(user.full_name || user.name || user.email)}
              </UserAvatar>
              <UserDetails>
                <UserName>{user.full_name || user.name || 'User'}</UserName>
                <UserRole>{user.role}</UserRole>
                <UserEmail>{user.email}</UserEmail>
              </UserDetails>
            </UserCard>
          </UserInfo>
          )}
        </SidebarFooter>
      </Sidebar>

      {/* Sidebar Open Button (shown when sidebar is collapsed) */}
      <SidebarOpenButton
        isCollapsed={isSidebarCollapsed}
        onClick={toggleSidebarCollapse}
        title="Open Sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </SidebarOpenButton>

      <MainContent isCollapsed={isSidebarCollapsed}>
        <MobileContent>
          {children}
        </MobileContent>
      </MainContent>

      </LayoutContainer>

      {/* Global print styles for MainLayout */}
      <style>{`
        @media print {
          /* Hide EVERYTHING except print content */
          body > *:not(#bill-print-content):not([data-print-bill]) {
            display: none !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </BrandThemeProvider>
  );
};

export default MainLayout;