/**
 * Supplier Products routes — Sprint 1 (Supply Chain Design 1)
 *
 * Mirrors brand-products.js patterns but scoped to SupplierCompany via
 * requireSupplierScope. All endpoints are gated by requireSupplierModule
 * ('supplier_products'); product CREATE endpoints additionally enforce
 * requirePlanLimit('product_limit').
 *
 * 16 endpoints:
 *   Categories     (5): list, create, update, delete, reorder
 *   Option groups  (4): list, create, update, delete
 *   Products       (7): list, detail, create, update, delete, copy, toggle-active
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const {
  SupplierProduct,
  SupplierProductCategory,
  SupplierProductOptionGroup,
  SupplierProductOption,
  SupplierProductOptionGroupProduct
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { parseMinOrderQty } = require('../utils/quantity');

// 판매상품 주문 방식. 모델/DB ENUM 과 같은 목록을 유지한다(models/SupplierProduct.js).
// 'pack' = 개수로 주문(팩/박스/포대) — 기존 전 행의 동작. 'measure' = 무게·부피로 주문(소수).
const ORDER_MODES = ['pack', 'measure'];
const {
  requireSupplierScope,
  applySupplierFilter
} = require('../middleware/supplierScope');
const { requirePlanLimit } = require('../middleware/requirePlanLimit');
const { requireSupplierModule } = require('../middleware/requireModule');
const { sanitizeString } = require('../middleware/validation');

// ============================================
// Helpers
// ============================================

/**
 * Verify a row belongs to req.supplierCompany (or caller is SA with override).
 * Returns true if access is allowed, otherwise sends a 404/403 response and
 * returns false. Mirrors assertBGOwnsRow() from brand-products.js.
 */
function assertSupplierOwnsRow(row, req, res) {
  if (!row) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  // SA without override — allowed (sees all)
  if (req.supplierIsAdmin && !req.supplierCompany) return true;
  // SA with override or Supplier Admin — must match the resolved company
  if (!req.supplierCompany || row.supplier_company_id !== req.supplierCompany.id) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  return true;
}

