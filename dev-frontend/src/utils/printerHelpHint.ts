/**
 * printerHelpHint — «프린터가 안 될 때 무엇을 확인하나» 안내를 이 기기에 맞게 고른다.
 *
 * 2026-11-11 (K-DINE Noodles 안드로이드 앱 «QZ 없다» 잘못된 안내): 실패 띠·돈통·QR 인쇄 실패 안내가
 * 어느 기기에서나 «QZ Tray 를 확인하세요» 로 고정돼 있었다. 앱(안드로이드·윈도우)에는 QZ 가 없고
 * 필요도 없어서, 앱 매장은 없는 프로그램을 찾게 됐다. 기기 판정은 자가진단과 같은 detectPlatform 하나.
 *
 * 읽기만 한다 — 인쇄 경로·설정·연결에 손대지 않는다.
 */
import { detectPlatform } from './printDiagnostics';
import type { Platform } from './printDiagnostics';

export type PrinterHelpKind = 'android' | 'windows' | 'rawbt' | 'qz' | 'browser';

export function printerHelpKind(): PrinterHelpKind {
  let p: Platform = 'web';
  try { p = detectPlatform(); } catch { /* fall back to plain browser */ }
  switch (p) {
    case 'android-app': return 'android';
    case 'windows-app': return 'windows';
    case 'web-rawbt': return 'rawbt';
    case 'web-qz': return 'qz';
    default: return 'browser';
  }
}

/** common.json 의 printerHelp.<kind> 키 (영문 기본값 포함). */
export function printerHelpKey(): { key: string; fallback: string } {
  const kind = printerHelpKind();
  return { key: `common:printerHelp.${kind}`, fallback: FALLBACK[kind] };
}

/** 돈통 안 열림 안내 — 앱·RawBT·QZ 는 프린터 쪽 확인, 브라우저 인쇄 모드만 «방식» 안내. */
export function drawerHelpKey(): { key: string; fallback: string } {
  const kind = printerHelpKind();
  return { key: `common:printerHelp.drawer_${kind}`, fallback: DRAWER_FALLBACK[kind] };
}

const FALLBACK: Record<PrinterHelpKind, string> = {
  android: 'Check that the printer is on, has paper and is on the same Wi-Fi as this tablet, and that every kitchen station has a printer picked in Settings → Printer.',
  windows: 'Check that the printer is on, has paper and is connected to this PC, and that every kitchen station has a printer picked in Settings → Printer.',
  rawbt: 'Check that the RawBT app is installed and the printer is on with paper, then check Settings → Printer.',
  qz: 'Check that QZ Tray is running on this PC and the printer is on with paper, then check the printer name in Settings → Printer.',
  browser: 'Check that the printer is on with paper and connected, then check Settings → Printer.',
};

const DRAWER_FALLBACK: Record<PrinterHelpKind, string> = {
  android: 'The drawer opens through the receipt printer. Check that the receipt printer is on and picked in Settings → Printer, and that the drawer cable is plugged into the printer.',
  windows: 'The drawer opens through the receipt printer. Check that the receipt printer is on and picked in Settings → Printer, and that the drawer cable is plugged into the printer.',
  rawbt: 'The drawer opens through the receipt printer. Check that RawBT is installed, the receipt printer is on, and the drawer cable is plugged into the printer.',
  qz: 'The drawer opens through the receipt printer. Check that QZ Tray is running, the receipt printer is on, and the drawer cable is plugged into the printer.',
  browser: 'The browser print window cannot open a cash drawer. Use the PurplePOS app (or a printer connection) for this device in Settings → Printer.',
};
