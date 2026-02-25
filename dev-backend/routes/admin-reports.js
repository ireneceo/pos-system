const express = require('express');
const router = express.Router();
const { Op, fn, col, literal } = require('sequelize');
const { sequelize } = require('../config/database');
const Invoice = require('../models/Invoice');
const Restaurant = require('../models/Restaurant');
const EntityPlan = require('../models/EntityPlan');
const { authenticateToken, requireRole } = require('../middleware/auth');

// All endpoints require System Admin
router.use(authenticateToken, requireRole('System Admin'));

// Helper: date range from query params
function getDateRange(query) {
  const { start_date, end_date } = query;
  if (start_date && end_date) {
    return { start: new Date(start_date), end: new Date(end_date) };
  }
  // Default: this month
  const now = new Date();
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  };
}

// GET /revenue-summary
router.get('/revenue-summary', async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const currencyFilter = req.query.currency && req.query.currency !== 'all'
      ? { currency: req.query.currency } : {};

    const baseWhere = {
      status: { [Op.notIn]: ['draft', 'cancelled'] },
      issued_at: { [Op.between]: [start, end] },
      ...currencyFilter
    };

    const allInvoices = await Invoice.findAll({
      where: baseWhere,
      attributes: ['id', 'total_amount', 'paid_amount', 'status', 'currency']
    });

    let totalBilled = 0, totalCollected = 0, paidCount = 0, pendingAmount = 0;
    allInvoices.forEach(inv => {
      const amount = parseFloat(inv.total_amount) || 0;
      totalBilled += amount;
      if (inv.status === 'paid') {
        totalCollected += parseFloat(inv.paid_amount) || amount;
        paidCount++;
      }
      if (['pending_payment', 'payment_submitted', 'overdue'].includes(inv.status)) {
        pendingAmount += amount;
      }
    });

    res.json({
      success: true,
      data: {
        totalRevenue: totalCollected,
        pendingAmount,
        paidInvoices: paidCount,
        totalInvoices: allInvoices.length,
        collectionRate: totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching revenue summary:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch revenue summary' });
  }
});

// GET /revenue-trend
router.get('/revenue-trend', async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 12;
    const currencyFilter = req.query.currency && req.query.currency !== 'all'
      ? { currency: req.query.currency } : {};

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

    const invoices = await Invoice.findAll({
      where: {
        status: { [Op.notIn]: ['draft', 'cancelled'] },
        issued_at: { [Op.gte]: startDate },
        ...currencyFilter
      },
      attributes: ['total_amount', 'paid_amount', 'status', 'issued_at', 'paid_at']
    });

    // Group by month
    const monthlyData = {};
    for (let i = 0; i < months; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - months + 1 + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = { month: key, billed: 0, collected: 0 };
    }

    invoices.forEach(inv => {
      const issuedMonth = inv.issued_at ? `${new Date(inv.issued_at).getFullYear()}-${String(new Date(inv.issued_at).getMonth() + 1).padStart(2, '0')}` : null;
      if (issuedMonth && monthlyData[issuedMonth]) {
        monthlyData[issuedMonth].billed += parseFloat(inv.total_amount) || 0;
      }
      if (inv.status === 'paid' && inv.paid_at) {
        const paidMonth = `${new Date(inv.paid_at).getFullYear()}-${String(new Date(inv.paid_at).getMonth() + 1).padStart(2, '0')}`;
        if (monthlyData[paidMonth]) {
          monthlyData[paidMonth].collected += parseFloat(inv.paid_amount || inv.total_amount) || 0;
        }
      }
    });

    res.json({
      success: true,
      data: Object.values(monthlyData)
    });
  } catch (error) {
    console.error('Error fetching revenue trend:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch revenue trend' });
  }
});

// GET /revenue-by-category
router.get('/revenue-by-category', async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);

    const results = await Invoice.findAll({
      where: {
        status: 'paid',
        issued_at: { [Op.between]: [start, end] }
      },
      attributes: [
        'invoice_category',
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('total_amount')), 'total']
      ],
      group: ['invoice_category']
    });

    const data = results.map(r => ({
      category: r.invoice_category || 'others',
      count: parseInt(r.getDataValue('count')) || 0,
      total: parseFloat(r.getDataValue('total')) || 0
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching revenue by category:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch revenue by category' });
  }
});

