import React from 'react';
import { render } from '@testing-library/react';
import { usePrinterDeviceScope } from './PrinterDeviceScope';

// 2026-11-13 Fable 정정(.claude/fable-verdict-20261113-setup-device-n-lock.md): 아직 설정 기기가 없는 매장(N)은
// 관리자에게 바로 열린다. 직원·불러오는 중·불러오기 실패는 잠김. 다른 기기(O)는 확인한 뒤에만.
jest.mock('../../utils/printDiagnostics', () => ({
  getDeviceId: () => 'this-device',
  detectSetupDevice: () => ({ device: 'pc-browser' }),
}));

function editableOf(opts: { canEdit: boolean; tag: any; loading?: boolean; error?: boolean }) {
  let got: any = null;
  const Probe = () => { got = usePrinterDeviceScope({ loading: false, error: false, ...opts }); return null; };
  render(<Probe />);
  return { state: got.state, editable: got.editable };
}

describe('usePrinterDeviceScope — 누가 언제 바꿀 수 있나', () => {
  const mine = { id: 'this-device', kind: 'pc-browser', name: 'POS1' };
  const other = { id: 'other-device', kind: 'android-app', name: 'Tablet' };
  test('N · 관리자 → 열림 (6.18 잠김 정정)', () => expect(editableOf({ canEdit: true, tag: null })).toEqual({ state: 'N', editable: true }));
  test('N · 직원 → 잠김', () => expect(editableOf({ canEdit: false, tag: null }).editable).toBe(false));
  test('N · 관리자 · 불러오는 중/실패 → 잠김', () => {
    expect(editableOf({ canEdit: true, tag: null, loading: true }).editable).toBe(false);
    expect(editableOf({ canEdit: true, tag: null, error: true }).editable).toBe(false);
  });
  test('M · 관리자 → 열림 · 직원 → 잠김', () => {
    expect(editableOf({ canEdit: true, tag: mine })).toEqual({ state: 'M', editable: true });
    expect(editableOf({ canEdit: false, tag: mine }).editable).toBe(false);
  });
  test('O · 관리자 → 확인 전 잠김', () => expect(editableOf({ canEdit: true, tag: other })).toEqual({ state: 'O', editable: false }));
});
