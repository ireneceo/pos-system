import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface BreakTime {
  id: string;
  start: string;
  end: string;
}

interface OrderTypes {
  dineIn: boolean;
  takeaway: boolean;
  pickup: boolean;
  delivery: boolean;
}

interface Store {
  id: string;
  slug: string;
  name: string;
  branchName?: string | null;
  description: string;
  logo: string;
  isOpen: boolean;
  openingHours: Record<string, string>;
  currency?: string;
  cash_rounding?: number | null;
  rounding_apply_to?: 'cash_only' | 'all';
  openingTime?: string;
  closingTime?: string;
  timeZone?: string;
  country?: string;
  orderTypes?: OrderTypes;
  breakTimes?: BreakTime[];
  cashless?: boolean;  // 매장이 cash method 끔 (payment_settings.cash.enabled === false)
}

interface SetMenuItem {
  menuItemId: number;
  name: string;
  quantity: number;
}

interface MenuItem {
  id: string;
  code?: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  emoji: string;
  image?: string;
  isAvailable: boolean;
  preparationTime: number;
  calories?: number;
  isPopular?: boolean;
  optionGroups?: OptionGroup[];
  is_set_menu?: boolean;
  set_items?: SetMenuItem[];
}

interface OptionGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: Option[];
}

interface Option {
  id: string;
  name: string;
  price: number;
}

interface SelectedOptionData {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: string[];  // Option names for display
  selectedOptionsData: SelectedOptionData[];  // Full option data
  specialInstructions?: string;
  totalPrice: number;
  setComponents?: any[];  // 세트 v2 구성품 분해 (주문 생성 시 order_item.set_components 로 전송)
}

interface Order {
  id: string;
  pickupNumber: string;
  items: CartItem[];
  total: number;
  status: 'outstanding' | 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  estimatedPickupTime: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

interface MobileOrderContextType {
  // Store
  currentStore: Store | null;
  setCurrentStore: (store: Store | null) => void;

  // Order Type
  orderType: string | null;
  setOrderType: (type: string | null) => void;

