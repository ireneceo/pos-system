import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';

export interface BankInfo {
  bank?: string | null;
  account?: string | null;
  holder?: string | null;
  swift?: string | null;
  currency?: string | null;
}

interface Props {
  value: BankInfo | null | undefined;
  onChange: (v: BankInfo) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
  labels?: { bank?: string; account?: string; holder?: string };
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
  &:disabled { background: #F8FAFC; color: #6B7C93; }
`;

const BankInfoField: React.FC<Props> = ({ value, onChange, onSave, disabled, labels }) => {
  const v: BankInfo = value || {};
  const update = (key: keyof BankInfo, val: string) => {
    onChange({ ...v, [key]: val });
  };
  return (
    <Row>
      <Group>
        <Label>{labels?.bank || 'Bank'}</Label>
        <AutoSaveField onSave={onSave}>
          <Input value={v.bank || ''} onChange={e => update('bank', e.target.value)} disabled={disabled} />
        </AutoSaveField>
      </Group>
      <Group>
        <Label>{labels?.account || 'Account Number'}</Label>
        <AutoSaveField onSave={onSave}>
          <Input value={v.account || ''} onChange={e => update('account', e.target.value)} disabled={disabled} />
        </AutoSaveField>
      </Group>
      <Group>
        <Label>{labels?.holder || 'Account Holder'}</Label>
        <AutoSaveField onSave={onSave}>
          <Input value={v.holder || ''} onChange={e => update('holder', e.target.value)} disabled={disabled} />
        </AutoSaveField>
      </Group>
    </Row>
  );
};

export default BankInfoField;
