import { useState, useCallback } from 'react';
import { GeneralStockItem } from '../types';
import { calculateStockStatus } from '../utils';
import { AuthFetch } from './useAuthFetch';

interface Params {
  restaurantId?: number;
  isBrandGeneralMode: boolean;
  authFetch: AuthFetch;
  setGeneralStockInventory: React.Dispatch<React.SetStateAction<GeneralStockItem[]>>;
}

export function useGeneralStockReceiveModal({
  restaurantId,
  isBrandGeneralMode,
  authFetch,
  setGeneralStockInventory,
}: Params) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<GeneralStockItem | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const open = useCallback((item: GeneralStockItem) => {
    setSelected(item);
    setQuantity('');
    setNotes('');
    setBatchNumber('');
    setManufactureDate('');
    setExpiryDate('');
    setShowModal(true);
  }, []);

  const close = useCallback(() => setShowModal(false), []);

  const handleReceive = useCallback(async () => {
    if (!selected || !quantity || parseFloat(quantity) <= 0) return;

    try {
      const endpoint = isBrandGeneralMode
        ? `/api/general-stock/${selected.id}/receive`
        : `/api/restaurants/${restaurantId}/inventory/general-stock/${selected.id}/receive`;
      const response = await authFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          quantity: parseFloat(quantity),
          notes,
          batch_number: batchNumber || null,
          manufacture_date: manufactureDate || null,
          expiry_date: expiryDate || null,
        }),
      });
      if (response.success) {
        const newStock = response.data?.current_stock ??
          (parseFloat(String(selected.current_stock)) + parseFloat(quantity));
        const newStatus = calculateStockStatus(newStock, selected.min_stock);
        const now = new Date().toISOString();
        setGeneralStockInventory(prev => prev.map(item =>
          item.id === selected.id
            ? { ...item, current_stock: newStock, stock_status: newStatus, last_stock_take_at: now }
            : item
        ));
        setShowModal(false);
        setQuantity('');
        setNotes('');
        setBatchNumber('');
        setManufactureDate('');
        setExpiryDate('');
      }
    } catch (error) {
      console.error('Failed to receive general stock:', error);
    }
  }, [selected, quantity, notes, batchNumber, manufactureDate, expiryDate, isBrandGeneralMode, restaurantId, authFetch, setGeneralStockInventory]);

  return {
    showModal,
    selected,
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
    open,
    close,
    handleReceive,
  };
}
