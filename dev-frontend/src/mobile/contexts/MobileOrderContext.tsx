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
  orderTypes?: OrderTypes;
  breakTimes?: BreakTime[];
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

interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: string[];
  specialInstructions?: string;
  totalPrice: number;
}

interface Order {
  id: string;
  pickupNumber: string;
  items: CartItem[];
  total: number;
  status: 'awaiting_payment' | 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  estimatedPickupTime: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

interface MobileOrderContextType {
  // Store
  currentStore: Store | null;
  setCurrentStore: (store: Store | null) => void;

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

  // Cart state - localStorage 제거, 메모리 기반 상태 관리
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
    options: string[],
    instructions?: string
  ) => {
    // For set menus, add set_items as special instructions prefix
    let finalInstructions = instructions || '';
    if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
      const setItemsText = item.set_items
        .map(setItem => `${setItem.name} x${setItem.quantity}`)
        .join(', ');
      finalInstructions = finalInstructions
        ? `[${setItemsText}] ${finalInstructions}`
        : `[${setItemsText}]`;
    }

    const cartItemId = `${item.id}-${options.join('-')}-${Date.now()}`;

    // Calculate total price including options
    let totalPrice = item.price;
    if (item.optionGroups) {
      options.forEach(optionId => {
        const option = item.optionGroups
          ?.flatMap(g => g.options)
          .find(o => o.id === optionId);
        if (option) {
          totalPrice += option.price;
        }
      });
    }
    totalPrice *= quantity;

    const newCartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity,
      selectedOptions: options,
      specialInstructions: finalInstructions,
      totalPrice
    };

    setCartItems(prev => [...prev, newCartItem]);
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
  }, []);
  
  // Remove item from cart
  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  }, []);
  
  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  // Get currency from current store or default to 'RM'
  const currency = currentStore?.currency || 'RM';

  const value: MobileOrderContextType = {
    // Store
    currentStore,
    setCurrentStore,

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