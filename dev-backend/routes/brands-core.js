const express = require('express');
const router = express.Router();
const { Brand, Restaurant, User, EntityPlan, EntityPlanRestaurant, EntityPlanPrice, Order, Invoice, InvoiceItem } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { requireBrandModule } = require('../middleware/requireModule');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const { deleteOldImages } = require('../utils/imageProcessor');

// brand 자체 CRUD + company-info + payment-settings + restaurants + franchise-map + staff + allowed-routes + franchise-dashboard
// split from brands.js (2026-05-03)


// ============================================
// Company Info APIs (MUST be before /:id routes)
// ============================================

// Get company info for brand owner
router.get('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/brands/company-info - User: ${req.user.email} (${req.user.role})`);

    // Brand General/Manager는 자신이 소유한 브랜드의 회사정보를 가져옴
    if (req.user.role !== 'Brand General' && req.user.role !== 'Brand Manager') {
      return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
    }

    // Try by brand_id from user first (더 직접적)
    let brand = null;
    if (req.user.brand_id) {
      brand = await Brand.findByPk(req.user.brand_id);
    }

    // Fallback to owner_id
    if (!brand) {
      brand = await Brand.findOne({
        where: { owner_id: req.user.id }
      });
    }

    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    res.json({
      company_name: brand.company_name || brand.name,
      registration_no: brand.registration_no,
      trade_name: brand.trade_name,
      address: brand.address,
      address_line_2: brand.address_line_2 || '',
      city: brand.city,
      state: brand.state,
      postal_code: brand.postal_code,
      country: brand.country || 'MY',
      phone: brand.phone,
      email: brand.email,
      website: brand.website,
      tax_no: brand.tax_no,
      logo_url: brand.logo_url,
      operation_settings: brand.operation_settings
    });
  } catch (error) {
    console.error('Error fetching brand company info:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch company info', code: 'INTERNAL_ERROR' } });
  }
});

// Update company info for brand owner
router.put('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 PUT /api/brands/company-info - User: ${req.user.email}`);
    console.log(`  req.user.id: ${req.user.id}, req.user.brand_id: ${req.user.brand_id}, role: ${req.user.role}`);

    if (req.user.role !== 'Brand General' && req.user.role !== 'Brand Manager') {
      return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
    }

    // Try by brand_id from user first (더 직접적)
    let brand = null;
    if (req.user.brand_id) {
      brand = await Brand.findByPk(req.user.brand_id);
    }

    // Fallback to owner_id
    if (!brand) {
      brand = await Brand.findOne({
        where: { owner_id: req.user.id }
      });
    }

    console.log(`  Brand found: ${brand ? brand.name : 'NOT FOUND'}`);

    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    const updateData = {
      company_name: req.body.company_name,
      registration_no: req.body.registration_no,
      trade_name: req.body.trade_name,
      address: req.body.address,
      address_line_2: req.body.address_line_2 || null,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code,
      country: req.body.country ? String(req.body.country).toUpperCase().slice(0, 2) : req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      tax_no: req.body.tax_no,
      logo_url: req.body.logo_url,
      operation_settings: req.body.operation_settings
    };

    await brand.update(updateData);
    console.log(`✓ Brand company info updated: ${brand.name}`);

    res.json({ success: true, message: 'Company info updated successfully' });
  } catch (error) {
    console.error('Error updating brand company info:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update company info', code: 'INTERNAL_ERROR' } });
  }
});

// Get all brands (filtered by owner for Brand General)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/brands - User: ${req.user.email} (${req.user.role})`);

    const whereClause = {};

    // Brand General 은 자기가 **소유한** 브랜드, Brand Manager 는 자기가 **속한** 브랜드.
    //   2026-09-06 Fable 판정: BM 도 `owner_id = user.id` 로 찾아 **항상 0건**이었다(BM 은 소유자가
    //   아니다). 그래서 `/pos/brand-menus` Settings 탭이 통째로 빈 화면이었다.
    //   ⛔ 새 조건을 만들지 않는다 — 이미 잘 도는 형제 라우트(`GET /:id/restaurants` 등)의
    //   `Number(req.user.brand_id) === Number(id)` 와 **같은 판정식**을 쓴다.
    const isBM = req.user.role === 'Brand Manager';
    if (req.user.role === 'Brand General') {
      whereClause.owner_id = req.user.id;
      console.log(`🔐 Filtering brands for ${req.user.role}: owner_id = ${req.user.id}`);
    } else if (isBM) {
      // brand_id 가 비어 있으면 볼 브랜드가 없다 — 넓히지 않고 빈 결과로 둔다.
      whereClause.id = req.user.brand_id ? Number(req.user.brand_id) : -1;
      console.log(`🔐 Filtering brands for Brand Manager: brand_id = ${req.user.brand_id}`);
    } else if (req.user.role === 'System Admin') {
      console.log(`👑 System Admin: Returning all brands`);
    } else {
      return res.status(403).json({ success: false, error: { message: 'Insufficient permissions', code: 'FORBIDDEN' } });
    }

    const brands = await Brand.findAll({
      where: whereClause,
      // BM 에게는 안전 투영만. BG·SA 응답은 바이트 단위로 기존과 같다(attributes 미지정).
      ...(isBM ? { attributes: BM_BRAND_FIELDS } : {}),
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    console.log(`📊 Found ${brands.length} brands`);
    res.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brands', code: 'INTERNAL_ERROR' } });
  }
});

