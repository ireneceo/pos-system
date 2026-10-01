/**
 * 매장 설정 › 결제 › 카드 — «카드 단말기 연동»(GHL ECR, 2026-10-01 · .claude/fable-design-20261001-ghl-ecr.md §3-3).
 * 값은 payment_settings.card.terminal 에 산다(기존 결제 설정 저장 경로·잠금 그대로).
 * 연결 테스트는 이 기기가 계산대 앱(브릿지 있음)일 때만 — 브라우저는 단말기에 닿을 수 없다.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormInput, FormSelect, ModalButton as Button } from '../../components/UI/Modal';
import { getEcrBridge, ecrExchange, ecrDiscover } from '../../utils/nativeEcr';
import { getAuthToken } from '../../utils/auth';

export interface CardTerminalValue { enabled?: boolean; provider?: string; host?: string; port?: number; transport?: string }

interface Props {
  value: CardTerminalValue | undefined;
  restaurantId: number | string | undefined;
  /** saveNow=true 면 부모가 바로 저장한다(토글·선택). 글자 입력은 칸을 벗어날 때 저장. */
  onChange: (next: CardTerminalValue, saveNow: boolean) => void;
  toggle: (checked: boolean, onToggle: (v: boolean) => void) => React.ReactNode;
}

const hint: React.CSSProperties = { fontSize: '12px', color: '#6B7C93', marginTop: '2px' };
const title: React.CSSProperties = { fontSize: '14px', fontWeight: 600, color: '#0A2540' };

const CardTerminalSettings: React.FC<Props> = ({ value, restaurantId, onChange, toggle }) => {
  const { t } = useTranslation('settings');
  const v: CardTerminalValue = { enabled: false, provider: 'ghl_ecr', host: '', port: 33898, transport: 'http-hex', ...(value || {}) };
  const set = (patch: Partial<CardTerminalValue>, saveNow: boolean) => onChange({ ...v, ...patch }, saveNow);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; text: string } | null>(null);
  const bridge = !!getEcrBridge();
  const [finding, setFinding] = useState(false);
  const [found, setFound] = useState<string[] | null>(null);

  // 같은 와이파이에서 단말기 자동 찾기 — 1대면 바로 저장, 여러 대면 고르게 한다
  const runFind = async () => {
    setFinding(true); setFound(null); setTestResult(null);
    try {
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` };
      const r = await fetch('/api/terminal/echo', { method: 'POST', headers, body: JSON.stringify({ restaurant_id: restaurantId }) });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.success) { setTestResult({ ok: false, text: j?.message || t('settingsPage.cardTerminal.findNone') }); return; }
      const hosts = await ecrDiscover({ port: Number(v.port) || 33898, transport: (v.transport as any) || 'http-hex', probeHex: j.data.request_hex });
      if (hosts.length === 1) { set({ host: hosts[0] }, true); setTestResult({ ok: true, text: t('settingsPage.cardTerminal.findOne', { host: hosts[0] }) }); }
      else if (hosts.length > 1) setFound(hosts);
      else setTestResult({ ok: false, text: t('settingsPage.cardTerminal.findNone') });
    } finally {
      setFinding(false);
    }
  };

  const runTest = async () => {
    setTesting(true); setTestResult(null);
    try {
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` };
      const r = await fetch('/api/terminal/echo', { method: 'POST', headers, body: JSON.stringify({ restaurant_id: restaurantId }) });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.success) { setTestResult({ ok: false, text: j?.message || t('settingsPage.cardTerminal.testFailed') }); return; }
      const job = j.data;
      const ex = await ecrExchange({ ...job.connection, payloadHex: job.request_hex, timeoutMs: 15000 });
      const up = await fetch(`/api/terminal/transactions/${job.id}/response`, {
        method: 'POST', headers, body: JSON.stringify(ex.ok === true ? { response_hex: ex.responseHex } : { error: (ex as { error: string }).error }),
      });
      const uj = await up.json().catch(() => null);
      const ok = up.ok && uj?.data?.status === 'approved';
      setTestResult({ ok, text: ok ? t('settingsPage.cardTerminal.testOk') : `${t('settingsPage.cardTerminal.testFailed')}${ex.ok ? '' : ` (${(ex as { error: string }).error})`}` });
    } catch {
      setTestResult({ ok: false, text: t('settingsPage.cardTerminal.testFailed') });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E3E8EE' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={title}>{t('settingsPage.cardTerminal.title')}</div>
          <div style={hint}>{t('settingsPage.cardTerminal.hint')}</div>
        </div>
        {toggle(!!v.enabled, (on) => set({ enabled: on }, true))}
      </div>

      {v.enabled && (
        <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div>
            <div style={title}>{t('settingsPage.cardTerminal.host')}</div>
            <div style={hint}>{t('settingsPage.cardTerminal.hostAuto')}</div>
            <FormInput
              type="text" inputMode="decimal" placeholder="192.168.2.99"
              value={v.host || ''}
              onChange={(e) => set({ host: e.target.value.replace(/[^0-9a-zA-Z.\-]/g, '').slice(0, 64) }, false)}
              onBlur={() => set({}, true)}
            />
          </div>
          <div>
            <div style={title}>{t('settingsPage.cardTerminal.port')}</div>
            <FormInput
              type="number" min={1} max={65535}
              value={v.port ?? 33898}
              onChange={(e) => set({ port: Math.max(1, Math.min(65535, parseInt(e.target.value, 10) || 33898)) }, false)}
              onBlur={() => set({}, true)}
            />
          </div>
          <div>
            <div style={title}>{t('settingsPage.cardTerminal.transport')}</div>
            <FormSelect value={v.transport || 'http-hex'} onChange={(e) => set({ transport: e.target.value }, true)}>
              <option value="http-hex">{t('settingsPage.cardTerminal.transportHttp')}</option>
              <option value="tcp-hex">{t('settingsPage.cardTerminal.transportTcpHex')}</option>
              <option value="tcp-bin">{t('settingsPage.cardTerminal.transportTcpBin')}</option>
            </FormSelect>
          </div>
        </div>
      )}

      {v.enabled && (
        <div style={{ marginTop: '12px' }}>
          {bridge ? (
            <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={runFind} disabled={finding || testing}>
                {finding ? t('settingsPage.cardTerminal.finding') : t('settingsPage.cardTerminal.find')}
              </Button>
              <Button variant="secondary" onClick={runTest} disabled={testing || !String(v.host || '').trim()}>
                {testing ? t('settingsPage.cardTerminal.testing') : t('settingsPage.cardTerminal.test')}
              </Button>
              {testResult && <span style={{ fontSize: '13px', fontWeight: 600, color: testResult.ok ? '#059669' : '#DC2626' }}>{testResult.text}</span>}
            </div>
            {found && (
              <div style={{ marginTop: '10px' }}>
                <div style={hint}>{t('settingsPage.cardTerminal.findMany')}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {found.map((h) => (
                    <Button key={h} variant="secondary" onClick={() => { set({ host: h }, true); setFound(null); setTestResult({ ok: true, text: t('settingsPage.cardTerminal.findOne', { host: h }) }); }}>{h}</Button>
                  ))}
                </div>
              </div>
            )}
            </div>
          ) : (
            <div style={hint}>{t('settingsPage.cardTerminal.needsApp')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardTerminalSettings;
