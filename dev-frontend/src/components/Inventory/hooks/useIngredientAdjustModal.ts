import { useState, useCallback } from 'react';
import { InventoryMode, IngredientStock, StockAlert } from '../types';
import { calculateStockStatus } from '../utils';
import { AuthFetch } from './useAuthFetch';

/** 진행 중 발주에서 아직 안 받은 라인 (GET .../inventory/open-po-lines) */
export interface OpenPoLine {
  purchase_order_id: number;
  po_number: string;
  po_status: string;
  expected_delivery_date: string | null;
  item_id: number;
  quantity_ordered: number;
  quantity_received: number;
  quantity_remaining: number;
  unit_conversion: number;
  unit_price: number;
  ingredient_unit?: string;
}

interface Params {
  mode: InventoryMode;
  restaurantId?: number;
  authFetch: AuthFetch;
  setInventory: React.Dispatch<React.SetStateAction<IngredientStock[]>>;
  setAlerts: React.Dispatch<React.SetStateAction<StockAlert[]>>;
}

export function useIngredientAdjustModal({
  mode,
  restaurantId,
  authFetch,
  setInventory,
  setAlerts,
}: Params) {
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // 이 품목이 담긴 진행 중 발주 라인. 있으면 사용자에게 보여주고,
  // 발주 입고로 처리할지(=PO 경로) 그냥 일반 입고할지 고르게 한다.
  // 자동으로 매칭해 상태를 바꾸지 않는다 — 수량·품목 자동 추정은 오귀속 사고 경로다.
  const [openPoLines, setOpenPoLines] = useState<OpenPoLine[]>([]);
  const [selectedPoItemId, setSelectedPoItemId] = useState<number | null>(null);

  const openReceive = useCallback((ingredient: IngredientStock) => {
    setSelectedIngredient(ingredient);
    setQuantity('');
    setNotes('');
    setBatchNumber('');
    setManufactureDate('');
    setExpiryDate('');
    setOpenPoLines([]);
    setSelectedPoItemId(null);
    setShowReceiveModal(true);

    // 조회 실패는 조용히 넘긴다 — 일반 입고는 계속 가능해야 한다.
    // 매장(RA)은 재료 기준, 브랜드(BG)는 재고아이템 기준으로 같은 질문을 한다.
    const url = mode === 'restaurant'
      ? (restaurantId ? `/api/restaurants/${restaurantId}/inventory/open-po-lines?ingredient_id=${ingredient.id}` : null)
      : `/api/product-ingredients/${ingredient.id}/open-po-lines`;
    if (url) {
      authFetch(url)
        .then(res => { if (res?.success && Array.isArray(res.data)) setOpenPoLines(res.data); })
        .catch(() => { /* 발주 조회 실패가 입고를 막지 않는다 */ });
    }
  }, [mode, restaurantId, authFetch]);

  const openWaste = useCallback((ingredient: IngredientStock) => {
    setSelectedIngredient(ingredient);
    setQuantity('');
    setNotes('');
    setShowWasteModal(true);
  }, []);

  const closeReceive = useCallback(() => setShowReceiveModal(false), []);
  const closeWaste = useCallback(() => setShowWasteModal(false), []);

  const handleReceive = useCallback(async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      let response;
      // 사용자가 발주 라인을 골랐으면 발주 입고 경로로 태운다.
      // 재고 가산 로직을 여기서 복제하지 않는다 — 입고의 단일 소스는 PO 수령 경로다.
      // (재고에서 따로 더하고 발주에서 또 받으면 같은 물건이 두 번 더해진다.)
      const chosenLine = selectedPoItemId != null
        ? openPoLines.find(l => l.item_id === selectedPoItemId)
        : null;
      if (chosenLine) {
        response = await authFetch(`/api/purchase-orders/${chosenLine.purchase_order_id}/receive`, {
          method: 'POST',
          body: JSON.stringify({
            items: [{
              item_id: chosenLine.item_id,
              quantity_received: parseFloat(quantity),
              batch_no: batchNumber || undefined,
              expiry_date: expiryDate || undefined,
              discrepancy_note: notes || undefined,
            }],
          }),
        });
      } else if (mode === 'restaurant') {
        // 발주와 무관한 일반 입고 — 기존 동작 그대로
        response = await authFetch(`/api/restaurants/${restaurantId}/inventory/receive`, {
          method: 'POST',
          body: JSON.stringify({
            ingredient_id: selectedIngredient.id,
            quantity: parseFloat(quantity),
            notes,
            batch_number: batchNumber || null,
            manufacture_date: manufactureDate || null,
            expiry_date: expiryDate || null,
          }),
        });
      } else {
        // Brand mode: adjust-stock records an InventoryTransaction (history), unlike a
        // bare PUT current_stock which left History empty. Audit #36.
        response = await authFetch(`/api/product-ingredients/${selectedIngredient.id}/adjust-stock`, {
          method: 'POST',
          body: JSON.stringify({
            adjustment: parseFloat(quantity),
            transaction_type: 'purchase',
            reason: notes || 'Received',
          }),
        });
      }

      if (response.success) {
        // 발주 경로는 발주 단위 × unit_conversion 만큼 재고가 오른다(재고 단위와 다를 수 있다).
        const delta = parseFloat(quantity) * (chosenLine ? (chosenLine.unit_conversion || 1) : 1);
        const newStock = response.data?.new_stock ?? response.data?.current_stock ??
          (selectedIngredient.current_stock + delta);
        const newStatus = calculateStockStatus(newStock, selectedIngredient.min_stock);
        const now = new Date().toISOString();
        setInventory(prev => prev.map(item =>
          item.id === selectedIngredient.id
            ? { ...item, current_stock: newStock, stock_status: newStatus, last_stock_take_at: now }
            : item
        ));
        setAlerts(prev => prev.filter(alert => alert.ingredient_id !== selectedIngredient.id));
        setShowReceiveModal(false);
        setSelectedIngredient(null);
        setQuantity('');
        setNotes('');
        setBatchNumber('');
        setManufactureDate('');
        setExpiryDate('');
        setOpenPoLines([]);
        setSelectedPoItemId(null);
      }
    } catch (error) {
      console.error('Failed to receive stock:', error);
    }
  }, [selectedIngredient, quantity, notes, batchNumber, manufactureDate, expiryDate, mode, restaurantId, authFetch, setInventory, setAlerts, selectedPoItemId, openPoLines]);

  const handleWaste = useCallback(async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      let response;
      if (mode === 'restaurant') {
        response = await authFetch(`/api/restaurants/${restaurantId}/inventory/waste`, {
          method: 'POST',
          body: JSON.stringify({
            ingredient_id: selectedIngredient.id,
            quantity: parseFloat(quantity),
            notes,
          }),
        });
      } else {
        // Brand mode: adjust-stock (negative) records a 'waste' InventoryTransaction. Audit #36.
        response = await authFetch(`/api/product-ingredients/${selectedIngredient.id}/adjust-stock`, {
          method: 'POST',
          body: JSON.stringify({
            adjustment: -parseFloat(quantity),
            transaction_type: 'waste',
            reason: notes || 'Waste',
          }),
        });
      }

      if (response.success) {
        const newStock = response.data?.new_stock ?? response.data?.current_stock ??
          Math.max(0, selectedIngredient.current_stock - parseFloat(quantity));
        const newStatus = calculateStockStatus(newStock, selectedIngredient.min_stock);
        const now = new Date().toISOString();
        setInventory(prev => prev.map(item =>
          item.id === selectedIngredient.id
            ? { ...item, current_stock: newStock, stock_status: newStatus, last_stock_take_at: now }
            : item
        ));
        setShowWasteModal(false);
        setSelectedIngredient(null);
        setQuantity('');
        setNotes('');
      }
    } catch (error) {
      console.error('Failed to record waste:', error);
    }
  }, [selectedIngredient, quantity, notes, mode, restaurantId, authFetch, setInventory]);

  return {
    showReceiveModal,
    showWasteModal,
    selectedIngredient,
    quantity,
    setQuantity,
    notes,
    setNotes,
    batchNumber,
    setBatchNumber,
    manufactureDate,
    setManufactureDate,
    expiryDate,
    setExpiryDate,
    openPoLines,
    selectedPoItemId,
    setSelectedPoItemId,
    openReceive,
    openWaste,
    closeReceive,
    closeWaste,
    handleReceive,
    handleWaste,
  };
}
