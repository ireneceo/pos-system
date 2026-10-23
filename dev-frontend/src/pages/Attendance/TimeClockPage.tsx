/**
 * «Time Clock» — /restaurant/:restaurantId/time-clock (매장 공용 태블릿 전체화면)
 * 4자리 PIN → 직원 이름·지금 상태 확인 → «출근»/«퇴근» 한 번 → 결과 3초 → 처음으로.
 * 로그인 세션(관리자 또는 POS 권한 직원) 위에서 돈다 — PIN 은 토큰을 새로 만들지 않고 «누가 찍나» 만 정한다.
 * 설계 .claude/fable-design-20261016-staff-attendance.md §4-3 (Q1=A).
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/UI/Button';
import { formatTime } from '../../utils/dateFormat';
import { attendanceApi, AttendanceRecord, formatMinutes } from './attendanceApi';
import NetworkStatus from './NetworkStatus';

const Screen = styled.div`
  min-height: 100vh;
  background: var(--pos-bg, #F6F9FC);
  color: var(--pos-text, #0A2540);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  user-select: none;
`;
const TopBar = styled.div`
  position: fixed;
  top: 12px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--pos-text-muted, #425466);
`;
const Clock = styled.div`
  font-size: 56px;
  font-weight: 700;
  letter-spacing: 2px;
`;
const Sub = styled.div`
  font-size: 16px;
  color: var(--pos-text-muted, #425466);
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
`;
const Panel = styled.div`
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid #E5E7EB;
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(10, 37, 64, 0.08);
`;
const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 8px 0 24px;
`;
const PinDot = styled.span<{ filled?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #635BFF;
  background: ${p => (p.filled ? '#635BFF' : 'transparent')};
`;
const Pad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;
const Key = styled(Button)`
  height: 68px;
  font-size: 26px;
  font-weight: 600;
  border-radius: 14px;
`;
const BigAction = styled(Button)`
  width: 100%;
  height: 72px;
  font-size: 22px;
  border-radius: 16px;
  margin-top: 16px;
`;
const Name = styled.div`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
`;
const Msg = styled.div<{ tone?: 'ok' | 'err' }>`
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.5;
  color: ${p => (p.tone === 'err' ? '#B91C1C' : p.tone === 'ok' ? '#047857' : 'inherit')};
`;

const Help = styled.div`
  font-size: 13px;
  color: var(--pos-text-muted, #425466);
  line-height: 1.5;
  margin: -2px 0 6px;
`;

type Step = 'pin' | 'confirm' | 'admin' | 'done';

const TimeClockPage: React.FC = () => {
  const { t } = useTranslation('attendance');
  const { restaurantId = '' } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [tz, setTz] = useState('Asia/Kuala_Lumpur');
  const [now, setNow] = useState(new Date());
  const [step, setStep] = useState<Step>('pin');
  const [pin, setPin] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [person, setPerson] = useState<{ id: number; name: string; open: AttendanceRecord | null } | null>(null);
  const [message, setMessage] = useState<{ tone?: 'ok' | 'err'; text: string } | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [onStoreNetwork, setOnStoreNetwork] = useState<boolean | null>(null);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    attendanceApi(restaurantId, '/me/status').then(r => {
      if (r.ok) { setTz(r.data.time_zone); setDisabled(!r.data.settings.allow_pos_pin_clock); setOnStoreNetwork(r.data.on_store_network ?? null); }
    });
    const id = window.setInterval(() => setNow(new Date()), 10000);
    return () => window.clearInterval(id);
  }, [restaurantId]);

  const reset = useCallback(() => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    setStep('pin'); setPin(''); setAdminPin(''); setPerson(null); setMessage(null);
  }, []);

  // 아무 것도 안 하면 20초 뒤 처음으로(다음 직원이 남의 이름을 보지 않게)
  useEffect(() => {
    if (step === 'pin' && !pin) return;
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(reset, step === 'done' ? 3000 : 20000);
    return () => { if (resetTimer.current) window.clearTimeout(resetTimer.current); };
  }, [step, pin, adminPin, reset]);

  const lookup = async (code: string) => {
    const r = await attendanceApi<{ user: { id: number; name: string }; open: AttendanceRecord | null }>(restaurantId, '/pin-lookup', { method: 'POST', body: { pin_code: code } });
    if (!r.ok) {
      setPin('');
      setMessage({ tone: 'err', text: r.code === 'TOO_MANY_PIN_ATTEMPTS' ? t('clock.tooMany', 'Too many tries. Wait a minute.') : `${t('clock.wrongPin', 'PIN not recognised. Try again.')} ${t('clock.wrongPinHint', 'New staff? Ask a manager to add you in Staff with a 4-digit PIN.')}` });
      return;
    }
    setPerson({ id: r.data.user.id, name: r.data.user.name, open: r.data.open });
    setMessage(null);
    setStep('confirm');
  };

  const press = (d: string) => {
    if (step === 'pin') {
      if (pin.length >= 4) return;
      const next = pin + d;
      setPin(next); setMessage(null);
      if (next.length === 4) lookup(next);
    } else if (step === 'admin') {
      if (adminPin.length >= 4) return;
      setAdminPin(adminPin + d);
    }
  };
  const back = () => {
    if (step === 'pin') setPin(p => p.slice(0, -1));
    else if (step === 'admin') setAdminPin(p => p.slice(0, -1));
  };

  const doClock = async (withAdmin?: string) => {
    if (!person) return;
    const action = person.open ? 'out' : 'in';
    const body: Record<string, unknown> = { action, method: 'pos_pin', pin_code: pin };
    if (withAdmin) body.admin_pin = withAdmin;
    const r = await attendanceApi<{ record: AttendanceRecord }>(restaurantId, '/clock', { method: 'POST', body });
    if (!r.ok) {
      if (r.code === 'NETWORK_MISMATCH') { setStep('admin'); setAdminPin(''); setMessage({ tone: 'err', text: t('clock.networkMismatch', 'This tablet is not on the store network. A manager can confirm with their PIN.') }); return; }
      if (r.code === 'INVALID_ADMIN_PIN') { setAdminPin(''); setMessage({ tone: 'err', text: t('my.invalidAdminPin', 'Manager PIN is not correct.') }); return; }
      setMessage({ tone: 'err', text: r.message || t('errors.save', 'Could not save') });
      return;
    }
    const rec = r.data.record;
    // 관리자 PIN 으로 통과하면 그 네트워크가 등록될 수 있다 → 위 «매장 와이파이» 표시를 다시 읽는다
    if (withAdmin) attendanceApi(restaurantId, '/me/status').then(s => { if (s.ok) setOnStoreNetwork(s.data.on_store_network ?? null); });
    setMessage({
      tone: 'ok',
      text: action === 'in'
        ? t('clock.inDone', '{{name}} clocked in at {{time}}', { name: person.name, time: formatTime(rec.clock_in_at, tz) })
        : t('clock.outDone', '{{name}} clocked out at {{time}} · {{hours}}', { name: person.name, time: formatTime(rec.clock_out_at, tz), hours: formatMinutes(rec.minutes) }),
    });
    setStep('done');
  };

  const showPad = step === 'pin' || step === 'admin';
  const value = step === 'admin' ? adminPin : pin;

  return (
    <Screen>
      <TopBar>
        <span>{t('clock.title', 'Time Clock')}</span>
        <Button size="small" variant="secondary" onClick={() => navigate(-1)}>{t('actions.close', 'Close')}</Button>
      </TopBar>
      <Clock>{now.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', timeZone: tz })}</Clock>
      <Sub style={{ marginBottom: 12 }}>{now.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long', timeZone: tz })}</Sub>
      <NetworkStatus onStoreNetwork={onStoreNetwork} style={{ marginBottom: 16 }} />

      <Panel>
        {disabled ? (
          <Sub style={{ margin: 0 }}>{t('clock.disabled', 'The Time Clock is turned off for this store.')}</Sub>
        ) : (
          <>
            {step === 'pin' && <Sub style={{ marginBottom: 8 }}>{t('clock.enterPin', 'Enter your 4-digit PIN')}</Sub>}
            {step === 'pin' && !pin && !message && <Help>{t('clock.howTo', 'Staff: type your own PIN, then tap Clock in or Clock out. No login needed on this screen.')}</Help>}
            {step === 'admin' && <Sub style={{ marginBottom: 8 }}>{t('clock.enterAdminPin', 'Manager PIN')}</Sub>}
            {step === 'admin' && <Help>{t('clock.adminHow', 'A manager types their own 4-digit PIN and taps Confirm to allow this clock-in/out.')}</Help>}
            {(step === 'confirm' || step === 'done') && person && (
              <>
                <Name>{person.name}</Name>
                {step === 'confirm' && (
                  <Sub style={{ marginBottom: 0 }}>
                    {person.open
                      ? t('clock.workingSince', 'Working since {{time}} ({{hours}})', { time: formatTime(person.open.clock_in_at, tz), hours: formatMinutes(person.open.minutes) })
                      : t('clock.notIn', 'Not clocked in')}
                  </Sub>
                )}
              </>
            )}

            {showPad && (
              <>
                <Dots>{[0, 1, 2, 3].map(i => <PinDot key={i} filled={i < value.length} />)}</Dots>
                <Pad>
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => <Key key={d} variant="secondary" onClick={() => press(d)}>{d}</Key>)}
                  <Key variant="cancel" onClick={reset}>✕</Key>
                  <Key variant="secondary" onClick={() => press('0')}>0</Key>
                  <Key variant="cancel" onClick={back}>⌫</Key>
                </Pad>
                {step === 'admin' && (
                  <BigAction variant="primary" disabled={adminPin.length !== 4} onClick={() => doClock(adminPin)}>
                    {t('clock.confirm', 'Confirm')}
                  </BigAction>
                )}
              </>
            )}

            {step === 'confirm' && person && (
              <>
                <BigAction variant={person.open ? 'warning' : 'primary'} onClick={() => doClock()}>
                  {person.open ? t('my.clockOut', 'Clock out') : t('my.clockIn', 'Clock in')}
                </BigAction>
                <Button variant="cancel" fullWidth style={{ marginTop: 10 }} onClick={reset}>{t('clock.notMe', 'Not me')}</Button>
              </>
            )}

            {message && <Msg tone={message.tone}>{message.text}</Msg>}
          </>
        )}
      </Panel>
    </Screen>
  );
};

export default TimeClockPage;
