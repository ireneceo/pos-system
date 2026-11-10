import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ThemedButton } from '../Theme/ThemedButton';
import VerdictBadge from '../Inventory/VerdictBadge';
import { getAuthToken } from '../../utils/auth';
import { formatQuantity } from '../../utils/unitConversion';

/**
 * PAR 재주문 추천 — 발주 화면·재고 화면 공용 (2026-11-10 Irene «이 메뉴가 재고관리랑 발주관리에 나와야지.
 *   그리고 항목별로 선택해서 PO로 보내게 해줘. 한번에만 가니까 사용하기 어려워»).
 *   - 데이터 = GET /api/purchase-orders/suggestions (재고 화면 일괄 발주와 같은 응답 · 공식 reorderMath 하나 — 여기서 계산 안 함)
 *   - 공급처 묶음마다 줄 체크(기본 전부 체크) · «Create PO (n)» = 체크한 줄만 새 발주 화면(?items=)에 담아 연다.
 *     바로 보내지 않는다 — 새 발주 화면에서 수량을 고치고 저장/제출한다(재고 화면 «바로 발주 금지» 규칙과 같음).
 */

export interface ParSuggestionItem {
  ingredient_id: number;
  product_ingredient_id?: number | null;
  ingredient_name: string;
  current_stock: number | string;
  suggested_quantity: number | string;
  status?: 'out' | 'order_now' | 'soon' | null;
  order_unit?: string | null;
}

export interface ParSuggestionGroup {
  seller_id: number | null;
  seller_type: string | null;
  seller_name: string | null;
  items: ParSuggestionItem[];
}

const itemKeyOf = (i: ParSuggestionItem) => (i.product_ingredient_id ? `pi-${i.product_ingredient_id}` : `i-${i.ingredient_id}`);
const groupKeyOf = (g: ParSuggestionGroup, idx: number) => `${g.seller_type || 'none'}-${g.seller_id ?? `x${idx}`}`;

/** 응답을 묶음 목록으로 — 서버는 groups[{ seller_type, seller_entity_id, seller_name, items:[{ ingredient, suggested_qty, ... }] }] */
function normalize(payload: any): ParSuggestionGroup[] {
  if (Array.isArray(payload?.groups)) {
    return payload.groups.map((g: any) => ({
      seller_id: g.seller_id ?? g.seller_entity_id ?? null,
      seller_type: g.seller_type ?? null,
      seller_name: g.seller_name ?? null,
      items: (g.items || []).map((it: any) => it && it.ingredient ? {
        ingredient_id: it.product_ingredient_id ? 0 : it.ingredient.id,
        product_ingredient_id: it.product_ingredient_id ?? null,
        ingredient_name: it.ingredient.name,
        current_stock: it.ingredient.current_stock,
        suggested_quantity: it.suggested_qty,
        status: it.status ?? null,
        order_unit: it.order_unit ?? null,
      } : it),
    }));
  }
  if (Array.isArray(payload?.items)) {
    const map = new Map<string, ParSuggestionGroup>();
    for (const it of payload.items as any[]) {
      const key = `${it.preferred_seller_type || ''}:${it.preferred_seller_id ?? 'none'}`;
      if (!map.has(key)) {
        map.set(key, { seller_id: it.preferred_seller_id ?? null, seller_type: it.preferred_seller_type ?? null, seller_name: it.preferred_seller_name ?? null, items: [] });
      }
      map.get(key)!.items.push(it);
    }
    return Array.from(map.values());
  }
  return Array.isArray(payload) ? payload : [];
}

