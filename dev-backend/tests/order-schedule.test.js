/**
 * 판매자 발주 마감·배송일 — utils/orderSchedule.js 순수 사례 (2026-10-27 Fable 설계 M-6)
 * 시간대 Asia/Kuala_Lumpur(UTC+8). 2026-10-26 = 월요일.
 */
const {
  normalizeScheduleForSave, readSchedule, orderWindows, expectedDeliveryAt
} = require('../utils/orderSchedule');

const KL = 'Asia/Kuala_Lumpur';
const ALL = [0, 1, 2, 3, 4, 5, 6];
const sch = (rules, timezone = KL) => ({ timezone, rules });
const at = (iso) => new Date(iso);

describe('orderWindows', () => {
  test('1. 매일 15:00 익일 — 월 14:00 KL → 월 15:00(07:00Z), 배송 화', () => {
    const w = orderWindows(sch([{ days: ALL, time: '15:00', delivery: { kind: 'after_days', min: 1, max: 1 } }]),
      at('2026-10-26T06:00:00Z'));
    expect(w.next.cutoff_at).toBe('2026-10-26T07:00:00.000Z');
    expect(w.next.cutoff_date).toBe('2026-10-26');
    expect(w.next.delivery_from).toBe('2026-10-27');
    expect(w.next.delivery_to).toBe('2026-10-27');
  });

  test('2. 정각은 지난 것 — 월 15:00:00 → previous 월 15:00, next 화 15:00', () => {
    const w = orderWindows(sch([{ days: ALL, time: '15:00', delivery: null }]), at('2026-10-26T07:00:00Z'));
    expect(w.previous.cutoff_at).toBe('2026-10-26T07:00:00.000Z');
    expect(w.next.cutoff_date).toBe('2026-10-27');
    expect(w.next.delivery_from).toBeNull();
  });

  test('3. 월·목 15:00 + 매주 토', () => {
    const s = sch([{ days: [1, 4], time: '15:00', delivery: { kind: 'weekday', weekday: 6 } }]);
    const mon = orderWindows(s, at('2026-10-26T02:00:00Z'));
    expect(mon.next.cutoff_date).toBe('2026-10-26');
    expect(mon.next.delivery_from).toBe('2026-10-31');
    expect(mon.following.cutoff_date).toBe('2026-10-29');
    expect(mon.following.delivery_from).toBe('2026-10-31');
    const fri = orderWindows(s, at('2026-10-30T02:00:00Z')); // 금 10:00 KL
    expect(fri.next.cutoff_date).toBe('2026-11-02');
    expect(fri.next.delivery_from).toBe('2026-11-07');
  });

  test('4. 토 마감 + 매주 토 → 다음 주 토(같은 날 아님)', () => {
    const w = orderWindows(sch([{ days: [6], time: '12:00', delivery: { kind: 'weekday', weekday: 6 } }]),
      at('2026-10-31T01:00:00Z'));
    expect(w.next.cutoff_date).toBe('2026-10-31');
    expect(w.next.delivery_from).toBe('2026-11-07');
  });

  test('5. 1–2일 후, 금 마감 → 토~일', () => {
    const w = orderWindows(sch([{ days: [5], time: '17:00', delivery: { kind: 'after_days', min: 1, max: 2 } }]),
      at('2026-10-30T02:00:00Z'));
    expect(w.next.delivery_from).toBe('2026-10-31');
    expect(w.next.delivery_to).toBe('2026-11-01');
  });

  test('6. 당일 → from=to=마감 날', () => {
    const w = orderWindows(sch([{ days: ALL, time: '09:00', delivery: { kind: 'after_days', min: 0, max: 0 } }]),
      at('2026-10-26T00:00:00Z'));
    expect(w.next.cutoff_date).toBe('2026-10-26');
    expect(w.next.delivery_from).toBe('2026-10-26');
    expect(w.next.delivery_to).toBe('2026-10-26');
  });

  test('7. 12-31 마감 익일 → 다음 해 01-01', () => {
    const w = orderWindows(sch([{ days: ALL, time: '15:00', delivery: { kind: 'after_days', min: 1, max: 1 } }]),
      at('2026-12-31T01:00:00Z'));
    expect(w.next.cutoff_date).toBe('2026-12-31');
    expect(w.next.delivery_from).toBe('2027-01-01');
  });

  test('8. 같은 요일 09:00·15:00, 월 10:00 → next 월 15:00, previous 월 09:00', () => {
    const w = orderWindows(sch([
      { days: [1], time: '09:00', delivery: null },
      { days: [1], time: '15:00', delivery: null }
    ]), at('2026-10-26T02:00:00Z'));
    expect(w.next.cutoff_at).toBe('2026-10-26T07:00:00.000Z');
    expect(w.previous.cutoff_at).toBe('2026-10-26T01:00:00.000Z');
  });

  test('9. 일정 없음·빈 rules·깨진 JSON → null, 던지지 않음', () => {
    expect(orderWindows(null)).toBeNull();
    expect(orderWindows({ timezone: KL, rules: [] })).toBeNull();
    expect(orderWindows('{broken')).toBeNull();
    expect(readSchedule('{broken')).toBeNull();
  });

  test('11. 시간대 — Asia/Bangkok(UTC+7) 이면 cutoff_at 이 1시간 뒤', () => {
    const w = orderWindows(sch([{ days: ALL, time: '15:00', delivery: null }], 'Asia/Bangkok'),
      at('2026-10-26T06:00:00Z'));
    expect(w.next.cutoff_at).toBe('2026-10-26T08:00:00.000Z');
    expect(w.timezone).toBe('Asia/Bangkok');
  });

  test('11b. 판매자 시간대 기준 날짜 자르기 — UTC 로는 전날인 시각(KL 월 02:00 = 일 18:00Z)', () => {
    const w = orderWindows(sch([{ days: [1], time: '09:00', delivery: null }]), at('2026-10-25T18:00:00Z'));
    expect(w.next.cutoff_date).toBe('2026-10-26');
    expect(w.next.cutoff_at).toBe('2026-10-26T01:00:00.000Z');
  });
});

