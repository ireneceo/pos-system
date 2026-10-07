/**
 * SupplierInvoiceTotalFix — 청구서 상세에서 «총액 수정» (2026-10-07 Fable 판정 D1·D2·D6·D7 · docs/PURCHASE_ORDER_SYSTEM.md §8-7)
 *
 * 새 저장 경로가 아니다 — 이미 있는 «총액만 대조» `POST /api/purchase-orders/:poId/reconcile {total_only:true}` 한 손을 부른다.
 *   서버가 발주에 청구 총액을 적고, 외부 공급업체 청구서를 그 총액으로 맞추고(«Supplier invoice difference» 한 줄),
 *   청구서 modification_history 에 «누가 · 언제 · 얼마에서 얼마로» 한 줄을 남긴다.
 * 매장 관리자 화면·오너 화면이 **같은 조각**을 쓴다. 오너는 그 청구서의 매장 자격으로만 연다(`?entity_type=restaurant&entity_id=`).
 * 버튼을 띄울지(D2: 거래 청구서 + 연결 발주 + 외부 공급업체 발행 + 취소 아님)는 canFixSupplierInvoiceTotal 한 곳이 정한다.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput } from '../UI/Modal';
import DateField from '../Common/DateField';
import { formatGap, gapColor } from '../../utils/reconcileGap';
import { formatCurrency } from '../../utils/currency';
import { getAuthToken } from '../../utils/auth';

export interface TotalFixInvoice {
  id: number | string;
  status?: string;
  total: number;
  currency?: string;
  invoiceCategory?: string;
  issuerIsExternal?: boolean;
  purchaseOrderId?: number | null;
  purchaseOrderNumber?: string | null;
  purchaseOrderTotal?: number | string | null;
  supplierInvoiceNumber?: string | null;
  supplierInvoiceDate?: string | null;
  supplierInvoiceTotal?: number | string | null;
  invoiceReconciledAt?: string | null;
  /** 줄 단가 대조 기록 수 — 0 이 아니면 총액 수정이 그 기록을 지운다 (D6) */
  reconcileInvoicedLines?: number | null;
  /** 오너 화면: 그 청구서의 매장 id (세션 저장값 말고) */
  restaurantId?: number | string | null;
}

/** D2 — 외부 공급업체 거래 청구서 + 연결 발주 + 취소 아님. 가입 판매자 청구서는 그쪽이 발행 주체라 버튼 없음. */
export function canFixSupplierInvoiceTotal(inv: TotalFixInvoice | null | undefined): boolean {
  return !!inv && inv.invoiceCategory === 'trade' && !!inv.purchaseOrderId && !!inv.issuerIsExternal && inv.status !== 'cancelled';
}

interface Props {
  invoice: TotalFixInvoice;
  /** 오너 화면이면 true — 그 청구서의 매장 자격으로 저장한다 */
  ownerMode?: boolean;
  renderTrigger: (open: () => void) => React.ReactNode;
  /** 저장 뒤(목록 새로고침 등) */
  onSaved?: () => void;
}

