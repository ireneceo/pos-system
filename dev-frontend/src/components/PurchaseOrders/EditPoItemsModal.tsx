/**
 * EditPoItemsModal — 매장이 보낸 발주를 품목별로 고친다 (2026-10-15 Fable 설계 `.claude/fable-design-20261015-buyer-po-edit.md` §5-1)
 *
 * Irene: «미스 발주 했을 때 다 삭제하고 다시 하기에 너무 힘들어. 아이템별 삭제 그리고 아이템추가(해당공급업체 것)을 발주내역에서»
 *
 * 판매자 «Edit order items» 창(IncomingOrdersView)과 같은 모양 — 줄 빼기 · 수량 · 이 공급업체 상품 추가 · 이유.
 *   - 후보는 서버 GET /purchase-orders/:id/amendable-products(이 판매자 상품 중 내 재고에 연결된 것)만.
 *   - 단가는 서버가 다시 채운다 — 여기 금액은 미리보기. 배송비는 저장 뒤 서버가 다시 계산한다.
 *   - 남기는 줄은 item_id 를 보내 고른 옵션이 따라간다. 새 줄은 옵션 없음.
 *   - 열 수 있는지(상태·청구서·결제·수령·발송)는 서버 can_amend 하나로 정한다 — 상태 목록을 화면에 복사하지 않는다.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput, FormTextArea } from '../UI/Modal';
import SearchableSelect from '../Common/SearchableSelect';
import { getAuthToken } from '../../utils/auth';
import { withOwnerPoScope } from '../../utils/ownerPoScope';
import { getCurrencySymbol } from '../../utils/currency';
import { poItemName } from '../../utils/poShare';

interface AmendProduct {
  ingredient_seller_product_id: number;
  name?: string | null;
  stock_name?: string | null;
  unit_price: number;
  unit?: string | null;
  min_order_quantity?: number | null;
}

interface EditLine {
  key: string;
  item_id?: number;
  ingredient_seller_product_id: number | null;
  quantity_ordered: string;
  /** 남기는 줄: 지금 단가(옵션 포함) · 이름 */
  unit_price?: number;
  label?: string;
  sub?: string | null;
}

interface Props {
  open: boolean;
  po: {
    id: number;
    currency?: string;
    subtotal?: number | string;
    total_amount?: number | string;
    items: Array<any>;
  } | null;
  role?: string;
  zIndex?: number;
  onClose: () => void;
  /** 저장 성공 — 서버가 돌려준 발주(status 로 승인 대기 여부를 안다) */
  onSaved: (po: any) => void;
}

const ERROR_CODES = ['BAD_STATUS', 'ALREADY_INVOICED', 'ALREADY_RECONCILED', 'ALREADY_PAID', 'ALREADY_RECEIVED', 'ALREADY_SHIPPED', 'EMPTY_ITEMS'];

