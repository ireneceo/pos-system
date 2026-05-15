import React from 'react';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import { FilterSelect } from '../../Common/FilterComponents';
import ImageUploadDropzone from '../../Common/ImageUploadDropzone';
import { GeneralStockForm, Supplier, GeneralStockCategory } from '../types';
import { UNIT_OPTIONS } from '../utils';

interface Props {
  mode: 'add' | 'edit';
  isOpen: boolean;
  onClose: () => void;
  form: GeneralStockForm;
  onFormChange: (form: GeneralStockForm) => void;
  suppliers: Supplier[];
  categories: GeneralStockCategory[];
  saving: boolean;
  onConfirm: () => void;
}

const GeneralStockFormModal: React.FC<Props> = ({
  mode,
  isOpen,
  onClose,
  form,
  onFormChange,
  suppliers,
  categories,
  saving,
  onConfirm,
}) => {
  const title = mode === 'add' ? 'Add General Stock' : 'Edit General Stock';
  const confirmLabel = mode === 'add'
    ? (saving ? 'Adding...' : 'Add Item')
    : (saving ? 'Saving...' : 'Save Changes');
  const initialStockLabel = mode === 'add' ? 'Initial Stock' : 'Current Stock';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="medium"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={onConfirm}
            disabled={saving || !form.name.trim()}
          >
            {confirmLabel}
          </ModalButton>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Item Name *</FormLabel>
            <FormInput
              type="text"
              value={form.name}
              onChange={(e) => onFormChange({ ...form, name: e.target.value })}
              placeholder="e.g., Takeaway Containers"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Code (SKU)</FormLabel>
            <FormInput
              type="text"
              value={form.code}
              onChange={(e) => onFormChange({ ...form, code: e.target.value })}
              placeholder="Auto-generate"
            />
          </UIFormGroup>
        </div>

        <ImageUploadDropzone
          value={form.image_url}
          onChange={(base64) => onFormChange({ ...form, image_url: base64 })}
          label="Image (Optional)"
          helpText="Drag & drop or click to upload item image"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Unit *</FormLabel>
            <FilterSelect
              value={form.stock_unit}
              onChange={(e) => onFormChange({ ...form, stock_unit: e.target.value })}
              style={{ width: '100%', maxWidth: '100%' }}
            >
              {UNIT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </FilterSelect>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Category</FormLabel>
            <FilterSelect
              value={form.category}
              onChange={(e) => onFormChange({ ...form, category: e.target.value })}
              style={{ width: '100%', maxWidth: '100%' }}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.emoji ? `${cat.emoji} ` : ''}{cat.name}
                </option>
              ))}
            </FilterSelect>
          </UIFormGroup>
        </div>

        <UIFormGroup>
          <FormLabel>Supplier</FormLabel>
          <FilterSelect
            value={form.supplier_id}
            onChange={(e) => onFormChange({ ...form, supplier_id: e.target.value })}
            style={{ width: '100%', maxWidth: '100%' }}
          >
            <option value="">Select Supplier (Optional)</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </FilterSelect>
        </UIFormGroup>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Unit Cost</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={form.unit_cost}
              onChange={(e) => onFormChange({ ...form, unit_cost: e.target.value })}
              placeholder="0.00"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{initialStockLabel}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={form.current_stock}
              onChange={(e) => onFormChange({ ...form, current_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Min Stock</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={form.min_stock}
              onChange={(e) => onFormChange({ ...form, min_stock: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Min Order</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={form.min_order}
              onChange={(e) => onFormChange({ ...form, min_order: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
        </div>
      </div>
    </Modal>
  );
};

export default GeneralStockFormModal;
