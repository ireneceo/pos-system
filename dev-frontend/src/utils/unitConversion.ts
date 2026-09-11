/**
 * Unit Conversion Utility
 *
 * 재료 단위 변환 및 비용 계산을 위한 유틸리티
 */

// Standard units list
export const STANDARD_UNITS = [
  // Weight
  { value: 'kg', label: 'kg (kilogram)', category: 'weight', baseUnit: 'g', multiplier: 1000 },
  { value: 'g', label: 'g (gram)', category: 'weight', baseUnit: 'g', multiplier: 1 },
  { value: 'mg', label: 'mg (milligram)', category: 'weight', baseUnit: 'g', multiplier: 0.001 },
  // Volume
  { value: 'L', label: 'L (liter)', category: 'volume', baseUnit: 'ml', multiplier: 1000 },
  { value: 'ml', label: 'ml (milliliter)', category: 'volume', baseUnit: 'ml', multiplier: 1 },
  // Count
  { value: 'piece', label: 'piece', category: 'count', baseUnit: 'piece', multiplier: 1 },
  { value: 'pack', label: 'pack', category: 'count', baseUnit: 'pack', multiplier: 1 },
  { value: 'box', label: 'box', category: 'count', baseUnit: 'box', multiplier: 1 },
  { value: 'can', label: 'can', category: 'count', baseUnit: 'can', multiplier: 1 },
  { value: 'bottle', label: 'bottle', category: 'count', baseUnit: 'bottle', multiplier: 1 },
  { value: 'bag', label: 'bag', category: 'count', baseUnit: 'bag', multiplier: 1 },
  // Serving
  { value: 'portion', label: 'portion', category: 'serving', baseUnit: 'portion', multiplier: 1 },
  { value: 'serving', label: 'serving', category: 'serving', baseUnit: 'serving', multiplier: 1 },
  // Cooking
  { value: 'tbsp', label: 'tbsp (tablespoon)', category: 'cooking', baseUnit: 'ml', multiplier: 15 },
  { value: 'tsp', label: 'tsp (teaspoon)', category: 'cooking', baseUnit: 'ml', multiplier: 5 },
  { value: 'cup', label: 'cup', category: 'cooking', baseUnit: 'ml', multiplier: 240 },
];

// 단위 값만 추출한 배열
export const UNIT_VALUES = STANDARD_UNITS.map(u => u.value);

// 카테고리별 단위 그룹
export const UNIT_GROUPS = {
  weight: STANDARD_UNITS.filter(u => u.category === 'weight'),
  volume: STANDARD_UNITS.filter(u => u.category === 'volume'),
  count: STANDARD_UNITS.filter(u => u.category === 'count'),
  serving: STANDARD_UNITS.filter(u => u.category === 'serving'),
  cooking: STANDARD_UNITS.filter(u => u.category === 'cooking'),
};

/**
 * 단위 정보 가져오기
 */
export const getUnitInfo = (unit: string) => {
  return STANDARD_UNITS.find(u => u.value === unit);
};

/**
 * 수량 입력의 증감 단위(step) — **단위가 정한다.** (2026-08-25)
 *
 * 팩·개·박스처럼 쪼갤 수 없는 단위는 1씩, 무게·부피는 소수(0.01) 입력이 의미가 있다.
 * 발주 카트·수령·반품 수량이 전부 `step="0.01"` 로 고정돼 있어 팩 상품에서 화살표를
 * 한 번 누르면 0.01 씩 오르던 것을 이 함수 하나로 통일한다.
 * 모르는 단위는 **세는 것으로 본다**(1) — 발주 수량의 대부분이 팩·개다.
 * ⚠️ 단가·단위환산 비율 입력에는 쓰지 말 것. 그건 원래 소수가 맞다.
 */
const DISCRETE_UNIT_CATEGORIES = ['count', 'serving'];

export const qtyStepForUnit = (unit?: string | null): number => {
  const key = (unit || '').trim().toLowerCase();
  if (!key) return 1;
  // getUnitInfo 는 대소문자 정확일치라 'L' / 'KG' 같은 표기를 놓친다. 여기서만 느슨하게 본다.
  const info = STANDARD_UNITS.find(u => u.value.toLowerCase() === key);
  if (!info) return 1;
  return DISCRETE_UNIT_CATEGORIES.includes(info.category) ? 1 : 0.01;
};

/**
 * 두 단위가 변환 가능한지 확인
 */
export const canConvert = (fromUnit: string, toUnit: string): boolean => {
  const fromInfo = getUnitInfo(fromUnit);
  const toInfo = getUnitInfo(toUnit);

  if (!fromInfo || !toInfo) return false;

  // 같은 baseUnit이면 변환 가능
  return fromInfo.baseUnit === toInfo.baseUnit;
};

/**
 * 단위 변환
 * @param value 변환할 값
 * @param fromUnit 원래 단위
 * @param toUnit 목표 단위
 * @returns 변환된 값 또는 null (변환 불가)
 */
