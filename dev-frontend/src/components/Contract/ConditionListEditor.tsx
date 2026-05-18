import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';

export interface Condition {
  title?: string | null;
  content?: string | null;
}

interface Props {
  value: Condition[] | null | undefined;
  onChange: (v: Condition[]) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
  addLabel?: string;
  emptyLabel?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
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
  align-items: center;
  gap: 10px;
`;

const IndexBadge = styled.div`
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #F5F3FF;
  color: #635BFF;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TitleInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F8FAFC; color: #6B7C93; }
`;

const ContentArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
  font-family: inherit;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F8FAFC; color: #6B7C93; }
`;

const IconBtn = styled.button`
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  color: #DC2626;
  font-size: 13px;
  flex-shrink: 0;
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
  border-radius: 8px;
`;

const ConditionListEditor: React.FC<Props> = ({ value, onChange, onSave, disabled, addLabel, emptyLabel }) => {
  const list: Condition[] = Array.isArray(value) ? value : [];

  const update = (i: number, key: keyof Condition, val: string) => {
    onChange(list.map((r, idx) => idx === i ? { ...r, [key]: val } : r));
  };

  const add = () => {
    onChange([...list, { title: '', content: '' }]);
  };

  const remove = (i: number) => {
    onChange(list.filter((_, idx) => idx !== i));
    setTimeout(() => { onSave(); }, 0);
  };

  if (list.length === 0) {
    return (
      <Wrapper>
        <EmptyState>{emptyLabel || 'No conditions'}</EmptyState>
        {!disabled && <AddBtn type="button" onClick={add}>{addLabel || 'Add First Condition'}</AddBtn>}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {list.map((item, i) => (
        <Card key={i}>
          <CardHeader>
            <IndexBadge>{i + 1}</IndexBadge>
            <AutoSaveField onSave={onSave} style={{ flex: 1 }}>
              <TitleInput
                value={item.title || ''}
                onChange={e => update(i, 'title', e.target.value)}
                disabled={disabled}
                placeholder="Condition title"
              />
            </AutoSaveField>
            <IconBtn type="button" onClick={() => remove(i)} disabled={disabled} title="Remove" aria-label="Remove condition">✕</IconBtn>
          </CardHeader>
          <AutoSaveField onSave={onSave}>
            <ContentArea
              value={item.content || ''}
              onChange={e => update(i, 'content', e.target.value)}
              disabled={disabled}
              placeholder="Content / details"
            />
          </AutoSaveField>
        </Card>
      ))}
      {!disabled && <AddBtn type="button" onClick={add}>{addLabel || 'Add Condition'}</AddBtn>}
    </Wrapper>
  );
};

export default ConditionListEditor;
