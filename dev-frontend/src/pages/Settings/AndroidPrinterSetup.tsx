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
import { btn, stepNo, Seg, SubLine, StepList, TroubleLink, GuideFold, ModelPicker, useSetupModel, espTouchSteps, makerJoin, selfTestLine } from './printerGuideKit';
import type { Step, SetupModel, T } from './printerGuideKit';

export interface NativeSetupBridge {
  platform: string;
  getState: () => Promise<any>;
  addNetPrinter: (p: { name: string; host: string; port: number }) => Promise<{ ok: boolean; error?: string }>;
  removeNetPrinter: (name: string) => Promise<{ ok: boolean; error?: string }>;
  requestBtPermission: () => Promise<{ state: string }>;
  openSystemBluetoothSettings: () => Promise<{ ok: boolean }>;
  openAppSettings: () => Promise<{ ok: boolean }>;
}


/** 찾은 주소에 붙일 기본 이름 — 사람이 바꿀 수 있다. 영문 대문자(티켓·설정 어디서나 깨지지 않게). */
const suggestName = (host: string, taken: string[]) => {
  const last = host.split('.').pop() || '';
  let name = `PRINTER ${last}`;
  let i = 2;
  while (taken.some((n) => n.toLowerCase() === name.toLowerCase())) name = `PRINTER ${last}-${i++}`;
  return name;
};

