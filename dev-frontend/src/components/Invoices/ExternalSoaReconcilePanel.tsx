/**
 * ExternalSoaReconcilePanel — 외부 공급업체 월별 정산서 대조 (2026-10-07 Fable 판정 ⑩ A-5 · docs/TRADE_STRUCTURE.md ⑩)
 *
 * > Irene (10-04): 「… SOA 결제 인보이스 뜨게 하고 최종 받은 SOA랑 대조해서 결제정리할 수 있게」
 *
 * 정산서 상세 창 안에서 쓰는 한 조각:
 *   ① 묶인 청구서 표 — 줄마다 «총액 수정»(SupplierInvoiceTotalFix, §8-7 그대로). 고치면 정산서 합계가 서버에서 따라간다.
 *   ② 공급업체가 보낸 SOA 붙이기 — 파일·번호·날짜·총액 → `POST /api/invoices/:id/soa-reconcile`
 *      총액을 넣으면 «우리 합계 → 공급업체 SOA = ±» 를 보여 주고, 확정하면 차액 한 줄로 낼 금액이 공급업체 총액이 된다.
 *   결제된·취소된 정산서는 ②를 숨기고 붙인 파일만 보여 준다.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { FormGroup, FormLabel, FormInput } from '../UI/Modal';
import DateField from '../Common/DateField';
import SupplierInvoiceTotalFix, { canFixSupplierInvoiceTotal, TotalFixInvoice } from './SupplierInvoiceTotalFix';
import { formatGap, gapColor } from '../../utils/reconcileGap';
import { formatCurrency } from '../../utils/currency';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/dateFormat';

export interface SoaChildRow extends TotalFixInvoice {
  invoiceNumber?: string;
  issueDate?: string;
}

export interface ExternalSoaLike {
  id: number | string;
  status?: string;
  total: number;
  currency?: string;
  additionalCharges?: Array<{ name?: string; amount?: number | string }>;
  externalDocument?: { url?: string; filename?: string; number?: string; date?: string; total?: number } | null;
}

interface Props {
  soa: ExternalSoaLike;
  children: SoaChildRow[];
  /** 매장 시간대 — 날짜 표시 */
  timeZone?: string;
  /** 저장 뒤(목록 다시 읽기) */
  onChanged?: () => void;
}

