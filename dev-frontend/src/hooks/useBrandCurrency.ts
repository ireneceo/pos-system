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
 * Hook to get brand currency settings
 * Returns the default currency and supported currencies for the current brand
 */
export const useBrandCurrency = (): BrandCurrencyData => {
  const { user } = useAuth();
  const [defaultCurrency, setDefaultCurrency] = useState<string>('USD');
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>(['USD']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandCurrency = async () => {
      if (!user?.brand_id) {
        // For non-brand users, use system default
        setDefaultCurrency('USD');
        setSupportedCurrencies(['USD', 'MYR', 'KRW']);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/currencies/brands/${user.brand_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setDefaultCurrency(data.data.default_currency || 'USD');
            setSupportedCurrencies(data.data.supported_currencies || ['USD']);
          }
        } else {
          // Fallback to defaults if API fails
          setDefaultCurrency('USD');
          setSupportedCurrencies(['USD', 'MYR', 'KRW']);
        }
      } catch (err) {
        console.error('Failed to fetch brand currency:', err);
        setError('Failed to load currency settings');
        // Use defaults
        setDefaultCurrency('USD');
        setSupportedCurrencies(['USD', 'MYR', 'KRW']);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandCurrency();
  }, [user?.brand_id]);

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
