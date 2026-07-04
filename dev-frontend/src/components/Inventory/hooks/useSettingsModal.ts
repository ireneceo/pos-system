import { useState, useCallback } from 'react';
import { InventoryMode, IngredientStock, SettingsForm } from '../types';
import { calculateStockStatus } from '../utils';
import { AuthFetch } from './useAuthFetch';

interface Params {
  mode: InventoryMode;
  restaurantId?: number;
  authFetch: AuthFetch;
  setInventory: React.Dispatch<React.SetStateAction<IngredientStock[]>>;
}

const EMPTY_SETTINGS_FORM: SettingsForm = {
  lead_time_days: '',
  safety_stock_percent: '',
  manual_daily_usage: '',
  min_stock: '',
  min_order: '',
  new_stock: '',
  adjustment_reason: '',
};

export function useSettingsModal({ mode, restaurantId, authFetch, setInventory }: Params) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsIngredient, setSettingsIngredient] = useState<IngredientStock | null>(null);
  const [settingsForm, setSettingsForm] = useState<SettingsForm>(EMPTY_SETTINGS_FORM);
  const [savingSettings, setSavingSettings] = useState(false);

  const open = useCallback((ingredient: IngredientStock) => {
    setSettingsIngredient(ingredient);
    setSettingsForm({
      lead_time_days: (ingredient.lead_time_days || 1).toString(),
      safety_stock_percent: (ingredient.safety_stock_percent || 20).toString(),
      manual_daily_usage: ingredient.manual_daily_usage?.toString() || '',
      min_stock: (ingredient.min_stock || 0).toString(),
      min_order: ((ingredient as any).min_order || 0).toString(),
      new_stock: '',
      adjustment_reason: '',
    });
    setShowSettingsModal(true);
  }, []);

  const close = useCallback(() => setShowSettingsModal(false), []);

  const handleSave = useCallback(async () => {
    if (!settingsIngredient) return;

    try {
      setSavingSettings(true);
      // Brand mode: ProductIngredient (owner-scoped) — PUT /product-ingredients/:id accepts
      // the same settings fields. Restaurant mode: the per-restaurant settings endpoint.
      // (Brand mode previously hit /restaurants/undefined/... → 404. Audit #5.)
      const endpoint = mode === 'brand'
        ? `/api/product-ingredients/${settingsIngredient.id}`
        : `/api/restaurants/${restaurantId}/inventory/${settingsIngredient.id}/settings`;
      const response = await authFetch(
        endpoint,
        {
          method: 'PUT',
          body: JSON.stringify({
            lead_time_days: parseInt(settingsForm.lead_time_days) || 1,
            safety_stock_percent: parseFloat(settingsForm.safety_stock_percent) || 20,
            manual_daily_usage: settingsForm.manual_daily_usage
              ? parseFloat(settingsForm.manual_daily_usage)
              : null,
            min_stock: parseFloat(settingsForm.min_stock) || 0,
            min_order: parseFloat(settingsForm.min_order) || 0,
          }),
        }
      );

      if (response.success) {
        const newMinStock = parseFloat(settingsForm.min_stock) || 0;
        setInventory(prev => prev.map(item => {
          if (item.id === settingsIngredient.id) {
            const newStatus = calculateStockStatus(item.current_stock, newMinStock);
            return {
              ...item,
              lead_time_days: parseInt(settingsForm.lead_time_days) || 1,
              safety_stock_percent: parseFloat(settingsForm.safety_stock_percent) || 20,
              manual_daily_usage: settingsForm.manual_daily_usage
                ? parseFloat(settingsForm.manual_daily_usage)
                : null,
              min_stock: newMinStock,
              stock_status: newStatus,
            };
          }
          return item;
        }));
        setShowSettingsModal(false);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSavingSettings(false);
    }
  }, [settingsIngredient, settingsForm, mode, restaurantId, authFetch, setInventory]);

  return {
    showSettingsModal,
    settingsIngredient,
    settingsForm,
    setSettingsForm,
    savingSettings,
    open,
    close,
    handleSave,
  };
}
