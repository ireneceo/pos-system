/**
 * Centralized Application Constants
 *
 * This file contains all shared constants used across the application.
 *
 * IMPORTANT RULES:
 * 1. Always import constants from this file, never hardcode values
 * 2. Use SCREAMING_SNAKE_CASE for constant names
 * 3. Group related constants together
 * 4. Add JSDoc comments explaining what each constant is for
 */

// ============================================================================
// ORDER CONSTANTS
// ============================================================================

/**
 * Order type values
 */
export const ORDER_TYPES = {
  DINE_IN: 'dine-in',
  TAKEAWAY: 'takeaway',
  DINE_IN_BACKEND: 'dine_in'  // Backend format
} as const;

/**
 * Order status values
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  AWAITING_PAYMENT: 'awaiting_payment'
} as const;

/**
 * Payment method identifiers
 */
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  EWALLET: 'ewallet',
  BANK_TRANSFER: 'bank_transfer',
  QR: 'qr',
  COUNTER: 'counter',
  ONLINE: 'online',
  FPX: 'fpx',
  STAFF_MEAL: 'staffMeal'
} as const;

/**
 * Payment status values
 */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const;

/**
 * Payment method labels for display
 */
export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  [PAYMENT_METHODS.CASH]: 'Cash',
  [PAYMENT_METHODS.CARD]: 'Credit/Debit Card',
  [PAYMENT_METHODS.EWALLET]: 'E-Wallet',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
  [PAYMENT_METHODS.QR]: 'QR Payment',
  [PAYMENT_METHODS.COUNTER]: 'Pay at Counter',
  [PAYMENT_METHODS.ONLINE]: 'Online Payment',
  [PAYMENT_METHODS.FPX]: 'FPX Online Banking',
  [PAYMENT_METHODS.STAFF_MEAL]: 'Staff Meal'
};

/**
 * Order status labels for display
 */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.READY]: 'Ready',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.AWAITING_PAYMENT]: 'Awaiting Payment'
};

/**
 * Order type labels for display
 */
export const ORDER_TYPE_LABELS: Record<string, string> = {
  [ORDER_TYPES.DINE_IN]: 'Dine In',
  [ORDER_TYPES.TAKEAWAY]: 'Takeaway',
  [ORDER_TYPES.DINE_IN_BACKEND]: 'Dine In'
};

// ============================================================================
// USER/AUTH CONSTANTS
// ============================================================================

/**
 * User roles
 */
export const USER_ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
  STAFF: 'staff',
  CASHIER: 'cashier',
  KITCHEN: 'kitchen'
} as const;

/**
 * User role labels for display
 */
export const USER_ROLE_LABELS: Record<string, string> = {
  [USER_ROLES.OWNER]: 'Owner',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.STAFF]: 'Staff',
  [USER_ROLES.CASHIER]: 'Cashier',
  [USER_ROLES.KITCHEN]: 'Kitchen Staff'
};

/**
 * LocalStorage keys for authentication
 */
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  MOBILE_TOKEN: 'mobileToken',
  USER: 'user',
  REFRESH_TOKEN: 'refreshToken'
} as const;

/**
 * SessionStorage keys
 */
export const SESSION_STORAGE_KEYS = {
  RESTAURANT_SLUG: 'restaurantSlug',
  RESTAURANT_ID: 'restaurantId',
  ORDER_TYPE: 'orderType',
  TABLE_NUMBER: 'tableNumber'
} as const;

// ============================================================================
// RESTAURANT CONSTANTS
// ============================================================================

/**
 * Restaurant status values
 */
export const RESTAURANT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;

/**
 * Restaurant plan types
 */
export const RESTAURANT_PLANS = {
  BASIC: 'Basic Plan',
  PROFESSIONAL: 'Professional Plan',
  ENTERPRISE: 'Enterprise Plan'
} as const;

/**
 * Billing cycle options
 */
export const BILLING_CYCLES = {
  MONTHLY: 'monthly',
  ANNUAL: 'annual'
} as const;

// ============================================================================
// API CONSTANTS
// ============================================================================

/**
 * API base URLs
 */
