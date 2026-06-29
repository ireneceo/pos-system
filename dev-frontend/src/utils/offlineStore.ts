/**
 * offlineStore — 오프라인 모드 3단계: LocalStore(주문) + append-only operation 로그.
 *
 * 설계: docs/OFFLINE_MODE_DESIGN.md §3·§4.
 * - 오프라인 동안 POS1 이 진실의 소스. 주문은 `offline_orders`, 모든 변경은 `offline_ops` 에 순서대로 쌓인다.
 * - **왜 op 로그인가**: 주문 최종상태만 보내면 "추가→취소→재추가" 같은 중간 주방티켓·취소표·감사이력이 사라진다.
 *   op 로그를 seq 순서대로 재생(5단계 SyncEngine)해야 온라인과 동일해진다.
 * - **무손실·무중복은 구조로 보장**: opId 멱등 + 단조증가 seq + 트랜잭션 원자성.
 *
 * 이 단계(3)는 데이터 계층만 만든다. 화면 연결(4)·동기화 재생(5)·로컬인쇄(6)는 이 위에 얹는다.
 * 기존 `offlineOrderQueue`(localStorage) 흡수는 absorbLegacyQueue() 로 제공(5단계 SyncEngine init 이 호출).
 *
 * 인쇄 무관 — billPrint 무접촉.
 */
import {
  STORE_ORDERS, STORE_OPS, STORE_META,
  openDb, reqToPromise, txDone, idbGet, idbPut, idbGetAll, genId, isIDBAvailable, deleteOfflineDb,
} from './offlineDb';

// ── 타입 ──────────────────────────────────────────────────────────────────
export interface LocalItem {
  product_id?: number | string;
  name?: string;
  quantity: number;
  price?: number;
  options?: any;
  set_components?: any;
  special_instructions?: string;
  kitchen_station_id?: number | null;
  [k: string]: any;
}

export interface LocalPayment {
  method: string;            // cash / card / ewallet / counter ...
  amount: number;
  info?: any;                // 카드 끝자리·승인메모 등(기록용)
}

export type LocalOrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type SyncState = 'local' | 'syncing' | 'synced' | 'failed';

export interface LocalOrder {
  localId: string;             // 오프라인 식별 uuid
  idempotencyKey: string;      // 서버 create 멱등키
  provisionalNumber: string;   // 화면/영수증용 임시번호 "OFF-..."
  serverId?: number;           // 동기화 후 매핑
  serverNumber?: string;       // 동기화 후 서버 정식 order_number
  items: LocalItem[];
  payments: LocalPayment[];
  status: LocalOrderStatus;
  orderType?: string;
  tableNumber?: string | number | null;
  restaurantId?: number;
  total?: number;
  raw?: any;                   // 원본 서버 페이로드(create 시 그대로 재생용)
  createdAt: number;
  updatedAt: number;
  syncState: SyncState;
  printedLocally: boolean;     // 로컬 인쇄 완료 → 동기화 시 printed_offline 마커로 폴러 중복인쇄 방지
}

export type OpType =
  | 'create' | 'add_items' | 'update_items' | 'cancel_item'
  | 'cancel_order' | 'move_table' | 'set_stage' | 'pay';

export interface OfflineOp {
  opId: string;                // op 멱등 uuid
  type: OpType;
  localOrderId: string;
  payload: any;                // 해당 작업의 서버 페이로드
  seq: number;                 // 발생 순서(매장 단조증가)
  at: number;
  synced: boolean;
  syncError?: string;
}

// 저장형(IndexedDB) — synced 는 키 인덱싱 위해 0|1 숫자. 외부 노출은 boolean 으로 변환.
interface OpStored extends Omit<OfflineOp, 'synced'> { synced: 0 | 1; }

const SEQ_KEY = 'seq';
const LEGACY_FLAG = 'legacy_absorbed';

function toOp(s: OpStored): OfflineOp {
  return { ...s, synced: s.synced === 1 };
}

function provisionalFrom(seq: number): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `OFF-${ymd}-${String(seq).padStart(3, '0')}`;
}

// ── 주문 CRUD ──────────────────────────────────────────────────────────────
export async function putOrder(order: LocalOrder): Promise<LocalOrder> {
  order.updatedAt = Date.now();
  await idbPut(STORE_ORDERS, order);
  return order;
}

export async function getOrder(localId: string): Promise<LocalOrder | undefined> {
  return idbGet<LocalOrder>(STORE_ORDERS, localId);
}

export async function getAllOrders(): Promise<LocalOrder[]> {
  const all = await idbGetAll<LocalOrder>(STORE_ORDERS);
  return all.sort((a, b) => a.createdAt - b.createdAt);
}

/** 부분 갱신. 없는 주문이면 null. */
export async function patchOrder(localId: string, patch: Partial<LocalOrder>): Promise<LocalOrder | null> {
  const cur = await getOrder(localId);
  if (!cur) return null;
  const next = { ...cur, ...patch, localId: cur.localId, updatedAt: Date.now() };
  await idbPut(STORE_ORDERS, next);
  return next;
}

