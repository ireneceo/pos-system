// ── 단일 단계 유틸 (2026-06-12, 전 화면 주문 단계 실시간 동기화 통일) ─────────────
// 주문 카드 단계 / 아이템·세트구성품 단계 / 테이블 점유 상태를 "한 곳"에서 계산한다.
// 화면(Live Orders / Floor Plan 캔버스 / 아이템리스트 / Takeout / KDS)은 이 결과를
// 표시 목적별로 필터링만 한다. 설계: docs/ORDER_REALTIME_SYNC_UNIFICATION.md §2-B.
//
// 백엔드 대응:
//  - 단계 모델: routes/orders-crud.js 의 COOK_LVL / cascadeItemsToOrderStatus /
//    deriveOrderStatusFromItems (주문=아이템 min 단계, 양방향 cascade)
//  - 테이블 점유: routes/restaurants-crud.js GET /:id/table-status 의 buildOrderInfo 와
//    1:1 동일 파생 (table-status 엔드포인트 의존 제거용 클라이언트 미러)

import { TableStatusInfo } from '../pages/FloorPlan/types';

export type CookStage = 'pending' | 'preparing' | 'ready' | 'served' | 'completed';

// 백엔드 COOK_LVL 과 동일. 미지정 status = pending 취급.
export const COOK_LVL: Record<string, number> = {
  pending: 1, preparing: 2, ready: 3, served: 4, completed: 5,
};

export const cookLvl = (status?: string | null): number =>
  COOK_LVL[status || ''] || COOK_LVL.pending;

/** 주문 카드 단계 — 단일 단계 모델에서 order.status 가 서버 권위값(아이템 min 과 일관). */
export const deriveOrderStage = (order: any): string => order?.status || 'pending';

/** 아이템 단계 — 미지정은 pending. */
export const deriveItemStage = (item: any): CookStage =>
  (item?.status as CookStage) || 'pending';

/**
 * 세트 구성품 단계 — set_components(정규)가 status 를 갖지 않던 시기의 주문은
 * 같은 index 의 set_items(레거시 쓰기 경로) status 로 폴백.
 * (KDS processRawOrderItems 의 2026-06-11 폴백과 동일 규칙.)
 */
export const deriveSetComponentStage = (
  comp: any, idx: number, legacySetItems?: any[] | null
): CookStage =>
  (comp?.status as CookStage)
  ?? (legacySetItems?.[idx]?.status as CookStage)
  ?? 'pending';

/** off-table(테이블에 안 매인) 주문 타입 정규화 — "take away"/"take_away" 등 변형 흡수. */
export const normalizeOrderType = (order: any): string =>
  (order?.order_type || order?.orderType || '').toString().replace(/[_\s]/g, '').toLowerCase();

const OFF_TABLE_TYPES = new Set(['takeaway', 'pickup', 'delivery']);

/** Takeout 뷰 소스 — off-table 타입 + cancelled 제외 (기존 FloorPlan fetchTakeawayOrders 필터와 동일). */
export const filterOffTableOrders = (orders: any[]): any[] =>
  (orders || []).filter(o => OFF_TABLE_TYPES.has(normalizeOrderType(o)) && (o?.status || '') !== 'cancelled');

/** 테이블 점유 상태 분류 — 백엔드 buildOrderInfo 와 동일 우선순위. */
export const deriveTableOccupancy = (order: any): 'occupied' | 'needs-attention' | 'ready' | 'completed' => {
  if (order.payment_status === 'failed' || order.status === 'outstanding') return 'needs-attention';
  if (order.status === 'ready' || order.status === 'served') return 'ready';
  if (order.status === 'completed') return 'completed';
  return 'occupied';
};

/** 백엔드 table-status buildOrderInfo 의 1:1 클라이언트 미러 (camelCase 필드 계약 유지). */
export const buildTableOrderInfo = (order: any, now: number = Date.now()): TableStatusInfo => {
  let orderItems: any[] = [];
  try {
    orderItems = typeof order.order_items === 'string'
      ? JSON.parse(order.order_items)
      : (order.order_items || []);
  } catch { orderItems = []; }

  const createdAt = order.createdAt || order.created_at || order.order_date;
  const elapsed = createdAt ? Math.round((now - new Date(createdAt).getTime()) / 60000) : 0;

  return {
    tableNumber: order.table_number,
    floorPlanTableId: order.floor_plan_table_id || null,
    status: deriveTableOccupancy(order),
    totalAmount: parseFloat(order.total_amount || 0),
    elapsedMinutes: elapsed,
    orderId: order.id,
    orderNumber: order.order_number,
    customerName: order.customer_name,
    customerId: order.customer_id,
    paymentStatus: order.payment_status,
    guestCount: order.guest_count,
    orderItems,
    subtotal: parseFloat(order.subtotal || 0),
    tax: parseFloat(order.tax || 0),
    serviceCharge: parseFloat(order.service_charge || 0),
    takeawayCharge: parseFloat(order.takeaway_charge || 0),
    discount: parseFloat(order.discount || 0) + parseFloat(order.coupon_discount || 0)
      + parseFloat(order.discount_policy_amount || 0) + parseFloat(order.point_discount || 0),
    cashierName: order.cashier_name,
    orderStatus: order.status,
    couponCode: order.coupon_code || null,
    couponDiscount: parseFloat(order.coupon_discount || 0),
    discountPolicyName: order.discount_policy_name || null,
    discountPolicyAmount: parseFloat(order.discount_policy_amount || 0),
    pointDiscount: parseFloat(order.point_discount || 0),
    pointsUsed: parseInt(order.points_used || 0, 10),
    paymentMethod: order.payment_method || null,
    cardType: order.card_type || null,
    orderSource: order.source || 'pos',
    customerPhone: order.customer_phone || null,
    serviceChargeRate: parseFloat(order.service_charge_rate || 0),
    taxRate: parseFloat(order.tax_rate || 0),
    orderCreatedAt: createdAt,
    notes: null,
    orderType: order.order_type || 'dine_in',
    paymentProof: order.payment_proof || null,
  } as TableStatusInfo;
};

