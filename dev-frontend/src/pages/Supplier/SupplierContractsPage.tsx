import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea
} from '../../components/UI';
import { Tabs, Tab, Badge as TabBadge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

type ContractStatus = 'requested' | 'active' | 'rejected' | 'terminated';
type TabType = 'pending' | 'active' | 'rejected' | 'terminated';

interface PaymentTerms {
  terms?: string;
  invoice_cycle?: 'immediate' | 'monthly_soa';
  payment_due_day?: number | null;
  credit_limit?: number | null;
  currency?: string;
  notes?: string;
}

interface ContractRow {
  id: number;
  supplier_company_id: number;
  status: ContractStatus;
  entity_type: 'restaurant' | 'brand' | 'foodcourt';
  entity_id: number;
  buyer_name?: string | null;
  buyer_email?: string | null;
  buyer_phone?: string | null;
  requested_at?: string | null;
  approved_at?: string | null;
  rejected_at?: string | null;
  terminated_at?: string | null;
  request_message?: string | null;
  rejection_reason?: string | null;
  termination_reason?: string | null;
  payment_terms?: PaymentTerms | null;
}

const PageTabBar = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #C7CED6;
  padding: 0 24px;
  background: white;
`;

const PageTab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.$active ? '#635BFF' : '#4B5563'};
  border-bottom: 2px solid ${p => p.$active ? '#635BFF' : 'transparent'};
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  margin-bottom: -1px;
  &:hover { color: #635BFF; }
`;

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const BuyerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #4B5563;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

const Pill = styled.span`
  background: #EEF2FF;
  color: #3730A3;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
`;

const MessageBox = styled.div`
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #1F2937;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 12px;
`;

const Empty = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  color: #4B5563;

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    color: #1F2937;
  }
  p {
    margin: 0 auto 20px;
    font-size: 13px;
    line-height: 1.5;
    max-width: 360px;
    color: #4B5563;
  }
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

const WarningBox = styled.div`
  padding: 12px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #991B1B;
  font-size: 13px;
  margin-bottom: 16px;
`;

const TermsSummary = styled.div`
  font-size: 13px;
  color: #1F2937;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tag = styled.span`
  font-size: 12px;
  color: #166534;
