import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { Modal, FormInput, ModalButton } from '../../components/UI/Modal';
// Phase 2 — 기존 billPrint export 만 호출(인쇄 방식/라우팅 무변경). 🔒 billPrint 미수정.
import { openCashDrawer, printSettlementReport } from '../../utils/billPrint';

// Cash-up (교대 마감) — global POS standard: blind count → variance reveal → close.
// 4-step wizard, touch number pad (no keyboard). docs/CASH_MANAGEMENT_SHIFT_CLOSE.md §8.

type Step = 'loading' | 'start' | 'count' | 'review' | 'done';
type MethodRow = { key: string; label: string; group: 'cash' | 'card' | 'other' };

const C = {
  primary: '#635BFF', text: '#0A2540', subtle: '#6B7C93', border: '#E6EBF1',
  match: '#10B981', warnAmt: '#F59E0B', bad: '#FF6B6B', bg: '#F7F8FB'
};

const num = (s: string) => Math.round((parseFloat(s) || 0) * 100) / 100;

const CashUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const store = useStore();
  const currency = (store?.operationSettings?.currency) || 'MYR';

  const [step, setStep] = useState<Step>('loading');
  const [shift, setShift] = useState<any>(null);
  const [suggestedFloat, setSuggestedFloat] = useState(0);
  const [openingFloat, setOpeningFloat] = useState('');
  const [methods, setMethods] = useState<MethodRow[]>([]);
  const [counts, setCounts] = useState<Record<string, string>>({});   // key → amount string
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [recon, setRecon] = useState<any>(null);                       // {expected, variance, closing_balance, status}
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // Phase 2 — 인출/입금, Z-Report, 사전등록 수단
  const [movements, setMovements] = useState<{ paidIn: number; paidOut: number; net: number }>({ paidIn: 0, paidOut: 0, net: 0 });
  const [registeredMethods, setRegisteredMethods] = useState<any[]>([]);
  const [mvForm, setMvForm] = useState<{ type: 'in' | 'out'; amount: string; reason: string } | null>(null);
  const [zreport, setZreport] = useState<any>(null);
  const [drawerMsg, setDrawerMsg] = useState('');

  const api = useCallback((path: string, opts?: RequestInit) =>
    fetch(`/api/cash/restaurant/${restaurantId}${path}`, {
      headers: { 'Content-Type': 'application/json' }, credentials: 'include', ...opts
    }).then(r => r.json().then(j => ({ status: r.status, j }))), [restaurantId]);

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  // 동적 발견 수단키(금액 없음 — 블라인드) + 사전등록 수단 병합 (중복 키 제거, 사전등록 먼저).
  // methodKeys = { card:[...keys], other:[...keys] } — 백엔드가 금액 없이 키만 보낸다(손실방지).
  const buildMethods = (methodKeys: any, registered: any[]): MethodRow[] => {
    const seen = new Set<string>();
    const rows: MethodRow[] = [];
    const push = (key: string, label: string, group: 'cash' | 'card' | 'other') => {
      if (seen.has(key)) return; seen.add(key); rows.push({ key, label, group });
    };
    push('cash', t('cash:method.cash', { defaultValue: 'Cash' }), 'cash');
    (registered || []).forEach(m => {
      if (!m.enabled || m.method_key === 'cash') return;
      const group: 'card' | 'other' = m.type === 'card' ? 'card' : 'other';
      push(m.method_key, m.label, group);
    });
    (methodKeys?.card || []).forEach((k: string) => push(`card:${k}`, `${t('cash:method.card', { defaultValue: 'Card' })} · ${cap(k)}`, 'card'));
    (methodKeys?.other || []).forEach((k: string) => push(`other:${k}`, cap(k), 'other'));
    return rows;
  };

  const load = useCallback(async () => {
    setStep('loading'); setError(''); setZreport(null);
    const { j } = await api('/shift/current');
    if (j?.data) {
      setShift(j.data);
      const ex = await api(`/shift/${j.data.id}/expected`);
      // BLIND COUNT: backend sends only method KEYS (no amounts) — true blind count (P1).
      setMethods(buildMethods(ex.j?.data?.methodKeys, ex.j?.data?.registeredMethods));
      setMovements(ex.j?.data?.movements || { paidIn: 0, paidOut: 0, net: 0 });
      setRegisteredMethods(ex.j?.data?.registeredMethods || []);
      setCounts({});
      setStep('count');
    } else {
      // suggest opening float = last closing balance (fetched on open response too)
      setStep('start');
    }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const startShift = async () => {
    setBusy(true); setError('');
    const body: any = {};
    if (openingFloat) body.opening_float = num(openingFloat);
    const { status, j } = await api('/shift/open', { method: 'POST', body: JSON.stringify(body) });
    setBusy(false);
    if (status === 200) { await load(); } else { setError(j?.message || 'Could not start shift'); }
  };

  const review = async () => {
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
    if (status === 200) { setRecon(j); setStep('review'); } else { setError(j?.message || 'Reconcile failed'); }
  };

  const closeShift = async () => {
    setBusy(true); setError('');
    const { status, j } = await api(`/shift/${shift.id}/close`, { method: 'POST', body: JSON.stringify({}) });
    setBusy(false);
    if (status === 200) { setZreport(j?.data?.reconciliation?.zreport || null); setStep('done'); }
    else setError(j?.message || 'Close failed');
  };

  // 인출/입금 (paid in/out) — open 교대 중
  const submitMovement = async () => {
    if (!mvForm || !shift) return;
    const amount = num(mvForm.amount);
    if (!(amount > 0)) { setError(t('cash:movementAmountError', { defaultValue: 'Enter an amount greater than 0' })); return; }
    setBusy(true); setError('');
    const { status, j } = await api(`/shift/${shift.id}/movement`, {
      method: 'POST', body: JSON.stringify({ type: mvForm.type, amount, reason: mvForm.reason || null })
    });
    setBusy(false);
    if (status === 200) { setMovements(j?.movements || movements); setMvForm(null); }
    else setError(j?.message || 'Movement failed');
  };

  // 캐시드로어 수동오픈 — 기존 billPrint export(ESC/POS 펄스). 🔒 방식 무변경. 실프린터에서만 실제 개방.
  const handleOpenDrawer = async () => {
    setDrawerMsg('');
    try {
      const ok = await openCashDrawer();
      setDrawerMsg(ok ? t('cash:drawerSent', { defaultValue: 'Drawer pulse sent' }) : t('cash:drawerFail', { defaultValue: 'Could not open drawer (check printer mode)' }));
    } catch { setDrawerMsg(t('cash:drawerFail', { defaultValue: 'Could not open drawer (check printer mode)' })); }
    setTimeout(() => setDrawerMsg(''), 4000);
  };

  // Z-Report 인쇄 — 기존 billPrint export(printSettlementReport). 🔒 방식/라우팅 무변경.
  const printZReport = async () => {
    if (!zreport) return;
    const html = buildZReportHTML(zreport, fc, store?.getStoreInfo?.() || {}, t, store?.operationSettings);
    try { await printSettlementReport(html); } catch (e) { /* 인쇄 실패는 비치명 */ }
    api(`/shift/${shift.id}/zreport-printed`, { method: 'POST', body: JSON.stringify({}) }).catch(() => {});
  };

  const fc = (n: number) => formatCurrency(n, currency);

  // ── number pad on the active amount field ──
  const padPress = (d: string) => {
    if (!activeKey) return;
    setCounts(prev => {
      const cur = prev[activeKey] || '';
      if (d === '.' && cur.includes('.')) return prev;
      return { ...prev, [activeKey]: (cur + d).slice(0, 12) };
    });
  };
  const padBack = () => { if (activeKey) setCounts(prev => ({ ...prev, [activeKey]: (prev[activeKey] || '').slice(0, -1) })); };

  // start-step float pad
  const floatPress = (d: string) => setOpeningFloat(p => (d === '.' && p.includes('.')) ? p : (p + d).slice(0, 12));
  const floatBack = () => setOpeningFloat(p => p.slice(0, -1));

  const Pad: React.FC<{ onPress: (d: string) => void; onBack: () => void }> = ({ onPress, onBack }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 320, margin: '0 auto' }}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(d => (
        <button key={d} type="button" onClick={() => onPress(d)} style={padBtn}>{d}</button>
      ))}
      <button type="button" onClick={onBack} style={{ ...padBtn, color: C.subtle, fontSize: 22 }} aria-label={t('cash:delete', { defaultValue: 'Delete' })}>←</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 4 }}>{t('cash:title', { defaultValue: 'Cash drawer & close' })}</h1>
      {step !== 'loading' && step !== 'done' && (
        <div style={{ fontSize: 13, color: C.subtle, marginBottom: 16 }}>
          {t('cash:stepOf', { defaultValue: 'Step {{n}} of 3', n: step === 'start' ? 1 : step === 'count' ? 2 : 3 })}
        </div>
      )}

      {error && <div style={{ background: '#FFF1F1', border: `1px solid ${C.bad}`, color: '#B42318', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>{error}</div>}

      {step === 'loading' && <div style={{ textAlign: 'center', color: C.subtle, padding: 40 }}>{t('common:loading', { defaultValue: 'Loading…' })}</div>}

      {/* STEP 1 — start shift */}
      {step === 'start' && (
        <Card>
          <Label>{t('cash:openingCash', { defaultValue: 'Opening cash in drawer' })}</Label>
          <Amount onClick={() => { }} active>{openingFloat ? fc(num(openingFloat)) : fc(suggestedFloat)}</Amount>
          <Hint>{t('cash:openingHint', { defaultValue: 'Count the cash you are starting with. Suggested = last closing balance.' })}</Hint>
          <Pad onPress={floatPress} onBack={floatBack} />
          <Primary disabled={busy} onClick={startShift}>{busy ? '…' : t('cash:startShift', { defaultValue: 'Start shift' })}</Primary>
        </Card>
      )}

      {/* STEP 2 — blind count */}
      {step === 'count' && (
        <Card>
          <Label>{t('cash:countTitle', { defaultValue: 'Count what is in the drawer' })}</Label>
          <Hint>{t('cash:countHint', { defaultValue: 'Enter the actual amount for each method. The expected totals are revealed after you review.' })}</Hint>
          <div style={{ marginBottom: 14 }}>
            {methods.map(m => (
              <button key={m.key} type="button" onClick={() => setActiveKey(m.key)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', marginBottom: 8, borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                  border: `1px solid ${activeKey === m.key ? C.primary : C.border}`, background: activeKey === m.key ? '#F0F2FF' : '#fff' }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{m.label}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: counts[m.key] ? C.text : C.subtle }}>{counts[m.key] ? fc(num(counts[m.key])) : fc(0)}</span>
              </button>
            ))}
          </div>
          {activeKey && <Pad onPress={padPress} onBack={padBack} />}

          {/* 인출/입금 (paid in/out) + 캐시드로어 수동오픈 */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t('cash:cashMovements', { defaultValue: 'Cash in / out' })}</span>
              {(movements.paidIn > 0 || movements.paidOut > 0) && (
                <span style={{ fontSize: 13, color: C.subtle }}>
                  {t('cash:netMovement', { defaultValue: 'Net {{a}}', a: fc(movements.net) })}
                  <span style={{ marginLeft: 8, fontSize: 12 }}>(+{fc(movements.paidIn)} / −{fc(movements.paidOut)})</span>
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip onClick={() => setMvForm({ type: 'in', amount: '', reason: '' })}>{t('cash:paidIn', { defaultValue: 'Cash in' })}</Chip>
              <Chip onClick={() => setMvForm({ type: 'out', amount: '', reason: '' })}>{t('cash:paidOut', { defaultValue: 'Cash out' })}</Chip>
              <Chip onClick={handleOpenDrawer}>{t('cash:openDrawer', { defaultValue: 'Open drawer' })}</Chip>
            </div>
            {drawerMsg && <div style={{ fontSize: 12, color: C.subtle, marginTop: 8 }}>{drawerMsg}</div>}
          </div>

          <Primary disabled={busy} onClick={review}>{busy ? '…' : t('cash:review', { defaultValue: 'Review' })}</Primary>
        </Card>
      )}

      {/* STEP 3 — variance reveal */}
      {step === 'review' && recon && (
        <Card>
          <Label>{t('cash:varianceTitle', { defaultValue: 'Expected vs counted' })}</Label>
          <div style={{ marginBottom: 8 }}>
            <Row head /><RowVar label={t('cash:method.cash', { defaultValue: 'Cash' })}
              expected={(recon.expected?.cash || 0) + Number(shift?.opening_float || 0)} counted={recon.data?.cash_counted || 0} diff={recon.variance?.cash || 0} fc={fc} t={t} />
            {Object.keys(recon.expected?.card || {}).map(k => (
              <RowVar key={k} label={`${t('cash:method.card', { defaultValue: 'Card' })} · ${k}`} expected={recon.expected.card[k]} counted={(recon.data?.actual?.card || {})[k] || 0} diff={recon.variance?.card?.[k] || 0} fc={fc} t={t} />
            ))}
            {Object.keys(recon.expected?.other || {}).map(k => (
              <RowVar key={k} label={k} expected={recon.expected.other[k]} counted={(recon.data?.actual?.other || {})[k] || 0} diff={recon.variance?.other?.[k] || 0} fc={fc} t={t} />
            ))}
          </div>
          <div style={{ background: C.bg, borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
              <span style={{ color: C.subtle }}>{t('cash:closingBalance', { defaultValue: "Closing cash (tomorrow's float)" })}</span>
              <span style={{ fontWeight: 700, color: C.text }}>{fc(recon.closing_balance || 0)}</span>
            </div>
          </div>
          <Label>{t('cash:note', { defaultValue: 'Note (optional)' })}</Label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
            style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, fontSize: 14, marginBottom: 14, resize: 'vertical', background: '#fff' }} />
          <Primary disabled={busy} onClick={closeShift}>{busy ? '…' : t('cash:confirmClose', { defaultValue: 'Confirm & close shift' })}</Primary>
          <Secondary onClick={() => setStep('count')}>{t('cash:back', { defaultValue: 'Back to count' })}</Secondary>
        </Card>
      )}

      {/* STEP 4 — done / Z-report */}
      {step === 'done' && (
        <Card>
          <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: C.text, marginBottom: 6 }}>{t('cash:closedTitle', { defaultValue: 'Shift closed' })}</div>
            <div style={{ fontSize: 14, color: C.subtle }}>{t('cash:closedHint', { defaultValue: 'The closing cash carries over as tomorrow\'s opening float.' })}</div>
          </div>
          <Primary onClick={printZReport}>{t('cash:print', { defaultValue: 'Print Z-Report' })}</Primary>
          <Secondary onClick={handleOpenDrawer}>{t('cash:openDrawer', { defaultValue: 'Open drawer' })}</Secondary>
          {drawerMsg && <div style={{ fontSize: 12, color: C.subtle, marginTop: 8, textAlign: 'center' }}>{drawerMsg}</div>}
          <Secondary onClick={load}>{t('cash:done', { defaultValue: 'Done' })}</Secondary>
        </Card>
      )}

      {/* 인출/입금 입력 — 표준 Modal (터치 숫자패드 유지) */}
      {mvForm && (
        <Modal
          isOpen={true}
          onClose={() => setMvForm(null)}
          title={mvForm.type === 'in' ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' })}
          size="small"
          footer={
            <>
              <ModalButton onClick={() => setMvForm(null)}>{t('cash:cancel', { defaultValue: 'Cancel' })}</ModalButton>
              <ModalButton variant="primary" disabled={busy} onClick={submitMovement}>{busy ? '…' : t('cash:save', { defaultValue: 'Save' })}</ModalButton>
            </>
          }
        >
          <div style={{ fontSize: 30, fontWeight: 700, color: C.text, textAlign: 'center', padding: '4px 0 12px' }}>{fc(num(mvForm.amount))}</div>
          <Pad onPress={(d) => setMvForm(f => f && ({ ...f, amount: (d === '.' && f.amount.includes('.')) ? f.amount : (f.amount + d).slice(0, 12) }))}
            onBack={() => setMvForm(f => f && ({ ...f, amount: f.amount.slice(0, -1) }))} />
          <FormInput value={mvForm.reason} onChange={e => setMvForm(f => f && ({ ...f, reason: e.target.value }))}
            placeholder={t('cash:movementReason', { defaultValue: 'Reason (optional)' })}
            style={{ marginTop: 12 }} />
        </Modal>
      )}
    </div>
  );
};

// ── small presentational helpers ──
const padBtn: React.CSSProperties = { height: 60, borderRadius: 12, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 22, fontWeight: 600, cursor: 'pointer' };
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>{children}</div>
);
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>{children}</div>
);
const Hint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ fontSize: 13, color: C.subtle, lineHeight: 1.5, margin: '0 0 16px' }}>{children}</p>
);
const Amount: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({ children }) => (
  <div style={{ fontSize: 32, fontWeight: 700, color: C.text, textAlign: 'center', padding: '12px 0 16px' }}>{children}</div>
);
const Primary: React.FC<{ children: React.ReactNode; disabled?: boolean; onClick: () => void }> = ({ children, disabled, onClick }) => (
  <button type="button" disabled={disabled} onClick={onClick}
    style={{ width: '100%', height: 56, marginTop: 14, borderRadius: 12, border: 'none', background: disabled ? '#C7CED6' : C.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' }}>{children}</button>
);
const Secondary: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button type="button" onClick={onClick}
    style={{ width: '100%', height: 48, marginTop: 8, borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color: C.subtle, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{children}</button>
);
const Chip: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button type="button" onClick={onClick}
    style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{children}</button>
);
const Row: React.FC<{ head?: boolean }> = ({ head }) => head ? (
  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', fontSize: 11, color: C.subtle, textTransform: 'uppercase', letterSpacing: '0.3px', padding: '0 4px 6px' }}>
    <span /><span style={{ textAlign: 'right' }}>Expected</span><span style={{ textAlign: 'right' }}>Counted</span><span style={{ textAlign: 'right' }}>Diff</span>
  </div>
) : null;
const RowVar: React.FC<{ label: string; expected: number; counted: number; diff: number; fc: (n: number) => string; t: any }> = ({ label, expected, counted, diff, fc, t }) => {
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

// Z-Report 인쇄 HTML (80mm 영수증 스타일). printSettlementReport 가 QZ/RawBT/브라우저로 출력.
function buildZReportHTML(z: any, fc: (n: number) => string, store: any, t: any, opSettings?: any): string {
  const esc = (s: any) => String(s == null ? '' : s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' } as any)[c]);
  const row = (l: string, v: string, bold = false) =>
    `<div style="display:flex;justify-content:space-between;${bold ? 'font-weight:700;' : ''}padding:1px 0"><span>${esc(l)}</span><span>${esc(v)}</span></div>`;
  const exp = z.expected || { cash: 0, card: {}, other: {} };
  const lines: string[] = [];
  lines.push(row(t('cash:method.cash', { defaultValue: 'Cash' }), fc(exp.cash || 0)));
  Object.keys(exp.card || {}).forEach(k => lines.push(row(`${t('cash:method.card', { defaultValue: 'Card' })} · ${k}`, fc(exp.card[k]))));
  Object.keys(exp.other || {}).forEach(k => lines.push(row(k, fc(exp.other[k]))));
  const mv = z.movements || { paidIn: 0, paidOut: 0 };
  const vc = Number(z.variance?.cash || 0);
  const varWord = vc === 0 ? t('cash:matches', { defaultValue: 'Matches' }) : (vc > 0 ? t('cash:over', { defaultValue: '{{a}} over', a: fc(vc) }) : t('cash:short', { defaultValue: '{{a}} short', a: fc(Math.abs(vc)) }));
  // 매장 타임존 기준 표시 (브라우저 로컬 금지 — formatDateTime 2번째 인자=operationSettings)
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
    ${row(t('cash:sales', { defaultValue: 'Sales by method' }), '')}
    ${lines.join('')}
    ${row(t('cash:totalSales', { defaultValue: 'Total sales' }), fc(z.total_sales || 0), true)}
    ${row(t('cash:paymentCount', { defaultValue: 'Payments' }), String(z.payment_count || 0))}
    <hr/>
    ${row(t('cash:openingCash', { defaultValue: 'Opening cash' }), fc(z.opening_float || 0))}
    ${row(t('cash:paidIn', { defaultValue: 'Cash in' }), fc(mv.paidIn || 0))}
    ${row(t('cash:paidOut', { defaultValue: 'Cash out' }), fc(mv.paidOut || 0))}
    ${row(t('cash:cashVariance', { defaultValue: 'Cash variance' }), varWord)}
    ${row(t('cash:closingBalance', { defaultValue: "Closing cash" }), fc(z.closing_balance || 0), true)}
    <hr/>
    <div class="sub">${dt(z.generated_at)}</div>
  </body></html>`;
}

export default CashUpPage;
