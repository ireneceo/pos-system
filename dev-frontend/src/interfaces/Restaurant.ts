export interface BaseRestaurant {
  id: string;
  name: string;
  branchName: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  brandId: string;
  brandName?: string;
  currency?: string;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface RestaurantWithSales extends BaseRestaurant {
  todaySales: number;
  yesterdaySales: number;
  weekSales: number;
  monthSales: number;
  todayOrders: number;
  averageOrderValue: number;
  topItems: Array<{ name: string; quantity: number; revenue: number }>;
  hourlyData: number[];
}

export interface RestaurantWithDetails extends BaseRestaurant {
  cuisine: string;
  plan: 'basic' | 'professional' | 'enterprise';
  todaySales: number;
  todayOrders: number;
  staffCount: number;
  rating: number;
  monthlyFee: number;
  subscription?: any;
}

export interface RestaurantWithStats extends BaseRestaurant {
  todaySales: number;
  todayOrders: number;
  staffCount: number;
  rating: number;
}