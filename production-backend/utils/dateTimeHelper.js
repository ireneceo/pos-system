/**
 * DateTime Helper Utility
 * Provides timezone-aware date calculations and formatting
 */

/**
 * Get current date in a specific timezone
 * @param {string} timeZone - IANA timezone string (e.g., 'Asia/Kuala_Lumpur')
 * @returns {Date} Date object adjusted for timezone
 */
function getLocalDate(timeZone = 'Asia/Kuala_Lumpur') {
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { timeZone });
  return new Date(dateStr);
}

/**
 * Get today's start and end timestamps in a specific timezone
 * @param {string} timeZone - IANA timezone string
 * @returns {Object} { startOfDay, endOfDay } as Date objects in UTC
 */
function getTodayBounds(timeZone = 'Asia/Kuala_Lumpur') {
  const now = new Date();
  // Get current date string in the target timezone (YYYY-MM-DD format)
  const dateStr = now.toLocaleDateString('en-CA', { timeZone });

  // Create start and end of day
  const startOfDay = new Date(`${dateStr}T00:00:00`);
  const endOfDay = new Date(`${dateStr}T23:59:59.999`);

  // Get timezone offset
  const tzOffset = getTimezoneOffset(timeZone);

  // Adjust for timezone offset to get UTC times
  startOfDay.setHours(startOfDay.getHours() - tzOffset);
  endOfDay.setHours(endOfDay.getHours() - tzOffset);

  return { startOfDay, endOfDay };
}

/**
 * Get timezone offset in hours
 * @param {string} timeZone - IANA timezone string
 * @returns {number} Offset in hours (e.g., 8 for UTC+8)
 */
function getTimezoneOffset(timeZone = 'Asia/Kuala_Lumpur') {
  const now = new Date();
  const tzString = now.toLocaleString('en-US', {
    timeZone,
    timeZoneName: 'shortOffset'
  });
  const offsetMatch = tzString.match(/GMT([+-]\d+)/);
  return offsetMatch ? parseInt(offsetMatch[1]) : 8; // Default to +8
}

/**
 * Generate date prefix for order numbers (YYMMDD format)
 * @param {string} timeZone - IANA timezone string
 * @returns {string} Date prefix in YYMMDD format
 */
function getOrderDatePrefix(timeZone = 'Asia/Kuala_Lumpur') {
  const localDate = getLocalDate(timeZone);
  const year = localDate.getFullYear().toString().slice(-2);
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Get start of current month
 * @param {string} timeZone - IANA timezone string (optional)
 * @returns {Date} Start of month
 */
function getStartOfMonth(timeZone) {
  const now = timeZone ? getLocalDate(timeZone) : new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
}

/**
 * Get end of current month
 * @param {string} timeZone - IANA timezone string (optional)
 * @returns {Date} End of month
 */
function getEndOfMonth(timeZone) {
  const now = timeZone ? getLocalDate(timeZone) : new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
}

/**
 * Get start of current year
 * @param {string} timeZone - IANA timezone string (optional)
 * @returns {Date} Start of year
 */
function getStartOfYear(timeZone) {
  const now = timeZone ? getLocalDate(timeZone) : new Date();
  return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
}

/**
 * Get date range for past N days
 * @param {number} days - Number of days to go back
 * @param {string} timeZone - IANA timezone string (optional)
 * @returns {Object} { startDate, endDate }
 */
function getDateRange(days, timeZone) {
  const endDate = timeZone ? getLocalDate(timeZone) : new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);

  return { startDate, endDate };
}

/**
 * Format date as ISO date string (YYYY-MM-DD)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Format date as month key (YYYY-MM)
 * @param {Date} date - Date object
 * @returns {string} Month key
 */
function formatMonthKey(date) {
  return date.toISOString().slice(0, 7);
}

/**
 * Get timezone from restaurant operation settings
 * @param {Object} restaurant - Restaurant object
 * @returns {string} Timezone string
 */
function getRestaurantTimezone(restaurant) {
  if (!restaurant) return 'Asia/Kuala_Lumpur';

  try {
    const operationSettings = restaurant.operation_settings ?
      (typeof restaurant.operation_settings === 'string' ?
        JSON.parse(restaurant.operation_settings) :
        restaurant.operation_settings) : null;

    return operationSettings?.timeZone || 'Asia/Kuala_Lumpur';
  } catch (e) {
    return 'Asia/Kuala_Lumpur';
  }
}

module.exports = {
  getLocalDate,
  getTodayBounds,
  getTimezoneOffset,
  getOrderDatePrefix,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getDateRange,
  formatDateISO,
  formatMonthKey,
  getRestaurantTimezone
};
