/**
 * «프린터 설정 기기» — 매장 프린터 설정은 한 벌, 바로 바꾸는 곳은 한 기기 (2026-11-10)
 *
 * 설계: .claude/fable-design-20261110-printer-settings-device-scope.md (Fable)
 * Irene «레스토랑 프린터 설정을 한 디바이스에서 다른 곳에서 안하게. 하려면 확인을 하고 바꾸게 조심스럽게 잘 분리해줘야 해»
 *
 * - 상태 N(아직 없음) · M(이 기기) · O(다른 기기). 열림 = 관리자 && (N || M || O 에서 확인한 이번 방문).
 *   N 은 관리자에게 바로 연다(2026-11-13 Fable 정정 .claude/fable-verdict-20261113-setup-device-n-lock.md — 6.18 에서 기존 매장 관리자가 전부 잠김). 자동 지정은 없음 · 지정은 버튼으로만.
 * - «이번 방문 확인함» 은 화면 상태뿐 — 새로 고침하면 다시 잠긴다.
 * - 기기 번호 = 인쇄 자가진단의 getDeviceId() (새로 만들지 않음). 인쇄 경로(🔒 billPrint 등)는 이 파일을 읽지 않는다.
 * - 서버 판정 = dev-backend/utils/printerSetupDevice.js (화면은 실수 방지, 경계는 서버).
 */
