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
const { normalizeImageField } = require('../utils/imageProcessor');
const {
  Brand, Restaurant, ProductRecipe, BrandMenu, BrandMenuCategory,
  BrandMenuOptionGroup, BrandMenuOption, BrandMenuOptionGroupLink, Product
} = require('../models');
const {
  syncBrandMenuToRestaurant, pushBrandMenuToRestaurants,
  markPendingForBrandMenu, softUnlinkProductsFromBrandMenu
} = require('../services/brandMenuSyncService');

// Ownership guard — BG가 이 brand 를 소유하는지 (System Admin 은 통과)
async function assertBrandOwnership(req, brandId) {
  if (req.bgOwnerIsAdmin) return true;
  const brand = await Brand.findByPk(brandId, { attributes: ['id', 'owner_id'] });
  if (!brand) return false;
  return brand.owner_id === req.bgOwnerId;
}

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
        { model: ProductRecipe, as: 'recipe', attributes: ['id', 'name', 'code'] }
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
      locks: { name: !!m.lock_name, price: !!m.lock_price, category: !!m.lock_category, image: !!m.lock_image, options: !!m.lock_options },
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

// POST /api/brand-menus
router.post('/', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenu.sequelize.transaction();
  try {
    const {
      brand_id, category_id, product_recipe_id, name, description, image_url, emoji,
      recommended_price, currency, is_active, sort_order, distribution_mode,
      option_group_ids, locks
    } = req.body;
    // Accept both nested locks{} and flat lock_* — nested wins if provided
    const lock_name = locks && 'name' in locks ? locks.name : req.body.lock_name;
    const lock_price = locks && 'price' in locks ? locks.price : req.body.lock_price;
    const lock_category = locks && 'category' in locks ? locks.category : req.body.lock_category;
    const lock_image = locks && 'image' in locks ? locks.image : req.body.lock_image;
    const lock_options = locks && 'options' in locks ? locks.options : req.body.lock_options;

    if (!Number.isFinite(parseInt(brand_id, 10)) || !name?.trim()) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'brand_id and name are required' });
    }
    if (!(await assertBrandOwnership(req, brand_id))) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }

    // base64 image → file
    const normalizedImage = await normalizeImageField(image_url, {
      subdir: 'brand-menus',
      filename: `brand_menu_${brand_id}_${Date.now()}`,
      maxWidth: 800, maxHeight: 800
    });

    const menu = await BrandMenu.create({
      brand_id, category_id: category_id || null,
      product_recipe_id: product_recipe_id || null,
      name: name.trim(), description: description || null,
      image_url: normalizedImage, emoji: emoji || null,
      recommended_price: recommended_price || 0, currency: currency || 'MYR',
      is_active: is_active !== false, sort_order: sort_order || 0,
      version: 1,
      distribution_mode: distribution_mode === 'auto' ? 'auto' : 'manual',
      lock_name: !!lock_name, lock_price: !!lock_price, lock_category: !!lock_category,
      lock_image: !!lock_image, lock_options: !!lock_options
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

    // Auto-push if configured (outside transaction — best-effort per restaurant)
    let pushResult = null;
    if (menu.distribution_mode === 'auto') {
      const rests = await Restaurant.findAll({ where: { brand_id }, attributes: ['id'] });
      const rids = rests.map(r => r.id);
      pushResult = await pushBrandMenuToRestaurants({ brandMenuId: menu.id, restaurantIds: rids });
    }

    res.status(201).json({ success: true, data: { menu, push: pushResult } });
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
      'recommended_price', 'currency', 'is_active', 'sort_order', 'distribution_mode',
      'lock_name', 'lock_price', 'lock_category', 'lock_image', 'lock_options'];
    const update = {};
    for (const k of updatable) if (k in body) update[k] = body[k];

    if (body.image_url !== undefined) {
      update.image_url = await normalizeImageField(body.image_url, {
        subdir: 'brand-menus',
        filename: `brand_menu_${menu.brand_id}_${menu.id}_${Date.now()}`,
        maxWidth: 800, maxHeight: 800
      });
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

    // Mark pending or auto-sync
    if (menu.distribution_mode === 'auto') {
      // Re-sync all linked products
      const linked = await Product.findAll({ where: { brand_menu_id: menu.id }, attributes: ['restaurant_id'], transaction: t });
      const rids = [...new Set(linked.map(p => p.restaurant_id))];
      // Execute outside transaction for per-restaurant resilience
      await t.commit();
      const result = await pushBrandMenuToRestaurants({ brandMenuId: menu.id, restaurantIds: rids });
      return res.json({ success: true, data: { menu, push: result } });
    } else {
      await markPendingForBrandMenu(menu.id, t);
      await t.commit();
      return res.json({ success: true, data: { menu } });
    }
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
      lock_options: req.body.include_locks ? source.lock_options : false
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ success: true, data: copy });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menus] copy error:', e);
    res.status(500).json({ success: false, message: 'Failed to copy brand menu' });
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

    let restaurantIds;
    if (req.body.restaurant_ids === 'all') {
      const rests = await Restaurant.findAll({ where: { brand_id: menu.brand_id }, attributes: ['id'] });
      restaurantIds = rests.map(r => r.id);
    } else if (Array.isArray(req.body.restaurant_ids)) {
      // Validate all belong to this brand
      const rests = await Restaurant.findAll({
        where: { id: req.body.restaurant_ids, brand_id: menu.brand_id }, attributes: ['id']
      });
      if (rests.length !== req.body.restaurant_ids.length) {
        return res.status(400).json({ success: false, message: 'Some restaurants do not belong to this brand' });
      }
      restaurantIds = rests.map(r => r.id);
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
      attributes: ['id', 'restaurant_id', 'brand_menu_synced_version', 'brand_menu_link_status', 'brand_menu_synced_at']
    });
    const productMap = new Map(products.map(p => [p.restaurant_id, p]));

    const data = rests.map(r => {
      const p = productMap.get(r.id);
      return {
        restaurant_id: r.id, restaurant_name: r.name, branch_name: r.branch_name, slug: r.slug,
        local_product_id: p?.id || null,
        synced_version: p?.brand_menu_synced_version || null,
        link_status: p?.brand_menu_link_status || 'never_synced',
        synced_at: p?.brand_menu_synced_at || null
      };
    });

    res.json({ success: true, data });
  } catch (e) {
    console.error('[brand-menus] distribution error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch distribution' });
  }
});

module.exports = router;
