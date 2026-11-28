/**
 * 청구서 줄 표시 규칙 — 2026-11-28 Fable 설계 §3-1.
 * 고장주입: isDetailLine 을 false 고정하면 세부 줄 사례들이 실패해야 한다.
 */
import { invoiceLineCells, isDetailLine, parseDetailLines, countAmountLines, detailItemRow } from './invoiceLines';

const money = (n: number) => `RM ${n.toFixed(2)}`;

describe('invoiceLineCells', () => {
  it('금액 줄은 지금 그대로 — 0원 구독 줄도 «RM 0.00»', () => {
    const c = invoiceLineCells({ itemType: 'subscription', description: 'Basic Plan', quantity: 1, unitPrice: 0, total: 0 }, money);
    expect(c).toEqual({ detail: false, description: 'Basic Plan', qty: '1', unitPrice: 'RM 0.00', amount: 'RM 0.00' });
  });

  it('금액 줄 — 수량 표기 함수를 그대로 쓴다', () => {
    const c = invoiceLineCells({ description: 'Service: X', quantity: 2.5, unit: 'kg', unitPrice: 10, total: 25 }, money,
      (it) => `${it.quantity} ${it.unit}`);
    expect(c.qty).toBe('2.5 kg');
    expect(c.amount).toBe('RM 25.00');
  });

  it('세부 줄 — 하이픈 · 단가/금액/수량 빈칸 · 접두 없는 원문', () => {
    const c = invoiceLineCells({ isDetail: true, itemType: 'line_detail', description: 'On-site installation', rawDescription: 'On-site installation', quantity: 1, unitPrice: 0, total: 0 }, money);
    expect(c).toEqual({ detail: true, description: '- On-site installation', qty: '', unitPrice: '', amount: '' });
  });

  it('세부 줄 수량 5 — 수량만 보인다', () => {
    const c = invoiceLineCells({ itemType: 'line_detail', description: 'Booklet', quantity: 5, unitPrice: 0, total: 0 }, money);
    expect(c.qty).toBe('5');
    expect(c.unitPrice).toBe('');
  });

  it('itemType 없는 옛 응답 — 금액 줄로 본다', () => {
    const c = invoiceLineCells({ description: 'Old', quantity: 1, unitPrice: 0, total: 0 }, money);
    expect(c.detail).toBe(false);
    expect(c.amount).toBe('RM 0.00');
  });

  it('isDetailLine — snake_case 도 알아본다', () => {
    expect(isDetailLine({ item_type: 'line_detail' })).toBe(true);
    expect(isDetailLine({ item_type: 'service' })).toBe(false);
    expect(isDetailLine(null)).toBe(false);
  });
});

describe('parseDetailLines', () => {
  it('trim · 빈 줄 제거 · 맨 앞 하이픈 제거', () => {
    expect(parseDetailLines('  - A \n\n– B\n• C\nD - E')).toEqual({ lines: ['A', 'B', 'C', 'D - E'], error: null });
  });
  it('256자 줄 / 31줄은 오류', () => {
    expect(parseDetailLines('x'.repeat(256)).error).toBe('too_long');
    expect(parseDetailLines(Array.from({ length: 31 }, (_, i) => `l${i}`).join('\n')).error).toBe('too_many');
  });
});

describe('countAmountLines · detailItemRow', () => {
  it('세부 줄은 금액 줄 수에 안 든다', () => {
    expect(countAmountLines([{ itemType: 'service' }, detailItemRow('a'), { itemType: 'line_detail' }])).toBe(1);
    expect(detailItemRow('a')).toMatchObject({ item_type: 'line_detail', calculated_amount: 0, total_amount: 0 });
  });
});
