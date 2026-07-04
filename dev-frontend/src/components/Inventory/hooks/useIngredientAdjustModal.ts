import { useState, useCallback } from 'react';
import { InventoryMode, IngredientStock, StockAlert } from '../types';
import { calculateStockStatus } from '../utils';
import { AuthFetch } from './useAuthFetch';

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

  const openReceive = useCallback((ingredient: IngredientStock) => {
    setSelectedIngredient(ingredient);
    setQuantity('');
    setNotes('');
    setBatchNumber('');
    setManufactureDate('');
    setExpiryDate('');
    setShowReceiveModal(true);
  }, []);

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
      if (mode === 'restaurant') {
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
        const newStock = response.data?.new_stock ?? response.data?.current_stock ??
          (selectedIngredient.current_stock + parseFloat(quantity));
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
      }
    } catch (error) {
      console.error('Failed to receive stock:', error);
    }
  }, [selectedIngredient, quantity, notes, batchNumber, manufactureDate, expiryDate, mode, restaurantId, authFetch, setInventory, setAlerts]);

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
    openReceive,
    openWaste,
    closeReceive,
    closeWaste,
    handleReceive,
    handleWaste,
  };
}
