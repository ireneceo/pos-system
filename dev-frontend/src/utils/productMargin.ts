/**
 * 프로덕트 마진 — **단일 소스**. 목록 카드와 편집 화면이 같은 숫자를 쓴다.
 *
 * 2026-09-20 Irene 신고:
 *   「김치가 우리 공급가가 48링깃이지? 10kg 1박스에. 이거 우리 프로덕트 판매는 1kg 기준이거든.
 *     … 그래서 마진이 -540%로 나와. … 공급단위 수량이랑 우리 판매단위 수량이 다른데 그걸 각각
 *     넣는 게 아니면 기준수량에 맞춰서 계산되어야 하잖아.
 *     그리고 리스트에 나오는 마진이랑 상세 에디터에 나오는 마진이 달라.」
 *
 * 🔴 내가 처음에 틀린 지점: `unit_cost` 를 «1단위 값» 으로 읽었다.
 *   실제로는 **`base_quantity` 만큼의 값**이다 — 김치 재고아이템은 `unit='g' · base_quantity=10000 ·
 *   unit_cost=48` 즉 «10,000g 에 RM 48»(= g당 0.0048). 그걸 그대로 빼서 7.50 − 48 = −40.50(−540%)이
 *   나왔다. 같은 함정이 2026-09-11 ×1000 사고에도 있었다.
 *
 * 규칙 두 줄:
 *   ① 1단위 원가 = `unit_cost / base_quantity`   (재고아이템·레시피 모두 같다)
 *   ② 프로덕트 원가 = 1단위 원가 × (프로덕트 기준양을 원가 쪽 단위로 환산한 값)
 *      예) 김치: (48 / 10000) × convert(1 kg → g)=1000 → RM 4.80, 판매 7.50 → 마진 2.70 (36%)
 *
 * 환산이 불가능한 단위 조합(예: kg ↔ piece)은 **추측하지 않고** 「환산 불가」로 돌려준다.
 */
import { convertUnit } from './unitConversion';

export type MarginState =
  | { kind: 'ok'; margin: number; rate: number; cost: number; costPerUnit: number }
  | { kind: 'loss'; margin: number; rate: number; cost: number; costPerUnit: number }
  | { kind: 'thin'; margin: number; rate: number; cost: number; costPerUnit: number }
  | { kind: 'noPrice'; cost: number; costPerUnit: number }
  | { kind: 'noCost' }
  | { kind: 'noLink' }
  | { kind: 'noConvert'; fromUnit: string; toUnit: string };

/** 10% 미만이면 «박하다» */
export const THIN_MARGIN_RATE = 0.1;

type CostSource = { unit?: string | null; base_quantity?: number | string | null; cost: number };

/** 원가 쪽(재고아이템 또는 레시피)을 한 모양으로 만든다 */
function costSourceOf(product: any): CostSource | null {
  if (product?.product_ingredient_id && product?.stockItem) {
    return {
      unit: product.stockItem.unit,
      base_quantity: product.stockItem.base_quantity,
      cost: Number(product.stockItem.unit_cost) || 0,
    };
  }
  if (product?.product_recipe_id && product?.productRecipe) {
    // 레시피는 «한 번 만들면 나오는 양(yield)» 에 대한 재료비다 — 기준양 자리가 yield_amount.
    return {
      unit: product.productRecipe.yield_unit,
      base_quantity: product.productRecipe.yield_amount,
      cost: Number(product.productRecipe.total_ingredient_cost) || 0,
    };
  }
  return null;
}

export function marginStateOf(product: any): MarginState {
  const linked = !!(product?.product_ingredient_id || product?.product_recipe_id || product?.recipe_id);
  if (!linked) return { kind: 'noLink' };

  const src = costSourceOf(product);
  if (!src || !(src.cost > 0)) return { kind: 'noCost' };

  const srcBase = Number(src.base_quantity) || 0;
  if (!(srcBase > 0)) return { kind: 'noCost' };   // 기준양이 없으면 1단위 값을 낼 수 없다
  const costPerSrcUnit = src.cost / srcBase;        // ① 1단위 원가

  const prodUnit = String(product.unit || '').trim();
  const srcUnit = String(src.unit || '').trim();
  const prodBase = Number(product.base_quantity) || 1;

  // ② 프로덕트 한 개(= 기준양)가 원가 쪽 단위로 얼마인지
  let qtyInSrcUnit: number | null;
  if (!prodUnit || !srcUnit || prodUnit === srcUnit) {
    qtyInSrcUnit = prodBase;
  } else {
    qtyInSrcUnit = convertUnit(prodBase, prodUnit, srcUnit);
  }
  if (qtyInSrcUnit === null) return { kind: 'noConvert', fromUnit: prodUnit, toUnit: srcUnit };

  const cost = costPerSrcUnit * qtyInSrcUnit;
  const price = Number(product.unit_price) || 0;
  if (!(price > 0)) return { kind: 'noPrice', cost, costPerUnit: costPerSrcUnit };

  const margin = price - cost;
  const rate = margin / price;
  if (margin < 0) return { kind: 'loss', margin, rate, cost, costPerUnit: costPerSrcUnit };
  if (rate < THIN_MARGIN_RATE) return { kind: 'thin', margin, rate, cost, costPerUnit: costPerSrcUnit };
  return { kind: 'ok', margin, rate, cost, costPerUnit: costPerSrcUnit };
}
