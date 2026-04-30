import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty,
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

interface PaymentTerms {
  terms?: string;
  invoice_cycle?: 'immediate' | 'monthly_soa';
  payment_due_day?: number | null;
  credit_limit?: number | null;
  currency?: string;
  notes?: string;
}

interface CustomerRow {
  contract_id: number;
  entity_type: 'restaurant' | 'brand' | 'foodcourt';
  entity_id: number;
  buyer_name: string;
  buyer_email?: string | null;
  approved_at?: string | null;
  payment_terms?: PaymentTerms | null;
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const Pill = styled.span`
  background: #EEF2FF;
  color: #3730A3;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
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

const SupplierCustomersPage: React.FC = () => {
  const { t } = useTranslation(['supplierDirectory', 'common']);
  const navigate = useNavigate();

  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CustomerRow | null>(null);
  const [editForm, setEditForm] = useState<PaymentTermsFormState>(DEFAULT_TERMS);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.set('entity_type', typeFilter);
      if (search.trim()) params.set('search', search.trim());

      const url = `/api/supplier/customers${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, search]);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  const filteredRows = useMemo(() => rows, [rows]);

  const openEdit = (row: CustomerRow) => {
    setEditTarget(row);
    setEditForm(termsFromBackend(row.payment_terms));
    setEditError(null);
    setEditOpen(true);
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget || editSubmitting) return;
    setEditError(null);

    const dueDay = editForm.invoice_cycle === 'monthly_soa' ? Number(editForm.payment_due_day) : null;
    if (editForm.invoice_cycle === 'monthly_soa') {
      if (!Number.isFinite(dueDay as number) || (dueDay as number) < 1 || (dueDay as number) > 31) {
        setEditError(t('approve.invalidDueDay') as string);
        return;
      }
    }
    const credit = editForm.credit_limit.trim() ? Number(editForm.credit_limit) : null;
    if (credit != null && (Number.isNaN(credit) || credit < 0)) {
      setEditError('Invalid credit limit');
      return;
    }

    const body: PaymentTerms = {
      terms: editForm.terms,
      invoice_cycle: editForm.invoice_cycle,
      payment_due_day: dueDay,
      credit_limit: credit,
      currency: editForm.currency.trim().toUpperCase() || 'MYR',
      notes: editForm.notes.trim() || undefined
    };

    setEditSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/contracts/${editTarget.contract_id}/payment-terms`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_terms: body })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setEditError(data?.message || (t('editTerms.submitFailed') as string));
        return;
      }
      setEditOpen(false);
      setEditTarget(null);
      await fetchRows();
    } catch (err) {
      console.error('edit terms error:', err);
      setEditError(t('editTerms.submitFailed') as string);
    } finally {
      setEditSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('customers.title')}</Title>
        </div>
      </Header>

      <Content>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('customers.search') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">{t('customers.filter.all')}</option>
            <option value="restaurant">{t('customers.filter.restaurant')}</option>
            <option value="brand">{t('customers.filter.brand')}</option>
            <option value="foodcourt">{t('customers.filter.foodcourt')}</option>
          </FilterSelect>
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('customers.table.customer')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('customers.table.type')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('customers.table.activeSince')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('customers.table.paymentTerms')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('customers.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}><DataTableEmpty>{t('directory.loading')}</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <DataTableEmpty>
                      <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, color: '#374151' }}>{t('customers.noCustomers', 'No customers yet')}</div>
                      <div style={{ fontSize: 13, color: '#6B7280', maxWidth: 360, margin: '0 auto 16px', lineHeight: 1.5 }}>
                        {t('customers.noCustomersHint', 'Once you approve buyer contract requests, your customers will appear here.')}
                      </div>
                      <ThemedButton variant="outline" size="small" onClick={() => navigate('/pos/supplier/contracts?tab=pending')}>
                        {t('customers.viewPendingContracts', 'View Pending Contracts')}
                      </ThemedButton>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <DataTableRow key={row.contract_id}>
                    <DataTableCell data-label={t('customers.table.customer') as string}>
                      <div>
                        <strong>{row.buyer_name}</strong>
                        {row.buyer_email && (
                          <div style={{ fontSize: 12, color: '#6B7280' }}>{row.buyer_email}</div>
                        )}
                      </div>
                    </DataTableCell>
                    <DataTableCell data-label={t('customers.table.type') as string} align="center">
                      <Pill>{row.entity_type}</Pill>
                    </DataTableCell>
                    <DataTableCell data-label={t('customers.table.activeSince') as string}>
                      {formatDate(row.approved_at) || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('customers.table.paymentTerms') as string}>
                      {formatTermsSummary(row.payment_terms)}
                    </DataTableCell>
                    <DataTableCell data-label="" align="right" mobileFullWidth>
                      <DataTableActions>
                        <ThemedButton
                          size="small"
                          variant="outline"
                          onClick={() => navigate(`/pos/supplier/contracts?contract_id=${row.contract_id}`)}
                        >
                          {t('customers.viewContract')}
                        </ThemedButton>
                        <ThemedButton
                          size="small"
                          variant="primary"
                          onClick={() => openEdit(row)}
                        >
                          {t('customers.editTerms')}
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

      {/* Edit Terms Modal */}
      <CommonModal
        isOpen={editOpen}
        onClose={() => !editSubmitting && setEditOpen(false)}
        title={t('editTerms.modalTitle') as string}
        size="medium"
        footer={
          <>
            <ModalButton type="button" onClick={() => setEditOpen(false)} disabled={editSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton type="submit" form="customer-edit-terms-form" variant="primary" disabled={editSubmitting}>
              {editSubmitting ? t('common.saving') : t('editTerms.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="customer-edit-terms-form" onSubmit={submitEdit}>
          {editTarget && (
            <UIFormGroup>
              <FormLabel>{t('approve.buyerLabel')}</FormLabel>
              <FormInput type="text" value={editTarget.buyer_name} disabled />
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('approve.termsLabel')} *</FormLabel>
            <FormSelect
              value={editForm.terms}
              onChange={(e) => setEditForm({ ...editForm, terms: e.target.value })}
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
              value={editForm.invoice_cycle}
              onChange={(e) => setEditForm({ ...editForm, invoice_cycle: e.target.value as 'immediate' | 'monthly_soa' })}
              required
            >
              <option value="immediate">{t('approve.cycleImmediate')}</option>
              <option value="monthly_soa">{t('approve.cycleMonthly')}</option>
            </FormSelect>
          </UIFormGroup>
          {editForm.invoice_cycle === 'monthly_soa' && (
            <UIFormGroup>
              <FormLabel>{t('approve.paymentDueDay')} *</FormLabel>
              <FormInput
                type="number"
                min="1"
                max="31"
                step="1"
                value={editForm.payment_due_day}
                onChange={(e) => setEditForm({ ...editForm, payment_due_day: e.target.value })}
                required
              />
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('approve.currency')}</FormLabel>
            <FormInput
              type="text"
              value={editForm.currency}
              onChange={(e) => setEditForm({ ...editForm, currency: e.target.value.toUpperCase() })}
              maxLength={3}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.creditLimit')}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={editForm.credit_limit}
              onChange={(e) => setEditForm({ ...editForm, credit_limit: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('approve.notes')}</FormLabel>
            <FormTextArea
              rows={2}
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              maxLength={500}
            />
          </UIFormGroup>
          {editError && <ErrorBox>{editError}</ErrorBox>}
        </form>
      </CommonModal>
    </Container>
  );
};

export default SupplierCustomersPage;