const num = (v: unknown): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function SupplierInvoiceTotalFix({ invoice, ownerMode = false, renderTrigger, onSaved }: Props) {
  const { t } = useTranslation(['settings']);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState('');
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string[] | null>(null);
  const [confirmLines, setConfirmLines] = useState(false);

  const currency = invoice.currency || 'MYR';
  const poTotal = num(invoice.purchaseOrderTotal);
  const lineRecords = Number(invoice.reconcileInvoicedLines || 0);
  const isPaid = invoice.status === 'paid';

  const openModal = () => {
    // 기본값 = 적혀 있던 청구 총액, 없으면 지금 청구서 총액
    const start = num(invoice.supplierInvoiceTotal) ?? num(invoice.total) ?? 0;
    setTotal(start.toFixed(2));
    setNumber(invoice.supplierInvoiceNumber || '');
    setDate(invoice.supplierInvoiceDate ? String(invoice.supplierInvoiceDate).slice(0, 10) : '');
    setNote('');
    setError(null);
    setResult(null);
    setConfirmLines(false);
    setOpen(true);
  };

  const close = () => {
    if (busy) return;
    const saved = !!result;
    setOpen(false);
    setResult(null);
    if (saved && onSaved) onSaved();
  };

  const entered = num(total);
  const gap = entered !== null && poTotal !== null ? r2(entered - poTotal) : null;

  const describeResult = (data: any): string[] => {
    const lines: string[] = [];
    const sync = data?.invoice_sync || {};
    if (sync.synced) {
      lines.push(t('settings:invoicesPage.totalFix.savedSynced', {
        total: formatCurrency(Number(sync.total ?? entered ?? 0), currency),
        defaultValue: 'Invoice total is now {{total}}. The change was added to the history.'
      }) as string);
    } else {
      lines.push(t('settings:invoicesPage.totalFix.savedNotSynced', {
        reason: sync.reason || '-',
        defaultValue: 'The purchase order total was saved, but the invoice was not changed: {{reason}}'
      }) as string);
    }
    const adj = data?.paid_adjustment;
    if (adj) {
      if (adj.adjusted) {
        lines.push(t('settings:invoicesPage.totalFix.paidAdjusted', {
          diff: formatCurrency(Number(adj.diff || 0), currency),
          defaultValue: 'Paid amount adjusted — one cash movement of {{diff}} was added to the open shift drawer.'
        }) as string);
      } else if (adj.reason && adj.reason !== 'already_matches' && adj.reason !== 'not_paid') {
        lines.push(t(`settings:invoicesPage.totalFix.paidReason.${adj.reason}`, {
          defaultValue: t('settings:invoicesPage.totalFix.paidReason.other', {
            reason: adj.message || adj.reason,
            defaultValue: 'Paid amount was not moved in the drawer: {{reason}}'
          })
        }) as string);
      }
    }
    return lines;
  };

  const submit = async () => {
    if (entered === null || entered < 0) {
      setError(t('settings:invoicesPage.totalFix.totalRequired', 'Enter the supplier invoice total.') as string);
      return;
    }
    // D6 — 줄 단가 대조 기록이 있으면 지워진다는 사실을 먼저 확인받는다(같은 창 안에서 두 번째 누름)
    if (lineRecords > 0 && !confirmLines) { setConfirmLines(true); return; }

    setBusy(true);
    setError(null);
    try {
      let url = `/api/purchase-orders/${invoice.purchaseOrderId}/reconcile`;
      if (ownerMode && invoice.restaurantId) url += `?entity_type=restaurant&entity_id=${invoice.restaurantId}`;
      const body: any = { total_only: true, invoice: { total: r2(entered) } };
      if (number.trim()) body.invoice.number = number.trim();
      if (date) body.invoice.date = date;
      if (note.trim()) body.note = note.trim();
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) {
        setError(j?.code === 'OWNER_TOTAL_ONLY'
          ? (t('settings:invoicesPage.totalFix.ownerTotalOnly', 'Owners can only correct the total.') as string)
          : (j?.message || (t('settings:invoicesPage.totalFix.failed', 'Could not save the total.') as string)));
        return;
      }
      setResult(describeResult(j.data));
    } catch {
      setError(t('settings:invoicesPage.totalFix.network', 'Network error. Please try again.') as string);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {renderTrigger(openModal)}
      {open && (
        <Modal isOpen onClose={close} title={t('settings:invoicesPage.totalFix.title', 'Correct invoice total') as string} size="small" zIndex={1100}
          footer={result ? (
            <ModalButton variant="primary" onClick={close}>{t('settings:invoicesPage.totalFix.done', 'Done')}</ModalButton>
          ) : (
            <>
              <ModalButton variant="secondary" onClick={close} disabled={busy}>{t('settings:invoicesPage.totalFix.cancel', 'Cancel')}</ModalButton>
              <ModalButton variant="primary" onClick={submit} disabled={busy}>
                {busy ? '…' : confirmLines
                  ? t('settings:invoicesPage.totalFix.saveClearLines', 'Clear line records and save')
                  : t('settings:invoicesPage.totalFix.save', 'Save total')}
              </ModalButton>
            </>
          )}
        >
          {result ? (
            <div style={{ fontSize: 13, color: '#0A2540', lineHeight: 1.7 }}>
              {result.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          ) : (
            <>
              {confirmLines && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', color: '#92400E', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 }}>
                  {t('settings:invoicesPage.totalFix.linesWillClear', {
                    count: lineRecords,
                    defaultValue: '{{count}} line price records from the earlier comparison will be cleared and will not be applied to cost. Press the button again to continue.'
                  })}
                </div>
              )}
              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 }}>
                  {error}
                </div>
              )}
              <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12, lineHeight: 1.7 }}>
                <div>
                  {t('settings:invoicesPage.totalFix.poAmount', 'Purchase order')}: <strong style={{ color: '#0A2540' }}>{invoice.purchaseOrderNumber || `#${invoice.purchaseOrderId}`}</strong>
                  {poTotal !== null && <> · {formatCurrency(poTotal, currency)}</>}
                </div>
                <div>
                  {t('settings:invoicesPage.totalFix.currentTotal', 'Current invoice total')}: <strong style={{ color: '#0A2540' }}>{formatCurrency(Number(invoice.total || 0), currency)}</strong>
                </div>
              </div>

              <FormGroup>
                <FormLabel>{t('settings:invoicesPage.totalFix.supplierTotal', 'Supplier invoice total')}</FormLabel>
                <FormInput type="number" inputMode="decimal" min="0" step="0.01" value={total} onChange={(e) => setTotal(e.target.value)} />
                {gap !== null && poTotal !== null && entered !== null && (
                  <div style={{ fontSize: 12, marginTop: 4, color: '#4B5563' }}>
                    {t('settings:invoicesPage.totalFix.gapLine', 'Ordered')} {formatCurrency(poTotal, currency)} → {formatCurrency(entered, currency)} = {' '}
                    <strong style={{ color: gapColor(gap) }}>{formatGap(gap, currency)}</strong>
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('settings:invoicesPage.totalFix.invoiceNumber', 'Supplier invoice no.')}</FormLabel>
                <FormInput type="text" value={number} maxLength={100} onChange={(e) => setNumber(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('settings:invoicesPage.totalFix.invoiceDate', 'Supplier invoice date')}</FormLabel>
                <DateField value={date} onChange={setDate} />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('settings:invoicesPage.totalFix.note', 'Note (optional)')}</FormLabel>
                <FormInput type="text" value={note} maxLength={255} onChange={(e) => setNote(e.target.value)}
                  placeholder={t('settings:invoicesPage.totalFix.notePlaceholder', 'Why the total changed — saved in the history') as string} />
              </FormGroup>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 12px', fontSize: 12.5, color: '#334155', lineHeight: 1.7 }}>
                <div>· {t('settings:invoicesPage.totalFix.effectTotal', 'The invoice total and the amount to pay become this total.')}</div>
                <div>· {t('settings:invoicesPage.totalFix.effectHistory', 'Your name and the time are saved in the change history.')}</div>
                {lineRecords > 0 && (
                  <div style={{ color: '#B45309' }}>· {t('settings:invoicesPage.totalFix.effectLines', {
                    count: lineRecords,
                    defaultValue: '{{count}} line price records will be cleared and will not be applied to cost.'
                  })}</div>
                )}
                {isPaid && (
                  <div style={{ color: '#B45309' }}>· {t('settings:invoicesPage.totalFix.effectPaid', 'Already paid — the paid amount is adjusted too. If it was paid in cash, one difference line is added to the open shift drawer.')}</div>
                )}
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
