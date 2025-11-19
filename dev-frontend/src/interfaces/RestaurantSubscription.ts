// Restaurant별 독립 구독 모델
export interface RestaurantSubscription {
  id: string;
  restaurantId: string;
  restaurantName: string;
  location?: string;
  managerId: string;
  managerName: string;

  // 구독 정보
  planType: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled';
  startDate: string;
  endDate: string;
  
  // 요금 정보
  monthlyFee: number;
  annualFee: number;
  billingCycle: 'monthly' | 'annual';
  
  // 사용량 정보
  orderLimit: number;
  currentOrders: number;
  usagePercentage: number;
  
  // 결제 정보
  paymentModel: 'self' | 'manager'; // 자체결제 vs 매니저 대행결제
  payerId: string; // 실제 결제 담당자 ID
  payerName: string;
  
  // 기타
  features: string[];
  lastPayment: string;
  nextPayment: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

// Restaurant 기본 정보 (구독과 분리)
export interface Restaurant {
  id: string;
  name: string;
  managerId: string;
  managerName: string;
  address: string;
  phone: string;
  email: string;
  category: string;
  
  // 운영 정보
  status: 'active' | 'inactive' | 'maintenance';
  staffCount: number;
  averageRating: number;
  
  // 성과 지표
  monthlyOrders: number;
  monthlySales: number;
  
  createdAt: string;
  lastActive: string;
}

// Manager 정보 (구독 관리 중심으로 변경)
export interface Manager {
  id: string;
  companyName: string;
  email: string;
  contactPerson: string;
  phone: string;
  address: string;
  
  // 관리 정보
  restaurantCount: number;
  totalRevenue: number;
  
  // 결제 대행 정보
  canPayForRestaurants: boolean; // 레스토랑 대신 결제 가능 여부
  paymentMethod?: {
    type: 'card' | 'bank_transfer';
    details: string;
  };
  
  createdAt: string;
  lastActive: string;
}

// 플랜 정보
export interface SubscriptionPlan {
  id: string;
  name: string;
  displayName: string;
  monthlyPrice: number;
  annualPrice: number;
  orderLimit: number;
  features: string[];
  isActive: boolean;
  description: string;
}

// 청구서 (Restaurant별)
export interface RestaurantInvoice {
  id: string;
  invoiceNumber: string;
  restaurantId: string;
  restaurantName: string;
  managerId: string;
  
  // 결제 정보
  payerId: string; // Restaurant ID or Manager ID
  payerName: string;
  payerType: 'restaurant' | 'manager';
  
  // 청구 내역
  planType: string;
  billingPeriod: string;
  amount: number;
  tax: number;
  total: number;
  
  // 상태
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
}