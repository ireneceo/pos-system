// Database Order interface
// Note: OrderCompleteModal은 라이브 오더에서 사용하지 않음 (POS Terminal 전용)
export interface DbOrder {
  id: number;
  restaurant_id: number;
  order_number: string;
  customer_name: string | null;
  customer_phone: string | null;
  table_number: string | null;
  guest_count?: number | null;
  pager_number: string | null;
  total_amount: number;
  status: 'outstanding' | 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  order_type: 'dine_in' | 'takeaway' | 'pickup' | 'delivery';
  scheduled_pickup_time?: string | null;
  payment_method: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'payment_verification_pending' | 'paid';
  kitchen_ready?: boolean;
  order_date: string;
  order_items: any;
  served_at?: string | null;
  source?: 'pos' | 'mobile' | 'kiosk' | null;
  cashier_id?: number | null;
  cashier_name?: string | null;
  customer_id?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyInfo {
  companyName: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  taxNo?: string;
  slug?: string;
}
