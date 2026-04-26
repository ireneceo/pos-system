/**
 * Foodcourt Products — 1:1 mirror of brand-products.js but Foodcourt-scoped.
 *
 * Sprint 1 (Supply Chain System). Scope rules:
 *   - Foodcourt General / Foodcourt Manager: scoped by req.user.foodcourt_id
 *   - System Admin: optional ?foodcourt_id=N override; otherwise no filter
 *
 * Module gate: fc_products (resolved via resolveEntityModules) on every endpoint.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const {
  FoodcourtProduct,
  FoodcourtProductCategory,
  FoodcourtProductOptionGroup,
  FoodcourtProductOption,
  FoodcourtProductOptionGroupProduct
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');
const { resolveEntityModules } = require('../middleware/requireModule');

// ============================================
// Inline scope + module gate
// ============================================

/**
 * Resolve foodcourt_id for the request:
 *   - SA: ?foodcourt_id=N (optional). If absent, foodcourtId = null (no scope filter).
 *   - FC General/Manager: must have req.user.foodcourt_id.
 * Sets req.foodcourtId (number|null) and req.fcIsAdmin (boolean) on success.
 */
async function requireFoodcourtScope(req, res, next) {
  try {
    const role = req.user?.role;
    const isAdmin = role === 'System Admin';
    let foodcourtId = null;

    if (isAdmin) {
      const override = req.query.foodcourt_id;
      foodcourtId = override ? parseInt(override) : null;
    } else if (role === 'Foodcourt General' || role === 'Foodcourt Manager') {
      if (!req.user.foodcourt_id) {
        return res.status(400).json({ success: false, message: 'User has no foodcourt_id' });
      }
      foodcourtId = parseInt(req.user.foodcourt_id);
    } else {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }

    req.foodcourtId = foodcourtId;
    req.fcIsAdmin = isAdmin;
    next();
  } catch (err) {
    console.error('requireFoodcourtScope:', err);
    res.status(500).json({ success: false, message: 'Failed to resolve scope' });
  }
}

/**
 * Module gate: requires `fc_products` for the resolved foodcourt.
 * SA bypass.
 */
async function requireProductsModule(req, res, next) {
  try {
    if (req.fcIsAdmin) return next();
    if (!req.foodcourtId) {
      return res.status(400).json({ success: false, message: 'foodcourt_id required' });
    }
    const { planType, modules } = await resolveEntityModules('foodcourt', req.foodcourtId);
    if (!modules.includes('fc_products')) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_NOT_INCLUDED',
        message: `This feature (fc_products) is not included in the current subscription plan${planType ? ` (${planType})` : ''}.`,
        required_module: 'fc_products'
      });
    }
    next();
  } catch (err) {
    console.error('requireProductsModule:', err);
    res.status(500).json({ success: false, message: 'Failed to verify module access' });
  }
}

/**
 * Build a where clause that filters by foodcourt_id when one is set.
 */
function applyFCFilter(where, req) {
  if (req.foodcourtId) where.foodcourt_id = req.foodcourtId;
  return where;
}

/**
 * Verify a row belongs to the request's foodcourt scope (IDOR check).
 * Returns false (and writes 404 response) if not.
 */
function assertFCOwnsRow(row, req, res) {
  if (!row) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  if (req.fcIsAdmin && !req.foodcourtId) return true; // SA without override
  if (req.foodcourtId && row.foodcourt_id !== req.foodcourtId) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  return true;
}

/**
 * Resolve target foodcourt_id when creating new rows.
 *   - FC scope: req.foodcourtId
 *   - SA: must pass ?foodcourt_id=N or body.foodcourt_id
 */
function resolveTargetFoodcourtId(req, res) {
  if (req.foodcourtId) return req.foodcourtId;
  if (req.fcIsAdmin) {
    const fromBody = req.body?.foodcourt_id ? parseInt(req.body.foodcourt_id) : null;
    if (fromBody) return fromBody;
    res.status(400).json({ success: false, message: 'foodcourt_id required for System Admin create' });
    return null;
  }
  res.status(400).json({ success: false, message: 'foodcourt scope unresolved' });
  return null;
}

