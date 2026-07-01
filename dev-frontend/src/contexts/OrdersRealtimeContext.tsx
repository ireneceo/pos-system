// ── 공용 주문 실시간 스토어 (2026-06-12, 전 화면 주문 단계 실시간 동기화 통일) ──────
// 설계: docs/ORDER_REALTIME_SYNC_UNIFICATION.md §2-A.
// 단일 fetch(/orders/restaurant — 오늘 범위·전 단계) + 6종 소켓 이벤트 단일 reducer.
// 화면(Live Orders / Floor Plan / 아이템리스트 / Takeout)은 이 스토어를 필터링만 한다.
//
//  - order-created / order-updated / order-deleted → in-place upsert/remove (refetch 아님)
//  - order-items-added / item-voided / table-moved → 데이터는 동행 발행되는 order-updated 가
//    이미 갱신하므로(백엔드 실측: add-items:1997, void:2308, move-table:1203 모두 order-updated
//    동시 발행) 여기서는 배너·알림음용 구독 채널(subscribe)로만 전달.
//  - 단조(monotonic) 가드: updatedAt 이 더 오래된 echo 로 단계가 후퇴하는 것 차단 (KDS
//    acceptVersion 과 동일 규칙 — serve-all 의 /items→/status 이중 emit 레이스 대비).
//  - 복구: connect 시 전체 재동기화 + 30s 안전 폴링 (소켓 무음 정지 대비, KDS/LiveOrders 기존 패턴).

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useStore } from './StoreContext';
import { getAuthToken } from '../utils/auth';
import { getRestaurantTimezone } from '../utils/timezone';
import { calculatePeriodDateRange } from '../components/Common/DatePeriodFilter';

export type OrdersRealtimeEvent =
  | 'order-created' | 'order-updated' | 'order-deleted'
  | 'order-items-added' | 'item-voided' | 'table-moved';

export interface OrdersRealtimeValue {
  /** 오늘(매장 타임존) 전체 주문 — 전 단계(cancelled/completed 포함). 화면은 필터링만. */
  orders: any[];
  /** 최초 동기화 완료 여부 (로딩 표시용) */
  ordersReady: boolean;
  /** 소켓 연결 상태 */
  connected: boolean;
  /** 전체 재동기화 (connect/복구/액션 직후 보정용) */
  refetch: () => Promise<void>;
  /** 낙관 갱신 — REST 응답/로컬 변경 주문을 스토어에 반영 (버전가드 통과 시) */
  applyOrder: (order: any) => void;
  /** 주문 제거 (삭제 액션 낙관 반영) */
  removeOrder: (id: number | string) => void;
  /** 배너/알림음용 raw 소켓 이벤트 구독. 반환값 = 해제 함수 */
  subscribe: (event: OrdersRealtimeEvent, cb: (payload: any) => void) => () => void;
}

const OrdersRealtimeContext = createContext<OrdersRealtimeValue | null>(null);

const normalizeOrder = (raw: any): any => {
  if (!raw || typeof raw !== 'object') return raw;
  if (typeof raw.order_items === 'string') {
    try { return { ...raw, order_items: JSON.parse(raw.order_items) }; }
    catch { return { ...raw, order_items: [] }; }
  }
  return raw;
};

