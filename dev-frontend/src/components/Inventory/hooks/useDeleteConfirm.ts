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
        // 2026-09-01(Q5): 예전엔 `PUT {track_stock:false}` 로 "숨기기"를 삭제라고 불렀다.
        // 스위치를 없애면서 서버가 그 값을 무시하게 됐고, 그대로 두면 화면에서만 사라졌다가
        // 새로고침하면 되살아난다. 진짜 삭제 라우트를 쓴다(서버가 소유권·사용중 여부를 판정).
        const response = await authFetch(endpoint, { method: 'DELETE' });
        if (response.success) {
          setInventory(prev => prev.filter(item => item.id !== target.id));
        } else {
          // 레시피에서 쓰는 중이면 서버가 400 으로 막는다 — 조용히 삼키지 않는다
          throw new Error(response.error || response.message || 'Failed to delete stock item');
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
