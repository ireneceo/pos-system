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
  onConfirm: () => void;
}

const WasteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  ingredient,
  quantity,
  onQuantityChange,
  notes,
  onNotesChange,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Record Waste"
    size="small"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton variant="primary" onClick={onConfirm}>
          Confirm Waste
        </ModalButton>
      </>
    }
  >
    {ingredient && (
      <>
        <InfoBox>
          Record wasted or disposed stock. This will be deducted from current stock.
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
          <FormLabel>Waste Quantity ({ingredient.unit}) *</FormLabel>
          <FormInput
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>Reason (Optional)</FormLabel>
          <FormInput
            type="text"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="e.g., Expired, Damaged"
          />
        </UIFormGroup>
      </>
    )}
  </Modal>
);

export default WasteModal;
