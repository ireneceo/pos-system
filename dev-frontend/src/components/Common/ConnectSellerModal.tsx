/**
 * ConnectSellerModal — ingredient 카드의 "Connect supplier" 또는 "+ Add another seller"
 * CTA에서 호출. 페이지 이동 없이 inline 으로 catalog 검색 + 선택 + 매핑.
 *
 * Props:
 *   - open: 표시 여부
 *   - ingredient: { id, name, unit } — 매핑할 대상
 *   - buyerApiBase: '/api/restaurants/5' | '/api/brands/1' | '/api/foodcourts/7'
 *   - onClose: 닫기
 *   - onConnected: 매핑 성공 후 호출 (parent 가 재조회)
 *
 * Backend:
 *   POST `${buyerApiBase}/ingredients/from-catalog`
 *   body: { supplier_product_id | brand_product_id | foodcourt_product_id, existing_ingredient_id, unit_conversion? }
 */
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

const Backdrop = styled.div`
  position: fixed; inset: 0; background: rgba(15,23,42,0.55);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
`;
const Panel = styled.div`
  background: white; border-radius: 12px; max-width: 640px; width: 92%;
  max-height: 80vh; display: flex; flex-direction: column;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
`;
const Header = styled.div`
  padding: 20px 24px 12px; border-bottom: 1px solid #C7CED6;
  h3 { margin: 0 0 4px; font-size: 18px; color: #0A2540; }
  p { margin: 0; color: #475569; font-size: 13px; }
`;
const SearchBar = styled.div`
  padding: 12px 24px; border-bottom: 1px solid #C7CED6;
  input {
    width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #C7CED6; border-radius: 6px;
    font-size: 14px; color: #0A2540;
    &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  }
`;
const List = styled.div`
  flex: 1; overflow-y: auto; padding: 8px 12px;
`;
const Item = styled.button<{ $selected?: boolean }>`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 10px 12px; margin: 4px 0;
  background: ${p => p.$selected ? '#EEF2FF' : 'white'};
  border: 1px solid ${p => p.$selected ? '#C7D2FE' : '#C7CED6'};
  border-radius: 8px; cursor: pointer; text-align: left;
  font-family: inherit;
  &:hover { border-color: #635BFF; background: #F8F7FF; }
`;
const Badge = styled.span<{ $type: 'supplier' | 'brand' | 'foodcourt' }>`
  display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 999px;
  font-size: 10px; font-weight: 700; margin-right: 8px;
  background: ${p => p.$type === 'brand' ? '#EDE9FE' : p.$type === 'foodcourt' ? '#FCE7F3' : '#DCFCE7'};
  color: ${p => p.$type === 'brand' ? '#6D28D9' : p.$type === 'foodcourt' ? '#9D174D' : '#166534'};
`;
const Footer = styled.div`
  padding: 16px 24px; border-top: 1px solid #C7CED6;
  display: flex; gap: 8px; justify-content: flex-end; align-items: center;
`;
const Btn = styled.button<{ $variant?: 'primary' | 'ghost' | 'amber' }>`
  padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; font-family: inherit;
  background: ${p => p.$variant === 'primary' ? '#635BFF' : p.$variant === 'amber' ? '#FEF3C7' : '#F1F5F9'};
  color: ${p => p.$variant === 'primary' ? 'white' : p.$variant === 'amber' ? '#92400E' : '#475569'};
  border: 1px solid ${p => p.$variant === 'primary' ? '#635BFF' : p.$variant === 'amber' ? '#FDE68A' : '#E2E8F0'};
  &:disabled { background: #64748B; border-color: #64748B; cursor: not-allowed; }
`;
const ConvRow = styled.div`
  padding: 12px 24px; background: #F1F4F8; border-top: 1px solid #C7CED6;
  display: flex; flex-direction: column; gap: 8px;
  label { font-size: 12px; color: #475569; font-weight: 600; }
  .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  input { padding: 6px 10px; border: 1px solid #C7D2FE; border-radius: 6px; font-size: 14px; width: 100px; }
  .note { font-size: 11px; color: #475569; }
`;

interface CatalogItem {
  id: number;
  name: string;
  unit?: string | null;
  unit_price: number;
  supplier?: { id?: number; name?: string; seller_type?: 'supplier' | 'brand' | 'foodcourt' } | null;
  category_name?: string | null;
}

