import React from 'react';
import { Table, TableHeader, TableRow } from '../../UI';
import { Modal, ModalButton, FormInput } from '../../UI/Modal';
import { InfoBox } from '../styles';
import { IngredientStock, InitialStockItemValues } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  inventory: IngredientStock[];
  initialStockItems: { [key: number]: InitialStockItemValues };
  onUpdateItem: (id: number, field: 'quantity' | 'min_stock', value: string) => void;
  saving: boolean;
  onSave: () => void;
}

const InitialStockModal: React.FC<Props> = ({
  isOpen,
  onClose,
  inventory,
  initialStockItems,
  onUpdateItem,
  saving,
  onSave,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Set Initial Stock"
    size="large"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton variant="primary" onClick={onSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Initial Stock'}
        </ModalButton>
      </>
    }
  >
    <InfoBox>
      Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped.
    </InfoBox>
    {Object.entries(
      inventory.reduce((acc, item) => {
        const category = item.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {} as { [key: string]: IngredientStock[] })
    ).map(([category, items]) => (
      <div key={category} style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '12px', textTransform: 'capitalize' }}>
          {category.replace('_', ' ')}
        </h3>
        <Table>
          <TableHeader columns="2fr 1fr 1fr">
            <span className="col-info">Ingredient</span>
            <span>Current Qty</span>
            <span>Min Stock</span>
          </TableHeader>
          {items.map(item => (
            <TableRow key={item.id} columns="2fr 1fr 1fr" style={{ padding: '12px 16px' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0A2540' }}>{item.name}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.unit}</div>
              </div>
              <div>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={initialStockItems[item.id]?.quantity || ''}
                  onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value)}
                  placeholder="0"
                  style={{ width: '100px' }}
                />
              </div>
              <div>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={initialStockItems[item.id]?.min_stock || ''}
                  onChange={(e) => onUpdateItem(item.id, 'min_stock', e.target.value)}
                  placeholder="0"
                  style={{ width: '100px' }}
                />
              </div>
            </TableRow>
          ))}
        </Table>
      </div>
    ))}
  </Modal>
);

export default InitialStockModal;