const EditPoItemsModal: React.FC<Props> = ({ open, po, role, zIndex, onClose, onSaved }) => {
  const { t } = useTranslation('purchaseOrders');
  const [lines, setLines] = useState<EditLine[]>([]);
  const [products, setProducts] = useState<AmendProduct[]>([]);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approvalNote, setApprovalNote] = useState(false);
  const [isExternal, setIsExternal] = useState(false);

  const money = (n: number | string | null | undefined) => {
    const v = Number(n);
    return `${getCurrencySymbol(po?.currency || 'MYR')} ${(Number.isFinite(v) ? v : 0).toFixed(2)}`;
  };

  useEffect(() => {
    if (!open || !po) return;
    setReason('');
    setError(null);
    setSaving(false);
    setLines((po.items || []).map((it: any, i: number) => {
      const nm = poItemName(it);
      return {
        key: `l${i}-${it.id}`,
        item_id: it.id,
        ingredient_seller_product_id: it.ingredient_seller_product_id ?? null,
        quantity_ordered: String(Number(it.quantity_ordered) || 0),
        unit_price: Number(it.unit_price) || 0,
        label: nm.main,
        sub: [nm.sub, it.unit].filter(Boolean).join(' · ') || null
      };
    }));
    setProducts([]);
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(withOwnerPoScope(`/api/purchase-orders/${po.id}/amendable-products`, role), {
          headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        const data = await res.json();
        if (!res.ok || !data?.success) {
          setError(data?.message || (t('detail.editItems.loadFailed', 'Failed to load products') as string));
          return;
        }
        setProducts(data.data?.products || []);
        setApprovalNote(data.data?.approval_required_on_edit === true);
        setIsExternal(data.data?.is_external === true);
        if (data.data?.can_amend === false && data.data?.blocked) {
          setError(t(`detail.editItems.error.${data.data.blocked}`, data.data.blocked) as string);
        }
      } catch (e) {
        console.error('amendable-products failed:', e);
        setError(t('detail.editItems.loadFailed', 'Failed to load products') as string);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, po, role, t]);

  const productById = (id: number | null) => products.find(p => p.ingredient_seller_product_id === id);
  const unitPriceOf = (l: EditLine) => (l.item_id ? (l.unit_price || 0) : (productById(l.ingredient_seller_product_id)?.unit_price || 0));
  const newSubtotal = useMemo(() => lines.reduce((sum, l) => {
    const q = parseFloat(l.quantity_ordered);
    return sum + (Number.isFinite(q) && q > 0 ? Math.round(q * unitPriceOf(l) * 100) / 100 : 0);
  }, 0), [lines, products]); // eslint-disable-line react-hooks/exhaustive-deps
  const oldSubtotal = po ? (po.subtotal != null ? Number(po.subtotal)
    : (po.items || []).reduce((s: number, it: any) => s + Number(it.line_total ?? (Number(it.quantity_ordered) * Number(it.unit_price))), 0)) : 0;

  const invalid = lines.some(l => !l.ingredient_seller_product_id || !(parseFloat(l.quantity_ordered) > 0));
  const canSave = lines.length > 0 && !invalid && !saving && !loading;
  const usedIds = new Set(lines.map(l => l.ingredient_seller_product_id).filter(Boolean));

  const handleSave = async () => {
    if (!po || !canSave) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(withOwnerPoScope(`/api/purchase-orders/${po.id}/amend`, role), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAuthToken()}` },
        body: JSON.stringify({
          reason: reason.trim() || undefined,
          items: lines.map(l => ({
            ...(l.item_id ? { item_id: l.item_id } : {}),
            ingredient_seller_product_id: l.ingredient_seller_product_id,
            quantity_ordered: parseFloat(l.quantity_ordered)
          }))
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        const code = data?.code;
        if (code === 'BELOW_MIN_ORDER') {
          const v = (data?.data?.violations || [])[0];
          setError(t('detail.editItems.error.BELOW_MIN_ORDER', 'Below the minimum order quantity{{detail}}', {
            // 서버 utils/poMinOrder violations = { description, quantity, min, unit }
            detail: v ? ` — ${v.description || ''}: ${v.min ?? ''} ${v.unit || ''}`.trimEnd() : ''
          }) as string);
        } else if (code && ERROR_CODES.includes(code)) {
          setError(t(`detail.editItems.error.${code}`, data?.message || code) as string);
        } else {
          setError(data?.message || (t('detail.editItems.saveFailed', 'Failed to save changes') as string));
        }
        return;
      }
      onSaved(data.data);
    } catch (e) {
      console.error('amend failed:', e);
      setError(t('detail.editItems.saveFailed', 'Failed to save changes') as string);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      zIndex={zIndex}
      onClose={() => !saving && onClose()}
      title={t('detail.editItems.title', 'Edit items') as string}
      size="large"
      footer={
        <>
          <ModalButton type="button" onClick={onClose} disabled={saving}>
            {t('common.cancel', 'Cancel')}
          </ModalButton>
          <ModalButton type="button" variant="primary" onClick={handleSave} disabled={!canSave}>
            {saving ? t('common.submitting', 'Saving…') : t('detail.editItems.save', 'Save changes')}
          </ModalButton>
        </>
      }
    >
      {loading ? (
        <div style={{ padding: 24, textAlign: 'center', color: '#6B7280', fontSize: 14 }}>
          {t('ownerApprovals.loading', 'Loading…')}
        </div>
      ) : (
        <>
          {lines.map((line, idx) => {
            const q = parseFloat(line.quantity_ordered);
            const lineTotal = Number.isFinite(q) && q > 0 ? Math.round(q * unitPriceOf(line) * 100) / 100 : 0;
            return (
              <div
                key={line.key}
                style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}
              >
                <div style={{ flex: '2 1 240px', minWidth: 0 }}>
                  <FormLabel>{t('detail.items.ingredient', 'Item')}</FormLabel>
                  {line.item_id ? (
                    <div style={{ padding: '8px 0' }}>
                      <strong style={{ fontSize: 14, color: '#111827' }}>{line.label}</strong>
                      {line.sub && <div style={{ fontSize: 12, color: '#6B7280' }}>{line.sub}</div>}
                    </div>
                  ) : (
                    <SearchableSelect
                      options={products
                        .filter(p => !usedIds.has(p.ingredient_seller_product_id) || p.ingredient_seller_product_id === line.ingredient_seller_product_id)
                        .map(p => ({
                          value: p.ingredient_seller_product_id,
                          label: p.stock_name || p.name || '-',
                          subLabel: `${p.name && p.name !== p.stock_name ? `${p.name} · ` : ''}${money(p.unit_price)}${p.unit ? ` / ${p.unit}` : ''}${Number(p.min_order_quantity) > 1 ? ` · ${t('detail.editItems.minQty', 'min {{n}}', { n: Number(p.min_order_quantity) })}` : ''}`
                        }))}
                      value={line.ingredient_seller_product_id}
                      onChange={(v) => setLines(prev => prev.map((l, i) => {
                        if (i !== idx) return l;
                        const id = v === null ? null : Number(v);
                        // 최소주문이 정해진 상품(1 이 아닌 값)은 그 수량으로 미리 채운다 — 서버가 미달을 거부한다(utils/poMinOrder)
                        const min = Number(productById(id)?.min_order_quantity);
                        const q = parseFloat(l.quantity_ordered);
                        return { ...l, ingredient_seller_product_id: id, quantity_ordered: Number.isFinite(min) && min > 1 && !(q >= min) ? String(min) : l.quantity_ordered };
                      }))}
                      placeholder={t('detail.editItems.choose', 'Search a product from this supplier') as string}
                      noOptionsMessage={t('detail.editItems.noProducts', 'No other product from this supplier is linked to your stock') as string}
                      allowClear
                    />
                  )}
                </div>
                <div style={{ flex: '0 1 110px' }}>
                  <FormLabel>{t('detail.items.qtyOrdered', 'Qty')}</FormLabel>
                  <FormInput
                    type="number"
                    min="0"
                    step="any"
                    value={line.quantity_ordered}
                    onChange={(e) => setLines(prev => prev.map((l, i) => i === idx ? { ...l, quantity_ordered: e.target.value } : l))}
                  />
                </div>
                <div style={{ flex: '0 1 110px', textAlign: 'right', paddingBottom: 8, fontSize: 13, color: '#374151' }}>
                  {money(lineTotal)}
                </div>
                <div style={{ paddingBottom: 4 }}>
                  <ModalButton
                    type="button"
                    variant="danger"
                    onClick={() => setLines(prev => prev.filter((_, i) => i !== idx))}
                    title={t('detail.editItems.removeLine', 'Remove this item') as string}
                    aria-label={t('detail.editItems.removeLine', 'Remove this item') as string}
                  >
                    ✕
                  </ModalButton>
                </div>
              </div>
            );
          })}

          {lines.length === 0 && (
            <p style={{ margin: '12px 0', fontSize: 13, color: '#92400E' }}>
              {t('detail.editItems.emptyHint', 'At least one item must remain. To remove everything, cancel the order instead.')}
            </p>
          )}

          <div style={{ margin: '12px 0 16px' }}>
            <ModalButton
              type="button"
              onClick={() => setLines(prev => [...prev, { key: `new-${Date.now()}-${prev.length}`, ingredient_seller_product_id: null, quantity_ordered: '1' }])}
              disabled={products.length === 0}
            >
              + {t('detail.editItems.addItem', 'Add item')}
            </ModalButton>
          </div>

          <div style={{
            background: '#F9FAFB', borderRadius: 8, padding: '12px 14px', margin: '0 0 8px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8
          }}>
            <span style={{ fontSize: 13, color: '#6B7280' }}>{t('detail.editItems.itemsTotal', 'Items total')}</span>
            <span style={{ fontSize: 14 }}>
              <span style={{ color: '#9CA3AF', textDecoration: 'line-through' }}>{money(oldSubtotal)}</span>
              {'  →  '}
              <strong style={{ color: '#111827' }}>{money(newSubtotal)}</strong>
            </span>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: '#6B7280' }}>
            {t('detail.editItems.deliveryNote', 'Prices and delivery fee are recalculated by the system when you save.')}
          </p>

          {approvalNote && (
            <div style={{
              background: '#FFFBEB', borderLeft: '4px solid #F59E0B', borderRadius: '0 8px 8px 0',
              color: '#92400E', fontSize: 13, padding: '10px 14px', margin: '0 0 16px', lineHeight: 1.6
            }}>
              {t('detail.editItems.approvalNote', 'Saving sends this change to the Owner for approval. The supplier will not see it until it is approved.')}
            </div>
          )}
          {isExternal && (
            <div style={{
              background: '#EEF2FF', borderLeft: '4px solid #635BFF', borderRadius: '0 8px 8px 0',
              color: '#3730A3', fontSize: 13, padding: '10px 14px', margin: '0 0 16px', lineHeight: 1.6
            }}>
              {t('detail.editItems.externalResendNote', 'This supplier does not use the app. After saving, send the updated order again by WhatsApp or Email.')}
            </div>
          )}

          <FormGroup>
            <FormLabel>{t('detail.editItems.reason', 'Reason (optional)')}</FormLabel>
            <FormTextArea
              rows={2}
              value={reason}
              maxLength={1000}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t('detail.editItems.reasonPlaceholder', 'e.g. Ordered the wrong item') as string}
            />
          </FormGroup>

          {error && (
            <div role="alert" style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#991B1B', fontSize: 13 }}>
              {error}
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default EditPoItemsModal;
