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
 *   - 동기화 대상은 **정체성 필드 + 원가**: 이름·단위 다섯 칸·활성·원가. 재고 수량·최소치는 주인별이라 건드리지 않는다.
 *   - 거울을 끌 때 **삭제하지 않는다**(레시피·원장·발주 이력이 붙어 있다). 비활성만.
 *
 * 단위 주의: 이 파일은 수량·가격을 **계산하지 않는다** — 옮기기만 한다.
 * `unit_cost` 를 어떤 값으로 정하는지는 `services/costSync.js` 하나가 정하고, 여기는 그 결과를 거울로 옮긴다.
 */

const { Op } = require('sequelize');

/**
 * 거울에 따라가는 필드. 아이템 → 거울 **한 방향**.
 *
 * P1 (2026-09-05): 단위 다섯 칸이 세 표에 모두 생겨 이제 **다섯 칸을 그대로 복사**한다
 *   (docs/TRADE_STRUCTURE.md §2-2). P0 에서 `unit` 을 뺐던 이유는 아이템의 `unit` 이
 *   포장단위(pack)이고 거울의 `unit` 이 레시피 단위(g)라 **뜻이 서로 달랐기** 때문이다.
 *   수렴 마이그가 아이템 `unit` 을 취급단위(g)로 되돌려 **두 표의 뜻이 같아졌으므로** 복귀한다.
 *   ⛔ 수렴 전에 이 목록에 `unit` 을 넣으면 다시 `20 g → 20 pack` 이 된다.
 *      인스펙션 ING-UNI-011/012 가 그 상태를 잡는다.
 *
 * 재고 수량·최소치는 주인별 값이라 여전히 옮기지 않는다.
 *
 * `unit_cost` (2026-09-05): **원가도 주인 값이 아니라 원본 값이다** (docs/TRADE_STRUCTURE.md §2
 *   "그 화면의 단가가 GIT 판매가이고, 그것이 매장의 원가다. 매장마다 따로 정하는 가격은 없다").
 *   매장별 조정은 `restaurant_ingredient_costs` 가 맡으므로 여기서 덮이지 않는다.
 *   ⛔ **0 은 "공짜"가 아니라 "아직 안 정함"** 이다 — 아이템 원가가 0 이면 전파하지 않는다.
 *     안 그러면 출처가 없어 못 채운 아이템이 거울의 살아 있는 원가를 지운다.
 */
const MIRRORED_FIELDS = ['name', 'unit', 'base_quantity', 'package_unit', 'package_quantity', 'is_active', 'unit_cost'];

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

  const base = {};
  for (const f of MIRRORED_FIELDS) {
    if (stockItem[f] === undefined || stockItem[f] === null) continue;
    // 0 은 미정 — 위 주석 참조. 0 을 옮기면 거울의 살아 있는 원가를 지운다.
    if (f === 'unit_cost' && !(parseFloat(stockItem[f]) > 0)) continue;
    base[f] = stockItem[f];
  }
  if (!Object.keys(base).length) return { updated: 0 };

  const { RecipeIngredient } = require('../models');
  let updated = 0, guarded = 0;
  for (const m of mirrors) {
    const patch = { ...base };
    // ⛔ **영구 방어** (2026-09-05): 아이템 단위가 거울과 다른데 그 거울에 레시피 줄이 붙어 있으면
    //   `unit`·`base_quantity` 는 **옮기지 않는다**(나머지 칸은 그대로 동기화).
    //   왜: 두 값이 어긋난 상태에서 아이템을 저장하면 거울 단위가 덮이고, 그 거울을 가리키는
    //   레시피 줄의 뜻이 말없이 바뀐다 — `20 g` 이 `20 pack` 이 된다.
    //   실제로 났다: 2026-09-05 배포가 재시작 전에 실패해 옛 코드가 도는 창에서 액젓 거울이
    //   `g → bottle` 로 덮였고, 붙어 있던 레시피 3줄이 어긋났다.
    //   409(`UNIT_LOCKED_BY_RECIPES`)는 **단위를 바꿀 때만** 걸린다 — 이름만 고쳐 저장해도
    //   동기화는 돌기 때문에 그 잠금만으로는 막히지 않는다. 그래서 여기서도 막는다.
    //   데이터가 어긋나 있어도 **코드가 사고를 못 내게** 하는 것이 목적이다.
    if (patch.unit && String(patch.unit) !== String(m.unit)) {
      const lines = await RecipeIngredient.count({ where: { ingredient_id: m.id }, transaction });
      if (lines > 0) {
        delete patch.unit;
        delete patch.base_quantity;
        guarded += 1;
        console.warn(`[mirror] 거울 ing#${m.id} 은 단위(${m.unit})가 아이템(${stockItem.unit})과 다르고 레시피 ${lines}줄이 붙어 있어 unit·base_quantity 동기화를 건너뜁니다 — 화면에서 둘을 맞추세요`);
      }
    }
    if (!Object.keys(patch).length) continue;
    await m.update(patch, { transaction });
    updated += 1;
  }
  return { updated, guarded };
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
    // 거울은 **새 번호를 받지 않는다** — 원본 코드를 그대로 물려받는다(2026-09-06).
    //   여기가 빈 코드의 최대 출처였다: 거울 생성이 code 를 아예 안 써서 브랜드 재료 코드가 비었다.
    code: stockItem.code || null,
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