export const API_URLS = {
  BASE: process.env.REACT_APP_API_URL || '/api',
  RESTAURANTS: '/api/restaurants',
  ORDERS: '/api/orders',
  PRODUCTS: '/api/products',
  USERS: '/api/users',
  AUTH: '/api/auth',
  MOBILE: '/api/mobile'
} as const;

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500
} as const;

/**
 * HTTP methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
} as const;

// ============================================================================
// UI CONSTANTS
// ============================================================================

/**
 * Toast notification duration (ms)
 */
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000
} as const;

/**
 * Polling intervals (ms)
 */
export const POLLING_INTERVALS = {
  ORDERS: 5000,        // 5 seconds
  KITCHEN: 3000,       // 3 seconds
  REAL_TIME: 1000      // 1 second
} as const;

/**
 * Debounce delays (ms)
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  INPUT: 500,
  RESIZE: 250
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
} as const;

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

/**
 * Input validation limits
 */
export const VALIDATION_LIMITS = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PHONE_LENGTH: 8,
  MAX_PHONE_LENGTH: 20,
  MAX_TABLE_NUMBER_LENGTH: 10
} as const;

/**
 * Regular expressions for validation
 */
export const VALIDATION_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9+\-\s()]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/
} as const;

// ============================================================================
// DATE/TIME CONSTANTS
// ============================================================================

/**
 * Date format strings
 */
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm',
  TIME_12H: 'hh:mm A'
} as const;

/**
 * Timezone
 */
export const DEFAULT_TIMEZONE = 'Asia/Kuala_Lumpur';

// ============================================================================
// PRODUCT CONSTANTS
// ============================================================================

/**
 * Default product categories
 */
export const DEFAULT_CATEGORIES = [
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Sides',
  'Specials'
] as const;

/**
 * Product image upload limits
 */
export const IMAGE_UPLOAD = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp']
} as const;

// ============================================================================
// ORDER NUMBER FORMATS
// ============================================================================

/**
 * Order number prefix by order type
 */
export const ORDER_NUMBER_PREFIX = {
  [ORDER_TYPES.DINE_IN]: 'D',
  [ORDER_TYPES.TAKEAWAY]: 'T',
  [ORDER_TYPES.DINE_IN_BACKEND]: 'D'
} as const;

/**
 * Pickup number range
 */
export const PICKUP_NUMBER_RANGE = {
  MIN: 1,
  MAX: 999
} as const;

// ============================================================================
// COLOR CONSTANTS
// ============================================================================

/**
 * Status colors for UI
 */
export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#FEF3C7',          // Yellow background
  [ORDER_STATUS.CONFIRMED]: '#DBEAFE',         // Blue background
  [ORDER_STATUS.PREPARING]: '#FED7AA',         // Orange background
  [ORDER_STATUS.READY]: '#BBF7D0',             // Green background
  [ORDER_STATUS.COMPLETED]: '#C7CED6',         // Gray background
  [ORDER_STATUS.CANCELLED]: '#FECACA',         // Red background
  [ORDER_STATUS.AWAITING_PAYMENT]: '#FEF3C7'  // Yellow background
} as const;

/**
 * Status text colors
 */
export const STATUS_TEXT_COLORS = {
  [ORDER_STATUS.PENDING]: '#F59E0B',
  [ORDER_STATUS.CONFIRMED]: '#3B82F6',
  [ORDER_STATUS.PREPARING]: '#F97316',
  [ORDER_STATUS.READY]: '#10B981',
  [ORDER_STATUS.COMPLETED]: '#4B5563',
  [ORDER_STATUS.CANCELLED]: '#EF4444',
  [ORDER_STATUS.AWAITING_PAYMENT]: '#F59E0B'
} as const;

/**
 * Order type badge colors
 */
