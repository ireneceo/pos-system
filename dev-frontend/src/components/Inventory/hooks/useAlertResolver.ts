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
    // Brand mode alerts are client-generated from low/out-of-stock items
    // (useInventoryData → generatedAlerts, not persisted server-side). There is
    // no server record to resolve, so Dismiss simply removes it from the local
    // list. Previously this returned early → Dismiss was a no-op. Audit #35.
    if (mode === 'brand') {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      return;
    }

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
