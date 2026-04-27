/**
 * Purchase Invoices — Sprint 4 (Supply Chain Design 4)
 *
 * Buyer-facing trade invoice endpoints (Restaurant / Brand / Foodcourt).
 * Trade invoices are issued by sellers (Supplier / Brand / Foodcourt) on PO receive
 * (see services/purchaseOrderService.js).
 *
 * 3 endpoints — all require: authenticateToken + requireBuyerRole
 *
 * IDOR defense: payer match enforced on every :id operation.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  Invoice,
  InvoiceItem,
  PurchaseOrder,
  SupplierContract,
  SupplierCompany,
  Brand,
  Foodcourt,
  Restaurant
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');

router.use('/purchase-invoices', authenticateToken, requireBuyerRole);

// ============================================
// Helpers
// ============================================

/**
 * Resolve payer filter (payer_type, payer_id) from buyer entity.
 *  - restaurant → ('restaurant', restaurant.id)
 *  - brand → ('brand_manager', brand.owner_id)
 *  - foodcourt → ('foodcourt_manager', foodcourt.owner_id)
 *
 * Returns null when the buyer entity has no resolvable payer.
 */
async function resolvePayerForBuyer(buyerEntity) {
  if (!buyerEntity) return null;
  if (buyerEntity.type === 'restaurant') {
    return { payer_type: 'restaurant', payer_id: buyerEntity.id };
  }
  if (buyerEntity.type === 'brand') {
    const b = await Brand.findByPk(buyerEntity.id, { attributes: ['id', 'owner_id'] });
    if (!b || !b.owner_id) return null;
    return { payer_type: 'brand_manager', payer_id: b.owner_id };
  }
  if (buyerEntity.type === 'foodcourt') {
    const f = await Foodcourt.findByPk(buyerEntity.id, { attributes: ['id', 'owner_id'] });
    if (!f || !f.owner_id) return null;
    return { payer_type: 'foodcourt_manager', payer_id: f.owner_id };
  }
  return null;
}

function checkPayerMatch(invoice, payer) {
  if (!payer) return false;
  return invoice.payer_type === payer.payer_type
    && parseInt(invoice.payer_id, 10) === parseInt(payer.payer_id, 10);
}

/** Resolve issuer info for display. */
async function resolveIssuerInfo(invoice) {
  try {
    const t = invoice.issuer_type;
    const id = invoice.issuer_id;
    if (!id) return { id: null, type: t || 'system_admin', name: 'System Admin' };
    if (t === 'supplier') {
      const c = await SupplierCompany.findByPk(id, { attributes: ['id', 'name', 'company_name', 'email'] });
      return c ? { id: c.id, type: 'supplier', name: c.company_name || c.name, email: c.email } : null;
    }
    if (t === 'brand') {
      const b = await Brand.findByPk(id, { attributes: ['id', 'name'] });
      return b ? { id: b.id, type: 'brand', name: b.name } : null;
    }
    if (t === 'foodcourt') {
      const f = await Foodcourt.findByPk(id, { attributes: ['id', 'name'] });
      return f ? { id: f.id, type: 'foodcourt', name: f.name } : null;
    }
    return { id, type: t || 'system_admin', name: 'System Admin' };
  } catch (e) {
    console.error('[purchase-invoices] resolveIssuerInfo error:', e.message);
    return null;
  }
}

