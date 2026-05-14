/**
 * Brand Menu Categories — BG 측 메뉴 카테고리 CRUD + reorder
 * Mount: /api/brand-menu-categories
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope } = require('../middleware/brandScope');
const { Brand, BrandMenu, BrandMenuCategory } = require('../models');

async function assertBrandOwnership(req, brandId) {
  if (req.bgOwnerIsAdmin) return true;
  const brand = await Brand.findByPk(brandId, { attributes: ['id', 'owner_id'] });
  return brand?.owner_id === req.bgOwnerId;
}

// GET /?brand_id=X
router.get('/', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const brandId = parseInt(req.query.brand_id, 10);
    if (!Number.isFinite(brandId)) {
      return res.status(400).json({ success: false, message: 'brand_id is required' });
    }
    if (!(await assertBrandOwnership(req, brandId))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const cats = await BrandMenuCategory.findAll({
      where: { brand_id: brandId },
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    // Usage count per category
    const ids = cats.map(c => c.id);
    let counts = {};
    if (ids.length > 0) {
      const [rows] = await BrandMenuCategory.sequelize.query(
        `SELECT category_id, COUNT(*) AS cnt FROM brand_menus WHERE category_id IN (:ids) GROUP BY category_id`,
        { replacements: { ids } }
      );
      counts = Object.fromEntries(rows.map(r => [r.category_id, Number(r.cnt)]));
    }
    res.json({ success: true, data: cats.map(c => ({ ...c.toJSON(), menu_count: counts[c.id] || 0 })) });
  } catch (e) {
    console.error('[brand-menu-categories] list error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// POST /
router.post('/', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { brand_id, name, emoji, image_url, color, sort_order, is_active } = req.body;
    if (!Number.isFinite(parseInt(brand_id, 10)) || !name?.trim()) {
      return res.status(400).json({ success: false, message: 'brand_id and name are required' });
    }
    if (!(await assertBrandOwnership(req, brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const cat = await BrandMenuCategory.create({
      brand_id, name: name.trim(), emoji: emoji || null,
      image_url: image_url || null, color: color || null,
      sort_order: sort_order || 0, is_active: is_active !== false
    });
    res.status(201).json({ success: true, data: cat });
  } catch (e) {
    console.error('[brand-menu-categories] create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

// PUT /:id
router.put('/:id', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const cat = await BrandMenuCategory.findByPk(parseInt(req.params.id, 10));
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
    if (!(await assertBrandOwnership(req, cat.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const updatable = ['name', 'emoji', 'image_url', 'color', 'sort_order', 'is_active'];
    const update = {};
    for (const k of updatable) if (k in req.body) update[k] = req.body[k];
    await cat.update(update);
    res.json({ success: true, data: cat });
  } catch (e) {
    console.error('[brand-menu-categories] update error:', e);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

// DELETE /:id — 사용 중 검사
router.delete('/:id', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const cat = await BrandMenuCategory.findByPk(parseInt(req.params.id, 10));
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
    if (!(await assertBrandOwnership(req, cat.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const inUse = await BrandMenu.count({ where: { category_id: cat.id } });
    if (inUse > 0) {
      return res.status(400).json({ success: false, message: `Category is used by ${inUse} menus. Reassign menus first.`, code: 'IN_USE' });
    }
    await cat.destroy();
    res.json({ success: true });
  } catch (e) {
    console.error('[brand-menu-categories] delete error:', e);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

// PUT /reorder  body: { brand_id, order: [id1, id2, ...] }
router.put('/reorder/bulk', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenuCategory.sequelize.transaction();
  try {
    const { brand_id, order } = req.body;
    if (!Number.isFinite(parseInt(brand_id, 10)) || !Array.isArray(order)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'brand_id and order array required' });
    }
    if (!(await assertBrandOwnership(req, brand_id))) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    for (let i = 0; i < order.length; i++) {
      await BrandMenuCategory.update({ sort_order: i }, { where: { id: order[i], brand_id }, transaction: t });
    }
    await t.commit();
    res.json({ success: true });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menu-categories] reorder error:', e);
    res.status(500).json({ success: false, message: 'Failed to reorder' });
  }
});

module.exports = router;
