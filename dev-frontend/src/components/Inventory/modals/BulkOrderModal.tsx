import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormInput } from '../../UI/Modal';
import { ThemedButton } from '../../Theme/ThemedButton';
import { formatCurrency } from '../../../utils/currency';
import { formatQuantity, minOrderViolationText } from '../../../utils/unitConversion';
import { cutoffState, cutoffClock, intlLocale, CUTOFF_COLORS } from '../../../utils/orderCutoff';
import { BulkOrderItem, SuggestionRow } from '../hooks/useBulkOrder';
import VerdictBadge from '../VerdictBadge';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: BulkOrderItem[];
  currency: string;
  submitting: boolean;
  error: string | null;
  resultPos: Array<{ id: number; po_number: string; seller_name: string | null; status: string; merged?: boolean }> | null;
  /** «연결 필요» — 판매처가 없어 보내지 않는 필요 품목(소리 없이 빼지 않는다) */
  unlinkedItems?: SuggestionRow[];
  /** 서버 400 BELOW_MIN_ORDER 줄 목록 */
  errorViolations?: any[] | null;
  /** 매장 시간대 — 마감 표시(«오늘 17:00 마감») */
  storeTz?: string;
  onUpdateItem: (id: number, patch: Partial<BulkOrderItem>) => void;
  onRemoveItem: (id: number) => void;
  onSend: () => void;
  /** «발주 담기» 로 열었을 때만 — 맨 위 «7일 안에 부족해질 n개도 같이 담기» (2026-11-10 §2-6) */
  soonToggle?: { count: number; checked: boolean; onChange: (on: boolean) => void } | null;
}

const SELLER_TYPE_LABEL: Record<string, string> = {
  supplier: 'Supplier',
  brand: 'Brand',
  foodcourt: 'Foodcourt',
  system_admin: 'POS Catalog'
};

