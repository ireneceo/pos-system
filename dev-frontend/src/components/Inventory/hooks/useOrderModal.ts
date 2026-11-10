import { useState, useCallback } from 'react';
import { InventoryMode, UnifiedStockItem } from '../types';
import { getAuthToken } from '../../../utils/auth';

interface SellerSource {
  id: number;
  ingredient_id: number;
  seller_type: 'supplier' | 'brand' | 'foodcourt' | 'system_admin';
  seller_entity_id: number | null;
  // 공급업체 자체 판매품목명·SKU (공급업체 타입만 값 있음; brand/foodcourt/system_admin는 null)
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
  unit_price: number | string;
  unit_conversion: number | string;
  is_preferred: boolean;
  is_active: boolean;
}

export function useOrderModal({ mode }: { mode: InventoryMode }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState<UnifiedStockItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderQuantities, setOrderQuantities] = useState<{ [key: string]: string }>({});
  const [orderSellers, setOrderSellers] = useState<SellerSource[]>([]);
  const [selectedSellerId, setSelectedSellerId] = useState<number | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [lastOrderResult, setLastOrderResult] = useState<{ ingredient_name: string; qty: number; merged: boolean } | null>(null);

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
        // Brand mode items are ProductIngredient rows — their seller mappings live
        // under /product-ingredients/:id/seller-sources. Restaurant items use
        // /ingredients/:id/seller-sources. (Brand hit the restaurant path → 404. Audit #6.)
        const sellerSourcesUrl = mode === 'brand'
          ? `/api/product-ingredients/${item.id}/seller-sources`
          : `/api/ingredients/${item.id}/seller-sources`;
        const res = await fetch(sellerSourcesUrl, {
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
  }, [mode]);

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
      // The PO workflow distinguishes ingredient_id (Restaurant Ingredient) from
      // product_ingredient_id (BG ProductIngredient). Brand items must send
      // product_ingredient_id or the workflow looks them up in the wrong table and
      // drops the line. Audit #6.
      const itemRef = mode === 'brand'
        ? { product_ingredient_id: orderItem.id }
        : { ingredient_id: orderItem.id };
      // 2026-11-10 Fable 설계(.claude/fable-design-20261110-stock-order-to-staging.md §1-1):
      //   재고 화면은 바로 보내지 않는다 — 발주 대기(초안)에만 담는다. 판매자에게 나가는 곳은 발주 대기 화면 Submit 하나.
      //   group 1개짜리 bulk + source:'stock' → 같은 판매자 초안에 합쳐지고 «재고에서 담음» 기록이 남는다. auto_submit 보내지 않음.
      const body = {
        source: 'stock',
        groups: [{
          seller_type: seller.seller_type,
          seller_entity_id: seller.seller_entity_id,
          items: [{
            ...itemRef,
            ingredient_seller_product_id: seller.id,
            quantity_ordered: qty,
            unit_price: parseFloat(String(seller.unit_price)) || 0
          }]
        }]
      };
      const res = await fetch('/api/purchase-orders/bulk', { method: 'POST', headers, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setOrderError(data?.message || 'Failed to add to Pending POs');
        setOrderSubmitting(false);
        return;
      }
      const po = (data.data?.orders || [])[0] || null;
      // 결과는 창 안에 둔다(자동 닫힘 없음) — «Review & Send» 로 발주 대기 화면, «Keep Working» 으로 닫기
      setLastOrderResult({ ingredient_name: orderItem.name, qty, merged: !!po?.merged });
    } catch (err) {
      console.error('Order send failed:', err);
      setOrderError('Network error sending order');
    } finally {
      setOrderSubmitting(false);
    }
  }, [orderItem, orderQuantity, orderSellers, selectedSellerId, mode]);

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
