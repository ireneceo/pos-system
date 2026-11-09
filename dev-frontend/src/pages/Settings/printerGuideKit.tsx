/**
 * 프린터 설정 안내의 공용 틀 + 안내 데이터 (2026-11-08 b — Fable 설계
 * .claude/fable-design-20261108b-printer-guide-ux-audit.md §1–2).
 *
 * Irene «박스 안에 박스 안에 박스 … 가독성 엉망» → 원칙:
 *  - 안내 안에 테두리 상자 0개. 고르기(Seg) · 번호 목록 하나(StepList) · 글 접힘(TextFold) · 버튼 줄만.
 *  - 번호는 큰 목록 하나. 기종·연결 방식은 «고르기 한 줄» 이 본문을 바꾼다(안 고른 분기는 화면에 없음).
 *  - 본문 폭 760px.
 * AndroidPrinterSetup.tsx · PrinterSetupGuide.tsx 가 같이 쓴다(두 파일이 서로 부르지 않게 여기 한 곳).
 * 안내 글자만 다룬다 — 매장 설정 저장·🔒 인쇄 경로와 무관.
 */
import React, { useCallback, useEffect, useState } from 'react';
import type { SetupDevice } from '../../utils/printDiagnostics';

export type T = (k: string, o?: any) => string;

export const btn = (primary = false): React.CSSProperties => ({
  padding: '8px 14px', fontSize: '13px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap',
  border: primary ? '1px solid #635BFF' : '1px solid #6B7280',
  background: primary ? '#635BFF' : '#fff', color: primary ? '#fff' : '#1F2937',
});
export const stepNo = (n: number) => (
  <span data-step-badge="1" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#635BFF', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{n}</span>
);
export const hairline: React.CSSProperties = { borderBottom: '1px solid #E5E7EB' };
const linkBtn: React.CSSProperties = { padding: 0, border: 'none', background: 'none', color: '#4F46E5', fontSize: '12px', cursor: 'pointer', textAlign: 'left' };

