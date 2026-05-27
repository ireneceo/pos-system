import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';

export interface PercentageRent {
  rate?: number | string | null;
  compare_against?: 'gross' | 'base' | '' | null;
  higher_applies?: boolean;
}

interface Props {
  value: PercentageRent | null | undefined;
  onChange: (v: PercentageRent) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  align-items: end;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 500;
  color: #4B5563;
`;

const PercentWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  &:focus-within { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &[data-disabled="true"] { background: #F1F4F8; }
`;

const InnerInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #0A2540;
  background: transparent;
  &:disabled { color: #4B5563; }
`;

const Suffix = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  background: #F1F4F8;
  border-left: 1px solid #C7CED6;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: #fff;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; }
  &:disabled { background: #F1F4F8; color: #4B5563; }
`;

const CheckboxWrapper = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${p => p.disabled ? 0.6 : 1};
  user-select: none;
  &:hover { border-color: ${p => p.disabled ? '#C7CED6' : '#C7D2FE'}; }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: inherit;
`;

const PercentageRentField: React.FC<Props> = ({ value, onChange, onSave, disabled }) => {
  const v: PercentageRent = value || {};
  const update = (key: keyof PercentageRent, val: any) => {
    onChange({ ...v, [key]: val });
  };

  return (
    <Wrapper>
      <Field>
        <Label>Rate</Label>
        <AutoSaveField onSave={onSave}>
          <PercentWrapper data-disabled={disabled ? 'true' : 'false'}>
            <InnerInput
              type="number"
              step="0.01"
              min="0"
              max="100"
              inputMode="decimal"
              value={v.rate ?? ''}
              onChange={e => update('rate', e.target.value)}
              disabled={disabled}
              placeholder="0.00"
            />
            <Suffix>%</Suffix>
          </PercentWrapper>
        </AutoSaveField>
      </Field>
      <Field>
        <Label>Compare Against</Label>
        <AutoSaveField onSave={onSave} type="select" debounceMs={300}>
          <Select value={v.compare_against || ''} onChange={e => update('compare_against', e.target.value)} disabled={disabled}>
            <option value="">Select...</option>
            <option value="gross">Gross Sales</option>
            <option value="base">Base Rent</option>
          </Select>
        </AutoSaveField>
      </Field>
      <Field>
        <Label>&nbsp;</Label>
        <CheckboxWrapper disabled={disabled}>
          <Checkbox
            checked={!!v.higher_applies}
            onChange={e => {
              update('higher_applies', e.target.checked);
              setTimeout(() => { onSave(); }, 0);
            }}
            disabled={disabled}
          />
          Higher of two applies
        </CheckboxWrapper>
      </Field>
    </Wrapper>
  );
};

export default PercentageRentField;
