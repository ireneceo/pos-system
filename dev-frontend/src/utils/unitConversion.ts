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
  return n.toFixed(n % 1 === 0 ? 0 : 2);
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
