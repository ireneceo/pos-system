/**
 * offlineOps — 오프라인 모드 4단계: 오프라인 중 발생한 주문 작업을 LocalStore op 로그에 기록한다.
 *
 * 설계: docs/OFFLINE_MODE_DESIGN.md §1-1(F3~F7)·§3·§4.
 * - 이 레이어는 "기록"만 한다. 순서 재생(서버 전송)은 5단계 SyncEngine, 로컬 인쇄는 6단계.
 * - 모든 작업은 offlineStore 위에서 일어난다(원자적 seq·opId 멱등). 화면은 listOfflineOrders 로 반영.
 * - 대상 = create / add_items / update_items / cancel_item / cancel_order / move_table / set_stage / pay.
 *
 * 인쇄 무관 — billPrint 무접촉. 호출부(OrderContext 등)에서 오프라인일 때만 부른다.
 */
import {
  createLocalOrderWithOp, appendOp, getAllOrders, patchOrder,
  LocalOrder, LocalItem, OfflineOp, OpType, LocalOrderStatus,
} from './offlineStore';
import { isIDBAvailable } from './offlineDb';

// 서버 order_items payload → LocalItem (화면·로컬인쇄 표시에 필요한 최소 필드).
function mapItems(orderItems: any): LocalItem[] {
  if (!Array.isArray(orderItems)) return [];
  return orderItems.map((it) => ({
    product_id: it.product_id ?? it.menuItem?.id ?? it.id,
    name: it.name ?? it.menuItem?.name,
    quantity: Number(it.quantity) || 1,
    price: it.price ?? it.menuItem?.price,
    options: it.options,
    set_components: it.set_components,
    special_instructions: it.special_instructions,
  }));
}

/** localOrderId 해석: localId 우선, 없으면 serverId 로 기존 로컬 주문 매칭. */
async function resolveLocalOrderId(ref: { localId?: string; serverId?: number }): Promise<string | null> {
  if (ref.localId) return ref.localId;
  if (ref.serverId != null) {
    try {
      const o = (await getAllOrders()).find((x) => x.serverId === ref.serverId);
      if (o) return o.localId;
    } catch { /* ignore */ }
  }
  return null;
}

export interface OfflineCreateResult { order: LocalOrder; op: OfflineOp; }

/**
 * 오프라인 주문 생성 기록. 서버 create payload 를 그대로 op 로그에(재생 시 동일 POST).
 * 같은 idempotency_key 가 이미 있으면(더블탭·재호출) 중복 생성하지 않고 기존 주문 반환.
 */
export async function recordOfflineCreate(
  payload: any,
  opts?: { authToken?: string | null }
): Promise<OfflineCreateResult | null> {
  if (!isIDBAvailable() || !payload) return null;
  try {
    const key = payload.idempotency_key;
    if (key) {
      const existing = (await getAllOrders()).find((o) => o.idempotencyKey === key);
      if (existing) {
        // 이미 기록됨 — 중복 op 생성 금지. 기존 create op 를 찾아 반환(없으면 합성 표시용).
        return { order: existing, op: { opId: '', type: 'create', localOrderId: existing.localId, payload, seq: 0, at: existing.createdAt, synced: false } };
      }
    }
    const res = await createLocalOrderWithOp({
      idempotencyKey: key,
      raw: payload,
      payload,
      items: mapItems(payload.order_items),
      total: payload.total ?? payload.total_amount,
      orderType: payload.order_type,
      tableNumber: payload.table_number ?? payload.tableNumber ?? null,
      restaurantId: payload.restaurant_id,
      status: (payload.status as LocalOrderStatus) || 'pending',
    });
    return res;
  } catch {
    return null;
  }
}

/**
 * 오프라인 후속 작업(추가/취소/이동/단계/결제) 기록. 대상 주문을 localId 또는 serverId 로 참조.
 * 로컬 주문이면 상태/품목/결제도 즉시 반영(화면 정합), 서버 주문(온라인 생성분을 오프라인 수정)이면 op 만 기록.
 */
