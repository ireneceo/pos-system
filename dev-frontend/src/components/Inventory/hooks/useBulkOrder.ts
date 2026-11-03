import { useCallback, useEffect, useState } from 'react';
import { getAuthToken } from '../../../utils/auth';
import type { OrderWindows } from '../../../utils/orderCutoff';

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
  /** 브랜드(BG) 본사 재고아이템 줄이면 그 id — 이때 ingredient_id 자리도 같은 id(목록 키)라 보내는 칸만 다르다 (2026-10-09 Fable C-1 #5) */
  product_ingredient_id?: number | null;
  // ── 재고 전망 (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-oneclick-po.md §4-1) ──
  /** out = 품절(약속한 양을 빼면 없음) · order_now = 지금 발주 · soon = 7일 안에 발주점 */
  status?: ForesightStatus;
  days_of_cover?: number | null;
  daily_usage?: number;
  usage_source?: 'ledger' | 'manual' | 'none';
  /** BG: 매장이 이미 주문해 둔 미출고 양(재고 단위) */
  committed?: number;
  available?: number;
  on_order?: number;
  /** 재고 단위 제안 — suggested_qty(주문 단위)와 다름 */
  suggested_stock_qty?: number;
  /** 주문 단위 수량(올림 + 판매자 최소주문) — 연결 없으면 null */
  order_qty?: number | null;
  order_unit?: string | null;
  unit_conversion?: number | null;
  min_order_qty?: number | null;
  delivery_terms?: DeliveryTerms | null;
  order_windows?: OrderWindows | null;
}

export type ForesightStatus = 'out' | 'order_now' | 'soon';
export interface DeliveryTerms { min_order_amount: number | null; delivery_fee: number | null; currency: string | null }
export interface ForesightSummary { out: number; order_now: number; soon: number; ok: number; no_basis: number; unlinked: number; total: number }

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
  const [resultPos, setResultPos] = useState<Array<{ id: number; po_number: string; seller_name: string | null; status: string; merged?: boolean }> | null>(null);
  const [summary, setSummary] = useState<ForesightSummary | null>(null);
  const [noBasisIds, setNoBasisIds] = useState<Set<number>>(new Set());
  const [computedAt, setComputedAt] = useState<string | null>(null);
  /** 모달 맨 아래 «연결 필요» 묶음 — 보내지 않는다(소리 없이 빼지 않고 보여 준다 §5-3) */
  const [unlinkedItems, setUnlinkedItems] = useState<SuggestionRow[]>([]);
  /** 서버 400 BELOW_MIN_ORDER 의 줄 목록 — 모달이 minOrderViolationText 로 푼다 */
  const [errorViolations, setErrorViolations] = useState<any[] | null>(null);

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
        setSummary(null);
        return;
      }
      const groups = data.data?.groups || [];
      setSummary(data.data?.summary || null);
      setNoBasisIds(new Set<number>((data.data?.no_basis_ids || []).map((x: any) => Number(x))));
      setComputedAt(data.data?.computed_at || null);
      const num = (v: any) => (v === null || v === undefined || v === '' ? null : Number(v));
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
            unit_price: parseFloat(it.seller_source?.unit_price) || 0,
            product_ingredient_id: it.product_ingredient_id ?? null,
            status: it.status,
            days_of_cover: num(it.days_of_cover),
            daily_usage: Number(it.daily_usage) || 0,
            usage_source: it.usage_source,
            committed: Number(it.committed) || 0,
            available: Number(it.available) || 0,
            on_order: Number(it.on_order) || 0,
            suggested_stock_qty: Number(it.suggested_stock_qty) || 0,
            order_qty: num(it.order_qty),
            order_unit: it.order_unit ?? null,
            unit_conversion: num(it.unit_conversion),
            min_order_qty: num(it.min_order_qty),
            delivery_terms: g.delivery_terms || null,
            order_windows: g.order_windows || null
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

  // 수량 = 주문 단위 order_qty(올림 + 판매자 최소주문). 옛 응답이면 suggested_qty.
  const qtyOf = (s: SuggestionRow) => (s.order_qty != null && s.order_qty > 0 ? s.order_qty : (s.suggested_qty || 1));

  const openWith = useCallback((ids: number[], unlinked: SuggestionRow[]) => {
    const items: BulkOrderItem[] = [];
    for (const id of ids) {
      const sugg = suggestionsById.get(id);
      if (sugg && sugg.seller_type) items.push({ ...sugg, quantity: qtyOf(sugg) });
    }
    setBulkItems(items);
    setUnlinkedItems(unlinked);
    setError(null);
    setErrorViolations(null);
    setResultPos(null);
    setShowBulkModal(true);
  }, [suggestionsById]);

  const openBulk = useCallback(() => {
    const ids = Array.from(selectedIds);
    // 체크는 연결 있는 줄만 가능하다 — 체크한 것 중 연결 없는 것이 있으면(옛 선택) 빼지 말고 보여 준다
    const unlinked = ids.map(id => suggestionsById.get(id)).filter((s): s is SuggestionRow => !!s && !s.seller_type);
    openWith(ids, unlinked);
  }, [selectedIds, suggestionsById, openWith]);

  /**
   * «필요한 것 담기» — 품절·지금 발주(+ 켜면 곧 부족) 중 판매처 연결 있는 것을 전부 골라 모달을 연다.
   *   연결 없는 것은 모달 맨 아래 «연결 필요» 로 보여 주고 보내지 않는다. 확인 없이 보내지는 않는다(모달 Send).
   */
  const openNeeded = useCallback((includeSoon: boolean) => {
    const want = (s: SuggestionRow) => s.status === 'out' || s.status === 'order_now' || (includeSoon && s.status === 'soon');
    const rows = Array.from(suggestionsById.values()).filter(want);
    const linked = rows.filter(s => s.seller_type && qtyOf(s) > 0).map(s => s.ingredient_id);
    setSelectedIds(new Set(linked));
    openWith(linked, rows.filter(s => !s.seller_type));
  }, [suggestionsById, openWith]);

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
        // 브랜드 재고아이템 줄은 product_ingredient_id 로 보낸다 — 서버 발주 생성이 그 칸으로 재고아이템 줄을 만든다
        ...(it.product_ingredient_id ? { product_ingredient_id: it.product_ingredient_id } : { ingredient_id: it.ingredient_id }),
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
        setErrorViolations(data?.code === 'BELOW_MIN_ORDER' ? (data?.data?.violations || []) : null);
        setError(data?.message || 'Failed to send bulk order');
        return;
      }
      const orders = (data.data?.orders || []).map((o: any) => {
        const sellerKey = `${o.seller_type}:${o.seller_entity_id || 0}`;
        const groupItems = groupsMap.get(sellerKey) || [];
        const sellerName = groupItems[0]?.seller_name || null;
        return { id: o.id, po_number: o.po_number, status: o.status, seller_name: sellerName, merged: !!o.merged };
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
    summary,
    noBasisIds,
    computedAt,
    unlinkedItems,
    errorViolations,
    openNeeded,
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
