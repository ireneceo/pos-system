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
 * Get today's date string (YYYY-MM-DD) in restaurant's timezone
 * This is crucial for date filters to work correctly across timezones
 */
export const getTodayInTimezone = (timezone: string = 'Asia/Kuala_Lumpur'): string => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(now); // Returns YYYY-MM-DD format
  } catch {
    // Fallback to local date if timezone is invalid
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
};

/**
 * Get a date string (YYYY-MM-DD) with offset in restaurant's timezone
 * @param daysOffset - Number of days to offset (negative for past, positive for future)
 * @param timezone - Restaurant's timezone
 */
export const getDateInTimezone = (daysOffset: number = 0, timezone: string = 'Asia/Kuala_Lumpur'): string => {
  try {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(date);
  } catch {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
};

/**
 * Convert a UTC date to YYYY-MM-DD string in restaurant's timezone
 * Essential for filtering orders by date range
 */
export const getDateStringInTimezone = (
  date: Date | string | number | undefined | null,
  timezone: string = 'Asia/Kuala_Lumpur'
): string => {
  if (!date) return '';

  const targetDate = new Date(date);
  if (isNaN(targetDate.getTime())) return '';

  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(targetDate); // Returns YYYY-MM-DD format
  } catch {
    // Fallback
    return `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
  }
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
