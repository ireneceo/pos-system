/**
 * ExternalSoaIssueButton — 외부 공급업체 «정산서 지금 만들기» (2026-10-07 Fable 판정 ⑩ A-3 · docs/TRADE_STRUCTURE.md ⑩)
 *
 * 월별 정산서로 켜 둔 외부 업체가 하나라도 있을 때만 보인다(`GET /api/external-suppliers` 의 billing).
 * 공급업체 SOA 가 발행일보다 먼저 와서 바로 맞추고 싶을 때 쓴다 — 자동 발행과 같은 규칙으로 «아직 안 묶인 청구서» 만 묶는다.
 *   `POST /api/purchase-invoices/soa/external/:supplierId/issue` · 기간을 비우면 지난달(매장 달력).
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { Modal, ModalButton, FormGroup, FormLabel, FormSelect } from '../UI/Modal';
import DateField from '../Common/DateField';
import AlertDialog from '../Common/AlertDialog';
import { getAuthToken } from '../../utils/auth';

interface Props {
  /** 만든 뒤(목록 다시 읽기) */
  onIssued?: () => void;
}

export default function ExternalSoaIssueButton({ onIssued }: Props) {
  const { t } = useTranslation(['settings', 'common']);
  const [suppliers, setSuppliers] = useState<Array<{ id: number; name: string }>>([]);
  const [open, setOpen] = useState(false);
  const [supplierId, setSupplierId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/external-suppliers', { headers: { Authorization: `Bearer ${getAuthToken()}` } })
      .then(r => r.json()).catch(() => null)
      .then(j => {
        if (!alive || !j?.success) return;
        setSuppliers((j.data || []).filter((s: any) => s.billing?.invoice_cycle === 'monthly_soa' && s.is_active_for_me !== false)
          .map((s: any) => ({ id: s.id, name: s.name })));
      });
    return () => { alive = false; };
  }, []);

  if (suppliers.length === 0) return null;

  const submit = async () => {
    if (!supplierId) { setError(t('settings:invoicesPage.soaIssue.pickSupplier', 'Pick a supplier.') as string); return; }
    if ((start && !end) || (!start && end)) { setError(t('settings:invoicesPage.soaIssue.bothDates', 'Fill in both dates, or leave both empty for last month.') as string); return; }
    setBusy(true); setError(null);
    try {
      const res = await fetch(`/api/purchase-invoices/soa/external/${supplierId}/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(start && end ? { period_start: start, period_end: end } : {}),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setError(j?.message || (t('settings:invoicesPage.soaIssue.failed', 'Could not create the statement.') as string)); return; }
      setOpen(false);
      setDone(j.data?.issued
        ? (t('settings:invoicesPage.soaIssue.issued', 'Statement created. Open it in the list to attach the supplier\'s SOA and mark it paid.') as string)
        : (t('settings:invoicesPage.soaIssue.nothing', 'There are no unpaid invoices from this supplier to bundle.') as string));
      if (j.data?.issued && onIssued) onIssued();
    } catch {
      setError(t('settings:invoicesPage.soaIssue.failed', 'Could not create the statement.') as string);
    } finally { setBusy(false); }
  };

  return (
    <>
      <Button variant="secondary" onClick={() => { setError(null); setSupplierId(suppliers.length === 1 ? String(suppliers[0].id) : ''); setStart(''); setEnd(''); setOpen(true); }}>
        {t('settings:invoicesPage.soaIssue.button', 'Create supplier statement')}
      </Button>
      {open && (
        <Modal
          isOpen
          onClose={() => setOpen(false)}
          title={t('settings:invoicesPage.soaIssue.title', 'Create monthly statement') as string}
          size="small"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setOpen(false)}>{t('common:button.cancel', 'Cancel')}</ModalButton>
            <ModalButton variant="primary" disabled={busy} onClick={submit}>{busy ? '…' : t('settings:invoicesPage.soaIssue.create', 'Create')}</ModalButton>
          </>}
        >
          {error && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <FormGroup>
            <FormLabel>{t('settings:invoicesPage.soaIssue.supplier', 'Supplier (monthly statement)')}</FormLabel>
            <FormSelect value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
              <option value="">{t('settings:invoicesPage.soaIssue.choose', 'Choose…')}</option>
              {suppliers.map(s => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
            </FormSelect>
          </FormGroup>
          <div style={{ display: 'flex', gap: 12 }}>
            <FormGroup style={{ flex: 1 }}>
              <FormLabel>{t('settings:invoicesPage.soaIssue.from', 'From')}</FormLabel>
              <DateField value={start} onChange={setStart} />
            </FormGroup>
            <FormGroup style={{ flex: 1 }}>
              <FormLabel>{t('settings:invoicesPage.soaIssue.to', 'To')}</FormLabel>
              <DateField value={end} onChange={setEnd} />
            </FormGroup>
          </div>
          <div style={{ fontSize: 12, color: '#4B5563' }}>
            {t('settings:invoicesPage.soaIssue.hint', 'Leave the dates empty for last month. Unpaid invoices from before the period that are not in any statement yet are included too.')}
          </div>
        </Modal>
      )}
      {done && <AlertDialog isOpen title={t('settings:invoicesPage.soaIssue.title', 'Create monthly statement') as string} message={done} onClose={() => setDone(null)} />}
    </>
  );
}