/** 동기화 완료 매핑(서버 id/번호 확정). */
export async function markOrderSynced(localId: string, serverId: number, serverNumber?: string): Promise<void> {
  await patchOrder(localId, { serverId, serverNumber, syncState: 'synced' });
}

export async function setPrintedLocally(localId: string, v: boolean): Promise<void> {
  await patchOrder(localId, { printedLocally: v });
}

// ── op 로그 ────────────────────────────────────────────────────────────────
/**
 * op 추가 — seq 발급 + 영속을 단일 트랜잭션으로(원자성). seq 는 META 카운터에서 단조증가.
 * 같은 트랜잭션 안에서 await 하는 건 IDBRequest 뿐 → 트랜잭션이 비활성화되지 않는다.
 */
export async function appendOp(type: OpType, localOrderId: string, payload: any): Promise<OfflineOp> {
  const db = await openDb();
  const tx = db.transaction([STORE_META, STORE_OPS], 'readwrite');
  const meta = tx.objectStore(STORE_META);
  const ops = tx.objectStore(STORE_OPS);
  const cur = await reqToPromise<{ key: string; value: number } | undefined>(meta.get(SEQ_KEY) as any);
  const seq = ((cur && cur.value) || 0) + 1;
  meta.put({ key: SEQ_KEY, value: seq });
  const stored: OpStored = { opId: genId(), type, localOrderId, payload, seq, at: Date.now(), synced: 0 };
  ops.put(stored);
  await txDone(tx);
  return toOp(stored);
}

/** 미동기화 op 를 seq 오름차순(발생 순서)으로. SyncEngine 재생 입력. */
export async function getUnsyncedOps(): Promise<OfflineOp[]> {
  const db = await openDb();
  const tx = db.transaction(STORE_OPS, 'readonly');
  const idx = tx.objectStore(STORE_OPS).index('synced');
  const rows = await reqToPromise<OpStored[]>(idx.getAll(IDBKeyRange.only(0)) as any);
  return rows.sort((a, b) => a.seq - b.seq).map(toOp);
}

export async function getAllOps(): Promise<OfflineOp[]> {
  const rows = await idbGetAll<OpStored>(STORE_OPS);
  return rows.sort((a, b) => a.seq - b.seq).map(toOp);
}

export async function markOpSynced(opId: string): Promise<void> {
  const s = await idbGet<OpStored>(STORE_OPS, opId);
  if (!s) return;
  s.synced = 1;
  s.syncError = undefined;
  await idbPut(STORE_OPS, s);
}

export async function markOpFailed(opId: string, err: string): Promise<void> {
  const s = await idbGet<OpStored>(STORE_OPS, opId);
  if (!s) return;
  s.syncError = err;
  await idbPut(STORE_OPS, s);
}

// ── 합성: 주문 생성 + create op 원자적 ───────────────────────────────────────
export interface CreateLocalOrderInput {
  localId?: string;
  idempotencyKey?: string;
  provisionalNumber?: string;
  items?: LocalItem[];
  payments?: LocalPayment[];
  status?: LocalOrderStatus;
  orderType?: string;
  tableNumber?: string | number | null;
  restaurantId?: number;
  total?: number;
  raw?: any;          // 서버 create 페이로드(재생 시 그대로 POST)
  payload?: any;      // create op payload(미지정 시 raw 사용)
}

export async function createLocalOrderWithOp(
  input: CreateLocalOrderInput
): Promise<{ order: LocalOrder; op: OfflineOp }> {
  const localId = input.localId || genId();
  const db = await openDb();
  const tx = db.transaction([STORE_ORDERS, STORE_META, STORE_OPS], 'readwrite');
  const ordersS = tx.objectStore(STORE_ORDERS);
  const metaS = tx.objectStore(STORE_META);
  const opsS = tx.objectStore(STORE_OPS);

  const cur = await reqToPromise<{ key: string; value: number } | undefined>(metaS.get(SEQ_KEY) as any);
  const seq = ((cur && cur.value) || 0) + 1;
  metaS.put({ key: SEQ_KEY, value: seq });

  const now = Date.now();
  const order: LocalOrder = {
    localId,
    idempotencyKey: input.idempotencyKey || genId('oq-'),
    provisionalNumber: input.provisionalNumber || provisionalFrom(seq),
    items: input.items || [],
    payments: input.payments || [],
    status: input.status || 'pending',
    orderType: input.orderType,
    tableNumber: input.tableNumber ?? null,
    restaurantId: input.restaurantId,
    total: input.total,
    raw: input.raw,
    createdAt: now,
    updatedAt: now,
    syncState: 'local',
    printedLocally: false,
  };
  ordersS.put(order);

  const opStored: OpStored = {
    opId: genId(),
    type: 'create',
    localOrderId: localId,
    payload: input.payload ?? input.raw ?? order,
    seq,
    at: now,
    synced: 0,
  };
  opsS.put(opStored);

  await txDone(tx);
  return { order, op: toOp(opStored) };
}

