export interface FloorPlanData {
  version: 1;
  canvasWidth: number;
  canvasHeight: number;
  gridSize: number;
  showGrid: boolean;
  tables: FloorTable[];
}

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
}

export type TableStatus = 'available' | 'occupied' | 'ready' | 'needs-attention';

export interface OrderItemSummary {
  name: string;
  quantity: number;
  price: number;
  options?: string[];
  status?: string;
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
}

export const DEFAULT_FLOOR_PLAN: FloorPlanData = {
  version: 1,
  canvasWidth: 1200,
  canvasHeight: 800,
  gridSize: 20,
  showGrid: true,
  tables: []
};

export const TABLE_SHAPES: { value: FloorTable['shape']; label: string; defaultWidth: number; defaultHeight: number }[] = [
  { value: 'round', label: 'Round', defaultWidth: 70, defaultHeight: 70 },
  { value: 'square', label: 'Square', defaultWidth: 70, defaultHeight: 70 },
  { value: 'rectangle', label: 'Rectangle', defaultWidth: 110, defaultHeight: 70 }
];

export const STATUS_COLORS: Record<TableStatus, { bg: string; border: string; text: string }> = {
  available: { bg: '#ECFDF5', border: '#059669', text: '#059669' },
  occupied: { bg: '#EFF6FF', border: '#635BFF', text: '#635BFF' },
  ready: { bg: '#FEF3C7', border: '#D97706', text: '#D97706' },
  'needs-attention': { bg: '#FEE2E2', border: '#DC2626', text: '#DC2626' }
};

export const STATUS_LABELS: Record<TableStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  ready: 'Ready',
  'needs-attention': 'Attention'
};
