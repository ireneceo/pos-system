// 주문 준비 보드 칸 배치 (2026-11-05 Fable 판정 Ⅱ-3)
import { boardColumnOf, lineCounts } from './boardColumn';

const T = '2026-11-05T01:00:00Z';
const line = (o: any = {}) => ({ is_service: false, shipped_at: null, prepared_at: null, ...o });

describe('boardColumnOf', () => {
  test('새 주문 → new', () => expect(boardColumnOf({ status: 'submitted', items: [line()] })).toBe('new'));
  test('취소·거절·임시 → 숨김', () => {
    ['cancelled', 'rejected', 'draft', 'pending_approval'].forEach(s => expect(boardColumnOf({ status: s })).toBeNull());
  });
  test('끝난 주문 → done', () => {
    ['delivered', 'received', 'closed'].forEach(s => expect(boardColumnOf({ status: s, items: [line()] })).toBe('done'));
  });
  test('일부 받음 · 안 보낸 줄 미준비 → preparing', () =>
    expect(boardColumnOf({ status: 'partial_received', shipped_at: T, items: [line({ shipped_at: T }), line()] })).toBe('preparing'));
  test('일부 받음 · 안 보낸 줄 준비 → ready', () =>
    expect(boardColumnOf({ status: 'partial_received', shipped_at: T, items: [line({ shipped_at: T }), line({ prepared_at: T })] })).toBe('ready'));
  test('일부 받음 · 전부 보냄 → done', () =>
    expect(boardColumnOf({ status: 'partial_received', shipped_at: T, items: [line({ shipped_at: T })] })).toBe('done'));
  test('확인됨 · 준비 안 된 줄 있음 → preparing', () =>
    expect(boardColumnOf({ status: 'confirmed', items: [line({ prepared_at: T }), line()] })).toBe('preparing'));
  test('확인됨 · 전부 준비 → ready', () =>
    expect(boardColumnOf({ status: 'confirmed', items: [line({ prepared_at: T }), line({ prepared_at: T })] })).toBe('ready'));
  test('서비스 줄은 준비 대상 아님', () =>
    expect(boardColumnOf({ status: 'confirmed', items: [line({ prepared_at: T }), line({ is_service: true })] })).toBe('ready'));
  test('서비스만 → ready (완료 처리)', () =>
    expect(boardColumnOf({ status: 'confirmed', is_service_only: true, items: [line({ is_service: true })] })).toBe('ready'));
  test('일부 보냄 · 남은 줄 미준비 → preparing', () =>
    expect(boardColumnOf({ status: 'shipped', shipped_at: T, items: [line({ shipped_at: T }), line()] })).toBe('preparing'));
  test('일부 보냄 · 남은 줄 준비 → ready', () =>
    expect(boardColumnOf({ status: 'shipped', shipped_at: T, items: [line({ shipped_at: T }), line({ prepared_at: T })] })).toBe('ready'));
  test('전부 보냄 → shipped', () =>
    expect(boardColumnOf({ status: 'shipped', shipped_at: T, items: [line({ shipped_at: T })] })).toBe('shipped'));
  test('옛 전량 출고(헤더만) → shipped', () =>
    expect(boardColumnOf({ status: 'shipped', shipped_at: T, items: [line(), line()] })).toBe('shipped'));
  test('서버 숫자가 있으면 그것을 따름', () =>
    expect(boardColumnOf({ status: 'confirmed', unshipped_count: 2, unprepared_count: 0, items: [line(), line()] })).toBe('ready'));
});

describe('lineCounts', () => {
  test('보낸 줄은 준비 여부와 무관', () =>
    expect(lineCounts({ status: 'shipped', shipped_at: T, items: [line({ shipped_at: T }), line()] })).toEqual({ unshipped: 1, unprepared: 1 }));
});
