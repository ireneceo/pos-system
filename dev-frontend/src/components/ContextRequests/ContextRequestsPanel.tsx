import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemedButton, ThemedModalButton, DataTableStatus } from '../UI';
import { Modal, FormGroup, FormLabel, FormTextArea } from '../UI/Modal';
import StaffPermissionPicker from '../Staff/StaffPermissionPicker';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/dateFormat';
import { useStore } from '../../contexts/StoreContext';

/**
 * 역할 요청 처리 패널 — 멀티 로그인 v1.3 (.claude/fable-design-20261005-context-request.md §6.4).
 * SA(Staff Management) 와 RA(자기 매장 Staff 화면)가 **같은 컴포넌트**를 쓴다.
 * 보이는 범위는 서버(visibleRequestScope)가 정한다 — scope prop 은 표시 구분용일 뿐 권한이 아니다.
 *
 * Staff 요청의 승인 = 승인자가 권한을 고른 뒤(1개 이상). 그 외 역할은 즉시 승인.
 * 승인은 서버에서 grantContext(유일한 쓰기 경로)를 부른다. 실패 사유는 서버 message 그대로.
 * pending 0건이면 아무것도 그리지 않는다.
 */

interface RequestRow {
  id: number;
  entity_type: 'restaurant' | 'brand';
  entity_id: number;
  role: string;
  label: string | null;
  message: string | null;
  created_at: string;
  requester: { id: number; full_name: string | null; email: string | null; role: string };
}

const ROLE_KEY: Record<string, string> = {
  'Staff': 'context.request.typeStoreStaff',
  'Restaurant Admin': 'context.request.typeStoreAdmin',
  'Restaurant Owner': 'context.request.typeStoreOwner',
  'Brand Manager': 'context.request.typeBrandManager'
};

const Panel = styled.section`
  margin: 16px 32px 0;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #C7CED6;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin: 12px 16px 0;
  }
`;

const PanelTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`;

const Row = styled.div`
  padding: 12px 0;
  border-top: 1px solid #E3E8EE;

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }
`;

const RowMain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const RowText = styled.div`
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Requester = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Muted = styled.span`
  font-weight: 400;
  color: #425466;
`;

const Target = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #1F2937;
`;

const Message = styled.div`
  font-size: 13px;
  color: #425466;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ErrorText = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #EF4444;
`;

const PickerWrap = styled.div`
  margin-top: 4px;
`;

const PickerActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const PickerHint = styled.span`
  font-size: 13px;
  color: #425466;