interface Props {
  open: boolean;
  ingredient: { id: number; name: string; unit?: string | null } | null;
  buyerApiBase: string; // e.g. '/api/restaurants/5'
  onClose: () => void;
  onConnected: () => void;
}

const UNIT_WEIGHT = ['kg', 'g'];
const UNIT_VOLUME = ['L', 'ml'];
function detectConversion(ingUnit: string, sellerUnit: string): { auto: number | null; note?: string } {
  if (!ingUnit || !sellerUnit) return { auto: 1 };
  if (ingUnit === sellerUnit) return { auto: 1 };
  if (UNIT_WEIGHT.includes(ingUnit) && UNIT_WEIGHT.includes(sellerUnit)) {
    if (ingUnit === 'kg' && sellerUnit === 'g') return { auto: 0.001, note: '1 g = 0.001 kg' };
    if (ingUnit === 'g' && sellerUnit === 'kg') return { auto: 1000, note: '1 kg = 1000 g' };
  }
  if (UNIT_VOLUME.includes(ingUnit) && UNIT_VOLUME.includes(sellerUnit)) {
    if (ingUnit === 'L' && sellerUnit === 'ml') return { auto: 0.001, note: '1 ml = 0.001 L' };
    if (ingUnit === 'ml' && sellerUnit === 'L') return { auto: 1000, note: '1 L = 1000 ml' };
  }
  return { auto: null, note: `${ingUnit} ↔ ${sellerUnit}: incompatible — please enter conversion (1 ${sellerUnit} = ? ${ingUnit})` };
}

