import { useState, useEffect, useCallback } from 'react';
import { IngredientStock, InitialStockItemValues } from '../types';
import { calculateStockStatus } from '../utils';
import { AuthFetch } from './useAuthFetch';

interface Params {
  restaurantId?: number;
  authFetch: AuthFetch;
  inventory: IngredientStock[];
  setInventory: React.Dispatch<React.SetStateAction<IngredientStock[]>>;
}

export function useInitialStockModal({ restaurantId, authFetch, inventory, setInventory }: Params) {
  const [showInitialStockModal, setShowInitialStockModal] = useState(false);
  const [initialStockItems, setInitialStockItems] = useState<{ [key: number]: InitialStockItemValues }>({});
  const [, setNeedsInitialSetup] = useState(false);
  const [savingInitialStock, setSavingInitialStock] = useState(false);

  useEffect(() => {
    if (inventory.length > 0) {
      const hasAnyStock = inventory.some(item => item.current_stock > 0 || item.last_stock_take_at);
      setNeedsInitialSetup(!hasAnyStock);
    }
  }, [inventory]);

  const close = useCallback(() => setShowInitialStockModal(false), []);

  const updateItem = useCallback(
    (id: number, field: 'quantity' | 'min_stock', value: string) => {
      setInitialStockItems(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        } as InitialStockItemValues,
      }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    const itemsToSave = Object.entries(initialStockItems)
      .filter(([_, values]) => parseFloat(values.quantity) > 0)
      .map(([id, values]) => ({
        ingredient_id: parseInt(id),
        quantity: parseFloat(values.quantity),
        min_stock: parseFloat(values.min_stock) || 0,
      }));

    if (itemsToSave.length === 0) {
      return;
    }

    try {
      setSavingInitialStock(true);
      const response = await authFetch(`/api/restaurants/${restaurantId}/inventory/initial`, {
        method: 'POST',
        body: JSON.stringify({ items: itemsToSave }),
      });

      if (response.success) {
        const now = new Date().toISOString();
        setInventory(prev => prev.map(item => {
          const savedItem = initialStockItems[item.id];
          if (savedItem && parseFloat(savedItem.quantity) > 0) {
            const newStock = parseFloat(savedItem.quantity);
            const newMinStock = parseFloat(savedItem.min_stock) || 0;
            const newStatus = calculateStockStatus(newStock, newMinStock);
            return {
              ...item,
              current_stock: newStock,
              min_stock: newMinStock,
              stock_status: newStatus,
              last_stock_take_at: now,
            };
          }
          return item;
        }));
        setShowInitialStockModal(false);
        setNeedsInitialSetup(false);
      }
    } catch (error) {
      console.error('Failed to save initial stock:', error);
    } finally {
      setSavingInitialStock(false);
    }
  }, [initialStockItems, restaurantId, authFetch, setInventory]);

  return {
    showInitialStockModal,
    initialStockItems,
    savingInitialStock,
    close,
    updateItem,
    handleSave,
  };
}
