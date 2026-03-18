const express = require('express');
const router = express.Router();
const { Supplier, Restaurant, SupplierCategory, SupplierBrand, Brand } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');
const { generateSupplierCode } = require('../utils/codeGenerator');

// ============================================
// Brand Suppliers (통합 관리 - 브랜드 연결 방식)
// ============================================

/**
 * GET /api/brands/:brandId/suppliers
 * 브랜드에 연결된 공급업체 목록 조회 (supplier_brands 테이블 사용)
 */
router.get('/brands/:brandId/suppliers', authenticateToken, isBrandManager, async (req, res) => {
  try {
    // Get all brands owned by this user (shared suppliers across brands)
    const userBrands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
    const allBrandIds = userBrands.map(b => b.id);

    // 유저의 모든 브랜드에 연결된 공급업체 조회
    const suppliers = await Supplier.findAll({
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        },
        {
          model: Brand,
          as: 'connectedBrands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] },
          where: { id: allBrandIds },
          required: true
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: suppliers });
  } catch (error) {
    console.error('Get brand suppliers error:', error);
    res.status(500).json({ error: '공급업체 목록 조회 실패' });
  }
});

/**
 * GET /api/suppliers
 * 통합 공급업체 목록 조회 (Brand General/Manager가 소유한 모든 공급업체)
 */
router.get('/suppliers', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Brand General/Manager만 접근 가능
    if (userRole !== 'Brand General' && userRole !== 'Brand Manager' && userRole !== 'System Admin') {
      return res.status(403).json({ error: '권한이 없습니다' });
    }

    // 사용자가 소유한 브랜드 조회
    const userBrands = await Brand.findAll({
      where: { owner_id: userId },
      attributes: ['id']
    });
    const brandIds = userBrands.map(b => b.id);

    // 해당 브랜드들에 연결된 모든 공급업체 조회
    const suppliers = await Supplier.findAll({
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        },
        {
          model: Brand,
          as: 'connectedBrands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] }
        }
      ],
      order: [['name', 'ASC']]
    });

    // 사용자 브랜드와 연결된 공급업체만 필터링
    const filteredSuppliers = suppliers.filter(supplier => {
      const connectedBrandIds = supplier.connectedBrands.map(b => b.id);
      return connectedBrandIds.some(id => brandIds.includes(id)) || supplier.connectedBrands.length === 0;
    });

    res.json({ success: true, data: filteredSuppliers });
  } catch (error) {
    console.error('Get all suppliers error:', error);
    res.status(500).json({ error: '공급업체 목록 조회 실패' });
  }
});

/**
 * POST /api/suppliers
 * 통합 공급업체 생성 (브랜드 연결 포함)
 */
router.post('/suppliers', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== 'Brand General' && userRole !== 'Brand Manager' && userRole !== 'System Admin') {
      return res.status(403).json({ error: '권한이 없습니다' });
    }

    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, supplier_category_id, brand_ids } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = code || await generateSupplierCode(Supplier);

    // 공급업체 생성 (owner_type은 이제 의미 없음, 통합 관리)
    const supplier = await Supplier.create({
      owner_type: 'brand',
      brand_id: null,
      restaurant_id: null,
      supplier_category_id: supplier_category_id || null,
      code: finalCode,
      name,
      contact_name,
      phone,
      email,
      address,
      business_number,
      bank_name,
      bank_account,
      payment_terms,
      notes
    });

    // 브랜드 연결
    if (brand_ids && brand_ids.length > 0) {
      for (const brandId of brand_ids) {
        await SupplierBrand.create({
          supplier_id: supplier.id,
          brand_id: brandId
        });
      }
    }

    // 연결된 브랜드 정보와 함께 반환
    const supplierWithBrands = await Supplier.findByPk(supplier.id, {
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        },
        {
          model: Brand,
          as: 'connectedBrands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] }
        }
      ]
    });

    res.json({ success: true, data: supplierWithBrands });
  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({ error: '공급업체 생성 실패' });
  }
});

/**
 * PUT /api/suppliers/:supplierId
 * 통합 공급업체 수정 (브랜드 연결 포함)
 */
router.put('/suppliers/:supplierId', authenticateToken, async (req, res) => {
  try {
    const { supplierId } = req.params;
    const userRole = req.user.role;

    if (userRole !== 'Brand General' && userRole !== 'Brand Manager' && userRole !== 'System Admin') {
      return res.status(403).json({ error: '권한이 없습니다' });
    }

    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, is_active, supplier_category_id, brand_ids } = req.body;

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
      bank_name,
      bank_account,
      payment_terms,
      notes,
      is_active: is_active !== undefined ? is_active : supplier.is_active,
      supplier_category_id: supplier_category_id !== undefined ? supplier_category_id : supplier.supplier_category_id
    });

    // 브랜드 연결 업데이트 (기존 연결 삭제 후 새로 생성)
    if (brand_ids !== undefined) {
      await SupplierBrand.destroy({ where: { supplier_id: supplierId } });
      if (brand_ids && brand_ids.length > 0) {
        for (const brandId of brand_ids) {
          await SupplierBrand.create({
            supplier_id: supplierId,
            brand_id: brandId
          });
        }
      }
    }

    // 연결된 브랜드 정보와 함께 반환
    const supplierWithBrands = await Supplier.findByPk(supplierId, {
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        },
        {
          model: Brand,
          as: 'connectedBrands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] }
        }
      ]
    });

    res.json({ success: true, data: supplierWithBrands });
  } catch (error) {
    console.error('Update supplier error:', error);
    res.status(500).json({ error: '공급업체 수정 실패' });
  }
});