// ⛔ Brand Manager 안전 투영 (2026-09-06 Fable 판정).
//   `GET /api/brands` 는 Brand 행을 **통째로** 돌려준다 — `payment_settings`(Stripe/PayPal)·
//   `bank_name/bank_account/bank_account_name`·`plan_amount/subscription_*` 이 함께 나간다.
//   형제 라우트 `payment-settings`(아래 GET/PUT)는 같은 값을 BM 에게 **일부러 403** 으로 막는다.
//   그래서 BM 에게 목록을 열 때는 **빼는 목록(exclude)이 아니라 주는 목록(allowlist)** 으로 간다 —
//   나중에 Brand 에 컬럼이 생겨도 자동으로 새지 않는다(fail-closed).
const BM_BRAND_FIELDS = [
  'id', 'name', 'code', 'description', 'logo_url', 'owner_id', 'status',
  'currency', 'supported_currencies', 'created_at', 'updated_at'
];

// Get single brand by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 GET /api/brands/${id} - User: ${req.user.email}`);

    // BM 은 안전 투영만 받는다(위 BM_BRAND_FIELDS 주석 참조).
    const isBMreq = req.user.role === 'Brand Manager';
    const brand = await Brand.findByPk(id, {
      ...(isBMreq ? { attributes: BM_BRAND_FIELDS } : {}),
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status', 'address', 'phone']
        }
      ]
    });

    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check access permissions — 형제 라우트와 **같은 조건식**(2026-09-06). BM 은 자기 브랜드만.
    //   이 화면(BrandManagement)은 BM 에게 열려 있는데 서버가 막아 빈 화면이었다.
    const canRead = req.user.role === 'System Admin'
      || brand.owner_id === req.user.id
      || (isBMreq && Number(req.user.brand_id) === Number(id));
    if (!canRead) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this brand', code: 'FORBIDDEN' } });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brand', code: 'INTERNAL_ERROR' } });
  }
});

// Create new brand
router.post('/', authenticateToken, requireRole('Brand General', 'System Admin'), async (req, res) => {
  try {
    console.log(`🆕 POST /api/brands - User: ${req.user.email}`);
    console.log('📝 Brand data:', req.body);

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    // Set owner_id to current user if Brand General
    const owner_id = req.user.role === 'Brand General' ? req.user.id : req.body.owner_id;

    const brand = await Brand.create({
      name,
      code,
      description,
      logo_url,
      owner_id,
      email,
      phone,
      address,
      website,
      currency: currency || 'MYR',
      status: status || 'active'
    });

    console.log(`✓ Brand created: ${brand.name} (ID: ${brand.id})`);

    // Fetch with associations
    const createdBrand = await Brand.findByPk(brand.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        }
      ]
    });

    res.status(201).json(createdBrand);
  } catch (error) {
    console.error('Error creating brand:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, error: { message: 'Brand code already exists', code: 'VALIDATION_ERROR' } });
    }

    res.status(500).json({ success: false, error: { message: 'Failed to create brand', code: 'INTERNAL_ERROR' } });
  }
});

// Update brand
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 PUT /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this brand', code: 'FORBIDDEN' } });
    }

    const { name, code, description, logo_url, email, phone, address, website, status, currency,
      address_line_2, city, state, postal_code, country } = req.body;

    // 로고 변경 시 이전 파일 삭제
    if (logo_url && brand.logo_url && logo_url !== brand.logo_url) {
      await deleteOldImages(brand.logo_url);
    }

    // Persist the FULL standard address set (line1/line2/city/state/postal/country),
    // matching the Restaurant address standard — only overwrite fields the client sent.
    const updatePayload = {
      name: name || brand.name,
      code: code || brand.code,
      description,
      logo_url,
      email,
      phone,
      address,
      website,
      currency: currency || brand.currency,
      status: status || brand.status
    };
    if (address_line_2 !== undefined) updatePayload.address_line_2 = address_line_2;
    if (city !== undefined) updatePayload.city = city;
    if (state !== undefined) updatePayload.state = state;
    if (postal_code !== undefined) updatePayload.postal_code = postal_code;
    if (country !== undefined) updatePayload.country = country;

    await brand.update(updatePayload);

    console.log(`✓ Brand updated: ${brand.name}`);

    // Fetch with associations
    const updatedBrand = await Brand.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status']
        }
      ]
    });

    res.json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, error: { message: 'Brand code already exists', code: 'VALIDATION_ERROR' } });
    }

    res.status(500).json({ success: false, error: { message: 'Failed to update brand', code: 'INTERNAL_ERROR' } });
  }
});

