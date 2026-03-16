const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken, requireRole } = require('../middleware/auth');
const Restaurant = require('../models/Restaurant');
const RestaurantManager = require('../models/RestaurantManager');
const User = require('../models/User');
const Order = require('../models/Order');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const { getIssuerCompanyInfo, getPayerCompanyInfo } = require('./invoices');
const { getTodayBounds, getStartOfMonth, getEndOfMonth, getSiteTimezone } = require('../utils/dateTimeHelper');

// All routes require authentication
router.use(authenticateToken);

// ============================================
// Owner: 소유 레스토랑 목록
// ============================================
router.get('/restaurants', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    // restaurant_managers에서 ownership 관계인 레스토랑 조회
    const ownerships = await RestaurantManager.findAll({
      where: {
        manager_id: req.user.id,
        relationship_type: 'ownership'
      },
      attributes: ['restaurant_id']
    });

    const restaurantIds = ownerships.map(o => o.restaurant_id);

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const restaurants = await Restaurant.findAll({
      where: { id: { [Op.in]: restaurantIds } },
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'full_name', 'username', 'email', 'phone', 'role']
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('[OWNER] Get restaurants error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get restaurants' });
  }
});

// ============================================
// Owner: 통합 대시보드 (모든 소유 레스토랑 요약)
// ============================================
router.get('/dashboard', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const ownerships = await RestaurantManager.findAll({
      where: {
        manager_id: req.user.id,
        relationship_type: 'ownership'
      },
      attributes: ['restaurant_id']
    });

    const restaurantIds = ownerships.map(o => o.restaurant_id);

    if (restaurantIds.length === 0) {
      return res.json({
        success: true,
        data: {
          totalRestaurants: 0,
          todayRevenue: 0,
          monthRevenue: 0,
          totalOrders: 0,
          pendingInvoices: 0,
          restaurants: []
        }
      });
    }

    // 오늘 날짜 범위 (사이트 타임존 기준)
    const tz = await getSiteTimezone();
    const { startOfDay: today, endOfDay: todayEnd } = getTodayBounds(tz);
    const tomorrow = todayEnd; // used as upper bound

    // 이번 달 범위
    const monthStart = getStartOfMonth(tz);
    const monthEnd = getEndOfMonth(tz);

    // 레스토랑 기본 정보
    const restaurants = await Restaurant.findAll({
      where: { id: { [Op.in]: restaurantIds } },
      include: [{
        model: User,
        as: 'admin',
        attributes: ['id', 'full_name', 'email']
      }],
      attributes: ['id', 'name', 'status', 'plan_type', 'currency', 'admin_name']
    });

    // 오늘 매출 (레스토랑별)
    const todayOrders = await Order.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        createdAt: { [Op.gte]: today, [Op.lte]: tomorrow },
        status: { [Op.notIn]: ['cancelled', 'refunded'] }
      },
      attributes: ['restaurant_id', 'total_amount']
    });

    // 이번 달 매출 (레스토랑별)
    const monthOrders = await Order.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        createdAt: { [Op.gte]: monthStart, [Op.lte]: monthEnd },
        status: { [Op.notIn]: ['cancelled', 'refunded'] }
      },
      attributes: ['restaurant_id', 'total_amount']
    });

    // 미결제 인보이스 수
    const pendingInvoices = await Invoice.count({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: { [Op.in]: ['pending_payment', 'overdue'] }
      }
    });

    // 레스토랑별 매출 집계
    const todayByRestaurant = {};
    const monthByRestaurant = {};
    let totalTodayRevenue = 0;
    let totalMonthRevenue = 0;

    todayOrders.forEach(order => {
      const amount = parseFloat(order.total_amount) || 0;
      todayByRestaurant[order.restaurant_id] = (todayByRestaurant[order.restaurant_id] || 0) + amount;
      totalTodayRevenue += amount;
    });

    monthOrders.forEach(order => {
      const amount = parseFloat(order.total_amount) || 0;
      monthByRestaurant[order.restaurant_id] = (monthByRestaurant[order.restaurant_id] || 0) + amount;
      totalMonthRevenue += amount;
    });

    // 레스토랑 데이터에 매출 추가
    const restaurantData = restaurants.map(r => ({
      id: r.id,
      name: r.name,
      status: r.status,
      plan_type: r.plan_type,
      currency: r.currency,
      admin_name: r.admin_name || (r.admin ? r.admin.full_name : null),
      todayRevenue: todayByRestaurant[r.id] || 0,
      monthRevenue: monthByRestaurant[r.id] || 0
    }));

    res.json({
      success: true,
      data: {
        totalRestaurants: restaurantIds.length,
        todayRevenue: totalTodayRevenue,
        monthRevenue: totalMonthRevenue,
        totalOrders: monthOrders.length,
        pendingInvoices,
        restaurants: restaurantData
      }
    });
  } catch (error) {
    console.error('[OWNER] Dashboard error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
});

