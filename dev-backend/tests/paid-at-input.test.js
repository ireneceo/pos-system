/**
 * 결제일 입력 규칙 — 2026-09-14 (Irene 지시로 «결제함» 에 날짜를 넣게 되면서 생긴 계약).
 * 라우트와 서비스가 같은 util 을 쓰므로 여기서 규칙을 박아 둔다.
 */
const { parsePaidAt } = require('../utils/paidAtInput');

const NOW = new Date('2026-09-14T12:00:00Z').getTime();

describe('parsePaidAt — 결제일 입력', () => {
  test('비어 있으면 null (호출부가 현재시각을 쓴다)', () => {
    for (const empty of [undefined, null, '']) {
      const r = parsePaidAt(empty, NOW);
      expect(r.ok).toBe(true);
      expect(r.value).toBeNull();
    }
  });

  test('과거 날짜는 그대로 받는다', () => {
    const r = parsePaidAt('2026-09-01', NOW);
    expect(r.ok).toBe(true);
    expect(r.value.toISOString().slice(0, 10)).toBe('2026-09-01');
  });

  test('오늘은 받는다', () => {
    const r = parsePaidAt('2026-09-14', NOW);
    expect(r.ok).toBe(true);
  });

  test('날짜로 못 읽으면 거부', () => {
    const r = parsePaidAt('not-a-date', NOW);
    expect(r.ok).toBe(false);
    expect(r.code).toBe('INVALID_PAID_AT');
  });

  test('미래는 거부 — 오타로 매출·마감이 미래로 밀리지 않게', () => {
    const r = parsePaidAt('2026-10-01', NOW);
    expect(r.ok).toBe(false);
    expect(r.code).toBe('INVALID_PAID_AT');
  });

  test('시차 여유 24시간 안쪽은 받는다', () => {
    const r = parsePaidAt(new Date(NOW + 12 * 3600 * 1000).toISOString(), NOW);
    expect(r.ok).toBe(true);
  });
});
