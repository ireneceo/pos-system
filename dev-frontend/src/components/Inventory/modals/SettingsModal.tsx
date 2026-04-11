import React from 'react';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import { InfoBox, ConfidenceBadge } from '../styles';
import { IngredientStock, SettingsForm } from '../types';
import { getConfidenceLabel } from '../utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredient: IngredientStock | null;
  form: SettingsForm;
  onFormChange: (form: SettingsForm) => void;
  saving: boolean;
  onSave: () => void;
}

const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  ingredient,
  form,
  onFormChange,
  saving,
  onSave,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={`Settings: ${ingredient?.name || ''}`}
    size="small"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton variant="primary" onClick={onSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </ModalButton>
      </>
    }
  >
    {ingredient && (
      <>
        <InfoBox>
          Configure PAR Level calculation parameters and manual usage settings.
        </InfoBox>

        <div style={{ marginBottom: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>Current Prediction</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ConfidenceBadge level={ingredient.prediction_confidence || 'none'}>
              {getConfidenceLabel(ingredient.prediction_confidence || 'none')}
            </ConfidenceBadge>
            <span style={{ fontSize: '14px', color: '#0A2540' }}>
              {(parseFloat(String(ingredient.avg_daily_usage)) || 0).toFixed(2)} {ingredient.unit}/day (calculated)
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <UIFormGroup>
            <FormLabel>Minimum Stock Level ({ingredient.unit})</FormLabel>
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
            <FormLabel>Minimum Order ({ingredient.unit})</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={form.min_order}
              onChange={(e) => onFormChange({ ...form, min_order: e.target.value })}
              placeholder="0"
            />
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              Minimum order quantity from supplier
            </div>
          </UIFormGroup>
        </div>

        <UIFormGroup>
          <FormLabel>Lead Time (days)</FormLabel>
          <FormInput
            type="number"
            min="1"
            value={form.lead_time_days}
            onChange={(e) => onFormChange({ ...form, lead_time_days: e.target.value })}
            placeholder="1"
          />
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
            Time from order to delivery
          </div>
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>Safety Stock (%)</FormLabel>
          <FormInput
            type="number"
            min="0"
            max="100"
            value={form.safety_stock_percent}
            onChange={(e) => onFormChange({ ...form, safety_stock_percent: e.target.value })}
            placeholder="20"
          />
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
            Buffer percentage for unexpected demand
          </div>
        </UIFormGroup>

        <UIFormGroup>
          <FormLabel>Manual Daily Usage ({ingredient.unit}/day)</FormLabel>
          <FormInput
            type="number"
            step="0.01"
            min="0"
            value={form.manual_daily_usage}
            onChange={(e) => onFormChange({ ...form, manual_daily_usage: e.target.value })}
            placeholder="Leave empty to use calculated value"
          />
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
            Override calculated usage when prediction confidence is low
          </div>
        </UIFormGroup>
      </>
    )}
  </Modal>
);

export default SettingsModal;
