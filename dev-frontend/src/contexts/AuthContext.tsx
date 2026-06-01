import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';

import { getAuthToken, setAuthToken, clearAuthToken } from '../utils/auth';
import { setOn401Handler } from '../utils/httpClient';
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

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (key: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (token: string, userData: SwitchUserData) => void;
  updateUser: (userData: Partial<User>) => void;
  updateLanguage: (language: string) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
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
    'view_kitchen_display',
    'view_customer_display'
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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

        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

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
              name: apiUser.username || apiUser.email.split('@')[0],
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
            if (apiUser.preferred_language && apiUser.preferred_language !== i18n.language) {
              i18n.changeLanguage(apiUser.preferred_language);
            }
            // StoreContext에 인증 완료 알림
            window.dispatchEvent(new Event('auth-ready'));
          }
        } else {
          // Token invalid or expired

          clearAuthToken();
        }
      } catch (error) {

        clearAuthToken();
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

          // Staff는 DB에서 받은 메뉴 permissions 사용
          const loginPermissions = apiUser.role === 'Staff' && Array.isArray(apiUser.permissions)
            ? apiUser.permissions
            : ROLE_PERMISSIONS[apiUser.role as UserRole] || [];

          const userData: User = {
            id: apiUser.id?.toString() || '1',
            email: apiUser.email,
            name: apiUser.username || apiUser.email.split('@')[0],
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
          const loginPermissions = apiUser.role === 'Staff' && Array.isArray(apiUser.permissions)
            ? apiUser.permissions
            : ROLE_PERMISSIONS[apiUser.role as UserRole] || [];
          const userData: User = {
            id: apiUser.id?.toString() || '1',
            email: apiUser.email,
            name: apiUser.username || apiUser.email.split('@')[0],
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

  const logoutRef = React.useRef<(() => void) | null>(null);

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

  // PIN 전환 시 JWT 교체 + user 상태 교체 (리다이렉트 없음)
  const switchUser = (token: string, userData: SwitchUserData) => {
    const newUser: User = {
      id: userData.id?.toString(),
      email: userData.email,
      name: userData.name || userData.username || userData.email.split('@')[0],
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

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginAsDemo,
    logout,
    switchUser,
    updateUser,
    updateLanguage,
    hasPermission,
    canAccessRoute,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;