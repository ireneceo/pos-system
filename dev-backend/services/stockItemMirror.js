/**
 * services/stockItemMirror.js — Stock Item ↔ 브랜드 거울 단일 소스.
 *
 * 설계: docs/INGREDIENT_UNIFICATION_DESIGN.md (F1 · F2)
 *   재료를 만드는 길은 **Stock Items 하나**다. 브랜드가 그 재료를 쓰려면
 *   `ingredients` 에 **거울** 행을 두고, 레시피·매장 덧씌우기·발주 연결이 거울을 가리킨다.
 *
 * 규칙 (되돌리지 말 것):
 *   - 열쇠는 거울 쪽: `ingredients.source_product_ingredient_id` → Stock Item.
 *     한 Stock Item 이 여러 브랜드에 공유되면 거울이 여럿이라 거울 N → Stock Item 1 이어야 한다.
 *     (구 `product_ingredients.linked_ingredient_id` 는 1:1 이라 못 쓴다 — 폐기.)
 *   - **방향은 Stock Item → 거울 한 방향뿐.** 거울에서 올라오는 쓰기는 없다(F3 이 403 으로 막는다).
 *   - 동기화 대상은 **정체성 필드만**: 이름·단위·카테고리·활성. 재고 수량·최소치는 주인별이라 건드리지 않는다.
 *   - 거울을 끌 때 **삭제하지 않는다**(레시피·원장·발주 이력이 붙어 있다). 비활성만.
 *
 * 단위 주의: 이 파일은 수량·가격을 계산하지 않는다. 옮기는 것은 이름·단위·카테고리·활성뿐이다.
 * `unit_cost` 는 거울 생성 시 1회 복사되는 초기값 폴백이고, 이후 동기화 대상이 아니다.
 */

const { Op } = require('sequelize');

/** 거울에 따라가는 필드(정체성). 여기 없는 것은 주인별 값이라 옮기지 않는다. */
// ⛔ P0 (2026-09-05, Fable 판정): `unit` 을 이 목록에서 **뺐다**.
//   거울 `ingredients.unit` 은 **레시피 단위**(g/ml)이고, Stock Item `unit` 은 **취급단위**(pack/piece)라
//   서로 다른 단위다 — 2kg 치즈가 1 pack 인 것처럼. 여기에 `unit` 이 있으면 아이템을 한 번 저장하는
//   것만으로 거울이 `g → pack` 으로 덮이고, 그 순간 레시피 줄 `20 g` 이 **`20 pack`** 으로 읽힌다
//   (차감 20팩, 원가 20×팩값). 운영 실측 2026-09-05: 그렇게 어긋난 아이템이 18건 대기 중이었고,
//   아직 안 터진 이유는 통합 이후 그 18건을 저장한 적이 없어서였다.
//   P1 에서 `base_unit`·`base_amount`(기준단위·기준양)가 들어오면
//   `거울.unit := base_unit ?? unit` 파생 규칙으로 **다시** 동기화한다. 그때까지는 옮기지 않는다.
const MIRRORED_FIELDS = ['name', 'is_active'];

/**
 * Stock Item 의 정체성 변경을 그 거울들에 반영한다.
 * @returns {Promise<{updated: number}>}
 */
async function syncMirrors(stockItem, { transaction, sourceKey = 'source_product_ingredient_id' } = {}) {
  const { Ingredient } = require('../models');
  if (!stockItem || !stockItem.id) return { updated: 0 };

  const mirrors = await Ingredient.findAll({
    where: { [sourceKey]: stockItem.id },
    transaction
  });
  if (!mirrors.length) return { updated: 0 };

  const patch = {};
  for (const f of MIRRORED_FIELDS) {
    if (stockItem[f] !== undefined && stockItem[f] !== null) patch[f] = stockItem[f];
  }
  if (!Object.keys(patch).length) return { updated: 0 };

  let updated = 0;
  for (const m of mirrors) {
    await m.update(patch, { transaction });
    updated += 1;
  }
  return { updated };
}

/**
 * Stock Item 을 한 브랜드에 공유한다(거울 생성 또는 재활성).
 * 이미 거울이 있으면 **새로 만들지 않고** 그 행을 살린다 — "있으면 붙이고 없을 때만 만든다".
 */
