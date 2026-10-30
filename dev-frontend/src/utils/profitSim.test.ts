// 손익 시뮬레이터 검산 — 설계 §3-10 사례 5·6 (임대 max(6,000, 13 %), 고정비 20,000)
import { breakEven, simulate, contributionRate, CostRule } from './profitSim';

const rent: CostRule = { category: 'rent', rule: 'max', fixed_amount: 6000, pct: 13 };
// c' 를 정확히 맞추려고 원가율·할인·수수료로 만든다: c' = 1 − f
const base = { sales: 40000, discountPct: 0, ingredientRisePct: 0, wastePct: 0, feePct: 0, labor: 20000, rules: [rent] };

describe('사례 5 — c′ = 0.62', () => {
  const input = { ...base, foodCostPct: 38 };
  test('공헌이익률 0.62', () => expect(contributionRate(input)).toBeCloseTo(0.62));
  test('손익분기 41,935.48 (전환점 46,153.85 아래 → 고정 임대 구간)', () => {
    const r = breakEven(input);
    expect(r.kind).toBe('ok');
    if (r.kind === 'ok') {
      expect(r.sales).toBe(41935.48);
      expect(r.rentSwitch).toBe(46153.85);
    }
  });
  test('손익분기 매출에서 영업이익 ≈ 0', () => {
    expect(Math.abs(simulate(input, 41935.48).operatingProfit)).toBeLessThan(0.01);
  });
});

describe('사례 6 — c′ = 0.10', () => {
  test('흑자 불가', () => {
    expect(breakEven({ ...base, foodCostPct: 90 }).kind).toBe('impossible');
  });
});

describe('구간 위쪽에서 풀리는 경우', () => {
  test('고정비가 커서 전환점을 넘으면 % 임대 구간 식으로', () => {
    // c'=0.62, F=30,000 → BEP₁ = 36,000/0.62 = 58,064.5 > S* 기각 · BEP₂ = 30,000/(0.62−0.13) = 61,224.49
    const r = breakEven({ ...base, labor: 30000, foodCostPct: 38 });
    expect(r.kind === 'ok' && r.sales).toBe(61224.49);
  });
  test('목표이익을 더한다', () => {
    const r = breakEven({ ...base, foodCostPct: 38 }, 5000);
    // F+T = 25,000 → (25,000+6,000)/0.62 = 50,000 > S* → 25,000/0.49 = 51,020.41
    expect(r.kind === 'ok' && r.sales).toBe(51020.41);
  });
});