export interface TableStatusMaps {
  data: Record<string, TableStatusInfo>;
  history: Record<string, TableStatusInfo[]>;
}

/**
 * 오늘 주문 배열 → Floor Plan 점유맵(data) + per-table 이력맵(history).
 * 백엔드 GET /:id/table-status 의 집계와 1:1 동일:
 *  - 대상: table_number 있는 dine_in/takeaway, cancelled·삭제 제외 (오늘 범위는 소스가 보장)
 *  - 점유(data): table_cleared 제외 + (clearTableOnPayment ON 이면 completed 도 제외)
 *  - 이력(history): cleared/completed 포함 오늘 전체 — 빈 테이블 눌러도 오늘 주문 조회 가능
 *  - 키: floor_plan_table_id 우선, 폴백 table_number (다중 zone 동일 번호 격리)
 */
export const deriveTableStatusMaps = (
  orders: any[],
  opts: { clearTableOnPayment?: boolean; now?: number } = {}
): TableStatusMaps => {
  const now = opts.now ?? Date.now();
  const todayTabled = (orders || [])
    .filter(o => o
      && o.table_number != null && o.table_number !== ''
      && ['dine_in', 'takeaway'].includes((o.order_type || 'dine_in'))
      && o.status !== 'cancelled'
      && !o.is_deleted)
    .slice()
    .sort((a, b) => new Date(b.createdAt || b.order_date || 0).getTime()
      - new Date(a.createdAt || a.order_date || 0).getTime()); // createdAt DESC (백엔드와 동일)

  const data: Record<string, TableStatusInfo> = {};
  const history: Record<string, TableStatusInfo[]> = {};

  for (const order of todayTabled) {
    const key = order.floor_plan_table_id || order.table_number;
    if (!key) continue;
    const info = buildTableOrderInfo(order, now);

    // 이력: cleared/completed 포함 전체
    if (!history[key]) history[key] = [];
    history[key].push(info);

    // 점유: cleared 제외 + clearTableOnPayment 시 completed 제외
    if (order.table_cleared) continue;
    if (opts.clearTableOnPayment && order.status === 'completed') continue;
    if (!data[key]) {
      data[key] = { ...info, orderCount: 1, orders: [info] };
    } else {
      data[key].orders!.push(info);
      data[key].orderCount = data[key].orders!.length;
    }
  }

  return { data, history };
};

/**
 * 오늘 예약 배열 → Floor Plan '예약됨' 점유맵 (P2-6).
 *  - 대상: confirmed/arrived 상태 + floor_plan_table_id 또는 table_number 배정된 것
 *  - 표시 창: now ∈ [reserved_at - leadMinutes, reserved_at + turn_minutes]
 *    (임박 리드타임 — 예약시간 전부터 turn 종료까지만 '예약됨'으로 띄움)
 *  - 키: floor_plan_table_id 우선, 폴백 table_number (점유맵과 동일 규칙)
 *  - 같은 테이블에 창 겹친 예약이 여럿이면 가장 임박한(reserved_at 빠른) 것
 *  주의: 점유(활성 주문) 우선이므로 호출부에서 점유맵에 이미 있는 키는 제외해 병합한다.
 */
export const deriveReservedTableMap = (
  reservations: any[],
  opts: { leadMinutes?: number; now?: number; formatTime?: (iso: string) => string; suppressArrivedKeys?: Set<string> } = {}
): Record<string, TableStatusInfo> => {
  const now = opts.now ?? Date.now();
  const leadMs = (opts.leadMinutes ?? 120) * 60000;
  const map: Record<string, TableStatusInfo> = {};

  for (const r of (reservations || [])) {
    if (!r || !['confirmed', 'arrived'].includes(r.status)) continue;
    const key = r.floor_plan_table_id || r.table_number;
    if (!key) continue;
    // 유령 배지 방지(P1): 체크인(arrived)한 예약인데 그 테이블이 오늘 이미 주문을 받았으면
    // (주문 생성/완료/비움) 배지 숨김 — 손님이 이미 앉아 주문했거나 떠난 테이블. confirmed(미도착
    // 미래 예약)는 영향 없음(점심 후 저녁예약도 정상 표시).
    if (r.status === 'arrived' && opts.suppressArrivedKeys && opts.suppressArrivedKeys.has(key)) continue;
    const reservedAtMs = new Date(r.reserved_at).getTime();
    if (!reservedAtMs || Number.isNaN(reservedAtMs)) continue;
    const turnMs = (Number(r.turn_minutes) || 90) * 60000;
    if (now < reservedAtMs - leadMs || now > reservedAtMs + turnMs) continue;

    // 같은 키에 이미 더 임박한 예약이 있으면 유지
    const existing = map[key];
    if (existing && existing.reservedAt && new Date(existing.reservedAt).getTime() <= reservedAtMs) continue;

    const timeLabel = opts.formatTime ? opts.formatTime(r.reserved_at) : '';
    map[key] = {
      tableNumber: r.table_number || '',
      status: 'reserved',
      orderCount: 0,
      totalAmount: 0,
      elapsedMinutes: 0,
      guestCount: r.party_size ?? null,
      customerName: r.guest_name || null,
      reservationId: r.id,
      reservedAt: r.reserved_at,
      reservedLabel: timeLabel ? `Reserved ${timeLabel}` : 'Reserved'
    } as TableStatusInfo;
  }

  return map;
};