// Get restaurants for a brand
router.get('/:id/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🏪 GET /api/brands/${id}/restaurants - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check access permissions
    // ⚠ 2026-09-05: Brand Manager 가 **여기서만** 막혀 있었다. 바로 아래 `/:id/franchise-map` 은 같은 상황에서
    //   BM(자기 brand_id)을 허용하고, 돌려주는 것도 매장 목록이다 — 이 라우트만 그 모델에서 빠져 있었다.
    //   프론트는 두 화면(`BrandPlansPage :603`, `BrandMenusPage :1686`)을 BM 에게 열어 두고 403 을 조용히
    //   삼켜(`if (response.ok)` 안에서만 상태를 채움) **매장 목록이 비고 매장 수가 0 으로** 보였다.
    //   형제 라우트와 **같은 조건식**을 쓴다(새 조건을 만들지 않는다). 남의 브랜드는 그대로 403.
    const canAccess = req.user.role === 'System Admin'
      || brand.owner_id === req.user.id
      || (req.user.role === 'Brand Manager' && Number(req.user.brand_id) === Number(id));
    if (!canAccess) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this brand', code: 'FORBIDDEN' } });
    }

    const restaurants = await Restaurant.findAll({
      where: { brand_id: id },
      attributes: ['id', 'name', 'status', 'address', 'phone'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching brand restaurants:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brand restaurants', code: 'INTERNAL_ERROR' } });
  }
});

