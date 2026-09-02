const express = require('express');
const router = express.Router();
const {
  BrandProduct,
  BrandProductCategory,
  BrandProductOptionGroup,
  BrandProductOption,
  BrandProductOptionIngredient,
  BrandProductOptionGroupProduct,
  Brand,
  Ingredient,
  Recipe,
  RecipeIngredient,
  ProductRecipe,
  ProductIngredient
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');
const { requireBGScope, applyBGFilter, assertBGOwnsRow } = require('../middleware/brandScope');
const { requireBrandUserModule } = require('../middleware/requireModule');
const { normalizeImageField } = require('../utils/imageProcessor');

// P0-3 Wave B: 브랜드 상품 관리(카탈로그/카테고리/옵션그룹/상품레시피)는 Advanced(brand_products).
// BG 유저 스코프 경로만 게이트 — 레스토랑이 브랜드 카탈로그를 읽는 `/brands/:brandId/products`(별도 prefix)는
// 비차단. authenticateToken 선행(per-route 와 중복돼도 idempotent), 데모/System Admin bypass.
// 주문 방식 — 'pack'=개수로, 'measure'=무게·부피로(소수 허용). 공급업체 축과 같은 값.
const ORDER_MODES = ['pack', 'measure'];

router.use(['/brand-products', '/brand-product-categories', '/brand-product-option-groups'],
  authenticateToken, requireBrandUserModule('brand_products'));

/**
 * Generate unique product SKU
 */
const generateProductSKU = async () => {
  const prefix = 'PRD';
  const count = await BrandProduct.count();
  const nextNum = count + 1;
  return `${prefix}-${String(nextNum).padStart(3, '0')}`;
};

/**
 * Sync brand product to ingredients table
 * Creates or updates ingredient records for each brand linked to the product
 */
async function syncProductToIngredients(productId) {
  try {
    const product = await BrandProduct.findByPk(productId, {
      include: [{ model: Brand, as: 'brands', through: { attributes: [] } }]
    });

    if (!product) return;

    const { Op } = require('sequelize');

    // If sync_to_ingredients is false, remove any existing linked ingredients
    if (!product.sync_to_ingredients) {
      await Ingredient.destroy({ where: { brand_product_id: productId } });
      return;
    }

    // Resolve target brands by distribution mode. A 'all' product has NO brand_product_brands
    // N:M rows, so the old `product.brands`-only loop mirrored 0 ingredients — that's why
    // distribution_mode='all' products never appeared at restaurants. (Fable 2026-07-05)
    let targetBrands = [];
    if (product.distribution_mode === 'all') {
      // owner_user_id null 이면 빈 배열 — where owner_id:null 은 owner 없는 brand 전체에 매칭돼
      // 타 테넌트로 미러가 새는 구멍이 된다 (Fable gate 2026-07-05, 방어 가드)
      targetBrands = product.owner_user_id
        ? await Brand.findAll({ where: { owner_id: product.owner_user_id }, attributes: ['id'] })
        : [];
    } else if (product.distribution_mode === 'specific_restaurants') {
      const BrandProductRestaurant = require('../models/BrandProductRestaurant');
      const { Restaurant } = require('../models');
      const links = await BrandProductRestaurant.findAll({ where: { product_id: productId }, attributes: ['restaurant_id'] });
      if (links.length) {
        const rests = await Restaurant.findAll({ where: { id: links.map(l => l.restaurant_id) }, attributes: ['brand_id'] });
        const bids = [...new Set(rests.map(r => r.brand_id).filter(Boolean))];
        targetBrands = bids.length ? await Brand.findAll({ where: { id: bids }, attributes: ['id'] }) : [];
      }
    } else {
      targetBrands = product.brands || [];
    }
    if (!targetBrands.length) {
      await Ingredient.destroy({ where: { brand_product_id: productId } });
      return;
    }

    // Translate the product's BrandProductCategory into an IngredientCategory(brand) by name
    // (find-or-create) so the mirrored restaurant ingredient isn't "Uncategorized". (Fable 2026-07-05)
    let bpCat = null;
    if (product.category_id) {
      const BrandProductCategory = require('../models/BrandProductCategory');
      const c = await BrandProductCategory.findByPk(product.category_id, { attributes: ['name', 'emoji'] });
      if (c) bpCat = { name: c.name, emoji: c.emoji };
    }
    const IngredientCategory = require('../models/IngredientCategory');

    for (const brand of targetBrands) {
      let ingredientCategoryId = null;
      if (bpCat) {
        let ic = await IngredientCategory.findOne({ where: { owner_type: 'brand', brand_id: brand.id, name: bpCat.name } });
        if (!ic) ic = await IngredientCategory.create({ owner_type: 'brand', brand_id: brand.id, name: bpCat.name, emoji: bpCat.emoji || null, is_active: true });
        ingredientCategoryId = ic.id;
      }
      // ── 동기화가 무엇을 덮고 무엇을 존중하는가 (2026-09-02, Fable 절단면) ──────────
      // 그전에는 **전 컬럼을 매번 통째로 덮었다.** 그래서 사람이 미러 재료를 끄거나 최소재고를
      // 정해도 **상품을 한 번 수정하면 전부 되돌아갔다.**
      //   운영 실측(2026-09-02): 꺼진 미러 67건 중 **63건이 상품은 켜진 채 사람이 끈 것** —
      //   즉 그 63건은 다음 상품 수정 때 조용히 다시 켜질 상태였다.
      // 원칙: **동기화는 정체성만 맞추고, 사람의 결정은 건드리지 않는다.**
      //   정체성(상품이 주인) = 이름·SKU·이미지·단위·기준수량·카테고리·원가
      //   결정(재료 행이 주인) = is_active·min_stock·current_stock·category·supplier_name
      const identity = {
        owner_type: 'brand',
        brand_id: brand.id,
        restaurant_id: null,
        brand_product_id: productId,
        code: product.sku || null,
        name: product.name,
        image_url: product.image_url || null,
        ingredient_category_id: ingredientCategoryId,
        unit: product.unit || 'piece',
        base_quantity: product.base_quantity || 1,
        // 재판매 원가 = 공급업체 가격 그대로([[reference_cost_two_paths]])
        unit_cost: product.unit_price || 0,
      };
      let ingredient = await Ingredient.findOne({ where: { brand_product_id: productId, brand_id: brand.id } });
      if (ingredient) {
        // 수정 — 정체성만 쓴다. min_stock·current_stock 을 0 으로 덮던 하드코딩은 여기서 사라진다
        // (브랜드 레벨 수량이 마침 0 이라 피해가 없었을 뿐, 동기화가 재고를 지우는 코드는 결함이다).
        const patch = { ...identity };
        // 유일한 예외: **끄는 방향만** 따라간다. 단종된 상품이 발주 화면에 남으면 안 되기 때문이다.
        // 상품이 다시 활성화돼도 미러는 켜지 않는다 — 사람이 끈 것을 기계가 살리지 않는다.
        if (!product.is_active && ingredient.is_active) patch.is_active = false;
        await ingredient.update(patch);
      } else {
        // 생성 — 이때만 결정 칸의 초기값을 정한다
        await Ingredient.create({
          ...identity,
          category: 'other',
          supplier_name: null,
          min_stock: 0,
          current_stock: 0,
          is_active: product.is_active,
        });
      }
    }

    // Remove ingredients for brands that are no longer targeted
    const linkedBrandIds = targetBrands.map(b => b.id);
    await Ingredient.destroy({
      where: {
        brand_product_id: productId,
        brand_id: { [Op.notIn]: linkedBrandIds }
      }
    });
  } catch (error) {
    console.error('Sync product to ingredients error:', error);
  }
}

// ============================================
// Product Categories (unified management - brand independent)
// ============================================

/**
 * GET /api/brand-product-categories
 * Get all product categories
 */
router.get('/brand-product-categories', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const where = {};
    applyBGFilter(where, req);
    const categories = await BrandProductCategory.findAll({
      where,
      include: [
        {
          model: BrandProduct,
          as: 'products',
          attributes: ['id']
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    const categoriesWithCount = categories.map(cat => ({
      ...cat.toJSON(),
      product_count: cat.products ? cat.products.length : 0
    }));

    res.json({ success: true, data: categoriesWithCount });
  } catch (error) {
    console.error('Get brand product categories error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch product categories', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brand-product-categories
 * Create product category
 */
router.post('/brand-product-categories', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { name, description, emoji, sort_order, is_active } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Category name is required', code: 'VALIDATION_ERROR' } });
    }

    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }

    // Duplicate check (within BG scope)
    const existing = await BrandProductCategory.findOne({
      where: { name: name.trim(), owner_user_id: req.bgOwnerId }
    });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'A category with this name already exists', code: 'VALIDATION_ERROR' } });
    }

    // Auto-set sort_order (within BG scope)
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await BrandProductCategory.max('sort_order', { where: { owner_user_id: req.bgOwnerId } });
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const category = await BrandProductCategory.create({
      owner_user_id: req.bgOwnerId,
      name: name.trim(),
      description: description || null,
      emoji: emoji || null,
      sort_order: finalSortOrder,
      is_active: is_active !== false
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Create brand product category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create product category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brand-product-categories/:categoryId
 * Update product category
 */
router.put('/brand-product-categories/:categoryId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, emoji, sort_order, is_active } = req.body;

    const category = await BrandProductCategory.findByPk(categoryId);
    if (!assertBGOwnsRow(category, req, res)) return;

    // Check name duplicate (excluding self, within BG scope)
    if (name && name.trim() !== category.name) {
      const existing = await BrandProductCategory.findOne({
        where: { name: name.trim(), owner_user_id: category.owner_user_id }
      });
      if (existing && existing.id !== parseInt(categoryId)) {
        return res.status(400).json({ success: false, error: { message: 'A category with this name already exists', code: 'VALIDATION_ERROR' } });
      }
    }

    await category.update({
      name: name ? name.trim() : category.name,
      description: description !== undefined ? description : category.description,
      emoji: emoji !== undefined ? emoji : category.emoji,
      sort_order: sort_order !== undefined ? sort_order : category.sort_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Update brand product category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update product category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/brand-product-categories/:categoryId
 * Delete product category
 */
router.delete('/brand-product-categories/:categoryId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await BrandProductCategory.findByPk(categoryId, {
      include: [{ model: BrandProduct, as: 'products' }]
    });

    if (!assertBGOwnsRow(category, req, res)) return;

    if (category.products && category.products.length > 0) {
      return res.status(400).json({ success: false, error: { message: 'This category has products. Please delete or move products first.', code: 'VALIDATION_ERROR' } });
    }

    await category.destroy();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete brand product category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete product category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brand-product-categories/:categoryId/reorder
 * Reorder product category
 */
router.put('/brand-product-categories/:categoryId/reorder', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { direction } = req.body;

    if (!direction || !['up', 'down'].includes(direction)) {
      return res.status(400).json({ success: false, error: { message: 'direction must be up or down', code: 'VALIDATION_ERROR' } });
    }

    const category = await BrandProductCategory.findByPk(categoryId);
    if (!assertBGOwnsRow(category, req, res)) return;

    const reorderWhere = {};
    applyBGFilter(reorderWhere, req);
    const allCategories = await BrandProductCategory.findAll({
      where: reorderWhere,
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    const currentIndex = allCategories.findIndex(c => c.id === parseInt(categoryId));
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= allCategories.length) {
      return res.status(400).json({ success: false, error: { message: 'Cannot move further', code: 'VALIDATION_ERROR' } });
    }

    const targetCategory = allCategories[targetIndex];
    const tempOrder = category.sort_order;
    await category.update({ sort_order: targetCategory.sort_order });
    await targetCategory.update({ sort_order: tempOrder });

    res.json({ success: true, message: 'Order changed successfully' });
  } catch (error) {
    console.error('Reorder brand product category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to reorder category', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Option Groups (unified management - brand/product independent)
// ============================================

/**
 * GET /api/brand-product-option-groups
 * Get all option groups
 */
router.get('/brand-product-option-groups', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const where = {};
    applyBGFilter(where, req);
    const optionGroups = await BrandProductOptionGroup.findAll({
      where,
      include: [
        {
          model: BrandProductOption,
          as: 'options',
          include: [{
            model: BrandProductOptionIngredient,
            as: 'optionIngredients',
            include: [{ model: ProductIngredient, as: 'ingredient', attributes: ['id', 'name', 'unit', 'unit_cost'] }]
          }],
          order: [['sort_order', 'ASC']]
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    // Transform to include ingredient info on options
    const transformed = optionGroups.map(g => {
      const gj = g.toJSON();
      gj.options = (gj.options || []).map((opt) => ({
        ...opt,
        ingredient_id: opt.optionIngredients?.[0]?.ingredient_id || null,
        ingredient_name: opt.optionIngredients?.[0]?.ingredient?.name || null,
        ingredient_quantity: opt.optionIngredients?.[0]?.quantity ? parseFloat(opt.optionIngredients[0].quantity) : null,
        ingredient_unit: opt.optionIngredients?.[0]?.ingredient?.unit || null
      }));
      return gj;
    });

    res.json({ success: true, data: transformed });
  } catch (error) {
    console.error('Get option groups error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch option groups', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brand-product-option-groups
 * Create option group
 */
router.post('/brand-product-option-groups', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Option group name is required', code: 'VALIDATION_ERROR' } });
    }
    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }

    // Auto-set sort_order (within BG scope)
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await BrandProductOptionGroup.max('sort_order', { where: { owner_user_id: req.bgOwnerId } });
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const optionGroup = await BrandProductOptionGroup.create({
      owner_user_id: req.bgOwnerId,
      name: name.trim(),
      is_required: is_required || false,
      min_selections: min_selections || 0,
      max_selections: max_selections || 1,
      sort_order: finalSortOrder
    });

    // Create options
    if (options && options.length > 0) {
      for (let j = 0; j < options.length; j++) {
        const opt = options[j];
        const createdOpt = await BrandProductOption.create({
          owner_user_id: req.bgOwnerId,
          option_group_id: optionGroup.id,
          name: opt.name,
          price_adjustment: opt.price_adjustment || 0,
          sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
          is_active: opt.is_active !== false
        });
        // Save ingredient link
        if (opt.ingredient_id) {
          await BrandProductOptionIngredient.create({
            option_id: createdOpt.id,
            ingredient_id: opt.ingredient_id,
            quantity: opt.ingredient_quantity || 1
          });
        }
      }
    }

    // 생성된 옵션 그룹 다시 조회
    const createdGroup = await BrandProductOptionGroup.findByPk(optionGroup.id, {
      include: [{ model: BrandProductOption, as: 'options' }]
    });

    res.status(201).json({ success: true, data: createdGroup });
  } catch (error) {
    console.error('Create option group error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create option group', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brand-product-option-groups/:groupId
 * 옵션 그룹 수정
 */
router.put('/brand-product-option-groups/:groupId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    const optionGroup = await BrandProductOptionGroup.findByPk(groupId);
    if (!assertBGOwnsRow(optionGroup, req, res)) return;

    await optionGroup.update({
      name: name !== undefined ? name.trim() : optionGroup.name,
      is_required: is_required !== undefined ? is_required : optionGroup.is_required,
      min_selections: min_selections !== undefined ? min_selections : optionGroup.min_selections,
      max_selections: max_selections !== undefined ? max_selections : optionGroup.max_selections,
      sort_order: sort_order !== undefined ? sort_order : optionGroup.sort_order
    });

    // 옵션 업데이트 (전체 교체)
    if (options !== undefined) {
      // Delete existing option ingredients first
      const existingOpts = await BrandProductOption.findAll({ where: { option_group_id: groupId } });
      for (const eo of existingOpts) {
        await BrandProductOptionIngredient.destroy({ where: { option_id: eo.id } });
      }
      await BrandProductOption.destroy({ where: { option_group_id: groupId } });

      if (options && options.length > 0) {
        for (let j = 0; j < options.length; j++) {
          const opt = options[j];
          const createdOpt = await BrandProductOption.create({
            owner_user_id: optionGroup.owner_user_id,
            option_group_id: groupId,
            name: opt.name,
            price_adjustment: opt.price_adjustment || 0,
            sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
            is_active: opt.is_active !== false
          });
          if (opt.ingredient_id) {
            await BrandProductOptionIngredient.create({
              option_id: createdOpt.id,
              ingredient_id: opt.ingredient_id,
              quantity: opt.ingredient_quantity || 1
            });
          }
        }
      }
    }

    // 업데이트된 옵션 그룹 다시 조회
    const updatedGroup = await BrandProductOptionGroup.findByPk(groupId, {
      include: [{ model: BrandProductOption, as: 'options' }]
    });

    res.json({ success: true, data: updatedGroup });
  } catch (error) {
    console.error('Update option group error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update option group', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/brand-product-option-groups/:groupId
 * 옵션 그룹 삭제
 */
router.delete('/brand-product-option-groups/:groupId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { groupId } = req.params;

    const optionGroup = await BrandProductOptionGroup.findByPk(groupId);
    if (!assertBGOwnsRow(optionGroup, req, res)) return;

    // 제품에 연결되어 있는지 확인
    const linkedProducts = await BrandProductOptionGroupProduct.count({
      where: { option_group_id: groupId }
    });

    if (linkedProducts > 0) {
      return res.status(400).json({
        error: `This option group is linked to ${linkedProducts} product(s). Please unlink it from those products first.`
      });
    }

    // Remove child options first — FK (brand_product_options.option_group_id) was
    // causing a 500 on every delete of a group that had options.
    await BrandProductOption.destroy({ where: { option_group_id: groupId } });
    await optionGroup.destroy();

    res.json({ success: true, message: 'Option group deleted' });
  } catch (error) {
    console.error('Delete option group error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete option group', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Products (통합 관리)
// ============================================

/**
 * GET /api/brand-products
 * 제품 전체 목록 조회
 */
// GET /api/brand-products/restaurants — list restaurants of BG-owned brands
// (used by 상품 등록 UI 의 specific_restaurants distribution selector)
router.get('/brand-products/restaurants', authenticateToken, requireBGScope, async (req, res) => {
  try {
    if (req.bgOwnerId == null) return res.json({ success: true, data: [] });
    const { Restaurant, Brand } = require('../models');
    const brands = await Brand.findAll({
      where: { owner_id: req.bgOwnerId },
      attributes: ['id', 'name']
    });
    const brandIds = brands.map(b => b.id);
    if (brandIds.length === 0) return res.json({ success: true, data: [] });
    const restaurants = await Restaurant.findAll({
      where: { brand_id: brandIds },
      attributes: ['id', 'name', 'brand_id'],
      order: [['name', 'ASC']]
    });
    const brandNameMap = Object.fromEntries(brands.map(b => [b.id, b.name]));
    res.json({
      success: true,
      data: restaurants.map(r => ({ id: r.id, name: r.name, brand_id: r.brand_id, brand_name: brandNameMap[r.brand_id] || null }))
    });
  } catch (err) {
    console.error('GET /api/brand-products/restaurants error:', err);
    res.status(500).json({ success: false, error: { message: 'Failed to load restaurants', code: 'INTERNAL_ERROR' } });
  }
});

router.get('/brand-products', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { category_id, is_active } = req.query;

    const where = {};
    applyBGFilter(where, req);
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const products = await BrandProduct.findAll({
      where,
      include: [
        {
          model: BrandProductCategory,
          as: 'category',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Brand,
          as: 'brands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] }
        },
        {
          model: require('../models').Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'brand_id'],
          through: { attributes: [] },
          required: false
        },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [
            {
              model: BrandProductOption,
              as: 'options'
            }
          ]
        },
        {
          model: ProductRecipe,
          as: 'productRecipe',
          attributes: ['id', 'name', 'total_ingredient_cost']
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get brand products error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch products', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * GET /api/brand-products/:productId
 * 제품 상세 조회
 */
// GET /api/brand-products/similar?name=...&sku=... — 등록 폼이 입력 중 보여줄 유사 상품.
// **차단하지 않는다.** 사람이 "이미 있는 그것 아닌가?"를 스스로 알아보게 하는 용도라
// 오탐 비용이 0 이고, 형제 변형이 같이 뜨는 것도 오히려 유익하다.
// 반드시 '/brand-products/:productId' 보다 먼저 등록한다(안 그러면 productId='similar' 로 매칭).
router.get('/brand-products/similar', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { name, sku, exclude_id } = req.query;
    if (!name || !String(name).trim()) {
      return res.json({ success: true, data: { exact: null, similar: [], suggestions: [] } });
    }
    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }
    const { findDuplicateBrandProducts } = require('../utils/brandProductDuplicate');
    const dup = await findDuplicateBrandProducts({
      ownerUserId: req.bgOwnerId,
      name,
      sku: sku || null,
      excludeId: exclude_id ? parseInt(exclude_id, 10) : undefined
    });
    const shape = (r) => ({ id: r.id, name: r.name, sku: r.sku, unit: r.unit, unit_price: r.unit_price, is_active: r.is_active });
    res.json({
      success: true,
      data: {
        exact: dup.exact ? shape(dup.exact) : null,
        exact_reason: dup.exactReason || null,
        similar: (dup.similar || []).map(shape),
        suggestions: (dup.suggestions || []).map(shape)
      }
    });
  } catch (error) {
    console.error('Similar brand products error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/brand-products/:productId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await BrandProduct.findByPk(productId, {
      include: [
        {
          model: BrandProductCategory,
          as: 'category'
        },
        {
          model: Brand,
          as: 'brands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] }
        },
        {
          model: require('../models').Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'brand_id'],
          through: { attributes: [] },
          required: false
        },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [
            {
              model: BrandProductOption,
              as: 'options'
            }
          ]
        },
        {
          model: ProductRecipe,
          as: 'productRecipe',
          attributes: ['id', 'name', 'total_ingredient_cost']
        }
      ]
    });

    if (!assertBGOwnsRow(product, req, res)) return;

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get brand product error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch product', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brand-products
 * 제품 생성
 */
router.post('/brand-products', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const {
      name, description, sku, unit, base_quantity, order_mode, unit_price,
      min_order_quantity, image_url, category_id, emoji,
      is_active, product_recipe_id, sort_order, brand_ids, restaurant_ids,
      distribution_mode, option_group_ids,
      is_set_menu, set_items, set_display_order,
      // 레시피 없는 프로덕트의 자체 재고(매장 메뉴와 같은 규칙)
      current_stock, stock_unit, min_stock
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Product name is required', code: 'VALIDATION_ERROR' } });
    }

    // Set menu validation
    if (is_set_menu) {
      if (!set_items || !Array.isArray(set_items) || set_items.length === 0) {
        return res.status(400).json({ success: false, error: { message: 'Set menu must have at least 1 item', code: 'VALIDATION_ERROR' } });
      }
      // Validate each set item
      for (const item of set_items) {
        if (!item.productId || !item.name || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ success: false, error: { message: 'Each set item must have productId, name, and quantity >= 1', code: 'VALIDATION_ERROR' } });
        }
      }
      // Prevent circular reference: set cannot contain other sets
      const referencedIds = set_items.map(i => i.productId);
      const referencedProducts = await BrandProduct.findAll({
        where: { id: referencedIds },
        attributes: ['id', 'is_set_menu']
      });
      if (referencedProducts.some(p => p.is_set_menu)) {
        return res.status(400).json({ success: false, error: { message: 'Set menu cannot contain other set menus', code: 'VALIDATION_ERROR' } });
      }
    }

    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }

    // ── 중복 등록 방지 ────────────────────────────────────────────────────────
    // 같은 물건이 이름만 바꿔 여러 번 등록되면 재고가 여러 칸으로 쪼개져 어느 것도 안 맞는다.
    // 규칙은 둘로 나뉜다(근거는 utils/brandProductDuplicate.js 주석):
    //   하드 차단 = SKU 또는 이름 완전일치 → 명백한 중복
    //   소프트    = 괄호 설명만 다른 변형 → 409 로 물어보되 `force: true` 로 통과 가능
    // 크기·용량이 다른 정당한 변형(L/M/S, 850CC vs 780CC)을 막지 않으려고, 느슨한 규칙은
    // **차단에 쓰지 않고** 제안 목록으로만 돌려준다.
    const { findDuplicateBrandProducts } = require('../utils/brandProductDuplicate');
    const dup = await findDuplicateBrandProducts({ ownerUserId: req.bgOwnerId, name, sku });
    if (dup.exact) {
      return res.status(409).json({
        success: false,
        error: {
          code: dup.exactReason,
          message: dup.exactReason === 'DUPLICATE_SKU'
            ? `SKU "${sku}" is already used by "${dup.exact.name}".`
            : `"${dup.exact.name}" already exists.`,
          existing: { id: dup.exact.id, name: dup.exact.name, sku: dup.exact.sku, unit: dup.exact.unit }
        }
      });
    }
    if (dup.similar && dup.similar.length && req.body.force !== true) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'SIMILAR_EXISTS',
          message: 'A very similar product already exists. Register anyway?',
          similar: dup.similar.map((r) => ({ id: r.id, name: r.name, sku: r.sku, unit: r.unit })),
          suggestions: (dup.suggestions || []).map((r) => ({ id: r.id, name: r.name, sku: r.sku, unit: r.unit }))
        }
      });
    }

    // Validate category belongs to same BG
    if (category_id) {
      const cat = await BrandProductCategory.findByPk(category_id);
      if (!cat || (cat.owner_user_id !== req.bgOwnerId && !req.bgOwnerIsAdmin)) {
        return res.status(400).json({ success: false, message: 'Invalid category_id' });
      }
    }

    // Auto-generate SKU if not provided
    const finalSku = sku || await generateProductSKU();

    // base64 inline → 디스크 파일 변환 (DB MEDIUMTEXT 비대화 방지)
    const normalizedImage = await normalizeImageField(image_url, {
      subdir: 'brand-products',
      filename: `brand_product_${req.bgOwnerId}_${Date.now()}`,
      maxWidth: 800, maxHeight: 800
    });

    // distribution_mode 결정 — 명시 또는 brand_ids/restaurant_ids 로 추론
    const VALID_MODES = ['all', 'specific_brands', 'specific_restaurants'];
    let finalMode = VALID_MODES.includes(distribution_mode) ? distribution_mode :
      (Array.isArray(restaurant_ids) && restaurant_ids.length > 0 ? 'specific_restaurants'
        : Array.isArray(brand_ids) && brand_ids.length > 0 ? 'specific_brands'
        : 'specific_brands');

    // Create product
    const product = await BrandProduct.create({
      owner_user_id: req.bgOwnerId,
      category_id: category_id || null,
      name: name.trim(),
      description: description || null,
      sku: finalSku,
      unit: unit || null,
      base_quantity: base_quantity || 1,
      // 안 보내면 'pack' = 지금까지의 동작. 값이 오면 목록 안에 있는지만 본다.
      order_mode: ORDER_MODES.includes(order_mode) ? order_mode : 'pack',
      unit_price: unit_price || 0,
      min_order_quantity: min_order_quantity || 1,
      image_url: normalizedImage,
      emoji: emoji || null,
      is_active: is_active !== false,
      distribution_mode: finalMode,
      is_set_menu: is_set_menu || false,
      set_items: is_set_menu ? set_items : null,
      set_display_order: set_display_order || 0,
      product_recipe_id: product_recipe_id || null,
      sort_order: sort_order || 0,
      // 레시피가 있으면 매입자재가 빠지므로 자체 재고는 쓰지 않는다(둘 중 하나).
      // 2026-09-01(Q5): 조건은 **레시피 유무 하나뿐**이다. 스위치는 없앴다 —
      // 스위치를 안 켰다고 산 물건이 재고에 안 들어오는 게 GIT 결함의 원인이었다.
      current_stock: !product_recipe_id ? (parseFloat(current_stock) || 0) : 0,
      min_stock: parseFloat(min_stock) || 0,
      stock_unit: stock_unit || null
    });

    // brand_ids → BrandProductBrand 매핑 (specific_brands 모드)
    const { BrandProductBrand, BrandProductRestaurant } = require('../models');
    if (finalMode === 'specific_brands' && Array.isArray(brand_ids) && brand_ids.length > 0) {
      for (const bid of brand_ids) {
        await BrandProductBrand.findOrCreate({ where: { product_id: product.id, brand_id: bid } });
      }
    }
    // restaurant_ids → BrandProductRestaurant 매핑 (specific_restaurants 모드)
    if (finalMode === 'specific_restaurants' && Array.isArray(restaurant_ids) && restaurant_ids.length > 0) {
      for (const rid of restaurant_ids) {
        await BrandProductRestaurant.findOrCreate({ where: { product_id: product.id, restaurant_id: rid } });
      }
    }

    // 옵션 그룹 연결
    if (option_group_ids && option_group_ids.length > 0) {
      for (const optionGroupId of option_group_ids) {
        await BrandProductOptionGroupProduct.create({
          product_id: product.id,
          option_group_id: optionGroupId
        });
      }
    }

    // Sync to ingredients table
    await syncProductToIngredients(product.id);

    // Auto-create ProductRecipe if directIngredients provided
    const directIngredients = req.body.directIngredients;
    if (directIngredients && Array.isArray(directIngredients) && directIngredients.length > 0 && !product.product_recipe_id) {
      // 레시피 생성 → 재료 → 프로덕트 연결을 한 덩어리로 묶는다.
      // 중간에 실패하면 전부 되돌린다 — 껍데기 레시피를 남기지 않는다.
      const t = await BrandProduct.sequelize.transaction();
      try {
        const { ProductRecipe, ProductRecipeIngredient, ProductIngredient } = require('../models');
        const recipe = await ProductRecipe.create({
          name: `${product.name} (auto)`,
          is_active: true,
          total_ingredient_cost: 0
        }, { transaction: t });
        let totalCost = 0;
        for (const di of directIngredients) {
          if (!di.ingredient_id || !di.quantity) continue;
          const ingredient = await ProductIngredient.findByPk(di.ingredient_id, { transaction: t });
          if (!ingredient) continue;
          const cost = parseFloat(ingredient.unit_cost || 0) * parseFloat(di.quantity);
          await ProductRecipeIngredient.create({
            recipe_id: recipe.id,
            ingredient_id: di.ingredient_id,
            quantity: di.quantity,
            unit: di.unit || ingredient.unit,
            cost: cost
          }, { transaction: t });
          totalCost += cost;
        }
        await recipe.update({ total_ingredient_cost: totalCost }, { transaction: t });
        await product.update({ product_recipe_id: recipe.id }, { transaction: t });
        await t.commit();
      } catch (recipeError) {
        await t.rollback();
        // 조용히 삼키지 않는다 — 실패가 화면에 보여야 사용자가 다시 넣을 수 있다.
        console.error('Auto ProductRecipe creation error:', recipeError.message);
        return res.status(400).json({
          success: false,
          message: `프로덕트는 저장됐지만 재료 연결에 실패했습니다: ${recipeError.message}`,
          data: product
        });
      }
    }

    // Fetch created product with associations
    const createdProduct = await BrandProduct.findByPk(product.id, {
      include: [
        { model: BrandProductCategory, as: 'category' },
        { model: Brand, as: 'brands', through: { attributes: [] } },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: BrandProductOption, as: 'options' }]
        },
        {
          model: ProductRecipe,
          as: 'productRecipe',
          attributes: ['id', 'name', 'total_ingredient_cost']
        }
      ]
    });

    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    console.error('Create brand product error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create product', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brand-products/:productId
 * 제품 수정
 */
router.put('/brand-products/:productId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      name, description, sku, unit, base_quantity, order_mode, unit_price,
      min_order_quantity, image_url, category_id, emoji,
      is_active, product_recipe_id, sort_order, brand_ids, restaurant_ids,
      distribution_mode, option_group_ids,
      is_set_menu, set_items, set_display_order,
      // 레시피 없는 프로덕트의 자체 재고(매장 메뉴와 같은 규칙)
      current_stock, stock_unit, min_stock
    } = req.body;

    const product = await BrandProduct.findByPk(productId);
    if (!assertBGOwnsRow(product, req, res)) return;

    // Set menu validation
    const finalIsSet = is_set_menu !== undefined ? is_set_menu : product.is_set_menu;
    if (finalIsSet && set_items !== undefined) {
      if (!Array.isArray(set_items) || set_items.length === 0) {
        return res.status(400).json({ success: false, error: { message: 'Set menu must have at least 1 item', code: 'VALIDATION_ERROR' } });
      }
      for (const item of set_items) {
        if (!item.productId || !item.name || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ success: false, error: { message: 'Each set item must have productId, name, and quantity >= 1', code: 'VALIDATION_ERROR' } });
        }
      }
      const referencedIds = set_items.map(i => i.productId);
      const referencedProducts = await BrandProduct.findAll({
        where: { id: referencedIds },
        attributes: ['id', 'is_set_menu']
      });
      if (referencedProducts.some(p => p.is_set_menu)) {
        return res.status(400).json({ success: false, error: { message: 'Set menu cannot contain other set menus', code: 'VALIDATION_ERROR' } });
      }
    }

    // base64 inline → 디스크 파일 변환 (DB MEDIUMTEXT 비대화 방지)
    const normalizedImage = await normalizeImageField(image_url, {
      subdir: 'brand-products',
      filename: `brand_product_${product.id}_${Date.now()}`,
      maxWidth: 800, maxHeight: 800
    });

    // distribution_mode resolution — 명시 또는 ids 로 추론, 기존 유지
    const VALID_MODES = ['all', 'specific_brands', 'specific_restaurants'];
    const finalMode = VALID_MODES.includes(distribution_mode) ? distribution_mode :
      (restaurant_ids !== undefined && Array.isArray(restaurant_ids) && restaurant_ids.length > 0 ? 'specific_restaurants'
        : brand_ids !== undefined && Array.isArray(brand_ids) && brand_ids.length > 0 ? 'specific_brands'
        : product.distribution_mode);

    // Update product
    await product.update({
      name: name !== undefined ? name.trim() : product.name,
      description: description !== undefined ? description : product.description,
      sku: sku !== undefined ? sku : product.sku,
      unit: unit !== undefined ? unit : product.unit,
      base_quantity: base_quantity !== undefined ? base_quantity : product.base_quantity,
      order_mode: ORDER_MODES.includes(order_mode) ? order_mode : product.order_mode,
      unit_price: unit_price !== undefined ? unit_price : product.unit_price,
      min_order_quantity: min_order_quantity !== undefined ? min_order_quantity : product.min_order_quantity,
      image_url: normalizedImage !== undefined ? normalizedImage : product.image_url,
      emoji: emoji !== undefined ? emoji : product.emoji,
      category_id: category_id !== undefined ? category_id : product.category_id,
      is_active: is_active !== undefined ? is_active : product.is_active,
      distribution_mode: finalMode,
      is_set_menu: is_set_menu !== undefined ? is_set_menu : product.is_set_menu,
      set_items: set_items !== undefined ? (finalIsSet ? set_items : null) : product.set_items,
      set_display_order: set_display_order !== undefined ? set_display_order : product.set_display_order,
      product_recipe_id: product_recipe_id !== undefined ? product_recipe_id : product.product_recipe_id,
      sort_order: sort_order !== undefined ? sort_order : product.sort_order,
      // 자체 재고 — 레시피가 붙으면 0 이다(둘 중 하나만 성립한다). 2026-09-01(Q5): 스위치 제거.
      current_stock: (product_recipe_id !== undefined ? product_recipe_id : product.product_recipe_id)
        ? 0
        : (current_stock !== undefined ? (parseFloat(current_stock) || 0) : product.current_stock),
      min_stock: min_stock !== undefined ? (parseFloat(min_stock) || 0) : product.min_stock,
      stock_unit: stock_unit !== undefined ? (stock_unit || null) : product.stock_unit
    });

    // 브랜드/지점 매핑 업데이트 — mode 별로 적절한 테이블만 갱신
    const { BrandProductBrand: BPB, BrandProductRestaurant: BPR } = require('../models');
    if (brand_ids !== undefined) {
      await BPB.destroy({ where: { product_id: productId } });
      if (finalMode === 'specific_brands' && Array.isArray(brand_ids)) {
        for (const bid of brand_ids) await BPB.create({ product_id: productId, brand_id: bid });
      }
    }
    if (restaurant_ids !== undefined) {
      await BPR.destroy({ where: { product_id: productId } });
      if (finalMode === 'specific_restaurants' && Array.isArray(restaurant_ids)) {
        for (const rid of restaurant_ids) await BPR.create({ product_id: productId, restaurant_id: rid });
      }
    }
    // mode 만 specific 으로 바뀌었는데 ids 안 보낸 경우, 다른 테이블 매핑 정리 (clean)
    if (distribution_mode === 'specific_brands' && restaurant_ids === undefined) {
      await BPR.destroy({ where: { product_id: productId } });
    }
    if (distribution_mode === 'specific_restaurants' && brand_ids === undefined) {
      await BPB.destroy({ where: { product_id: productId } });
    }
    if (distribution_mode === 'all') {
      await BPB.destroy({ where: { product_id: productId } });
      await BPR.destroy({ where: { product_id: productId } });
    }

    // Update option group links
    if (option_group_ids !== undefined) {
      await BrandProductOptionGroupProduct.destroy({ where: { product_id: productId } });
      if (option_group_ids && option_group_ids.length > 0) {
        for (const optionGroupId of option_group_ids) {
          await BrandProductOptionGroupProduct.create({
            product_id: productId,
            option_group_id: optionGroupId
          });
        }
      }
    }

    // Sync to ingredients table
    await syncProductToIngredients(productId);

    // Handle directIngredients for auto ProductRecipe
    const directIngredients = req.body.directIngredients;
    if (directIngredients && Array.isArray(directIngredients)) {
      // 🔴 여기는 기존 재료를 **먼저 지우고** 다시 넣는다.
      // 트랜잭션이 없으면 중간 실패 시 "지운 것만 남아" 쌓아둔 재료가 통째로 사라진다.
      const t = await BrandProduct.sequelize.transaction();
      try {
        const { ProductRecipe: PR, ProductRecipeIngredient: PRI, ProductIngredient: PI } = require('../models');
        const product = await BrandProduct.findByPk(productId, { transaction: t });
        if (directIngredients.length > 0) {
          let recipe;
          if (product.product_recipe_id) {
            recipe = await PR.findByPk(product.product_recipe_id, { transaction: t });
            if (recipe) await PRI.destroy({ where: { recipe_id: recipe.id }, transaction: t });
          }
          if (!recipe) {
            recipe = await PR.create({ name: `${product.name} (auto)`, is_active: true, total_ingredient_cost: 0 }, { transaction: t });
            await product.update({ product_recipe_id: recipe.id }, { transaction: t });
          }
          let totalCost = 0;
          for (const di of directIngredients) {
            if (!di.ingredient_id || !di.quantity) continue;
            const ingredient = await PI.findByPk(di.ingredient_id, { transaction: t });
            if (!ingredient) continue;
            const cost = parseFloat(ingredient.unit_cost || 0) * parseFloat(di.quantity);
            await PRI.create({ recipe_id: recipe.id, ingredient_id: di.ingredient_id, quantity: di.quantity, unit: di.unit || ingredient.unit, cost }, { transaction: t });
            totalCost += cost;
          }
          await recipe.update({ total_ingredient_cost: totalCost, name: `${product.name} (auto)` }, { transaction: t });
        } else if (product.product_recipe_id) {
          const recipe = await PR.findByPk(product.product_recipe_id, { transaction: t });
          if (recipe && recipe.name.endsWith('(auto)')) {
            await PRI.destroy({ where: { recipe_id: recipe.id }, transaction: t });
            await recipe.destroy({ transaction: t });
            await product.update({ product_recipe_id: null }, { transaction: t });
          }
        }
        await t.commit();
      } catch (recipeError) {
        await t.rollback();
        // 조용히 삼키지 않는다 — 삼키면 "저장됐는데 재료가 사라졌다"가 된다.
        console.error('Auto ProductRecipe update error:', recipeError.message);
        return res.status(400).json({
          success: false,
          message: `프로덕트는 저장됐지만 재료 수정에 실패했습니다: ${recipeError.message}`
        });
      }
    }

    // Fetch updated product with associations
    const updatedProduct = await BrandProduct.findByPk(productId, {
      include: [
        { model: BrandProductCategory, as: 'category' },
        { model: Brand, as: 'brands', through: { attributes: [] } },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [{ model: BrandProductOption, as: 'options' }]
        },
        {
          model: ProductRecipe,
          as: 'productRecipe',
          attributes: ['id', 'name', 'total_ingredient_cost']
        }
      ]
    });

    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Update brand product error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update product', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/brand-products/:productId
 * 제품 삭제
 */
router.delete('/brand-products/:productId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await BrandProduct.findByPk(productId);
    if (!assertBGOwnsRow(product, req, res)) return;

    // Delete auto recipe if exists
    if (product.product_recipe_id) {
      const { ProductRecipe: PR, ProductRecipeIngredient: PRI } = require('../models');
      const recipe = await PR.findByPk(product.product_recipe_id);
      if (recipe && recipe.name && recipe.name.endsWith('(auto)')) {
        await PRI.destroy({ where: { recipe_id: recipe.id } });
        await recipe.destroy();
      }
    }

    // Delete linked ingredients first
    await Ingredient.destroy({ where: { brand_product_id: productId } });

    // Delete link tables — incl. distribution tables (brand_product_brands /
    // brand_product_restaurants) whose FK previously blocked the delete with a 500.
    await BrandProductOptionGroupProduct.destroy({ where: { product_id: productId } });
    const { BrandProductBrand, BrandProductRestaurant } = require('../models');
    await BrandProductBrand.destroy({ where: { product_id: productId } });
    await BrandProductRestaurant.destroy({ where: { product_id: productId } });

    await product.destroy();

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete brand product error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete product', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brand-products/:productId/copy
 * Duplicate a product
 */
router.post('/brand-products/:productId/copy', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;

    const original = await BrandProduct.findByPk(productId, {
      include: [
        { model: Brand, as: 'brands', through: { attributes: [] } },
        { model: BrandProductOptionGroup, as: 'optionGroups', through: { attributes: [] } }
      ]
    });

    if (!assertBGOwnsRow(original, req, res)) return;

    const newSku = await generateProductSKU();

    const copy = await BrandProduct.create({
      owner_user_id: original.owner_user_id,
      category_id: original.category_id,
      name: `${original.name} (Copy)`,
      description: original.description,
      sku: newSku,
      unit: original.unit,
      base_quantity: original.base_quantity,
      unit_price: original.unit_price,
      min_order_quantity: original.min_order_quantity,
      image_url: original.image_url,
      emoji: original.emoji,
      is_active: true,
      is_set_menu: original.is_set_menu,
      set_items: original.set_items,
      set_display_order: original.set_display_order,
      sort_order: original.sort_order,
      distribution_mode: original.distribution_mode,
      product_recipe_id: original.product_recipe_id
    });

    // Copy option group links
    if (original.optionGroups && original.optionGroups.length > 0) {
      for (const og of original.optionGroups) {
        await BrandProductOptionGroupProduct.create({ product_id: copy.id, option_group_id: og.id });
      }
    }

    // Copy distribution links (brand + restaurant) so the duplicate is distributed
    // to the same targets as the original instead of nowhere.
    const { BrandProductBrand: BPB, BrandProductRestaurant: BPR } = require('../models');
    const [brandLinks, restLinks] = await Promise.all([
      BPB.findAll({ where: { product_id: productId }, attributes: ['brand_id'] }),
      BPR.findAll({ where: { product_id: productId }, attributes: ['restaurant_id'] })
    ]);
    for (const bl of brandLinks) await BPB.create({ product_id: copy.id, brand_id: bl.brand_id });
    for (const rl of restLinks) await BPR.create({ product_id: copy.id, restaurant_id: rl.restaurant_id });

    // Sync to ingredients
    await syncProductToIngredients(copy.id);

    const createdProduct = await BrandProduct.findByPk(copy.id, {
      include: [
        { model: BrandProductCategory, as: 'category' },
        { model: Brand, as: 'brands', through: { attributes: [] } },
        { model: BrandProductOptionGroup, as: 'optionGroups', through: { attributes: [] }, include: [{ model: BrandProductOption, as: 'options' }] },
        { model: ProductRecipe, as: 'productRecipe', attributes: ['id', 'name', 'total_ingredient_cost'] }
      ]
    });

    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    console.error('Copy brand product error:', error);
    res.status(500).json({ success: false, message: 'Failed to copy product' });
  }
});

/**
 * PUT /api/brand-products/:productId/toggle-active
 * Toggle product active status
 */
router.put('/brand-products/:productId/toggle-active', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await BrandProduct.findByPk(productId);
    if (!assertBGOwnsRow(product, req, res)) return;

    await product.update({ is_active: !product.is_active });

    // Sync to ingredients
    await syncProductToIngredients(productId);

    res.json({
      success: true,
      data: { id: product.id, is_active: product.is_active },
      message: product.is_active ? 'Product activated' : 'Product deactivated'
    });
  } catch (error) {
    console.error('Toggle brand product active error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle product status' });
  }
});

// ============================================
// 브랜드별 제품 조회 (레시피/발주용)
// ============================================

/**
 * GET /api/brands/:brandId/products
 * 특정 브랜드에 연결된 제품 목록 조회
 */
router.get('/brands/:brandId/products', authenticateToken, async (req, res) => {
  try {
    const { brandId } = req.params;

    // Resolve BG owner and verify caller owns this brand
    const brand = await Brand.findByPk(brandId, { attributes: ['owner_id'] });
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    // Brand-products are BG-scoped (shared across BG's brands)
    const products = await BrandProduct.findAll({
      where: brand.owner_id != null ? { owner_user_id: brand.owner_id } : {},
      include: [
        {
          model: BrandProductCategory,
          as: 'category',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          through: { attributes: [] },
          include: [
            {
              model: BrandProductOption,
              as: 'options'
            }
          ]
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get brand products error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch products', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Brand Product Recipe Management
// ============================================

/**
 * GET /api/brand-products/:productId/recipe
 * Get product with recipe details
 */
router.get('/brand-products/:productId/recipe', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await BrandProduct.findByPk(productId, {
      include: [
        {
          model: Recipe,
          as: 'recipe',
          include: [{
            model: RecipeIngredient,
            as: 'recipeIngredients',
            include: [{
              model: Ingredient,
              as: 'ingredient',
              attributes: ['id', 'name', 'unit', 'unit_cost', 'category', 'current_stock']
            }]
          }]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Calculate total ingredient cost if recipe exists
    let totalCost = 0;
    if (product.recipe && product.recipe.recipeIngredients) {
      product.recipe.recipeIngredients.forEach(ri => {
        if (ri.ingredient) {
          const ingredientCost = parseFloat(ri.ingredient.unit_cost) * parseFloat(ri.quantity);
          totalCost += ingredientCost;
        }
      });
    }

    res.json({
      success: true,
      data: {
        product: {
          id: product.id,
          name: product.name,
          unit_price: product.unit_price,
          category: product.category,
          recipe_id: product.recipe_id
        },
        recipe: product.recipe ? {
          id: product.recipe.id,
          name: product.recipe.name,
          description: product.recipe.description,
          prep_time: product.recipe.prep_time,
          cook_time: product.recipe.cook_time,
          total_ingredient_cost: totalCost,
          ingredients: product.recipe.recipeIngredients?.map(ri => ({
            id: ri.id,
            ingredient_id: ri.ingredient_id,
            ingredient_name: ri.ingredient?.name,
            quantity: parseFloat(ri.quantity),
            unit: ri.unit,
            unit_cost: parseFloat(ri.ingredient?.unit_cost || 0),
            total_cost: parseFloat(ri.ingredient?.unit_cost || 0) * parseFloat(ri.quantity),
            current_stock: parseFloat(ri.ingredient?.current_stock || 0),
            notes: ri.notes
          })) || []
        } : null
      }
    });
  } catch (error) {
    console.error('Error fetching product recipe:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product recipe' });
  }
});

/**
 * PUT /api/brand-products/:productId/recipe
 * Link/unlink recipe to product
 */
router.put('/brand-products/:productId/recipe', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;
    const { recipe_id } = req.body;

    const product = await BrandProduct.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // If recipe_id is provided, verify it exists
    if (recipe_id) {
      const recipe = await Recipe.findByPk(recipe_id);
      if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' });
      }
    }

    await product.update({ recipe_id: recipe_id || null });

    res.json({
      success: true,
      message: recipe_id ? 'Recipe linked successfully' : 'Recipe unlinked successfully',
      data: { product_id: productId, recipe_id }
    });
  } catch (error) {
    console.error('Error updating product recipe:', error);
    res.status(500).json({ success: false, message: 'Failed to update product recipe' });
  }
});

/**
 * POST /api/brand-products/:productId/recipe
 * Create inline recipe for a product (creates recipe and links it)
 */
router.post('/brand-products/:productId/recipe', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, ingredients, prep_time, cook_time } = req.body;

    const product = await BrandProduct.findByPk(productId, {
      include: [{ model: Brand, as: 'brands', through: { attributes: [] } }]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get brand_id from the product's first linked brand
    const brandId = product.brands && product.brands.length > 0 ? product.brands[0].id : null;

    // Create recipe
    const recipe = await Recipe.create({
      owner_type: 'brand',
      brand_id: brandId,
      restaurant_id: null,
      name: name || product.name,
      description,
      prep_time,
      cook_time,
      is_active: true
    });

    // Add ingredients if provided
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        // Get ingredient unit cost
        const ingredient = await Ingredient.findByPk(ing.ingredient_id);
        const cost = ingredient ? parseFloat(ingredient.unit_cost) * parseFloat(ing.quantity) : 0;
        totalCost += cost;

        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity,
          unit: ing.unit,
          cost,
          notes: ing.notes
        });
      }

      // Update recipe total cost
      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // Link recipe to product
    await product.update({ recipe_id: recipe.id });

    res.json({
      success: true,
      message: 'Recipe created and linked successfully',
      data: {
        product_id: productId,
        recipe_id: recipe.id,
        recipe_name: recipe.name,
        total_ingredient_cost: totalCost
      }
    });
  } catch (error) {
    console.error('Error creating product recipe:', error);
    res.status(500).json({ success: false, message: 'Failed to create product recipe' });
  }
});

/**
 * PUT /api/brand-products/:productId/recipe/ingredients
 * Update recipe ingredients for a product's recipe
 */
router.put('/brand-products/:productId/recipe/ingredients', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { productId } = req.params;
    const { ingredients } = req.body;

    const product = await BrandProduct.findByPk(productId);

    if (!product || !product.recipe_id) {
      return res.status(404).json({ success: false, message: 'Product or recipe not found' });
    }

    const recipeId = product.recipe_id;

    // Delete existing ingredients
    await RecipeIngredient.destroy({
      where: { recipe_id: recipeId }
    });

    // Add new ingredients
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        const ingredient = await Ingredient.findByPk(ing.ingredient_id);
        const cost = ingredient ? parseFloat(ingredient.unit_cost) * parseFloat(ing.quantity) : 0;
        totalCost += cost;

        await RecipeIngredient.create({
          recipe_id: recipeId,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity,
          unit: ing.unit,
          cost,
          notes: ing.notes
        });
      }
    }

    // Update recipe total cost
    await Recipe.update(
      { total_ingredient_cost: totalCost },
      { where: { id: recipeId } }
    );

    res.json({
      success: true,
      message: 'Recipe ingredients updated successfully',
      data: {
        recipe_id: recipeId,
        total_ingredient_cost: totalCost,
        ingredient_count: ingredients?.length || 0
      }
    });
  } catch (error) {
    console.error('Error updating recipe ingredients:', error);
    res.status(500).json({ success: false, message: 'Failed to update recipe ingredients' });
  }
});

// NOTE: GET /api/brands/:brandId/recipes is handled by recipes.js
// Removed duplicate route that was limiting response fields

module.exports = router;
module.exports.syncProductToIngredients = syncProductToIngredients;