const DIFF_LINE = 'Supplier statement difference';
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function ExternalSoaReconcilePanel({ soa, children, timeZone, onChanged }: Props) {
  const { t } = useTranslation(['settings', 'common']);
  const cur = soa.currency || 'MYR';
  const locked = soa.status === 'paid' || soa.status === 'cancelled';
  const doc = soa.externalDocument || null;
  const ourSum = r2(children.filter(c => c.status !== 'cancelled').reduce((a, c) => a + Number(c.total || 0), 0));
  const diffLine = (soa.additionalCharges || []).find(c => c && c.name === DIFF_LINE);

  const [number, setNumber] = useState(doc?.number || '');
  const [date, setDate] = useState(doc?.date || '');
  const [total, setTotal] = useState(doc?.total != null ? String(doc.total) : '');
  const [note, setNote] = useState('');
  const [file, setFile] = useState<{ url: string; filename: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const totalNum = total.trim() === '' ? null : Number(total);
  const gap = totalNum != null && Number.isFinite(totalNum) ? r2(totalNum - ourSum) : null;

  const upload = async (f: File) => {
    setError(null);
    try {
      const fd = new FormData();
      fd.append('files', f);
      const up = await fetch('/api/upload/files', { method: 'POST', headers: { Authorization: `Bearer ${getAuthToken()}` }, body: fd });
      const j = await up.json().catch(() => null);
      if (!up.ok || !j?.success || !j.data?.[0]) { setError(t('settings:invoicesPage.soaRecon.uploadFailed', 'Upload failed.') as string); return; }
      setFile({ url: j.data[0].url, filename: j.data[0].originalName || f.name });
    } catch {
      setError(t('settings:invoicesPage.soaRecon.uploadFailed', 'Upload failed.') as string);
    }
  };

  const save = async () => {
    if (totalNum != null && (!Number.isFinite(totalNum) || totalNum < 0)) {
      setError(t('settings:invoicesPage.soaRecon.badTotal', 'Enter a valid total.') as string);
      return;
    }
    setBusy(true); setError(null); setSaved(null);
    try {
      const document: any = { number: number.trim() || null, date: date || null };
      if (file) { document.url = file.url; document.filename = file.filename; }
      if (totalNum != null) document.total = totalNum;
      const res = await fetch(`/api/invoices/${soa.id}/soa-reconcile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ document, note: note.trim() || undefined }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setError(j?.message || (t('settings:invoicesPage.soaRecon.failed', 'Could not save.') as string)); return; }
      setSaved(j.changed
        ? (t('settings:invoicesPage.soaRecon.savedChanged', 'Saved. Amount to pay is now {{total}}.', { total: formatCurrency(j.total, cur) }) as string)
        : (t('settings:invoicesPage.soaRecon.saved', 'Saved.') as string));
      setFile(null); setNote('');
      if (onChanged) onChanged();
    } catch {
      setError(t('settings:invoicesPage.soaRecon.failed', 'Could not save.') as string);
    } finally { setBusy(false); }
  };

  const cell: React.CSSProperties = { padding: '10px 8px', fontSize: 14, color: '#1F2937' };
  const head: React.CSSProperties = { padding: '10px 8px', fontSize: 12, fontWeight: 600, color: '#4B5563' };

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 12, textTransform: 'uppercase' }}>
        {t('settings:invoicesPage.soaInvoices', 'Invoices in this statement')} ({children.length})
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #C7CED6' }}>
            <th style={{ ...head, textAlign: 'left' }}>{t('settings:invoicesPage.soaInvoiceNumber', 'Invoice No.')}</th>
            <th style={{ ...head, textAlign: 'center' }}>{t('settings:invoicesPage.soaInvoiceDate', 'Date')}</th>
            <th style={{ ...head, textAlign: 'right' }}>{t('settings:invoicesPage.amount', 'Amount')}</th>
            {!locked && <th style={head} />}
          </tr>
        </thead>
        <tbody>
          {children.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #F1F4F8' }}>
              <td style={cell}>
                {c.invoiceNumber}
                {c.purchaseOrderNumber && <span style={{ color: '#6B7280', fontSize: 12 }}> · {c.purchaseOrderNumber}</span>}
              </td>
              <td style={{ ...cell, textAlign: 'center' }}>{c.issueDate ? formatDate(c.issueDate, timeZone) : '—'}</td>
              <td style={{ ...cell, textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(c.total, c.currency || cur)}</td>
              {!locked && (
                <td style={{ ...cell, textAlign: 'right' }}>
                  {canFixSupplierInvoiceTotal(c) && (
                    <SupplierInvoiceTotalFix
                      invoice={c}
                      onSaved={onChanged}
                      renderTrigger={(open) => (
                        <Button variant="secondary" size="small" onClick={open}>{t('settings:invoicesPage.totalFix.button', 'Fix total')}</Button>
                      )}
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>
          {t('settings:invoicesPage.soaRecon.title', "Compare with the supplier's SOA")}
        </div>
        <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.8 }}>
          <div>{t('settings:invoicesPage.soaRecon.ourTotal', 'Our total (invoices above)')}: <strong>{formatCurrency(ourSum, cur)}</strong></div>
          {doc?.total != null && (
            <div>
              {t('settings:invoicesPage.soaRecon.supplierTotal', "Supplier's SOA")}
              {doc.number ? ` ${doc.number}` : ''}{doc.date ? ` · ${formatDate(doc.date, timeZone)}` : ''}: <strong>{formatCurrency(doc.total, cur)}</strong>
              {diffLine && Number(diffLine.amount) !== 0 && (
                <span style={{ color: gapColor(Number(diffLine.amount)), marginLeft: 8 }}>
                  ({t('settings:invoicesPage.soaRecon.difference', 'difference')} {formatGap(Number(diffLine.amount), cur)})
                </span>
              )}
            </div>
          )}
          <div>{t('settings:invoicesPage.soaRecon.toPay', 'Amount to pay')}: <strong>{formatCurrency(soa.total, cur)}</strong></div>
          {doc?.url && (
            <div>
              <a href={doc.url} target="_blank" rel="noreferrer noopener" style={{ color: '#635BFF' }}>
                {t('settings:invoicesPage.soaRecon.viewFile', 'View attached SOA')}{doc.filename ? ` (${doc.filename})` : ''}
              </a>
            </div>
          )}
        </div>

        {!locked && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <FormGroup style={{ flex: '1 1 160px' }}>
                <FormLabel>{t('settings:invoicesPage.soaRecon.number', 'SOA number')}</FormLabel>
                <FormInput type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
              </FormGroup>
              <FormGroup style={{ flex: '1 1 160px' }}>
                <FormLabel>{t('settings:invoicesPage.soaRecon.date', 'SOA date')}</FormLabel>
                <DateField value={date} onChange={setDate} />
              </FormGroup>
              <FormGroup style={{ flex: '1 1 160px' }}>
                <FormLabel>{t('settings:invoicesPage.soaRecon.total', 'SOA total')}</FormLabel>
                <FormInput type="number" min="0" step="0.01" value={total} onChange={(e) => setTotal(e.target.value)} />
              </FormGroup>
            </div>
            {gap != null && (
              <div style={{ fontSize: 13, marginBottom: 8, color: gapColor(gap) }}>
                {t('settings:invoicesPage.soaRecon.gapLine', 'Our total {{ours}} → supplier SOA {{theirs}} = {{gap}}', {
                  ours: formatCurrency(ourSum, cur), theirs: formatCurrency(totalNum as number, cur), gap: formatGap(gap, cur),
                })}
              </div>
            )}
            <FormGroup>
              <FormLabel>{t('settings:invoicesPage.soaRecon.file', 'SOA file (photo or PDF)')}</FormLabel>
              <input type="file" accept="image/*,application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
              {file && <div style={{ fontSize: 12, color: '#047857', marginTop: 4 }}>{file.filename}</div>}
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('settings:invoicesPage.soaRecon.note', 'Note')}</FormLabel>
              <FormInput type="text" value={note} onChange={(e) => setNote(e.target.value)} />
            </FormGroup>
            {error && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 8 }}>{error}</div>}
            {saved && <div style={{ color: '#047857', fontSize: 13, marginBottom: 8 }}>{saved}</div>}
            <Button variant="success" disabled={busy} onClick={save}>
              {busy ? '…' : (totalNum != null
                ? t('settings:invoicesPage.soaRecon.confirmTotal', 'Confirm with this total')
                : t('settings:invoicesPage.soaRecon.saveDoc', 'Save SOA details'))}
            </Button>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 6 }}>
              {t('settings:invoicesPage.soaRecon.hint', "If a single invoice is wrong, fix it on its row first. Any difference left after that becomes one «supplier statement difference» line, so the amount to pay matches the supplier's SOA.")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