// All routes below: auth + scope + module gate
router.use(authenticateToken, requireFoodcourtScope, requireProductsModule);

/**
 * Generate unique product SKU
 */
async function generateProductSKU() {
  const prefix = 'FCP';
  const count = await FoodcourtProduct.count();
  const nextNum = count + 1;
  return `${prefix}-${String(nextNum).padStart(3, '0')}`;
}

// ============================================
// Categories
// ============================================

/**
 * GET /api/foodcourt-product-categories
 */
router.get('/foodcourt-product-categories', async (req, res) => {
  try {
    const where = {};
    applyFCFilter(where, req);

    const categories = await FoodcourtProductCategory.findAll({
      where,
      include: [
        { model: FoodcourtProduct, as: 'products', attributes: ['id'] }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    const data = categories.map(c => ({
      ...c.toJSON(),
      product_count: c.products ? c.products.length : 0
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /api/foodcourt-product-categories:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch product categories' });
  }
});

/**
 * POST /api/foodcourt-product-categories
 */
router.post('/foodcourt-product-categories', async (req, res) => {
  try {
    const fcId = resolveTargetFoodcourtId(req, res);
    if (!fcId) return;

    const { name, description, emoji, sort_order, is_active } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const cleanName = sanitizeString(name).trim();

    const existing = await FoodcourtProductCategory.findOne({
      where: { name: cleanName, foodcourt_id: fcId }
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A category with this name already exists' });
    }

    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await FoodcourtProductCategory.max('sort_order', { where: { foodcourt_id: fcId } });
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const category = await FoodcourtProductCategory.create({
      foodcourt_id: fcId,
      name: cleanName,
      description: description ? sanitizeString(description) : null,
      emoji: emoji || null,
      sort_order: finalSortOrder,
      is_active: is_active !== false
    });

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    console.error('POST /api/foodcourt-product-categories:', err);
    res.status(500).json({ success: false, message: 'Failed to create product category' });
  }
});

/**
 * PUT /api/foodcourt-product-categories/:categoryId
 */
router.put('/foodcourt-product-categories/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, emoji, sort_order, is_active } = req.body;

    const category = await FoodcourtProductCategory.findByPk(categoryId);
    if (!assertFCOwnsRow(category, req, res)) return;

    if (name && sanitizeString(name).trim() !== category.name) {
      const cleanName = sanitizeString(name).trim();
      const existing = await FoodcourtProductCategory.findOne({
        where: { name: cleanName, foodcourt_id: category.foodcourt_id }
      });
      if (existing && existing.id !== parseInt(categoryId)) {
        return res.status(400).json({ success: false, message: 'A category with this name already exists' });
      }
    }

    await category.update({
      name: name ? sanitizeString(name).trim() : category.name,
      description: description !== undefined ? (description ? sanitizeString(description) : null) : category.description,
      emoji: emoji !== undefined ? emoji : category.emoji,
      sort_order: sort_order !== undefined ? sort_order : category.sort_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (err) {
    console.error('PUT /api/foodcourt-product-categories/:categoryId:', err);
    res.status(500).json({ success: false, message: 'Failed to update product category' });
  }
});

/**
 * DELETE /api/foodcourt-product-categories/:categoryId
 */
router.delete('/foodcourt-product-categories/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await FoodcourtProductCategory.findByPk(categoryId, {
      include: [{ model: FoodcourtProduct, as: 'products' }]
    });

    if (!assertFCOwnsRow(category, req, res)) return;

    if (category.products && category.products.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This category has products. Please delete or move products first.'
      });
    }

    await category.destroy();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/foodcourt-product-categories/:categoryId:', err);
    res.status(500).json({ success: false, message: 'Failed to delete product category' });
  }
});

/**
 * PUT /api/foodcourt-product-categories/:categoryId/reorder
 */
router.put('/foodcourt-product-categories/:categoryId/reorder', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { direction } = req.body;

    if (!direction || !['up', 'down'].includes(direction)) {
      return res.status(400).json({ success: false, message: 'direction must be up or down' });
    }

    const category = await FoodcourtProductCategory.findByPk(categoryId);
    if (!assertFCOwnsRow(category, req, res)) return;

    const reorderWhere = { foodcourt_id: category.foodcourt_id };
    const allCategories = await FoodcourtProductCategory.findAll({
      where: reorderWhere,
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    const currentIndex = allCategories.findIndex(c => c.id === parseInt(categoryId));
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= allCategories.length) {
      return res.status(400).json({ success: false, message: 'Cannot move further' });
    }

    const targetCategory = allCategories[targetIndex];
    const tempOrder = category.sort_order;
    await category.update({ sort_order: targetCategory.sort_order });
    await targetCategory.update({ sort_order: tempOrder });

    res.json({ success: true, message: 'Order changed successfully' });
  } catch (err) {
    console.error('PUT /api/foodcourt-product-categories/:categoryId/reorder:', err);
    res.status(500).json({ success: false, message: 'Failed to reorder category' });
  }
});

// ============================================
// Option Groups
// ============================================

/**
 * GET /api/foodcourt-product-option-groups
 */
router.get('/foodcourt-product-option-groups', async (req, res) => {
  try {
    const where = {};
    applyFCFilter(where, req);

    const groups = await FoodcourtProductOptionGroup.findAll({
      where,
      include: [
        {
          model: FoodcourtProductOption,
          as: 'options'
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: groups });
  } catch (err) {
    console.error('GET /api/foodcourt-product-option-groups:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch option groups' });
  }
});

/**
 * POST /api/foodcourt-product-option-groups
 */
router.post('/foodcourt-product-option-groups', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const fcId = resolveTargetFoodcourtId(req, res);
    if (!fcId) { await t.rollback(); return; }

    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Option group name is required' });
    }

    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await FoodcourtProductOptionGroup.max('sort_order', { where: { foodcourt_id: fcId } });
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const group = await FoodcourtProductOptionGroup.create({
      foodcourt_id: fcId,
      name: sanitizeString(name).trim(),
      is_required: is_required || false,
      min_selections: min_selections || 0,
      max_selections: max_selections || 1,
      sort_order: finalSortOrder
    }, { transaction: t });

    if (Array.isArray(options) && options.length > 0) {
      for (let j = 0; j < options.length; j++) {
        const opt = options[j];
        if (!opt || !opt.name) continue;
        const priceAdj = opt.price_adjustment !== undefined ? Number(opt.price_adjustment) : 0;
        if (priceAdj < 0) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'price_adjustment must be >= 0' });
        }
        await FoodcourtProductOption.create({
          option_group_id: group.id,
          name: sanitizeString(opt.name).trim(),
          price_adjustment: priceAdj,
          sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
          is_active: opt.is_active !== false
        }, { transaction: t });
      }
    }

    await t.commit();

    const created = await FoodcourtProductOptionGroup.findByPk(group.id, {
      include: [{ model: FoodcourtProductOption, as: 'options' }]
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/foodcourt-product-option-groups:', err);
    res.status(500).json({ success: false, message: 'Failed to create option group' });
  }
});

