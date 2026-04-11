import { useState, useCallback } from 'react';
import { InventoryMode, IngredientStock, GeneralStockItem, StockItemType } from '../types';
import { calculateStockStatus } from '../utils';
import { AuthFetch } from './useAuthFetch';

interface Params {
  mode: InventoryMode;
  restaurantId?: number;
  isBrandGeneralMode: boolean;
  authFetch: AuthFetch;
  setInventory: React.Dispatch<React.SetStateAction<IngredientStock[]>>;
  setGeneralStockInventory: React.Dispatch<React.SetStateAction<GeneralStockItem[]>>;
}

export function useInlineStockEdit({
  mode,
  restaurantId,
  isBrandGeneralMode,
  authFetch,
  setInventory,
  setGeneralStockInventory,
}: Params) {
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [editingStockValue, setEditingStockValue] = useState('');
  const [editingStockType, setEditingStockType] = useState<StockItemType>('ingredient');

  const start = useCallback((id: number, currentValue: number, type: StockItemType) => {
    setEditingStockId(id);
    setEditingStockValue(currentValue.toString());
    setEditingStockType(type);
  }, []);

  const cancel = useCallback(() => {
    setEditingStockId(null);
    setEditingStockValue('');
  }, []);

  const save = useCallback(async (id: number) => {
    const newValue = parseFloat(editingStockValue);
    if (isNaN(newValue) || newValue < 0) {
      cancel();
      return;
    }

    try {
      let response;
      if (mode === 'restaurant') {
        const endpoint = editingStockType === 'ingredient'
          ? `/api/restaurants/${restaurantId}/inventory/adjust`
          : `/api/restaurants/${restaurantId}/inventory/general-stock/${id}/adjust`;

        const body: any = { new_quantity: newValue, reason: 'Stock adjustment' };
        if (editingStockType === 'ingredient') {
          body.ingredient_id = id;
        }

        response = await authFetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
        });
      } else if (isBrandGeneralMode && editingStockType === 'general_stock') {
        response = await authFetch(`/api/general-stock/${id}/adjust`, {
          method: 'POST',
          body: JSON.stringify({ new_quantity: newValue, reason: 'Stock adjustment' }),
        });
      } else {
        response = await authFetch(`/api/product-ingredients/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ current_stock: newValue }),
        });
      }

      if (response.success) {
        const now = new Date().toISOString();
        if (editingStockType === 'ingredient') {
          setInventory(prev => prev.map(item => {
            if (item.id === id) {
              const newStatus = calculateStockStatus(newValue, item.min_stock);
              return { ...item, current_stock: newValue, stock_status: newStatus, last_stock_take_at: now };
            }
            return item;
          }));
        } else {
          setGeneralStockInventory(prev => prev.map(item => {
            if (item.id === id) {
              const newStatus = calculateStockStatus(newValue, item.min_stock);
              return { ...item, current_stock: newValue, stock_status: newStatus, last_stock_take_at: now };
            }
            return item;
          }));
        }
      }
    } catch (error) {
      console.error('Failed to adjust stock:', error);
    } finally {
      cancel();
    }
  }, [editingStockValue, editingStockType, mode, restaurantId, isBrandGeneralMode, authFetch, setInventory, setGeneralStockInventory, cancel]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      save(id);
    } else if (e.key === 'Escape') {
      cancel();
    }
  }, [save, cancel]);

  return {
    editingStockId,
    editingStockValue,
    setEditingStockValue,
    editingStockType,
    start,
    cancel,
    save,
    handleKeyDown,
  };
}