const BulkOrderModal: React.FC<Props> = ({
  isOpen, onClose, items, currency, submitting, error, resultPos,
  onUpdateItem, onRemoveItem, onSend, unlinkedItems = [], errorViolations = null, storeTz, soonToggle = null
}) => {
  const { t, i18n } = useTranslation(['inventory', 'purchaseOrders']);
  const tPo = (key: string, opts?: any) => t(`purchaseOrders:${key}`, opts);
  const locale = intlLocale(i18n.language);
  const tz = storeTz || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const fq = (n: number | null | undefined) => formatQuantity(Number(n) || 0);

  // Group preview by seller (matches backend grouping)
  const groups = useMemo(() => {
    const map = new Map<string, BulkOrderItem[]>();
    for (const it of items) {
      const k = `${it.seller_type || 'none'}:${it.seller_entity_id || 0}`;
      const arr = map.get(k) || [];
      arr.push(it);
      map.set(k, arr);
    }
    return Array.from(map.entries()).map(([key, list]) => ({ key, items: list }));
  }, [items]);

  const grandTotal = useMemo(() =>
    items.reduce((sum, it) => sum + (it.quantity || 0) * (it.unit_price || 0), 0),
    [items]
  );

  const showResult = !!resultPos && resultPos.length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={showResult
        ? t('bulkOrder.successTitle', 'Orders sent successfully')
        : t('bulkOrder.title', 'Bulk Order — by Seller')}
      size="large"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose} disabled={submitting}>
            {showResult ? t('bulkOrder.close', 'Close') : t('bulkOrder.cancel', 'Cancel')}
          </ModalButton>
          {!showResult && (
            <ModalButton variant="primary" onClick={onSend} disabled={submitting || items.length === 0}>
              {submitting
                ? t('bulkOrder.sending', 'Sending…')
                : t('bulkOrder.sendAll', `Send ${groups.length} Order${groups.length === 1 ? '' : 's'}`)}
            </ModalButton>
          )}
        </>
      }
    >
      {showResult ? (
        <div>
          <div style={{ marginBottom: 12, padding: 12, background: '#ECFDF5', border: '1px solid #10B981', borderRadius: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#065F46' }}>
              {t('bulkOrder.successCount', { count: resultPos!.length, defaultValue: `${resultPos!.length} purchase order(s) submitted` })}
            </div>
            <div style={{ fontSize: 12, color: '#047857', marginTop: 4 }}>
              {t('bulkOrder.successHint', 'Sellers will receive a real-time notification.')}
            </div>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {resultPos!.map(po => (
              <div key={po.id} style={{
                padding: 12, border: '1px solid #C7CED6', borderRadius: 8, display: 'flex',
                justifyContent: 'space-between', alignItems: 'center', gap: 12
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#0A2540', fontSize: 14 }}>{po.po_number}</div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>
                    {po.seller_name || '—'}
                    {po.merged && <> · {t('bulkOrder.merged', 'added to your existing draft for this seller')}</>}
                  </div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '4px 10px',
                  background: '#FEF3C7', color: '#92400E', borderRadius: 999
                }}>
                  {t(`purchaseOrders:status.${po.status}`, { defaultValue: po.status })}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {error && (
            <div style={{ marginBottom: 12, padding: 12, background: '#FEF2F2', border: '1px solid #DC2626', borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: '#991B1B' }}>
                {errorViolations && errorViolations.length
                  ? `${t('bulkOrder.belowMin', 'Below the seller minimum order')}: ${minOrderViolationText(errorViolations, tPo)}`
                  : error}
              </div>
            </div>
          )}
          {soonToggle && soonToggle.count > 0 && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '10px 12px', border: '1px solid #C7CED6', borderRadius: 8, fontSize: 13, color: '#0A2540', cursor: submitting ? 'default' : 'pointer' }}>
              <input
                type="checkbox"
                checked={soonToggle.checked}
                disabled={submitting}
                onChange={(e) => soonToggle.onChange(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#635BFF' }}
              />
              {t('foresight.includeSoonModal', { count: soonToggle.count, defaultValue: 'Also add {{count}} items that will run low within 7 days' })}
            </label>
          )}
          {items.length === 0 && unlinkedItems.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#4B5563' }}>
              {t('bulkOrder.empty', 'No items selected. Pick low-stock ingredients with a preferred seller mapping first.')}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {groups.map(g => {
                const first = g.items[0];
                const groupTotal = g.items.reduce((s, it) => s + (it.quantity || 0) * (it.unit_price || 0), 0);
                return (
                  <div key={g.key} style={{
                    border: '1px solid #C7CED6', borderRadius: 12, overflow: 'hidden', background: 'white'
                  }}>
                    <div style={{
                      padding: '12px 16px', background: '#F9FAFB',
                      borderBottom: '1px solid #C7CED6',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          {SELLER_TYPE_LABEL[first.seller_type || ''] || first.seller_type}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#0A2540' }}>
                          {first.seller_name || '—'}
                        </div>
                        {(() => {
                          // 무료배송 기준 — 안내만(자동으로 채워 넣지 않는다 · 배송비 계산은 발주 생성 때 서버가 한다)
                          const dt = first.delivery_terms;
                          if (!dt || dt.min_order_amount == null) return null;
                          const short = Math.max(0, dt.min_order_amount - groupTotal);
                          return (
                            <div style={{ fontSize: 12, color: short > 0 ? '#B45309' : '#047857', marginTop: 2 }}>
                              {short > 0
                                ? t('bulkOrder.freeDeliveryShort', {
                                    defaultValue: 'Free delivery from {{min}} — {{short}} more (otherwise fee {{fee}})',
                                    min: formatCurrency(dt.min_order_amount, currency),
                                    short: formatCurrency(short, currency),
                                    fee: formatCurrency(dt.delivery_fee || 0, currency),
                                  })
                                : t('bulkOrder.freeDeliveryMet', { defaultValue: 'Free delivery (from {{min}})', min: formatCurrency(dt.min_order_amount, currency) })}
                            </div>
                          );
                        })()}
                        {(() => {
                          const cs = cutoffState(first.order_windows || null, Date.now(), tz);
                          if (!cs) return null;
                          const col = CUTOFF_COLORS[cs.level];
                          return (
                            <div style={{ fontSize: 12, color: col.fg, fontWeight: col.bold ? 600 : 400, marginTop: 2 }}>
                              {t('bulkOrder.cutoff', { defaultValue: 'Order by {{when}}', when: `${cs.window.cutoff_date} ${cutoffClock(cs.window.cutoff_at, tz, locale)}` })}
                            </div>
                          );
                        })()}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: '#4B5563' }}>
                          {t('bulkOrder.itemsCount', { count: g.items.length, defaultValue: `${g.items.length} item${g.items.length === 1 ? '' : 's'}` })}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540' }}>
                          {formatCurrency(groupTotal, currency)}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: 8 }}>
                      {g.items.map(it => (
                        <div key={it.ingredient_id} style={{
                          display: 'grid', gridTemplateColumns: '1fr 120px 110px 110px 36px',
                          gap: 12, padding: '10px 8px', alignItems: 'center',
                          borderBottom: '1px dashed #F1F4F8'
                        }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                              {it.ingredient_name}
                              {it.status && <VerdictBadge verdict={it.status} days={it.status === 'soon' ? it.days_of_cover : null} />}
                            </div>
                            <div style={{ fontSize: 11, color: '#6B7280' }}>
                              {it.status ? (
                                <>
                                  {t('bulkOrder.stockShort', 'Current')} {fq(it.available ?? it.current_stock)} {it.unit}
                                  {!!it.daily_usage && <> · {t('bulkOrder.perDay', { defaultValue: '{{qty}} {{unit}}/day', qty: fq(it.daily_usage), unit: it.unit })}</>}
                                  {it.days_of_cover != null && <> · {t('bulkOrder.daysLeft', { defaultValue: '{{n}} days left', n: it.days_of_cover })}</>}
                                  {!!it.committed && <> · {t('bulkOrder.committed', { defaultValue: 'store orders waiting {{qty}} {{unit}}', qty: fq(it.committed), unit: it.unit })}</>}
                                </>
                              ) : (
                                <>{t('bulkOrder.stockShort', 'Current')}: {it.current_stock} / {t('reorderAt.column', 'Reorder at')}: {it.min_stock} {it.unit}</>
                              )}
                            </div>
                            {it.min_order_qty != null && (
                              <div style={{ fontSize: 11, color: '#6B7280' }}>
                                {t('bulkOrder.minApplied', { defaultValue: 'Seller minimum {{qty}} {{unit}} applied', qty: fq(it.min_order_qty), unit: it.order_unit || '' })}
                              </div>
                            )}
                          </div>
                          <div>
                            <FormInput
                              type="number"
                              min="0"
                              step="0.01"
                              value={it.quantity}
                              onChange={(e) => onUpdateItem(it.ingredient_id, { quantity: parseFloat(e.target.value) || 0 })}
                              disabled={submitting}
                            />
                            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                              {it.order_unit || ''}
                              {it.unit_conversion != null && it.unit_conversion !== 1 && it.unit && (
                                <> = {fq((it.quantity || 0) * it.unit_conversion)} {it.unit}</>
                              )}
                            </div>
                            {it.min_order_qty != null && (it.quantity || 0) < it.min_order_qty && (
                              <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 600 }}>
                                {t('bulkOrder.minShortLabel', { defaultValue: 'Min {{qty}}', qty: fq(it.min_order_qty) })}
                              </div>
                            )}
                          </div>
                          <div style={{ fontSize: 13, color: '#4B5563', textAlign: 'right' }}>
                            @ {formatCurrency(it.unit_price, currency)}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', textAlign: 'right' }}>
                            {formatCurrency(it.quantity * it.unit_price, currency)}
                          </div>
                          <div>
                            <ThemedButton
                              size="small"
                              variant="danger-outline"
                              onClick={() => onRemoveItem(it.ingredient_id)}
                              disabled={submitting}
                              style={{ padding: '4px 8px', minWidth: 32 }}
                            >×</ThemedButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {unlinkedItems.length > 0 && (
                <div style={{ border: '1px solid #C7CED6', borderRadius: 12, background: '#F9FAFB', padding: '12px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#4B5563' }}>
                    {t('bulkOrder.unlinkedTitle', { count: unlinkedItems.length, defaultValue: 'Needs a supplier link ({{count}}) — not sent' })}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', margin: '4px 0 8px' }}>
                    {t('bulkOrder.unlinkedHint', 'These items are running low but have no supplier linked. Link a supplier in the stock item settings, then order.')}
                  </div>
                  {unlinkedItems.map(u => (
                    <div key={u.ingredient_id} style={{ fontSize: 13, color: '#4B5563', padding: '4px 0', borderTop: '1px dashed #E5E7EB' }}>
                      {u.ingredient_name} — {t('bulkOrder.stockShort', 'Current')} {fq(u.available ?? u.current_stock)} {u.unit}
                      {u.suggested_stock_qty ? <> · {t('bulkOrder.needQty', { defaultValue: 'need about {{qty}} {{unit}}', qty: fq(u.suggested_stock_qty), unit: u.unit })}</> : null}
                    </div>
                  ))}
                </div>
              )}
              {items.length > 0 && (
              <div style={{
                padding: '14px 18px', background: '#F0FDF4', border: '1px solid #10B981',
                borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0A2540' }}>{t('bulkOrder.grandTotal', 'Grand Total')}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#16A34A' }}>{formatCurrency(grandTotal, currency)}</span>
              </div>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default BulkOrderModal;
