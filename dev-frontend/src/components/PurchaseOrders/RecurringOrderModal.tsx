import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Modal, FormGroup, FormLabel, FormInput, FormSelect,
  DataTable, DataTableHead, DataTableRow, DataTableCell, DataTableHeaderCell
} from '../UI';
import { Button } from '../UI/Button';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';
import { withOwnerPoScope } from '../../utils/ownerPoScope';

/**
 * 정기 발주(Standing order) 만들기·수정 창 — 2026-10-22 Fable 설계 recurring-po §8-1.
 *  - 만들기: 지난 발주(또는 대기 초안) id → 서버 드라이런(/schedules/preview)으로 «지금 가격» 줄·총액·첫 발주일을 보여 준다.
 *  - 수정: 수량·주기·이름만(품목 교체 없음 — v1).
 * 금액·첫 발주일은 서버가 계산한다(화면은 받은 값을 보여 줄 뿐).
 */
export interface StandingOrder {
  id: number;
  name: string | null;
  status: 'pending_approval' | 'active' | 'paused' | 'ended';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  weekday: number | null;
  day_of_month: number | null;
  next_run_date: string | null;
  seller_name?: string | null;
  is_external?: boolean;
  line_items: Array<{ description?: string | null; quantity_ordered: number }>;
  paused_reason?: string | null;
  approved_total?: string | number | null;
  last_po?: { id: number; po_number: string; status: string; currency?: string } | null;
  pending_po?: { id: number; po_number: string } | null;
  restaurant_name?: string | null;
  entity_id?: number;
  preview?: Preview | null;
  preview_error?: string | null;
}

