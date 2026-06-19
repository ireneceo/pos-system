'use strict';

/**
 * Business-hours + last-order gate for mobile customer ordering.
 *
 * Single source of truth for "can a mobile customer order right now?" and
 * "which pickup times are valid?". Both the mobile frontend and the server-side
 * order guard call THIS module so the day/time/overnight logic never diverges.
 *
 * Config lives inside operation_settings.businessHours (JSON, no DB migration):
 *   businessHours = {
 *     enabled: false,                 // master. false/absent = legacy (no gate)
 *     days: {
 *       mon: { closed:false, open:"11:00", lastOrder:"21:30", close:"22:00" },
 *       ...
 *       wed: { closed:true },         // closed all day
 *     }
 *   }
 * Rules:
 *   - closed:true             → no ordering that day.
 *   - lastOrder omitted       → treated as close (no separate last call).
 *   - close <= open           → overnight (e.g. 18:00–02:00); spills into next day.
 *   - enabled:false / absent  → gate OFF (canOrder always true) — full backward compat.
 *
 * Restaurant-local time is authoritative (operation_settings.timeZone), never the
 * server clock. Reuses localParts() from availabilitySchedule for timezone parsing.
 */

const { localParts } = require('./availabilitySchedule');

// dow index (0=Sun, matches localParts/JS getDay) → businessHours.days key
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const DEFAULT_TZ = 'Asia/Kuala_Lumpur';

/** "H:MM"/"HH:MM" → minutes since midnight, or null if invalid. */
function toMin(t) {
  if (typeof t !== 'string') return null;
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = parseInt(m[1], 10), min = parseInt(m[2], 10);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

function dayConfig(bh, dow) {
  const d = bh && bh.days && bh.days[DAY_KEYS[dow]];
  return d || null;
}

/**
 * Resolve a day config into an absolute-minutes window anchored on its open day.
 * Returns null when the day is closed/unset/malformed.
 *   open        : minutes (0..1439)
 *   closeAbs    : minutes, +1440 when overnight
 *   lastOrderAbs: minutes (clamped to (open, closeAbs])
 *   overnight   : boolean
 */
function windowFor(d) {
  if (!d || d.closed) return null;
  const open = toMin(d.open);
  const close = toMin(d.close);
  if (open == null || close == null) return null;
  const overnight = close <= open;
  const closeAbs = overnight ? close + 1440 : close;

  const loRaw = toMin(d.lastOrder);
  let lastOrderAbs = (loRaw == null) ? close : loRaw;
  // Overnight after-midnight last order (e.g. open 18:00, lastOrder 01:30) → +1 day.
  if (overnight && loRaw != null && loRaw < open) lastOrderAbs = loRaw + 1440;
  // Guard malformed last order: keep within (open, closeAbs].
  if (lastOrderAbs <= open || lastOrderAbs > closeAbs) lastOrderAbs = closeAbs;

  return { open, closeAbs, lastOrderAbs, overnight };
}

function todaySnapshot(cfg) {
  if (!cfg || cfg.closed) return { closed: true };
  return {
    closed: false,
    open: cfg.open || null,
    lastOrder: cfg.lastOrder || cfg.close || null,
    close: cfg.close || null
  };
}

/**
 * Next opening from `now`, scanning up to 7 days ahead.
 * @returns {{inDays:number, dow:number, open:string}|null}
 */
function findNextOpen(bh, tz, now) {
  const { dow, time } = localParts(now, tz);
  const nowMin = toMin(time);
  for (let i = 0; i < 8; i++) {
    const d = (dow + i) % 7;
    const cfg = dayConfig(bh, d);
    const win = windowFor(cfg);
    if (!win) continue;
    if (i === 0) {
      if (nowMin < win.open) return { inDays: 0, dow: d, open: cfg.open };
      // already opened today (or past) — keep scanning for the next opening
    } else {
      return { inDays: i, dow: d, open: cfg.open };
    }
  }
  return null;
}

function mkState(bh, tz, now, status, cfg) {
  const open = status === 'open';
  return {
    enabled: true,
    canOrder: open,
    status, // open | before_open | after_last_order | after_close | closed_today
    today: todaySnapshot(cfg),
    message_key: open ? null : status,
    nextOpen: open ? null : findNextOpen(bh, tz, now)
  };
}

/**
 * Immediate-ordering state for a given instant.
 * dine-in / takeaway / ASAP-pickup are gated by `canOrder`.
 * @param {object} operationSettings  restaurant.operation_settings
 * @param {Date}   now
 */
function getOrderingState(operationSettings, now) {
  const os = operationSettings || {};
  const bh = os.businessHours;
  if (!bh || !bh.enabled) {
    return { enabled: false, canOrder: true, status: 'disabled', today: null, message_key: null, nextOpen: null };
  }
  const tz = os.timeZone || DEFAULT_TZ;
  const { dow, time } = localParts(now, tz);
  const nowMin = toMin(time);

  // 1) Previous-day overnight spillover (e.g. yesterday 18:00–02:00, now 01:00).
  const prevDow = (dow + 6) % 7;
  const prevCfg = dayConfig(bh, prevDow);
  const prevWin = windowFor(prevCfg);
  if (prevWin && prevWin.overnight) {
    const nowRel = nowMin + 1440; // now expressed in prev-day's frame
    if (nowRel >= prevWin.open && nowRel < prevWin.closeAbs) {
      const open = nowRel < prevWin.lastOrderAbs;
      return mkState(bh, tz, now, open ? 'open' : 'after_last_order', prevCfg);
    }
  }

  // 2) Today's window.
  const todayCfg = dayConfig(bh, dow);
  const todayWin = windowFor(todayCfg);
  if (!todayWin) return mkState(bh, tz, now, 'closed_today', todayCfg);

  if (nowMin < todayWin.open) return mkState(bh, tz, now, 'before_open', todayCfg);
  if (nowMin >= todayWin.closeAbs) return mkState(bh, tz, now, 'after_close', todayCfg);
  if (nowMin >= todayWin.lastOrderAbs) return mkState(bh, tz, now, 'after_last_order', todayCfg);
  return mkState(bh, tz, now, 'open', todayCfg);
}

/** Add N days to a "YYYY-MM-DD" string (UTC-noon anchor; MY/ASEAN have no DST). */
function addDays(dateStr, n) {
  const [y, mo, da] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, da, 12, 0, 0));
  dt.setUTCDate(dt.getUTCDate() + n);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function hhmm(mAbs) {
  const hm = ((mAbs % 1440) + 1440) % 1440;
  return `${String(Math.floor(hm / 60)).padStart(2, '0')}:${String(hm % 60).padStart(2, '0')}`;
}