/**
 * PUT /api/foodcourt-product-option-groups/:groupId
 */
router.put('/foodcourt-product-option-groups/:groupId', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { groupId } = req.params;
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    const group = await FoodcourtProductOptionGroup.findByPk(groupId);
    if (!assertFCOwnsRow(group, req, res)) { await t.rollback(); return; }

    await group.update({
      name: name !== undefined ? sanitizeString(name).trim() : group.name,
      is_required: is_required !== undefined ? is_required : group.is_required,
      min_selections: min_selections !== undefined ? min_selections : group.min_selections,
      max_selections: max_selections !== undefined ? max_selections : group.max_selections,
      sort_order: sort_order !== undefined ? sort_order : group.sort_order
    }, { transaction: t });

    if (options !== undefined) {
      // Replace all options
      await FoodcourtProductOption.destroy({ where: { option_group_id: groupId }, transaction: t });
      if (Array.isArray(options) && options.length > 0) {
        for (let j = 0; j < options.length; j++) {
          const opt = options[j];
          if (!opt || !opt.name) continue;
          const priceAdj = opt.price_adjustment !== undefined ? Number(opt.price_adjustment) : 0;
          if (priceAdj < 0) {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'price_adjustment must be >= 0' });
          }
          await FoodcourtProductOption.create({
            option_group_id: groupId,
            name: sanitizeString(opt.name).trim(),
            price_adjustment: priceAdj,
            sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
            is_active: opt.is_active !== false
          }, { transaction: t });
        }
      }
    }

    await t.commit();

    const updated = await FoodcourtProductOptionGroup.findByPk(groupId, {
      include: [{ model: FoodcourtProductOption, as: 'options' }]
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('PUT /api/foodcourt-product-option-groups/:groupId:', err);
    res.status(500).json({ success: false, message: 'Failed to update option group' });
  }
});