`;

const tabToStatus: Record<TabType, ContractStatus> = {
  pending: 'requested',
  active: 'active',
  rejected: 'rejected',
  terminated: 'terminated'
};

interface PaymentTermsFormState {
  terms: string;
  invoice_cycle: 'immediate' | 'monthly_soa';
  payment_due_day: string;
  credit_limit: string;
  currency: string;
  notes: string;
}

const DEFAULT_TERMS: PaymentTermsFormState = {
  terms: 'NET_30',
  invoice_cycle: 'monthly_soa',
  payment_due_day: '15',
  credit_limit: '',
  currency: 'MYR',
  notes: ''
};

function termsFromBackend(t: PaymentTerms | null | undefined): PaymentTermsFormState {
  return {
    terms: t?.terms || 'NET_30',
    invoice_cycle: (t?.invoice_cycle as any) || 'monthly_soa',
    payment_due_day: t?.payment_due_day != null ? String(t.payment_due_day) : '15',
    credit_limit: t?.credit_limit != null ? String(t.credit_limit) : '',
    currency: t?.currency || 'MYR',
    notes: t?.notes || ''
  };
}

function formatTermsSummary(t: PaymentTerms | null | undefined): string {
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

const SupplierContractsPage: React.FC = () => {
  const { t } = useTranslation(['supplierDirectory', 'common']);
  const navigate = useNavigate();
  const [activeTab, handleTabChange] = useTabParam<TabType>('pending');

  const [allRows, setAllRows] = useState<Record<TabType, ContractRow[]>>({
    pending: [], active: [], rejected: [], terminated: []
  });
  const [loading, setLoading] = useState(true);

  // Approve modal
  const [approveOpen, setApproveOpen] = useState(false);
  const [approveTarget, setApproveTarget] = useState<ContractRow | null>(null);
  const [approveForm, setApproveForm] = useState<PaymentTermsFormState>(DEFAULT_TERMS);
  const [approveSubmitting, setApproveSubmitting] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);

  // Edit terms modal
  const [editTermsOpen, setEditTermsOpen] = useState(false);
  const [editTermsTarget, setEditTermsTarget] = useState<ContractRow | null>(null);
  const [editTermsForm, setEditTermsForm] = useState<PaymentTermsFormState>(DEFAULT_TERMS);
  const [editTermsSubmitting, setEditTermsSubmitting] = useState(false);
  const [editTermsError, setEditTermsError] = useState<string | null>(null);

  // Reject modal
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<ContractRow | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectSubmitting, setRejectSubmitting] = useState(false);
  const [rejectError, setRejectError] = useState<string | null>(null);

  // Terminate modal
  const [terminateOpen, setTerminateOpen] = useState(false);
  const [terminateTarget, setTerminateTarget] = useState<ContractRow | null>(null);
  const [terminateReason, setTerminateReason] = useState('');
  const [terminateSubmitting, setTerminateSubmitting] = useState(false);
  const [terminateError, setTerminateError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const statuses: TabType[] = ['pending', 'active', 'rejected', 'terminated'];
      const results = await Promise.all(statuses.map(async (key) => {
        const res = await fetch(`/api/supplier/contracts?status=${tabToStatus[key]}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        return [key, (res.ok && data?.success && Array.isArray(data.data)) ? data.data : []] as const;
      }));
      const next: Record<TabType, ContractRow[]> = {
        pending: [], active: [], rejected: [], terminated: []
      };
      for (const [key, rows] of results) next[key] = rows;
      setAllRows(next);
    } catch (err) {
      console.error('Failed to fetch contracts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const counts = useMemo(() => ({
    pending: allRows.pending.length,
    active: allRows.active.length,
    rejected: allRows.rejected.length,
    terminated: allRows.terminated.length
  }), [allRows]);

  const openApprove = (row: ContractRow) => {
    setApproveTarget(row);
    setApproveForm(termsFromBackend(row.payment_terms));
    setApproveError(null);
    setApproveOpen(true);
  };

  const openEditTerms = (row: ContractRow) => {
    setEditTermsTarget(row);
    setEditTermsForm(termsFromBackend(row.payment_terms));
    setEditTermsError(null);
    setEditTermsOpen(true);
  };

  const openReject = (row: ContractRow) => {
    setRejectTarget(row);
    setRejectReason('');
    setRejectError(null);
    setRejectOpen(true);
  };

  const openTerminate = (row: ContractRow) => {
    setTerminateTarget(row);
    setTerminateReason('');
    setTerminateError(null);
    setTerminateOpen(true);
  };

  const buildTermsBody = (form: PaymentTermsFormState): { ok: true; body: PaymentTerms } | { ok: false; message: string } => {
    const dueDay = form.invoice_cycle === 'monthly_soa' ? Number(form.payment_due_day) : null;
    if (form.invoice_cycle === 'monthly_soa') {
      if (!Number.isFinite(dueDay as number) || (dueDay as number) < 1 || (dueDay as number) > 31) {
        return { ok: false, message: t('approve.invalidDueDay') as string };
      }
    }
    const credit = form.credit_limit.trim() ? Number(form.credit_limit) : null;
    if (credit != null && (Number.isNaN(credit) || credit < 0)) {
      return { ok: false, message: 'Invalid credit limit' };
    }
    const body: PaymentTerms = {
      terms: form.terms,
      invoice_cycle: form.invoice_cycle,
      payment_due_day: dueDay,
      credit_limit: credit,
      currency: form.currency.trim().toUpperCase() || 'MYR',
      notes: form.notes.trim() || undefined
    };
    return { ok: true, body };
  };

  const submitApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!approveTarget || approveSubmitting) return;
    setApproveError(null);
    const built = buildTermsBody(approveForm);
    if (!built.ok) { setApproveError(built.message); return; }
    setApproveSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/contracts/${approveTarget.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_terms: built.body })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setApproveError(data?.message || (t('approve.submitFailed') as string));
        return;
      }
      setApproveOpen(false);
      setApproveTarget(null);
      handleTabChange('active');
      await fetchAll();
    } catch (err) {
      console.error('approve error:', err);
      setApproveError(t('approve.submitFailed') as string);
    } finally {
      setApproveSubmitting(false);
    }
  };

  const submitEditTerms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTermsTarget || editTermsSubmitting) return;
    setEditTermsError(null);
    const built = buildTermsBody(editTermsForm);
    if (!built.ok) { setEditTermsError(built.message); return; }
    setEditTermsSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/contracts/${editTermsTarget.id}/payment-terms`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_terms: built.body })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setEditTermsError(data?.message || (t('editTerms.submitFailed') as string));
        return;
      }
      setEditTermsOpen(false);
      setEditTermsTarget(null);
      await fetchAll();
    } catch (err) {
      console.error('edit terms error:', err);
      setEditTermsError(t('editTerms.submitFailed') as string);
    } finally {
      setEditTermsSubmitting(false);
    }
  };

  const submitReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectTarget || rejectSubmitting) return;
    if (!rejectReason.trim()) {
      setRejectError(t('reject.reasonRequired') as string);
      return;
    }
    setRejectError(null);
    setRejectSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/contracts/${rejectTarget.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ reason: rejectReason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRejectError(data?.message || (t('reject.submitFailed') as string));
        return;
      }
      setRejectOpen(false);
      setRejectTarget(null);
      setRejectReason('');
      handleTabChange('rejected');
      await fetchAll();
    } catch (err) {
      console.error('reject error:', err);
      setRejectError(t('reject.submitFailed') as string);
    } finally {
      setRejectSubmitting(false);
    }
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
      const res = await fetch(`/api/supplier/contracts/${terminateTarget.id}/terminate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
      handleTabChange('terminated');
      await fetchAll();
    } catch (err) {
      console.error('terminate error:', err);
      setTerminateError(t('terminate.submitFailed') as string);
    } finally {
      setTerminateSubmitting(false);
    }
  };

  const renderRow = (row: ContractRow) => {
    const buyerName = row.buyer_name || `${row.entity_type} #${row.entity_id}`;
    return (
      <Card key={row.id}>
        <CardTop>
          <div>
            <BuyerName>{buyerName}</BuyerName>
            <Meta>
              <Pill>{row.entity_type}</Pill>
              {row.requested_at && <span>{t('supplierContracts.card.requestedAt')}: {formatDate(row.requested_at)}</span>}
              {row.buyer_email && <span>{row.buyer_email}</span>}
            </Meta>
          </div>
          <CardActions>
            {row.status === 'requested' && (
              <>
                <ThemedButton size="small" variant="primary" onClick={() => openApprove(row)}>
                  {t('supplierContracts.actions.approve')}
                </ThemedButton>
                <ThemedButton size="small" variant="danger-outline" onClick={() => openReject(row)}>
                  {t('supplierContracts.actions.reject')}
                </ThemedButton>
              </>
            )}
            {row.status === 'active' && (
              <>
                <ThemedButton size="small" variant="outline" onClick={() => openEditTerms(row)}>
                  {t('supplierContracts.actions.editTerms')}
                </ThemedButton>
                <ThemedButton size="small" variant="danger-outline" onClick={() => openTerminate(row)}>
                  {t('supplierContracts.actions.terminate')}
                </ThemedButton>
              </>
            )}
          </CardActions>
        </CardTop>

        {row.status === 'active' && row.payment_terms && (
          <TermsSummary>
            <Tag><strong>{t('approve.paymentTerms')}:</strong> {formatTermsSummary(row.payment_terms)}</Tag>
          </TermsSummary>
        )}

        {row.request_message ? (
          <MessageBox>
            <strong style={{ fontSize: 12, color: '#4B5563', display: 'block', marginBottom: 4 }}>
              {t('supplierContracts.card.message')}
            </strong>
            {row.request_message}
          </MessageBox>
        ) : row.status === 'requested' ? (
          <MessageBox style={{ fontStyle: 'italic', color: '#6B7280' }}>
            {t('supplierContracts.card.noMessage')}
          </MessageBox>
        ) : null}

        {row.status === 'rejected' && row.rejection_reason && (
          <MessageBox style={{ background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }}>
            <strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
              {t('contractDetail.rejectionReason')}
            </strong>
            {row.rejection_reason}
          </MessageBox>
        )}

        {row.status === 'terminated' && row.termination_reason && (
          <MessageBox style={{ background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }}>
            <strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
              {t('contractDetail.terminationReason')}
            </strong>
            {row.termination_reason}
          </MessageBox>
        )}
      </Card>
    );
  };

  const currentRows = allRows[activeTab] || [];

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('supplierMenu.title', 'Suppliers')}</Title>
        </div>
      </Header>

      <PageTabBar>
        <PageTab $active={true} type="button">
          {t('supplierMenu.tab.mine', 'My Suppliers')}
        </PageTab>
        <PageTab $active={false} type="button" onClick={() => navigate('/pos/suppliers/directory')}>
          {t('supplierMenu.tab.find', 'Find Suppliers')}
        </PageTab>
      </PageTabBar>

      <Content>
        <Tabs>
          <Tab active={activeTab === 'pending'} onClick={() => handleTabChange('pending')}>
            {t('supplierContracts.tabs.pending')}
            <TabBadge count={counts.pending} showZero />
          </Tab>
          <Tab active={activeTab === 'active'} onClick={() => handleTabChange('active')}>
            {t('supplierContracts.tabs.active')}
            <TabBadge count={counts.active} showZero />
          </Tab>
          <Tab active={activeTab === 'rejected'} onClick={() => handleTabChange('rejected')}>
            {t('supplierContracts.tabs.rejected')}
            <TabBadge count={counts.rejected} showZero />
          </Tab>
          <Tab active={activeTab === 'terminated'} onClick={() => handleTabChange('terminated')}>
            {t('supplierContracts.tabs.terminated')}
            <TabBadge count={counts.terminated} showZero />
          </Tab>
        </Tabs>

        {loading ? (
          <Empty>{t('directory.loading')}</Empty>
        ) : currentRows.length === 0 ? (
          <Empty>
            <h3>{t(`supplierContracts.empty.${activeTab}`)}</h3>
            {activeTab === 'pending' && (
              <p>{t('supplierContracts.emptyHint.pending', 'When buyers send contract requests, they appear here for your approval.')}</p>
            )}
            {activeTab === 'active' && (
              <p>{t('supplierContracts.emptyHint.active', 'Active contracts are buyers you currently supply to. Approve pending requests to start.')}</p>
            )}
          </Empty>
        ) : (
          <CardList>
            {currentRows.map(renderRow)}
          </CardList>
        )}
      </Content>

      {/* Approve Modal */}
      <CommonModal
        isOpen={approveOpen}
        onClose={() => !approveSubmitting && setApproveOpen(false)}
        title={t('approve.modalTitle') as string}
        size="medium"
        footer={
          <>
            <ModalButton type="button" onClick={() => setApproveOpen(false)} disabled={approveSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton type="submit" form="approve-contract-form" variant="primary" disabled={approveSubmitting}>
              {approveSubmitting ? t('common.saving') : t('approve.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="approve-contract-form" onSubmit={submitApprove}>
          {approveTarget && (
            <UIFormGroup>
              <FormLabel>{t('approve.buyerLabel')}</FormLabel>
              <FormInput
                type="text"
                value={approveTarget.buyer_name || `${approveTarget.entity_type} #${approveTarget.entity_id}`}
                disabled
              />
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('approve.termsLabel')} *</FormLabel>
            <FormSelect
              value={approveForm.terms}
              onChange={(e) => setApproveForm({ ...approveForm, terms: e.target.value })}
              required
            >
              <option value="COD">{t('approve.termsCOD')}</option>
              <option value="NET_15">{t('approve.termsNET15')}</option>
              <option value="NET_30">{t('approve.termsNET30')}</option>
              <option value="NET_60">{t('approve.termsNET60')}</option>
            </FormSelect>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.invoiceCycle')} *</FormLabel>
            <FormSelect
              value={approveForm.invoice_cycle}
              onChange={(e) => setApproveForm({ ...approveForm, invoice_cycle: e.target.value as 'immediate' | 'monthly_soa' })}
              required
            >
              <option value="immediate">{t('approve.cycleImmediate')}</option>
              <option value="monthly_soa">{t('approve.cycleMonthly')}</option>
            </FormSelect>
          </UIFormGroup>
          {approveForm.invoice_cycle === 'monthly_soa' && (
            <UIFormGroup>
              <FormLabel>{t('approve.paymentDueDay')} *</FormLabel>
              <FormInput
                type="number"
                min="1"
                max="31"
                step="1"
                value={approveForm.payment_due_day}
                onChange={(e) => setApproveForm({ ...approveForm, payment_due_day: e.target.value })}
                required
              />
              <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4 }}>
                {t('approve.paymentDueDayHint')}
              </div>
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('approve.currency')}</FormLabel>
            <FormInput
              type="text"
              value={approveForm.currency}
              onChange={(e) => setApproveForm({ ...approveForm, currency: e.target.value.toUpperCase() })}
              placeholder="MYR"
              maxLength={3}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.creditLimit')}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={approveForm.credit_limit}
              onChange={(e) => setApproveForm({ ...approveForm, credit_limit: e.target.value })}
              placeholder="0"
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.notes')}</FormLabel>
            <FormTextArea
              rows={2}
              value={approveForm.notes}
              onChange={(e) => setApproveForm({ ...approveForm, notes: e.target.value })}
              maxLength={500}
            />
          </UIFormGroup>
          {approveError && <ErrorBox>{approveError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Edit Terms Modal */}
      <CommonModal
        isOpen={editTermsOpen}
        onClose={() => !editTermsSubmitting && setEditTermsOpen(false)}
        title={t('editTerms.modalTitle') as string}
        size="medium"
        footer={
          <>
            <ModalButton type="button" onClick={() => setEditTermsOpen(false)} disabled={editTermsSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton type="submit" form="edit-terms-form" variant="primary" disabled={editTermsSubmitting}>
              {editTermsSubmitting ? t('common.saving') : t('editTerms.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="edit-terms-form" onSubmit={submitEditTerms}>
          <UIFormGroup>
            <FormLabel>{t('approve.termsLabel')} *</FormLabel>
            <FormSelect
              value={editTermsForm.terms}
              onChange={(e) => setEditTermsForm({ ...editTermsForm, terms: e.target.value })}
              required
            >
              <option value="COD">{t('approve.termsCOD')}</option>
              <option value="NET_15">{t('approve.termsNET15')}</option>
              <option value="NET_30">{t('approve.termsNET30')}</option>
              <option value="NET_60">{t('approve.termsNET60')}</option>
            </FormSelect>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.invoiceCycle')} *</FormLabel>
            <FormSelect
              value={editTermsForm.invoice_cycle}
              onChange={(e) => setEditTermsForm({ ...editTermsForm, invoice_cycle: e.target.value as 'immediate' | 'monthly_soa' })}
              required
            >
              <option value="immediate">{t('approve.cycleImmediate')}</option>
              <option value="monthly_soa">{t('approve.cycleMonthly')}</option>
            </FormSelect>
          </UIFormGroup>
          {editTermsForm.invoice_cycle === 'monthly_soa' && (
            <UIFormGroup>
              <FormLabel>{t('approve.paymentDueDay')} *</FormLabel>
              <FormInput
                type="number"
                min="1"
                max="31"
                step="1"
                value={editTermsForm.payment_due_day}
                onChange={(e) => setEditTermsForm({ ...editTermsForm, payment_due_day: e.target.value })}
                required
              />
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('approve.currency')}</FormLabel>
            <FormInput
              type="text"
              value={editTermsForm.currency}
              onChange={(e) => setEditTermsForm({ ...editTermsForm, currency: e.target.value.toUpperCase() })}
              maxLength={3}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.creditLimit')}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={editTermsForm.credit_limit}
              onChange={(e) => setEditTermsForm({ ...editTermsForm, credit_limit: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.notes')}</FormLabel>
            <FormTextArea
              rows={2}
              value={editTermsForm.notes}
              onChange={(e) => setEditTermsForm({ ...editTermsForm, notes: e.target.value })}
              maxLength={500}
            />
          </UIFormGroup>
          {editTermsError && <ErrorBox>{editTermsError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Reject Modal */}
      <CommonModal
        isOpen={rejectOpen}
        onClose={() => !rejectSubmitting && setRejectOpen(false)}
        title={t('reject.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setRejectOpen(false)} disabled={rejectSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton type="submit" form="reject-form" variant="danger" disabled={rejectSubmitting}>
              {rejectSubmitting ? t('common.submitting') : t('reject.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="reject-form" onSubmit={submitReject}>
          <WarningBox>{t('reject.warning')}</WarningBox>
          <UIFormGroup>
            <FormLabel>{t('reject.reasonLabel')} *</FormLabel>
            <FormTextArea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder={t('reject.reasonPlaceholder') as string}
              maxLength={500}
              required
            />
          </UIFormGroup>
          {rejectError && <ErrorBox>{rejectError}</ErrorBox>}
        </form>
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
            <ModalButton type="submit" form="supplier-terminate-form" variant="danger" disabled={terminateSubmitting}>
              {terminateSubmitting ? t('common.submitting') : t('terminate.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="supplier-terminate-form" onSubmit={submitTerminate}>
          <WarningBox>{t('terminate.warning')}</WarningBox>
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

export default SupplierContractsPage;
