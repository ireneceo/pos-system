import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';
import { printSettlementReport } from '../../utils/billPrint';

/**
 * 최종 마감 (Final Settlement / Tender Declaration)
 *
 * Daily Settlement = 시스템이 기록한 "예상". 카드기·이월렛은 POS와 금액 연동이 안 되므로,
 * 마감자(매니저)가 실물(카드 단말 배치정산·현금·QR앱)을 확인해 수단별 "실제" 금액을 직접 입력 →
 * 시스템이 예상과 비교 → 차이(과부족) 표시 → 확정(close) → Z-Report. (업계표준 blind tender declaration)
 *
 * 백엔드 엔진 재사용: GET shift/current·expected(블라인드 수단키), POST reconcile(실제→variance)·close.
 * 인쇄는 기존 export printSettlementReport 만 호출(🔒 billPrint 무수정) — content 만 신규.
 * 현재 open 교대(오늘) + 매니저(RA/Owner)일 때만 노출. 그 외엔 null(요약만).
 */

type MethodRow = { key: string; label: string; group: 'cash' | 'card' | 'other' };
type Step = 'idle' | 'counting' | 'reviewed' | 'closed';

const C = {
  primary: '#635BFF', text: '#0A2540', subtle: '#6B7C93', border: '#E6EBF1',
  match: '#10B981', warnAmt: '#F59E0B', bad: '#FF6B6B', bg: '#F7F8FB'
};

const num = (s: string) => Math.round((parseFloat(s) || 0) * 100) / 100;
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

interface Props {
  /** Daily Settlement 에서 선택된 날짜(YYYY-MM-DD). 오늘일 때만 마감 패널을 노출. */
  selectedDate: string;
  today: string;
}