export async function recordOfflineOp(
  type: Exclude<OpType, 'create'>,
  ref: { localId?: string; serverId?: number },
  payload: any
): Promise<OfflineOp | null> {
  if (!isIDBAvailable()) return null;
  try {
    const localOrderId = await resolveLocalOrderId(ref);
    // 서버 주문 참조면 payload 에 serverId 보존(재생 시 엔드포인트가 id 필요).
    const opPayload = ref.serverId != null ? { ...payload, _serverId: ref.serverId } : payload;
    const op = await appendOp(type, localOrderId || `srv-${ref.serverId ?? 'unknown'}`, opPayload);

    // 로컬 주문이면 화면 정합을 위해 즉시 상태 반영.
    if (localOrderId) {
      if (type === 'cancel_order') {
        await patchOrder(localOrderId, { status: 'cancelled' });
      } else if (type === 'set_stage' && payload && payload.status) {
        await patchOrder(localOrderId, { status: payload.status as LocalOrderStatus });
      } else if (type === 'move_table' && payload && (payload.table_number != null || payload.tableNumber != null)) {
        await patchOrder(localOrderId, { tableNumber: payload.table_number ?? payload.tableNumber });
      } else if (type === 'pay') {
        const cur = (await getAllOrders()).find((o) => o.localId === localOrderId);
        const payments = cur ? [...cur.payments, { method: payload.method || payload.payment_method || 'cash', amount: Number(payload.amount) || 0, info: payload.info }] : undefined;
        if (payments) await patchOrder(localOrderId, { payments });
      } else if (type === 'add_items') {
        // Canonical key is `items` (§15-1 defect 2 — backend /add-items destructures `items`).
        // Accept legacy `order_items` for safety.
        const added = Array.isArray(payload?.items) ? payload.items : (Array.isArray(payload?.order_items) ? payload.order_items : null);
        if (added) {
          const cur = (await getAllOrders()).find((o) => o.localId === localOrderId);
          if (cur) await patchOrder(localOrderId, { items: [...cur.items, ...mapItems(added)] });
        }
      }
    }
    // Optimistic overlay must reflect the new op immediately (§15-4 offlineOps step 1).
    try { window.dispatchEvent(new CustomEvent('offline-ops-changed')); } catch { /* ignore */ }
    return op;
  } catch {
    return null;
  }
}

/**
 * 오프라인 6단계: 로컬(클라이언트) 주방 티켓 인쇄 — 서버 왕복 0.
 * billPrint.printKitchenTicketViaRawBT 재사용(인쇄 방식/라우팅 무변경). 스테이션 라우팅·프린터 주소는
 * localStorage 캐시(kitchenStationMenuMap·printerSettings)로 동작하므로 오프라인에서도 OK.
 * 매장정보(헤더/타임존)는 StoreContext 가 캐시한 'pos_store_info_cache' 사용.
 * @returns true=인쇄 성공(→ printedLocally). false=프린터 없음/실패(→ 동기화 후 서버가 정상 인쇄).
 */
export async function printOfflineKitchenTicket(order: LocalOrder): Promise<boolean> {
  try {
    const items = (order.items || []).map((it: any) => ({
      name: it.name,
      quantity: it.quantity,
      options: Array.isArray(it.options) ? it.options : [],
      special_instructions: it.special_instructions || '',
      is_set_menu: !!it.is_set_menu,
      set_items: it.set_items || it.set_components || [],
      kitchen_station_id: it.kitchen_station_id ?? null,
    }));
    if (items.length === 0) return false;
    let storeInfo: any = {};
    try { storeInfo = JSON.parse(localStorage.getItem('pos_store_info_cache') || '{}'); } catch { storeInfo = {}; }
    const orderData = {
      orderNumber: order.provisionalNumber,
      date: new Date(order.createdAt),
      tableNumber: order.tableNumber,
      customerName: 'Walk-in Customer',
      orderSource: 'pos',
      items,
    };
    const mod = await import('./billPrint');
    const r = await mod.printKitchenTicketViaRawBT(orderData as any, storeInfo);
    return r !== false;
  } catch {
    return false;
  }
}

