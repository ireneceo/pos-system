import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { getAuthToken } from '../utils/auth';
import { ensureIdempotencyKey, enqueueOrder } from '../utils/offlineOrderQueue';
import { isOfflineMainPos } from '../utils/offlineMainPos';
export interface OrderItem {
  id: string;
  menuItem: {
    id: string;
    name: string;
    price: number;
    emoji: string;
  };
  quantity: number;
  options?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  pickupNumber?: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  items: OrderItem[];
  status: 'awaiting_payment' | 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
  completedAt?: string;
  subtotal: number;
  tax: number;
  discount: number;
  coupon?: {
    code: string;
    amount: number;
  };
  total: number;
  paymentMethod: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  orderType: 'dine-in' | 'takeaway';
  orderSource: 'pos' | 'mobile';
  notes?: string;
  tableNumber?: string;
  // 2026-05-27: Floor Plan v2 tables[].id — disambiguates same tableNumber across zones
  floorPlanTableId?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order, restaurantId?: number) => Promise<Order | undefined>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

// No sample data - using real API only

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Helper function to get fetch options with credentials
  const getFetchOptions = (options: RequestInit = {}): RequestInit => {
    const token = getAuthToken();
    return {
      ...options,
      credentials: 'include', // 쿠키를 포함하여 요청
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    };
  };

  // Load orders from API on mount
  // #9 오프라인 주문 큐 — POS 앱 진입 시 1회, online 복귀/주기 flush 등록(끊긴 중 큐잉된 POS 주문 자동 전송).
  useEffect(() => {
    let cancelled = false;
    import('../utils/offlineOrderQueue').then(({ initOfflineOrderFlush }) => { if (!cancelled) initOfflineOrderFlush(); });
    // 오프라인 3단계 LocalStore(IndexedDB) 워밍.
    import('../utils/offlineStore').then(({ initOfflineStore }) => { if (!cancelled) initOfflineStore(); });
    // 오프라인 5단계 SyncEngine — 복구 시 op 로그 재생(무손실·무중복). online 복귀/주기 재시도 등록.
    import('../utils/offlineSync').then(({ initOfflineSync }) => { if (!cancelled) initOfflineSync(); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // Skip API calls if no auth token (user not logged in)
        const token = getAuthToken();
        if (!token) {
          return;
        }

        const response = await fetch('/api/orders?limit=100', getFetchOptions());
        const result = await response.json();

        if (result.success) {
          const apiOrders = result.data || result;
          setOrders(apiOrders);
        } else {

          setOrders([]);
        }
      } catch (error) {

        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  // No localStorage sync - using real-time API only

  const addOrder = async (order: Order, restaurantId?: number): Promise<Order | undefined> => {

    try {
      // Map frontend order format to backend format
      const backendOrder = {
        restaurant_id: restaurantId,
        order_number: order.orderNumber || null,  // Send null instead of empty string
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        table_number: order.tableNumber || null,
        floor_plan_table_id: order.floorPlanTableId || null,
        pager_number: (order as any).pagerNumber || null,
        total_amount: order.total,
        subtotal: order.subtotal,
        tax: order.tax,
        tax_rate: (order as any).taxRate || 6,
        service_charge: (order as any).serviceCharge || 0,
        service_charge_rate: (order as any).serviceChargeRate || 10,
        discount: order.discount || 0,
        coupon_code: order.coupon?.code || null,
        coupon_discount: order.coupon?.amount || 0,
        discount_policy_name: (order as any).discountPolicy?.name || null,
        discount_policy_amount: (order as any).discountPolicy?.amount || 0,
        points_used: (order as any).points_used || null,
        point_discount: (order as any).point_discount || 0,
        takeaway_charge: (order as any).takeawayCharge || 0,
        status: order.status,
        order_type: order.orderType === 'dine-in' ? 'dine_in' : order.orderType,
        source: 'pos',  // POS Terminal order source
        payment_method: order.paymentMethod || null,
        card_type: (order as any).card_type || null,
        payment_status: order.paymentStatus || 'pending',
        order_date: new Date(),
        cashier_id: (order as any).cashier_id || null,
        cashier_name: (order as any).cashier_name || null,
        guest_count: (order as any).guest_count || null,
        notes: (order as any).notes || null,  // 2026-06-26 (#11 리마크): 주문 메모
        order_items: order.items.map(item => ({
          id: item.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
          quantity: item.quantity,
          options: item.options || [],
          menuItem: item.menuItem,
          is_set_menu: (item.menuItem as any).is_set_menu || false,
          set_items: (item.menuItem as any).set_items || [],
          // 4-1 품목별 메모 + 스탭밀 직원이름 — 이 map 이 화이트리스트라 명시하지 않으면 백엔드로
          // 전달되지 않는다(둘 다 주방티켓/빌/정산서에 출력되어야 함).
          ...((item as any).special_instructions ? { special_instructions: (item as any).special_instructions } : {}),
          ...((item as any).staff_names ? { staff_names: (item as any).staff_names } : {}),
          // 2026-06-05: 세트 구성품(고른 항목+옵션) 누락 버그 수정 — 카운터/모바일 동일하게 전달.
          // 없으면 FloorPlan·KDS 가 set_items(전체 정의)로 폴백→전 메뉴 폭발+옵션 소실.
          // 모바일(PaymentPage)은 이미 set_components 를 보냄. 단일소스 일치.
          ...((item as any).set_components ? { set_components: (item as any).set_components } : {})
        })),
        // Backend Phase 1 — 명시 선택 머지: forceMergeIntoOrderId 가 있으면 그 주문에 머지.
        // 없으면 POS 의 default skipAutoMerge 로 별도 주문 생성.
        forceMergeIntoOrderId: (order as any).forceMergeIntoOrderId || undefined,
        // #9 오프라인 큐 — 멱등키(재전송/더블탭 중복생성 방지). order 객체에 이미 있으면 재사용.
        idempotency_key: (order as any).idempotency_key || undefined
      };
      ensureIdempotencyKey(backendOrder); // 없으면 생성

      let response: Response;
      try {
        response = await fetch('/api/orders', getFetchOptions({
          method: 'POST',
          body: JSON.stringify(backendOrder),
        }));
      } catch (netErr) {
        // §15-5 ①: forceMergeIntoOrderId(기존 서버주문에 "추가")는 오프라인에서 create 가 아니라 add_items op 로
        // 번역한다 — 레거시 create 큐를 쓰면 그 op 와 이중 머지/이중 인쇄가 된다. 로컬 라운드 인쇄를 record 앞에
        // 수행해 printed_offline 플래그를 payload 에 확정(create 경로의 사후 setPrintedLocally 패턴이 여기선 불가).
        if ((backendOrder as any).forceMergeIntoOrderId && isOfflineMainPos()) {
          import('../utils/offlineOps').then(async ({ recordOfflineOp, printOfflineAddedItemsTicket }) => {
            const addItems = backendOrder.order_items || (backendOrder as any).items || [];
            const printed = await printOfflineAddedItemsTicket({ table_number: backendOrder.table_number }, addItems).catch(() => false);
            await recordOfflineOp('add_items', { serverId: Number((backendOrder as any).forceMergeIntoOrderId) }, {
              items: addItems, order_type: backendOrder.order_type, takeaway_charge: (backendOrder as any).takeaway_charge, printed_offline: printed === true
            }).catch(() => {});
          }).catch(() => {});
          throw new Error('OFFLINE_QUEUED');
        }
        // #9 연결 끊김 — POS 주문을 잃지 않게 로컬 큐에 저장(재연결 시 자동 전송, 서버 멱등으로 중복 0).
        enqueueOrder('/api/orders', backendOrder, getAuthToken());
        // 오프라인 4단계 — LocalStore(IndexedDB) op 로그에 create 기록 + 6단계 로컬 주방인쇄.
        // legacy 큐와 같은 idempotency_key 라 중복 전송돼도 서버 멱등으로 주문 1개. 기록 실패는 무시(legacy 가 안전망).
        // ★ 오프라인 허브 = 매장이 지정한 메인 POS 1대만. 보조 기기는 전체잠금으로 막히지만(OfflineLockOverlay),
        //   레이스로 여기 도달하더라도 IndexedDB 로컬상태·로컬인쇄는 메인 POS 에서만(고아 데이터/중복 인쇄 방지).
        if (isOfflineMainPos()) import('../utils/offlineOps').then(async ({ recordOfflineCreate, printOfflineKitchenTicket }) => {
          const rec = await recordOfflineCreate(backendOrder, { authToken: getAuthToken() }).catch(() => null);
          if (!rec || !rec.order) return;
          // 6단계: 주문받은 기기(카운터 POS=오프라인 허브)가 즉시 로컬로 주방티켓 인쇄. 성공 시 printedLocally
          // → 동기화 때 printed_offline 로 서버가 printed_at 찍어 폴러 재인쇄 0. 프린터 없으면 false → 복구 후 서버 인쇄.
          const printed = await printOfflineKitchenTicket(rec.order).catch(() => false);
          if (printed) {
            import('../utils/offlineStore').then(({ setPrintedLocally }) => setPrintedLocally(rec.order.localId, true).catch(() => {})).catch(() => {});
          }
        }).catch(() => {});
        throw new Error('OFFLINE_QUEUED'); // 호출부가 "오프라인 저장됨" 처리
      }

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Failed to create order: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      if (!result.success) {

        throw new Error(result.error || 'Failed to create order');
      }

      const savedOrder = result.data;

      // Add to local state after successful API save
      setOrders(prev => {
        const exists = prev.find(existingOrder => existingOrder.id === order.id);
        if (exists) {

          return prev;
        }
        return [...prev, savedOrder];
      });

      // Return the saved order with backend-generated order number
      return savedOrder;
    } catch (error) {

      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {

    try {
      let response: Response;
      try {
        response = await fetch(`/api/orders/${orderId}/status`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({ status }),
        }));
      } catch (netErr) {
        // §15-5 ② 오프라인 — 서버주문 단계이동을 op 로그에 기록(재생 시 op_id 멱등). 메인 POS 만.
        if (isOfflineMainPos()) {
          await import('../utils/offlineOps').then(({ recordOfflineOp }) =>
            recordOfflineOp('set_stage', { serverId: Number(orderId) }, { status })
          ).catch(() => {});
          setOrders(prev => prev.map(o => String(o.id) === String(orderId) ? { ...o, status } as any : o));
          return;
        }
        throw netErr;
      }

      const result = await response.json();

      if (!result.success) {

        throw new Error(result.error || 'Failed to update order status');
      }

      // Update local state after successful API update
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {

      throw error;
    }
  };

  const deleteOrder = async (orderId: string) => {

    try {
      const response = await fetch(`/api/orders/${orderId}`, getFetchOptions({
        method: 'DELETE',
      }));

      const result = await response.json();

      if (!result.success) {

        throw new Error(result.error || 'Failed to delete order');
      }

      // Update local state after successful API delete
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {

      throw error;
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus, 
      deleteOrder, 
      getOrderById 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;