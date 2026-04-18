import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';

export interface Representative {
  name?: string | null;
  id_number?: string | null;
  position?: string | null;
}

interface Props {
  value: Representative[] | null | undefined;
  onChange: (v: Representative[]) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 10px;
  align-items: end;
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

const IconBtn = styled.button`
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  padding: 10px 12px;
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
  padding: 12px;
  border: 1px dashed #E6EBF1;
  border-radius: 6px;
`;

const RepresentativeField: React.FC<Props> = ({ value, onChange, onSave, disabled }) => {
  const list: Representative[] = Array.isArray(value) ? value : [];

  const update = (i: number, key: keyof Representative, val: string) => {
    const next = list.map((r, idx) => idx === i ? { ...r, [key]: val } : r);
    onChange(next);
  };

  const add = () => {
    onChange([...list, { name: '', id_number: '', position: '' }]);
  };

  const remove = (i: number) => {
    onChange(list.filter((_, idx) => idx !== i));
    // Trigger save immediately on remove
    setTimeout(() => { onSave(); }, 0);
  };

  if (list.length === 0) {
    return (
      <Wrapper>
        <EmptyState>No representatives</EmptyState>
        {!disabled && <AddBtn type="button" onClick={add}>+ Add Representative</AddBtn>}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {list.map((rep, i) => (
        <Row key={i}>
          <Group>
            <Label>Name</Label>
            <AutoSaveField onSave={onSave}>
              <Input value={rep.name || ''} onChange={e => update(i, 'name', e.target.value)} disabled={disabled} />
            </AutoSaveField>
          </Group>
          <Group>
            <Label>ID Number</Label>
            <AutoSaveField onSave={onSave}>
              <Input value={rep.id_number || ''} onChange={e => update(i, 'id_number', e.target.value)} disabled={disabled} />
            </AutoSaveField>
          </Group>
          <Group>
            <Label>Position</Label>
            <AutoSaveField onSave={onSave}>
              <Input value={rep.position || ''} onChange={e => update(i, 'position', e.target.value)} disabled={disabled} />
            </AutoSaveField>
          </Group>
          <IconBtn type="button" onClick={() => remove(i)} disabled={disabled} title="Remove">✕</IconBtn>
        </Row>
      ))}
      {!disabled && <AddBtn type="button" onClick={add}>+ Add Representative</AddBtn>}
    </Wrapper>
  );
};

export default RepresentativeField;