/**
 * DELETE /api/foodcourt-product-option-groups/:groupId
 */
router.delete('/foodcourt-product-option-groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await FoodcourtProductOptionGroup.findByPk(groupId);
    if (!assertFCOwnsRow(group, req, res)) return;

    const linkedProducts = await FoodcourtProductOptionGroupProduct.count({
      where: { option_group_id: groupId }
    });

    if (linkedProducts > 0) {
      return res.status(400).json({
        success: false,
        message: `This option group is linked to ${linkedProducts} product(s). Please unlink first.`
      });
    }

    await FoodcourtProductOption.destroy({ where: { option_group_id: groupId } });
    await group.destroy();

    res.json({ success: true, message: 'Option group deleted' });
  } catch (err) {
    console.error('DELETE /api/foodcourt-product-option-groups/:groupId:', err);
    res.status(500).json({ success: false, message: 'Failed to delete option group' });
  }
});

// ============================================
// Products
// ============================================

/**
 * GET /api/foodcourt-products
 */
router.get('/foodcourt-products', async (req, res) => {
  try {
    const { category_id, is_active } = req.query;

    const where = {};
    applyFCFilter(where, req);
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const products = await FoodcourtProduct.findAll({
      where,
      include: [
        { model: FoodcourtProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] },
        {
          model: FoodcourtProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: FoodcourtProductOption, as: 'options' }]
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: products });
  } catch (err) {
    console.error('GET /api/foodcourt-products:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

/**
 * GET /api/foodcourt-products/:productId
 */
router.get('/foodcourt-products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await FoodcourtProduct.findByPk(productId, {
      include: [
        { model: FoodcourtProductCategory, as: 'category' },
        {
          model: FoodcourtProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: FoodcourtProductOption, as: 'options' }]
        }
      ]
    });

    if (!assertFCOwnsRow(product, req, res)) return;

    res.json({ success: true, data: product });
  } catch (err) {
    console.error('GET /api/foodcourt-products/:productId:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

/**
 * POST /api/foodcourt-products
 */
router.post('/foodcourt-products', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const fcId = resolveTargetFoodcourtId(req, res);
    if (!fcId) { await t.rollback(); return; }

    const {
      name, description, sku, unit, base_quantity, unit_price,
      min_order_quantity, image_url, image_thumbnail, category_id, emoji,
      is_active, sort_order, current_stock, low_stock_threshold,
      lead_time_days, sync_to_ingredients, option_group_ids
    } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Product name is required' });
    }

    // Numeric guards
    const numericGuards = { unit_price, base_quantity, min_order_quantity, current_stock, low_stock_threshold, lead_time_days };
    for (const [k, v] of Object.entries(numericGuards)) {
      if (v !== undefined && v !== null && Number(v) < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `${k} must be >= 0` });
      }
    }

    // Validate category belongs to same foodcourt
    if (category_id) {
      const cat = await FoodcourtProductCategory.findByPk(category_id);
      if (!cat || cat.foodcourt_id !== fcId) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Invalid category_id' });
      }
    }

    const finalSku = sku ? sanitizeString(sku).trim() : await generateProductSKU();

    const product = await FoodcourtProduct.create({
      foodcourt_id: fcId,
      category_id: category_id || null,
      name: sanitizeString(name).trim(),
      description: description ? sanitizeString(description) : null,
      sku: finalSku,
      unit: unit ? sanitizeString(unit) : null,
      base_quantity: base_quantity !== undefined ? base_quantity : 1,
      unit_price: unit_price !== undefined ? unit_price : 0,
      min_order_quantity: min_order_quantity !== undefined ? min_order_quantity : 1,
      image_url: image_url || null,
      image_thumbnail: image_thumbnail || null,
      emoji: emoji || null,
      is_active: is_active !== false,
      sort_order: sort_order || 0,
      current_stock: current_stock !== undefined ? current_stock : 0,
      low_stock_threshold: low_stock_threshold !== undefined ? low_stock_threshold : 0,
      lead_time_days: lead_time_days !== undefined ? lead_time_days : 0,
      sync_to_ingredients: sync_to_ingredients !== undefined ? !!sync_to_ingredients : true
    }, { transaction: t });

    if (Array.isArray(option_group_ids) && option_group_ids.length > 0) {
      // Verify each option group belongs to this foodcourt
      const groups = await FoodcourtProductOptionGroup.findAll({
        where: { id: { [Op.in]: option_group_ids } }
      });
      for (const g of groups) {
        if (g.foodcourt_id !== fcId) {
          await t.rollback();
          return res.status(400).json({ success: false, message: `Option group ${g.id} belongs to a different foodcourt` });
        }
      }
      for (const ogId of option_group_ids) {
        await FoodcourtProductOptionGroupProduct.create({
          product_id: product.id,
          option_group_id: ogId
        }, { transaction: t });
      }
    }

    await t.commit();

    const created = await FoodcourtProduct.findByPk(product.id, {
      include: [
        { model: FoodcourtProductCategory, as: 'category' },
        {
          model: FoodcourtProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: FoodcourtProductOption, as: 'options' }]
        }
      ]
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/foodcourt-products:', err);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

