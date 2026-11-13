import fs from 'fs';
import path from 'path';
import { findPrinterSetupGaps } from './printerSetupGaps';

// 서버판(dev-backend/utils/printerSetupGaps.js)과 같은 입력·기대값 — 한쪽만 고치면 깨진다 (2026-11-13 인쇄 지킴이)
const FIXTURE = path.join(__dirname, '../../../dev-backend/tests/fixtures/printer-setup-gaps.json');
const { cases } = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'));

describe('findPrinterSetupGaps (공용 fixture)', () => {
  it('fixture 가 비어 있지 않음', () => { expect(cases.length).toBeGreaterThanOrEqual(8); });
  for (const c of cases) {
    it(c.name, () => { expect(findPrinterSetupGaps(c.settings, c.mode, c.active || null)).toEqual(c.expect); });
  }
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
    expect(src).toMatch(/function getPrinterMode\(\)[\s\S]{0,400}?return 'rawbt'/);
  });
});
