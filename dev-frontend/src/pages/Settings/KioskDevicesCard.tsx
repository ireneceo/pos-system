/**
 * 매장 설정 › 모바일 주문 › 매장 태블릿(키오스크) — 기기 등록·목록·해제.
 * 설계: .claude/fable-verdict-20261007-kiosk-payment-split.md D2·D7 (Fable 판정 2026-10-07, Irene 승인).
 *
 * 등록은 **그 태블릿에서** 매장 관리자가 로그인한 채 누른다 → 서버가 기기 토큰을 한 번 준다 → 이 기기에 저장 →
 * 직원 로그인은 지우고 키오스크 화면으로 간다. 이 기기가 매장 키오스크가 된다(손님 폰은 등록할 수 없다).
 * 해제는 어느 기기에서든 된다 — 해제된 태블릿은 다음 요청에서 직원 로그인 화면으로 돌아간다.
 * 키오스크 옆 단말기가 카운터 것과 다르면 기기마다 단말기 주소를 넣는다(비우면 매장 결제 설정의 주소).
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/UI/Button';
import { FormInput } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import { clearAuthToken } from '../../utils/auth';
import { saveKioskDevice, hasKioskToken, getKioskInfo, kioskHomePath } from '../../utils/kioskDevice';
import { formatDateTime } from '../../utils/dateFormat';

interface KioskDevice {
  id: number; name: string; status: 'active' | 'revoked';
  terminal_host: string | null; terminal_port: number | null;
  last_seen_at: string | null; created_at: string;
}

interface Props {
  restaurantId: number | string | undefined; timeZone?: string;
  /** 설정 › Kiosk «키오스크 사용» — 꺼져 있으면 새 등록만 막는다(목록·해제는 유지) */
  enabled?: boolean;
}

const hint: React.CSSProperties = { fontSize: '13px', color: '#4B5563', lineHeight: 1.5 };
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '12px 0', borderTop: '1px solid #E3E8EE' };

