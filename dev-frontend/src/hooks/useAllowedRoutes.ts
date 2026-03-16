import { useState, useEffect } from 'react';

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
}

/**
 * Hook to fetch and manage allowed routes based on subscription plan.
 * Supports Restaurant, Brand, Foodcourt, and Owner roles.
 */
export const useAllowedRoutes = (params: UseAllowedRoutesParams | number | null) => {
  const [allowedRoutes, setAllowedRoutes] = useState<string[]>([]);
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

  useEffect(() => {
    const fetchAllowedRoutes = async () => {
      // Determine API URL based on role
      let apiUrl: string | null = null;
      const token = localStorage.getItem('auth_token');
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

  return {
    allowedRoutes,
    loading,
    error,
    isRouteAllowed,
    subscriptionStatus,
    planType,
    hasActiveSubscription
  };
};
