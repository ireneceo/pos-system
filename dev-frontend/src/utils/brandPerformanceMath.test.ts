import { growthPct, GROWTH_CAP_PCT } from './brandPerformanceMath';

// 2026-11-17 Irene 실제 테스트: 이전 기간 매출이 거의 없을 때 +3285.2% 같은 값이 나옴 → «—»(null)
describe('growthPct', () => {
  it('보통 성장률은 소수 1자리', () => {
    expect(growthPct(150, 100)).toBe(50);
    expect(growthPct(80, 100)).toBe(-20);
  });
  it('이전 기간 0·음수면 null', () => {
    expect(growthPct(500, 0)).toBeNull();
    expect(growthPct(500, -1)).toBeNull();
  });
  it('상한(+1000%) 넘으면 null — 의미 없는 큰 값', () => {
    expect(growthPct(3385.2, 100)).toBeNull(); // +3285.2%
    expect(growthPct(1100, 100)).toBe(GROWTH_CAP_PCT); // 딱 +1000% 는 보임
    expect(growthPct(1101, 100)).toBeNull();
  });
});