const FinalSettlementPanel: React.FC<Props> = ({ selectedDate, today }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const store = useStore();
  const restaurantId = user?.restaurantId;
  const currency = store?.operationSettings?.currency || 'MYR';
  const isManager = user?.role === 'Restaurant Admin' || user?.role === 'Restaurant Owner';

  const [shift, setShift] = useState<any>(null);
  const [methods, setMethods] = useState<MethodRow[]>([]);
  const [counts, setCounts] = useState<Record<string, string>>({});
  const [movements, setMovements] = useState<{ paidIn: number; paidOut: number; net: number }>({ paidIn: 0, paidOut: 0, net: 0 });
  const [recon, setRecon] = useState<any>(null);
  const [step, setStep] = useState<Step>('idle');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [zreport, setZreport] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const api = useCallback((path: string, opts?: RequestInit) => {
    const token = getAuthToken();
    return fetch(`/api/cash/restaurant/${restaurantId}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      credentials: 'include', ...opts
    }).then(r => r.json().then(j => ({ status: r.status, j })).catch(() => ({ status: r.status, j: null })));
  }, [restaurantId]);

  const buildMethods = (methodKeys: any, registered: any[]): MethodRow[] => {
    const seen = new Set<string>();
    const rows: MethodRow[] = [];
    const push = (key: string, label: string, group: 'cash' | 'card' | 'other') => {
      if (seen.has(key)) return; seen.add(key); rows.push({ key, label, group });
    };
    push('cash', t('cash:method.cash', { defaultValue: 'Cash' }), 'cash');
    (registered || []).forEach((m: any) => {
      if (!m.enabled || m.method_key === 'cash') return;
      push(m.method_key, m.label, m.type === 'card' ? 'card' : 'other');
    });
    (methodKeys?.card || []).forEach((k: string) => push(`card:${k}`, `${t('cash:method.card', { defaultValue: 'Card' })} · ${cap(k)}`, 'card'));
    (methodKeys?.other || []).forEach((k: string) => push(`other:${k}`, cap(k), 'other'));
    return rows;
  };

  const load = useCallback(async () => {
    if (!restaurantId || !isManager) { setLoaded(true); return; }
    setError(''); setRecon(null); setZreport(null); setStep('idle');
    const { j } = await api('/shift/current');
    if (j?.data) {
      setShift(j.data);
      const ex = await api(`/shift/${j.data.id}/expected`);
      setMethods(buildMethods(ex.j?.data?.methodKeys, ex.j?.data?.registeredMethods));
      setMovements(ex.j?.data?.movements || { paidIn: 0, paidOut: 0, net: 0 });
      setCounts({});
    } else {
      setShift(null);
    }
    // 마감 이력 (지난 교대 close 기록)
    const h = await api('/shift/history?limit=10');
    setHistory(Array.isArray(h.j?.data) ? h.j.data : []);
    setLoaded(true);
  }, [api, restaurantId, isManager]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (selectedDate === today) load(); else setLoaded(true); }, [selectedDate, today, load]);

  const reconcile = async () => {
    if (!shift) return;
    setBusy(true); setError('');
    const actual: any = { card: {}, other: {} };
    let cashCounted = 0;
    methods.forEach(m => {
      const v = num(counts[m.key] || '0');
      if (m.group === 'cash') cashCounted = v;
      else if (m.group === 'card') actual.card[m.key.split(':')[1]] = v;
      else actual.other[m.key.split(':')[1]] = v;
    });
    const { status, j } = await api(`/shift/${shift.id}/reconcile`, { method: 'POST', body: JSON.stringify({ cash_counted: cashCounted, actual, notes: note }) });
    setBusy(false);
    if (status === 200) { setRecon(j); setStep('reviewed'); }
    else setError(j?.message || t('cash:reconcileFail', { defaultValue: 'Reconcile failed' }));
  };

  const close = async () => {
    if (!shift) return;
    setBusy(true); setError('');
    const { status, j } = await api(`/shift/${shift.id}/close`, { method: 'POST', body: JSON.stringify({}) });
    setBusy(false);
    if (status === 200) {
      const z = j?.data?.reconciliation?.zreport || null;
      setZreport(z); setStep('closed');
      // 마감 확정 즉시 Z-Report 빌프린트 자동 출력 (Daily Settlement 요약과 별개 — 확정된 최종 마감 문서).
      if (z) doPrintZ(z);
    }
    else setError(j?.message || t('cash:closeFail', { defaultValue: 'Close failed' }));
  };

  const doPrintZ = async (z?: any) => {
    const zz = z || zreport;
    if (!zz) return;
    try { await printSettlementReport(buildZReportHTML(zz, fc, store?.getStoreInfo?.() || {}, t, store?.operationSettings)); } catch { /* 인쇄 실패 비치명 */ }
    if (shift) api(`/shift/${shift.id}/zreport-printed`, { method: 'POST', body: JSON.stringify({}) }).catch(() => {});
  };
  const printZ = () => doPrintZ();

  const reprintZ = async (z: any) => {
    if (!z) return;
    try { await printSettlementReport(buildZReportHTML(z, fc, store?.getStoreInfo?.() || {}, t, store?.operationSettings)); } catch { /* 비치명 */ }
  };

  const opSettings = store?.operationSettings;
  const dtShort = (d: any) => { try { return formatDateTime(d, opSettings, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };

  const renderHistory = () => {
    const closed = (history || []).filter(s => s.status === 'reconciled' || s.status === 'closed');
    if (!closed.length) return null;
    return (
      <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 14, paddingTop: 12 }}>
        <button type="button" onClick={() => setShowHistory(v => !v)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{t('cash:history', { defaultValue: 'Settlement history' })} ({closed.length})</span>
          <span style={{ fontSize: 13, color: C.subtle }}>{showHistory ? '▲' : '▼'}</span>
        </button>
        {showHistory && (
          <div style={{ marginTop: 10 }}>
            {closed.map(s => {
              const r = (s.reconciliations && s.reconciliations[0]) || {};
              const vc = Number(r.variance?.cash || 0);
              const vColor = vc === 0 ? C.match : (Math.abs(vc) < 5 ? C.warnAmt : C.bad);
              const vWord = vc === 0 ? t('cash:matches', { defaultValue: 'Matches' }) : (vc > 0 ? t('cash:over', { defaultValue: '{{a}} over', a: fc(vc) }) : t('cash:short', { defaultValue: '{{a}} short', a: fc(Math.abs(vc)) }));
              return (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '10px 0', borderTop: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{dtShort(s.closed_at || s.opened_at)}</div>
                    <div style={{ fontSize: 12, color: C.subtle }}>{s.cashier_name || '-'} · {t('cash:closingBalance', { defaultValue: 'Closing cash' })} {fc(r.closing_balance || 0)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: vColor }}>{vWord}</span>
                    {r.zreport && <button type="button" onClick={() => reprintZ(r.zreport)} style={{ height: 34, padding: '0 12px', borderRadius: 8, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>{t('cash:reprintZ', { defaultValue: 'Z-Report' })}</button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 매니저 아님 / 오늘 아님 → 미노출
  if (!isManager || selectedDate !== today || !loaded) return null;
  if (!shift) {
    return (
      <Wrap>
        <Title>{t('cash:finalSettlement', { defaultValue: 'Final Settlement' })}</Title>
        <Muted>{t('cash:noOpenShift', { defaultValue: 'No open shift to settle. Start a shift in Cash Drawer first.' })}</Muted>
        {renderHistory()}
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Muted>{t('cash:finalSettlementHint', { defaultValue: 'Check the card terminal batch, cash drawer and e-wallet apps, then enter the ACTUAL amount for each method. The system compares against expected and flags differences.' })}</Muted>

      {error && <ErrBox>{error}</ErrBox>}

      {/* 1) 블라인드 실제 입력 (예상 비공개) */}
      {(step === 'idle' || step === 'counting') && (
        <>
          <div style={{ marginTop: 12 }}>
            {methods.map(m => (
              <Field key={m.key}>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.text }}>{m.label}</span>
                <input
                  inputMode="decimal"
                  value={counts[m.key] || ''}
                  onChange={e => { setStep('counting'); setCounts(prev => ({ ...prev, [m.key]: e.target.value.replace(/[^0-9.]/g, '') })); }}
                  placeholder="0.00"
                  style={inputStyle}
                  aria-label={m.label}
                />
              </Field>
            ))}
          </div>
          {(movements.paidIn > 0 || movements.paidOut > 0) && (
            <Muted style={{ marginTop: 6 }}>{t('cash:netMovement', { defaultValue: 'Net {{a}}', a: fc(movements.net) })} (+{fc(movements.paidIn)} / −{fc(movements.paidOut)})</Muted>
          )}
          <PrimaryBtn disabled={busy} onClick={reconcile}>{busy ? '…' : t('cash:reconcile', { defaultValue: 'Compare with expected' })}</PrimaryBtn>
        </>
      )}

      {/* 2) 차이 공개 */}
      {step === 'reviewed' && recon && (
        <>
          <HeadRow />
          <VarRow label={t('cash:method.cash', { defaultValue: 'Cash' })}
            expected={(recon.expected?.cash || 0) + Number(shift?.opening_float || 0) + Number(recon.movements?.net || 0)}
            counted={recon.data?.cash_counted || 0} diff={recon.variance?.cash || 0} fc={fc} t={t} />
          {Object.keys(recon.expected?.card || {}).map(k => (
            <VarRow key={k} label={`${t('cash:method.card', { defaultValue: 'Card' })} · ${cap(k)}`} expected={recon.expected.card[k]} counted={(recon.data?.actual?.card || {})[k] || 0} diff={recon.variance?.card?.[k] || 0} fc={fc} t={t} />
          ))}
          {Object.keys(recon.expected?.other || {}).map(k => (
            <VarRow key={k} label={cap(k)} expected={recon.expected.other[k]} counted={(recon.data?.actual?.other || {})[k] || 0} diff={recon.variance?.other?.[k] || 0} fc={fc} t={t} />
          ))}
          <div style={{ background: C.bg, borderRadius: 10, padding: '12px 14px', marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: C.subtle, fontSize: 14 }}>{t('cash:closingBalance', { defaultValue: "Closing cash (tomorrow's float)" })}</span>
            <span style={{ fontWeight: 700, color: C.text }}>{fc(recon.closing_balance || 0)}</span>
          </div>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
            placeholder={t('cash:note', { defaultValue: 'Note (optional)' })}
            style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 8, padding: 10, fontSize: 14, marginTop: 10, resize: 'vertical', background: '#fff' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'stretch' }}>
            <GhostBtn onClick={() => setStep('counting')}>{t('cash:back', { defaultValue: 'Back' })}</GhostBtn>
            <PrimaryBtn disabled={busy} onClick={close} style={{ flex: 1, width: 'auto', marginTop: 0 }}>{busy ? '…' : t('cash:confirmClose', { defaultValue: 'Confirm & close shift' })}</PrimaryBtn>
          </div>
        </>
      )}

      {/* 3) 마감 완료 */}
      {step === 'closed' && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.match, marginBottom: 4 }}>{t('cash:closedTitle', { defaultValue: 'Shift closed' })}</div>
          <Muted>{t('cash:zAutoPrinted', { defaultValue: 'Z-Report sent to the bill printer. Closing cash carries over as tomorrow\'s opening float.' })}</Muted>
          <PrimaryBtn onClick={printZ} style={{ marginTop: 10 }}>{t('cash:reprintZ2', { defaultValue: 'Reprint Z-Report' })}</PrimaryBtn>
        </div>
      )}

      {renderHistory()}
    </Wrap>
  );
};

// ── presentational (inline — cross-chunk styled TDZ 회피) ──
const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{children}</div>
);
const Muted: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontSize: 12.5, color: C.subtle, lineHeight: 1.5, ...style }}>{children}</div>
);
const ErrBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: '#FFF1F1', border: `1px solid ${C.bad}`, color: '#B42318', borderRadius: 8, padding: '8px 12px', margin: '10px 0', fontSize: 13 }}>{children}</div>
);
const Field: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${C.border}` }}>{children}</div>
);
const inputStyle: React.CSSProperties = { width: 120, maxWidth: '40%', textAlign: 'right', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', fontSize: 15, fontWeight: 600, color: C.text, background: '#fff' };
const PrimaryBtn: React.FC<{ children: React.ReactNode; disabled?: boolean; onClick: () => void; style?: React.CSSProperties }> = ({ children, disabled, onClick, style }) => (
  <button type="button" disabled={disabled} onClick={onClick}
    style={{ height: 48, marginTop: 12, padding: '0 18px', borderRadius: 10, border: 'none', width: '100%', background: disabled ? '#C7CED6' : C.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>{children}</button>
);
const GhostBtn: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button type="button" onClick={onClick} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color: C.subtle, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{children}</button>
);
const HeadRow: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', fontSize: 11, color: C.subtle, textTransform: 'uppercase', letterSpacing: '0.3px', padding: '8px 4px 6px', marginTop: 8 }}>
      <span /><span style={{ textAlign: 'right' }}>{t('cash:colExpected', { defaultValue: 'Expected' })}</span><span style={{ textAlign: 'right' }}>{t('cash:colActual', { defaultValue: 'Actual' })}</span><span style={{ textAlign: 'right' }}>{t('cash:colDiff', { defaultValue: 'Diff' })}</span>
    </div>
  );
};
const VarRow: React.FC<{ label: string; expected: number; counted: number; diff: number; fc: (n: number) => string; t: any }> = ({ label, expected, counted, diff, fc, t }) => {
  const d = Math.round(Number(diff) * 100) / 100;
  const color = d === 0 ? C.match : (Math.abs(d) < 5 ? C.warnAmt : C.bad);
  const word = d === 0 ? t('cash:matches', { defaultValue: 'Matches' }) : (d > 0 ? t('cash:over', { defaultValue: '{{a}} over', a: fc(d) }) : t('cash:short', { defaultValue: '{{a}} short', a: fc(Math.abs(d)) }));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', alignItems: 'center', padding: '10px 4px', borderTop: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{label}</span>
      <span style={{ textAlign: 'right', fontSize: 14, color: C.subtle }}>{fc(Number(expected) || 0)}</span>
      <span style={{ textAlign: 'right', fontSize: 14, color: C.text }}>{fc(Number(counted) || 0)}</span>
      <span style={{ textAlign: 'right', fontSize: 13, fontWeight: 600, color }}>{word}</span>
    </div>
  );
};

