const express = require('express');
const router = express.Router();
const {
  BrandProduct,
  BrandProductCategory,
  BrandProductOptionGroup,
  BrandProductOption,
  BrandProductBrand,
  BrandProductOptionGroupProduct,
  Brand,
  Ingredient,
  Recipe,
  RecipeIngredient,
  ProductRecipe
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');

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

    // If sync_to_ingredients is false, remove any existing linked ingredients
    if (!product.sync_to_ingredients) {
      await Ingredient.destroy({ where: { brand_product_id: productId } });
      return;
    }

    if (!product.brands || product.brands.length === 0) {
      return;
    }

    // For each linked brand, create or update ingredient
    for (const brand of product.brands) {
      let ingredient = await Ingredient.findOne({
        where: {
          brand_product_id: productId,
          brand_id: brand.id
        }
      });

      const ingredientData = {
        owner_type: 'brand',
        brand_id: brand.id,
        restaurant_id: null,
        brand_product_id: productId,
        code: product.sku || null,
        name: product.name,
        image_url: product.image_url || null,
        category: 'other',
        unit: product.unit || 'piece',
        base_quantity: product.base_quantity || 1,
        unit_cost: product.unit_price || 0,
        supplier_name: null,
        min_stock: 0,
        current_stock: 0,
        is_active: product.is_active
      };

      if (ingredient) {
        await ingredient.update(ingredientData);
      } else {
        await Ingredient.create(ingredientData);
      }
    }

    // Remove ingredients for brands that are no longer linked
    const linkedBrandIds = product.brands.map(b => b.id);
    await Ingredient.destroy({
      where: {
        brand_product_id: productId,
        brand_id: { [require('sequelize').Op.notIn]: linkedBrandIds }
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
router.get('/brand-product-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const categories = await BrandProductCategory.findAll({
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
    res.status(500).json({ error: 'Failed to fetch product categories' });
  }
});

/**
 * POST /api/brand-product-categories
 * Create product category
 */
router.post('/brand-product-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { name, description, emoji, sort_order, is_active } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Duplicate check
    const existing = await BrandProductCategory.findOne({
      where: { name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ error: 'A category with this name already exists' });
    }

    // Auto-set sort_order
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await BrandProductCategory.max('sort_order');
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const category = await BrandProductCategory.create({
      name: name.trim(),
      description: description || null,
      emoji: emoji || null,
      sort_order: finalSortOrder,
      is_active: is_active !== false
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Create brand product category error:', error);
    res.status(500).json({ error: 'Failed to create product category' });
  }
});

/**
 * PUT /api/brand-product-categories/:categoryId
 * Update product category
 */
router.put('/brand-product-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, emoji, sort_order, is_active } = req.body;

    const category = await BrandProductCategory.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check name duplicate (excluding self)
    if (name && name.trim() !== category.name) {
      const existing = await BrandProductCategory.findOne({
        where: { name: name.trim() }
      });
      if (existing && existing.id !== parseInt(categoryId)) {
        return res.status(400).json({ error: 'A category with this name already exists' });
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
    res.status(500).json({ error: 'Failed to update product category' });
  }
});

/**
 * DELETE /api/brand-product-categories/:categoryId
 * Delete product category
 */
router.delete('/brand-product-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await BrandProductCategory.findByPk(categoryId, {
      include: [{ model: BrandProduct, as: 'products' }]
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (category.products && category.products.length > 0) {
      return res.status(400).json({
        error: 'This category has products. Please delete or move products first.'
      });
    }

    await category.destroy();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete brand product category error:', error);
    res.status(500).json({ error: 'Failed to delete product category' });
  }
});

/**
 * PUT /api/brand-product-categories/:categoryId/reorder
 * Reorder product category
 */
router.put('/brand-product-categories/:categoryId/reorder', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { direction } = req.body;

    if (!direction || !['up', 'down'].includes(direction)) {
      return res.status(400).json({ error: 'direction must be up or down' });
    }

    const category = await BrandProductCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const allCategories = await BrandProductCategory.findAll({
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    const currentIndex = allCategories.findIndex(c => c.id === parseInt(categoryId));
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= allCategories.length) {
      return res.status(400).json({ error: 'Cannot move further' });
    }

    const targetCategory = allCategories[targetIndex];
    const tempOrder = category.sort_order;
    await category.update({ sort_order: targetCategory.sort_order });
    await targetCategory.update({ sort_order: tempOrder });

    res.json({ success: true, message: 'Order changed successfully' });
  } catch (error) {
    console.error('Reorder brand product category error:', error);
    res.status(500).json({ error: 'Failed to reorder category' });
  }
});

