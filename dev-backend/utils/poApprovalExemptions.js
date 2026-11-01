/**
 * 오너 승인 예외 규칙 — 고를 후보 · 표시 이름 (2026-11-01 Fable 설계 docs/PURCHASE_ORDER_SYSTEM.md §G-7-5).
 * 새 목록을 만들지 않는다 — 후보는 전부 기존 단일 소스(utils/buyerSellers · utils/restaurantStockScopes)에서 읽는다.
 * 판정은 utils/poOwnerApproval.evaluateApproval 하나.
 */
const { Op } = require('sequelize');

const SCOPES = ['seller', 'ingredient_category', 'ingredient', 'product'];
const SELLER_TYPES = ['system_admin', 'brand', 'foodcourt', 'supplier'];
const SEARCH_LIMIT = 30;

async function loadRestaurant(restaurantId) {
  const { Restaurant } = require('../models');
  return Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id', 'foodcourt_id', 'name'] });
}

/**
 * 고를 후보. 각 항목 { scope, seller_type, target_id, name, sub? }.
 * ingredient·product 는 q(2자 이상) 검색, 최대 30건. q 없으면 빈 목록.
 */
async function listCandidates(restaurantId, scope, q) {
  const restaurant = await loadRestaurant(restaurantId);
  if (!restaurant) return [];
  const S = require('./restaurantStockScopes');
  const { IngredientCategory, Ingredient, Product } = require('../models');
  const term = typeof q === 'string' ? q.trim() : '';

  if (scope === 'seller') {
    const { listBuyerSellers } = require('./buyerSellers');
    const sellers = await listBuyerSellers({ type: 'restaurant', id: restaurant.id });
    return sellers.map(s => ({
      scope: 'seller', seller_type: s.seller_type, target_id: s.seller_id == null ? 0 : Number(s.seller_id),
      name: s.name, sub: s.seller_type === 'supplier' ? (s.is_external ? 'external' : 'registered') : s.seller_type
    }));
  }
  if (scope === 'ingredient_category') {
    const own = await IngredientCategory.findAll({ where: S.ownCategoryWhere(restaurant), attributes: ['id', 'name'], order: [['display_order', 'ASC'], ['name', 'ASC']] });
    const bw = S.brandCategoryWhere(restaurant);
    const brand = bw ? await IngredientCategory.findAll({ where: bw, attributes: ['id', 'name'], order: [['display_order', 'ASC'], ['name', 'ASC']] }) : [];
    return [
      ...own.map(c => ({ scope, seller_type: 'none', target_id: c.id, name: c.name, sub: 'store' })),
      ...brand.map(c => ({ scope, seller_type: 'none', target_id: c.id, name: c.name, sub: 'brand' }))
    ];
  }
  if (scope === 'ingredient') {
    if (term.length < 2) return [];
    const like = { [Op.like]: `%${term}%` };
    const ors = [S.ownIngredientWhere(restaurant)];
    const bw = S.brandIngredientWhere(restaurant);
    if (bw) ors.push(bw);
    const rows = await Ingredient.findAll({
      where: { [Op.and]: [{ [Op.or]: ors }, { name: like }] },
      attributes: ['id', 'name', 'owner_type'], order: [['name', 'ASC']], limit: SEARCH_LIMIT
    });
    return rows.map(r => ({ scope, seller_type: 'none', target_id: r.id, name: r.name, sub: r.owner_type === 'brand' ? 'brand' : 'store' }));
  }
  if (scope === 'product') {
    if (term.length < 2) return [];
    const rows = await Product.findAll({
      where: { ...S.stockProductWhere(restaurant.id), name: { [Op.like]: `%${term}%` } },
      attributes: ['id', 'name'], order: [['name', 'ASC']], limit: SEARCH_LIMIT
    });
    return rows.map(r => ({ scope, seller_type: 'none', target_id: r.id, name: r.name, sub: 'product' }));
  }
  return [];
}

