import { useCallback, useRef, useState } from 'react';
import { getAuthToken } from '../../utils/auth';
import type { Customer } from './types';

// POS 관리자 전용 고객 목록 상태 훅
// - customers[]: 현재 레스토랑 고객 목록 (API 로드)
// - reload: 중복 호출 방지 + restaurantId 결정 로직
// - 로컬 mutation (updateLocal, deleteLocal 등) — API 호출은 composite 쪽에서 처리
export function usePosCustomersState() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const loadingRef = useRef(false);

  const loadInitialCustomers = useCallback(async (restaurantIdParam?: string | number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      // restaurantId 결정: 파라미터 > localStorage > URL
      // (하드코딩 fallback 제거 — 결정 못하면 빈 목록 반환)
      let restaurantId = restaurantIdParam;
      if (!restaurantId) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            restaurantId = user.restaurantId || user.restaurant_id;
          } catch {
            /* ignore */
          }
        }
      }
      if (!restaurantId) {
        const match = window.location.pathname.match(/\/restaurant\/(\d+)/);
        if (match) {
          restaurantId = match[1];
        }
      }
      if (!restaurantId) {
        setCustomers([]);
        return;
      }

      const token = getAuthToken();
      const response = await fetch(`/api/customers/${restaurantId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const customersData: Customer[] = data.data.map((item: any) => ({
          id: item.customer.id.toString(),
          type: item.customer.type,
          name: item.customer.name,
          phone: item.customer.phone,
          email: item.customer.email || '',
          points: item.points || 0,
          totalOrders: item.total_orders || 0,
          totalSpent: parseFloat(item.total_spent) || 0,
          favoriteItems: [],
          addresses: [],
          joinDate: item.first_order_at
            ? new Date(item.first_order_at).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          lastOrderDate: item.last_order_at
            ? new Date(item.last_order_at).toISOString().split('T')[0]
            : undefined,
          loyaltyTier: item.loyalty_tier || 'Bronze',
          isActive: true,
          couponsAvailable: item.coupons_available || 0,
          couponsUsed: item.coupons_used || 0,
        }));

        setCustomers(customersData);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      setCustomers([]);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const searchCustomers = (query: string): Customer[] => {
    if (!query.trim()) return customers;
    const lowercaseQuery = query.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowercaseQuery) ||
        customer.phone.includes(query) ||
        customer.email?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getCustomerByPhone = (phone: string): Customer | null => {
    return customers.find((customer) => customer.phone === phone) || null;
  };

  const getCustomerById = (id: string): Customer | null => {
    return customers.find((customer) => customer.id === id) || null;
  };

  // 로컬 배열만 수정 (API 호출은 composite에서 처리)
  const updateCustomerLocal = (customerId: string, updates: Partial<Customer>): Customer | null => {
    let updated: Customer | null = null;
    setCustomers((prev) => {
      const next = prev.map((c) => {
        if (c.id === customerId) {
          updated = { ...c, ...updates };
          return updated;
        }
        return c;
      });
      return next;
    });
    return updated;
  };

  const removeCustomerLocal = (customerId: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
  };

  return {
    customers,
    setCustomers,
    loadInitialCustomers,
    searchCustomers,
    getCustomerByPhone,
    getCustomerById,
    updateCustomerLocal,
    removeCustomerLocal,
  };
}
