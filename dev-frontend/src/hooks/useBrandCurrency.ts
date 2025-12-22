import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CurrencyData, CURRENCY_CONFIG } from '../utils/currency';

interface BrandCurrencyData {
  defaultCurrency: string;
  supportedCurrencies: string[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to get restaurant currency settings
 * Returns the default currency from the restaurant's settings
 * Currency is set per-restaurant, not per-brand
 */
export const useBrandCurrency = (): BrandCurrencyData => {
  const { user } = useAuth();
  const [defaultCurrency, setDefaultCurrency] = useState<string>('RM');
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>(Object.keys(CURRENCY_CONFIG));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantCurrency = async () => {
      // Get restaurantId from URL or user context
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      let restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      // Fallback to user's restaurant_id
      if (!restaurantId && user?.restaurant_id) {
        restaurantId = user.restaurant_id.toString();
      }

      if (!restaurantId) {
        // No restaurant context, use default
        setDefaultCurrency('RM');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/restaurants/${restaurantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Restaurant currency is in the 'currency' field
          const currency = data.currency || data.operation_settings?.currency || 'RM';
          setDefaultCurrency(currency);
        } else {
          // Fallback to default
          setDefaultCurrency('RM');
        }
      } catch (err) {
        console.error('Failed to fetch restaurant currency:', err);
        setError('Failed to load currency settings');
        setDefaultCurrency('RM');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantCurrency();
  }, [user?.restaurant_id]);

  return {
    defaultCurrency,
    supportedCurrencies,
    loading,
    error
  };
};

/**
 * Get full currency data for supported currencies
 */
export const useSupportedCurrencyData = (): CurrencyData[] => {
  const { supportedCurrencies } = useBrandCurrency();

  return supportedCurrencies.map(code => ({
    code,
    ...CURRENCY_CONFIG[code]
  })).filter(c => c.symbol); // Filter out any invalid currencies
};

export default useBrandCurrency;
