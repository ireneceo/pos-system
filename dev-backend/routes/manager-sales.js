/**
 * Manager (Brand/Foodcourt/Owner) sales summary — real per-restaurant aggregation.
 * Replaces the hardcoded-zero / mock data on Manager Sales & Reports pages.
 * Timezone-correct: each restaurant's day/week/month buckets use its own timezone
 * (getRestaurantTimezone). Revenue = completed + served (consistent with the brand
 * Performance / franchise-map definition). Market has no DST, so ±24h day math is exact.
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { Order, Restaurant, Brand } = require('../models');
const User = require('../models/User');
const { getRestaurantTimezone, getTodayBounds, getStartOfMonth, getDateBounds, getCurrentLocalDate } = require('../utils/dateTimeHelper');

const REVENUE_STATUSES = ['completed', 'served'];
const DAY_MS = 24 * 60 * 60 * 1000;
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

// Resolve the restaurants a given manager oversees (mirrors GET /restaurants/manager/:id scope).
async function resolveManagerRestaurants(user) {
  const attributes = ['id', 'name', 'address', 'currency', 'operation_settings', 'brand_id', 'foodcourt_id'];
  if ((user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') && user.foodcourt_id) {
    return Restaurant.findAll({ where: { foodcourt_id: user.foodcourt_id }, attributes });
  }
  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    const brands = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
    const brandIds = brands.map(b => b.id);
    return brandIds.length ? Restaurant.findAll({ where: { brand_id: brandIds }, attributes }) : [];
  }
  if (user.role === 'Restaurant Owner') {
    return Restaurant.findAll({
      include: [{ model: User, as: 'managers', where: { id: user.id }, attributes: [], through: { attributes: [] } }],
      attributes
    });
  }
  if (user.role === 'System Admin') {
    return Restaurant.findAll({ attributes });
  }
  if (user.restaurant_id) {
    return Restaurant.findAll({ where: { id: user.restaurant_id }, attributes });
  }
  return [];
}

router.get('/sales-summary', authenticateToken, async (req, res) => {
  try {
    const restaurants = await resolveManagerRestaurants(req.user);
    if (!restaurants.length) return res.json({ success: true, data: [] });

    const rids = restaurants.map(r => r.id);
    // One query for all restaurants' recent revenue orders (35d covers week + month buckets).
    const earliest = new Date(Date.now() - 35 * DAY_MS);
    const orders = await Order.findAll({
      where: {
        restaurant_id: { [Op.in]: rids },
        status: { [Op.in]: REVENUE_STATUSES },
        createdAt: { [Op.gte]: earliest }
      },
      attributes: ['id', 'restaurant_id', 'total_amount', 'createdAt', 'order_items']
    });
    const byR = {};
    rids.forEach(id => { byR[id] = []; });
    orders.forEach(o => { if (byR[o.restaurant_id]) byR[o.restaurant_id].push(o); });

    const data = restaurants.map(r => {
      const tz = getRestaurantTimezone(r);
      const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(tz);
      const yStart = new Date(todayStart.getTime() - DAY_MS);
      const yEnd = new Date(todayEnd.getTime() - DAY_MS);
      const weekStart = new Date(todayStart.getTime() - 6 * DAY_MS); // last 7 days incl. today
      const monthStart = getStartOfMonth(tz);
      const tS = todayStart.getTime(), tE = todayEnd.getTime();
      const yS = yStart.getTime(), yE = yEnd.getTime();
      const wS = weekStart.getTime(), mS = monthStart.getTime();

      let todaySales = 0, todayOrders = 0, yesterdaySales = 0, weekSales = 0, monthSales = 0;
      const itemAgg = {};
      const hourly = new Array(12).fill(0); // 12 two-hour buckets (restaurant-tz clock)

      (byR[r.id] || []).forEach(o => {
        const t = new Date(o.createdAt).getTime();
        const amt = parseFloat(o.total_amount) || 0;
        if (t >= tS && t <= tE) {
          todaySales += amt; todayOrders += 1;
          const h = parseInt(new Date(o.createdAt).toLocaleString('en-US', { timeZone: tz, hour: '2-digit', hour12: false }), 10);
          hourly[Math.min(11, Math.max(0, Math.floor((Number.isFinite(h) ? h : 0) / 2)))] += amt;
        }
        if (t >= yS && t <= yE) yesterdaySales += amt;
        if (t >= wS && t <= tE) weekSales += amt;
        if (t >= mS && t <= tE) {
          monthSales += amt;
          let items = o.order_items;
          if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
          (items || []).forEach(it => {
            const name = it.menu_name || it.name || (it.menuItem && it.menuItem.name) || 'Unknown';
            const qty = parseInt(it.quantity || 1, 10) || 1;
            const price = parseFloat(it.price || (it.menuItem && it.menuItem.price) || 0) || 0;
            if (!itemAgg[name]) itemAgg[name] = { name, quantity: 0, revenue: 0 };
            itemAgg[name].quantity += qty;
            itemAgg[name].revenue += price * qty;
          });
        }
      });

      return {
        id: String(r.id),
        name: r.name,
        location: r.address || 'Unknown',
        currency: r.currency,
        todaySales: round2(todaySales),
        yesterdaySales: round2(yesterdaySales),
        weekSales: round2(weekSales),
        monthSales: round2(monthSales),
        todayOrders,
        averageOrderValue: todayOrders > 0 ? round2(todaySales / todayOrders) : 0,
        topItems: Object.values(itemAgg).sort((a, b) => b.quantity - a.quantity).slice(0, 5)
          .map(i => ({ name: i.name, quantity: i.quantity, revenue: round2(i.revenue) })),
        hourlyData: hourly.map(round2)
      };
    });

    res.json({ success: true, data });
  } catch (e) {
    console.error('[manager-sales] sales-summary error:', e);
    res.status(500).json({ success: false, message: 'Failed to load sales summary' });
  }
});

// Reports summary — period + restaurant filtered real aggregation for the
// Manager Reports page (replaces the fully mocked reportData / Math.random).
// Query: ?restaurantId=all|<id>&start=<ISO>&end=<ISO>. Revenue = completed+served.
// Only fields with a real data source are returned (revenue/orders/AOV/topItems/
// hourly). Customer analytics & staff performance have no source yet → the page
// omits those sections rather than showing fabricated numbers.
router.get('/reports-summary', authenticateToken, async (req, res) => {
  try {
    const all = await resolveManagerRestaurants(req.user);
    const restaurantsList = all.map(r => ({ id: String(r.id), name: r.name, location: r.address || 'Unknown' }));
    if (!all.length) {
      return res.json({ success: true, data: { restaurants: [], totalRevenue: 0, totalOrders: 0, averageOrderValue: 0, topItems: [], hourlyData: [] } });
    }

    // Restaurant scope: 'all' or a single owned restaurant (ignore ids outside scope).
    const requested = String(req.query.restaurantId || 'all');
    const scoped = requested === 'all' ? all : all.filter(r => String(r.id) === requested);
    const useR = scoped.length ? scoped : all;
    const rids = useR.map(r => r.id);
    const tzById = {}; useR.forEach(r => { tzById[r.id] = getRestaurantTimezone(r); });
    // Reference tz for interpreting the date-only range (managers usually oversee
    // same-country restaurants). Per-order tz is still used for hourly bucketing.
    const refTz = tzById[useR[0].id] || 'Asia/Kuala_Lumpur';

    // Date range (inclusive), interpreted as FULL LOCAL DAYS in the reference tz.
    // A 'YYYY-MM-DD' string parsed with `new Date()` is UTC-midnight — for +8h
    // Malaysia that dropped everything after 08:00 local (a "Today" filter showed
    // ~zero). getDateBounds gives tz-correct start/end-of-day (same as sales-summary).
    // Default: last 30 days ending today (reference tz).
    const endStr = (req.query.end ? String(req.query.end) : getCurrentLocalDate(refTz)).slice(0, 10);
    const endBounds = getDateBounds(endStr, refTz);
    const startStr = req.query.start
      ? String(req.query.start).slice(0, 10)
      : new Date(endBounds.startOfDay.getTime() - 29 * DAY_MS).toISOString().slice(0, 10);
    const startBounds = getDateBounds(startStr, refTz);
    const startMs = startBounds.startOfDay.getTime();
    const endMs = endBounds.endOfDay.getTime();

    const orders = await Order.findAll({
      where: {
        restaurant_id: { [Op.in]: rids },
        status: { [Op.in]: REVENUE_STATUSES },
        createdAt: { [Op.gte]: new Date(startMs), [Op.lte]: new Date(endMs) }
      },
      attributes: ['id', 'restaurant_id', 'total_amount', 'createdAt', 'order_items']
    });

    let totalRevenue = 0, totalOrders = 0;
    const itemAgg = {};
    const hourly = Array.from({ length: 24 }, () => ({ orders: 0, revenue: 0 }));

    orders.forEach(o => {
      const amt = parseFloat(o.total_amount) || 0;
      totalRevenue += amt;
      totalOrders += 1;
      const tz = tzById[o.restaurant_id] || 'Asia/Kuala_Lumpur';
      const h = parseInt(new Date(o.createdAt).toLocaleString('en-US', { timeZone: tz, hour: '2-digit', hour12: false }), 10);
      const hi = Number.isFinite(h) ? Math.min(23, Math.max(0, h)) : 0;
      hourly[hi].orders += 1;
      hourly[hi].revenue += amt;

      let items = o.order_items;
      if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
      (items || []).forEach(it => {
        const name = it.menu_name || it.name || (it.menuItem && it.menuItem.name) || 'Unknown';
        const qty = parseInt(it.quantity || 1, 10) || 1;
        const price = parseFloat(it.price || (it.menuItem && it.menuItem.price) || 0) || 0;
        if (!itemAgg[name]) itemAgg[name] = { name, quantity: 0, revenue: 0 };
        itemAgg[name].quantity += qty;
        itemAgg[name].revenue += price * qty;
      });
    });

    const label12 = (hr) => { const p = hr < 12 ? 'AM' : 'PM'; const h12 = hr % 12 === 0 ? 12 : hr % 12; return `${h12}${p}`; };
    const hourlyData = hourly
      .map((b, hr) => ({ hour: label12(hr), orders: b.orders, revenue: round2(b.revenue) }))
      .filter(b => b.orders > 0);

    res.json({
      success: true,
      data: {
        restaurants: restaurantsList,
        totalRevenue: round2(totalRevenue),
        totalOrders,
        averageOrderValue: totalOrders > 0 ? round2(totalRevenue / totalOrders) : 0,
        topItems: Object.values(itemAgg).sort((a, b) => b.quantity - a.quantity).slice(0, 5)
          .map(i => ({ name: i.name, quantity: i.quantity, revenue: round2(i.revenue) })),
        hourlyData
      }
    });
  } catch (e) {
    console.error('[manager-sales] reports-summary error:', e);
    res.status(500).json({ success: false, message: 'Failed to load reports summary' });
  }
});

module.exports = router;
