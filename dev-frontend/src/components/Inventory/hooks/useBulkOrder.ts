import { useCallback, useEffect, useState } from 'react';
import { getAuthToken } from '../../../utils/auth';

export interface SuggestionRow {
  ingredient_id: number;
  ingredient_name: string;
  unit: string;
  suggested_qty: number;
  current_stock: number;
  min_stock: number;
  seller_type: 'supplier' | 'brand' | 'foodcourt' | 'system_admin' | null;
  seller_entity_id: number | null;
  seller_name: string | null;
  ingredient_seller_product_id: number | null;
  unit_price: number;
}

export interface BulkOrderItem extends SuggestionRow {
  quantity: number;
}

/**
 * Multi-select bulk-order state for the inventory list.
 * Driven by /api/purchase-orders/suggestions (low-stock items grouped by preferred seller).
 *
 * Workflow:
 *   1. loadSuggestions() — fetch + build map by ingredient_id
 *   2. toggleSelect(id) — checkbox per row
 *   3. openBulk() — open modal with currently-selected items
 *   4. updateQty(id, qty) / updateSeller(id, sellerSourceId) — per-row edit
 *   5. send() — POST /api/purchase-orders/bulk { groups, auto_submit: true }
 */
export function useBulkOrder() {
  const [suggestionsById, setSuggestionsById] = useState<Map<number, SuggestionRow>>(new Map());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkItems, setBulkItems] = useState<BulkOrderItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultPos, setResultPos] = useState<Array<{ id: number; po_number: string; seller_name: string | null; status: string }> | null>(null);

  const loadSuggestions = useCallback(async () => {
    setLoadingSuggestions(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders/suggestions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSuggestionsById(new Map());
        return;
      }
      const groups = data.data?.groups || [];
      const map = new Map<number, SuggestionRow>();
      for (const g of groups) {
        for (const it of g.items || []) {
          map.set(it.ingredient.id, {
            ingredient_id: it.ingredient.id,
            ingredient_name: it.ingredient.name,
            unit: it.ingredient.unit,
            suggested_qty: parseFloat(it.suggested_qty) || 0,
            current_stock: parseFloat(it.ingredient.current_stock) || 0,
            min_stock: parseFloat(it.ingredient.min_stock) || 0,
            seller_type: g.seller_type,
            seller_entity_id: g.seller_entity_id,
            seller_name: g.seller_name,
            ingredient_seller_product_id: it.seller_source?.id || null,
            unit_price: parseFloat(it.seller_source?.unit_price) || 0
          });
        }
      }
      setSuggestionsById(map);
    } catch (err) {
      console.error('[useBulkOrder] loadSuggestions error:', err);
      setSuggestionsById(new Map());
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const selectAllSuggested = useCallback(() => {
    setSelectedIds(new Set(Array.from(suggestionsById.keys())));
  }, [suggestionsById]);

  const openBulk = useCallback(() => {
    const ids = Array.from(selectedIds);
    const items: BulkOrderItem[] = [];
    for (const id of ids) {
      const sugg = suggestionsById.get(id);
      if (sugg && sugg.seller_type) {
        items.push({ ...sugg, quantity: sugg.suggested_qty || 1 });
      }
    }
    setBulkItems(items);
    setError(null);
    setResultPos(null);
    setShowBulkModal(true);
  }, [selectedIds, suggestionsById]);

  const updateBulkItem = useCallback((id: number, patch: Partial<BulkOrderItem>) => {
    setBulkItems(prev => prev.map(it => it.ingredient_id === id ? { ...it, ...patch } : it));
  }, []);

  const removeBulkItem = useCallback((id: number) => {
    setBulkItems(prev => prev.filter(it => it.ingredient_id !== id));
  }, []);

  const closeBulk = useCallback(() => {
    setShowBulkModal(false);
    setError(null);
    setResultPos(null);
  }, []);

  const sendBulk = useCallback(async () => {
    if (submitting) return;
    if (bulkItems.length === 0) {
      setError('Nothing to order');
      return;
    }
    // Group by seller_type+seller_entity_id
    type GroupKey = string;
    const groupsMap = new Map<GroupKey, BulkOrderItem[]>();
    for (const it of bulkItems) {
      if (!it.seller_type || !it.quantity || it.quantity <= 0) continue;
      const k: GroupKey = `${it.seller_type}:${it.seller_entity_id || 0}`;
      const arr = groupsMap.get(k) || [];
      arr.push(it);
      groupsMap.set(k, arr);
    }
    if (groupsMap.size === 0) {
      setError('No valid items to send');
      return;
    }
    const groups = Array.from(groupsMap.values()).map(items => ({
      seller_type: items[0].seller_type,
      seller_entity_id: items[0].seller_entity_id,
      items: items.map(it => ({
        ingredient_id: it.ingredient_id,
        ingredient_seller_product_id: it.ingredient_seller_product_id,
        quantity_ordered: it.quantity,
        unit_price: it.unit_price
      }))
    }));

    setSubmitting(true);
    setError(null);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ groups, auto_submit: true })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || 'Failed to send bulk order');
        return;
      }
      const orders = (data.data?.orders || []).map((o: any) => {
        const sellerKey = `${o.seller_type}:${o.seller_entity_id || 0}`;
        const groupItems = groupsMap.get(sellerKey) || [];
        const sellerName = groupItems[0]?.seller_name || null;
        return { id: o.id, po_number: o.po_number, status: o.status, seller_name: sellerName };
      });
      setResultPos(orders);
      // Selection is cleared so user can immediately do another batch
      setSelectedIds(new Set());
      // Refresh suggestions after orders submitted
      loadSuggestions();
    } catch (err) {
      console.error('[useBulkOrder] sendBulk error:', err);
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  }, [bulkItems, submitting, loadSuggestions]);

  return {
    // Suggestions data
    suggestionsById,
    loadingSuggestions,
    loadSuggestions,
    // Selection
    selectedIds,
    toggleSelect,
    clearSelection,
    selectAllSuggested,
    // Bulk modal
    showBulkModal,
    bulkItems,
    submitting,
    error,
    resultPos,
    openBulk,
    closeBulk,
    updateBulkItem,
    removeBulkItem,
    sendBulk
  };
}
