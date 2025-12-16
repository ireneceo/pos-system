const express = require('express');
const router = express.Router();
const { Supplier, Restaurant } = require('../models');
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
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: suppliers });
  } catch (error) {
    console.error('Get brand suppliers error:', error);
    res.status(500).json({ error: '공급업체 목록 조회 실패' });
  }
});

/**
 * POST /api/brands/:brandId/suppliers
 * 브랜드 공급업체 생성
 */
router.post('/brands/:brandId/suppliers', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    const supplier = await Supplier.create({
      owner_type: 'brand',
      brand_id: brandId,
      restaurant_id: null,
      code,
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
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes, is_active } = req.body;

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
      is_active: is_active !== undefined ? is_active : supplier.is_active
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
      order: [['name', 'ASC']]
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

    // 자체 공급업체
    const ownSuppliers = await Supplier.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
      },
      order: [['name', 'ASC']]
    });

    // 브랜드 공급업체 (있는 경우)
    let brandSuppliers = [];
    if (restaurant.brand_id) {
      brandSuppliers = await Supplier.findAll({
        where: {
          brand_id: restaurant.brand_id,
          owner_type: 'brand'
        },
        order: [['name', 'ASC']]
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
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes } = req.body;

    if (!name) {
      return res.status(400).json({ error: '공급업체 이름은 필수입니다' });
    }

    const supplier = await Supplier.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      code,
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
    const { code, name, contact_name, phone, email, address, business_number, bank_info, payment_terms, notes, is_active } = req.body;

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
      is_active: is_active !== undefined ? is_active : supplier.is_active
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

module.exports = router;