// ─── 고르기 한 줄 ─────────────────────────────────────────────────────────────
export interface SegOption<V extends string> { v: V; label: string; tag?: string }
export function Seg<V extends string>({ options, value, onChange, ariaLabel, label }: {
  options: SegOption<V>[]; value: V | null; onChange: (v: V) => void; ariaLabel: string; label?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      {label && <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', minWidth: '96px' }}>{label}</span>}
      <div role="radiogroup" aria-label={ariaLabel} style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {options.map((o) => {
          const on = value === o.v;
          return (
            <button key={o.v} type="button" role="radio" aria-checked={on} onClick={() => onChange(o.v)}
              style={{ padding: '7px 12px', fontSize: '13px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer',
                border: on ? '1px solid #635BFF' : '1px solid #D1D5DB', background: on ? '#EEF2FF' : '#fff', color: on ? '#312E81' : '#1F2937' }}>
              {on ? '● ' : '○ '}{o.label}
              {o.tag && <span style={{ marginLeft: '6px', fontSize: '11px', fontWeight: 600, color: '#065F46' }}>{o.tag}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
/** 고르기 줄 아래 설명 한 줄(고른 것만). */
export const SubLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5, margin: '4px 0 10px' }}>{children}</div>
);

// ─── «안 될 때 ▸» 글 링크 ────────────────────────────────────────────────────
export const TroubleLink: React.FC<{ t: T; lines: string[]; label?: string }> = ({ t, lines, label }) => {
  const [open, setOpen] = useState(false);
  if (!lines.length) return null;
  return (
    <div style={{ marginTop: '4px' }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} style={linkBtn}>
        {label || t('settings:printer.setupGuide.trouble', { defaultValue: 'Did not work?' })} {open ? '▾' : '▸'}
      </button>
      {open && (
        <div style={{ borderLeft: '2px solid #E5E7EB', paddingLeft: '10px', marginTop: '6px' }}>
          {lines.map((x, i) => <div key={i} style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6, marginBottom: '4px' }}>{x}</div>)}
        </div>
      )}
    </div>
  );
};

// ─── 번호 목록 하나 ───────────────────────────────────────────────────────────
export interface Step { key: string; title: string; body?: React.ReactNode; lines?: string[]; actions?: React.ReactNode; trouble?: string[] }
export const StepList: React.FC<{ t: T; steps: Step[]; maxWidth?: number; testId?: string }> = ({ t, steps, maxWidth = 760, testId }) => (
  <ol data-testid={testId} style={{ listStyle: 'none', margin: '0 0 8px', padding: 0, maxWidth }}>
    {steps.map((s, i) => (
      <li key={s.key} style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
        {stepNo(i + 1)}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{s.title}</div>
          {s.body && <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6 }}>{s.body}</div>}
          {s.lines && s.lines.map((x, j) => <div key={j} style={{ fontSize: '12px', color: '#374151', lineHeight: 1.6, marginTop: '4px' }}>{x}</div>)}
          {s.actions && <div style={{ marginTop: '8px' }}>{s.actions}</div>}
          {s.trouble && <TroubleLink t={t} lines={s.trouble} />}
        </div>
      </li>
    ))}
  </ol>
);

// ─── 글 접힘 ─────────────────────────────────────────────────────────────────
export const TextFold: React.FC<{ title: string; defaultOpen?: boolean; children: React.ReactNode; testId?: string }> = ({ title, defaultOpen = false, children, testId }) => {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => { if (defaultOpen) setOpen(true); }, [defaultOpen]);
  return (
    <div data-testid={testId} style={{ borderTop: '1px solid #E5E7EB', paddingTop: '10px', marginTop: '10px', maxWidth: 760 }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#1F2937', textAlign: 'left' }}>
        {open ? '▾ ' : '▸ '}{title}
      </button>
      {open && <div style={{ marginTop: '8px', fontSize: '12px', color: '#4B5563', lineHeight: 1.6 }}>{children}</div>}
    </div>
  );
};

// ─── 내 프린터 기종 (이 기기 브라우저 저장 · 안내만 바꿈) ─────────────────────
export type SetupModel = 'std' | 'epson' | 'star' | 'other';
export const SETUP_MODEL_KEY = 'printer_setup_model';
const MODELS: SetupModel[] = ['std', 'epson', 'star', 'other'];
const readModel = (): SetupModel => {
  try { const v = localStorage.getItem(SETUP_MODEL_KEY); return MODELS.includes(v as SetupModel) ? (v as SetupModel) : 'std'; } catch { return 'std'; }
};
let modelNow: SetupModel = typeof window !== 'undefined' ? readModel() : 'std';
const modelListeners = new Set<() => void>();
export const useSetupModel = (): [SetupModel, (m: SetupModel) => void] => {
  const [m, setM] = useState<SetupModel>(modelNow);
  useEffect(() => {
    const l = () => setM(modelNow);
    modelListeners.add(l);
    return () => { modelListeners.delete(l); };
  }, []);
  const set = useCallback((v: SetupModel) => {
    modelNow = v;
    try { localStorage.setItem(SETUP_MODEL_KEY, v); } catch { /* ignore */ }
    modelListeners.forEach((f) => f());
  }, []);
  return [m, set];
};

const g = (t: T, k: string, d: string, o?: any) => t(`settings:printer.setupGuide.${k}`, { defaultValue: d, ...(o || {}) });
const ag = (t: T, k: string, d: string) => t(`settings:printer.androidGuide.${k}`, { defaultValue: d });

/** 화면에 적을 모델명 — Irene 가 확정하면 로케일 키 하나만 채운다(비어 있으면 안 보임). */
export const stdModelName = (t: T): string => {
  const v = t('settings:printer.setupGuide.std.model', { defaultValue: '' });
  return v && v !== 'printer.setupGuide.std.model' && v !== 'settings:printer.setupGuide.std.model' ? v : '';
};
export const modelLabel = (t: T, m: SetupModel) => ({
  std: g(t, 'model.std', 'PurpleHere standard'),
  epson: g(t, 'model.epson', 'Epson TM'),
  star: g(t, 'model.star', 'Star'),
  other: g(t, 'model.other', 'Other model'),
}[m]);
const modelId = (t: T, m: SetupModel) => {
  if (m === 'std') {
    const name = stdModelName(t);
    const s = g(t, 'model.stdId', 'Self-test page says “WIFI distribution network method”? Then it is this model — 80 mm · USB + Wi-Fi 2.4 GHz · auto cutter. The model in our shop packages.');
    return name ? `${name} — ${s}` : s;
  }
  return {
    epson: g(t, 'model.epsonId', 'TM-m30, TM-T82X and other Wi-Fi models'),
    star: g(t, 'model.starId', 'TSP143, mC-Print and others'),
    other: g(t, 'model.otherId', 'Xprinter, Gprinter, Rongta, HPRT … — follow the setup sheet in the box'),
  }[m];
};
export const ModelPicker: React.FC<{ t: T }> = ({ t }) => {
  const [m, setM] = useSetupModel();
  return (
    <div data-testid="setup-model">
      <Seg<SetupModel> label={g(t, 'model.label', 'My printer')} ariaLabel={g(t, 'model.label', 'My printer')} value={m} onChange={setM}
        options={MODELS.map((v) => ({ v, label: modelLabel(t, v) }))} />
      <SubLine>{modelId(t, m)}</SubLine>
    </div>
  );
};

// ─── EspBluFi (PurpleHere 표준 프린터) — 큰 목록의 4단계 ──────────────────────
// 2026-11-09 Irene «왜 다른 걸 다운받게 해? 공식 안드로이드 다운로드 앱 있어. EspBluFi» → EspTouch 대신 Espressif 공식 EspBluFi(블루투스로 Wi-Fi 보내기).
// 공식 경로만: 안드로이드 = Espressif GitHub 릴리즈 APK(Google Play 에는 EspBluFi 없음 — Play 의 «BluFi» 는 다른 개발자 앱, 2026-11-09 실측) · iPhone = App Store «EspBlufi».
// 버튼 이름은 앱 원문(EspBlufiForAndroid strings.xml): Connect · Configure · Station · Select Wi-Fi · Settings › BLE devices filter.
export const BLUFI_IOS_URL = 'https://apps.apple.com/my/app/espblufi/id1450614082';
export const BLUFI_ANDROID_APK_URL = 'https://github.com/EspressifApp/EspBlufiForAndroid/releases/download/v1.7.1/blufi-1.7.1-33.apk';

export const espTouchSteps = (t: T): Step[] => {
  const s = (k: string, d: string) => g(t, `std.${k}`, d);
  return [
    { key: 'espInstall', title: s('e1Title', 'Install the EspBluFi app (made by Espressif)'),
      body: s('e1Body', 'Android phone or tablet: download the official EspBluFi file below, open it and install — Android asks once to “allow apps from this source” (same as when you got the Purple POS app). iPhone: App Store, “EspBlufi”. Free.'),
      actions: (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => window.open(BLUFI_ANDROID_APK_URL, '_blank', 'noopener')} style={btn(true)}>{s('e1ApkBtn', 'Download EspBluFi (Android)')}</button>
            <button type="button" onClick={() => window.open(BLUFI_IOS_URL, '_blank', 'noopener')} style={btn()}>{s('e1IosBtn', 'Open App Store (iPhone)')}</button>
          </div>
          <div style={{ fontSize: '11px', color: '#92400E', lineHeight: 1.5, marginTop: '4px' }}>{s('e1PlayNote', 'EspBluFi is not on Google Play — the “BluFi” apps you find by searching there are other developers’ apps. Use the button above.')}</div>
        </div>
      ) },
    { key: 'espMode', title: s('e2Title', 'Put the printer in setup mode'),
      body: s('e2Body', 'Switch the printer OFF. Press and HOLD the FEED button, switch it ON and keep holding until the beeping stops (about 10 seconds), then let go. The green light blinks = setup mode.') },
    { key: 'espSend', title: s('e3Title', 'Send the Wi-Fi from EspBluFi'),
      body: (<><strong style={{ color: '#1F2937' }}>{s('e3First', 'First: turn on Bluetooth and Location on the phone, and stand next to the printer.')}</strong>{' '}{s('e3Merged', 'Open EspBluFi (allow Bluetooth and Location) → pull the list down to scan → tap the printer → “Connect” → “Configure” → device mode “Station” → “Select Wi-Fi”: the shop 2.4 GHz Wi-Fi (not “-5G”, not the guest Wi-Fi) → type the Wi-Fi password → OK. When the app says it is connected and the green light blinks slowly, it is done.')}</>),
      trouble: [s('trouble1', 'Printer not in the list: do step 2 again (setup mode) · Bluetooth or Location is off · in EspBluFi Settings clear “BLE devices filter”, then scan again. Not connecting: wrong password · 5 GHz Wi-Fi picked · too far from the router.')] },
    { key: 'espCheck', title: s('e5Title', 'Check on paper — self-test page'),
      body: s('e5Body', 'Switch OFF → hold FEED → switch ON → let go after about 2 seconds (holding until the beep stops puts it back in setup mode — then switch off and try again). The page shows “WIFI IP 192.168.x.x” = done. Keep this page: you need the IP if the search misses it.'),
      trouble: [
        s('trouble2', 'Self-test page shows no IP: do steps 2–4 again.'),
        s('trouble3', 'The page shows an IP but Purple cannot find it: this device must be on the same Wi-Fi (not the guest Wi-Fi).'),
      ] },
  ];
};

