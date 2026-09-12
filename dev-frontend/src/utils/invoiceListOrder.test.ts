/**
 * 인보이스 목록 순서 — 구입 청구서는 발주 주문일, 나머지는 발행일 (2026-09-11 Irene 「최근 주문일 기준으로 리스트업」)
 * 고장주입: invoiceListDateMs 가 poOrderedAt 을 무시(issueDate 만)하게 바꾸면 첫 테스트가 실패해야 한다.
 */
import { sortInvoicesRecentFirst, invoiceListDateMs } from './invoiceListOrder';

describe('sortInvoicesRecentFirst', () => {
  it('발행일이 모두 같아도 주문일 최신 → 오래된 순', () => {
    const sameIssued = '2026-09-08T20:44:06.000Z';
    const list = [
      { invoiceNumber: 'TRD-A', issueDate: sameIssued, poOrderedAt: '2026-08-28T13:45:30.000Z' },
      { invoiceNumber: 'TRD-B', issueDate: sameIssued, poOrderedAt: '2026-09-04T08:27:44.000Z' },
      { invoiceNumber: 'TRD-C', issueDate: sameIssued, poOrderedAt: '2026-08-31T15:56:09.000Z' }
    ];
    expect(sortInvoicesRecentFirst(list).map((i) => i.invoiceNumber)).toEqual(['TRD-B', 'TRD-C', 'TRD-A']);
  });
  it('발주 없는 청구서는 발행일로 섞여 들어가고, 날짜 없는 것은 맨 뒤', () => {
    const list = [
      { invoiceNumber: 'SUB-0817', issueDate: '2026-08-18T00:00:00.000Z', poOrderedAt: null },
      { invoiceNumber: 'TRD-0904', issueDate: '2026-09-08T20:44:06.000Z', poOrderedAt: '2026-09-04T08:27:44.000Z' },
      { invoiceNumber: 'X', issueDate: '', poOrderedAt: null },
      { invoiceNumber: 'TRD-0827', issueDate: '2026-09-08T20:44:06.000Z', poOrderedAt: '2026-08-27T08:50:06.000Z' }
    ];
    expect(sortInvoicesRecentFirst(list).map((i) => i.invoiceNumber)).toEqual(['TRD-0904', 'TRD-0827', 'SUB-0817', 'X']);
  });
  it('원본 배열은 바뀌지 않는다 · 같은 날짜는 번호 역순', () => {
    const list = [
      { invoiceNumber: 'TRD-001', issueDate: '2026-09-08T04:45:13.000Z' },
      { invoiceNumber: 'TRD-002', issueDate: '2026-09-08T04:45:13.000Z' }
    ];
    const sorted = sortInvoicesRecentFirst(list);
    expect(sorted.map((i) => i.invoiceNumber)).toEqual(['TRD-002', 'TRD-001']);
    expect(list.map((i) => i.invoiceNumber)).toEqual(['TRD-001', 'TRD-002']);
    expect(Number.isNaN(invoiceListDateMs({ issueDate: 'not a date' }))).toBe(true);
  });
});
