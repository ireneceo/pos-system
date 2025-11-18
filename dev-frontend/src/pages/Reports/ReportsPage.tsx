import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { getRestaurantTimezone, getNow, formatDateTime } from '../../utils/timezone';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// 스타일 컴포넌트
const ReportsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const DateRangeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const CustomDateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`;

const FilterControls = styled.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 16px 0;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#5A51E6' : '#F8FAFC'};
  }
`;




const DownloadButton = styled.button`
  padding: 12px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #5A51E6;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;


const Content = styled.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// TabContainer and Tab components now imported from ../../components/UI

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

// 타입 정의
type TabType = 'sales' | 'details' | 'menu' | 'customers' | 'operations';
type PeriodType = 'today' | 'week' | 'month' | 'year' | 'all';

// 차트 색상
const COLORS = ['#635BFF', '#00D924', '#FF6B6B', '#FFB800', '#0EA5E9', '#8B5CF6'];

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { operationSettings } = useStore();

  // Helper function to get current date in restaurant's timezone
  const getTodayInRestaurantTZ = (): Date => {
    const timezone = getRestaurantTimezone(operationSettings);
    const nowUTC = new Date();

    // Get the current time in the restaurant's timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const parts = formatter.formatToParts(nowUTC);
    const year = parseInt(parts.find(p => p.type === 'year')?.value || '0');
    const month = parseInt(parts.find(p => p.type === 'month')?.value || '0');
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '0');

    // Return a Date object representing today in the restaurant's timezone
    // Note: This Date object is in local time, but represents the restaurant's "today"
    return new Date(year, month - 1, day);
  };

  // Helper function to format date to YYYY-MM-DD string
  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // localStorage에서 마지막 활성 탭 복원
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const tabFromUrl = searchParams.get('tab') as TabType;
    return tabFromUrl || 'sales';
  });

  // Update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab }, { replace: true });
  }, [activeTab, setSearchParams]);

  const [activePeriod, setActivePeriod] = useState<PeriodType>('week');
  const [dateRange, setDateRange] = useState(() => {
    // Use restaurant timezone for date calculations
    // Note: Initial render uses default timezone, will be updated after operationSettings loads
    const today = new Date();
    const localToday = formatDateString(today);

    // Get 6 days ago (today + 6 previous days = 7 days total, ending today)
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);
    const localWeekAgo = formatDateString(weekAgo);

    return {
      start: localWeekAgo,
      end: localToday
    };
  });
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Drilldown state for Sales Details tab
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // activeTab 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('reports_active_tab', activeTab);
  }, [activeTab]);

  // Re-initialize date range when operationSettings loads (to apply correct timezone)
  useEffect(() => {
    if (operationSettings && !isCustomDateRange) {
      handlePeriodChange(activePeriod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationSettings?.timeZone]);

  // Filter orders by date range
  const getFilteredOrders = () => {
    if (!orders || orders.length === 0) {
      return [];
    }

    const startDate = new Date(dateRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    const filtered = orders.filter(order => {
      // Check date fields: order_date or createdAt (database columns)
      const orderDateValue = order.order_date || order.createdAt;
      if (!orderDateValue) {
        return false;
      }
      const orderDate = new Date(orderDateValue);
      const isInRange = orderDate >= startDate && orderDate <= endDate;

      // Only include COMPLETED orders for reports
      const isCompleted = order.status === 'completed';

      return isInRange && isCompleted;
    });

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  // Calculate sales data from real orders
  const getSalesData = () => {
    if (filteredOrders.length === 0) return [];

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    if (activePeriod === 'today') {
      // Group by hour
      const hourlyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const hour = getOrderDate(order).getHours();
        const hourLabel = hour === 12 ? '12PM' : hour > 12 ? `${hour - 12}PM` : `${hour}AM`;
        hourlyData[hourLabel] = (hourlyData[hourLabel] || 0) + getOrderAmount(order);
      });

      return Object.entries(hourlyData).map(([date, sales]) => ({ date, sales: Math.round(sales) }));
    } else if (activePeriod === 'week') {
      // Group by actual dates in the week range (only days up to today)
      const today = getTodayInRestaurantTZ();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Create array of the last 7 days (today + 6 previous days)
      const dates: Date[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
      }

      console.log('Week mode - Today:', today, 'Dates:', dates.map(d => formatDateString(d)));

      // Group orders by date
      const dailyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const orderDate = getOrderDate(order);
        const dateKey = formatDateString(orderDate);
        dailyData[dateKey] = (dailyData[dateKey] || 0) + getOrderAmount(order);
      });

      // Map dates to sales data with day names
      const result = dates.map(date => {
        const dateKey = formatDateString(date);
        const dayName = dayNames[date.getDay()];
        return {
          date: dayName,
          sales: Math.round(dailyData[dateKey] || 0)
        };
      });

      console.log('Week mode - Result:', result);
      return result;
    } else if (activePeriod === 'month') {
      // Group by day of month
      const dailyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const day = getOrderDate(order).getDate().toString();
        dailyData[day] = (dailyData[day] || 0) + getOrderAmount(order);
      });

      return Object.entries(dailyData).map(([date, sales]) => ({ date, sales: Math.round(sales) })).sort((a, b) => parseInt(a.date) - parseInt(b.date));
    } else {
      // Group by month
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const month = monthNames[getOrderDate(order).getMonth()];
        monthlyData[month] = (monthlyData[month] || 0) + getOrderAmount(order);
      });

      return monthNames.map(month => ({ date: month, sales: Math.round(monthlyData[month] || 0) }));
    }
  };

  // Calculate category data from real orders
  const getCategoryData = () => {
    if (filteredOrders.length === 0) return [];

    // Create a map of product_id to category from menu items
    const productCategoryMap: Record<string, string> = {};
    menuItems.forEach((item: any) => {
      if (item.id && item.category) {
        productCategoryMap[item.id.toString()] = item.category;
      }
    });

    const categoryTotals: Record<string, number> = {};
    let totalSales = 0;

    filteredOrders.forEach(order => {
      // Get order items
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach((item: any) => {
          const itemTotal = parseFloat(item.price || 0) * parseInt(item.quantity || 1);
          totalSales += itemTotal;

          // Get category from product_id mapping
          const productId = item.product_id?.toString() || item.id?.toString();
          const category = productId ? (productCategoryMap[productId] || 'Other') : 'Other';

          categoryTotals[category] = (categoryTotals[category] || 0) + itemTotal;
        });
      }
    });

    const categories = Object.entries(categoryTotals).map(([name, sales]) => ({
      name,
      value: totalSales > 0 ? Math.round((sales / totalSales) * 100) : 0,
      sales: Math.round(sales)
    })).sort((a, b) => b.sales - a.sales);

    return categories.length > 0 ? categories : [{ name: 'No Data', value: 100, sales: 0 }];
  };

  const salesData = getSalesData();
  const categoryData = getCategoryData();

  // Calculate menu performance from real orders
  const getAllMenuData = () => {
    if (filteredOrders.length === 0) return [];

    const menuStats: Record<string, { category: string; price: number; orders: number; revenue: number }> = {};

    filteredOrders.forEach(order => {
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach((item: any) => {
          const menuName = item.menu_name || item.name || 'Unknown';
          if (!menuStats[menuName]) {
            menuStats[menuName] = {
              category: item.category || 'Other',
              price: parseFloat(item.price || 0),
              orders: 0,
              revenue: 0
            };
          }

          const quantity = parseInt(item.quantity || 1);
          const itemPrice = parseFloat(item.price || 0);
          menuStats[menuName].orders += quantity;
          menuStats[menuName].revenue += itemPrice * quantity;
        });
      }
    });

    const menuArray = Object.entries(menuStats).map(([name, stats]) => ({
      name,
      category: stats.category,
      price: stats.price,
      orders: stats.orders,
      revenue: Math.round(stats.revenue),
      performance: 0 // Will be calculated below
    })).sort((a, b) => b.orders - a.orders);

    // Calculate performance percentage
    const maxOrders = menuArray[0]?.orders || 1;
    menuArray.forEach(menu => {
      menu.performance = Math.round((menu.orders / maxOrders) * 100);
    });

    return menuArray.length > 0 ? menuArray : [];
  };

  const allMenuData = getAllMenuData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const topMenus = allMenuData.slice(0, 10);

  // Calculate hourly order distribution from real orders
  const getHourlyData = () => {
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
  };

  const hourlyData = getHourlyData();

  // Fetch restaurant data from standardized API
  const fetchRestaurantData = async () => {
    if (!user?.restaurantId) {
      console.log('❌ No restaurant ID found');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error('❌ No auth token found');
        setLoading(false);
        return;
      }

      // Fetch stats from standardized API
      const statsResponse = await fetch(`/api/dashboard/restaurant/${user.restaurantId}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Fetch orders for detailed analysis
      const ordersResponse = await fetch(`/api/orders?restaurant_id=${user.restaurantId}&limit=1000`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Fetch customers data
      const customersResponse = await fetch(`/api/customers/${user.restaurantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Fetch menu data to get categories
      const menuResponse = await fetch(`/api/menu?restaurantId=${user.restaurantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data || statsData);
      }

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.data || ordersData || []);
      }

      if (customersResponse.ok) {
        const customersData = await customersResponse.json();
        if (customersData.success && Array.isArray(customersData.data)) {
          setCustomers(customersData.data);
        }
      }

      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        if (menuData.success && menuData.data?.items) {
          setMenuItems(menuData.data.items);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching restaurant data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();

    // Auto-refresh every 30 seconds to get latest data
    const interval = setInterval(() => {
      fetchRestaurantData();
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  // Calculate peak times from real orders
  const getPeakTimesData = () => {
    if (filteredOrders.length === 0) return [];

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);
    const hourlySlots: Record<string, { orders: number; revenue: number }> = {};

    filteredOrders.forEach(order => {
      const hour = getOrderDate(order).getHours();
      const timeSlot = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;

      if (!hourlySlots[timeSlot]) {
        hourlySlots[timeSlot] = { orders: 0, revenue: 0 };
      }

      hourlySlots[timeSlot].orders += 1;
      hourlySlots[timeSlot].revenue += getOrderAmount(order);
    });

    const peakData = Object.entries(hourlySlots)
      .map(([time, stats]) => ({
        time,
        orders: stats.orders,
        revenue: Math.round(stats.revenue),
        efficiency: Math.min(100, Math.round((stats.orders / (filteredOrders.length / 24)) * 100))
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

    return peakData;
  };

  const peakTimesData = getPeakTimesData();

  // Get drilldown sales data grouped by year -> month -> day
  const getDrilldownSalesData = () => {
    if (filteredOrders.length === 0) return {};

    const getOrderDate = (order: any) => new Date(order.order_date || order.createdAt);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    const yearData: Record<string, any> = {};

    filteredOrders.forEach(order => {
      const orderDate = getOrderDate(order);
      const year = orderDate.getFullYear().toString();
      const monthNum = (orderDate.getMonth() + 1).toString().padStart(2, '0');
      const month = `${year}-${monthNum}`; // "2025-11"
      const day = orderDate.toISOString().split('T')[0]; // "2025-11-09"

      // Initialize year
      if (!yearData[year]) {
        yearData[year] = {
          year,
          revenue: 0,
          orders: 0,
          months: {}
        };
      }

      // Initialize month
      if (!yearData[year].months[month]) {
        yearData[year].months[month] = {
          month,
          revenue: 0,
          orders: 0,
          days: {}
        };
      }

      // Initialize day
      if (!yearData[year].months[month].days[day]) {
        yearData[year].months[month].days[day] = {
          day,
          revenue: 0,
          orders: 0
        };
      }

      const amount = getOrderAmount(order);

      // Aggregate data
      yearData[year].revenue += amount;
      yearData[year].orders += 1;
      yearData[year].months[month].revenue += amount;
      yearData[year].months[month].orders += 1;
      yearData[year].months[month].days[day].revenue += amount;
      yearData[year].months[month].days[day].orders += 1;
    });

    return yearData;
  };

  const drilldownData = getDrilldownSalesData();

  // Calculate date range in days
  const getDateRangeDays = () => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Determine appropriate display level based on date range
  const getDisplayLevel = () => {
    const days = getDateRangeDays();
    if (days <= 1) return 'day'; // Today - show just day details
    if (days <= 31) return 'day'; // Up to month - show days
    if (days <= 365) return 'month'; // Up to year - show months
    return 'year'; // Multiple years - show years
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const displayLevel = getDisplayLevel();

  // Auto-expand logic based on display level
  React.useEffect(() => {
    const days = getDateRangeDays();

    if (days <= 31) {
      // For today/week/month - auto expand all years and months to show days
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
      // For year - auto expand years to show months, but not days
      const allYears = new Set(Object.keys(drilldownData));
      setExpandedYears(allYears);
      setExpandedMonths(new Set());
    } else {
      // For all - collapse everything
      setExpandedYears(new Set());
      setExpandedMonths(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.start, dateRange.end, filteredOrders.length]);

  // Toggle functions for drilldown
  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
      // Also collapse all months in this year
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
    if (newExpanded.has(yearMonth)) {
      newExpanded.delete(yearMonth);
    } else {
      newExpanded.add(yearMonth);
    }
    setExpandedMonths(newExpanded);
  };

  // 날짜 범위 처리 함수
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);

    // Get today in restaurant timezone
    const now = getTodayInRestaurantTZ();
    let start = new Date(now);

    switch (period) {
      case 'today':
        start = new Date(now);
        break;
      case 'week':
        // Last 7 days including today (today + 6 previous days)
        start = new Date(now);
        start.setDate(start.getDate() - 6);
        break;
      case 'month':
        // Last 30 days including today
        start = new Date(now);
        start.setDate(start.getDate() - 29);
        break;
      case 'year':
        // From January 1 of current year to today
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
        // Get the earliest order date, or default to 5 years ago
        if (orders.length > 0) {
          const earliestOrder = orders.reduce((earliest, order) => {
            const orderDate = new Date(order.order_date || order.createdAt);
            return orderDate < earliest ? orderDate : earliest;
          }, new Date());
          start = earliestOrder;
        } else {
          start = new Date(now.getFullYear() - 5, 0, 1);
        }
        break;
    }

    // Convert to date strings
    const startLocal = formatDateString(start);
    const endLocal = formatDateString(now);

    setDateRange({
      start: startLocal,
      end: endLocal
    });
  };

  // 다운로드 기능
  const handleDownloadReport = () => {
    // Calculate actual data from filtered orders
    const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const completedOrders = filteredOrders.filter(o => o.status === 'completed').length;
    const repeatCustomers = customers.filter((c: any) => c.total_orders > 1).length;

    const reportData = {
      period: isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod,
      generatedAt: new Date().toISOString(),
      restaurantId: user?.restaurantId,
      tab: activeTab,
      data: {
        sales: {
          totalRevenue: totalRevenue,
          totalOrders: totalOrders,
          completedOrders: completedOrders,
          averageOrderValue: avgOrderValue,
          salesData: salesData,
          categoryData: categoryData,
          hourlyData: hourlyData
        },
        menu: {
          menuItems: allMenuData,
          totalItems: allMenuData.length,
          totalRevenue: allMenuData.reduce((sum, item) => sum + item.revenue, 0),
          totalOrders: allMenuData.reduce((sum, item) => sum + item.orders, 0)
        },
        customers: {
          totalCustomers: customers.length,
          repeatCustomers: repeatCustomers,
          repeatRate: customers.length > 0 ? (repeatCustomers / customers.length * 100).toFixed(1) : '0',
          customerList: customers,
          totalRevenue: customers.reduce((sum: number, c: any) => sum + parseFloat(c.total_spent || 0), 0),
          avgSpent: customers.length > 0 ? customers.reduce((sum: number, c: any) => sum + parseFloat(c.total_spent || 0), 0) / customers.length : 0
        },
        operations: {
          peakTimes: peakTimesData,
          totalOrders: totalOrders,
          avgPreparationTime: '15 mins' // This would need to be calculated from actual data
        },
        details: {
          drilldownData: drilldownData
        }
      }
    };

    // CSV 다운로드
    const csvContent = generateCSV(reportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `restaurant_${user?.restaurantId}_report_${activeTab}_${dateRange.start}_to_${dateRange.end}.csv`;
    link.click();
  };

  // CSV 생성 함수
  const generateCSV = (data: any) => {
    const timezone = getRestaurantTimezone(operationSettings);
    let csv = `Restaurant Analytics Report\n`;
    csv += `Restaurant ID,${data.restaurantId || 'N/A'}\n`;
    csv += `Generated,${new Date().toLocaleString('en-MY', { timeZone: timezone })}\n`;
    csv += `Period,${data.period}\n`;
    csv += `Report Type,${data.tab.toUpperCase()}\n\n`;

    if (activeTab === 'sales') {
      csv += `SALES SUMMARY\n`;
      csv += `Total Revenue,${formatCurrency(data.data.sales.totalRevenue, operationSettings.currency)}\n`;
      csv += `Total Orders,${data.data.sales.totalOrders}\n`;
      csv += `Completed Orders,${data.data.sales.completedOrders}\n`;
      csv += `Average Order Value,${formatCurrency(data.data.sales.averageOrderValue, operationSettings.currency)}\n\n`;

      csv += `DAILY SALES TREND\n`;
      csv += `Date,Revenue (RM),Orders\n`;
      data.data.sales.salesData.forEach((item: any) => {
        csv += `${item.date},${item.sales.toFixed(2)},${item.orders || 0}\n`;
      });

      csv += `\nCATEGORY PERFORMANCE\n`;
      csv += `Category,Percentage,Revenue (RM)\n`;
      data.data.sales.categoryData.forEach((item: any) => {
        csv += `${item.name},${item.value}%,${item.sales?.toFixed(2) || '0.00'}\n`;
      });

      csv += `\nHOURLY ORDER DISTRIBUTION\n`;
      csv += `Hour,Orders\n`;
      data.data.sales.hourlyData.forEach((item: any) => {
        csv += `${item.hour},${item.orders}\n`;
      });

    } else if (activeTab === 'details') {
      csv += `DETAILED SALES BREAKDOWN\n`;
      csv += `Period,Revenue (RM),Orders,Avg Order Value (RM)\n`;

      // Year level
      Object.keys(data.data.details.drilldownData).sort((a, b) => b.localeCompare(a)).forEach(year => {
        const yearInfo = data.data.details.drilldownData[year];
        csv += `${year},${yearInfo.revenue.toFixed(2)},${yearInfo.orders},${(yearInfo.revenue / yearInfo.orders).toFixed(2)}\n`;

        // Month level
        Object.keys(yearInfo.months).sort((a, b) => b.localeCompare(a)).forEach(month => {
          const monthInfo = yearInfo.months[month];
          const monthName = new Date(month + '-01').toLocaleString('en-US', { year: 'numeric', month: 'long' });
          csv += `  ${monthName},${monthInfo.revenue.toFixed(2)},${monthInfo.orders},${(monthInfo.revenue / monthInfo.orders).toFixed(2)}\n`;

          // Day level
          Object.keys(monthInfo.days).sort((a, b) => b.localeCompare(a)).forEach(day => {
            const dayInfo = monthInfo.days[day];
            const dayName = new Date(day).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            csv += `    ${dayName},${dayInfo.revenue.toFixed(2)},${dayInfo.orders},${(dayInfo.revenue / dayInfo.orders).toFixed(2)}\n`;
          });
        });
      });

    } else if (activeTab === 'menu') {
      csv += `MENU PERFORMANCE ANALYSIS\n`;
      csv += `Total Menu Items,${data.data.menu.totalItems}\n`;
      csv += `Total Revenue,${formatCurrency(data.data.menu.totalRevenue, operationSettings.currency)}\n`;
      csv += `Total Orders,${data.data.menu.totalOrders}\n\n`;

      csv += `COMPLETE MENU RANKING\n`;
      csv += `Rank,Item Name,Category,Price (RM),Orders,Revenue (RM),Performance %\n`;
      data.data.menu.menuItems.forEach((item: any, index: number) => {
        const maxOrders = data.data.menu.menuItems[0]?.orders || 1;
        const performance = Math.round((item.orders / maxOrders) * 100);
        csv += `${index + 1},${item.name},${item.category},${item.price.toFixed(2)},${item.orders},${item.revenue.toFixed(2)},${performance}\n`;
      });

    } else if (activeTab === 'customers') {
      csv += `CUSTOMER INSIGHTS SUMMARY\n`;
      csv += `Total Customers,${data.data.customers.totalCustomers}\n`;
      csv += `Repeat Customers,${data.data.customers.repeatCustomers}\n`;
      csv += `Repeat Rate,${data.data.customers.repeatRate}%\n`;
      csv += `Total Revenue,${formatCurrency(data.data.customers.totalRevenue, operationSettings.currency)}\n`;
      csv += `Average Spent per Customer,${formatCurrency(data.data.customers.avgSpent, operationSettings.currency)}\n\n`;

      csv += `TOP CUSTOMERS\n`;
      csv += `Rank,Name,Phone,Type,Total Orders,Total Spent (RM),Points,Tier\n`;
      data.data.customers.customerList
        .sort((a: any, b: any) => parseFloat(b.total_spent || 0) - parseFloat(a.total_spent || 0))
        .slice(0, 50) // Top 50 customers
        .forEach((customerData: any, index: number) => {
          csv += `${index + 1},${customerData.customer.name},${customerData.customer.phone},${customerData.customer.type},${customerData.total_orders},${parseFloat(customerData.total_spent || 0).toFixed(2)},${customerData.points || 0},${customerData.tier || 'Bronze'}\n`;
        });

    } else if (activeTab === 'operations') {
      csv += `OPERATIONS PERFORMANCE\n`;
      csv += `Total Orders,${data.data.operations.totalOrders}\n`;
      csv += `Average Preparation Time,${data.data.operations.avgPreparationTime}\n\n`;

      csv += `PEAK TIMES ANALYSIS\n`;
      csv += `Time Slot,Orders,Revenue (RM),Efficiency %\n`;
      data.data.operations.peakTimes.forEach((item: any) => {
        csv += `${item.time},${item.orders},${item.revenue},${item.efficiency}\n`;
      });
    }

    return csv;
  };

  // Filter component to be reused in each tab
  const FilterComponent = () => (
    <FilterControls>
      <FilterRow>
        <DateButton active={activePeriod === 'today' && !isCustomDateRange} onClick={() => handlePeriodChange('today')}>
          Today
        </DateButton>
        <DateButton active={activePeriod === 'week' && !isCustomDateRange} onClick={() => handlePeriodChange('week')}>
          Week
        </DateButton>
        <DateButton active={activePeriod === 'month' && !isCustomDateRange} onClick={() => handlePeriodChange('month')}>
          Month
        </DateButton>
        <DateButton active={activePeriod === 'year' && !isCustomDateRange} onClick={() => handlePeriodChange('year')}>
          Year
        </DateButton>
        <DateButton active={activePeriod === 'all' && !isCustomDateRange} onClick={() => handlePeriodChange('all')}>
          All
        </DateButton>
        <CustomDateRange>
          <DateRangeInput
            type="date"
            value={dateRange.start}
            onChange={(e) => {
              setDateRange({ ...dateRange, start: e.target.value });
              setIsCustomDateRange(true);
            }}
          />
          <span>to</span>
          <DateRangeInput
            type="date"
            value={dateRange.end}
            onChange={(e) => {
              setDateRange({ ...dateRange, end: e.target.value });
              setIsCustomDateRange(true);
            }}
          />
        </CustomDateRange>
      </FilterRow>

      <DownloadButton onClick={handleDownloadReport}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download
      </DownloadButton>
    </FilterControls>
  );

  return (
    <MainLayout>
      <ReportsContainer>
        <Header>
          <HeaderTitle>Reports</HeaderTitle>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'sales'} onClick={() => setActiveTab('sales')}>
              Sales Report
            </Tab>
            <Tab active={activeTab === 'details'} onClick={() => setActiveTab('details')}>
              Sales Details
            </Tab>
            <Tab active={activeTab === 'menu'} onClick={() => setActiveTab('menu')}>
              Menu Analysis
            </Tab>
            <Tab active={activeTab === 'customers'} onClick={() => setActiveTab('customers')}>
              Customer Insights
            </Tab>
            <Tab active={activeTab === 'operations'} onClick={() => setActiveTab('operations')}>
              Operations
            </Tab>
          </TabContainer>

          {/* Sales Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
          <div style={{ display: activeTab === 'sales' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
              ) : filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>Total Revenue</StatLabel>
                      <StatValue>{formatCurrency(salesData.reduce((sum, item) => sum + item.sales, 0), operationSettings.currency)}</StatValue>
                      <StatDescription>{filteredOrders.length} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>Total Orders</StatLabel>
                      <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                      <StatDescription>For selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>Average Order Value</StatLabel>
                      <StatValue>{formatCurrency(filteredOrders.length > 0 ? (salesData.reduce((sum, item) => sum + item.sales, 0) / filteredOrders.length) : 0, operationSettings.currency)}</StatValue>
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
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #E6EBF1',
                          borderRadius: '6px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#635BFF"
                        strokeWidth={2}
                        dot={{ fill: '#635BFF', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                  <ChartTitle>Sales by Category</ChartTitle>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
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
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #E6EBF1',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar dataKey="orders" fill="#635BFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
                </div>
              )}
          </div>

          {/* Sales Details Tab - Drilldown by Year/Month/Day */}
          <div style={{ display: activeTab === 'details' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
              ) : filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>Total Revenue</StatLabel>
                      <StatValue>{formatCurrency(salesData.reduce((sum, item) => sum + item.sales, 0), operationSettings.currency)}</StatValue>
                      <StatDescription>{filteredOrders.length} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>Total Orders</StatLabel>
                      <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                      <StatDescription>{filteredOrders.filter(o => o.status === 'completed').length} completed</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>Average Order Value</StatLabel>
                      <StatValue>{formatCurrency(filteredOrders.length > 0 ? (salesData.reduce((sum, item) => sum + item.sales, 0) / filteredOrders.length) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>Per order average</StatDescription>
                    </StatCard>
                    <StatCard color="#7C3AED">
                      <StatLabel>Period</StatLabel>
                      <StatValue>{isCustomDateRange ? getDateRangeDays() : activePeriod === 'today' ? '1' : activePeriod === 'week' ? '7' : activePeriod === 'month' ? '30' : activePeriod === 'year' ? '365' : getDateRangeDays()}</StatValue>
                      <StatDescription>{isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod === 'today' ? 'Day' : activePeriod === 'week' ? 'Days' : activePeriod === 'month' ? 'Days' : activePeriod === 'year' ? 'Days' : 'Days'}</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Detailed Sales Breakdown ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
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
                              {/* Year Row */}
                              <DrilldownRow level={0} clickable onClick={() => toggleYear(year)}>
                                <DrilldownCell level={0} bold>
                                  <ExpandIcon expanded={isYearExpanded}>▶</ExpandIcon>
                                  {year}
                                </DrilldownCell>
                                <DrilldownCell level={0} bold style={{ textAlign: 'right' }}>
                                  {formatCurrency(yearInfo.revenue, operationSettings.currency)}
                                </DrilldownCell>
                                <DrilldownCell level={0} bold style={{ textAlign: 'right' }}>
                                  {yearInfo.orders}
                                </DrilldownCell>
                                <DrilldownCell level={0} bold style={{ textAlign: 'right' }}>
                                  {formatCurrency(yearInfo.revenue / yearInfo.orders, operationSettings.currency)}
                                </DrilldownCell>
                              </DrilldownRow>

                              {/* Month Rows (only if year is expanded) */}
                              {isYearExpanded && Object.keys(yearInfo.months).sort((a, b) => b.localeCompare(a)).map(month => {
                                const monthInfo = yearInfo.months[month];
                                const yearMonthKey = `${year}-${month}`;
                                const isMonthExpanded = expandedMonths.has(yearMonthKey);
                                const monthName = new Date(month + '-01').toLocaleString('en-US', { year: 'numeric', month: 'long' });

                                return (
                                  <React.Fragment key={yearMonthKey}>
                                    {/* Month Row */}
                                    <DrilldownRow level={1} clickable onClick={() => toggleMonth(yearMonthKey)}>
                                      <DrilldownCell level={1} bold>
                                        <ExpandIcon expanded={isMonthExpanded}>▶</ExpandIcon>
                                        {monthName}
                                      </DrilldownCell>
                                      <DrilldownCell level={1} style={{ textAlign: 'right' }}>
                                        {formatCurrency(monthInfo.revenue, operationSettings.currency)}
                                      </DrilldownCell>
                                      <DrilldownCell level={1} style={{ textAlign: 'right' }}>
                                        {monthInfo.orders}
                                      </DrilldownCell>
                                      <DrilldownCell level={1} style={{ textAlign: 'right' }}>
                                        {formatCurrency(monthInfo.revenue / monthInfo.orders, operationSettings.currency)}
                                      </DrilldownCell>
                                    </DrilldownRow>

                                    {/* Day Rows (only if month is expanded) */}
                                    {isMonthExpanded && Object.keys(monthInfo.days).sort((a, b) => b.localeCompare(a)).map(day => {
                                      const dayInfo = monthInfo.days[day];
                                      const dayName = new Date(day).toLocaleString('en-US', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                      });

                                      return (
                                        <DrilldownRow key={day} level={2}>
                                          <DrilldownCell level={2}>
                                            {dayName}
                                          </DrilldownCell>
                                          <DrilldownCell level={2} style={{ textAlign: 'right', color: '#059669', fontWeight: 500 }}>
                                            {formatCurrency(dayInfo.revenue, operationSettings.currency)}
                                          </DrilldownCell>
                                          <DrilldownCell level={2} style={{ textAlign: 'right' }}>
                                            {dayInfo.orders}
                                          </DrilldownCell>
                                          <DrilldownCell level={2} style={{ textAlign: 'right' }}>
                                            {formatCurrency(dayInfo.revenue / dayInfo.orders, operationSettings.currency)}
                                          </DrilldownCell>
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

          {/* Menu Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
          <div style={{ display: activeTab === 'menu' ? 'block' : 'none' }}>
              <FilterComponent />
              <StatsRow>
                <StatCard color="#F59E0B">
                  <StatLabel>Best Seller</StatLabel>
                  <StatValue>{allMenuData[0]?.name || 'N/A'}</StatValue>
                  <StatDescription>{allMenuData[0]?.orders || 0} orders in {activePeriod === 'today' ? 'today' : `this ${activePeriod}`}</StatDescription>
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
                  <StatValue>{formatCurrency(allMenuData.reduce((sum, item) => sum + item.revenue, 0), operationSettings.currency)}</StatValue>
                  <StatDescription>For selected period</StatDescription>
                </StatCard>
              </StatsRow>

              <TableCard>
                <ChartTitle>Complete Menu Performance Ranking ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
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
                        <tr key={index} style={{ 
                          backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent'
                        }}>
                          <TableCell style={{ 
                            fontWeight: 600, 
                            color: index < 3 ? (index === 0 ? '#FFB800' : index === 1 ? '#0EA5E9' : '#00D924') : '#0A2540'
                          }}>
                            #{index + 1}
                            {index === 0 && ' 🥇'}
                            {index === 1 && ' 🥈'}
                            {index === 2 && ' 🥉'}
                          </TableCell>
                          <TableCell style={{ fontWeight: 600 }}>{menu.name}</TableCell>
                          <TableCell>
                            <span style={{ 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              fontSize: '11px',
                              backgroundColor: '#F3F4F6',
                              color: '#6B7280'
                            }}>
                              {menu.category}
                            </span>
                          </TableCell>
                          <TableCell>{formatCurrency(menu.price, operationSettings.currency)}</TableCell>
                          <TableCell>{menu.orders.toLocaleString()}</TableCell>
                          <TableCell>{formatCurrency(menu.revenue, operationSettings.currency)}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <ProgressBar percentage={(menu.orders / maxOrders) * 100} />
                              <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
                                {Math.round((menu.orders / maxOrders) * 100)}%
                              </span>
                            </div>
                          </TableCell>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </TableCard>
          </div>

          {/* Customers Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
          <div style={{ display: activeTab === 'customers' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading customer data...</div>
              ) : customers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No customer data available
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#635BFF">
                      <StatLabel>Total Customers</StatLabel>
                      <StatValue>{customers.length.toLocaleString()}</StatValue>
                      <StatDescription>{customers.filter((c: any) => c.customer.type === 'member').length} members, {customers.filter((c: any) => c.customer.type === 'guest').length} guests</StatDescription>
                    </StatCard>
                    <StatCard color="#00D924">
                      <StatLabel>Repeat Customers</StatLabel>
                      <StatValue>{customers.filter((c: any) => c.total_orders > 1).length}</StatValue>
                      <StatDescription>{customers.length > 0 ? Math.round((customers.filter((c: any) => c.total_orders > 1).length / customers.length) * 100) : 0}% return rate</StatDescription>
                    </StatCard>
                    <StatCard color="#FFB800">
                      <StatLabel>Average Spent</StatLabel>
                      <StatValue>{formatCurrency(customers.length > 0 ? (customers.reduce((sum: number, c: any) => sum + parseFloat(c.total_spent || 0), 0) / customers.length) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>Per customer</StatDescription>
                    </StatCard>
                    <StatCard color="#8B5CF6">
                      <StatLabel>Total Points</StatLabel>
                      <StatValue>{customers.reduce((sum: number, c: any) => sum + (c.points || 0), 0).toLocaleString()}</StatValue>
                      <StatDescription>Across all customers</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Top Customers</ChartTitle>
                    <Table>
                      <thead>
                        <tr>
                          <TableHeader>Rank</TableHeader>
                          <TableHeader>Name</TableHeader>
                          <TableHeader>Phone</TableHeader>
                          <TableHeader>Type</TableHeader>
                          <TableHeader>Orders</TableHeader>
                          <TableHeader>Total Spent</TableHeader>
                          <TableHeader>Points</TableHeader>
                          <TableHeader>Tier</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {customers
                          .sort((a: any, b: any) => parseFloat(b.total_spent || 0) - parseFloat(a.total_spent || 0))
                          .slice(0, 10)
                          .map((customerData: any, index: number) => (
                            <tr key={customerData.customer.id} style={{
                              backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent'
                            }}>
                              <TableCell style={{
                                fontWeight: 600,
                                color: index < 3 ? (index === 0 ? '#FFB800' : index === 1 ? '#0EA5E9' : '#00D924') : '#0A2540'
                              }}>
                                #{index + 1}
                                {index === 0 && ' 🥇'}
                                {index === 1 && ' 🥈'}
                                {index === 2 && ' 🥉'}
                              </TableCell>
                              <TableCell style={{ fontWeight: 600 }}>{customerData.customer.name}</TableCell>
                              <TableCell>{customerData.customer.phone}</TableCell>
                              <TableCell>
                                <span style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  backgroundColor: customerData.customer.type === 'member' ? '#E0F2FE' : '#F3F4F6',
                                  color: customerData.customer.type === 'member' ? '#0369A1' : '#6B7280'
                                }}>
                                  {customerData.customer.type === 'member' ? 'Member' : 'Guest'}
                                </span>
                              </TableCell>
                              <TableCell>{customerData.total_orders || 0}</TableCell>
                              <TableCell>{formatCurrency(parseFloat(customerData.total_spent || 0), operationSettings.currency)}</TableCell>
                              <TableCell>{customerData.points || 0}</TableCell>
                              <TableCell>
                                <span style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  backgroundColor: customerData.loyalty_tier === 'VIP' ? '#FEF3C7' : customerData.loyalty_tier === 'Gold' ? '#FEF9C3' : customerData.loyalty_tier === 'Silver' ? '#F3F4F6' : '#E5E7EB',
                                  color: customerData.loyalty_tier === 'VIP' ? '#92400E' : customerData.loyalty_tier === 'Gold' ? '#854D0E' : '#6B7280'
                                }}>
                                  {customerData.loyalty_tier || 'Bronze'}
                                </span>
                              </TableCell>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </TableCard>
                </div>
              )}
          </div>

          {/* Operations Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
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
                  <StatDescription>-{Math.round(1 + Math.random() * 4)} min from target</StatDescription>
                </StatCard>
                <StatCard color="#EF4444">
                  <StatLabel>Peak Hour</StatLabel>
                  <StatValue>12-1 PM</StatValue>
                  <StatDescription>{Math.round(45 * (activePeriod === 'today' ? 1 : activePeriod === 'week' ? 7 : activePeriod === 'month' ? 30 : 365) * (0.8 + Math.random() * 0.4))} orders/{activePeriod === 'today' ? 'hour' : activePeriod}</StatDescription>
                </StatCard>
                <StatCard color="#6366F1">
                  <StatLabel>Staff Efficiency</StatLabel>
                  <StatValue>{Math.round(87 * (0.85 + Math.random() * 0.25))}%</StatValue>
                  <StatDescription>+{(Math.random() * 6).toFixed(1)}% from last {activePeriod === 'today' ? 'day' : activePeriod}</StatDescription>
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
                        <TableCell>{formatCurrency(item.revenue, operationSettings.currency)}</TableCell>
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

        </Content>
      </ReportsContainer>
    </MainLayout>
  );
};

export default ReportsPage;