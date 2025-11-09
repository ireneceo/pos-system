import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Load orders from API on mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders?limit=100', getFetchOptions());
        const result = await response.json();

        if (result.success) {
          const apiOrders = result.data || result;
          setOrders(apiOrders);
        } else {
          console.error('OrderContext - Failed to load orders:', result.error);
          setOrders([]);
        }
      } catch (error) {
        console.error('OrderContext - Error loading orders from API:', error);
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
        total_amount: order.total,
        status: order.status,
        order_type: order.orderType === 'dine-in' ? 'dine_in' : order.orderType,
        payment_method: order.paymentMethod || null,
        payment_status: order.paymentStatus || 'pending',
        order_date: new Date(),
        order_items: order.items.map(item => ({
          id: item.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
          quantity: item.quantity,
          options: item.options || [],
          menuItem: item.menuItem
        }))
      };


      const response = await fetch('/api/orders', getFetchOptions({
        method: 'POST',
        body: JSON.stringify(backendOrder),
      }));


      if (!response.ok) {
        const errorText = await response.text();
        console.error('OrderContext - HTTP error:', response.status, errorText);
        throw new Error(`Failed to create order: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      if (!result.success) {
        console.error('OrderContext - Failed to save order to database:', result.error);
        throw new Error(result.error || 'Failed to create order');
      }


      const savedOrder = result.data;

      // Add to local state after successful API save
      setOrders(prev => {
        const exists = prev.find(existingOrder => existingOrder.id === order.id);
        if (exists) {
          console.warn('OrderContext - Order already exists, skipping:', order.id);
          return prev;
        }
        return [...prev, savedOrder];
      });

      // Return the saved order with backend-generated order number
      return savedOrder;
    } catch (error) {
      console.error('OrderContext - Error saving order to database:', error);
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
        console.error('OrderContext - Failed to update order status:', result.error);
        throw new Error(result.error || 'Failed to update order status');
      }


      // Update local state after successful API update
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('OrderContext - Error updating order status:', error);
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
        console.error('OrderContext - Failed to delete order:', result.error);
        throw new Error(result.error || 'Failed to delete order');
      }


      // Update local state after successful API delete
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('OrderContext - Error deleting order:', error);
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