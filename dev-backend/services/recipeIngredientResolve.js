// 레시피 재료 해석·검증 헬퍼 — routes/recipes.js 에서 **그대로 옮김**(로직 변경 0, 2026-11-03).
//   레시피 CSV 업로드(services/recipeImport.js)가 화면 저장과 **같은 함수**를 쓰게 하려는 이동이다.
const { Ingredient, Restaurant } = require('../models');
const { Op } = require('sequelize');

/**
 * 레시피에 넣으려는 재료가 이 레시피의 소유 범위 안인지 검증한다.
 *
 *   브랜드 레시피 → 그 브랜드의 재료만
 *   매장 레시피   → 자기 매장 재료 ∪ **부모 브랜드 재료**(프랜차이즈 표준 재료)
 *
 * 예전엔 검증이 없어 아무 ingredient_id 나 붙일 수 있었고, 실제로 운영에 타 브랜드 재료를
 * 참조하는 레시피가 생겼다. (docs/BRAND_STOCK_SHARING_DESIGN.md G6)
 * 반환: 허용되지 않은 ingredient_id 배열 (빈 배열이면 통과).
 */
/**
 * F4 (2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md):
 * 브랜드 레시피의 재료 선택기는 **Stock Items** 를 보여준다. 저장할 때 그 Stock Item 을
 * 이 브랜드의 **거울**(ingredients 행)로 해석한다 — 거울이 없으면 공유를 자동으로 켜고 만든다.
 *
 * 왜 거울로 해석하나: 레시피 줄·재고 차감·인쇄 상품 해석이 전부 `ingredients` 를 가리키고 있고,
 * 그 배선을 건드리면 🔒 인쇄 보호 영역까지 닿는다. 목록만 하나로 보이면 목적은 달성된다.
 *
 * 입력 item 이 `product_ingredient_id` 를 담고 있으면 그것을 `ingredient_id` 로 바꿔 돌려준다.
 * 이미 `ingredient_id` 만 있는 옛 화면 요청은 그대로 통과시킨다(호환).
 */
async function resolveStockItemsToMirrors(items, brandId) {
  if (!Array.isArray(items) || !brandId) return items;
  const { ProductIngredient, BrandProduct } = require('../models');
  const { shareToBrand, shareProductToBrand } = require('../services/stockItemMirror');
  const out = [];
  for (const raw of items) {
    const item = { ...raw };
    const pid = parseInt(item.product_ingredient_id, 10);
    const bpid = parseInt(item.brand_product_id, 10);

    if (Number.isFinite(pid) && !item.ingredient_id) {
      const stock = await ProductIngredient.findByPk(pid);
      if (stock) {
        const { ingredient } = await shareToBrand(stock, brandId);
        item.ingredient_id = ingredient.id;
      }
    } else if (Number.isFinite(bpid) && !item.ingredient_id) {
      // GIT 이 **파는 것**(프로덕트)이 출처인 거울. 2026-09-01 결정대로 Stock Item 을 만들지 않는다 —
      // 레시피 없는 프로덕트는 그 자체가 재고아이템이고, 여기서 또 만들면 그때 합쳐 놓은 것이 갈라진다.
      const product = await BrandProduct.findByPk(bpid);
      if (product) {
        // 거울 찾기·만들기 + 출처 연결(GIT 판매) 보장 — 매장 카탈로그 담기와 같은 함수(2026-10-11 Fable 판정 R5)
        const { ingredient: mirror } = await shareProductToBrand(product, brandId);
        item.ingredient_id = mirror.id;
      }
    }
    delete item.product_ingredient_id;
    delete item.brand_product_id;
    out.push(item);
  }
  return out;
}

/**
 * 저장할 줄들이 가리키는 재료 행을 한 번에 읽어 Map(id → 재료) 으로 준다.
 * 줄마다 findByPk 를 부르면 재료 수만큼 쿼리가 는다.
 */
async function loadIngredientMap(items) {
  const ids = [...new Set((items || []).map(i => parseInt(i.ingredient_id, 10)).filter(Number.isFinite))];
  if (!ids.length) return new Map();
  const rows = await Ingredient.findAll({ where: { id: { [Op.in]: ids } } });
  return new Map(rows.map(r => [r.id, r]));
}

/**
 * 매장이 보는 재료 단가 — **매장 오버라이드가 있으면 그것이 원가다.**
 * Irene 2026-09-09: "레스토랑은 거기서 등록하는 재고아이템 자기 원가(공급업체랑 연결된)거로 하는 거지."
 * 브랜드가 표준 재료를 내려줘도 매장이 실제로 사는 값이 다르면 매장 원가는 매장 값이다
 * (`restaurant_ingredient_costs`, 운영 73행). 오버라이드가 없으면 재료 단가 그대로.
 */
async function loadRestaurantCostOverrides(restaurantId, items) {
  const rid = parseInt(restaurantId, 10);
  const ids = [...new Set((items || []).map(i => parseInt(i.ingredient_id, 10)).filter(Number.isFinite))];
  if (!Number.isFinite(rid) || !ids.length) return new Map();
  // 브랜드 공유 재료의 오버레이만 (2026-09-11 §8-4 D-5) — 매장 소유 재료는 재료 행 unit_cost 가 매장 층이라
  //   그 재료에 남아 있는 옛 오버레이는 읽지 않는다. 단일 소스는 services/storeCost.js.
  return require('../services/storeCost').loadOverlayMap(rid, ids);
}

/** 재료 행에 매장 오버라이드 단가를 씌운 사본. 오버라이드가 없으면 원래 행. */
function withOverrideCost(ingredient, overrideUnitCost) {
  if (!ingredient) return null;
  if (overrideUnitCost === undefined || overrideUnitCost === null) return ingredient;
  return { unit_cost: overrideUnitCost, base_quantity: ingredient.base_quantity, unit: ingredient.unit };
}

async function findDisallowedIngredientIds(items, scope) {
  const ids = [...new Set((items || []).map(i => parseInt(i.ingredient_id, 10)).filter(Number.isFinite))];
  if (!ids.length) return [];

  const or = [];
  if (scope.restaurantId) {
    or.push({ restaurant_id: scope.restaurantId, owner_type: 'restaurant' });
    const rest = await Restaurant.findByPk(scope.restaurantId, { attributes: ['brand_id'] });
    if (rest?.brand_id) or.push({ brand_id: rest.brand_id, owner_type: 'brand' });
  }
  if (scope.brandId) {
    or.push({ brand_id: scope.brandId, owner_type: 'brand' });
  }
  if (!or.length) return ids;

  const allowed = await Ingredient.findAll({
    where: { id: { [Op.in]: ids }, [Op.or]: or },
    attributes: ['id']
  });
  const allowedSet = new Set(allowed.map(a => a.id));
  return ids.filter(id => !allowedSet.has(id));
}

module.exports = {
  resolveStockItemsToMirrors,
  loadIngredientMap,
  loadRestaurantCostOverrides,
  withOverrideCost,
  findDisallowedIngredientIds
};
