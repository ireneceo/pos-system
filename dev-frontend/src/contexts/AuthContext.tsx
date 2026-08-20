import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';

import { getAuthToken, setAuthToken, clearAuthToken } from '../utils/auth';
import { setOn401Handler, setOnContextFallbackHandler, resetContextFallbackNotice } from '../utils/httpClient';
import { displayStaffName } from '../utils/staffName';
import { getDashboardPath } from '../utils/dashboardPath';
export type UserRole = 'System Admin' | 'Foodcourt General' | 'Brand General' | 'Foodcourt Manager' | 'Brand Manager' | 'Restaurant Owner' | 'Restaurant Admin' | 'Staff' | 'Supplier Admin' | 'Supplier Staff' | 'Referral Partner';

export interface User {
  id?: string;
  email: string;
  name: string;
  full_name?: string;
  role: UserRole;
  restaurantId?: string | null;
  restaurant_id?: number | null;
  brand_id?: number | null;
  foodcourt_id?: number | null;
  managerId?: string | null;
  permissions?: string[];
  restaurantStatus?: 'active' | 'inactive' | 'pending' | 'suspended' | null;
  restaurantName?: string | null;
  // POS subscription status — Brand General / Foodcourt General / Restaurant Owner.
  // 'suspended' means the user has overdue invoices; ProtectedRoute pins them to
  // the invoice page until payment clears.
  subscriptionStatus?: 'active' | 'trial' | 'suspended' | 'cancelled' | null;
  // Demo / test fixtures are exempt from the suspended-account invoice pin so
  // QA tooling and demo flows stay usable even with overdue invoices.
  isDemo?: boolean;
  isTest?: boolean;
  emailVerified?: boolean;   // 미인증 시 알림설정에 "인증해야 메일 알림 감" 안내 배너
  restaurantIsDemo?: boolean;
  restaurantIsTest?: boolean;
  company_name?: string;
  restaurant_name?: string;
  department?: string;
  preferred_language?: string;
}

// 픽커가 그리는 컨텍스트 1개. 서버 `GET /api/auth/contexts` 응답 shape 을 그대로 쓴다.
// (필드 규약은 기존 혼용 유지 — snake_case 서버 필드를 변환하지 않는다.)
export interface UserContextOption {
  kind: 'default' | 'granted';
  entity_type: string;
  entity_id: number | null;
  role: string;
  label: string;
  id?: number;
  last_used_at?: string | null;
}

export type SwitchContextTarget =
  | { target: 'default' }
  | { entity_type: string; entity_id: number; role: string };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (key: string) => Promise<boolean>;
  loginWithPin: (restaurantId: string, pin: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  switchUser: (token: string, userData: SwitchUserData) => void;
  updateUser: (userData: Partial<User>) => void;
  updateLanguage: (language: string) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  // 카운터 접근(주문/품목추가/테이블이동/현금박스/정산) 가능 여부. Restaurant/System Admin 항상 true,
  // Staff 는 'access_pos' 권한 보유 시만. 없으면 서빙/주방 전용 직원. docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md
  canOperatePOS: boolean;
  // 결제 받기 가능 여부('access_payment'). 서버(홀) 역할은 false → 결제 버튼 숨김. (2026-06-24 분리)
  canTakePayment: boolean;
  // 주문 취소/품목 void 가능 여부('access_void'). 서버(홀) 역할은 false → 취소/삭제 버튼 숨김. (2026-06-24 분리)
  canVoid: boolean;
  canAccessRoute: (route: string) => boolean;
  // Staff 운영 페이지 접근(주방/포스/서빙 키 기반). 비-Staff 는 항상 true.
  canOpenStaffRoute: (path: string) => boolean;
  // 로그인 후 Staff 기본 랜딩 경로(보유 접근 우선순위).
  staffHomePath: (restaurantId: string | number) => string;
  // ── 멀티 컨텍스트 로그인 (docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4·§6) ──
  // 고를 수 있는 컨텍스트("모자") 목록. 1개 이하면 픽커를 띄우지 않는다(= 현행 그대로).
  contexts: UserContextOption[];
  // 목록 재조회 (부여/회수 후 동기화).
  // 성공 시 목록, **조회 실패 시 null** (빈 목록과 구분 — 옛 목록 잔존 방지).
  refreshContexts: () => Promise<UserContextOption[] | null>;
  // 컨텍스트 전환 — 서버가 새 토큰을 발급하고 switchUser 로 갈아끼운다. 성공 시 이동할 경로 반환.
  switchContext: (target: SwitchContextTarget) => Promise<{ ok: boolean; path?: string; error?: string }>;
  // Refetch /me and update user in place. Use after server-side state changes
  // that affect ProtectedRoute / SuspendedBanner — e.g., paying an overdue
  // invoice flips restaurantStatus from 'suspended' to 'active'.
  refreshUser: () => Promise<void>;
}

