// Zone — top-level 영역 (e.g., Indoor Hall / Outdoor Patio). 한 매장에 여러 zone 가능.
export interface FloorZone {
  id: string;                    // stable id (e.g., 'z_main', 'z_indoor')
  name: string;                  // display label
  sort_order: number;
  manager_user_ids?: number[];   // Phase 2 — Zone 별 manager 권한 (현재 미사용)
}

// Table Group — Zone 안의 테이블 묶음 + prefix. 같은 zone 안에 여러 group 가능 (e.g., I, P).
export interface FloorTableGroup {
  id: string;                    // stable id (e.g., 'g_main', 'g_indoor_main')
  zone_id: string;               // FK -> FloorZone.id
  name: string;                  // display label (e.g., "Main Hall")
  prefix: string;                // 1-3 letters (e.g., "I", "P", "VIP") — table label = `${prefix}-${number}`
  sort_order: number;
  // Pool size — total number of slots defined for this group in Settings. The actual placed
  // tables on the floor plan are a subset (each one references its slot via tableNumber 1..slot_count).
  // Slots are not "placed" until the user drops them onto the canvas via Floor Plan Editor.
  // Backward-compat: when missing/undefined, fall back to the count of placed tables (the
  // pool equals what's already on the floor — same as legacy behaviour).
  slot_count?: number;
}

export interface FloorPlanData {
  version: 1 | 2;                // v1 = legacy (zones/groups 미존재), v2 = 신규 구조
  canvasWidth: number;
  canvasHeight: number;
  gridSize: number;
  showGrid: boolean;
  zones?: FloorZone[];           // v2 only — 옛 매장은 undefined
  table_groups?: FloorTableGroup[];  // v2 only
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
  group_id?: string;             // v2 only — FK -> FloorTableGroup.id (v1 데이터에는 없을 수 있음)
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

// Default v2 floor plan — 새 매장 진입 시 사용. 옛 매장은 backend lazy migrate 가 v1→v2 변환.
export const DEFAULT_FLOOR_PLAN: FloorPlanData = {
  version: 2,
  canvasWidth: 1200,
  canvasHeight: 800,
  gridSize: 20,
  showGrid: true,
  zones: [{ id: 'z_main', name: 'Main', sort_order: 1, manager_user_ids: [] }],
  table_groups: [{ id: 'g_main', zone_id: 'z_main', name: 'Tables', prefix: 'T', sort_order: 1 }],
  tables: []
};

// Helper — get default group_id for a new table (first group). 미정의 시 'g_main' fallback.
export function getDefaultGroupId(fp: FloorPlanData | null | undefined): string {
  if (fp && fp.table_groups && fp.table_groups.length > 0) return fp.table_groups[0].id;
  return 'g_main';
}

// Helper — compute table label from group prefix + number.
// Empty/undefined prefix → return the number alone. Never auto-injects "T".
export function computeTableLabel(prefix: string, number: string | number): string {
  const p = String(prefix ?? '').trim();
  const n = String(number).trim();
  return p ? `${p}-${n}` : n;
}

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
  // 2026-05-26: shop-floor pass — bumped text/border one shade darker for legibility
  available: { bg: '#F1F4F8', border: '#6B7280', text: '#374151' },        // was bg #F1F4F8, border #6B7280, text #6B7280
  occupied: { bg: '#EDE9FE', border: '#7C3AED', text: '#6D28D9' },
  ready: { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' },
  'needs-attention': { bg: '#FEE2E2', border: '#DC2626', text: '#B91C1C' },
  completed: { bg: '#F1F4F8', border: '#4B5563', text: '#1F2937' }         // was bg #F1F4F8, border #6B7280, text #4B5563
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
  completed: { bg: '#F1F4F8', text: '#4B5563', border: '#6B7280' },
  cancelled: { bg: '#FEE2E2', text: '#B91C1C', border: '#DC2626' },
  awaiting_payment: { bg: '#FFF7ED', text: '#C2410C', border: '#F97316' }
};
