import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect } from '../../UI/Modal';
import { UnifiedStockItem } from '../types';
import { formatStock } from '../utils';
import { formatCurrency, getCurrencySymbol } from '../../../utils/currency';

interface SellerSource {
  id: number;
  seller_type: 'supplier' | 'brand' | 'foodcourt' | 'system_admin';
  seller_entity_id: number | null;
  // 공급업체 자체 판매품목명·SKU (공급업체 타입만 값 있음; 나머지는 null → 폴백)
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
  unit_price: number | string;
  is_preferred: boolean;
  is_active: boolean;
  /** 지난번 실제로 낸 값 대비 지금 가격 (설계 §6). 서버가 목록에 실어 준다 — 라인마다 호출하지 않는다. */
  price_history?: {
    last_price: number; last_at: string; prev_price: number | null;
    n: number; avg: number; min: number; max: number;
    trend: 'up' | 'down' | 'flat' | null; change_pct: number | null;
  } | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: UnifiedStockItem | null;
  quantity: string;
  onQuantityChange: (v: string) => void;
  currency: string;
  onSend: () => void;
  // Sprint 5
  sellers?: SellerSource[];
  selectedSellerId?: number | null;
  onSellerChange?: (id: number) => void;
  error?: string | null;
  submitting?: boolean;
  lastResult?: { po_number: string; ingredient_name: string } | null;
}

const SELLER_TYPE_LABEL: Record<string, string> = {
  supplier: 'Supplier',
  brand: 'Brand',
  foodcourt: 'Foodcourt',
  system_admin: 'POS Catalog'
};

const OrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  item,
  quantity,
  onQuantityChange,
  currency,
  onSend,
  sellers = [],
  selectedSellerId = null,
  onSellerChange,
  error,
  submitting,
  lastResult,
}) => {
  const { t } = useTranslation(['inventory', 'common']);
  const selected = sellers.find(s => s.id === selectedSellerId) || null;
  const unitPrice = selected ? (parseFloat(String(selected.unit_price)) || 0) : (item?.unit_cost || 0);
  const qtyNum = parseFloat(quantity);
  const noMapping = (!sellers || sellers.length === 0);
  const sendDisabled = !quantity || !(qtyNum > 0) || !!submitting || !!lastResult || noMapping;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order: ${item?.name || ''}`}
      size="small"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose} disabled={!!submitting}>
            {lastResult ? 'Close' : 'Cancel'}
          </ModalButton>
          {!lastResult && (
            <ModalButton variant="primary" onClick={onSend} disabled={sendDisabled}>
              {submitting ? 'Sending…' : 'Send Order'}
            </ModalButton>
          )}
        </>
      }
    >
      {item && (
        <>
          {/* Result banner */}
          {lastResult && (
            <div style={{ marginBottom: 12, padding: 12, background: '#ECFDF5', border: '1px solid #10B981', borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#065F46' }}>Order sent ✓</div>
              <div style={{ fontSize: 12, color: '#065F46', marginTop: 4 }}>
                {lastResult.po_number} — {lastResult.ingredient_name}
              </div>
            </div>
          )}

          {error && (
            <div style={{ marginBottom: 12, padding: 12, background: '#FEF2F2', border: '1px solid #DC2626', borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: '#991B1B' }}>{error}</div>
            </div>
          )}

          <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#4B5563' }}>Current Stock</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>
                  {formatStock(item.current_stock)} {item.unit}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#4B5563' }}>Min Stock</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#4B5563' }}>
                  {formatStock(item.min_stock)} {item.unit}
                </div>
              </div>
            </div>
            {item.min_order && item.min_order > 0 && (
              <div style={{ fontSize: '12px', color: '#16A34A', marginTop: '8px' }}>
                Minimum order quantity: {formatStock(item.min_order)} {item.unit}
              </div>
            )}
          </div>

          {noMapping && !lastResult && (
            <div style={{ marginBottom: 12, padding: 12, background: '#FFFBEB', border: '1px solid #F59E0B', borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 4 }}>No supplier mapping</div>
              <div style={{ fontSize: 12, color: '#78350F' }}>
                Set up a seller source for this ingredient (Recipe Management → Ingredient Settings) before ordering.
              </div>
            </div>
          )}

          {sellers.length > 0 && (
            <UIFormGroup>
              <FormLabel>Send to *</FormLabel>
              <FormSelect
                value={selectedSellerId ?? ''}
                onChange={(e) => onSellerChange?.(parseInt(e.target.value, 10))}
                disabled={!!submitting || !!lastResult}
              >
                {sellers.map(s => (
                  <option key={s.id} value={s.id}>
                    {SELLER_TYPE_LABEL[s.seller_type] || s.seller_type}
                    {s.seller_entity_id ? ` #${s.seller_entity_id}` : ''}
                    {s.seller_product_name ? ` · ${s.seller_product_name}` : ''}
                    {s.seller_product_sku ? ` · SKU: ${s.seller_product_sku}` : ''}
                    {' — '}{getCurrencySymbol(currency)} {(parseFloat(String(s.unit_price)) || 0).toFixed(2)}
                    {s.is_preferred ? ' ⭐' : ''}
                  </option>
                ))}
              </FormSelect>
              {/* 가격 변화 — 기하 글리프로만 표시한다(RA 표준: 이모지·아이콘 라이브러리 아님).
                  기준은 "지금 가격 vs 지난번 실제로 낸 값"이다. 받은 적이 없으면 아무것도 안 띄운다. */}
              {(() => {
                const h = selected?.price_history;
                if (!h || !h.trend) return null;
                const tone = h.trend === 'up' ? '#B45309' : h.trend === 'down' ? '#047857' : '#6B7280';
                const glyph = h.trend === 'up' ? '▲' : h.trend === 'down' ? '▼' : '—';
                const pct = h.change_pct ?? 0;
                return (
                  <div style={{ marginTop: 6, fontSize: 12, color: tone }}>
                    {glyph} {pct === 0 ? t('inventory:order.samePriceAsLast', '지난번과 같은 가격') : `${pct > 0 ? '+' : ''}${pct}% (${t('inventory:order.lastPaid', '지난번')} ${getCurrencySymbol(currency)} ${h.last_price.toFixed(2)})`}
                    <span style={{ color: '#6B7280' }}>
                      {' · '}{t('inventory:order.receivedTimes', '받은 기록 {{n}}회', { n: h.n })} · {t('inventory:order.avg', '평균')} {getCurrencySymbol(currency)} {h.avg.toFixed(2)}
                      {h.n > 1 ? ` · ${getCurrencySymbol(currency)} ${h.min.toFixed(2)}~${h.max.toFixed(2)}` : ''}
                    </span>
                  </div>
                );
              })()}
            </UIFormGroup>
          )}

          <UIFormGroup>
            <FormLabel>Order Quantity ({item.unit}) *</FormLabel>
            <FormInput
              type="number"
              min="0"
              step="0.01"
              value={quantity}
              onChange={(e) => onQuantityChange(e.target.value)}
              placeholder={item.min_order ? `Min: ${item.min_order}` : 'Enter quantity'}
              disabled={!!submitting || !!lastResult}
            />
          </UIFormGroup>

          {qtyNum > 0 && (
            <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: '#4B5563' }}>Estimated Cost</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#16A34A' }}>
                {formatCurrency(qtyNum * unitPrice, currency)}
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default OrderModal;