// ============================================
// Option Groups (unified management - brand/product independent)
// ============================================

/**
 * GET /api/brand-product-option-groups
 * Get all option groups
 */
router.get('/brand-product-option-groups', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const optionGroups = await BrandProductOptionGroup.findAll({
      include: [
        {
          model: BrandProductOption,
          as: 'options',
          order: [['sort_order', 'ASC']]
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: optionGroups });
  } catch (error) {
    console.error('Get option groups error:', error);
    res.status(500).json({ error: 'Failed to fetch option groups' });
  }
});

/**
 * POST /api/brand-product-option-groups
 * Create option group
 */
router.post('/brand-product-option-groups', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Option group name is required' });
    }

    // Auto-set sort_order
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await BrandProductOptionGroup.max('sort_order');
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const optionGroup = await BrandProductOptionGroup.create({
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
        await BrandProductOption.create({
          option_group_id: optionGroup.id,
          name: opt.name,
          price_adjustment: opt.price_adjustment || 0,
          sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
          is_active: opt.is_active !== false
        });
      }
    }

    // 생성된 옵션 그룹 다시 조회
    const createdGroup = await BrandProductOptionGroup.findByPk(optionGroup.id, {
      include: [{ model: BrandProductOption, as: 'options' }]
    });

    res.status(201).json({ success: true, data: createdGroup });
  } catch (error) {
    console.error('Create option group error:', error);
    res.status(500).json({ error: 'Failed to create option group' });
  }
});

/**
 * PUT /api/brand-product-option-groups/:groupId
 * 옵션 그룹 수정
 */
router.put('/brand-product-option-groups/:groupId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    const optionGroup = await BrandProductOptionGroup.findByPk(groupId);

    if (!optionGroup) {
      return res.status(404).json({ error: '옵션 그룹을 찾을 수 없습니다' });
    }

    await optionGroup.update({
      name: name !== undefined ? name.trim() : optionGroup.name,
      is_required: is_required !== undefined ? is_required : optionGroup.is_required,
      min_selections: min_selections !== undefined ? min_selections : optionGroup.min_selections,
      max_selections: max_selections !== undefined ? max_selections : optionGroup.max_selections,
      sort_order: sort_order !== undefined ? sort_order : optionGroup.sort_order
    });

    // 옵션 업데이트 (전체 교체)
    if (options !== undefined) {
      await BrandProductOption.destroy({
        where: { option_group_id: groupId }
      });

      if (options && options.length > 0) {
        for (let j = 0; j < options.length; j++) {
          const opt = options[j];
          await BrandProductOption.create({
            option_group_id: groupId,
            name: opt.name,
            price_adjustment: opt.price_adjustment || 0,
            sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
            is_active: opt.is_active !== false
          });
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
    res.status(500).json({ error: 'Failed to update option group' });
  }
});

/**
 * DELETE /api/brand-product-option-groups/:groupId
 * 옵션 그룹 삭제
 */
router.delete('/brand-product-option-groups/:groupId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { groupId } = req.params;

    const optionGroup = await BrandProductOptionGroup.findByPk(groupId);

    if (!optionGroup) {
      return res.status(404).json({ error: '옵션 그룹을 찾을 수 없습니다' });
    }

    // 제품에 연결되어 있는지 확인
    const linkedProducts = await BrandProductOptionGroupProduct.count({
      where: { option_group_id: groupId }
    });

    if (linkedProducts > 0) {
      return res.status(400).json({
        error: `이 옵션 그룹이 ${linkedProducts}개 제품에 연결되어 있습니다. 먼저 제품에서 연결을 해제해주세요.`
      });
    }

    await optionGroup.destroy();

    res.json({ success: true, message: '옵션 그룹이 삭제되었습니다' });
  } catch (error) {
    console.error('Delete option group error:', error);
    res.status(500).json({ error: 'Failed to delete option group' });
  }
});

// ============================================
// Products (통합 관리)
// ============================================

/**
 * GET /api/brand-products
 * 제품 전체 목록 조회
 */
