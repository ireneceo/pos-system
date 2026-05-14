/**
 * DateTime Helper Utility
 * Provides timezone-aware date calculations for all date-based queries.
 *
 * Core algorithm: Convert local timezone boundaries to UTC for DB queries.
 * All Sequelize queries use UTC internally, so we must calculate
 * "what UTC moment corresponds to midnight in the restaurant's timezone?"
 */

const DEFAULT_TZ = 'Asia/Kuala_Lumpur';

/**
 * Compute the IANA timezone's UTC offset (in ms) AT a specific UTC instant.
 *
 * Uses Intl.DateTimeFormat to read what the wall-clock components would be in
 * the target timezone, then derives the offset. Correct across DST boundaries
 * because the offset is evaluated at the target moment — not at process start
 * or `now` (which is the bug this replaces).
 */
function _tzOffsetAt(timezone, utcDate) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(utcDate).map(p => [p.type, p.value])
  );
  const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day,
    +parts.hour, +parts.minute, +parts.second);
  return asUTC - utcDate.getTime();
}

/**
 * Core: Convert a wall-clock moment in `timezone` to the corresponding UTC Date.
 *
 * DST-correct: resolves the offset at the *target* moment, so dates near
 * DST transitions or far from `now` (e.g. yearly reports, future bookings)
 * return the right UTC instant. Two iterations resolve the ±1h discrepancy
 * that can occur right at a DST boundary.
 *
 * @param {number} year - Full year
 * @param {number} month - 0-based month
 * @param {number} day - Day of month
 * @param {number} hours - Hours (0-23)
 * @param {number} minutes - Minutes
 * @param {number} seconds - Seconds
 * @param {number} ms - Milliseconds
 * @param {string} timezone - IANA timezone
 * @returns {Date} UTC Date object
 */
function _localToUTC(year, month, day, hours, minutes, seconds, ms, timezone) {
  const naive = Date.UTC(year, month, day, hours, minutes, seconds, ms);
  // First pass: assume the wall-clock is UTC, look up offset at that moment.
  let utc = naive - _tzOffsetAt(timezone, new Date(naive));
  // Second pass: re-evaluate at the candidate UTC — converges around DST jumps.
  utc = naive - _tzOffsetAt(timezone, new Date(utc));
  return new Date(utc);
}

/**
 * Get current date string in a specific timezone (YYYY-MM-DD)
 */
function getCurrentLocalDate(timeZone = DEFAULT_TZ) {
  return new Date().toLocaleDateString('en-CA', { timeZone });
}

/**
 * Get current local Date parts in a specific timezone
 */
function getLocalDate(timeZone = DEFAULT_TZ) {
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { timeZone });
  return new Date(dateStr);
}

/**
 * Get today's start and end as UTC Date objects for a given timezone.
 * Use these in Sequelize where clauses: { createdAt: { [Op.between]: [startOfDay, endOfDay] } }
 */
function getTodayBounds(timeZone = DEFAULT_TZ) {
  const dateStr = getCurrentLocalDate(timeZone);
  return getDateBounds(dateStr, timeZone);
}

/**
 * Get start/end of a specific date as UTC Date objects.
 * @param {string} dateStr - 'YYYY-MM-DD'
 * @param {string} timeZone - IANA timezone
 * @returns {{ startOfDay: Date, endOfDay: Date }}
 */
function getDateBounds(dateStr, timeZone = DEFAULT_TZ) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const startOfDay = _localToUTC(y, m - 1, d, 0, 0, 0, 0, timeZone);
  const endOfDay = _localToUTC(y, m - 1, d, 23, 59, 59, 999, timeZone);
  return { startOfDay, endOfDay };
}

/**
 * Get timezone offset in hours (for display purposes only, NOT for date math)
 */
function getTimezoneOffset(timeZone = DEFAULT_TZ) {
  const now = new Date();
  const tzString = now.toLocaleString('en-US', {
    timeZone,
    timeZoneName: 'shortOffset'
  });
  const offsetMatch = tzString.match(/GMT([+-]\d+)/);
  return offsetMatch ? parseInt(offsetMatch[1]) : 8;
}

/**
 * Generate date prefix for order numbers (YYMMDD format) in restaurant's timezone
 */
function getOrderDatePrefix(timeZone = DEFAULT_TZ) {
  const dateStr = getCurrentLocalDate(timeZone);
  const [y, m, d] = dateStr.split('-');
  return `${y.slice(-2)}${m}${d}`;
}

/**
 * Get start of current month as UTC Date
 */