  // Cart
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (item: MenuItem, quantity: number, options: string[], instructions?: string) => void;
  updateCartItem: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Order
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  orderHistory: Order[];

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Currency
  currency: string;
}

const MobileOrderContext = createContext<MobileOrderContextType | undefined>(undefined);

export const useMobileOrder = () => {
  const context = useContext(MobileOrderContext);
  if (!context) {
    throw new Error('useMobileOrder must be used within MobileOrderProvider');
  }
  return context;
};

interface MobileOrderProviderProps {
  children: ReactNode;
}

export const MobileOrderProvider: React.FC<MobileOrderProviderProps> = ({ children }) => {
  // Store state
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

  // Order type state — persisted in localStorage so it shares the SAME lifecycle
  // as the cart (also localStorage). Previously this lived in sessionStorage, which
  // is wiped when a mobile browser evicts a backgrounded tab — the cart survived but
  // orderType/tableNumber did not, so a resumed checkout submitted table_number=null
  // (dine-in orders silently became table-less "pickup N"). Keep cart + orderType +
  // tableNumber on the SAME store so "cart alive ⇒ table alive" always holds.
  const [orderType, setOrderTypeState] = useState<string | null>(() => {
    return localStorage.getItem('orderType');
  });

  // Wrapper to sync orderType with localStorage (see lifecycle note above).
  const setOrderType = useCallback((type: string | null) => {
    setOrderTypeState(type);
    if (type) {
      localStorage.setItem('orderType', type);
    } else {
      localStorage.removeItem('orderType');
    }
  }, []);

  // Cart state - localStorage로 페이지 새로고침 시에도 유지
  const [cartItems, setCartItemsState] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mobile_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wrapper to sync cartItems with localStorage
  const setCartItems = useCallback((updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setCartItemsState(prev => {
      const newItems = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('mobile_cart', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  // Order state - localStorage 제거, 메모리 기반 상태 관리
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderHistory] = useState<Order[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // localStorage 동기화 제거 - 필요시 서버에 카트 저장 기능 추가 가능
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  
  // Add item to cart
  const addToCart = useCallback((
    item: MenuItem,
    quantity: number,
    options: string[],  // Option IDs
    instructions?: string
  ) => {
    // 세트 v2: 구성품은 set_components(별도 필드)로 carry/표시 → specialInstructions 엔 사용자 메모만(브래킷 X).
    const setComponents: any[] | undefined = (item as any).set_components;
    let finalInstructions = instructions || '';
    if (setComponents && setComponents.length > 0) {
      // 구성품 텍스트를 instructions 에 안 넣음 (중복 방지). finalInstructions = 사용자 메모 그대로.
    } else if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
      const setItemsText = item.set_items
        .map(setItem => `${setItem.name} x${setItem.quantity}`)
        .join(', ');
      finalInstructions = finalInstructions
        ? `[${setItemsText}] ${finalInstructions}`
        : `[${setItemsText}]`;
    }

    const cartItemId = `${item.id}-${options.join('-')}-${Date.now()}`;

    // Get full option data and calculate total price
    let totalPrice = item.price;
    const selectedOptionsData: SelectedOptionData[] = [];
    const selectedOptionNames: string[] = [];

    if (setComponents && setComponents.length > 0) {
      // 세트: 단가는 ItemDetailPage 가 계산(_setUnitPrice = 세트가+upcharge+옵션)
      totalPrice = (item as any)._setUnitPrice != null ? (item as any)._setUnitPrice : item.price;
    } else if (item.optionGroups) {
      options.forEach(optionId => {
        const option = item.optionGroups
          ?.flatMap(g => g.options)
          .find(o => o.id === optionId);
        if (option) {
          totalPrice += option.price;
          selectedOptionsData.push({
            id: option.id,
            name: option.name,
            price: option.price
          });
          selectedOptionNames.push(option.name);
        }
      });
    }
    totalPrice *= quantity;

    const newCartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity,
      selectedOptions: selectedOptionNames,  // Store names for display
      selectedOptionsData,  // Store full data for order processing
      specialInstructions: finalInstructions,
      totalPrice,
      ...(setComponents && setComponents.length > 0 ? { setComponents } : {})
    } as CartItem;

    // Merge identical configurations into one line (industry standard — Toast/Square).
    // The kitchen saw the SAME item as many separate qty-1 lines ("잡채 1개 눌렀는데 3개",
    // SET 2 ×6 lines) because every add appended a brand-new line keyed by Date.now().
    // Same product + same options + same note + same set-components → bump quantity
    // instead of duplicating the line. Different note/options still stay separate.
    const sig = `${item.id}|${[...selectedOptionNames].sort().join(',')}|${finalInstructions}|${setComponents && setComponents.length ? JSON.stringify(setComponents) : ''}`;
    setCartItems(prev => {
      const idx = prev.findIndex(ci => {
        const ciSig = `${ci.menuItem?.id}|${[...(ci.selectedOptions || [])].sort().join(',')}|${ci.specialInstructions || ''}|${(ci as any).setComponents ? JSON.stringify((ci as any).setComponents) : ''}`;
        return ciSig === sig;
      });
      if (idx >= 0) {
        return prev.map((ci, i) => i === idx
          ? { ...ci, quantity: ci.quantity + quantity, totalPrice: ci.totalPrice + totalPrice }
          : ci);
      }
      return [...prev, newCartItem];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Update cart item quantity
  const updateCartItem = useCallback((cartItemId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const unitPrice = item.totalPrice / item.quantity;
        return {
          ...item,
          quantity,
          totalPrice: unitPrice * quantity
        };
      }
      return item;
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Remove item from cart
  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Clear cart ONLY — keep tableNumber/orderType. Irene rule (2026-06-12): the
  // customer is still seated at the table after ordering (came in via the table
  // QR), so going Home must keep the table — additional orders land on the SAME
  // table without re-entering it. A fresh QR scan re-seeds tableNumber/orderType
  // from the ?table=/?order_type= URL params on OrderTypePage, so the next
  // customer at this table never inherits a stale value.
  const clearCart = useCallback(() => {
    setCartItemsState([]);
    localStorage.removeItem('mobile_cart');
  }, []);
  
  // Get currency from current store or default to 'MYR'
  const currency = currentStore?.currency || 'MYR';

  const value: MobileOrderContextType = {
    // Store
    currentStore,
    setCurrentStore,

    // Order Type
    orderType,
    setOrderType,

    // Cart
    cartItems,
    cartTotal,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,

    // Order
    currentOrder,
    setCurrentOrder,
    orderHistory,

    // UI State
    isLoading,
    setIsLoading,
    error,
    setError,

    // Currency
    currency
  };
  
  return (
    <MobileOrderContext.Provider value={value}>
      {children}
    </MobileOrderContext.Provider>
  );
};