export const OrdersRealtimeProvider: React.FC<{
  restaurantId?: number | string;
  children: React.ReactNode;
}> = ({ restaurantId: ridProp, children }) => {
  const { user } = useAuth();
  const { operationSettings } = useStore();
  const restaurantId = ridProp ?? (user as any)?.restaurantId;
  const timezone = getRestaurantTimezone(operationSettings);

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersReady, setOrdersReady] = useState(false);
  const [connected, setConnected] = useState(false);

  // 단조 가드 — 주문별 마지막 적용 updatedAt(ms). 더 오래된 echo 는 버린다.
  const versionRef = useRef<Map<string, number>>(new Map());
  const listenersRef = useRef<Map<string, Set<(p: any) => void>>>(new Map());
  const timezoneRef = useRef(timezone);
  useEffect(() => { timezoneRef.current = timezone; }, [timezone]);

  // 버전 = updatedAt 초 단위 절삭. 밀리초를 쓰면 안 되는 이유(2026-06-12 실측):
  // order-created 는 메모리 Date(ms 포함, 예 .847)인데 order-updated 는 DB reload 후라
  // DATETIME 초 절삭(.000) — 같은 초 안의 생성→단계변경이 "과거"로 보여 drop 되고
  // 화면이 이전 단계에 고착됐다. 같은 초 = 수용(소켓은 연결당 FIFO라 최종 emit 이
  // 마지막에 적용 → 최종 상태 정합). 1초 이상 오래된 echo 만 차단한다.
  const verOf = (o: any): number => {
    const t = Date.parse(o?.updatedAt || o?.updated_at || '');
    return Number.isFinite(t) ? Math.floor(t / 1000) : 0;
  };

  const upsert = useCallback((raw: any, prepend = false) => {
    if (!raw || raw.id == null) return;
    const order = normalizeOrder(raw);
    const idStr = String(order.id);
    const v = verOf(order);
    const last = versionRef.current.get(idStr) || 0;
    if (v && v < last) return; // 오래된 echo → 후퇴 금지 (v=0 은 버전 미상: 통과)
    if (v) versionRef.current.set(idStr, v);
    setOrders(prev => {
      const idx = prev.findIndex(o => String(o.id) === idStr);
      if (idx >= 0) {
        const next = prev.slice();
        next[idx] = order;
        return next;
      }
      return prepend ? [order, ...prev] : [...prev, order];
    });
  }, []);

  const removeOrder = useCallback((id: number | string) => {
    const idStr = String(id);
    setOrders(prev => prev.filter(o => String(o.id) !== idStr));
  }, []);

  const refetch = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const range = calculatePeriodDateRange('today', timezoneRef.current);
      const params = new URLSearchParams({ page: '1', limit: '1000', includeCompleted: 'true' });
      if (range.start) params.append('startDate', range.start);
      if (range.end) params.append('endDate', range.end);
      const res = await fetch(`/api/orders/restaurant/${restaurantId}?${params}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) return;
      const json = await res.json();
      if (json?.success && Array.isArray(json.data)) {
        // fetch 진행 중 소켓으로 더 새 버전이 들어왔을 수 있다 → 주문별 버전 비교 merge
        // (전체 교체로 최신 socket 갱신을 과거 스냅샷이 덮는 레이스 차단).
        setOrders(prev => {
          const prevById = new Map(prev.map(o => [String(o.id), o]));
          return json.data.map((raw: any) => {
            const order = normalizeOrder(raw);
            const idStr = String(order.id);
            const v = verOf(order);
            const last = versionRef.current.get(idStr) || 0;
            if (v && v >= last) {
              versionRef.current.set(idStr, v);
              return order;
            }
            return prevById.get(idStr) || order;
          });
        });
        setOrdersReady(true);
      }
    } catch (err) {
      console.error('[OrdersRealtime] refetch failed:', err);
    }
  }, [restaurantId]);

  const refetchRef = useRef(refetch);
  useEffect(() => { refetchRef.current = refetch; }, [refetch]);

  const emitLocal = useCallback((event: string, payload: any) => {
    const set = listenersRef.current.get(event);
    if (set) set.forEach(cb => { try { cb(payload); } catch { /* listener 오류 격리 */ } });
  }, []);

  const subscribe = useCallback((event: OrdersRealtimeEvent, cb: (p: any) => void) => {
    let set = listenersRef.current.get(event);
    if (!set) { set = new Set(); listenersRef.current.set(event, set); }
    set.add(cb);
    return () => { set!.delete(cb); };
  }, []);

  // 단일 소켓 — /orders 네임스페이스, room=restaurant_<id>
  useEffect(() => {
    if (!restaurantId) return;

    const socket = io('/orders', {
      transports: ['websocket', 'polling'],
      auth: { token: getAuthToken() }, // socket auth (Expand 단계): 서버 미강제 시 무시됨 — 동작 무변경
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join-restaurant', restaurantId);
      // (재)연결 시 전체 재동기화 — 끊긴 사이 놓친 emit 복구 (KDS/LiveOrders 기존 패턴)
      refetchRef.current();
    });
    socket.on('disconnect', () => setConnected(false));

    const sameRestaurant = (o: any) =>
      o?.restaurant_id == null || Number(o.restaurant_id) === Number(restaurantId);

    socket.on('order-created', (order: any) => {
      if (!sameRestaurant(order)) return;
      upsert(order, true);
      emitLocal('order-created', order);
    });
    socket.on('order-updated', (order: any) => {
      if (!sameRestaurant(order)) return;
      upsert(order);
      emitLocal('order-updated', order);
    });
    socket.on('order-deleted', (payload: { id: number }) => {
      if (payload?.id == null) return;
      removeOrder(payload.id);
      emitLocal('order-deleted', payload);
    });
    // 아래 3종: 주문 데이터는 동행 order-updated 가 갱신 — 배너/알림음 채널로만 전달
    socket.on('order-items-added', (p: any) => emitLocal('order-items-added', p));
    socket.on('item-voided', (p: any) => emitLocal('item-voided', p));
    socket.on('table-moved', (p: any) => emitLocal('table-moved', p));

    // 30s 안전 폴링 — 소켓이 disconnect 이벤트 없이 무음 정지하는 케이스 대비
    const pollId = setInterval(() => refetchRef.current(), 30000);

    return () => {
      clearInterval(pollId);
      socket.disconnect();
    };
  }, [restaurantId, upsert, removeOrder, emitLocal]);

  // 초기 동기화
  useEffect(() => { refetch(); }, [refetch]);

  // 2026-07-01 (Irene "모든 곳 실시간, 특히 단계/상태 변경"): 화면이 다시 보이거나(탭 복귀·모니터 wake)
  // 창이 포커스될 때 즉시 재동기화. 소켓이 disconnect 이벤트 없이 조용히 멈췄거나 blip 으로 emit 을
  // 놓친 사이의 단계·상태 변경을 30초 폴링을 기다리지 않고 즉시 최신화한다(버전가드 merge 라 안전).
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') refetchRef.current(); };
    const onFocus = () => refetchRef.current();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const value = useMemo<OrdersRealtimeValue>(() => ({
    orders, ordersReady, connected, refetch, applyOrder: upsert, removeOrder, subscribe,
  }), [orders, ordersReady, connected, refetch, upsert, removeOrder, subscribe]);

  return (
    <OrdersRealtimeContext.Provider value={value}>
      {children}
    </OrdersRealtimeContext.Provider>
  );
};

export const useOrdersRealtime = (): OrdersRealtimeValue => {
  const ctx = useContext(OrdersRealtimeContext);
  if (!ctx) throw new Error('useOrdersRealtime must be used within OrdersRealtimeProvider');
  return ctx;
};
