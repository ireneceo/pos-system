// CustomerContext 공유 타입 정의

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