function getStartOfMonth(timeZone = DEFAULT_TZ) {
  const dateStr = getCurrentLocalDate(timeZone);
  const [y, m] = dateStr.split('-').map(Number);
  return _localToUTC(y, m - 1, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Get end of current month as UTC Date
 */
function getEndOfMonth(timeZone = DEFAULT_TZ) {
  const dateStr = getCurrentLocalDate(timeZone);
  const [y, m] = dateStr.split('-').map(Number);
  const lastDay = new Date(y, m, 0).getDate(); // day 0 of next month = last day of this month
  return _localToUTC(y, m - 1, lastDay, 23, 59, 59, 999, timeZone);
}

/**
 * Get month bounds for a specific year/month as UTC Dates
 * @param {number} year - Full year
 * @param {number} month - 1-based month (1=Jan)
 */
function getMonthBounds(year, month, timeZone = DEFAULT_TZ) {
  const lastDay = new Date(year, month, 0).getDate();
  const monthStart = _localToUTC(year, month - 1, 1, 0, 0, 0, 0, timeZone);
  const monthEnd = _localToUTC(year, month - 1, lastDay, 23, 59, 59, 999, timeZone);
  return { monthStart, monthEnd };
}

/**
 * Get start of current year as UTC Date
 */
function getStartOfYear(timeZone = DEFAULT_TZ) {
  const dateStr = getCurrentLocalDate(timeZone);
  const y = parseInt(dateStr.split('-')[0]);
  return _localToUTC(y, 0, 1, 0, 0, 0, 0, timeZone);
}

/**
 * Get date range for past N days as UTC Dates
 * @param {number} days - Number of days to go back
 * @param {string} timeZone - IANA timezone
 * @returns {{ startDate: Date, endDate: Date }}
 */
function getDateRange(days, timeZone = DEFAULT_TZ) {
  const todayStr = getCurrentLocalDate(timeZone);
  const [y, m, d] = todayStr.split('-').map(Number);

  const endDate = _localToUTC(y, m - 1, d, 23, 59, 59, 999, timeZone);

  // Go back N-1 days from today
  const startLocal = new Date(y, m - 1, d);
  startLocal.setDate(startLocal.getDate() - days + 1);
  const startDate = _localToUTC(
    startLocal.getFullYear(), startLocal.getMonth(), startLocal.getDate(),
    0, 0, 0, 0, timeZone
  );

  return { startDate, endDate };
}

/**
 * Get week bounds (past 7 days) as UTC Dates
 */
function getWeekBounds(timeZone = DEFAULT_TZ) {
  return getDateRange(7, timeZone);
}

/**
 * Get period-based date range for analytics
 * @param {string} period - 'today', 'week', 'month', 'year'
 * @param {string} timeZone - IANA timezone
 * @returns {{ startDate: Date, endDate: Date }}
 */
function getPeriodBounds(period, timeZone = DEFAULT_TZ) {
  const { startOfDay, endOfDay } = getTodayBounds(timeZone);

  switch (period) {
    case 'today':
      return { startDate: startOfDay, endDate: endOfDay };
    case 'week':
      return getDateRange(7, timeZone);
    case 'month': {
      const monthStart = getStartOfMonth(timeZone);
      return { startDate: monthStart, endDate: endOfDay };
    }
    case 'year': {
      const yearStart = getStartOfYear(timeZone);
      return { startDate: yearStart, endDate: endOfDay };
    }
    default:
      return getDateRange(30, timeZone);
  }
}

/**
 * Format date as ISO date string (YYYY-MM-DD)
 */
function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Format date as month key (YYYY-MM)
 */
function formatMonthKey(date) {
  return date.toISOString().slice(0, 7);
}

/**
 * Convert a local-clock moment (YYYY-MM-DD + HH:mm) in a given timezone
 * to a UTC Date suitable for DB storage / comparison.
 *
 *   localClockToUTC('2026-05-13', '19:30', 'Asia/Kuala_Lumpur')
 *   → Date for 2026-05-13T11:30:00.000Z
 *
 * Used by reservation slot generation where openingTime/closingTime are
 * expressed in the restaurant's local clock.
 */
function localClockToUTC(dateStr, hhmm, timeZone = DEFAULT_TZ) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = hhmm.split(':').map(Number);
  return _localToUTC(y, m - 1, d, hh, mm, 0, 0, timeZone);
}

/**
 * Format a Date (or ISO string) as HH:mm in a given timezone.
 *   formatTimeInTZ(new Date('2026-05-13T11:30Z'), 'Asia/Kuala_Lumpur') → '19:30'
 */
function formatTimeInTZ(dateOrIso, timeZone = DEFAULT_TZ) {
  const d = dateOrIso instanceof Date ? dateOrIso : new Date(dateOrIso);
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone
  });
}

/**
 * Get timezone from restaurant operation settings
 */
function getRestaurantTimezone(restaurant) {
  if (!restaurant) return DEFAULT_TZ;

  try {
    const operationSettings = restaurant.operation_settings ?
      (typeof restaurant.operation_settings === 'string' ?
        JSON.parse(restaurant.operation_settings) :
        restaurant.operation_settings) : null;

    return operationSettings?.timeZone || DEFAULT_TZ;
  } catch (e) {
    return DEFAULT_TZ;
  }
}

/**
 * Get the system (site) timezone from CompanySettings
 */
async function getSiteTimezone() {
  try {
    const CompanySettings = require('../models/CompanySettings');
    const settings = await CompanySettings.findOne({ attributes: ['timezone'] });
    return settings?.timezone || DEFAULT_TZ;
  } catch (e) {
    return DEFAULT_TZ;
  }
}

module.exports = {
  getLocalDate,
  getCurrentLocalDate,
  getTodayBounds,
  getDateBounds,
  getTimezoneOffset,
  getOrderDatePrefix,
  getStartOfMonth,
  getEndOfMonth,
  getMonthBounds,
  getStartOfYear,
  getDateRange,
  getWeekBounds,
  getPeriodBounds,
  formatDateISO,
  formatMonthKey,
  localClockToUTC,
  formatTimeInTZ,
  getRestaurantTimezone,
  getSiteTimezone
};