import React, { createContext, forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import AutoSaveField, { AutoSaveHandle } from '../../components/Common/AutoSaveField';
import { Modal } from '../../components/UI/Modal';
import { Button as UIButton } from '../../components/UI/Button';
import { getDeviceId, detectSetupDevice, SetupDevice } from '../../utils/printDiagnostics';
import { formatDateTime } from '../../utils/dateFormat';

type TFn = (k: string, o?: any) => string;

export interface SetupDeviceTag {
  id: string;
  kind: SetupDevice;
  name: string;
  at?: string;
  byId?: number | null;
  byName?: string;
  otherEdit?: { kind: SetupDevice; name: string; at: string; byName: string };
}

export type ScopeState = 'N' | 'M' | 'O';

const OTHER_EDIT_SEEN_KEY = 'printer_other_edit_seen';

/* ── 잠금: 프린터 탭 안 자동저장 칸은 이 래퍼로. 잠기면 안 칸을 비활성(값은 보임), 열리면 변경 전과 같은 DOM ── */
export const PrinterLockContext = createContext<boolean>(false);

type AutoSaveProps = React.ComponentProps<typeof AutoSaveField>;
const LOCK_FIELDSET: React.CSSProperties = { display: 'contents', border: 0, padding: 0, margin: 0, minWidth: 0 };

export const PrinterAutoSave = forwardRef<AutoSaveHandle, AutoSaveProps>(({ children, ...rest }, ref) => {
  const locked = useContext(PrinterLockContext);
  return (
    <AutoSaveField ref={ref} {...rest}>
      {locked ? <fieldset disabled data-printer-locked="1" style={LOCK_FIELDSET}>{children}</fieldset> : children}
    </AutoSaveField>
  );
});
PrinterAutoSave.displayName = 'PrinterAutoSave';

/** 잠금 상태를 읽는 훅 — 자동저장 칸 밖 버튼(자리 추가·삭제 등)이 disabled 에 쓴다 */
export function usePrinterLocked(): boolean {
  return useContext(PrinterLockContext);
}

/* ── 기기 이름 ── */
export function deviceKindLabel(t: TFn, kind: SetupDevice | string | undefined): string {
  switch (kind) {
    case 'android-app': return t('settings:printer.setupGuide.device.androidApp', 'Purple POS Android app');
    case 'windows-app': return t('settings:printer.setupGuide.device.windowsApp', 'Purple POS Windows app');
    case 'android-browser': return t('settings:printer.setupGuide.device.androidBrowser', 'Android tablet · web browser');
    case 'ipad-browser': return t('settings:printer.setupGuide.device.ipadBrowser', 'iPad · web browser');
    default: return t('settings:printer.setupGuide.device.pcBrowser', { pc: t('settings:printer.setupGuide.device.pc', 'PC'), defaultValue: '{{pc}} · web browser' });
  }
}

/* ── 훅 ── */
export function usePrinterDeviceScope(opts: { canEdit: boolean; tag: SetupDeviceTag | null; loading: boolean; error: boolean }) {
  const { canEdit, tag, loading, error } = opts;
  const device = useMemo(() => ({ id: getDeviceId(), kind: detectSetupDevice().device as SetupDevice }), []);
  const hasId = !!device.id && device.id !== 'dev-ephemeral';
  const [unlocked, setUnlocked] = useState(false);
  const state: ScopeState = !tag || !tag.id ? 'N' : (hasId && tag.id === device.id ? 'M' : 'O');
  const editable = canEdit && !loading && !error && (state === 'N' || state === 'M' || (state === 'O' && unlocked));
  return { device, hasId, state, unlocked, setUnlocked, editable };
}

/** 저장 본문에 함께 보낼 기기 정보 */
export function buildPrinterDevice(device: { id: string; kind: SetupDevice }, name: string, confirm: boolean) {
  return { id: device.id, kind: device.kind, name: (name || '').slice(0, 40), confirm };
}

/* ── 상태 줄 ── */
interface BarProps {
  t: TFn;
  state: ScopeState;
  tag: SetupDeviceTag | null;
  unlocked: boolean;
  timeZone?: string;
  compact?: boolean;           // §2·§3 제목 아래 되풀이 줄
  notice?: string | null;      // 저장 안 됨 등 한 줄 알림
  onSetup: () => void;
  onChangeHere: () => void;
  onRelock: () => void;
}

export const PrinterScopeBar: React.FC<BarProps> = ({ t, state, tag, unlocked, timeZone, compact, notice, onSetup, onChangeHere, onRelock }) => {
  const [seen, setSeen] = useState<string>(() => { try { return localStorage.getItem(OTHER_EDIT_SEEN_KEY) || ''; } catch { return ''; } });
  const ack = useCallback(() => {
    const at = tag?.otherEdit?.at || '';
    try { localStorage.setItem(OTHER_EDIT_SEEN_KEY, at); } catch { /* blocked storage */ }
    setSeen(at);
  }, [tag]);

  const amber = state === 'O' && !unlocked;
  const box: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
    padding: compact ? '8px 12px' : '10px 14px', marginBottom: compact ? 12 : 16, borderRadius: 8, fontSize: 13,
    background: amber ? '#FFFBEB' : '#F3F4F6',
    border: `1px solid ${amber ? '#FDE68A' : '#E5E7EB'}`,
    color: amber ? '#92400E' : '#374151',
  };
  const tagName = tag?.name || deviceKindLabel(t, tag?.kind);

  let text: React.ReactNode = null;
  let action: React.ReactNode = null;
  if (state === 'N') {
    text = t('settings:printer.deviceScope.barNone', 'Printer settings are changed on one device only. That device is not chosen yet — choose it on the device the printers are connected to (the one that prints kitchen tickets).');
    action = <UIButton variant="primary" size="small" onClick={onSetup} data-testid="printer-scope-setup">{t('settings:printer.deviceScope.setBtn', 'Set this device as the printer setup device')}</UIButton>;
  } else if (state === 'M') {
    text = <><span aria-hidden style={{ color: '#635BFF', marginRight: 6 }}>●</span>{t('settings:printer.deviceScope.barMine', { name: tagName, defaultValue: 'This device is the printer setup device — “{{name}}”' })}</>;
  } else if (unlocked) {
    text = t('settings:printer.deviceScope.barUnlocked', 'Changing on this device — every change applies to the whole restaurant right away.');
    action = <UIButton variant="outline" size="small" onClick={onRelock} data-testid="printer-scope-relock">{t('settings:printer.deviceScope.relockBtn', 'Lock again')}</UIButton>;
  } else {
    text = t('settings:printer.deviceScope.barOther', { name: tagName, kind: deviceKindLabel(t, tag?.kind), defaultValue: 'Printer setup device: “{{name}}” ({{kind}}). On this device you can only view — test printing, “Use on this device” and emergency mode still work here.' });
    action = <UIButton variant="outline" size="small" onClick={onChangeHere} data-testid="printer-scope-change">{t('settings:printer.deviceScope.changeBtn', 'Change on this device…')}</UIButton>;
  }

  const oe = tag?.otherEdit;
  const showOther = !compact && state === 'M' && !!oe && !!oe.at && oe.at > seen;

  return (
    <div data-testid={compact ? 'printer-scope-bar-compact' : 'printer-scope-bar'} data-scope-state={state} data-scope-unlocked={unlocked ? '1' : '0'}>
      <div style={box}>
        <span style={{ flex: '1 1 260px', lineHeight: 1.5 }}>{text}</span>
        {action}
      </div>
      {showOther && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', margin: '-8px 0 16px', fontSize: 13, color: '#B45309' }} data-testid="printer-scope-other-edit">
          <span style={{ flex: '1 1 260px' }}>
            {t('settings:printer.deviceScope.otherEdited', {
              when: formatDateTime(oe!.at, timeZone || undefined),
              kind: deviceKindLabel(t, oe!.kind), name: oe!.name || '—', by: oe!.byName || '—',
              defaultValue: 'Printer settings were changed on another device — {{when}} · {{kind}} “{{name}}” · {{by}}',
            })}
          </span>
          <UIButton variant="outline" size="small" onClick={ack}>{t('settings:printer.deviceScope.ackBtn', 'OK')}</UIButton>
        </div>
      )}
      {notice && !compact && (
        <div style={{ margin: '-8px 0 16px', fontSize: 13, color: '#B42318' }} data-testid="printer-scope-notice">{notice}</div>
      )}
    </div>
  );
};

