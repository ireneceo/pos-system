// Contract 금액/잔여기간 표시를 위한 공용 헬퍼.
// - 구독플랜(plans)이 연결되어 있으면 "청구 기준"인 플랜 값을 노출
// - 플랜이 없으면 financial_terms (협상 값)을 노출하고 source='terms' 로 구분
// 카드(ContractPipeline)와 상세 페이지(ContractDetail) 양쪽에서 일관된 렌더를 위해 재사용.

export interface BillableItem {
  label: string;
  amount: string;
  raw?: number | null;
}

export interface BillableSummary {
  source: 'plans' | 'terms' | 'none';
  items: BillableItem[];
  currency: string;
  moreCount: number;
}

interface ContractLike {
  entity_type?: 'brand' | 'foodcourt' | string;
  contract_type?: string | null;
  financial_terms?: Record<string, any> | null;
  plans?: Array<{
    entityPlan?: {
      name?: string;
      currency?: string;
      charge_type?: 'fixed' | 'percentage';
      percentage_value?: number | string | null;
      prices?: Array<{ currency: string; monthly_price: number | string }>;
    } | null;
  }> | null;
}

const fmtMoney = (amount: number, currency = 'MYR'): string => {
  const symbol = currency === 'MYR' ? 'RM' : currency;
  return `${symbol} ${amount.toLocaleString('en-MY', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

const toNum = (v: unknown): number | null => {
  if (v == null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/**
 * 구독플랜이 연결된 계약의 billable 항목 추출.
 * - fixed 플랜: prices 배열에서 currency 일치 항목의 monthly_price
 * - percentage 플랜: percentage_value %
 */
const fromPlans = (contract: ContractLike, maxItems = 2): BillableSummary => {
  const plans = (contract.plans || []).filter(p => p?.entityPlan);
  const primaryCurrency = plans[0]?.entityPlan?.currency || 'MYR';

  const items: BillableItem[] = plans.map(p => {
    const ep = p.entityPlan!;
    const name = ep.name || 'Plan';
    if (ep.charge_type === 'percentage') {
      const pct = toNum(ep.percentage_value);
      return { label: name, amount: pct != null ? `${pct}%` : '-', raw: pct };
    }
    const priceRow = (ep.prices || []).find(r => r.currency === (ep.currency || primaryCurrency)) || (ep.prices || [])[0];
    const price = toNum(priceRow?.monthly_price);
    return { label: name, amount: price != null ? `${fmtMoney(price, priceRow?.currency || primaryCurrency)}/mo` : '-', raw: price };
  });

  return {
    source: 'plans',
    items: items.slice(0, maxItems),
    currency: primaryCurrency,
    moreCount: Math.max(0, items.length - maxItems)
  };
};

/**
 * financial_terms 에서 entity_type 별 주요 항목 추출 (협상 단계 참고).
 */
const fromTerms = (contract: ContractLike, maxItems = 2): BillableSummary => {
  const ft = contract.financial_terms || {};
  const currency = 'MYR';
  const items: BillableItem[] = [];

  if (contract.entity_type === 'brand') {
    // Brand: franchise_fee (one-time) + royalty (% or fixed) + system_monthly_fee
    const fee = toNum(ft.franchise_fee);
    if (fee != null) items.push({ label: 'Franchise Fee', amount: fmtMoney(fee, currency), raw: fee });

    const royaltyType = ft.royalty_type;
    const royaltyVal = toNum(ft.royalty_value);
    if (royaltyVal != null) {
      if (royaltyType === 'percent' || royaltyType === 'percentage') {
        items.push({ label: 'Royalty', amount: `${royaltyVal}%`, raw: royaltyVal });
      } else {
        items.push({ label: 'Royalty', amount: `${fmtMoney(royaltyVal, currency)}/mo`, raw: royaltyVal });
      }
    }

    const sysMonthly = toNum(ft.system_monthly_fee);
    if (sysMonthly != null) items.push({ label: 'System Fee', amount: `${fmtMoney(sysMonthly, currency)}/mo`, raw: sysMonthly });
  } else if (contract.entity_type === 'foodcourt') {
    // Foodcourt: rent_schedule year1 > base_rent > maintenance_fee
    let rent: number | null = null;
    if (Array.isArray(ft.rent_schedule) && ft.rent_schedule.length > 0) {
      const y1 = ft.rent_schedule.find((r: any) => Number(r.year) === 1) || ft.rent_schedule[0];
      rent = toNum(y1?.base_rent);
    }
    if (rent == null) rent = toNum(ft.base_rent);
    if (rent != null) items.push({ label: 'Rent', amount: `${fmtMoney(rent, currency)}/mo`, raw: rent });

    const mgmt = toNum(ft.maintenance_fee);
    if (mgmt != null) items.push({ label: 'Mgmt Fee', amount: `${fmtMoney(mgmt, currency)}/mo`, raw: mgmt });

    const pr = ft.percentage_rent;
    const prRate = toNum(pr?.rate);
    if (prRate != null) items.push({ label: '% Rent', amount: `${prRate}%`, raw: prRate });
  }

  return {
    source: items.length > 0 ? 'terms' : 'none',
    items: items.slice(0, maxItems),
    currency,
    moreCount: Math.max(0, items.length - maxItems)
  };
};

/**
 * 계약의 청구 요약. 플랜 > financial_terms > none 순서.
 */
export function getBillableSummary(contract: ContractLike, maxItems = 2): BillableSummary {
  if (Array.isArray(contract.plans) && contract.plans.length > 0) {
    return fromPlans(contract, maxItems);
  }
  return fromTerms(contract, maxItems);
}

export type RemainingSeverity = 'expired' | 'warning' | 'normal' | 'none';

export interface RemainingInfo {
  severity: RemainingSeverity;
  label: string;
  months: number;
}

/**
 * 잔여 개월 계산 — 레스토랑 타임존 의존 없이 날짜만(DATEONLY) 비교.
 * - end_date < today → expired
 * - 0 ≤ months ≤ 3 → warning
 * - months > 3 → normal
 */
export function getRemainingInfo(endDateStr?: string | null): RemainingInfo {
  if (!endDateStr) return { severity: 'none', label: '', months: 0 };

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const end = endDateStr.slice(0, 10);

  if (end < todayStr) return { severity: 'expired', label: 'Expired', months: 0 };

  // days → months (30.44)
  const endDate = new Date(end + 'T00:00:00');
  const startOfToday = new Date(todayStr + 'T00:00:00');
  const diffDays = Math.floor((endDate.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));
  const months = Math.max(0, Math.round(diffDays / 30.44));

  if (months <= 3) {
    return { severity: 'warning', label: months === 0 ? 'Expires in <1 month' : `Expires in ${months}mo`, months };
  }
  return { severity: 'normal', label: `${months}mo left`, months };
}