/**
 * PUT /api/foodcourt-products/:productId
 */
router.put('/foodcourt-products/:productId', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { productId } = req.params;
    const product = await FoodcourtProduct.findByPk(productId);
    if (!assertFCOwnsRow(product, req, res)) { await t.rollback(); return; }

    const {
      name, description, sku, unit, base_quantity, unit_price,
      min_order_quantity, image_url, image_thumbnail, category_id, emoji,
      is_active, sort_order, current_stock, low_stock_threshold,
      lead_time_days, sync_to_ingredients, option_group_ids
    } = req.body;

    const numericGuards = { unit_price, base_quantity, min_order_quantity, current_stock, low_stock_threshold, lead_time_days };
    for (const [k, v] of Object.entries(numericGuards)) {
      if (v !== undefined && v !== null && Number(v) < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `${k} must be >= 0` });
      }
    }

    if (category_id !== undefined && category_id !== null) {
      const cat = await FoodcourtProductCategory.findByPk(category_id);
      if (!cat || cat.foodcourt_id !== product.foodcourt_id) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Invalid category_id' });
      }
    }

    await product.update({
      name: name !== undefined ? sanitizeString(name).trim() : product.name,
      description: description !== undefined ? (description ? sanitizeString(description) : null) : product.description,
      sku: sku !== undefined ? (sku ? sanitizeString(sku).trim() : product.sku) : product.sku,
      unit: unit !== undefined ? (unit ? sanitizeString(unit) : null) : product.unit,
      base_quantity: base_quantity !== undefined ? base_quantity : product.base_quantity,
      unit_price: unit_price !== undefined ? unit_price : product.unit_price,
      min_order_quantity: min_order_quantity !== undefined ? min_order_quantity : product.min_order_quantity,
      image_url: image_url !== undefined ? image_url : product.image_url,
      image_thumbnail: image_thumbnail !== undefined ? image_thumbnail : product.image_thumbnail,
      emoji: emoji !== undefined ? emoji : product.emoji,
      category_id: category_id !== undefined ? category_id : product.category_id,
      is_active: is_active !== undefined ? is_active : product.is_active,
      sort_order: sort_order !== undefined ? sort_order : product.sort_order,
      current_stock: current_stock !== undefined ? current_stock : product.current_stock,
      low_stock_threshold: low_stock_threshold !== undefined ? low_stock_threshold : product.low_stock_threshold,
      lead_time_days: lead_time_days !== undefined ? lead_time_days : product.lead_time_days,
      sync_to_ingredients: sync_to_ingredients !== undefined ? !!sync_to_ingredients : product.sync_to_ingredients
    }, { transaction: t });

    if (option_group_ids !== undefined) {
      await FoodcourtProductOptionGroupProduct.destroy({ where: { product_id: productId }, transaction: t });
      if (Array.isArray(option_group_ids) && option_group_ids.length > 0) {
        const groups = await FoodcourtProductOptionGroup.findAll({
          where: { id: { [Op.in]: option_group_ids } }
        });
        for (const g of groups) {
          if (g.foodcourt_id !== product.foodcourt_id) {
            await t.rollback();
            return res.status(400).json({ success: false, message: `Option group ${g.id} belongs to a different foodcourt` });
          }
        }
        for (const ogId of option_group_ids) {
          await FoodcourtProductOptionGroupProduct.create({
            product_id: productId,
            option_group_id: ogId
          }, { transaction: t });
        }
      }
    }

    await t.commit();

    const updated = await FoodcourtProduct.findByPk(productId, {
      include: [
        { model: FoodcourtProductCategory, as: 'category' },
        {
          model: FoodcourtProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: FoodcourtProductOption, as: 'options' }]
        }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('PUT /api/foodcourt-products/:productId:', err);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

/**
 * DELETE /api/foodcourt-products/:productId
 */
router.delete('/foodcourt-products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await FoodcourtProduct.findByPk(productId);
    if (!assertFCOwnsRow(product, req, res)) return;

    await FoodcourtProductOptionGroupProduct.destroy({ where: { product_id: productId } });
    await product.destroy();

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/foodcourt-products/:productId:', err);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

/**
 * POST /api/foodcourt-products/:productId/copy
 */
router.post('/foodcourt-products/:productId/copy', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { productId } = req.params;

    const original = await FoodcourtProduct.findByPk(productId, {
      include: [
        {
          model: FoodcourtProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] }
        }
      ]
    });

    if (!assertFCOwnsRow(original, req, res)) { await t.rollback(); return; }

    const newSku = await generateProductSKU();

    const copy = await FoodcourtProduct.create({
      foodcourt_id: original.foodcourt_id,
      category_id: original.category_id,
      name: `${original.name} (Copy)`,
      description: original.description,
      sku: newSku,
      unit: original.unit,
      base_quantity: original.base_quantity,
      unit_price: original.unit_price,
      min_order_quantity: original.min_order_quantity,
      image_url: original.image_url,
      image_thumbnail: original.image_thumbnail,
      emoji: original.emoji,
      is_active: true,
      sort_order: original.sort_order,
      current_stock: 0,
      low_stock_threshold: original.low_stock_threshold,
      lead_time_days: original.lead_time_days,
      sync_to_ingredients: original.sync_to_ingredients
    }, { transaction: t });

    if (original.optionGroups && original.optionGroups.length > 0) {
      for (const og of original.optionGroups) {
        await FoodcourtProductOptionGroupProduct.create({
          product_id: copy.id,
          option_group_id: og.id
        }, { transaction: t });
      }
    }

    await t.commit();

    const created = await FoodcourtProduct.findByPk(copy.id, {
      include: [
        { model: FoodcourtProductCategory, as: 'category' },
        {
          model: FoodcourtProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: FoodcourtProductOption, as: 'options' }]
        }
      ]
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/foodcourt-products/:productId/copy:', err);
    res.status(500).json({ success: false, message: 'Failed to copy product' });
  }
});

/**
 * PUT /api/foodcourt-products/:productId/toggle-active
 */
router.put('/foodcourt-products/:productId/toggle-active', async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await FoodcourtProduct.findByPk(productId);
    if (!assertFCOwnsRow(product, req, res)) return;

    await product.update({ is_active: !product.is_active });

    res.json({
      success: true,
      data: { id: product.id, is_active: product.is_active },
      message: product.is_active ? 'Product activated' : 'Product deactivated'
    });
  } catch (err) {
    console.error('PUT /api/foodcourt-products/:productId/toggle-active:', err);
    res.status(500).json({ success: false, message: 'Failed to toggle product status' });
  }
});

module.exports = router;