export const convertUnit = (value: number, fromUnit: string, toUnit: string): number | null => {
  if (fromUnit === toUnit) return value;

  const fromInfo = getUnitInfo(fromUnit);
  const toInfo = getUnitInfo(toUnit);

  if (!fromInfo || !toInfo) return null;
  if (fromInfo.baseUnit !== toInfo.baseUnit) return null;

  // 기본 단위로 변환 후 목표 단위로 변환
  const baseValue = value * fromInfo.multiplier;
  return baseValue / toInfo.multiplier;
};

/**
 * 재료 비용 계산 (단위 변환 포함)
 * @param ingredientUnitCost 재료의 단위당 비용 (예: 10 RM/kg)
 * @param ingredientUnit 재료 등록 단위 (예: kg)
 * @param recipeQuantity 레시피에서 사용하는 양 (예: 300)
 * @param recipeUnit 레시피 단위 (예: g)
 * @returns 계산된 비용 또는 null
 */
export const calculateIngredientCost = (
  ingredientUnitCost: number,
  ingredientUnit: string,
  recipeQuantity: number,
  recipeUnit: string
): number | null => {
  // 같은 단위면 바로 계산
  if (ingredientUnit === recipeUnit) {
    return ingredientUnitCost * recipeQuantity;
  }

  // 레시피 수량을 재료 단위로 변환
  const convertedQuantity = convertUnit(recipeQuantity, recipeUnit, ingredientUnit);

  if (convertedQuantity === null) {
    // 변환 불가 - 단위가 다른 카테고리
    console.warn(`Cannot convert ${recipeUnit} to ${ingredientUnit}`);
    return null;
  }

  return ingredientUnitCost * convertedQuantity;
};

/**
 * 수량 표시 포맷 — 정수는 소수점 없이(1), 소수는 2자리(1.50).
 * 금액과 달리 수량은 "1.00" 이 오히려 혼란스럽다(2026-07-12 Irene).
 */
export const formatQuantity = (quantity: number | string): string => {
  const n = typeof quantity === 'number' ? quantity : parseFloat(quantity);
  if (!Number.isFinite(n)) return '0';
  // 정수는 소수점 없이, 소수는 **잔여 0 을 떼고** 보여준다 — `1.50 kg` 이 아니라 `1.5 kg`.
  //   무게·부피 발주(measure)가 생기면서 같은 수가 화면마다 `1.5` / `1.50` 로 갈렸다.
  //   ⛔ 여기서 반올림하지 말 것 — 1.5 를 2 로 만들면 입고·청구가 틀려 보인다.
  //   이 함수가 수량 표시의 **단일 소스**다(카트·staging·상세·인쇄). 로컬 포매터를 새로 만들지 말 것.
  return n.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
};

/**
 * 단위별 표시 포맷
 */
export const formatQuantityWithUnit = (quantity: number, unit: string): string => {
  return `${formatQuantity(quantity)} ${unit}`;
};

/**
 * 레시피 단위당 비용 계산
 * @param totalCost 총 재료비
 * @param yieldAmount 생산량
 * @param yieldUnit 생산 단위
 */
export const calculateCostPerUnit = (
  totalCost: number,
  yieldAmount: number,
  yieldUnit: string
): { cost: number; unit: string } => {
  if (yieldAmount <= 0) {
    return { cost: totalCost, unit: yieldUnit };
  }
  return {
    cost: totalCost / yieldAmount,
    unit: yieldUnit
  };
};

/**
 * 최소 주문 수량 파싱 — **소수를 보존한다.**
 *
 * 왜 (2026-08-30): `min_order_quantity` 를 INT → DECIMAL(10,2) 로 넓혔는데
 * 폼 5곳이 전부 `parseInt` 로 잘라 보내고 있었다. 판매자가 "최소 0.5kg" 을 입력해도
 * 서버에 1 이 도착했다. 백엔드도 같은 이유로 `utils/quantity.js` 의
 * `parseMinOrderQty` 로 일원화했다(전수 목록 = docs/PURCHASE_ORDER_SYSTEM.md §2-⑥-a).
 *
 * ⛔ 새 폼에서 `parseInt(min_order_quantity)` 를 쓰지 말 것.
 *
 * 경계: '0.5'→0.5 · '0.01'→0.01 · '0'→fallback · 음수/NaN/''/null→fallback
 */