`;

const authHeaders = () => {
  const token = getAuthToken();
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

interface Props {
  scope: 'admin' | 'restaurant';
  /** 처리 뒤 바깥(대기수 등)을 갱신할 때 */
  onChanged?: () => void;
}

const ContextRequestsPanel: React.FC<Props> = ({ scope, onChanged }) => {
  const { t } = useTranslation('auth');
  const { getStoreInfo } = useStore();
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [pickerFor, setPickerFor] = useState<number | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [rejecting, setRejecting] = useState<RequestRow | null>(null);
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/context-requests?status=pending', { headers: authHeaders() });
      const body = await res.json().catch(() => null);
      setRows(res.ok && body && Array.isArray(body.data) ? body.data : []);
    } catch {
      setRows([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const after = useCallback(() => { load(); if (onChanged) onChanged(); }, [load, onChanged]);

  const setRowError = (id: number, msg: string | null) =>
    setErrors(prev => { const n = { ...prev }; if (msg) n[id] = msg; else delete n[id]; return n; });

  const approve = async (row: RequestRow, permissions?: string[]) => {
    setRowError(row.id, null);
    try {
      const res = await fetch(`/api/context-requests/${row.id}/approve`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(permissions ? { permissions } : {})
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) { setRowError(row.id, (body && body.message) || t('context.requests.failed')); return; }
      setPickerFor(null);
      setPicked([]);
      after();
    } catch {
      setRowError(row.id, t('context.requests.failed'));
    }
  };

  const reject = async () => {
    const row = rejecting;
    if (!row) return;
    try {
      const res = await fetch(`/api/context-requests/${row.id}/reject`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ note: note.trim() || undefined })
      });
      const body = await res.json().catch(() => null);
      setRejecting(null);
      setNote('');
      if (!res.ok) { setRowError(row.id, (body && body.message) || t('context.requests.failed')); return; }
      after();
    } catch {
      setRejecting(null);
      setRowError(row.id, t('context.requests.failed'));
    }
  };

  if (!rows.length) return null;

  const tz = getStoreInfo()?.timeZone;

  return (
    <Panel data-scope={scope}>
      <PanelTitle>{t('context.requests.title')} ({rows.length})</PanelTitle>
      {rows.map(row => {
        const isStaff = row.entity_type === 'restaurant' && row.role === 'Staff';
        const glyph = row.role === 'Restaurant Owner' ? '◯' : row.entity_type === 'brand' ? '◐' : '▦';
        const who = row.requester.full_name || row.requester.email || `#${row.requester.id}`;
        return (
          <Row key={row.id}>
            <RowMain>
              <RowText>
                <Requester>
                  {who} <Muted>({[row.requester.email, row.requester.role].filter(Boolean).join(' · ')})</Muted>
                </Requester>
                <Target>
                  <span>{glyph} {row.label || t('context.request.deletedTarget')}</span>
                  <DataTableStatus variant="info">{ROLE_KEY[row.role] ? t(ROLE_KEY[row.role]) : row.role}</DataTableStatus>
                  {tz && <Muted>{t('context.requests.requestedOn', { date: formatDate(row.created_at, tz) })}</Muted>}
                </Target>
                {row.message && <Message title={row.message}>{row.message}</Message>}
              </RowText>
              <Actions>
                <ThemedButton
                  variant="primary"
                  size="small"
                  onClick={() => {
                    if (isStaff) { setPickerFor(pickerFor === row.id ? null : row.id); setPicked([]); return undefined; }
                    return approve(row);
                  }}
                >
                  {t('context.requests.approve')}
                </ThemedButton>
                <ThemedButton variant="danger" size="small" onClick={() => { setRejecting(row); setNote(''); }}>
                  {t('context.requests.reject')}
                </ThemedButton>
              </Actions>
            </RowMain>

            {isStaff && pickerFor === row.id && (
              <PickerWrap>
                <StaffPermissionPicker value={picked} onChange={setPicked} />
                <PickerActions>
                  <ThemedButton variant="primary" size="small" disabled={picked.length === 0} onClick={() => approve(row, picked)}>
                    {t('context.requests.approveWithPermissions')}
                  </ThemedButton>
                  <ThemedButton variant="secondary" size="small" onClick={() => { setPickerFor(null); setPicked([]); }}>
                    {t('context.requests.collapse')}
                  </ThemedButton>
                  <PickerHint>{picked.length === 0 ? t('context.requests.needOnePermission') : t('context.requests.pickPermissions')}</PickerHint>
                </PickerActions>
              </PickerWrap>
            )}

            {errors[row.id] && <ErrorText>{errors[row.id]}</ErrorText>}
          </Row>
        );
      })}

      <Modal
        isOpen={rejecting !== null}
        onClose={() => setRejecting(null)}
        title={t('context.requests.rejectTitle')}
        size="small"
        footer={
          <>
            <ThemedModalButton variant="secondary" onClick={() => setRejecting(null)}>{t('context.requests.cancel')}</ThemedModalButton>
            <ThemedModalButton variant="danger" onClick={reject}>{t('context.requests.reject')}</ThemedModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>{t('context.requests.rejectNote')}</FormLabel>
          <FormTextArea rows={3} maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} />
        </FormGroup>
      </Modal>
    </Panel>
  );
};

export default ContextRequestsPanel;
