import React from 'react';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import { InfoBox } from '../styles';
import { GeneralStockItem } from '../types';
import { formatStock } from '../utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: GeneralStockItem | null;
  quantity: string;
  onQuantityChange: (v: string) => void;
  notes: string;
  onNotesChange: (v: string) => void;
  batchNumber: string;
  onBatchNumberChange: (v: string) => void;
  manufactureDate: string;
  onManufactureDateChange: (v: string) => void;
  expiryDate: string;
  onExpiryDateChange: (v: string) => void;
  onConfirm: () => void;
}

const GeneralStockReceiveModal: React.FC<Props> = ({
  isOpen,
  onClose,
  item,
  quantity,
  onQuantityChange,
  notes,
  onNotesChange,
  batchNumber,
  onBatchNumberChange,
  manufactureDate,
  onManufactureDateChange,
  expiryDate,
  onExpiryDateChange,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Receive Stock"
    size="medium"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton
          variant="primary"
          onClick={onConfirm}
          disabled={!quantity || parseFloat(quantity) <= 0}
        >
          Confirm Receive
        </ModalButton>
      </>
    }
  >
    {item && (
      <>
        <InfoBox>
          Enter the quantity received and batch details for inventory tracking.
        </InfoBox>
        <UIFormGroup>
          <FormLabel>Item</FormLabel>
          <FormInput type="text" value={item.name} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>Current Stock</FormLabel>
          <FormInput type="text" value={`${formatStock(item.current_stock)} ${item.stock_unit}`} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>Quantity Received ({item.stock_unit}) *</FormLabel>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </UIFormGroup>

        <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0', paddingTop: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>
            Batch Details (Optional)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <UIFormGroup style={{ marginBottom: 0 }}>
              <FormLabel>Batch/Lot Number</FormLabel>
              <FormInput
                type="text"
                value={batchNumber}
                onChange={(e) => onBatchNumberChange(e.target.value)}
                placeholder="e.g., LOT-2024-001"
              />
            </UIFormGroup>
            <UIFormGroup style={{ marginBottom: 0 }}>
              <FormLabel>Manufacture Date</FormLabel>
              <FormInput
                type="date"
                value={manufactureDate}
                onChange={(e) => onManufactureDateChange(e.target.value)}
              />
            </UIFormGroup>
          </div>
          <UIFormGroup style={{ marginTop: '12px' }}>
            <FormLabel>Expiry Date</FormLabel>
            <FormInput
              type="date"
              value={expiryDate}
              onChange={(e) => onExpiryDateChange(e.target.value)}
            />
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              Items with earlier expiry dates will be used first (FIFO)
            </div>
          </UIFormGroup>
        </div>

        <UIFormGroup>
          <FormLabel>Notes (Optional)</FormLabel>
          <FormInput
            type="text"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="e.g., PO #12345"
          />
        </UIFormGroup>
      </>
    )}
  </Modal>
);

export default GeneralStockReceiveModal;
