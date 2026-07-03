const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { WorkManual, WorkManualCategory, User, Restaurant, Brand, Foodcourt, RestaurantManager, Comment, Notice } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

// Helper: Get scope filter based on user role
async function getScopeFilter(user, requestedRestaurantId) {
  const role = user.role;

  if (role === 'System Admin') {
    return { filter: { brand_id: null, foodcourt_id: null, restaurant_id: null }, categoryScope: { owner_type: 'system', owner_id: null } };
  }

  if (role === 'Brand General' || role === 'Brand Manager') {
    const brands = await Brand.findAll({ where: { owner_id: role === 'Brand Manager' ? undefined : user.id }, attributes: ['id'] });
    // Brand Manager: find brands via RestaurantManager
    let brandId;
    if (role === 'Brand Manager') {
      const links = await RestaurantManager.findAll({ where: { manager_id: user.id }, attributes: ['restaurant_id'] });
      if (links.length > 0) {
        const rest = await Restaurant.findOne({ where: { id: links[0].restaurant_id }, attributes: ['brand_id'] });
        brandId = rest?.brand_id;
      }
    } else {
      const brand = await Brand.findOne({ where: { owner_id: user.id }, attributes: ['id'] });
      brandId = brand?.id;
    }
    if (!brandId) return null;
    return { filter: { brand_id: brandId }, categoryScope: { owner_type: 'brand', owner_id: brandId } };
  }

  if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
    let foodcourtId;
    if (role === 'Foodcourt Manager') {
      const links = await RestaurantManager.findAll({ where: { manager_id: user.id }, attributes: ['restaurant_id'] });
      if (links.length > 0) {
        const rest = await Restaurant.findOne({ where: { id: links[0].restaurant_id }, attributes: ['foodcourt_id'] });
        foodcourtId = rest?.foodcourt_id;
      }
    } else {
      const fc = await Foodcourt.findOne({ where: { owner_id: user.id }, attributes: ['id'] });
      foodcourtId = fc?.id;
    }
    if (!foodcourtId) return null;
    return { filter: { foodcourt_id: foodcourtId }, categoryScope: { owner_type: 'foodcourt', owner_id: foodcourtId } };
  }

  if (role === 'Restaurant Owner') {
    // Owner accesses per-restaurant — requestedRestaurantId required
    if (!requestedRestaurantId) {
      // Return all owned restaurant IDs for listing
      const links = await RestaurantManager.findAll({
        where: { manager_id: user.id, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const ids = links.map(l => l.restaurant_id);
      return { filter: { restaurant_id: { [Op.in]: ids } }, categoryScope: null, ownedRestaurantIds: ids };
    }
    // Verify ownership
    const link = await RestaurantManager.findOne({
      where: { manager_id: user.id, restaurant_id: requestedRestaurantId, relationship_type: 'ownership' }
    });
    if (!link) return null;
    return { filter: { restaurant_id: requestedRestaurantId }, categoryScope: { owner_type: 'restaurant', owner_id: requestedRestaurantId } };
  }

  if (role === 'Restaurant Admin' || role === 'Staff') {
    const restaurantId = user.restaurant_id;
    if (!restaurantId) return null;
    return { filter: { restaurant_id: restaurantId }, categoryScope: { owner_type: 'restaurant', owner_id: restaurantId } };
  }

  return null;
}

// ============================================================================
// Category endpoints
// ============================================================================

// GET /api/work-manuals/categories
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const scope = await getScopeFilter(req.user, req.query.restaurant_id ? parseInt(req.query.restaurant_id) : null);
    if (!scope) return res.json({ success: true, data: [] });

    let where;
    if (scope.ownedRestaurantIds) {
      // Owner without specific restaurant: get categories for all owned restaurants
      where = { owner_type: 'restaurant', owner_id: { [Op.in]: scope.ownedRestaurantIds } };
    } else {
      where = scope.categoryScope;
    }

    const categories = await WorkManualCategory.findAll({
      where,
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching work manual categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// POST /api/work-manuals/categories
router.post('/categories', authenticateToken, async (req, res) => {
  try {
    const { name, restaurant_id } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const scope = await getScopeFilter(req.user, restaurant_id ? parseInt(restaurant_id) : null);
    if (!scope || !scope.categoryScope) {
      return res.status(403).json({ success: false, message: 'Cannot create category in this scope' });
    }

    const category = await WorkManualCategory.create({
      name: name.trim(),
      owner_type: scope.categoryScope.owner_type,
      owner_id: scope.categoryScope.owner_id,
      sort_order: 0
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating work manual category:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

// PUT /api/work-manuals/categories/:id
router.put('/categories/:id', authenticateToken, async (req, res) => {
  try {
    const category = await WorkManualCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const scope = await getScopeFilter(req.user, category.owner_type === 'restaurant' ? category.owner_id : null);
    if (!scope || !scope.categoryScope ||
        scope.categoryScope.owner_type !== category.owner_type ||
        String(scope.categoryScope.owner_id) !== String(category.owner_id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { name, sort_order } = req.body;
    if (name !== undefined) category.name = name.trim();
    if (sort_order !== undefined) category.sort_order = sort_order;
    await category.save();

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Error updating work manual category:', error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

// DELETE /api/work-manuals/categories/:id
router.delete('/categories/:id', authenticateToken, async (req, res) => {
  try {
    const category = await WorkManualCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const scope = await getScopeFilter(req.user, category.owner_type === 'restaurant' ? category.owner_id : null);
    if (!scope || !scope.categoryScope ||
        scope.categoryScope.owner_type !== category.owner_type ||
        String(scope.categoryScope.owner_id) !== String(category.owner_id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Nullify category_id on manuals using this category
    await WorkManual.update({ category_id: null }, { where: { category_id: category.id } });
    await category.destroy();

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting work manual category:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

// ============================================================================
// Manual endpoints
// ============================================================================

// GET /api/work-manuals/restaurants - Owner only: list owned restaurants for selector
router.get('/restaurants', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'Restaurant Owner') {
      return res.status(403).json({ success: false, message: 'Owner only' });
    }
    const links = await RestaurantManager.findAll({
      where: { manager_id: req.user.id, relationship_type: 'ownership' },
      attributes: ['restaurant_id']
    });
    const ids = links.map(l => l.restaurant_id);
    const restaurants = await Restaurant.findAll({
      where: { id: { [Op.in]: ids } },
      attributes: ['id', 'name', 'branch_name'],
      order: [['name', 'ASC']]
    });
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching owner restaurants:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
  }
});

// GET /api/work-manuals
router.get('/', authenticateToken, async (req, res) => {
  try {
    const scope = await getScopeFilter(req.user, req.query.restaurant_id ? parseInt(req.query.restaurant_id) : null);
    if (!scope) return res.json({ success: true, data: [] });

    const where = { ...scope.filter, status: 'published' };

    const manuals = await WorkManual.findAll({
      where,
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: WorkManualCategory, as: 'category', attributes: ['id', 'name'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Attach comment counts
    const ids = manuals.map(m => m.id);
    let commentCounts = {};
    if (ids.length > 0) {
      const counts = await Comment.findAll({
        where: { entity_type: 'work_manual', entity_id: ids.map(String) },
        attributes: ['entity_id', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['entity_id']
      });
      counts.forEach(c => { commentCounts[c.entity_id] = parseInt(c.getDataValue('count')); });
    }

    const result = manuals.map(m => ({
      ...m.toJSON(),
      commentCount: commentCounts[String(m.id)] || 0
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching work manuals:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch work manuals' });
  }
});

// GET /api/work-manuals/:id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const manual = await WorkManual.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: WorkManualCategory, as: 'category', attributes: ['id', 'name'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    if (!manual) {
      return res.status(404).json({ success: false, message: 'Work manual not found' });
    }

    // Get comments
    const comments = await Comment.findAll({
      where: { entity_type: 'work_manual', entity_id: String(manual.id) },
      include: [{ model: User, as: 'author', attributes: ['id', 'full_name', 'role'] }],
      order: [['createdAt', 'ASC']]
    });

    res.json({ success: true, data: { ...manual.toJSON(), comments } });
  } catch (error) {
    console.error('Error fetching work manual:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch work manual' });
  }
});

// POST /api/work-manuals
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, category_id, attachments, restaurant_id } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const scope = await getScopeFilter(req.user, restaurant_id ? parseInt(restaurant_id) : null);
    if (!scope) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Build scope fields
    const scopeFields = {};
    if (scope.filter.brand_id) scopeFields.brand_id = scope.filter.brand_id;
    if (scope.filter.foodcourt_id) scopeFields.foodcourt_id = scope.filter.foodcourt_id;
    if (scope.filter.restaurant_id && !scope.filter.restaurant_id[Op.in]) {
      scopeFields.restaurant_id = scope.filter.restaurant_id;
    } else if (restaurant_id) {
      // Owner specifying restaurant
      scopeFields.restaurant_id = parseInt(restaurant_id);
    }

    const manual = await WorkManual.create({
      title: title.trim(),
      content: content.trim(),
      author_id: req.user.id,
      author_name: req.user.full_name || req.user.email || 'User',
      author_role: req.user.role,
      category_id: category_id || null,
      attachments: attachments || null,
      status: 'published',
      ...scopeFields
    });

    const full = await WorkManual.findByPk(manual.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: WorkManualCategory, as: 'category', attributes: ['id', 'name'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({ success: true, data: full });
  } catch (error) {
    console.error('Error creating work manual:', error);
    res.status(500).json({ success: false, message: 'Failed to create work manual' });
  }
});

// PUT /api/work-manuals/:id
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const manual = await WorkManual.findByPk(req.params.id);
    if (!manual) {
      return res.status(404).json({ success: false, message: 'Work manual not found' });
    }

    if (manual.author_id !== req.user.id && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this manual' });
    }

    const { title, content, category_id } = req.body;
    if (title !== undefined) manual.title = title.trim();
    if (content !== undefined) manual.content = content.trim();
    if (category_id !== undefined) manual.category_id = category_id;
    await manual.save();

    res.json({ success: true, data: manual });
  } catch (error) {
    console.error('Error updating work manual:', error);
    res.status(500).json({ success: false, message: 'Failed to update work manual' });
  }
});

// DELETE /api/work-manuals/:id
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const manual = await WorkManual.findByPk(req.params.id);
    if (!manual) {
      return res.status(404).json({ success: false, message: 'Work manual not found' });
    }

    if (manual.author_id !== req.user.id && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this manual' });
    }

    await Comment.destroy({ where: { entity_type: 'work_manual', entity_id: String(manual.id) } });
    await manual.destroy();

    res.json({ success: true, message: 'Work manual deleted' });
  } catch (error) {
    console.error('Error deleting work manual:', error);
    res.status(500).json({ success: false, message: 'Failed to delete work manual' });
  }
});

// POST /api/work-manuals/copy/:id - Copy an existing manual
router.post('/copy/:id', authenticateToken, async (req, res) => {
  try {
    const source = await WorkManual.findByPk(req.params.id);
    if (!source) {
      return res.status(404).json({ success: false, message: 'Source manual not found' });
    }

    const { restaurant_id } = req.body;
    const scope = await getScopeFilter(req.user, restaurant_id ? parseInt(restaurant_id) : null);
    if (!scope) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const scopeFields = {};
    if (scope.filter.brand_id) scopeFields.brand_id = scope.filter.brand_id;
    if (scope.filter.foodcourt_id) scopeFields.foodcourt_id = scope.filter.foodcourt_id;
    if (scope.filter.restaurant_id && !scope.filter.restaurant_id[Op.in]) {
      scopeFields.restaurant_id = scope.filter.restaurant_id;
    } else if (restaurant_id) {
      scopeFields.restaurant_id = parseInt(restaurant_id);
    }

    const manual = await WorkManual.create({
      title: `(Copy) ${source.title}`,
      content: source.content,
      author_id: req.user.id,
      author_name: req.user.full_name,
      author_role: req.user.role,
      category_id: null,
      attachments: source.getDataValue('attachments'),
      status: 'published',
      ...scopeFields
    });

    const full = await WorkManual.findByPk(manual.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: WorkManualCategory, as: 'category', attributes: ['id', 'name'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({ success: true, data: full });
  } catch (error) {
    console.error('Error copying work manual:', error);
    res.status(500).json({ success: false, message: 'Failed to copy work manual' });
  }
});

// POST /api/work-manuals/from-notice/:noticeId - Copy from notice guide
router.post('/from-notice/:noticeId', authenticateToken, async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.noticeId);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const { restaurant_id } = req.body;
    const scope = await getScopeFilter(req.user, restaurant_id ? parseInt(restaurant_id) : null);
    if (!scope) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const scopeFields = {};
    if (scope.filter.brand_id) scopeFields.brand_id = scope.filter.brand_id;
    if (scope.filter.foodcourt_id) scopeFields.foodcourt_id = scope.filter.foodcourt_id;
    if (scope.filter.restaurant_id && !scope.filter.restaurant_id[Op.in]) {
      scopeFields.restaurant_id = scope.filter.restaurant_id;
    } else if (restaurant_id) {
      scopeFields.restaurant_id = parseInt(restaurant_id);
    } else if (scope.ownedRestaurantIds && scope.ownedRestaurantIds.length > 0) {
      // Owner가 매장을 지정하지 않으면 매뉴얼이 restaurant_id=null 로 만들어져 목록(restaurant_id IN owned)에서 빠진다.
      // 첫 소유 매장으로 귀속해 바로 보이게 한다(추후 재배정 가능).
      scopeFields.restaurant_id = scope.ownedRestaurantIds[0];
    }

    const manual = await WorkManual.create({
      title: notice.title,
      content: notice.content,
      author_id: req.user.id,
      // full_name 이 비어도(데모/이름 미설정 계정) NOT NULL 위반 500 안 나도록 폴백. 클릭 무반응의 근본원인이었음.
      author_name: req.user.full_name || req.user.username || req.user.email || req.user.role,
      author_role: req.user.role,
      category_id: null,
      attachments: notice.getDataValue('attachments'),
      source_notice_id: notice.id,
      status: 'published',
      ...scopeFields
    });

    const full = await WorkManual.findByPk(manual.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'full_name', 'role'] },
        { model: WorkManualCategory, as: 'category', attributes: ['id', 'name'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({ success: true, data: full });
  } catch (error) {
    console.error('Error copying notice to work manual:', error);
    res.status(500).json({ success: false, message: 'Failed to copy notice to work manual' });
  }
});

module.exports = router;