// Franchise map — returns restaurants with lat/lng + active contract + 30-day sales
router.get('/:id/franchise-map', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByPk(id);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    const canAccess = req.user.role === 'System Admin'
      || brand.owner_id === req.user.id
      || (req.user.role === 'Brand Manager' && Number(req.user.brand_id) === Number(id));
    if (!canAccess) return res.status(403).json({ success: false, message: 'Access denied' });

    const { sequelize } = require('../config/database');
    const Contract = require('../models/Contract');
    const { Op } = require('sequelize');

    const restaurants = await Restaurant.findAll({
      where: { brand_id: id },
      attributes: ['id', 'name', 'branch_name', 'status', 'address', 'city', 'state', 'country',
                   'phone', 'email', 'latitude', 'longitude', 'logo_url', 'is_demo'],
      order: [['name', 'ASC']]
    });

    const restaurantIds = restaurants.map(r => r.id);

    // 30-day sales (completed/served orders) per restaurant
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const salesRows = restaurantIds.length > 0 ? await sequelize.query(`
      SELECT restaurant_id, COALESCE(SUM(total_amount), 0) AS sales_30d, COUNT(*) AS order_count
      FROM orders
      WHERE restaurant_id IN (:ids)
        AND status IN ('completed', 'served')
        AND (is_deleted = false OR is_deleted IS NULL)
        AND order_date >= :since
      GROUP BY restaurant_id
    `, { replacements: { ids: restaurantIds, since }, type: sequelize.QueryTypes.SELECT }) : [];
    const salesMap = new Map(salesRows.map(r => [Number(r.restaurant_id), { sales_30d: Number(r.sales_30d) || 0, order_count: Number(r.order_count) || 0 }]));

    // Highest-priority contract per restaurant — active > setup > contracting > proposal > expired
    const contracts = restaurantIds.length > 0 ? await Contract.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        stage: ['proposal', 'contracting', 'setup', 'active', 'expired'],
        entity_type: 'brand',
        entity_id: id
      },
      attributes: ['id', 'restaurant_id', 'contract_number', 'stage', 'contract_type',
                   'currency',
                   'applicant_company_name', 'applicant_contact_person',
                   'applicant_email', 'applicant_phone',
                   'start_date', 'end_date', 'signing_date', 'duration_months',
                   'renewal_type', 'renewal_alert_months', 'termination_notice_months',
                   'financial_terms', 'exclusivity_terms']
    }) : [];
    const STAGE_PRIORITY = { active: 5, setup: 4, contracting: 3, proposal: 2, expired: 1 };
    const contractMap = new Map();
    contracts.forEach(c => {
      const prev = contractMap.get(Number(c.restaurant_id));
      if (!prev || (STAGE_PRIORITY[c.stage] || 0) > (STAGE_PRIORITY[prev.stage] || 0)) {
        contractMap.set(Number(c.restaurant_id), c);
      }
    });

    // Current active subscription plan per restaurant (EntityPlanRestaurant joined to this brand's plans).
    // Note: fixed amount lives in entity_plan_prices.monthly_price (per currency), not on entity_plans.
    const eprRows = restaurantIds.length > 0 ? await sequelize.query(`
      SELECT epr.restaurant_id, epr.activation_date, epr.pending_plan_id, epr.pending_activation_date,
             ep.id AS plan_id, ep.name AS plan_name, ep.charge_type, ep.percentage_value,
             ep.billing_day
      FROM entity_plan_restaurants epr
      JOIN entity_plans ep ON ep.id = epr.entity_plan_id
      WHERE epr.is_active = 1
        AND ep.entity_type = 'brand' AND ep.entity_id = :brandId
        AND epr.restaurant_id IN (:ids)
    `, { replacements: { brandId: id, ids: restaurantIds }, type: sequelize.QueryTypes.SELECT }) : [];

    // Build price lookup: plan_id + currency → monthly_price
    const activePlanIds = [...new Set(eprRows.map(r => r.plan_id))];
    const priceRows = activePlanIds.length > 0 ? await EntityPlanPrice.findAll({
      where: { entity_plan_id: activePlanIds, is_active: true },
      attributes: ['entity_plan_id', 'currency', 'monthly_price']
    }) : [];
    const priceByPlan = new Map();
    priceRows.forEach(p => {
      if (!priceByPlan.has(p.entity_plan_id)) priceByPlan.set(p.entity_plan_id, {});
      priceByPlan.get(p.entity_plan_id)[p.currency] = Number(p.monthly_price);
    });

    const plansByRestaurant = new Map();
    eprRows.forEach(row => {
      const rid = Number(row.restaurant_id);
      if (!plansByRestaurant.has(rid)) plansByRestaurant.set(rid, []);
      plansByRestaurant.get(rid).push({
        id: row.plan_id,
        name: row.plan_name,
        charge_type: row.charge_type,
        percentage_value: row.percentage_value,
        billing_day: row.billing_day,
        activation_date: row.activation_date,
        pending_plan_id: row.pending_plan_id,
        pending_activation_date: row.pending_activation_date,
        _priceByCurrency: priceByPlan.get(row.plan_id) || {}
      });
    });

    const isBrandManager = req.user.role === 'Brand Manager';
    const enriched = restaurants.map(r => {
      const obj = r.toJSON();
      const s = salesMap.get(r.id) || { sales_30d: 0, order_count: 0 };
      const c = contractMap.get(r.id);
      const terms = c?.exclusivity_terms || {};
      const radius_km = Number(terms.radius_km) > 0 ? Number(terms.radius_km) : null;

      let currentContract = null;
      if (c) {
        const cj = c.toJSON();
        if (isBrandManager) { cj.financial_terms = null; cj.financial_redacted = true; }
        else cj.financial_redacted = false;
        currentContract = cj;
      }

      const rawPlans = plansByRestaurant.get(r.id) || [];
      const rCurrency = r.currency || 'MYR';
      const currentPlans = rawPlans.map(p => {
        const { _priceByCurrency, ...base } = p;
        const fixed = _priceByCurrency[rCurrency] != null
          ? _priceByCurrency[rCurrency]
          : (_priceByCurrency.MYR != null ? _priceByCurrency.MYR : null);
        return { ...base, fixed_amount: fixed, currency: rCurrency };
      });

      return {
        ...obj,
        sales_30d: s.sales_30d,
        order_count: s.order_count,
        contract_id: c ? c.id : null,
        contract_type: c ? (c.contract_type || null) : null,
        contract_stage: c ? c.stage : null,
        radius_km,
        currentContract,
        currentPlans
      };
    });

    const maxSales = enriched.reduce((m, r) => Math.max(m, r.sales_30d), 0);
    const mapped = enriched.filter(r => r.latitude != null && r.longitude != null);
    const unmapped = enriched.filter(r => r.latitude == null || r.longitude == null);

    // Expose brand's default display locale settings to the frontend so the map
    // panel no longer has to hardcode 'RM' / 'Asia/Kuala_Lumpur'.
    let brandOps = brand.operation_settings;
    if (typeof brandOps === 'string') { try { brandOps = JSON.parse(brandOps); } catch { brandOps = null; } }
    const brandTimeZone = brandOps?.timeZone || 'Asia/Kuala_Lumpur';

    res.json({
      success: true,
      data: {
        brand: {
          id: brand.id,
          name: brand.name,
          code: brand.code,
          logo_url: brand.logo_url,
          currency: brand.currency || 'MYR',
          time_zone: brandTimeZone
        },
        mapped,
        unmapped,
        total: restaurants.length,
        max_sales_30d: maxSales
      }
    });
  } catch (error) {
    console.error('Error fetching franchise map:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch franchise map' });
  }
});

