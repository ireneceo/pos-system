import fs from 'fs';
import path from 'path';
import { findPrinterSetupGaps } from './printerSetupGaps';

// 운영 매장 28(K-DINE Noodles) 2026-11-12 09:37 저장값 그대로 — Noodles 칸이 비어 티켓 실패
const store28 = {
  printerMode: 'rawbt',
  kitchenPrinter: { enabled: true, address: '', method: 'rawbt' },
  kitchenStationPrinters: {
    '23': { address: 'Counter', method: 'qztray', stationName: 'Kitchen' },
    '24': { address: '', method: 'qztray', stationName: 'Noodles' },
  },
};

describe('findPrinterSetupGaps', () => {
  it('매장 28: Noodles 주방만 빠짐', () => {
    expect(findPrinterSetupGaps(store28, 'rawbt')).toEqual([{ kind: 'station', stationId: '24', name: 'Noodles' }]);
  });
  it('주방 이름은 켜진 주방 목록 것을 쓰고, 목록에 없는(꺼진) 주방은 안 봄', () => {
    expect(findPrinterSetupGaps(store28, 'rawbt', [{ id: 24, name: 'Noodle Bar' }])).toEqual([{ kind: 'station', stationId: '24', name: 'Noodle Bar' }]);
    expect(findPrinterSetupGaps(store28, 'rawbt', [{ id: 23, name: 'Kitchen' }])).toEqual([]);
  });
  it('주방칸이 비어도 주방 기본 프린터 주소가 있으면 그리로 나감 → 빠짐 아님', () => {
    const s = { ...store28, kitchenPrinter: { enabled: true, address: '192.168.0.50', method: 'qztray' } };
    expect(findPrinterSetupGaps(s, 'rawbt')).toEqual([]);
  });
  it('RawBT·브라우저 방식은 주소 없이 나감 → 빠짐 아님', () => {
    const s = { kitchenPrinter: { enabled: true, method: 'rawbt' }, kitchenStationPrinters: { '1': { address: '', method: 'rawbt' }, '2': { address: '', method: 'browser' } } };
    expect(findPrinterSetupGaps(s, 'rawbt')).toEqual([]);
  });
  it('주방칸 방식이 비면 주방 기본 → printerMode 순으로 따짐', () => {
    const s = { kitchenPrinter: { enabled: true }, kitchenStationPrinters: { '7': { address: '', stationName: 'Bar' } } };
    expect(findPrinterSetupGaps(s, 'qztray')).toEqual([{ kind: 'station', stationId: '7', name: 'Bar' }]);
    expect(findPrinterSetupGaps(s, 'rawbt')).toEqual([]);
  });
  it('주방칸 없음 + 주방 기본 qztray 주소 빈칸 → 주방 빠짐', () => {
    expect(findPrinterSetupGaps({ kitchenPrinter: { enabled: true, method: 'qztray', address: ' ' } }, 'rawbt')).toEqual([{ kind: 'kitchen' }]);
  });
  it('주방 인쇄를 끈 매장·설정 없음은 빠짐 아님', () => {
    expect(findPrinterSetupGaps({ ...store28, kitchenPrinter: { enabled: false } }, 'rawbt')).toEqual([]);
    expect(findPrinterSetupGaps(null, 'rawbt')).toEqual([]);
  });
});

// 판정 규칙이 인쇄 코드(🔒 billPrint.js — 읽기만)와 어긋나면 여기서 실패한다.
describe('billPrint 규칙과 같은지', () => {
  const src = fs.readFileSync(path.join(__dirname, 'billPrint.js'), 'utf8');
  it('주방칸 qztray: 주방칸 주소 || 주방 기본 주소, 둘 다 비면 안 나감', () => {
    expect(src).toMatch(/if \(method === 'qztray'\) \{\s*const address = printerAddress \|\| settings\.kitchenPrinter\.address;\s*if \(!address\) return false;/);
  });
  it('주방칸 방식 = 주방칸 → 주방 기본 → printerMode', () => {
    expect(src).toContain("return sp?.method || settings.kitchenPrinter?.method || getPrinterMode();");
  });
  it('printerMode 기본값은 rawbt', () => {
    expect(src).toMatch(/function getPrinterMode\(\)[\s\S]{0,400}?\|\| 'rawbt'|function getPrinterMode\(\)[\s\S]{0,400}?return 'rawbt'/);
  });
});
