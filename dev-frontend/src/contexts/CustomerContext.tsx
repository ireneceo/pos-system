import React, { createContext, useContext, useState, useCallback } from 'react';

// 고객 타입 정의
export interface Customer {
  id: string;
  type: 'guest' | 'member' | 'register';
  name: string;
  phone: string;
  email?: string;
  points: number;
  totalOrders: number;
  totalSpent: number;
  favoriteItems: string[];
  addresses: CustomerAddress[];
  joinDate: string;
  lastOrderDate?: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'VIP';
  isActive: boolean;
  couponsAvailable: number;
  couponsUsed: number;
}

export interface CustomerAddress {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface GuestInfo {
  name: string;
  phone: string;
  tableNumber?: string;
}

// Context 타입 정의
interface CustomerContextType {
  // 현재 고객 정보
  currentCustomer: Customer | null;
  guestInfo: GuestInfo | null;
  isGuest: boolean;
  
  // 고객 관리 함수들
  customers: Customer[];
  setCurrentCustomer: (customer: Customer | null) => void;
  setGuestInfo: (guest: GuestInfo | null) => void;
  
  // 회원 관리
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
  // 모바일 고객 로그인 상태 유지를 위해 localStorage 사용 (sessionStorage는 탭 닫으면 사라짐)
  const [currentCustomer, setCurrentCustomerState] = useState<Customer | null>(() => {
    try {
      const saved = localStorage.getItem('mobile_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [guestInfo, setGuestInfoState] = useState<GuestInfo | null>(() => {
    try {
      const saved = localStorage.getItem('mobile_guest');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // localStorage 동기화 wrapper 함수
  const setCurrentCustomer = (customer: Customer | null) => {
    setCurrentCustomerState(customer);
    if (customer) {
      localStorage.setItem('mobile_customer', JSON.stringify(customer));
    } else {
      localStorage.removeItem('mobile_customer');
    }
  };

  const setGuestInfo = (guest: GuestInfo | null) => {
    setGuestInfoState(guest);
    if (guest) {
      localStorage.setItem('mobile_guest', JSON.stringify(guest));
    } else {
      localStorage.removeItem('mobile_guest');
    }
  };

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerModalMode, setCustomerModalMode] = useState<'guest' | 'member' | 'register'>('guest');

  const isGuest = !currentCustomer && !!guestInfo;

  // Helper function to get fetch options with credentials
  const getFetchOptions = (options: RequestInit = {}): RequestInit => {
    const token = localStorage.getItem('auth_token');
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

  // 초기 자동 로드 제거 — 고객 데이터는 필요한 페이지에서 reloadCustomers(restaurantId)로 로드

  // localStorage 동기화 제거 - 메모리 상태만 사용

  // 중복 호출 방지용 ref
  const loadingRef = React.useRef(false);

  const loadInitialCustomers = useCallback(async (restaurantIdParam?: string | number) => {
    // 이미 로딩 중이면 중복 호출 방지
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      // restaurantId 결정: 파라미터 > localStorage > URL에서 추출 > 기본값 1
      let restaurantId = restaurantIdParam;
      if (!restaurantId) {
        // localStorage에서 사용자 정보 확인
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            restaurantId = user.restaurantId || user.restaurant_id;
          } catch (e) { /* ignore */ }
        }
      }
      if (!restaurantId) {
        // URL에서 restaurant ID 추출 시도 (/restaurant/:id/...)
        const match = window.location.pathname.match(/\/restaurant\/(\d+)/);
        if (match) {
          restaurantId = match[1];
        }
      }
      if (!restaurantId) {
        restaurantId = 1; // 기본값
      }

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/customers/${restaurantId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        // API 응답 데이터를 Customer 형식으로 변환
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
          joinDate: item.first_order_at ? new Date(item.first_order_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          lastOrderDate: item.last_order_at ? new Date(item.last_order_at).toISOString().split('T')[0] : undefined,
          loyaltyTier: item.loyalty_tier || 'Bronze',
          isActive: true,
          couponsAvailable: item.coupons_available || 0,
          couponsUsed: item.coupons_used || 0
        }));

        setCustomers(customersData);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      // 에러 시 빈 배열 설정
      setCustomers([]);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const registerCustomer = async (customerData: Partial<Customer> & { password?: string }, restaurantId?: string | number): Promise<Customer> => {
    try {
      // API 호출 - restaurantId는 선택적 (모바일에서는 currentStore.id 전달)
      const response = await fetch('/api/customers/register', getFetchOptions({
        method: 'POST',
        body: JSON.stringify({
          phone: customerData.phone,
          name: customerData.name,
          email: customerData.email,
          password: customerData.password,
          restaurantId: restaurantId || undefined
        })
      }));

      const data = await response.json();

      if (!response.ok || !data.success) {

        // alert 제거, 에러만 throw (모달에서 처리)
        throw new Error(data.message || 'Registration failed');
      }

      // 응답 데이터를 Customer 형식으로 변환
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
        couponsUsed: 0
      };

      setCurrentCustomer(newCustomer);
      setGuestInfo(null);

      // 고객 목록 다시 로드 (restaurantId 전달)
      await loadInitialCustomers(restaurantId);

      return newCustomer;
    } catch (error) {

      throw error;
    }
  };

  const loginCustomer = async (phone: string, password?: string, restaurantId?: string | number): Promise<Customer | null> => {
    try {
      // API 호출 - restaurantId는 선택적 (모바일에서는 currentStore.id 전달)
      const response = await fetch('/api/customers/auth', getFetchOptions({
        method: 'POST',
        body: JSON.stringify({
          phone,
          password,
          restaurantId: restaurantId || undefined
        })
      }));

      const data = await response.json();

      if (!response.ok || !data.success) {

        // 에러를 throw하지 않고 null 반환 (모달에서 처리)
        return null;
      }

      // 응답 데이터를 Customer 형식으로 변환
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
        couponsUsed: 0
      };

      setCurrentCustomer(customer);
      setGuestInfo(null);
      return customer;
    } catch (error) {

      // alert 제거, null 반환
      return null;
    }
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    setGuestInfo(null);
  };

  const updateCustomer = async (customerId: string, updates: Partial<Customer>): Promise<Customer> => {
    const updatedCustomers = customers.map(customer => 
      customer.id === customerId ? { ...customer, ...updates } : customer
    );
    
    setCustomers(updatedCustomers);
    
    const updatedCustomer = updatedCustomers.find(c => c.id === customerId)!;
    
    if (currentCustomer?.id === customerId) {
      setCurrentCustomer(updatedCustomer);
    }
    
    return updatedCustomer;
  };

  const searchCustomers = (query: string): Customer[] => {
    if (!query.trim()) return customers;
    
    const lowercaseQuery = query.toLowerCase();
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.phone.includes(query) ||
      customer.email?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getCustomerByPhone = (phone: string): Customer | null => {
    return customers.find(customer => customer.phone === phone) || null;
  };

  const getCustomerById = (id: string): Customer | null => {
    return customers.find(customer => customer.id === id) || null;
  };

  const deleteCustomer = async (customerId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, getFetchOptions({
        method: 'DELETE'
      }));

      const data = await response.json();

      if (!response.ok || !data.success) {

        return false;
      }

      // 로컬 상태에서 고객 제거
      setCustomers(customers.filter(c => c.id !== customerId));

      // 현재 선택된 고객이면 로그아웃
      if (currentCustomer?.id === customerId) {
        setCurrentCustomer(null);
      }

      return true;
    } catch (error) {

      return false;
    }
  };

  const addPoints = (customerId: string, points: number) => {
    updateCustomer(customerId, {
      points: (getCustomerById(customerId)?.points || 0) + points
    });
  };

  const usePoints = (customerId: string, points: number): boolean => {
    const customer = getCustomerById(customerId);
    if (!customer || customer.points < points) return false;
    
    updateCustomer(customerId, {
      points: customer.points - points
    });
    
    return true;
  };

  const addToFavorites = (customerId: string, itemId: string) => {
    const customer = getCustomerById(customerId);
    if (!customer || customer.favoriteItems.includes(itemId)) return;
    
    updateCustomer(customerId, {
      favoriteItems: [...customer.favoriteItems, itemId]
    });
  };

  const removeFromFavorites = (customerId: string, itemId: string) => {
    const customer = getCustomerById(customerId);
    if (!customer) return;
    
    updateCustomer(customerId, {
      favoriteItems: customer.favoriteItems.filter(id => id !== itemId)
    });
  };

  const updateCustomerOrderStats = (customerId: string, orderAmount: number) => {
    const customer = getCustomerById(customerId);
    if (!customer) return;
    
    // 포인트 적립 (1% 적립)
    const earnedPoints = Math.floor(orderAmount);
    
    // 로열티 티어 업데이트
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
      lastOrderDate: new Date().toISOString().split('T')[0]
    });
  };

  const value: CustomerContextType = {
    currentCustomer,
    guestInfo,
    isGuest,
    customers,
    setCurrentCustomer,
    setGuestInfo,
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    updateCustomer,
    searchCustomers,
    getCustomerByPhone,
    getCustomerById,
    deleteCustomer,
    reloadCustomers: loadInitialCustomers,
    addPoints,
    usePoints,
    addToFavorites,
    removeFromFavorites,
    updateCustomerOrderStats,
    showCustomerModal,
    setShowCustomerModal,
    customerModalMode,
    setCustomerModalMode
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};