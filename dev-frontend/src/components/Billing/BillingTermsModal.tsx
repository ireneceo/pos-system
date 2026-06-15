/**
 * BillingTermsModal — shared modal for BG/FG to set per-restaurant trade billing terms.
 *
 * Mirrors the Supplier/SupplierCustomersPage edit-terms modal in shape, but stored in
 * Restaurant.{brand,foodcourt}_billing_terms (see docs/BG_FG_TRADE_BILLING.md).
 *
 * Endpoint:
 *   PUT /api/{brand|foodcourt}/restaurants/:restaurantId/billing-terms
 *   body: { payment_terms: { terms, invoice_cycle, payment_due_day, credit_limit, currency, notes } | null }
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea
} from '../UI';
import { getAuthToken } from '../../utils/auth';

export interface PaymentTerms {
  terms?: string;
  invoice_cycle?: 'immediate' | 'monthly_soa';
  payment_due_day?: number | null;
  credit_limit?: number | null;
  currency?: string;
  notes?: string;
}

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

const ErrorBox = styled.div`
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
  margin-top: 12px;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const ResetLink = styled.button`
  background: none;
  border: none;
  color: #4B5563;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
  padding: 6px 4px;

  &:hover { color: #DC2626; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const GenerateSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  padding: 14px 16px;
  background: #F8F7FF;
  border: 1px solid #E6E3FF;
  border-radius: 8px;
  font-size: 13px;
  color: #0A2540;
`;

const GenerateHint = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 2px;
`;

const GenResultBox = styled.div<{ $ok?: boolean }>`
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  background: ${p => p.$ok ? '#ECFDF5' : '#FEF2F2'};
  border: 1px solid ${p => p.$ok ? '#A7F3D0' : '#FCA5A5'};
  color: ${p => p.$ok ? '#059669' : '#DC2626'};
`;

interface Props {
  open: boolean;
  onClose: () => void;
  /** 'brand' | 'foodcourt' — which billing terms column to update. */
  entityType: 'brand' | 'foodcourt';
  /** Restaurant ID. */
  restaurantId: number | null;
  /** Restaurant name (for header). */
  restaurantName?: string | null;
  /** Current terms (null = default immediate). */
  currentTerms: PaymentTerms | null | undefined;
  /** Called after successful save with the new terms (or null for reset). */
  onSaved: (newTerms: PaymentTerms | null) => void;
}

