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
 *   - (2026-11-08 설계 c 결정 4) 버전이 같아도 내용이 다름 — 이름·가격·사진(브랜드에 있을 때)·카테고리 이름
 *     (매장 카테고리 행은 만들지 않고 비교만) · 가시성(brand_scope_active ≠ 브랜드 is_active)
 *   - 브랜드가 꺼 둔 메뉴는 매장에 없으면 만들지 않는다(대상 아님)
 *   - 브랜드가 «보내기 멈춤»(push_frozen)이면 계획 0 · frozen:true
 * 이미 최신인 매장은 건드리지 않는다(매장 쪽 쓰기 최소).
 */
const { Op } = require('sequelize');
const { BrandMenu, BrandMenuCategory, Product } = require('../models');
const { pushBrandMenuToRestaurants, resolveScopeTargetIds, isBrandPushFrozen, assertBrandPushAllowed } = require('./brandMenuSyncService');
const { findGroupCategoryByName } = require('../utils/menuCategoryTree');
const { syncBrandCategoryOrderToRestaurant, diffBrandCategoryOrder } = require('./brandCategoryOrder');

// 브랜드 «Lock menu order»(enforce_menu_order) — 켜졌을 때만 순서(메뉴·카테고리)를 비교·전달 (설계 2026-11-08d 결정 6)
async function isBrandOrderEnforced(brandId) {
  const { Brand } = require('../models');
  const brand = await Brand.findByPk(brandId, { attributes: ['id', 'menu_settings'] });
  let settings = brand && brand.menu_settings;
  if (typeof settings === 'string') { try { settings = JSON.parse(settings); } catch (_) { settings = null; } }
  return !!(settings && settings.enforce_menu_order === true);
}

// 매장 상품이 브랜드 내용과 다른 칸 — sync 가 덮는 규칙과 같은 기준(브랜드 값이 비면 비교 안 함)
async function contentDiffFields(p, m, brandCategoryName) {
  const fields = [];
  if ((p.name || '') !== (m.name || '')) fields.push('name');
  if (Number(p.price) !== Number(m.recommended_price)) fields.push('price');
  if (m.image_url && (p.image || '') !== m.image_url) fields.push('image');
  if (brandCategoryName && (p.category || '') !== brandCategoryName) {
    // 매장에서 같은 이름이 묶음 칸이면 sync 도 못 넣는다 — 차이로 세지 않음(끝없이 잡히지 않게)
    const group = await findGroupCategoryByName(p.restaurant_id, brandCategoryName);
    if (!group) fields.push('category');
  }
  if ((p.brand_scope_active !== false) !== (m.is_active !== false)) fields.push('visibility');
  return fields;
}