// PIN 전환 시 서버에서 받는 user 데이터 형태
export interface SwitchUserData {
  id: number | string;
  email: string;
  role: string;
  username: string;
  name: string;
  restaurant_id?: number | null;
  manager_id?: number | null;
  brand_id?: number | null;
  foodcourt_id?: number | null;
  permissions?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// 역할별 권한 정의
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  'System Admin': [
    'view_all_managers',
    'create_manager',
    'edit_manager',
    'delete_manager',
    'view_all_restaurants',
    'view_system_stats',
    'manage_subscriptions',
    'system_settings',
    'view_all_reports'
  ],
  'Foodcourt General': [
    'view_own_restaurants',
    'create_restaurant',
    'edit_restaurant',
    'delete_restaurant',
    'view_all_staff',
    'manage_staff',
    'view_consolidated_reports',
    'manage_menus',
    'view_all_orders',
    'view_foodcourt_managers',
    'create_foodcourt_manager',
    'edit_foodcourt_manager',
    'manage_foodcourt_restaurants',
    'view_foodcourt_stats',
    'manage_rent',
    'send_announcements'
  ],
  'Brand General': [
    'view_own_restaurants',
    'create_restaurant',
    'edit_restaurant',
    'delete_restaurant',
    'view_all_staff',
    'manage_staff',
    'view_consolidated_reports',
    'manage_menus',
    'view_all_orders',
    'view_brand_managers',
    'create_brand_manager',
    'edit_brand_manager',
    'manage_brand_restaurants',
    'view_brand_stats',
    'view_brand_performance',
    'send_announcements'
  ],
  'Foodcourt Manager': [
    'view_own_restaurants',
    'create_restaurant',
    'edit_restaurant',
    'delete_restaurant',
    'view_all_staff',
    'manage_staff',
    'view_consolidated_reports',
    'manage_menus',
    'view_all_orders',
    'view_assigned_restaurants',
    'manage_rent_settings',
    'support_restaurant_opening',
    'communicate_with_tenants',
    'view_rent_reports'
  ],
  'Brand Manager': [
    'view_own_restaurants',
    'create_restaurant',
    'edit_restaurant',
    'delete_restaurant',
    'view_all_staff',
    'manage_staff',
    'view_consolidated_reports',
    'manage_menus',
    'view_all_orders',
    'view_brand_restaurants',
    'manage_brand_performance',
    'support_restaurant_opening',
    'communicate_with_franchises',
    'view_brand_reports'
  ],
  'Restaurant Owner': [
    'view_own_restaurants',
    'view_restaurant_stats',
    'view_restaurant_orders',
    'view_invoices',
    'pay_invoices',
    'view_reports',
    'view_comparison_stats'
  ],
  'Restaurant Admin': [
    'view_restaurant',
    'edit_restaurant_settings',
    'manage_restaurant_staff',
    'view_restaurant_reports',
    'manage_restaurant_menu',
    'view_restaurant_orders',
    'manage_tables'
  ],
  'Staff': [
    'use_pos',
    'create_order',
    'view_orders',
    'process_payment',
    // 운영 작업 접근 키(주방/포스/서빙). 실제 Staff 는 DB permissions 사용; 이건 폴백 기본값.
    'access_pos',
    'access_serving',
    'access_kitchen'
  ],
  'Supplier Admin': [
    'view_supplier_dashboard',
    'view_supplier_company',
    'edit_supplier_company',
    'view_supplier_products',
    'manage_supplier_products',
    'view_supplier_inventory',
    'manage_supplier_inventory',
    'view_supplier_invoices',
    'view_supplier_payment_settings',
    'edit_supplier_payment_settings',
    'view_supplier_reports'
  ],
  'Supplier Staff': [
    // Supplier Staff is a delegated Supplier Admin — actual scoped permissions
    // are gated server-side via supplierScope + the advanced supplier_admin_staff
    // module. Listed here so the UserRole record is complete.
    'view_supplier_dashboard',
    'view_supplier_products',
    'view_supplier_inventory',
    'view_supplier_invoices'
  ],
  'Referral Partner': [
    // Referral Partners only see the /referral/* app — no POS permissions.
    'view_referral_dashboard'
  ]
};

