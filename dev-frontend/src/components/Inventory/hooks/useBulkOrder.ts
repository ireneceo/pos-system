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
  /** «발주 대기»(아직 안 보낸 초안) 양 — 재고 단위 / 주문 단위. 표시·기본 수량 빼기 전용 (2026-11-10 Fable §1-3) */
  in_staging?: number;
  in_staging_order_qty?: number;
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
 *   5. send() — POST /api/purchase-orders/bulk { groups, source: 'stock' } → 발주 대기(초안)에만 담김
 */
export function useBulkOrder() {
  const [suggestionsById, setSuggestionsById] = useState<Map<number, SuggestionRow>>(new Map());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkItems, setBulkItems] = useState<BulkOrderItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultPos, setResultPos] = useState<Array<{ id: number; po_number: string; seller_name: string | null; status: string; merged?: boolean; item_count?: number }> | null>(null);
  const [summary, setSummary] = useState<ForesightSummary | null>(null);
  const [noBasisIds, setNoBasisIds] = useState<Set<number>>(new Set());
  /** 숫자를 안 정한(자동) 품목의 발주 기준 — 목록 «발주 기준» 칸 «자동 · n» (2026-11-10) */
  /** «발주 담기» 로 열었는가(창 안 «곧 부족도 담기» 체크는 이때만) · 그 체크 상태 */
  const [neededMode, setNeededMode] = useState(false);
  const [soonIncluded, setSoonIncluded] = useState(false);
  const [autoLevels, setAutoLevels] = useState<Map<number, number>>(new Map());
  const [computedAt, setComputedAt] = useState<string | null>(null);
  /** 모달 맨 아래 «연결 필요» 묶음 — 보내지 않는다(소리 없이 빼지 않고 보여 준다 §5-3) */
  const [unlinkedItems, setUnlinkedItems] = useState<SuggestionRow[]>([]);
  /** 이미 발주 대기에 담겨 이번에 더 담을 게 없는 줄 — 소리 없이 빼지 않고 맨 아래 묶음으로 보여 준다(2026-11-10 Fable §2-2) */
  const [stagedItems, setStagedItems] = useState<SuggestionRow[]>([]);
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
      setAutoLevels(new Map<number, number>(Object.entries(data.data?.auto_levels || {}).map(([k, v]) => [Number(k), Number(v)])));
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
            in_staging: Number(it.in_staging) || 0,
            in_staging_order_qty: Number(it.in_staging_order_qty) || 0,
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
  const fullQtyOf = (s: SuggestionRow) => (s.order_qty != null && s.order_qty > 0 ? s.order_qty : (s.suggested_qty || 1));
  // 이미 발주 대기에 담긴 양은 뺀다(같은 줄이 합쳐져 두 배가 되는 것 방지 · 2026-11-10 Fable §2-2). 0 이면 «이미 담김» 묶음.
  const qtyOf = (s: SuggestionRow) => {
    const left = fullQtyOf(s) - (s.in_staging_order_qty || 0);
    return left > 0 ? Math.round(left * 100) / 100 : 0;
  };

  const openWith = useCallback((ids: number[], unlinked: SuggestionRow[]) => {
    const items: BulkOrderItem[] = [];
    const staged: SuggestionRow[] = [];
    for (const id of ids) {
      const sugg = suggestionsById.get(id);
      if (!sugg || !sugg.seller_type) continue;
      const q = qtyOf(sugg);
      if (q > 0) items.push({ ...sugg, quantity: q });
      else staged.push(sugg);
    }
    setBulkItems(items);
    setStagedItems(staged);
    setUnlinkedItems(unlinked);
    setError(null);
    setErrorViolations(null);
    setResultPos(null);
    setShowBulkModal(true);
  }, [suggestionsById]);

  const openBulk = useCallback(() => {
    setNeededMode(false);
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
    const linked = rows.filter(s => s.seller_type).map(s => s.ingredient_id);
    setSelectedIds(new Set(linked));
    openWith(linked, rows.filter(s => !s.seller_type));
    setNeededMode(true);
    setSoonIncluded(includeSoon);
  }, [suggestionsById, openWith]);

  /**
   * 일괄 발주 창 맨 위 «7일 안에 부족해질 n개도 같이 담기» (2026-11-10 §2-6 — 띠에서 창 안으로 옮김).
   *   켜면 곧 부족 줄을 더하고 끄면 뺀다. 이미 고친 다른 줄 수량은 건드리지 않는다.
   */
  const soonRows = Array.from(suggestionsById.values()).filter(s => s.status === 'soon');
  const soonLinkedCount = soonRows.filter(s => s.seller_type && qtyOf(s) > 0).length;
  const toggleSoonInModal = useCallback((on: boolean) => {
    setSoonIncluded(on);
    const soon = Array.from(suggestionsById.values()).filter(s => s.status === 'soon');
    if (on) {
      setBulkItems(prev => {
        const have = new Set(prev.map(x => x.ingredient_id));
        const add = soon.filter(s => s.seller_type && qtyOf(s) > 0 && !have.has(s.ingredient_id)).map(s => ({ ...s, quantity: qtyOf(s) }));
        return [...prev, ...add];
      });
      setUnlinkedItems(prev => {
        const have = new Set(prev.map(x => x.ingredient_id));
        return [...prev, ...soon.filter(s => !s.seller_type && !have.has(s.ingredient_id))];
      });
      setStagedItems(prev => {
        const have = new Set(prev.map(x => x.ingredient_id));
        return [...prev, ...soon.filter(s => s.seller_type && qtyOf(s) <= 0 && !have.has(s.ingredient_id))];
      });
    } else {
      setBulkItems(prev => prev.filter(x => x.status !== 'soon'));
      setUnlinkedItems(prev => prev.filter(x => x.status !== 'soon'));
      setStagedItems(prev => prev.filter(x => x.status !== 'soon'));
    }
  }, [suggestionsById]);

  /**
   * 창 안 «연결 필요» 줄에서 공급처를 연결하고 전망을 다시 읽으면(loadSuggestions) 그 줄을 위 발주 줄로 올린다
   *   (2026-11-10 Irene «주문까지 유연하게 편하게 심플하게 이어질 수 있게»). 다른 줄 수량은 건드리지 않는다.
   */
  useEffect(() => {
    if (!showBulkModal || unlinkedItems.length === 0) return;
    const nowLinked = unlinkedItems
      .map(u => suggestionsById.get(u.ingredient_id))
      .filter((s): s is SuggestionRow => !!s && !!s.seller_type);
    if (nowLinked.length === 0) return;
    const movedIds = new Set(nowLinked.map(s => s.ingredient_id));
    setUnlinkedItems(prev => prev.filter(u => !movedIds.has(u.ingredient_id)));
    setBulkItems(prev => {
      const have = new Set(prev.map(x => x.ingredient_id));
      return [...prev, ...nowLinked.filter(s => qtyOf(s) > 0 && !have.has(s.ingredient_id)).map(s => ({ ...s, quantity: qtyOf(s) }))];
    });
    setStagedItems(prev => {
      const have = new Set(prev.map(x => x.ingredient_id));
      return [...prev, ...nowLinked.filter(s => qtyOf(s) <= 0 && !have.has(s.ingredient_id))];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionsById, showBulkModal, unlinkedItems]);

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
        // 2026-11-10 Fable 설계(.claude/fable-design-20261110-stock-order-to-staging.md §1-1): 바로 보내지 않는다.
        //   발주 대기(초안)에만 담고 «재고에서 담음» 기록을 남긴다. 판매자에게 나가는 곳은 발주 대기 화면 Submit 하나.
        body: JSON.stringify({ groups, source: 'stock' })
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
        return { id: o.id, po_number: o.po_number, status: o.status, seller_name: sellerName, merged: !!o.merged, item_count: groupItems.length };
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
    autoLevels,
    computedAt,
    unlinkedItems,
    stagedItems,
    errorViolations,
    openNeeded,
    neededMode,
    soonIncluded,
    soonLinkedCount,
    toggleSoonInModal,
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