/** 기종별 «매장 Wi-Fi 에 붙이기» (std 는 espTouchSteps(EspBluFi) 를 쓴다). */
export const makerJoin = (t: T, m: Exclude<SetupModel, 'std'>): { title: string; body: string } => ({
  title: g(t, 'pc.wifiJoinMaker', 'Join the printer to the shop Wi-Fi — the {{model}} way', { model: modelLabel(t, m) }),
  body: {
    epson: ag(t, 'wjEpsonHow', 'Install the Epson “TM Utility” app on a phone or this tablet → pick the printer → Network (Wi-Fi) settings → choose the shop Wi-Fi, type its password → save.'),
    star: ag(t, 'wjStarHow', 'Install the “Star Quick Setup Utility” app → pick the printer → Wi-Fi settings → choose the shop Wi-Fi, type its password → save.'),
    other: ag(t, 'wjGenericHow', 'Follow the setup sheet in the printer’s box — usually the maker’s “Wi-Fi setting” app or tool: type the shop Wi-Fi name and password, save, then switch the printer off and on. Keep the setup sheet; every model does this a little differently.'),
  }[m] + ' ' + g(t, 'pc.wifiNetNote', 'Use the shop Wi-Fi at 2.4 GHz — not “-5G”, not the guest Wi-Fi.'),
});

