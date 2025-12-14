const express = require('express');
const router = express.Router();
const {
  BrandProduct,
  BrandProductCategory,
  BrandProductOptionGroup,
  BrandProductOption,
  Brand
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Product Categories
// ============================================

/**
 * GET /api/brands/:brandId/product-categories
 * 브랜드 제품 카테고리 목록 조회
 */
router.get('/brands/:brandId/product-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;

    const categories = await BrandProductCategory.findAll({
      where: { brand_id: brandId },
      include: [
        {
          model: BrandProduct,
          as: 'products',
          attributes: ['id']
        }
      ],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    // product_count 추가
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
 * POST /api/brands/:brandId/product-categories
 * 브랜드 제품 카테고리 생성
 */
router.post('/brands/:brandId/product-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { name, description, emoji, sort_order, is_active } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: '카테고리 이름은 필수입니다' });
    }

    // 중복 체크
    const existing = await BrandProductCategory.findOne({
      where: { brand_id: brandId, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ error: '동일한 이름의 카테고리가 이미 존재합니다' });
    }

    // sort_order 자동 설정
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await BrandProductCategory.max('sort_order', {
        where: { brand_id: brandId }
      });
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const category = await BrandProductCategory.create({
      brand_id: brandId,
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
 * PUT /api/brands/:brandId/product-categories/:categoryId
 * 브랜드 제품 카테고리 수정
 */
router.put('/brands/:brandId/product-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;
    const { name, description, emoji, sort_order, is_active } = req.body;

    const category = await BrandProductCategory.findOne({
      where: { id: categoryId, brand_id: brandId }
    });

    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 이름 중복 체크 (자기 자신 제외)
    if (name && name.trim() !== category.name) {
      const existing = await BrandProductCategory.findOne({
        where: { brand_id: brandId, name: name.trim() }
      });
      if (existing && existing.id !== parseInt(categoryId)) {
        return res.status(400).json({ error: '동일한 이름의 카테고리가 이미 존재합니다' });
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
 * DELETE /api/brands/:brandId/product-categories/:categoryId
 * 브랜드 제품 카테고리 삭제
 */
router.delete('/brands/:brandId/product-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;

    const category = await BrandProductCategory.findOne({
      where: { id: categoryId, brand_id: brandId },
      include: [{ model: BrandProduct, as: 'products' }]
    });

    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 카테고리에 제품이 있는지 확인
    if (category.products && category.products.length > 0) {
      return res.status(400).json({
        error: '이 카테고리에 제품이 있습니다. 먼저 제품을 삭제하거나 다른 카테고리로 이동해주세요.'
      });
    }

    await category.destroy();
    res.json({ success: true, message: '카테고리가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand product category error:', error);
    res.status(500).json({ error: 'Failed to delete product category' });
  }
});

// ============================================
// Brand Products
// ============================================

/**
 * GET /api/brands/:brandId/products
 * 브랜드 제품 목록 조회
 */
router.get('/brands/:brandId/products', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { category_id, is_active } = req.query;

    const where = { brand_id: brandId };
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
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          include: [
            {
              model: BrandProductOption,
              as: 'options',
              order: [['sort_order', 'ASC']]
            }
          ],
          order: [['sort_order', 'ASC']]
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
 * GET /api/brands/:brandId/products/:productId
 * 브랜드 제품 상세 조회
 */
router.get('/brands/:brandId/products/:productId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, productId } = req.params;

    const product = await BrandProduct.findOne({
      where: { id: productId, brand_id: brandId },
      include: [
        {
          model: BrandProductCategory,
          as: 'category'
        },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          include: [
            {
              model: BrandProductOption,
              as: 'options',
              order: [['sort_order', 'ASC']]
            }
          ],
          order: [['sort_order', 'ASC']]
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
 * POST /api/brands/:brandId/products
 * 브랜드 제품 생성
 */
router.post('/brands/:brandId/products', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const {
      name, description, sku, unit, unit_price,
      min_order_quantity, image_url, category_id,
      is_active, sort_order, optionGroups
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: '제품명은 필수입니다' });
    }

    // 제품 생성
    const product = await BrandProduct.create({
      brand_id: brandId,
      category_id: category_id || null,
      name: name.trim(),
      description: description || null,
      sku: sku || null,
      unit: unit || null,
      unit_price: unit_price || 0,
      min_order_quantity: min_order_quantity || 1,
      image_url: image_url || null,
      is_active: is_active !== false,
      sort_order: sort_order || 0
    });

    // 옵션 그룹 및 옵션 생성
    if (optionGroups && optionGroups.length > 0) {
      for (let i = 0; i < optionGroups.length; i++) {
        const og = optionGroups[i];
        const optionGroup = await BrandProductOptionGroup.create({
          product_id: product.id,
          name: og.name,
          is_required: og.is_required || false,
          min_selections: og.min_selections || 0,
          max_selections: og.max_selections || 1,
          sort_order: og.sort_order !== undefined ? og.sort_order : i
        });

        if (og.options && og.options.length > 0) {
          for (let j = 0; j < og.options.length; j++) {
            const opt = og.options[j];
            await BrandProductOption.create({
              option_group_id: optionGroup.id,
              name: opt.name,
              price_adjustment: opt.price_adjustment || 0,
              sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
              is_active: opt.is_active !== false
            });
          }
        }
      }
    }

    // 생성된 제품 다시 조회 (옵션 포함)
    const createdProduct = await BrandProduct.findByPk(product.id, {
      include: [
        { model: BrandProductCategory, as: 'category' },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          include: [{ model: BrandProductOption, as: 'options' }]
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
 * PUT /api/brands/:brandId/products/:productId
 * 브랜드 제품 수정
 */
router.put('/brands/:brandId/products/:productId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, productId } = req.params;
    const {
      name, description, sku, unit, unit_price,
      min_order_quantity, image_url, category_id,
      is_active, sort_order, optionGroups
    } = req.body;

    const product = await BrandProduct.findOne({
      where: { id: productId, brand_id: brandId }
    });

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    // 제품 기본 정보 업데이트
    await product.update({
      name: name !== undefined ? name.trim() : product.name,
      description: description !== undefined ? description : product.description,
      sku: sku !== undefined ? sku : product.sku,
      unit: unit !== undefined ? unit : product.unit,
      unit_price: unit_price !== undefined ? unit_price : product.unit_price,
      min_order_quantity: min_order_quantity !== undefined ? min_order_quantity : product.min_order_quantity,
      image_url: image_url !== undefined ? image_url : product.image_url,
      category_id: category_id !== undefined ? category_id : product.category_id,
      is_active: is_active !== undefined ? is_active : product.is_active,
      sort_order: sort_order !== undefined ? sort_order : product.sort_order
    });

    // 옵션 그룹 업데이트 (전체 교체 방식)
    if (optionGroups !== undefined) {
      // 기존 옵션 그룹 삭제 (CASCADE로 옵션도 삭제됨)
      await BrandProductOptionGroup.destroy({
        where: { product_id: productId }
      });

      // 새 옵션 그룹 생성
      if (optionGroups && optionGroups.length > 0) {
        for (let i = 0; i < optionGroups.length; i++) {
          const og = optionGroups[i];
          const optionGroup = await BrandProductOptionGroup.create({
            product_id: product.id,
            name: og.name,
            is_required: og.is_required || false,
            min_selections: og.min_selections || 0,
            max_selections: og.max_selections || 1,
            sort_order: og.sort_order !== undefined ? og.sort_order : i
          });

          if (og.options && og.options.length > 0) {
            for (let j = 0; j < og.options.length; j++) {
              const opt = og.options[j];
              await BrandProductOption.create({
                option_group_id: optionGroup.id,
                name: opt.name,
                price_adjustment: opt.price_adjustment || 0,
                sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
                is_active: opt.is_active !== false
              });
            }
          }
        }
      }
    }

    // 업데이트된 제품 다시 조회
    const updatedProduct = await BrandProduct.findByPk(productId, {
      include: [
        { model: BrandProductCategory, as: 'category' },
        {
          model: BrandProductOptionGroup,
          as: 'optionGroups',
          include: [{ model: BrandProductOption, as: 'options' }]
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
 * DELETE /api/brands/:brandId/products/:productId
 * 브랜드 제품 삭제
 */
router.delete('/brands/:brandId/products/:productId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, productId } = req.params;

    const product = await BrandProduct.findOne({
      where: { id: productId, brand_id: brandId }
    });

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    // 옵션 그룹/옵션은 CASCADE로 자동 삭제
    await product.destroy();

    res.json({ success: true, message: '제품이 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ============================================
// Brand Product Option Groups (별도 관리)
// ============================================

/**
 * POST /api/brands/:brandId/products/:productId/option-groups
 * 옵션 그룹 추가
 */
router.post('/brands/:brandId/products/:productId/option-groups', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, productId } = req.params;
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    // 제품 존재 확인
    const product = await BrandProduct.findOne({
      where: { id: productId, brand_id: brandId }
    });

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ error: '옵션 그룹명은 필수입니다' });
    }

    // sort_order 자동 설정
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await BrandProductOptionGroup.max('sort_order', {
        where: { product_id: productId }
      });
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const optionGroup = await BrandProductOptionGroup.create({
      product_id: productId,
      name: name.trim(),
      is_required: is_required || false,
      min_selections: min_selections || 0,
      max_selections: max_selections || 1,
      sort_order: finalSortOrder
    });

    // 옵션 생성
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
 * PUT /api/brands/:brandId/products/:productId/option-groups/:groupId
 * 옵션 그룹 수정
 */
router.put('/brands/:brandId/products/:productId/option-groups/:groupId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, productId, groupId } = req.params;
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    // 제품 존재 확인
    const product = await BrandProduct.findOne({
      where: { id: productId, brand_id: brandId }
    });

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    const optionGroup = await BrandProductOptionGroup.findOne({
      where: { id: groupId, product_id: productId }
    });

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
 * DELETE /api/brands/:brandId/products/:productId/option-groups/:groupId
 * 옵션 그룹 삭제
 */
router.delete('/brands/:brandId/products/:productId/option-groups/:groupId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, productId, groupId } = req.params;

    // 제품 존재 확인
    const product = await BrandProduct.findOne({
      where: { id: productId, brand_id: brandId }
    });

    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    }

    const optionGroup = await BrandProductOptionGroup.findOne({
      where: { id: groupId, product_id: productId }
    });

    if (!optionGroup) {
      return res.status(404).json({ error: '옵션 그룹을 찾을 수 없습니다' });
    }

    await optionGroup.destroy();

    res.json({ success: true, message: '옵션 그룹이 삭제되었습니다' });
  } catch (error) {
    console.error('Delete option group error:', error);
    res.status(500).json({ error: 'Failed to delete option group' });
  }
});

module.exports = router;
