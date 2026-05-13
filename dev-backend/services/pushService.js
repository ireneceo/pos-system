/**
 * Web Push Notification Service (v3.28+)
 *
 * Wraps web-push npm + PushSubscription/PushLog models.
 * Honors per-user push_preferences (category on/off) + push_muted_hours (OS push skip during quiet hours).
 * In-app socket.io emits remain unaffected by muted hours.
 *
 * Public API:
 *   sendPushToUser(userId, payload)       — single user, all active devices
 *   sendPushToRole(role, payload)         — broadcast to role
 *   sendPushToRestaurant(rid, payload)    — Restaurant Admin/Staff of given restaurant
 *   sendPushToBrand(bid, payload)         — Brand General owner
 *   sendPushToFoodcourt(fid, payload)     — Foodcourt General owner
 *   sendPushToSupplier(scid, payload)     — Supplier Admin
 *
 * Payload shape:
 *   { title, body, category, icon?, badge?, tag?, url?, data? }
 */
const webpush = require('web-push');
const { Op } = require('sequelize');
const PushSubscription = require('../models/PushSubscription');
const PushLog = require('../models/PushLog');
const User = require('../models/User');

// Trusted push service hosts — endpoint validation guards against arbitrary URLs.
const PUSH_SERVICE_HOSTS = [
  'fcm.googleapis.com',                // Chrome / Android
  'updates.push.services.mozilla.com', // Firefox
  'web.push.apple.com',                // Safari / iOS 16.4+
  'wns2-bn3p.notify.windows.com',      // Edge legacy (less common)
  'wns2-by3p.notify.windows.com',
  'wns2-pn1p.notify.windows.com'
];

let initialized = false;
function ensureInit() {
  if (initialized) return;
  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    throw new Error('VAPID keys missing in env');
  }
  webpush.setVapidDetails(
    VAPID_SUBJECT || 'mailto:noreply@purplehere.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
  initialized = true;
}

function isValidEndpoint(endpoint) {
  try {
    const u = new URL(endpoint);
    if (u.protocol !== 'https:') return false;
    return PUSH_SERVICE_HOSTS.some(host =>
      u.hostname === host || u.hostname.endsWith('.push.apple.com') || u.hostname.endsWith('.notify.windows.com')
    );
  } catch {
    return false;
  }
}

function isCategoryEnabled(user, category) {
  // 알림 규칙 단일 source of truth — `notification_preferences` (NotificationSettings UI 가 저장).
  // 사용자가 UI 에서 토글한 카테고리는 이메일 + 푸시 모두 동시 반영.
  // `push_preferences.categories` 는 레거시 — 양쪽 다 확인하여 하나라도 false 면 차단 (기존 데이터 호환).
  // 카테고리 정의 (label/description/role visibility) 는 routes/notification-settings.js NOTIFICATION_CATEGORIES.
  // 기본 동작: 키가 없거나 undefined 면 ON (사용자가 명시적으로 OFF 한 적 없으면 보냄).
  const np = user.notification_preferences || {};
  if (np[category] === false) return false;
  const pp = user.push_preferences && user.push_preferences.categories;
  if (pp && pp[category] === false) return false;
  return true;
}

function isMutedNow(user) {
  const cfg = user.push_muted_hours;
  if (!cfg || !cfg.enabled) return false;
  const start = Number(cfg.start);
  const end = Number(cfg.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
  const tz = cfg.timezone || 'Asia/Kuala_Lumpur';
  const hourStr = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: tz }).format(new Date());
  const hour = parseInt(hourStr, 10);
  if (start === end) return false;
  if (start < end) return hour >= start && hour < end;
  // wraps midnight, e.g. 22 → 8
  return hour >= start || hour < end;
}

/**
 * Emit in-app socket event in parallel to OS push.
 * Honors push_enabled and category gates, but NOT muted_hours — in-app toasters
 * are always allowed; muted_hours suppresses only OS-level push.
 */
function emitInApp(rooms, payload) {
  try {
    const server = require('../server');
    const io = server && server.io;
    if (!io) return;
    const ns = io.of('/notifications');
    const evt = { title: payload.title, body: payload.body, category: payload.category, url: payload.url, data: payload.data };
    for (const room of rooms) ns.to(room).emit('notification', evt);
  } catch (e) {
    // server not yet ready or io not attached — non-fatal
  }
}

async function logPush({ user_id, subscription_id, category, title, body, status, error_code, error_message }) {
  try {
    await PushLog.create({
      user_id, subscription_id, category, title, body,
      status, error_code, error_message,
      sent_at: new Date()
    });
  } catch (e) {
    console.error('[PushLog] Failed to write log:', e.message);
  }
}

/**
 * Send push to a single user across all active subscriptions.
 * Returns { sent, failed, skipped, reason? }.
 */
