import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';

export interface LegalTerms {
  governing_law?: string | null;
  dispute_resolution?: 'arbitration' | 'court' | 'mediation' | '' | null;
  arbitration_venue?: string | null;
  arbitration_language?: string | null;
  contract_language?: string | null;
  notice_delivery_methods?: string[] | null;
  notice_email_response_hours?: number | string | null;
}

interface Props {
  value: LegalTerms | null | undefined;
  onChange: (v: LegalTerms) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
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

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F1F4F8; color: #4B5563; }
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

const DeliveryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.label<{ checked: boolean; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid ${p => p.checked ? '#C7D2FE' : '#C7CED6'};
  background: ${p => p.checked ? '#F5F3FF' : '#fff'};
  border-radius: 20px;
  font-size: 13px;
  color: ${p => p.checked ? '#635BFF' : '#4B5563'};
  font-weight: ${p => p.checked ? 500 : 400};
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  transition: all 0.15s;
  &:hover { border-color: ${p => p.disabled ? (p.checked ? '#C7D2FE' : '#C7CED6') : '#C7D2FE'}; }
  input { accent-color: #635BFF; cursor: inherit; }
`;

const DELIVERY_METHODS = [
  { code: 'registered_mail', label: 'Registered Mail' },
  { code: 'email',           label: 'Email' },
  { code: 'courier',         label: 'Courier' },
  { code: 'fax',             label: 'Fax' }
];

const ConditionalRow = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding-top: 8px;
  border-top: 1px dashed #F1F4F8;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const LegalTermsEditor: React.FC<Props> = ({ value, onChange, onSave, disabled }) => {
  const v: LegalTerms = value || {};
  const update = (key: keyof LegalTerms, val: any) => onChange({ ...v, [key]: val });

  const methods = Array.isArray(v.notice_delivery_methods) ? v.notice_delivery_methods : [];
  const toggleMethod = (code: string) => {
    const next = methods.includes(code) ? methods.filter(m => m !== code) : [...methods, code];
    onChange({ ...v, notice_delivery_methods: next });
    setTimeout(() => { onSave(); }, 0);
  };

  return (
    <Grid>
      <Field>
        <Label>Governing Law</Label>
        <AutoSaveField onSave={onSave}>
          <Input value={v.governing_law || ''} onChange={e => update('governing_law', e.target.value)} disabled={disabled} placeholder="e.g. Malaysia" />
        </AutoSaveField>
      </Field>
      <Field>
        <Label>Dispute Resolution</Label>
        <AutoSaveField onSave={onSave} type="select" debounceMs={300}>
          <Select value={v.dispute_resolution || ''} onChange={e => update('dispute_resolution', e.target.value)} disabled={disabled}>
            <option value="">Select...</option>
            <option value="arbitration">Arbitration</option>
            <option value="court">Court</option>
            <option value="mediation">Mediation</option>
          </Select>
        </AutoSaveField>
      </Field>
      {v.dispute_resolution === 'arbitration' && (
        <ConditionalRow>
          <Field>
            <Label>Arbitration Venue</Label>
            <AutoSaveField onSave={onSave}>
              <Input value={v.arbitration_venue || ''} onChange={e => update('arbitration_venue', e.target.value)} disabled={disabled} placeholder="e.g. KLRCA, Kuala Lumpur" />
            </AutoSaveField>
          </Field>
          <Field>
            <Label>Arbitration Language</Label>
            <AutoSaveField onSave={onSave}>
              <Input value={v.arbitration_language || ''} onChange={e => update('arbitration_language', e.target.value)} disabled={disabled} placeholder="e.g. English" />
            </AutoSaveField>
          </Field>
        </ConditionalRow>
      )}
      <Field>
        <Label>Contract Language</Label>
        <AutoSaveField onSave={onSave}>
          <Input value={v.contract_language || ''} onChange={e => update('contract_language', e.target.value)} disabled={disabled} placeholder="e.g. English" />
        </AutoSaveField>
      </Field>
      <Field>
        <Label>Email Response SLA (hours)</Label>
        <AutoSaveField onSave={onSave}>
          <Input type="number" min="0" inputMode="numeric"
            value={v.notice_email_response_hours ?? ''}
            onChange={e => update('notice_email_response_hours', e.target.value)}
            disabled={disabled} placeholder="24" />
        </AutoSaveField>
      </Field>
      <Field style={{ gridColumn: '1 / -1' }}>
        <Label>Notice Delivery Methods</Label>
        <DeliveryRow>
          {DELIVERY_METHODS.map(m => {
            const checked = methods.includes(m.code);
            return (
              <Pill key={m.code} checked={checked} disabled={disabled}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMethod(m.code)}
                  disabled={disabled}
                  style={{ width: 14, height: 14 }}
                />
                {m.label}
              </Pill>
            );
          })}
        </DeliveryRow>
      </Field>
    </Grid>
  );
};

export default LegalTermsEditor;
