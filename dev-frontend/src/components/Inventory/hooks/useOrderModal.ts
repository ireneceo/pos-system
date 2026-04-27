import { useState, useCallback } from 'react';
import { UnifiedStockItem } from '../types';
import { getAuthToken } from '../../../utils/auth';

interface SellerSource {
  id: number;
  ingredient_id: number;
  seller_type: 'supplier' | 'brand' | 'foodcourt' | 'system_admin';
  seller_entity_id: number | null;
  unit_price: number | string;
  unit_conversion: number | string;
  is_preferred: boolean;
  is_active: boolean;
}

export function useOrderModal() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState<UnifiedStockItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderQuantities, setOrderQuantities] = useState<{ [key: string]: string }>({});
  const [orderSellers, setOrderSellers] = useState<SellerSource[]>([]);
  const [selectedSellerId, setSelectedSellerId] = useState<number | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [lastOrderResult, setLastOrderResult] = useState<{ po_number: string; ingredient_name: string } | null>(null);

  const open = useCallback(async (item: UnifiedStockItem) => {
    setOrderItem(item);
    setOrderQuantity(item.min_order ? String(item.min_order) : '');
    setOrderError(null);
    setLastOrderResult(null);
    setOrderSellers([]);
    setSelectedSellerId(null);
    setShowOrderModal(true);

    // Ingredients only — general stock has no seller mapping
    if ((item as any).item_type === 'ingredient' || !(item as any).item_type) {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/ingredients/${item.id}/seller-sources`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          const list: SellerSource[] = Array.isArray(data.data) ? data.data : [];
          const active = list.filter(s => s.is_active);
          setOrderSellers(active);
          // Default = preferred (or first active)
          const preferred = active.find(s => s.is_preferred) || active[0];
          if (preferred) setSelectedSellerId(preferred.id);
        }
      } catch (err) {
        console.error('Failed to fetch seller-sources:', err);
      }
    }
  }, []);

  const close = useCallback(() => {
    setShowOrderModal(false);
    setOrderItem(null);
    setOrderQuantity('');
    setOrderError(null);
    setOrderSellers([]);
    setSelectedSellerId(null);
  }, []);

  const handleSend = useCallback(async () => {
    if (!orderItem || !orderQuantity) return;
    const qty = parseFloat(orderQuantity);
    if (!(qty > 0)) return;
    const seller = orderSellers.find(s => s.id === selectedSellerId);
    if (!seller) {
      setOrderError('No supplier mapping. Set up a seller source first.');
      return;
    }

    setOrderSubmitting(true);
    setOrderError(null);
    try {
      const token = getAuthToken();
      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const body = {
        seller_type: seller.seller_type,
        seller_entity_id: seller.seller_entity_id,
        items: [{
          ingredient_id: orderItem.id,
          ingredient_seller_product_id: seller.id,
          quantity_ordered: qty,
          unit_price: parseFloat(String(seller.unit_price)) || 0
        }]
      };
      const createRes = await fetch('/api/purchase-orders', { method: 'POST', headers, body: JSON.stringify(body) });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.success) {
        setOrderError(createData?.message || 'Failed to create purchase order');
        setOrderSubmitting(false);
        return;
      }
      const newId = createData.data?.id;
      const poNumber = createData.data?.po_number || '';
      // Auto-submit
      if (newId) {
        const subRes = await fetch(`/api/purchase-orders/${newId}/submit`, { method: 'POST', headers });
        const subData = await subRes.json();
        if (!subRes.ok || !subData.success) {
          setOrderError(subData?.message || 'Order created (draft) but submit failed');
          setOrderSubmitting(false);
          return;
        }
      }
      setLastOrderResult({ po_number: poNumber, ingredient_name: orderItem.name });
      // Close after brief moment so user sees confirmation banner inside the modal
      setTimeout(() => {
        setShowOrderModal(false);
        setOrderItem(null);
        setOrderQuantity('');
        setOrderSellers([]);
        setSelectedSellerId(null);
      }, 1200);
    } catch (err) {
      console.error('Order send failed:', err);
      setOrderError('Network error sending order');
    } finally {
      setOrderSubmitting(false);
    }
  }, [orderItem, orderQuantity, orderSellers, selectedSellerId]);

  return {
    showOrderModal,
    orderItem,
    orderQuantity,
    setOrderQuantity,
    orderQuantities,
    setOrderQuantities,
    orderSellers,
    selectedSellerId,
    setSelectedSellerId,
    orderError,
    orderSubmitting,
    lastOrderResult,
    open,
    close,
    handleSend,
  };
}