/** 추천 읽기 — enabled=false 면 읽지 않는다(오너는 발주를 만들지 않음). refreshKey 가 바뀌면 다시 읽는다. */
export function useParSuggestions(enabled: boolean, refreshKey?: unknown) {
  const [groups, setGroups] = useState<ParSuggestionGroup[]>([]);
  const load = useCallback(async () => {
    if (!enabled) { setGroups([]); return; }
    try {
      const res = await fetch('/api/purchase-orders/suggestions', { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const data = await res.json();
      setGroups(res.ok && data.success ? normalize(data.data || {}) : []);
    } catch (err) {
      console.error('Failed to fetch PO suggestions:', err);
      setGroups([]);
    }
  }, [enabled]);
  useEffect(() => { load(); }, [load, refreshKey]);
  const count = useMemo(() => groups.reduce((s, g) => s + g.items.length, 0), [groups]);
  return { groups, count, reload: load };
}

/** 머리줄 «▲ n PAR suggestions» 버튼 — 0건이면 안 보인다 */
export const ParSuggestionsBadge: React.FC<{ count: number; onClick: () => void }> = ({ count, onClick }) => {
  const { t } = useTranslation(['purchaseOrders']);
  if (count <= 0) return null;
  return (
    <ThemedButton
      type="button"
      size="small"
      variant="outline"
      onClick={onClick}
      style={{ borderColor: '#FCD34D', background: '#FFFBEB', color: '#92400E', borderRadius: 999 }}
    >
      ▲ {t('purchaseOrders:list.suggestions.badge', { n: count })}
    </ThemedButton>
  );
};

const Panel = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  h3 { margin: 0 0 4px; font-size: 16px; color: #0A2540; }
  p { margin: 0; font-size: 13px; color: #4B5563; line-height: 1.5; }
`;

const GroupBox = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  &:last-child { margin-bottom: 0; }
`;

const GroupHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  label { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
  strong { color: #0A2540; font-size: 14px; }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #1F2937;

  li { border-bottom: 1px dashed #F1F4F8; }
  li:last-child { border-bottom: none; }
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
    flex-wrap: wrap;
  }
  label.on { cursor: pointer; }
  label.off { color: #6B7280; }
  .name { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
  input[type='checkbox'] { width: 18px; height: 18px; flex-shrink: 0; accent-color: #635BFF; }
`;

export interface ParPickedLine { ingredient_id?: number; product_ingredient_id?: number; quantity: number }

interface PanelProps {
  groups: ParSuggestionGroup[];
  onClose: () => void;
  /** 주면 새 화면으로 가지 않고 이 함수로 넘긴다(발주 화면 = 같은 화면 장바구니에 바로 담기) */
  onAddToOrder?: (lines: ParPickedLine[]) => void;
}

/** 추천 창 — 줄마다 체크, 묶음마다 «Create PO (체크 수)». 체크한 줄만 새 발주 화면으로 넘긴다. */
export const ParSuggestionsPanel: React.FC<PanelProps> = ({ groups, onClose, onAddToOrder }) => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  // 꺼 둔 줄만 기억한다 → 새로 들어온 줄은 기본 체크(예전 «한 번에 전부» 동작이 기본값으로 남음)
  const [unchecked, setUnchecked] = useState<Set<string>>(new Set());

  const toggle = (k: string) => setUnchecked(prev => {
    const next = new Set(prev);
    if (next.has(k)) next.delete(k); else next.add(k);
    return next;
  });

  const setGroupAll = (g: ParSuggestionGroup, gk: string, on: boolean) => setUnchecked(prev => {
    const next = new Set(prev);
    g.items.forEach(i => { const k = `${gk}|${itemKeyOf(i)}`; if (on) next.delete(k); else next.add(k); });
    return next;
  });

  const [addedKey, setAddedKey] = useState<string | null>(null);

  const createPO = (g: ParSuggestionGroup, gk: string, picked: ParSuggestionItem[]) => {
    if (picked.length === 0) return;
    const itemPayload: ParPickedLine[] = picked.map(i => ({
      ...(i.product_ingredient_id ? { product_ingredient_id: i.product_ingredient_id } : { ingredient_id: i.ingredient_id }),
      quantity: Number(i.suggested_quantity),
    }));
    if (onAddToOrder) { onAddToOrder(itemPayload); setAddedKey(gk); return; }
    const params = new URLSearchParams();
    if (g.seller_id != null) params.set('sellerId', String(g.seller_id));
    if (g.seller_type) params.set('sellerType', g.seller_type);
    params.set('items', encodeURIComponent(JSON.stringify(itemPayload)));
    navigate(`/pos/purchase-orders/new?${params.toString()}`);
  };

  if (groups.length === 0) return null;

  return (
    <Panel>
      <Head>
        <div>
          <h3>{t('purchaseOrders:list.suggestions.title')}</h3>
          <p>{t('purchaseOrders:list.suggestions.subtitle')}</p>
          <p>{t('purchaseOrders:list.suggestions.pickHint')}</p>
        </div>
        <ThemedButton size="small" variant="outline" onClick={onClose}>
          {t('purchaseOrders:common.close', 'Close')}
        </ThemedButton>
      </Head>
      {groups.map((g, idx) => {
        const gk = groupKeyOf(g, idx);
        // 판매처가 정해진 묶음(공급업체·브랜드·POS 카탈로그 — 카탈로그는 번호가 비어 있음)만 발주 가능. 새 발주 화면은 줄마다 기본 판매처를 다시 고른다
        const linked = !!g.seller_type;
        const picked = linked ? g.items.filter(i => !unchecked.has(`${gk}|${itemKeyOf(i)}`)) : [];
        const allOn = linked && picked.length === g.items.length;
        return (
          <GroupBox key={gk}>
            <GroupHead>
              {linked ? (
                <label>
                  <input
                    type="checkbox"
                    checked={allOn}
                    ref={el => { if (el) el.indeterminate = picked.length > 0 && !allOn; }}
                    onChange={() => setGroupAll(g, gk, !allOn)}
                    aria-label={t('purchaseOrders:list.suggestions.selectAll') as string}
                    style={{ width: 18, height: 18, accentColor: '#635BFF' }}
                  />
                  <strong>{g.seller_name || t('purchaseOrders:list.suggestions.noPreferred')}</strong>
                </label>
              ) : (
                <strong>{g.seller_name || t('purchaseOrders:list.suggestions.noPreferred')}</strong>
              )}
              {linked && (
                <ThemedButton
                  size="small"
                  variant="primary"
                  disabled={picked.length === 0}
                  title={picked.length === 0 ? (t('purchaseOrders:list.suggestions.noneSelected') as string) : undefined}
                  onClick={() => createPO(g, gk, picked)}
                >
                  {onAddToOrder
                    ? t('purchaseOrders:list.suggestions.addToOrderCount', { n: picked.length })
                    : t('purchaseOrders:list.suggestions.createPOCount', { n: picked.length })}
                </ThemedButton>
              )}
              {addedKey === gk && (
                <span style={{ flexBasis: '100%', fontSize: 12, color: '#047857' }}>✓ {t('purchaseOrders:list.suggestions.added')}</span>
              )}
            </GroupHead>
            <List>
              {g.items.map(item => {
                const k = `${gk}|${itemKeyOf(item)}`;
                const on = linked && !unchecked.has(k);
                return (
                  <li key={itemKeyOf(item)}>
                    <label className={linked ? 'on' : 'off'} title={linked ? undefined : (t('purchaseOrders:list.suggestions.noLink') as string)}>
                      <span className="name">
                        <input type="checkbox" checked={on} disabled={!linked} onChange={() => toggle(k)} />
                        {/* 단계 이름·색 = 재고 화면과 같은 배지(2026-11-10 Fable 설계 stock-simple-reorder §2-8) */}
                        {item.status && <VerdictBadge verdict={item.status} />}
                        <span>{item.ingredient_name}</span>
                      </span>
                      <span>
                        {t('purchaseOrders:list.suggestions.currentStock')}: {Number(item.current_stock).toFixed(2)} ·{' '}
                        {t('purchaseOrders:list.suggestions.suggested')}: <strong>{formatQuantity(item.suggested_quantity)}{item.order_unit ? ` ${item.order_unit}` : ''}</strong>
                      </span>
                    </label>
                  </li>
                );
              })}
            </List>
          </GroupBox>
        );
      })}
    </Panel>
  );
};
