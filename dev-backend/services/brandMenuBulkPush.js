/**
 * 브랜드 메뉴 «바뀐 것 한 번에 보내기» (2026-11-08 Irene «브랜드 메뉴를 다 수정했는데 한번에 푸시하는 기능 없어?»)
 *
 * 메뉴 하나씩 보내는 기존 길(POST /api/brand-menus/:id/push)을 그대로 묶어 부른다 —
 * 매장에 쓰는 일은 전부 pushBrandMenuToRestaurants(매장마다 따로 트랜잭션) 하나뿐. 새 쓰기 규칙 없음.
 *
 * 무엇을 보내나: 브랜드의 메뉴마다, 적용범위(scope) 안 매장 중 «최신이 아닌» 매장만.
 *   - 매장에 그 메뉴가 아직 없음
 *   - 링크 상태가 in_sync 가 아님 (pending_update 등)
 *   - 받은 버전이 메뉴 버전보다 낮음
 *   - 범위에서 숨겨졌던(brand_scope_active=false) 상품
 * 이미 최신인 매장은 건드리지 않는다(매장 쪽 쓰기 최소).
 */
const { Op } = require('sequelize');
const { BrandMenu, Product } = require('../models');
const { pushBrandMenuToRestaurants, resolveScopeTargetIds } = require('./brandMenuSyncService');

async function planBrandBulkPush(brandId) {
  const menus = await BrandMenu.findAll({
    where: { brand_id: brandId },
    attributes: ['id', 'name', 'version', 'brand_id', 'scope_mode'],
    order: [['sort_order', 'ASC'], ['name', 'ASC']]
  });
  if (!menus.length) return { menus: [], menu_count: 0, push_count: 0 };

  const products = await Product.findAll({
    where: { brand_menu_id: { [Op.in]: menus.map(m => m.id) } },
    attributes: ['id', 'restaurant_id', 'brand_menu_id', 'brand_menu_synced_version', 'brand_menu_link_status', 'brand_scope_active']
  });
  const byMenu = new Map();
  for (const p of products) {
    if (!byMenu.has(p.brand_menu_id)) byMenu.set(p.brand_menu_id, new Map());
    byMenu.get(p.brand_menu_id).set(p.restaurant_id, p);
  }

  const plan = [];
  for (const m of menus) {
    const targets = await resolveScopeTargetIds(m);
    const linked = byMenu.get(m.id) || new Map();
    const need = targets.filter(rid => {
      const p = linked.get(rid);
      if (!p) return true;
      if (p.brand_menu_link_status !== 'in_sync') return true;
      if ((p.brand_menu_synced_version || 0) < (m.version || 0)) return true;
      if (p.brand_scope_active === false) return true;
      return false;
    });
    if (need.length) plan.push({ id: m.id, name: m.name, restaurant_ids: need });
  }
  return {
    menus: plan,
    menu_count: plan.length,
    push_count: plan.reduce((s, m) => s + m.restaurant_ids.length, 0)
  };
}

async function runBrandBulkPush(brandId) {
  const plan = await planBrandBulkPush(brandId);
  const result = { menus: 0, pushed: 0, created: 0, updated: 0, failed: [], category_skipped: [] };
  for (const m of plan.menus) {
    const r = await pushBrandMenuToRestaurants({ brandMenuId: m.id, restaurantIds: m.restaurant_ids });
    result.menus++;
    result.pushed += r.pushed;
    result.created += r.created;
    result.updated += r.updated;
    for (const f of r.failed) result.failed.push({ ...f, brand_menu_id: m.id, menu_name: m.name });
    for (const c of r.category_skipped) result.category_skipped.push({ ...c, brand_menu_id: m.id, menu_name: m.name });
  }
  return result;
}

module.exports = { planBrandBulkPush, runBrandBulkPush };
