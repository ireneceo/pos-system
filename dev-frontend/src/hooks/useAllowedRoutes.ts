import { useState, useEffect } from 'react';
import { isRouteDenied } from '../utils/roleRouteDeny';

import { getAuthToken } from '../utils/auth';
interface AllowedRoutesResponse {
  entity_id?: number;
  restaurant_id?: number;
  entity_type?: string;
  plan_type: string | null;
  subscription_status?: string | null;
  included_modules: string[];
  allowed_routes: string[];
  modules: Array<{
    code: string;
    name: string;
    category: string;
  }>;
}

interface UseAllowedRoutesParams {
  role: string;
  restaurantId?: number | null;
  brandId?: number | null;
  foodcourtId?: number | null;
  supplierCompanyId?: number | null;
}

/**
 * Hook to fetch and manage allowed routes based on subscription plan.
 * Supports Restaurant, Brand, Foodcourt, and Owner roles.
 */
export const useAllowedRoutes = (params: UseAllowedRoutesParams | number | null) => {
  const [allowedRoutes, setAllowedRoutes] = useState<string[]>([]);
  const [includedModules, setIncludedModules] = useState<string[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [planType, setPlanType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skipFiltering, setSkipFiltering] = useState(true); // true = no plan-based filtering (System Admin, etc.)

  // Support legacy call: useAllowedRoutes(restaurantId)
  const normalized: UseAllowedRoutesParams | null = typeof params === 'number'
    ? { role: 'Restaurant Admin', restaurantId: params }
    : params;

  const role = normalized?.role || '';
  const restaurantId = normalized?.restaurantId || null;
  const brandId = normalized?.brandId || null;
  const foodcourtId = normalized?.foodcourtId || null;
  const supplierCompanyId = normalized?.supplierCompanyId || null;

  useEffect(() => {
    const fetchAllowedRoutes = async () => {
      // Determine API URL based on role
      let apiUrl: string | null = null;
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      if ((role === 'Restaurant Admin' || role === 'Staff') && restaurantId) {
        apiUrl = `/api/restaurants/${restaurantId}/allowed-routes`;
      } else if ((role === 'Brand General' || role === 'Brand Manager') && brandId) {
        apiUrl = `/api/brands/${brandId}/allowed-routes`;
      } else if ((role === 'Foodcourt General' || role === 'Foodcourt Manager') && foodcourtId) {
        apiUrl = `/api/foodcourts/${foodcourtId}/allowed-routes`;
      } else if (role === 'Restaurant Owner') {
        apiUrl = `/api/owner/allowed-routes`;
      } else if ((role === 'Supplier Admin' || role === 'Supplier Staff') && supplierCompanyId) {
        apiUrl = `/api/supplier-companies/${supplierCompanyId}/allowed-routes`;
      }

      if (!apiUrl) {
        // No plan-based filtering for this role (System Admin, etc.)
        setAllowedRoutes([]);
        setSubscriptionStatus(null);
        setPlanType(null);
        setSkipFiltering(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch allowed routes');
        }

        const data: AllowedRoutesResponse = await response.json();
        setAllowedRoutes(data.allowed_routes || []);
        setIncludedModules(data.included_modules || []);
        setSubscriptionStatus(data.subscription_status || null);
        setPlanType(data.plan_type || null);
        // Enforce filtering only when entity has a plan assigned
        // If plan_type is null (no plan yet), fail-open to avoid blocking users
        setSkipFiltering(!data.plan_type);
        setError(null);
      } catch (err) {
        console.error('useAllowedRoutes Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setAllowedRoutes([]);
        setIncludedModules([]);
        setSubscriptionStatus(null);
        setPlanType(null);
        setSkipFiltering(true); // On error, fail-open to avoid blocking users
      } finally {
        setLoading(false);
      }
    };

    fetchAllowedRoutes();
  }, [role, restaurantId, brandId, foodcourtId]);

  /**
   * Check if a specific route is allowed
   */
  const isRouteAllowed = (route: string): boolean => {
    // ⛔ 역할별 **명시 거부**를 가장 먼저 본다 (2026-09-06).
    //   사이드바 표시는 이 함수가 정한다 — `AuthContext.canAccessRoute`(진입 차단)만 고치면
    //   **진입은 막히는데 메뉴는 그대로 보인다**(누르면 대시보드로 튕김). 실제로 그렇게 됐다.
    //   `skipFiltering`(플랜 검사 생략) **앞**에 둔다 — 필터를 건너뛰는 역할도 거부는 적용되게.
    //   목록은 `utils/roleRouteDeny` 한 곳에만 있다(복사 금지 — 복사하면 곧 갈라진다).
    if (isRouteDenied(role, route)) return false;

    // Skip filtering for roles without plan-based restrictions (System Admin, etc.)
    // or when API call failed (fail-open on error only)
    if (skipFiltering) {
      return true;
    }

    // For restaurant routes, replace :restaurantId with actual ID
    const normalizedRoute = route.replace(/:restaurantId/g, restaurantId?.toString() || '');

    return allowedRoutes.some(allowedRoute => {
      const pattern = allowedRoute
        .replace(/:restaurantId/g, restaurantId?.toString() || '')
        .replace(/:slug/g, '[^/]+')
        .replace(/:id/g, '[^/]+')
        .replace(/\*/g, '.*');

      const regex = new RegExp(`^${pattern}$`);
      return regex.test(normalizedRoute);
    });
  };

  /** Whether the entity has an active subscription with a plan */
  const hasActiveSubscription = planType !== null && planType !== '';

  /**
   * Whether a given addon module code is included in the active subscription plan.
   * Fail-open when plan filtering is skipped (System Admin / no plan assigned / API error).
   */
  const hasModule = (moduleCode: string): boolean => {
    if (skipFiltering) return true;
    return includedModules.includes(moduleCode);
  };

  return {
    allowedRoutes,
    includedModules,
    loading,
    error,
    isRouteAllowed,
    hasModule,
    subscriptionStatus,
    planType,
    hasActiveSubscription
  };
};
