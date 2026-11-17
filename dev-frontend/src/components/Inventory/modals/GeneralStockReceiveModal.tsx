import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import DateField from '../../Common/DateField';
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
        <ModalButton
          variant="primary"
          onClick={onConfirm}
          disabled={!quantity || parseFloat(quantity) <= 0}
        >
          {t('inventory:receiveModal.confirm', 'Confirm Receive')}
        </ModalButton>
      </>
    }
  >
    {item && (
      <>
        <InfoBox>
          {t('inventory:receiveModal.intro', 'Enter the quantity received and batch details for inventory tracking.')}
        </InfoBox>
        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.item', 'Item')}</FormLabel>
          <FormInput type="text" value={item.name} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.currentStock', 'Current Stock')}</FormLabel>
          <FormInput type="text" value={`${formatStock(item.current_stock)} ${item.stock_unit}`} disabled />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('inventory:receiveModal.quantityReceived', 'Quantity Received ({{unit}}) *', { unit: item.stock_unit })}</FormLabel>
          <FormInput
            type="number"
            min="0"
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

export default GeneralStockReceiveModal;
