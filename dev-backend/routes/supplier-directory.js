/**
 * Supplier Directory + Buyer-side Contracts — Sprint 2 (Supply Chain Design 2)
 *
 * Buyer-facing endpoints. The "buyer" is one of:
 *   - Restaurant (Restaurant Admin / Restaurant Owner / Staff)
 *   - Brand (Brand General / Brand Manager)
 *   - Foodcourt (Foodcourt General / Foodcourt Manager)
 *
 * SA can pass ?entity_type=&entity_id= to act on a buyer's behalf.
 *
 * 6 endpoints:
 *   GET  /supplier-directory                  — paginated supplier cards
 *   GET  /supplier-directory/:id              — supplier profile + catalog preview
 *   GET  /supplier-contracts                  — list buyer's own contracts
 *   GET  /supplier-contracts/:id              — single contract (IDOR-checked)
 *   POST /supplier-contracts                  — request new contract
 *   POST /supplier-contracts/:id/terminate    — buyer terminates
 *
 * All endpoints: authenticateToken + requireBuyerRole.
 */

const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const {
  SupplierCompany,
  SupplierContract,
  SupplierProduct,
  SupplierProductCategory,
  Supplier,
  User,
  Restaurant,
  Brand,
  Foodcourt
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');
const {
  supplierContractRequestedEmail,
  supplierContractTerminatedEmail
} = require('../utils/notificationTemplates');
const { sendNotificationBatch } = require('../utils/notificationService');

// Public-safe SupplierCompany attributes for buyer view (excludes banking/private)
const PUBLIC_SUPPLIER_ATTRS = [
  'id', 'name', 'code', 'description', 'logo_url',
  'company_name', 'trade_name',
  'email', 'phone', 'website',
  'address', 'address_line_2', 'city', 'state', 'postal_code', 'country',
  'status', 'created_at',
  // 외부공급업체(내가 등록) 상품관리 UI 노출 판별용
  'is_system_registered', 'registered_by_entity_type', 'registered_by_entity_id'
];

// Buyer-only middleware applied per-path so unrelated /api/* requests
// (e.g. /api/supplier/notices) are not blocked by router-level guards.
router.use(['/supplier-directory', '/supplier-contracts', '/supplier-catalog', '/external-suppliers'], authenticateToken, requireBuyerRole);

// ============================================
// Helpers
// ============================================

/**
 * Resolve a buyer entity's display name + owner user IDs (for notifications).
 * Returns { name, ownerIds: [userId,...] } or null.
 */
async function resolveBuyerEntity(entityType, entityId) {
  if (entityType === 'restaurant') {
    const r = await Restaurant.findByPk(entityId, {
      attributes: ['id', 'name', 'admin_id']
    });
    if (!r) return null;
    return {
      name: r.name,
      ownerIds: r.admin_id ? [r.admin_id] : []
    };
  }
  if (entityType === 'brand') {
    const b = await Brand.findByPk(entityId, {
      attributes: ['id', 'name', 'owner_id']
    });
    if (!b) return null;
    return {
      name: b.name,
      ownerIds: b.owner_id ? [b.owner_id] : []
    };
  }
  if (entityType === 'foodcourt') {
    const f = await Foodcourt.findByPk(entityId, {
      attributes: ['id', 'name', 'owner_id']
    });
    if (!f) return null;
    return {
      name: f.name,
      ownerIds: f.owner_id ? [f.owner_id] : []
    };
  }
  return null;
}

/** Find latest SupplierContract row for (supplierCompanyId, buyerEntity). */
async function findLatestContract(supplierCompanyId, buyerEntity) {
  if (!buyerEntity) return null;
  return SupplierContract.findOne({
    where: {
      supplier_company_id: supplierCompanyId,
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id
    },
    order: [['created_at', 'DESC']]
  });
}

const VALID_PAYMENT_TERMS = ['COD', 'NET_15', 'NET_30', 'NET_60'];
const VALID_INVOICE_CYCLES = ['immediate', 'monthly_soa'];

// ============================================
// GET /api/supplier-directory
// ============================================
router.get('/supplier-directory', async (req, res) => {
  try {
    const { category_id, country, state, search } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(60, Math.max(1, parseInt(req.query.limit, 10) || 24));
    const offset = (page - 1) * limit;

    const where = { status: 'active' };
    if (country) where.country = String(country).toUpperCase();
    if (state) where.state = String(state);
    // 2026-06-22 (Irene): 외부공급업체는 등록한 본인에게만 보인다(프라이버시).
    // 디렉토리/검색에는 (a) 시스템 가입 공급업체(공개 마켓) + (b) 내 buyerEntity 가 등록한
    // 외부공급업체만 노출. 남의 외부공급업체(is_system_registered=false + registered_by≠나)는 제외.
    const and = [];
    if (req.buyerEntity) {
      and.push({ [Op.or]: [
        { is_system_registered: true },
        { is_system_registered: false, registered_by_entity_type: req.buyerEntity.type, registered_by_entity_id: req.buyerEntity.id }
      ] });
    } else {
      and.push({ is_system_registered: true });
    }
    if (search && String(search).trim()) {
      const term = `%${String(search).trim()}%`;
      and.push({ [Op.or]: [
        { name: { [Op.like]: term } },
        { company_name: { [Op.like]: term } },
        { description: { [Op.like]: term } },
        { city: { [Op.like]: term } }
      ] });
    }
    if (and.length) where[Op.and] = and;

    // category_id filter requires JOIN through SupplierProduct → distinct supplier ids
    let categoryFilteredIds = null;
    if (category_id) {
      const catId = parseInt(category_id, 10);
      if (Number.isFinite(catId)) {
        const products = await SupplierProduct.findAll({
          where: { category_id: catId, is_active: true },
          attributes: ['supplier_company_id'],
          group: ['supplier_company_id']
        });
        categoryFilteredIds = products.map(p => p.supplier_company_id);
        if (categoryFilteredIds.length === 0) {
          return res.json({
            success: true,
            data: [],
            pagination: { total: 0, page, limit, totalPages: 0 }
          });
        }
        where.id = { [Op.in]: categoryFilteredIds };
      }
    }

    const { rows, count } = await SupplierCompany.findAndCountAll({
      where,
      attributes: PUBLIC_SUPPLIER_ATTRS,
      order: [['name', 'ASC']],
      limit,
      offset
    });

    const supplierIds = rows.map(r => r.id);
    if (supplierIds.length === 0) {
      return res.json({
        success: true,
        data: [],
        pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
      });
    }

    // Aggregate counts per supplier (products active, categories)
    const productCounts = await SupplierProduct.findAll({
      where: { supplier_company_id: { [Op.in]: supplierIds }, is_active: true },
      attributes: ['supplier_company_id'],
      raw: true
    });
    const pcMap = {};
    for (const p of productCounts) {
      pcMap[p.supplier_company_id] = (pcMap[p.supplier_company_id] || 0) + 1;
    }

    const categoryRows = await SupplierProductCategory.findAll({
      where: { supplier_company_id: { [Op.in]: supplierIds } },
      attributes: ['supplier_company_id'],
      raw: true
    });
    const ccMap = {};
    for (const c of categoryRows) {
      ccMap[c.supplier_company_id] = (ccMap[c.supplier_company_id] || 0) + 1;
    }

    // Latest contract status for buyer ↔ each supplier
    let contractMap = {};
    if (req.buyerEntity) {
      const contracts = await SupplierContract.findAll({
        where: {
          supplier_company_id: { [Op.in]: supplierIds },
          entity_type: req.buyerEntity.type,
          entity_id: req.buyerEntity.id
        },
        order: [['created_at', 'DESC']]
      });
      for (const c of contracts) {
        if (!contractMap[c.supplier_company_id]) {
          contractMap[c.supplier_company_id] = c.status;
        }
      }
    }

    const cards = rows.map(r => {
      const j = r.toJSON();
      return {
        id: j.id,
        name: j.name,
        code: j.code,
        logo_url: j.logo_url,
        description: j.description,
        city: j.city,
        state: j.state,
        country: j.country,
        product_count: pcMap[j.id] || 0,
        category_count: ccMap[j.id] || 0,
        my_contract_status: contractMap[j.id] || 'none'
      };
    });

    res.json({
      success: true,
      data: cards,
      pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('GET /api/supplier-directory error:', err);
    res.status(500).json({ success: false, message: 'Failed to load supplier directory' });
  }
});

// ============================================
// GET /api/supplier-directory/:supplierCompanyId
// ============================================
router.get('/supplier-directory/:supplierCompanyId', async (req, res) => {
  try {
    const supplierCompanyId = parseInt(req.params.supplierCompanyId, 10);
    if (!Number.isFinite(supplierCompanyId)) {
      return res.status(400).json({ success: false, message: 'Invalid supplierCompanyId' });
    }

    const supplier = await SupplierCompany.findOne({
      where: { id: supplierCompanyId, status: 'active' },
      attributes: PUBLIC_SUPPLIER_ATTRS
    });
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    const products = await SupplierProduct.findAll({
      where: { supplier_company_id: supplierCompanyId, is_active: true },
      include: [{ model: SupplierProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }],
      order: [['sort_order', 'ASC'], ['name', 'ASC']],
      limit: 50
    });

    const categories = await SupplierProductCategory.findAll({
      where: { supplier_company_id: supplierCompanyId, is_active: true },
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    const myContract = await findLatestContract(supplierCompanyId, req.buyerEntity);

    res.json({
      success: true,
      data: {
        supplier: supplier.toJSON(),
        products,
        categories,
        my_contract: myContract ? myContract.toJSON() : null
      }
    });
  } catch (err) {
    console.error('GET /api/supplier-directory/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to load supplier' });
  }
});

// ============================================
// GET /api/supplier-contracts
// ============================================
router.get('/supplier-contracts', async (req, res) => {
  try {
    if (!req.buyerEntity) {
      return res.json({
        success: true,
        data: [],
        pagination: { total: 0, page: 1, limit: 20, totalPages: 0 }
      });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const where = {
      entity_type: req.buyerEntity.type,
      entity_id: req.buyerEntity.id
    };
    if (req.query.status) where.status = req.query.status;
    if (req.query.supplier_id) {
      const sid = parseInt(req.query.supplier_id, 10);
      if (Number.isFinite(sid)) where.supplier_company_id = sid;
    }

    const { rows, count } = await SupplierContract.findAndCountAll({
      where,
      include: [{
        model: SupplierCompany,
        as: 'supplierCompany',
        attributes: ['id', 'name', 'code', 'logo_url', 'city']
      }],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    res.json({
      success: true,
      data: rows,
      pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('GET /api/supplier-contracts error:', err);
    res.status(500).json({ success: false, message: 'Failed to load contracts' });
  }
});

// ============================================
// GET /api/supplier-contracts/:contractId
// ============================================
router.get('/supplier-contracts/:contractId', async (req, res) => {
  try {
    const contractId = parseInt(req.params.contractId, 10);
    if (!Number.isFinite(contractId)) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    const contract = await SupplierContract.findByPk(contractId, {
      include: [
        { model: SupplierCompany, as: 'supplierCompany', attributes: PUBLIC_SUPPLIER_ATTRS },
        { model: User, as: 'requestedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'approvedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'rejectedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'terminatedByUser', attributes: ['id', 'full_name', 'email'] }
      ]
    });
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    // IDOR check: must be buyer's contract (SA bypass when no entity override)
    if (!req.buyerIsAdmin || req.buyerEntity) {
      if (!req.buyerEntity ||
          contract.entity_type !== req.buyerEntity.type ||
          contract.entity_id !== req.buyerEntity.id) {
        return res.status(404).json({ success: false, message: 'Contract not found' });
      }
    }

    res.json({ success: true, data: contract });
  } catch (err) {
    console.error('GET /api/supplier-contracts/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to load contract' });
  }
});

// ============================================
// POST /api/supplier-contracts — request new
// ============================================
router.post('/supplier-contracts', async (req, res) => {
  try {
    if (!req.buyerEntity) {
      return res.status(400).json({
        success: false,
        message: 'entity_type & entity_id query params required for System Admin'
      });
    }

    const supplierCompanyId = parseInt(req.body.supplier_company_id, 10);
    if (!Number.isFinite(supplierCompanyId)) {
      return res.status(400).json({ success: false, message: 'supplier_company_id is required' });
    }

    const supplier = await SupplierCompany.findByPk(supplierCompanyId);
    if (!supplier) {
      return res.status(400).json({ success: false, message: 'Supplier not found' });
    }
    if (supplier.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Supplier is not active' });
    }

    // Block if existing active contract
    const activeCount = await SupplierContract.count({
      where: {
        supplier_company_id: supplierCompanyId,
        entity_type: req.buyerEntity.type,
        entity_id: req.buyerEntity.id,
        status: 'active'
      }
    });
    if (activeCount > 0) {
      return res.status(400).json({
        success: false,
        code: 'CONTRACT_ALREADY_ACTIVE',
        message: 'You already have an active contract with this supplier'
      });
    }

    // Block if pending request
    const pendingCount = await SupplierContract.count({
      where: {
        supplier_company_id: supplierCompanyId,
        entity_type: req.buyerEntity.type,
        entity_id: req.buyerEntity.id,
        status: 'requested'
      }
    });
    if (pendingCount > 0) {
      return res.status(400).json({
        success: false,
        code: 'CONTRACT_REQUEST_PENDING',
        message: 'You already have a pending contract request with this supplier'
      });
    }

    const message = req.body.message ? sanitizeString(String(req.body.message)) : null;

    const contract = await SupplierContract.create({
      supplier_company_id: supplierCompanyId,
      entity_type: req.buyerEntity.type,
      entity_id: req.buyerEntity.id,
      status: 'requested',
      requested_by_user_id: req.user.id,
      request_message: message,
      requested_at: new Date()
    });

    // Notification to supplier owner (non-blocking)
    (async () => {
      try {
        if (supplier.owner_id) {
          const buyerInfo = await resolveBuyerEntity(req.buyerEntity.type, req.buyerEntity.id);
          const buyerName = buyerInfo?.name || `${req.buyerEntity.type}#${req.buyerEntity.id}`;
          const link = (process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com')) + '/supplier/contracts';
          const mail = supplierContractRequestedEmail({
            buyerName,
            buyerType: req.buyerEntity.type,
            message,
            link
          });
          await sendNotificationBatch([supplier.owner_id], 'supplier_contract', mail);
        }
      } catch (e) {
        console.error('[supplier-contracts] notify on create error:', e.message);
      }
    })();

    res.status(201).json({ success: true, data: contract });
  } catch (err) {
    console.error('POST /api/supplier-contracts error:', err);
    res.status(500).json({ success: false, message: 'Failed to create contract request' });
  }
});

// ============================================
// POST /api/supplier-contracts/:contractId/terminate
// ============================================
router.post('/supplier-contracts/:contractId/terminate', async (req, res) => {
  try {
    const contractId = parseInt(req.params.contractId, 10);
    if (!Number.isFinite(contractId)) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;
    if (!reason) {
      return res.status(400).json({ success: false, message: 'reason is required' });
    }

    const contract = await SupplierContract.findByPk(contractId);
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    // IDOR
    if (!req.buyerIsAdmin || req.buyerEntity) {
      if (!req.buyerEntity ||
          contract.entity_type !== req.buyerEntity.type ||
          contract.entity_id !== req.buyerEntity.id) {
        return res.status(404).json({ success: false, message: 'Contract not found' });
      }
    }

    if (contract.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Only active contracts can be terminated'
      });
    }

    await contract.update({
      status: 'terminated',
      terminated_by: 'buyer',
      terminated_by_user_id: req.user.id,
      terminated_at: new Date(),
      termination_reason: reason
    });

    // Notify supplier owner (non-blocking)
    (async () => {
      try {
        const supplier = await SupplierCompany.findByPk(contract.supplier_company_id);
        if (supplier?.owner_id) {
          const buyerInfo = await resolveBuyerEntity(contract.entity_type, contract.entity_id);
          const buyerName = buyerInfo?.name || `${contract.entity_type}#${contract.entity_id}`;
          const link = (process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com')) + '/supplier/contracts';
          const mail = supplierContractTerminatedEmail({
            otherPartyName: buyerName,
            terminatedBy: 'buyer',
            reason,
            link
          });
          await sendNotificationBatch([supplier.owner_id], 'supplier_contract', mail);
        }
      } catch (e) {
        console.error('[supplier-contracts] notify on terminate error:', e.message);
      }
    })();

    res.json({ success: true, data: contract });
  } catch (err) {
    console.error('POST /api/supplier-contracts/:id/terminate error:', err);
    res.status(500).json({ success: false, message: 'Failed to terminate contract' });
  }
});

// ============================================
// GET /api/supplier-catalog
// — Cart drawer "카탈로그" tab 용. 내 active contract supplier 들의 모든 상품 통합.
//   각 상품에 already_mapped + mapped_ingredient_id 표시 (내 ingredient 와 연결 여부).
// ============================================
router.get('/supplier-catalog', async (req, res) => {
  try {
    if (!req.buyerEntity) {
      return res.json({ success: true, data: [], filters: { categories: [], suppliers: [] } });
    }

    const IngredientSellerProduct = require('../models/IngredientSellerProduct');
    const Ingredient = require('../models/Ingredient');

    // 1. 내 active contract supplier_id 목록
    const contracts = await SupplierContract.findAll({
      where: { entity_type: req.buyerEntity.type, entity_id: req.buyerEntity.id, status: 'active' },
      attributes: ['supplier_company_id']
    });
    const supplierIds = [...new Set(contracts.map(c => c.supplier_company_id))];
    // No early-return when supplier contracts are empty — Brand/Foodcourt seller catalog may still apply.

    // 2. 필터 + 검색 (이름/SKU/설명/단위/카테고리/공급사 이름까지 매칭)
    const where = {
      supplier_company_id: { [Op.in]: supplierIds.length > 0 ? supplierIds : [-1] },
      is_active: true
    };
    const search = (req.query.search || '').trim();
    if (search) {
      const like = `%${search}%`;
      // 카테고리/공급사명까지 검색하기 위해 join 테이블 컬럼은 Sequelize.where + literal 로 처리
      where[Op.or] = [
        { name: { [Op.like]: like } },
        { sku: { [Op.like]: like } },
        { description: { [Op.like]: like } },
        { unit: { [Op.like]: like } },
        require('sequelize').where(
          require('sequelize').col('category.name'),
          { [Op.like]: like }
        ),
        require('sequelize').where(
          require('sequelize').col('company.name'),
          { [Op.like]: like }
        )
      ];
    }
    const supplierFilter = parseInt(req.query.supplier_id, 10);
    if (Number.isFinite(supplierFilter)) where.supplier_company_id = supplierFilter;
    const catFilter = parseInt(req.query.category_id, 10);
    if (Number.isFinite(catFilter)) where.category_id = catFilter;

    const SupplierProductOptionGroup = require('../models/SupplierProductOptionGroup');
    const SupplierProductOption = require('../models/SupplierProductOption');
    const products = await SupplierProduct.findAll({
      where,
      include: [
        { model: SupplierProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] },
        { model: SupplierCompany, as: 'company', attributes: ['id', 'name', 'code'] },
        {
          model: SupplierProductOptionGroup,
          as: 'optionGroups',
          attributes: ['id', 'name', 'is_required', 'min_selections', 'max_selections', 'sort_order'],
          through: { attributes: [] },
          include: [{
            model: SupplierProductOption,
            as: 'options',
            attributes: ['id', 'name', 'price_adjustment', 'sort_order'],
            where: { is_active: true },
            required: false
          }],
          required: false
        }
      ],
      order: [['created_at', 'DESC']], // 최신 등록 순 (newest first) — My Stock 탭과 일관
      limit: 200,
      subQuery: false
    });

    // 3. 매핑 여부 lookup — 내 ingredient 와 IngredientSellerProduct 매핑된 supplier_product_id 모음
    // ingredient 매핑 lookup — buyer entity 별로 적용 + 3 seller_type (supplier/brand/foodcourt) 모두
    const myIngsWhere = req.buyerEntity.type === 'restaurant'
      ? { restaurant_id: req.buyerEntity.id }
      : req.buyerEntity.type === 'brand'
      ? { brand_id: req.buyerEntity.id }
      : req.buyerEntity.type === 'foodcourt'
      ? { foodcourt_id: req.buyerEntity.id }
      : null;
    const myIngs = myIngsWhere ? await Ingredient.findAll({ where: myIngsWhere, attributes: ['id'] }) : [];
    const myIngIds = myIngs.map(i => i.id);
    const allMapRows = myIngIds.length === 0 ? [] : await IngredientSellerProduct.findAll({
      where: { ingredient_id: { [Op.in]: myIngIds }, is_active: true },
      attributes: ['ingredient_id', 'seller_type', 'seller_product_id']
    });
    const mappedMap = {};
    const mappedBrandMap = {};
    const mappedFoodcourtMap = {};
    for (const m of allMapRows) {
      if (m.seller_type === 'supplier') mappedMap[m.seller_product_id] = m.ingredient_id;
      else if (m.seller_type === 'brand') mappedBrandMap[m.seller_product_id] = m.ingredient_id;
      else if (m.seller_type === 'foodcourt') mappedFoodcourtMap[m.seller_product_id] = m.ingredient_id;
    }

    // 4. supplier 회사명 lookup
    const suppliers = await SupplierCompany.findAll({
      where: { id: { [Op.in]: supplierIds } },
      attributes: ['id', 'name', 'code', 'logo_url']
    });
    const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s]));

    // 5. 카테고리 통합 (필터 후보)
    const categories = await SupplierProductCategory.findAll({
      where: { supplier_company_id: { [Op.in]: supplierIds }, is_active: true },
      attributes: ['id', 'name', 'emoji', 'supplier_company_id'],
      order: [['name', 'ASC']]
    });

    const data = products.map(p => {
      const sp = supplierMap[p.supplier_company_id];
      const groups = (p.optionGroups || [])
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map(g => ({
          id: g.id,
          name: g.name,
          is_required: !!g.is_required,
          min_selections: g.min_selections || 0,
          max_selections: g.max_selections || 1,
          options: (g.options || [])
            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
            .map(o => ({
              id: o.id,
              name: o.name,
              price_adjustment: parseFloat(o.price_adjustment) || 0
            }))
        }));
      return {
        id: p.id,
        name: p.name,
        sku: p.sku,
        unit: p.unit,
        unit_price: parseFloat(p.unit_price) || 0,
        min_order_quantity: parseInt(p.min_order_quantity, 10) || 1,
        image_url: p.image_url,
        category_id: p.category_id,
        category_name: p.category?.name || null,
        supplier: sp ? { id: sp.id, name: sp.name, code: sp.code, logo_url: sp.logo_url, seller_type: 'supplier' } : null,
        already_mapped: !!mappedMap[p.id],
        mapped_ingredient_id: mappedMap[p.id] || null,
        option_groups: groups,
        has_options: groups.length > 0
      };
    });

    // 6. Brand/Foodcourt seller catalog 통합 — Restaurant buyer 가 가맹/입점된 BG/FG 의 판매 상품도 포함
    //    BG/FG 는 공급업체와 동등한 seller 역할. brand_products / foodcourt_products 가 catalog 항목.
    //    검색어 (search) 는 supplier 와 동일하게 name/sku/description/unit 에 LIKE 적용.
    let extraData = [];
    const extraSellers = []; // 필터 후보에 추가될 seller (brand/foodcourt 그룹). i18n 라벨은 프론트에서 처리.
    if (req.buyerEntity.type === 'restaurant') {
      const BrandProduct = require('../models/BrandProduct');
      const BrandProductCategory = require('../models/BrandProductCategory');
      const FoodcourtProduct = require('../models/FoodcourtProduct');
      const FoodcourtProductCategory = require('../models/FoodcourtProductCategory');
      const searchLike = search ? `%${search}%` : null;
      const brandLikeWhere = searchLike ? {
        [Op.or]: [
          { name: { [Op.like]: searchLike } },
          { sku: { [Op.like]: searchLike } },
          { description: { [Op.like]: searchLike } },
          { unit: { [Op.like]: searchLike } }
        ]
      } : {};
      const rest = await Restaurant.findByPk(req.buyerEntity.id, { attributes: ['id', 'brand_id', 'foodcourt_id'] });
      // Brand seller — 내 가맹본부 (Restaurant.brand_id) 의 brand_products 중 distribution_mode 별 노출 규칙:
      //   all                  → BG owner 의 모든 brand_products (가맹점 brand가 BG 소유 brand면 자동 노출)
      //   specific_brands      → brand_product_brands 매핑된 brand 가맹점
      //   specific_restaurants → brand_product_restaurants 매핑된 Restaurant 만
      if (rest?.brand_id) {
        const brand = await Brand.findByPk(rest.brand_id, { attributes: ['id', 'name', 'code', 'logo_url', 'owner_id'] });
        if (brand) {
          // 3 OR 조건 union — Sequelize OR with includes is complex; 3개 쿼리 후 dedupe.
          const BrandProductRestaurant = require('../models/BrandProductRestaurant');
          const baseWhere = { is_active: true, ...brandLikeWhere };
          // (1) all: owner 의 모든 product
          const allModeRows = brand.owner_id ? await BrandProduct.findAll({
            include: [{ model: BrandProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'], required: false }],
            where: { ...baseWhere, distribution_mode: 'all', owner_user_id: brand.owner_id },
            order: [['sort_order', 'ASC'], ['name', 'ASC']],
            limit: 200
          }) : [];
          // (2) specific_brands
          const specificBrandRows = await BrandProduct.findAll({
            include: [
              { model: BrandProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'], required: false },
              { model: Brand, as: 'brands', where: { id: brand.id }, through: { attributes: [] }, required: true, attributes: [] }
            ],
            where: { ...baseWhere, distribution_mode: 'specific_brands' },
            order: [['sort_order', 'ASC'], ['name', 'ASC']],
            limit: 200
          });
          // (3) specific_restaurants
          const specificRestaurantRows = await BrandProduct.findAll({
            include: [
              { model: BrandProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'], required: false },
              { model: Restaurant, as: 'restaurants', where: { id: rest.id }, through: { attributes: [] }, required: true, attributes: [] }
            ],
            where: { ...baseWhere, distribution_mode: 'specific_restaurants' },
            order: [['sort_order', 'ASC'], ['name', 'ASC']],
            limit: 200
          });
          // Dedupe by id
          const seen = new Set();
          const bpRows = [...allModeRows, ...specificBrandRows, ...specificRestaurantRows].filter(p => {
            if (seen.has(p.id)) return false;
            seen.add(p.id);
            return true;
          });
          for (const p of bpRows) {
            extraData.push({
              id: p.id,
              name: p.name,
              sku: p.sku,
              unit: p.unit,
              unit_price: parseFloat(p.unit_price) || 0,
              min_order_quantity: parseInt(p.min_order_quantity, 10) || 1,
              image_url: p.image_url,
              category_id: p.category_id,
              category_name: p.category?.name || null,
              supplier: { id: brand.id, name: brand.name, code: brand.code, logo_url: brand.logo_url, seller_type: 'brand' },
              already_mapped: !!mappedBrandMap[p.id],
              mapped_ingredient_id: mappedBrandMap[p.id] || null,
              option_groups: [],
              has_options: false
            });
          }
          if (bpRows.length) extraSellers.push({ id: brand.id, name: brand.name, seller_type: 'brand' });
        }
      }
      // Foodcourt seller — 내 푸드코트 의 foodcourt_products 중 distribution_mode 별 노출:
      //   all                  → 전체 매장
      //   specific_restaurants → foodcourt_product_restaurants 매핑된 Restaurant 만
      if (rest?.foodcourt_id) {
        const fc = await Foodcourt.findByPk(rest.foodcourt_id, { attributes: ['id', 'name', 'code', 'logo_url'] });
        if (fc) {
          const baseFpWhere = { foodcourt_id: fc.id, is_active: true, ...brandLikeWhere };
          const allFpRows = await FoodcourtProduct.findAll({
            include: [{ model: FoodcourtProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'], required: false }],
            where: { ...baseFpWhere, distribution_mode: 'all' },
            order: [['sort_order', 'ASC'], ['name', 'ASC']],
            limit: 200
          });
          const specificFpRows = await FoodcourtProduct.findAll({
            include: [
              { model: FoodcourtProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'], required: false },
              { model: Restaurant, as: 'restaurants', where: { id: rest.id }, through: { attributes: [] }, required: true, attributes: [] }
            ],
            where: { ...baseFpWhere, distribution_mode: 'specific_restaurants' },
            order: [['sort_order', 'ASC'], ['name', 'ASC']],
            limit: 200
          });
          const fpSeen = new Set();
          const fpRows = [...allFpRows, ...specificFpRows].filter(p => {
            if (fpSeen.has(p.id)) return false;
            fpSeen.add(p.id);
            return true;
          });
          for (const p of fpRows) {
            extraData.push({
              id: p.id,
              name: p.name,
              sku: p.sku,
              unit: p.unit,
              unit_price: parseFloat(p.unit_price) || 0,
              min_order_quantity: parseInt(p.min_order_quantity, 10) || 1,
              image_url: p.image_url,
              category_id: p.category_id,
              category_name: p.category?.name || null,
              supplier: { id: fc.id, name: fc.name, code: fc.code, logo_url: fc.logo_url, seller_type: 'foodcourt' },
              already_mapped: !!mappedFoodcourtMap[p.id],
              mapped_ingredient_id: mappedFoodcourtMap[p.id] || null,
              option_groups: [],
              has_options: false
            });
          }
          if (fpRows.length) extraSellers.push({ id: fc.id, name: fc.name, seller_type: 'foodcourt' });
        }
      }
    }

    res.json({
      success: true,
      data: [...data, ...extraData],
      filters: {
        categories: categories.map(c => ({ id: c.id, name: c.name, emoji: c.emoji })),
        suppliers: [
          ...suppliers.map(s => ({ id: s.id, name: s.name, seller_type: 'supplier' })),
          ...extraSellers
        ]
      }
    });
  } catch (err) {
    console.error('GET /api/supplier-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to load catalog' });
  }
});

// ============================================
// POST /api/external-suppliers — buyer 가 외부 (시스템 미가입) 공급업체 직접 등록
// 등록 시 SupplierCompany(is_system_registered=false) + 자동 active SupplierContract 생성.
// 이후 발주 흐름에 시스템 supplier 와 동일하게 노출되되 PO 자동 발송은 안 됨 (수동 PDF/WhatsApp).
// ============================================
router.post('/external-suppliers', async (req, res) => {
  if (!req.buyerEntity) {
    return res.status(400).json({ success: false, message: 'Buyer context required' });
  }
  const t = await SupplierCompany.sequelize.transaction();
  try {
    const {
      name, phone, email, address, address_line_2, city, state, postal_code, country,
      website, contact_person,
      min_order_amount, delivery_policy, notes
    } = req.body || {};
    if (!name || !String(name).trim()) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Supplier name is required' });
    }

    const company = await SupplierCompany.create({
      name: sanitizeString(String(name).trim()).slice(0, 255),
      status: 'active',
      is_system_registered: false,
      registered_by_entity_type: req.buyerEntity.type,
      registered_by_entity_id: req.buyerEntity.id,
      phone: phone ? sanitizeString(String(phone)).slice(0, 20) : null,
      email: email ? sanitizeString(String(email)).slice(0, 100) : null,
      address: address ? sanitizeString(String(address)) : null,
      address_line_2: address_line_2 ? sanitizeString(String(address_line_2)).slice(0, 255) : null,
      city: city ? sanitizeString(String(city)).slice(0, 100) : null,
      state: state ? sanitizeString(String(state)).slice(0, 100) : null,
      postal_code: postal_code ? sanitizeString(String(postal_code)).slice(0, 20) : null,
      country: country ? String(country).toUpperCase().slice(0, 2) : 'MY',
      website: website ? sanitizeString(String(website)).slice(0, 255) : null,
      min_order_amount: min_order_amount ? parseFloat(min_order_amount) : null,
      delivery_policy: delivery_policy ? sanitizeString(String(delivery_policy)) : null,
      description: notes ? sanitizeString(String(notes)) : null
    }, { transaction: t });

    // 자동 active contract — buyer 가 자기가 만든 supplier 면 즉시 발주 가능
    await SupplierContract.create({
      entity_type: req.buyerEntity.type,
      entity_id: req.buyerEntity.id,
      supplier_company_id: company.id,
      status: 'active',
      requested_by_user_id: req.user.id
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ success: true, data: { supplier: company } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/external-suppliers error:', err);
    res.status(500).json({ success: false, message: 'Failed to register external supplier' });
  }
});

// POST /api/external-suppliers/from-legacy/:legacyId — 레거시 suppliers(OWN) 디렉토리 항목을
// 외부공급업체 체계(supplier_companies)로 브리지. 상품등록/발주가 필요한 OWN 공급업체에서 호출.
// find-or-create: 이미 링크돼 있으면 그 id 반환, 없으면 미러 supplier_company + active contract 생성 +
// suppliers.supplier_company_id 링크. (레거시 행/재고 FK 는 그대로 — 회귀 0.) docs §10 브리지.
router.post('/external-suppliers/from-legacy/:legacyId', async (req, res) => {
  if (!req.buyerEntity) return res.status(400).json({ success: false, message: 'Buyer context required' });
  const t = await SupplierCompany.sequelize.transaction();
  try {
    const legacyId = parseInt(req.params.legacyId, 10);
    const legacy = await Supplier.findByPk(legacyId);
    if (!legacy) { await t.rollback(); return res.status(404).json({ success: false, message: 'Supplier not found' }); }
    const owns =
      (req.buyerEntity.type === 'restaurant' && legacy.owner_type === 'restaurant' && Number(legacy.restaurant_id) === req.buyerEntity.id) ||
      (req.buyerEntity.type === 'brand' && legacy.owner_type === 'brand' && Number(legacy.brand_id) === req.buyerEntity.id) ||
      (req.buyerEntity.type === 'foodcourt' && legacy.owner_type === 'foodcourt' && Number(legacy.foodcourt_id) === req.buyerEntity.id);
    if (!owns) { await t.rollback(); return res.status(403).json({ success: false, message: 'Not your supplier' }); }

    // 이미 브리지됨 → 그 supplier_company 반환 (멱등)
    if (legacy.supplier_company_id) {
      const existing = await SupplierCompany.findByPk(legacy.supplier_company_id);
      if (existing) { await t.commit(); return res.json({ success: true, data: { supplier_company_id: existing.id, bridged: false } }); }
    }

    const company = await SupplierCompany.create({
      name: sanitizeString(String(legacy.name || 'Supplier')).slice(0, 255),
      status: 'active',
      is_system_registered: false,
      registered_by_entity_type: req.buyerEntity.type,
      registered_by_entity_id: req.buyerEntity.id,
      phone: legacy.phone ? String(legacy.phone).slice(0, 20) : null,
      email: legacy.email ? String(legacy.email).slice(0, 100) : null,
      address: legacy.address || null,
      city: legacy.city || null,
      state: legacy.state || null,
      postal_code: legacy.postal_code || null,
      country: legacy.country ? String(legacy.country).toUpperCase().slice(0, 2) : 'MY',
      description: legacy.notes || null
    }, { transaction: t });

    await SupplierContract.create({
      entity_type: req.buyerEntity.type,
      entity_id: req.buyerEntity.id,
      supplier_company_id: company.id,
      status: 'active',
      requested_by_user_id: req.user.id
    }, { transaction: t });

    legacy.supplier_company_id = company.id;
    await legacy.save({ transaction: t });

    await t.commit();
    res.status(201).json({ success: true, data: { supplier_company_id: company.id, bridged: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/external-suppliers/from-legacy error:', err);
    res.status(500).json({ success: false, message: 'Failed to link supplier' });
  }
});

// PUT external supplier (buyer 가 자기가 등록한 것만 수정 가능)
router.put('/external-suppliers/:id', async (req, res) => {
  if (!req.buyerEntity) {
    return res.status(400).json({ success: false, message: 'Buyer context required' });
  }
  try {
    const id = parseInt(req.params.id, 10);
    const sc = await SupplierCompany.findByPk(id);
    if (!sc) return res.status(404).json({ success: false, message: 'Supplier not found' });
    if (sc.is_system_registered) {
      return res.status(403).json({ success: false, message: 'Only external suppliers can be edited here' });
    }
    if (sc.registered_by_entity_type !== req.buyerEntity.type || sc.registered_by_entity_id !== req.buyerEntity.id) {
      return res.status(403).json({ success: false, message: 'Not your supplier' });
    }
    const updates = {};
    const fields = ['name','phone','email','address','address_line_2','city','state','postal_code','website','contact_person','delivery_policy','description'];
    for (const f of fields) {
      if (req.body[f] !== undefined) updates[f] = req.body[f] ? sanitizeString(String(req.body[f])) : null;
    }
    if (req.body.country !== undefined) updates.country = req.body.country ? String(req.body.country).toUpperCase().slice(0, 2) : null;
    if (req.body.min_order_amount !== undefined) updates.min_order_amount = req.body.min_order_amount ? parseFloat(req.body.min_order_amount) : null;
    await sc.update(updates);
    res.json({ success: true, data: sc });
  } catch (err) {
    console.error('PUT /api/external-suppliers/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to update external supplier' });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 외부공급업체 상품 (External supplier products) — buyer 가 솔루션 미가입 공급업체의 상품을 직접 등록/관리.
// SupplierProduct 생성은 원래 Supplier Admin 만 가능했으나, 외부공급업체는 로그인할 일이 없어
// buyer 가 대신 등록해야 발주 가능. 안전: 내가 등록한 외부공급업체(is_system_registered=false +
// registered_by_entity = 나)에만 허용 → 플랫폼 가입 공급업체 카탈로그는 절대 못 건드림.
// docs/EXTERNAL_SUPPLIER_PRODUCTS.md
// ──────────────────────────────────────────────────────────────────────────────

// 소유 외부공급업체 검증. 통과 시 SupplierCompany 반환, 실패 시 응답 보내고 null.
async function loadOwnedExternalSupplier(req, res) {
  if (!req.buyerEntity) { res.status(400).json({ success: false, message: 'Buyer context required' }); return null; }
  const id = parseInt(req.params.id, 10);
  const sc = await SupplierCompany.findByPk(id);
  if (!sc) { res.status(404).json({ success: false, message: 'Supplier not found' }); return null; }
  if (sc.is_system_registered) {
    res.status(403).json({ success: false, code: 'NOT_EXTERNAL', message: 'Only external (non-platform) suppliers you registered can be managed here' });
    return null;
  }
  if (sc.registered_by_entity_type !== req.buyerEntity.type || sc.registered_by_entity_id !== req.buyerEntity.id) {
    res.status(403).json({ success: false, message: 'Not your supplier' });
    return null;
  }
  return sc;
}

// SupplierProduct 입력 검증 (supplier-products.js create 미러). { value } 또는 { error }.
function buildProductFields(body) {
  const name = sanitizeString(body.name || '');
  if (!name) return { error: 'Product name is required' };
  if (body.unit_price === undefined || body.unit_price === null || body.unit_price === '') return { error: 'unit_price is required' };
  const unit_price = parseFloat(body.unit_price);
  if (!Number.isFinite(unit_price) || unit_price < 0) return { error: 'unit_price must be a non-negative number' };
  const base_quantity = body.base_quantity !== undefined && body.base_quantity !== '' ? parseFloat(body.base_quantity) : 1;
  if (!Number.isFinite(base_quantity) || base_quantity < 0) return { error: 'base_quantity must be a non-negative number' };
  const min_order_quantity = body.min_order_quantity !== undefined && body.min_order_quantity !== '' ? parseInt(body.min_order_quantity, 10) : 1;
  if (!Number.isInteger(min_order_quantity) || min_order_quantity < 1) return { error: 'min_order_quantity must be >= 1' };
  const lead_time_days = body.lead_time_days !== undefined && body.lead_time_days !== '' ? parseInt(body.lead_time_days, 10) : 0;
  if (!Number.isInteger(lead_time_days) || lead_time_days < 0) return { error: 'lead_time_days must be a non-negative integer' };
  return { value: {
    name, unit_price, base_quantity, min_order_quantity, lead_time_days,
    unit: body.unit ? sanitizeString(String(body.unit)) : null,
    description: body.description ? sanitizeString(String(body.description)) : null,
    image_url: body.image_url || null,
    image_thumbnail: body.image_thumbnail || null,
    emoji: body.emoji ? sanitizeString(String(body.emoji)) : null,
    is_active: body.is_active !== false
  } };
}

// GET /api/external-suppliers — 내가 등록한 외부공급업체 목록 (+상품수)
router.get('/external-suppliers', async (req, res) => {
  if (!req.buyerEntity) return res.status(400).json({ success: false, message: 'Buyer context required' });
  try {
    const companies = await SupplierCompany.findAll({
      where: {
        is_system_registered: false,
        registered_by_entity_type: req.buyerEntity.type,
        registered_by_entity_id: req.buyerEntity.id,
        status: 'active'
      },
      order: [['name', 'ASC']]
    });
    const ids = companies.map(c => c.id);
    const counts = ids.length
      ? await SupplierProduct.findAll({ where: { supplier_company_id: { [Op.in]: ids } }, attributes: ['supplier_company_id', [fn('COUNT', col('id')), 'cnt']], group: ['supplier_company_id'], raw: true })
      : [];
    const cntMap = Object.fromEntries(counts.map(c => [c.supplier_company_id, Number(c.cnt)]));
    res.json({ success: true, data: companies.map(c => ({ id: c.id, name: c.name, phone: c.phone, email: c.email, product_count: cntMap[c.id] || 0 })) });
  } catch (err) {
    console.error('GET /api/external-suppliers error:', err);
    res.status(500).json({ success: false, message: 'Failed to load external suppliers' });
  }
});

// GET /api/external-suppliers/:id/products — 그 외부공급업체 상품 목록
router.get('/external-suppliers/:id/products', async (req, res) => {
  const sc = await loadOwnedExternalSupplier(req, res); if (!sc) return;
  try {
    const products = await SupplierProduct.findAll({
      where: { supplier_company_id: sc.id },
      include: [{ model: SupplierProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }],
      order: [['name', 'ASC']]
    });
    res.json({ success: true, data: products });
  } catch (err) {
    console.error('GET /api/external-suppliers/:id/products error:', err);
    res.status(500).json({ success: false, message: 'Failed to load products' });
  }
});

// POST /api/external-suppliers/:id/products — 외부공급업체 상품 등록
router.post('/external-suppliers/:id/products', async (req, res) => {
  const sc = await loadOwnedExternalSupplier(req, res); if (!sc) return;
  try {
    const built = buildProductFields(req.body || {});
    if (built.error) return res.status(400).json({ success: false, message: built.error });
    const count = await SupplierProduct.count({ where: { supplier_company_id: sc.id }, paranoid: false });
    const sku = req.body.sku ? sanitizeString(String(req.body.sku)) : `SP-${sc.id}-${String(count + 1).padStart(4, '0')}`;
    const product = await SupplierProduct.create({ supplier_company_id: sc.id, sku, current_stock: 0, low_stock_threshold: 0, sort_order: 0, ...built.value });
    const created = await SupplierProduct.findByPk(product.id, { include: [{ model: SupplierProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }] });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('POST /api/external-suppliers/:id/products error:', err);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

// PUT /api/external-suppliers/:id/products/:productId — 수정
router.put('/external-suppliers/:id/products/:productId', async (req, res) => {
  const sc = await loadOwnedExternalSupplier(req, res); if (!sc) return;
  try {
    const product = await SupplierProduct.findByPk(parseInt(req.params.productId, 10));
    if (!product || product.supplier_company_id !== sc.id) return res.status(404).json({ success: false, message: 'Product not found' });
    const built = buildProductFields(req.body || {});
    if (built.error) return res.status(400).json({ success: false, message: built.error });
    await product.update(built.value);
    const updated = await SupplierProduct.findByPk(product.id, { include: [{ model: SupplierProductCategory, as: 'category', attributes: ['id', 'name', 'emoji'] }] });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('PUT /api/external-suppliers/:id/products/:productId error:', err);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

// DELETE /api/external-suppliers/:id/products/:productId — soft delete
router.delete('/external-suppliers/:id/products/:productId', async (req, res) => {
  const sc = await loadOwnedExternalSupplier(req, res); if (!sc) return;
  try {
    const product = await SupplierProduct.findByPk(parseInt(req.params.productId, 10));
    if (!product || product.supplier_company_id !== sc.id) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/external-suppliers/:id/products/:productId error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

module.exports = router;
