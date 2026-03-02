export interface FloorPlanData {
  version: 1;
  canvasWidth: number;
  canvasHeight: number;
  gridSize: number;
  showGrid: boolean;
  tables: FloorTable[];
}

export type FixtureType = 'table' | 'kitchen' | 'counter' | 'entrance';

export interface FloorTable {
  id: string;
  tableNumber: string;
  label: string;
  shape: 'round' | 'square' | 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  seats: number;
  tableType?: FixtureType;
}

export type TableStatus = 'available' | 'occupied' | 'ready' | 'needs-attention' | 'completed';

export interface OrderItemSummary {
  name: string;
  quantity: number;
  price: number;
  options?: string[];
  status?: string;
  id?: string;
  order_group?: number;
  added_at?: string;
  is_set_menu?: boolean;
  set_items?: any[];
}

export interface TableStatusInfo {
  tableNumber: string;
  status: TableStatus;
  orderCount: number;
  totalAmount: number;
  elapsedMinutes: number;
  // Extended fields
  orderId?: number;
  orderNumber?: string;
  customerName?: string;
  customerId?: number | null;
  paymentStatus?: string;
  guestCount?: number | null;
  orderItems?: OrderItemSummary[];
  subtotal?: number;
  tax?: number;
  serviceCharge?: number;
  discount?: number;
  cashierName?: string | null;
  orderStatus?: string;
  // View mode fields
  couponCode?: string | null;
  couponDiscount?: number;
  discountPolicyName?: string | null;
  discountPolicyAmount?: number;
  pointDiscount?: number;
  pointsUsed?: number;
  paymentMethod?: string | null;
  orderSource?: string;
  customerPhone?: string | null;
  serviceChargeRate?: number;
  taxRate?: number;
  orderCreatedAt?: string;
  notes?: string | null;
  orderType?: string;
}

export const DEFAULT_FLOOR_PLAN: FloorPlanData = {
  version: 1,
  canvasWidth: 1200,
  canvasHeight: 800,
  gridSize: 20,
  showGrid: true,
  tables: []
};

export const TABLE_SHAPES: { value: FloorTable['shape']; label: string; defaultWidth: number; defaultHeight: number; variant?: string }[] = [
  { value: 'round', label: 'Round', defaultWidth: 70, defaultHeight: 70 },
  { value: 'square', label: 'Square', defaultWidth: 70, defaultHeight: 70 },
  { value: 'rectangle', label: 'Rect (H)', defaultWidth: 110, defaultHeight: 70 },
  { value: 'rectangle', label: 'Rect (V)', defaultWidth: 70, defaultHeight: 110, variant: 'vertical' }
];

export const FIXTURE_PRESETS: { type: FixtureType; label: string; defaultWidth: number; defaultHeight: number; icon: string; variant?: string; textOnly?: boolean }[] = [
  { type: 'counter', label: 'Counter (H)', defaultWidth: 120, defaultHeight: 40, icon: 'C', variant: 'horizontal' },
  { type: 'counter', label: 'Counter (V)', defaultWidth: 40, defaultHeight: 120, icon: 'C', variant: 'vertical' },
  { type: 'kitchen', label: 'Kitchen', defaultWidth: 80, defaultHeight: 30, icon: 'K', textOnly: true },
  { type: 'entrance', label: 'Entrance', defaultWidth: 80, defaultHeight: 30, icon: 'E', textOnly: true }
];

export const STATUS_COLORS: Record<TableStatus, { bg: string; border: string; text: string }> = {
  available: { bg: '#F3F4F6', border: '#D1D5DB', text: '#9CA3AF' },
  occupied: { bg: '#EFF6FF', border: '#635BFF', text: '#635BFF' },
  ready: { bg: '#FEF3C7', border: '#D97706', text: '#D97706' },
  'needs-attention': { bg: '#FEE2E2', border: '#DC2626', text: '#DC2626' },
  completed: { bg: '#E5E7EB', border: '#9CA3AF', text: '#374151' }
};

export const STATUS_LABELS: Record<TableStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  ready: 'Ready',
  'needs-attention': 'Attention',
  completed: 'Completed'
};

// Order-level status colors — matches LiveOrders exactly
export const ORDER_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  outstanding: { bg: '#FEF3C7', text: '#F59E0B', border: '#F59E0B' },
  pending: { bg: '#FEF3C7', text: '#92400E', border: '#D97706' },
  preparing: { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' },
  ready: { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
  served: { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
  completed: { bg: '#E5E7EB', text: '#374151', border: '#9CA3AF' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B', border: '#DC2626' },
  awaiting_payment: { bg: '#FEF3C7', text: '#92400E', border: '#D97706' }
};