// 역할별 접근 가능 라우트
const ROLE_ROUTES: Record<UserRole, string[]> = {
  'System Admin': [
    '/pos/admin/*',
    '/pos/basic',
    '/pos/profile'
  ],
  'Foodcourt General': [
    '/pos/foodcourt/general/*',
    '/pos/foodcourt/tenancy',
    '/pos/foodcourt/invoices',
    '/pos/foodcourt/plans',
    '/pos/foodcourt/subscriptions',
    '/pos/foodcourt/payment-settings',
    '/pos/foodcourt/history',
    '/pos/foodcourt/manager',
    // Foodcourt as buyer (Purchase Orders / Suppliers / Purchase Invoices) is
    // gated until the schema supports foodcourt-owned ingredients (Phase 3).
    // Currently `ingredients` table has no foodcourt_id column and
    // `purchase-orders.js:ingredientBelongsToBuyer` rejects foodcourt buyer.
    // To avoid sidebar links leading to dead-ends, the routes are removed here.
    // SupplierContract.entity_type still allows 'foodcourt' so existing data is preserved.
    '/pos/manager/*',
    '/pos/restaurant/*',
    '/pos/pos-terminal',
    '/pos/dashboard',
    '/pos/basic',
    '/pos/kitchen',
    '/pos/display',
    '/pos/live-orders',
    '/pos/sales',
    '/pos/menu',
    '/pos/categories',
    '/pos/options',
    '/pos/customers',
    '/pos/manager/admins',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Brand General': [
    '/pos/brand/general/*',
    '/pos/brand/franchise',
    '/pos/brand/franchise-map',
    '/pos/brand/invoices',
    '/pos/brand/trade-invoices',
    '/pos/brand/plans',
    '/pos/brand/subscriptions',
    '/pos/brand/payment-settings',
    '/pos/brand/history',
    '/pos/brand/manager',
    '/pos/brand-products',
    '/pos/brand-product-recipes',
    '/pos/brand-ingredients',
    '/pos/brand-inventory',
    '/pos/brand-menus',
    '/pos/brand-menu-categories',
    '/pos/brand-menu-option-groups',
    '/pos/recipes',
    '/pos/ingredients',
    '/pos/suppliers/*',
    '/pos/purchase-orders/*',
    '/pos/purchase-invoices/*',
    '/pos/manager/*',
    '/pos/restaurant/*',
    '/pos/pos-terminal',
    '/pos/dashboard',
    '/pos/basic',
    '/pos/kitchen',
    '/pos/display',
    '/pos/live-orders',
    '/pos/sales',
    '/pos/menu',
    '/pos/categories',
    '/pos/options',
    '/pos/customers',
    '/pos/manager/admins',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Foodcourt Manager': [
    '/pos/foodcourt/*',
    // Foodcourt as buyer gated — see Foodcourt General comment above.
    '/pos/manager/*',
    '/pos/restaurant/*',
    '/pos/pos-terminal',
    '/pos/dashboard',
    '/pos/basic',
    '/pos/kitchen',
    '/pos/display',
    '/pos/live-orders',
    '/pos/sales',
    '/pos/menu',
    '/pos/categories',
    '/pos/options',
    '/pos/customers',
    '/pos/manager/admins',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Brand Manager': [
    '/pos/brand/*',
    '/pos/brand-products',
    '/pos/brand-product-recipes',
    '/pos/brand-ingredients',
    '/pos/brand-inventory',
    '/pos/brand-menus',
    '/pos/brand-menu-categories',
    '/pos/brand-menu-option-groups',
    '/pos/recipes',
    '/pos/ingredients',
    '/pos/suppliers/*',
    '/pos/purchase-orders/*',
    '/pos/purchase-invoices/*',
    '/pos/manager/*',
    '/pos/restaurant/*',
    '/pos/pos-terminal',
    '/pos/dashboard',
    '/pos/basic',
    '/pos/kitchen',
    '/pos/display',
    '/pos/live-orders',
    '/pos/sales',
    '/pos/menu',
    '/pos/categories',
    '/pos/options',
    '/pos/customers',
    '/pos/manager/admins',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Restaurant Owner': [
    '/pos/owner/*',
    '/pos/suppliers/*',
    '/pos/purchase-orders/*',
    '/pos/purchase-invoices/*',
    '/pos/profile'
  ],
  'Restaurant Admin': [
    '/pos/restaurant/*',
    '/restaurant/:restaurantId/*',
    '/restaurant/*',
    '/pos/pos-terminal',
    '/pos/dashboard',
    '/pos/basic',
    '/pos/kitchen',
    '/pos/display',
    '/pos/live-orders',
    '/pos/sales',
    '/pos/menu',
    '/pos/categories',
    '/pos/options',
    '/pos/customers',
    '/pos/manager/admins',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/company-information',
    '/pos/profile',
    '/pos/inventory',
    '/pos/suppliers/*',
    '/pos/purchase-orders/*',
    '/pos/purchase-invoices/*',
    '/pos/support',
    '/pos/operation-inquiry',
    '/pos/invoices',
    '/pos/history'
  ],
  'Staff': [
    '/restaurant/:restaurantId/*',
    '/restaurant/*',
    '/pos/pos-terminal',
    '/pos/dashboard',
    '/pos/basic',
    '/pos/kitchen',
    '/pos/display',
    '/pos/live-orders',
    '/pos/sales',
    '/pos/menu',
    '/pos/categories',
    '/pos/options',
    '/pos/customers',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/company-information',
    '/pos/profile',
    '/pos/inventory',
    '/pos/suppliers/*',
    '/pos/purchase-orders/*',
    '/pos/purchase-invoices/*',
    '/pos/support',
    '/pos/operation-inquiry',
    '/pos/invoices',
    '/pos/history'
  ],
  'Supplier Admin': [
    '/pos/supplier/*',
    '/pos/profile',
    '/pos/notices',
    '/pos/system-inquiry'
  ],
  'Supplier Staff': [
    '/pos/supplier/*',
    '/pos/profile',
    '/pos/notices',
    '/pos/system-inquiry'
  ],
  'Referral Partner': [
    // No POS routes — partner uses /referral/* via its own ReferralLayout.
    '/pos/profile'
  ]
};

