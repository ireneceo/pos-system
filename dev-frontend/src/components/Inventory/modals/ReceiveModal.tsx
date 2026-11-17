import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import DateField from '../../Common/DateField';
import { InfoBox } from '../styles';
import { IngredientStock } from '../types';
import { formatStock } from '../utils';
import { OpenPoLine } from '../hooks/useIngredientAdjustModal';

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
  /** 이 품목이 담긴 진행 중 발주 라인 (없으면 빈 배열 — 선택 UI 자체가 안 뜬다) */
  openPoLines?: OpenPoLine[];
  selectedPoItemId?: number | null;
  onSelectPoItem?: (itemId: number | null) => void;
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
  openPoLines = [],
  selectedPoItemId = null,
  onSelectPoItem,
  onConfirm,
}) => {
  const { t } = useTranslation('inventory');
  return (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={t('inventory:receiveModal.title', 'Receive Stock') as string}
    size="medium"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          {t('inventory:receiveModal.cancel', 'Cancel')}
        </ModalButton>
        <ModalButton variant="primary" onClick={onConfirm}>
          {t('inventory:receiveModal.confirm', 'Confirm Receive')}
        </ModalButton>
      </>
    }
  >
    {ingredient && (
      <>
        <InfoBox>
          {t('inventory:receiveModal.intro', 'Enter the quantity received and batch details for inventory tracking.')}
        </InfoBox>

        {/* 이 품목에 진행 중 발주가 있으면 알려주고, 그 발주 입고로 처리할지 고르게 한다.
            고르지 않으면 지금까지와 똑같은 일반 입고다(발주와 무관한 입고도 실제로 있다).
            자동 매칭하지 않는 이유 = 수량·품목 자동 추정은 오귀속 사고 경로. */}
        {openPoLines.length > 0 && onSelectPoItem && (
          <UIFormGroup>
            <FormLabel>{t('inventory:receiveModal.openPos', 'Open purchase orders for this item')}</FormLabel>
            <div style={{ border: '1px solid #C7CED6', borderRadius: 8, overflow: 'hidden' }}>
              {openPoLines.map(line => (
                <label
                  key={line.item_id}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '10px 12px', cursor: 'pointer', fontSize: 13,
                    borderBottom: '1px solid #F1F4F8',
                    background: selectedPoItemId === line.item_id ? '#EEF2FF' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="receive-po-line"
                    checked={selectedPoItemId === line.item_id}
                    onChange={() => onSelectPoItem(line.item_id)}
                    style={{ marginTop: 2 }}
                  />
                  <span>
                    <strong style={{ color: '#0A2540' }}>{line.po_number}</strong>
                    <span style={{ color: '#4B5563' }}>
                      {' · '}{t('inventory:receiveModal.outstanding', 'outstanding {{qty}} {{unit}}', { qty: line.quantity_remaining, unit: line.ingredient_unit || '' })}
                      {' · '}{line.po_status}
                    </span>
                  </span>
                </label>
              ))}
              <label
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', cursor: 'pointer', fontSize: 13,
                  background: selectedPoItemId === null ? '#EEF2FF' : 'white'
                }}
              >
                <input
                  type="radio"
                  name="receive-po-line"
                  checked={selectedPoItemId === null}
                  onChange={() => onSelectPoItem(null)}
                />
                <span style={{ color: '#0A2540' }}>{t('inventory:receiveModal.noPoLink', 'Receive without linking to a purchase order')}</span>
              </label>
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', marginTop: 6 }}>
              {t('inventory:receiveModal.linkHint', 'Linking updates the purchase order too, so the same delivery is not counted twice.')}
            </div>
          </UIFormGroup>
        )}
        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.ingredient', 'Ingredient')}</FormLabel>
          <FormInput type="text" value={ingredient.name} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.currentStock', 'Current Stock')}</FormLabel>
          <FormInput type="text" value={`${formatStock(ingredient.current_stock)} ${ingredient.unit}`} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.quantityReceived', 'Quantity Received ({{unit}}) *', { unit: ingredient.unit })}</FormLabel>
          <FormInput
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder={t('inventory:receiveModal.enterQuantity', 'Enter quantity') as string}
            required
          />
        </UIFormGroup>

        <div style={{ borderTop: '1px solid #C7CED6', margin: '16px 0', paddingTop: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>
            {t('inventory:receiveModal.batchDetails', 'Batch Details (Optional)')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <UIFormGroup style={{ marginBottom: 0 }}>
              <FormLabel>{t('inventory:receiveModal.batchNumber', 'Batch/Lot Number')}</FormLabel>
              <FormInput
                type="text"
                value={batchNumber}
                onChange={(e) => onBatchNumberChange(e.target.value)}
                placeholder={t('inventory:receiveModal.batchPlaceholder', 'e.g., LOT-2024-001') as string}
              />
            </UIFormGroup>
            <UIFormGroup style={{ marginBottom: 0 }}>
              <FormLabel>{t('inventory:receiveModal.manufactureDate', 'Manufacture Date')}</FormLabel>
              <DateField
                value={manufactureDate}
                onChange={(v) => onManufactureDateChange(v)}
              />
            </UIFormGroup>
          </div>
          <UIFormGroup style={{ marginTop: '12px' }}>
            <FormLabel>{t('inventory:receiveModal.expiryDate', 'Expiry Date')}</FormLabel>
            <DateField
              value={expiryDate}
              onChange={(v) => onExpiryDateChange(v)}
            />
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
              {t('inventory:receiveModal.fifoHint', 'Items with earlier expiry dates will be used first (FIFO)')}
            </div>
          </UIFormGroup>
        </div>

        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.notesOptional', 'Notes (Optional)')}</FormLabel>
          <FormInput
            type="text"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder={t('inventory:receiveModal.notesPlaceholder', 'e.g., PO #12345') as string}
          />
        </UIFormGroup>
      </>
    )}
  </Modal>
  );
};

export default ReceiveModal;