/**
 * DELETE /api/suppliers/:supplierId
 * 통합 공급업체 삭제
 */
router.delete('/suppliers/:supplierId', authenticateToken, async (req, res) => {
  try {
    const { supplierId } = req.params;
    const userRole = req.user.role;

    if (userRole !== 'Brand General' && userRole !== 'Brand Manager' && userRole !== 'System Admin') {
      return res.status(403).json({ error: '권한이 없습니다' });
    }

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: '공급업체를 찾을 수 없습니다' });
    }

    // 브랜드 연결 먼저 삭제
    await SupplierBrand.destroy({ where: { supplier_id: supplierId } });

    await supplier.destroy();

    res.json({ success: true, message: '공급업체가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete supplier error:', error);
    res.status(500).json({ error: '공급업체 삭제 실패' });
  }
});

/**
 * POST /api/suppliers/:supplierId/brands
 * 공급업체에 브랜드 연결 추가
 */
router.post('/suppliers/:supplierId/brands', authenticateToken, async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { brand_id } = req.body;
    const userRole = req.user.role;

    if (userRole !== 'Brand General' && userRole !== 'Brand Manager' && userRole !== 'System Admin') {
      return res.status(403).json({ error: '권한이 없습니다' });
    }

    // 이미 연결되어 있는지 확인
    const existing = await SupplierBrand.findOne({
      where: { supplier_id: supplierId, brand_id: brand_id }
    });

    if (existing) {
      return res.status(400).json({ error: '이미 연결된 브랜드입니다' });
    }

    await SupplierBrand.create({
      supplier_id: supplierId,
      brand_id: brand_id
    });

    res.json({ success: true, message: '브랜드가 연결되었습니다' });
  } catch (error) {
    console.error('Add supplier brand error:', error);
    res.status(500).json({ error: '브랜드 연결 실패' });
  }
});

/**
 * DELETE /api/suppliers/:supplierId/brands/:brandId
 * 공급업체에서 브랜드 연결 해제
 */
router.delete('/suppliers/:supplierId/brands/:brandId', authenticateToken, async (req, res) => {
  try {
    const { supplierId, brandId } = req.params;
    const userRole = req.user.role;

    if (userRole !== 'Brand General' && userRole !== 'Brand Manager' && userRole !== 'System Admin') {
      return res.status(403).json({ error: '권한이 없습니다' });
    }

    await SupplierBrand.destroy({
      where: { supplier_id: supplierId, brand_id: brandId }
    });

    res.json({ success: true, message: '브랜드 연결이 해제되었습니다' });
  } catch (error) {
    console.error('Remove supplier brand error:', error);
    res.status(500).json({ error: '브랜드 연결 해제 실패' });
  }
});

// ============================================
// Legacy Brand Suppliers API (하위 호환)
// ============================================

/**
 * POST /api/brands/:brandId/suppliers
 * 브랜드 공급업체 생성 (레거시 - 새 API 사용 권장)
 */
router.post('/brands/:brandId/suppliers', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, supplier_category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = code || await generateSupplierCode(Supplier);

    const supplier = await Supplier.create({
      owner_type: 'brand',
      brand_id: null,
      restaurant_id: null,
      supplier_category_id: supplier_category_id || null,
      code: finalCode,
      name,
      contact_name,
      phone,
      email,
      address,
      business_number,
      bank_name,
      bank_account,
      payment_terms,
      notes
    });

    // 유저의 모든 브랜드에 자동 연결 (공급업체는 브랜드 통합 사용)
    const userBrands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
    for (const b of userBrands) {
      await SupplierBrand.findOrCreate({
        where: { supplier_id: supplier.id, brand_id: b.id }
      });
    }

    // 연결된 브랜드 정보와 함께 반환
    const supplierWithBrands = await Supplier.findByPk(supplier.id, {
      include: [
        {
          model: Brand,
          as: 'connectedBrands',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] }
        }
      ]
    });

    res.json({ success: true, data: supplierWithBrands });
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
    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, is_active, supplier_category_id } = req.body;

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
      bank_name,
      bank_account,
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

    // 브랜드 공급업체 조회 (owner의 모든 브랜드 통합)
    const brand = await Brand.findByPk(restaurant.brand_id);
    let allBrandIds = [restaurant.brand_id];
    if (brand?.owner_id) {
      const ownerBrands = await Brand.findAll({ where: { owner_id: brand.owner_id }, attributes: ['id'] });
      allBrandIds = ownerBrands.map(b => b.id);
    }
    const brandSuppliers = await Supplier.findAll({
      where: { owner_type: 'brand' },
      include: [
        {
          model: Brand,
          as: 'connectedBrands',
          attributes: [],
          through: { attributes: [] },
          where: { id: allBrandIds },
          required: true
        },
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        }
      ],
      order: [['name', 'ASC']]
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
    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, supplier_category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = code || await generateSupplierCode(Supplier);

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
      bank_name,
      bank_account,
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
    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, is_active, supplier_category_id } = req.body;

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
      bank_name,
      bank_account,
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
