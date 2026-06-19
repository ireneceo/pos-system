import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';

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

  const api = useCallback((path: string, opts?: RequestInit) =>
    fetch(`/api/cash/restaurant/${restaurantId}${path}`, {
      headers: { 'Content-Type': 'application/json' }, credentials: 'include', ...opts
    }).then(r => r.json().then(j => ({ status: r.status, j }))), [restaurantId]);

  const buildMethods = (expected: any): MethodRow[] => {
    const rows: MethodRow[] = [{ key: 'cash', label: t('cash:method.cash', { defaultValue: 'Cash' }), group: 'cash' }];
    Object.keys(expected?.card || {}).forEach(k => rows.push({ key: `card:${k}`, label: `${t('cash:method.card', { defaultValue: 'Card' })} · ${k.charAt(0).toUpperCase() + k.slice(1)}`, group: 'card' }));
    Object.keys(expected?.other || {}).forEach(k => rows.push({ key: `other:${k}`, label: k.charAt(0).toUpperCase() + k.slice(1), group: 'other' }));
    return rows;
  };

  const load = useCallback(async () => {
    setStep('loading'); setError('');
    const { j } = await api('/shift/current');
    if (j?.data) {
      setShift(j.data);
      const ex = await api(`/shift/${j.data.id}/expected`);
      // BLIND COUNT: we use expected only to know which methods exist — values stay hidden until review.
      setMethods(buildMethods(ex.j?.data?.expected));
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
    if (status === 200) setStep('done'); else setError(j?.message || 'Close failed');
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
          <Primary onClick={() => window.print()}>{t('cash:print', { defaultValue: 'Print Z-Report' })}</Primary>
          <Secondary onClick={load}>{t('cash:done', { defaultValue: 'Done' })}</Secondary>
        </Card>
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

export default CashUpPage;
