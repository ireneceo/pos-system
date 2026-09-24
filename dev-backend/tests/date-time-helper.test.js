/**
 * dateTimeHelper — 하루 경계 회귀 테스트 (2026-09-24 Fable 게이트에서 추가)
 *
 * 왜 있는가: `_tzOffsetAt` 이 Intl 의 «초까지만» 결과로 오프셋을 내서, 입력 밀리초(999)만큼
 * 오프셋이 작아지고 `endOfDay` 가 **다음 날 00:00:00.997** 로 넘쳤다. 날짜로 조회하는 라우트
 * (SOA 기간·예약 하루 조회·금고 기간·주문 기록) 전부가 상한에 다음 날 첫 1초를 섞고 있었다.
 * 이 파일이 없으면 그 한 줄이 되돌아가도 어떤 게이트도 못 잡는다.
 */
const { getDateBounds, getMonthBounds } = require('../utils/dateTimeHelper');

describe('getDateBounds — 하루의 끝은 그 날 23:59:59.999 (다음 날로 넘치지 않는다)', () => {
  const cases = [
    // [날짜, tz, startOfDay(UTC), endOfDay(UTC)]
    ['2026-08-31', 'Asia/Kuala_Lumpur', '2026-08-30T16:00:00.000Z', '2026-08-31T15:59:59.999Z'],
    ['2026-06-30', 'UTC',               '2026-06-30T00:00:00.000Z', '2026-06-30T23:59:59.999Z'],
    ['2026-01-15', 'Asia/Seoul',        '2026-01-14T15:00:00.000Z', '2026-01-15T14:59:59.999Z'],
    // DST 전환일 — 23시간짜리 날 / 25시간짜리 날
    ['2026-03-29', 'Europe/London',     '2026-03-29T00:00:00.000Z', '2026-03-29T22:59:59.999Z'],
    ['2026-10-25', 'Europe/London',     '2026-10-24T23:00:00.000Z', '2026-10-25T23:59:59.999Z'],
    ['2026-11-01', 'America/New_York',  '2026-11-01T04:00:00.000Z', '2026-11-02T04:59:59.999Z'],
  ];

  test.each(cases)('%s %s', (day, tz, start, end) => {
    const b = getDateBounds(day, tz);
    expect(b.startOfDay.toISOString()).toBe(start);
    expect(b.endOfDay.toISOString()).toBe(end);
  });

  test('endOfDay 는 startOfDay 다음 날의 startOfDay 보다 정확히 1ms 앞이다', () => {
    const a = getDateBounds('2026-08-31', 'Asia/Kuala_Lumpur');
    const next = getDateBounds('2026-09-01', 'Asia/Kuala_Lumpur');
    expect(next.startOfDay.getTime() - a.endOfDay.getTime()).toBe(1);
  });

  test('getMonthBounds 의 끝도 같은 규칙', () => {
    const { monthEnd } = getMonthBounds(2026, 8, 'Asia/Kuala_Lumpur');
    expect(monthEnd.toISOString()).toBe('2026-08-31T15:59:59.999Z');
  });
});