async function planBrandBulkPush(brandId) {
  if (await isBrandPushFrozen(brandId)) return { menus: [], menu_count: 0, push_count: 0, category_order_restaurant_ids: [], frozen: true };
  const orderEnforced = await isBrandOrderEnforced(brandId);
  const menus = await BrandMenu.findAll({
    where: { brand_id: brandId },
    attributes: ['id', 'name', 'version', 'brand_id', 'scope_mode', 'is_active', 'recommended_price', 'image_url', 'category_id', 'sort_order'],
    include: [{ model: BrandMenuCategory, as: 'category', attributes: ['id', 'name'] }],
    order: [['sort_order', 'ASC'], ['name', 'ASC']]
  });
  if (!menus.length) return { menus: [], menu_count: 0, push_count: 0, category_order_restaurant_ids: [] };

  const products = await Product.findAll({
    where: { brand_menu_id: { [Op.in]: menus.map(m => m.id) } },
    attributes: ['id', 'restaurant_id', 'brand_menu_id', 'brand_menu_synced_version', 'brand_menu_link_status', 'brand_scope_active',
      'name', 'price', 'image', 'category', 'display_order']
  });
  const byMenu = new Map();
  for (const p of products) {
    if (!byMenu.has(p.brand_menu_id)) byMenu.set(p.brand_menu_id, new Map());
    byMenu.get(p.brand_menu_id).set(p.restaurant_id, p);
  }

  const plan = [];
  const allTargets = new Set();
  for (const m of menus) {
    const targets = await resolveScopeTargetIds(m);
    for (const rid of targets) allTargets.add(rid);
    const linked = byMenu.get(m.id) || new Map();
    const need = [];
    const changes = [];
    const brandActive = m.is_active !== false;
    const catName = m.category ? m.category.name : null;
    for (const rid of targets) {
      const p = linked.get(rid);
      if (!p) {
        if (brandActive) { need.push(rid); changes.push({ restaurant_id: rid, fields: ['new'] }); }
        continue;
      }
      const fields = [];
      if (p.brand_menu_link_status !== 'in_sync') fields.push('status');
      if ((p.brand_menu_synced_version || 0) < (m.version || 0)) fields.push('version');
      if (p.brand_scope_active === false && brandActive) fields.push('visibility');
      for (const f of await contentDiffFields(p, m, catName)) if (!fields.includes(f)) fields.push(f);
      if (orderEnforced && Number(m.sort_order) > 0 && Number(p.display_order) !== Number(m.sort_order)) fields.push('order');
      if (fields.length) { need.push(rid); changes.push({ restaurant_id: rid, fields }); }
    }
    if (need.length) plan.push({ id: m.id, name: m.name, restaurant_ids: need, changes });
  }
  // 매장별 카테고리 순서 차이(ON 브랜드만) — 쓰지 않고 비교만
  const categoryOrderIds = [];
  if (orderEnforced) {
    for (const rid of allTargets) {
      if (await diffBrandCategoryOrder(brandId, rid)) categoryOrderIds.push(rid);
    }
  }
  return {
    menus: plan,
    menu_count: plan.length,
    push_count: plan.reduce((s, m) => s + m.restaurant_ids.length, 0),
    category_order_restaurant_ids: categoryOrderIds
  };
}

async function runBrandBulkPush(brandId) {
  const plan = await planBrandBulkPush(brandId);
  const result = { menus: 0, pushed: 0, created: 0, updated: 0, failed: [], category_skipped: [], category_order_updated: 0 };
  const pushedRestaurants = new Set();
  for (const m of plan.menus) {
    const r = await pushBrandMenuToRestaurants({ brandMenuId: m.id, restaurantIds: m.restaurant_ids });
    result.menus++;
    result.pushed += r.pushed;
    result.created += r.created;
    result.updated += r.updated;
    for (const rid of m.restaurant_ids) if (!r.failed.some(f => Number(f.restaurant_id) === Number(rid))) pushedRestaurants.add(Number(rid));
    for (const f of r.failed) result.failed.push({ ...f, brand_menu_id: m.id, menu_name: m.name });
    for (const c of r.category_skipped) result.category_skipped.push({ ...c, brand_menu_id: m.id, menu_name: m.name });
  }
  // 메뉴 푸시가 안 간 매장은 카테고리 순서만 따로 (메뉴가 간 매장은 sync 안에서 이미 맞춰짐)
  for (const rid of plan.category_order_restaurant_ids || []) {
    if (pushedRestaurants.has(Number(rid))) continue;
    const t = await BrandMenu.sequelize.transaction();
    try {
      await assertBrandPushAllowed(brandId, t);
      const r = await syncBrandCategoryOrderToRestaurant({ brandId, restaurantId: rid, transaction: t });
      await t.commit();
      if (r.updated > 0) result.category_order_updated++;
    } catch (e) {
      try { await t.rollback(); } catch (_) {}
      result.failed.push({ restaurant_id: rid, error: e.message, kind: 'category_order' });
    }
  }
  return result;
}

module.exports = { planBrandBulkPush, runBrandBulkPush };