/** Parse a non-negative number from body, returning fallback when missing. */
function nonNegNumber(val, fallback) {
  if (val === undefined || val === null || val === '') return fallback;
  const n = Number(val);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

/** Generate a unique product SKU within the supplier company scope. */
async function generateSupplierProductSKU(supplierCompanyId) {
  const prefix = 'SP';
  const count = await SupplierProduct.count({
    where: { supplier_company_id: supplierCompanyId },
    paranoid: false
  });
  return `${prefix}-${supplierCompanyId}-${String(count + 1).padStart(4, '0')}`;
}

// All endpoints below require: auth → supplier scope → module gate
const baseGates = [authenticateToken, requireSupplierScope, requireSupplierModule('supplier_products')];

// ============================================
// Product Categories (5 endpoints)
// ============================================

/**
 * GET /api/supplier-product-categories
 * List categories (filtered by req.supplierCompany; SA without override sees all)
 */
router.get('/supplier-product-categories', ...baseGates, async (req, res) => {
  try {
    const where = {};
    applySupplierFilter(where, req);

    const categories = await SupplierProductCategory.findAll({
      where,
      include: [{ model: SupplierProduct, as: 'products', attributes: ['id'] }],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    const result = categories.map((cat) => ({
      ...cat.toJSON(),
      product_count: cat.products ? cat.products.length : 0
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('GET /supplier-product-categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

/**
 * POST /api/supplier-product-categories
 * Create a category under req.supplierCompany.
 */
router.post('/supplier-product-categories', ...baseGates, async (req, res) => {
  try {
    if (!req.supplierCompany) {
      return res.status(400).json({ success: false, message: 'supplier_company_id required' });
    }

    const name = sanitizeString(req.body.name || '');
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const description = req.body.description !== undefined ? sanitizeString(req.body.description) : null;
    const emoji = req.body.emoji ? sanitizeString(req.body.emoji) : null;

    // Duplicate check within supplier scope
    const existing = await SupplierProductCategory.findOne({
      where: { name, supplier_company_id: req.supplierCompany.id }
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A category with this name already exists' });
    }

    let finalSortOrder = req.body.sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await SupplierProductCategory.max('sort_order', {
        where: { supplier_company_id: req.supplierCompany.id }
      });
      finalSortOrder = (maxOrder || 0) + 1;
    } else {
      finalSortOrder = parseInt(finalSortOrder, 10) || 0;
    }

    const category = await SupplierProductCategory.create({
      supplier_company_id: req.supplierCompany.id,
      name,
      description,
      emoji,
      sort_order: finalSortOrder,
      is_active: req.body.is_active !== false
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('POST /supplier-product-categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

/**
 * PUT /api/supplier-product-categories/:categoryId
 * Update a category (IDOR-checked).
 */
router.put('/supplier-product-categories/:categoryId', ...baseGates, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await SupplierProductCategory.findByPk(categoryId);
    if (!assertSupplierOwnsRow(category, req, res)) return;

    const { name, description, emoji, sort_order, is_active } = req.body;
    const trimmedName = name !== undefined ? sanitizeString(name) : null;

    if (trimmedName !== null && trimmedName === '') {
      return res.status(400).json({ success: false, message: 'Category name cannot be empty' });
    }

    if (trimmedName && trimmedName !== category.name) {
      const dup = await SupplierProductCategory.findOne({
        where: { name: trimmedName, supplier_company_id: category.supplier_company_id }
      });
      if (dup && dup.id !== parseInt(categoryId, 10)) {
        return res.status(400).json({ success: false, message: 'A category with this name already exists' });
      }
    }

    await category.update({
      name: trimmedName || category.name,
      description: description !== undefined ? (description ? sanitizeString(description) : null) : category.description,
      emoji: emoji !== undefined ? (emoji ? sanitizeString(emoji) : null) : category.emoji,
      sort_order: sort_order !== undefined ? parseInt(sort_order, 10) || 0 : category.sort_order,
      is_active: is_active !== undefined ? !!is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('PUT /supplier-product-categories/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

/**
 * DELETE /api/supplier-product-categories/:categoryId
 * Reject if products exist with this category.
 */
router.delete('/supplier-product-categories/:categoryId', ...baseGates, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await SupplierProductCategory.findByPk(categoryId, {
      include: [{ model: SupplierProduct, as: 'products', attributes: ['id'] }]
    });
    if (!assertSupplierOwnsRow(category, req, res)) return;

    if (category.products && category.products.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This category has products. Please move or delete products first.'
      });
    }

    await category.destroy();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('DELETE /supplier-product-categories/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

/**
 * PUT /api/supplier-product-categories/:categoryId/reorder
 * body: { sort_order } — direct sort_order overwrite.
 */
router.put('/supplier-product-categories/:categoryId/reorder', ...baseGates, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { sort_order } = req.body;

    if (sort_order === undefined || sort_order === null) {
      return res.status(400).json({ success: false, message: 'sort_order is required' });
    }
    const newOrder = parseInt(sort_order, 10);
    if (!Number.isFinite(newOrder) || newOrder < 0) {
      return res.status(400).json({ success: false, message: 'sort_order must be a non-negative integer' });
    }

    const category = await SupplierProductCategory.findByPk(categoryId);
    if (!assertSupplierOwnsRow(category, req, res)) return;

    await category.update({ sort_order: newOrder });
    res.json({ success: true, data: category });
  } catch (error) {
    console.error('PUT /supplier-product-categories/:id/reorder error:', error);
    res.status(500).json({ success: false, message: 'Failed to reorder category' });
  }
});

// ============================================
// Option Groups (4 endpoints)
// ============================================

/**
 * GET /api/supplier-product-option-groups
 * List option groups with their options.
 */
router.get('/supplier-product-option-groups', ...baseGates, async (req, res) => {
  try {
    const where = {};
    applySupplierFilter(where, req);

    const groups = await SupplierProductOptionGroup.findAll({
      where,
      include: [{ model: SupplierProductOption, as: 'options' }],
      order: [
        ['sort_order', 'ASC'],
        ['name', 'ASC'],
        [{ model: SupplierProductOption, as: 'options' }, 'sort_order', 'ASC']
      ]
    });

    res.json({ success: true, data: groups });
  } catch (error) {
    console.error('GET /supplier-product-option-groups error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch option groups' });
  }
});

/**
 * POST /api/supplier-product-option-groups
 * Create option group + its options atomically.
 */
router.post('/supplier-product-option-groups', ...baseGates, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (!req.supplierCompany) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'supplier_company_id required' });
    }

    const name = sanitizeString(req.body.name || '');
    if (!name) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Option group name is required' });
    }

    const { is_required, min_selections, max_selections, sort_order, options } = req.body;

    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await SupplierProductOptionGroup.max('sort_order', {
        where: { supplier_company_id: req.supplierCompany.id }
      });
      finalSortOrder = (maxOrder || 0) + 1;
    } else {
      finalSortOrder = parseInt(finalSortOrder, 10) || 0;
    }

    const group = await SupplierProductOptionGroup.create({
      supplier_company_id: req.supplierCompany.id,
      name,
      is_required: !!is_required,
      min_selections: parseInt(min_selections, 10) || 0,
      max_selections: max_selections === undefined || max_selections === null ? 1 : parseInt(max_selections, 10) || 1,
      sort_order: finalSortOrder
    }, { transaction: t });

    if (Array.isArray(options) && options.length > 0) {
      for (let i = 0; i < options.length; i++) {
        const opt = options[i] || {};
        const optName = sanitizeString(opt.name || '');
        if (!optName) continue;
        const priceAdj = nonNegNumber(opt.price_adjustment, 0);
        if (priceAdj === null) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'price_adjustment must be >= 0' });
        }
        await SupplierProductOption.create({
          option_group_id: group.id,
          name: optName,
          price_adjustment: priceAdj,
          sort_order: opt.sort_order !== undefined ? parseInt(opt.sort_order, 10) || i : i,
          is_active: opt.is_active !== false
        }, { transaction: t });
      }
    }

    await t.commit();

    const created = await SupplierProductOptionGroup.findByPk(group.id, {
      include: [{ model: SupplierProductOption, as: 'options' }]
    });
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error('POST /supplier-product-option-groups error:', error);
    res.status(500).json({ success: false, message: 'Failed to create option group' });
  }
});

/**
 * PUT /api/supplier-product-option-groups/:groupId
 * Update group; if `options` provided, replace all options atomically.
 */
router.put('/supplier-product-option-groups/:groupId', ...baseGates, async (req, res) => {
  const { groupId } = req.params;
  const t = await sequelize.transaction();
  try {
    const group = await SupplierProductOptionGroup.findByPk(groupId);
    if (!group || (!req.supplierIsAdmin && (!req.supplierCompany || group.supplier_company_id !== req.supplierCompany.id))) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Option group not found' });
    }
    if (req.supplierIsAdmin && req.supplierCompany && group.supplier_company_id !== req.supplierCompany.id) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Option group not found' });
    }

    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;
    const trimmedName = name !== undefined ? sanitizeString(name) : null;
    if (trimmedName !== null && trimmedName === '') {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Option group name cannot be empty' });
    }

    await group.update({
      name: trimmedName || group.name,
      is_required: is_required !== undefined ? !!is_required : group.is_required,
      min_selections: min_selections !== undefined ? parseInt(min_selections, 10) || 0 : group.min_selections,
      max_selections: max_selections !== undefined ? parseInt(max_selections, 10) || 1 : group.max_selections,
      sort_order: sort_order !== undefined ? parseInt(sort_order, 10) || 0 : group.sort_order
    }, { transaction: t });

    // Replace options if array provided
    if (Array.isArray(options)) {
      await SupplierProductOption.destroy({ where: { option_group_id: group.id }, transaction: t });
      for (let i = 0; i < options.length; i++) {
        const opt = options[i] || {};
        const optName = sanitizeString(opt.name || '');
        if (!optName) continue;
        const priceAdj = nonNegNumber(opt.price_adjustment, 0);
        if (priceAdj === null) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'price_adjustment must be >= 0' });
        }
        await SupplierProductOption.create({
          option_group_id: group.id,
          name: optName,
          price_adjustment: priceAdj,
          sort_order: opt.sort_order !== undefined ? parseInt(opt.sort_order, 10) || i : i,
          is_active: opt.is_active !== false
        }, { transaction: t });
      }
    }

    await t.commit();

    const updated = await SupplierProductOptionGroup.findByPk(group.id, {
      include: [{ model: SupplierProductOption, as: 'options' }]
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error('PUT /supplier-product-option-groups/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to update option group' });
  }
});

/**
 * DELETE /api/supplier-product-option-groups/:groupId
 * Cascades to options + junction rows.
 */
router.delete('/supplier-product-option-groups/:groupId', ...baseGates, async (req, res) => {
  const { groupId } = req.params;
  const t = await sequelize.transaction();
  try {
    const group = await SupplierProductOptionGroup.findByPk(groupId);
    if (!group || (req.supplierCompany && group.supplier_company_id !== req.supplierCompany.id && !(req.supplierIsAdmin && !req.supplierCompany))) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Option group not found' });
    }

    await SupplierProductOptionGroupProduct.destroy({ where: { option_group_id: group.id }, transaction: t });
    await SupplierProductOption.destroy({ where: { option_group_id: group.id }, transaction: t });
    await group.destroy({ transaction: t });

    await t.commit();
    res.json({ success: true, message: 'Option group deleted successfully' });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error('DELETE /supplier-product-option-groups/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete option group' });
  }
});

// ============================================
// Products (7 endpoints)
// ============================================

/**
 * GET /api/supplier-products
 * Paginated list with optional filters.
 */
router.get('/supplier-products', ...baseGates, async (req, res) => {
  try {
    const { category_id, active, search } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const requestedLimit = parseInt(req.query.limit, 10) || 50;
    const limit = Math.min(Math.max(requestedLimit, 1), 200);
    const offset = (page - 1) * limit;

    const where = {};
    applySupplierFilter(where, req);
    if (category_id) where.category_id = parseInt(category_id, 10);
    if (active !== undefined) where.is_active = active === 'true' || active === '1';
    if (search) {
      const term = `%${String(search).trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: term } },
        { sku: { [Op.like]: term } },
        { description: { [Op.like]: term } }
      ];
    }

    const { rows, count } = await SupplierProduct.findAndCountAll({
      where,
      include: [
        { model: SupplierProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']],
      limit,
      offset,
      distinct: true
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('GET /supplier-products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

/**
 * GET /api/supplier-products/:productId
 * Detail with category + option groups (and their options).
 */
router.get('/supplier-products/:productId', ...baseGates, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await SupplierProduct.findByPk(productId, {
      include: [
        { model: SupplierProductCategory, as: 'category' },
        {
          model: SupplierProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: SupplierProductOption, as: 'options' }]
        }
      ]
    });
    if (!assertSupplierOwnsRow(product, req, res)) return;

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('GET /supplier-products/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

/**
 * POST /api/supplier-products
 * Create product (plan-limit gated).
 */
router.post(
  '/supplier-products',
  authenticateToken,
  requireSupplierScope,
  requireSupplierModule('supplier_products'),
  requirePlanLimit('product_limit'),
  async (req, res) => {
    try {
      if (!req.supplierCompany) {
        return res.status(400).json({ success: false, message: 'supplier_company_id required' });
      }

      const name = sanitizeString(req.body.name || '');
      if (!name) {
        return res.status(400).json({ success: false, message: 'Product name is required' });
      }

      const unitPriceRaw = req.body.unit_price;
      if (unitPriceRaw === undefined || unitPriceRaw === null || unitPriceRaw === '') {
        return res.status(400).json({ success: false, message: 'unit_price is required' });
      }
      const unit_price = parseFloat(unitPriceRaw);
      if (!Number.isFinite(unit_price) || unit_price < 0) {
        return res.status(400).json({ success: false, message: 'unit_price must be a non-negative number' });
      }

      const base_quantity = req.body.base_quantity !== undefined ? parseFloat(req.body.base_quantity) : 1;
      if (!Number.isFinite(base_quantity) || base_quantity < 0) {
        return res.status(400).json({ success: false, message: 'base_quantity must be a non-negative number' });
      }

      // 주문 방식. 'pack'(개수로 주문) = 기본이자 현행 동작. 'measure'(무게·부피로 주문) 신설.
      // 값을 안 보내면 pack — 기존 클라이언트는 아무 영향 없다.
      const order_mode = req.body.order_mode !== undefined && req.body.order_mode !== ''
        ? String(req.body.order_mode) : 'pack';
      if (!ORDER_MODES.includes(order_mode)) {
        return res.status(400).json({ success: false, message: `order_mode must be one of ${ORDER_MODES.join(', ')}` });
      }

      // 소수 허용 — measure 모드 "최소 0.5kg". 정수 강제는 0.5 를 400 으로 거부했다.
      const min_order_quantity = req.body.min_order_quantity !== undefined
        ? parseMinOrderQty(req.body.min_order_quantity, NaN) : 1;
      if (!Number.isFinite(min_order_quantity) || min_order_quantity <= 0) {
        return res.status(400).json({ success: false, message: 'min_order_quantity must be > 0' });
      }

      const low_stock_threshold = req.body.low_stock_threshold !== undefined ? parseFloat(req.body.low_stock_threshold) : 0;
      if (!Number.isFinite(low_stock_threshold) || low_stock_threshold < 0) {
        return res.status(400).json({ success: false, message: 'low_stock_threshold must be a non-negative number' });
      }

      const lead_time_days = req.body.lead_time_days !== undefined ? parseInt(req.body.lead_time_days, 10) : 0;
      if (!Number.isInteger(lead_time_days) || lead_time_days < 0) {
        return res.status(400).json({ success: false, message: 'lead_time_days must be a non-negative integer' });
      }

      // Validate category_id belongs to this supplier
      let category_id = null;
      if (req.body.category_id !== undefined && req.body.category_id !== null && req.body.category_id !== '') {
        category_id = parseInt(req.body.category_id, 10);
        const cat = await SupplierProductCategory.findByPk(category_id);
        if (!cat || (cat.supplier_company_id !== req.supplierCompany.id && !req.supplierIsAdmin)) {
          return res.status(400).json({ success: false, message: 'Invalid category_id' });
        }
      }

      const sku = req.body.sku
        ? sanitizeString(req.body.sku)
        : await generateSupplierProductSKU(req.supplierCompany.id);

      const product = await SupplierProduct.create({
        supplier_company_id: req.supplierCompany.id,
        category_id,
        name,
        description: req.body.description !== undefined ? sanitizeString(req.body.description) : null,
        sku,
        unit: req.body.unit ? sanitizeString(req.body.unit) : null,
        base_quantity,
        order_mode,
        unit_price,
        min_order_quantity,
        image_url: req.body.image_url || null,
        image_thumbnail: req.body.image_thumbnail || null,
        emoji: req.body.emoji ? sanitizeString(req.body.emoji) : null,
        is_active: req.body.is_active !== false,
        sort_order: req.body.sort_order !== undefined ? parseInt(req.body.sort_order, 10) || 0 : 0,
        current_stock: 0,
        low_stock_threshold,
        lead_time_days
      });

      // Link option groups (validate each belongs to this supplier)
      const optionGroupIds = Array.isArray(req.body.option_group_ids) ? req.body.option_group_ids : [];
      if (optionGroupIds.length > 0) {
        const groups = await SupplierProductOptionGroup.findAll({
          where: { id: optionGroupIds }
        });
        for (const g of groups) {
          if (!req.supplierIsAdmin && g.supplier_company_id !== req.supplierCompany.id) continue;
          await SupplierProductOptionGroupProduct.create({
            product_id: product.id,
            option_group_id: g.id
          });
        }
      }

      const created = await SupplierProduct.findByPk(product.id, {
        include: [
          { model: SupplierProductCategory, as: 'category' },
          {
            model: SupplierProductOptionGroup,
            as: 'optionGroups',
            through: { attributes: [] },
            include: [{ model: SupplierProductOption, as: 'options' }]
          }
        ]
      });

      res.status(201).json({ success: true, data: created });
    } catch (error) {
      console.error('POST /supplier-products error:', error);
      res.status(500).json({ success: false, message: 'Failed to create product' });
    }
  }
);

/**
 * PUT /api/supplier-products/:productId
 * Update product. If option_group_ids provided, replace junction rows atomically.
 */
router.put('/supplier-products/:productId', ...baseGates, async (req, res) => {
  const { productId } = req.params;
  const t = await sequelize.transaction();
  try {
    const product = await SupplierProduct.findByPk(productId);
    if (!product) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (!req.supplierIsAdmin && (!req.supplierCompany || product.supplier_company_id !== req.supplierCompany.id)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (req.supplierIsAdmin && req.supplierCompany && product.supplier_company_id !== req.supplierCompany.id) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updates = {};

    if (req.body.name !== undefined) {
      const n = sanitizeString(req.body.name);
      if (!n) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Product name cannot be empty' });
      }
      updates.name = n;
    }
    if (req.body.description !== undefined) {
      updates.description = req.body.description ? sanitizeString(req.body.description) : null;
    }
    if (req.body.sku !== undefined) updates.sku = req.body.sku ? sanitizeString(req.body.sku) : null;
    if (req.body.unit !== undefined) updates.unit = req.body.unit ? sanitizeString(req.body.unit) : null;
    if (req.body.emoji !== undefined) updates.emoji = req.body.emoji ? sanitizeString(req.body.emoji) : null;

    if (req.body.unit_price !== undefined) {
      const v = parseFloat(req.body.unit_price);
      if (!Number.isFinite(v) || v < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'unit_price must be a non-negative number' });
      }
      updates.unit_price = v;
    }
    if (req.body.base_quantity !== undefined) {
      const v = parseFloat(req.body.base_quantity);
      if (!Number.isFinite(v) || v < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'base_quantity must be a non-negative number' });
      }
      updates.base_quantity = v;
    }
    if (req.body.order_mode !== undefined) {
      const v = String(req.body.order_mode);
      if (!ORDER_MODES.includes(v)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `order_mode must be one of ${ORDER_MODES.join(', ')}` });
      }
      updates.order_mode = v;
    }
    if (req.body.min_order_quantity !== undefined) {
      // 소수 허용 (위와 동일 사유)
      const v = parseMinOrderQty(req.body.min_order_quantity, NaN);
      if (!Number.isFinite(v) || v <= 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'min_order_quantity must be > 0' });
      }
      updates.min_order_quantity = v;
    }
    if (req.body.low_stock_threshold !== undefined) {
      const v = parseFloat(req.body.low_stock_threshold);
      if (!Number.isFinite(v) || v < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'low_stock_threshold must be a non-negative number' });
      }
      updates.low_stock_threshold = v;
    }
    if (req.body.lead_time_days !== undefined) {
      const v = parseInt(req.body.lead_time_days, 10);
      if (!Number.isInteger(v) || v < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'lead_time_days must be a non-negative integer' });
      }
      updates.lead_time_days = v;
    }
    if (req.body.current_stock !== undefined) {
      const v = parseFloat(req.body.current_stock);
      if (!Number.isFinite(v) || v < 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'current_stock must be a non-negative number' });
      }
      updates.current_stock = v;
    }
    if (req.body.image_url !== undefined) updates.image_url = req.body.image_url || null;
    if (req.body.image_thumbnail !== undefined) updates.image_thumbnail = req.body.image_thumbnail || null;
    if (req.body.is_active !== undefined) updates.is_active = !!req.body.is_active;
    if (req.body.sort_order !== undefined) updates.sort_order = parseInt(req.body.sort_order, 10) || 0;

    if (req.body.category_id !== undefined) {
      if (req.body.category_id === null || req.body.category_id === '') {
        updates.category_id = null;
      } else {
        const catId = parseInt(req.body.category_id, 10);
        const cat = await SupplierProductCategory.findByPk(catId);
        if (!cat || (cat.supplier_company_id !== product.supplier_company_id && !req.supplierIsAdmin)) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'Invalid category_id' });
        }
        updates.category_id = catId;
      }
    }

    await product.update(updates, { transaction: t });

    // Replace option group links if array provided
    if (Array.isArray(req.body.option_group_ids)) {
      await SupplierProductOptionGroupProduct.destroy({ where: { product_id: product.id }, transaction: t });
      if (req.body.option_group_ids.length > 0) {
        const groups = await SupplierProductOptionGroup.findAll({
          where: { id: req.body.option_group_ids },
          transaction: t
        });
        for (const g of groups) {
          if (!req.supplierIsAdmin && g.supplier_company_id !== product.supplier_company_id) continue;
          await SupplierProductOptionGroupProduct.create({
            product_id: product.id,
            option_group_id: g.id
          }, { transaction: t });
        }
      }
    }

    await t.commit();

    // 💰 가격 전파 (2026-09-05 Irene: "원가는 원래 공급업체 가격 아니야?")
    //   공급업체가 상품 가격을 고치면, 그 상품을 사는 재고아이템·재료의 원가가 따라간다.
    //   규칙의 단일 소스는 `services/costSync.js` — 여기서 식을 다시 쓰지 않는다.
    //   ⚠ 커밋 **뒤**에 돈다: 전파가 실패해도 상품 저장 자체는 살아야 하고(사용자 작업 보호),
    //     실패는 조용히 삼키지 않고 로그로 남긴다. 못 따라간 행은 인스펙션 019 가 드러낸다.
    try {
      const { recomputeForSellerProduct } = require('../services/costSync');
      const out = await recomputeForSellerProduct('supplier', product.id, { sequelize });
      const moved = out.filter((x) => x && x.changed);
      if (moved.length) console.log(`[cost] 공급업체 상품 ${product.id} 가격 → 원가 ${moved.length}건 갱신`);
    } catch (e) {
      console.error(`[cost] 공급업체 상품 ${product.id} 원가 전파 실패:`, e.message);
    }

    const updated = await SupplierProduct.findByPk(product.id, {
      include: [
        { model: SupplierProductCategory, as: 'category' },
        {
          model: SupplierProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: SupplierProductOption, as: 'options' }]
        }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error('PUT /supplier-products/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

/**
 * DELETE /api/supplier-products/:productId
 * Soft delete (paranoid:true on model).
 */
router.delete('/supplier-products/:productId', ...baseGates, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await SupplierProduct.findByPk(productId);
    if (!assertSupplierOwnsRow(product, req, res)) return;

    await product.destroy();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /supplier-products/:id error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

/**
 * POST /api/supplier-products/:productId/copy
 * Clone product (new id, name + ' (Copy)') and copy junction rows. Plan-limit gated.
 */
router.post(
  '/supplier-products/:productId/copy',
  authenticateToken,
  requireSupplierScope,
  requireSupplierModule('supplier_products'),
  requirePlanLimit('product_limit'),
  async (req, res) => {
    try {
      const { productId } = req.params;
      const original = await SupplierProduct.findByPk(productId, {
        include: [{
          model: SupplierProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] }
        }]
      });
      if (!assertSupplierOwnsRow(original, req, res)) return;

      const newSku = await generateSupplierProductSKU(original.supplier_company_id);

      const copy = await SupplierProduct.create({
        supplier_company_id: original.supplier_company_id,
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
        lead_time_days: original.lead_time_days
      });

      if (original.optionGroups && original.optionGroups.length > 0) {
        for (const g of original.optionGroups) {
          await SupplierProductOptionGroupProduct.create({
            product_id: copy.id,
            option_group_id: g.id
          });
        }
      }

      const created = await SupplierProduct.findByPk(copy.id, {
        include: [
          { model: SupplierProductCategory, as: 'category' },
          {
            model: SupplierProductOptionGroup,
            as: 'optionGroups',
            through: { attributes: [] },
            include: [{ model: SupplierProductOption, as: 'options' }]
          }
        ]
      });

      res.status(201).json({ success: true, data: created });
    } catch (error) {
      console.error('POST /supplier-products/:id/copy error:', error);
      res.status(500).json({ success: false, message: 'Failed to copy product' });
    }
  }
);

/**
 * PUT /api/supplier-products/:productId/toggle-active
 * Flip is_active.
 */
router.put('/supplier-products/:productId/toggle-active', ...baseGates, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await SupplierProduct.findByPk(productId);
    if (!assertSupplierOwnsRow(product, req, res)) return;

    await product.update({ is_active: !product.is_active });

    res.json({
      success: true,
      data: { id: product.id, is_active: product.is_active },
      message: product.is_active ? 'Product activated' : 'Product deactivated'
    });
  } catch (error) {
    console.error('PUT /supplier-products/:id/toggle-active error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle product status' });
  }
});

module.exports = router;
