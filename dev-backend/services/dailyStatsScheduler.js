// Daily stats scheduler — aggregates yesterday's revenue/order_count/AOV per restaurant.
// Runs at 00:30 site default timezone every day. Idempotent (upsert on (restaurant_id, date)).
//
// Why: dashboard sales-chart with year period scans up to ~18,000 order rows per restaurant.
// Pre-aggregation keeps lookups O(1) per day per restaurant.

const cron = require('node-cron');
const { Op } = require('sequelize');
const { Restaurant, Order, RestaurantDailyStats, SchedulerRun } = require('../models');
const logger = require('../utils/logger');

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

async function aggregateRestaurantDay(restaurant, dateStr) {
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

  return { restaurant_id: restaurant.id, date: dateStr, revenue, order_count };
}

async function runDailyAggregation() {
  let run;
  try {
    run = await SchedulerRun.create({
      job_name: 'daily_stats_aggregation',
      status: 'running',
      started_at: new Date()
    });
  } catch (e) {
    // SchedulerRun model may not exist in some environments — degrade gracefully
    logger.warn('SchedulerRun.create failed, continuing without run record:', e.message);
  }

  try {
    const restaurants = await Restaurant.findAll({ attributes: ['id', 'name', 'operation_settings'] });
    const results = [];

    for (const r of restaurants) {
      const tz = r.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
      // Yesterday in restaurant timezone
      const todayStr = getDateInTimezone(new Date(), tz);
      const yesterday = new Date(todayStr);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const result = await aggregateRestaurantDay(r, yesterdayStr);
      results.push(result);
    }

    const total_orders = results.reduce((s, r) => s + r.order_count, 0);
    logger.info(`Daily stats aggregated: ${restaurants.length} restaurants, ${total_orders} orders`);

    if (run) {
      await run.update({
        status: 'success',
        finished_at: new Date(),
        results: { restaurants: restaurants.length, total_orders, sample: results.slice(0, 3) }
      });
    }
  } catch (err) {
    logger.error('Daily stats aggregation failed:', err.message);
    if (run) {
      await run.update({
        status: 'error',
        finished_at: new Date(),
        error_message: err.message
      });
    }
  }
}

function start() {
  // 매일 site timezone 00:30 — node-cron 은 server timezone 기준이라 UTC 으로 보정 필요
  // 단순화: UTC 16:30 (= UTC+8 다음날 00:30) 매일. 정확한 site tz 보정은 v2.
  cron.schedule('30 16 * * *', () => {
    runDailyAggregation();
  });
  logger.info('Daily stats scheduler started — runs at 00:30 SGT (UTC+8) every day');
}

module.exports = { start, runDailyAggregation, aggregateRestaurantDay };
