/**
 * 브랜드 카테고리 순서 → 매장 카테고리 순서 (설계 .claude/fable-design-20261108d-brand-category-menu-order.md 결정 3·6)
 *
 * 규칙 (브랜드 «Lock menu order»(enforce_menu_order) ON 일 때만 부른다 — 부르는 쪽이 판정):
 *  1. 브랜드 카테고리 중 sort_order > 0 (= 브랜드가 순서를 정한 것) 만 대상. 하나도 없으면 아무것도 안 함.
 *  2. 매장 1단 카테고리(parent_id IS NULL) 중 브랜드 카테고리와 이름이 같은 행 = 브랜드 미러
 *     (ensureLocalCategory 가 이름으로 만들기 때문). 단 매장에서 묶음 칸(하위 있음)이면 건너뜀.
 *  3. 미러 행 displayOrder ← 브랜드 sort_order 순으로 1..N.
 *  4. 나머지 1단 행(매장 자체·묶음 칸·순서 안 정한 브랜드 이름) ← N+1.. (지금 순서 유지).
 *  5. 하위(2단) 행은 건드리지 않는다. 값이 같으면 쓰지 않는다.
 * 검사(dryRun)와 쓰기는 같은 계산 하나로 한다.
 *
 * push_frozen 확인(assertBrandPushAllowed)은 부르는 쪽 책임 — syncBrandMenuToRestaurant 안에서는 assert 뒤,
 * bulk push 에서 직접 부를 때는 직접 assert 한다.
 */
const { Op } = require('sequelize');
const { BrandMenuCategory, Category } = require('../models');

async function planBrandCategoryOrder({ brandId, restaurantId, transaction }) {
  const brandCats = await BrandMenuCategory.findAll({
    where: { brand_id: brandId, sort_order: { [Op.gt]: 0 } },
    attributes: ['id', 'name', 'sort_order'],
    order: [['sort_order', 'ASC'], ['name', 'ASC'], ['id', 'ASC']],
    transaction
  });
  if (!brandCats.length) return { skipped: 'brand_unordered', changes: [], categorySkipped: [] };

  const top = await Category.findAll({
    where: { restaurant_id: restaurantId, parent_id: null },
    attributes: ['id', 'name', 'displayOrder'],
    order: [['displayOrder', 'ASC'], ['id', 'ASC']],
    transaction
  });
  if (!top.length) return { changes: [], categorySkipped: [] };

  // 하위가 있는 1단 행 = 묶음 칸
  const children = await Category.findAll({
    where: { restaurant_id: restaurantId, parent_id: { [Op.in]: top.map(c => c.id) } },
    attributes: ['parent_id'],
    transaction
  });
  const groupIds = new Set(children.map(c => c.parent_id));

  const byName = new Map();
  for (const c of top) if (!byName.has(c.name)) byName.set(c.name, c);

  const target = new Map(); // category id -> new displayOrder
  const categorySkipped = [];
  let n = 0;
  for (const bc of brandCats) {
    const c = byName.get(bc.name);
    if (!c || target.has(c.id)) continue;
    if (groupIds.has(c.id)) { categorySkipped.push(c.name); continue; }
    target.set(c.id, ++n);
  }
  for (const c of top) {
    if (!target.has(c.id)) target.set(c.id, ++n);
  }

  const changes = [];
  for (const c of top) {
    const to = target.get(c.id);
    if (Number(c.displayOrder) !== to) changes.push({ id: c.id, name: c.name, from: c.displayOrder, to });
  }
  return { changes, categorySkipped };
}

/** 매장 카테고리 순서를 브랜드 순서로 맞춘다. dryRun 이면 쓰지 않고 차이만. */
async function syncBrandCategoryOrderToRestaurant({ brandId, restaurantId, transaction, dryRun = false }) {
  const plan = await planBrandCategoryOrder({ brandId, restaurantId, transaction });
  if (!dryRun) {
    for (const ch of plan.changes) {
      await Category.update({ displayOrder: ch.to }, { where: { id: ch.id, restaurant_id: restaurantId }, transaction });
    }
  }
  return { ...plan, updated: dryRun ? 0 : plan.changes.length };
}

/** 비교 전용 — 다르면 true */
async function diffBrandCategoryOrder(brandId, restaurantId) {
  const plan = await planBrandCategoryOrder({ brandId, restaurantId });
  return plan.changes.length > 0;
}

module.exports = { syncBrandCategoryOrderToRestaurant, diffBrandCategoryOrder, planBrandCategoryOrder };
