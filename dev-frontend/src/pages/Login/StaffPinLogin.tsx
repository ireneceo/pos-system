import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

// Staff PIN login for a shared POS terminal. The device remembers its restaurant
// (set on any successful login → localStorage 'pos_device_restaurant'), so staff sign
// in with just their PIN — no namespaced username needed. On success, AuthContext sets
// the user and LoginPage's auth effect navigates. Server-side rate limiting (pinLimiter)
// guards against PIN brute-force. Touch-first: on-screen keypad, no hardware keyboard.

interface Props {
  onBack: () => void;
}

const KEY_STYLE: React.CSSProperties = {
  height: 64,
  borderRadius: 12,
  border: '1px solid #E6EBF1',
  background: '#fff',
  color: '#0A2540',
  fontSize: 24,
  fontWeight: 600,
  cursor: 'pointer'
};

const StaffPinLogin: React.FC<Props> = ({ onBack }) => {
  const { t } = useTranslation();
  const { loginWithPin } = useAuth();
  const [device, setDevice] = useState<{ id: string; name: string } | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pos_device_restaurant');
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.id) setDevice({ id: String(d.id), name: d.name || '' });
      }
    } catch { /* ignore */ }
  }, []);

  const press = (d: string) => { setError(''); setPin(p => (p.length < 8 ? p + d : p)); };
  const back = () => { setError(''); setPin(p => p.slice(0, -1)); };
  const clear = () => { setError(''); setPin(''); };

  const submit = async () => {
    if (!device || pin.length < 4 || busy) return;
    setBusy(true); setError('');
    const res = await loginWithPin(device.id, pin);
    setBusy(false);
    if (!res.ok) { setError(res.error || t('auth:staffPin.invalid', { defaultValue: 'Invalid PIN' })); setPin(''); }
    // success → AuthContext.setUser → LoginPage auth effect navigates
  };

  if (!device) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 8px' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#0A2540', marginBottom: 10 }}>
          {t('auth:staffPin.title', { defaultValue: 'Staff PIN sign-in' })}
        </div>
        <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.5, marginBottom: 18 }}>
          {t('auth:staffPin.noDevice', { defaultValue: 'Ask your manager to sign in on this device first. After that, staff can sign in here with just their PIN.' })}
        </p>
        <button type="button" onClick={onBack} style={{ ...KEY_STYLE, height: 48, width: '100%', fontSize: 15 }}>
          {t('auth:staffPin.useEmail', { defaultValue: 'Use email sign-in' })}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ textAlign: 'center', marginBottom: 6, fontSize: 13, color: '#6B7C93' }}>
        {device.name || t('auth:staffPin.thisStore', { defaultValue: 'This store' })}
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: '#0A2540', marginBottom: 14 }}>
        {t('auth:staffPin.enterPin', { defaultValue: 'Enter your staff PIN' })}
      </div>

      {/* PIN dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
        {Array.from({ length: Math.max(4, pin.length) }).map((_, i) => (
          <span key={i} style={{
            width: 14, height: 14, borderRadius: '50%',
            background: i < pin.length ? '#635BFF' : 'transparent',
            border: '2px solid ' + (i < pin.length ? '#635BFF' : '#C7CED6')
          }} />
        ))}
      </div>

      {error && (
        <div style={{ textAlign: 'center', color: '#D14343', fontSize: 13, marginBottom: 12 }}>{error}</div>
      )}

      {/* Keypad */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
          <button key={d} type="button" onClick={() => press(d)} style={KEY_STYLE}>{d}</button>
        ))}
        <button type="button" onClick={clear} style={{ ...KEY_STYLE, fontSize: 15, color: '#6B7C93' }} aria-label={t('auth:staffPin.clear', { defaultValue: 'Clear' })}>
          {t('auth:staffPin.clear', { defaultValue: 'Clear' })}
        </button>
        <button type="button" onClick={() => press('0')} style={KEY_STYLE}>0</button>
        <button type="button" onClick={back} style={{ ...KEY_STYLE, fontSize: 22, color: '#6B7C93' }} aria-label={t('auth:staffPin.delete', { defaultValue: 'Delete' })}>←</button>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={pin.length < 4 || busy}
        style={{
          width: '100%', height: 52, borderRadius: 12, border: 'none',
          background: pin.length < 4 || busy ? '#C7CED6' : '#635BFF', color: '#fff',
          fontSize: 16, fontWeight: 600, cursor: pin.length < 4 || busy ? 'not-allowed' : 'pointer', marginBottom: 10
        }}
      >
        {busy ? t('auth:staffPin.signingIn', { defaultValue: 'Signing in…' }) : t('auth:staffPin.signIn', { defaultValue: 'Sign in' })}
      </button>

      <button type="button" onClick={onBack} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #E6EBF1', background: '#fff', color: '#6B7C93', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        {t('auth:staffPin.useEmail', { defaultValue: 'Use email sign-in' })}
      </button>
    </div>
  );
};

export default StaffPinLogin;