interface Preview {
  total: number;
  subtotal: number;
  delivery_fee: number;
  currency: string;
  lines: Array<{ name: string; unit?: string | null; quantity_ordered: number; unit_price: number; line_total: number }>;
  first_run_date?: string;
  approval_required?: boolean;
  seller_name?: string;
  is_external?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** 만들기 — 출처 발주 id */
  sourcePoId?: number | null;
  /** 수정 — 기존 틀 */
  schedule?: StandingOrder | null;
  role?: string | null;
  onSaved: (s: StandingOrder) => void;
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Note = styled.div<{ tone?: 'info' | 'warn' | 'error' }>`
  font-size: 13px;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  margin: 0 0 12px;
  color: ${p => (p.tone === 'error' ? '#991B1B' : p.tone === 'warn' ? '#92400E' : '#374151')};
  background: ${p => (p.tone === 'error' ? '#FEF2F2' : p.tone === 'warn' ? '#FFFBEB' : '#F3F4F6')};
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  margin: 8px 0 12px;
  strong { color: #111827; }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const RecurringOrderModal: React.FC<Props> = ({ isOpen, onClose, sourcePoId, schedule, role, onSaved }) => {
  const { t, i18n } = useTranslation('purchaseOrders');
  const editing = !!schedule;
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [weekday, setWeekday] = useState<number | null>(null);
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [name, setName] = useState('');
  const [qtys, setQtys] = useState<string[]>([]);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [previewErr, setPreviewErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState<string | null>(null);

  // 열릴 때 초기값
  useEffect(() => {
    if (!isOpen) return;
    setSaveErr(null);
    if (schedule) {
      setFrequency(schedule.frequency);
      setWeekday(schedule.weekday);
      setDayOfMonth(schedule.day_of_month || 1);
      setName(schedule.name || '');
      setQtys(schedule.line_items.map(l => String(l.quantity_ordered)));
      setPreview(null);
      setPreviewErr(null);
    } else {
      setFrequency('weekly');
      setWeekday(null);   // 서버 기본 = 출처 발주 요일
      setDayOfMonth(1);
      setName('');
    }
  }, [isOpen, schedule]);

  // 만들기 — 주기가 바뀔 때마다 서버 미리보기(지금 가격 · 첫 발주일)
  useEffect(() => {
    if (!isOpen || editing || !sourcePoId) return;
    let alive = true;
    setLoading(true);
    setPreviewErr(null);
    const body: any = { source_po_id: sourcePoId, frequency };
    if (frequency === 'monthly') body.day_of_month = dayOfMonth;
    else if (weekday != null) body.weekday = weekday;
    fetch(withOwnerPoScope('/api/purchase-orders/schedules/preview', role), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
      body: JSON.stringify(body)
    })
      .then(async r => ({ ok: r.ok, j: await r.json().catch(() => null) }))
      .then(({ ok, j }) => {
        if (!alive) return;
        if (ok && j?.success) {
          setPreview(j.data);
          if (weekday == null && frequency !== 'monthly' && j.data?.first_run_date) {
            setWeekday(new Date(`${j.data.first_run_date}T00:00:00Z`).getUTCDay());
          }
        } else {
          setPreview(null);
          setPreviewErr(j?.message || (t('recurring.failed') as string));
        }
      })
      .catch(() => { if (alive) setPreviewErr(t('recurring.failed') as string); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editing, sourcePoId, frequency, weekday, dayOfMonth, role]);

  // 요일 이름은 브라우저 Intl 로 — i18n 배열(returnObjects)은 이 화면에서 배열이 아닌 값으로 와 .map 에서 화면이 죽었다.
  //   2026-10-25(일)~10-31(토) 고정 날짜를 UTC 로 읽는다(요일 이름만 필요 — 매장 시간대 무관).
  const days = useMemo(() => {
    const lang = i18n.language || 'en';
    return Array.from({ length: 7 }, (_, i) =>
      new Date(Date.UTC(2026, 9, 25 + i)).toLocaleDateString(lang, { weekday: 'long', timeZone: 'UTC' }));
  }, [i18n.language]);
  const isExternal = editing ? !!schedule?.is_external : !!preview?.is_external;
  const currency = preview?.currency || 'MYR';

  const qtyInvalid = editing && qtys.some(q => !(parseFloat(q) > 0));
  const canSave = !saving && (editing ? !qtyInvalid : (!!preview && !previewErr && !loading));

  const save = async () => {
    setSaving(true);
    setSaveErr(null);
    try {
      const body: any = { frequency, name: name.trim() || null };
      if (frequency === 'monthly') body.day_of_month = dayOfMonth;
      else if (weekday != null) body.weekday = weekday;
      let url = '/api/purchase-orders/schedules';
      let method = 'POST';
      if (editing && schedule) {
        url = `/api/purchase-orders/schedules/${schedule.id}`;
        method = 'PUT';
        body.line_items = qtys.map(q => ({ quantity_ordered: parseFloat(q) }));
      } else {
        body.source_po_id = sourcePoId;
      }
      const res = await fetch(withOwnerPoScope(url, role), {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(body)
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setSaveErr(j?.message || (t('recurring.failed') as string)); return; }
      onSaved(j.data);
    } catch {
      setSaveErr(t('recurring.failed') as string);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { if (!saving) onClose(); }}
      title={editing ? (t('recurring.editTitle') as string) : (t('recurring.createTitle') as string)}
      maxWidth="720px"
      footer={
        <Footer>
          <Button variant="secondary" onClick={onClose} disabled={saving}>{t('common.cancel')}</Button>
          <Button variant="primary" onClick={save} disabled={!canSave}>
            {saving ? t('recurring.saving') : editing ? t('recurring.saveEdit') : t('recurring.save')}
          </Button>
        </Footer>
      }
    >
      {(editing ? schedule?.seller_name : preview?.seller_name) && (
        <div style={{ fontSize: 14, color: '#4B5563', marginBottom: 12 }}>
          {t('recurring.col.supplier')}: <strong style={{ color: '#111827' }}>{editing ? schedule?.seller_name : preview?.seller_name}</strong>
        </div>
      )}

      <Row>
        <FormGroup>
          <FormLabel>{t('recurring.frequency')}</FormLabel>
          <FormSelect value={frequency} onChange={e => setFrequency(e.target.value as any)}>
            <option value="weekly">{t('recurring.weekly')}</option>
            <option value="biweekly">{t('recurring.biweekly')}</option>
            <option value="monthly">{t('recurring.monthly')}</option>
          </FormSelect>
        </FormGroup>
        {frequency === 'monthly' ? (
          <FormGroup>
            <FormLabel>{t('recurring.dayOfMonth')}</FormLabel>
            <FormSelect value={dayOfMonth} onChange={e => setDayOfMonth(Number(e.target.value))}>
              {Array.from({ length: 28 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
            </FormSelect>
          </FormGroup>
        ) : (
          <FormGroup>
            <FormLabel>{t('recurring.weekday')}</FormLabel>
            <FormSelect value={weekday ?? ''} onChange={e => setWeekday(Number(e.target.value))}>
              {weekday == null && <option value="">—</option>}
              {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </FormSelect>
          </FormGroup>
        )}
      </Row>

      <FormGroup>
        <FormLabel>{t('recurring.name')}</FormLabel>
        <FormInput value={name} maxLength={100} placeholder={t('recurring.namePlaceholder') as string} onChange={e => setName(e.target.value)} />
      </FormGroup>

      {/* 외부(구독) 공급업체 — 업체에는 아무것도 보내지 않는다. 업체가 알아서 배송·청구하고 우리는 기록·수령만(Irene 10-22) */}
      {isExternal && <Note>{t('recurring.externalNote')}</Note>}

      {editing ? (
        <>
          <Note>{t('recurring.qtyOnly')}</Note>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>{t('recurring.items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('recurring.qty')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {(schedule?.line_items || []).map((l, i) => (
                <DataTableRow key={i}>
                  <DataTableCell data-label={t('recurring.items') as string}>{l.description || `#${i + 1}`}</DataTableCell>
                  <DataTableCell data-label={t('recurring.qty') as string} align="right">
                    <FormInput
                      type="number" min="0" step="any" inputMode="decimal"
                      style={{ maxWidth: 110, textAlign: 'right' }}
                      value={qtys[i] ?? ''}
                      onChange={e => setQtys(prev => prev.map((q, j) => (j === i ? e.target.value : q)))}
                    />
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {schedule?.status !== 'ended' && <Note tone="warn" style={{ marginTop: 12 }}>{t('recurring.reapproveNote')}</Note>}
        </>
      ) : (
        <>
          {loading && <Note>{t('recurring.loadingPreview')}</Note>}
          {previewErr && <Note tone="error">{previewErr}</Note>}
          {preview && !loading && (
            <>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell>{t('recurring.items')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('recurring.qty')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('recurring.unitPrice')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('recurring.lineTotal')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {preview.lines.map((l, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell data-label={t('recurring.items') as string}>{l.name}</DataTableCell>
                      <DataTableCell data-label={t('recurring.qty') as string} align="right">{l.quantity_ordered}{l.unit ? ` ${l.unit}` : ''}</DataTableCell>
                      <DataTableCell data-label={t('recurring.unitPrice') as string} align="right">{formatCurrency(l.unit_price, currency)}</DataTableCell>
                      <DataTableCell data-label={t('recurring.lineTotal') as string} align="right">{formatCurrency(l.line_total, currency)}</DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
              {preview.delivery_fee > 0 && (
                <Summary><span>{t('recurring.delivery')}</span><span>{formatCurrency(preview.delivery_fee, currency)}</span></Summary>
              )}
              <Summary><span>{t('recurring.total')}</span><strong>{formatCurrency(preview.total, currency)}</strong></Summary>
              {preview.first_run_date && (
                <Summary><span>{t('recurring.firstRun')}</span><strong>{t('recurring.atTime', { date: preview.first_run_date })}</strong></Summary>
              )}
              <Note>{t('recurring.priceNote')}</Note>
              {preview.approval_required && <Note tone="warn">{t('recurring.approvalNote')}</Note>}
            </>
          )}
        </>
      )}
      {saveErr && <Note tone="error">{saveErr}</Note>}
    </Modal>
  );
};

export default RecurringOrderModal;