/** 이 매장의 후보에 그 타깃이 있는가(남의 매장 id 를 막는다). 있으면 이름을 돌려준다. */
async function findCandidate(restaurantId, scope, sellerType, targetId) {
  const restaurant = await loadRestaurant(restaurantId);
  if (!restaurant) return null;
  const S = require('./restaurantStockScopes');
  const { IngredientCategory, Ingredient, Product } = require('../models');
  const id = Number(targetId);
  if (scope === 'seller') {
    const list = await listCandidates(restaurantId, 'seller');
    return list.find(c => c.seller_type === sellerType && Number(c.target_id) === id) || null;
  }
  if (scope === 'ingredient_category') {
    const ors = [S.ownCategoryWhere(restaurant)];
    const bw = S.brandCategoryWhere(restaurant); if (bw) ors.push(bw);
    const r = await IngredientCategory.findOne({ where: { [Op.and]: [{ id }, { [Op.or]: ors }] }, attributes: ['id', 'name'] });
    return r ? { name: r.name } : null;
  }
  if (scope === 'ingredient') {
    const ors = [S.ownIngredientWhere(restaurant)];
    const bw = S.brandIngredientWhere(restaurant); if (bw) ors.push(bw);
    const r = await Ingredient.findOne({ where: { [Op.and]: [{ id }, { [Op.or]: ors }] }, attributes: ['id', 'name'] });
    return r ? { name: r.name } : null;
  }
  if (scope === 'product') {
    const r = await Product.findOne({ where: { ...S.stockProductWhere(restaurant.id), id }, attributes: ['id', 'name'] });
    return r ? { name: r.name } : null;
  }
  return null;
}

/** 규칙 행들에 표시 이름(display_name) · 지워졌으면 deleted:true. */
async function describeRules(rows) {
  const list = rows.map(r => (typeof r.toJSON === 'function' ? r.toJSON() : { ...r }));
  if (!list.length) return list;
  const { IngredientCategory, Ingredient, Product, User } = require('../models');
  const ids = (scope) => [...new Set(list.filter(r => r.scope === scope).map(r => Number(r.target_id)))];
  const nameMap = async (Model, scope) => {
    const want = ids(scope);
    if (!want.length) return new Map();
    const rows = await Model.findAll({ where: { id: want }, attributes: ['id', 'name'], raw: true });
    return new Map(rows.map(r => [Number(r.id), r.name]));
  };
  const cat = await nameMap(IngredientCategory, 'ingredient_category');
  const ing = await nameMap(Ingredient, 'ingredient');
  const prod = await nameMap(Product, 'product');
  const sellerRules = list.filter(r => r.scope === 'seller');
  let sellerMap = null;
  if (sellerRules.length) {
    const { resolveSellers, getSellerName } = require('./sellerNames');
    const fake = sellerRules.map(r => ({ seller_type: r.seller_type, seller_entity_id: r.seller_type === 'system_admin' ? null : r.target_id }));
    sellerMap = { map: await resolveSellers(fake), getSellerName };
  }
  const userIds = [...new Set(list.map(r => r.created_by_user_id).filter(Boolean))];
  const users = userIds.length ? await User.findAll({ where: { id: userIds }, attributes: ['id', 'full_name', 'username', 'email'], raw: true }) : [];
  const userMap = new Map(users.map(u => [Number(u.id), u.full_name || u.username || u.email]));
  return list.map(r => {
    let name = null;
    if (r.scope === 'ingredient_category') name = cat.get(Number(r.target_id)) || null;
    else if (r.scope === 'ingredient') name = ing.get(Number(r.target_id)) || null;
    else if (r.scope === 'product') name = prod.get(Number(r.target_id)) || null;
    else if (r.scope === 'seller') {
      if (r.seller_type === 'system_admin') name = 'POS Catalog';
      else {
        name = sellerMap.getSellerName(sellerMap.map, r.seller_type, r.target_id) || null;
      }
    }
    return { ...r, display_name: name, deleted: !name, created_by_name: userMap.get(Number(r.created_by_user_id)) || null };
  });
}

module.exports = { SCOPES, SELLER_TYPES, listCandidates, findCandidate, describeRules };
