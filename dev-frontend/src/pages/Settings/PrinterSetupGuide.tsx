/**
 * 설정 › 프린터 §1 «이 기기와 프린터 연결» — 기기 자동 판정 · 연결 방식 · 순서 · 추천 기종 · 프린터 2대.
 *
 * 2026-11-08 Irene «와이파이 프린터 쓸건지 말건지 안드로이드앱인지 아닌지 … EspTouch 다운받고 설정하는 거 …
 *   우리가 쓰는 기종 추천 … 2대 프린터 … 안드로이드앱/pwa/웹브라우저/PC 다 자동체크되거나 선택해서 …
 *   레스토랑 설정 문제 안되게» → Fable 설계 .claude/fable-design-20261108-printer-setup-guide.md (D1~D6).
 *
 * 이 파일은 안내만 한다. 기기 판정·연결 방식·펼침 상태는 이 기기 브라우저 저장(편의값)이고
 * 매장 설정(printer_settings)을 읽기만 하며 저장하지 않는다. 🔒 인쇄 경로(billPrint 등)는 부르지 않는다.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { stepNo, subList, selfTestList, StdPrinterItem, StdRegister, wifiJoinOthers, accordionStyles } from './AndroidPrinterSetup';
import { SETUP_DEVICE_KEY, type SetupDevice, type SetupOs } from '../../utils/printDiagnostics';

export { ESPTOUCH_IOS_URL, ESPTOUCH_ANDROID_APK_URL } from './AndroidPrinterSetup';

type T = (k: string, o?: any) => string;
const k = (t: T, key: string, d: string, o?: any) => t(`settings:printer.setupGuide.${key}`, { defaultValue: d, ...(o || {}) });

// ─── D1 이 기기 줄 ───────────────────────────────────────────────────────────
export const deviceLabel = (t: T, device: SetupDevice, os: SetupOs): string => {
  if (device === 'android-app') return k(t, 'device.androidApp', 'Purple POS Android app');
  if (device === 'windows-app') return k(t, 'device.windowsApp', 'Purple POS Windows app');
  if (device === 'android-browser') return k(t, 'device.androidBrowser', 'Android tablet · web browser');
  if (device === 'ipad-browser') return k(t, 'device.ipadBrowser', 'iPad · web browser');
  const pc = os === 'windows' ? k(t, 'device.pcWindows', 'Windows PC') : os === 'mac' ? k(t, 'device.pcMac', 'Mac') : k(t, 'device.pc', 'PC');
  return k(t, 'device.pcBrowser', '{{pc}} · web browser', { pc });
};

export const DeviceLine: React.FC<{
  t: T; device: SetupDevice; detected: SetupDevice; os: SetupOs; standalone: boolean; overridable: boolean;
  onChange: (d: SetupDevice | null) => void;
}> = ({ t, device, detected, os, standalone, overridable, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', padding: '10px 14px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '14px' }}>
    <div style={{ fontSize: '13px', color: '#1F2937', minWidth: 0 }}>
      <span style={{ color: '#6B7280' }}>{k(t, 'device.this', 'This device:')}</span>{' '}
      <strong data-testid="setup-device-label">{deviceLabel(t, device, os)}</strong>
      {standalone && (device === 'pc-browser' || device === 'android-browser' || device === 'ipad-browser') && (
        <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
          {k(t, 'device.pwa', 'Installed on the home screen as a web app (PWA) — printing works the same as in the browser.')}
        </div>
      )}
    </div>
    {overridable && (
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280' }}>
        {k(t, 'device.notThis', 'Not right?')}
        <select
          value={device}
          onChange={(e) => onChange(e.target.value === detected ? null : (e.target.value as SetupDevice))}
          style={{ padding: '5px 8px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '12px', background: '#fff' }}
        >
          <option value="pc-browser">{deviceLabel(t, 'pc-browser', os === 'android' || os === 'ios' ? 'windows' : os)}</option>
          <option value="android-browser">{deviceLabel(t, 'android-browser', 'android')}</option>
          <option value="ipad-browser">{deviceLabel(t, 'ipad-browser', 'ios')}</option>
        </select>
      </label>
    )}
  </div>
);

/** 기기 판정 바꾸기 저장(브라우저 편의값). null = 자동 판정으로 되돌림. */
export const saveDeviceOverride = (d: SetupDevice | null) => {
  try { if (d) localStorage.setItem(SETUP_DEVICE_KEY, d); else localStorage.removeItem(SETUP_DEVICE_KEY); } catch { /* 저장 못 해도 화면에선 그대로 */ }
};

