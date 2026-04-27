import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormInput } from '../../UI/Modal';
import { ThemedButton } from '../../Theme/ThemedButton';
import { formatCurrency } from '../../../utils/currency';
import { BulkOrderItem } from '../hooks/useBulkOrder';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: BulkOrderItem[];
  currency: string;
  submitting: boolean;
  error: string | null;
  resultPos: Array<{ id: number; po_number: string; seller_name: string | null; status: string }> | null;
  onUpdateItem: (id: number, patch: Partial<BulkOrderItem>) => void;
  onRemoveItem: (id: number) => void;
  onSend: () => void;
}

const SELLER_TYPE_LABEL: Record<string, string> = {
  supplier: 'Supplier',
  brand: 'Brand',
  foodcourt: 'Foodcourt',
  system_admin: 'POS Catalog'
};

const BulkOrderModal: React.FC<Props> = ({
  isOpen, onClose, items, currency, submitting, error, resultPos,
  onUpdateItem, onRemoveItem, onSend
}) => {
  const { t } = useTranslation('inventory');

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
                padding: 12, border: '1px solid #E6EBF1', borderRadius: 8, display: 'flex',
                justifyContent: 'space-between', alignItems: 'center', gap: 12
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#0A2540', fontSize: 14 }}>{po.po_number}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{po.seller_name || '—'}</div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '4px 10px',
                  background: '#FEF3C7', color: '#92400E', borderRadius: 999
                }}>
                  {po.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {error && (
            <div style={{ marginBottom: 12, padding: 12, background: '#FEF2F2', border: '1px solid #DC2626', borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: '#991B1B' }}>{error}</div>
            </div>
          )}
          {items.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#6B7280' }}>
              {t('bulkOrder.empty', 'No items selected. Pick low-stock ingredients with a preferred seller mapping first.')}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {groups.map(g => {
                const first = g.items[0];
                const groupTotal = g.items.reduce((s, it) => s + (it.quantity || 0) * (it.unit_price || 0), 0);
                return (
                  <div key={g.key} style={{
                    border: '1px solid #E6EBF1', borderRadius: 12, overflow: 'hidden', background: 'white'
                  }}>
                    <div style={{
                      padding: '12px 16px', background: '#F9FAFB',
                      borderBottom: '1px solid #E6EBF1',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          {SELLER_TYPE_LABEL[first.seller_type || ''] || first.seller_type}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#0A2540' }}>
                          {first.seller_name || '—'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: '#6B7280' }}>
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
                          borderBottom: '1px dashed #F3F4F6'
                        }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540' }}>{it.ingredient_name}</div>
                            <div style={{ fontSize: 11, color: '#9CA3AF' }}>
                              {t('bulkOrder.stockShort', 'Current')}: {it.current_stock} / {t('bulkOrder.minShort', 'Min')}: {it.min_stock} {it.unit}
                            </div>
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
                          </div>
                          <div style={{ fontSize: 13, color: '#6B7280', textAlign: 'right' }}>
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
              <div style={{
                padding: '14px 18px', background: '#F0FDF4', border: '1px solid #10B981',
                borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0A2540' }}>{t('bulkOrder.grandTotal', 'Grand Total')}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#16A34A' }}>{formatCurrency(grandTotal, currency)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default BulkOrderModal;
