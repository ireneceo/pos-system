// 단위당 가격 표시 — 소수 2자리 (2026-10-15 Fable 설계 D6 · Irene «2자리까지만 나와야 해»)
import { formatUnitPrice } from './currency';
import { costPerBaseText } from './costDisplay';

describe('formatUnitPrice', () => {
  it('g 당 0.01 미만이면 kg 로 올린다', () => {
    expect(formatUnitPrice(0.0045, 'g', 'MYR')).toBe('RM 4.50 / kg');
    expect(formatUnitPrice(0.0009, 'ml', 'USD')).toBe('$ 0.90 / L');
  });
  it('0.01 이상이면 그 단위 그대로 2자리', () => {
    expect(formatUnitPrice(0.03, 'g', 'MYR')).toBe('RM 0.03 / g');
    expect(formatUnitPrice(0.0465, 'g', 'MYR')).toBe('RM 0.05 / g');
    expect(formatUnitPrice(2.5, 'piece', 'MYR')).toBe('RM 2.50 / piece');
  });
  it('올릴 단위가 없으면 «< RM 0.01»', () => {
    expect(formatUnitPrice(0.004, 'piece', 'MYR')).toBe('< RM 0.01 / piece');
  });
  it('원은 0자리', () => {
    expect(formatUnitPrice(12.6, 'g', 'KRW')).toBe('₩ 13 / g');
  });
  it('재료 원가 문장에 4자리 숫자가 없다', () => {
    const s = costPerBaseText(27.9, 'MYR', '-', { unit: 'g', base_quantity: 1000 });
    expect(s).toBe('RM 27.90 / 1000 g · RM 0.03 / g');
    expect(s).not.toMatch(/\d\.\d{3,}/);
  });
});