/* ── 창 1: 이 기기를 설정 기기로 ── */
interface SetupModalProps {
  t: TFn;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void> | void;
  hasId: boolean;
  deviceKind: SetupDevice;
  defaultName: string;
  wsName: string;                 // 이 기기의 자리 이름(없으면 '—')
  notPrintingSeat: string | null; // 자리 2개 이상 · 이 자리 자동 인쇄 꺼짐이면 자동 인쇄 켜진 자리 이름
  busy: boolean;
}

export const SetupDeviceModal: React.FC<SetupModalProps> = ({ t, isOpen, onClose, onConfirm, hasId, deviceKind, defaultName, wsName, notPrintingSeat, busy }) => {
  const [name, setName] = useState(defaultName);
  React.useEffect(() => { if (isOpen) setName(defaultName); }, [isOpen, defaultName]);
  const warn: React.CSSProperties = { color: '#B45309', fontSize: 13, lineHeight: 1.5, marginTop: 8 };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('settings:printer.deviceScope.setupTitle', 'Make this the printer setup device')}
      size="small"
      footer={<>
        <UIButton variant="cancel" onClick={onClose}>{t('common:cancel', 'Cancel')}</UIButton>
        <UIButton variant="primary" disabled={!hasId || busy} onClick={() => onConfirm(name)} data-testid="printer-scope-setup-confirm">{t('settings:printer.deviceScope.setupConfirm', 'Set')}</UIButton>
      </>}
    >
      <div style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6 }} data-testid="printer-scope-setup-modal">
        <div style={{ marginBottom: 12 }}>
          {t('settings:printer.deviceScope.thisDevice', { kind: deviceKindLabel(t, deviceKind), seat: wsName || '—', defaultValue: 'This device: {{kind}} · place {{seat}}' })}
        </div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{t('settings:printer.deviceScope.nameLabel', 'Name')}</label>
        <input
          type="text" value={name} maxLength={40} onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #6B7280', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
        />
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4, marginBottom: 12 }}>{t('settings:printer.deviceScope.nameHint', 'Other devices see this name.')}</div>
        <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
          <li>{t('settings:printer.deviceScope.setupLine1', 'From now on printer settings change right away only on this device.')}</li>
          <li>{t('settings:printer.deviceScope.setupLine2', 'On other devices they can be changed only after a confirmation window.')}</li>
          <li>{t('settings:printer.deviceScope.setupLine3', 'Printer names are the names registered on this device.')}</li>
        </ul>
        {notPrintingSeat && hasId && (
          <div style={warn}>{t('settings:printer.deviceScope.warnNotPrinting', { seat: notPrintingSeat, defaultValue: 'This device is not the place that prints kitchen tickets ({{seat}}). Usually you choose that device.' })}</div>
        )}
        {(deviceKind === 'android-browser' || deviceKind === 'ipad-browser') && hasId && (
          <div style={warn}>{t('settings:printer.deviceScope.warnBrowser', 'Usually the PC or app device that prints is the printer setup device.')}</div>
        )}
        {!hasId && (
          <div style={warn}>{t('settings:printer.deviceScope.noDeviceId', 'This browser cannot remember devices, so it cannot be the printer setup device (private window).')}</div>
        )}
      </div>
    </Modal>
  );
};

