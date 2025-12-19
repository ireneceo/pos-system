const express = require('express');
const router = express.Router();
const { Supplier, Restaurant, SupplierCategory } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Suppliers
// ============================================

/**
 * GET /api/brands/:brandId/suppliers
 * 브랜드 공급업체 목록 조회
 */
router.get('/brands/:brandId/suppliers', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;

    const suppliers = await Supplier.findAll({
      where: { brand_id: brandId, owner_type: 'brand' },
      order: [['name', 'ASC']],
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        }
      ]
    });

    res.json({ success: true, data: suppliers });
  } catch (error) {
    console.error('Get brand suppliers error:', error);
    res.status(500).json({ error: '공급업체 목록 조회 실패' });
  }
});

/**
 * Generate unique supplier code
 */
const generateSupplierCode = async (ownerType, ownerId) => {
  const prefix = 'SUP';
  const whereClause = ownerType === 'brand'
    ? { brand_id: ownerId, owner_type: 'brand' }
    : { restaurant_id: ownerId, owner_type: 'restaurant' };

  const count = await Supplier.count({ where: whereClause });
  const nextNum = count + 1;
  return `${prefix}-${String(nextNum).padStart(3, '0')}`;
};

/**
 * POST /api/brands/:brandId/suppliers
 * 브랜드 공급업체 생성
 */
router.post('/brands/:brandId/suppliers', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes, supplier_category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = code || await generateSupplierCode('brand', brandId);

    const supplier = await Supplier.create({
      owner_type: 'brand',
      brand_id: brandId,
      restaurant_id: null,
      supplier_category_id: supplier_category_id || null,
      code: finalCode,
      name,
      contact_name,
      phone,
      email,
      address,
      business_number,
      bank_info,
      payment_terms,
      notes
    });

    res.json({ success: true, data: supplier });
  } catch (error) {
    console.error('Create brand supplier error:', error);
    res.status(500).json({ error: '공급업체 생성 실패' });
  }
});

/**
 * PUT /api/brands/:brandId/suppliers/:supplierId
 * 브랜드 공급업체 수정
 */
router.put('/brands/:brandId/suppliers/:supplierId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes, is_active, supplier_category_id } = req.body;

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: '공급업체를 찾을 수 없습니다' });
    }

    await supplier.update({
      code,
      name,
      contact_name,
      phone,
      email,
      address,
      business_number,
      bank_info,
      payment_terms,
      notes,
      is_active: is_active !== undefined ? is_active : supplier.is_active,
      supplier_category_id: supplier_category_id !== undefined ? supplier_category_id : supplier.supplier_category_id
    });

    res.json({ success: true, data: supplier });
  } catch (error) {
    console.error('Update brand supplier error:', error);
    res.status(500).json({ error: '공급업체 수정 실패' });
  }
});

/**
 * DELETE /api/brands/:brandId/suppliers/:supplierId
 * 브랜드 공급업체 삭제
 */
router.delete('/brands/:brandId/suppliers/:supplierId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: '공급업체를 찾을 수 없습니다' });
    }

    await supplier.destroy();

    res.json({ success: true, message: '공급업체가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand supplier error:', error);
    res.status(500).json({ error: '공급업체 삭제 실패' });
  }
});

// ============================================
// Restaurant Suppliers
// ============================================

/**
 * GET /api/restaurants/:restaurantId/suppliers
 * 레스토랑 자체 공급업체 목록 조회 (owner_type = 'restaurant')
 */
router.get('/restaurants/:restaurantId/suppliers', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const suppliers = await Supplier.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
      },
      order: [['name', 'ASC']],
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        }
      ]
    });

    res.json({ success: true, data: suppliers });
  } catch (error) {
    console.error('Get restaurant suppliers error:', error);
    res.status(500).json({ error: '공급업체 목록 조회 실패' });
  }
});

/**
 * GET /api/restaurants/:restaurantId/brand-suppliers
 * 레스토랑이 속한 브랜드의 공급업체 조회 (읽기 전용)
 */
router.get('/restaurants/:restaurantId/brand-suppliers', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: '레스토랑을 찾을 수 없습니다' });
    }

    // 브랜드에 속하지 않은 레스토랑
    if (!restaurant.brand_id) {
      return res.json({ success: true, data: [] });
    }

    // 브랜드 공급업체 조회 (owner_type = 'brand')
    const brandSuppliers = await Supplier.findAll({
      where: {
        brand_id: restaurant.brand_id,
        owner_type: 'brand'
      },
      order: [['name', 'ASC']],
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        }
      ]
    });

    res.json({ success: true, data: brandSuppliers });
  } catch (error) {
    console.error('Get brand suppliers for restaurant error:', error);
    res.status(500).json({ error: '브랜드 공급업체 조회 실패' });
  }
});

