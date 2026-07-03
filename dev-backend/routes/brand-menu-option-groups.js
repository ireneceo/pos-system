/**
 * Brand Menu Option Groups — BG 측 옵션 그룹 + 옵션 CRUD.
 * Mount: /api/brand-menu-option-groups
 *
 * PUT triggers version++ + propagation: any BrandMenu using this group bumps
 * its own version, and its linked Restaurant Products are marked pending_update.
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope } = require('../middleware/brandScope');
const {
  Brand, BrandMenuOptionGroup, BrandMenuOption, BrandMenuOptionGroupLink, BrandMenu
} = require('../models');
const { bumpMenusUsingOptionGroup } = require('../services/brandMenuSyncService');

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
    const groups = await BrandMenuOptionGroup.findAll({
      where: { brand_id: brandId },
      include: [{ model: BrandMenuOption, as: 'options', order: [['sort_order', 'ASC']] }],
      order: [['name', 'ASC']]
    });
    // Usage count
    const ids = groups.map(g => g.id);
    let counts = {};
    if (ids.length > 0) {
      const [rows] = await BrandMenuOptionGroup.sequelize.query(
        `SELECT option_group_id, COUNT(*) AS cnt FROM brand_menu_option_group_links WHERE option_group_id IN (:ids) GROUP BY option_group_id`,
        { replacements: { ids } }
      );
      counts = Object.fromEntries(rows.map(r => [r.option_group_id, Number(r.cnt)]));
    }
    res.json({ success: true, data: groups.map(g => ({ ...g.toJSON(), menu_count: counts[g.id] || 0 })) });
  } catch (e) {
    console.error('[brand-menu-option-groups] list error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch option groups' });
  }
});

// GET /:id — detail + usage
router.get('/:id', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const group = await BrandMenuOptionGroup.findByPk(parseInt(req.params.id, 10), {
      include: [{ model: BrandMenuOption, as: 'options' }]
    });
    if (!group) return res.status(404).json({ success: false, message: 'Option group not found' });
    if (!(await assertBrandOwnership(req, group.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const usedByMenus = await BrandMenu.findAll({
      include: [{
        model: BrandMenuOptionGroup, as: 'optionGroups',
        where: { id: group.id }, through: { attributes: [] }
      }],
      attributes: ['id', 'name']
    });
    res.json({ success: true, data: { ...group.toJSON(), used_by_menus: usedByMenus } });
  } catch (e) {
    console.error('[brand-menu-option-groups] detail error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch option group' });
  }
});

// POST / — create group + options atomically
router.post('/', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenuOptionGroup.sequelize.transaction();
  try {
    const { brand_id, name, description, min_select, max_select, is_required, is_active, options } = req.body;
    if (!Number.isFinite(parseInt(brand_id, 10)) || !name?.trim()) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'brand_id and name are required' });
    }
    if (!(await assertBrandOwnership(req, brand_id))) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const group = await BrandMenuOptionGroup.create({
      brand_id, name: name.trim(), description: description || null,
      min_select: min_select || 0, max_select: max_select || 1,
      is_required: !!is_required, is_active: is_active !== false, version: 1
    }, { transaction: t });

    if (Array.isArray(options)) {
      let sort = 0;
      for (const opt of options) {
        if (!opt.name?.trim()) continue;
        await BrandMenuOption.create({
          group_id: group.id, name: opt.name.trim(),
          extra_price: opt.extra_price || 0, sort_order: sort++,
          is_active: opt.is_active !== false
        }, { transaction: t });
      }
    }
    await t.commit();
    res.status(201).json({ success: true, data: group });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menu-option-groups] create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create option group' });
  }
});

// PUT /:id — update group + replace options atomically + version++ + propagate
router.put('/:id', authenticateToken, requireBGScope, async (req, res) => {
  const t = await BrandMenuOptionGroup.sequelize.transaction();
  try {
    const group = await BrandMenuOptionGroup.findByPk(parseInt(req.params.id, 10), { transaction: t });
    if (!group) { await t.rollback(); return res.status(404).json({ success: false, message: 'Option group not found' }); }
    if (!(await assertBrandOwnership(req, group.brand_id))) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const updatable = ['name', 'description', 'min_select', 'max_select', 'is_required', 'is_active'];
    const update = { version: group.version + 1 };
    for (const k of updatable) if (k in req.body) update[k] = req.body[k];
    await group.update(update, { transaction: t });

    if (Array.isArray(req.body.options)) {
      // Replace strategy — simpler and consistent with sync service
      await BrandMenuOption.destroy({ where: { group_id: group.id }, transaction: t });
      let sort = 0;
      for (const opt of req.body.options) {
        if (!opt.name?.trim()) continue;
        await BrandMenuOption.create({
          group_id: group.id, name: opt.name.trim(),
          extra_price: opt.extra_price || 0, sort_order: sort++,
          is_active: opt.is_active !== false
        }, { transaction: t });
      }
    }

    // Propagate — bump consuming menus + mark linked products pending_update
    const propagation = await bumpMenusUsingOptionGroup(group.id, t);

    await t.commit();
    res.json({ success: true, data: { group, propagation } });
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('[brand-menu-option-groups] update error:', e);
    res.status(500).json({ success: false, message: 'Failed to update option group' });
  }
});

// DELETE /:id — block if used by any menu
router.delete('/:id', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const group = await BrandMenuOptionGroup.findByPk(parseInt(req.params.id, 10));
    if (!group) return res.status(404).json({ success: false, message: 'Option group not found' });
    if (!(await assertBrandOwnership(req, group.brand_id))) {
      return res.status(403).json({ success: false, message: 'Brand not owned' });
    }
    const inUse = await BrandMenuOptionGroupLink.count({ where: { option_group_id: group.id } });
    if (inUse > 0) {
      return res.status(400).json({ success: false, message: `Option group is used by ${inUse} menus. Remove from menus first.`, code: 'IN_USE' });
    }
    // Remove child options first — the FK (brand_menu_options.group_id) blocks the
    // group delete otherwise (was causing a 500 on every unused-group delete).
    await BrandMenuOption.destroy({ where: { group_id: group.id } });
    await group.destroy();
    res.json({ success: true });
  } catch (e) {
    console.error('[brand-menu-option-groups] delete error:', e);
    res.status(500).json({ success: false, message: 'Failed to delete option group' });
  }
});

module.exports = router;
