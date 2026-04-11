import React from 'react';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import { UnifiedStockItem } from '../types';
import { formatStock } from '../utils';
import { formatCurrency } from '../../../utils/currency';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: UnifiedStockItem | null;
  quantity: string;
  onQuantityChange: (v: string) => void;
  currency: string;
  onSend: () => void;
}

const OrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  item,
  quantity,
  onQuantityChange,
  currency,
  onSend,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={`Order: ${item?.name || ''}`}
    size="small"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton
          variant="primary"
          onClick={onSend}
          disabled={!quantity || parseFloat(quantity) <= 0}
        >
          Send Order
        </ModalButton>
      </>
    }
  >
    {item && (
      <>
        <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>Current Stock</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>
                {formatStock(item.current_stock)} {item.unit}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>Min Stock</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#6B7280' }}>
                {formatStock(item.min_stock)} {item.unit}
              </div>
            </div>
          </div>
          {item.min_order && item.min_order > 0 && (
            <div style={{ fontSize: '12px', color: '#16A34A', marginTop: '8px' }}>
              Minimum order quantity: {formatStock(item.min_order)} {item.unit}
            </div>
          )}
          {item.supplier_name && (
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              Supplier: {item.supplier_name}
            </div>
          )}
        </div>
        <UIFormGroup>
          <FormLabel>Order Quantity ({item.unit}) *</FormLabel>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder={item.min_order ? `Min: ${item.min_order}` : 'Enter quantity'}
          />
        </UIFormGroup>
        {quantity && parseFloat(quantity) > 0 && (
          <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '8px' }}>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>Estimated Cost</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#16A34A' }}>
              {formatCurrency(parseFloat(quantity) * item.unit_cost, currency)}
            </div>
          </div>
        )}
      </>
    )}
  </Modal>
);

export default OrderModal;
