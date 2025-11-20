import { useState, useEffect } from 'react';

interface AllowedRoutesResponse {
  restaurant_id: number;
  plan_type: string;
  included_modules: string[];
  allowed_routes: string[];
  modules: Array<{
    code: string;
    name: string;
    category: string;
  }>;
}

/**
 * Hook to fetch and manage allowed routes based on restaurant's subscription plan
 * @param restaurantId - The restaurant ID to fetch allowed routes for
 * @returns Object containing allowed routes array and loading state
 */
export const useAllowedRoutes = (restaurantId: number | null) => {
  const [allowedRoutes, setAllowedRoutes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllowedRoutes = async () => {
      console.log('🔍 useAllowedRoutes: restaurantId =', restaurantId);

      if (!restaurantId) {
        console.log('❌ useAllowedRoutes: No restaurantId, setting empty array');
        setAllowedRoutes([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('📡 useAllowedRoutes: Fetching from /api/restaurants/' + restaurantId + '/allowed-routes');
        const response = await fetch(`/api/restaurants/${restaurantId}/allowed-routes`);

        if (!response.ok) {
          throw new Error('Failed to fetch allowed routes');
        }

        const data: AllowedRoutesResponse = await response.json();
        console.log('✅ useAllowedRoutes: Got allowed routes:', data.allowed_routes);
        setAllowedRoutes(data.allowed_routes || []);
        setError(null);
      } catch (err) {
        console.error('❌ useAllowedRoutes Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // On error, allow all routes (fail open for safety)
        setAllowedRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllowedRoutes();
  }, [restaurantId]);

  /**
   * Check if a specific route is allowed
   * @param route - The route to check (e.g., "/restaurant/:restaurantId/menu")
   * @returns true if route is allowed or if no restrictions apply
   */
  const isRouteAllowed = (route: string): boolean => {
    console.log('🔍 isRouteAllowed checking:', route);
    console.log('📋 Available routes:', allowedRoutes);

    // If no routes are restricted (empty array), allow all
    if (allowedRoutes.length === 0) {
      console.log('⚠️ No routes loaded, allowing all by default');
      return true;
    }

    // Replace :restaurantId with actual ID for matching
    const normalizedRoute = route.replace(/:restaurantId/g, restaurantId?.toString() || '');
    console.log('🔄 Normalized route:', normalizedRoute);

    // Check if route matches any allowed pattern
    const isAllowed = allowedRoutes.some(allowedRoute => {
      const pattern = allowedRoute
        .replace(/:restaurantId/g, restaurantId?.toString() || '')
        .replace(/:slug/g, '[^/]+');

      const regex = new RegExp(`^${pattern}$`);
      const matches = regex.test(normalizedRoute);

      if (matches) {
        console.log('✅ Route matched:', allowedRoute, '→', pattern);
      }

      return matches;
    });

    console.log(isAllowed ? '✅ Route ALLOWED' : '❌ Route BLOCKED');
    return isAllowed;
  };

  return {
    allowedRoutes,
    loading,
    error,
    isRouteAllowed
  };
};
