/**
 * 임차인 임대료 청구 (Tenant Rent Billing) — 마운트: /api/rent
 * 설계: docs/TENANT_RENT_BILLING.md
 *
 * 임대사업자(계약 발행 엔티티 = 푸드코트 등)가 임차 매장에게 매월 임대료를 청구한다.
 * 발행 로직은 services/rentBilling.js 하나만 쓴다(스케줄러와 공유).
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken, requireRole } = require('../middleware/auth');
const Contract = require('../models/Contract');
const Invoice = require('../models/Invoice');
const Restaurant = require('../models/Restaurant');
const FoodcourtUnit = require('../models/FoodcourtUnit');
const rentBilling = require('../services/rentBilling');

const PAID_STATUSES = ['paid', 'completed'];

/**
 * 호출자의 계약 스코프. System Admin 은 전체(null), 운영자는 자기 엔티티만.
 * 다른 역할은 null 이 아니라 'DENY' → 라우트에서 403.
 * (contracts.js 의 getUserEntity 와 동일 규칙 — 스코프 정의를 갈라놓지 않는다.)
 */
function scopeOf(user) {
  if (user.role === 'System Admin') return { all: true };
  if ((user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') && user.foodcourt_id) {
    return { all: false, entityType: 'foodcourt', entityId: user.foodcourt_id };
  }
  if ((user.role === 'Brand General' || user.role === 'Brand Manager') && user.brand_id) {
    return { all: false, entityType: 'brand', entityId: user.brand_id };
  }
  return null;
}

/** 계약 + 임차 매장 + 유닛 + 이번 달 인보이스 → 화면용 행 */
async function buildTenantRows(scope) {
  const contracts = await rentBilling.activeRentContracts(
    scope.all ? {} : { entityType: scope.entityType, entityId: scope.entityId }
  );
  if (!contracts.length) return [];

  const monthStr = rentBilling.currentMonth();
  const { start } = rentBilling.monthBounds(monthStr);

  const restaurantIds = [...new Set(contracts.map((c) => c.restaurant_id).filter(Boolean))];
  const unitIds = [...new Set(contracts.map((c) => c.unit_id).filter(Boolean))];

  const [restaurants, units, invoices] = await Promise.all([
    restaurantIds.length
      ? Restaurant.findAll({ where: { id: { [Op.in]: restaurantIds } }, attributes: ['id', 'name', 'phone', 'currency'] })
      : [],
    unitIds.length
      ? FoodcourtUnit.findAll({ where: { id: { [Op.in]: unitIds } } })
      : [],
    Invoice.findAll({
      where: {
        invoice_category: rentBilling.CATEGORY,
        contract_id: { [Op.in]: contracts.map((c) => c.id) },
        billing_period_start: start,
      },
    }),
  ]);

  const rById = Object.fromEntries(restaurants.map((r) => [r.id, r]));
  const uById = Object.fromEntries(units.map((u) => [u.id, u]));
  const invByContract = Object.fromEntries(invoices.map((i) => [i.contract_id, i]));
  const now = Date.now();

  return contracts.map((c) => {
    const terms = rentBilling.rentTermsOf(c);
    const inv = invByContract[c.id];
    const tenant = c.restaurant_id ? rById[c.restaurant_id] : null;
    const unit = c.unit_id ? uById[c.unit_id] : null;

    // 상태: 청구서가 없으면 pending(아직 미발행), 있으면 결제여부·납기 기준
    let status = 'pending';
    let daysOverdue = 0;
    if (inv) {
      if (PAID_STATUSES.includes(inv.status)) {
        status = 'paid';
      } else if (inv.due_date && new Date(inv.due_date).getTime() < now) {
        status = 'overdue';
        daysOverdue = Math.floor((now - new Date(inv.due_date).getTime()) / 86400000);
      }
    }

    return {
      contractId: c.id,
      tenantName: tenant?.name || c.applicant_company_name || 'Unknown',
      restaurantId: c.restaurant_id || null,
      unit: unit ? (unit.unit_number || unit.name || `#${unit.id}`) : null,
      unitSize: unit && unit.size_value ? `${unit.size_value} ${unit.size_unit || ''}`.trim() : null,
      monthlyRent: terms.baseRent,
      maintenanceFee: terms.maintenanceFee,
      totalMonthly: terms.baseRent + terms.maintenanceFee,
      currency: c.currency || tenant?.currency || 'MYR',
      billingDay: terms.billingDay,
      dueDate: inv?.due_date || null,
      status,
      daysOverdue,
      lastInvoice: inv
        ? { id: inv.id, number: inv.invoice_number, amount: Number(inv.total_amount), status: inv.status }
        : null,
      contractEndDate: c.end_date || null,
      contactPhone: tenant?.phone || c.applicant_phone || null,
    };
  });
}

// GET /api/rent/tenants — 임차인별 임대 현황
router.get('/tenants', authenticateToken, async (req, res) => {
  try {
    const scope = scopeOf(req.user);
    if (!scope) return res.status(403).json({ success: false, message: 'Not authorized to view rent data.' });

    let rows = await buildTenantRows(scope);

    const status = String(req.query.status || 'all');
    if (['paid', 'pending', 'overdue'].includes(status)) rows = rows.filter((r) => r.status === status);

    const search = String(req.query.search || '').trim().toLowerCase();
    if (search) {
      rows = rows.filter((r) =>
        (r.tenantName || '').toLowerCase().includes(search) || (r.unit || '').toLowerCase().includes(search));
    }

    res.json({ success: true, data: rows });
  } catch (e) {
    console.error('[rent-billing] tenants error:', e);
    res.status(500).json({ success: false, message: 'Failed to load rent data.' });
  }
});

// GET /api/rent/summary — 상단 통계
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const scope = scopeOf(req.user);
    if (!scope) return res.status(403).json({ success: false, message: 'Not authorized to view rent data.' });

    const rows = await buildTenantRows(scope);
    res.json({
      success: true,
      data: {
        totalTenants: rows.length,
        paid: rows.filter((r) => r.status === 'paid').length,
        pending: rows.filter((r) => r.status === 'pending').length,
        overdue: rows.filter((r) => r.status === 'overdue').length,
        monthlyRentTotal: Math.round(rows.reduce((s, r) => s + r.totalMonthly, 0) * 100) / 100,
        currency: rows[0]?.currency || 'MYR',
      },
    });
  } catch (e) {
    console.error('[rent-billing] summary error:', e);
    res.status(500).json({ success: false, message: 'Failed to load rent summary.' });
  }
});

// POST /api/rent/generate — 임대료 청구서 발행 (멱등: 같은 달 중복 발행 0)
router.post('/generate', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { month, contractId } = req.body || {};
    // 수동 발행도 스케줄러와 같은 알림 경로를 탄다 — 두 경로가 달라지면 "발행됐는데 메일이 안 왔다"가 생긴다
    const invoiceScheduler = require('../services/invoiceScheduler');
    const notifier = invoiceScheduler.sendInvoiceEmail?.bind(invoiceScheduler);
    const result = await rentBilling.generateRentInvoices({ month, contractId, notifier });
    res.json({ success: true, data: result });
  } catch (e) {
    if (e.code === 'INVALID_MONTH') {
      return res.status(400).json({ success: false, message: e.message });
    }
    console.error('[rent-billing] generate error:', e);
    res.status(500).json({ success: false, message: 'Failed to generate rent invoices.' });
  }
});

module.exports = router;
