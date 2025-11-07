/**
 * Centralized Type Definitions
 *
 * This file contains all shared types and interfaces used across the application.
 *
 * IMPORTANT RULES:
 * 1. Always import types from this file, never define duplicates elsewhere
 * 2. When adding new types, check if similar ones exist first
 * 3. To deprecate a type, mark it with @deprecated and removal date
 * 4. All API response types should be defined here
 * 5. Use strict property names that match backend responses
 */

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

/**
 * User object from backend authentication
 *
 * IMPORTANT: User does NOT have a restaurantId property!
 * - Use useRestaurantId() hook to get restaurant ID
 * - Or extract from URL params/context as needed
 */
export interface User {
  id: number;
  email: string;
  role: 'owner' | 'manager' | 'staff' | 'cashier' | 'kitchen';
  full_name: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Authentication context value
 */
export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// ============================================================================
// RESTAURANT TYPES
// ============================================================================

/**
 * Restaurant/Store object
 */
export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  manager_id?: number;
  manager_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  logo_url?: string;
  plan_type?: 'Basic Plan' | 'Professional Plan' | 'Enterprise Plan';
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

/**
 * Payment method configuration
 */
export interface PaymentMethod {
  enabled: boolean;
  label: string;
  availableIn: ('pos' | 'mobile')[];
  provider?: string;
  config?: Record<string, any>;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrImage?: string;
}

/**
 * Payment settings structure
 */
export interface PaymentSettings {
  cash?: PaymentMethod;
  card?: PaymentMethod;
  ewallet?: PaymentMethod;
  bankTransfer?: PaymentMethod;
  qr?: PaymentMethod;
  counter?: PaymentMethod;
  online?: PaymentMethod;
  fpx?: PaymentMethod;
}

// ============================================================================
// ORDER TYPES
// ============================================================================

/**
 * Order type - matches backend enum
 */
export type OrderType = 'dine-in' | 'takeaway' | 'dine_in';

/**
 * Order status - matches backend enum
 */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'awaiting_payment';

/**
 * Payment method type
 */
export type PaymentMethodType =
  | 'cash'
  | 'card'
  | 'ewallet'
  | 'bank_transfer'
  | 'qr'
  | 'counter'
  | 'online'
  | 'fpx';

/**
 * Payment status
 */
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

/**
 * Menu item option
 */
export interface MenuItemOption {
  name: string;
  price: number;
}

/**
 * Order item (individual product in an order)
 */
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  options?: MenuItemOption[];
  subtotal: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Full order object from backend
 */
export interface Order {
  id: number;
  restaurant_id: number;
  order_number: string;
  pickup_number?: number;
  customer_name: string;
  customer_phone?: string;
  table_number?: string;
  order_type: OrderType;
  status: OrderStatus;
  payment_method?: PaymentMethodType;
  payment_status: PaymentStatus;
  total_amount: number;
  order_date: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

// ============================================================================
// PRODUCT/MENU TYPES
// ============================================================================

/**
 * Option group for menu items
 */
export interface OptionGroup {
  id: string;
  name: string;
  required: boolean;
  multiSelect: boolean;
  options: MenuItemOption[];
}

/**
 * Product/Menu item
 */
export interface Product {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  optionGroups?: OptionGroup[];
  image?: string;
  emoji?: string;
  soldOut: boolean;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// FRONTEND-SPECIFIC TYPES (for component state)
// ============================================================================

/**
 * Customer information for order creation
 */
export interface CustomerInfo {
  name: string;
  phone: string;
}

/**
 * Cart item in POS/Mobile order system
 */
export interface CartItem {
  id: string;
  menuItem: Product;
  quantity: number;
  options: MenuItemOption[];
  subtotal: number;
}

/**
 * New order being created (before saved to backend)
 */
export interface NewOrder {
  orderNumber?: string;
  pickupNumber?: number;
  customer: CustomerInfo;
  tableNumber?: string;
  orderType: OrderType;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethodType;
  paymentStatus: PaymentStatus;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  message?: string;
  data: T;
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

/**
 * API response wrapper
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================================
// PROPERTY NAME CONSTANTS
// ============================================================================

/**
 * User property keys - use these to avoid typos
 */
export const USER_KEYS = {
  ID: 'id',
  EMAIL: 'email',
  ROLE: 'role',
  FULL_NAME: 'full_name',
  PHONE: 'phone'
} as const;

/**
 * Restaurant property keys
 */
export const RESTAURANT_KEYS = {
  ID: 'id',
  NAME: 'name',
  SLUG: 'slug',
  STATUS: 'status',
  LOGO_URL: 'logo_url'
} as const;

/**
 * Order property keys
 */
export const ORDER_KEYS = {
  ID: 'id',
  RESTAURANT_ID: 'restaurant_id',
  ORDER_NUMBER: 'order_number',
  PICKUP_NUMBER: 'pickup_number',
  CUSTOMER_NAME: 'customer_name',
  CUSTOMER_PHONE: 'customer_phone',
  TABLE_NUMBER: 'table_number',
  ORDER_TYPE: 'order_type',
  STATUS: 'status',
  PAYMENT_METHOD: 'payment_method',
  PAYMENT_STATUS: 'payment_status',
  TOTAL_AMOUNT: 'total_amount'
} as const;

/**
 * Product property keys
 */
export const PRODUCT_KEYS = {
  ID: 'id',
  RESTAURANT_ID: 'restaurant_id',
  NAME: 'name',
  PRICE: 'price',
  CATEGORY: 'category',
  SOLD_OUT: 'soldOut'
} as const;

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if API response is successful
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success === true;
}

/**
 * Type guard to check if API response is an error
 */
export function isApiError(response: ApiResponse): response is ApiErrorResponse {
  return response.success === false;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract keys from object type that have specific value type
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