// ============================================
// 7. GET /api/purchase-invoices
// ============================================
router.get('/purchase-invoices', async (req, res) => {
  try {
    if (!req.buyerEntity && !req.buyerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Buyer scope required' });
    }
    const payer = await resolvePayerForBuyer(req.buyerEntity);
    // System Admin without override → list all trade invoices (admin view)
    if (!payer && !req.buyerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Could not resolve payer for this buyer' });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const where = { invoice_category: 'trade' };
    if (payer) {
      where.payer_type = payer.payer_type;
      where.payer_id = payer.payer_id;
    }
    if (req.query.status) where.status = req.query.status;

    const { rows, count } = await Invoice.findAndCountAll({
      where,
      include: [{ model: InvoiceItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    const data = await Promise.all(rows.map(async (inv) => {
      const obj = inv.toJSON();
      obj.issuer = await resolveIssuerInfo(inv);
      return obj;
    }));

    res.json({
      success: true,
      data,
      pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('GET /api/purchase-invoices error:', err);
    res.status(500).json({ success: false, message: 'Failed to load purchase invoices' });
  }
});

// ============================================
// 9. GET /api/purchase-invoices/soa/current
//    (defined BEFORE /:id to avoid collision)
// ============================================
router.get('/purchase-invoices/soa/current', async (req, res) => {
  try {
    if (!req.buyerEntity && !req.buyerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Buyer scope required' });
    }
    const payer = await resolvePayerForBuyer(req.buyerEntity);
    if (!payer && !req.buyerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Could not resolve payer for this buyer' });
    }

    const where = {
      invoice_category: 'trade',
      issuer_type: 'supplier',
      status: { [Op.in]: ['pending_payment', 'overdue', 'pending'] }
    };
    if (payer) {
      where.payer_type = payer.payer_type;
      where.payer_id = payer.payer_id;
    }

    const invoices = await Invoice.findAll({
      where,
      include: [{ model: InvoiceItem, as: 'items' }],
      order: [['issuer_id', 'ASC'], ['createdAt', 'DESC']]
    });

    // Filter by monthly_soa contracts only
    // Group by issuer_id (supplier_company_id) → look up contract
    const grouped = new Map();
    for (const inv of invoices) {
      const supplierId = inv.issuer_id;
      if (!supplierId) continue;

      // Resolve buyer entity_type/entity_id matching this payer
      // For restaurant: entity_type='restaurant', entity_id=payer.payer_id
      // For brand_manager: lookup brand by owner_id; for foodcourt_manager similarly
      let entityType = null, entityId = null;
      if (inv.payer_type === 'restaurant') {
        entityType = 'restaurant'; entityId = inv.payer_id;
      } else if (inv.payer_type === 'brand_manager') {
        const b = await Brand.findOne({ where: { owner_id: inv.payer_id }, attributes: ['id'] });
        if (b) { entityType = 'brand'; entityId = b.id; }
      } else if (inv.payer_type === 'foodcourt_manager') {
        const f = await Foodcourt.findOne({ where: { owner_id: inv.payer_id }, attributes: ['id'] });
        if (f) { entityType = 'foodcourt'; entityId = f.id; }
      }
      if (!entityType) continue;

      const contract = await SupplierContract.findOne({
        where: {
          supplier_company_id: supplierId,
          entity_type: entityType,
          entity_id: entityId,
          status: 'active'
        }
      });
      if (!contract) continue;
      const cycle = contract.payment_terms?.invoice_cycle;
      if (cycle !== 'monthly_soa') continue;

      const key = supplierId;
      if (!grouped.has(key)) {
        const supplier = await SupplierCompany.findByPk(supplierId, { attributes: ['id', 'name', 'company_name'] });
        grouped.set(key, {
          supplier_company_id: supplierId,
          supplier: supplier ? {
            id: supplier.id,
            name: supplier.company_name || supplier.name
          } : null,
          payment_terms: contract.payment_terms || null,
          contract_id: contract.id,
          invoices: [],
          subtotal: 0,
          total: 0,
          count: 0,
          currency: inv.currency || 'MYR'
        });
      }
      const g = grouped.get(key);
      g.invoices.push(inv.toJSON());
      g.subtotal += Number(inv.subtotal || 0);
      g.total += Number(inv.total_amount || 0);
      g.count += 1;
    }

    // Round
    for (const g of grouped.values()) {
      g.subtotal = Math.round(g.subtotal * 100) / 100;
      g.total = Math.round(g.total * 100) / 100;
    }

    res.json({ success: true, data: { groups: Array.from(grouped.values()) } });
  } catch (err) {
    console.error('GET /api/purchase-invoices/soa/current error:', err);
    res.status(500).json({ success: false, message: 'Failed to load SOA' });
  }
});

// ============================================
// 8. GET /api/purchase-invoices/:id
// ============================================
router.get('/purchase-invoices/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    const payer = await resolvePayerForBuyer(req.buyerEntity);
    if (!payer && !req.buyerIsAdmin) {
      return res.status(400).json({ success: false, message: 'Could not resolve payer for this buyer' });
    }

    const inv = await Invoice.findByPk(id, {
      include: [{ model: InvoiceItem, as: 'items' }]
    });
    if (!inv || inv.invoice_category !== 'trade') {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    if (payer && !checkPayerMatch(inv, payer)) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const obj = inv.toJSON();
    obj.issuer = await resolveIssuerInfo(inv);

    // Linked PO via Invoice.contract_id → SupplierContract → look up PO using trade_invoice_id back-link
    obj.linked_po = null;
    obj.linked_contract = null;
    if (inv.contract_id) {
      const contract = await SupplierContract.findByPk(inv.contract_id, {
        include: [{ model: SupplierCompany, as: 'supplierCompany', attributes: ['id', 'name', 'company_name'] }]
      });
      if (contract) obj.linked_contract = contract.toJSON();
    }
    // PO that was the source of this trade invoice
    const po = await PurchaseOrder.findOne({ where: { trade_invoice_id: inv.id } });
    if (po) obj.linked_po = po.toJSON();

    res.json({ success: true, data: obj });
  } catch (err) {
    console.error('GET /api/purchase-invoices/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to load invoice' });
  }
});

module.exports = router;
