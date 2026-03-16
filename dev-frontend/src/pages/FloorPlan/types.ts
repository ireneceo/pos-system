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
  cardType?: string | null;
  orderSource?: string;
  customerPhone?: string | null;
  serviceChargeRate?: number;
  taxRate?: number;
  orderCreatedAt?: string;
  notes?: string | null;
  orderType?: string;
  paymentProof?: { image?: string; reference?: string; file_name?: string; uploaded_at?: string } | null;
  // Multi-order support: all active orders for this table
  orders?: TableStatusInfo[];
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
  occupied: { bg: '#EDE9FE', border: '#7C3AED', text: '#6D28D9' },
  ready: { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' },
  'needs-attention': { bg: '#FEE2E2', border: '#DC2626', text: '#B91C1C' },
  completed: { bg: '#F3F4F6', border: '#9CA3AF', text: '#6B7280' }
};

export const STATUS_LABELS: Record<TableStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  ready: 'Ready',
  'needs-attention': 'Attention',
  completed: 'Completed'
};

// Order-level status colors — unified pastel palette for floor plan
export const ORDER_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  outstanding: { bg: '#FFF7ED', text: '#C2410C', border: '#F97316' },
  pending: { bg: '#FEF9C3', text: '#A16207', border: '#CA8A04' },
  preparing: { bg: '#EDE9FE', text: '#6D28D9', border: '#7C3AED' },
  ready: { bg: '#DCFCE7', text: '#15803D', border: '#16A34A' },
  served: { bg: '#D1FAE5', text: '#047857', border: '#059669' },
  completed: { bg: '#F3F4F6', text: '#6B7280', border: '#9CA3AF' },
  cancelled: { bg: '#FEE2E2', text: '#B91C1C', border: '#DC2626' },
  awaiting_payment: { bg: '#FFF7ED', text: '#C2410C', border: '#F97316' }
};
