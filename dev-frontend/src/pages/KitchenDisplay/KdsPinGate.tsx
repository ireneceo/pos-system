import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { KdsStaffSession } from './useKdsStaff';

interface KdsPinGateProps {
  onAuthenticated: (s: KdsStaffSession) => void;
  onCancel?: () => void;
  stationName?: string;
}

const Backdrop = styled.div`
  position: fixed; inset: 0;
  background: linear-gradient(135deg, #0A2540 0%, #1A1F36 100%);
  display: flex; align-items: center; justify-content: center;
  z-index: 9000;
  padding: 24px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 4px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #6B7C93;
  text-align: center;
  margin: 0 0 24px;
`;

const PinDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const PinDot = styled.div<{ filled: boolean; error?: boolean }>`
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid ${p => p.error ? '#DC2626' : p.filled ? '#635BFF' : '#E6EBF1'};
  background: ${p => p.error ? '#DC2626' : p.filled ? '#635BFF' : 'transparent'};
  transition: all 0.15s;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Key = styled.button<{ variant?: 'action' }>`
  height: 80px;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  background: ${p => p.variant === 'action' ? '#F8FAFC' : '#fff'};
  color: ${p => p.variant === 'action' ? '#6B7C93' : '#0A2540'};
  font-size: ${p => p.variant === 'action' ? '14px' : '22px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { background: ${p => p.variant === 'action' ? '#F0F4FF' : '#F8FAFC'}; border-color: #635BFF; }
  &:active { transform: scale(0.96); background: #F0F4FF; }
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`;

const KdsPinGate: React.FC<KdsPinGateProps> = ({ onAuthenticated, onCancel, stationName }) => {
  const { t } = useTranslation('kitchen');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const verify = useCallback(async (code: string) => {
    setBusy(true);
    setError('');
    try {
      const token = getAuthToken();
      const res = await fetch('/api/staff/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ pin_code: code })
      });
      const data = await res.json();
      if (data && data.success && data.user) {
        onAuthenticated({
          id: Number(data.user.id),
          name: data.user.name || data.user.username || data.data?.name || 'Staff',
          role: data.user.role || 'Staff',
          loggedInAt: Date.now()
        });
      } else {
        setError(t('pin.invalid', 'Invalid PIN. Please try again.'));
        setPin('');
      }
    } catch {
      setError(t('pin.connectionError', 'Connection error. Please try again.'));
      setPin('');
    } finally {
      setBusy(false);
    }
  }, [onAuthenticated, t]);

  const press = useCallback((key: string) => {
    if (busy) return;
    if (key === 'backspace') { setPin(p => p.slice(0, -1)); setError(''); return; }
    if (pin.length >= 4) return;
    const next = pin + key;
    setPin(next);
    setError('');
    if (next.length === 4) verify(next);
  }, [pin, busy, verify]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') press(e.key);
      else if (e.key === 'Backspace') press('backspace');
      else if (e.key === 'Escape' && onCancel) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [press, onCancel]);

  return (
    <Backdrop
      onClick={(e) => {
        // Backdrop click closes the modal (matches POS CashierPinModal behavior).
        // Stop here only when the click happened on the card itself.
        if (e.target === e.currentTarget && onCancel) onCancel();
      }}
    >
      <Card onClick={(e) => e.stopPropagation()}>
        <Title>{t('pin.title', 'Sign in to Kitchen Display')}</Title>
        <Subtitle>
          {stationName
            ? t('pin.subtitleStation', { defaultValue: 'Enter your 4-digit PIN — {{station}}', station: stationName })
            : t('pin.subtitle', 'Enter your 4-digit PIN')}
        </Subtitle>

        <PinDisplay>
          {[0, 1, 2, 3].map(i => (
            <PinDot key={i} filled={pin.length > i} error={!!error} />
          ))}
        </PinDisplay>

        <ErrorMsg>{error}</ErrorMsg>

        <Keypad>
          {['1','2','3','4','5','6','7','8','9'].map(k => (
            <Key key={k} onClick={() => press(k)}>{k}</Key>
          ))}
          <Key variant="action" onClick={() => press('backspace')}>⌫</Key>
          <Key onClick={() => press('0')}>0</Key>
          <Key variant="action" onClick={onCancel}>
            {t('pin.close', 'Close')}
          </Key>
        </Keypad>
      </Card>
    </Backdrop>
  );
};

export default KdsPinGate;
