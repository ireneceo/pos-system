import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';
import DateRangeField from '../Common/DateRangeField';
import { Modal, FormInput, ModalButton } from '../UI/Modal';
import { C } from './cashUi';

// 시재 현금 입출금 회계 리스트 (통장식). 탭(오늘/과거/전체/기간) + 날짜별 그룹 + 소계/총계 + 수정/삭제.
// 운영(개시·캐시인/아웃)은 Today's Cash Drawer(라이브/플로어). 여긴 조회·정정 전용 회계 화면.

interface Props { restaurantId?: string; }
type Tab = 'today' | 'past' | 'all' | 'range';

const CashLedger: React.FC<Props> = ({ restaurantId }) => {
  const { t } = useTranslation();
  const store = useStore();
  const currency = store?.operationSettings?.currency || 'MYR';
  const opSettings = store?.operationSettings;
  const tz = opSettings?.timeZone || 'Asia/Kuala_Lumpur';
  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const [tab, setTab] = useState<Tab>('today');
  const [custom, setCustom] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [list, setList] = useState<any[]>([]);
  const [summary, setSummary] = useState<{ totalIn: number; totalOut: number; net: number; count: number }>({ totalIn: 0, totalOut: 0, net: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<any | null>(null);   // 수정 중 movement
  const [delTarget, setDelTarget] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);

  const tzDay = useCallback((off = 0) => new Date(Date.now() + off * 86400000).toLocaleDateString('en-CA', { timeZone: tz }), [tz]);

  const bounds = useMemo(() => {
    if (tab === 'today') return { start: tzDay(0), end: tzDay(0) };
    if (tab === 'past') return { start: '', end: tzDay(-1) };       // 어제까지 전부
    if (tab === 'range') return { start: custom.start, end: custom.end };
    return { start: '', end: '' };                                   // all
  }, [tab, custom, tzDay]);

  const fetchList = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    const qs = new URLSearchParams({ limit: '2000' });
    if (bounds.start) qs.set('startDate', bounds.start);
    if (bounds.end) qs.set('endDate', bounds.end);
    try {
      const r = await fetch(`/api/cash/restaurant/${restaurantId}/movements?${qs.toString()}`, { credentials: 'include' });
      const j = await r.json().catch(() => null);
      setList(Array.isArray(j?.data) ? j.data : []);
      setSummary(j?.summary || { totalIn: 0, totalOut: 0, net: 0, count: 0 });
    } catch { setList([]); }
    finally { setLoading(false); }
  }, [restaurantId, bounds]);

  useEffect(() => { fetchList(); }, [fetchList]);

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

  const groups = useMemo(() => {
    const dKey = (d: any) => { try { return new Date(d).toLocaleDateString('en-CA', { timeZone: tz }); } catch { return ''; } };
    const dLabel = (d: any) => { try { return formatDateTime(d, opSettings, { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } };
    const g: any[] = [];
    for (const m of list) {
      const k = dKey(m.created_at || m.createdAt);
      let grp = g.find(x => x.k === k);
      if (!grp) { grp = { k, label: dLabel(m.created_at || m.createdAt), items: [], inSum: 0, outSum: 0 }; g.push(grp); }
      grp.items.push(m);
      if (m.type === 'in') grp.inSum += Number(m.amount) || 0; else grp.outSum += Number(m.amount) || 0;
    }
    return g;
  }, [list, tz, opSettings]);

  const tLabel = (d: any) => { try { return formatDateTime(d, opSettings, { hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };
  const TABS: { k: Tab; label: string }[] = [
    { k: 'today', label: t('cash:rangeToday', { defaultValue: 'Today' }) },
    { k: 'past', label: t('cash:rangePast', { defaultValue: 'Past' }) },
    { k: 'all', label: t('cash:rangeAll', { defaultValue: 'All' }) },
    { k: 'range', label: t('cash:rangeCustom', { defaultValue: 'Date range' }) },
  ];

  return (
    <div>
      {/* 탭 (라이브오더식) */}
      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${C.border}`, marginBottom: 14, overflowX: 'auto' }}>
        {TABS.map(x => (
          <button key={x.k} type="button" onClick={() => setTab(x.k)}
            style={{ padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
              color: tab === x.k ? C.primary : C.subtle, borderBottom: tab === x.k ? `2px solid ${C.primary}` : '2px solid transparent', marginBottom: -1 }}>
            {x.label}
          </button>
        ))}
      </div>
      {tab === 'range' && (
        <div style={{ marginBottom: 14, maxWidth: 320 }}>
          <DateRangeField startDate={custom.start} endDate={custom.end} onChange={(s: string, e: string) => setCustom({ start: s, end: e })} />
        </div>
      )}

      {/* 총계 (통장 요약) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg, borderRadius: 8, padding: '12px 16px', marginBottom: 12, flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontSize: 13, color: C.subtle, fontWeight: 600 }}>{t('cash:total', { defaultValue: 'Total' })} · {summary.count}</span>
        <span style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: C.match }}>+{fc(summary.totalIn)}</span>{'   '}
          <span style={{ color: C.bad }}>−{fc(summary.totalOut)}</span>{'   '}
          <span style={{ color: C.text }}>· {t('cash:netLabel', { defaultValue: 'Net' })} {fc(summary.net)}</span>
        </span>
      </div>

      {loading ? (
        <div style={{ fontSize: 13, color: C.subtle, padding: '16px 0', textAlign: 'center' }}>{t('common:loading', { defaultValue: 'Loading…' })}</div>
      ) : groups.length === 0 ? (
        <div style={{ fontSize: 13, color: C.subtle, padding: '16px 0', textAlign: 'center' }}>{t('cash:noMovements', { defaultValue: 'No cash in/out records yet.' })}</div>
      ) : (
        <div>
          {groups.map(g => (
            <div key={g.k} style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 2px', borderBottom: `2px solid ${C.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{g.label}</span>
                <span style={{ fontSize: 12, color: C.subtle, fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ color: C.match }}>+{fc(g.inSum)}</span> / <span style={{ color: C.bad }}>−{fc(g.outSum)}</span> · {t('cash:netLabel', { defaultValue: 'Net' })} {fc(g.inSum - g.outSum)}
                </span>
              </div>
              {g.items.map((m: any) => {
                const isIn = m.type === 'in';
                return (
                  <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '10px 2px', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                        <span style={{ color: isIn ? C.match : C.bad }}>{isIn ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' })}</span>
                        {m.reason ? <span style={{ color: C.subtle, fontWeight: 500 }}> · {m.reason}</span> : null}
                      </div>
                      <div style={{ fontSize: 12, color: C.subtle }}>{tLabel(m.created_at || m.createdAt)}{m.created_by_name ? ` · ${m.created_by_name}` : ''}</div>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: isIn ? C.match : C.bad, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{isIn ? '+' : '−'} {fc(m.amount)}</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button type="button" title={t('common:button.edit', { defaultValue: 'Edit' })} onClick={() => setEdit({ ...m, amount: String(m.amount) })}
                        style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: '#fff', color: C.subtle, cursor: 'pointer', fontSize: 13 }}>✎</button>
                      <button type="button" title={t('common:button.delete', { defaultValue: 'Delete' })} onClick={() => setDelTarget(m)}
                        style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: '#fff', color: C.bad, cursor: 'pointer', fontSize: 15 }}>×</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 수정 모달 */}
      {edit && (
        <Modal isOpen onClose={() => setEdit(null)} title={t('cash:editMovement', { defaultValue: 'Edit cash movement' })} size="small"
          footer={<>
            <ModalButton onClick={() => setEdit(null)}>{t('cash:cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" disabled={busy} onClick={saveEdit}>{busy ? '…' : t('cash:save', { defaultValue: 'Save' })}</ModalButton>
          </>}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button type="button" onClick={() => setEdit({ ...edit, type: 'in' })}
              style={{ flex: 1, height: 44, borderRadius: 8, border: `1px solid ${edit.type === 'in' ? C.match : C.border}`, background: edit.type === 'in' ? '#ECFDF5' : '#fff', color: edit.type === 'in' ? C.match : C.text, fontWeight: 600, cursor: 'pointer' }}>{t('cash:paidIn', { defaultValue: 'Cash in' })}</button>
            <button type="button" onClick={() => setEdit({ ...edit, type: 'out' })}
              style={{ flex: 1, height: 44, borderRadius: 8, border: `1px solid ${edit.type === 'out' ? C.bad : C.border}`, background: edit.type === 'out' ? '#FFF1F1' : '#fff', color: edit.type === 'out' ? C.bad : C.text, fontWeight: 600, cursor: 'pointer' }}>{t('cash:paidOut', { defaultValue: 'Cash out' })}</button>
          </div>
          <FormInput type="number" value={edit.amount} onChange={e => setEdit({ ...edit, amount: e.target.value })} placeholder="0.00" />
          <FormInput value={edit.reason || ''} onChange={e => setEdit({ ...edit, reason: e.target.value })} placeholder={t('cash:movementReason', { defaultValue: 'Reason (optional)' })} style={{ marginTop: 10 }} />
        </Modal>
      )}
      {/* 삭제 확인 */}
      {delTarget && (
        <Modal isOpen onClose={() => setDelTarget(null)} title={t('cash:deleteMovement', { defaultValue: 'Delete cash movement' })} size="small"
          footer={<>
            <ModalButton onClick={() => setDelTarget(null)}>{t('cash:cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="danger" disabled={busy} onClick={doDelete}>{busy ? '…' : t('common:button.delete', { defaultValue: 'Delete' })}</ModalButton>
          </>}>
          <p style={{ fontSize: 14, color: C.text, margin: 0 }}>
            {t('cash:deleteConfirm', { defaultValue: 'Delete this {{type}} of {{amount}}?', type: delTarget.type === 'in' ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' }), amount: fc(delTarget.amount) })}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default CashLedger;