// Delete brand
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ DELETE /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurants'
      }]
    });

    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this brand', code: 'FORBIDDEN' } });
    }

    // Check if brand has restaurants
    if (brand.restaurants && brand.restaurants.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete brand with ${brand.restaurants.length} restaurant(s). Please remove or reassign restaurants first.`,
        code: 'HAS_RESTAURANTS'
      });
    }

    await brand.destroy();
    console.log(`✓ Brand deleted: ${brand.name}`);

    res.json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete brand', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Payment Settings APIs (B2B Invoice Payment)
// ============================================

// Get payment settings for a brand
router.get('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`💳 GET /api/brands/${id}/payment-settings - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this brand', code: 'FORBIDDEN' } });
    }

    res.json({
      success: true,
      data: {
        payment_settings: brand.payment_settings,
        invoice_settings: brand.invoice_settings,
        supported_currencies: brand.supported_currencies
      }
    });
  } catch (error) {
    console.error('Error fetching brand payment settings:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch payment settings', code: 'INTERNAL_ERROR' } });
  }
});

// Update payment settings for a brand
router.put('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`💳 PUT /api/brands/${id}/payment-settings - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check access permissions (Brand General only or System Admin)
    if (req.user.role !== 'System Admin' &&
        (req.user.role !== 'Brand General' || brand.owner_id !== req.user.id)) {
      return res.status(403).json({ success: false, error: { message: 'Access denied. Only Brand General or System Admin can update payment settings.', code: 'FORBIDDEN' } });
    }

    const { payment_settings, invoice_settings, supported_currencies } = req.body;

    // Validate payment_settings structure if provided
    if (payment_settings) {
      const validPaymentSettings = {
        currencies: payment_settings.currencies || ['MYR'],
        defaultCurrency: payment_settings.defaultCurrency || 'MYR',
        stripe: payment_settings.stripe || { enabled: false },
        paypal: payment_settings.paypal || { enabled: false },
        bankTransfer: payment_settings.bankTransfer || {},
        qrPayment: payment_settings.qrPayment || {},
        additionalCharges: payment_settings.additionalCharges || {}
      };
      brand.payment_settings = validPaymentSettings;
    }

    // Validate invoice_settings structure if provided
    if (invoice_settings) {
      const validInvoiceSettings = {
        invoicePrefix: invoice_settings.invoicePrefix || 'INV',
        paymentTerms: invoice_settings.paymentTerms || 30,
        taxRate: invoice_settings.taxRate || 6,
        autoGenerate: invoice_settings.autoGenerate || false,
        autoSendEmail: invoice_settings.autoSendEmail || false,
        ...invoice_settings
      };
      brand.invoice_settings = validInvoiceSettings;
    }

    // Update supported currencies if provided (validate against system currencies)
    if (supported_currencies && Array.isArray(supported_currencies)) {
      const SystemSettings = require('../models/SystemSettings');
      const sysCurrSetting = await SystemSettings.findOne({ where: { setting_key: 'supported_currencies' } });
      const systemCurrencies = sysCurrSetting?.setting_value || ['USD', 'MYR', 'KRW'];
      const invalid = supported_currencies.filter(c => !systemCurrencies.includes(c));
      if (invalid.length > 0) {
        return res.status(400).json({ error: `Currencies not supported by system: ${invalid.join(', ')}` });
      }
      brand.supported_currencies = supported_currencies;
    }

    await brand.save();
    console.log(`✓ Brand payment settings updated: ${brand.name}`);

    res.json({
      success: true,
      message: 'Payment settings updated successfully',
      data: {
        payment_settings: brand.payment_settings,
        invoice_settings: brand.invoice_settings,
        supported_currencies: brand.supported_currencies
      }
    });
  } catch (error) {
    console.error('Error updating brand payment settings:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update payment settings', code: 'INTERNAL_ERROR' } });
  }
});

// Get available payment methods for a brand (used by invoice payers)
router.get('/:id/payment-settings/available/:currency', authenticateToken, async (req, res) => {
  try {
    const { id, currency } = req.params;
    const { getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    const result = getAvailablePaymentMethods(brand.payment_settings || {}, currency);
    res.json(result);
  } catch (error) {
    console.error('Error fetching brand available payment methods:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch payment methods', code: 'INTERNAL_ERROR' } });
  }
});