const BillingTermsModal: React.FC<Props> = ({
  open, onClose, entityType, restaurantId, restaurantName, currentTerms, onSaved
}) => {
  const { t } = useTranslation(['billing', 'common']);
  const [form, setForm] = useState<PaymentTermsFormState>(DEFAULT_TERMS);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    if (open) {
      setForm(termsFromBackend(currentTerms));
      setError(null);
      setGenResult(null);
    }
  }, [open, currentTerms]);

  // 온디맨드 월명세서 생성 — 매월 1일 자동 발행을 기다리지 않고 지금 발행.
  // 미청구(안 묶인) 거래내역을 한 장의 명세서(SOA)로 묶음. (2026-06-15)
  const generateNow = async () => {
    if (!restaurantId || generating) return;
    setGenerating(true); setGenResult(null);
    try {
      const res = await fetch(`/api/${entityType}/soa/${restaurantId}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAuthToken()}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGenResult({ ok: true, msg: t('billing:generate.success', 'Statement generated and sent to the restaurant.') as string });
      } else if (data.code === 'no_invoices') {
        setGenResult({ ok: false, msg: t('billing:generate.noInvoices', 'Nothing to statement — no unbilled orders for this restaurant.') as string });
      } else {
        setGenResult({ ok: false, msg: data?.message || (t('billing:generate.failed', 'Could not generate statement.') as string) });
      }
    } catch (err) {
      setGenResult({ ok: false, msg: t('billing:generate.failed', 'Could not generate statement.') as string });
    } finally {
      setGenerating(false);
    }
  };

  const endpoint = `/api/${entityType}/restaurants/${restaurantId}/billing-terms`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantId || submitting) return;
    setError(null);

    let dueDay: number | null = null;
    if (form.invoice_cycle === 'monthly_soa') {
      const d = Number(form.payment_due_day);
      if (!Number.isFinite(d) || d < 1 || d > 31) {
        setError(t('billing:errors.invalidDueDay', 'Payment due day must be 1-31') as string);
        return;
      }
      dueDay = d;
    }
    let credit: number | null = null;
    if (form.credit_limit.trim()) {
      const c = Number(form.credit_limit);
      if (!Number.isFinite(c) || c < 0) {
        setError(t('billing:errors.invalidCreditLimit', 'Invalid credit limit') as string);
        return;
      }
      credit = c;
    }

    const payload: PaymentTerms = {
      terms: form.terms,
      invoice_cycle: form.invoice_cycle,
      payment_due_day: dueDay,
      credit_limit: credit,
      currency: form.currency.trim().toUpperCase() || 'MYR',
      notes: form.notes.trim() || undefined
    };

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ payment_terms: payload })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('billing:errors.saveFailed', 'Failed to save') as string));
        return;
      }
      onSaved(data.data?.payment_terms || payload);
      onClose();
    } catch (err) {
      console.error('[BillingTermsModal] save error', err);
      setError(t('billing:errors.saveFailed', 'Failed to save') as string);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = async () => {
    if (!restaurantId || submitting) return;
    if (!window.confirm(t('billing:reset.confirm', 'Reset to default (Immediate, no SOA)?') as string)) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ payment_terms: null })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('billing:errors.saveFailed', 'Failed to save') as string));
        return;
      }
      onSaved(null);
      onClose();
    } catch (err) {
      console.error('[BillingTermsModal] reset error', err);
      setError(t('billing:errors.saveFailed', 'Failed to save') as string);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommonModal
      isOpen={open}
      onClose={() => !submitting && onClose()}
      title={t('billing:modal.title', 'Edit Billing Terms') as string}
      size="medium"
      footer={
        <FooterRow>
          {currentTerms ? (
            <ResetLink type="button" onClick={reset} disabled={submitting}>
              {t('billing:reset.action', 'Reset to default')}
            </ResetLink>
          ) : <span />}
          <div style={{ display: 'flex', gap: 8 }}>
            <ModalButton type="button" onClick={onClose} disabled={submitting}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="billing-terms-form"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? t('common:saving', 'Saving...') : t('common:save', 'Save')}
            </ModalButton>
          </div>
        </FooterRow>
      }
    >
      <form id="billing-terms-form" onSubmit={submit}>
        {restaurantName && (
          <UIFormGroup>
            <FormLabel>{t('billing:modal.restaurantLabel', 'Restaurant')}</FormLabel>
            <FormInput type="text" value={restaurantName} disabled />
          </UIFormGroup>
        )}
        <UIFormGroup>
          <FormLabel>{t('billing:modal.terms', 'Payment Terms')} *</FormLabel>
          <FormSelect
            value={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.value })}
            required
          >
            <option value="COD">{t('billing:terms.COD', 'Cash on Delivery')}</option>
            <option value="NET_15">{t('billing:terms.NET_15', 'Net 15 days')}</option>
            <option value="NET_30">{t('billing:terms.NET_30', 'Net 30 days')}</option>
            <option value="NET_60">{t('billing:terms.NET_60', 'Net 60 days')}</option>
          </FormSelect>
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('billing:modal.invoiceCycle', 'Invoice Cycle')} *</FormLabel>
          <FormSelect
            value={form.invoice_cycle}
            onChange={(e) => setForm({
              ...form, invoice_cycle: e.target.value as 'immediate' | 'monthly_soa'
            })}
            required
          >
            <option value="immediate">{t('billing:cycle.immediate', 'Immediate (per-invoice)')}</option>
            <option value="monthly_soa">{t('billing:cycle.monthly_soa', 'Monthly Statement (SOA)')}</option>
          </FormSelect>
        </UIFormGroup>
        {form.invoice_cycle === 'monthly_soa' && (
          <UIFormGroup>
            <FormLabel>{t('billing:modal.paymentDueDay', 'Payment Due Day (1-31)')} *</FormLabel>
            <FormInput
              type="number" min="1" max="31" step="1"
              value={form.payment_due_day}
              onChange={(e) => setForm({ ...form, payment_due_day: e.target.value })}
              required
            />
          </UIFormGroup>
        )}
        <UIFormGroup>
          <FormLabel>{t('billing:modal.currency', 'Currency')}</FormLabel>
          <FormInput
            type="text" maxLength={3}
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
          />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('billing:modal.creditLimit', 'Credit Limit (optional)')}</FormLabel>
          <FormInput
            type="number" step="0.01" min="0"
            value={form.credit_limit}
            onChange={(e) => setForm({ ...form, credit_limit: e.target.value })}
          />
        </UIFormGroup>
        <UIFormGroup>
          <FormLabel>{t('billing:modal.notes', 'Notes (optional)')}</FormLabel>
          <FormTextArea
            rows={2} maxLength={500}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </UIFormGroup>
        {error && <ErrorBox>{error}</ErrorBox>}
      </form>

      {/* 온디맨드 월명세서 — 이미 월청구(SOA)로 저장된 매장에만 노출. 매월 1일 자동발행을
          기다리지 않고 지금 미청구 거래를 한 장의 명세서로 묶어 발행. (2026-06-15) */}
      {currentTerms?.invoice_cycle === 'monthly_soa' && (
        <GenerateSection>
          <div>
            <strong>{t('billing:generate.title', 'Monthly statement')}</strong>
            <GenerateHint>{t('billing:generate.hint', 'Statements auto-issue on the 1st of each month. Generate one now for any unbilled orders.')}</GenerateHint>
          </div>
          <ModalButton type="button" onClick={generateNow} disabled={generating}>
            {generating ? t('common:saving', 'Saving...') : t('billing:generate.action', 'Generate now')}
          </ModalButton>
        </GenerateSection>
      )}
      {genResult && (
        <GenResultBox $ok={genResult.ok}>{genResult.msg}</GenResultBox>
      )}
    </CommonModal>
  );
};

export function formatTermsSummary(t: PaymentTerms | null | undefined): string {
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

export default BillingTermsModal;