// ============================================
// Owner: 레스토랑별 상세 통계
// ============================================
router.get('/restaurants/:restaurantId/stats', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { period = 'month' } = req.query; // day, week, month, year

    // 소유 확인
    const ownership = await RestaurantManager.findOne({
      where: {
        restaurant_id: restaurantId,
        manager_id: req.user.id,
        relationship_type: 'ownership'
      }
    });

    if (!ownership) {
      return res.status(403).json({ success: false, message: 'Access denied to this restaurant' });
    }

    // 기간 계산
    const now = new Date();
    let startDate;
    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'month':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        createdAt: { [Op.gte]: startDate },
        status: { [Op.notIn]: ['cancelled', 'refunded'] }
      },
      attributes: ['id', 'total_amount', 'order_type', 'payment_method', 'createdAt', 'status']
    });

    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 주문 유형별 집계
    const orderByType = {};
    const orderByPayment = {};
    orders.forEach(order => {
      const type = order.order_type || 'unknown';
      orderByType[type] = (orderByType[type] || 0) + 1;

      const payment = order.payment_method || 'unknown';
      orderByPayment[payment] = (orderByPayment[payment] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        period,
        totalRevenue,
        totalOrders,
        averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
        orderByType,
        orderByPayment
      }
    });
  } catch (error) {
    console.error('[OWNER] Restaurant stats error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get restaurant stats' });
  }
});

// ============================================
// Owner: 레스토랑 간 비교 통계
// ============================================
router.get('/statistics/compare', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    const ownerships = await RestaurantManager.findAll({
      where: {
        manager_id: req.user.id,
        relationship_type: 'ownership'
      },
      attributes: ['restaurant_id']
    });

    const restaurantIds = ownerships.map(o => o.restaurant_id);

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 기간 계산
    const now = new Date();
    let startDate;
    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'month':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const restaurants = await Restaurant.findAll({
      where: { id: { [Op.in]: restaurantIds } },
      attributes: ['id', 'name', 'currency']
    });

    const orders = await Order.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        createdAt: { [Op.gte]: startDate },
        status: { [Op.notIn]: ['cancelled', 'refunded'] }
      },
      attributes: ['restaurant_id', 'total_amount', 'createdAt']
    });

    // 레스토랑별 집계
    const statsByRestaurant = {};
    restaurantIds.forEach(id => {
      statsByRestaurant[id] = { revenue: 0, orderCount: 0 };
    });

    orders.forEach(order => {
      const rid = order.restaurant_id;
      if (statsByRestaurant[rid]) {
        statsByRestaurant[rid].revenue += parseFloat(order.total_amount) || 0;
        statsByRestaurant[rid].orderCount += 1;
      }
    });

    const comparison = restaurants.map(r => ({
      restaurantId: r.id,
      restaurantName: r.name,
      currency: r.currency,
      revenue: parseFloat(statsByRestaurant[r.id].revenue.toFixed(2)),
      orderCount: statsByRestaurant[r.id].orderCount,
      averageOrderValue: statsByRestaurant[r.id].orderCount > 0
        ? parseFloat((statsByRestaurant[r.id].revenue / statsByRestaurant[r.id].orderCount).toFixed(2))
        : 0
    }));

    res.json({ success: true, data: comparison });
  } catch (error) {
    console.error('[OWNER] Statistics compare error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get comparison statistics' });
  }
});

