import { useState, useCallback } from 'react';
import { UnifiedStockItem } from '../types';

export function useOrderModal() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState<UnifiedStockItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderQuantities, setOrderQuantities] = useState<{ [key: string]: string }>({});

  const open = useCallback((item: UnifiedStockItem) => {
    setOrderItem(item);
    setOrderQuantity(item.min_order ? String(item.min_order) : '');
    setShowOrderModal(true);
  }, []);

  const close = useCallback(() => setShowOrderModal(false), []);

  const handleSend = useCallback(() => {
    if (!orderItem || !orderQuantity) return;
    // TODO: Implement actual order sending to supplier
    alert(`Order sent: ${orderQuantity} ${orderItem.unit} of ${orderItem.name}`);
    setShowOrderModal(false);
    setOrderItem(null);
    setOrderQuantity('');
  }, [orderItem, orderQuantity]);

  return {
    showOrderModal,
    orderItem,
    orderQuantity,
    setOrderQuantity,
    orderQuantities,
    setOrderQuantities,
    open,
    close,
    handleSend,
  };
}