/** 그 기종의 셀프테스트 뽑는 법 한 줄. */
export const selfTestLine = (t: T, m: SetupModel): string => ({
  std: g(t, 'std.stHow', 'Switch OFF. Hold FEED, switch ON, let go after about 2 seconds — do not hold until the beep stops (that is Wi-Fi setup mode). Look for “WIFI IP”.'),
  epson: ag(t, 'stEpsonHow', 'TM-m30: press the small button on the back once — a network sheet with the IP prints. Others: hold FEED while switching ON.'),
  star: ag(t, 'stStarHow', 'Hold FEED while switching ON — the self-test page shows the IP address.'),
  other: ag(t, 'stGenericHow', 'Switch the printer OFF. Hold the FEED button, switch it ON, release after 2 seconds. The page that comes out shows “IP Address”.'),
}[m]);

/** 등록 — 기기별 문구(§3-M1: Windows 앱 §2 는 select 없이 드롭다운 하나). */
export const registerLines = (t: T, device: SetupDevice): string[] => {
  const s = (k: string, d: string) => g(t, `std.${k}`, d);
  if (device === 'android-app') return [s('regAndroidApp', 'Then on this tablet: “Find printers automatically” → give the found address the name KITCHEN (or COUNTER) → Add. Not found? “Add by IP address” with the IP from the self-test page. Korean and Chinese menus print as they are.')];
  if (device === 'android-browser') return [s('regAndroidBrowser', 'Then in the RawBT app: Settings → Connection → Network → the IP from the self-test page. (Easier: install the Purple POS app — it finds the printer by itself.)')];
  if (device === 'ipad-browser') return [s('regIpad', 'An iPad cannot be the auto-print device. Set this printer up on the Windows PC or Android tablet that prints.')];
  if (device === 'windows-app') return [
    'A. ' + s('regWinA', 'Menu only in English / Malay: in section 2 open the printer drop-down → “Network printer (enter IP)…” → type the self-test IP, e.g. 192.168.0.104:9100. No driver needed. Korean, Chinese and logos will NOT print.'),
    'B. ' + s('regWinB', 'Korean / Chinese menu or a logo: install the maker’s Windows driver (QR code or sheet in the box) → port type Network / TCP-IP, address = the self-test IP → name the printer KITCHEN. It then shows in the section 2 drop-down (not there? “Reload printers”).'),
    s('regPcRecommend', 'Recommended: B if your menu has any non-English letters.'),
  ];
  return [
    'A. ' + s('regPcA', 'Menu only in English / Malay: in section 2 pick “Printer name or IP” and type the self-test IP, e.g. 192.168.0.104:9100. No driver needed. Korean, Chinese and logos will NOT print.'),
    'B. ' + s('regPcB', 'Korean / Chinese menu or a logo: install the maker’s Windows driver (QR code or sheet in the box) → port type Network / TCP-IP, address = the self-test IP → name the printer KITCHEN → in Purple tap “Find Printers” → pick KITCHEN in section 2.'),
    s('regPcRecommend', 'Recommended: B if your menu has any non-English letters.'),
  ];
};
