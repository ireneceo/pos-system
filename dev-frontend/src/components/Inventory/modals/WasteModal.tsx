import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardSelect } from '../../UI/SelectComponents';
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
  reasonCode: string;
  onReasonCodeChange: (v: string) => void;
  onConfirm: () => void;
}

// 폐기 사유 코드 — 서버 utils/wasteReasons.js 와 같은 목록(장부 reason_code, 폐기 리포트가 이 코드로 나눈다)
export const WASTE_REASONS = ['spoiled', 'expired', 'overcooked', 'breakage', 'prep_loss', 'other'] as const;

const WasteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  ingredient,
  quantity,
  onQuantityChange,
  notes,
  onNotesChange,
  reasonCode,
  onReasonCodeChange,
  onConfirm,
}) => {
  const { t } = useTranslation(['inventory']);
  return (
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
        <ModalButton variant="primary" onClick={onConfirm} disabled={!reasonCode}>
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
          <FormLabel>{t('inventory:wasteReason.label')} *</FormLabel>
          <StandardSelect value={reasonCode} onChange={(e) => onReasonCodeChange(e.target.value)} required>
            <option value="">{t('inventory:wasteReason.select')}</option>
            {WASTE_REASONS.map(code => (
              <option key={code} value={code}>{t(`inventory:wasteReason.${code}`)}</option>
            ))}
          </StandardSelect>
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('inventory:wasteReason.notes')}</FormLabel>
          <FormInput
            type="text"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
          />
        </UIFormGroup>
      </>
    )}
  </Modal>
  );
};

export default WasteModal;