// 운영 라우트 ↔ 필요한 작업 접근 키(주방/포스/서빙). Staff 한정 게이트. (2026-06-03)
// 하나라도 보유하면 진입 허용(Floor Plan 은 pos 또는 serving). docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md §3-B
const STAFF_ROUTE_ACCESS: { test: RegExp; keys: string[] }[] = [
  { test: /\/pos-terminal/, keys: ['access_pos'] },
  { test: /\/live-orders/, keys: ['access_pos'] },
  { test: /\/floor-plan/, keys: ['access_pos', 'access_serving'] },
  { test: /\/kitchen/, keys: ['access_kitchen'] },
  { test: /\/display/, keys: ['access_pos'] },
  { test: /\/dashboard/, keys: ['access_pos'] },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // 고를 수 있는 컨텍스트 목록 — 부여 0건이면 [기본 정체] 1개뿐(= UI 변화 0).
  const [contexts, setContexts] = useState<UserContextOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // JWT 토큰 확인
    const checkSession = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          setIsLoading(false);
          return;
        }

        // 부팅 시 /auth/me 는 네트워크 사정으로 실패할 수 있다(서비스워커 콜드 스타트,
        // 매장 wifi 순단 등 → fetch 가 TypeError 로 throw). 그걸 "토큰 만료"로 오인해
        // 지워버리면 멀쩡히 로그인된 사용자가 로그인 화면으로 튕긴다.
        // → 네트워크 오류는 재시도, 토큰 폐기는 서버가 401/403 으로 거부했을 때만.
        const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
        let response: Response | null = null;
        let networkError: unknown = null;

        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            response = await fetch('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            networkError = null;
            break;
          } catch (err) {
            networkError = err;
            response = null;
            if (attempt < 2) await sleep(400 * (attempt + 1));
          }
        }

        if (!response) {
          // 서버에 닿지 못함 — 토큰은 그대로 두고(재접속/새로고침 시 복구) 이번 부팅만 미인증 처리
          console.warn('Auth check could not reach the server; keeping the session token.', networkError);
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const apiUser = result.data;
            // Staff는 DB에서 받은 메뉴 permissions 사용, 나머지는 ROLE_PERMISSIONS 사용
            const userPermissions = (apiUser.role === 'Staff' || apiUser.role === 'Brand Manager' || apiUser.role === 'Foodcourt Manager') && Array.isArray(apiUser.permissions)
              ? apiUser.permissions
              : ROLE_PERMISSIONS[apiUser.role as UserRole] || [];

            const userData: User = {
              id: apiUser.id?.toString() || '1',
              email: apiUser.email,
              name: displayStaffName(apiUser.full_name, apiUser.username, apiUser.email ? apiUser.email.split('@')[0] : 'Staff'),
              role: apiUser.role as UserRole,
              restaurantId: apiUser.restaurant_id?.toString() || null,
              managerId: apiUser.manager_id?.toString() || null,
              brand_id: apiUser.brand_id || null,
              foodcourt_id: apiUser.foodcourt_id || null,
              permissions: userPermissions,
              restaurantStatus: apiUser.restaurantStatus,
              restaurantName: apiUser.restaurantName,
              subscriptionStatus: apiUser.subscription_status || null,
              isDemo: !!apiUser.is_demo,
              isTest: !!apiUser.is_test,
            emailVerified: !!apiUser.email_verified,
              restaurantIsDemo: !!apiUser.restaurantIsDemo,
              restaurantIsTest: !!apiUser.restaurantIsTest,
              preferred_language: apiUser.preferred_language || 'en'
            };
            setUser(userData);
            // 세션 복원 시에도 컨텍스트 목록을 다시 읽는다.
            // ⚠ 안 하면 **새로고침(F5) 후 헤더 스위처와 대시보드 진입점이 사라진다** — 목록이 로그인
            //    시점에만 채워지기 때문(실측: e2e ⑨ 가 검출). 실사용자는 새로고침을 하므로 치명적이다.
            refreshContextsRef.current?.();
            if (apiUser.preferred_language && apiUser.preferred_language !== i18n.language) {
              i18n.changeLanguage(apiUser.preferred_language);
            }
            // StoreContext에 인증 완료 알림
            window.dispatchEvent(new Event('auth-ready'));
          }
        } else if (response.status === 401 || response.status === 403) {
          // 서버가 토큰을 거부 — 진짜 만료/무효
          clearAuthToken();
        } else {
          // 5xx 등 서버 장애: 토큰은 유지(다음 로드에서 복구), 이번 부팅만 미인증
          console.warn(`Auth check failed with ${response.status}; keeping the session token.`);
        }
      } catch (error) {
        // 여기까지 오는 건 응답 파싱/후처리 오류 — 인증 실패가 아니므로 토큰을 지우지 않는다
        console.error('Auth check error (token kept):', error);
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {

    try {

      // 실제 API 호출로 인증
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include', // 쿠키를 포함하여 요청
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data) {
          const apiUser = result.data.user;
          // 로그인 응답의 컨텍스트 목록(additive) — 부여 0건이면 [기본 정체] 1개뿐이라
          // LoginPage 는 기존과 동일하게 대시보드로 직행한다(무회귀).
          setContexts(Array.isArray(result.data.contexts) ? result.data.contexts : []);

          // Staff는 DB에서 받은 메뉴 permissions 사용
          const loginPermissions = apiUser.role === 'Staff' && Array.isArray(apiUser.permissions)
            ? apiUser.permissions
            : ROLE_PERMISSIONS[apiUser.role as UserRole] || [];

          const userData: User = {
            id: apiUser.id?.toString() || '1',
            email: apiUser.email,
            name: displayStaffName(apiUser.full_name, apiUser.username, apiUser.email ? apiUser.email.split('@')[0] : 'Staff'),
            role: apiUser.role as UserRole,
            restaurantId: apiUser.restaurant_id?.toString() || null,
            managerId: apiUser.manager_id?.toString() || null,
            brand_id: apiUser.brand_id || null,
            foodcourt_id: apiUser.foodcourt_id || null,
            permissions: loginPermissions,
            restaurantStatus: apiUser.restaurantStatus || null,
            restaurantName: apiUser.restaurantName || null,
            isDemo: !!apiUser.is_demo,
            isTest: !!apiUser.is_test,
            emailVerified: !!apiUser.email_verified,
            restaurantIsDemo: !!apiUser.restaurantIsDemo,
            restaurantIsTest: !!apiUser.restaurantIsTest,
            subscriptionStatus: apiUser.subscription_status || null,
            preferred_language: apiUser.preferred_language || 'en'
          };

          setUser(userData);
          // JWT 토큰 저장
          setAuthToken(result.data.token);
          // 공용 단말이 자기 매장을 기억 → 이후 직원 PIN 로그인에서 매장코드 입력 없이 PIN만.
          if (userData.restaurantId) {
            try { localStorage.setItem('pos_device_restaurant', JSON.stringify({ id: userData.restaurantId, name: userData.restaurantName || '' })); } catch {}
          }
          // i18n 언어 동기화
          if (apiUser.preferred_language) {
            i18n.changeLanguage(apiUser.preferred_language);
          }
          return true;
        }
      }

      // Handle specific error codes
      const errorResult = await response.json().catch(() => null);
      // ACCOUNT_SUSPENDED is no longer thrown by the backend — suspended users
      // log in normally and ProtectedRoute pins them to the invoice page so
      // they can pay. Keeping the branch removed avoids a dead-end UX where
      // the user sees an error and can't reach the payment screen.
      if (errorResult?.error?.code === 'EMAIL_NOT_VERIFIED') {
        const err: any = new Error(errorResult.error.message || 'Please verify your email address.');
        err.code = 'EMAIL_NOT_VERIFIED';
        err.email = errorResult.error.email;
        throw err;
      }

      return false;
    } catch (error) {
      throw error;
    }
  };

  // Demo / test quick login by whitelist key — no password leaves the bundle.
  const loginAsDemo = async (key: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/demo-login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const apiUser = result.data.user;
          // 로그인 응답의 컨텍스트 목록(additive) — 부여 0건이면 [기본 정체] 1개뿐이라
          // LoginPage 는 기존과 동일하게 대시보드로 직행한다(무회귀).
          setContexts(Array.isArray(result.data.contexts) ? result.data.contexts : []);
          const loginPermissions = apiUser.role === 'Staff' && Array.isArray(apiUser.permissions)
            ? apiUser.permissions
            : ROLE_PERMISSIONS[apiUser.role as UserRole] || [];
          const userData: User = {
            id: apiUser.id?.toString() || '1',
            email: apiUser.email,
            name: displayStaffName(apiUser.full_name, apiUser.username, apiUser.email ? apiUser.email.split('@')[0] : 'Staff'),
            role: apiUser.role as UserRole,
            restaurantId: apiUser.restaurant_id?.toString() || null,
            managerId: apiUser.manager_id?.toString() || null,
            brand_id: apiUser.brand_id || null,
            foodcourt_id: apiUser.foodcourt_id || null,
            permissions: loginPermissions,
            restaurantStatus: apiUser.restaurantStatus || null,
            restaurantName: apiUser.restaurantName || null,
            isDemo: !!apiUser.is_demo,
            isTest: !!apiUser.is_test,
            emailVerified: !!apiUser.email_verified,
            restaurantIsDemo: !!apiUser.restaurantIsDemo,
            restaurantIsTest: !!apiUser.restaurantIsTest,
            subscriptionStatus: apiUser.subscription_status || null,
            preferred_language: apiUser.preferred_language || 'en'
          };
          setUser(userData);
          setAuthToken(result.data.token);
          if (apiUser.preferred_language) {
            i18n.changeLanguage(apiUser.preferred_language);
          }
          return true;
        }
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  // Staff PIN login (shared POS terminal). Resolves restaurant + PIN via /staff/verify-pin
  // (rate-limited server-side) so staff log in without knowing their namespaced username.
  const loginWithPin = async (restaurantId: string, pin: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/staff/verify-pin', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant_id: restaurantId, pin_code: pin })
      });
      const result = await response.json().catch(() => ({} as any));
      if (response.ok && result.success && result.token && result.user) {
        const apiUser = result.user;
        const loginPermissions = apiUser.role === 'Staff' && Array.isArray(apiUser.permissions)
          ? apiUser.permissions
          : ROLE_PERMISSIONS[apiUser.role as UserRole] || [];
        const userData: User = {
          id: apiUser.id?.toString() || '',
          email: apiUser.email || null,
          name: apiUser.name || displayStaffName(apiUser.full_name, apiUser.username, 'Staff'),
          role: apiUser.role as UserRole,
          restaurantId: apiUser.restaurant_id?.toString() || null,
          managerId: apiUser.manager_id?.toString() || null,
          brand_id: apiUser.brand_id || null,
          foodcourt_id: apiUser.foodcourt_id || null,
          permissions: loginPermissions,
          restaurantStatus: null,
          restaurantName: apiUser.restaurantName || null,
          isDemo: false,
          isTest: false,
          emailVerified: true,
          restaurantIsDemo: false,
          restaurantIsTest: false,
          subscriptionStatus: null,
          preferred_language: apiUser.preferred_language || 'en'
        };
        setUser(userData);
        setAuthToken(result.token);
        return { ok: true };
      }
      if (response.status === 429) return { ok: false, error: (result?.error?.message) || 'Too many attempts. Please try again later.' };
      return { ok: false, error: (result?.error?.message) || 'Invalid PIN' };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'PIN login failed' };
    }
  };

  const logoutRef = React.useRef<(() => void) | null>(null);
  // storage 리스너는 마운트 시 1회만 붙으므로, 최신 user 를 ref 로 읽는다(스테일 클로저 방지).
  const userRef = React.useRef<User | null>(null);
  // 부팅 복원 effect 는 refreshContexts 선언보다 위에서 돌므로 ref 로 참조한다.
  const refreshContextsRef = React.useRef<null | (() => Promise<UserContextOption[] | null>)>(null);
  userRef.current = user;

  const logout = async () => {
    try {
      // /api/auth/logout은 httpClient의 POS_BYPASS_PATHS에 포함되어 토큰 주입/401 처리 모두 건너뜀
      await window.fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      // Ignore logout errors
    }

    // Check if user was using demo account
    const isDemoAccount = user?.email?.includes('demo-') || user?.email?.includes('@purplehere.com');

    // Stop any repeating notification sounds
    import('../utils/notificationSound').then(({ stopRepeatingSound }) => stopRepeatingSound()).catch(() => {});

    setUser(null);
    // JWT 토큰 제거
    clearAuthToken();
    localStorage.removeItem('user');

    // Redirect to demo page for demo accounts, login page for others
    if (isDemoAccount) {
      navigate('/demo');
    } else {
      navigate('/pos');
    }
  };

  // Keep ref updated for use in fetch interceptor
  logoutRef.current = logout;

  // 401 자동 로그아웃 핸들러를 httpClient 인터셉터에 등록
  // (fetch 패치 자체는 index.tsx에서 installFetchInterceptor()로 1회만 설치됨)
  useEffect(() => {
    setOn401Handler(() => {
      if (logoutRef.current) logoutRef.current();
    });
    return () => {
      setOn401Handler(null);
    };
  }, []);

  // ── 크로스탭 동기 (설계 §4.7 — 🔒 인쇄 안전 직결) ────────────────────────
  // 토큰은 탭이 아니라 **브라우저 단위**로 공유된다(localStorage). 한 탭에서 컨텍스트를 바꾸면
  // 다른 탭의 메모리 user 는 옛 컨텍스트인 채 요청만 새 토큰으로 나가 **전부 403** 이 된다 —
  // 그 탭이 POS/주방이면 결제·자동인쇄가 조용히 멈춘다. 그래서 전 탭이 함께 따라오게 한다.
  //
  // storage 이벤트는 **다른 탭에서만** 발화하므로(자기 탭 제외) 전환한 탭은 영향받지 않는다.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'auth_token') return;
      if (!e.newValue) return;            // 로그아웃은 기존 401 경로가 처리
      // 새 토큰으로 서버 기준 신원을 다시 읽는다(토큰을 프론트에서 해석하지 않는다).
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${e.newValue}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => {
          const fresh = json?.data;
          if (!fresh) return;
          const changed =
            String(fresh.role) !== String(userRef.current?.role) ||
            String(fresh.restaurant_id ?? '') !== String(userRef.current?.restaurant_id ?? '');
          if (!changed) return;
          // ⚠ 이벤트만 쏘면 안 된다 — 메모리 user 가 옛 자격 그대로라 새 대시보드로 이동해도
          // ProtectedRoute 가 "역할·매장 불일치"로 되튕긴다(실측: URL 그대로 + 403 누적).
          // PIN 전환과 같은 경로로 **신원까지 교체**한 뒤 이동시킨다(auth-ready 로 StoreContext 재로드 포함).
          switchUser(e.newValue as string, {
            id: fresh.id,
            email: fresh.email,
            role: fresh.role,
            username: fresh.username,
            name: fresh.full_name || fresh.username || fresh.email,
            restaurant_id: fresh.restaurant_id ?? null,
            manager_id: fresh.manager_id ?? null,
            brand_id: fresh.brand_id ?? null,
            foodcourt_id: fresh.foodcourt_id ?? null,
            permissions: Array.isArray(fresh.permissions) ? fresh.permissions : []
          });
          window.dispatchEvent(new CustomEvent('context-follow', { detail: fresh }));
        })
        .catch(() => { /* 네트워크 실패 시 다음 요청의 403 이 알려준다 */ });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // 모자 회수 감지 — 서버가 200 + X-Context-Fallback 으로 알린다(401 금지, 설계 §4.3).
  useEffect(() => {
    setOnContextFallbackHandler(() => {
      window.dispatchEvent(new Event('context-revoked'));
    });
    return () => setOnContextFallbackHandler(null);
  }, []);

  // PIN 전환 시 JWT 교체 + user 상태 교체 (리다이렉트 없음)
  const switchUser = (token: string, userData: SwitchUserData) => {
    const newUser: User = {
      id: userData.id?.toString(),
      email: userData.email,
      // PIN 전환 스탭은 email 이 없을 수 있다 (Staff ID 방식, 2026-06-12 운영 크래시).
      name: userData.name || userData.username || (userData.email ? userData.email.split('@')[0] : 'Staff'),
      role: userData.role as UserRole,
      restaurantId: userData.restaurant_id?.toString() || null,
      restaurant_id: userData.restaurant_id || null,
      managerId: userData.manager_id?.toString() || null,
      brand_id: userData.brand_id || null,
      foodcourt_id: userData.foodcourt_id || null,
      permissions: userData.permissions || [],
    };

    setAuthToken(token);
    setUser(newUser);
    // StoreContext에 인증 완료 알림
    window.dispatchEvent(new Event('auth-ready'));
  };

  // ────────────────────────────────────────────────────────────────────────
  // 멀티 컨텍스트 로그인 — docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4·§6.
  // 부여받은 모자가 없으면 contexts 는 [기본 정체] 1개뿐이라 UI 는 아무것도 바뀌지 않는다.
  // ────────────────────────────────────────────────────────────────────────
  // ⚠ 실패와 "빈 목록"을 구분해서 돌려준다(null = 조회 실패).
  // 구분하지 않으면 호출부가 `if (list.length)` 로 걸러내다가 **회수된 옛 목록을 계속 표시**한다
  // (실측: 회수 후에도 픽커에 사라진 모자가 남았다). 사라진 권한이 화면에 남는 건 그 자체로 결함.
  const refreshContexts = useCallback(async (): Promise<UserContextOption[] | null> => {
    const token = getAuthToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/contexts', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return null;
      const json = await res.json();
      const list: UserContextOption[] = json?.data?.contexts || [];
      setContexts(list);
      return list;
    } catch {
      return null;
    }
  }, []);

  refreshContextsRef.current = refreshContexts;

  const switchContext = useCallback(async (target: SwitchContextTarget) => {
    const token = getAuthToken();
    if (!token) return { ok: false, error: 'NOT_AUTHENTICATED' };
    try {
      const res = await fetch('/api/auth/switch-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(target)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.data?.token) {
        return { ok: false, error: json?.error?.code || json?.error || `HTTP ${res.status}` };
      }
      // PIN 전환과 동일 경로 재사용 — 토큰 교체 + user 교체 + auth-ready 로 StoreContext 재로드.
      switchUser(json.data.token, json.data.user);
      // 새 컨텍스트로 넘어갔으니 회수 알림 래치를 푼다 — 안 풀면 이 모자가 회수돼도 두 번째
      // 배너가 안 뜬다(세션당 1회만 울리는 결함).
      resetContextFallbackNotice();
      await refreshContexts();
      return {
        ok: true,
        path: getDashboardPath(json.data.user?.role, { restaurantId: json.data.user?.restaurant_id })
      };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'NETWORK_ERROR' };
    }
    // switchUser 는 이 컴포넌트 스코프에서 안정적이라 의존성에 넣지 않는다(기존 훅 관행과 동일).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshContexts]);

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...userData
    };

    setUser(updatedUser);
    // localStorage 제거 - 메모리 상태만 업데이트
  };

  // Refetch /me and merge server-side fields (restaurantStatus, subscriptionStatus,
  // is_demo/is_test, restaurantName, etc.) into the in-memory user. Called from
  // pages that flip those fields server-side (invoice payment, account changes)
  // so ProtectedRoute / SuspendedBanner react without a full page reload.
  const refreshUser = async (): Promise<void> => {
    const token = getAuthToken();
    if (!token) return;
    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) return;
      const result = await response.json();
      if (!result?.success || !result?.data) return;
      const apiUser = result.data;
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          restaurantStatus: apiUser.restaurantStatus ?? prev.restaurantStatus,
          restaurantName: apiUser.restaurantName ?? prev.restaurantName,
          subscriptionStatus: apiUser.subscription_status ?? prev.subscriptionStatus,
          isDemo: apiUser.is_demo ?? prev.isDemo,
          isTest: apiUser.is_test ?? prev.isTest,
          restaurantIsDemo: apiUser.restaurantIsDemo ?? prev.restaurantIsDemo,
          restaurantIsTest: apiUser.restaurantIsTest ?? prev.restaurantIsTest
        };
      });
    } catch { /* best-effort, stay on current state on network error */ }
  };

  const updateLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    if (user) {
      setUser({ ...user, preferred_language: language });
    }
    const token = getAuthToken();
    if (token) {
      try {
        await fetch('/api/users/language', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ language })
        });
      } catch (error) { /* best-effort */ }
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  };

  // 포스/카운터 접근(메뉴 가시성 + 주문/품목추가/테이블이동/현금박스/정산 액션). 백엔드 requirePosCounter 와 동일 식.
  // access_pos 단일 키(2026-06-03). 2026-06-24: 결제·취소void 는 아래 별도 권한으로 분리(서버 역할).
  const canOperatePOS = !!user && (
    user.role === 'System Admin' || user.role === 'Restaurant Admin' ||
    (user.permissions?.includes('access_pos') || false)
  );

  // 결제 받기 권한(access_payment). 서버(홀) 역할은 이게 없어 결제 버튼이 숨겨짐.
  // 백엔드 requirePaymentAccess 와 동일 식. Admin/RA/Owner 는 역할로 항상 허용.
  const canTakePayment = !!user && (
    user.role === 'System Admin' || user.role === 'Restaurant Admin' || user.role === 'Restaurant Owner' ||
    (user.permissions?.includes('access_payment') || false)
  );

  // 주문 취소/품목 void 권한(access_void). 서버(홀) 역할은 이게 없어 취소/삭제 버튼이 숨겨짐.
  // 백엔드 requireVoidAccess 와 동일 식. Admin/RA/Owner 는 역할로 항상 허용.
  const canVoid = !!user && (
    user.role === 'System Admin' || user.role === 'Restaurant Admin' || user.role === 'Restaurant Owner' ||
    (user.permissions?.includes('access_void') || false)
  );

  const canAccessRoute = (route: string): boolean => {
    if (!user) return false;

    const userRoutes = ROLE_ROUTES[user.role];
    if (!userRoutes) return false;

    // Check if the route matches any allowed pattern
    return userRoutes.some(pattern => {
      if (pattern.endsWith('/*')) {
        const basePattern = pattern.slice(0, -2);
        return route.startsWith(basePattern);
      }
      return route === pattern;
    });
  };

  // 운영 페이지 접근 — Staff 한정 permission 게이트(주방/포스/서빙). 역할 가드(canAccessRoute)와 별개.
  // 매핑 없는 라우트(백오피스 등)는 기존 그룹키/역할가드가 처리하므로 여기선 통과.
  const canOpenStaffRoute = (path: string): boolean => {
    if (!user) return false;
    if (user.role !== 'Staff') return true;
    const perms = user.permissions || [];
    for (const r of STAFF_ROUTE_ACCESS) {
      if (r.test.test(path)) return r.keys.some(k => perms.includes(k));
    }
    return true;
  };

  // 로그인 후 Staff 기본 랜딩 — 보유 접근 우선순위(포스→서빙→주방). restaurantId 필요.
  const staffHomePath = (restaurantId: string | number): string => {
    const base = `/restaurant/${restaurantId}`;
    const perms = user?.permissions || [];
    if (perms.includes('access_pos')) return `${base}/pos-terminal`;
    if (perms.includes('access_serving')) return `${base}/floor-plan?view=items`;
    if (perms.includes('access_kitchen')) return `${base}/kitchen`;
    return `${base}/profile`;
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginAsDemo,
    loginWithPin,
    logout,
    switchUser,
    updateUser,
    updateLanguage,
    hasPermission,
    canOperatePOS,
    canTakePayment,
    canVoid,
    canAccessRoute,
    canOpenStaffRoute,
    staffHomePath,
    refreshUser,
    contexts,
    refreshContexts,
    switchContext
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;