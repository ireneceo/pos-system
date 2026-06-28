/**
 * Brand Menus — BG 측 메뉴 템플릿 CRUD + push + copy + distribution
 *
 * Mount: /api/brand-menus
 * Auth: authenticateToken + requireBGScope
 *
 * Endpoints:
 *   GET    /                            list (brand_id filter)
 *   POST   /                            create (+ auto-push if distribution_mode=auto)
 *   GET    /:id                         detail
 *   PUT    /:id                         update (version++ + mark pending if manual, sync if auto)
 *   DELETE /:id                         delete + soft-unlink linked Products
 *   POST   /:id/copy                    copy to another brand
 *   POST   /:id/push                    manual push to restaurant_ids (or all)
 *   GET    /:id/distribution            sync status per restaurant
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope } = require('../middleware/brandScope');
const { normalizeImageField, copyImageToOwnedFile } = require('../utils/imageProcessor');
const {
  Brand, Restaurant, ProductRecipe, BrandMenu, BrandMenuCategory,
  BrandMenuOptionGroup, BrandMenuOption, BrandMenuOptionGroupLink, BrandMenuRestaurant, Product,
  BrandMenuRecommendation
} = require('../models');
const {
  syncBrandMenuToRestaurant, pushBrandMenuToRestaurants,
  markPendingForBrandMenu, softUnlinkProductsFromBrandMenu,
  resolveScopeTargetIds, applyScopeToBrandMenu, setBrandMenuScope,
  syncBrandRecommendationsToAllRestaurants
} = require('../services/brandMenuSyncService');

// Ownership guard — BG가 이 brand 를 소유하는지 (System Admin 은 통과)
async function assertBrandOwnership(req, brandId) {
  if (req.bgOwnerIsAdmin) return true;
  const brand = await Brand.findByPk(brandId, { attributes: ['id', 'owner_id'] });
  if (!brand) return false;
  return brand.owner_id === req.bgOwnerId;
}

// ──────────────────────────────────────────────────────────────────────────
// Brand-level menu defaults (Settings tab) — must come BEFORE /:id routes
// so the literal "/settings" path is not interpreted as :id.
// ──────────────────────────────────────────────────────────────────────────
const DEFAULT_MENU_SETTINGS = {
  default_distribution_mode: 'manual',
  default_locks: { name: false, price: false, category: false, image: false, options: false },
  default_push_target: 'all',
  default_scope: 'all',  // 새 메뉴의 기본 적용범위 (브랜드별 철학: 균일='all' / 직영실험형='selected') §14
  // 브랜드 전체 순서 고정 — 켜면 산하 모든 매장이 브랜드 메뉴 순서를 따르고 매장이 못 바꿈.
  // (구 per-menu lock_sort_order 토글 대체 — 순서는 목록 전체 개념이라 메뉴별 토글이 혼동을 줬음)
  enforce_menu_order: false
};

function mergeMenuSettings(stored) {
  const s = stored || {};
  return {
    default_distribution_mode: s.default_distribution_mode === 'auto' ? 'auto' : 'manual',
    default_locks: {
      name: !!(s.default_locks?.name),
      price: !!(s.default_locks?.price),
      category: !!(s.default_locks?.category),
      image: !!(s.default_locks?.image),
      options: !!(s.default_locks?.options)
    },
    default_push_target: s.default_push_target === 'selected' ? 'selected' : 'all',
    default_scope: s.default_scope === 'selected' ? 'selected' : 'all',
    enforce_menu_order: !!(s.enforce_menu_order)
  };
}

router.get('/settings', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const brandId = parseInt(req.query.brand_id, 10);
    if (!brandId) return res.status(400).json({ success: false, message: 'brand_id required' });
    if (!(await assertBrandOwnership(req, brandId))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const brand = await Brand.findByPk(brandId, { attributes: ['id', 'menu_settings'] });
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, data: mergeMenuSettings(brand.menu_settings) });
  } catch (e) {
    console.error('[brand-menus] settings GET error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

router.put('/settings', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const brandId = parseInt(req.body.brand_id, 10);
    if (!brandId) return res.status(400).json({ success: false, message: 'brand_id required' });
    if (!(await assertBrandOwnership(req, brandId))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    const merged = mergeMenuSettings(req.body.settings);
    await brand.update({ menu_settings: merged });
    // 브랜드 전체 순서 고정은 단일 source — 저장 시 산하 모든 메뉴의 lock_sort_order 를 일괄 동기화.
    // 켜면 다음 push/sync 때 매장 메뉴가 브랜드 순서로 고정, 끄면 매장이 자유 정렬.
    await BrandMenu.update(
      { lock_sort_order: merged.enforce_menu_order === true },
      { where: { brand_id: brandId } }
    );
    res.json({ success: true, data: merged });
  } catch (e) {
    console.error('[brand-menus] settings PUT error:', e);
    res.status(500).json({ success: false, message: 'Failed to save settings' });
  }
});

async function loadMenuWithIncludes(id) {
  return BrandMenu.findByPk(id, {
    include: [
      { model: BrandMenuCategory, as: 'category' },
      { model: ProductRecipe, as: 'recipe' },
      {
        model: BrandMenuOptionGroup, as: 'optionGroups', through: { attributes: ['sort_order'] },
        include: [{ model: BrandMenuOption, as: 'options' }]
      }
    ]
  });
}

// GET /api/brand-menus?brand_id=X&category_id=Y&search=Z
router.get('/', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const brandId = parseInt(req.query.brand_id, 10);
    if (!Number.isFinite(brandId)) {
      return res.status(400).json({ success: false, message: 'brand_id is required' });
    }
    if (!(await assertBrandOwnership(req, brandId))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    const where = { brand_id: brandId };
    if (req.query.category_id) where.category_id = parseInt(req.query.category_id, 10);
    if (req.query.search) where.name = { [Op.like]: `%${req.query.search}%` };

    const menus = await BrandMenu.findAll({
      where,
      include: [
        { model: BrandMenuCategory, as: 'category', attributes: ['id', 'name', 'emoji'] },
        { model: ProductRecipe, as: 'recipe', attributes: ['id', 'name', 'code'] },
        // 세트 빌더의 구성품 상속옵션 표시용 — 각 메뉴의 옵션그룹 id (경량)
        { model: BrandMenuOptionGroup, as: 'optionGroups', attributes: ['id', 'name'], through: { attributes: [] } }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    // Distribution summary per menu — pending/in_sync/unlinked counts
    const ids = menus.map(m => m.id);
    const distribution = {};
    if (ids.length > 0) {
      const [rows] = await BrandMenu.sequelize.query(
        `SELECT brand_menu_id, brand_menu_link_status, COUNT(*) as cnt
         FROM products WHERE brand_menu_id IN (:ids) GROUP BY brand_menu_id, brand_menu_link_status`,
        { replacements: { ids } }
      );
      for (const r of rows) {
        if (!distribution[r.brand_menu_id]) distribution[r.brand_menu_id] = { in_sync: 0, pending_update: 0, unlinked: 0 };
        distribution[r.brand_menu_id][r.brand_menu_link_status] = Number(r.cnt);
      }
    }

    const data = menus.map(m => ({
      ...m.toJSON(),
      locks: { name: !!m.lock_name, price: !!m.lock_price, category: !!m.lock_category, image: !!m.lock_image, options: !!m.lock_options, set_items: !!m.lock_set_items },
      distribution: distribution[m.id] || { in_sync: 0, pending_update: 0, unlinked: 0 }
    }));

    res.json({ success: true, data });
  } catch (e) {
    console.error('[brand-menus] list error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch brand menus' });
  }
});

// GET /api/brand-menus/:id
router.get('/:id', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const menu = await loadMenuWithIncludes(parseInt(req.params.id, 10));
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    res.json({ success: true, data: menu });
  } catch (e) {
    console.error('[brand-menus] detail error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch brand menu' });
  }
});

// #11c 크로스셀 — BG 브랜드메뉴 추천 연결 (설계 §3.2). 저장 시 가맹점 동기화.
router.get('/:id/recommendations', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const brandMenuId = parseInt(req.params.id, 10);
    const menu = await BrandMenu.findByPk(brandMenuId, { attributes: ['id', 'brand_id'] });
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const recs = await BrandMenuRecommendation.findAll({ where: { brand_menu_id: brandMenuId }, order: [['sort_order', 'ASC'], ['id', 'ASC']] });
    const recIds = recs.map(r => r.recommended_brand_menu_id);
    const menus = recIds.length ? await BrandMenu.findAll({ where: { id: { [Op.in]: recIds }, brand_id: menu.brand_id }, attributes: ['id', 'name', 'image_url'] }) : [];
    const byId = new Map(menus.map(m => [m.id, m]));
    const data = recs.map(r => ({
      id: r.id, recommended_brand_menu_id: r.recommended_brand_menu_id,
      name: byId.get(r.recommended_brand_menu_id)?.name || `#${r.recommended_brand_menu_id}`,
      image: byId.get(r.recommended_brand_menu_id)?.image_url || null,
      sort_order: r.sort_order, is_locked: r.is_locked,
    }));
    res.json({ success: true, data });
  } catch (e) {
    console.error('[brand-menus] get recommendations error:', e);
    res.status(500).json({ success: false, message: 'Failed to load recommendations' });
  }
});

router.put('/:id/recommendations', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const brandMenuId = parseInt(req.params.id, 10);
    const menu = await BrandMenu.findByPk(brandMenuId, { attributes: ['id', 'brand_id'] });
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const ids = Array.isArray(req.body.recommended_brand_menu_ids) ? req.body.recommended_brand_menu_ids.map(Number).filter(Number.isFinite) : [];
    const isLocked = req.body.is_locked === true;
    const cleanIds = [...new Set(ids.filter(id => id !== brandMenuId))];
    if (cleanIds.length) {
      const owned = await BrandMenu.findAll({ where: { id: { [Op.in]: cleanIds }, brand_id: menu.brand_id }, attributes: ['id'] });
      const set = new Set(owned.map(m => m.id));
      for (const id of cleanIds) if (!set.has(id)) return res.status(400).json({ success: false, message: `Brand menu ${id} not in this brand` });
    }
    await BrandMenuRecommendation.destroy({ where: { brand_menu_id: brandMenuId } });
    let order = 0;
    for (const recId of cleanIds) {
      await BrandMenuRecommendation.create({ brand_id: menu.brand_id, brand_menu_id: brandMenuId, recommended_brand_menu_id: recId, sort_order: order, is_locked: isLocked });
      order++;
    }
    // 저장 후 가맹점 동기화 (설계 §4.1)
    const sync = await syncBrandRecommendationsToAllRestaurants({ brandId: menu.brand_id });
    res.json({ success: true, data: { saved: cleanIds.length, synced_restaurants: sync.length } });
  } catch (e) {
    console.error('[brand-menus] put recommendations error:', e);
    res.status(500).json({ success: false, message: 'Failed to save recommendations' });
  }
});

// PUT /api/brand-menus/reorder/bulk — BG 가 브랜드 메뉴 순서 지정 (sort_order 0..N).
// lock_sort_order 가 켜진 메뉴는 push 시 매장 display_order 로 강제된다.
router.put('/reorder/bulk', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const { brand_id, order } = req.body;
    if (!(await assertBrandOwnership(req, brand_id))) {
      await t.rollback(); return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    if (!Array.isArray(order) || order.length === 0) {
      await t.rollback(); return res.status(400).json({ success: false, message: 'order array required' });
    }
    // 1-based(i+1) 저장: 프론트 sortItems('custom')·매장 push 가 display_order 0 을 "미설정→맨뒤"로
    // 취급한다(SortDropdown). 0-based 로 저장하면 1번 위치 메뉴가 sort_order 0 → 맨 뒤로 튕겨
    // "드래그 재정렬이 안 되는" 버그(2026-06-28 수정). 재정렬된 메뉴는 1..N, 미정렬은 0(뒤).
    for (let i = 0; i < order.length; i++) {
      await BrandMenu.update({ sort_order: i + 1 }, { where: { id: order[i], brand_id }, transaction: t });
    }
    await t.commit();
    res.json({ success: true, data: { updated: order.length } });
  } catch (e) {
    await t.rollback();
    console.error('[brand-menus] reorder error:', e);
    res.status(500).json({ success: false, message: 'Failed to reorder brand menus' });
  }
});

// POST /api/brand-menus
router.post('/', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const {
      brand_id, category_id, product_recipe_id, name, description, image_url, emoji,
      recommended_price, currency, is_active, after_meal, set_only, sort_order, distribution_mode,
      option_group_ids, locks, is_set_menu, set_items, set_groups
    } = req.body;
    // Accept both nested locks{} and flat lock_* — nested wins if provided
    const lock_name = locks && 'name' in locks ? locks.name : req.body.lock_name;
    const lock_price = locks && 'price' in locks ? locks.price : req.body.lock_price;
    const lock_category = locks && 'category' in locks ? locks.category : req.body.lock_category;
    const lock_image = locks && 'image' in locks ? locks.image : req.body.lock_image;
    const lock_options = locks && 'options' in locks ? locks.options : req.body.lock_options;
    const lock_set_items = locks && 'set_items' in locks ? locks.set_items : req.body.lock_set_items;

    if (!Number.isFinite(parseInt(brand_id, 10)) || !name?.trim()) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'brand_id and name are required' });
    }
    if (!(await assertBrandOwnership(req, brand_id))) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    // Apply brand-level menu_settings defaults for any unspecified field.
    // Client may omit distribution_mode / lock_* on create — the brand's Settings tab
    // values fill in. Explicit per-menu values always win over brand defaults.
    const brand = await Brand.findByPk(brand_id, { attributes: ['menu_settings'], transaction: t });
    const defaults = mergeMenuSettings(brand?.menu_settings);
    const resolvedDistribution = distribution_mode === 'auto' || distribution_mode === 'manual'
      ? distribution_mode
      : defaults.default_distribution_mode;
    // 적용범위(Scope): 명시값 우선, 없으면 브랜드 기본(default_scope) §14
    const resolvedScope = req.body.scope_mode === 'all' || req.body.scope_mode === 'selected'
      ? req.body.scope_mode
      : defaults.default_scope;
    const resolvedLock = (explicit, key) =>
      explicit === true || explicit === false ? explicit : defaults.default_locks[key];

    // base64 image → file
    const normalizedImage = await normalizeImageField(image_url, {
      subdir: 'brand-menus',
      filename: `brand_menu_${brand_id}_${Date.now()}`,
      maxWidth: 800, maxHeight: 800
    });

    // 2026-06-12 (thefire02 이미지 소실 사고): 매장 제품 등 타 경로(/uploads/products/...)의
    // 이미지를 "참조만" 하면 원본 교체 시 파일이 삭제돼 브랜드메뉴+푸시된 전 매장이 깨진다.
    // 외부 /uploads/ 참조는 brand-menus 소유 파일로 복사. 원본이 이미 없으면 null(죽은 참조 차단).
    let ownedImage = normalizedImage;
    if (ownedImage && ownedImage.startsWith('/uploads/') && !ownedImage.includes('/brand-menus/')) {
      ownedImage = await copyImageToOwnedFile(ownedImage, {
        subdir: 'brand-menus', filename: `brand_menu_${brand_id}_${Date.now()}`
      });
    }

    const menu = await BrandMenu.create({
      brand_id, category_id: category_id || null,
      product_recipe_id: product_recipe_id || null,
      name: name.trim(), description: description || null,
      image_url: ownedImage, emoji: emoji || null,
      recommended_price: recommended_price || 0, currency: currency || 'MYR',
      is_active: is_active !== false, after_meal: after_meal === true, set_only: set_only === true, sort_order: sort_order || 0,
      version: 1,
      distribution_mode: resolvedDistribution,
      scope_mode: resolvedScope,
      lock_name: resolvedLock(lock_name, 'name'),
      lock_price: resolvedLock(lock_price, 'price'),
      lock_category: resolvedLock(lock_category, 'category'),
      lock_image: resolvedLock(lock_image, 'image'),
      lock_options: resolvedLock(lock_options, 'options'),
      is_set_menu: !!is_set_menu,
      set_items: Array.isArray(set_items) ? set_items : null,
      set_groups: Array.isArray(set_groups) ? set_groups : null,
      lock_set_items: resolvedLock(lock_set_items, 'set_items'),
      // 순서 고정은 브랜드 전체 설정(enforce_menu_order)이 단일 source — 새 메뉴도 브랜드 값 상속
      lock_sort_order: defaults.enforce_menu_order === true
    }, { transaction: t });

    // Option group links
    if (Array.isArray(option_group_ids) && option_group_ids.length > 0) {
      const groups = await BrandMenuOptionGroup.findAll({ where: { id: option_group_ids, brand_id }, transaction: t });
      if (groups.length !== option_group_ids.length) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'One or more option_group_ids do not belong to this brand' });
      }
      let sort = 0;
      for (const gid of option_group_ids) {
        await BrandMenuOptionGroupLink.create({ brand_menu_id: menu.id, option_group_id: gid, sort_order: sort++ }, { transaction: t });
      }
    }

    await t.commit();

    // 적용범위 reconcile (트랜잭션 밖 — 매장별 best-effort). §14
    // scope 가 곧 "이 메뉴가 적용되는 매장" → 그 매장에 Product 생성(비활성, RA 가 활성화).
    // 'all' → 산하 전 매장 / 'selected' → allowlist. distribution_mode=auto 면 콘텐츠 즉시 sync.
    // (구 auto-push-all 로직을 선언적 scope reconcile 로 대체)
    let scopeResult = null;
    try {
      scopeResult = await setBrandMenuScope({
        brandMenuId: menu.id,
        scopeMode: resolvedScope,
        restaurantIds: Array.isArray(req.body.scope_restaurant_ids) ? req.body.scope_restaurant_ids : [],
        refreshMode: menu.distribution_mode === 'auto' ? 'sync' : 'membership'
      });
    } catch (e) {
      console.error('[brand-menus] create scope reconcile error:', e.message);
    }

    res.status(201).json({ success: true, data: { menu, push: scopeResult, scope: scopeResult } });
  } catch (e) {
    await t.rollback();
    console.error('[brand-menus] create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create brand menu' });
  }
});

// PUT /api/brand-menus/:id
router.put('/:id', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) { await t.rollback(); return res.status(400).json({ success: false, message: 'Invalid brand menu id' }); }
    const menu = await BrandMenu.findByPk(id, { transaction: t });
    if (!menu) { await t.rollback(); return res.status(404).json({ success: false, message: 'Brand menu not found' }); }
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      await t.rollback(); return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    const body = req.body || {};
    const updatable = ['category_id', 'product_recipe_id', 'name', 'description', 'emoji',
      'recommended_price', 'currency', 'is_active', 'after_meal', 'set_only', 'sort_order', 'distribution_mode',
      'lock_name', 'lock_price', 'lock_category', 'lock_image', 'lock_options',
      'is_set_menu', 'set_items', 'set_groups', 'lock_set_items'];
      // lock_sort_order 는 PUT 에서 받지 않음 — 브랜드 전체 설정(enforce_menu_order)이 단일 source
    const update = {};
    for (const k of updatable) if (k in body) update[k] = body[k];

    if (body.image_url !== undefined) {
      update.image_url = await normalizeImageField(body.image_url, {
        subdir: 'brand-menus',
        filename: `brand_menu_${menu.brand_id}_${menu.id}_${Date.now()}`,
        maxWidth: 800, maxHeight: 800
      });
      // 외부 /uploads/ 참조 → brand-menus 소유 파일로 복사 (2026-06-12, 위 POST 와 동일 사유)
      if (update.image_url && update.image_url.startsWith('/uploads/') && !update.image_url.includes('/brand-menus/')) {
        update.image_url = await copyImageToOwnedFile(update.image_url, {
          subdir: 'brand-menus', filename: `brand_menu_${menu.brand_id}_${menu.id}_${Date.now()}`
        });
      }
    }
    update.version = menu.version + 1;
    await menu.update(update, { transaction: t });

    // Replace option group links if provided
    if (Array.isArray(body.option_group_ids)) {
      const groups = await BrandMenuOptionGroup.findAll({ where: { id: body.option_group_ids, brand_id: menu.brand_id }, transaction: t });
      if (groups.length !== body.option_group_ids.length) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'option_group_ids brand mismatch' });
      }
      await BrandMenuOptionGroupLink.destroy({ where: { brand_menu_id: menu.id }, transaction: t });
      let sort = 0;
      for (const gid of body.option_group_ids) {
        await BrandMenuOptionGroupLink.create({ brand_menu_id: menu.id, option_group_id: gid, sort_order: sort++ }, { transaction: t });
      }
    }

    // 필드 변경 커밋 → scope/콘텐츠 reconcile 는 트랜잭션 밖(매장별 best-effort). §14
    const distributionMode = update.distribution_mode || menu.distribution_mode;
    const scopeProvided = body.scope_mode !== undefined || body.scope_restaurant_ids !== undefined;
    const effectiveScopeMode = (body.scope_mode === 'all' || body.scope_mode === 'selected')
      ? body.scope_mode : menu.scope_mode;
    await t.commit();

    const refreshMode = distributionMode === 'auto' ? 'sync' : 'membership';
    let scopeResult = null;
    try {
      if (scopeProvided) {
        // 명시된 scope (모드/allowlist) 저장 + reconcile. allowlist 미제공 시 기존 유지.
        let scopeIds;
        if (body.scope_restaurant_ids !== undefined) {
          scopeIds = Array.isArray(body.scope_restaurant_ids) ? body.scope_restaurant_ids : [];
        } else {
          const rows = await BrandMenuRestaurant.findAll({ where: { brand_menu_id: menu.id }, attributes: ['restaurant_id'] });
          scopeIds = rows.map(r => r.restaurant_id);
        }
        scopeResult = await setBrandMenuScope({ brandMenuId: menu.id, scopeMode: effectiveScopeMode, restaurantIds: scopeIds, refreshMode });
      } else {
        // scope 변경 없음 → 현재 범위 기준 콘텐츠 전파만 (auto=refresh, manual=membership+pending)
        scopeResult = await applyScopeToBrandMenu({ brandMenuId: menu.id, refreshMode });
      }
      // manual 분배: 범위 내 기존 노출 상품을 pending 으로 표시 (콘텐츠 변경 알림 — RA 가 pull)
      if (distributionMode !== 'auto') {
        await markPendingForBrandMenu(menu.id);
      }
    } catch (e) {
      console.error('[brand-menus] update scope reconcile error:', e.message);
    }

    return res.json({ success: true, data: { menu, push: scopeResult, scope: scopeResult } });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menus] update error:', e);
    res.status(500).json({ success: false, message: 'Failed to update brand menu' });
  }
});

// DELETE /api/brand-menus/:id — soft unlink Products, hard delete brand_menu
router.delete('/:id', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const menu = await BrandMenu.findByPk(parseInt(req.params.id, 10), { transaction: t });
    if (!menu) { await t.rollback(); return res.status(404).json({ success: false, message: 'Brand menu not found' }); }
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      await t.rollback(); return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    const { unlinked } = await softUnlinkProductsFromBrandMenu(menu.id, t);
    await BrandMenuOptionGroupLink.destroy({ where: { brand_menu_id: menu.id }, transaction: t });
    await menu.destroy({ transaction: t });
    await t.commit();
    res.json({ success: true, data: { unlinkedProducts: unlinked } });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menus] delete error:', e);
    res.status(500).json({ success: false, message: 'Failed to delete brand menu' });
  }
});

// POST /api/brand-menus/:id/copy
router.post('/:id/copy', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const source = await BrandMenu.findByPk(parseInt(req.params.id, 10), { transaction: t });
    if (!source) { await t.rollback(); return res.status(404).json({ success: false, message: 'Source menu not found' }); }
    if (!(await assertBrandOwnership(req, source.brand_id))) {
      await t.rollback(); return res.status(403).json({ success: false, message: 'Source brand not owned' });
    }
    const targetBrandId = parseInt(req.body.target_brand_id, 10);
    if (!Number.isFinite(targetBrandId) || targetBrandId === source.brand_id) {
      await t.rollback(); return res.status(400).json({ success: false, message: 'Valid target_brand_id required (must differ from source)' });
    }
    if (!(await assertBrandOwnership(req, targetBrandId))) {
      await t.rollback(); return res.status(403).json({ success: false, message: 'Target brand not owned' });
    }

    const copy = await BrandMenu.create({
      brand_id: targetBrandId,
      category_id: null,  // categories don't carry across brands (different scope)
      product_recipe_id: null, // recipe stays with original brand
      name: req.body.name || `${source.name} (Copy)`,
      description: source.description, image_url: source.image_url, emoji: source.emoji,
      recommended_price: source.recommended_price, currency: source.currency,
      is_active: source.is_active, sort_order: 0,
      version: 1, distribution_mode: 'manual',  // safe default for copy
      lock_name: req.body.include_locks ? source.lock_name : false,
      lock_price: req.body.include_locks ? source.lock_price : false,
      lock_category: req.body.include_locks ? source.lock_category : false,
      lock_image: req.body.include_locks ? source.lock_image : false,
      lock_options: req.body.include_locks ? source.lock_options : false,
      is_set_menu: source.is_set_menu,
      set_items: source.set_items,
      lock_set_items: req.body.include_locks ? source.lock_set_items : false
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ success: true, data: copy });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menus] copy error:', e);
    res.status(500).json({ success: false, message: 'Failed to copy brand menu' });
  }
});

// POST /api/brand-menus/:id/duplicate — clone WITHIN the same brand (convenience).
// 2026-05-29: BG only has one brand → "copy to another brand" is unusable. This
// makes a same-brand copy so a new menu can be built off an existing one. Carries
// over category, recipe, option groups (incl. multi-select), set items and locks —
// everything is valid within the same brand. Creates a fresh draft (version 1).
router.post('/:id/duplicate', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const source = await BrandMenu.findByPk(parseInt(req.params.id, 10), { transaction: t });
    if (!source) { await t.rollback(); return res.status(404).json({ success: false, message: 'Source menu not found' }); }
    if (!(await assertBrandOwnership(req, source.brand_id))) {
      await t.rollback(); return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const copy = await BrandMenu.create({
      brand_id: source.brand_id,             // SAME brand
      category_id: source.category_id,       // valid within same brand
      product_recipe_id: source.product_recipe_id,
      name: req.body.name || `${source.name} (Copy)`,
      description: source.description, image_url: source.image_url, emoji: source.emoji,
      recommended_price: source.recommended_price, currency: source.currency,
      is_active: source.is_active, sort_order: 0,
      version: 1, distribution_mode: 'manual',
      lock_name: source.lock_name, lock_price: source.lock_price,
      lock_category: source.lock_category, lock_image: source.lock_image,
      lock_options: source.lock_options, lock_set_items: source.lock_set_items,
      is_set_menu: source.is_set_menu, set_items: source.set_items
    }, { transaction: t });
    // Carry over the option-group links (so the copy has the same options incl. multi-select)
    const links = await BrandMenuOptionGroupLink.findAll({ where: { brand_menu_id: source.id }, transaction: t });
    for (const l of links) {
      await BrandMenuOptionGroupLink.create({
        brand_menu_id: copy.id, option_group_id: l.option_group_id, sort_order: l.sort_order
      }, { transaction: t });
    }
    await t.commit();
    res.status(201).json({ success: true, data: copy });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menus] duplicate error:', e);
    res.status(500).json({ success: false, message: 'Failed to duplicate brand menu' });
  }
});

// POST /api/brand-menus/:id/push  body: { restaurant_ids: [1,2,3] | "all" }
router.post('/:id/push', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const menu = await BrandMenu.findByPk(parseInt(req.params.id, 10));
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    // push 대상은 적용범위(scope) 안으로 제한 — 범위 밖 매장엔 푸시 불가(범위에 먼저 추가). §14
    const scopeTargets = await resolveScopeTargetIds(menu);
    const scopeSet = new Set(scopeTargets);

    let restaurantIds;
    if (req.body.restaurant_ids === 'all') {
      restaurantIds = scopeTargets;  // "all" = 범위 내 전체
    } else if (Array.isArray(req.body.restaurant_ids)) {
      const outOfScope = req.body.restaurant_ids.filter(id => !scopeSet.has(Number(id)) && !scopeSet.has(id));
      if (outOfScope.length > 0) {
        return res.status(400).json({
          success: false, message: 'Some restaurants are outside this menu\'s scope. Add them to the scope first.',
          code: 'OUT_OF_SCOPE', out_of_scope: outOfScope
        });
      }
      restaurantIds = req.body.restaurant_ids.map(Number);
    } else {
      return res.status(400).json({ success: false, message: 'restaurant_ids array or "all" required' });
    }

    const result = await pushBrandMenuToRestaurants({ brandMenuId: menu.id, restaurantIds });
    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[brand-menus] push error:', e);
    res.status(500).json({ success: false, message: 'Failed to push brand menu' });
  }
});

// GET /api/brand-menus/:id/distribution
router.get('/:id/distribution', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const menu = await BrandMenu.findByPk(parseInt(req.params.id, 10));
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    const rests = await Restaurant.findAll({
      where: { brand_id: menu.brand_id },
      attributes: ['id', 'name', 'slug', 'branch_name']
    });
    const products = await Product.findAll({
      where: { brand_menu_id: menu.id },
      attributes: ['id', 'restaurant_id', 'brand_menu_synced_version', 'brand_menu_link_status', 'brand_menu_synced_at', 'brand_scope_active', 'is_active']
    });
    const productMap = new Map(products.map(p => [p.restaurant_id, p]));
    // 적용범위(scope) — 어떤 매장이 범위 안인지 §14
    const scopeTargets = new Set(await resolveScopeTargetIds(menu));

    const data = rests.map(r => {
      const p = productMap.get(r.id);
      const inScope = scopeTargets.has(r.id);
      return {
        restaurant_id: r.id, restaurant_name: r.name, branch_name: r.branch_name, slug: r.slug,
        local_product_id: p?.id || null,
        synced_version: p?.brand_menu_synced_version || null,
        link_status: p?.brand_menu_link_status || 'never_synced',
        synced_at: p?.brand_menu_synced_at || null,
        in_scope: inScope,
        scope_active: p ? p.brand_scope_active !== false : false,  // retracted 여부
        ra_active: p ? p.is_active !== false : null  // RA 활성화 여부 (노출 = scope_active AND ra_active)
      };
    });

    res.json({ success: true, data, scope_mode: menu.scope_mode });
  } catch (e) {
    console.error('[brand-menus] distribution error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch distribution' });
  }
});

// GET /api/brand-menus/:id/scope — 현재 적용범위 (mode + allowlist) §14
router.get('/:id/scope', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const menu = await BrandMenu.findByPk(parseInt(req.params.id, 10), { attributes: ['id', 'brand_id', 'scope_mode'] });
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const rows = await BrandMenuRestaurant.findAll({ where: { brand_menu_id: menu.id }, attributes: ['restaurant_id'] });
    res.json({ success: true, data: { scope_mode: menu.scope_mode, restaurant_ids: rows.map(r => r.restaurant_id) } });
  } catch (e) {
    console.error('[brand-menus] scope GET error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch scope' });
  }
});

// PUT /api/brand-menus/:id/scope  body: { scope_mode: 'all'|'selected', restaurant_ids: [..] }
// 적용범위 설정 + 선언적 reconcile(범위 추가=생성/복원, 제거=숨김+보존). §14
router.put('/:id/scope', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const menu = await BrandMenu.findByPk(parseInt(req.params.id, 10), { attributes: ['id', 'brand_id', 'distribution_mode'] });
    if (!menu) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    if (!(await assertBrandOwnership(req, menu.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const scopeMode = req.body.scope_mode === 'selected' ? 'selected' : 'all';
    const restaurantIds = Array.isArray(req.body.restaurant_ids) ? req.body.restaurant_ids : [];
    const refreshMode = menu.distribution_mode === 'auto' ? 'sync' : 'membership';
    const result = await setBrandMenuScope({ brandMenuId: menu.id, scopeMode, restaurantIds, refreshMode });
    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[brand-menus] scope PUT error:', e);
    res.status(500).json({ success: false, message: 'Failed to set scope' });
  }
});

module.exports = router;
module.exports.DEFAULT_MENU_SETTINGS = DEFAULT_MENU_SETTINGS;
module.exports.mergeMenuSettings = mergeMenuSettings;
