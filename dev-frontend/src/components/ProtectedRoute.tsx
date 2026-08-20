import React from 'react';
import { Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAllowedRoutes } from '../hooks/useAllowedRoutes';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
// 이 파일에는 기존 로컬 `Button`(아래 styled)이 이미 있다 — 이름 충돌을 피해 별칭으로 가져온다.
// (기존 로컬 버튼은 baseline 부채라 이번 작업 범위에서 건드리지 않는다.)
import { Button as SharedButton } from './UI';

// ── POS 현장 단말 가드용 헬퍼 (설계 §6.3) ──────────────────────────────────
// 이 기기가 어느 매장 POS 로 고정됐는지는 로그인 시에만 기록된다(`pos_device_restaurant`,
// AuthContext). 컨텍스트 전환은 이 값을 덮어쓰지 않으므로 "기기가 원래 속한 매장"의 기준값이 된다.
const POS_DEVICE_ROUTE_PREFIXES = ['/pos-terminal', '/kitchen', '/display', '/checkout-display', '/floor-plan'];

function isPosDeviceRoute(pathname: string): boolean {
  return POS_DEVICE_ROUTE_PREFIXES.some((p) => pathname.startsWith(p) || pathname.includes(p));
}

function getDeviceContextMismatch(user: { restaurantId?: string | null; restaurant_id?: number | null }):
  { device: { id: string; name: string }; session: string } | null {
  let device: any = null;
  try {
    const raw = localStorage.getItem('pos_device_restaurant');
    device = raw ? JSON.parse(raw) : null;
  } catch {
    device = null;
  }
  if (!device?.id) return null;                      // 기기 고정 없음 → 가드 미적용(기존 동작)
  const sessionRid = String(user.restaurantId ?? user.restaurant_id ?? '');
  if (!sessionRid) return null;
  if (sessionRid === String(device.id)) return null; // 일치 → 통과
  return { device: { id: String(device.id), name: device.name || '' }, session: sessionRid };
}

const MismatchWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: var(--pos-bg, #F6F9FC);
  text-align: center;
`;

const MismatchPanel = styled.div`
  max-width: 460px;
  width: 100%;
  padding: 28px 24px;
  border-radius: 12px;
  background: var(--pos-surface, #FFFFFF);
  box-shadow: 0 4px 16px rgba(10, 37, 64, 0.08);

  button {
    min-height: 44px;
  }
`;

const MismatchGlyph = styled.div`
  font-size: 28px;
  line-height: 1;
  margin-bottom: 12px;
  color: #F59E0B;
`;

const MismatchTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
`;

const MismatchText = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--pos-text-muted, #425466);
`;

// 진입 차단 화면 — "이 기기의 매장으로 전환" 버튼으로 정상 상태로 돌아갈 수 있게 한다.
const DeviceContextMismatchScreen: React.FC<{ device: { id: string; name: string }; session: string }> = ({ device }) => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  return (
    <MismatchWrap>
      <MismatchPanel>
        <MismatchGlyph aria-hidden="true">◐</MismatchGlyph>
        <MismatchTitle>{t('context.deviceMismatch.title')}</MismatchTitle>
        <MismatchText>{t('context.deviceMismatch.message', { device: device.name || device.id })}</MismatchText>
        <SharedButton variant="primary" fullWidth onClick={() => navigate('/pos/select-context')}>
          {t('context.deviceMismatch.switch')}
        </SharedButton>
      </MismatchPanel>
    </MismatchWrap>
  );
};

// Routes whose feature belongs to an advanced-tier addon module. When the user's
// current subscription plan does not include the listed module code, ProtectedRoute
// bounces them to their role dashboard instead of letting the page mount.
// This is the URL-level counterpart to the backend `requireModule` middleware —
// together they close the gap where a basic-tier tenant could reach the page by
// typing the URL directly.
const MODULE_GATED_ROUTES: Array<{ prefix: string; module: string }> = [
  { prefix: '/pos/brand/plans', module: 'brand_plans' },
  { prefix: '/pos/brand/general/subscriptions', module: 'brand_subscriptions' },
  { prefix: '/pos/manager/plans', module: 'brand_plans' },
  { prefix: '/pos/manager/subscriptions', module: 'brand_subscriptions' },
  { prefix: '/pos/foodcourt/plans', module: 'fc_plans' },
  { prefix: '/pos/foodcourt/general/subscriptions', module: 'fc_subscriptions' },
  { prefix: '/pos/supplier/products', module: 'supplier_products' },
  { prefix: '/pos/supplier/inventory', module: 'supplier_inventory' },
  { prefix: '/pos/foodcourt/general/products', module: 'fc_products' },
  { prefix: '/pos/foodcourt/general/inventory', module: 'fc_inventory' },
  { prefix: '/pos/suppliers/directory', module: 'buyer_supplier_directory' },
  { prefix: '/pos/suppliers/contracts', module: 'buyer_supplier_contracts' },
  { prefix: '/pos/purchase-orders', module: 'buyer_purchase_orders' },
  { prefix: '/pos/supplier/orders', module: 'supplier_orders' },
  { prefix: '/pos/supplier/trade-invoices', module: 'supplier_trade_invoices' },
  // Note: /pos/supplier/soa redirects to trade-invoices (B1 — SOA invoice 통합)
  { prefix: '/pos/supplier/staff', module: 'supplier_admin_staff' }
  // /pos/purchase-invoices route removed (v3.20 cleanup) — per-role invoice pages used instead
];

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
  requiredPermission?: string;
  requireRestaurantMatch?: boolean; // URL의 restaurantId와 사용자 restaurantId가 일치해야 함
}

const AccessDeniedContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F4F8;
`;

const AccessDeniedBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #0A2540;
  margin-bottom: 12px;
`;

const Message = styled.p`
  color: #4B5563;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #5A51E6;
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F4F8;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #C7CED6;
  border-top: 4px solid #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
  requireRestaurantMatch = false
}) => {
  const { user, isAuthenticated, isLoading, hasPermission, canAccessRoute, canOpenStaffRoute, staffHomePath } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ restaurantId?: string }>();

  // Resolve module entitlements for the current user (brand/foodcourt context).
  // hasModule fails open when plan filtering is skipped (System Admin or error state).
  const { hasModule, loading: modulesLoading } = useAllowedRoutes({
    role: user?.role || '',
    brandId: user?.brand_id || null,
    foodcourtId: user?.foodcourt_id || null
  });

  // 로딩 중일 때는 스피너 표시
  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로
  if (!isAuthenticated) {
    return <Navigate to="/pos" state={{ from: location }} replace />;
  }

  // Suspended account guard — overdue invoices.
  // Pin every route except the invoice page so the user can settle the bill.
  // Backend restores status automatically on payment (handleInvoicePaid → restoreSubscription),
  // so a subsequent /me refresh clears this gate without manual intervention.
  // Demo / test fixtures are exempt so QA tooling stays usable.
  if (user) {
    const isExempt =
      user.role === 'System Admin' ||
      user.isDemo || user.isTest ||
      user.restaurantIsDemo || user.restaurantIsTest;
    const isSuspended =
      user.subscriptionStatus === 'suspended' ||
      user.restaurantStatus === 'suspended';
    if (isSuspended && !isExempt) {
      const invoiceUrl =
        user.role === 'Restaurant Admin' || user.role === 'Staff'
          ? user.restaurantId ? `/restaurant/${user.restaurantId}/invoices` : '/pos'
          : user.role === 'Brand General' ? '/pos/brand/invoices'
          : user.role === 'Foodcourt General' ? '/pos/foodcourt/invoices'
          : user.role === 'Restaurant Owner' ? '/pos/owner/invoices'
          : null;
      if (invoiceUrl && !location.pathname.startsWith(invoiceUrl)) {
        return <Navigate to={invoiceUrl} replace />;
      }
    }
  }

  // Restaurant ID 매칭 확인 (Restaurant Admin 및 Staff만)
  if (requireRestaurantMatch && params.restaurantId && user) {
    const urlRestaurantId = parseInt(params.restaurantId, 10);
    const userRestaurantId = user.restaurantId ? Number(user.restaurantId) : undefined;
    const isSystemAdmin = user.role === 'System Admin';

    // Restaurant-scoped roles without an assigned restaurant must not fall
    // through to someone else's tenant. Bounce to /pos for the no-restaurant
    // screen instead of allowing a silent cross-tenant read.
    if (!isSystemAdmin && !userRestaurantId && (user.role === 'Restaurant Admin' || user.role === 'Staff')) {
      return <Navigate to="/pos" replace />;
    }

    // System Admin만 모든 레스토랑 접근 가능
    // 나머지 모든 역할은 자신의 restaurantId와 일치하는 레스토랑만 접근 가능
    const shouldCheckAccess = !isSystemAdmin && userRestaurantId && userRestaurantId !== urlRestaurantId;

    if (shouldCheckAccess) {
      // Automatically redirect to user's own restaurant dashboard
      const pathParts = location.pathname.split('/').filter(Boolean);
      const pagePath = pathParts.slice(2).join('/'); // Get path after /restaurant/:id/
      const redirectPath = `/restaurant/${userRestaurantId}/${pagePath || 'dashboard'}`;

      return <Navigate to={redirectPath} replace />;
    }
  }

  // 직원 작업 접근(주방/포스/서빙) 게이트 — 권한 없는 운영 페이지 URL 직접 진입 차단(2026-06-03).
  // Staff 한정. 보유 접근의 기본 랜딩으로 리다이렉트. docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md §3-B.
  if (user && user.role === 'Staff' && params.restaurantId && !canOpenStaffRoute(location.pathname)) {
    const home = staffHomePath(params.restaurantId);
    if (!location.pathname.startsWith(home.split('?')[0])) {
      return <Navigate to={home} replace />;
    }
  }

  // 역할 확인 - 권한이 없으면 역할별 대시보드로 리다이렉트
  if (requiredRole && user && !requiredRole.includes(user.role)) {
    // 역할별 대시보드로 리다이렉트
    switch (user.role) {
      case 'System Admin':
        return <Navigate to="/pos/admin/dashboard" replace />;
      case 'Foodcourt General':
        return <Navigate to="/pos/foodcourt/general/dashboard" replace />;
      case 'Brand General':
        return <Navigate to="/pos/brand/general/dashboard" replace />;
      case 'Foodcourt Manager':
        return <Navigate to="/pos/foodcourt/dashboard" replace />;
      case 'Brand Manager':
        return <Navigate to="/pos/brand/dashboard" replace />;
      case 'Restaurant Admin':
        return user.restaurantId
          ? <Navigate to={`/restaurant/${user.restaurantId}/dashboard`} replace />
          : <Navigate to="/pos" replace />;
      case 'Restaurant Owner':
        return <Navigate to="/pos/owner/dashboard" replace />;
      case 'Staff':
        return user.restaurantId
          ? <Navigate to={`/restaurant/${user.restaurantId}/dashboard`} replace />
          : <Navigate to="/pos" replace />;
      case 'Referral Partner':
        return <Navigate to="/referral/dashboard" replace />;
      default:
        return <Navigate to="/pos" replace />;
    }
  }

  // 권한 확인
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <AccessDeniedContainer>
        <AccessDeniedBox>
          <Title>Insufficient Permissions</Title>
          <Message>
            You don't have the required permission to perform this action.
          </Message>
          <Button onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </AccessDeniedBox>
      </AccessDeniedContainer>
    );
  }

  // 라우트 접근 권한 확인 - 더 유연하게 처리
  // requiredRole이 명시되지 않은 경우는 체크 스킵
  if (requiredRole && requiredRole.length > 0) {
    // Brand-level routes that don't require restaurant context
    const brandLevelRoutes = [
      '/pos/recipes',
      '/pos/ingredients',
      '/pos/brand-products',
      '/pos/brand-product-recipes',
      '/pos/brand-ingredients',
      '/pos/brand-inventory',
      '/pos/brand-menus',
      '/pos/brand-menu-categories',
      '/pos/brand-menu-option-groups',
      '/pos/suppliers',
      '/pos/purchase-orders',
      '/pos/brand/company-info',
      '/pos/brand/invoices',
      '/pos/brand/trade-invoices',
      '/pos/brand/plans',
      '/pos/brand/payment-settings',
      '/pos/brand/general',
      '/pos/brand/franchise',
      '/pos/brand/franchise-map',
      '/pos/brand/dashboard',
      '/pos/manager/restaurants',
      '/pos/manager/invoices',
      '/pos/manager/subscriptions',
      '/pos/manager/admins',
      '/pos/manager/coupons',
      '/pos/manager/sales',
      '/pos/manager/reports',
      '/pos/manager/support',
      '/pos/manager/operation-inquiry',
      '/pos/manager/plans',
      '/pos/manager/notification-settings',
      '/pos/foodcourt/company-info',
      '/pos/foodcourt/invoices',
      '/pos/foodcourt/trade-invoices',
      '/pos/foodcourt/plans',
      '/pos/foodcourt/payment-settings',
      '/pos/foodcourt/tenancy',
      '/pos/foodcourt/tenancy-map',
      '/pos/foodcourt/branches',
      '/pos/foodcourt/floor-plan',
      '/pos/foodcourt/floor-plan-editor',
      '/pos/foodcourt/general',
      '/pos/foodcourt/dashboard',
      '/pos/foodcourt/rent-management',
      '/pos/brand/manager',
      '/pos/foodcourt/manager',
      '/pos/owner/dashboard',
      '/pos/owner/restaurants',
      '/pos/owner/reports',
      '/pos/owner/invoices',
      '/pos/profile'
    ];
    const isBrandLevelRoute = brandLevelRoutes.some(route => location.pathname.startsWith(route));

    // Manager 역할들이 manager-level route에 접근하는 경우는 체크 스킵
    const shouldSkipRouteCheck = isBrandLevelRoute &&
                                  user &&
                                  (user.role === 'Brand General' || user.role === 'Brand Manager' ||
                                   user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager' ||
                                   user.role === 'Restaurant Owner' || user.role === 'System Admin');

    // requiredRole이 지정된 경우만 엄격하게 체크 (단, brand-level route는 제외)
    if (!shouldSkipRouteCheck && !canAccessRoute(location.pathname)) {
      // 역할별 대시보드로 리다이렉트
      switch (user?.role) {
        case 'System Admin':
          return <Navigate to="/pos/admin/dashboard" replace />;
        case 'Foodcourt General':
          return <Navigate to="/pos/foodcourt/general/dashboard" replace />;
        case 'Brand General':
          return <Navigate to="/pos/brand/general/dashboard" replace />;
        case 'Foodcourt Manager':
          return <Navigate to="/pos/foodcourt/dashboard" replace />;
        case 'Brand Manager':
          return <Navigate to="/pos/brand/dashboard" replace />;
        case 'Restaurant Admin':
          return user.restaurantId
            ? <Navigate to={`/restaurant/${user.restaurantId}/dashboard`} replace />
            : <Navigate to="/pos" replace />;
        case 'Restaurant Owner':
          return <Navigate to="/pos/owner/dashboard" replace />;
        case 'Staff':
          return user.restaurantId
            ? <Navigate to={`/restaurant/${user.restaurantId}/dashboard`} replace />
            : <Navigate to="/pos" replace />;
        case 'Referral Partner':
          return <Navigate to="/referral/dashboard" replace />;
        default:
          return <Navigate to="/pos" replace />;
      }
    }
  }

  // Module tier gate — if the current URL's feature is not in the plan, redirect
  // to the role dashboard. Wait for the allowed-routes fetch to settle before
  // deciding so we don't flash-redirect during hydration.
  const gated = MODULE_GATED_ROUTES.find(g => location.pathname.startsWith(g.prefix));
  if (gated && !modulesLoading && user && user.role !== 'System Admin' && !hasModule(gated.module)) {
    switch (user.role) {
      case 'Brand General':
        return <Navigate to="/pos/brand/general/dashboard" replace />;
      case 'Brand Manager':
        return <Navigate to="/pos/brand/dashboard" replace />;
      case 'Foodcourt General':
        return <Navigate to="/pos/foodcourt/general/dashboard" replace />;
      case 'Foodcourt Manager':
        return <Navigate to="/pos/foodcourt/dashboard" replace />;
      case 'Supplier Admin':
        return <Navigate to="/pos/supplier/dashboard" replace />;
      default:
        return <Navigate to="/pos" replace />;
    }
  }

  // ── POS 현장 단말 가드 (docs/MULTI_CONTEXT_LOGIN_DESIGN.md §6.3 / 검증 F7-2) ──
  //
  // 스위처를 POS 화면에 안 그리는 것만으로는 부족하다. B 매장 모자를 쓴 사람이 A 매장에
  // 고정된 기기에서 주소로 POS 에 들어올 수 있고(권한상 정당하다 — 그 매장의 RA 니까),
  // 그러면 PIN 캐셔 전환은 기기 고정 매장(A) 기준으로 직원을 찾아 **화면·기기·세션 3자가 어긋난다.**
  // 기기 고정이 없는 브라우저는 이 가드가 아예 동작하지 않는다(기존 동작 유지).
  if (user && isPosDeviceRoute(location.pathname)) {
    const mismatch = getDeviceContextMismatch(user);
    if (mismatch) {
      return <DeviceContextMismatchScreen device={mismatch.device} session={mismatch.session} />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;