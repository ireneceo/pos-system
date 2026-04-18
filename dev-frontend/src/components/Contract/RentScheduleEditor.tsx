import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';
import { getCurrencySymbol } from '../../utils/currency';

export interface RentScheduleRow {
  year?: number | string | null;
  base_rent?: number | string | null;
  service_charge_psf?: number | string | null;
  cleaning?: number | string | null;
}

interface Props {
  value: RentScheduleRow[] | null | undefined;
  onChange: (v: RentScheduleRow[]) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
  currency?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr 1fr 1fr 36px;
  gap: 8px;
  align-items: center;
  @media (max-width: 768px) { display: none; }
`;

const HeaderCell = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding-bottom: 4px;
  border-bottom: 1px solid #F3F4F6;
`;

const RowCell = styled.div``;

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

const YearBadge = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  background: #F5F3FF;
  border: 1px solid #DDD6FE;
  border-radius: 6px;
  padding: 8px 0;
`;

const CurrencyInputWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  &:focus-within { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &[data-disabled="true"] { background: #F8FAFC; }
`;

const CurrencyPrefix = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  background: #F8FAFC;
  border-right: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
`;

const InnerInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px 10px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #0A2540;
  background: transparent;
  &:disabled { color: #6B7C93; }
`;

const IconBtn = styled.button`
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  color: #DC2626;
  font-size: 14px;
  &:hover:not(:disabled) { background: #FEE2E2; border-color: #FCA5A5; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const AddBtn = styled.button`
  align-self: flex-start;
  background: none;
  border: 1px dashed #C7D2FE;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 13px;
  color: #635BFF;
  cursor: pointer;
  &:hover:not(:disabled) { background: #F5F3FF; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const EmptyState = styled.div`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 16px;
  border: 1px dashed #E6EBF1;
  border-radius: 6px;
`;

// Mobile card layout (≤768px)
const CardList = styled.div`
  display: none;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Card = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

interface CurrencyCellProps {
  value: any;
  onChange: (v: string) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
  symbol: string;
  placeholder?: string;
}
const CurrencyCell: React.FC<CurrencyCellProps> = ({ value, onChange, onSave, disabled, symbol, placeholder }) => (
  <AutoSaveField onSave={onSave}>
    <CurrencyInputWrapper data-disabled={disabled ? 'true' : 'false'}>
      <CurrencyPrefix>{symbol}</CurrencyPrefix>
      <InnerInput
        type="number"
        step="0.01"
        min="0"
        inputMode="decimal"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder || '0.00'}
      />
    </CurrencyInputWrapper>
  </AutoSaveField>
);

const RentScheduleEditor: React.FC<Props> = ({ value, onChange, onSave, disabled, currency }) => {
  const list: RentScheduleRow[] = Array.isArray(value) ? value : [];
  const symbol = getCurrencySymbol(currency || 'MYR');

  const update = (i: number, key: keyof RentScheduleRow, val: string) => {
    const next = list.map((r, idx) => idx === i ? { ...r, [key]: val } : r);
    onChange(next);
  };

  const add = () => {
    const maxYear = list.reduce((m, r) => Math.max(m, Number(r.year) || 0), 0);
    onChange([...list, { year: maxYear + 1, base_rent: '', service_charge_psf: '', cleaning: '' }]);
  };

  const remove = (i: number) => {
    onChange(list.filter((_, idx) => idx !== i));
    setTimeout(() => { onSave(); }, 0);
  };

  if (list.length === 0) {
    return (
      <Wrapper>
        <EmptyState>No rent schedule rows</EmptyState>
        {!disabled && <AddBtn type="button" onClick={add}>+ Add First Year</AddBtn>}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Desktop table */}
      <Table>
        <HeaderCell>Year</HeaderCell>
        <HeaderCell>Base Rent</HeaderCell>
        <HeaderCell>Service Charge (psf)</HeaderCell>
        <HeaderCell>Cleaning</HeaderCell>
        <HeaderCell />
        {list.map((row, i) => (
          <React.Fragment key={i}>
            <RowCell>
              <YearBadge>Y{row.year ?? i + 1}</YearBadge>
            </RowCell>
            <RowCell>
              <CurrencyCell value={row.base_rent} onChange={v => update(i, 'base_rent', v)} onSave={onSave} disabled={disabled} symbol={symbol} />
            </RowCell>
            <RowCell>
              <CurrencyCell value={row.service_charge_psf} onChange={v => update(i, 'service_charge_psf', v)} onSave={onSave} disabled={disabled} symbol={symbol} />
            </RowCell>
            <RowCell>
              <CurrencyCell value={row.cleaning} onChange={v => update(i, 'cleaning', v)} onSave={onSave} disabled={disabled} symbol={symbol} />
            </RowCell>
            <RowCell>
              <IconBtn type="button" onClick={() => remove(i)} disabled={disabled} title="Remove" aria-label="Remove row">✕</IconBtn>
            </RowCell>
          </React.Fragment>
        ))}
      </Table>

      {/* Mobile card list */}
      <CardList>
        {list.map((row, i) => (
          <Card key={i}>
            <CardHeader>
              <YearBadge style={{ minWidth: 60 }}>Y{row.year ?? i + 1}</YearBadge>
              <IconBtn type="button" onClick={() => remove(i)} disabled={disabled} title="Remove" aria-label="Remove row">✕</IconBtn>
            </CardHeader>
            <CardField>
              <FieldLabel>Base Rent</FieldLabel>
              <CurrencyCell value={row.base_rent} onChange={v => update(i, 'base_rent', v)} onSave={onSave} disabled={disabled} symbol={symbol} />
            </CardField>
            <CardField>
              <FieldLabel>Service Charge (psf)</FieldLabel>
              <CurrencyCell value={row.service_charge_psf} onChange={v => update(i, 'service_charge_psf', v)} onSave={onSave} disabled={disabled} symbol={symbol} />
            </CardField>
            <CardField>
              <FieldLabel>Cleaning</FieldLabel>
              <CurrencyCell value={row.cleaning} onChange={v => update(i, 'cleaning', v)} onSave={onSave} disabled={disabled} symbol={symbol} />
            </CardField>
          </Card>
        ))}
      </CardList>

      {!disabled && <AddBtn type="button" onClick={add}>+ Add Year</AddBtn>}
    </Wrapper>
  );
};

export default RentScheduleEditor;
