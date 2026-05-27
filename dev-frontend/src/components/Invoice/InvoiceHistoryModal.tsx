import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal as CommonModal } from '../UI';
import { useStore } from '../../contexts/StoreContext';
import { formatDateTime } from '../../utils/timezone';

export interface InvoiceModification {
  modified_at: string;
  modified_by: number;
  modified_by_name?: string;
  changes?: Record<string, { from: any; to: any }>;
  reason?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber?: string;
  history: InvoiceModification[];
}

const InvoiceHistoryModal: React.FC<Props> = ({ isOpen, onClose, invoiceNumber, history }) => {
  const { t } = useTranslation('common');
  const { operationSettings } = useStore();
  const sorted = (Array.isArray(history) ? [...history] : []).sort((a, b) =>
    new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime()
  );

  const fmtTime = (iso: string) => formatDateTime(iso, operationSettings, {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
  });

  const fmtValue = (v: any): string => {
    if (v == null || v === '') return '—';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${t('invoiceHistory.title', 'Modification History')}${invoiceNumber ? ` — ${invoiceNumber}` : ''}`}
    >
      {sorted.length === 0 ? (
        <Empty>
          <EmptyIcon aria-hidden="true">📜</EmptyIcon>
          <EmptyTitle>{t('invoiceHistory.empty', 'No modifications recorded yet')}</EmptyTitle>
          <EmptyDesc>{t('invoiceHistory.emptyDesc', 'Edits to this invoice will appear here as a timeline.')}</EmptyDesc>
        </Empty>
      ) : (
        <Timeline>
          {sorted.map((m, idx) => (
            <Entry key={idx}>
              <DotCol>
                <Dot />
                {idx < sorted.length - 1 && <Line />}
              </DotCol>
              <Body>
                <EntryHeader>
                  <Author>{m.modified_by_name || `User #${m.modified_by}`}</Author>
                  <Time title={new Date(m.modified_at).toISOString()}>{fmtTime(m.modified_at)}</Time>
                </EntryHeader>
                {m.reason && (
                  <Reason>"{m.reason}"</Reason>
                )}
                {m.changes && Object.keys(m.changes).length > 0 ? (
                  <ChangeList>
                    {Object.entries(m.changes).map(([field, val]) => (
                      <ChangeRow key={field}>
                        <Field>{field}</Field>
                        <Diff>
                          <From>{fmtValue(val?.from)}</From>
                          <Arrow>→</Arrow>
                          <To>{fmtValue(val?.to)}</To>
                        </Diff>
                      </ChangeRow>
                    ))}
                  </ChangeList>
                ) : (
                  <Subtle>{t('invoiceHistory.noFieldChanges', 'No tracked field changes for this entry')}</Subtle>
                )}
              </Body>
            </Entry>
          ))}
        </Timeline>
      )}
    </CommonModal>
  );
};

export default InvoiceHistoryModal;

// ─── Styled ──────────────────────────────────────────────────

const Empty = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: #4B5563;
`;
const EmptyIcon = styled.div`font-size: 48px; opacity: 0.6; margin-bottom: 12px;`;
const EmptyTitle = styled.div`font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 6px;`;
const EmptyDesc = styled.div`font-size: 13px;`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

const Entry = styled.div`
  display: flex;
  gap: 14px;
`;

const DotCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 6px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #635BFF;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #E0E7FF;
`;

const Line = styled.div`
  width: 2px;
  flex: 1;
  background: #C7CED6;
  margin-top: 4px;
  min-height: 20px;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  padding-bottom: 24px;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

const Author = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Time = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const Reason = styled.div`
  font-size: 13px;
  color: #374151;
  font-style: italic;
  margin-bottom: 8px;
  padding: 6px 10px;
  background: #F1F4F8;
  border-left: 3px solid #635BFF;
  border-radius: 4px;
`;

const ChangeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #F9FAFB;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 10px 12px;
`;

const ChangeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: baseline;
  font-size: 13px;
  flex-wrap: wrap;
`;

const Field = styled.span`
  font-family: ui-monospace, monospace;
  font-size: 12px;
  color: #635BFF;
  background: #EEF2FF;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  flex-shrink: 0;
`;

const Diff = styled.div`
  display: flex;
  gap: 6px;
  align-items: baseline;
  flex: 1;
  flex-wrap: wrap;
`;

const From = styled.span`
  color: #DC2626;
  font-size: 12px;
  font-family: ui-monospace, monospace;
  text-decoration: line-through;
  opacity: 0.85;
`;

const Arrow = styled.span`
  color: #6B7280;
  font-size: 12px;
`;

const To = styled.span`
  color: #059669;
  font-size: 12px;
  font-family: ui-monospace, monospace;
  font-weight: 600;
`;

const Subtle = styled.div`
  font-size: 12px;
  color: #6B7280;
  font-style: italic;
`;
