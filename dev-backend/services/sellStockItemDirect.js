'use strict';
/**
 * 재고아이템을 **그대로 파는** 메뉴(매장) / 프로덕트(브랜드)로 등록 — 직접 FK 한 길 (2026-10-15).
 *
 * 규칙: docs/TRADE_STRUCTURE.md §2-1 «메뉴/프로덕트 = 재고아이템 그대로» — `products.ingredient_id` /
 *   `brand_products.product_ingredient_id`. 레시피는 만들지 않는다. 수량은 재고아이템 한 곳에만 산다.
 * 설계: .claude/fable-design-20261015-catalog-add-menu.md D1 (Irene 10-15 «권고대로 진행해 줘»).
 * 쓰는 곳 두 문: ① 발주 카탈로그 «Add as menu / Add as product»(from-catalog new_product)
 *               ② 재고 목록 «Also sell as menu / product»(register-as-product 2벌).
 *
 * ⛔ 판매가 필수 — 공급가(원가)를 판매가로 복사하지 않는다([[reference_supplier_cost_copied_as_price]]).
 * 중복 = 이미 이 재고아이템을 파는 프로덕트가 있으면 409 ALREADY_A_PRODUCT(그 이름과 함께):
 *   ① 직접 FK 로 가리키는 것 ② 이 재고아이템 하나만 쓰는 ×1 레시피에 걸린 것(이전 «Also sell as» 가 만든 꼴).
 * 호출자가 트랜잭션을 연다 — 실패를 돌려주면 호출자가 롤백한다(던지지 않는다).
 *
 * 반환: { ok:true, product } | { ok:false, status, body }
 */
const { Op } = require('sequelize');
const { sanitizeString } = require('../middleware/validation');

function priceError(price) {
  if (!Number.isFinite(price) || price <= 0) {
    return { ok: false, status: 400, body: {
      success: false, code: 'PRICE_REQUIRED',
      message: 'Selling price is required (supplier cost is never copied into it)'
    } };
  }
  return null;
}

function alreadyProduct(p) {
  return { ok: false, status: 409, body: {
    success: false, code: 'ALREADY_A_PRODUCT',
    message: `Already sold as a product: ${p.name}`,
    data: { product_id: p.id, product_name: p.name }
  } };
}

// 이 재고아이템 하나만 쓰는 레시피 id 들 (×1 레시피 판정 — 데이터 자체로, 마커 없이)
async function soloRecipeIds(LinkModel, ingredientId, transaction) {
  const links = await LinkModel.findAll({ where: { ingredient_id: ingredientId }, attributes: ['recipe_id'], transaction });
  const candidates = [...new Set(links.map((l) => l.recipe_id))];
  if (!candidates.length) return [];
  const all = await LinkModel.findAll({ where: { recipe_id: candidates }, attributes: ['recipe_id'], transaction });
  const count = all.reduce((m, l) => { m[l.recipe_id] = (m[l.recipe_id] || 0) + 1; return m; }, {});
  return candidates.filter((id) => count[id] === 1);
}

/** 매장: 재고아이템(ingredients 행) → 메뉴(products.ingredient_id). 소유 판정은 호출자(isIngredientInScope). */
async function sellAsRestaurantMenu({ ingredient, restaurantId, price, name, category, transaction }) {
  const err = priceError(price);
  if (err) return err;
  const { Product, RecipeIngredient } = require('../models');
  const rid = parseInt(restaurantId, 10);

  const direct = await Product.findOne({
    where: { restaurant_id: rid, ingredient_id: ingredient.id, is_active: true },
    attributes: ['id', 'name'], transaction
  });
  if (direct) return alreadyProduct(direct);
  const solo = await soloRecipeIds(RecipeIngredient, ingredient.id, transaction);
  if (solo.length) {
    const viaRecipe = await Product.findOne({
      where: { restaurant_id: rid, recipe_id: { [Op.in]: solo }, is_active: true },
      attributes: ['id', 'name'], transaction
    });
    if (viaRecipe) return alreadyProduct(viaRecipe);
  }

  const product = await Product.create({
    restaurant_id: rid,
    name: sanitizeString(String(name || ingredient.name || '')).slice(0, 100),
    // products.category 는 NOT NULL(기본값 없음) — 관행값으로 떨어뜨린다
    category: category ? sanitizeString(String(category)).slice(0, 50) : 'Uncategorized',
    price,
    ingredient_id: ingredient.id,
    recipe_id: null,
    is_active: true,
    // 재고는 재고아이템에 산다 — 메뉴 자기 수량은 쓰지 않는다
    current_stock: 0,
    min_stock: 0,
    stock_unit: ingredient.unit || 'piece',
  }, { transaction });
  return { ok: true, product };
}

/** 브랜드: 재고아이템(product_ingredients 행) → 프로덕트(brand_products.product_ingredient_id) + 브랜드 귀속. */
async function sellAsBrandProduct({ stockItem, ownerUserId, brandId, price, name, categoryId, transaction }) {
  const err = priceError(price);
  if (err) return err;
  if (brandId == null) {
    return { ok: false, status: 400, body: { success: false, code: 'BRAND_REQUIRED', message: 'brand_id required' } };
  }
  const { BrandProduct, BrandProductBrand, ProductRecipeIngredient } = require('../models');

  const direct = await BrandProduct.findOne({
    where: { owner_user_id: ownerUserId, product_ingredient_id: stockItem.id, is_active: true },
    attributes: ['id', 'name'], transaction
  });
  if (direct) return alreadyProduct(direct);
  const solo = await soloRecipeIds(ProductRecipeIngredient, stockItem.id, transaction);
  if (solo.length) {
    const viaRecipe = await BrandProduct.findOne({
      where: { owner_user_id: ownerUserId, product_recipe_id: { [Op.in]: solo }, is_active: true },
      attributes: ['id', 'name'], transaction
    });
    if (viaRecipe) return alreadyProduct(viaRecipe);
  }

  const product = await BrandProduct.create({
    owner_user_id: ownerUserId,
    category_id: categoryId || null,
    name: sanitizeString(String(name || stockItem.name || '')).slice(0, 255),
    unit: stockItem.unit || null,
    // 직접 FK 프로덕트는 판매 단위 = 재고 단위(환산 없음 — §2-1 «그대로»)
    stock_unit: stockItem.unit || null,
    base_quantity: 1,
    unit_price: price,
    min_order_quantity: 1,
    product_ingredient_id: stockItem.id,
    product_recipe_id: null,
    is_active: true,
    current_stock: 0,
    min_stock: 0,
  }, { transaction });
  // 어느 브랜드가 파는지 — 없으면 매장 카탈로그에 안 보인다(10-15 실측: 카탈로그 경로가 0행이었다)
  await BrandProductBrand.findOrCreate({
    where: { product_id: product.id, brand_id: brandId },
    defaults: { product_id: product.id, brand_id: brandId },
    transaction
  });
  return { ok: true, product };
}

module.exports = { sellAsRestaurantMenu, sellAsBrandProduct };
