import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import { Modal, FormInput, ModalButton } from '../UI/Modal';
import { openCashDrawer } from '../../utils/billPrint'; // 🔒 billPrint 미수정 — 드로어킥 export만 호출
import { C, num, round2, Card, Label, Hint, Amount, Ledger, Primary, Chip, Pad } from './cashUi';

// 오늘의 캐시드로워 (운영) — 개시현금 · 현금 입출금 · 현재 시재 · 드로어 열기.
// 사이드바 시재관리 + 라이브오더/플로어플랜 모달에서 공용. 전수단 마감은 Daily Settlement.

type Step = 'loading' | 'start' | 'running';

interface Props {
  restaurantId?: string;
  /** 입출금/교대 변경 시 부모(회계 리스트)에 갱신 신호 */
  onChange?: () => void;
  /** 모달 등 컴팩트 컨텍스트 — 제목/설명 숨김 */
  compact?: boolean;
}

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
    if (!restaurantId) return;
    setStep('loading'); setError('');
    const { j } = await api('/shift/current');
    if (j?.data) {
      setShift(j.data);
      const ex = await api(`/shift/${j.data.id}/expected`);
      setMovements(ex.j?.data?.movements || { paidIn: 0, paidOut: 0, net: 0 });
      setStep('running');
    } else {
      setShift(null);
      setStep('start');
    }
  }, [api, restaurantId]);

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

  const submitMovement = async () => {
    if (!mvForm || !shift) return;
    const amount = num(mvForm.amount);
    if (!(amount > 0)) { setError(t('cash:movementAmountError', { defaultValue: 'Enter an amount greater than 0' })); return; }
    setBusy(true); setError('');
    const { status, j } = await api(`/shift/${shift.id}/movement`, {
      method: 'POST', body: JSON.stringify({ type: mvForm.type, amount, reason: mvForm.reason || null })
    });
    setBusy(false);
    if (status === 200) { setMovements(j?.movements || movements); setMvForm(null); onChange?.(); }
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

  const onHand = shift ? round2(Number(shift.opening_float || 0) + Number(movements.net || 0)) : 0;

  return (
    <div>
      {!compact && (
        <p style={{ fontSize: 13, color: C.subtle, margin: '0 0 16px', lineHeight: 1.5 }}>
          {t('cash:cashDrawerSubtitle', { defaultValue: 'Manage the cash drawer: opening float, cash in/out, and cash on hand. Final settlement (all payment methods) is done in Daily Settlement.' })}
        </p>
      )}

      {error && <div style={{ background: '#FFF1F1', border: `1px solid ${C.bad}`, color: '#B42318', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>{error}</div>}

      {step === 'loading' && <div style={{ textAlign: 'center', color: C.subtle, padding: 40 }}>{t('common:loading', { defaultValue: 'Loading…' })}</div>}

      {step === 'start' && (
        <Card>
          <Label>{t('cash:openingCash', { defaultValue: 'Opening cash in drawer' })}</Label>
          <Amount>{openingFloat ? fc(num(openingFloat)) : fc(suggestedFloat)}</Amount>
          <Hint>{t('cash:openingHint', { defaultValue: 'Count the cash you are starting with. Suggested = last closing balance.' })}</Hint>
          <Pad onPress={floatPress} onBack={floatBack} />
          <Primary disabled={busy} onClick={startShift}>{busy ? '…' : t('cash:startShift', { defaultValue: 'Start shift' })}</Primary>
        </Card>
      )}

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

export default CashDrawerOps;
