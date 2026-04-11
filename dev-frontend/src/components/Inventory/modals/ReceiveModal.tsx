import React from 'react';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import { InfoBox } from '../styles';
import { IngredientStock } from '../types';
import { formatStock } from '../utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredient: IngredientStock | null;
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

const ReceiveModal: React.FC<Props> = ({
  isOpen,
  onClose,
  ingredient,
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
        <ModalButton variant="primary" onClick={onConfirm}>
          Confirm Receive
        </ModalButton>
      </>
    }
  >
    {ingredient && (
      <>
        <InfoBox>
          Enter the quantity received and batch details for inventory tracking.
        </InfoBox>
        <UIFormGroup>
          <FormLabel>Ingredient</FormLabel>
          <FormInput type="text" value={ingredient.name} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>Current Stock</FormLabel>
          <FormInput type="text" value={`${formatStock(ingredient.current_stock)} ${ingredient.unit}`} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>Quantity Received ({ingredient.unit}) *</FormLabel>
          <FormInput
            type="number"
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

export default ReceiveModal;
