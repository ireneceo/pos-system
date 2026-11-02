/**
 * 안드로이드 앱(Purple POS) 프린터 설정 — 안내 · 자동 찾기 · 준비 점검.
 *
 * 2026-11-02 Irene «안드로이드앱에서 자동프린트 하는 거 실사용할거야. 제대로 도는지 안내가 알기쉽게 …
 *   와이파이 프린터 사용할 때 기본적인 기기들의 사용방법을 확실히 스탠다드로 넣어줘. 바로 따라하게. 손쉽게.
 *   그리고 와이파이 프린터가 자동으로 잡히는 게 있으면 다 제대로 하고.»
 *
 * 구조(설계 mobile-app/docs/ANDROID_APP_DESIGN.md §8-2 그대로):
 *  - 안드로이드에는 OS 프린터 목록이 없어서 «이름 → 주소» 를 태블릿에 등록한다(__NATIVE_PRINT_SETUP).
 *    매장 설정(printer_settings)은 «어느 곳 = 어느 이름» 만 갖는다. 이 화면은 그 등록을 쉽게 할 뿐이다.
 *  - 자동 찾기 = 이미 깔린 앱(0.3.2+)의 __NATIVE_ECR.discover 를 프린터 포트(9100)로 돌린다.
 *    새 앱 설치·심사 없이 지금 앱으로 된다. 보내는 바이트 = DLE EOT 1(10 04 01, ESC/POS «상태 알려 줘»)
 *    — 종이에 아무것도 찍지 않는 표준 상태 질의. 9100 포트가 열린 기기(=거의 언제나 영수증·주방 프린터)를 모은다.
 *  - 🔒 billPrint(인쇄 경로)는 이 파일이 읽지도 부르지도 않는다. 테스트 인쇄는 기존 버튼 그대로.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { NativeAppVersionRow } from '../../components/Common/NativeAppUpdateBanner';
import { findWifiPrinters, PRINTER_PORT } from '../../utils/wifiPrinterDiscovery';
import { parseVersion } from '../../utils/nativeAppUpdate';

export interface NativeSetupBridge {
  platform: string;
  getState: () => Promise<any>;
  addNetPrinter: (p: { name: string; host: string; port: number }) => Promise<{ ok: boolean; error?: string }>;
  removeNetPrinter: (name: string) => Promise<{ ok: boolean; error?: string }>;
  requestBtPermission: () => Promise<{ state: string }>;
  openSystemBluetoothSettings: () => Promise<{ ok: boolean }>;
  openAppSettings: () => Promise<{ ok: boolean }>;
}

type T = (k: string, o?: any) => string;

/** 찾은 주소에 붙일 기본 이름 — 사람이 바꿀 수 있다. 영문 대문자(티켓·설정 어디서나 깨지지 않게). */
const suggestName = (host: string, taken: string[]) => {
  const last = host.split('.').pop() || '';
  let name = `PRINTER ${last}`;
  let i = 2;
  while (taken.some((n) => n.toLowerCase() === name.toLowerCase())) name = `PRINTER ${last}-${i++}`;
  return name;
};

