import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'System Admin' | 'Foodcourt General' | 'Brand General' | 'Foodcourt Manager' | 'Brand Manager' | 'Restaurant Owner' | 'Restaurant Admin' | 'Staff' | 'Supplier Admin';

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
  restaurantStatus?: 'active' | 'inactive' | 'pending' | null;
  restaurantName?: string | null;
  company_name?: string;
  restaurant_name?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (token: string, userData: SwitchUserData) => void;
  updateUser: (userData: Partial<User>) => void;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
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
  'Supplier Admin': []
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
    '/pos/staff',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Brand General': [
    '/pos/brand/general/*',
    '/pos/brand-products',
    '/pos/recipes',
    '/pos/ingredients',
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
    '/pos/staff',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Foodcourt Manager': [
    '/pos/foodcourt/*',
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
    '/pos/staff',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Brand Manager': [
    '/pos/brand/*',
    '/pos/brand-products',
    '/pos/recipes',
    '/pos/ingredients',
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
    '/pos/staff',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/profile'
  ],
  'Restaurant Owner': [
    '/pos/owner/*',
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
    '/pos/staff',
    '/pos/coupons',
    '/pos/reports',
    '/pos/settings',
    '/pos/company-information',
    '/pos/profile',
    '/pos/inventory',
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
    '/pos/support',
    '/pos/operation-inquiry',
    '/pos/invoices',
    '/pos/history'
  ],
  'Supplier Admin': []
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // JWT 토큰 확인
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('auth_token');

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
            const userPermissions = apiUser.role === 'Staff' && Array.isArray(apiUser.permissions)
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
              restaurantName: apiUser.restaurantName
            };
            setUser(userData);
          }
        } else {
          // Token invalid or expired

          localStorage.removeItem('auth_token');
        }
      } catch (error) {

        localStorage.removeItem('auth_token');
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

          let restaurantStatus = null;
          let restaurantName = null;

          // Fetch restaurant info if user has restaurant_id
          if (apiUser.restaurant_id) {
            try {
              const restaurantResponse = await fetch(`/api/restaurants/${apiUser.restaurant_id}`);
              if (restaurantResponse.ok) {
                const restaurantData = await restaurantResponse.json();
                restaurantStatus = restaurantData.status;
                restaurantName = restaurantData.name;

              }
            } catch (error) {

            }
          }

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
            restaurantStatus: restaurantStatus,
            restaurantName: restaurantName
          };

          setUser(userData);
          // JWT 토큰 저장
          localStorage.setItem('auth_token', result.data.token);

          return true;
        }
      }

      return false;
    } catch (error) {

      return false;
    }
  };

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      // Ignore logout errors
    }

    // Check if user was using demo account
    const isDemoAccount = user?.email?.includes('demo-') || user?.email?.includes('@purplehere.com');

    setUser(null);
    // JWT 토큰 제거
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    // Redirect to demo page for demo accounts, login page for others
    if (isDemoAccount) {
      navigate('/demo');
    } else {
      navigate('/login');
    }
  };

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

    localStorage.setItem('auth_token', token);
    setUser(newUser);
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
    logout,
    switchUser,
    updateUser,
    hasPermission,
    canAccessRoute
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;