router.get('/brand-products', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { category_id, is_active } = req.query;

    const where = {};
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
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /api/brand-products/:productId
 * 제품 상세 조회
 */
router.get('/brand-products/:productId', authenticateToken, isBrandManager, async (req, res) => {
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

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get brand product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * POST /api/brand-products
 * 제품 생성
 */
router.post('/brand-products', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const {
      name, description, sku, unit, base_quantity, unit_price,
      min_order_quantity, image_url, category_id,
      is_active, product_recipe_id, sort_order, brand_ids, option_group_ids
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    // Auto-generate SKU if not provided
    const finalSku = sku || await generateProductSKU();

    // Create product
    const product = await BrandProduct.create({
      category_id: category_id || null,
      name: name.trim(),
      description: description || null,
      sku: finalSku,
      unit: unit || null,
      base_quantity: base_quantity || 1,
      unit_price: unit_price || 0,
      min_order_quantity: min_order_quantity || 1,
      image_url: image_url || null,
      is_active: is_active !== false,
      product_recipe_id: product_recipe_id || null,
      sort_order: sort_order || 0
    });

    // 브랜드 연결
    if (brand_ids && brand_ids.length > 0) {
      for (const brandId of brand_ids) {
        await BrandProductBrand.create({
          product_id: product.id,
          brand_id: brandId
        });
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
    res.status(500).json({ error: 'Failed to create product' });
  }
});

/**
 * PUT /api/brand-products/:productId
 * 제품 수정
 */
router.put('/brand-products/:productId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      name, description, sku, unit, base_quantity, unit_price,
      min_order_quantity, image_url, category_id,
      is_active, product_recipe_id, sort_order, brand_ids, option_group_ids
    } = req.body;

    const product = await BrandProduct.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product
    await product.update({
      name: name !== undefined ? name.trim() : product.name,
      description: description !== undefined ? description : product.description,
      sku: sku !== undefined ? sku : product.sku,
      unit: unit !== undefined ? unit : product.unit,
      base_quantity: base_quantity !== undefined ? base_quantity : product.base_quantity,
      unit_price: unit_price !== undefined ? unit_price : product.unit_price,
      min_order_quantity: min_order_quantity !== undefined ? min_order_quantity : product.min_order_quantity,
      image_url: image_url !== undefined ? image_url : product.image_url,
      category_id: category_id !== undefined ? category_id : product.category_id,
      is_active: is_active !== undefined ? is_active : product.is_active,
      product_recipe_id: product_recipe_id !== undefined ? product_recipe_id : product.product_recipe_id,
      sort_order: sort_order !== undefined ? sort_order : product.sort_order
    });

    // 브랜드 연결 업데이트
    if (brand_ids !== undefined) {
      await BrandProductBrand.destroy({ where: { product_id: productId } });
      if (brand_ids && brand_ids.length > 0) {
        for (const brandId of brand_ids) {
          await BrandProductBrand.create({
            product_id: productId,
            brand_id: brandId
          });
        }
      }
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
    res.status(500).json({ error: 'Failed to update product' });
  }
});

/**
 * DELETE /api/brand-products/:productId
 * 제품 삭제
 */
router.delete('/brand-products/:productId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await BrandProduct.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    // Delete linked ingredients first
    await Ingredient.destroy({ where: { brand_product_id: productId } });

    // Delete link tables
    await BrandProductBrand.destroy({ where: { product_id: productId } });
    await BrandProductOptionGroupProduct.destroy({ where: { product_id: productId } });

    await product.destroy();

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete brand product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
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

    const products = await BrandProduct.findAll({
      include: [
        {
          model: Brand,
          as: 'brands',
          where: { id: brandId },
          attributes: [],
          through: { attributes: [] }
        },
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
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ============================================
// Brand Product Recipe Management
// ============================================

/**
 * GET /api/brand-products/:productId/recipe
 * Get product with recipe details
 */
router.get('/brand-products/:productId/recipe', authenticateToken, isBrandManager, async (req, res) => {
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
router.put('/brand-products/:productId/recipe', authenticateToken, isBrandManager, async (req, res) => {
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
router.post('/brand-products/:productId/recipe', authenticateToken, isBrandManager, async (req, res) => {
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
router.put('/brand-products/:productId/recipe/ingredients', authenticateToken, isBrandManager, async (req, res) => {
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
