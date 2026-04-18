import React from 'react';
import styled from 'styled-components';
import AutoSaveField from '../Common/AutoSaveField';

export interface SupportService {
  code: string;
  group?: string;
  title?: string;
  included?: boolean;
  notes?: string;
}

interface Props {
  value: SupportService[] | null | undefined;
  onChange: (v: SupportService[]) => void;
  onSave: () => Promise<any>;
  disabled?: boolean;
  template?: SupportService[];   // canonical template from backend
}

const GROUP_LABELS: Record<string, string> = {
  initial_setup: 'Initial Setup',
  operations: 'Operations',
  training: 'Training',
  design: 'Design'
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const GroupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GroupTitle = styled.h5`
  font-size: 11px;
  font-weight: 600;
  color: #635BFF;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
`;

const CountBadge = styled.span`
  font-size: 11px;
  color: #6B7C93;
  background: #F3F4F6;
  padding: 2px 8px;
  border-radius: 10px;
`;

const Row = styled.div<{ checked: boolean }>`
  display: grid;
  grid-template-columns: 28px 1fr 1.2fr;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid ${p => p.checked ? '#C7D2FE' : '#E6EBF1'};
  background: ${p => p.checked ? '#F5F3FF' : '#fff'};
  border-radius: 6px;
  align-items: center;
  transition: background 0.15s, border-color 0.15s;
  @media (max-width: 768px) {
    grid-template-columns: 28px 1fr;
    & > :last-child { grid-column: 1 / -1; }
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  &:disabled { cursor: not-allowed; }
`;

const TitleCell = styled.div<{ checked: boolean }>`
  font-size: 14px;
  color: ${p => p.checked ? '#0A2540' : '#6B7C93'};
  font-weight: ${p => p.checked ? 500 : 400};
`;

const NotesInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  outline: none;
  background: #fff;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F8FAFC; color: #6B7C93; }
`;

const EmptyState = styled.div`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 16px;
  border: 1px dashed #E6EBF1;
  border-radius: 8px;
`;

const SupportServicesChecklist: React.FC<Props> = ({ value, onChange, onSave, disabled, template }) => {
  // Merge template with existing values: template defines the canonical list,
  // existing value provides included/notes overrides.
  const current: SupportService[] = Array.isArray(value) ? value : [];
  const merged: SupportService[] = React.useMemo(() => {
    if (!template || template.length === 0) return current;
    return template.map(t => {
      const existing = current.find(s => s.code === t.code);
      return existing
        ? { ...t, included: existing.included ?? false, notes: existing.notes ?? '' }
        : { ...t, included: false, notes: '' };
    });
  }, [template, current]);

  // When merged differs from value (first-load case), propagate once.
  React.useEffect(() => {
    if (template && template.length > 0 && current.length === 0) {
      onChange(merged);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  const toggle = (code: string) => {
    const next = merged.map(s => s.code === code ? { ...s, included: !s.included } : s);
    onChange(next);
    setTimeout(() => { onSave(); }, 0);
  };

  const updateNotes = (code: string, notes: string) => {
    onChange(merged.map(s => s.code === code ? { ...s, notes } : s));
  };

  if (merged.length === 0) {
    return <EmptyState>No support services template available</EmptyState>;
  }

  // Group by group key
  const groups: Record<string, SupportService[]> = {};
  merged.forEach(s => {
    const g = s.group || 'other';
    if (!groups[g]) groups[g] = [];
    groups[g].push(s);
  });
  const groupOrder = ['initial_setup', 'operations', 'training', 'design', 'other'];

  return (
    <Wrapper>
      {groupOrder.filter(g => groups[g]).map(g => {
        const rows = groups[g];
        const activeCount = rows.filter(r => r.included).length;
        return (
          <GroupSection key={g}>
            <GroupHeader>
              <GroupTitle>{GROUP_LABELS[g] || g}</GroupTitle>
              <CountBadge>{activeCount}/{rows.length}</CountBadge>
            </GroupHeader>
            {rows.map(row => (
              <Row key={row.code} checked={!!row.included}>
                <Checkbox
                  checked={!!row.included}
                  onChange={() => toggle(row.code)}
                  disabled={disabled}
                  aria-label={`Toggle ${row.title}`}
                />
                <TitleCell checked={!!row.included}>{row.title || row.code}</TitleCell>
                <AutoSaveField onSave={onSave}>
                  <NotesInput
                    value={row.notes || ''}
                    onChange={e => updateNotes(row.code, e.target.value)}
                    disabled={disabled || !row.included}
                    placeholder={row.included ? 'Notes (optional)' : ''}
                  />
                </AutoSaveField>
              </Row>
            ))}
          </GroupSection>
        );
      })}
    </Wrapper>
  );
};

export default SupportServicesChecklist;
