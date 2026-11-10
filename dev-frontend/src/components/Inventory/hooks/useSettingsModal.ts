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
      // 비어 있으면 빈 칸(placeholder 2) — 예전엔 1 을 채워 그대로 저장했다(서버 기본은 2 · 2026-11-10 §2-7)
      lead_time_days: ingredient.lead_time_days ? String(ingredient.lead_time_days) : '',
      safety_stock_percent: ingredient.safety_stock_percent != null && (ingredient.safety_stock_percent as any) !== '' ? String(ingredient.safety_stock_percent) : '',
      manual_daily_usage: ingredient.manual_daily_usage?.toString() || '',
      min_stock: (ingredient.min_stock || 0).toString(),
      min_order: ((ingredient as any).min_order || 0).toString(),
      new_stock: '',
      adjustment_reason: '',
    });
    setShowSettingsModal(true);
  }, []);

  const close = useCallback(() => setShowSettingsModal(false), []);

  /** 저장 성공이면 true — 부르는 쪽이 발주 전망을 다시 읽는다(안 그러면 숫자를 바꿔도 배지·띠가 그대로) */
  const handleSave = useCallback(async (): Promise<boolean> => {
    if (!settingsIngredient) return false;
    // 사용자가 비워 둔 칸은 보내지 않는다(서버가 원래 값 유지) — 비어 있다고 1·20 을 채워 넣지 않는다
    const intOrUndef = (v: string) => (v.trim() === '' ? undefined : (parseInt(v, 10) || undefined));
    const numOrUndef = (v: string) => (v.trim() === '' ? undefined : (Number.isFinite(parseFloat(v)) ? parseFloat(v) : undefined));

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
            lead_time_days: intOrUndef(settingsForm.lead_time_days),
            safety_stock_percent: numOrUndef(settingsForm.safety_stock_percent),
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
              lead_time_days: intOrUndef(settingsForm.lead_time_days) ?? item.lead_time_days,
              safety_stock_percent: numOrUndef(settingsForm.safety_stock_percent) ?? item.safety_stock_percent,
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
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
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
