import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { Modal, FormInput, ModalButton } from '../../components/UI/Modal';
// 🔒 billPrint 미수정 — 기존 export(드로어킥)만 호출.
import { openCashDrawer } from '../../utils/billPrint';

// 시재관리 (Cash Management / 현금 드로어 책임관리) — 현금 전용. POS 카운터 권한 스탭 사용.
// 목적 = 현금 책임 추적(개시·입출금·현재시재·이월). "넣다/뺐다"가 아니라 현금 회계.
// 전수단 최종 마감(예상 vs 실제 대조·close·Z-Report)은 Daily Settlement(플로어/라이브)의 "최종 마감".
// docs/CASH_MANAGEMENT_SHIFT_CLOSE.md §0 v2.

type Step = 'loading' | 'start' | 'running';

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
  const opSettings = store?.operationSettings;

  const [step, setStep] = useState<Step>('loading');
  const [shift, setShift] = useState<any>(null);
  const [suggestedFloat, setSuggestedFloat] = useState(0);
  const [openingFloat, setOpeningFloat] = useState('');
  const [movements, setMovements] = useState<{ paidIn: number; paidOut: number; net: number }>({ paidIn: 0, paidOut: 0, net: 0 });
  const [mvForm, setMvForm] = useState<{ type: 'in' | 'out'; amount: string; reason: string } | null>(null);
  const [drawerMsg, setDrawerMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const api = useCallback((path: string, opts?: RequestInit) =>
    fetch(`/api/cash/restaurant/${restaurantId}${path}`, {
      headers: { 'Content-Type': 'application/json' }, credentials: 'include', ...opts
    }).then(r => r.json().then(j => ({ status: r.status, j })).catch(() => ({ status: r.status, j: null }))), [restaurantId]);

  const load = useCallback(async () => {
    setStep('loading'); setError('');
    const { j } = await api('/shift/current');
    if (j?.data) {
      setShift(j.data);
      const ex = await api(`/shift/${j.data.id}/expected`);
      setMovements(ex.j?.data?.movements || { paidIn: 0, paidOut: 0, net: 0 });
      setStep('running');
    } else {
      // 직전 마감현금 → 개시현금 기본 제시(서버가 open 응답에서도 suggest).
      setShift(null);
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
    if (status === 200) { setOpeningFloat(''); await load(); }
    else setError(j?.message || t('cash:startFail', { defaultValue: 'Could not start shift' }));
  };

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

  const onHand = shift ? round2(Number(shift.opening_float || 0) + Number(movements.net || 0)) : 0;

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 4 }}>{t('cash:cashDrawerTitle', { defaultValue: 'Cash Drawer' })}</h1>
      <p style={{ fontSize: 13, color: C.subtle, margin: '0 0 16px', lineHeight: 1.5 }}>
        {t('cash:cashDrawerSubtitle', { defaultValue: 'Manage the cash drawer: opening float, cash in/out, and cash on hand. Final settlement (all payment methods) is done in Daily Settlement.' })}
      </p>

      {error && <div style={{ background: '#FFF1F1', border: `1px solid ${C.bad}`, color: '#B42318', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>{error}</div>}

      {step === 'loading' && <div style={{ textAlign: 'center', color: C.subtle, padding: 40 }}>{t('common:loading', { defaultValue: 'Loading…' })}</div>}

      {/* 교대 시작 — 개시현금 */}
      {step === 'start' && (
        <Card>
          <Label>{t('cash:openingCash', { defaultValue: 'Opening cash in drawer' })}</Label>
          <Amount>{openingFloat ? fc(num(openingFloat)) : fc(suggestedFloat)}</Amount>
          <Hint>{t('cash:openingHint', { defaultValue: 'Count the cash you are starting with. Suggested = last closing balance.' })}</Hint>
          <Pad onPress={floatPress} onBack={floatBack} />
          <Primary disabled={busy} onClick={startShift}>{busy ? '…' : t('cash:startShift', { defaultValue: 'Start shift' })}</Primary>
        </Card>
      )}

      {/* 영업 중 — 현금 원장 + 입출금 + 드로어 */}
      {step === 'running' && shift && (
        <Card>
          <Label>{t('cash:currentDrawer', { defaultValue: 'Current cash drawer' })}</Label>
          <div style={{ background: C.bg, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <Ledger label={t('cash:openingCash', { defaultValue: 'Opening cash' })} value={fc(shift.opening_float)} />
            <Ledger label={t('cash:paidIn', { defaultValue: 'Cash in' })} value={`+ ${fc(movements.paidIn)}`} color={C.match} />
            <Ledger label={t('cash:paidOut', { defaultValue: 'Cash out' })} value={`− ${fc(movements.paidOut)}`} color={C.bad} />
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 10 }}>
              <Ledger label={t('cash:cashOnHand', { defaultValue: 'Cash on hand (float + movements)' })} value={fc(onHand)} bold />
            </div>
          </div>
          <Hint>{t('cash:openedAt', { defaultValue: 'Shift opened {{when}}', when: (() => { try { return formatDateTime(shift.opened_at, opSettings, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } })() })}</Hint>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip onClick={() => setMvForm({ type: 'in', amount: '', reason: '' })}>{t('cash:paidIn', { defaultValue: 'Cash in' })}</Chip>
            <Chip onClick={() => setMvForm({ type: 'out', amount: '', reason: '' })}>{t('cash:paidOut', { defaultValue: 'Cash out' })}</Chip>
            <Chip onClick={handleOpenDrawer}>{t('cash:openDrawer', { defaultValue: 'Open drawer' })}</Chip>
          </div>
          {drawerMsg && <div style={{ fontSize: 12, color: C.subtle, marginTop: 8 }}>{drawerMsg}</div>}

          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: 13, color: C.subtle, lineHeight: 1.5 }}>
              {t('cash:settleInDailyHint', { defaultValue: 'To close the shift, run Final Settlement in Daily Settlement (Floor Plan / Live Orders) — count every payment method (cash, card by type, e-wallet) against expected.' })}
            </div>
          </div>
        </Card>
      )}

      {/* 입출금 입력 — 표준 Modal + 터치 숫자패드 */}
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

function round2(n: number) { return Math.round((Number(n) || 0) * 100) / 100; }

// ── presentational ──
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
const Amount: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 32, fontWeight: 700, color: C.text, textAlign: 'center', padding: '12px 0 16px' }}>{children}</div>
);
const Ledger: React.FC<{ label: string; value: string; color?: string; bold?: boolean }> = ({ label, value, color, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 0' }}>
    <span style={{ fontSize: 14, color: bold ? C.text : C.subtle, fontWeight: bold ? 700 : 500 }}>{label}</span>
    <span style={{ fontSize: bold ? 17 : 14, fontWeight: bold ? 700 : 600, color: color || C.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
  </div>
);
const Primary: React.FC<{ children: React.ReactNode; disabled?: boolean; onClick: () => void }> = ({ children, disabled, onClick }) => (
  <button type="button" disabled={disabled} onClick={onClick}
    style={{ width: '100%', height: 56, marginTop: 14, borderRadius: 12, border: 'none', background: disabled ? '#C7CED6' : C.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' }}>{children}</button>
);
const Chip: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button type="button" onClick={onClick}
    style={{ flex: 1, minWidth: 96, height: 44, borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{children}</button>
);

export default CashUpPage;