export const ORDER_TYPE_COLORS = {
  BACKGROUND: '#FEF3C7',  // Yellow
  TEXT: '#F59E0B'         // Orange
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

/**
 * Feature flags for enabling/disabling features
 */
export const FEATURE_FLAGS = {
  ENABLE_MOBILE_ORDERING: true,
  ENABLE_ONLINE_PAYMENT: true,
  ENABLE_QR_ORDERING: true,
  ENABLE_KITCHEN_DISPLAY: true,
  ENABLE_REAL_TIME_UPDATES: true,
  ENABLE_MULTI_LANGUAGE: false,
  ENABLE_LOYALTY_PROGRAM: false
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

/**
 * Standard error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  ORDER_CREATE_FAILED: 'Failed to create order. Please try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.'
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  ORDER_CREATED: 'Order created successfully!',
  ORDER_UPDATED: 'Order updated successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully!',
  PAYMENT_COMPLETED: 'Payment completed successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!'
} as const;

// ============================================================================
// WEBSOCKET EVENTS
// ============================================================================

/**
 * WebSocket event names (for real-time updates)
 */
export const WS_EVENTS = {
  ORDER_CREATED: 'order:created',
  ORDER_UPDATED: 'order:updated',
  ORDER_STATUS_CHANGED: 'order:status_changed',
  PAYMENT_COMPLETED: 'payment:completed',
  KITCHEN_NOTIFICATION: 'kitchen:notification'
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

/**
 * Helper function to convert frontend order type to backend format
 */
export function toBackendOrderType(orderType: string): string {
  return orderType === ORDER_TYPES.DINE_IN ? ORDER_TYPES.DINE_IN_BACKEND : orderType;
}

/**
 * Helper function to convert backend order type to frontend format
 */
export function toFrontendOrderType(orderType: string): string {
  return orderType === ORDER_TYPES.DINE_IN_BACKEND ? ORDER_TYPES.DINE_IN : orderType;
}

/**
 * Helper function to get order status color
 */
export function getOrderStatusColor(status: string): { background: string; text: string } {
  return {
    background: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#C7CED6',
    text: STATUS_TEXT_COLORS[status as keyof typeof STATUS_TEXT_COLORS] || '#4B5563'
  };
}

/**
 * Helper function to format payment method label
 * paymentSettings가 있으면 거기서 label을 가져오고, 없으면 hardcoded fallback
 */
export function getPaymentMethodLabel(method: string, paymentSettings?: Record<string, any>): string {
  if (paymentSettings) {
    // payment_settings key mapping: method code → settings key
    const keyMap: Record<string, string> = {
      cash: 'cash',
      card: 'card',
      ewallet: 'ewallet',
      bank_transfer: 'bankTransfer',
      qr: 'qr',
      counter: 'payAtCounter',
      online: 'online',
      fpx: 'fpx',
      staffMeal: 'staffMeal',
      staff_meal: 'staffMeal',
    };
    const settingsKey = keyMap[method] || method;
    const setting = paymentSettings[settingsKey] || paymentSettings[method];
    if (setting?.label) return setting.label;
  }
  return PAYMENT_METHOD_LABELS[method] || method;
}

/**
 * Card type label mapping
 */
const CARD_TYPE_LABELS: Record<string, string> = {
  visa: 'Visa',
  master: 'Master',
  amex: 'Amex',
  debit: 'Debit',
  other: 'Other'
};

/**
 * Format payment method with card type: "Card(Visa)", "Cash", etc.
 */
export function formatPaymentDisplay(method: string | null | undefined, cardType?: string | null, paymentSettings?: Record<string, any>): string {
  if (!method) return 'N/A';
  if (method === 'card' && cardType) {
    const cardLabel = getPaymentMethodLabel('card', paymentSettings);
    return `${cardLabel}(${CARD_TYPE_LABELS[cardType] || cardType})`;
  }
  return getPaymentMethodLabel(method, paymentSettings);
}

/**
 * Helper function to format order status label
 */
export function getOrderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status] || status;
}

/**
 * Helper function to validate email
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_REGEX.EMAIL.test(email);
}

/**
 * Helper function to validate phone
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION_REGEX.PHONE.test(phone) &&
         phone.length >= VALIDATION_LIMITS.MIN_PHONE_LENGTH &&
         phone.length <= VALIDATION_LIMITS.MAX_PHONE_LENGTH;
}
