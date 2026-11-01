/**
 * 매장이 보는 재료·재료 카테고리·재고 프로덕트의 범위 — 단일 소스 (2026-11-01 §G-7-5 에서 추출).
 * 기존 라우트(ingredient-categories · ingredients brand-ingredients · restaurants-ingredients stock-products)와
 * 오너 승인 예외 «고를 후보»(utils/poApprovalExemptions)가 같은 조건을 쓴다 — 갈라지지 않게.
 */

/** 매장 자체 재료 카테고리 */
function ownCategoryWhere(restaurant) {
  return { restaurant_id: restaurant.id };
}
/** 매장이 보는 브랜드 재료 카테고리 — 자기 브랜드 하나 · 활성만 (Irene 2026-07-05). 브랜드 없으면 null */
function brandCategoryWhere(restaurant) {
  return restaurant.brand_id ? { brand_id: restaurant.brand_id, is_active: true } : null;
}
/** 매장 자체 재료 */
function ownIngredientWhere(restaurant) {
  return { restaurant_id: restaurant.id };
}
/** 매장이 읽기 전용으로 보는 브랜드 재료 — 자기 브랜드 하나 · 활성만. 브랜드 없으면 null */
function brandIngredientWhere(restaurant) {
  return restaurant.brand_id ? { brand_id: restaurant.brand_id, owner_type: 'brand', is_active: true } : null;
}
/** 발주로 살 수 있는 매장 재고 프로덕트 — 레시피·재료 직결·세트가 아닌 것 (createPurchaseOrderCore product_id 분기와 같은 뜻) */
function stockProductWhere(restaurantId) {
  return {
    restaurant_id: restaurantId,
    is_active: true,
    is_set_menu: false,
    recipe_id: null,
    product_recipe_id: null,
    // 재료(재고아이템)를 그대로 가리키는 메뉴는 그 재료 줄이 곧 이 물건이다 — BG 쪽과 같은 규칙.
    ingredient_id: null,
  };
}

module.exports = { ownCategoryWhere, brandCategoryWhere, ownIngredientWhere, brandIngredientWhere, stockProductWhere };
