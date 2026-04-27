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
const { Op } = require('sequelize');
const {
  SupplierCompany,
  SupplierContract,
  SupplierProduct,
  SupplierProductCategory,
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
  'status', 'created_at'
];

// Buyer-only middleware applied per-path so unrelated /api/* requests
// (e.g. /api/supplier/notices) are not blocked by router-level guards.
router.use(['/supplier-directory', '/supplier-contracts'], authenticateToken, requireBuyerRole);

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
    if (search && String(search).trim()) {
      const term = `%${String(search).trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: term } },
        { company_name: { [Op.like]: term } },
        { description: { [Op.like]: term } },
        { city: { [Op.like]: term } }
      ];
    }

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

module.exports = router;
