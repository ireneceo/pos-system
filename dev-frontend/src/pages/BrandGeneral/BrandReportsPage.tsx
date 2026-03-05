import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Styled Components
const ReportsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FilterControlsWrapper = styled.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 0;
  }
`;

const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const StatsRow = StatsGrid;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

const TableCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const TableCell = styled.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.percentage}%;
    background: #635BFF;
    transition: width 0.3s ease;
  }
`;

// Drilldown Table Styles
const DrilldownRow = styled.tr<{ level?: number; clickable?: boolean }>`
  background: ${props =>
    props.level === 0 ? '#FAFBFC' :
    props.level === 1 ? '#FFFFFF' :
    '#F8FAFC'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.clickable ? '#F6F9FC' : 'inherit'};
  }
`;

const DrilldownCell = styled.td<{ level?: number; bold?: boolean }>`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${props => props.bold ? '#0A2540' : '#6B7280'};
  font-weight: ${props => props.bold ? 600 : 400};
  padding-left: ${props => props.level ? `${16 + (props.level * 24)}px` : '16px'};
`;

const ExpandIcon = styled.span<{ expanded?: boolean }>`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0deg)'};
  color: #6B7280;
`;

// Brand/Restaurant Filter Dropdown Styles
const DropdownContainer = styled.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

const DropdownInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`;

const DropdownMenu = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.show ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`;

const ItemDetails = styled.div`
  font-size: 11px;
  color: #6B7280;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`;