// ─── D2·D3 연결 방식 (PC 브라우저 · Windows 앱) ──────────────────────────────
export type SetupConn = 'wifi' | 'lan' | 'usb';
const CONN_KEY = 'printer_setup_conn';
const CONNS: SetupConn[] = ['wifi', 'lan', 'usb'];
const readConn = (): SetupConn | null => {
  try { const v = localStorage.getItem(CONN_KEY); return CONNS.includes(v as SetupConn) ? (v as SetupConn) : null; } catch { return null; }
};
export const useSetupConn = (): [SetupConn | null, (c: SetupConn) => void] => {
  const [c, setC] = useState<SetupConn | null>(() => readConn());
  const set = useCallback((v: SetupConn) => { setC(v); try { localStorage.setItem(CONN_KEY, v); } catch { /* ignore */ } }, []);
  return [c, set];
};

export const SetupConnPicker: React.FC<{ t: T; conn: SetupConn | null; onChange: (c: SetupConn) => void }> = ({ t, conn, onChange }) => {
  const label = (c: SetupConn) => ({ wifi: k(t, 'conn.wifi', 'Wi-Fi'), lan: k(t, 'conn.lan', 'LAN cable'), usb: k(t, 'conn.usb', 'USB cable') }[c]);
  const sub = (c: SetupConn) => ({
    wifi: k(t, 'conn.wifiSub', 'Printer joins the shop Wi-Fi — usual for the kitchen'),
    lan: k(t, 'conn.lanSub', 'Cable from the printer to the router — most stable'),
    usb: k(t, 'conn.usbSub', 'Cable from the printer to this PC — usual for the counter'),
  }[c]);
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>{k(t, 'conn.question', 'How is the printer connected?')}</div>
      {!conn && (
        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px', lineHeight: 1.5 }}>
          {t('settings:printer.androidConn.pickFirst', { defaultValue: 'Pick one — only the steps for that way are shown.' })}
        </div>
      )}
      <div role="radiogroup" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '6px' }}>
        {CONNS.map((c) => {
          const on = conn === c;
          return (
            <button key={c} type="button" role="radio" aria-checked={on} onClick={() => onChange(c)}
              style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', minWidth: 0, border: on ? '2px solid #635BFF' : '1px solid #D1D5DB', background: on ? '#EEF2FF' : '#fff' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: on ? '#312E81' : '#1F2937' }}>{on ? '● ' : '○ '}{label(c)}</div>
              {c === 'wifi' && <div style={{ fontSize: '11px', fontWeight: 600, color: '#065F46', marginTop: '2px' }}>{k(t, 'recommendTag', 'Recommended — PurpleHere standard printer')}</div>}
              <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.4, marginTop: '2px' }}>{sub(c)}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── D5 순서 (PC 브라우저 · Windows 앱) ──────────────────────────────────────
type PcStep = 'wifiJoin' | 'check' | 'lanPlug' | 'register' | 'usbPlug' | 'helper' | 'pick' | 'auto' | 'keepOpen';
const PC_PLAN: Record<SetupConn, PcStep[]> = {
  wifi: ['wifiJoin', 'check', 'register', 'helper', 'pick', 'auto', 'keepOpen'],
  lan: ['lanPlug', 'check', 'register', 'helper', 'pick', 'auto', 'keepOpen'],
  usb: ['usbPlug', 'helper', 'pick', 'auto', 'keepOpen'],
};

export const SetupSteps: React.FC<{ t: T; device: 'pc-browser' | 'windows-app'; conn: SetupConn }> = ({ t, device, conn }) => {
  const isApp = device === 'windows-app';
  const S: Record<PcStep, { title: string; body: string; extra?: React.ReactNode }> = {
    wifiJoin: { title: k(t, 'pc.wifiJoinTitle', 'Join the printer to the shop Wi-Fi — each printer model does it its own way'),
      body: k(t, 'pc.wifiJoinBody', 'Once per printer. Use the network this PC is on — not the guest Wi-Fi. Most Wi-Fi printers only see 2.4 GHz: if the router has two names (“Shop” and “Shop-5G”), pick the one without 5G.'),
      extra: (<><StdPrinterItem t={t} device={device} />{subList(wifiJoinOthers(t))}</>) },
    check: { title: k(t, 'pc.checkTitle', 'Check it joined — print the self-test page'),
      body: k(t, 'pc.checkBody', 'An address like 192.168.x.x (“WIFI IP” or “IP Address”) = it is on the network. 0.0.0.0, 169.254.x.x or no IP = not yet — go back to step 1. Keep the page: you need the IP in the next step.'),
      extra: subList(selfTestList(t)) },
    lanPlug: { title: k(t, 'pc.lanPlugTitle', 'Plug the printer into the router'),
      body: k(t, 'pc.lanPlugBody', 'LAN cable from the printer’s LAN port to the shop router (or a switch on it). Switch the printer on and wait about a minute — it gets an address by itself. This PC must be on the same router’s network (not the guest Wi-Fi).') },
    register: { title: k(t, 'pc.registerTitle', 'Add the printer to this PC'), body: '',
      extra: <StdRegister t={t} device={device} /> },
    usbPlug: { title: k(t, 'pc.usbPlugTitle', 'Plug the printer into this PC with USB'),
      body: k(t, 'pc.usbPlugBody', 'Windows installs it by itself (if not, install the maker’s driver from the box). Open Windows Settings › Printers and check its name — you can rename it to COUNTER. Mac: System Settings › Printers & Scanners › add it.') },
    helper: isApp
      ? { title: k(t, 'pc.helperAppTitle', 'Nothing to install — this app prints directly'),
          body: k(t, 'pc.helperAppBody', 'The app reads this PC’s printer list by itself (the drop-downs in section 2). Not in the list? Tap “Find Printers” right below.') }
      : { title: k(t, 'pc.helperQzTitle', 'Install the print helper (QZ Tray) on this PC'),
          body: k(t, 'pc.helperQzBody', 'Use the three boxes right below: 1 download and run once → 2 Check Connection → 3 Find Printers. Do this on every PC that prints.') },
    pick: { title: k(t, 'pc.pickTitle', 'Choose a printer for each place'),
      body: conn === 'usb'
        ? k(t, 'pc.pickBodyUsb', 'In section 2 below pick the counter printer by its name and tap Test — a ticket must come out. Blank paper? Set Print Format to “Text” in section 3.')
        : k(t, 'pc.pickBody', 'In section 2 below pick the printer for the counter and each kitchen by its name (or IP) and tap Test next to each — a ticket must come out.') },
    auto: { title: k(t, 'pc.autoTitle', 'Turn on auto-print'),
      body: k(t, 'pc.autoBody', 'Switch on kitchen auto-print in section 2. With 2 or more POS devices only ONE prints the kitchen tickets: tap “Use on this device” on the POS place that has auto-print on, on this PC.') },
    keepOpen: { title: k(t, 'pc.keepOpenTitle', 'Keep this PC on'),
      body: isApp
        ? k(t, 'pc.keepOpenBodyApp', 'Keep the Purple POS app open on this PC (any screen). If it is closed or the PC is off, orders wait and print when it is back.')
        : k(t, 'pc.keepOpenBody', 'Keep this PC on with Purple open in the browser (any screen). If the tab is closed or the PC is off, orders wait and print when it is back.') },
  };
  const plan = PC_PLAN[conn];
  return (
    <ol data-testid="setup-steps" style={{ listStyle: 'none', margin: '0 0 12px', padding: 0 }}>
      {plan.map((key, i) => {
        const s = S[key];
        return (
          <li key={key} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            {stepNo(i + 1)}
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{s.title}</div>
              {s.body && <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6 }}>{s.body}</div>}
              {s.extra && <div style={{ marginTop: s.body ? 0 : '4px' }}>{s.extra}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

// ─── D2 권고 상자 (안드로이드 브라우저 · iPad) ───────────────────────────────
export const RecommendAppBox: React.FC<{ t: T }> = ({ t }) => (
  <div style={{ marginBottom: '14px', padding: '14px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', fontSize: '13px', color: '#065F46', lineHeight: 1.6 }}>
    <strong>{k(t, 'appBox.title', 'Easiest: install the Purple POS app on this tablet')}</strong>
    <div>{k(t, 'appBox.body', 'The app prints by itself, finds Wi-Fi printers automatically and prints Korean and Chinese menus. No other print app needed.')}</div>
    <a href="/download" style={{ display: 'inline-block', marginTop: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 700, borderRadius: '6px', background: '#635BFF', color: '#fff', textDecoration: 'none' }}>
      {k(t, 'appBox.btn', 'Get the app')}
    </a>
  </div>
);

export const IpadBox: React.FC<{ t: T }> = ({ t }) => (
  <div style={{ marginBottom: '14px', padding: '14px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
    <strong>{k(t, 'ipadBox.title', 'An iPad can only print through the print window (AirPrint)')}</strong>
    <div>{k(t, 'ipadBox.body', 'It cannot be the auto-print device. Kitchen auto-print runs on a Windows PC or an Android tablet with the Purple POS app — set the printers up there. This iPad can still take orders.')}</div>
  </div>
);

/** 접힘 상자 — 제목 + 펼치기. */
export const Fold: React.FC<{ title: string; defaultOpen?: boolean; children: React.ReactNode; testId?: string }> = ({ title, defaultOpen = false, children, testId }) => {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => { if (defaultOpen) setOpen(true); }, [defaultOpen]);
  return (
    <div data-testid={testId} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', marginTop: '12px' }}>
      <button type="button" style={accordionStyles.head} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '12px 14px', background: '#fff' }}>{children}</div>}
    </div>
  );
};

// ─── D6 프린터 2대 · 기기 여러 대 ───────────────────────────────────────────
export const TwoPrintersBlock: React.FC<{
  t: T; workstations: Array<{ id: string; name: string; billPrinter?: any }>; activeWorkstationId: string | null; kitchenAutoPrint: boolean;
}> = ({ t, workstations, activeWorkstationId, kitchenAutoPrint }) => {
  const ws = workstations.find((w) => w.id === activeWorkstationId) || null;
  const lines = [
    k(t, 'two.l1', 'One printing device per shop. Kitchen tickets are printed only by the device on the POS place with auto-print on — whichever device or customer phone took the order. That device must reach BOTH the kitchen printer and the counter printer.'),
    k(t, 'two.l2', 'One receipt printer per POS place. The device that tapped “Use on this device” for that place prints its receipts. A POS place without a printer: switch its receipt printer off.'),
    k(t, 'two.l3', 'Easiest setup (recommended): one printing device (Android tablet with the app, or the counter Windows PC) + counter printer (USB or Wi-Fi) + kitchen printer (Wi-Fi). Other POS devices just take orders, no printer.'),
    k(t, 'two.l4', 'Mixing a Windows PC at the counter and an Android tablet: make the always-on counter PC the printing device and let it reach the kitchen Wi-Fi printer (by name or IP). The tablet uses another POS place with “Use on this device” and its receipt printer off if it has none. Orders taken on the tablet are printed by the PC — that is normal.'),
    k(t, 'two.l5', 'Name rule: name each printer after its place in capital letters — COUNTER · KITCHEN · BAR. The shop settings only remember “which place = which name”; each device decides which real printer that name is (Windows printer name, or the name registered in the Android app). Changing the printing device? Set the printers up on the new device with the SAME names and the shop settings keep working. A different name shows “saved (not detected now)” in section 2 and does not print.'),
    k(t, 'two.l6', 'A Bluetooth printer connects to one device only — with 2 printers, put the kitchen one on Wi-Fi.'),
  ];
  const now = ws
    ? k(t, 'two.nowWs', 'This device = POS place “{{name}}” · kitchen auto-print {{auto}} · this place {{station}}.', {
        name: ws.name,
        auto: kitchenAutoPrint ? k(t, 'two.on', 'on') : k(t, 'two.off', 'off'),
        station: ws.billPrinter?.autoPrint !== false ? k(t, 'two.stationYes', 'auto-prints') : k(t, 'two.stationNo', 'does not auto-print'),
      })
    : k(t, 'two.nowNone', 'This device has not picked a POS place yet — in section 2 tap “Use on this device” on its place.');
  return (
    <Fold testId="setup-two-printers" title={k(t, 'two.title', 'Two printers (counter + kitchen) · more than one device')} defaultOpen={workstations.length >= 2}>
      <ol style={{ margin: 0, padding: '0 0 0 20px' }}>
        {lines.map((x, i) => <li key={i} style={{ fontSize: '12px', color: '#374151', lineHeight: 1.6, marginBottom: '6px' }}>{x}</li>)}
        <li style={{ fontSize: '12px', color: '#312E81', fontWeight: 600, lineHeight: 1.6 }} data-testid="setup-two-now">
          {k(t, 'two.l7', 'Right now:')} {now}
        </li>
      </ol>
    </Fold>
  );
};