const inputStyle: React.CSSProperties = { padding: '8px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '13px', background: '#fff', boxSizing: 'border-box', minWidth: 0 };
export { btn, stepNo };

// ─────────────────────────────────────────────────────────────────────────────
// 0) 연결 방식 — 2026-11-04 Irene «원하는 연결방식에 맞게 제대로 안내들 정리 … 굳이 다 안내할 필요 있어?»
//    고른 방식의 순서만 보여 준다. 고른 값은 이 기기 브라우저 저장(편의값 — 매장 설정 아님, 인쇄 경로와 무관).
//    안내(위 카드) · 프린터 등록 카드(아래) · 자동 인쇄 준비 상자가 같은 값을 같이 본다.
// ─────────────────────────────────────────────────────────────────────────────
export type AndroidConn = 'wifi' | 'lan' | 'bluetooth' | 'builtin';
const CONN_KEY = 'android_printer_conn';
const CONNS: AndroidConn[] = ['wifi', 'lan', 'bluetooth', 'builtin'];
const readConn = (): AndroidConn | null => {
  try { const v = localStorage.getItem(CONN_KEY); return CONNS.includes(v as AndroidConn) ? (v as AndroidConn) : null; } catch { return null; }
};
let connNow: AndroidConn | null = typeof window !== 'undefined' ? readConn() : null;
const connListeners = new Set<() => void>();
export const useAndroidConn = (): [AndroidConn | null, (c: AndroidConn) => void] => {
  const [c, setC] = useState<AndroidConn | null>(connNow);
  useEffect(() => {
    const l = () => setC(connNow);
    connListeners.add(l);
    return () => { connListeners.delete(l); };
  }, []);
  const set = useCallback((v: AndroidConn) => {
    connNow = v;
    try { localStorage.setItem(CONN_KEY, v); } catch { /* 저장 못 해도 이 화면에선 그대로 */ }
    connListeners.forEach((f) => f());
  }, []);
  return [c, set];
};
const isNetConn = (c: AndroidConn | null) => c === 'wifi' || c === 'lan';
const isBtConn = (c: AndroidConn | null) => c === 'bluetooth' || c === 'builtin';

// 방식별 순서. 안내·준비 상자의 «N단계» 가 이 표 하나에서 나온다(번호가 서로 어긋나지 않게).
type StepKey = 'wifiJoin' | 'wifiCheck' | 'espInstall' | 'espMode' | 'espSend' | 'espCheck' | 'lanPlug' | 'find' | 'btPair' | 'btAllow' | 'builtinAllow' | 'pick' | 'auto' | 'keepOpen';
// 2026-11-08 b: Wi-Fi + PurpleHere 표준 프린터면 EspBluFi 4단계가 큰 목록에 평면으로 들어간다(wifiCheck 는 espCheck 가 대신).
const PLAN_WIFI_STD: StepKey[] = ['espInstall', 'espMode', 'espSend', 'espCheck', 'find', 'pick', 'auto', 'keepOpen'];
const planFor = (c: AndroidConn, m: SetupModel): StepKey[] => (c === 'wifi' && m === 'std' ? PLAN_WIFI_STD : PLAN[c]);
const PLAN: Record<AndroidConn, StepKey[]> = {
  wifi: ['wifiJoin', 'wifiCheck', 'find', 'pick', 'auto', 'keepOpen'],
  lan: ['lanPlug', 'find', 'pick', 'auto', 'keepOpen'],
  bluetooth: ['btPair', 'btAllow', 'pick', 'auto', 'keepOpen'],
  builtin: ['builtinAllow', 'pick', 'auto', 'keepOpen'],
};
// 준비 상자가 가리키는 자리: add = 이 태블릿에 프린터가 생기는 단계 · pick = 자리마다 고르기 · auto = 자동 인쇄 켜기
const ADD_STEP: Record<AndroidConn, StepKey> = { wifi: 'find', lan: 'find', bluetooth: 'btPair', builtin: 'builtinAllow' };
export const stepNumber = (c: AndroidConn | null, what: 'add' | 'pick' | 'auto', m: SetupModel = 'std'): number | null => {
  if (!c) return null;
  const key: StepKey = what === 'add' ? ADD_STEP[c] : what;
  const i = planFor(c, m).indexOf(key);
  return i >= 0 ? i + 1 : null;
};

const connLabel = (t: T, c: AndroidConn) => ({
  wifi: t('settings:printer.androidConn.wifi', { defaultValue: 'Wi-Fi printer' }),
  lan: t('settings:printer.androidConn.lan', { defaultValue: 'LAN cable printer' }),
  bluetooth: t('settings:printer.androidConn.bluetooth', { defaultValue: 'Bluetooth printer' }),
  builtin: t('settings:printer.androidConn.builtin', { defaultValue: 'Built-in printer (Sunmi etc.)' }),
}[c]);
const connSub = (t: T, c: AndroidConn) => ({
  wifi: t('settings:printer.androidConn.wifiSub', { defaultValue: 'Printer joins the shop Wi-Fi (no cable)' }),
  lan: t('settings:printer.androidConn.lanSub', { defaultValue: 'Cable from the printer to the router — most stable' }),
  bluetooth: t('settings:printer.androidConn.bluetoothSub', { defaultValue: 'Paired to this tablet, works without Wi-Fi' }),
  builtin: t('settings:printer.androidConn.builtinSub', { defaultValue: 'The printer is inside this POS device' }),
}[c]);

/** 연결 방식 고르기 — 고르기 한 줄 + 고른 것의 설명 한 줄(2026-11-08 b · 값·키 android_printer_conn 그대로). */
export const AndroidConnPicker: React.FC<{ t: T }> = ({ t }) => {
  const [conn, setConn] = useAndroidConn();
  return (
    <div>
      <Seg<AndroidConn> label={t('settings:printer.setupGuide.conn.label', { defaultValue: 'Connection' })}
        ariaLabel={t('settings:printer.androidConn.question', { defaultValue: 'How is the printer connected?' })}
        value={conn} onChange={setConn}
        options={CONNS.map((c) => ({ v: c, label: connLabel(t, c), tag: c === 'wifi' ? t('settings:printer.setupGuide.recommendShort', { defaultValue: 'Recommended' }) : undefined }))} />
      <SubLine>{conn ? connSub(t, conn) : t('settings:printer.androidConn.pickFirst', { defaultValue: 'Pick one — only the steps for that way are shown.' })}</SubLine>
    </div>
  );
};

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
  const [conn] = useAndroidConn();
  const [showOther, setShowOther] = useState(false);

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
  // 고른 방식의 칸만 연다. 이미 등록된 와이파이·랜 프린터는 방식과 상관없이 늘 보인다(지우거나 바꿀 수 있게).
  const showNet = isNetConn(conn) || net.length > 0 || (isBtConn(conn) && showOther);
  const showBt = isBtConn(conn) || (isNetConn(conn) && showOther);
  const desc = !conn
    ? t('settings:printer.android.descPick', { defaultValue: 'Pick how the printer is connected first — then this box shows only what you need.' })
    : conn === 'bluetooth'
      ? t('settings:printer.android.descBt', { defaultValue: 'Printers you pair in the Android Bluetooth settings show up here by their own name. Then pick them by name for the counter and each kitchen below.' })
      : conn === 'builtin'
        ? t('settings:printer.android.descBuiltin', { defaultValue: 'Allow Bluetooth once — the built-in printer then shows up as “InnerPrinter”. Then pick it for the counter and the kitchen below.' })
        : t('settings:printer.android.descNet', { defaultValue: 'Find the printers on this shop’s network (Wi-Fi or LAN cable) and add them here. Then pick them by name for the counter and each kitchen below.' });

  return (
    <div style={{ marginBottom: '16px', padding: '16px', background: '#FAFBFF', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#312E81', marginBottom: '4px' }}>
        {t('settings:printer.android.title', { defaultValue: 'Printers on this tablet' })}
      </div>
      <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6, marginBottom: '12px' }}>
        {desc}
      </div>
      <NativeAppVersionRow />

      {showNet && (<>
      {/* 자동 찾기 */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
        <button type="button" onClick={runScan} disabled={scan.running} style={{ ...btn(true), opacity: scan.running ? 0.6 : 1, cursor: scan.running ? 'wait' : 'pointer' }}>
          {scan.running
            ? t('settings:printer.android.scanning', { defaultValue: 'Searching this Wi-Fi… (up to about 40 seconds)' })
            : t('settings:printer.android.scanBtnNet', { defaultValue: 'Find printers automatically (Wi-Fi · LAN)' })}
        </button>
      </div>

      {scan.done && !scan.supported && (
        <div style={{ fontSize: '12px', color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '10px', marginBottom: '10px', lineHeight: 1.6 }}>
          {t('settings:printer.android.scanUnsupported', { defaultValue: 'This version of the app cannot search automatically. Update the app, or add the printer by its IP address below.' })}
        </div>
      )}
      {scan.done && scan.supported && scan.hosts.length === 0 && (
        <div style={{ fontSize: '12px', color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '10px', marginBottom: '10px', lineHeight: 1.6 }}>
          {t('settings:printer.android.scanNoneNet', { defaultValue: 'No printer found. Check: the printer is on · its self-test page shows an IP address (= it is on the network) · this tablet is on the SAME Wi-Fi (not guest Wi-Fi). Then search again — or type the IP from the self-test page with “Add by IP address”.' })}
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
        {t('settings:printer.android.networkNet', { defaultValue: 'Network printers (Wi-Fi · LAN cable)' })}
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

      </>)}

      {/* 블루투스 — 페어링은 안드로이드 설정에서, 여기선 목록만. 블루투스·내장 방식일 때만 연다. */}
      {showBt && (<>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', margin: showNet ? '16px 0 6px' : '6px 0' }}>
        {conn === 'builtin'
          ? t('settings:printer.android.builtinTitle', { defaultValue: 'Built-in printer' })
          : t('settings:printer.android.bluetooth', { defaultValue: 'Bluetooth printers' })}
      </div>
      {conn === 'builtin' && bt === 'granted' && bonded.length > 0 && !bonded.some((d) => /innerprinter/i.test(d.name)) && (
        <div style={{ fontSize: '12px', color: '#92400E', marginBottom: '8px', lineHeight: 1.5 }}>
          {t('settings:printer.android.builtinMissing', { defaultValue: 'No “InnerPrinter” on this device — it may not have a built-in printer. Pick “Bluetooth printer” or “Wi-Fi printer” above instead.' })}
        </div>
      )}
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
        {conn !== 'builtin' && (
          <button type="button" onClick={() => bridge.openSystemBluetoothSettings()} style={btn()}>{t('settings:printer.android.openBtSettings', { defaultValue: 'Open Bluetooth settings' })}</button>
        )}
        <button type="button" onClick={() => { refresh(); onRegistryChange(); }} style={btn()}>{t('settings:printer.android.refresh', { defaultValue: 'Refresh' })}</button>
      </div>
      </>)}

      {/* 한 매장에서 방식을 섞어 쓰는 경우(드묾) — 다른 방식 칸을 펼쳐 볼 수 있게 */}
      {conn && !showOther && (isNetConn(conn) || !showNet) && (
        <button type="button" onClick={() => setShowOther(true)}
          style={{ marginTop: '12px', padding: 0, border: 'none', background: 'none', color: '#4F46E5', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
          {isNetConn(conn)
            ? t('settings:printer.android.alsoBt', { defaultValue: 'Also using a Bluetooth printer on this tablet?' })
            : t('settings:printer.android.alsoNet', { defaultValue: 'Also using a Wi-Fi or LAN printer on this tablet?' })}
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2) 따라 하기 안내 — 2026-11-08 b(Fable): 상자 없이 고르기 두 줄(연결 방식 · 내 프린터 기종) → 번호 목록 하나.
//    Wi-Fi + 표준 프린터면 EspBluFi 4단계가 목록 안에 평면으로. 다른 기종은 그 기종 방법 한 문단.
// ─────────────────────────────────────────────────────────────────────────────
export const AndroidPrintGuide: React.FC<{ t: T }> = ({ t }) => {
  const [conn] = useAndroidConn();
  const [model] = useSetupModel();
  const g = (k: string, d: string) => t(`settings:printer.androidGuide.${k}`, { defaultValue: d });
  const esp = espTouchSteps(t);
  const espBy = (k: string) => esp.find((x) => x.key === k) as Step;
  const STEPS: Record<StepKey, Step> = {
    wifiJoin: model !== 'std'
      ? { key: 'wifiJoin', ...makerJoin(t, model as Exclude<SetupModel, 'std'>) }
      : { key: 'wifiJoin', title: g('wifiJoinTitle', 'Join the printer to the shop Wi-Fi — the way your printer model does it'), body: g('wifiJoinBody', 'Do this once per printer. Use the Wi-Fi this tablet uses — not the guest Wi-Fi. Most Wi-Fi printers only see 2.4 GHz Wi-Fi: if the router has two names (e.g. “Shop” and “Shop-5G”), pick the one without 5G.') },
    wifiCheck: { key: 'wifiCheck', title: g('wifiCheckTitle', 'Check it joined — print the self-test page'),
      body: g('wifiCheckBody', 'An address like 192.168.x.x under “IP Address” = it is on the Wi-Fi. 0.0.0.0, 169.254.x.x or no IP = not yet — go back to step 1. Keep the page: the IP is useful if the search below misses it. Also check this tablet’s Android Wi-Fi shows the SAME Wi-Fi name.'),
      lines: [selfTestLine(t, model)] },
    espInstall: espBy('espInstall'), espMode: espBy('espMode'), espSend: espBy('espSend'), espCheck: espBy('espCheck'),
    lanPlug: { key: 'lanPlug', title: g('lanPlugTitle', 'Plug the printer into the router'),
      body: g('lanPlugBody', 'LAN cable from the printer’s LAN port to the shop router (or a switch on it). Switch the printer on and wait about a minute — it gets an address by itself, no setup. This tablet must be on the Wi-Fi of that same router (not guest Wi-Fi). To check: print the self-test page — an IP like 192.168.x.x means it is connected.'),
      lines: [selfTestLine(t, model)] },
    find: { key: 'find', title: g('findTitle', 'Add it on this tablet'),
      body: g('findBody', 'Tap “Find printers automatically” in the box below. Give each found printer the name of its place — COUNTER, KITCHEN, BAR — and tap Add. Not found? Use “Add by IP address” with the IP from the self-test page.') },
    btPair: { key: 'btPair', title: g('btPairTitle', 'Pair the printer with this tablet'),
      body: g('btPairBody', 'Switch the printer on. On this tablet open Android Settings › Bluetooth (the box below has an “Open Bluetooth settings” button), tap the printer’s name and pair — the PIN is usually 0000 or 1234. A Bluetooth printer connects to one device at a time: unpair it from any other phone or tablet first.') },
    btAllow: { key: 'btAllow', title: g('btAllowTitle', 'Allow Bluetooth for Purple POS'),
      body: g('btAllowBody', 'In the box below tap “Allow Bluetooth” → Allow. The paired printer then appears in the list by its own name. Already allowed? The list shows it straight away — tap Refresh after pairing.') },
    builtinAllow: { key: 'builtinAllow', title: g('builtinAllowTitle', 'Allow Bluetooth — the built-in printer appears'),
      body: g('builtinAllowBody', 'No Wi-Fi or pairing needed. In the box below tap “Allow Bluetooth” → Allow. The built-in printer shows up as “InnerPrinter” (Android lists built-in printers through Bluetooth).') },
    pick: { key: 'pick', title: g('pickTitle', 'Choose a printer for each place'),
      body: g('pickBody', 'Further down: pick the counter (bill) printer and the printer of each kitchen station by the name from the box below, then tap Test next to each. A ticket must come out.') },
    auto: { key: 'auto', title: g('autoTitle', 'Turn on auto-print'),
      body: g('autoBody', 'Switch on “Auto-print” for kitchen tickets (and the bill if you want). With 2 or more POS devices, only ONE device prints: on this tablet tap “Use on this device” on the POS that has auto-print on.'),
      lines: [t('settings:printer.assign.wsAutoPrintHint', { defaultValue: 'With 2 or more POS places: the device that tapped “Use on this device” on a place with this switch ON also prints the kitchen tickets. Switch it off on places that only take orders.' })] },
    keepOpen: { key: 'keepOpen', title: g('keepOpenTitle', 'Leave the app open'),
      body: isBtConn(conn)
        ? g('keepOpenBodyBt', 'Keep Purple POS open on this tablet (any screen) and plugged into power, with the printer switched on and nearby (Bluetooth reaches about 10 m). If you close the app or switch the tablet off, orders wait and print when it is back.')
        : g('keepOpenBody', 'Keep Purple POS open on this tablet (any screen), plugged into power and on Wi-Fi. The screen stays on by itself. If you close the app or switch the tablet off, orders wait and print when it is back.') },
  };

  // 안 나올 때 — 고른 방식의 것만(목록 끝 «안 될 때 ▸» 글 링크)
  const trouble: string[] = !conn ? [] : isNetConn(conn)
    ? [
        conn === 'lan'
          ? g('tLanNone', 'Nothing found: printer on? Cable firmly in both ends, and the light next to the printer’s LAN port blinking? This tablet on the Wi-Fi of the same router (not guest Wi-Fi)? Self-test page shows an IP → use “Add by IP address”.')
          : g('tWifiNone', 'Nothing found: printer on? Self-test page shows an IP (step 2)? Same Wi-Fi as the tablet, not guest Wi-Fi, and 2.4 GHz? Self-test page shows an IP → use “Add by IP address”.'),
        g('tAuto', 'Test prints but orders do not print by themselves: check the “Ready to auto-print” box right below this guide — every line must be green.'),
        g('tMoved', 'Worked before, now nothing: the router may have given the printer a new address. Tap “Find printers automatically” — a printer that moved shows “Not found at this address” with an Update button.'),
        g('tBlank', 'Blank or strange paper: set Print Format to “Text” (in this tab) and test again.'),
      ]
    : [
        conn === 'builtin'
          ? g('tBuiltinNone', 'No “InnerPrinter” in the list: is Bluetooth allowed (step 1)? Tap Refresh. Still nothing — this device may have no built-in printer.')
          : g('tBtNone', 'Printer not in the list: paired in Android Bluetooth settings (step 1)? Bluetooth allowed (step 2)? Tap Refresh.'),
        conn === 'builtin'
          ? g('tBuiltinPaper', 'Test does not print: paper roll in and the cover closed? Restart the device and test again.')
          : g('tBtTest', 'Test does not print: printer on and nearby? Not connected to another phone or tablet? Switch the printer off and on, then test again.'),
        g('tAuto', 'Test prints but orders do not print by themselves: check the “Ready to auto-print” box right below this guide — every line must be green.'),
        g('tBlank', 'Blank or strange paper: set Print Format to “Text” (in this tab) and test again.'),
      ];
  const plan = conn ? planFor(conn, model) : [];

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#312E81', marginBottom: '10px' }}>
        {conn
          ? t('settings:printer.androidGuide.titleConn', { defaultValue: 'Set up printing on this tablet — {{conn}}, {{n}} steps', conn: connLabel(t, conn), n: plan.length })
          : t('settings:printer.androidGuide.titlePick', { defaultValue: 'Set up printing on this tablet' })}
      </div>
      {/* 연결 방식 고르기는 아래 등록 칸이 따라 바뀌어 늘 보이고, 단계별 설정 방법만 접힘 (2026-11-09 Irene «접혀있게 해. 보고 싶은 사람만») */}
      <AndroidConnPicker t={t} />
      {conn && (
        <GuideFold t={t} testId="android-guide-fold">
          {isNetConn(conn) && <ModelPicker t={t} />}
          <StepList t={t} testId="android-steps" steps={plan.map((k) => STEPS[k])} />
          <TroubleLink t={t} lines={trouble} label={t('settings:printer.androidGuide.troubleTitle', { defaultValue: 'Not printing? Check in this order' })} />
        </GuideFold>
      )}
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
  const [conn] = useAndroidConn();
  const [model] = useSetupModel();
  // «— N단계» 는 고른 연결 방식의 순서 번호(안내와 같은 표 PLAN). 방식을 안 골랐으면 «위에서 연결 방식 고르기».
  const ref = (what: 'add' | 'pick' | 'auto') => {
    const n = stepNumber(conn, what, model);
    return n
      ? t('settings:printer.androidReady.stepRef', { defaultValue: ' — step {{n}}', n })
      : t('settings:printer.androidReady.pickConnRef', { defaultValue: ' — first pick how the printer is connected (above)' });
  };
  const unknownText = (place: string, printer: string) => isBtConn(conn)
    ? t('settings:printer.androidReady.targetUnknownBt', { defaultValue: '{{place}} → “{{printer}}” is not paired with this tablet (or Bluetooth is not allowed){{ref}}', place, printer, ref: ref('add') })
    : t('settings:printer.androidReady.targetUnknownNet', { defaultValue: '{{place}} → “{{printer}}” is not on this tablet — add a printer with exactly this name{{ref}}', place, printer, ref: ref('add') });
  const rows: Array<{ ok: boolean; text: string }> = [];
  const verOk = appVersionOk(appVersion);
  if (verOk !== null) {
    rows.push({ ok: verOk, text: verOk
      ? t('settings:printer.androidReady.appOk', { defaultValue: 'App version {{v}}', v: appVersion })
      : t('settings:printer.androidReady.appOld', { defaultValue: 'App version {{v}} can print BLANK tickets for Korean/Chinese text and logos — update to 0.4.1 or later. Until then: English-only menus with Print Format “Text”.', v: appVersion }) });
  }
  rows.push({ ok: printerNames.length > 0, text: printerNames.length > 0
    ? t('settings:printer.androidReady.printersOk', { defaultValue: '{{n}} printer(s) registered on this tablet', n: printerNames.length })
    : t('settings:printer.androidReady.printersNone', { defaultValue: 'No printer on this tablet yet{{ref}}', ref: ref('add') }) });
  const targetRow = (k: ReadinessTarget) => {
    const ok = resolves(k.address, printerNames);
    rows.push({ ok, text: !k.address
      ? t('settings:printer.androidReady.targetNoneRef', { defaultValue: '{{place}}: no printer chosen{{ref}}', place: k.label, ref: ref('pick') })
      : ok
        ? t('settings:printer.androidReady.targetOk', { defaultValue: '{{place}} → {{printer}}', place: k.label, printer: k.address })
        : unknownText(k.label, k.address) });
  };
  kitchenTargets.forEach(targetRow);
  if (billTarget) targetRow(billTarget);
  rows.push({ ok: kitchenAutoPrint, text: kitchenAutoPrint
    ? t('settings:printer.androidReady.autoOn', { defaultValue: 'Kitchen auto-print is on' })
    : t('settings:printer.androidReady.autoOffRef', { defaultValue: 'Kitchen auto-print is off{{ref}}', ref: ref('auto') }) });
  if (workstationCount > 1) {
    rows.push({ ok: thisDeviceIsPrintStation, text: thisDeviceIsPrintStation
      ? t('settings:printer.androidReady.stationOk', { defaultValue: 'This tablet is the device that auto-prints' })
      : t('settings:printer.androidReady.stationNoRef', { defaultValue: 'This tablet does NOT auto-print (another POS does). To print here: “Use on this device” on the POS with auto-print on{{ref}}', ref: ref('auto') }) });
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