async function shareToBrand(stockItem, brandId, { transaction } = {}) {
  const { Ingredient } = require('../models');
  const existing = await Ingredient.findOne({
    where: { source_product_ingredient_id: stockItem.id, brand_id: brandId },
    transaction
  });
  if (existing) {
    if (!existing.is_active) await existing.update({ is_active: true }, { transaction });
    return { created: false, ingredient: existing };
  }

  const ingredient = await Ingredient.create({
    owner_type: 'brand',
    brand_id: brandId,
    restaurant_id: null,
    source_product_ingredient_id: stockItem.id,
    name: stockItem.name,
    unit: stockItem.unit,
    base_quantity: stockItem.base_quantity || 1,
    // 초기값 폴백일 뿐 — 이후 동기화 대상이 아니다(위 파일 주석 참조).
    unit_cost: stockItem.unit_cost || 0,
    category: 'other',
    min_stock: 0,
    current_stock: 0,
    is_active: true
  }, { transaction });
  return { created: true, ingredient };
}

/**
 * 한 브랜드에서 공유를 끈다. 참조(레시피·매장 덧씌우기·발주 연결)가 있으면 **끄지 않고 사유를 돌려준다** —
 * 카테고리 삭제와 같은 규칙. 끄더라도 삭제가 아니라 비활성이다.
 */
async function unshareFromBrand(stockItem, brandId, { transaction } = {}) {
  const { Ingredient } = require('../models');
  const mirror = await Ingredient.findOne({
    where: { source_product_ingredient_id: stockItem.id, brand_id: brandId },
    transaction
  });
  if (!mirror) return { changed: false, reason: 'no-mirror' };

  const [{ n: recipeLines }] = await mirror.sequelize.query(
    `SELECT COUNT(*) n FROM recipe_ingredients WHERE ingredient_id = :id`,
    { replacements: { id: mirror.id }, type: 'SELECT', transaction }
  );
  const [{ n: overlays }] = await mirror.sequelize.query(
    `SELECT COUNT(*) n FROM restaurant_ingredient_stocks WHERE ingredient_id = :id`,
    { replacements: { id: mirror.id }, type: 'SELECT', transaction }
  );
  const [{ n: sellers }] = await mirror.sequelize.query(
    `SELECT COUNT(*) n FROM ingredient_seller_products WHERE ingredient_id = :id`,
    { replacements: { id: mirror.id }, type: 'SELECT', transaction }
  );
  const refs = Number(recipeLines) + Number(overlays) + Number(sellers);
  if (refs > 0) {
    return {
      changed: false,
      reason: 'in-use',
      detail: { recipeLines: Number(recipeLines), overlays: Number(overlays), sellers: Number(sellers) }
    };
  }

  await mirror.update({ is_active: false }, { transaction });
  return { changed: true };
}

/** 한 Stock Item 이 지금 어느 브랜드에 공유돼 있는가(= 활성 거울이 있는 브랜드). */
async function sharedBrandIds(stockItemIds, { transaction } = {}) {
  const { Ingredient } = require('../models');
  const ids = Array.isArray(stockItemIds) ? stockItemIds : [stockItemIds];
  if (!ids.length) return {};
  const rows = await Ingredient.findAll({
    where: { source_product_ingredient_id: { [Op.in]: ids }, is_active: true },
    attributes: ['source_product_ingredient_id', 'brand_id'],
    transaction
  });
  const map = {};
  rows.forEach((r) => {
    const k = r.source_product_ingredient_id;
    (map[k] = map[k] || []).push(r.brand_id);
  });
  return map;
}

/**
 * 브랜드 프로덕트(= GIT 이 파는 것)의 정체성 변경을 그 거울들에 반영한다.
 * ⛔ **갱신만 한다. 절대 생성하지 않는다.**
 *   옛 `syncProductToIngredients` 가 저지른 것이 바로 "생성"이었고(2026-06/07 분열),
 *   그래서 F5 로 껐다. 이 함수는 **이미 있는 거울만** 따라가게 한다 — 그 차이가 전부다.
 */
async function syncProductMirrors(brandProduct, opts = {}) {
  return syncMirrors(brandProduct, { ...opts, sourceKey: 'source_brand_product_id' });
}

module.exports = { syncMirrors, syncProductMirrors, shareToBrand, unshareFromBrand, sharedBrandIds, MIRRORED_FIELDS };