// Get subscription info for a brand (System Admin can set, Brand General can view)
router.get('/:id/staff', authenticateToken, async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    // Verify access: System Admin, Brand General who OWNS this brand, or Brand Manager assigned to it
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General' && brand.owner_id === req.user.id) {
      // OK
    } else if (req.user.role === 'Brand Manager' && req.user.brand_id === parseInt(brandId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const managers = await User.findAll({
      where: {
        brand_id: brandId,
        role: 'Brand Manager'
      },
      attributes: { exclude: ['password'] },
      order: [['full_name', 'ASC']]
    });

    res.json({ success: true, data: managers });
  } catch (error) {
    console.error('Error fetching brand managers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch managers' });
  }
});

// Create a brand manager
router.post('/:id/staff', authenticateToken, async (req, res) => {
  try {
    const brandId = req.params.id;

    // Verify brand exists
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    // Only Brand General (who OWNS this brand) or System Admin can create managers
    // Support: one Brand General may own multiple brands (brands.owner_id = user.id)
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General' && brand.owner_id === req.user.id) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied. Only the Brand General who owns this brand can create managers.' });
    }

    const { username, email, full_name, phone, permissions } = req.body;

    // Validate required fields
    if (!username || !email || !full_name) {
      return res.status(400).json({ success: false, message: 'Username, email, and full name are required' });
    }

    // Check duplicate email/username
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      let errorDetail = '';
      if (existingUser.email === email && existingUser.username === username) {
        errorDetail = `Both email "${email}" and username "${username}" are already in use`;
      } else if (existingUser.email === email) {
        errorDetail = `Email "${email}" is already in use`;
      } else {
        errorDetail = `Username "${username}" is already in use`;
      }
      return res.status(400).json({ success: false, message: errorDetail });
    }

    // Auto-generate password (12 chars)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let generatedPassword = '';
    generatedPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
    generatedPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
    generatedPassword += '23456789'[Math.floor(Math.random() * 8)];
    generatedPassword += '!@#$%'[Math.floor(Math.random() * 5)];
    for (let i = 0; i < 8; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const manager = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'Brand Manager',
      full_name,
      phone: phone || null,
      brand_id: parseInt(brandId),
      permissions: permissions || '[]'
    });

    const { password: _, ...managerData } = manager.toJSON();
    res.status(201).json({
      success: true,
      data: managerData,
      generatedPassword
    });
  } catch (error) {
    console.error('Error creating brand manager:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a brand manager
router.put('/:id/staff/:userId', authenticateToken, async (req, res) => {
  try {
    const brandId = req.params.id;
    const userId = req.params.userId;
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General' && brand.owner_id === req.user.id) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, brand_id: brandId, role: 'Brand Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this brand' });
    }

    const { full_name, email, phone, username } = req.body;
    const updateData = {};

    if (full_name) updateData.full_name = full_name;
    if (phone !== undefined) updateData.phone = phone;

    // Check email uniqueness if changing
    if (email && email !== manager.email) {
      const emailExists = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
      if (emailExists) {
        return res.status(400).json({ success: false, message: `Email "${email}" is already in use` });
      }
      updateData.email = email;
    }

    // Check username uniqueness if changing
    if (username && username !== manager.username) {
      const usernameExists = await User.findOne({ where: { username, id: { [Op.ne]: userId } } });
      if (usernameExists) {
        return res.status(400).json({ success: false, message: `Username "${username}" is already in use` });
      }
      updateData.username = username;
    }

    await manager.update(updateData);

    const { password: _, ...managerData } = manager.toJSON();
    res.json({ success: true, data: managerData });
  } catch (error) {
    console.error('Error updating brand manager:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a brand manager
router.delete('/:id/staff/:userId', authenticateToken, async (req, res) => {
  try {
    const brandId = req.params.id;
    const userId = req.params.userId;
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General' && brand.owner_id === req.user.id) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, brand_id: brandId, role: 'Brand Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this brand' });
    }

    await manager.destroy();
    res.json({ success: true, message: 'Manager deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand manager:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update brand manager permissions
router.put('/:id/staff/:userId/permissions', authenticateToken, async (req, res) => {
  try {
    const brandId = req.params.id;
    const userId = req.params.userId;
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General' && brand.owner_id === req.user.id) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, brand_id: brandId, role: 'Brand Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this brand' });
    }

    const { permissions } = req.body;
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ success: false, message: 'Permissions must be an array' });
    }

    await manager.update({ permissions: JSON.stringify(permissions) });

    const { password: _, ...managerData } = manager.toJSON();
    res.json({ success: true, data: managerData });
  } catch (error) {
    console.error('Error updating brand manager permissions:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reset brand manager password
router.put('/:id/staff/:userId/reset-password', authenticateToken, async (req, res) => {
  try {
    const brandId = req.params.id;
    const userId = req.params.userId;
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General' && brand.owner_id === req.user.id) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, brand_id: brandId, role: 'Brand Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this brand' });
    }

    // Generate new password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let newPassword = '';
    newPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
    newPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
    newPassword += '23456789'[Math.floor(Math.random() * 8)];
    newPassword += '!@#$%'[Math.floor(Math.random() * 5)];
    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await manager.update({ password: hashedPassword });

    res.json({ success: true, generatedPassword: newPassword });
  } catch (error) {
    console.error('Error resetting brand manager password:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// Brand Allowed Routes (module-based sidebar filtering)
// ============================================
router.get('/:id/allowed-routes', async (req, res) => {
  try {
    const { id } = req.params;
    const PlanTemplate = require('../models/PlanTemplate');
    const AddonModule = require('../models/AddonModule');

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Subscription data is on users table (brand owner)
    const User = require('../models/User');
    const owner = brand.owner_id ? await User.findByPk(brand.owner_id) : null;

    // Demo accounts: use highest plan (enterprise) for full access
    const isDemo = owner?.is_demo || brand.is_demo;
    const planType = isDemo ? 'Brand Enterprise' : (owner?.plan_type || brand.plan_type);
    const subStatus = isDemo ? 'active' : (owner?.subscription_status || brand.subscription_status);

    if (!planType) {
      return res.json({
        entity_id: brand.id,
        entity_type: 'brand',
        plan_type: null,
        subscription_status: subStatus,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    // Match by display_name or name
    const plan = await PlanTemplate.findOne({
      where: {
        [Op.or]: [
          { display_name: planType },
          { name: planType }
        ],
        plan_target: 'brand'
      }
    });

    if (!plan) {
      return res.json({
        entity_id: brand.id,
        entity_type: 'brand',
        plan_type: planType,
        subscription_status: subStatus,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const includedModuleCodes = plan.included_modules || [];
    if (includedModuleCodes.length === 0) {
      return res.json({
        entity_id: brand.id,
        entity_type: 'brand',
        plan_type: planType,
        subscription_status: subStatus,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const modules = await AddonModule.findAll({
      where: { module_code: includedModuleCodes, is_active: true }
    });

    const allowedRoutes = [...new Set(
      modules.reduce((routes, m) => [...routes, ...(m.ui_routes || [])], [])
    )];

    res.json({
      entity_id: brand.id,
      entity_type: 'brand',
      plan_type: planType,
      subscription_status: subStatus,
      included_modules: includedModuleCodes,
      allowed_routes: allowedRoutes,
      modules: modules.map(m => ({ code: m.module_code, name: m.name, category: m.category }))
    });
  } catch (error) {
    console.error('Error fetching brand allowed routes:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch allowed routes', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================================================
// Franchise Operations Dashboard — single-shot aggregation for the Brand
// General dashboard widgets. Mirror of Foodcourt's tenancy-dashboard, adapted
// to franchise context (contracts linked by restaurant_id rather than unit_id).
// GET /api/brands/:id/franchise-dashboard
// ============================================================================
router.get('/:id/franchise-dashboard', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { Contract, ContractPlan, EntityPlan, EntityPlanPrice } = require('../models');

    const brand = await Brand.findByPk(id, { attributes: ['id', 'name', 'currency', 'supported_currencies', 'owner_id'] });
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    // Access
    const canAccess = req.user.role === 'System Admin'
      || brand.owner_id === req.user.id
      || (req.user.role === 'Brand Manager' && Number(req.user.brand_id) === Number(id));
    if (!canAccess) return res.status(403).json({ success: false, message: 'Access denied' });

    const isManager = req.user.role === 'Brand Manager';

    // Restaurants in this brand (franchisees / direct stores)
    const restaurants = await Restaurant.findAll({
      where: { brand_id: id },
      attributes: ['id', 'name', 'branch_name', 'status']
    });
    const restaurantIds = restaurants.map(r => r.id);

    // All contracts for this brand (via entity_type=brand + entity_id)
    const contracts = await Contract.findAll({
      where: {
        entity_type: 'brand',
        entity_id: id,
        stage: ['proposal', 'contracting', 'setup', 'active', 'expired']
      },
      attributes: ['id', 'contract_number', 'stage', 'restaurant_id', 'applicant_company_name',
                   'contract_type', 'start_date', 'end_date', 'renewal_alert_months', 'currency', 'created_at']
    });

    // Priority pick per restaurant (active > setup > contracting > proposal > expired)
    // For contracts without restaurant_id (pipeline stage), use contract.id as key so every
    // in-pipeline contract is counted even before restaurant is linked.
    const STAGE_PRIORITY = { active: 5, setup: 4, contracting: 3, proposal: 2, expired: 1 };
    const currentByKey = {};
    contracts.forEach(c => {
      const key = c.restaurant_id != null ? `r${c.restaurant_id}` : `c${c.id}`;
      const prev = currentByKey[key];
      if (!prev || (STAGE_PRIORITY[c.stage] || 0) > (STAGE_PRIORITY[prev.stage] || 0)) {
        currentByKey[key] = c;
      }
    });
    const currents = Object.values(currentByKey);

    // Pipeline counts
    const pipeline = { proposal: 0, contracting: 0, setup: 0, active: 0, expired: 0, unmapped: 0, total: currents.length };
    currents.forEach(c => {
      if (pipeline[c.stage] !== undefined) pipeline[c.stage]++;
      if (c.restaurant_id == null && (c.stage === 'proposal' || c.stage === 'contracting')) {
        pipeline.unmapped++;
      }
    });

    // Active contracts + billing gap detection
    const activeContracts = contracts.filter(c => c.stage === 'active');
    const activeIds = activeContracts.map(c => c.id);
    const openPlanLinks = activeIds.length > 0 ? await ContractPlan.findAll({
      where: { contract_id: activeIds, end_at: null },
      attributes: ['id', 'contract_id', 'entity_plan_id']
    }) : [];
    const linkedContractIds = new Set(openPlanLinks.map(l => l.contract_id));
    const gapContracts = activeContracts.filter(c => !linkedContractIds.has(c.id));

    // Expiring (90 day horizon)
    const now = new Date();
    const expiring30 = [];
    const expiring90 = [];
    activeContracts.forEach(c => {
      if (!c.end_date) return;
      const end = new Date(c.end_date);
      const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (24 * 3600 * 1000));
      if (daysLeft < 0) return;
      if (daysLeft <= 30) expiring30.push({ ...c.toJSON(), days_left: daysLeft });
      if (daysLeft <= 90) expiring90.push({ ...c.toJSON(), days_left: daysLeft });
    });
    expiring90.sort((a, b) => a.days_left - b.days_left);

    // Royalty forecast — sum fixed floor across linked plans (percentage-only excluded)
    let monthlyForecast = 0;
    const planIds = openPlanLinks.map(l => l.entity_plan_id);
    if (planIds.length > 0) {
      const plans = await EntityPlan.findAll({
        where: { id: planIds },
        attributes: ['id', 'charge_type', 'percentage_value', 'currency']
      });
      const prices = await EntityPlanPrice.findAll({
        where: { entity_plan_id: planIds, is_active: true },
        attributes: ['entity_plan_id', 'currency', 'monthly_price']
      });
      const priceByPlan = {};
      prices.forEach(p => {
        if (!priceByPlan[p.entity_plan_id]) priceByPlan[p.entity_plan_id] = {};
        priceByPlan[p.entity_plan_id][p.currency] = Number(p.monthly_price);
      });
      for (const plan of plans) {
        const priceMap = priceByPlan[plan.id] || {};
        const fixed = priceMap[brand.currency] || Object.values(priceMap)[0] || 0;
        if (plan.charge_type === 'fixed') monthlyForecast += fixed;
        else if (plan.charge_type === 'combined') monthlyForecast += fixed; // floor
        // percentage-only: variable, omitted
      }
    }

    // Restaurant name lookup (used in list items)
    const restaurantById = {};
    restaurants.forEach(r => { restaurantById[r.id] = { name: r.name, branch_name: r.branch_name }; });

    res.json({
      success: true,
      data: {
        currency: brand.currency || 'MYR',
        pipeline,
        total_restaurants: restaurants.length,
        expiring: {
          count_30d: expiring30.length,
          count_90d: expiring90.length,
          list: expiring90.slice(0, 10).map(c => ({
            id: c.id,
            contract_number: c.contract_number,
            applicant_company_name: c.applicant_company_name,
            restaurant: c.restaurant_id ? (restaurantById[c.restaurant_id] || null) : null,
            contract_type: c.contract_type,
            end_date: c.end_date,
            days_left: c.days_left
          }))
        },
        billing_gaps: {
          count: gapContracts.length,
          list: gapContracts.slice(0, 10).map(c => ({
            id: c.id,
            contract_number: c.contract_number,
            applicant_company_name: c.applicant_company_name,
            restaurant: c.restaurant_id ? (restaurantById[c.restaurant_id] || null) : null,
            contract_type: c.contract_type,
            days_since_start: c.start_date
              ? Math.max(0, Math.floor((Date.now() - new Date(c.start_date).getTime()) / (24 * 3600 * 1000)))
              : null
          }))
        },
        revenue_forecast: isManager ? { financial_redacted: true } : {
          currency: brand.currency || 'MYR',
          active_plans_count: openPlanLinks.length,
          estimated_monthly_fixed_floor: Math.round(monthlyForecast * 100) / 100,
          disclaimer: 'Fixed + combined min-guarantee only. Percentage-based royalty excluded (varies with restaurant revenue).'
        }
      }
    });
  } catch (error) {
    console.error('Error fetching franchise dashboard:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch franchise dashboard' });
  }
});

module.exports = router;
