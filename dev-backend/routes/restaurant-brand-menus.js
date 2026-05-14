/**
 * Restaurant-side Brand Menu sync.
 * Mount: /api/restaurant/:restaurantId/brand-menus
 *
 * Endpoints:
 *   GET    /updates                       pending updates + new menus + diff
 *   POST   /:bmid/sync                    sync a single brand menu now
 *   POST   /sync-all                      sync everything pending + add all new menus
 *   POST   /:bmid/skip-version            mark current BG version as skipped
 *   DELETE /:bmid/unlink                  unlink this product from its brand menu (RA becomes independent)
 *
 * All endpoints require authenticateToken + checkRestaurantAccess via :restaurantId.
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const {
  Restaurant, Brand, BrandMenu, BrandMenuCategory, Product
} = require('../models');
const {
  syncBrandMenuToRestaurant, computeMenuDiff
} = require('../services/brandMenuSyncService');

// GET /api/restaurant/:rid/brand-menus/updates
router.get('/updates', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    req.params.restaurantId = restaurantId;
    await new Promise((resolve, reject) => checkRestaurantAccess(req, res, (err) => err ? reject(err) : resolve())).catch(() => null);
    if (res.headersSent) return;

    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'] });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    if (!restaurant.brand_id) {
      return res.json({ success: true, data: { pending_count: 0, items: [] } });
    }

    // Fetch brand info + all active brand menus for this restaurant's brand
    const brand = await Brand.findByPk(restaurant.brand_id, { attributes: ['id', 'name', 'logo_url'] });
    const brandMenus = await BrandMenu.findAll({
      where: { brand_id: restaurant.brand_id, is_active: true },
      include: [{ model: BrandMenuCategory, as: 'category', attributes: ['id', 'name'] }]
    });
    const localProducts = await Product.findAll({
      where: { restaurant_id: restaurantId, brand_menu_id: { [Op.in]: brandMenus.map(m => m.id) } }
    });
    const localByMenu = new Map(localProducts.map(p => [p.brand_menu_id, p]));

    const items = [];
    for (const bm of brandMenus) {
      const local = localByMenu.get(bm.id);
      // (a) Linked already in_sync at current version → skip
      if (local && local.brand_menu_synced_version === bm.version && local.brand_menu_link_status === 'in_sync') continue;
      // (b) Unlinked → skip (RA decided independence)
      if (local && local.brand_menu_link_status === 'unlinked') continue;

      const localCategoryName = bm.category?.name || null;
      const diff = computeMenuDiff(local, bm, localCategoryName);
      items.push({
        brand_menu_id: bm.id,
        brand_menu_name: bm.name,
        brand_menu_image: bm.image_url,
        brand_menu_price: parseFloat(bm.recommended_price),
        brand_menu_category: localCategoryName,
        local_product_id: local?.id || null,
        current_version: local?.brand_menu_synced_version || null,
        new_version: bm.version,
        is_new_menu: !local,
        diff,
        locks: {
          name: !!bm.lock_name, price: !!bm.lock_price, category: !!bm.lock_category,
          image: !!bm.lock_image, options: !!bm.lock_options
        }
      });
    }

    res.json({
      success: true,
      data: {
        brand: brand ? { id: brand.id, name: brand.name, logo_url: brand.logo_url } : null,
        pending_count: items.length,
        items
      }
    });
  } catch (e) {
    console.error('[restaurant-brand-menus] updates error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch brand menu updates' });
  }
});

// POST /:bmid/sync — single sync
router.post('/:bmid/sync', authenticateToken, async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    req.params.restaurantId = restaurantId;
    await new Promise((resolve, reject) => checkRestaurantAccess(req, res, (err) => err ? reject(err) : resolve())).catch(() => null);
    if (res.headersSent) { await t.rollback(); return; }

    const bmid = parseInt(req.params.bmid, 10);
    const { product, created } = await syncBrandMenuToRestaurant({ brandMenuId: bmid, restaurantId, transaction: t });
    await t.commit();
    res.json({ success: true, data: { product, created } });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    if (e.code === 'BRAND_MISMATCH') {
      return res.status(403).json({ success: false, message: e.message, code: e.code });
    }
    console.error('[restaurant-brand-menus] sync error:', e);
    res.status(500).json({ success: false, message: 'Failed to sync brand menu' });
  }
});

// POST /sync-all — bulk
router.post('/sync-all', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    req.params.restaurantId = restaurantId;
    await new Promise((resolve, reject) => checkRestaurantAccess(req, res, (err) => err ? reject(err) : resolve())).catch(() => null);
    if (res.headersSent) return;

    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'] });
    if (!restaurant?.brand_id) return res.json({ success: true, data: { synced: 0, failed: [] } });

    const brandMenus = await BrandMenu.findAll({ where: { brand_id: restaurant.brand_id, is_active: true } });
    const result = { synced: 0, created: 0, updated: 0, failed: [] };
    for (const bm of brandMenus) {
      const local = await Product.findOne({ where: { restaurant_id: restaurantId, brand_menu_id: bm.id } });
      if (local && local.brand_menu_synced_version === bm.version && local.brand_menu_link_status === 'in_sync') continue;
      if (local && local.brand_menu_link_status === 'unlinked') continue;
      const t = await Product.sequelize.transaction();
      try {
        const { created } = await syncBrandMenuToRestaurant({ brandMenuId: bm.id, restaurantId, transaction: t });
        await t.commit();
        result.synced++;
        created ? result.created++ : result.updated++;
      } catch (e) {
        await t.rollback();
        result.failed.push({ brand_menu_id: bm.id, error: e.message, code: e.code });
      }
    }
    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[restaurant-brand-menus] sync-all error:', e);
    res.status(500).json({ success: false, message: 'Failed to sync all brand menus' });
  }
});

// POST /:bmid/skip-version — mark BG version as skipped without applying
router.post('/:bmid/skip-version', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    req.params.restaurantId = restaurantId;
    await new Promise((resolve, reject) => checkRestaurantAccess(req, res, (err) => err ? reject(err) : resolve())).catch(() => null);
    if (res.headersSent) return;

    const bmid = parseInt(req.params.bmid, 10);
    const bm = await BrandMenu.findByPk(bmid, { attributes: ['version', 'brand_id'] });
    if (!bm) return res.status(404).json({ success: false, message: 'Brand menu not found' });
    const product = await Product.findOne({ where: { restaurant_id: restaurantId, brand_menu_id: bmid } });
    if (!product) {
      // For new menus — skip means "don't add this version" → no row to create; nothing persisted.
      // Idempotent: future versions will surface again.
      return res.json({ success: true, data: { skipped: true, note: 'new_menu_skipped' } });
    }
    await product.update({ brand_menu_synced_version: bm.version, brand_menu_link_status: 'in_sync' });
    res.json({ success: true, data: { skipped: true } });
  } catch (e) {
    console.error('[restaurant-brand-menus] skip error:', e);
    res.status(500).json({ success: false, message: 'Failed to skip version' });
  }
});

// DELETE /:bmid/unlink — RA independence from this brand menu
router.delete('/:bmid/unlink', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    req.params.restaurantId = restaurantId;
    await new Promise((resolve, reject) => checkRestaurantAccess(req, res, (err) => err ? reject(err) : resolve())).catch(() => null);
    if (res.headersSent) return;

    const bmid = parseInt(req.params.bmid, 10);
    const product = await Product.findOne({ where: { restaurant_id: restaurantId, brand_menu_id: bmid } });
    if (!product) return res.status(404).json({ success: false, message: 'Linked product not found' });

    await product.update({
      brand_menu_id: null,
      brand_menu_locks_snapshot: null,
      brand_menu_link_status: 'unlinked'
    });
    res.json({ success: true, data: { unlinked_product_id: product.id } });
  } catch (e) {
    console.error('[restaurant-brand-menus] unlink error:', e);
    res.status(500).json({ success: false, message: 'Failed to unlink' });
  }
});

module.exports = router;