export default function ConnectSellerModal({ open, ingredient, buyerApiBase, onClose, onConnected }: Props) {
  const { t } = useTranslation('purchaseOrders');
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [conversion, setConversion] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // 매핑된 seller_product_id 목록 (제외)
  const [alreadyMappedIds, setAlreadyMappedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open) return;
    setSelected(null); setSearch(''); setError(null);
  }, [open, ingredient?.id]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const token = getAuthToken();
    const url = `/api/supplier-catalog${search ? `?search=${encodeURIComponent(search)}` : ''}`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => {
        setItems(Array.isArray(j?.data) ? j.data : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [open, search]);

  // Fetch already-mapped seller_product ids of this ingredient
  useEffect(() => {
    if (!open || !ingredient?.id) return;
    const token = getAuthToken();
    fetch(`${buyerApiBase}/ingredients?include=sellers`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => {
        const me = (j?.data || []).find((i: any) => i.id === ingredient.id);
        const set = new Set<string>();
        (me?.sellers || []).forEach((s: any) => set.add(`${s.seller_type}:${s.seller_product_id}`));
        setAlreadyMappedIds(set);
      })
      .catch(() => setAlreadyMappedIds(new Set()));
  }, [open, ingredient?.id, buyerApiBase]);

  // Auto-detect conversion when selected changes
  useEffect(() => {
    if (!selected || !ingredient) return;
    const conv = detectConversion(ingredient.unit || '', selected.unit || '');
    setConversion(conv.auto != null ? String(conv.auto) : '');
  }, [selected, ingredient]);

  const conversionInfo = useMemo(() => {
    if (!selected || !ingredient) return null;
    return detectConversion(ingredient.unit || '', selected.unit || '');
  }, [selected, ingredient]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(i => {
      if (alreadyMappedIds.has(`${i.supplier?.seller_type || 'supplier'}:${i.id}`)) return false;
      if (!q) return true;
      return (i.name || '').toLowerCase().includes(q)
        || (i.supplier?.name || '').toLowerCase().includes(q)
        || (i.category_name || '').toLowerCase().includes(q);
    });
  }, [items, search, alreadyMappedIds]);

  if (!open || !ingredient) return null;

  const submit = async (asSeparate?: boolean) => {
    if (!selected) return;
    setBusy(true); setError(null);
    try {
      const sellerType = (selected.supplier as any)?.seller_type || 'supplier';
      const body: any = sellerType === 'brand' ? { brand_product_id: selected.id }
        : sellerType === 'foodcourt' ? { foodcourt_product_id: selected.id }
        : { supplier_product_id: selected.id };
      if (!asSeparate) {
        body.existing_ingredient_id = ingredient.id;
        const conv = parseFloat(conversion);
        if (!Number.isFinite(conv) || conv <= 0) {
          setError(t('newPo.conversion.invalid', 'Enter a valid conversion ratio (> 0).') as string);
          setBusy(false); return;
        }
        body.unit_conversion = conv;
      }
      const token = getAuthToken();
      const res = await fetch(`${buyerApiBase}/ingredients/from-catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const j = await res.json();
      if (!res.ok || !j.success) {
        setError(j?.message || 'Failed');
        setBusy(false); return;
      }
      onConnected();
      onClose();
    } catch (e: any) {
      setError(e?.message || 'Network error');
    } finally {
      setBusy(false);
    }
  };

  const isIncompatible = conversionInfo && conversionInfo.auto == null;

  // Portal to body — 표준 Modal(components/UI/Modal)도 body portal 이라, 인라인 렌더 시
  // 편집 모달 뒤로 깔리던 문제(같은 z-index 1000) 방지. portal 끼리는 렌더 순서로 위에 뜸.
  return ReactDOM.createPortal((
    <Backdrop onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Header>
          <h3>{t('connect.title', 'Connect supplier product')}</h3>
          <p>
            <strong>{ingredient.name}</strong> ({ingredient.unit || '—'}) —{' '}
            {t('connect.help', 'Pick a catalog item to link as a seller for this ingredient.')}
          </p>
        </Header>
        <SearchBar>
          <input
            type="text"
            placeholder={t('connect.searchPlaceholder', 'Search catalog by name, supplier, category...') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </SearchBar>
        <List>
          {loading ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>
              {t('connect.loading', 'Loading catalog…')}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>
              {alreadyMappedIds.size > 0
                ? t('connect.allMapped', 'All matching items are already linked.')
                : t('connect.noResults', 'No catalog items found.')}
            </div>
          ) : (
            filtered.map(it => {
              const stype = (it.supplier?.seller_type || 'supplier') as 'supplier' | 'brand' | 'foodcourt';
              const isSel = selected?.id === it.id && (selected?.supplier?.seller_type || 'supplier') === stype;
              return (
                <Item key={`${stype}-${it.id}`} type="button" $selected={isSel} onClick={() => setSelected(it)}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540' }}>
                      <Badge $type={stype}>{stype === 'brand' ? 'BRAND' : stype === 'foodcourt' ? 'FC' : 'SUP'}</Badge>
                      {it.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#4B5563' }}>
                      {it.supplier?.name || '—'}{it.category_name ? ` · ${it.category_name}` : ''} · {it.unit || '—'}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#635BFF', whiteSpace: 'nowrap' }}>
                    RM{(it.unit_price || 0).toFixed(2)}
                  </div>
                </Item>
              );
            })
          )}
        </List>

        {selected && (
          <ConvRow>
            <label>
              {t('connect.conversion', 'Unit conversion')}: 1 {selected.unit || '?'} ={' '}
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={conversion}
                onChange={(e) => setConversion(e.target.value)}
                disabled={!!(conversionInfo && conversionInfo.auto != null && !isIncompatible)}
              />
              {' '}{ingredient.unit || '?'}
            </label>
            {conversionInfo?.note && (
              <div className="note" style={{ color: isIncompatible ? '#92400E' : '#475569' }}>
                {conversionInfo.note}
              </div>
            )}
          </ConvRow>
        )}

        {error && (
          <div style={{ padding: '8px 24px', color: '#B91C1C', fontSize: 12, background: '#FEE2E2', borderTop: '1px solid #FECACA' }}>
            {error}
          </div>
        )}

        <Footer>
          <Btn type="button" $variant="ghost" onClick={onClose} disabled={busy}>
            {t('common.cancel', 'Cancel')}
          </Btn>
          {isIncompatible && (
            <Btn type="button" $variant="amber" onClick={() => submit(true)} disabled={busy || !selected}>
              {t('connect.asSeparate', '+ Add as separate ingredient')}
            </Btn>
          )}
          <Btn type="button" $variant="primary" onClick={() => submit(false)} disabled={busy || !selected || !parseFloat(conversion)}>
            {busy ? t('connect.connecting', 'Connecting…') : t('connect.connect', 'Connect')}
          </Btn>
        </Footer>
      </Panel>
    </Backdrop>
  ), document.body);
}