// Z-Report 인쇄 HTML (80mm). printSettlementReport(기존 export)로 출력 — 🔒 billPrint 무수정.
function buildZReportHTML(z: any, fc: (n: number) => string, store: any, t: any, opSettings?: any): string {
  const esc = (s: any) => String(s == null ? '' : s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' } as any)[c]);
  const row = (l: string, v: string, bold = false) =>
    `<div style="display:flex;justify-content:space-between;${bold ? 'font-weight:700;' : ''}padding:1px 0"><span>${esc(l)}</span><span>${esc(v)}</span></div>`;
  const exp = z.expected || { cash: 0, card: {}, other: {} };
  const act = (z.actual || { cash: 0, card: {}, other: {} });
  const vr = (z.variance || { cash: 0, card: {}, other: {} });
  const lines: string[] = [];
  const vWord = (d: number) => d === 0 ? t('cash:matches', { defaultValue: 'Matches' }) : (d > 0 ? `+${fc(d)}` : `-${fc(Math.abs(d))}`);
  lines.push(row(`${t('cash:method.cash', { defaultValue: 'Cash' })}`, `${fc(act.cash || 0)} / ${vWord(Number(vr.cash || 0))}`));
  Object.keys(exp.card || {}).forEach(k => lines.push(row(`${t('cash:method.card', { defaultValue: 'Card' })} · ${k}`, `${fc((act.card || {})[k] || 0)} / ${vWord(Number((vr.card || {})[k] || 0))}`)));
  Object.keys(exp.other || {}).forEach(k => lines.push(row(k, `${fc((act.other || {})[k] || 0)} / ${vWord(Number((vr.other || {})[k] || 0))}`)));
  const mv = z.movements || { paidIn: 0, paidOut: 0 };
  const dt = (d: any) => { try { return formatDateTime(d, opSettings, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    @page { size: 80mm auto; margin: 0; }
    body { width: 76mm; margin: 0 auto; font-family: 'Courier New', monospace; font-size: 12px; color: #000; padding: 6px 4px; }
    h2 { text-align:center; font-size: 15px; margin: 4px 0; }
    .sub { text-align:center; font-size: 11px; margin-bottom: 6px; }
    hr { border: none; border-top: 1px dashed #000; margin: 6px 0; }
  </style></head><body>
    <h2>${esc(store?.name || store?.restaurantName || 'Z-REPORT')}</h2>
    <div class="sub">${t('cash:zreportTitle', { defaultValue: 'Shift Close — Z-Report' })}</div>
    ${row(t('cash:cashier', { defaultValue: 'Cashier' }), esc(z.cashier_name || '-'))}
    ${row(t('cash:opened', { defaultValue: 'Opened' }), dt(z.opened_at))}
    ${row(t('cash:closed', { defaultValue: 'Closed' }), dt(z.closed_at))}
    <hr/>
    <div style="font-weight:700">${t('cash:byMethodActualVar', { defaultValue: 'By method — actual / variance' })}</div>
    ${lines.join('')}
    ${row(t('cash:totalSales', { defaultValue: 'Total sales' }), fc(z.total_sales || 0), true)}
    <hr/>
    ${row(t('cash:openingCash', { defaultValue: 'Opening cash' }), fc(z.opening_float || 0))}
    ${row(t('cash:paidIn', { defaultValue: 'Cash in' }), fc(mv.paidIn || 0))}
    ${row(t('cash:paidOut', { defaultValue: 'Cash out' }), fc(mv.paidOut || 0))}
    ${row(t('cash:closingBalance', { defaultValue: 'Closing cash' }), fc(z.closing_balance || 0), true)}
    <hr/>
    <div class="sub">${dt(z.generated_at)}</div>
  </body></html>`;
}

export default FinalSettlementPanel;