/**
 * Valid pickup/pre-order slots from `now`, grouped by calendar day.
 * Honors open..lastOrder per weekday, skips closed days, handles overnight, and
 * drops past slots (with optional lead time). Returns null when the gate is OFF
 * (caller falls back to legacy slot logic).
 *
 * @returns {null | Array<{ dayOffset:number, dow:number, date:string, times:string[] }>}
 */
function getPickupSlots(operationSettings, now, opts = {}) {
  const os = operationSettings || {};
  const bh = os.businessHours;
  if (!bh || !bh.enabled) return null;

  const tz = os.timeZone || DEFAULT_TZ;
  const days = opts.days || 7;
  const step = opts.stepMin || 15;
  const lead = opts.leadMin || 0;

  const { date, dow, time } = localParts(now, tz);
  const nowMin = toMin(time);

  // Bucket slots by absolute calendar date so overnight spill lands on the right day.
  const byDate = new Map();
  const pushSlot = (dOffsetFromToday, t) => {
    const ds = addDays(date, dOffsetFromToday);
    if (!byDate.has(ds)) byDate.set(ds, { dayOffset: dOffsetFromToday, dow: (dow + dOffsetFromToday) % 7, date: ds, times: [] });
    byDate.get(ds).times.push(t);
  };

  for (let i = 0; i < days; i++) {
    const d = (dow + i) % 7;
    const win = windowFor(dayConfig(bh, d));
    if (!win) continue;
    const first = Math.ceil(win.open / step) * step;
    for (let mAbs = first; mAbs <= win.lastOrderAbs; mAbs += step) {
      // Earliest bound only applies to the current real day frame.
      if (i === 0 && mAbs < nowMin + lead) continue;
      const dayShift = Math.floor(mAbs / 1440); // overnight slots roll to next calendar day
      pushSlot(i + dayShift, hhmm(mAbs));
    }
  }

  return Array.from(byDate.values())
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .filter(g => g.times.length > 0);
}

/**
 * Is a requested pickup datetime valid? (future + inside an orderable window.)
 * Reuses getOrderingState at the requested instant so logic is identical.
 * @param {object} operationSettings
 * @param {Date}   now
 * @param {Date}   when  requested pickup time
 */
function isValidPickupTime(operationSettings, now, when) {
  if (!(when instanceof Date) || isNaN(when.getTime())) return false;
  const TOLERANCE_MS = 5 * 60 * 1000; // allow a few minutes of clock skew / ASAP edge
  if (when.getTime() < now.getTime() - TOLERANCE_MS) return false;
  const at = getOrderingState(operationSettings, when);
  return at.canOrder === true;
}

module.exports = { getOrderingState, getPickupSlots, isValidPickupTime, toMin, windowFor };