export const parseMinOrderQty = (v: unknown, fallback = 1): number => {
  const n = parseFloat(String(v));
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/**
 * 판매상품 주문 방식 — 백엔드 ENUM 과 같은 목록(models/SupplierProduct.js).
 * 'pack'    = 개수로 주문 (팩/박스/포대) — 기본이자 기존 동작
 * 'measure' = 무게·부피로 주문 (kg·g·L·ml, 소수)
 */
export type OrderMode = 'pack' | 'measure';
export const ORDER_MODES: OrderMode[] = ['pack', 'measure'];

/**
 * 발주 «용량 · 포장단위 × 수량» — 화면 단일 소스 (2026-09-11)
 *
 * Irene: 「발주할 때 기본용량 포장단위가 있고 거기에 수량이 올라가는 거잖아. 수량에 포장단위가 붙는거고.」
 * 표시: `Kimchi · 10 kg/BOX · × 3 BOX @ 48.00`
 * ⛔ 서버 dev-backend/utils/poLineSpec.js 와 **같은 규칙**이다. 한쪽만 바꾸지 말 것.
 * ⚠ 라벨이다 — 재고 환산은 unit_conversion, 금액은 quantity × unit_price.
 */

/** 포장단위 입력 제안(자유 입력 허용 — 인보이스의 Btl·PKT·Tin 을 그대로 받는다) */
export const PACKAGE_UNIT_SUGGESTIONS = ['pack', 'box', 'bag', 'bottle', 'can', 'tin', 'tray', 'carton', 'sack', 'jar', 'piece'];

export interface SellerUnitFields {
  seller_unit?: string | null;          // 판매 상품 취급단위(내용물, kg)
  base_quantity?: number | string | null; // 취급 기준숫자(10)
  seller_package_unit?: string | null;  // 기준단위(포장, BOX)
  order_mode?: string | null;
}

/**
 * 판매자에게서 살 때 **수량에 붙는 단위**.
 * 포장단위 → (용량이 1 이 아니면) pack → 내용물 단위 → 우리 재고 단위.
 * 무게로 주문(measure)은 kg 자체가 주문 단위다.
 */
export const sellerOrderUnitOf = (seller?: SellerUnitFields | null, fallbackUnit?: string | null): string => {
  if (!seller) return fallbackUnit || '';
  if (seller.order_mode === 'measure') return seller.seller_unit || fallbackUnit || '';
  const bq = Number(seller.base_quantity);
  const pkg = String(seller.seller_package_unit || '').trim();
  return pkg
    || (seller.seller_unit && Number.isFinite(bq) && bq > 0 && bq !== 1 ? 'pack' : '')
    || seller.seller_unit || fallbackUnit || '';
};

/** 판매자 상품의 용량 문구 «10 kg/BOX». «1 kg/kg» 처럼 같은 말 반복이면 빈 문자열. */
export const sellerSpecText = (seller?: SellerUnitFields | null, fallbackUnit?: string | null): string => {
  if (!seller || seller.order_mode === 'measure' || !seller.seller_unit) return '';
  const bq = Number(seller.base_quantity);
  if (!Number.isFinite(bq) || bq <= 0) return '';
  const unit = sellerOrderUnitOf(seller, fallbackUnit);
  if (bq === 1 && seller.seller_unit.toLowerCase() === unit.toLowerCase()) return '';
  return `${formatQuantity(bq)} ${seller.seller_unit}${unit ? '/' + unit : ''}`;
};

/**
 * 외부 공급업체 연결의 **재고 환산 기본값** (2026-09-11 Fable 판정) — «발주 줄 단위 1개 = ? 우리 재고 단위».
 * 서버 입고 = 수량 × unit_conversion, 원가 = 단가 ÷ unit_conversion.
 * 발주 단위 1개에는 내용물 base_quantity 가 든다(포장단위든 pack 이든 · 용량 1 이면 내용물 단위 자체).
 * 변환할 수 없는 조합(bottle → ml, tray → kg)은 null — 사람이 반드시 적는다.
 * ⛔ 기계가 추측하지 않는다(PURCHASE_ORDER_SYSTEM.md §2-⑤). 기존 연결에 소급하지 않는다.
 */
export const defaultLinkConversion = (
  baseQuantity: number | string | null | undefined,
  contentUnit?: string | null,
  targetUnit?: string | null,
): number | null => {
  const bq = Number(baseQuantity);
  if (!Number.isFinite(bq) || bq <= 0 || !contentUnit || !targetUnit) return null;
  if (contentUnit === targetUnit) return bq;
  const v = convertUnit(bq, contentUnit, targetUnit);
  return v === null ? null : Math.round(v * 10000) / 10000;
};

/** 확정된 발주 줄의 용량 문구 — 줄에 저장된 스냅샷만 쓴다(판매자 현재값을 읽지 않는다). 옛 줄은 빈 문자열. */
export const lineSpecText = (line?: { base_quantity?: number | string | null; base_unit?: string | null; unit?: string | null } | null): string => {
  if (!line || !line.base_unit) return '';
  const bq = Number(line.base_quantity);
  if (line.base_quantity == null || !Number.isFinite(bq) || bq <= 0) return '';
  return `${formatQuantity(bq)} ${line.base_unit}${line.unit ? '/' + line.unit : ''}`;
};
