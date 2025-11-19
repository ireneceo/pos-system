/**
 * Timezone Utility Functions
 *
 * All date/time displays in the application should use these functions
 * to respect the restaurant's timezone setting from Store Settings.
 */

/**
 * Get the restaurant's timezone from operation settings
 * Falls back to 'Asia/Kuala_Lumpur' if not set
 */
export const getRestaurantTimezone = (operationSettings?: any): string => {
  return operationSettings?.timeZone || 'Asia/Kuala_Lumpur';
};

/**
 * Format a date/time with the restaurant's timezone
 * @param date - Date object, string, or timestamp to format
 * @param operationSettings - Restaurant operation settings containing timezone
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 */
export const formatDateTime = (
  date: Date | string | number | undefined | null,
  operationSettings?: any,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!date) return '';

  const targetDate = new Date(date);
  if (isNaN(targetDate.getTime())) return '';

  const timezone = getRestaurantTimezone(operationSettings);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone
  };

  return targetDate.toLocaleString('en-MY', { ...defaultOptions, ...options });
};

/**
 * Format date only (no time) with the restaurant's timezone
 */
export const formatDate = (
  date: Date | string | number | undefined | null,
  operationSettings?: any
): string => {
  return formatDateTime(date, operationSettings, {
    hour: undefined,
    minute: undefined,
    hour12: undefined
  });
};

/**
 * Format time only (no date) with the restaurant's timezone
 */
export const formatTime = (
  date: Date | string | number | undefined | null,
  operationSettings?: any
): string => {
  return formatDateTime(date, operationSettings, {
    year: undefined,
    month: undefined,
    day: undefined
  });
};

/**
 * Format date/time for reports and exports
 */
export const formatDateTimeForExport = (
  date: Date | string | number | undefined | null,
  operationSettings?: any
): string => {
  return formatDateTime(date, operationSettings, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

/**
 * Get current date/time in restaurant timezone
 */
export const getNow = (operationSettings?: any): Date => {
  // Note: Date object is always in UTC internally
  // The timezone is only used for display formatting
  return new Date();
};

/**
 * Calculate time elapsed (for "X mins ago" displays)
 * Always uses UTC for calculation to avoid timezone issues
 */
export const getTimeElapsed = (date: Date | string | number | undefined | null): string => {
  if (!date) return 'just now';

  const orderTime = new Date(date).getTime();
  if (isNaN(orderTime)) return 'just now';

  const now = Date.now();
  const diffMs = now - orderTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins === 1) return '1 min ago';
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};