// GET /payment-analysis
router.get('/payment-analysis', async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);
    const baseWhere = {
      status: { [Op.notIn]: ['draft', 'cancelled'] },
      issued_at: { [Op.between]: [start, end] }
    };

    // Status breakdown
    const statusResults = await Invoice.findAll({
      where: { ...baseWhere, status: { [Op.notIn]: ['cancelled'] } },
      attributes: [
        'status',
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('total_amount')), 'total']
      ],
      group: ['status']
    });

    const statusBreakdown = statusResults.map(r => ({
      status: r.status,
      count: parseInt(r.getDataValue('count')) || 0,
      total: parseFloat(r.getDataValue('total')) || 0
    }));

    // Payment method distribution (paid invoices only)
    const methodResults = await Invoice.findAll({
      where: { status: 'paid', issued_at: { [Op.between]: [start, end] } },
      attributes: [
        'payment_provider',
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('total_amount')), 'total']
      ],
      group: ['payment_provider']
    });

    const paymentMethods = methodResults.map(r => ({
      method: r.payment_provider || 'bank_transfer',
      count: parseInt(r.getDataValue('count')) || 0,
      total: parseFloat(r.getDataValue('total')) || 0
    }));

    // Average payment days
    const paidInvoices = await Invoice.findAll({
      where: { status: 'paid', issued_at: { [Op.between]: [start, end] }, paid_at: { [Op.ne]: null } },
      attributes: ['issued_at', 'paid_at']
    });

    let totalDays = 0;
    paidInvoices.forEach(inv => {
      const issued = new Date(inv.issued_at);
      const paid = new Date(inv.paid_at);
      totalDays += Math.max(0, Math.round((paid - issued) / (1000 * 60 * 60 * 24)));
    });
    const avgPaymentDays = paidInvoices.length > 0 ? Math.round(totalDays / paidInvoices.length) : 0;

    // Overdue count
    const overdueCount = await Invoice.count({ where: { status: 'overdue' } });
    const overdueAmount = await Invoice.sum('total_amount', { where: { status: 'overdue' } });

    // Awaiting confirmation
    const awaitingCount = await Invoice.count({ where: { status: 'payment_submitted' } });

    // This month collected
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonthCollected = await Invoice.sum('paid_amount', {
      where: { status: 'paid', paid_at: { [Op.gte]: monthStart } }
    });

    res.json({
      success: true,
      data: {
        statusBreakdown,
        paymentMethods,
        avgPaymentDays,
        overdueCount: overdueCount || 0,
        overdueAmount: parseFloat(overdueAmount) || 0,
        awaitingCount: awaitingCount || 0,
        thisMonthCollected: parseFloat(thisMonthCollected) || 0
      }
    });
  } catch (error) {
    console.error('Error fetching payment analysis:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch payment analysis' });
  }
});

// GET /overdue-invoices
router.get('/overdue-invoices', async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      where: { status: 'overdue' },
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name']
      }],
      order: [['due_date', 'ASC']]
    });

    const data = invoices.map(inv => {
      const daysOverdue = Math.round((new Date() - new Date(inv.due_date)) / (1000 * 60 * 60 * 24));
      return {
        id: inv.id,
        invoiceNumber: inv.invoice_number,
        restaurantName: inv.restaurant?.name || 'N/A',
        amount: parseFloat(inv.total_amount) || 0,
        currency: inv.currency,
        dueDate: inv.due_date,
        issuedAt: inv.issued_at,
        daysOverdue,
        payerType: inv.payer_type
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching overdue invoices:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch overdue invoices' });
  }
});

