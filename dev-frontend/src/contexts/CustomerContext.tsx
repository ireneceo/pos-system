import React, { createContext, useContext, useState } from 'react';
import { getAuthToken } from '../utils/auth';
import type { Customer, CustomerAddress, GuestInfo } from './customer/types';
import { useMobileCustomerState } from './customer/useMobileCustomerState';
import { usePosCustomersState } from './customer/usePosCustomersState';

// 하위 호환을 위해 타입을 그대로 re-export
export type { Customer, CustomerAddress, GuestInfo };

// Context 타입 — 기존 공개 API 유지
interface CustomerContextType {
  // 모바일 고객 상태
  currentCustomer: Customer | null;
  guestInfo: GuestInfo | null;
  isGuest: boolean;
  setCurrentCustomer: (customer: Customer | null) => void;
  setGuestInfo: (guest: GuestInfo | null) => void;

  // POS 고객 목록
  customers: Customer[];

  // 회원 관리 (교차 로직)
  registerCustomer: (customerData: Partial<Customer>, restaurantId?: string | number) => Promise<Customer>;
  loginCustomer: (phone: string, password?: string, restaurantId?: string | number) => Promise<Customer | null>;
  logoutCustomer: () => void;
  updateCustomer: (customerId: string, updates: Partial<Customer>) => Promise<Customer>;

  // 고객 검색 및 조회
  searchCustomers: (query: string) => Customer[];
  getCustomerByPhone: (phone: string) => Customer | null;
  getCustomerById: (id: string) => Customer | null;
  deleteCustomer: (customerId: string) => Promise<boolean>;
  reloadCustomers: (restaurantId?: string | number) => Promise<void>;

  // 포인트 및 히스토리
  addPoints: (customerId: string, points: number) => void;
  usePoints: (customerId: string, points: number) => boolean;
  addToFavorites: (customerId: string, itemId: string) => void;
  removeFromFavorites: (customerId: string, itemId: string) => void;

  // 주문 연동
  updateCustomerOrderStats: (customerId: string, orderAmount: number) => void;

