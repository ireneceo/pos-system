const express = require('express');
const router = express.Router();
const { Supplier, Restaurant, SupplierCategory, Brand } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');
const { requireBGScope, applyBGFilter, assertBGOwnsRow } = require('../middleware/brandScope');
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
    // Suppliers are shared across all brands owned by the same BG user.
    // System Admin: if brandId is provided, resolve its owner and scope to that BG.
    let ownerUserId = req.user.id;
    if (req.user.role === 'System Admin') {
      const brand = await Brand.findByPk(req.params.brandId, { attributes: ['owner_id'] });
      ownerUserId = brand?.owner_id || null;
    }

    const where = { owner_type: 'brand' };
    if (ownerUserId != null) where.owner_user_id = ownerUserId;

    const suppliers = await Supplier.findAll({
      where,
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: suppliers });
  } catch (error) {
    console.error('Get brand suppliers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch suppliers' });
  }
});

/**
 * GET /api/suppliers
 * 통합 공급업체 목록 조회 (Brand General/Manager가 소유한 모든 공급업체)
 */
router.get('/suppliers', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const where = { owner_type: 'brand' };
    applyBGFilter(where, req);

    const suppliers = await Supplier.findAll({
      where,
      include: [
        {
          model: SupplierCategory,
          as: 'supplierCategory',
          attributes: ['id', 'name', 'color']
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: suppliers });
  } catch (error) {
    console.error('Get all suppliers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch suppliers' });
  }
});

/**
 * POST /api/suppliers
 * 통합 공급업체 생성 (브랜드 연결 포함)
 */
router.post('/suppliers', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, supplier_category_id } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Supplier name required' });
    }
    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }

    const finalCode = code || await generateSupplierCode(Supplier);

    const supplier = await Supplier.create({
      owner_type: 'brand',
      owner_user_id: req.bgOwnerId,
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

    const created = await Supplier.findByPk(supplier.id, {
      include: [
        { model: SupplierCategory, as: 'supplierCategory', attributes: ['id', 'name', 'color'] }
      ]
    });

    res.json({ success: true, data: created });
  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({ success: false, message: 'Failed to create supplier' });
  }
});

/**
 * PUT /api/suppliers/:supplierId
 * 통합 공급업체 수정 (브랜드 연결 포함)
 */
router.put('/suppliers/:supplierId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { supplierId } = req.params;

    const { code, name, contact_name, phone, email, address, business_number, bank_name, bank_account, payment_terms, notes, is_active, supplier_category_id } = req.body;

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier || supplier.owner_type !== 'brand') {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    if (!assertBGOwnsRow(supplier, req, res)) return;

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

    const updated = await Supplier.findByPk(supplierId, {
      include: [
        { model: SupplierCategory, as: 'supplierCategory', attributes: ['id', 'name', 'color'] }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update supplier error:', error);
    res.status(500).json({ success: false, message: 'Failed to update supplier' });
  }
});

/**
 * DELETE /api/suppliers/:supplierId
 * 통합 공급업체 삭제
 */
router.delete('/suppliers/:supplierId', authenticateToken, requireBGScope, async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier || supplier.owner_type !== 'brand') {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    if (!assertBGOwnsRow(supplier, req, res)) return;

    await supplier.destroy();

    res.json({ success: true, message: 'Supplier deleted' });
  } catch (error) {
    console.error('Delete supplier error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete supplier' });
  }
});

// N:M supplier-brand routes removed (migrated to owner_user_id, tables dropped 2026-04-16)

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
      return res.status(400).json({ success: false, message: 'Supplier name required' });
    }

    // Resolve BG owner from brand (isBrandManager already verified ownership)
    const brand = await Brand.findByPk(brandId, { attributes: ['owner_id'] });
    const ownerUserId = brand?.owner_id || req.user.id;

    const finalCode = code || await generateSupplierCode(Supplier);

    const supplier = await Supplier.create({
      owner_type: 'brand',
      owner_user_id: ownerUserId,
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

    res.json({ success: true, data: supplier });
  } catch (error) {
    console.error('Create brand supplier error:', error);
    res.status(500).json({ success: false, message: 'Failed to create supplier' });
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
    if (!supplier || supplier.owner_type !== 'brand') {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    // Must belong to one of the user's brands (BG level)
    if (req.user.role !== 'System Admin' && supplier.owner_user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
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
    res.status(500).json({ success: false, error: { message: '공급업체 수정 실패', code: 'INTERNAL_ERROR' } });
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
    if (!supplier || supplier.owner_type !== 'brand') {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    if (req.user.role !== 'System Admin' && supplier.owner_user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    await supplier.destroy();

    res.json({ success: true, message: '공급업체가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand supplier error:', error);
    res.status(500).json({ success: false, error: { message: '공급업체 삭제 실패', code: 'INTERNAL_ERROR' } });
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
    res.status(500).json({ success: false, error: { message: '공급업체 목록 조회 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '레스토랑을 찾을 수 없습니다', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: '브랜드 공급업체 조회 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '레스토랑을 찾을 수 없습니다', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: '공급업체 조회 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: '공급업체 이름은 필수입니다', code: 'VALIDATION_ERROR' } });
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
    res.status(500).json({ success: false, error: { message: '공급업체 생성 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '공급업체를 찾을 수 없습니다', code: 'NOT_FOUND' } });
    }

    // 브랜드 공급업체는 레스토랑에서 수정 불가
    if (supplier.owner_type === 'brand') {
      return res.status(403).json({ success: false, error: { message: '브랜드 공급업체는 수정할 수 없습니다', code: 'FORBIDDEN' } });
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
    res.status(500).json({ success: false, error: { message: '공급업체 수정 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '공급업체를 찾을 수 없습니다', code: 'NOT_FOUND' } });
    }

    // 브랜드 공급업체는 레스토랑에서 삭제 불가
    if (supplier.owner_type === 'brand') {
      return res.status(403).json({ success: false, error: { message: '브랜드 공급업체는 삭제할 수 없습니다', code: 'FORBIDDEN' } });
    }

    await supplier.destroy();

    res.json({ success: true, message: '공급업체가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant supplier error:', error);
    res.status(500).json({ success: false, error: { message: '공급업체 삭제 실패', code: 'INTERNAL_ERROR' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 목록 조회 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: '카테고리 이름은 필수입니다', code: 'VALIDATION_ERROR' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 생성 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '카테고리를 찾을 수 없습니다', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 수정 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '카테고리를 찾을 수 없습니다', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 삭제 실패', code: 'INTERNAL_ERROR' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 목록 조회 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '레스토랑을 찾을 수 없습니다', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: '브랜드 카테고리 조회 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: '카테고리 이름은 필수입니다', code: 'VALIDATION_ERROR' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 생성 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '카테고리를 찾을 수 없습니다', code: 'NOT_FOUND' } });
    }

    if (category.owner_type === 'brand') {
      return res.status(403).json({ success: false, error: { message: '브랜드 카테고리는 수정할 수 없습니다', code: 'FORBIDDEN' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 수정 실패', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: '카테고리를 찾을 수 없습니다', code: 'NOT_FOUND' } });
    }

    if (category.owner_type === 'brand') {
      return res.status(403).json({ success: false, error: { message: '브랜드 카테고리는 삭제할 수 없습니다', code: 'FORBIDDEN' } });
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
    res.status(500).json({ success: false, error: { message: '카테고리 삭제 실패', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
