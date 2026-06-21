import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, ModalBody, ModalFooter,
  FormGroup, FormLabel
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import AlertDialog from '../../components/Common/AlertDialog';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

interface PendingPO {
  id: number;
  po_number: string;
  restaurant_name: string | null;
  seller_name?: string | null;
  seller_type?: string;
  item_count?: number;
  items?: Array<{ id: number }>;
  total_amount: number | string;
  currency?: string;
  created_at: string;
}

const ReasonTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  color: #1F2937;
  background: #FFFFFF;
  box-sizing: border-box;
  resize: vertical;
  &:focus { outline: none; border-color: #635BFF; }
  &::placeholder { color: #9CA3AF; }
`;

const OwnerPoApprovalsPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const [rows, setRows] = useState<PendingPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const [approveTarget, setApproveTarget] = useState<PendingPO | null>(null);
  const [rejectTarget, setRejectTarget] = useState<PendingPO | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders/pending-approval', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setRows(res.ok && json.success && Array.isArray(json.data) ? json.data : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const itemCount = (r: PendingPO) => r.item_count ?? (Array.isArray(r.items) ? r.items.length : 0);

  const doApprove = async () => {
    if (!approveTarget) return;
    const target = approveTarget;
    setApproveTarget(null);
    setBusyId(target.id);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${target.id}/approve`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('approve failed');
      await load();
    } catch {
      setAlert({ title: t('ownerApprovals.reject'), message: t('ownerApprovals.actionFailed') });
    } finally {
      setBusyId(null);
    }
  };

  const doReject = async () => {
    if (!rejectTarget) return;
    const reason = rejectReason.trim();
    if (!reason) return;
    const target = rejectTarget;
    setBusyId(target.id);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${target.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason })
      });
      if (!res.ok) throw new Error('reject failed');
      setRejectTarget(null);
      setRejectReason('');
      await load();
    } catch {
      setAlert({ title: t('ownerApprovals.reject'), message: t('ownerApprovals.actionFailed') });
    } finally {
      setBusyId(null);
    }
  };

  const pendingCount = useMemo(() => rows.length, [rows]);

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('ownerApprovals.title')}</Title>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
            {t('ownerApprovals.subtitle')}
          </div>
        </div>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard>
            <StatValue>{pendingCount}</StatValue>
            <StatLabel>{t('ownerApprovals.pending')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>{t('ownerApprovals.table.poNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('ownerApprovals.table.restaurant')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('ownerApprovals.table.seller')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('ownerApprovals.table.items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('ownerApprovals.table.total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.status')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('ownerApprovals.table.createdAt')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('ownerApprovals.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading && rows.length === 0 ? (
                <tr><td colSpan={8}><DataTableEmpty>{t('ownerApprovals.loading')}</DataTableEmpty></td></tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <DataTableEmpty>
                      <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, color: '#1F2937' }}>
                        {t('ownerApprovals.empty.title')}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563' }}>
                        {t('ownerApprovals.empty.hint')}
                      </div>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                rows.map(row => (
                  <DataTableRow key={row.id}>
                    <DataTableCell data-label={t('ownerApprovals.table.poNumber') as string}>
                      <span style={{ fontWeight: 700, color: '#1F2937' }}>{row.po_number}</span>
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.restaurant') as string}>
                      {row.restaurant_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.seller') as string}>
                      {row.seller_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.items') as string} align="center">
                      {itemCount(row)}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.total') as string} align="right">
                      {formatMoney(row.total_amount, row.currency)}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.status') as string} align="center">
                      <DataTableStatus variant="warning">{t('status.pending_approval')}</DataTableStatus>
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.createdAt') as string}>
                      {formatDate(row.created_at) || '-'}
                    </DataTableCell>
                    <DataTableCell data-label="" align="right" mobileFullWidth>
                      <DataTableActions>
                        <ThemedButton
                          size="small"
                          variant="primary"
                          disabled={busyId === row.id}
                          onClick={() => setApproveTarget(row)}
                        >
                          {t('ownerApprovals.approve')}
                        </ThemedButton>
                        <ThemedButton
                          size="small"
                          variant="outline"
                          disabled={busyId === row.id}
                          onClick={() => { setRejectTarget(row); setRejectReason(''); }}
                        >
                          {t('ownerApprovals.reject')}
                        </ThemedButton>
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      {/* 승인 확인 */}
      <ConfirmDialog
        isOpen={!!approveTarget}
        onClose={() => setApproveTarget(null)}
        onConfirm={doApprove}
        title={t('ownerApprovals.approveTitle')}
        message={t('ownerApprovals.approveConfirm', { po: approveTarget?.po_number || '' }) as string}
        confirmText={t('ownerApprovals.approve') as string}
        variant="info"
      />

      {/* 반려 사유 입력 */}
      {rejectTarget && (
        <ModalOverlay onClick={() => { if (busyId === null) { setRejectTarget(null); setRejectReason(''); } }}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
            <ModalHeader>
              <ModalTitle>{t('ownerApprovals.rejectTitle')}</ModalTitle>
              <CloseButton onClick={() => { setRejectTarget(null); setRejectReason(''); }}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
                {rejectTarget.po_number} · {rejectTarget.restaurant_name || ''}
              </div>
              <FormGroup>
                <FormLabel>{t('ownerApprovals.rejectReasonLabel')} *</FormLabel>
                <ReasonTextarea
                  value={rejectReason}
                  autoFocus
                  placeholder={t('ownerApprovals.rejectReasonPlaceholder') as string}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <ThemedButton variant="outline" onClick={() => { setRejectTarget(null); setRejectReason(''); }}>
                {t('common.cancel')}
              </ThemedButton>
              <ThemedButton
                variant="danger"
                disabled={!rejectReason.trim() || busyId === rejectTarget.id}
                onClick={doReject}
              >
                {t('ownerApprovals.rejectSubmit')}
              </ThemedButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      <AlertDialog
        isOpen={!!alert}
        onClose={() => setAlert(null)}
        title={alert?.title || ''}
        message={alert?.message || ''}
      />
    </Container>
  );
};

export default OwnerPoApprovalsPage;
