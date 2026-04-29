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
// POST /api/purchase-invoices/soa/:supplierCompanyId/pay
// — supplier 의 모든 monthly_soa contract 미결 인보이스 일괄 payment_submitted
// ============================================
router.post('/purchase-invoices/soa/:supplierCompanyId/pay', async (req, res) => {
  try {
    if (!req.buyerEntity) {
      return res.status(400).json({ success: false, message: 'Buyer scope required' });
    }
    const supplierId = parseInt(req.params.supplierCompanyId, 10);
    if (!Number.isFinite(supplierId)) {
      return res.status(400).json({ success: false, message: 'Invalid supplier id' });
    }
    const payer = await resolvePayerForBuyer(req.buyerEntity);
    if (!payer) {
      return res.status(400).json({ success: false, message: 'Could not resolve payer' });
    }
    // monthly_soa contract 확인
    const contract = await SupplierContract.findOne({
      where: {
        supplier_company_id: supplierId,
        entity_type: req.buyerEntity.type,
        entity_id: req.buyerEntity.id,
        status: 'active'
      }
    });
    if (!contract || contract.payment_terms?.invoice_cycle !== 'monthly_soa') {
      return res.status(400).json({ success: false, message: 'No active monthly_soa contract with this supplier' });
    }

    const invoices = await Invoice.findAll({
      where: {
        invoice_category: 'trade',
        issuer_type: 'supplier',
        issuer_id: supplierId,
        payer_type: payer.payer_type,
        payer_id: payer.payer_id,
        status: { [Op.in]: ['pending_payment', 'overdue'] }
      }
    });
    const now = new Date();
    let count = 0;
    for (const inv of invoices) {
      await inv.update({ status: 'payment_submitted', payment_submitted_at: now });
      count++;
    }
    res.json({ success: true, data: { count, total_invoices: invoices.length } });
  } catch (err) {
    console.error('POST /api/purchase-invoices/soa/:supplierCompanyId/pay error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit SOA payment' });
  }
});

// ============================================
// GET /api/purchase-invoices/soa/:supplierCompanyId/pdf
// — SOA 표지 + 포함 인보이스 한 PDF (HTML 응답, 브라우저 인쇄 → PDF)
// ============================================
router.get('/purchase-invoices/soa/:supplierCompanyId/pdf', async (req, res) => {
  try {
    if (!req.buyerEntity) {
      return res.status(400).json({ success: false, message: 'Buyer scope required' });
    }
    const supplierId = parseInt(req.params.supplierCompanyId, 10);
    const payer = await resolvePayerForBuyer(req.buyerEntity);
    if (!payer) {
      return res.status(400).json({ success: false, message: 'Could not resolve payer' });
    }
    const supplier = await SupplierCompany.findByPk(supplierId, { attributes: ['id', 'name', 'company_name', 'address', 'email', 'phone'] });
    const invoices = await Invoice.findAll({
      where: {
        invoice_category: 'trade',
        issuer_type: 'supplier',
        issuer_id: supplierId,
        payer_type: payer.payer_type,
        payer_id: payer.payer_id,
        status: { [Op.in]: ['pending_payment', 'overdue', 'payment_submitted'] }
      },
      include: [{ model: InvoiceItem, as: 'items' }],
      order: [['issued_at', 'ASC']]
    });
    if (invoices.length === 0) {
      return res.status(404).json({ success: false, message: 'No SOA invoices' });
    }

    const total = invoices.reduce((s, i) => s + Number(i.total_amount || 0), 0);
    const currency = invoices[0]?.currency || 'MYR';
    const supplierName = supplier?.company_name || supplier?.name || `Supplier #${supplierId}`;
    const now = new Date();
    const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const html = `<!doctype html><html><head><meta charset="utf-8">
<title>SOA - ${supplierName}</title>
<style>
  body { font-family: -apple-system, sans-serif; padding: 32px; color: #0A2540; }
  h1 { font-size: 26px; margin: 0 0 4px; }
  .sub { color: #6B7280; font-size: 13px; margin-bottom: 24px; }
  .cover { border: 1px solid #E6EBF1; padding: 20px; border-radius: 8px; margin-bottom: 32px; }
  .cover-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #F1F5F9; }
  .cover-row:last-child { border-bottom: none; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
  th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #F1F5F9; }
  th { background: #F8FAFC; font-weight: 600; color: #475569; }
  .num { text-align: right; }
  .total-row td { font-weight: 700; background: #F1F5F9; border-top: 2px solid #635BFF; }
  .invoice-block { margin-top: 32px; padding-top: 24px; border-top: 2px dashed #E6EBF1; page-break-before: always; }
  .invoice-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
  h2 { font-size: 18px; margin: 0; }
</style></head><body>
<h1>Statement of Account</h1>
<div class="sub">${supplierName} · ${monthLabel}</div>

<div class="cover">
  <div class="cover-row"><span>Supplier</span><strong>${supplierName}</strong></div>
  <div class="cover-row"><span>Period</span><strong>${monthLabel}</strong></div>
  <div class="cover-row"><span>Invoice Count</span><strong>${invoices.length}</strong></div>
  <div class="cover-row"><span>Total Amount</span><strong>${currency} ${total.toFixed(2)}</strong></div>
</div>

<h2>Included Invoices</h2>
<table>
  <thead><tr><th>Invoice #</th><th>Issued</th><th>Due</th><th class="num">Subtotal</th><th class="num">Total</th><th>Status</th></tr></thead>
  <tbody>
    ${invoices.map(i => `<tr>
      <td>${i.invoice_number || '-'}</td>
      <td>${i.issued_at ? new Date(i.issued_at).toLocaleDateString() : '-'}</td>
      <td>${i.due_date ? new Date(i.due_date).toLocaleDateString() : '-'}</td>
      <td class="num">${Number(i.subtotal || 0).toFixed(2)}</td>
      <td class="num">${Number(i.total_amount || 0).toFixed(2)}</td>
      <td>${i.status}</td>
    </tr>`).join('')}
    <tr class="total-row"><td colspan="4" class="num">Grand Total (${currency})</td><td class="num">${total.toFixed(2)}</td><td></td></tr>
  </tbody>
</table>

${invoices.map(inv => `
  <div class="invoice-block">
    <div class="invoice-header">
      <h2>${inv.invoice_number || '-'}</h2>
      <span>${inv.issued_at ? new Date(inv.issued_at).toLocaleDateString() : ''}</span>
    </div>
    <table>
      <thead><tr><th>Description</th><th class="num">Qty</th><th class="num">Unit Price</th><th class="num">Amount</th></tr></thead>
      <tbody>
        ${(inv.items || []).map(it => `<tr>
          <td>${it.description || it.item_name || '-'}</td>
          <td class="num">${it.quantity || 1}</td>
          <td class="num">${Number(it.unit_price || it.fixed_amount || 0).toFixed(2)}</td>
          <td class="num">${Number(it.calculated_amount || it.fixed_amount || 0).toFixed(2)}</td>
        </tr>`).join('')}
        <tr class="total-row"><td colspan="3" class="num">Total</td><td class="num">${Number(inv.total_amount || 0).toFixed(2)}</td></tr>
      </tbody>
    </table>
  </div>
`).join('')}
<script>window.onload = function() { setTimeout(function(){ window.print(); }, 300); };</script>
</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('GET /api/purchase-invoices/soa/:supplierCompanyId/pdf error:', err);
    res.status(500).json({ success: false, message: 'Failed to render SOA PDF' });
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
