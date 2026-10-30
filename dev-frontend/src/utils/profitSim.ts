/**
 * 손익 시뮬레이터 v1 — 브라우저 순수 계산(저장 없음) · 설계 .claude/fable-design-20261029-brand-profitability.md §3-9
 *
 * 기준값은 서버(/profitability/sim-baseline)가 최근 12주 실적으로 준다. 여기는 손잡이를 돌린 값으로만 계산한다.
 *   원가율  f' = f × (1 + 원재료 인상률) × (1 + 폐기율)
 *   공헌이익률 c' = 1 − 할인율 − f' − 수수료율
 *   영업이익(S) = c'·S − 인건비 − 임대(S) − 로열티(S) − 기타 고정비
 * 임대가 «max(고정, 매출 %)» 이면 손익분기를 두 구간으로 나눠 푼다(검산 사례 5·6 = profitSim.test.ts).
 */

export type RuleKind = 'fixed' | 'pct' | 'max';

export interface CostRule {
  category: 'rent' | 'royalty' | 'marketing_fund' | 'utilities' | 'other_fixed' | 'external_channel';
  rule: RuleKind;
  fixed_amount: number | null;
  pct: number | null;
}

export interface SimInput {
  /** 월 순매출 */
  sales: number;
  /** 할인율 % (총매출 대비) */
  discountPct: number;
  /** 지금 레시피 기준 원가율 % (순매출 대비) */
  foodCostPct: number;
  /** 원재료 인상률 % */
  ingredientRisePct: number;
  /** 평균 폐기율 % */
  wastePct: number;
  /** 결제·채널 수수료율 % */
  feePct: number;
  /** 월 인건비 */
  labor: number;
  /** 운영비 규칙(임대·로열티·공과금 등) */
  rules: CostRule[];
}

const n = (v: unknown) => { const x = Number(v); return Number.isFinite(x) ? x : 0; };
export const round2 = (v: number) => Math.round(v * 100) / 100;

/** 규칙 1개의 월 금액 */
export function ruleAmount(r: CostRule, sales: number): number {
  const fixed = n(r.fixed_amount);
  const share = n(sales) * n(r.pct) / 100;
  if (r.rule === 'pct') return share;
  if (r.rule === 'max') return Math.max(fixed, share);
  return fixed;
}

/** 공헌이익률(0~1) */
export function contributionRate(i: Pick<SimInput, 'discountPct' | 'foodCostPct' | 'ingredientRisePct' | 'wastePct' | 'feePct'>): number {
  const f = (n(i.foodCostPct) / 100) * (1 + n(i.ingredientRisePct) / 100) * (1 + n(i.wastePct) / 100);
  return 1 - n(i.discountPct) / 100 - f - n(i.feePct) / 100;
}

export interface SimResult {
  contributionRate: number;
  contribution: number;
  rent: number;
  royalty: number;
  otherFixed: number;
  labor: number;
  operatingProfit: number;
}

/** 매출 S 에서의 예상 손익 */
export function simulate(i: SimInput, sales = i.sales): SimResult {
  const c = contributionRate(i);
  let rent = 0; let royalty = 0; let otherFixed = 0;
  for (const r of i.rules) {
    const amt = ruleAmount(r, sales);
    if (r.category === 'rent') rent += amt;
    else if (r.category === 'royalty' || r.category === 'marketing_fund') royalty += amt;
    else if (r.category !== 'external_channel') otherFixed += amt;
  }
  const contribution = c * sales;
  return {
    contributionRate: c,
    contribution: round2(contribution),
    rent: round2(rent), royalty: round2(royalty), otherFixed: round2(otherFixed), labor: round2(n(i.labor)),
    operatingProfit: round2(contribution - n(i.labor) - rent - royalty - otherFixed),
  };
}

export type BreakEven =
  | { kind: 'ok'; sales: number; /** 임대가 max 규칙일 때 고정 → % 로 바뀌는 매출 */ rentSwitch: number | null }
  | { kind: 'impossible'; rentSwitch: number | null };

/**
 * 손익분기 매출 (§3-9). 고정비 F + 목표이익 T 를 덮는 매출.
 * 임대 규칙이 여럿이면 하나로 합치지 않고, 매출에 비례하는 몫(pct·max 의 % 부분)과 고정 몫을 구간별로 푼다.
 */
export function breakEven(i: SimInput, targetProfit = 0): BreakEven {
  const c = contributionRate(i);
  // 매출에 비례하는 비율(로열티·마케팅·pct 규칙)과 고정 금액
  let pctRate = 0; let fixed = n(i.labor) + n(targetProfit);
  const maxRules: CostRule[] = [];
  for (const r of i.rules) {
    if (r.category === 'external_channel') continue;
    if (r.rule === 'pct') pctRate += n(r.pct) / 100;
    else if (r.rule === 'fixed') fixed += n(r.fixed_amount);
    else maxRules.push(r);
  }
  // max 규칙의 전환점(고정 = 매출 %) 들로 구간을 나눈다
  const switches = maxRules.map(r => (n(r.pct) > 0 ? n(r.fixed_amount) / (n(r.pct) / 100) : Infinity)).sort((a, b) => a - b);
  const bounds = [0, ...switches.filter(Number.isFinite), Infinity];
  const rentSwitch = switches.length && Number.isFinite(switches[0]) ? round2(switches[0]) : null;
  for (let k = 0; k < bounds.length - 1; k++) {
    const lo = bounds[k]; const hi = bounds[k + 1];
    // 이 구간에서: 전환점 아래인 max 규칙 = 고정, 위인 것 = %
    let F = fixed; let r = pctRate;
    for (const m of maxRules) {
      const sw = n(m.pct) > 0 ? n(m.fixed_amount) / (n(m.pct) / 100) : Infinity;
      if (sw >= hi) F += n(m.fixed_amount); else r += n(m.pct) / 100;
    }
    const margin = c - r;
    if (margin <= 0) continue;
    const s = F / margin;
    if (s >= lo && s <= hi) return { kind: 'ok', sales: round2(s), rentSwitch };
  }
  return { kind: 'impossible', rentSwitch };
}
