/**
 * Reservation scheduler (R1 MVP)
 *
 * 매 시간 정각 실행:
 *   1. 24h 리마인드  — 23~25시간 후 confirmed 예약 → email + flag
 *   2. 2h  리마인드  — 1~3시간 후 confirmed 예약 → email + flag
 *   3. 자동 no_show   — reserved_at 지난 confirmed (grace period 후) → no_show 전환
 */
const cron = require('node-cron');
const { Op } = require('sequelize');
const { Reservation, Restaurant, RestaurantCustomer, SchedulerRun } = require('../models');
const reservationNotificationService = require('./reservationNotificationService');
const logger = require('../utils/logger');

const REMINDER_24H_WINDOW_HOURS = [23, 25];
const REMINDER_2H_WINDOW_HOURS = [1, 3];
const NO_SHOW_GRACE_MINUTES_DEFAULT = 30;

function hoursFromNow(date) {
  return (new Date(date) - Date.now()) / (1000 * 3600);
}

async function send24hReminders() {
  const list = await Reservation.findAll({
    where: {
      status: 'confirmed',
      reminder_24h_sent_at: null,
      reserved_at: {
        [Op.between]: [
          new Date(Date.now() + REMINDER_24H_WINDOW_HOURS[0] * 3600 * 1000),
          new Date(Date.now() + REMINDER_24H_WINDOW_HOURS[1] * 3600 * 1000)
        ]
      }
    }
  });
  let sent = 0;
  for (const r of list) {
    const restaurant = await Restaurant.findByPk(r.restaurant_id);
    if (!restaurant) continue;
    try {
      await reservationNotificationService.notifyReminder(r, restaurant, '24h');
      await r.update({ reminder_24h_sent_at: new Date() });
      sent++;
    } catch (e) {
      logger.warn(`[ReservationScheduler] 24h reminder failed for #${r.id}:`, e.message);
    }
  }
  return sent;
}

async function send2hReminders() {
  const list = await Reservation.findAll({
    where: {
      status: 'confirmed',
      reminder_2h_sent_at: null,
      reserved_at: {
        [Op.between]: [
          new Date(Date.now() + REMINDER_2H_WINDOW_HOURS[0] * 3600 * 1000),
          new Date(Date.now() + REMINDER_2H_WINDOW_HOURS[1] * 3600 * 1000)
        ]
      }
    }
  });
  let sent = 0;
  for (const r of list) {
    const restaurant = await Restaurant.findByPk(r.restaurant_id);
    if (!restaurant) continue;
    try {
      await reservationNotificationService.notifyReminder(r, restaurant, '2h');
      await r.update({ reminder_2h_sent_at: new Date() });
      sent++;
    } catch (e) {
      logger.warn(`[ReservationScheduler] 2h reminder failed for #${r.id}:`, e.message);
    }
  }
  return sent;
}

async function autoNoShow() {
  // 후보: confirmed && reserved_at + grace 이미 지났는데 arrived/seated 안 함
  const list = await Reservation.findAll({
    where: {
      status: 'confirmed',
      reserved_at: { [Op.lt]: new Date(Date.now() - NO_SHOW_GRACE_MINUTES_DEFAULT * 60 * 1000) }
    },
    limit: 100
  });
  let marked = 0;
  for (const r of list) {
    const restaurant = await Restaurant.findByPk(r.restaurant_id);
    if (!restaurant) continue;
    const settings = restaurant.reservation_settings || {};
    const grace = settings.no_show_policy?.grace_minutes ?? NO_SHOW_GRACE_MINUTES_DEFAULT;
    if (hoursFromNow(r.reserved_at) > -(grace / 60)) continue;  // 아직 grace 안 지남

    try {
      await r.update({ status: 'no_show', no_show_at: new Date() });
      if (r.customer_id) {
        const c = await RestaurantCustomer.findByPk(r.customer_id);
        if (c) await c.increment('no_show_count');
      }
      await reservationNotificationService.notifyNoShow(r, restaurant);
      marked++;
    } catch (e) {
      logger.warn(`[ReservationScheduler] no_show transition failed for #${r.id}:`, e.message);
    }
  }
  return marked;
}

async function runHourly() {
  let run;
  try {
    run = await SchedulerRun.create({ job_name: 'reservation_hourly', status: 'running', started_at: new Date() });
  } catch (_) {}

  try {
    const r24 = await send24hReminders();
    const r2 = await send2hReminders();
    const noShow = await autoNoShow();
    logger.info(`[ReservationScheduler] reminders 24h=${r24} 2h=${r2} no_show=${noShow}`);
    if (run) await run.update({
      status: 'success', finished_at: new Date(),
      results: { reminders_24h: r24, reminders_2h: r2, no_show: noShow }
    });
    return { success: true, reminders_24h: r24, reminders_2h: r2, no_show: noShow };
  } catch (err) {
    logger.error('[ReservationScheduler] failed:', err.message);
    if (run) await run.update({ status: 'error', finished_at: new Date(), error_message: err.message });
    return { success: false, error: err.message };
  }
}

function start() {
  // 매 시간 정각
  cron.schedule('0 * * * *', () => runHourly());
  logger.info('Reservation scheduler started — runs hourly');
}

module.exports = { start, runHourly, send24hReminders, send2hReminders, autoNoShow };
