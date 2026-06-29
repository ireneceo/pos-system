import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { getAuthToken } from '../utils/auth';
import { ensureIdempotencyKey, enqueueOrder } from '../utils/offlineOrderQueue';
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
    // 오프라인 3단계 LocalStore(IndexedDB) 워밍 — 데이터 계층만 로드(흡수/재생은 5단계 SyncEngine).
    import('../utils/offlineStore').then(({ initOfflineStore }) => { if (!cancelled) initOfflineStore(); });
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
        // #9 연결 끊김 — POS 주문을 잃지 않게 로컬 큐에 저장(재연결 시 자동 전송, 서버 멱등으로 중복 0).
        enqueueOrder('/api/orders', backendOrder, getAuthToken());
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
      const response = await fetch(`/api/orders/${orderId}/status`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }));

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