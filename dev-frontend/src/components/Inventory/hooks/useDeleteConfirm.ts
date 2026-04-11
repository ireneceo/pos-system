import { useState, useCallback } from 'react';
import { InventoryMode, IngredientStock, GeneralStockItem, DeleteTarget } from '../types';
import { AuthFetch } from './useAuthFetch';

interface Params {
  mode: InventoryMode;
  restaurantId?: number;
  isBrandGeneralMode: boolean;
  authFetch: AuthFetch;
  setInventory: React.Dispatch<React.SetStateAction<IngredientStock[]>>;
  setGeneralStockInventory: React.Dispatch<React.SetStateAction<GeneralStockItem[]>>;
}

export function useDeleteConfirm({
  mode,
  restaurantId,
  isBrandGeneralMode,
  authFetch,
  setInventory,
  setGeneralStockInventory,
}: Params) {
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState<DeleteTarget | null>(null);

  const open = useCallback((t: DeleteTarget) => {
    setTarget(t);
    setShowModal(true);
  }, []);

  const close = useCallback(() => {
    setShowModal(false);
    setTarget(null);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!target) return;
    try {
      if (target.type === 'ingredient') {
        const endpoint = mode === 'brand'
          ? `/api/product-ingredients/${target.id}`
          : `/api/restaurants/${restaurantId}/ingredients/${target.id}`;
        const response = await authFetch(endpoint, {
          method: 'PUT',
          body: JSON.stringify({ track_stock: false }),
        });
        if (response.success) {
          setInventory(prev => prev.filter(item => item.id !== target.id));
        }
      } else {
        const endpoint = isBrandGeneralMode
          ? `/api/general-stock/${target.id}`
          : `/api/restaurants/${restaurantId}/inventory/general-stock/${target.id}`;
        const response = await authFetch(endpoint, {
          method: 'DELETE',
        });
        if (response.success) {
          setGeneralStockInventory(prev => prev.filter(item => item.id !== target.id));
        }
      }
      setShowModal(false);
      setTarget(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }, [target, mode, restaurantId, isBrandGeneralMode, authFetch, setInventory, setGeneralStockInventory]);

  return {
    showModal,
    target,
    open,
    close,
    handleConfirm,
  };
}
