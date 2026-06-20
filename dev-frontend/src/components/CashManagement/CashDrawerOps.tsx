import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { FormInput } from '../UI';
import { openCashDrawer } from '../../utils/billPrint'; // 🔒 billPrint 미수정 — 드로어킥 export만 호출
import { C, num, round2, Card, Label, Hint, Amount, Ledger, Primary, Pad } from './cashUi';

// 오늘의 캐시드로워 (운영) — 개시현금 · 캐시인/아웃(키패드 좌 + 이유·버튼 우, 버튼이 곧 저장) · 현재시재 · 드로어.
// 라이브오더/플로어플랜 모달에서 사용. 회계 내역/정정은 좌측 '시재관리'.

type Step = 'loading' | 'start' | 'running';
interface Props { restaurantId?: string; onChange?: () => void; compact?: boolean; }

const CashDrawerOps: React.FC<Props> = ({ restaurantId, onChange, compact }) => {
  const { t } = useTranslation();
  const store = useStore();
  const currency = (store?.operationSettings?.currency) || 'MYR';
  const opSettings = store?.operationSettings;

  const [step, setStep] = useState<Step>('loading');
  const [shift, setShift] = useState<any>(null);
  const [suggestedFloat, setSuggestedFloat] = useState(0);
  const [openingFloat, setOpeningFloat] = useState('');
  const [movements, setMovements] = useState<{ paidIn: number; paidOut: number; net: number }>({ paidIn: 0, paidOut: 0, net: 0 });
  const [amt, setAmt] = useState('');          // 키패드 입력 금액
  const [reason, setReason] = useState('');
  const [todayMoves, setTodayMoves] = useState<any[]>([]);   // 오늘 입출금 내역(팝업 하단 리스트)
  const [drawerMsg, setDrawerMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const api = useCallback((path: string, opts?: RequestInit) =>
    fetch(`/api/cash/restaurant/${restaurantId}${path}`, {
      headers: { 'Content-Type': 'application/json' }, credentials: 'include', ...opts
    }).then(r => r.json().then(j => ({ status: r.status, j })).catch(() => ({ status: r.status, j: null }))), [restaurantId]);

  const tzDay = useCallback(() => { try { return new Date().toLocaleDateString('en-CA', { timeZone: (opSettings?.timeZone || 'Asia/Kuala_Lumpur') }); } catch { return new Date().toISOString().slice(0, 10); } }, [opSettings]);
  const loadTodayMoves = useCallback(async () => {
    const d = tzDay();
    const r = await api(`/movements?startDate=${d}&endDate=${d}`);
    setTodayMoves(Array.isArray(r.j?.data) ? r.j.data : []);
  }, [api, tzDay]);

  const load = useCallback(async () => {
    if (!restaurantId) return;
    setStep('loading'); setError('');
    const { j } = await api('/shift/current');
    if (j?.data) {
      setShift(j.data);
      const ex = await api(`/shift/${j.data.id}/expected`);
      setMovements(ex.j?.data?.movements || { paidIn: 0, paidOut: 0, net: 0 });
      setStep('running');
      loadTodayMoves();
    } else { setShift(null); setStep('start'); }
  }, [api, restaurantId, loadTodayMoves]);

  useEffect(() => { load(); }, [load]);

  const startShift = async () => {
    setBusy(true); setError('');
    const body: any = {};
    if (openingFloat) body.opening_float = num(openingFloat);
    const { status, j } = await api('/shift/open', { method: 'POST', body: JSON.stringify(body) });
    setBusy(false);
    if (status === 200) { setOpeningFloat(''); await load(); onChange?.(); }
    else setError(j?.message || t('cash:startFail', { defaultValue: 'Could not start shift' }));
  };

  // 캐시인/아웃 — 버튼이 곧 저장(타입은 누른 버튼). 키패드 금액 + 이유.
  const submit = async (type: 'in' | 'out') => {
    if (!shift) return;
    const amount = num(amt);
    if (!(amount > 0)) { setError(t('cash:movementAmountError', { defaultValue: 'Enter an amount greater than 0' })); return; }
    setBusy(true); setError('');
    const { status, j } = await api(`/shift/${shift.id}/movement`, { method: 'POST', body: JSON.stringify({ type, amount, reason: reason || null }) });
    setBusy(false);
    if (status === 200) { setMovements(j?.movements || movements); setAmt(''); setReason(''); onChange?.(); loadTodayMoves(); }
    else setError(j?.message || t('cash:movementFail', { defaultValue: 'Movement failed' }));
  };

  const handleOpenDrawer = async () => {
    setDrawerMsg('');
    try {
      const ok = await openCashDrawer();
      setDrawerMsg(ok ? t('cash:drawerSent', { defaultValue: 'Drawer pulse sent' }) : t('cash:drawerFail', { defaultValue: 'Could not open drawer (check printer mode)' }));
    } catch { setDrawerMsg(t('cash:drawerFail', { defaultValue: 'Could not open drawer (check printer mode)' })); }
    setTimeout(() => setDrawerMsg(''), 4000);
  };

  const floatPress = (d: string) => setOpeningFloat(p => (d === '.' && p.includes('.')) ? p : (p + d).slice(0, 12));
  const floatBack = () => setOpeningFloat(p => p.slice(0, -1));
  const amtPress = (d: string) => setAmt(p => (d === '.' && p.includes('.')) ? p : (p + d).slice(0, 12));
  const amtBack = () => setAmt(p => p.slice(0, -1));

  const onHand = shift ? round2(Number(shift.opening_float || 0) + Number(movements.net || 0)) : 0;
  const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => compact ? <div>{children}</div> : <Card>{children}</Card>;
  const canSubmit = num(amt) > 0 && !busy;

  return (
    <div>
      {!compact && (
        <p style={{ fontSize: 13, color: C.subtle, margin: '0 0 16px', lineHeight: 1.5 }}>
          {t('cash:cashDrawerSubtitle', { defaultValue: 'Manage the cash drawer: opening float, cash in/out, and cash on hand.' })}
        </p>
      )}

      {error && <div style={{ background: '#FFF1F1', border: `1px solid ${C.bad}`, color: '#B42318', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>{error}</div>}
      {step === 'loading' && <div style={{ textAlign: 'center', color: C.subtle, padding: 40 }}>{t('common:loading', { defaultValue: 'Loading…' })}</div>}

      {step === 'start' && (
        <Box>
          <Label>{t('cash:openingCash', { defaultValue: 'Opening cash in drawer' })}</Label>
          <Amount>{openingFloat ? fc(num(openingFloat)) : fc(suggestedFloat)}</Amount>
          <Hint>{t('cash:openingHint', { defaultValue: 'Count the cash you are starting with. Suggested = last closing balance.' })}</Hint>
          <Pad onPress={floatPress} onBack={floatBack} />
          <Primary disabled={busy} onClick={startShift}>{busy ? '…' : t('cash:startShift', { defaultValue: 'Start shift' })}</Primary>
        </Box>
      )}

      {step === 'running' && shift && (
        <Box>
          {/* 현재 시재 요약 */}
          <div style={{ background: C.bg, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <Ledger label={t('cash:openingCash', { defaultValue: 'Opening cash' })} value={fc(shift.opening_float)} />
            <Ledger label={t('cash:paidIn', { defaultValue: 'Cash in' })} value={`+ ${fc(movements.paidIn)}`} color={C.match} />
            <Ledger label={t('cash:paidOut', { defaultValue: 'Cash out' })} value={`− ${fc(movements.paidOut)}`} color={C.bad} />
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 10 }}>
              <Ledger label={t('cash:cashOnHand', { defaultValue: 'Cash on hand' })} value={fc(onHand)} bold />
            </div>
          </div>

          {/* 캐시인/아웃 — 키패드(좌) + 금액·이유·버튼(우) */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px', minWidth: 220 }}>
              <Pad onPress={amtPress} onBack={amtBack} />
            </div>
            <div style={{ flex: '1 1 240px', minWidth: 220, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: C.text, textAlign: 'center', padding: '8px 0 12px', fontVariantNumeric: 'tabular-nums' }}>{fc(num(amt))}</div>
              <FormInput value={reason} onChange={e => setReason(e.target.value)} placeholder={t('cash:movementReason', { defaultValue: 'Reason (optional)' })} />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button type="button" disabled={!canSubmit} onClick={() => submit('in')}
                  style={{ flex: 1, height: 56, borderRadius: 12, border: 'none', background: canSubmit ? C.match : '#C7CED6', color: '#fff', fontSize: 15, fontWeight: 700, cursor: canSubmit ? 'pointer' : 'not-allowed' }}>{t('cash:paidIn', { defaultValue: 'Cash in' })}</button>
                <button type="button" disabled={!canSubmit} onClick={() => submit('out')}
                  style={{ flex: 1, height: 56, borderRadius: 12, border: 'none', background: canSubmit ? C.bad : '#C7CED6', color: '#fff', fontSize: 15, fontWeight: 700, cursor: canSubmit ? 'pointer' : 'not-allowed' }}>{t('cash:paidOut', { defaultValue: 'Cash out' })}</button>
              </div>
              <button type="button" onClick={handleOpenDrawer}
                style={{ height: 48, marginTop: 10, borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t('cash:openDrawer', { defaultValue: 'Open drawer' })}</button>
              {drawerMsg && <div style={{ fontSize: 12, color: C.subtle, marginTop: 8, textAlign: 'center' }}>{drawerMsg}</div>}
            </div>
          </div>

          {/* 오늘 입출금 내역 (방금 넣은 것 바로 확인) */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 6 }}>{t('cash:todayMovements', { defaultValue: "Today's cash in / out" })}</div>
            {todayMoves.length === 0 ? (
              <div style={{ fontSize: 12.5, color: C.subtle }}>{t('cash:noMovementsToday', { defaultValue: 'None yet today.' })}</div>
            ) : (
              <div style={{ maxHeight: 160, overflowY: 'auto' }}>
                {todayMoves.map((m: any) => {
                  const isIn = m.type === 'in';
                  const tm = (() => { try { return formatDateTime(m.created_at || m.createdAt, opSettings, { year: undefined, month: undefined, day: undefined, hour: '2-digit', minute: '2-digit' } as any); } catch { return ''; } })();
                  return (
                    <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '7px 0', borderTop: `1px solid ${C.border}` }}>
                      <div style={{ minWidth: 0, flex: 1, fontSize: 13, color: C.text }}>
                        <span style={{ color: isIn ? C.match : C.bad, fontWeight: 600 }}>{isIn ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' })}</span>
                        {m.reason ? <span style={{ color: C.subtle }}> · {m.reason}</span> : null}
                        <span style={{ color: C.subtle, fontSize: 11.5 }}>　{tm}</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: isIn ? C.match : C.bad, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{isIn ? '+' : '−'} {fc(m.amount)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 12 }}>
            <div style={{ fontSize: 12, color: C.subtle, lineHeight: 1.5 }}>
              {t('cash:settleInDailyHint', { defaultValue: 'Close the shift in Final Settlement. Full history & corrections: Cash Management (sidebar).' })}
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default CashDrawerOps;