const btn = (primary = false): React.CSSProperties => ({
  padding: '8px 14px', fontSize: '13px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap',
  border: primary ? '1px solid #635BFF' : '1px solid #6B7280',
  background: primary ? '#635BFF' : '#fff', color: primary ? '#fff' : '#1F2937',
});
const inputStyle: React.CSSProperties = { padding: '8px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '13px', background: '#fff', boxSizing: 'border-box', minWidth: 0 };
const stepNo = (n: number) => (
  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#635BFF', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{n}</span>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1) 이 태블릿의 프린터 — 자동 찾기 + 등록 목록 + 직접 넣기 + 블루투스
// ─────────────────────────────────────────────────────────────────────────────
interface CardProps { bridge: NativeSetupBridge; onRegistryChange: () => void; t: T }

export const AndroidPrinterSetupCard: React.FC<CardProps> = ({ bridge, onRegistryChange, t }) => {
  const [state, setState] = useState<any>(null);
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState(String(PRINTER_PORT));
  const [error, setError] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [scan, setScan] = useState<{ running: boolean; done: boolean; supported: boolean; hosts: string[] }>({ running: false, done: false, supported: true, hosts: [] });
  const [newNames, setNewNames] = useState<Record<string, string>>({});
  const [moveTo, setMoveTo] = useState<Record<string, string>>({});

  const refresh = useCallback(async () => { setState(await bridge.getState()); }, [bridge]);
  useEffect(() => { refresh(); }, [refresh]);

  const net: Array<{ name: string; host: string; port: number }> = (state && state.net) || [];

  const runScan = async () => {
    setError(null);
    setScan({ running: true, done: false, supported: true, hosts: [] });
    const r = await findWifiPrinters();
    setScan({ running: false, done: true, supported: r.supported, hosts: r.hosts });
    const taken = net.map((p) => p.name);
    const names: Record<string, string> = {};
    r.hosts.forEach((h) => { if (!net.some((p) => p.host === h)) { names[h] = suggestName(h, [...taken, ...Object.values(names)]); } });
    setNewNames(names);
  };

  const register = async (n: string, h: string, p: number) => {
    setError(null);
    const r = await bridge.addNetPrinter({ name: n.trim(), host: h.trim(), port: p || PRINTER_PORT });
    if (!r.ok) { setError(r.error || 'ADD_FAILED'); return false; }
    await refresh();
    onRegistryChange(); // 새 이름이 아래 프린터 고르기 칸에 바로 나오게
    return true;
  };

  const addManual = async () => {
    if (await register(name, host, parseInt(port, 10) || PRINTER_PORT)) { setName(''); setHost(''); setPort(String(PRINTER_PORT)); setShowManual(false); }
  };

  const remove = async (n: string) => {
    setError(null);
    const r = await bridge.removeNetPrinter(n);
    if (!r.ok) { setError(r.error || 'REMOVE_FAILED'); return; }
    await refresh();
    onRegistryChange();
  };

  const requestBt = async () => { await bridge.requestBtPermission(); await refresh(); onRegistryChange(); };

  if (!state) return null;
  if (state.error) {
    return (
      <div style={{ marginBottom: '16px', padding: '14px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', fontSize: '13px', color: '#991B1B', lineHeight: 1.6 }}>
        {t('settings:printer.android.bridgeError', { defaultValue: 'The app’s printing bridge did not respond. Restart the app; if this persists the app needs to be reinstalled.' })}
      </div>
    );
  }

  const bt: string = state.btPermission;
  const bonded: Array<{ name: string; mac: string; likelyPrinter: boolean }> = state.bonded || [];
  const foundNew = scan.hosts.filter((h) => !net.some((p) => p.host === h));
  // 찾기를 돌렸는데 등록된 프린터가 옛 주소에서 안 보이면 = 주소가 바뀌었을 수 있다(공유기가 새 주소를 줌).
  const missing = scan.done && scan.supported ? net.filter((p) => !scan.hosts.includes(p.host)) : [];

  return (
    <div style={{ marginBottom: '16px', padding: '16px', background: '#FAFBFF', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#312E81', marginBottom: '4px' }}>
        {t('settings:printer.android.title', { defaultValue: 'Printers on this tablet' })}
      </div>
      <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6, marginBottom: '12px' }}>
        {t('settings:printer.android.desc2', { defaultValue: 'Find the Wi-Fi printers on this shop’s network and add them here. Then pick them by name for the counter and each kitchen below.' })}
      </div>
      <NativeAppVersionRow />

      {/* 자동 찾기 */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
        <button type="button" onClick={runScan} disabled={scan.running} style={{ ...btn(true), opacity: scan.running ? 0.6 : 1, cursor: scan.running ? 'wait' : 'pointer' }}>
          {scan.running
            ? t('settings:printer.android.scanning', { defaultValue: 'Searching this Wi-Fi… (up to about 40 seconds)' })
            : t('settings:printer.android.scanBtn', { defaultValue: 'Find Wi-Fi printers automatically' })}
        </button>
      </div>

      {scan.done && !scan.supported && (
        <div style={{ fontSize: '12px', color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '10px', marginBottom: '10px', lineHeight: 1.6 }}>
          {t('settings:printer.android.scanUnsupported', { defaultValue: 'This version of the app cannot search automatically. Update the app, or add the printer by its IP address below.' })}
        </div>
      )}
      {scan.done && scan.supported && scan.hosts.length === 0 && (
        <div style={{ fontSize: '12px', color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '10px', marginBottom: '10px', lineHeight: 1.6 }}>
          {t('settings:printer.android.scanNone', { defaultValue: 'No Wi-Fi printer found. Check: the printer is on, it is connected to the SAME Wi-Fi as this tablet (not a guest Wi-Fi), then search again. Steps are in the guide above.' })}
        </div>
      )}

      {foundNew.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#065F46', marginBottom: '6px' }}>
            {t('settings:printer.android.foundTitle', { defaultValue: 'Found — give each one a name and tap Add' })}
          </div>
          {foundNew.map((h) => (
            <div key={h} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', padding: '8px 10px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '6px', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#065F46', minWidth: '120px' }}>{h}</span>
              <input style={{ ...inputStyle, flex: '1 1 140px' }} value={newNames[h] || ''}
                onChange={(e) => setNewNames((m) => ({ ...m, [h]: e.target.value }))}
                placeholder={t('settings:printer.android.namePlaceholder', { defaultValue: 'Name (e.g. KITCHEN)' })} />
              <button type="button" disabled={!(newNames[h] || '').trim()} onClick={() => register(newNames[h] || '', h, PRINTER_PORT)} style={btn(true)}>
                {t('settings:printer.android.addFound', { defaultValue: 'Add' })}
              </button>
            </div>
          ))}
          <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.5 }}>
            {t('settings:printer.android.foundHint', { defaultValue: 'Not sure which is which? Add them all, then use “Test” next to each place below — the one that prints is that printer. Name them by place: COUNTER, KITCHEN, BAR.' })}
          </div>
        </div>
      )}

      {/* 등록된 네트워크 프린터 */}
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', margin: '6px 0' }}>
        {t('settings:printer.android.network', { defaultValue: 'Network printers (Wi-Fi)' })}
      </div>
      {net.length === 0 && (
        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
          {t('settings:printer.android.noneYet', { defaultValue: 'None registered yet.' })}
        </div>
      )}
      {net.map((p) => {
        const isMissing = missing.some((m) => m.name === p.name);
        return (
          <div key={p.name} style={{ padding: '8px 10px', background: '#fff', border: `1px solid ${isMissing ? '#FCD34D' : '#E5E7EB'}`, borderRadius: '6px', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '13px', color: '#1F2937' }}>
                <strong>{p.name}</strong>
                <span style={{ color: '#6B7280', fontFamily: 'monospace', marginLeft: '8px' }}>{p.host}:{p.port}</span>
                {scan.done && scan.supported && !isMissing && (
                  <span style={{ marginLeft: '8px', fontSize: '11px', color: '#065F46' }}>{t('settings:printer.android.reachable', { defaultValue: 'found on Wi-Fi' })}</span>
                )}
              </div>
              <button type="button" onClick={() => remove(p.name)}
                style={{ padding: '5px 10px', fontSize: '12px', border: '1px solid #EF4444', borderRadius: '6px', background: '#FEF2F2', color: '#B91C1C', cursor: 'pointer' }}
              >{t('common:delete', { defaultValue: 'Delete' })}</button>
            </div>
            {isMissing && (
              <div style={{ marginTop: '6px', fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>
                {t('settings:printer.android.missing', { defaultValue: 'Not found at this address. If the printer is on, its address probably changed — pick its new address:' })}
                {foundNew.length > 0 ? (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <select value={moveTo[p.name] || ''} onChange={(e) => setMoveTo((m) => ({ ...m, [p.name]: e.target.value }))} style={{ ...inputStyle, fontFamily: 'monospace' }}>
                      <option value="">{t('settings:printer.android.pickNewAddress', { defaultValue: 'New address…' })}</option>
                      {foundNew.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <button type="button" disabled={!moveTo[p.name]} onClick={() => register(p.name, moveTo[p.name], p.port)} style={btn(true)}>
                      {t('settings:printer.android.updateAddress', { defaultValue: 'Update' })}
                    </button>
                  </div>
                ) : (
                  <span> {t('settings:printer.android.missingNoCandidate', { defaultValue: '(no new printer found — check the printer is on and on this Wi-Fi)' })}</span>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* 직접 넣기(자동 찾기가 못 잡을 때) */}
      {!showManual ? (
        <button type="button" onClick={() => setShowManual(true)} style={{ ...btn(), marginTop: '4px', fontSize: '12px', padding: '6px 12px' }}>
          {t('settings:printer.android.manualOpen', { defaultValue: 'Add by IP address instead' })}
        </button>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) 72px auto', gap: '6px', marginTop: '8px' }}>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)}
            placeholder={t('settings:printer.android.namePlaceholder', { defaultValue: 'Name (e.g. KITCHEN)' })} />
          <input style={{ ...inputStyle, fontFamily: 'monospace' }} value={host} onChange={(e) => setHost(e.target.value)} placeholder="192.168.1.101" />
          <input style={{ ...inputStyle, fontFamily: 'monospace' }} value={port} onChange={(e) => setPort(e.target.value)} placeholder="9100" />
          <button type="button" onClick={addManual} disabled={!name.trim() || !host.trim()}
            style={{ ...btn(true), background: name.trim() && host.trim() ? '#635BFF' : '#C7D2FE', borderColor: name.trim() && host.trim() ? '#635BFF' : '#C7D2FE', cursor: name.trim() && host.trim() ? 'pointer' : 'not-allowed' }}
          >{t('settings:printer.android.add', { defaultValue: 'Register' })}</button>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '6px', fontSize: '12px', color: '#B91C1C' }}>
          {t(`settings:printer.android.err.${error}`, { defaultValue: error })}
        </div>
      )}

      {/* 블루투스 — 페어링은 안드로이드 설정에서, 여기선 목록만 */}
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', margin: '16px 0 6px' }}>
        {t('settings:printer.android.bluetooth', { defaultValue: 'Bluetooth printers' })}
      </div>
      {bt === 'granted' && bonded.length === 0 && (
        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
          {t('settings:printer.android.btNonePaired', { defaultValue: 'No paired devices. Pair the printer in the Android Bluetooth settings first.' })}
        </div>
      )}
      {bt === 'granted' && bonded.map((d) => (
        <div key={d.mac} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '6px', fontSize: '13px', color: '#1F2937' }}>
          <strong>{d.name}</strong>
          <span style={{ color: '#6B7280', fontFamily: 'monospace', fontSize: '12px' }}>{d.mac}</span>
          {d.likelyPrinter && (
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#065F46', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '4px', padding: '2px 6px' }}>
              {t('settings:printer.android.likelyPrinter', { defaultValue: 'printer' })}
            </span>
          )}
        </div>
      ))}
      {(bt === 'denied' || bt === 'denied_forever') && (
        <div style={{ fontSize: '12px', color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '10px', marginBottom: '8px', lineHeight: 1.6 }}>
          {bt === 'denied'
            ? t('settings:printer.android.btDenied', { defaultValue: 'Bluetooth permission is needed to see paired printers.' })
            : t('settings:printer.android.btDeniedForever', { defaultValue: 'Bluetooth permission was permanently denied. Enable it in the Android app settings.' })}
        </div>
      )}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {bt === 'denied' && (
          <button type="button" onClick={requestBt} style={btn()}>{t('settings:printer.android.btAllow', { defaultValue: 'Allow Bluetooth' })}</button>
        )}
        {bt === 'denied_forever' && (
          <button type="button" onClick={() => bridge.openAppSettings()} style={btn()}>{t('settings:printer.android.openAppSettings', { defaultValue: 'Open app settings' })}</button>
        )}
        <button type="button" onClick={() => bridge.openSystemBluetoothSettings()} style={btn()}>{t('settings:printer.android.openBtSettings', { defaultValue: 'Open Bluetooth settings' })}</button>
        <button type="button" onClick={() => { refresh(); onRegistryChange(); }} style={btn()}>{t('settings:printer.android.refresh', { defaultValue: 'Refresh' })}</button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2) 따라 하기 안내 — 처음 한 번(표준 순서) + 기종별 «주소 보는 법» + 안 나올 때
// ─────────────────────────────────────────────────────────────────────────────
export const AndroidPrintGuide: React.FC<{ t: T }> = ({ t }) => {
  const [open, setOpen] = useState<'none' | 'models' | 'trouble'>('none');
  const steps = [
    { title: t('settings:printer.androidGuide.s1Title', { defaultValue: 'Connect the printer to the shop network' }),
      body: t('settings:printer.androidGuide.s1Body', { defaultValue: 'Printer with a LAN port: plug a cable from the printer into the Wi-Fi router — done, it gets an address by itself (most stable, best for the kitchen). Wi-Fi-only printer: join it to the shop Wi-Fi once with the maker’s setup app. Use the SAME Wi-Fi as this tablet — not a guest Wi-Fi.' }) },
    { title: t('settings:printer.androidGuide.s2Title', { defaultValue: 'Find it on this tablet' }),
      body: t('settings:printer.androidGuide.s2Body', { defaultValue: 'Tap “Find Wi-Fi printers automatically” below. Give each found printer a name by its place — COUNTER, KITCHEN, BAR — and tap Add.' }) },
    { title: t('settings:printer.androidGuide.s3Title', { defaultValue: 'Choose a printer for each place' }),
      body: t('settings:printer.androidGuide.s3Body', { defaultValue: 'Further down: pick the counter (bill) printer and the printer of each kitchen station by name, then tap Test next to each. A ticket must come out.' }) },
    { title: t('settings:printer.androidGuide.s4Title', { defaultValue: 'Turn on auto-print' }),
      body: t('settings:printer.androidGuide.s4Body', { defaultValue: 'Switch on “Auto-print” for kitchen tickets (and the bill if you want). With 2 or more POS devices, only ONE device prints: on this tablet tap “Use on this device” on the POS that has auto-print on.' }) },
    { title: t('settings:printer.androidGuide.s5Title', { defaultValue: 'Leave the app open' }),
      body: t('settings:printer.androidGuide.s5Body', { defaultValue: 'Keep Purple POS open on this tablet (any screen), plugged into power and on Wi-Fi. The screen stays on by itself. If you close the app or switch the tablet off, orders wait and print when it is back.' }) },
  ];
  const models: Array<[string, string]> = [
    [t('settings:printer.androidGuide.mGeneric', { defaultValue: 'Most 80 mm receipt printers (Xprinter, Gprinter, Rongta, HPRT …)' }),
     t('settings:printer.androidGuide.mGenericHow', { defaultValue: 'Switch the printer OFF. Hold the FEED button, switch it ON, release after 2 seconds. The test page shows “IP Address”.' })],
    [t('settings:printer.androidGuide.mEpson', { defaultValue: 'Epson TM series (TM-m30, TM-T82X …)' }),
     t('settings:printer.androidGuide.mEpsonHow', { defaultValue: 'TM-m30: press the small button on the back once — a network sheet with the IP prints. Others: hold FEED while switching ON. Wi-Fi setup: Epson “TM Utility” app.' })],
    [t('settings:printer.androidGuide.mSunmi', { defaultValue: 'Sunmi tablet with a built-in printer' }),
     t('settings:printer.androidGuide.mSunmiHow', { defaultValue: 'No Wi-Fi setup needed. Allow Bluetooth below and pick “InnerPrinter”.' })],
    [t('settings:printer.androidGuide.mBt', { defaultValue: 'Bluetooth printer' }),
     t('settings:printer.androidGuide.mBtHow', { defaultValue: 'Pair it once in Android Bluetooth settings (PIN is usually 0000 or 1234), then allow Bluetooth below. It appears in the printer lists by its own name.' })],
  ];
  const trouble: string[] = [
    t('settings:printer.androidGuide.t1', { defaultValue: 'Nothing found: printer on? Same Wi-Fi as the tablet (not guest Wi-Fi)? Many Wi-Fi printers work only on 2.4 GHz Wi-Fi. Print its test page — if it shows an IP, use “Add by IP address”.' }),
    t('settings:printer.androidGuide.t2', { defaultValue: 'Test prints but orders do not print by themselves: check the “Ready to auto-print” box right below this guide — every line must be green.' }),
    t('settings:printer.androidGuide.t3', { defaultValue: 'Worked before, now nothing: the router may have given the printer a new address. Tap “Find Wi-Fi printers automatically” — a printer that moved shows “Not found at this address” with an Update button.' }),
    t('settings:printer.androidGuide.t4', { defaultValue: 'Blank or strange paper: set Print Format to “Text” (in this tab) and test again.' }),
  ];
  const toggle = (k: 'models' | 'trouble') => setOpen((o) => (o === k ? 'none' : k));
  const accBtn: React.CSSProperties = { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F9FAFB', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#1F2937', textAlign: 'left' };

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#312E81', marginBottom: '10px' }}>
        {t('settings:printer.androidGuide.title', { defaultValue: 'Set up printing on this tablet — 5 steps' })}
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((s, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            {stepNo(i + 1)}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{s.title}</div>
              <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>
      <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', marginTop: '4px' }}>
        <button type="button" style={accBtn} aria-expanded={open === 'models'} onClick={() => toggle('models')}>
          <span>{t('settings:printer.androidGuide.modelsTitle', { defaultValue: 'How to find a printer’s address — by printer type' })}</span>
          <span>{open === 'models' ? '−' : '+'}</span>
        </button>
        {open === 'models' && (
          <div style={{ padding: '10px 14px' }}>
            {models.map(([m, how]) => (
              <div key={m} style={{ padding: '8px 0', borderBottom: '1px solid #F1F4F8' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{m}</div>
                <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6 }}>{how}</div>
              </div>
            ))}
          </div>
        )}
        <button type="button" style={{ ...accBtn, borderTop: '1px solid #E5E7EB' }} aria-expanded={open === 'trouble'} onClick={() => toggle('trouble')}>
          <span>{t('settings:printer.androidGuide.troubleTitle', { defaultValue: 'Not printing? Check in this order' })}</span>
          <span>{open === 'trouble' ? '−' : '+'}</span>
        </button>
        {open === 'trouble' && (
          <ol style={{ margin: 0, padding: '10px 14px 10px 32px' }}>
            {trouble.map((x, i) => <li key={i} style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6, marginBottom: '6px' }}>{x}</li>)}
          </ol>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3) «자동 인쇄 준비됐나» — 지금 설정을 그대로 읽어 줄마다 초록/주황
//    (판정 기준 = 자동 인쇄 폴러의 실제 조건: 주방 자동인쇄 켬 · 다중 POS 면 이 기기가 자동인쇄 POS ·
//     고른 프린터 이름이 이 태블릿에 등록돼 있음 — 등록 안 된 이름은 앱이 PRINTER_NOT_FOUND 로 못 찍는다)
// ─────────────────────────────────────────────────────────────────────────────
export interface ReadinessTarget { label: string; address: string }
interface ReadinessProps {
  t: T;
  printerNames: string[];          // 이 태블릿이 아는 이름(등록 와이파이 + 페어링 블루투스)
  kitchenAutoPrint: boolean;
  kitchenTargets: ReadinessTarget[]; // 주방(스테이션마다 또는 주방 하나)
  billTarget: ReadinessTarget | null; // 이 기기의 계산대(빌) 프린터 — 꺼져 있으면 null
  workstationCount: number;
  thisDeviceIsPrintStation: boolean;
  appVersion: string | null;        // __NATIVE_PRINT.version (APK versionName)
}

// 0.4.1 = 그림(한글·로고) 티켓 백지 수정판(2026-11-02 Fable 설계 .claude/fable-design-20261102-android-raster.md).
// 그 전 앱은 그림 경로가 흰 종이를 «성공» 으로 낸다 → 한글 메뉴 매장은 쓰면 안 된다(§6).
const MIN_GOOD_APP = [0, 4, 1];
const appVersionOk = (v: string | null) => {
  const p = parseVersion(v);
  if (!p) return null; // 아직 모름(브릿지가 버전을 늦게 채움)
  for (let i = 0; i < 3; i++) { const a = p[i] || 0; if (a !== MIN_GOOD_APP[i]) return a > MIN_GOOD_APP[i]; }
  return true;
};

const IP_RE = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/;
const resolves = (addr: string, names: string[]) => !!addr && (IP_RE.test(addr) || names.some((n) => n.toLowerCase() === addr.toLowerCase()));

export const AndroidPrintReadiness: React.FC<ReadinessProps> = ({ t, printerNames, kitchenAutoPrint, kitchenTargets, billTarget, workstationCount, thisDeviceIsPrintStation, appVersion }) => {
  const rows: Array<{ ok: boolean; text: string }> = [];
  const verOk = appVersionOk(appVersion);
  if (verOk !== null) {
    rows.push({ ok: verOk, text: verOk
      ? t('settings:printer.androidReady.appOk', { defaultValue: 'App version {{v}}', v: appVersion })
      : t('settings:printer.androidReady.appOld', { defaultValue: 'App version {{v}} can print BLANK tickets for Korean/Chinese text and logos — update to 0.4.1 or later. Until then: English-only menus with Print Format “Text”.', v: appVersion }) });
  }
  rows.push({ ok: printerNames.length > 0, text: printerNames.length > 0
    ? t('settings:printer.androidReady.printersOk', { defaultValue: '{{n}} printer(s) registered on this tablet', n: printerNames.length })
    : t('settings:printer.androidReady.printersNo', { defaultValue: 'No printer registered on this tablet yet — step 2' }) });
  kitchenTargets.forEach((k) => {
    const ok = resolves(k.address, printerNames);
    rows.push({ ok, text: !k.address
      ? t('settings:printer.androidReady.targetNone', { defaultValue: '{{place}}: no printer chosen — step 3', place: k.label })
      : ok
        ? t('settings:printer.androidReady.targetOk', { defaultValue: '{{place}} → {{printer}}', place: k.label, printer: k.address })
        : t('settings:printer.androidReady.targetUnknown', { defaultValue: '{{place}} → “{{printer}}” is not registered on this tablet — add a printer with exactly this name (step 2)', place: k.label, printer: k.address }) });
  });
  if (billTarget) {
    const ok = resolves(billTarget.address, printerNames);
    rows.push({ ok, text: !billTarget.address
      ? t('settings:printer.androidReady.targetNone', { defaultValue: '{{place}}: no printer chosen — step 3', place: billTarget.label })
      : ok
        ? t('settings:printer.androidReady.targetOk', { defaultValue: '{{place}} → {{printer}}', place: billTarget.label, printer: billTarget.address })
        : t('settings:printer.androidReady.targetUnknown', { defaultValue: '{{place}} → “{{printer}}” is not registered on this tablet — add a printer with exactly this name (step 2)', place: billTarget.label, printer: billTarget.address }) });
  }
  rows.push({ ok: kitchenAutoPrint, text: kitchenAutoPrint
    ? t('settings:printer.androidReady.autoOn', { defaultValue: 'Kitchen auto-print is on' })
    : t('settings:printer.androidReady.autoOff', { defaultValue: 'Kitchen auto-print is off — step 4' }) });
  if (workstationCount > 1) {
    rows.push({ ok: thisDeviceIsPrintStation, text: thisDeviceIsPrintStation
      ? t('settings:printer.androidReady.stationOk', { defaultValue: 'This tablet is the device that auto-prints' })
      : t('settings:printer.androidReady.stationNo', { defaultValue: 'This tablet does NOT auto-print (another POS does). To print here: “Use on this device” on the POS with auto-print on — step 4' }) });
  }
  const allOk = rows.every((r) => r.ok);
  return (
    <div style={{ marginBottom: '16px', padding: '14px 16px', borderRadius: '10px', border: `1px solid ${allOk ? '#A7F3D0' : '#FCD34D'}`, background: allOk ? '#ECFDF5' : '#FFFBEB' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: allOk ? '#065F46' : '#92400E', marginBottom: '8px' }}>
        {allOk
          ? t('settings:printer.androidReady.titleOk', { defaultValue: 'Ready to auto-print on this tablet' })
          : t('settings:printer.androidReady.titleNo', { defaultValue: 'Not ready to auto-print yet — fix the orange lines' })}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', lineHeight: 1.6, color: r.ok ? '#065F46' : '#92400E' }}>
          <span style={{ fontWeight: 700, width: '14px', flexShrink: 0 }}>{r.ok ? '✓' : '!'}</span>
          <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{r.text}</span>
        </div>
      ))}
    </div>
  );
};