// §15-4 offlineOps: 서버 주문(정전 중 편집)용 로컬 주방인쇄 헬퍼 2개.
// 모두 billPrint.printKitchenTicketViaRawBT 재사용(billPrint 🔒 무수정 — printOfflineKitchenTicket 동일 패턴).
// 성공 시 true → 호출부가 op 에 printed_offline=true 를 실어 재생이 재인쇄 안 함(I3). 실패 시 false → 플래그
// 미첨부 → 복구 후 폴러가 정확히 1장 인쇄.

function _storeInfoCache(): any {
  try { return JSON.parse(localStorage.getItem('pos_store_info_cache') || '{}'); } catch { return {}; }
}
function _mapKitchenItems(list: any[]): any[] {
  return (list || []).map((it: any) => ({
    name: it.name,
    quantity: it.quantity,
    options: Array.isArray(it.options) ? it.options : [],
    special_instructions: it.special_instructions || '',
    is_set_menu: !!it.is_set_menu,
    set_items: it.set_items || it.set_components || [],
    kitchen_station_id: it.kitchen_station_id ?? null,
  }));
}

/** 라운드 티켓(오프라인 서버주문 아이템 추가) — 추가분만 로컬 주방인쇄. */
export async function printOfflineAddedItemsTicket(serverOrder: any, addedItems: any[]): Promise<boolean> {
  try {
    const items = _mapKitchenItems(addedItems);
    if (items.length === 0) return false;
    const orderData = {
      orderNumber: serverOrder.order_number || serverOrder.orderNumber,
      date: new Date(),
      tableNumber: serverOrder.table_number ?? serverOrder.tableNumber,
      customerName: 'Walk-in Customer',
      orderSource: 'pos',
      items,
    };
    const mod = await import('./billPrint');
    const r = await mod.printKitchenTicketViaRawBT(orderData as any, _storeInfoCache());
    return r !== false;
  } catch { return false; }
}

/** 취소/이동 안내표(오프라인 서버주문 취소·테이블이동) — noticeHeader = 백엔드 pending_reprint.notice 포맷. */
export async function printOfflineNoticeTicket(serverOrder: any, notice: any, printedItems: any[]): Promise<boolean> {
  try {
    // 취소/이동 안내표는 이미 주방에 나간(printed) 품목 기준(전부 served/completed 면 안 나감 — 백엔드 규칙과 동일).
    const _notServed = (it: any) => it && it.status !== 'served' && it.status !== 'completed';
    const src = (printedItems || []).filter((it: any) => it && (it.printed_at || it.printed) && _notServed(it));
    if (src.length === 0) return false;
    const orderData = {
      orderNumber: serverOrder.order_number || serverOrder.orderNumber,
      date: new Date(),
      tableNumber: serverOrder.table_number ?? serverOrder.tableNumber,
      customerName: 'Walk-in Customer',
      orderSource: 'pos',
      items: _mapKitchenItems(src),
      noticeHeader: notice, // { title:'** ORDER CANCELLED **', lines } | { title:'** TABLE CHANGED **', fromTable, toTable, lines }
    };
    const mod = await import('./billPrint');
    const r = await mod.printKitchenTicketViaRawBT(orderData as any, _storeInfoCache());
    return r !== false;
  } catch { return false; }
}

/** 화면 반영용 — 아직 서버 동기화 안 된 오프라인 주문 목록(최신순). */
export async function listOfflineOrders(): Promise<LocalOrder[]> {
  if (!isIDBAvailable()) return [];
  try {
    return (await getAllOrders()).filter((o) => o.syncState !== 'synced').sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

// ── dev 테스트 seam ── (offlineStore 와 동일 게이트 — 운영 apex/www 미노출)
try {
  if (typeof window !== 'undefined') {
    const h = window.location && window.location.hostname ? window.location.hostname : '';
    const isDevHost = /^(dev\.|localhost$|127\.|87\.106\.|192\.168\.|10\.)/.test(h);
    if (isDevHost) {
      (window as any).__offlineOps = { recordOfflineCreate, recordOfflineOp, listOfflineOrders, printOfflineKitchenTicket };
    }
  }
} catch { /* ignore */ }
