#!/usr/bin/env node
// Backfill RestaurantDailyStats for the last N days (default 30).
// Idempotent — re-running on the same (restaurant, date) overwrites the row.
//
// Usage:
//   node scripts/backfill-daily-stats.js
//   node scripts/backfill-daily-stats.js --days=60
//   node scripts/backfill-daily-stats.js --restaurant-id=5
//   node scripts/backfill-daily-stats.js --days=14 --restaurant-id=5

require('../models'); // load associations
const { Restaurant, Order, RestaurantDailyStats } = require('../models');
const { Op } = require('sequelize');

const args = process.argv.slice(2);
const DAYS = parseInt((args.find(a => a.startsWith('--days=')) || '--days=30').split('=')[1], 10);
const RESTAURANT_ID = (args.find(a => a.startsWith('--restaurant-id=')) || '').split('=')[1];

function getTimezoneOffsetHours(tz) {
  const tzOffset = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
  const m = tzOffset.match(/GMT([+-]\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function getDateInTimezone(utcDate, tz) {
  return utcDate.toLocaleDateString('en-CA', { timeZone: tz });
}

function getUTCBoundsForDate(dateStr, tz, isEnd = false) {
  const offsetHours = getTimezoneOffsetHours(tz);
  const date = new Date(`${dateStr}T${isEnd ? '23:59:59.999' : '00:00:00'}`);
  date.setHours(date.getHours() - offsetHours);
  return date;
}

async function aggregateOneDay(restaurant, dateStr) {
  const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
  const currency = restaurant.operation_settings?.currency || 'MYR';
  const start = getUTCBoundsForDate(dateStr, tz, false);
  const end = getUTCBoundsForDate(dateStr, tz, true);

  const orders = await Order.findAll({
    where: {
      restaurant_id: restaurant.id,
      order_date: { [Op.gte]: start, [Op.lte]: end },
      status: 'completed'
    },
    attributes: ['total_amount']
  });

  const revenue = orders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0);
  const order_count = orders.length;
  const aov = order_count > 0 ? revenue / order_count : 0;

  await RestaurantDailyStats.upsert({
    restaurant_id: restaurant.id,
    date: dateStr,
    revenue: Math.round(revenue * 100) / 100,
    order_count,
    average_order_value: Math.round(aov * 100) / 100,
    currency,
    timezone_snapshot: tz,
    computed_at: new Date()
  });

  return { date: dateStr, revenue, order_count };
}

async function backfillRestaurant(restaurant) {
  const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
  const todayStr = getDateInTimezone(new Date(), tz);
  const dates = [];
  for (let i = DAYS; i >= 1; i--) {
    const d = new Date(todayStr);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }

  let totalOrders = 0;
  for (const dateStr of dates) {
    const r = await aggregateOneDay(restaurant, dateStr);
    totalOrders += r.order_count;
  }
  console.log(`  ✓ ${restaurant.name} (id=${restaurant.id}): ${dates.length}d, ${totalOrders} orders aggregated`);
}

(async () => {
  console.log(`Backfilling RestaurantDailyStats for last ${DAYS}d${RESTAURANT_ID ? ` (restaurant ${RESTAURANT_ID})` : ''}`);

  const where = RESTAURANT_ID ? { id: RESTAURANT_ID } : {};
  const restaurants = await Restaurant.findAll({ where, attributes: ['id', 'name', 'operation_settings'] });
  console.log(`  ${restaurants.length} restaurant(s) to process`);

  for (const r of restaurants) {
    await backfillRestaurant(r);
  }

  console.log('✓ Backfill complete');
  process.exit(0);
})().catch(err => {
  console.error('✗ Backfill failed:', err);
  process.exit(1);
});