/**
 * GET /api/restaurants/:restaurantId/all-suppliers
 * 레스토랑에서 사용 가능한 모든 공급업체 조회 (브랜드 + 자체)
 */
router.get('/restaurants/:restaurantId/all-suppliers', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: '레스토랑을 찾을 수 없습니다' });
    }

    const supplierInclude = [
      {
        model: SupplierCategory,
        as: 'supplierCategory',
        attributes: ['id', 'name', 'color']
      }
    ];

    // 자체 공급업체
    const ownSuppliers = await Supplier.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
      },
      order: [['name', 'ASC']],
      include: supplierInclude
    });

    // 브랜드 공급업체 (있는 경우)
    let brandSuppliers = [];
    if (restaurant.brand_id) {
      brandSuppliers = await Supplier.findAll({
        where: {
          brand_id: restaurant.brand_id,
          owner_type: 'brand'
        },
        order: [['name', 'ASC']],
        include: supplierInclude
      });
    }

    res.json({
      success: true,
      data: {
        own_suppliers: ownSuppliers,
        brand_suppliers: brandSuppliers
      }
    });
  } catch (error) {
    console.error('Get all suppliers for restaurant error:', error);
    res.status(500).json({ error: '공급업체 조회 실패' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/suppliers
 * 레스토랑 공급업체 생성
 */
router.post('/restaurants/:restaurantId/suppliers', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes, supplier_category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = code || await generateSupplierCode('restaurant', restaurantId);

    const supplier = await Supplier.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      supplier_category_id: supplier_category_id || null,
      code: finalCode,
      name,
      contact_name,
      phone,
      email,
      address,
      business_number,
      bank_info,
      payment_terms,
      notes
    });

    res.json({ success: true, data: supplier });
  } catch (error) {
    console.error('Create restaurant supplier error:', error);
    res.status(500).json({ error: '공급업체 생성 실패' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/suppliers/:supplierId
 * 레스토랑 공급업체 수정
 */
router.put('/restaurants/:restaurantId/suppliers/:supplierId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes, is_active, supplier_category_id } = req.body;

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: '공급업체를 찾을 수 없습니다' });
    }

    // 브랜드 공급업체는 레스토랑에서 수정 불가
    if (supplier.owner_type === 'brand') {
      return res.status(403).json({ error: '브랜드 공급업체는 수정할 수 없습니다' });
    }

    await supplier.update({
      code,
      name,
      contact_name,
      phone,
      email,
      address,
      business_number,
      bank_info,
      payment_terms,
      notes,
      is_active: is_active !== undefined ? is_active : supplier.is_active,
      supplier_category_id: supplier_category_id !== undefined ? supplier_category_id : supplier.supplier_category_id
    });

    res.json({ success: true, data: supplier });
  } catch (error) {
    console.error('Update restaurant supplier error:', error);
    res.status(500).json({ error: '공급업체 수정 실패' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/suppliers/:supplierId
 * 레스토랑 공급업체 삭제
 */
router.delete('/restaurants/:restaurantId/suppliers/:supplierId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: '공급업체를 찾을 수 없습니다' });
    }

    // 브랜드 공급업체는 레스토랑에서 삭제 불가
    if (supplier.owner_type === 'brand') {
      return res.status(403).json({ error: '브랜드 공급업체는 삭제할 수 없습니다' });
    }

    await supplier.destroy();

    res.json({ success: true, message: '공급업체가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant supplier error:', error);
    res.status(500).json({ error: '공급업체 삭제 실패' });
  }
});

// ============================================
// Brand Supplier Categories
// ============================================

/**
 * GET /api/brands/:brandId/supplier-categories
 * 브랜드 공급업체 카테고리 목록 조회
 */
router.get('/brands/:brandId/supplier-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;

    const categories = await SupplierCategory.findAll({
      where: { brand_id: brandId, owner_type: 'brand' },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get brand supplier categories error:', error);
    res.status(500).json({ error: '카테고리 목록 조회 실패' });
  }
});

/**
 * POST /api/brands/:brandId/supplier-categories
 * 브랜드 공급업체 카테고리 생성
 */
router.post('/brands/:brandId/supplier-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { name, description, color, display_order } = req.body;

    if (!name) {
      return res.status(400).json({ error: '카테고리 이름은 필수입니다' });
    }

    const category = await SupplierCategory.create({
      owner_type: 'brand',
      brand_id: brandId,
      restaurant_id: null,
      name,
      description,
      color,
      display_order: display_order || 0
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create brand supplier category error:', error);
    res.status(500).json({ error: '카테고리 생성 실패' });
  }
});

/**
 * PUT /api/brands/:brandId/supplier-categories/:categoryId
 * 브랜드 공급업체 카테고리 수정
 */
router.put('/brands/:brandId/supplier-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, color, display_order, is_active } = req.body;

    const category = await SupplierCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    await category.update({
      name,
      description,
      color,
      display_order: display_order !== undefined ? display_order : category.display_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Update brand supplier category error:', error);
    res.status(500).json({ error: '카테고리 수정 실패' });
  }
});

/**
 * DELETE /api/brands/:brandId/supplier-categories/:categoryId
 * 브랜드 공급업체 카테고리 삭제
 */
router.delete('/brands/:brandId/supplier-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await SupplierCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 해당 카테고리를 사용하는 공급업체의 카테고리를 null로 변경
    await Supplier.update(
      { supplier_category_id: null },
      { where: { supplier_category_id: categoryId } }
    );

    await category.destroy();

    res.json({ success: true, message: '카테고리가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand supplier category error:', error);
    res.status(500).json({ error: '카테고리 삭제 실패' });
  }
});

// ============================================
// Restaurant Supplier Categories
// ============================================

/**
 * GET /api/restaurants/:restaurantId/supplier-categories
 * 레스토랑 공급업체 카테고리 목록 조회
 */
router.get('/restaurants/:restaurantId/supplier-categories', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const categories = await SupplierCategory.findAll({
      where: { restaurant_id: restaurantId, owner_type: 'restaurant' },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get restaurant supplier categories error:', error);
    res.status(500).json({ error: '카테고리 목록 조회 실패' });
  }
});

/**
 * GET /api/restaurants/:restaurantId/brand-supplier-categories
 * 레스토랑이 속한 브랜드의 공급업체 카테고리 조회 (읽기 전용)
 */
router.get('/restaurants/:restaurantId/brand-supplier-categories', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: '레스토랑을 찾을 수 없습니다' });
    }

    if (!restaurant.brand_id) {
      return res.json({ success: true, data: [] });
    }

    const categories = await SupplierCategory.findAll({
      where: { brand_id: restaurant.brand_id, owner_type: 'brand' },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get brand supplier categories for restaurant error:', error);
    res.status(500).json({ error: '브랜드 카테고리 조회 실패' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/supplier-categories
 * 레스토랑 공급업체 카테고리 생성
 */
router.post('/restaurants/:restaurantId/supplier-categories', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, color, display_order } = req.body;

    if (!name) {
      return res.status(400).json({ error: '카테고리 이름은 필수입니다' });
    }

    const category = await SupplierCategory.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      name,
      description,
      color,
      display_order: display_order || 0
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create restaurant supplier category error:', error);
    res.status(500).json({ error: '카테고리 생성 실패' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/supplier-categories/:categoryId
 * 레스토랑 공급업체 카테고리 수정
 */
router.put('/restaurants/:restaurantId/supplier-categories/:categoryId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, color, display_order, is_active } = req.body;

    const category = await SupplierCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    if (category.owner_type === 'brand') {
      return res.status(403).json({ error: '브랜드 카테고리는 수정할 수 없습니다' });
    }

    await category.update({
      name,
      description,
      color,
      display_order: display_order !== undefined ? display_order : category.display_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Update restaurant supplier category error:', error);
    res.status(500).json({ error: '카테고리 수정 실패' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/supplier-categories/:categoryId
 * 레스토랑 공급업체 카테고리 삭제
 */
router.delete('/restaurants/:restaurantId/supplier-categories/:categoryId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await SupplierCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    if (category.owner_type === 'brand') {
      return res.status(403).json({ error: '브랜드 카테고리는 삭제할 수 없습니다' });
    }

    // 해당 카테고리를 사용하는 공급업체의 카테고리를 null로 변경
    await Supplier.update(
      { supplier_category_id: null },
      { where: { supplier_category_id: categoryId } }
    );

    await category.destroy();

    res.json({ success: true, message: '카테고리가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant supplier category error:', error);
    res.status(500).json({ error: '카테고리 삭제 실패' });
  }
});

module.exports = router;
