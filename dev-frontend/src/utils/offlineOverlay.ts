/**
 * offlineOverlay — 낙관적 오버레이 (§15-5). 오프라인 중 서버 주문에 건 편집(pending op)을
 * 서버 캐시 위에 **읽기 전용으로** 얹어 라이브뷰에 즉시 반영한다. 원본을 절대 mutate 하지 않는다(I4).
 *
 * 적용 지점 정확히 2곳: OrdersRealtimeContext(주문 스토어) · FloorPlanPage(tableStatuses).
 * 온라인·pending op 0개면 overlayOrders/overlayTableStatuses 는 입력을 그대로 반환 → 코드 경로가
 * 사실상 죽어 있음(평상시 위험 0). op synced → pending 에서 빠짐 → 오버레이 자연 소멸.
 *
 * 클라 축약 재현: 서버 재계산이 진실, 화면은 근사 + "동기화 대기" 배지(__offlinePending). 최종 금액은
 * 재생 후 서버 공식(computeOrderTotals)이 확정한다.
 */
import { getUnsyncedOps } from './offlineStore';

export interface PendingServerOp {
  opId: string;
  type: string;
  serverId: number;
  payload: any;
  at: number;
}

/** unsynced && payload._serverId 있는 op(=서버 주문 편집)만, seq 순서 보존. */
export async function getPendingServerOps(): Promise<PendingServerOp[]> {
  try {
    const ops = await getUnsyncedOps(); // seq 오름차순
    const out: PendingServerOp[] = [];
    for (const op of ops) {
      const sid = Number(op.payload?._serverId);
      if (op.type !== 'create' && Number.isFinite(sid) && sid > 0) {
        out.push({ opId: op.opId, type: op.type, serverId: sid, payload: op.payload, at: op.at });
      }
    }
    return out;
  } catch {
    return [];
  }
}

function _num(v: any): number { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; }

function _parseItems(order: any): any[] {
  let it = order.order_items;
  if (typeof it === 'string') { try { it = JSON.parse(it); } catch { it = []; } }
  return Array.isArray(it) ? it : [];
}

/** 한 주문에 한 op 를 적용(새 객체 반환, 원본 불변). §15-5 op별 규칙. */
function applyOp(order: any, op: PendingServerOp): any {
  const next = { ...order, __offlinePending: true };
  const p = op.payload || {};
  switch (op.type) {
    case 'set_stage':
    case 'cancel_order': {
      if (p.status) next.status = p.status;
      break;
    }
    case 'cancel_item': {
      // op payload 가 온라인과 동일한 full-array replace → 그대로.
      if (Array.isArray(p.order_items)) next.order_items = p.order_items;
      break;
    }
    case 'add_items': {
      const cur = _parseItems(order);
      const maxGroup = cur.reduce((m, it) => Math.max(m, Number(it.order_group) || 0), 0);
      const added = (Array.isArray(p.items) ? p.items : []).map((it: any) => ({
        ...it, status: 'pending', order_group: maxGroup + 1, added_at: new Date().toISOString(),
      }));
      next.order_items = [...cur, ...added];
      const delta = added.reduce((s: number, it: any) => s + _num(it.price) * (parseInt(it.quantity, 10) || 1), 0);
      // 근사(할인 동결) — 최종 금액은 재생 후 서버 재계산.
      const rate = 1 + _num(order.tax_rate) + _num(order.service_charge_rate);
      next.subtotal = _num(order.subtotal) + delta;
      next.total_amount = _num(order.total_amount) + delta * rate;
      break;
    }
    case 'pay': {
      const paid = _num(order.amount_paid) + _num(p.amount);
      next.amount_paid = paid;
      const total = _num(order.total_amount);
      next.payment_status = (p.settle_full === true || paid + 0.01 >= total) ? 'completed' : 'partial';
      break;
    }
    case 'move_table': {
      if (p.destinationTableNumber != null) next.table_number = p.destinationTableNumber;
      if (p.destinationFloorPlanTableId != null) next.floor_plan_table_id = p.destinationFloorPlanTableId;
      break;
    }
    default:
      break;
  }
  return next;
}

/** 서버 주문 배열에 pending op 를 얹는다(새 배열, 원본 불변). */
export function overlayOrders(orders: any[], ops: PendingServerOp[]): any[] {
  if (!ops || ops.length === 0 || !Array.isArray(orders)) return orders;
  const byId = new Map<number, number>(); // serverId → index
  const out = orders.map((o, i) => { const id = Number(o.id); if (Number.isFinite(id)) byId.set(id, i); return o; });
  let mutated = false;
  for (const op of ops) {
    const idx = byId.get(op.serverId);
    if (idx == null) continue; // 이 주문은 이 화면 캐시에 없음(스킵)
    out[idx] = applyOp(out[idx], op);
    mutated = true;
  }
  return mutated ? out : orders;
}

/** FloorPlan tableStatuses(별도 fetch)에 이동/취소/완납 효과를 얹는다(§15-5 적용지점②). */
export function overlayTableStatuses(
  statuses: Record<string, any>,
  ops: PendingServerOp[],
  orders: any[]
): Record<string, any> {
  if (!ops || ops.length === 0 || !statuses) return statuses;
  const orderById = new Map<number, any>();
  (Array.isArray(orders) ? orders : []).forEach(o => { const id = Number(o.id); if (Number.isFinite(id)) orderById.set(id, o); });
  const next: Record<string, any> = { ...statuses };
  for (const op of ops) {
    const order = orderById.get(op.serverId);
    const p = op.payload || {};
    if (op.type === 'move_table' && order) {
      const from = String(order.table_number ?? '');
      const to = String(p.destinationTableNumber ?? '');
      if (from && next[from]) next[from] = { ...next[from], occupied: false, status: 'available', __offlinePending: true };
      if (to) next[to] = { ...(next[to] || {}), occupied: true, status: 'occupied', __offlinePending: true };
    } else if ((op.type === 'cancel_order' || (op.type === 'pay' && p.settle_full === true)) && order) {
      const t = String(order.table_number ?? '');
      if (t && next[t]) next[t] = { ...next[t], occupied: false, status: 'available', __offlinePending: true };
    }
  }
  return next;
}
