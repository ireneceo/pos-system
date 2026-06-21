import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';
import {
  DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty, DataTableAmount,
  IconButton,
  Modal as CommonModal, FormInput, ModalButton
} from '../UI';

// 현금 입출금 회계 리스트 — 라이브오더와 동일 DataTable. 부모(시재관리 페이지)가 기간필터(dateRange) 전달.
// 통장식 +/- 내역(날짜·사유·담당) + 행별 수정/삭제. 운영(개시·캐시인/아웃)은 Today's Cash Drawer.

interface Props { restaurantId?: string; dateRange: { start: string; end: string }; search?: string; reloadKey?: number; hideSummary?: boolean; }

const CashLedger: React.FC<Props> = ({ restaurantId, dateRange, search, reloadKey, hideSummary }) => {
  const { t } = useTranslation();
  const store = useStore();
  const currency = store?.operationSettings?.currency || 'MYR';
  const opSettings = store?.operationSettings;
  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const [list, setList] = useState<any[]>([]);
  const [summary, setSummary] = useState<{ totalIn: number; totalOut: number; net: number; count: number }>({ totalIn: 0, totalOut: 0, net: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<any | null>(null);
  const [delTarget, setDelTarget] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchList = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    const qs = new URLSearchParams({ limit: '2000' });
    if (dateRange.start) qs.set('startDate', dateRange.start);
    if (dateRange.end) qs.set('endDate', dateRange.end);
    try {
      const r = await fetch(`/api/cash/restaurant/${restaurantId}/movements?${qs.toString()}`, { credentials: 'include' });
      const j = await r.json().catch(() => null);
      setList(Array.isArray(j?.data) ? j.data : []);
      setSummary(j?.summary || { totalIn: 0, totalOut: 0, net: 0, count: 0 });
    } catch { setList([]); }
    finally { setLoading(false); }
  }, [restaurantId, dateRange.start, dateRange.end]);

  useEffect(() => { fetchList(); }, [fetchList, reloadKey]);

  const api = (path: string, opts: RequestInit) => {
    const token = getAuthToken();
    return fetch(`/api/cash/restaurant/${restaurantId}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, credentials: 'include', ...opts
    }).then(r => r.json().then(j => ({ status: r.status, j })).catch(() => ({ status: r.status, j: null })));
  };

  const saveEdit = async () => {
    if (!edit) return;
    const amt = Math.round((parseFloat(edit.amount) || 0) * 100) / 100;
    if (!(amt > 0)) return;
    setBusy(true);
    const { status } = await api(`/movement/${edit.id}`, { method: 'PUT', body: JSON.stringify({ type: edit.type, amount: amt, reason: edit.reason || null }) });
    setBusy(false);
    if (status === 200) { setEdit(null); fetchList(); }
  };
  const doDelete = async () => {
    if (!delTarget) return;
    setBusy(true);
    const { status } = await api(`/movement/${delTarget.id}`, { method: 'DELETE' });
    setBusy(false);
    if (status === 200) { setDelTarget(null); fetchList(); }
  };

  const rows = useMemo(() => {
    const q = (search || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter(m => (m.reason || '').toLowerCase().includes(q) || (m.created_by_name || '').toLowerCase().includes(q) || String(m.amount).includes(q));
  }, [list, search]);

  const dt = (d: any) => { try { return formatDateTime(d, opSettings, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };

  return (
    <div>
      {/* 통장 요약(합계) — 표 위 한 줄. 드로어 요약(Today's Cash Drawer)이 위에 떠 있으면 중복이라 숨김. */}
      {!hideSummary && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, padding: '0 4px 10px', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', flexWrap: 'wrap' }}>
          <span style={{ color: '#6B7C93' }}>{t('cash:total', { defaultValue: 'Total' })} {summary.count}</span>
          <span style={{ color: '#10B981' }}>+ {fc(summary.totalIn)}</span>
          <span style={{ color: '#FF6B6B' }}>− {fc(summary.totalOut)}</span>
          <span style={{ color: '#0A2540' }}>{t('cash:netLabel', { defaultValue: 'Net' })} {fc(summary.net)}</span>
        </div>
      )}

      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell>{t('cash:colDateTime', { defaultValue: 'Date / Time' })}</DataTableHeaderCell>
            <DataTableHeaderCell>{t('cash:colType', { defaultValue: 'Type' })}</DataTableHeaderCell>
            <DataTableHeaderCell>{t('cash:movementReason', { defaultValue: 'Reason' })}</DataTableHeaderCell>
            <DataTableHeaderCell>{t('cash:colBy', { defaultValue: 'By' })}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('cash:colAmount', { defaultValue: 'Amount' })}</DataTableHeaderCell>
            <DataTableHeaderCell align="center" width="110px">{t('cash:colActions', { defaultValue: 'Actions' })}</DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6}><DataTableEmpty>{t('common:loading', { defaultValue: 'Loading…' })}</DataTableEmpty></td></tr>
          ) : rows.length === 0 ? (
            <tr><td colSpan={6}><DataTableEmpty>{t('cash:noMovements', { defaultValue: 'No cash in/out records yet.' })}</DataTableEmpty></td></tr>
          ) : rows.map(m => {
            const isIn = m.type === 'in';
            const isSettlement = m.source === 'settlement';
            return (
              <DataTableRow key={m.id}>
                <DataTableCell data-label={t('cash:colDateTime', { defaultValue: 'Date / Time' })}>{dt(m.created_at || m.createdAt)}</DataTableCell>
                <DataTableCell data-label={t('cash:colType', { defaultValue: 'Type' })}>
                  <span style={{ fontWeight: 700, color: isIn ? '#10B981' : '#FF6B6B' }}>{isIn ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' })}</span>
                  {isSettlement && (
                    <span style={{ marginLeft: 8, display: 'inline-block', fontSize: 11, fontWeight: 600, color: '#635BFF', background: '#EEF0FF', border: '1px solid #DADCFF', borderRadius: 10, padding: '1px 8px', verticalAlign: 'middle' }}>
                      {t('cash:settlementAdj', { defaultValue: 'Settlement' })}
                    </span>
                  )}
                </DataTableCell>
                <DataTableCell data-label={t('cash:movementReason', { defaultValue: 'Reason' })}>{isSettlement ? (isIn ? t('cash:cashOverAtSettlement', { defaultValue: 'Cash over at settlement' }) : t('cash:cashShortAtSettlement', { defaultValue: 'Cash short at settlement' })) : (m.reason || '—')}</DataTableCell>
                <DataTableCell data-label={t('cash:colBy', { defaultValue: 'By' })}>{m.created_by_name || '—'}</DataTableCell>
                <DataTableCell data-label={t('cash:colAmount', { defaultValue: 'Amount' })} align="right">
                  <DataTableAmount highlight style={{ color: isIn ? '#10B981' : '#FF6B6B' }}>{isIn ? '+ ' : '− '}{fc(m.amount)}</DataTableAmount>
                </DataTableCell>
                <DataTableCell data-label={t('cash:colActions', { defaultValue: 'Actions' })} align="center">
                  {isSettlement ? (
                    <span style={{ color: '#9CA3AF', fontSize: 13 }}>—</span>
                  ) : (
                    <div style={{ display: 'inline-flex', gap: 6, justifyContent: 'center' }}>
                      <IconButton type="button" title={t('common:button.edit', { defaultValue: 'Edit' })} onClick={() => setEdit({ ...m, amount: String(m.amount) })}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
                      </IconButton>
                      <IconButton type="button" title={t('common:button.delete', { defaultValue: 'Delete' })} onClick={() => setDelTarget(m)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </IconButton>
                    </div>
                  )}
                </DataTableCell>
              </DataTableRow>
            );
          })}
        </tbody>
      </DataTable>

      {/* 수정 모달 */}
      {edit && (
        <CommonModal isOpen onClose={() => setEdit(null)} title={t('cash:editMovement', { defaultValue: 'Edit cash movement' })} size="small"
          footer={<>
            <ModalButton onClick={() => setEdit(null)}>{t('cash:cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" disabled={busy} onClick={saveEdit}>{busy ? '…' : t('cash:save', { defaultValue: 'Save' })}</ModalButton>
          </>}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button type="button" onClick={() => setEdit({ ...edit, type: 'in' })}
              style={{ flex: 1, height: 44, borderRadius: 8, border: `1px solid ${edit.type === 'in' ? '#10B981' : '#E6EBF1'}`, background: edit.type === 'in' ? '#ECFDF5' : '#fff', color: edit.type === 'in' ? '#10B981' : '#0A2540', fontWeight: 600, cursor: 'pointer' }}>{t('cash:paidIn', { defaultValue: 'Cash in' })}</button>
            <button type="button" onClick={() => setEdit({ ...edit, type: 'out' })}
              style={{ flex: 1, height: 44, borderRadius: 8, border: `1px solid ${edit.type === 'out' ? '#FF6B6B' : '#E6EBF1'}`, background: edit.type === 'out' ? '#FFF1F1' : '#fff', color: edit.type === 'out' ? '#FF6B6B' : '#0A2540', fontWeight: 600, cursor: 'pointer' }}>{t('cash:paidOut', { defaultValue: 'Cash out' })}</button>
          </div>
          <FormInput type="number" value={edit.amount} onChange={e => setEdit({ ...edit, amount: e.target.value })} placeholder="0.00" />
          <FormInput value={edit.reason || ''} onChange={e => setEdit({ ...edit, reason: e.target.value })} placeholder={t('cash:movementReason', { defaultValue: 'Reason (optional)' })} style={{ marginTop: 10 }} />
        </CommonModal>
      )}
      {/* 삭제 확인 */}
      {delTarget && (
        <CommonModal isOpen onClose={() => setDelTarget(null)} title={t('cash:deleteMovement', { defaultValue: 'Delete cash movement' })} size="small"
          footer={<>
            <ModalButton onClick={() => setDelTarget(null)}>{t('cash:cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="danger" disabled={busy} onClick={doDelete}>{busy ? '…' : t('common:button.delete', { defaultValue: 'Delete' })}</ModalButton>
          </>}>
          <p style={{ fontSize: 14, color: '#0A2540', margin: 0 }}>
            {t('cash:deleteConfirm', { defaultValue: 'Delete this {{type}} of {{amount}}?', type: delTarget.type === 'in' ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' }), amount: fc(delTarget.amount) })}
          </p>
        </CommonModal>
      )}
    </div>
  );
};

export default CashLedger;