// GET /customer-analysis
router.get('/customer-analysis', async (req, res) => {
  try {
    const { start, end } = getDateRange(req.query);

    // Total restaurants
    const totalRestaurants = await Restaurant.count();

    // Active restaurants (with invoices in last 3 months)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const activeRestaurants = await Invoice.count({
      where: {
        status: { [Op.notIn]: ['draft', 'cancelled'] },
        issued_at: { [Op.gte]: threeMonthsAgo },
        restaurant_id: { [Op.ne]: null }
      },
      distinct: true,
      col: 'restaurant_id'
    });

    // New this month
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const newThisMonth = await Restaurant.count({
      where: { createdAt: { [Op.gte]: monthStart } }
    });

    // Top 10 restaurants by revenue
    const topRestaurants = await Invoice.findAll({
      where: {
        status: 'paid',
        restaurant_id: { [Op.ne]: null }
      },
      attributes: [
        'restaurant_id',
        [fn('SUM', col('Invoice.total_amount')), 'totalRevenue'],
        [fn('COUNT', col('Invoice.id')), 'invoiceCount']
      ],
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['name']
      }],
      group: ['restaurant_id', 'restaurant.id', 'restaurant.name'],
      order: [[literal('totalRevenue'), 'DESC']],
      limit: 10
    });

    // Overdue count per restaurant for top 10
    const topData = [];
    for (const r of topRestaurants) {
      const overdueCount = await Invoice.count({
        where: { restaurant_id: r.restaurant_id, status: 'overdue' }
      });
      topData.push({
        restaurantName: r.restaurant?.name || 'N/A',
        totalRevenue: parseFloat(r.getDataValue('totalRevenue')) || 0,
        invoiceCount: parseInt(r.getDataValue('invoiceCount')) || 0,
        overdueCount
      });
    }

    // Payer type distribution
    const payerResults = await Invoice.findAll({
      where: {
        status: 'paid',
        issued_at: { [Op.between]: [start, end] }
      },
      attributes: [
        'payer_type',
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('total_amount')), 'total']
      ],
      group: ['payer_type']
    });

    const payerDistribution = payerResults.map(r => ({
      payerType: r.payer_type || 'restaurant',
      count: parseInt(r.getDataValue('count')) || 0,
      total: parseFloat(r.getDataValue('total')) || 0
    }));

    // Monthly registration trend (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);

    const registrations = await Restaurant.findAll({
      where: { createdAt: { [Op.gte]: twelveMonthsAgo } },
      attributes: ['createdAt']
    });

    const regTrend = {};
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      regTrend[key] = { month: key, count: 0 };
    }
    registrations.forEach(r => {
      const d = new Date(r.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (regTrend[key]) regTrend[key].count++;
    });

    // ARPU
    const totalPaid = await Invoice.sum('total_amount', { where: { status: 'paid' } });
    const arpu = activeRestaurants > 0 ? (parseFloat(totalPaid) || 0) / activeRestaurants : 0;

    res.json({
      success: true,
      data: {
        totalRestaurants,
        activeRestaurants,
        newThisMonth,
        arpu,
        topRestaurants: topData,
        payerDistribution,
        registrationTrend: Object.values(regTrend)
      }
    });
  } catch (error) {
    console.error('Error fetching customer analysis:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customer analysis' });
  }
});

// GET /subscription-stats
router.get('/subscription-stats', async (req, res) => {
  try {
    // Active plans count
    const activePlans = await EntityPlan.count({ where: { is_active: true } });

    // MRR from automatic invoices (last month)
    const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const lastMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59);
    const mrrResult = await Invoice.sum('total_amount', {
      where: {
        type: 'automatic',
        status: { [Op.in]: ['paid', 'pending_payment', 'payment_submitted'] },
        issued_at: { [Op.between]: [lastMonthStart, lastMonthEnd] }
      }
    });
    const mrr = parseFloat(mrrResult) || 0;

    // Active subscribers (restaurants with automatic invoices)
    const activeSubscribers = await Invoice.count({
      where: {
        type: 'automatic',
        status: { [Op.notIn]: ['draft', 'cancelled'] },
        issued_at: { [Op.between]: [lastMonthStart, lastMonthEnd] },
        restaurant_id: { [Op.ne]: null }
      },
      distinct: true,
      col: 'restaurant_id'
    });

    const arpu = activeSubscribers > 0 ? mrr / activeSubscribers : 0;

    // Plan distribution - from invoice categories
    const planDistribution = await Invoice.findAll({
      where: {
        type: 'automatic',
        status: { [Op.notIn]: ['draft', 'cancelled'] },
        issued_at: { [Op.between]: [lastMonthStart, lastMonthEnd] }
      },
      attributes: [
        'category_display_name',
        'invoice_category',
        [fn('COUNT', col('id')), 'subscriberCount'],
        [fn('SUM', col('total_amount')), 'monthlyRevenue']
      ],
      group: ['category_display_name', 'invoice_category']
    });

    const plans = planDistribution.map(p => ({
      planName: p.category_display_name || p.invoice_category || 'Unknown',
      subscriberCount: parseInt(p.getDataValue('subscriberCount')) || 0,
      monthlyRevenue: parseFloat(p.getDataValue('monthlyRevenue')) || 0
    }));

    // Most popular plan
    const mostPopular = plans.length > 0
      ? plans.reduce((a, b) => a.subscriberCount > b.subscriberCount ? a : b).planName
      : 'N/A';

    res.json({
      success: true,
      data: {
        activePlans,
        mrr,
        activeSubscribers,
        arpu,
        mostPopularPlan: mostPopular,
        planDistribution: plans
      }
    });
  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch subscription stats' });
  }
});

module.exports = router;
