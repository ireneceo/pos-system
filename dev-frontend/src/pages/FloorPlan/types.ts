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

export type TableStatus = 'available' | 'occupied' | 'ready' | 'needs-attention' | 'completed' | 'reserved';

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
  takeawayCharge?: number;
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
  updatedAt?: string | null;   // row version for stale-write guard (item 5)
  notes?: string | null;
  orderType?: string;
  paymentProof?: { image?: string; reference?: string; file_name?: string; uploaded_at?: string } | null;
  // Multi-order support: all active orders for this table
  orders?: TableStatusInfo[];
  // Reservation overlay (P2-6) — set when status==='reserved' (no active order)
  reservationId?: number;
  reservedLabel?: string;   // e.g. "Reserved 7:00 PM" (already timezone-formatted)
  reservedAt?: string;      // ISO of reserved_at (for sorting/detail)
  reservedSoon?: boolean;   // 리드타임 내 임박 예약(강조/주문보류). false=오늘 예정(표시만).
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
  // 2026-06-02: 빈/완료 테이블은 보기 테마(밝게/고대비/어둡게) 토큰을 따라감 — 어둡게에선 바닥보다
  //   한 단계 밝은 어두운 카드로. 점유/준비/주의는 의미색 유지(어두운 바닥 위에서 또렷하게 떠야 함).
  available: { bg: 'var(--pos-table-empty-bg, #F1F4F8)', border: 'var(--pos-table-empty-border, #6B7280)', text: 'var(--pos-table-empty-text, #374151)' },
  occupied: { bg: '#EDE9FE', border: '#7C3AED', text: '#6D28D9' },
  ready: { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' },
  'needs-attention': { bg: '#FEE2E2', border: '#DC2626', text: '#B91C1C' },
  completed: { bg: 'var(--pos-table-empty-bg, #F1F4F8)', border: 'var(--pos-table-empty-border, #4B5563)', text: 'var(--pos-table-empty-text, #1F2937)' },
  // 2026-06-20 (P2-6): 예약됨 — 활성 주문 없는 테이블에 임박 예약이 있을 때. 점유(보라)와
  //   구분되는 연블루. 점유 테이블은 occupied 우선이라 reserved 로 덮이지 않음.
  reserved: { bg: '#DBEAFE', border: '#2563EB', text: '#1D4ED8' }
};

export const STATUS_LABELS: Record<TableStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  ready: 'Ready',
  'needs-attention': 'Attention',
  completed: 'Completed',
  reserved: 'Reserved'
};

// Order-level status colors — unified pastel palette for floor plan
type StatusColor = { bg: string; text: string; border: string };

// 파스텔(기존) — 우측 패널 상태 배지 등에 사용. 변경 금지.
export const ORDER_STATUS_COLORS: Record<string, StatusColor> = {
  outstanding: { bg: '#FFF7ED', text: '#C2410C', border: '#F97316' },
  pending: { bg: '#FEF9C3', text: '#A16207', border: '#CA8A04' },
  preparing: { bg: '#EDE9FE', text: '#6D28D9', border: '#7C3AED' },
  ready: { bg: '#DCFCE7', text: '#15803D', border: '#16A34A' },
  served: { bg: '#D1FAE5', text: '#047857', border: '#059669' },
  completed: { bg: '#F1F4F8', text: '#4B5563', border: '#6B7280' },
  cancelled: { bg: '#FEE2E2', text: '#B91C1C', border: '#DC2626' },
  awaiting_payment: { bg: '#FFF7ED', text: '#C2410C', border: '#F97316' }
};

// 솔리드(꽉 찬) 팔레트 — 테이블맵 테이블 박스용. 액션버튼색 기준:
// 대기/미결제=amber / 조리=purple / 준비=green / 서빙·완료=gray. 솔리드 채움 + 흰 글자.
const STATUS_SOLID: Record<string, StatusColor> = {
  outstanding: { bg: '#F59E0B', text: '#FFFFFF', border: '#D97706' },
  pending: { bg: '#F59E0B', text: '#FFFFFF', border: '#D97706' },
  preparing: { bg: '#635BFF', text: '#FFFFFF', border: '#4F46E5' },
  ready: { bg: '#10B981', text: '#FFFFFF', border: '#059669' },
  served: { bg: '#6B7280', text: '#FFFFFF', border: '#4B5563' },
  completed: { bg: '#6B7280', text: '#FFFFFF', border: '#4B5563' },
  cancelled: { bg: '#EF4444', text: '#FFFFFF', border: '#DC2626' },
  awaiting_payment: { bg: '#F59E0B', text: '#FFFFFF', border: '#D97706' }
};
// 테이블맵 테이블 박스 색 = 솔리드. (우측 패널 배지는 getOrderStatusColors=파스텔 유지.)
export function getTableNodeStatusColors(status: string): StatusColor {
  return STATUS_SOLID[status] || STATUS_SOLID.pending;
}