async function call(path: string, method: string, body?: any): Promise<{ ok: boolean; json: any }> {
  try {
    const res = await fetch(path, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    const json = await res.json().catch(() => null);
    return { ok: res.ok && json?.success !== false, json };
  } catch {
    return { ok: false, json: null };
  }
}

const KioskDevicesCard: React.FC<Props> = ({ restaurantId, timeZone, enabled = true }) => {
  const { t } = useTranslation('settings');
  const [devices, setDevices] = useState<KioskDevice[]>([]);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirmRegister, setConfirmRegister] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<KioskDevice | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editHost, setEditHost] = useState('');
  const [editPort, setEditPort] = useState('');
  const thisDeviceId = hasKioskToken() ? getKioskInfo()?.id : null;

  const load = useCallback(async () => {
    if (!restaurantId) return;
    const r = await call(`/api/kiosk-devices?restaurant_id=${restaurantId}`, 'GET');
    if (r.ok) setDevices(r.json.data || []);
  }, [restaurantId]);

  useEffect(() => { load(); }, [load]);

  const register = async () => {
    if (busy) return;
    setConfirmRegister(false);
    setBusy(true); setError('');
    const r = await call('/api/kiosk-devices', 'POST', { restaurant_id: Number(restaurantId), name: name.trim() });
    if (!r.ok) {
      setBusy(false);
      setError(r.json?.code === 'KIOSK_DISABLED' ? t('settingsPage.kioskTab.disabledRegisterHint') : r.json?.code === 'NO_SLUG' ? t('settingsPage.kioskDevices.noSlug') : (r.json?.message || t('settingsPage.kioskDevices.registerFailed')));
      return;
    }
    const { device, token, slug } = r.json.data;
    saveKioskDevice(token, { id: device.id, name: device.name, restaurantId: Number(restaurantId), slug });
    // 이 기기의 직원 로그인을 지운다 — 손님 손에 직원 화면이 남지 않게(Fable 판정 §1-7)
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch { /* ignore */ }
    clearAuthToken();
    try { localStorage.removeItem('user'); } catch { /* ignore */ }
    window.location.assign(kioskHomePath() || `/mobile/${slug}?kiosk=1`);
  };

  const revoke = async () => {
    const target = revokeTarget;
    setRevokeTarget(null);
    if (!target) return;
    const r = await call(`/api/kiosk-devices/${target.id}/revoke`, 'POST');
    if (!r.ok) setError(r.json?.message || t('settingsPage.kioskDevices.revokeFailed'));
    load();
  };

  const saveTerminal = async (d: KioskDevice) => {
    const r = await call(`/api/kiosk-devices/${d.id}`, 'PATCH', { terminal_host: editHost.trim(), terminal_port: editPort.trim() });
    if (!r.ok) { setError(r.json?.message || t('settingsPage.kioskDevices.saveFailed')); return; }
    setEditId(null);
    load();
  };

  const active = devices.filter(d => d.status === 'active');
  const revoked = devices.filter(d => d.status === 'revoked');

  return (
    <div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: '#0A2540', marginBottom: '6px' }}>{t('settingsPage.kioskDevices.title')}</div>
      <p style={{ ...hint, marginBottom: '12px' }}>{t('settingsPage.kioskDevices.hint')}</p>

      {!enabled && <div style={{ ...hint, marginBottom: '8px', color: '#92400E' }}>{t('settingsPage.kioskTab.disabledRegisterHint')}</div>}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
        <FormInput
          disabled={!enabled}
          value={name}
          maxLength={80}
          placeholder={t('settingsPage.kioskDevices.namePlaceholder')}
          onChange={(e) => setName(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <Button variant="primary" disabled={!enabled || busy || !name.trim()} onClick={() => setConfirmRegister(true)}>
          {t('settingsPage.kioskDevices.registerThis')}
        </Button>
      </div>
      {error && <div role="alert" style={{ color: '#DC2626', fontSize: '13px', marginBottom: '8px' }}>{error}</div>}

      {active.length === 0 ? (
        <div style={{ ...hint, padding: '12px 0', borderTop: '1px solid #E3E8EE' }}>{t('settingsPage.kioskDevices.empty')}</div>
      ) : active.map(d => (
        <div key={d.id} style={row}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540' }}>
              {d.name}{thisDeviceId === d.id ? ` · ${t('settingsPage.kioskDevices.thisDevice')}` : ''}
            </div>
            <div style={hint}>
              {t('settingsPage.kioskDevices.lastSeen')}: {d.last_seen_at ? formatDateTime(d.last_seen_at, timeZone) : '—'}
              {' · '}
              {t('settingsPage.kioskDevices.terminal')}: {d.terminal_host ? `${d.terminal_host}${d.terminal_port ? `:${d.terminal_port}` : ''}` : t('settingsPage.kioskDevices.terminalStore')}
            </div>
            {editId === d.id && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
                <FormInput value={editHost} placeholder="192.168.0.50" onChange={(e) => setEditHost(e.target.value)} style={{ maxWidth: 180 }} />
                <FormInput value={editPort} placeholder="33898" inputMode="numeric" onChange={(e) => setEditPort(e.target.value)} style={{ maxWidth: 100 }} />
                <Button variant="primary" size="small" onClick={() => saveTerminal(d)}>{t('settingsPage.kioskDevices.save')}</Button>
                <Button variant="secondary" size="small" onClick={() => setEditId(null)}>{t('settingsPage.kioskDevices.cancel')}</Button>
              </div>
            )}
          </div>
          {editId !== d.id && (
            <Button variant="outline" size="small" onClick={() => { setEditId(d.id); setEditHost(d.terminal_host || ''); setEditPort(d.terminal_port ? String(d.terminal_port) : ''); }}>
              {t('settingsPage.kioskDevices.editTerminal')}
            </Button>
          )}
          <Button variant="danger-outline" size="small" onClick={() => setRevokeTarget(d)}>{t('settingsPage.kioskDevices.revoke')}</Button>
        </div>
      ))}
      {revoked.length > 0 && (
        <div style={{ ...hint, marginTop: '8px' }}>
          {t('settingsPage.kioskDevices.revokedList', { names: revoked.map(d => d.name).join(', ') })}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmRegister}
        title={t('settingsPage.kioskDevices.confirmTitle')}
        message={t('settingsPage.kioskDevices.confirmMessage')}
        confirmText={t('settingsPage.kioskDevices.registerThis')}
        cancelText={t('settingsPage.kioskDevices.cancel')}
        type="warning"
        onConfirm={register}
        onCancel={() => setConfirmRegister(false)}
      />
      <ConfirmModal
        isOpen={!!revokeTarget}
        title={t('settingsPage.kioskDevices.revokeTitle')}
        message={t('settingsPage.kioskDevices.revokeMessage', { name: revokeTarget?.name || '' })}
        confirmText={t('settingsPage.kioskDevices.revoke')}
        cancelText={t('settingsPage.kioskDevices.cancel')}
        type="danger"
        onConfirm={revoke}
        onCancel={() => setRevokeTarget(null)}
      />
    </div>
  );
};

export default KioskDevicesCard;