// ============================================
// Owner: 레스토랑별 주문 내역 (읽기 전용)
// ============================================
router.get('/restaurants/:restaurantId/orders', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;

    // 소유 확인
    const ownership = await RestaurantManager.findOne({
      where: {
        restaurant_id: restaurantId,
        manager_id: req.user.id,
        relationship_type: 'ownership'
      }
    });

    if (!ownership) {
      return res.status(403).json({ success: false, message: 'Access denied to this restaurant' });
    }

    const where = { restaurant_id: restaurantId };
    if (status) {
      where.status = status;
    }
    if (startDate) {
      where.createdAt = { ...(where.createdAt || {}), [Op.gte]: new Date(startDate) };
    }
    if (endDate) {
      where.createdAt = { ...(where.createdAt || {}), [Op.lte]: new Date(endDate) };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Order.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('[OWNER] Orders error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get orders' });
  }
});

// ============================================
// Owner: 새 레스토랑 등록 (직접 생성)
// ============================================
router.post('/restaurants', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { name, address, phone, email, cuisine_type, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Restaurant name is required' });
    }

    // 레스토랑 생성
    const restaurant = await Restaurant.create({
      name,
      address: address || null,
      phone: phone || null,
      email: email || null,
      cuisine_type: cuisine_type || null,
      description: description || null,
      status: 'inactive', // Owner가 생성 시 inactive (Admin 배정 전)
      currency: 'MYR'
    });

    // Owner와 ownership 연결
    await RestaurantManager.create({
      restaurant_id: restaurant.id,
      manager_id: req.user.id,
      relationship_type: 'ownership',
      is_primary: false
    });

    console.log(`[OWNER] Restaurant created: ${restaurant.id} "${name}" by owner ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Restaurant created and linked successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('[OWNER] Create restaurant error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create restaurant' });
  }
});

// ============================================
// Owner: 기존 레스토랑 연결 (직접)
// ============================================
router.post('/restaurants/:restaurantId/claim', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // 레스토랑 존재 확인
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    // 이미 다른 Owner가 소유 중인지 확인
    const existingOwnership = await RestaurantManager.findOne({
      where: {
        restaurant_id: restaurantId,
        relationship_type: 'ownership'
      }
    });

    if (existingOwnership) {
      if (existingOwnership.manager_id === req.user.id) {
        return res.status(409).json({ success: false, message: 'You already own this restaurant' });
      }
      return res.status(409).json({ success: false, message: 'This restaurant is already linked to another owner' });
    }

    // Ownership 생성
    await RestaurantManager.create({
      restaurant_id: restaurantId,
      manager_id: req.user.id,
      relationship_type: 'ownership',
      is_primary: false
    });

    console.log(`[OWNER] Restaurant claimed: ${restaurantId} "${restaurant.name}" by owner ${req.user.id}`);

    res.json({
      success: true,
      message: 'Restaurant linked successfully',
      data: { id: restaurant.id, name: restaurant.name }
    });
  } catch (error) {
    console.error('[OWNER] Claim restaurant error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to link restaurant' });
  }
});

// ============================================
// Owner: 소유 레스토랑 연결 해제
// ============================================
router.delete('/restaurants/:restaurantId/unclaim', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const deleted = await RestaurantManager.destroy({
      where: {
        restaurant_id: restaurantId,
        manager_id: req.user.id,
        relationship_type: 'ownership'
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: 'Ownership link not found' });
    }

    console.log(`[OWNER] Restaurant unclaimed: ${restaurantId} by owner ${req.user.id}`);

    res.json({ success: true, message: 'Restaurant unlinked successfully' });
  } catch (error) {
    console.error('[OWNER] Unclaim restaurant error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to unlink restaurant' });
  }
});

// ============================================
// Owner: 연결 가능한 레스토랑 검색 (아직 Owner가 없는 레스토랑)
// ============================================
router.get('/available-restaurants', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { search = '' } = req.query;

    // 이미 Owner가 있는 레스토랑 ID 목록
    const ownedRestaurants = await RestaurantManager.findAll({
      where: { relationship_type: 'ownership' },
      attributes: ['restaurant_id']
    });
    const ownedIds = ownedRestaurants.map(o => o.restaurant_id);

    const where = {};
    if (ownedIds.length > 0) {
      where.id = { [Op.notIn]: ownedIds };
    }
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const restaurants = await Restaurant.findAll({
      where,
      attributes: ['id', 'name', 'address', 'status', 'admin_name'],
      include: [{
        model: User,
        as: 'admin',
        attributes: ['id', 'full_name', 'email'],
        required: false
      }],
      order: [['name', 'ASC']],
      limit: 20
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('[OWNER] Available restaurants error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to search restaurants' });
  }
});

// ============================================
// System Admin: Owner에 레스토랑 연결
// ============================================
router.post('/restaurants/:restaurantId/link', requireRole('System Admin'), async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { owner_id } = req.body;

    if (!owner_id) {
      return res.status(400).json({ success: false, message: 'owner_id is required' });
    }

    // Owner 유저 확인
    const owner = await User.findByPk(owner_id);
    if (!owner || owner.role !== 'Restaurant Owner') {
      return res.status(400).json({ success: false, message: 'Invalid Restaurant Owner user' });
    }

    // 레스토랑 존재 확인
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    // 이미 연결된 ownership 확인
    const existing = await RestaurantManager.findOne({
      where: {
        restaurant_id: restaurantId,
        manager_id: owner_id,
        relationship_type: 'ownership'
      }
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'This restaurant is already linked to this owner' });
    }

    await RestaurantManager.create({
      restaurant_id: restaurantId,
      manager_id: owner_id,
      relationship_type: 'ownership',
      is_primary: false
    });

    res.json({ success: true, message: 'Restaurant linked to owner successfully' });
  } catch (error) {
    console.error('[OWNER] Link restaurant error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to link restaurant' });
  }
});

// ============================================
// System Admin: Owner에서 레스토랑 연결 해제
// ============================================
router.delete('/restaurants/:restaurantId/unlink', requireRole('System Admin'), async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { owner_id } = req.body;

    if (!owner_id) {
      return res.status(400).json({ success: false, message: 'owner_id is required' });
    }

    const deleted = await RestaurantManager.destroy({
      where: {
        restaurant_id: restaurantId,
        manager_id: owner_id,
        relationship_type: 'ownership'
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: 'Ownership link not found' });
    }

    res.json({ success: true, message: 'Restaurant unlinked from owner successfully' });
  } catch (error) {
    console.error('[OWNER] Unlink restaurant error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to unlink restaurant' });
  }
});

// ============================================
// Owner/Admin: Owner 목록 조회 (레스토랑에 연결 가능한 Owner 리스트)
// ============================================
router.get('/available', requireRole('System Admin'), async (req, res) => {
  try {
    const owners = await User.findAll({
      where: { role: 'Restaurant Owner' },
      attributes: ['id', 'full_name', 'username', 'email', 'phone']
    });

    res.json({ success: true, data: owners });
  } catch (error) {
    console.error('[OWNER] Available owners error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get available owners' });
  }
});

// ============================================
// Owner: 소유 레스토랑의 인보이스 목록 (Restaurant Admin과 동일 수준)
// ============================================
router.get('/invoices', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const { status: invoiceStatus, restaurant_id, start_date, end_date, page = 1, limit = 50 } = req.query;

    const ownerships = await RestaurantManager.findAll({
      where: {
        manager_id: req.user.id,
        relationship_type: 'ownership'
      },
      attributes: ['restaurant_id']
    });

    const restaurantIds = ownerships.map(o => o.restaurant_id);

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [], restaurants: [], pagination: { total: 0, page: 1, limit: 50, totalPages: 0 } });
    }

    const where = {
      restaurant_id: { [Op.in]: restaurantIds }
    };

    // Filter by specific restaurant
    if (restaurant_id) {
      const rid = parseInt(restaurant_id);
      if (restaurantIds.includes(rid)) {
        where.restaurant_id = rid;
      }
    }

    // Filter by status
    if (invoiceStatus && invoiceStatus !== 'all') {
      if (invoiceStatus === 'pending') {
        where.status = { [Op.in]: ['pending_payment', 'overdue'] };
      } else {
        where.status = invoiceStatus;
      }
    }

    // Filter by date range
    if (start_date) {
      where.issue_date = { ...(where.issue_date || {}), [Op.gte]: start_date };
    }
    if (end_date) {
      where.issue_date = { ...(where.issue_date || {}), [Op.lte]: end_date };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Invoice.findAndCountAll({
      where,
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'currency', 'address', 'city', 'state', 'postal_code', 'country', 'phone', 'email', 'admin_name']
        },
        {
          model: InvoiceItem,
          as: 'items'
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    // Transform invoices with issuer/payer info (same as Restaurant Admin)
    const transformedData = await Promise.all(rows.map(async (invoice) => {
      const issuerInfo = await getIssuerCompanyInfo(invoice.issuer_type, invoice.issuer_id, invoice.currency || 'MYR');
      const payerInfo = await getPayerCompanyInfo(invoice.payer_type, invoice.payer_id, invoice.restaurant);

      const itemsTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.calculated_amount || item.fixed_amount || 0), 0) || 0;
      const taxTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0;

      const transformedItems = (invoice.items || []).map(item => ({
        id: item.id?.toString(),
        description: item.description || item.item_name || 'Service',
        quantity: item.quantity || 1,
        unitPrice: parseFloat(item.unit_price || item.calculated_amount || item.fixed_amount || 0),
        taxRate: parseFloat(item.tax_rate || 0),
        taxAmount: parseFloat(item.tax_amount || 0),
        total: parseFloat(item.calculated_amount || item.fixed_amount || 0) + parseFloat(item.tax_amount || 0)
      }));

      return {
        id: invoice.id?.toString(),
        invoice_number: invoice.invoice_number,
        status: invoice.status,
        currency: invoice.currency || 'MYR',
        subtotal: itemsTotal || parseFloat(invoice.total_amount) - taxTotal,
        tax_amount: taxTotal || 0,
        total_amount: parseFloat(invoice.total_amount),
        issued_at: invoice.issued_at,
        due_date: invoice.due_date,
        paid_at: invoice.paid_at,
        billing_period_start: invoice.billing_period_start,
        billing_period_end: invoice.billing_period_end,
        issuer_type: invoice.issuer_type,
        issuer_id: invoice.issuer_id,
        issuer_name: issuerInfo?.name || 'Issuer',
        payer_type: invoice.payer_type,
        payer_id: invoice.payer_id,
        restaurant_id: invoice.restaurant_id,
        restaurant_name: invoice.restaurant?.name || '',
        category_display_name: invoice.category_display_name || invoice.invoice_category || 'Service',
        payment_method: invoice.payment_method,
        transaction_id: invoice.transaction_id,
        receipt_url: invoice.receipt_url,
        payment_notes: invoice.payment_notes,
        payment_submitted_at: invoice.payment_submitted_at,
        type: invoice.type,
        items: transformedItems,
        issuerInfo: issuerInfo,
        payerInfo: payerInfo,
        additional_charges: invoice.additional_charges || [],
        discount_type: invoice.discount_type || 'none',
        discount_value: parseFloat(invoice.discount_value) || 0,
        discount_amount: parseFloat(invoice.discount_amount) || 0,
        discount_reason: invoice.discount_reason || null,
        subtotal: parseFloat(invoice.subtotal) || 0
      };
    }));

    // Get restaurant list for filter dropdown
    const restaurants = await Restaurant.findAll({
      where: { id: { [Op.in]: restaurantIds } },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: transformedData,
      restaurants,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('[OWNER] Invoices error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get invoices' });
  }
});

// ============================================
// Owner: 결제 대기 인보이스 (to-pay)
// ============================================
router.get('/invoices/to-pay', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const ownerships = await RestaurantManager.findAll({
      where: {
        manager_id: req.user.id,
        relationship_type: 'ownership'
      },
      attributes: ['restaurant_id']
    });

    const restaurantIds = ownerships.map(o => o.restaurant_id);

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const invoices = await Invoice.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: { [Op.in]: ['pending_payment', 'overdue', 'payment_submitted'] }
      },
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'currency', 'address', 'city', 'state', 'postal_code', 'country', 'phone', 'email', 'admin_name']
        },
        {
          model: InvoiceItem,
          as: 'items'
        }
      ],
      order: [['due_date', 'ASC']]
    });

    // Transform with issuer/payer info
    const transformedData = await Promise.all(invoices.map(async (invoice) => {
      const issuerInfo = await getIssuerCompanyInfo(invoice.issuer_type, invoice.issuer_id, invoice.currency || 'MYR');
      const payerInfo = await getPayerCompanyInfo(invoice.payer_type, invoice.payer_id, invoice.restaurant);

      const itemsTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.calculated_amount || item.fixed_amount || 0), 0) || 0;
      const taxTotal = invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0;

      const transformedItems = (invoice.items || []).map(item => ({
        id: item.id?.toString(),
        description: item.description || item.item_name || 'Service',
        quantity: item.quantity || 1,
        unitPrice: parseFloat(item.unit_price || item.calculated_amount || item.fixed_amount || 0),
        taxRate: parseFloat(item.tax_rate || 0),
        taxAmount: parseFloat(item.tax_amount || 0),
        total: parseFloat(item.calculated_amount || item.fixed_amount || 0) + parseFloat(item.tax_amount || 0)
      }));

      return {
        id: invoice.id?.toString(),
        invoice_number: invoice.invoice_number,
        status: invoice.status,
        currency: invoice.currency || 'MYR',
        subtotal: itemsTotal || parseFloat(invoice.total_amount) - taxTotal,
        tax_amount: taxTotal || 0,
        total_amount: parseFloat(invoice.total_amount),
        issued_at: invoice.issued_at,
        due_date: invoice.due_date,
        paid_at: invoice.paid_at,
        billing_period_start: invoice.billing_period_start,
        billing_period_end: invoice.billing_period_end,
        issuer_type: invoice.issuer_type,
        issuer_id: invoice.issuer_id,
        issuer_name: issuerInfo?.name || 'Issuer',
        payer_type: invoice.payer_type,
        payer_id: invoice.payer_id,
        restaurant_id: invoice.restaurant_id,
        restaurant_name: invoice.restaurant?.name || '',
        category_display_name: invoice.category_display_name || invoice.invoice_category || 'Service',
        payment_method: invoice.payment_method,
        transaction_id: invoice.transaction_id,
        receipt_url: invoice.receipt_url,
        payment_notes: invoice.payment_notes,
        payment_submitted_at: invoice.payment_submitted_at,
        type: invoice.type,
        items: transformedItems,
        issuerInfo: issuerInfo,
        payerInfo: payerInfo,
        additional_charges: invoice.additional_charges || [],
        discount_type: invoice.discount_type || 'none',
        discount_value: parseFloat(invoice.discount_value) || 0,
        discount_amount: parseFloat(invoice.discount_amount) || 0,
        discount_reason: invoice.discount_reason || null,
        subtotal: parseFloat(invoice.subtotal) || 0
      };
    }));

    res.json({ success: true, data: transformedData });
  } catch (error) {
    console.error('[OWNER] Invoices to-pay error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get invoices to pay' });
  }
});

// ============================================
// Owner Allowed Routes (module-based sidebar filtering)
// ============================================
router.get('/allowed-routes', requireRole('Restaurant Owner'), async (req, res) => {
  try {
    const PlanTemplate = require('../models/PlanTemplate');
    const AddonModule = require('../models/AddonModule');

    const owner = await User.findByPk(req.user.id);
    if (!owner || !owner.plan_type) {
      return res.json({
        entity_id: req.user.id,
        entity_type: 'owner',
        plan_type: owner?.plan_type || null,
        subscription_status: owner?.subscription_status || null,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const plan = await PlanTemplate.findOne({
      where: {
        [Op.or]: [
          { display_name: owner.plan_type },
          { name: owner.plan_type }
        ],
        plan_target: 'owner'
      }
    });

    if (!plan) {
      return res.json({
        entity_id: owner.id,
        entity_type: 'owner',
        plan_type: owner.plan_type,
        subscription_status: owner.subscription_status,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const includedModuleCodes = plan.included_modules || [];
    if (includedModuleCodes.length === 0) {
      return res.json({
        entity_id: owner.id,
        entity_type: 'owner',
        plan_type: owner.plan_type,
        subscription_status: owner.subscription_status,
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
      entity_id: owner.id,
      entity_type: 'owner',
      plan_type: owner.plan_type,
      subscription_status: owner.subscription_status,
      included_modules: includedModuleCodes,
      allowed_routes: allowedRoutes,
      modules: modules.map(m => ({ code: m.module_code, name: m.name, category: m.category }))
    });
  } catch (error) {
    console.error('Error fetching owner allowed routes:', error);
    res.status(500).json({ error: 'Failed to fetch allowed routes' });
  }
});

module.exports = router;
