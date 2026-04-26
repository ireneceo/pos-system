import React, { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStaff } from '../../contexts/StaffContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePaymentStatus } from '../../contexts/PaymentStatusContext';
import { BrandThemeProvider } from '../../contexts/BrandThemeContext';
import { PaymentStatusModals } from '../PaymentStatus/PaymentStatusModals';
import { AccessBlocked } from '../PaymentStatus/AccessBlocked';
import LanguageSelector from '../Common/LanguageSelector';
import InboxBell from '../Inbox/InboxBell';
import { useTranslation } from 'react-i18next';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';

import { getAuthToken } from '../../utils/auth';
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
    animation: pulse 1s infinite;
  `}

  @keyframes pulse {
    0%, 50% { transform: scale(1); }
    25% { transform: scale(1.15); }
  }
`;

// Disabled menu item for undeveloped features
const DisabledNavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #B0BEC5;
  font-size: 13px;
  font-weight: 500;
  min-height: 28px;
  white-space: nowrap;
  cursor: not-allowed;
  user-select: none;
`;

const DisabledNavIcon = styled.span`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #B0BEC5;
  flex-shrink: 0;
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
      case 'Restaurant Owner': return '#7C3AED';
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

const LanguageSelectorWrapper = styled.div`
  border-top: 1px solid #E6EBF1;
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
      case 'Restaurant Owner': return '#7C3AED';
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
  const { logout, currentStaff, isLoggedIn } = useStaff();
  const { user, logout: authLogout } = useAuth();
  const { t } = useTranslation();
  const { paymentStatus, canAccess } = usePaymentStatus();
  // Get restaurantId from URL or user context
  const urlRestaurantId = location.pathname.match(/\/restaurant\/(\d+)/)?.[1];
  const restaurantId = urlRestaurantId || user?.restaurantId || user?.restaurant_id?.toString() || '1';

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'System Admin': return '/pos/admin/dashboard';
      case 'Brand General': case 'Brand Manager': return '/pos/brand/general/dashboard';
      case 'Foodcourt General': case 'Foodcourt Manager': return '/pos/foodcourt/general/dashboard';
      case 'Supplier Admin': return '/pos/supplier/dashboard';
      case 'Restaurant Owner': return '/pos/owner/dashboard';
      case 'Restaurant Admin': case 'Staff': return `/restaurant/${restaurantId}/dashboard`;
      default: return '/pos/dashboard';
    }
  };


  // Get allowed routes based on subscription plan (all roles)
  const { isRouteAllowed, hasActiveSubscription, loading: routesLoading } = useAllowedRoutes(
    user?.role ? {
      role: user.role,
      restaurantId: (user.role === 'Restaurant Admin' || user.role === 'Staff') ? Number(restaurantId) : null,
      brandId: (user.role === 'Brand General' || user.role === 'Brand Manager') ? Number(user.brand_id) : null,
      foodcourtId: (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') ? Number(user.foodcourt_id) : null,
    } : null
  );

  // Badge counts for sidebar notifications (includes pendingOrders)
  const [badgeCounts, setBadgeCounts] = useState({
    systemInquiry: 0,
    operationInquiry: 0,
    notices: 0,
    invoices: 0,
    pendingOrders: 0,
    unreadComments: { notices: 0, systemInquiry: 0, operationInquiry: 0 }
  });

  const fetchBadgeCounts = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch('/api/badge-counts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) setBadgeCounts(prev => ({ ...prev, ...data.data }));
      }
    } catch (e) { /* silent */ }
  }, []);

  // 15초 polling (통합)
  useEffect(() => {
    if (user) {
      fetchBadgeCounts();
      const interval = setInterval(fetchBadgeCounts, 15000);
      return () => clearInterval(interval);
    }
  }, [user, fetchBadgeCounts]);

  // CustomEvent 리스너: 상태 변경 시 즉시 뱃지 갱신
  useEffect(() => {
    const handler = () => fetchBadgeCounts();
    window.addEventListener('refreshBadgeCounts', handler);
    return () => window.removeEventListener('refreshBadgeCounts', handler);
  }, [fetchBadgeCounts]);

  // ─── 전역 주문 알림 소리 (Restaurant Admin, Staff만) ───
  const [globalAudioEnabled, setGlobalAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('sound_enabled');
    return saved !== 'false';
  });
  const globalSocketRef = useRef<Socket | null>(null);
  const locationRef = useRef(location);
  useEffect(() => { locationRef.current = location; }, [location]);

  // Sound 토글 핸들러
  const toggleGlobalAudio = useCallback(() => {
    setGlobalAudioEnabled(prev => {
      const next = !prev;
      localStorage.setItem('sound_enabled', String(next));
      if (!next) {
        import('../../utils/notificationSound').then(({ stopRepeatingSound }) => stopRepeatingSound());
      }
      return next;
    });
  }, []);

  // 전역 WebSocket 연결 (Restaurant Admin, Staff만)
  const userRestaurantId = user?.restaurantId || user?.restaurant_id;
  const isOrderRole = user?.role === 'Restaurant Admin' || user?.role === 'Staff';

  useEffect(() => {
    if (!userRestaurantId || !isOrderRole) return;

    const socket = io('/orders', { transports: ['websocket', 'polling'] });
    globalSocketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join-restaurant', userRestaurantId);
    });

    const playIfNotOnSoundPage = () => {
      const path = locationRef.current.pathname;
      // Live Orders, Kitchen Display는 자체 소리 관리
      if (path.includes('/live-orders') || path.includes('/kitchen')) return;
      const enabled = localStorage.getItem('sound_enabled') !== 'false';
      if (!enabled) return;
      import('../../utils/notificationSound').then(({ startRepeatingSound }) => {
        startRepeatingSound('bell', 3000);
      });
    };

    socket.on('order-created', () => { playIfNotOnSoundPage(); fetchBadgeCounts(); });
    socket.on('order-items-added', () => { playIfNotOnSoundPage(); fetchBadgeCounts(); });

    // 주문 상태 변경 시 소리 중지 (전역)
    socket.on('order-updated', () => {
      import('../../utils/notificationSound').then(({ stopRepeatingSound }) => stopRepeatingSound());
      fetchBadgeCounts();
    });

    return () => {
      socket.disconnect();
      globalSocketRef.current = null;
    };
  }, [userRestaurantId, isOrderRole, fetchBadgeCounts]);

  const handleLogout = () => {
    logout();
    authLogout();
    navigate('/pos');
  };

  const isActive = (path: string) => location.pathname === path;

  // Staff 메뉴 권한 체크: Restaurant Admin은 항상 true, Staff는 permissions 확인
  const hasMenuPermission = (permissionKey: string): boolean => {
    if (user?.role === 'Restaurant Admin') return true;
    if (user?.role !== 'Staff') return false;
    return user?.permissions?.includes(permissionKey) || false;
  };

  // Brand Manager / Foodcourt Manager 권한 체크
  const hasManagerPermission = (permissionKey: string): boolean => {
    if (user?.role === 'Brand General' || user?.role === 'Foodcourt General') return true;
    if (user?.role !== 'Brand Manager' && user?.role !== 'Foodcourt Manager') return false;
    return user?.permissions?.includes(permissionKey) || false;
  };

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

  // Brand logo: 고정 파일 경로 사용 (API 호출 불필요)
  useEffect(() => {
    setBrandLogo('/uploads/logos/brand-logo.png');

    // 관리자가 로고 변경 시 cache-bust로 즉시 반영
    const handleBrandLogoUpdate = () => {
      setBrandLogo(`/uploads/logos/brand-logo.png?v=${Date.now()}`);
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
          maxWidth: '600px',
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

  // 구독 플랜이 없는 Brand/Foodcourt/Owner는 안내 화면 표시
  // 단, 인보이스/프로필 페이지는 접근 허용 (결제/정보 확인 필요)
  const subscriptionExemptPaths = ['/pos/brand/invoices', '/pos/foodcourt/invoices', '/pos/owner/invoices', '/pos/profile', '/invoices'];
  const isExemptPath = subscriptionExemptPaths.some(p => location.pathname.startsWith(p));
  const needsSubscription = !routesLoading && !hasActiveSubscription && !isExemptPath &&
    (user?.role === 'Brand General' || user?.role === 'Brand Manager' ||
     user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager' ||
     user?.role === 'Restaurant Owner');

  const getInvoicePath = () => {
    if (user?.role === 'Brand General' || user?.role === 'Brand Manager') return '/pos/brand/invoices';
    if (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') return '/pos/foodcourt/invoices';
    if (user?.role === 'Restaurant Owner') return '/pos/owner/invoices';
    if ((user?.role === 'Restaurant Admin' || user?.role === 'Staff') && user?.restaurantId) return `/restaurant/${user.restaurantId}/invoices`;
    return '/pos/dashboard';
  };

  if (needsSubscription) {
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
          borderRadius: '16px',
          padding: '48px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#9888;</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A1A2E', marginBottom: '12px' }}>
            No Active Subscription
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            Your account does not have an active subscription plan. Please contact your system administrator or check your invoices to activate your subscription.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate(getInvoicePath())}
              style={{
                padding: '12px 24px',
                background: '#635BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              View Invoices
            </button>
            <button
              onClick={() => { authLogout(); navigate('/pos'); }}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
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
        <MobileTitle onClick={() => navigate(getDashboardPath())} style={{ cursor: 'pointer' }}>
          {brandLogo && (
            <img src={brandLogo} alt="Brand Logo" style={{ maxHeight: '32px', objectFit: 'contain' }} />
          )}
        </MobileTitle>
        <HeaderActions>
          {isOrderRole && (
            <button onClick={toggleGlobalAudio} title={globalAudioEnabled ? 'Sound On' : 'Sound Off'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', opacity: globalAudioEnabled ? 1 : 0.4 }}>
              <img src={globalAudioEnabled ? '/speaker-on.svg' : '/speaker-off.svg'} alt="Sound" style={{ width: '20px', height: '20px' }} />
            </button>
          )}
          {isLoggedIn && <InboxBell />}
          <LanguageSelector variant="globe" />
          {isLoggedIn && currentStaff ? (
            <ProfileButton onClick={() => {
              if (user?.role === 'Restaurant Admin' || user?.role === 'Staff') {
                navigate(`/restaurant/${restaurantId}/profile`);
              } else {
                navigate('/pos/profile');
              }
            }}>
              <StaffAvatar role={currentStaff.role}>
                {getInitials(currentStaff.name)}
              </StaffAvatar>
              <StaffInfo>
                <StaffName>{currentStaff.name}</StaffName>
                <StaffRole>{currentStaff.role}</StaffRole>
              </StaffInfo>
            </ProfileButton>
          ) : (
            <ProfileButton onClick={() => {
              if (user?.role === 'Restaurant Admin' || user?.role === 'Staff') {
                navigate(`/restaurant/${restaurantId}/profile`);
              } else {
                navigate('/pos/profile');
              }
            }}>
              <StaffAvatar role="default">?</StaffAvatar>
            </ProfileButton>
          )}
        </HeaderActions>
      </MobileHeader>

      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed}>
        <SidebarHeader isCollapsed={isSidebarCollapsed}>
          {!isSidebarCollapsed && (
            <Logo onClick={() => navigate(getDashboardPath())} style={{ cursor: 'pointer' }}>
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
            {/* ========== SYSTEM ADMIN ========== */}
            {user?.role === 'System Admin' && (
              <>
                <NavItem to="/pos/admin/dashboard" active={isActive('/pos/admin/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  {t("nav.dashboard")}
                </NavItem>

                <NavTitle>{t("nav.section.management")}</NavTitle>
                <NavItem to="/pos/admin/managers" active={isActive('/pos/admin/managers')} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  {t("nav.managers")}
                </NavItem>
                <NavItem to="/pos/admin/restaurants" active={isActive('/pos/admin/restaurants')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.restaurants")}
                </NavItem>
                <NavItem to="/pos/admin/staff" active={isActive('/pos/admin/staff')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  {t("nav.staff")}
                </NavItem>

                <NavTitle>{t("nav.section.suppliers", "Suppliers")}</NavTitle>
                <NavItem to="/pos/admin/supplier-companies" active={isActive('/pos/admin/supplier-companies')} onClick={closeSidebar}>
                  <NavIcon>◉</NavIcon>
                  {t("nav.supplierCompanies", "Supplier Companies")}
                </NavItem>
                <NavItem to="/pos/admin/supplier-invitations" active={isActive('/pos/admin/supplier-invitations')} onClick={closeSidebar}>
                  <NavIcon>@</NavIcon>
                  {t("nav.supplierInvitations", "Supplier Invitations")}
                </NavItem>

                <NavTitle>{t("nav.section.operations")}</NavTitle>
                <NavItem to="/pos/admin/invoices" active={isActive('/pos/admin/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                  {t("nav.invoices")}
                </NavItem>
                <NavItem to="/pos/admin/subscriptions" active={isActive('/pos/admin/subscriptions')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  {t("nav.subscriptions")}
                </NavItem>
                <NavItem to="/pos/admin/system-products" active={isActive('/pos/admin/system-products')} onClick={closeSidebar}>
                  <NavIcon>▣</NavIcon>
                  {t("nav.systemProducts")}
                </NavItem>
                <NavItem to="/pos/admin/report" active={isActive('/pos/admin/report')} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  {t("nav.report")}
                </NavItem>
                <NavTitle>{t("nav.section.communication")}</NavTitle>
                <NavItem to="/pos/admin/notices" active={isActive('/pos/admin/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                  {t("nav.notices")}
                </NavItem>
                <NavItem to="/pos/admin/work-manuals" active={isActive('/pos/admin/work-manuals')} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  {t("nav.workManuals")}
                </NavItem>
                <NavItem to="/pos/admin/support" active={isActive('/pos/admin/support')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>◎</NavIcon>
                  {t("nav.inquiryManagement")}
                </NavItem>
                <NavItem to="/pos/admin/contact-inquiries" active={isActive('/pos/admin/contact-inquiries')} onClick={closeSidebar}>
                  <NavIcon>@</NavIcon>
                  {t("nav.contactInquiries")}
                </NavItem>
                <NavItem to="/pos/admin/hardware-quotes" active={isActive('/pos/admin/hardware-quotes')} onClick={closeSidebar}>
                  <NavIcon>✎</NavIcon>
                  {t("nav.hardwareQuotes")}
                </NavItem>

                <NavTitle>{t("nav.section.plansPayments")}</NavTitle>
                <NavItem to="/pos/admin/plans" active={isActive('/pos/admin/plans')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  {t("nav.subscriptionPlans")}
                </NavItem>
                <NavItem to="/pos/admin/payment-settings" active={isActive('/pos/admin/payment-settings')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  {t("nav.paymentSettings")}
                </NavItem>
              </>
            )}

            {/* ========== BRAND GENERAL / BRAND MANAGER ========== */}
            {(user?.role === 'Brand General' || user?.role === 'Brand Manager') && (
              <>
                {hasManagerPermission('dashboard') && isRouteAllowed('/pos/brand/general/dashboard') && (
                  <NavItem to="/pos/brand/general/dashboard" active={isActive('/pos/brand/general/dashboard')} onClick={closeSidebar}>
                    <NavIcon>■</NavIcon>
                    {t("nav.dashboard")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/brand/franchise') && (
                  <NavItem to="/pos/brand/franchise" active={isActive('/pos/brand/franchise') && !isActive('/pos/brand/franchise-map')} onClick={closeSidebar}>
                    <NavIcon>◇</NavIcon>
                    {t("nav.franchise")}
                  </NavItem>
                )}
                {isRouteAllowed('/pos/brand/franchise-map') && (
                  <NavItem to="/pos/brand/franchise-map" active={isActive('/pos/brand/franchise-map')} onClick={closeSidebar}>
                    <NavIcon>◉</NavIcon>
                    {t("nav.franchiseMap", "Franchise Map")}
                  </NavItem>
                )}

                {hasManagerPermission('management') && (
                  isRouteAllowed('/pos/brand/general/management') ||
                  isRouteAllowed('/pos/manager/restaurants') ||
                  isRouteAllowed('/pos/manager/staff') ||
                  isRouteAllowed('/pos/brand/manager')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.management")}</NavTitle>
                    {isRouteAllowed('/pos/brand/general/management') && (
                      <NavItem to="/pos/brand/general/management" active={isActive('/pos/brand/general/management')} onClick={closeSidebar}>
                        <NavIcon>▬</NavIcon>
                        {t("nav.brands")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/restaurants') && (
                      <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                        <NavIcon>◐</NavIcon>
                        {t("nav.restaurants")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/staff') && (
                      <NavItem to="/pos/manager/admins" active={isActive('/pos/manager/admins')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.restaurantAdmins")}
                      </NavItem>
                    )}
                    {user?.role === 'Brand General' && isRouteAllowed('/pos/brand/manager') && (
                      <NavItem to="/pos/brand/manager" active={isActive('/pos/brand/manager')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.managers")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('products') && (
                  isRouteAllowed('/pos/brand-products') ||
                  isRouteAllowed('/pos/recipes') ||
                  isRouteAllowed('/pos/brand-product-recipes') ||
                  isRouteAllowed('/pos/brand-ingredients') ||
                  isRouteAllowed('/pos/brand-inventory')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.productsInventory")}</NavTitle>
                    {isRouteAllowed('/pos/brand-products') && (
                      <NavItem to="/pos/brand-products" active={isActive('/pos/brand-products')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.products")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/recipes') && (
                      <NavItem to="/pos/recipes" active={isActive('/pos/recipes')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.brandRecipes")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand-product-recipes') && (
                      <NavItem to="/pos/brand-product-recipes" active={isActive('/pos/brand-product-recipes')} onClick={closeSidebar}>
                        <NavIcon>⊕</NavIcon>
                        {t("nav.productRecipes")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand-ingredients') && (
                      <NavItem to="/pos/brand-ingredients" active={isActive('/pos/brand-ingredients')} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.ingredients")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/suppliers') && (
                      <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand-inventory') && (
                      <NavItem to="/pos/brand-inventory" active={isActive('/pos/brand-inventory')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.inventory")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('products') && (
                  isRouteAllowed('/pos/suppliers/directory') ||
                  isRouteAllowed('/pos/suppliers/contracts') ||
                  isRouteAllowed('/pos/purchase-orders') ||
                  isRouteAllowed('/pos/purchase-invoices')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.suppliers", "Suppliers")}</NavTitle>
                    {isRouteAllowed('/pos/suppliers/directory') && (
                      <NavItem to="/pos/suppliers/directory" active={isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.findSuppliers", "Find Suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/suppliers/contracts') && (
                      <NavItem to="/pos/suppliers/contracts" active={isActive('/pos/suppliers/contracts')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.mySuppliers", "My Suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders" active={isActive('/pos/purchase-orders')} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.purchaseOrders", "Purchase Orders")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-invoices') && (
                      <NavItem to="/pos/purchase-invoices" active={isActive('/pos/purchase-invoices')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.purchaseInvoices", "Purchase Invoices")}
                      </NavItem>
                    )}
                    {(user?.role === 'Brand General' || user?.role === 'Brand Manager') && (
                      <NavItem to="/pos/brand/general/incoming-orders" active={isActive('/pos/brand/general/incoming-orders')} onClick={closeSidebar}>
                        <NavIcon>↓</NavIcon>
                        {t("nav.incomingOrders", "Incoming Orders")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('operations') && (
                  isRouteAllowed('/pos/brand/invoices') ||
                  isRouteAllowed('/pos/brand/general/reports') ||
                  isRouteAllowed('/pos/brand/general/performance') ||
                  isRouteAllowed('/pos/manager/coupons')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.operations")}</NavTitle>
                    {isRouteAllowed('/pos/brand/invoices') && (
                      <NavItem to="/pos/brand/invoices" active={isActive('/pos/brand/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                        {t("nav.invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/reports') && (
                      <NavItem to="/pos/brand/general/reports" active={isActive('/pos/brand/general/reports')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.reports")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/performance') && (
                      <NavItem to="/pos/brand/general/performance" active={isActive('/pos/brand/general/performance')} onClick={closeSidebar}>
                        <NavIcon>▲</NavIcon>
                        {t("nav.performance")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/coupons') && (
                      <NavItem to="/pos/manager/coupons" active={isActive('/pos/manager/coupons')} onClick={closeSidebar}>
                        <NavIcon>%</NavIcon>
                        {t("nav.coupons")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('communication') && (
                  isRouteAllowed('/pos/brand/general/notices') ||
                  isRouteAllowed('/pos/brand/general/work-manuals') ||
                  isRouteAllowed('/pos/brand/general/system-inquiry') ||
                  isRouteAllowed('/pos/brand/general/operation-inquiry')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.communication")}</NavTitle>
                    {isRouteAllowed('/pos/brand/general/notices') && (
                      <NavItem to="/pos/brand/general/notices" active={isActive('/pos/brand/general/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                        {t("nav.notices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/work-manuals') && (
                      <NavItem to="/pos/brand/general/work-manuals" active={isActive('/pos/brand/general/work-manuals')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.workManuals")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/system-inquiry') && (
                      <NavItem to="/pos/brand/general/system-inquiry" active={isActive('/pos/brand/general/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>?</NavIcon>
                        {t("nav.systemInquiry")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/operation-inquiry') && (
                      <NavItem to="/pos/brand/general/operation-inquiry" active={isActive('/pos/brand/general/operation-inquiry')} hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0}>◎</NavIcon>
                        {t("nav.inquiryManagement")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('plans_payments') && (
                  isRouteAllowed('/pos/brand/plans') ||
                  isRouteAllowed('/pos/brand/general/subscriptions') ||
                  isRouteAllowed('/pos/brand/payment-settings')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.plansPayments")}</NavTitle>
                    {isRouteAllowed('/pos/brand/plans') && (
                      <NavItem to="/pos/brand/plans" active={isActive('/pos/brand/plans')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.brandPlans")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/subscriptions') && (
                      <NavItem to="/pos/brand/general/subscriptions" active={isActive('/pos/brand/general/subscriptions')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.brandSubscriptions")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/payment-settings') && (
                      <NavItem to="/pos/brand/payment-settings" active={isActive('/pos/brand/payment-settings')} onClick={closeSidebar}>
                        <NavIcon>$</NavIcon>
                        {t("nav.paymentSettings")}
                      </NavItem>
                    )}
                  </>
                )}
              </>
            )}

            {/* ========== FOODCOURT GENERAL / FOODCOURT MANAGER ========== */}
            {(user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && (
              <>
                {hasManagerPermission('dashboard') && isRouteAllowed('/pos/foodcourt/general/dashboard') && (
                  <NavItem to="/pos/foodcourt/general/dashboard" active={isActive('/pos/foodcourt/general/dashboard')} onClick={closeSidebar}>
                    <NavIcon>■</NavIcon>
                    {t("nav.dashboard")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/foodcourt/tenancy') && (
                  <NavItem to="/pos/foodcourt/tenancy" active={isActive('/pos/foodcourt/tenancy') && !isActive('/pos/foodcourt/tenancy-map')} onClick={closeSidebar}>
                    <NavIcon>◇</NavIcon>
                    {t("nav.tenancy")}
                  </NavItem>
                )}
                {isRouteAllowed('/pos/foodcourt/tenancy-map') && (
                  <NavItem to="/pos/foodcourt/tenancy-map" active={isActive('/pos/foodcourt/tenancy-map')} onClick={closeSidebar}>
                    <NavIcon>◉</NavIcon>
                    {t("nav.branchMap", "Branch Map")}
                  </NavItem>
                )}
                {isRouteAllowed('/pos/foodcourt/floor-plan') && (
                  <NavItem
                    to="/pos/foodcourt/floor-plan"
                    active={isActive('/pos/foodcourt/floor-plan')}
                    onClick={(e) => {
                      e.preventDefault();
                      closeSidebar();
                      window.open('/pos/foodcourt/floor-plan', '_blank');
                    }}
                  >
                    <NavIcon>▦</NavIcon>
                    {t("nav.floorPlan", "Floor Plan")}
                  </NavItem>
                )}

                {hasManagerPermission('management') && (
                  isRouteAllowed('/pos/foodcourt/general/management') ||
                  isRouteAllowed('/pos/manager/restaurants') ||
                  isRouteAllowed('/pos/manager/staff') ||
                  isRouteAllowed('/pos/foodcourt/manager') ||
                  isRouteAllowed('/pos/foodcourt/general/products') ||
                  isRouteAllowed('/pos/foodcourt/general/inventory') ||
                  user?.role === 'Foodcourt General'
                ) && (
                  <>
                    <NavTitle>{t("nav.section.management")}</NavTitle>
                    {user?.role === 'Foodcourt General' && isRouteAllowed('/pos/foodcourt/branches') && (
                      <NavItem to="/pos/foodcourt/branches" active={isActive('/pos/foodcourt/branches')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.branches", "Branches")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/restaurants') && (
                      <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                        <NavIcon>◐</NavIcon>
                        {t("nav.restaurants")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/staff') && (
                      <NavItem to="/pos/manager/admins" active={isActive('/pos/manager/admins')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.restaurantAdmins")}
                      </NavItem>
                    )}
                    {user?.role === 'Foodcourt General' && isRouteAllowed('/pos/foodcourt/manager') && (
                      <NavItem to="/pos/foodcourt/manager" active={isActive('/pos/foodcourt/manager')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.managers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/products') && (
                      <NavItem to="/pos/foodcourt/general/products" active={isActive('/pos/foodcourt/general/products')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.products")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/inventory') && (
                      <NavItem to="/pos/foodcourt/general/inventory" active={isActive('/pos/foodcourt/general/inventory')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.inventory")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('management') && (
                  isRouteAllowed('/pos/suppliers/directory') ||
                  isRouteAllowed('/pos/suppliers/contracts') ||
                  isRouteAllowed('/pos/purchase-orders') ||
                  isRouteAllowed('/pos/purchase-invoices')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.suppliers", "Suppliers")}</NavTitle>
                    {isRouteAllowed('/pos/suppliers/directory') && (
                      <NavItem to="/pos/suppliers/directory" active={isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.findSuppliers", "Find Suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/suppliers/contracts') && (
                      <NavItem to="/pos/suppliers/contracts" active={isActive('/pos/suppliers/contracts')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.mySuppliers", "My Suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders" active={isActive('/pos/purchase-orders')} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.purchaseOrders", "Purchase Orders")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-invoices') && (
                      <NavItem to="/pos/purchase-invoices" active={isActive('/pos/purchase-invoices')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.purchaseInvoices", "Purchase Invoices")}
                      </NavItem>
                    )}
                    {(user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && (
                      <NavItem to="/pos/foodcourt/general/incoming-orders" active={isActive('/pos/foodcourt/general/incoming-orders')} onClick={closeSidebar}>
                        <NavIcon>↓</NavIcon>
                        {t("nav.incomingOrders", "Incoming Orders")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('operations') && (
                  isRouteAllowed('/pos/foodcourt/invoices') ||
                  isRouteAllowed('/pos/foodcourt/general/reports') ||
                  isRouteAllowed('/pos/manager/coupons')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.operations")}</NavTitle>
                    {isRouteAllowed('/pos/foodcourt/invoices') && (
                      <NavItem to="/pos/foodcourt/invoices" active={isActive('/pos/foodcourt/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                        {t("nav.invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/reports') && (
                      <NavItem to="/pos/foodcourt/general/reports" active={isActive('/pos/foodcourt/general/reports')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.reports")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/coupons') && (
                      <NavItem to="/pos/manager/coupons" active={isActive('/pos/manager/coupons')} onClick={closeSidebar}>
                        <NavIcon>%</NavIcon>
                        {t("nav.coupons")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('communication') && (
                  isRouteAllowed('/pos/foodcourt/general/notices') ||
                  isRouteAllowed('/pos/foodcourt/general/work-manuals') ||
                  isRouteAllowed('/pos/foodcourt/general/system-inquiry') ||
                  isRouteAllowed('/pos/foodcourt/general/operation-inquiry')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.communication")}</NavTitle>
                    {isRouteAllowed('/pos/foodcourt/general/notices') && (
                      <NavItem to="/pos/foodcourt/general/notices" active={isActive('/pos/foodcourt/general/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                        {t("nav.notices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/work-manuals') && (
                      <NavItem to="/pos/foodcourt/general/work-manuals" active={isActive('/pos/foodcourt/general/work-manuals')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.workManuals")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/system-inquiry') && (
                      <NavItem to="/pos/foodcourt/general/system-inquiry" active={isActive('/pos/foodcourt/general/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>?</NavIcon>
                        {t("nav.systemInquiry")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/operation-inquiry') && (
                      <NavItem to="/pos/foodcourt/general/operation-inquiry" active={isActive('/pos/foodcourt/general/operation-inquiry')} hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0}>◎</NavIcon>
                        {t("nav.inquiryManagement")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('plans_payments') && (
                  isRouteAllowed('/pos/foodcourt/plans') ||
                  isRouteAllowed('/pos/foodcourt/general/subscriptions') ||
                  isRouteAllowed('/pos/foodcourt/payment-settings')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.plansPayments")}</NavTitle>
                    {isRouteAllowed('/pos/foodcourt/plans') && (
                      <NavItem to="/pos/foodcourt/plans" active={isActive('/pos/foodcourt/plans')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.foodcourtPlans")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/subscriptions') && (
                      <NavItem to="/pos/foodcourt/general/subscriptions" active={isActive('/pos/foodcourt/general/subscriptions')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.foodcourtSubscriptions")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/payment-settings') && (
                      <NavItem to="/pos/foodcourt/payment-settings" active={isActive('/pos/foodcourt/payment-settings')} onClick={closeSidebar}>
                        <NavIcon>$</NavIcon>
                        {t("nav.paymentSettings")}
                      </NavItem>
                    )}
                  </>
                )}
              </>
            )}

            {/* ========== RESTAURANT OWNER ========== */}
            {user?.role === 'Restaurant Owner' && (
              <>
                {isRouteAllowed('/pos/owner/dashboard') && (
                  <NavItem to="/pos/owner/dashboard" active={isActive('/pos/owner/dashboard')} onClick={closeSidebar}>
                    <NavIcon>■</NavIcon>
                    {t("nav.dashboard")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/owner/restaurants') && (
                  <NavItem to="/pos/owner/restaurants" active={isActive('/pos/owner/restaurants')} onClick={closeSidebar}>
                    <NavIcon>◐</NavIcon>
                    {t("nav.restaurants")}
                  </NavItem>
                )}

                {(isRouteAllowed('/pos/suppliers/directory') || isRouteAllowed('/pos/suppliers/contracts') || isRouteAllowed('/pos/purchase-orders') || isRouteAllowed('/pos/purchase-invoices')) && (
                  <>
                    <NavTitle>{t("nav.section.suppliers", "Suppliers")}</NavTitle>
                    {isRouteAllowed('/pos/suppliers/directory') && (
                      <NavItem to="/pos/suppliers/directory" active={isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.findSuppliers", "Find Suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/suppliers/contracts') && (
                      <NavItem to="/pos/suppliers/contracts" active={isActive('/pos/suppliers/contracts')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.mySuppliers", "My Suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders" active={isActive('/pos/purchase-orders')} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.purchaseOrders", "Purchase Orders")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-invoices') && (
                      <NavItem to="/pos/purchase-invoices" active={isActive('/pos/purchase-invoices')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.purchaseInvoices", "Purchase Invoices")}
                      </NavItem>
                    )}
                  </>
                )}

                {(isRouteAllowed('/pos/owner/invoices') || isRouteAllowed('/pos/owner/performance') || isRouteAllowed('/pos/owner/reports')) && (
                  <>
                    <NavTitle>{t("nav.section.operations")}</NavTitle>
                    {isRouteAllowed('/pos/owner/invoices') && (
                      <NavItem to="/pos/owner/invoices" active={isActive('/pos/owner/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                        {t("nav.invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/performance') && (
                      <NavItem to="/pos/owner/performance" active={isActive('/pos/owner/performance')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.performance")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/reports') && (
                      <NavItem to="/pos/owner/reports" active={isActive('/pos/owner/reports')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.reports")}
                      </NavItem>
                    )}
                  </>
                )}

                {(isRouteAllowed('/pos/owner/notices') || isRouteAllowed('/pos/owner/work-manuals') || isRouteAllowed('/pos/owner/system-inquiry') || isRouteAllowed('/pos/owner/operation-inquiry')) && (
                  <>
                    <NavTitle>{t("nav.section.communication")}</NavTitle>
                    {isRouteAllowed('/pos/owner/notices') && (
                      <NavItem to="/pos/owner/notices" active={isActive('/pos/owner/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                        {t("nav.notices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/work-manuals') && (
                      <NavItem to="/pos/owner/work-manuals" active={isActive('/pos/owner/work-manuals')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.workManuals")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/system-inquiry') && (
                      <NavItem to="/pos/owner/system-inquiry" active={isActive('/pos/owner/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>◇</NavIcon>
                        {t("nav.systemInquiry")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/operation-inquiry') && (
                      <NavItem to="/pos/owner/operation-inquiry" active={isActive('/pos/owner/operation-inquiry')} hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0}>◆</NavIcon>
                        {t("nav.operationInquiry")}
                      </NavItem>
                    )}
                  </>
                )}
              </>
            )}

            {/* ========== SUPPLIER ADMIN ========== */}
            {user?.role === 'Supplier Admin' && (
              <>
                <NavItem to="/pos/supplier/dashboard" active={isActive('/pos/supplier/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  {t("nav.dashboard")}
                </NavItem>

                {isRouteAllowed('/pos/supplier/products') && (
                  <NavItem to="/pos/supplier/products" active={isActive('/pos/supplier/products')} onClick={closeSidebar}>
                    <NavIcon>◇</NavIcon>
                    {t("nav.products")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/supplier/inventory') && (
                  <NavItem to="/pos/supplier/inventory" active={isActive('/pos/supplier/inventory')} onClick={closeSidebar}>
                    <NavIcon>▦</NavIcon>
                    {t("nav.inventory")}
                  </NavItem>
                )}

                <NavItem to="/pos/supplier/customers" active={isActive('/pos/supplier/customers')} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  {t("nav.customers", "Customers")}
                </NavItem>
                <NavItem to="/pos/supplier/contracts" active={isActive('/pos/supplier/contracts')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  {t("nav.contracts", "Contracts")}
                </NavItem>
                <NavItem to="/pos/supplier/orders" active={isActive('/pos/supplier/orders')} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  {t("nav.orders", "Orders")}
                </NavItem>
                <NavItem to="/pos/supplier/trade-invoices" active={isActive('/pos/supplier/trade-invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  {t("nav.tradeInvoices", "Trade Invoices")}
                </NavItem>
                <NavItem to="/pos/supplier/soa" active={isActive('/pos/supplier/soa')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  {t("nav.soa", "Statement of Account")}
                </NavItem>

                <NavTitle>{t("nav.section.settings", "Settings")}</NavTitle>
                <NavItem to="/pos/supplier/company-info" active={isActive('/pos/supplier/company-info')} onClick={closeSidebar}>
                  <NavIcon>◉</NavIcon>
                  {t("nav.companyInfo", "Company Info")}
                </NavItem>
                <NavItem to="/pos/supplier/payment-settings" active={isActive('/pos/supplier/payment-settings')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  {t("nav.paymentSettings")}
                </NavItem>
                <NavItem to="/pos/supplier/invoice-settings" active={isActive('/pos/supplier/invoice-settings')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  {t("nav.invoiceSettings", "Invoice Settings")}
                </NavItem>
                <NavItem to="/pos/supplier/invoices" active={isActive('/pos/supplier/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                  {t("nav.invoices")}
                </NavItem>
                <NavItem to="/pos/supplier/notices" active={isActive('/pos/supplier/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                  {t("nav.notices")}
                </NavItem>
                <NavItem to="/pos/supplier/system-inquiry" active={isActive('/pos/supplier/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>?</NavIcon>
                  {t("nav.systemInquiry")}
                </NavItem>
              </>
            )}

            {/* ========== RESTAURANT ADMIN & STAFF ========== */}
            {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
              <>
                <NavItem to={`/restaurant/${restaurantId}/dashboard`} active={isActive(`/restaurant/${restaurantId}/dashboard`)} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  {t("nav.dashboard")}
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/live-orders`} active={isActive(`/restaurant/${restaurantId}/live-orders`)} hasPending={badgeCounts.pendingOrders > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.pendingOrders > 0}>◉</NavIcon>
                  {t("nav.liveOrders")}
                </NavItem>
              </>
            )}
          </NavSection>
          
          {/* System Access - Only for Restaurant Admin & Staff */}
          {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
            isRouteAllowed(`/restaurant/${restaurantId}/pos-terminal`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/floor-plan`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/kitchen`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/display`) ||
            isRouteAllowed(`/mobile/:slug/menu`)
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.systemAccess")}</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/pos-terminal`) && (
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
                  {t("nav.posTerminal")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/floor-plan`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/floor-plan`}
                  active={isActive(`/restaurant/${restaurantId}/floor-plan`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    window.open(`/restaurant/${restaurantId}/floor-plan`, '_blank');
                  }}
                >
                  <NavIcon>&#x25A6;</NavIcon>
                  {t("nav.floorPlan")}
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
                  {t("nav.kitchenDisplay")}
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
                  {t("nav.customerDisplay")}
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
                    const token = getAuthToken();
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
                {t("nav.mobileOrder")}
              </NavItem>
              )}
            </NavSection>
          )}
          
          {/* Restaurant Admin & Staff - Operations */}
          {(hasMenuPermission('support') || hasMenuPermission('reports') || hasMenuPermission('inventory')) && (
            (hasMenuPermission('support') && isRouteAllowed(`/restaurant/${restaurantId}/invoices`)) ||
            (hasMenuPermission('reports') && isRouteAllowed(`/restaurant/${restaurantId}/reports`)) ||
            (hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/inventory`)) ||
            (hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/suppliers`))
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.operations")}</NavTitle>
              {hasMenuPermission('support') && isRouteAllowed(`/restaurant/${restaurantId}/invoices`) && (
                <NavItem to={`/restaurant/${restaurantId}/invoices`} active={isActive(`/restaurant/${restaurantId}/invoices`)} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                  {t("nav.invoices")}
                </NavItem>
              )}
              {hasMenuPermission('reports') && isRouteAllowed(`/restaurant/${restaurantId}/reports`) && (
                <NavItem to={`/restaurant/${restaurantId}/reports`} active={isActive(`/restaurant/${restaurantId}/reports`)} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  {t("nav.reports")}
                </NavItem>
              )}
              {hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/inventory`) && (
                <NavItem to={`/restaurant/${restaurantId}/inventory`} active={isActive(`/restaurant/${restaurantId}/inventory`)} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  {t("nav.inventory")}
                </NavItem>
              )}
              {hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/suppliers`) && (
                <NavItem to={`/restaurant/${restaurantId}/suppliers`} active={isActive(`/restaurant/${restaurantId}/suppliers`)} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  {t("nav.suppliers")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff - Suppliers Directory + Contracts (buyer-side) */}
          {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') && hasMenuPermission('inventory') && (
            isRouteAllowed('/pos/suppliers/directory') ||
            isRouteAllowed('/pos/suppliers/contracts') ||
            isRouteAllowed('/pos/purchase-orders') ||
            isRouteAllowed('/pos/purchase-invoices')
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.suppliers", "Suppliers")}</NavTitle>
              {isRouteAllowed('/pos/suppliers/directory') && (
                <NavItem to="/pos/suppliers/directory" active={isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                  <NavIcon>◉</NavIcon>
                  {t("nav.findSuppliers", "Find Suppliers")}
                </NavItem>
              )}
              {isRouteAllowed('/pos/suppliers/contracts') && (
                <NavItem to="/pos/suppliers/contracts" active={isActive('/pos/suppliers/contracts')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  {t("nav.mySuppliers", "My Suppliers")}
                </NavItem>
              )}
              {isRouteAllowed('/pos/purchase-orders') && (
                <NavItem to="/pos/purchase-orders" active={isActive('/pos/purchase-orders')} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  {t("nav.purchaseOrders", "Purchase Orders")}
                </NavItem>
              )}
              {isRouteAllowed('/pos/purchase-invoices') && (
                <NavItem to="/pos/purchase-invoices" active={isActive('/pos/purchase-invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  {t("nav.purchaseInvoices", "Purchase Invoices")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff - Communication */}
          {hasMenuPermission('support') && (
            isRouteAllowed(`/restaurant/${restaurantId}/notices`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/work-manuals`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/support`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/operation-inquiry`)
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.communication")}</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/notices`) && (
                <NavItem to={`/restaurant/${restaurantId}/notices`} active={isActive(`/restaurant/${restaurantId}/notices`)} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                  {t("nav.notices")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/work-manuals`) && (
                <NavItem to={`/restaurant/${restaurantId}/work-manuals`} active={isActive(`/restaurant/${restaurantId}/work-manuals`)} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  {t("nav.workManuals")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/support`) && (
                <NavItem to={`/restaurant/${restaurantId}/support`} active={isActive(`/restaurant/${restaurantId}/support`)} hasPending={badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.unreadComments?.systemInquiry > 0}>◎</NavIcon>
                  {t("nav.systemInquiry")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/operation-inquiry`) && (
                <NavItem to={`/restaurant/${restaurantId}/operation-inquiry`} active={isActive(`/restaurant/${restaurantId}/operation-inquiry`)} hasPending={badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.unreadComments?.operationInquiry > 0}>▲</NavIcon>
                  {t("nav.operationInquiry")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff (with permission) - Products */}
          {hasMenuPermission('menu_management') && (
            isRouteAllowed(`/restaurant/${restaurantId}/menu`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/categories`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/options`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/recipe-management`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/ingredients`)
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.products")}</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/menu`) && (
                <NavItem to={`/restaurant/${restaurantId}/menu`} active={isActive(`/restaurant/${restaurantId}/menu`)} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  {t("nav.menu")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/categories`) && (
                <NavItem to={`/restaurant/${restaurantId}/categories`} active={isActive(`/restaurant/${restaurantId}/categories`)} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  {t("nav.categories")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/options`) && (
                <NavItem to={`/restaurant/${restaurantId}/options`} active={isActive(`/restaurant/${restaurantId}/options`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.options")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/recipe-management`) && (
                <NavItem to={`/restaurant/${restaurantId}/recipe-management`} active={isActive(`/restaurant/${restaurantId}/recipe-management`)} onClick={closeSidebar}>
                  <NavIcon>◘</NavIcon>
                  {t("nav.recipes")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/ingredients`) && (
                <NavItem to={`/restaurant/${restaurantId}/ingredients`} active={isActive(`/restaurant/${restaurantId}/ingredients`)} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  {t("nav.ingredients")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff - Team & Marketing */}
          {(user?.role === 'Restaurant Admin' || hasMenuPermission('marketing')) && (
            (user?.role === 'Restaurant Admin' && isRouteAllowed(`/restaurant/${restaurantId}/staff`)) ||
            (hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/customers`)) ||
            (hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/coupons`))
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.teamMarketing")}</NavTitle>
              {user?.role === 'Restaurant Admin' && isRouteAllowed(`/restaurant/${restaurantId}/staff`) && (
                <NavItem to={`/restaurant/${restaurantId}/staff`} active={isActive(`/restaurant/${restaurantId}/staff`)} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  {t("nav.staff")}
                </NavItem>
              )}
              {hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/customers`) && (
                <NavItem to={`/restaurant/${restaurantId}/customers`} active={isActive(`/restaurant/${restaurantId}/customers`)} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  {t("nav.customers")}
                </NavItem>
              )}
              {hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/coupons`) && (
                <NavItem to={`/restaurant/${restaurantId}/coupons`} active={isActive(`/restaurant/${restaurantId}/coupons`)} onClick={closeSidebar}>
                  <NavIcon>%</NavIcon>
                  {t("nav.coupons")}
                </NavItem>
              )}
            </NavSection>
          )}
          
          {/* Settings Section - Role-based */}
          <NavSection>
            <NavTitle>{t("nav.section.settings")}</NavTitle>

            {/* Profile for all users */}
            {(user?.role === 'Restaurant Admin' || user?.role === 'Staff') ? (
              <NavItem to={`/restaurant/${restaurantId}/profile`} active={isActive(`/restaurant/${restaurantId}/profile`)} onClick={closeSidebar}>
                <NavIcon>◯</NavIcon>
                {t("nav.myProfile")}
              </NavItem>
            ) : user?.role === 'Supplier Admin' ? (
              <DisabledNavItem title="Coming Soon">
                <DisabledNavIcon>⊘</DisabledNavIcon>
                {t("nav.myProfile")}
              </DisabledNavItem>
            ) : (
              <NavItem to="/pos/profile" active={isActive('/pos/profile')} onClick={closeSidebar}>
                <NavIcon>◯</NavIcon>
                {t("nav.myProfile")}
              </NavItem>
            )}

            {/* System Admin Settings */}
            {user?.role === 'System Admin' && (
              <>
                <NavItem to="/pos/admin/settings" active={isActive('/pos/admin/settings')} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to="/pos/admin/site-settings" active={isActive('/pos/admin/site-settings')} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  {t("nav.siteSettings")}
                </NavItem>
                <NavItem to="/pos/admin/notification-settings" active={isActive('/pos/admin/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  {t("nav.notifications")}
                </NavItem>
                <NavItem to="/pos/admin/system-config" active={isActive('/pos/admin/system-config')} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.systemConfig")}
                </NavItem>
                <NavItem to="/pos/admin/scheduler-monitor" active={isActive('/pos/admin/scheduler-monitor')} onClick={closeSidebar}>
                  <NavIcon>⏱</NavIcon>
                  {t("nav.schedulerMonitor", "Scheduler Monitor")}
                </NavItem>
                <NavItem to="/pos/admin/content" active={isActive('/pos/admin/content')} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  {t("nav.content")}
                </NavItem>
                <DisabledNavItem title="Coming Soon">
                  <DisabledNavIcon>⊘</DisabledNavIcon>
                  {t("nav.security")}
                </DisabledNavItem>
                <DisabledNavItem title="Coming Soon">
                  <DisabledNavIcon>⊘</DisabledNavIcon>
                  {t("nav.backupRestore")}
                </DisabledNavItem>
                <NavItem to="/pos/admin/logs" active={isActive('/pos/admin/logs')} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  {t("nav.systemLogs")}
                </NavItem>
              </>
            )}

            {/* Brand General Settings */}
            {(user?.role === 'Brand General' || user?.role === 'Brand Manager') && (
              <>
                <NavItem to="/pos/brand/company-info" active={isActive('/pos/brand/company-info')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to="/pos/manager/notification-settings" active={isActive('/pos/manager/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  {t("nav.notifications")}
                </NavItem>
              </>
            )}

            {/* Foodcourt General Settings */}
            {(user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && (
              <>
                <NavItem to="/pos/foodcourt/company-info" active={isActive('/pos/foodcourt/company-info')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to="/pos/manager/notification-settings" active={isActive('/pos/manager/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  {t("nav.notifications")}
                </NavItem>
              </>
            )}

            {/* Supplier Admin Settings */}
            {user?.role === 'Supplier Admin' && (
              <>
                <DisabledNavItem title="Coming Soon">
                  <DisabledNavIcon>⊘</DisabledNavIcon>
                  {t("nav.companyInfo")}
                </DisabledNavItem>
              </>
            )}

            {/* Restaurant Admin & Staff (with permission) Settings */}
            {hasMenuPermission('settings') && (
              <>
                <NavItem to={`/restaurant/${restaurantId}/company-information`} active={isActive(`/restaurant/${restaurantId}/company-information`)} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/settings`} active={isActive(`/restaurant/${restaurantId}/settings`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.storeSettings")}
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/notification-settings`} active={isActive(`/restaurant/${restaurantId}/notification-settings`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.systemSettings")}
                </NavItem>
              </>
            )}

            {/* Restaurant Admin & Staff - Change History */}
            {hasMenuPermission('reports') && (user?.role === 'Restaurant Admin' || user?.role === 'Staff') && isRouteAllowed(`/restaurant/${restaurantId}/history`) && (
              <NavItem to={`/restaurant/${restaurantId}/history`} active={isActive(`/restaurant/${restaurantId}/history`)} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* System Admin - Change History */}
            {user?.role === 'System Admin' && (
              <NavItem to="/pos/admin/history" active={isActive('/pos/admin/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Brand General/Manager - Change History */}
            {(user?.role === 'Brand General' || user?.role === 'Brand Manager') && isRouteAllowed('/pos/brand/history') && (
              <NavItem to="/pos/brand/history" active={isActive('/pos/brand/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Foodcourt General/Manager - Change History */}
            {(user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && isRouteAllowed('/pos/foodcourt/history') && (
              <NavItem to="/pos/foodcourt/history" active={isActive('/pos/foodcourt/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Restaurant Owner - Change History */}
            {user?.role === 'Restaurant Owner' && isRouteAllowed('/pos/owner/history') && (
              <NavItem to="/pos/owner/history" active={isActive('/pos/owner/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Logout for all */}
            <NavItem to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <NavIcon>↩</NavIcon>
              {t("nav.logout")}
            </NavItem>
          </NavSection>
        </SidebarNav>

        <SidebarFooter>
          <LanguageSelectorWrapper>
            <LanguageSelector variant="sidebar" />
          </LanguageSelectorWrapper>
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