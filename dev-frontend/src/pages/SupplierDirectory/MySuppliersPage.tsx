import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormTextArea
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

type ContractStatus = 'requested' | 'active' | 'rejected' | 'terminated';

interface PaymentTerms {
  terms?: string;
  invoice_cycle?: 'immediate' | 'monthly_soa';
  payment_due_day?: number | null;
  credit_limit?: number | null;
  currency?: string;
  notes?: string;
}

interface MyContractRow {
  id: number;
  supplier_company_id: number;
  supplier_name: string;
  supplier_logo_url?: string | null;
  status: ContractStatus;
  requested_at?: string | null;
  approved_at?: string | null;
  rejected_at?: string | null;
  terminated_at?: string | null;
  payment_terms?: PaymentTerms | null;
  request_message?: string | null;
  rejection_reason?: string | null;
  termination_reason?: string | null;
  approved_by_name?: string | null;
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ErrorBox = styled.div`
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
  margin-top: 12px;
`;

const ModalSection = styled.div`
  margin-bottom: 16px;
`;

const ModalSectionTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 8px;
`;

const KvGrid = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 8px 16px;
  font-size: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    row-gap: 4px;
  }
`;

const KvKey = styled.div`
  color: #6B7280;
  font-size: 13px;
`;

const KvValue = styled.div`
  color: #0A2540;
  word-break: break-word;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const Dot = styled.div<{ active?: boolean; variant?: 'success' | 'danger' | 'warning' | 'neutral' }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
  background: ${(p) => {
    if (!p.active) return '#E5E7EB';
    switch (p.variant) {
      case 'success': return '#10B981';
      case 'danger': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#6B7280';
    }
  }};
`;

const StatusVariantMap: Record<ContractStatus, 'success' | 'warning' | 'error' | 'info'> = {
  active: 'success',
  requested: 'warning',
  rejected: 'error',
  terminated: 'error'
};

function formatPaymentTerms(t: PaymentTerms | null | undefined): string {
  if (!t || !t.terms) return '-';
  const parts: string[] = [t.terms];
  if (t.invoice_cycle === 'monthly_soa') {
    parts.push(t.payment_due_day ? `SOA · day ${t.payment_due_day}` : 'SOA');
  } else if (t.invoice_cycle === 'immediate') {
    parts.push('Immediate');
  }
  if (t.credit_limit != null && Number(t.credit_limit) > 0) {
    parts.push(`${t.currency || 'MYR'} ${Number(t.credit_limit).toLocaleString()}`);
  }
  return parts.join(' · ');
}

const MySuppliersPage: React.FC = () => {
  const { t } = useTranslation(['supplierDirectory', 'common']);
  const navigate = useNavigate();
  const { contractId: routeContractId } = useParams<{ contractId?: string }>();

  const [rows, setRows] = useState<MyContractRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<MyContractRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [terminateOpen, setTerminateOpen] = useState(false);
  const [terminateReason, setTerminateReason] = useState('');
  const [terminateSubmitting, setTerminateSubmitting] = useState(false);
  const [terminateError, setTerminateError] = useState<string | null>(null);
  const [terminateTarget, setTerminateTarget] = useState<MyContractRow | null>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const url = `/api/supplier-contracts${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data.map((r: any) => ({
        ...r,
        supplier_name: r.supplier_name || r.supplierCompany?.name || ''
      })) : []);
    } catch (err) {
      console.error('Failed to fetch contracts:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchList(); }, [fetchList]);

  const openDetail = useCallback(async (id: number, fallback?: MyContractRow) => {
    setDetailOpen(true);
    setDetailError(null);
    setDetail(fallback || null);
    setDetailLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier-contracts/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setDetailError(data?.message || (t('contractDetail.loadFailed') as string));
        return;
      }
      setDetail(data.data || null);
    } catch (err) {
      console.error('Failed to fetch contract detail:', err);
      setDetailError(t('contractDetail.loadFailed') as string);
    } finally {
      setDetailLoading(false);
    }
  }, [t]);

  // Auto-open detail when accessed via /pos/suppliers/contracts/:contractId
  useEffect(() => {
    if (routeContractId) {
      const numericId = Number(routeContractId);
      if (!Number.isNaN(numericId)) {
        openDetail(numericId);
      }
    }
  }, [routeContractId, openDetail]);

  const closeDetail = () => {
    setDetailOpen(false);
    setDetail(null);
    setDetailError(null);
    if (routeContractId) {
      navigate('/pos/suppliers/contracts', { replace: true });
    }
  };

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r => (r.supplier_name || '').toLowerCase().includes(term));
  }, [rows, search]);

  const stats = useMemo(() => {
    const total = rows.length;
    let active = 0, pending = 0, ended = 0;
    for (const r of rows) {
      if (r.status === 'active') active++;
      else if (r.status === 'requested') pending++;
      else if (r.status === 'rejected' || r.status === 'terminated') ended++;
    }
    return { total, active, pending, ended };
  }, [rows]);

  const openTerminate = (row: MyContractRow) => {
    setTerminateTarget(row);
    setTerminateReason('');
    setTerminateError(null);
    setTerminateOpen(true);
  };

  const submitTerminate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminateTarget || terminateSubmitting) return;
    if (!terminateReason.trim()) {
      setTerminateError(t('terminate.reasonRequired') as string);
      return;
    }
    setTerminateError(null);
    setTerminateSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier-contracts/${terminateTarget.id}/terminate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: terminateReason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setTerminateError(data?.message || (t('terminate.submitFailed') as string));
        return;
      }
      setTerminateOpen(false);
      setTerminateTarget(null);
      setTerminateReason('');
      // Close detail modal as well if showing the same contract
      if (detail?.id === terminateTarget.id) closeDetail();
      await fetchList();
    } catch (err) {
      console.error('Failed to terminate contract:', err);
      setTerminateError(t('terminate.submitFailed') as string);
    } finally {
      setTerminateSubmitting(false);
    }
  };

  const renderTimeline = (row: MyContractRow) => {
    return (
      <Timeline>
        <TimelineItem>
          <Dot active variant="warning" />
          <div>
            <strong>{t('contractDetail.events.requested')}</strong>
            <div style={{ color: '#6B7280' }}>{formatDate(row.requested_at)}</div>
          </div>
        </TimelineItem>
        {row.approved_at && (
          <TimelineItem>
            <Dot active variant="success" />
            <div>
              <strong>{t('contractDetail.events.approved')}</strong>
              <div style={{ color: '#6B7280' }}>{formatDate(row.approved_at)}</div>
            </div>
          </TimelineItem>
        )}
        {row.rejected_at && (
          <TimelineItem>
            <Dot active variant="danger" />
            <div>
              <strong>{t('contractDetail.events.rejected')}</strong>
              <div style={{ color: '#6B7280' }}>{formatDate(row.rejected_at)}</div>
              {row.rejection_reason && <div>{row.rejection_reason}</div>}
            </div>
          </TimelineItem>
        )}
        {row.terminated_at && (
          <TimelineItem>
            <Dot active variant="danger" />
            <div>
              <strong>{t('contractDetail.events.terminated')}</strong>
              <div style={{ color: '#6B7280' }}>{formatDate(row.terminated_at)}</div>
              {row.termination_reason && <div>{row.termination_reason}</div>}
            </div>
          </TimelineItem>
        )}
      </Timeline>
    );
  };

  return (
    <Container>
      <Content>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('directory.search') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t('myContracts.filter.all')}</option>
            <option value="requested">{t('myContracts.filter.requested')}</option>
            <option value="active">{t('myContracts.filter.active')}</option>
            <option value="rejected">{t('myContracts.filter.rejected')}</option>
            <option value="terminated">{t('myContracts.filter.terminated')}</option>
          </FilterSelect>
          <div style={{ marginLeft: 'auto' }}>
            <ThemedButton
              variant="outline"
              onClick={() => navigate('/pos/suppliers?tab=find')}
            >
              {t('myContracts.findSuppliers')}
            </ThemedButton>
          </div>
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('myContracts.table.supplier')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('myContracts.table.requestedAt')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('myContracts.table.status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('myContracts.table.paymentTerms')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('myContracts.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}><DataTableEmpty>{t('directory.loading')}</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <DataTableEmpty>
                      <div style={{ marginBottom: 12 }}>{t('myContracts.noContracts')}</div>
                      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
                        {t('myContracts.noContractsHint')}
                      </div>
                      <ThemedButton
                        size="small"
                        variant="primary"
                        onClick={() => navigate('/pos/suppliers/directory')}
                      >
                        {t('myContracts.findSuppliers')}
                      </ThemedButton>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <DataTableRow key={row.id}>
                    <DataTableCell data-label={t('myContracts.table.supplier') as string}>
                      <strong>{row.supplier_name}</strong>
                    </DataTableCell>
                    <DataTableCell data-label={t('myContracts.table.requestedAt') as string}>
                      {formatDate(row.requested_at) || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('myContracts.table.status') as string} align="center">
                      <DataTableStatus variant={StatusVariantMap[row.status] || 'info'}>
                        {t(`status.${row.status}`)}
                      </DataTableStatus>
                    </DataTableCell>
                    <DataTableCell data-label={t('myContracts.table.paymentTerms') as string}>
                      {row.status === 'active' ? formatPaymentTerms(row.payment_terms) : '-'}
                    </DataTableCell>
                    <DataTableCell data-label="" align="right" mobileFullWidth>
                      <DataTableActions>
                        <ThemedButton
                          size="small"
                          variant="outline"
                          onClick={() => openDetail(row.id, row)}
                        >
                          {t('myContracts.view')}
                        </ThemedButton>
                        {row.status === 'active' && (
                          <ThemedButton
                            size="small"
                            variant="danger-outline"
                            onClick={() => openTerminate(row)}
                          >
                            {t('myContracts.terminate')}
                          </ThemedButton>
                        )}
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      {/* Contract Detail Modal */}
      <CommonModal
        isOpen={detailOpen}
        onClose={closeDetail}
        title={detail ? `${t('contractDetail.title')} — ${detail.supplier_name}` : (t('contractDetail.title') as string)}
        size="large"
        footer={
          <>
            <ModalButton type="button" onClick={closeDetail}>
              {t('common.close')}
            </ModalButton>
            {detail?.status === 'active' && (
              <ModalButton
                type="button"
                variant="danger"
                onClick={() => openTerminate(detail)}
              >
                {t('myContracts.terminate')}
              </ModalButton>
            )}
          </>
        }
      >
        {detailLoading && !detail ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#6B7280' }}>
            {t('directory.loading')}
          </div>
        ) : detailError ? (
          <ErrorBox>{detailError}</ErrorBox>
        ) : detail ? (
          <>
            <ModalSection>
              <ModalSectionTitle>{t('contractDetail.supplierInfo')}</ModalSectionTitle>
              <KvGrid>
                <KvKey>{t('myContracts.table.supplier')}</KvKey>
                <KvValue>{detail.supplier_name}</KvValue>
                <KvKey>{t('myContracts.table.status')}</KvKey>
                <KvValue>
                  <DataTableStatus variant={StatusVariantMap[detail.status] || 'info'}>
                    {t(`status.${detail.status}`)}
                  </DataTableStatus>
                </KvValue>
              </KvGrid>
            </ModalSection>

            <ModalSection>
              <ModalSectionTitle>{t('contractDetail.statusTimeline')}</ModalSectionTitle>
              {renderTimeline(detail)}
            </ModalSection>

            {detail.status === 'active' && detail.payment_terms && (
              <ModalSection>
                <ModalSectionTitle>{t('contractDetail.paymentTerms')}</ModalSectionTitle>
                <KvGrid>
                  <KvKey>{t('approve.termsLabel')}</KvKey>
                  <KvValue>{detail.payment_terms.terms || '-'}</KvValue>
                  <KvKey>{t('approve.invoiceCycle')}</KvKey>
                  <KvValue>
                    {detail.payment_terms.invoice_cycle === 'monthly_soa' ? t('approve.cycleMonthly') :
                     detail.payment_terms.invoice_cycle === 'immediate' ? t('approve.cycleImmediate') : '-'}
                  </KvValue>
                  {detail.payment_terms.invoice_cycle === 'monthly_soa' && (
                    <>
                      <KvKey>{t('approve.paymentDueDay')}</KvKey>
                      <KvValue>{detail.payment_terms.payment_due_day || '-'}</KvValue>
                    </>
                  )}
                  {detail.payment_terms.credit_limit != null && Number(detail.payment_terms.credit_limit) > 0 && (
                    <>
                      <KvKey>{t('approve.creditLimit')}</KvKey>
                      <KvValue>
                        {detail.payment_terms.currency || 'MYR'} {Number(detail.payment_terms.credit_limit).toLocaleString()}
                      </KvValue>
                    </>
                  )}
                  {detail.payment_terms.notes && (
                    <>
                      <KvKey>{t('approve.notes')}</KvKey>
                      <KvValue>{detail.payment_terms.notes}</KvValue>
                    </>
                  )}
                </KvGrid>
              </ModalSection>
            )}

            <ModalSection>
              <ModalSectionTitle>{t('contractDetail.messages')}</ModalSectionTitle>
              <KvGrid>
                <KvKey>{t('contractDetail.yourMessage')}</KvKey>
                <KvValue>{detail.request_message || '-'}</KvValue>
                {detail.rejection_reason && (
                  <>
                    <KvKey>{t('contractDetail.rejectionReason')}</KvKey>
                    <KvValue>{detail.rejection_reason}</KvValue>
                  </>
                )}
                {detail.termination_reason && (
                  <>
                    <KvKey>{t('contractDetail.terminationReason')}</KvKey>
                    <KvValue>{detail.termination_reason}</KvValue>
                  </>
                )}
              </KvGrid>
            </ModalSection>
          </>
        ) : null}
      </CommonModal>

      {/* Terminate Modal */}
      <CommonModal
        isOpen={terminateOpen}
        onClose={() => !terminateSubmitting && setTerminateOpen(false)}
        title={t('terminate.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setTerminateOpen(false)} disabled={terminateSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="terminate-contract-form"
              variant="danger"
              disabled={terminateSubmitting}
            >
              {terminateSubmitting ? t('common.submitting') : t('terminate.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="terminate-contract-form" onSubmit={submitTerminate}>
          <div style={{
            padding: 12,
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: 8,
            color: '#991B1B',
            fontSize: 13,
            marginBottom: 16
          }}>
            {t('terminate.warning')}
          </div>
          <UIFormGroup>
            <FormLabel>{t('terminate.reasonLabel')} *</FormLabel>
            <FormTextArea
              rows={4}
              value={terminateReason}
              onChange={(e) => setTerminateReason(e.target.value)}
              placeholder={t('terminate.reasonPlaceholder') as string}
              maxLength={500}
              required
            />
          </UIFormGroup>
          {terminateError && <ErrorBox>{terminateError}</ErrorBox>}
        </form>
      </CommonModal>
    </Container>
  );
};

export default MySuppliersPage;
