import React from 'react';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect } from '../../UI/Modal';
import { UnifiedStockItem } from '../types';
import { formatStock } from '../utils';
import { formatCurrency } from '../../../utils/currency';

interface SellerSource {
  id: number;
  seller_type: 'supplier' | 'brand' | 'foodcourt' | 'system_admin';
  seller_entity_id: number | null;
  unit_price: number | string;
  is_preferred: boolean;
  is_active: boolean;
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
                    {' — '}{currency} {(parseFloat(String(s.unit_price)) || 0).toFixed(2)}
                    {s.is_preferred ? ' ⭐' : ''}
                  </option>
                ))}
              </FormSelect>
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