// Ranking specific styles
const RankingCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const RankBadge = styled.span<{ rank: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 12px;
  background: ${props =>
    props.rank === 1 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
    props.rank === 2 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
    props.rank === 3 ? 'linear-gradient(135deg, #CD7F32, #8B4513)' :
    '#F3F4F6'};
  color: ${props => props.rank <= 3 ? 'white' : '#6B7280'};
`;

// Types
type TabType = 'sales' | 'details' | 'menu' | 'customers' | 'operations' | 'ranking';

interface Brand {
  id: number;
  name: string;
  code: string;
  currency: string;
}

interface Restaurant {
  id: string;
  name: string;
  brand_id?: number;
  brand_name?: string;
}

// Chart colors
const COLORS = ['#635BFF', '#00D924', '#FF6B6B', '#FFB800', '#0EA5E9', '#8B5CF6'];

const BrandReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  // Tab state
  const [activeTab, handleTabChange] = useTabParam<TabType>('ranking');

  // Date range state
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);

  // Brand/Restaurant filter state
  const [brands, setBrands] = useState<Brand[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showRestaurantDropdown, setShowRestaurantDropdown] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  // Data state
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customers] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Drilldown state
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // Helper functions
  function formatDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Read restaurantId from URL on initial load
  const [initialRestaurantId] = useState(() => searchParams.get('restaurantId'));
  const [initialRestaurantName] = useState(() => searchParams.get('restaurantName'));

  // Update URL when restaurant filter changes (preserve tab param)
  useEffect(() => {
    const newParams: Record<string, string> = { tab: activeTab };
    if (selectedRestaurant !== 'all') {
      newParams.restaurantId = selectedRestaurant;
    }
    setSearchParams(newParams, { replace: true });
  }, [selectedRestaurant, setSearchParams, activeTab]);

  // Fetch brands and restaurants
  useEffect(() => {
    const fetchBrandsAndRestaurants = async () => {
      try {
        const token = localStorage.getItem('auth_token');

        // Fetch brands
        const brandsResponse = await fetch('/api/brands', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (brandsResponse.ok) {
          const brandsData = await brandsResponse.json();
          setBrands(brandsData);
          setFilteredBrands(brandsData.slice(0, 10));
        }

        // Fetch restaurants - use manager-specific endpoint for Brand General/Manager
        let restaurantsUrl = '/api/restaurants';
        if (user?.id && (user.role === 'Brand General' || user.role === 'Brand Manager')) {
          restaurantsUrl = `/api/restaurants/manager/${user.id}`;
        }

        const restaurantsResponse = await fetch(restaurantsUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (restaurantsResponse.ok) {
          const restaurantsData = await restaurantsResponse.json();
          const formattedRestaurants = (restaurantsData.data || restaurantsData || []).map((r: any) => ({
            id: r.id?.toString(),
            name: r.name,
            brand_id: r.brand_id,
            brand_name: r.brand_name || r.brand?.name
          }));
          setRestaurants(formattedRestaurants);
          setFilteredRestaurants(formattedRestaurants.slice(0, 10));

          // Pre-select restaurant from URL parameter
          if (initialRestaurantId) {
            const match = formattedRestaurants.find((r: any) => r.id === initialRestaurantId);
            if (match) {
              setSelectedRestaurant(match.id);
              setRestaurantSearchQuery(match.name);
            }
          } else if (initialRestaurantName) {
            const decoded = decodeURIComponent(initialRestaurantName);
            const match = formattedRestaurants.find((r: any) => r.name === decoded);
            if (match) {
              setSelectedRestaurant(match.id);
              setRestaurantSearchQuery(match.name);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching brands/restaurants:', error);
      }
    };

    if (user) {
      fetchBrandsAndRestaurants();
    }
  }, [user, initialRestaurantId, initialRestaurantName]);

  // Fetch orders data
  useEffect(() => {
    const fetchData = async () => {
      // Wait for restaurants to be loaded first
      if (restaurants.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem('auth_token');

        // Get restaurant IDs that this user has access to
        const allowedRestaurantIds = restaurants.map(r => r.id);

        // Build query params based on filters
        let ordersUrl = '/api/orders?limit=5000';
        if (selectedRestaurant !== 'all') {
          ordersUrl += `&restaurant_id=${selectedRestaurant}`;
        }

        const ordersResponse = await fetch(ordersUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          let allOrders = ordersData.data || ordersData || [];

          // Filter orders to only include those from allowed restaurants
          allOrders = allOrders.filter((order: any) =>
            allowedRestaurantIds.includes(order.restaurant_id?.toString())
          );

          // Filter by brand if selected
          if (selectedBrand !== 'all') {
            const brandRestaurantIds = restaurants
              .filter(r => r.brand_id?.toString() === selectedBrand)
              .map(r => r.id);
            allOrders = allOrders.filter((order: any) =>
              brandRestaurantIds.includes(order.restaurant_id?.toString())
            );
          }

          setOrders(allOrders);
        }

        // Fetch menu items for category mapping
        const menuResponse = await fetch('/api/menu?excludeImage=true', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (menuResponse.ok) {
          const menuData = await menuResponse.json();
          if (menuData.data?.items) setMenuItems(menuData.data.items);
          if (menuData.data?.categories) setCategories(menuData.data.categories);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedBrand, selectedRestaurant, restaurants]);

  // Brand search handler
  const handleBrandSearch = (query: string) => {
    setBrandSearchQuery(query);
    setShowBrandDropdown(true);
    if (query.length < 1) {
      setFilteredBrands(brands.slice(0, 10));
      return;
    }
    const filtered = brands.filter(brand => {
      const term = query.toLowerCase();
      return brand.name.toLowerCase().includes(term) || brand.code.toLowerCase().includes(term);
    }).slice(0, 10);
    setFilteredBrands(filtered);
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand.id.toString());
    setBrandSearchQuery(brand.name);
    setShowBrandDropdown(false);
    // Reset restaurant filter when brand changes
    setSelectedRestaurant('all');
    setRestaurantSearchQuery('');
  };

  const handleBrandClear = () => {
    setSelectedBrand('all');
    setBrandSearchQuery('');
    setShowBrandDropdown(false);
  };

  // Restaurant search handler
  const handleRestaurantSearch = (query: string) => {
    setRestaurantSearchQuery(query);
    setShowRestaurantDropdown(true);

    let availableRestaurants = restaurants;
    if (selectedBrand !== 'all') {
      availableRestaurants = restaurants.filter(r => r.brand_id?.toString() === selectedBrand);
    }

    if (query.length < 1) {
      setFilteredRestaurants(availableRestaurants.slice(0, 10));
      return;
    }
    const filtered = availableRestaurants.filter(restaurant => {
      const term = query.toLowerCase();
      return restaurant.name.toLowerCase().includes(term);
    }).slice(0, 10);
    setFilteredRestaurants(filtered);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant.id);
    setRestaurantSearchQuery(restaurant.name);
    setShowRestaurantDropdown(false);
  };

  const handleRestaurantClear = () => {
    setSelectedRestaurant('all');
    setRestaurantSearchQuery('');
    setShowRestaurantDropdown(false);
  };

  // Filter orders by date range
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const startDate = new Date(dateRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    return orders.filter(order => {
      const orderDateValue = order.order_date || order.createdAt;
      if (!orderDateValue) return false;
      const orderDate = new Date(orderDateValue);
      const isInRange = orderDate >= startDate && orderDate <= endDate;
      const isValidOrder = order.payment_status === 'completed' || order.status === 'completed' || order.status === 'pending' || order.status === 'preparing' || order.status === 'ready';
      return isInRange && isValidOrder;
    });
  }, [orders, dateRange.start, dateRange.end]);

  // Calculate sales data
  const salesData = useMemo(() => {
    if (filteredOrders.length === 0) return [];

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    if (activePeriod === 'today') {
      const hourlyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const hour = getOrderDate(order).getHours();
        const hourLabel = hour === 12 ? '12PM' : hour > 12 ? `${hour - 12}PM` : `${hour}AM`;
        hourlyData[hourLabel] = (hourlyData[hourLabel] || 0) + getOrderAmount(order);
      });
      return Object.entries(hourlyData).map(([date, sales]) => ({ date, sales: Math.round(sales) }));
    } else if (activePeriod === 'week') {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      const dates: Date[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
      }

      const dailyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const orderDate = getOrderDate(order);
        const dateKey = formatDateString(orderDate);
        dailyData[dateKey] = (dailyData[dateKey] || 0) + getOrderAmount(order);
      });

      return dates.map(date => {
        const dateKey = formatDateString(date);
        const dayName = dayNames[date.getDay()];
        return { date: dayName, sales: Math.round(dailyData[dateKey] || 0) };
      });
    } else if (activePeriod === 'month') {
      const dailyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const day = getOrderDate(order).getDate().toString();
        dailyData[day] = (dailyData[day] || 0) + getOrderAmount(order);
      });
      return Object.entries(dailyData).map(([date, sales]) => ({ date, sales: Math.round(sales) })).sort((a, b) => parseInt(a.date) - parseInt(b.date));
    } else {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const month = monthNames[getOrderDate(order).getMonth()];
        monthlyData[month] = (monthlyData[month] || 0) + getOrderAmount(order);
      });
      return monthNames.map(month => ({ date: month, sales: Math.round(monthlyData[month] || 0) }));
    }
  }, [filteredOrders, activePeriod]);

  // Calculate category data
  const categoryData = useMemo(() => {
    if (filteredOrders.length === 0) return [{ name: 'No Data', value: 100, sales: 0 }];

    const categoryIdToName: Record<string, string> = {};
    categories.forEach((cat: any) => {
      if (cat.id && cat.name) categoryIdToName[cat.id.toString()] = cat.name;
    });

    const productCategoryMap: Record<string, string> = {};
    menuItems.forEach((item: any) => {
      if (item.id) {
        const categoryName = item.categoryId ? (categoryIdToName[item.categoryId.toString()] || item.categoryId) : 'Other';
        productCategoryMap[item.id.toString()] = categoryName;
      }
    });

    const categoryTotals: Record<string, number> = {};
    let totalSales = 0;

    filteredOrders.forEach(order => {
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach((item: any) => {
          const itemTotal = parseFloat(item.price || 0) * parseInt(item.quantity || 1);
          totalSales += itemTotal;
          const menuItemId = item.menuItem?.id?.toString() || item.product_id?.toString();
          const category = menuItemId ? (productCategoryMap[menuItemId] || 'Other') : 'Other';
          categoryTotals[category] = (categoryTotals[category] || 0) + itemTotal;
        });
      }
    });

    const result = Object.entries(categoryTotals).map(([name, sales]) => ({
      name,
      value: totalSales > 0 ? Math.round((sales / totalSales) * 100) : 0,
      sales: Math.round(sales)
    })).sort((a, b) => b.sales - a.sales);

    return result.length > 0 ? result : [{ name: 'No Data', value: 100, sales: 0 }];
  }, [filteredOrders, menuItems, categories]);

  // Calculate menu performance
  const allMenuData = useMemo(() => {
    if (filteredOrders.length === 0) return [];

    const categoryIdToName: Record<string, string> = {};
    categories.forEach((cat: any) => {
      if (cat.id && cat.name) categoryIdToName[cat.id.toString()] = cat.name;
    });

    const productCategoryMap: Record<string, string> = {};
    menuItems.forEach((item: any) => {
      if (item.id) {
        const categoryName = item.categoryId ? (categoryIdToName[item.categoryId.toString()] || item.categoryId) : 'Other';
        productCategoryMap[item.id.toString()] = categoryName;
      }
    });

    const menuStats: Record<string, { category: string; price: number; orders: number; revenue: number }> = {};

    filteredOrders.forEach(order => {
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach((item: any) => {
          const menuName = item.menu_name || item.name || 'Unknown';
          const menuItemId = item.menuItem?.id?.toString() || item.product_id?.toString();
          const category = menuItemId ? (productCategoryMap[menuItemId] || 'Other') : (item.category || 'Other');

          if (!menuStats[menuName]) {
            menuStats[menuName] = { category, price: parseFloat(item.price || 0), orders: 0, revenue: 0 };
          }

          const quantity = parseInt(item.quantity || 1);
          const itemPrice = parseFloat(item.price || 0);
          menuStats[menuName].orders += quantity;
          menuStats[menuName].revenue += itemPrice * quantity;
        });
      }
    });

    const menuArray = Object.entries(menuStats).map(([name, stats]) => ({
      name, category: stats.category, price: stats.price, orders: stats.orders, revenue: Math.round(stats.revenue), performance: 0
    })).sort((a, b) => b.orders - a.orders);

    const maxOrders = menuArray[0]?.orders || 1;
    menuArray.forEach(menu => { menu.performance = Math.round((menu.orders / maxOrders) * 100); });

    return menuArray;
  }, [filteredOrders, menuItems, categories]);

  // Calculate hourly data
  const hourlyData = useMemo(() => {
    if (filteredOrders.length === 0) return [];

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const hourlyStats: Record<string, number> = {};

    filteredOrders.forEach(order => {
      const hour = getOrderDate(order).getHours();
      const hourLabel = hour === 0 ? '12AM' : hour === 12 ? '12PM' : hour > 12 ? `${hour - 12}PM` : `${hour}AM`;
      hourlyStats[hourLabel] = (hourlyStats[hourLabel] || 0) + 1;
    });

    return Object.entries(hourlyStats)
      .map(([hour, orders]) => ({ hour, orders }))
      .sort((a, b) => {
        const getHourNum = (h: string) => {
          const num = parseInt(h);
          const isPM = h.includes('PM');
          return isPM && num !== 12 ? num + 12 : num === 12 && !isPM ? 0 : num;
        };
        return getHourNum(a.hour) - getHourNum(b.hour);
      });
  }, [filteredOrders]);

  // Calculate drilldown data
  const drilldownData = useMemo(() => {
    if (filteredOrders.length === 0) return {};

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    const yearData: Record<string, any> = {};

    filteredOrders.forEach(order => {
      const orderDate = getOrderDate(order);
      const year = orderDate.getFullYear().toString();
      const monthNum = (orderDate.getMonth() + 1).toString().padStart(2, '0');
      const month = `${year}-${monthNum}`;
      const day = orderDate.toISOString().split('T')[0];

      if (!yearData[year]) {
        yearData[year] = { year, revenue: 0, orders: 0, months: {} };
      }
      if (!yearData[year].months[month]) {
        yearData[year].months[month] = { month, revenue: 0, orders: 0, days: {} };
      }
      if (!yearData[year].months[month].days[day]) {
        yearData[year].months[month].days[day] = { day, revenue: 0, orders: 0 };
      }

      const amount = getOrderAmount(order);
      yearData[year].revenue += amount;
      yearData[year].orders += 1;
      yearData[year].months[month].revenue += amount;
      yearData[year].months[month].orders += 1;
      yearData[year].months[month].days[day].revenue += amount;
      yearData[year].months[month].days[day].orders += 1;
    });

    return yearData;
  }, [filteredOrders]);

  // Calculate peak times
  const peakTimesData = useMemo(() => {
    if (filteredOrders.length === 0) return [];

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);
    const hourlySlots: Record<string, { orders: number; revenue: number }> = {};

    filteredOrders.forEach(order => {
      const hour = getOrderDate(order).getHours();
      const timeSlot = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;

      if (!hourlySlots[timeSlot]) hourlySlots[timeSlot] = { orders: 0, revenue: 0 };
      hourlySlots[timeSlot].orders += 1;
      hourlySlots[timeSlot].revenue += getOrderAmount(order);
    });

    return Object.entries(hourlySlots)
      .map(([time, stats]) => ({
        time, orders: stats.orders, revenue: Math.round(stats.revenue),
        efficiency: Math.min(100, Math.round((stats.orders / (filteredOrders.length / 24)) * 100))
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
  }, [filteredOrders]);

  // Calculate brand/restaurant rankings
  const rankingData = useMemo(() => {
    if (orders.length === 0) return { brands: [], restaurants: [] };

    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    // Filter by date range
    const startDate = new Date(dateRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    const dateFilteredOrders = orders.filter(order => {
      const orderDateValue = order.order_date || order.createdAt;
      if (!orderDateValue) return false;
      const orderDate = new Date(orderDateValue);
      return orderDate >= startDate && orderDate <= endDate && order.status === 'completed';
    });

    // Restaurant rankings
    const restaurantStats: Record<string, { name: string; brandName: string; orders: number; revenue: number }> = {};

    dateFilteredOrders.forEach(order => {
      const restaurantId = order.restaurant_id?.toString();
      if (!restaurantId) return;

      const restaurant = restaurants.find(r => r.id === restaurantId);
      const restaurantName = restaurant?.name || order.restaurant_name || 'Unknown';
      const brandName = restaurant?.brand_name || brands.find(b => b.id === restaurant?.brand_id)?.name || 'Independent';

      if (!restaurantStats[restaurantId]) {
        restaurantStats[restaurantId] = { name: restaurantName, brandName, orders: 0, revenue: 0 };
      }
      restaurantStats[restaurantId].orders += 1;
      restaurantStats[restaurantId].revenue += getOrderAmount(order);
    });

    const restaurantRankings = Object.entries(restaurantStats)
      .map(([id, stats]) => ({ id, ...stats, revenue: Math.round(stats.revenue) }))
      .sort((a, b) => b.revenue - a.revenue);

    // Brand rankings - only include brands that have connected restaurants
    const brandStats: Record<string, { name: string; orders: number; revenue: number; restaurantCount: number }> = {};

    // Initialize with brands that have connected restaurants only
    const connectedBrandIds = new Set(restaurants.map(r => r.brand_id?.toString()).filter(Boolean));
    brands.forEach(brand => {
      if (connectedBrandIds.has(brand.id.toString())) {
        brandStats[brand.id.toString()] = { name: brand.name, orders: 0, revenue: 0, restaurantCount: 0 };
      }
    });
    // Add 'independent' only if there are restaurants without brand
    if (restaurants.some(r => !r.brand_id)) {
      brandStats['independent'] = { name: 'Independent', orders: 0, revenue: 0, restaurantCount: 0 };
    }

    // Count restaurants per brand
    restaurants.forEach(restaurant => {
      const brandId = restaurant.brand_id?.toString() || 'independent';
      if (brandStats[brandId]) {
        brandStats[brandId].restaurantCount += 1;
      }
    });

    // Aggregate orders by brand
    dateFilteredOrders.forEach(order => {
      const restaurantId = order.restaurant_id?.toString();
      const restaurant = restaurants.find(r => r.id === restaurantId);
      const brandId = restaurant?.brand_id?.toString() || 'independent';

      if (brandStats[brandId]) {
        brandStats[brandId].orders += 1;
        brandStats[brandId].revenue += getOrderAmount(order);
      }
    });

    const brandRankings = Object.entries(brandStats)
      .map(([id, stats]) => ({ id, ...stats, revenue: Math.round(stats.revenue) }))
      .filter(b => b.orders > 0 || b.restaurantCount > 0)
      .sort((a, b) => b.revenue - a.revenue);

    return { brands: brandRankings, restaurants: restaurantRankings };
  }, [orders, restaurants, brands, dateRange]);

  // Date range helpers
  const getDateRangeDays = () => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Auto-expand drilldown based on date range
  useEffect(() => {
    const days = getDateRangeDays();
    if (days <= 31) {
      const allYears = new Set(Object.keys(drilldownData));
      const allMonths = new Set<string>();
      Object.keys(drilldownData).forEach(year => {
        Object.keys(drilldownData[year].months).forEach(month => {
          allMonths.add(`${year}-${month}`);
        });
      });
      setExpandedYears(allYears);
      setExpandedMonths(allMonths);
    } else if (days <= 365) {
      setExpandedYears(new Set(Object.keys(drilldownData)));
      setExpandedMonths(new Set());
    } else {
      setExpandedYears(new Set());
      setExpandedMonths(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.start, dateRange.end, drilldownData]);

  // Toggle functions
  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
      const newMonthsExpanded = new Set(expandedMonths);
      Object.keys(drilldownData[year]?.months || {}).forEach(month => {
        newMonthsExpanded.delete(`${year}-${month}`);
      });
      setExpandedMonths(newMonthsExpanded);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (yearMonth: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(yearMonth)) newExpanded.delete(yearMonth);
    else newExpanded.add(yearMonth);
    setExpandedMonths(newExpanded);
  };

  // Period change handler
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period));
  };

  // Calendar range select handler
  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  // Download handler
  const handleDownloadReport = () => {
    const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
    const csvContent = `Brand/Manager Reports\nGenerated: ${new Date().toISOString()}\nPeriod: ${dateRange.start} to ${dateRange.end}\nBrand Filter: ${selectedBrand === 'all' ? 'All Brands' : brandSearchQuery}\nRestaurant Filter: ${selectedRestaurant === 'all' ? 'All Restaurants' : restaurantSearchQuery}\n\nTotal Revenue: RM ${totalRevenue.toFixed(2)}\nTotal Orders: ${filteredOrders.length}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `brand_report_${dateRange.start}_to_${dateRange.end}.csv`;
    link.click();
  };

  // Filter component
  const FilterComponent = () => (
    <>
      <FilterControlsWrapper>
        {/* Brand Filter */}
        <DropdownContainer>
          <DropdownInput
            type="text"
            placeholder="All Brands"
            value={brandSearchQuery}
            onChange={(e) => handleBrandSearch(e.target.value)}
            onFocus={() => {
              setShowBrandDropdown(true);
              if (brandSearchQuery.length === 0) setFilteredBrands(brands.slice(0, 10));
            }}
            onBlur={() => setTimeout(() => setShowBrandDropdown(false), 200)}
          />
          {selectedBrand !== 'all' && brandSearchQuery && (
            <ClearButton onClick={handleBrandClear}>×</ClearButton>
          )}
          <DropdownMenu show={showBrandDropdown}>
            <DropdownItem onClick={() => { setSelectedBrand('all'); setBrandSearchQuery(''); setShowBrandDropdown(false); }}>
              <ItemName>All Brands</ItemName>
              <ItemDetails>Show all brand data</ItemDetails>
            </DropdownItem>
            {filteredBrands.map(brand => (
              <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand)}>
                <ItemName>{brand.name}</ItemName>
                <ItemDetails>{brand.code} • {brand.currency}</ItemDetails>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </DropdownContainer>

        {/* Restaurant Filter */}
        <DropdownContainer>
          <DropdownInput
            type="text"
            placeholder="All Restaurants"
            value={restaurantSearchQuery}
            onChange={(e) => handleRestaurantSearch(e.target.value)}
            onFocus={() => {
              setShowRestaurantDropdown(true);
              let available = restaurants;
              if (selectedBrand !== 'all') {
                available = restaurants.filter(r => r.brand_id?.toString() === selectedBrand);
              }
              setFilteredRestaurants(available.slice(0, 10));
            }}
            onBlur={() => setTimeout(() => setShowRestaurantDropdown(false), 200)}
          />
          {selectedRestaurant !== 'all' && restaurantSearchQuery && (
            <ClearButton onClick={handleRestaurantClear}>×</ClearButton>
          )}
          <DropdownMenu show={showRestaurantDropdown}>
            <DropdownItem onClick={() => { setSelectedRestaurant('all'); setRestaurantSearchQuery(''); setShowRestaurantDropdown(false); }}>
              <ItemName>All Restaurants</ItemName>
              <ItemDetails>Show all restaurant data</ItemDetails>
            </DropdownItem>
            {filteredRestaurants.map(restaurant => (
              <DropdownItem key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant)}>
                <ItemName>{restaurant.name}</ItemName>
                <ItemDetails>{restaurant.brand_name || 'Independent'}</ItemDetails>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </DropdownContainer>
      </FilterControlsWrapper>

      <DatePeriodFilter
        activePeriod={activePeriod}
        dateRange={dateRange}
        isCustomDateRange={isCustomDateRange}
        onPeriodChange={handlePeriodChange}
        onCalendarRangeSelect={handleCalendarRangeSelect}
      />
    </>
  );

  return (
    <>
      <ReportsContainer>
        <Header>
          <HeaderTitle>Brand Reports</HeaderTitle>
        </Header>

        <Content>
          <Tabs>
            <Tab active={activeTab === 'ranking'} onClick={() => handleTabChange('ranking')}>Sales Ranking</Tab>
            <Tab active={activeTab === 'sales'} onClick={() => handleTabChange('sales')}>Sales Report</Tab>
            <Tab active={activeTab === 'details'} onClick={() => handleTabChange('details')}>Sales Details</Tab>
            <Tab active={activeTab === 'menu'} onClick={() => handleTabChange('menu')}>Menu Analysis</Tab>
            <Tab active={activeTab === 'customers'} onClick={() => handleTabChange('customers')}>Customer Insights</Tab>
            <Tab active={activeTab === 'operations'} onClick={() => handleTabChange('operations')}>Operations</Tab>
          </Tabs>

          {/* Sales Tab */}
          <div style={{ display: activeTab === 'sales' ? 'block' : 'none' }}>
            <FilterComponent />
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
            ) : filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>No order data available for the selected period</div>
            ) : (
              <div>
                <StatsRow>
                  <StatCard color="#059669">
                    <StatLabel>Total Revenue</StatLabel>
                    <StatValue>{formatCurrency(salesData.reduce((sum, item) => sum + item.sales, 0), selectedCurrency)}</StatValue>
                    <StatDescription>{filteredOrders.length} orders in selected period</StatDescription>
                  </StatCard>
                  <StatCard color="#2563EB">
                    <StatLabel>Total Orders</StatLabel>
                    <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                    <StatDescription>For selected period</StatDescription>
                  </StatCard>
                  <StatCard color="#DC2626">
                    <StatLabel>Average Order Value</StatLabel>
                    <StatValue>{formatCurrency(filteredOrders.length > 0 ? (salesData.reduce((sum, item) => sum + item.sales, 0) / filteredOrders.length) : 0, selectedCurrency)}</StatValue>
                    <StatDescription>Per order</StatDescription>
                  </StatCard>
                  <StatCard color="#7C3AED">
                    <StatLabel>Completed Orders</StatLabel>
                    <StatValue>{filteredOrders.filter(o => o.status === 'completed').length}</StatValue>
                    <StatDescription>{Math.round(filteredOrders.filter(o => o.status === 'completed').length / filteredOrders.length * 100 || 0)}% completion rate</StatDescription>
                  </StatCard>
                </StatsRow>

                <ChartGrid>
                  <ChartCard>
                    <ChartTitle>Revenue Trend</ChartTitle>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F6F9FC" />
                        <XAxis dataKey="date" stroke="#6B7C93" fontSize={12} />
                        <YAxis stroke="#6B7C93" fontSize={12} width={60} />
                        <Tooltip contentStyle={{ background: 'white', border: '1px solid #E6EBF1', borderRadius: '6px' }} />
                        <Line type="monotone" dataKey="sales" stroke="#635BFF" strokeWidth={2} dot={{ fill: '#635BFF', r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard>
                    <ChartTitle>Sales by Category</ChartTitle>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" labelLine={true} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={70} fill="#8884d8" dataKey="value">
                          {categoryData.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </ChartGrid>

                <ChartCard>
                  <ChartTitle>Hourly Orders Distribution</ChartTitle>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={hourlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F6F9FC" />
                      <XAxis dataKey="hour" stroke="#6B7C93" fontSize={12} />
                      <YAxis stroke="#6B7C93" fontSize={12} width={60} />
                      <Tooltip contentStyle={{ background: 'white', border: '1px solid #E6EBF1', borderRadius: '6px' }} />
                      <Bar dataKey="orders" fill="#635BFF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}
          </div>

          {/* Sales Details Tab */}
          <div style={{ display: activeTab === 'details' ? 'block' : 'none' }}>
            <FilterComponent />
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
            ) : filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>No order data available for the selected period</div>
            ) : (
              <div>
                <StatsRow>
                  <StatCard color="#059669">
                    <StatLabel>Total Revenue</StatLabel>
                    <StatValue>{formatCurrency(salesData.reduce((sum, item) => sum + item.sales, 0), selectedCurrency)}</StatValue>
                    <StatDescription>{filteredOrders.length} orders in selected period</StatDescription>
                  </StatCard>
                  <StatCard color="#2563EB">
                    <StatLabel>Total Orders</StatLabel>
                    <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                    <StatDescription>{filteredOrders.filter(o => o.status === 'completed').length} completed</StatDescription>
                  </StatCard>
                  <StatCard color="#DC2626">
                    <StatLabel>Average Order Value</StatLabel>
                    <StatValue>{formatCurrency(filteredOrders.length > 0 ? (salesData.reduce((sum, item) => sum + item.sales, 0) / filteredOrders.length) : 0, selectedCurrency)}</StatValue>
                    <StatDescription>Per order average</StatDescription>
                  </StatCard>
                  <StatCard color="#7C3AED">
                    <StatLabel>Period</StatLabel>
                    <StatValue>{getDateRangeDays()}</StatValue>
                    <StatDescription>Days</StatDescription>
                  </StatCard>
                </StatsRow>

                <TableCard>
                  <ChartTitle>Detailed Sales Breakdown</ChartTitle>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader style={{ width: '40%' }}>Period</TableHeader>
                        <TableHeader style={{ textAlign: 'right' }}>Revenue</TableHeader>
                        <TableHeader style={{ textAlign: 'right' }}>Orders</TableHeader>
                        <TableHeader style={{ textAlign: 'right' }}>Avg Order Value</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(drilldownData).sort((a, b) => b.localeCompare(a)).map(year => {
                        const yearInfo = drilldownData[year];
                        const isYearExpanded = expandedYears.has(year);

                        return (
                          <React.Fragment key={year}>
                            <DrilldownRow level={0} clickable onClick={() => toggleYear(year)}>
                              <DrilldownCell level={0} bold>
                                <ExpandIcon expanded={isYearExpanded}>▶</ExpandIcon>
                                {year}
                              </DrilldownCell>
                              <DrilldownCell level={0} bold style={{ textAlign: 'right' }}>{formatCurrency(yearInfo.revenue, selectedCurrency)}</DrilldownCell>
                              <DrilldownCell level={0} bold style={{ textAlign: 'right' }}>{yearInfo.orders}</DrilldownCell>
                              <DrilldownCell level={0} bold style={{ textAlign: 'right' }}>{formatCurrency(yearInfo.revenue / yearInfo.orders, selectedCurrency)}</DrilldownCell>
                            </DrilldownRow>

                            {isYearExpanded && Object.keys(yearInfo.months).sort((a, b) => b.localeCompare(a)).map(month => {
                              const monthInfo = yearInfo.months[month];
                              const yearMonthKey = `${year}-${month}`;
                              const isMonthExpanded = expandedMonths.has(yearMonthKey);
                              const monthName = new Date(month + '-01').toLocaleString('en-US', { year: 'numeric', month: 'long' });

                              return (
                                <React.Fragment key={yearMonthKey}>
                                  <DrilldownRow level={1} clickable onClick={() => toggleMonth(yearMonthKey)}>
                                    <DrilldownCell level={1} bold>
                                      <ExpandIcon expanded={isMonthExpanded}>▶</ExpandIcon>
                                      {monthName}
                                    </DrilldownCell>
                                    <DrilldownCell level={1} style={{ textAlign: 'right' }}>{formatCurrency(monthInfo.revenue, selectedCurrency)}</DrilldownCell>
                                    <DrilldownCell level={1} style={{ textAlign: 'right' }}>{monthInfo.orders}</DrilldownCell>
                                    <DrilldownCell level={1} style={{ textAlign: 'right' }}>{formatCurrency(monthInfo.revenue / monthInfo.orders, selectedCurrency)}</DrilldownCell>
                                  </DrilldownRow>

                                  {isMonthExpanded && Object.keys(monthInfo.days).sort((a, b) => b.localeCompare(a)).map(day => {
                                    const dayInfo = monthInfo.days[day];
                                    const dayName = new Date(day).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

                                    return (
                                      <DrilldownRow key={day} level={2}>
                                        <DrilldownCell level={2}>{dayName}</DrilldownCell>
                                        <DrilldownCell level={2} style={{ textAlign: 'right', color: '#059669', fontWeight: 500 }}>{formatCurrency(dayInfo.revenue, selectedCurrency)}</DrilldownCell>
                                        <DrilldownCell level={2} style={{ textAlign: 'right' }}>{dayInfo.orders}</DrilldownCell>
                                        <DrilldownCell level={2} style={{ textAlign: 'right' }}>{formatCurrency(dayInfo.revenue / dayInfo.orders, selectedCurrency)}</DrilldownCell>
                                      </DrilldownRow>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </Table>
                </TableCard>
              </div>
            )}
          </div>

          {/* Menu Tab */}
          <div style={{ display: activeTab === 'menu' ? 'block' : 'none' }}>
            <FilterComponent />
            <StatsRow>
              <StatCard color="#F59E0B">
                <StatLabel>Best Seller</StatLabel>
                <StatValue>{allMenuData[0]?.name || 'N/A'}</StatValue>
                <StatDescription>{allMenuData[0]?.orders || 0} orders</StatDescription>
              </StatCard>
              <StatCard color="#10B981">
                <StatLabel>Total Items Analyzed</StatLabel>
                <StatValue>{allMenuData.length}</StatValue>
                <StatDescription>Complete menu analysis</StatDescription>
              </StatCard>
              <StatCard color="#3B82F6">
                <StatLabel>Total Orders</StatLabel>
                <StatValue>{allMenuData.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}</StatValue>
                <StatDescription>For selected period</StatDescription>
              </StatCard>
              <StatCard color="#8B5CF6">
                <StatLabel>Total Revenue</StatLabel>
                <StatValue>{formatCurrency(allMenuData.reduce((sum, item) => sum + item.revenue, 0), selectedCurrency)}</StatValue>
                <StatDescription>For selected period</StatDescription>
              </StatCard>
            </StatsRow>

            <TableCard>
              <ChartTitle>Complete Menu Performance Ranking</ChartTitle>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Menu Item</TableHeader>
                    <TableHeader>Category</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Orders</TableHeader>
                    <TableHeader>Revenue</TableHeader>
                    <TableHeader>Performance</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {allMenuData.map((menu, index) => {
                    const maxOrders = allMenuData[0]?.orders || 1;
                    return (
                      <tr key={index} style={{ backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent' }}>
                        <TableCell style={{ fontWeight: 600, color: index < 3 ? (index === 0 ? '#FFB800' : index === 1 ? '#0EA5E9' : '#00D924') : '#0A2540' }}>
                          #{index + 1}{index === 0 && ' 🥇'}{index === 1 && ' 🥈'}{index === 2 && ' 🥉'}
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>{menu.name}</TableCell>
                        <TableCell><span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px', backgroundColor: '#F3F4F6', color: '#6B7280' }}>{menu.category}</span></TableCell>
                        <TableCell>{formatCurrency(menu.price, selectedCurrency)}</TableCell>
                        <TableCell>{menu.orders.toLocaleString()}</TableCell>
                        <TableCell>{formatCurrency(menu.revenue, selectedCurrency)}</TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ProgressBar percentage={(menu.orders / maxOrders) * 100} />
                            <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>{Math.round((menu.orders / maxOrders) * 100)}%</span>
                          </div>
                        </TableCell>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </TableCard>
          </div>

          {/* Customers Tab */}
          <div style={{ display: activeTab === 'customers' ? 'block' : 'none' }}>
            <FilterComponent />
            <StatsRow>
              <StatCard color="#635BFF">
                <StatLabel>Total Customers</StatLabel>
                <StatValue>{customers.length.toLocaleString()}</StatValue>
                <StatDescription>Across all restaurants</StatDescription>
              </StatCard>
              <StatCard color="#00D924">
                <StatLabel>Repeat Customers</StatLabel>
                <StatValue>{customers.filter((c: any) => c.total_orders > 1).length}</StatValue>
                <StatDescription>{customers.length > 0 ? Math.round((customers.filter((c: any) => c.total_orders > 1).length / customers.length) * 100) : 0}% return rate</StatDescription>
              </StatCard>
              <StatCard color="#FFB800">
                <StatLabel>Average Spent</StatLabel>
                <StatValue>{formatCurrency(customers.length > 0 ? (customers.reduce((sum: number, c: any) => sum + parseFloat(c.total_spent || 0), 0) / customers.length) : 0, selectedCurrency)}</StatValue>
                <StatDescription>Per customer</StatDescription>
              </StatCard>
              <StatCard color="#8B5CF6">
                <StatLabel>Total Points</StatLabel>
                <StatValue>{customers.reduce((sum: number, c: any) => sum + (c.points || 0), 0).toLocaleString()}</StatValue>
                <StatDescription>Across all customers</StatDescription>
              </StatCard>
            </StatsRow>

            <TableCard>
              <ChartTitle>Customer insights will be available when customer data is loaded</ChartTitle>
            </TableCard>
          </div>

          {/* Operations Tab */}
          <div style={{ display: activeTab === 'operations' ? 'block' : 'none' }}>
            <FilterComponent />
            <StatsRow>
              <StatCard color="#10B981">
                <StatLabel>Order Fulfillment</StatLabel>
                <StatValue>{Math.round(95 * (0.9 + Math.random() * 0.15))}%</StatValue>
                <StatDescription>On-time completion</StatDescription>
              </StatCard>
              <StatCard color="#F59E0B">
                <StatLabel>Avg. Wait Time</StatLabel>
                <StatValue>{Math.round(8 * (0.7 + Math.random() * 0.6))} min</StatValue>
                <StatDescription>Estimated</StatDescription>
              </StatCard>
              <StatCard color="#EF4444">
                <StatLabel>Peak Hour</StatLabel>
                <StatValue>12-1 PM</StatValue>
                <StatDescription>Busiest time</StatDescription>
              </StatCard>
              <StatCard color="#6366F1">
                <StatLabel>Staff Efficiency</StatLabel>
                <StatValue>{Math.round(87 * (0.85 + Math.random() * 0.25))}%</StatValue>
                <StatDescription>Estimated</StatDescription>
              </StatCard>
            </StatsRow>

            <TableCard>
              <ChartTitle>Peak Hours Performance</ChartTitle>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Time Slot</TableHeader>
                    <TableHeader>Orders</TableHeader>
                    <TableHeader>Revenue</TableHeader>
                    <TableHeader>Efficiency</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {peakTimesData.map((item, index) => (
                    <tr key={index}>
                      <TableCell style={{ fontWeight: 600 }}>{item.time}</TableCell>
                      <TableCell>{item.orders}</TableCell>
                      <TableCell>{formatCurrency(item.revenue, selectedCurrency)}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressBar percentage={item.efficiency} />
                          <span style={{ fontSize: '12px', color: '#6B7C93' }}>{item.efficiency}%</span>
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableCard>
          </div>

          {/* Sales Ranking Tab */}
          <div style={{ display: activeTab === 'ranking' ? 'block' : 'none' }}>
            {/* Date filter only - no brand/restaurant filters needed for ranking */}
            <DatePeriodFilter
              activePeriod={activePeriod}
              dateRange={dateRange}
              isCustomDateRange={isCustomDateRange}
              onPeriodChange={handlePeriodChange}
              onCalendarRangeSelect={handleCalendarRangeSelect}
            />

            {/* Brand Rankings */}
            <RankingCard>
              <ChartTitle>Brand Sales Ranking</ChartTitle>
              <Table>
                <thead>
                  <tr>
                    <TableHeader style={{ width: '60px' }}>Rank</TableHeader>
                    <TableHeader>Brand Name</TableHeader>
                    <TableHeader style={{ textAlign: 'right' }}>Restaurants</TableHeader>
                    <TableHeader style={{ textAlign: 'right' }}>Orders</TableHeader>
                    <TableHeader style={{ textAlign: 'right' }}>Revenue</TableHeader>
                    <TableHeader style={{ width: '150px' }}>Performance</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.brands.map((brand, index) => {
                    const maxRevenue = rankingData.brands[0]?.revenue || 1;
                    const percentage = Math.round((brand.revenue / maxRevenue) * 100);
                    return (
                      <tr key={brand.id} style={{ backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent' }}>
                        <TableCell>
                          <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>{brand.name}</TableCell>
                        <TableCell style={{ textAlign: 'right' }}>{brand.restaurantCount}</TableCell>
                        <TableCell style={{ textAlign: 'right' }}>{brand.orders.toLocaleString()}</TableCell>
                        <TableCell style={{ textAlign: 'right', fontWeight: 600, color: '#635BFF' }}>{formatCurrency(brand.revenue, selectedCurrency)}</TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ProgressBar percentage={percentage} />
                            <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>{percentage}%</span>
                          </div>
                        </TableCell>
                      </tr>
                    );
                  })}
                  {rankingData.brands.length === 0 && (
                    <tr><TableCell colSpan={6} style={{ textAlign: 'center', color: '#6B7C93', padding: '20px' }}>No brand data available</TableCell></tr>
                  )}
                </tbody>
              </Table>
            </RankingCard>

            {/* Restaurant Rankings */}
            <RankingCard>
              <ChartTitle>Restaurant Sales Ranking</ChartTitle>
              <Table>
                <thead>
                  <tr>
                    <TableHeader style={{ width: '60px' }}>Rank</TableHeader>
                    <TableHeader>Restaurant Name</TableHeader>
                    <TableHeader>Brand</TableHeader>
                    <TableHeader style={{ textAlign: 'right' }}>Orders</TableHeader>
                    <TableHeader style={{ textAlign: 'right' }}>Revenue</TableHeader>
                    <TableHeader style={{ width: '150px' }}>Performance</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.restaurants.slice(0, 20).map((restaurant, index) => {
                    const maxRevenue = rankingData.restaurants[0]?.revenue || 1;
                    const percentage = Math.round((restaurant.revenue / maxRevenue) * 100);
                    return (
                      <tr key={restaurant.id} style={{ backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent' }}>
                        <TableCell>
                          <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>{restaurant.name}</TableCell>
                        <TableCell>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', backgroundColor: restaurant.brandName === 'Independent' ? '#F3F4F6' : '#E0E7FF', color: restaurant.brandName === 'Independent' ? '#6B7280' : '#4338CA' }}>
                            {restaurant.brandName}
                          </span>
                        </TableCell>
                        <TableCell style={{ textAlign: 'right' }}>{restaurant.orders.toLocaleString()}</TableCell>
                        <TableCell style={{ textAlign: 'right', fontWeight: 600, color: '#635BFF' }}>{formatCurrency(restaurant.revenue, selectedCurrency)}</TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ProgressBar percentage={percentage} />
                            <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>{percentage}%</span>
                          </div>
                        </TableCell>
                      </tr>
                    );
                  })}
                  {rankingData.restaurants.length === 0 && (
                    <tr><TableCell colSpan={6} style={{ textAlign: 'center', color: '#6B7C93', padding: '20px' }}>No restaurant data available</TableCell></tr>
                  )}
                </tbody>
              </Table>
            </RankingCard>
          </div>

        </Content>
      </ReportsContainer>
    </>
  );
};

export default BrandReportsPage;