// 고대비 — 채도 높은 진한 칠 + 흰 글자(글레어 매장에서 확 보이게).
const ORDER_STATUS_COLORS_CONTRAST: Record<string, StatusColor> = {
  outstanding: { bg: '#EA580C', text: '#FFFFFF', border: '#9A3412' },
  pending: { bg: '#CA8A04', text: '#FFFFFF', border: '#854D0E' },
  preparing: { bg: '#7C3AED', text: '#FFFFFF', border: '#4C1D95' },
  ready: { bg: '#16A34A', text: '#FFFFFF', border: '#14532D' },
  served: { bg: '#059669', text: '#FFFFFF', border: '#064E3B' },
  completed: { bg: '#64748B', text: '#FFFFFF', border: '#334155' },
  cancelled: { bg: '#DC2626', text: '#FFFFFF', border: '#7F1D1D' },
  awaiting_payment: { bg: '#EA580C', text: '#FFFFFF', border: '#9A3412' }
};

// 다크 — 어두운 면 위에서 밝고 선명한 칠 + 흰 글자.
const ORDER_STATUS_COLORS_DARK: Record<string, StatusColor> = {
  outstanding: { bg: '#C2410C', text: '#FFFFFF', border: '#FB923C' },
  pending: { bg: '#A16207', text: '#FFFFFF', border: '#FACC15' },
  preparing: { bg: '#6D28D9', text: '#FFFFFF', border: '#A78BFA' },
  ready: { bg: '#15803D', text: '#FFFFFF', border: '#4ADE80' },
  served: { bg: '#047857', text: '#FFFFFF', border: '#34D399' },
  completed: { bg: '#475569', text: '#FFFFFF', border: '#94A3B8' },
  cancelled: { bg: '#B91C1C', text: '#FFFFFF', border: '#F87171' },
  awaiting_payment: { bg: '#C2410C', text: '#FFFFFF', border: '#FB923C' }
};

// 주문상태 색 — Irene 결정(2026-06-05): 어두운/진한 색 안 씀. 모든 테마에서 기존 라이트
// 파스텔 그대로(우측 패널 기준). (CONTRAST/DARK 맵은 미사용 — 보존만.)
export function getOrderStatusColors(status: string): StatusColor {
  return ORDER_STATUS_COLORS[status] || ORDER_STATUS_COLORS.pending;
}

// 주문 리스트(Off-table/Takeout) 상태색 — 라이트는 Live Orders StatusBadge 와 100% 동일,
// 고대비·다크는 진하게. (Floor Plan 테이블 노드와 별개 — 주문리스트는 Live Orders 기준.)
export function getOrderListStatusColors(status: string): StatusColor {
  // Off-table 도 동일 단일 팔레트(테이블맵·아이템과 통일).
  return ORDER_STATUS_COLORS[status] || ORDER_STATUS_COLORS.pending;
}

// 주문 타입색(테이크아웃/픽업/배달) — Off-table 카드 배지 + 아이템리스트 loc 배지 공용.
// 테이블번호(검정)와 구분되게 타입별 색. 라이트=연한, 고대비·다크=진한 솔리드+흰글자.
type TypeColor = { bg: string; text: string; border: string };
const ORDER_TYPE_COLORS: Record<'light' | 'contrast' | 'dark', Record<string, TypeColor>> = {
  light: {
    takeaway: { bg: '#F1F5F9', text: '#475569', border: '#94A3B8' },
    pickup:   { bg: '#EFF6FF', text: '#2563EB', border: '#60A5FA' },
    delivery: { bg: '#F5F3FF', text: '#7C3AED', border: '#A78BFA' },
  },
  contrast: {
    takeaway: { bg: '#475569', text: '#FFFFFF', border: '#334155' },
    pickup:   { bg: '#2563EB', text: '#FFFFFF', border: '#1E40AF' },
    delivery: { bg: '#7C3AED', text: '#FFFFFF', border: '#5B21B6' },
  },
  dark: {
    takeaway: { bg: '#475569', text: '#FFFFFF', border: '#94A3B8' },
    pickup:   { bg: '#1D4ED8', text: '#FFFFFF', border: '#60A5FA' },
    delivery: { bg: '#6D28D9', text: '#FFFFFF', border: '#A78BFA' },
  },
};
export function getOrderTypeColors(type: string): TypeColor {
  // 모든 테마 동일 = 연한 라이트(어두운 변형 미사용).
  const t = (type || '').replace(/[_\s]/g, '').toLowerCase();
  return ORDER_TYPE_COLORS.light[t] || ORDER_TYPE_COLORS.light.takeaway;
}
