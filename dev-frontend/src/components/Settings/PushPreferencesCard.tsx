import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  isPushSupported,
  subscribeToPush,
  unsubscribeFromPush,
  getPreferences,
  updatePreferences,
  sendTestPush
} from '../../services/push';

/**
 * Push notification preferences card.
 * - Master toggle (push_enabled)
 * - Category toggles (POS Operations 5 categories)
 * - Muted hours (start/end + enabled)
 * - Test button (rate-limited 5/min on server)
 */
const POS_OPS_CATEGORIES = [
  'order_new', 'order_status', 'kitchen_alert', 'inventory_low', 'staff_call'
];

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0A2540', marginBottom: 12 }}>{title}</h3>
    {children}
  </div>
);

const Row: React.FC<{ label: string; desc?: string; right: React.ReactNode }> = ({ label, desc, right }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: '#0A2540' }}>{label}</div>
      {desc && <div style={{ fontSize: 12, color: '#6B7C93', marginTop: 2 }}>{desc}</div>}
    </div>
    <div style={{ marginLeft: 16 }}>{right}</div>
  </div>
);

const PushPreferencesCard: React.FC = () => {
  const { t } = useTranslation();
  const [supported] = useState(isPushSupported());
  const [permission, setPermission] = useState<'default' | 'granted' | 'denied' | 'unknown'>(
    typeof Notification !== 'undefined' ? Notification.permission as any : 'unknown'
  );
  const [busy, setBusy] = useState(false);
  const [prefs, setPrefs] = useState<{
    push_enabled: boolean;
    categories: Record<string, boolean>;
    muted_hours: { enabled: boolean; start: number; end: number; timezone?: string };
  } | null>(null);
  const [testStatus, setTestStatus] = useState<string>('');

  const load = useCallback(async () => {
    try {
      const data = await getPreferences();
      setPrefs(data);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleEnableChange = async (next: boolean) => {
    setBusy(true);
    setTestStatus('');
    try {
      if (next && permission !== 'granted') {
        const result = await subscribeToPush();
        if (!result.ok) {
          setTestStatus(`Failed to enable: ${result.reason}`);
          setBusy(false);
          return;
        }
        setPermission('granted');
      }
      const data = await updatePreferences({ push_enabled: next });
      setPrefs(data);
      if (!next) await unsubscribeFromPush();
    } catch (e: any) {
      setTestStatus(e?.message || 'Update failed');
    } finally {
      setBusy(false);
    }
  };

  const handleCategoryChange = async (key: string, value: boolean) => {
    if (!prefs) return;
    const next = { ...prefs.categories, [key]: value };
    setPrefs({ ...prefs, categories: next });
    try { await updatePreferences({ categories: { [key]: value } }); }
    catch { /* revert silently */ }
  };

  const handleMutedChange = async (patch: Partial<{ enabled: boolean; start: number; end: number }>) => {
    if (!prefs) return;
    const next = { ...prefs.muted_hours, ...patch };
    setPrefs({ ...prefs, muted_hours: next });
    try { await updatePreferences({ muted_hours: next }); } catch {}
  };

  const handleTest = async () => {
    setBusy(true); setTestStatus('');
    const r = await sendTestPush();
    if (r.ok) setTestStatus(`Sent: ${JSON.stringify(r.result)}`);
    else if (r.reason === 'rate_limited') setTestStatus('Rate limit reached (5/min). Try again in a minute.');
    else setTestStatus(`Failed: ${r.reason}`);
    setBusy(false);
  };

  if (!supported) {
    return (
      <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 12, padding: 16, color: '#92400E' }}>
        Web push is not supported on this browser. Use Chrome, Edge, Firefox, or Safari 16.4+.
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #E6EBF1', borderRadius: 12, padding: 24 }}>
      <Section title="Push notifications">
        <Row
          label="Enable push notifications on this device"
          desc={permission === 'denied'
            ? 'Browser permission is blocked. Re-enable in your browser settings, then toggle this on.'
            : 'Receive OS-level alerts when you are not actively viewing the app.'}
          right={
            <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
              <input
                type="checkbox"
                checked={!!prefs?.push_enabled}
                disabled={busy || permission === 'denied'}
                onChange={(e) => handleEnableChange(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute', cursor: busy || permission === 'denied' ? 'not-allowed' : 'pointer', inset: 0,
                background: prefs?.push_enabled ? '#635BFF' : '#CBD5E1',
                opacity: permission === 'denied' ? 0.5 : 1,
                borderRadius: 24, transition: 'background 0.15s'
              }} />
              <span style={{
                position: 'absolute', height: 18, width: 18, left: prefs?.push_enabled ? 22 : 4, bottom: 3,
                background: '#fff', borderRadius: '50%', transition: 'left 0.15s'
              }} />
            </label>
          }
        />
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={handleTest}
            disabled={busy || !prefs?.push_enabled}
            style={{
              background: '#635BFF', color: '#fff', border: 'none', padding: '8px 14px',
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: (busy || !prefs?.push_enabled) ? 'not-allowed' : 'pointer',
              opacity: (busy || !prefs?.push_enabled) ? 0.5 : 1
            }}
          >
            Send test push
          </button>
          {testStatus && <span style={{ marginLeft: 12, fontSize: 13, color: '#6B7C93' }}>{testStatus}</span>}
        </div>
      </Section>

      <Section title="Categories">
        {POS_OPS_CATEGORIES.map(key => {
          const enabled = prefs?.categories?.[key] !== false;
          return (
            <Row
              key={key}
              label={key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              right={
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => handleCategoryChange(key, e.target.checked)}
                  disabled={!prefs?.push_enabled}
                  style={{ width: 18, height: 18, accentColor: '#635BFF' }}
                />
              }
            />
          );
        })}
      </Section>

      <Section title="Muted hours">
        <Row
          label="Suppress push during quiet hours"
          desc="In-app alerts and sound continue; only OS-level push is paused."
          right={
            <input
              type="checkbox"
              checked={!!prefs?.muted_hours?.enabled}
              onChange={(e) => handleMutedChange({ enabled: e.target.checked })}
              disabled={!prefs?.push_enabled}
              style={{ width: 18, height: 18, accentColor: '#635BFF' }}
            />
          }
        />
        {prefs?.muted_hours?.enabled && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
            <label style={{ fontSize: 13, color: '#6B7C93' }}>From</label>
            <select
              value={prefs.muted_hours.start}
              onChange={(e) => handleMutedChange({ start: parseInt(e.target.value, 10) })}
              style={{ padding: '6px 10px', border: '1px solid #E6EBF1', borderRadius: 6 }}
            >
              {Array.from({ length: 24 }, (_, h) => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
            </select>
            <label style={{ fontSize: 13, color: '#6B7C93' }}>To</label>
            <select
              value={prefs.muted_hours.end}
              onChange={(e) => handleMutedChange({ end: parseInt(e.target.value, 10) })}
              style={{ padding: '6px 10px', border: '1px solid #E6EBF1', borderRadius: 6 }}
            >
              {Array.from({ length: 24 }, (_, h) => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
            </select>
          </div>
        )}
      </Section>
    </div>
  );
};

export default PushPreferencesCard;