async function sendPushToUser(userId, payload) {
  if (!payload || !payload.category) throw new Error('payload.category is required');
  ensureInit();

  const user = await User.findByPk(userId, { attributes: ['id', 'push_enabled', 'push_preferences', 'push_muted_hours', 'notification_preferences'] });
  if (!user) return { sent: 0, failed: 0, skipped: 1, reason: 'no_user' };

  if (user.push_enabled === false) {
    await logPush({ user_id: userId, category: payload.category, title: payload.title, body: payload.body, status: 'category_off' });
    return { sent: 0, failed: 0, skipped: 1, reason: 'master_off' };
  }
  if (!isCategoryEnabled(user, payload.category)) {
    await logPush({ user_id: userId, category: payload.category, title: payload.title, body: payload.body, status: 'category_off' });
    return { sent: 0, failed: 0, skipped: 1, reason: 'category_off' };
  }

  // In-app socket fires regardless of muted_hours (only OS push is suppressed).
  emitInApp([`user:${userId}`], payload);

  if (isMutedNow(user)) {
    await logPush({ user_id: userId, category: payload.category, title: payload.title, body: payload.body, status: 'muted' });
    return { sent: 0, failed: 0, skipped: 1, reason: 'muted' };
  }

  const subs = await PushSubscription.findAll({
    where: { user_id: userId, expired_at: null, deleted_at: null }
  });
  if (subs.length === 0) {
    await logPush({ user_id: userId, category: payload.category, title: payload.title, body: payload.body, status: 'no_subscription' });
    return { sent: 0, failed: 0, skipped: 0, reason: 'no_subscription' };
  }

  let sent = 0, failed = 0;
  const body = JSON.stringify({
    title: payload.title,
    body: payload.body,
    category: payload.category,
    icon: payload.icon || '/icons/icon-192.png',
    badge: payload.badge || '/icons/badge-72.png',
    tag: payload.tag || payload.category,
    url: payload.url || '/',
    data: payload.data || {}
  });

  for (const sub of subs) {
    try {
      await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, body);
      sent++;
      await logPush({ user_id: userId, subscription_id: sub.id, category: payload.category, title: payload.title, body: payload.body, status: 'sent' });
    } catch (err) {
      failed++;
      const code = err.statusCode ? String(err.statusCode) : null;
      const msg = err.body || err.message;
      if (code === '410' || code === '404') {
        await sub.update({ expired_at: new Date() });
        await logPush({ user_id: userId, subscription_id: sub.id, category: payload.category, title: payload.title, body: payload.body, status: 'expired_endpoint', error_code: code, error_message: msg });
      } else {
        await logPush({ user_id: userId, subscription_id: sub.id, category: payload.category, title: payload.title, body: payload.body, status: 'failed', error_code: code, error_message: msg });
      }
    }
  }
  return { sent, failed, skipped: 0 };
}

async function sendPushToRole(role, payload) {
  const users = await User.findAll({ where: { role, push_enabled: true }, attributes: ['id'] });
  let sent = 0, failed = 0;
  for (const u of users) {
    const r = await sendPushToUser(u.id, payload);
    sent += r.sent; failed += r.failed;
  }
  return { sent, failed, recipients: users.length };
}

async function sendPushToRestaurant(restaurantId, payload) {
  const users = await User.findAll({
    where: { restaurant_id: restaurantId, role: { [Op.in]: ['Restaurant Admin', 'Staff'] }, push_enabled: true },
    attributes: ['id']
  });
  let sent = 0, failed = 0;
  for (const u of users) {
    const r = await sendPushToUser(u.id, payload);
    sent += r.sent; failed += r.failed;
  }
  return { sent, failed, recipients: users.length };
}

async function sendPushToBrand(brandId, payload) {
  const Brand = require('../models/Brand');
  const brand = await Brand.findByPk(brandId);
  if (!brand || !brand.owner_id) return { sent: 0, failed: 0, recipients: 0 };
  return sendPushToUser(brand.owner_id, payload);
}

async function sendPushToFoodcourt(foodcourtId, payload) {
  const Foodcourt = require('../models/Foodcourt');
  const fc = await Foodcourt.findByPk(foodcourtId);
  if (!fc || !fc.owner_id) return { sent: 0, failed: 0, recipients: 0 };
  return sendPushToUser(fc.owner_id, payload);
}

async function sendPushToSupplier(supplierCompanyId, payload) {
  const SupplierCompany = require('../models/SupplierCompany');
  const sc = await SupplierCompany.findByPk(supplierCompanyId);
  if (!sc || !sc.owner_id) return { sent: 0, failed: 0, recipients: 0 };
  return sendPushToUser(sc.owner_id, payload);
}

module.exports = {
  sendPushToUser,
  sendPushToRole,
  sendPushToRestaurant,
  sendPushToBrand,
  sendPushToFoodcourt,
  sendPushToSupplier,
  isValidEndpoint,
  isCategoryEnabled,
  isMutedNow,
  PUSH_SERVICE_HOSTS
};