  // UI 상태
  showCustomerModal: boolean;
  setShowCustomerModal: (show: boolean) => void;
  customerModalMode: 'guest' | 'member' | 'register';
  setCustomerModalMode: (mode: 'guest' | 'member' | 'register') => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mobile = useMobileCustomerState();
  const pos = usePosCustomersState();

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerModalMode, setCustomerModalMode] = useState<'guest' | 'member' | 'register'>('guest');

  const getFetchOptions = (options: RequestInit = {}): RequestInit => {
    const token = getAuthToken();
    return {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    };
  };

  // 교차 로직 — 모바일 + POS 양쪽 상태를 건드리는 작업은 여기서 orchestrate
  const registerCustomer = async (
    customerData: Partial<Customer> & { password?: string },
    restaurantId?: string | number
  ): Promise<Customer> => {
    const response = await fetch(
      '/api/customers/register',
      getFetchOptions({
        method: 'POST',
        body: JSON.stringify({
          phone: customerData.phone,
          name: customerData.name,
          email: customerData.email,
          password: customerData.password,
          restaurantId: restaurantId || undefined,
        }),
      })
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    const newCustomer: Customer = {
      id: data.data.id.toString(),
      type: data.data.type as 'guest' | 'member',
      name: data.data.name,
      phone: data.data.phone,
      email: data.data.email || '',
      points: data.data.points || 0,
      totalOrders: data.data.totalOrders || 0,
      totalSpent: data.data.totalSpent || 0,
      favoriteItems: [],
      addresses: [],
      joinDate: new Date().toISOString().split('T')[0],
      loyaltyTier: data.data.loyaltyTier || 'Bronze',
      isActive: true,
      couponsAvailable: 0,
      couponsUsed: 0,
    };

    mobile.setCurrentCustomer(newCustomer);
    mobile.setGuestInfo(null);
    await pos.loadInitialCustomers(restaurantId);

    return newCustomer;
  };

  const loginCustomer = async (
    phone: string,
    password?: string,
    restaurantId?: string | number
  ): Promise<Customer | null> => {
    try {
      const response = await fetch(
        '/api/customers/auth',
        getFetchOptions({
          method: 'POST',
          body: JSON.stringify({ phone, password, restaurantId: restaurantId || undefined }),
        })
      );

      const data = await response.json();
      if (!response.ok || !data.success) return null;

      const customer: Customer = {
        id: data.data.id.toString(),
        type: data.data.type as 'guest' | 'member',
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email || '',
        points: data.data.points || 0,
        totalOrders: data.data.totalOrders || 0,
        totalSpent: data.data.totalSpent || 0,
        favoriteItems: [],
        addresses: [],
        joinDate: new Date().toISOString().split('T')[0],
        loyaltyTier: data.data.loyaltyTier || 'Bronze',
        isActive: true,
        couponsAvailable: 0,
        couponsUsed: 0,
      };

      mobile.setCurrentCustomer(customer);
      mobile.setGuestInfo(null);
      return customer;
    } catch {
      return null;
    }
  };

  // updateCustomer — POS 배열 + (매칭 시) 모바일 currentCustomer 양쪽 갱신
  const updateCustomer = async (customerId: string, updates: Partial<Customer>): Promise<Customer> => {
    const updated = pos.updateCustomerLocal(customerId, updates);
    const merged = updated ?? { ...(pos.getCustomerById(customerId) || ({} as Customer)), ...updates };

    if (mobile.currentCustomer?.id === customerId) {
      mobile.setCurrentCustomer(merged);
    }

    return merged;
  };

  const deleteCustomer = async (customerId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, getFetchOptions({ method: 'DELETE' }));
      const data = await response.json();
      if (!response.ok || !data.success) return false;

      pos.removeCustomerLocal(customerId);
      if (mobile.currentCustomer?.id === customerId) {
        mobile.setCurrentCustomer(null);
      }
      return true;
    } catch {
      return false;
    }
  };

  // 포인트/즐겨찾기/주문통계 — updateCustomer를 통해 일괄 처리
  const addPoints = (customerId: string, points: number) => {
    updateCustomer(customerId, {
      points: (pos.getCustomerById(customerId)?.points || 0) + points,
    });
  };

  const usePointsFn = (customerId: string, points: number): boolean => {
    const customer = pos.getCustomerById(customerId);
    if (!customer || customer.points < points) return false;
    updateCustomer(customerId, { points: customer.points - points });
    return true;
  };

  const addToFavorites = (customerId: string, itemId: string) => {
    const customer = pos.getCustomerById(customerId);
    if (!customer || customer.favoriteItems.includes(itemId)) return;
    updateCustomer(customerId, { favoriteItems: [...customer.favoriteItems, itemId] });
  };

  const removeFromFavorites = (customerId: string, itemId: string) => {
    const customer = pos.getCustomerById(customerId);
    if (!customer) return;
    updateCustomer(customerId, {
      favoriteItems: customer.favoriteItems.filter((id) => id !== itemId),
    });
  };

  const updateCustomerOrderStats = (customerId: string, orderAmount: number) => {
    const customer = pos.getCustomerById(customerId);
    if (!customer) return;

    const earnedPoints = Math.floor(orderAmount);
    const newTotalSpent = customer.totalSpent + orderAmount;
    let newTier: Customer['loyaltyTier'] = 'Bronze';
    if (newTotalSpent >= 5000) newTier = 'VIP';
    else if (newTotalSpent >= 2000) newTier = 'Gold';
    else if (newTotalSpent >= 500) newTier = 'Silver';

    updateCustomer(customerId, {
      totalOrders: customer.totalOrders + 1,
      totalSpent: newTotalSpent,
      points: customer.points + earnedPoints,
      loyaltyTier: newTier,
      lastOrderDate: new Date().toISOString().split('T')[0],
    });
  };

  const value: CustomerContextType = {
    currentCustomer: mobile.currentCustomer,
    guestInfo: mobile.guestInfo,
    isGuest: mobile.isGuest,
    customers: pos.customers,
    setCurrentCustomer: mobile.setCurrentCustomer,
    setGuestInfo: mobile.setGuestInfo,
    registerCustomer,
    loginCustomer,
    logoutCustomer: mobile.logoutCustomer,
    updateCustomer,
    searchCustomers: pos.searchCustomers,
    getCustomerByPhone: pos.getCustomerByPhone,
    getCustomerById: pos.getCustomerById,
    deleteCustomer,
    reloadCustomers: pos.loadInitialCustomers,
    addPoints,
    usePoints: usePointsFn,
    addToFavorites,
    removeFromFavorites,
    updateCustomerOrderStats,
    showCustomerModal,
    setShowCustomerModal,
    customerModalMode,
    setCustomerModalMode,
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};