// ── 카운트(배너 배지용) ──────────────────────────────────────────────────────
export async function pendingOpCount(): Promise<number> {
  if (!isIDBAvailable()) return 0;
  try {
    const db = await openDb();
    const tx = db.transaction(STORE_OPS, 'readonly');
    const idx = tx.objectStore(STORE_OPS).index('synced');
    return await reqToPromise<number>(idx.count(IDBKeyRange.only(0)) as any);
  } catch {
    return 0;
  }
}

export async function unsyncedOrderCount(): Promise<number> {
  if (!isIDBAvailable()) return 0;
  try {
    const all = await getAllOrders();
    return all.filter((o) => o.syncState !== 'synced').length;
  } catch {
    return 0;
  }
}

// ── 메타 ────────────────────────────────────────────────────────────────────
async function getMeta<T = any>(key: string): Promise<T | undefined> {
  const row = await idbGet<{ key: string; value: T }>(STORE_META, key);
  return row ? row.value : undefined;
}
async function setMeta(key: string, value: any): Promise<void> {
  await idbPut(STORE_META, { key, value });
}

// ── 기존 offlineOrderQueue(localStorage) 흡수 ─────────────────────────────────
const LEGACY_QUEUE_KEY = 'offline_order_queue_v1';

/**
 * 기존 localStorage 큐(offlineOrderQueue)에 남은 미전송 주문을 IndexedDB op 로그로 1회 이관.
 * 5단계 SyncEngine 가 단일 소스(IndexedDB)에서 재생하도록. one-time(meta 플래그).
 * 비파괴적 안전: 새 스토어에 쓴 뒤에만 legacy 키 제거.
 */
export async function absorbLegacyQueue(): Promise<{ absorbed: number }> {
  if (!isIDBAvailable() || typeof localStorage === 'undefined') return { absorbed: 0 };
  try {
    if (await getMeta<boolean>(LEGACY_FLAG)) return { absorbed: 0 };
  } catch { /* 진행 */ }

  let items: any[] = [];
  try {
    const raw = localStorage.getItem(LEGACY_QUEUE_KEY);
    items = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(items)) items = [];
  } catch {
    items = [];
  }

  let absorbed = 0;
  for (const it of items) {
    try {
      if (!it || !it.body) continue;
      await createLocalOrderWithOp({
        idempotencyKey: it.key || it.body?.idempotency_key,
        raw: it.body,
        payload: it.body,
        total: it.body?.total ?? it.body?.total_amount,
        orderType: it.body?.order_type,
        tableNumber: it.body?.table_number ?? null,
        restaurantId: it.body?.restaurant_id,
      });
      absorbed++;
    } catch { /* 개별 실패는 건너뛰고 나머지 진행 */ }
  }

  try {
    await setMeta(LEGACY_FLAG, true);
    if (absorbed > 0 || items.length > 0) localStorage.removeItem(LEGACY_QUEUE_KEY);
  } catch { /* ignore */ }

  return { absorbed };
}

// ── 초기화 ────────────────────────────────────────────────────────────────────
let _inited = false;
/**
 * 앱 진입 시 1회 — IndexedDB 를 미리 열어 둔다(정전 후 재부팅·첫 오프라인 전 워밍).
 * 3단계에선 워밍만. legacy 큐 흡수(absorbLegacyQueue)·동기화 재생은 5단계 SyncEngine 에서 호출
 * (그 전에 흡수하면 재생 주체가 없어 미전송분이 떠 있게 되므로 의도적으로 미호출).
 */
export async function initOfflineStore(): Promise<void> {
  if (_inited || typeof window === 'undefined') return;
  _inited = true;
  if (!isIDBAvailable()) return;
  try { await openDb(); } catch { /* IndexedDB 차단 환경(프라이빗모드 등) — 조용히 무시 */ }
}

// ── dev 테스트 seam ──────────────────────────────────────────────────────────
// build:dev 는 production 번들이라 NODE_ENV 게이트가 안 통한다 → dev 호스트네임에서만 노출.
// 운영(purplehere.com apex/www)엔 노출 안 됨. Playwright headless 검증용.
try {
  if (typeof window !== 'undefined') {
    const h = window.location && window.location.hostname ? window.location.hostname : '';
    const isDevHost = /^(dev\.|localhost$|127\.|87\.106\.|192\.168\.|10\.)/.test(h);
    if (isDevHost) {
      (window as any).__offlineStore = {
        putOrder, getOrder, getAllOrders, patchOrder, markOrderSynced, setPrintedLocally,
        appendOp, getUnsyncedOps, getAllOps, markOpSynced, markOpFailed,
        createLocalOrderWithOp, pendingOpCount, unsyncedOrderCount, absorbLegacyQueue,
        deleteOfflineDb,  // 테스트 정리용(dev 한정)
      };
    }
  }
} catch { /* ignore */ }
