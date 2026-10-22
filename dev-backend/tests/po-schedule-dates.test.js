const D = require('../utils/poScheduleDates');

// 2026-10-26 = 월요일(1)
describe('poScheduleDates (정기 발주 날짜)', () => {
  const mon = { frequency: 'weekly', weekday: 1 };
  test('weekly: 첫 발주일 — 월요일 06시면 오늘, 07시면 다음 주', () => {
    expect(D.firstRunDate(mon, '2026-10-26', 6)).toBe('2026-10-26');
    expect(D.firstRunDate(mon, '2026-10-26', 7)).toBe('2026-11-02');
    expect(D.firstRunDate(mon, '2026-10-22', 15)).toBe('2026-10-26');
  });
  test('weekly: 생성 뒤 다음 = +7', () => {
    expect(D.nextRunAfter(mon, '2026-10-26', '2026-10-26')).toBe('2026-11-02');
  });
  test('biweekly: +14, 밀려도 박자 유지', () => {
    const bi = { frequency: 'biweekly', weekday: 1 };
    expect(D.nextRunAfter(bi, '2026-10-26', '2026-10-26')).toBe('2026-11-09');
    // 예정일 10-26 을 화요일 10-27 에 늦게 만들었다 → 다음은 11-09 (11-02 아님)
    expect(D.nextRunAfter(bi, '2026-10-26', '2026-10-27')).toBe('2026-11-09');
  });
  test('밀림 복구: 3주 밀려도 다음은 오늘 뒤 첫 예정일 하나', () => {
    expect(D.nextRunAfter(mon, '2026-10-05', '2026-10-28')).toBe('2026-11-02');
  });
  test('monthly: 날짜 · 달 넘김 · 연말', () => {
    const m15 = { frequency: 'monthly', day_of_month: 15 };
    expect(D.firstRunDate(m15, '2026-10-10', 12)).toBe('2026-10-15');
    expect(D.firstRunDate(m15, '2026-10-15', 8)).toBe('2026-11-15');
    expect(D.nextRunAfter(m15, '2026-12-15', '2026-12-15')).toBe('2027-01-15');
  });
  test('isDue · localParts · 검사', () => {
    expect(D.isDue('2026-10-26', { date: '2026-10-26', hour: 6 })).toBe(false);
    expect(D.isDue('2026-10-26', { date: '2026-10-26', hour: 7 })).toBe(true);
    expect(D.isDue('2026-10-26', { date: '2026-10-25', hour: 23 })).toBe(false);
    // 2026-10-25T23:30Z = 쿠알라룸푸르 10-26 07:30
    expect(D.localParts(new Date('2026-10-25T23:30:00Z'), 'Asia/Kuala_Lumpur')).toEqual({ date: '2026-10-26', hour: 7 });
    expect(D.validateCadence({ frequency: 'monthly', day_of_month: 31 })).toMatch(/1~28/);
    expect(D.validateCadence({ frequency: 'weekly', weekday: 3 })).toBeNull();
  });
});
