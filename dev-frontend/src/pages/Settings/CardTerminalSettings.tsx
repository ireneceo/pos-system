/**
 * 매장 설정 › 결제 › 카드 — «카드 단말기 연동»(GHL ECR, 2026-10-01 · .claude/fable-design-20261001-ghl-ecr.md §3-3).
 * 값은 payment_settings.card.terminal 에 산다(기존 결제 설정 저장 경로·잠금 그대로).
 * 연결 테스트는 이 기기가 계산대 앱(브릿지 있음)일 때만 — 브라우저는 단말기에 닿을 수 없다.
 *
 * 2026-10-04 Irene 「이거 내가 직접 넣어야 해? … 같은 와이파이인지 확인하고 자동체크나 자동입력 필요해」:
 *   주소는 **사람이 넣는 값이 아니다** — 화면이 입력칸이라 수동처럼 보였다. 표시 전용으로 바꾸고,
 *   화면을 열면 저장된 주소로 연결을 1번 확인한다. 안 닿으면 이 기기의 와이파이에서 다시 찾아 저장한다.
 *   (결제 때도 같은 일을 한다 — utils/terminalSale.ts roundTrip.) 직접 입력은 «고급» 안에만 남긴다.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormInput, FormSelect, ModalButton as Button } from '../../components/UI/Modal';
import { getEcrBridge, ecrExchange, ecrDiscoverAndReport, ecrErrorBody } from '../../utils/nativeEcr';
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
  // 계산대 앱은 단말기 브릿지(window.__NATIVE_ECR)를 «페이지가 다 열린 뒤» 끼워 넣는다(MainActivity onPageLoaded).
  //   이 화면이 그보다 먼저 그려지면(설정에서 새로고침·앱을 이 화면에서 시작) 한 번 본 «없음» 이 굳어
  //   자동 확인·찾기 버튼이 영영 안 뜬다(2026-10-04 Irene 「자동 찾기 안되는데」 · 운영 단말기 기록 0건).
  //   그래서 처음 몇 초는 다시 확인한다 — 브라우저(브릿지 없음)는 그대로 «앱에서 여세요» 안내.
  const [bridge, setBridge] = useState<boolean>(() => !!getEcrBridge());
  useEffect(() => {
    if (bridge) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (getEcrBridge()) { setBridge(true); window.clearInterval(timer); }
      else if (tries >= 20) window.clearInterval(timer);   // 0.5초 × 20 = 10초
    }, 500);
    return () => window.clearInterval(timer);
  }, [bridge]);
  const [finding, setFinding] = useState(false);
  const [found, setFound] = useState<string[] | null>(null);
  // 화면을 열 때의 자동 확인 상태 — 'same' = 이 기기와 같은 와이파이에서 단말기가 응답함
  const [linkState, setLinkState] = useState<'idle' | 'checking' | 'same' | 'none'>('idle');
  const autoChecked = useRef(false);

  // 같은 와이파이에서 단말기 자동 찾기 — 1대면 바로 저장, 여러 대면 고르게 한다
  const runFind = async (): Promise<string | null> => {
    setFinding(true); setFound(null); setTestResult(null);
    try {
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` };
      const r = await fetch('/api/terminal/echo', { method: 'POST', headers, body: JSON.stringify({ restaurant_id: restaurantId, probe: true }) });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.success) { setTestResult({ ok: false, text: j?.message || t('settingsPage.cardTerminal.findNone') }); setLinkState('none'); return null; }
      const hosts = await ecrDiscoverAndReport(restaurantId, { port: Number(v.port) || 33898, transport: (v.transport as any) || 'http-hex', probeHex: j.data.request_hex });
      if (hosts.length === 1) { set({ host: hosts[0] }, true); setLinkState('same'); setTestResult({ ok: true, text: t('settingsPage.cardTerminal.findOne', { host: hosts[0] }) }); return hosts[0]; }
      if (hosts.length > 1) { setFound(hosts); setLinkState('same'); return null; }
      setLinkState('none');
      setTestResult({ ok: false, text: t('settingsPage.cardTerminal.findNone') });
      return null;
    } finally {
      setFinding(false);
    }
  };

  const runTest = async (silent = false): Promise<boolean> => {
    setTesting(true); if (!silent) setTestResult(null);
    try {
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` };
      const r = await fetch('/api/terminal/echo', { method: 'POST', headers, body: JSON.stringify({ restaurant_id: restaurantId }) });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.success) { if (!silent) setTestResult({ ok: false, text: j?.message || t('settingsPage.cardTerminal.testFailed') }); return false; }
      const job = j.data;
      const ex = await ecrExchange({ ...job.connection, payloadHex: job.request_hex, timeoutMs: 15000 });
      const up = await fetch(`/api/terminal/transactions/${job.id}/response`, {
        method: 'POST', headers, body: JSON.stringify(ex.ok === true ? { response_hex: ex.responseHex } : ecrErrorBody(ex as { error: string; rawHex?: string })),
      });
      const uj = await up.json().catch(() => null);
      const ok = up.ok && uj?.data?.status === 'approved';
      setLinkState(ok ? 'same' : 'none');
      if (!silent) setTestResult({ ok, text: ok ? t('settingsPage.cardTerminal.testOk') : `${t('settingsPage.cardTerminal.testFailed')}${ex.ok ? '' : ` (${(ex as { error: string }).error})`}` });
      return ok;
    } catch {
      if (!silent) setTestResult({ ok: false, text: t('settingsPage.cardTerminal.testFailed') });
      setLinkState('none');
      return false;
    } finally {
      setTesting(false);
    }
  };

  // 화면을 열면 1번: 저장된 주소로 확인 → 안 닿으면 이 와이파이에서 다시 찾아 저장(주소가 바뀐 경우).
  //   주소가 아직 없으면 바로 찾는다. 계산대 앱(브릿지)에서만 — 브라우저는 단말기에 닿지 못한다.
  useEffect(() => {
    if (autoChecked.current || !v.enabled || !bridge || !restaurantId) return;
    autoChecked.current = true;
    (async () => {
      setLinkState('checking');
      if (String(v.host || '').trim() && await runTest(true)) return;
      const host = await runFind();
      if (host && host !== v.host) setTestResult({ ok: true, text: t('settingsPage.cardTerminal.autoUpdated', { host }) });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v.enabled, bridge, restaurantId]);

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
        <div style={{ marginTop: '12px' }}>
          <div style={title}>{t('settingsPage.cardTerminal.host')}</div>
          <div style={hint}>{t('settingsPage.cardTerminal.hostAuto')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', fontVariantNumeric: 'tabular-nums' }}>
              {String(v.host || '').trim() || t('settingsPage.cardTerminal.notFoundYet')}
            </span>
            {bridge && linkState === 'checking' && <span style={hint}>{t('settingsPage.cardTerminal.checking')}</span>}
            {bridge && linkState === 'same' && (
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#059669' }}>✓ {t('settingsPage.cardTerminal.sameWifi')}</span>
            )}
            {bridge && linkState === 'none' && (
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#B45309' }}>{t('settingsPage.cardTerminal.notOnWifi')}</span>
            )}
          </div>
        </div>
      )}

      {v.enabled && (
        <div style={{ marginTop: '12px' }}>
          {bridge ? (
            <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => { runFind(); }} disabled={finding || testing}>
                {finding ? t('settingsPage.cardTerminal.finding') : (String(v.host || '').trim() ? t('settingsPage.cardTerminal.refind') : t('settingsPage.cardTerminal.find'))}
              </Button>
              <Button variant="secondary" onClick={() => { runTest(); }} disabled={testing || !String(v.host || '').trim()}>
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

      {/* 고급 — 자동 찾기가 막힌 망(손님 와이파이 격리 등)에서만 쓴다. 평소엔 접어 둔다. */}
      {v.enabled && (
        <details style={{ marginTop: '14px' }}>
          <summary style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>{t('settingsPage.cardTerminal.advanced')}</summary>
          <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div>
              <div style={title}>{t('settingsPage.cardTerminal.manualHost')}</div>
              <FormInput
                type="text" inputMode="text" autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="192.168.2.99"
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
        </details>
      )}
    </div>
  );
};

export default CardTerminalSettings;
