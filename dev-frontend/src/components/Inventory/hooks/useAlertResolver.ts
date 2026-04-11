import { useCallback } from 'react';
import { InventoryMode, StockAlert } from '../types';
import { AuthFetch } from './useAuthFetch';

interface Params {
  mode: InventoryMode;
  restaurantId?: number;
  authFetch: AuthFetch;
  setAlerts: React.Dispatch<React.SetStateAction<StockAlert[]>>;
}

export function useAlertResolver({ mode, restaurantId, authFetch, setAlerts }: Params) {
  return useCallback(async (alertId: number) => {
    if (mode === 'brand') return;

    try {
      const response = await authFetch(
        `/api/restaurants/${restaurantId}/inventory/alerts/${alertId}/resolve`,
        { method: 'PUT' }
      );

      if (response.success) {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      }
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  }, [mode, restaurantId, authFetch, setAlerts]);
}