/* ── 창 2: 다른 기기에서 관리하는 설정 ── */
interface OtherModalProps {
  t: TFn;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (takeOver: boolean) => Promise<void> | void;
  tag: SetupDeviceTag | null;
  hasId: boolean;
  deviceKind: SetupDevice;
  timeZone?: string;
  busy: boolean;
}

export const OtherDeviceModal: React.FC<OtherModalProps> = ({ t, isOpen, onClose, onConfirm, tag, hasId, deviceKind, timeZone, busy }) => {
  const [takeOver, setTakeOver] = useState(false);
  React.useEffect(() => { if (isOpen) setTakeOver(false); }, [isOpen]);
  const tagName = tag?.name || deviceKindLabel(t, tag?.kind);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('settings:printer.deviceScope.otherTitle', 'Printer settings managed on another device')}
      size="small"
      footer={<>
        <UIButton variant="cancel" onClick={onClose}>{t('common:cancel', 'Cancel')}</UIButton>
        <UIButton variant="primary" disabled={busy} onClick={() => onConfirm(takeOver && hasId)} data-testid="printer-scope-other-confirm">{t('settings:printer.deviceScope.otherConfirm', 'Confirm and change on this device')}</UIButton>
      </>}
    >
      <div style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6 }} data-testid="printer-scope-other-modal">
        <div style={{ marginBottom: 12, fontWeight: 600 }}>
          {t('settings:printer.deviceScope.otherWho', {
            name: tagName, kind: deviceKindLabel(t, tag?.kind),
            when: tag?.at ? formatDateTime(tag.at, timeZone || undefined) : '—', by: tag?.byName || '—',
            defaultValue: 'Printer setup device: “{{name}}” ({{kind}}) · set by {{by}}, {{when}}',
          })}
        </div>
        <p style={{ margin: '0 0 8px' }}>{t('settings:printer.deviceScope.otherLine1', 'Changes made here apply to the whole restaurant right away, and change the kitchen tickets and receipts of the device that prints.')}</p>
        <p style={{ margin: '0 0 8px' }}>{t('settings:printer.deviceScope.otherLine2', 'Printer names must be the names registered on the device that actually prints. A name found on this device may not exist on that device.')}</p>
        {tag?.kind && tag.kind !== deviceKind && (
          <p style={{ margin: '0 0 8px', color: '#B45309' }}>{t('settings:printer.deviceScope.otherKindWarn', { mine: deviceKindLabel(t, deviceKind), theirs: deviceKindLabel(t, tag.kind), defaultValue: 'This device ({{mine}}) is a different kind from the setup device ({{theirs}}). Changing the connection method can stop printing on that device.' })}</p>
        )}
        {hasId && (
          <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 12, cursor: 'pointer', fontSize: 13 }}>
            <input type="checkbox" checked={takeOver} onChange={(e) => setTakeOver(e.target.checked)} style={{ marginTop: 3, accentColor: '#635BFF' }} data-testid="printer-scope-takeover" />
            <span>{t('settings:printer.deviceScope.takeOver', 'From now on use this device as the printer setup device — only if you replaced the device or reinstalled the app')}</span>
          </label>
        )}
      </div>
    </Modal>
  );
};
