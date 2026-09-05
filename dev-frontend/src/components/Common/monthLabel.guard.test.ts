/**
 * 달력 월 라벨 회귀 가드 (Irene 2026-09-05 신고 · 2026-07-05 에 절반만 고쳐졌던 것).
 *
 * 증상: 브라우저 KST(UTC+9) · 매장 MYT(UTC+8) 에서 9월 달력이 "August 2026" 으로 그려져
 *       사용자가 엉뚱한 칸을 눌렀다. 발주 `Mark As Shipped` 모달에서 재현됨.
 * 원인: 월 라벨을 **시각**(`new Date(year, month)` = 브라우저 존 1일 00:00)으로 만든 뒤
 *       매장 존으로 변환해서. 달력의 월 라벨은 (연, 월) **라벨**이지 순간이 아니다.
 *
 * 이 테스트는 두 가지를 지킨다:
 *   ① 라벨이 타임존과 무관할 것
 *   ② 달력 부품 둘(CalendarPicker · DateField)이 **같은 함수**를 쓸 것
 *      — 7/5 에 한쪽만 고쳐 세 달 뒤 같은 신고가 다시 온 것이 이 조항의 이유다.
 */
import { getMonthLabel, MONTH_NAMES } from './CalendarPicker';

describe('달력 월 라벨은 타임존을 타지 않는다', () => {
  test('9월은 어떤 조합에서도 September', () => {
    expect(getMonthLabel(2026, 8)).toBe('September 2026');
  });

  test('타임존을 걸던 옛 방식은 실제로 한 달 밀린다 (반증)', () => {
    // 옛 코드 재현 — 브라우저가 매장보다 앞서면 전달 말일로 굴러떨어진다.
    const old = (y: number, m: number, browserOffsetAheadHours: number, storeTz: string) => {
      // 브라우저 존 1일 00:00 을 UTC 로 환산한 순간
      const instant = new Date(Date.UTC(y, m, 1, -browserOffsetAheadHours));
      return instant.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: storeTz });
    };
    // 브라우저 KST(UTC+9) · 매장 MYT(UTC+8) → 옛 방식은 August
    expect(old(2026, 8, 9, 'Asia/Kuala_Lumpur')).toBe('August 2026');
    // 새 방식은 타임존 인자가 아예 없다
    expect(getMonthLabel(2026, 8)).toBe('September 2026');
  });

  test('열두 달 모두 인덱스와 이름이 맞는다', () => {
    expect(MONTH_NAMES).toHaveLength(12);
    expect(getMonthLabel(2026, 0)).toBe('January 2026');
    expect(getMonthLabel(2026, 11)).toBe('December 2026');
  });
});

describe('달력 부품 둘이 같은 함수를 쓴다 (복사본 금지)', () => {
  test('DateField 가 CalendarPicker 의 getMonthLabel 을 import 한다', () => {
    const fs = require('fs');
    const src = fs.readFileSync(__dirname + '/DateField.tsx', 'utf8');
    expect(src).toMatch(/import \{ getMonthLabel \} from '\.\/CalendarPicker'/);
    // 자기 복사본을 다시 만들지 않았는지
    expect(src).not.toMatch(/const getMonthLabel\s*=/);
    expect(src).not.toMatch(/const MONTH_NAMES\s*=/);
  });
});