describe('expectedDeliveryAt', () => {
  test('12. 마감 지난 시각 → 다음 마감의 배송일', () => {
    const s = sch([{ days: ALL, time: '15:00', delivery: { kind: 'after_days', min: 1, max: 2 } }]);
    expect(expectedDeliveryAt(s, at('2026-10-26T06:59:00Z'))).toBe('2026-10-27');
    expect(expectedDeliveryAt(s, at('2026-10-26T07:00:00Z'))).toBe('2026-10-28');
    expect(expectedDeliveryAt(sch([{ days: ALL, time: '15:00', delivery: null }]), at('2026-10-26T06:00:00Z'))).toBeNull();
    expect(expectedDeliveryAt(null)).toBeNull();
  });
});

describe('normalizeScheduleForSave', () => {
  test('10. 잘못된 값은 error', () => {
    const bad = [
      { rules: [{ days: [7], time: '15:00' }] },
      { rules: [{ days: [1], time: '25:00' }] },
      { rules: [{ days: [1], time: '15:00', delivery: { kind: 'after_days', min: 3, max: 1 } }] },
      { rules: [{ days: [1], time: '15:00', delivery: { kind: 'after_days', min: 1, max: 15 } }] },
      { rules: [{ days: [1, 2], time: '15:00' }, { days: [2], time: '15:00' }] },
      { rules: Array.from({ length: 8 }, (_, i) => ({ days: [i % 7], time: `1${i}:00` })) },
      { rules: [{ days: [], time: '15:00' }] },
      { rules: [{ days: [1], time: '15:00', delivery: { kind: 'weekday', weekday: 9 } }] }
    ];
    for (const b of bad) expect(normalizeScheduleForSave(b, KL).error).toBeTruthy();
  });

  test('10b. 요일 섞임·중복 → 정렬·제거, 시간대 저장, 빈 rules → null', () => {
    const { schedule, error } = normalizeScheduleForSave(
      { rules: [{ days: [4, 1, 4], time: '15:00', delivery: { kind: 'weekday', weekday: 6 } }] }, KL);
    expect(error).toBeUndefined();
    expect(schedule).toEqual({ timezone: KL, rules: [{ days: [1, 4], time: '15:00', delivery: { kind: 'weekday', weekday: 6 } }] });
    expect(normalizeScheduleForSave({ rules: [] }, KL)).toEqual({ schedule: null });
    expect(normalizeScheduleForSave(null, KL)).toEqual({ schedule: null });
  });

  test('10c. 이미 저장된 시간대는 유지(덮지 않음)', () => {
    const { schedule } = normalizeScheduleForSave({ rules: [{ days: [1], time: '15:00' }] }, KL, 'Asia/Bangkok');
    expect(schedule.timezone).toBe('Asia/Bangkok');
  });
});
