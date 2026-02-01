import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { getRestaurantTimezone, getNow, formatDateTime, getDateStringInTimezone } from '../../utils/timezone';
import { downloadCSV, escapeCSV, toCSVRow, getPeriodLabel, generateFilename } from '../../utils/csvDownload';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import PageHeader from '../../components/Common/PageHeader';
import DateRangeFilter, { PeriodType, DateRange, calculateDateRange, getPeriodLabel as getFilterPeriodLabel } from '../../components/Common/DateRangeFilter';

// 스타일 컴포넌트
const ReportsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;


// Note: FilterControls, DateButton, DateRangeInput styles moved to DateRangeFilter component


const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
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
// PeriodType imported from DateRangeFilter component

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
  const [ordersLoading, setOrdersLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

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

  // Orders are now pre-filtered by the server (completed orders only within date range)
  // This memo just returns the orders directly since server already filtered them
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) {
      return [];
    }
    // Server already filters by: status=completed, startDate, endDate
    // No additional client-side filtering needed
    return orders;
  }, [orders]);

  // Calculate sales data from real orders - memoized for performance
  // All date groupings use restaurant timezone
  const salesData = useMemo(() => {
    if (filteredOrders.length === 0) return [];

    const timezone = getRestaurantTimezone(operationSettings);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    // Helper to get hour in restaurant timezone
    const getHourInTimezone = (date: Date | string) => {
      const d = new Date(date);
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        hour12: false
      });
      return parseInt(formatter.format(d));
    };

    // Helper to get date parts in restaurant timezone
    const getDatePartsInTimezone = (date: Date | string) => {
      const d = new Date(date);
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
      });
      const parts = formatter.formatToParts(d);
      return {
        year: parseInt(parts.find(p => p.type === 'year')?.value || '0'),
        month: parseInt(parts.find(p => p.type === 'month')?.value || '0'),
        day: parseInt(parts.find(p => p.type === 'day')?.value || '0'),
        weekday: parts.find(p => p.type === 'weekday')?.value || ''
      };
    };

    if (activePeriod === 'today') {
      // Group by hour (in restaurant timezone)
      const hourlyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const orderDateValue = order.order_date || order.createdAt;
        const hour = getHourInTimezone(orderDateValue);
        const hourLabel = hour === 12 ? '12PM' : hour > 12 ? `${hour - 12}PM` : hour === 0 ? '12AM' : `${hour}AM`;
        hourlyData[hourLabel] = (hourlyData[hourLabel] || 0) + getOrderAmount(order);
      });

      return Object.entries(hourlyData).map(([date, sales]) => ({ date, sales: Math.round(sales) }));
    } else if (activePeriod === 'week') {
      // Group by actual dates in the week range
      const today = getTodayInRestaurantTZ();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Create array of the last 7 days
      const dates: Date[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
      }

      // Group orders by date (in restaurant timezone)
      const dailyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const orderDateValue = order.order_date || order.createdAt;
        const dateKey = getDateStringInTimezone(orderDateValue, timezone);
        dailyData[dateKey] = (dailyData[dateKey] || 0) + getOrderAmount(order);
      });

      // Map dates to sales data with day names
      return dates.map(date => {
        const dateKey = formatDateString(date);
        const dayName = dayNames[date.getDay()];
        return {
          date: dayName,
          sales: Math.round(dailyData[dateKey] || 0)
        };
      });
    } else if (activePeriod === 'month') {
      // Group by full date (MM/DD) in restaurant timezone
      const dailyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const orderDateValue = order.order_date || order.createdAt;
        const parts = getDatePartsInTimezone(orderDateValue);
        const dateKey = `${parts.month.toString().padStart(2, '0')}/${parts.day.toString().padStart(2, '0')}`;
        dailyData[dateKey] = (dailyData[dateKey] || 0) + getOrderAmount(order);
      });

      // Sort by actual date order
      return Object.entries(dailyData)
        .map(([date, sales]) => ({ date, sales: Math.round(sales) }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } else {
      // Group by month (in restaurant timezone)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyData: Record<string, number> = {};
      filteredOrders.forEach(order => {
        const orderDateValue = order.order_date || order.createdAt;
        const parts = getDatePartsInTimezone(orderDateValue);
        const month = monthNames[parts.month - 1];
        monthlyData[month] = (monthlyData[month] || 0) + getOrderAmount(order);
      });

      return monthNames.map(month => ({ date: month, sales: Math.round(monthlyData[month] || 0) }));
    }
  }, [filteredOrders, activePeriod, operationSettings]);

  // Calculate exact total revenue from filtered orders (without rounding)
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => {
      const amount = parseFloat(order.final_price || order.total_amount || order.total_price || 0);
      return sum + amount;
    }, 0);
  }, [filteredOrders]);

  // Calculate category data from real orders - memoized for performance
  // Uses menu items and categories to map order items to their actual menu categories
  const categoryData = useMemo(() => {
    if (filteredOrders.length === 0) return [{ name: 'No Data', value: 100, sales: 0 }];

    // Create a map of product_id to category name from menu items and categories
    const productCategoryMap: Record<string, string> = {};
    const categoryIdToName: Record<string, string> = {};

    // Build category ID to name map
    categories.forEach((cat: any) => {
      if (cat.id && cat.name) {
        categoryIdToName[cat.id.toString()] = cat.name;
      }
    });

    // Build product ID to category name map
    menuItems.forEach((item: any) => {
      if (item.id) {
        // item.categoryId contains the category ID, look up the name
        const categoryName = item.categoryId ? (categoryIdToName[item.categoryId.toString()] || item.categoryId) : 'Other';
        productCategoryMap[item.id.toString()] = categoryName;
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

          // Get category from menuItem.id in order_items
          const menuItemId = item.menuItem?.id?.toString() || item.product_id?.toString() || item.id?.toString();
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

  // Calculate menu performance from real orders - memoized for performance
  const allMenuData = useMemo(() => {
    if (filteredOrders.length === 0) return [];

    // Build category lookup maps
    const categoryIdToName: Record<string, string> = {};
    categories.forEach((cat: any) => {
      if (cat.id && cat.name) {
        categoryIdToName[cat.id.toString()] = cat.name;
      }
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
            menuStats[menuName] = {
              category: category,
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
      performance: 0
    })).sort((a, b) => b.orders - a.orders);

    // Calculate performance percentage
    const maxOrders = menuArray[0]?.orders || 1;
    menuArray.forEach(menu => {
      menu.performance = Math.round((menu.orders / maxOrders) * 100);
    });

    return menuArray;
  }, [filteredOrders, menuItems, categories]);

  // Calculate hourly order distribution from real orders - memoized for performance
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

  // Filter customers based on orders in selected date range
  const filteredCustomers = useMemo(() => {
    if (customers.length === 0 || filteredOrders.length === 0) {
      return [];
    }

    // Get unique customer IDs from filtered orders
    const customerIdsInPeriod = new Set<number>();
    const customerOrderStats: Record<number, { orders: number; spent: number }> = {};

    filteredOrders.forEach(order => {
      const customerId = order.customer_id;
      if (customerId) {
        customerIdsInPeriod.add(customerId);
        if (!customerOrderStats[customerId]) {
          customerOrderStats[customerId] = { orders: 0, spent: 0 };
        }
        customerOrderStats[customerId].orders += 1;
        customerOrderStats[customerId].spent += parseFloat(order.total_amount || 0);
      }
    });

    // Filter customers and add period-specific stats
    return customers
      .filter((c: any) => customerIdsInPeriod.has(c.customer?.id))
      .map((c: any) => ({
        ...c,
        period_orders: customerOrderStats[c.customer?.id]?.orders || 0,
        period_spent: customerOrderStats[c.customer?.id]?.spent || 0
      }))
      .sort((a: any, b: any) => b.period_spent - a.period_spent);
  }, [customers, filteredOrders]);

  // Calculate operations statistics from real data
  const operationsStats = useMemo(() => {
    if (filteredOrders.length === 0) {
      return {
        completionRate: 0,
        avgPrepTime: 0,
        peakHour: 'N/A',
        peakHourOrders: 0,
        totalOrdersInPeak: 0
      };
    }

    // Completion rate: all filtered orders are already 'completed'
    const completionRate = 100; // Since we only fetch completed orders

    // Calculate average preparation time (createdAt to served_at)
    let totalPrepTime = 0;
    let prepTimeCount = 0;
    filteredOrders.forEach(order => {
      if (order.served_at && order.createdAt) {
        const created = new Date(order.createdAt).getTime();
        const served = new Date(order.served_at).getTime();
        const prepTimeMinutes = (served - created) / (1000 * 60);
        // Only count reasonable prep times (1-120 minutes)
        if (prepTimeMinutes > 0 && prepTimeMinutes < 120) {
          totalPrepTime += prepTimeMinutes;
          prepTimeCount++;
        }
      }
    });
    const avgPrepTime = prepTimeCount > 0 ? Math.round(totalPrepTime / prepTimeCount) : 0;

    // Find peak hour
    const hourlyOrders: Record<number, number> = {};
    filteredOrders.forEach(order => {
      const hour = new Date(order.order_date || order.createdAt).getHours();
      hourlyOrders[hour] = (hourlyOrders[hour] || 0) + 1;
    });

    let peakHour = 12;
    let maxOrders = 0;
    Object.entries(hourlyOrders).forEach(([hour, count]) => {
      if (count > maxOrders) {
        maxOrders = count;
        peakHour = parseInt(hour);
      }
    });

    const formatHour = (h: number) => {
      const nextHour = (h + 1) % 24;
      const formatSingle = (hour: number) => {
        if (hour === 0) return '12AM';
        if (hour === 12) return '12PM';
        return hour > 12 ? `${hour - 12}PM` : `${hour}AM`;
      };
      return `${formatSingle(h)}-${formatSingle(nextHour)}`;
    };

    return {
      completionRate,
      avgPrepTime,
      peakHour: formatHour(peakHour),
      peakHourOrders: maxOrders,
      totalOrdersInPeak: maxOrders
    };
  }, [filteredOrders]);

  // Fetch static data (stats, customers, menu) - only once on mount
  const fetchStaticData = useCallback(async () => {
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

      // Fetch stats, customers, menu in parallel
      const [statsResponse, customersResponse, menuResponse] = await Promise.all([
        fetch(`/api/dashboard/restaurant/${user.restaurantId}/stats`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }),
        fetch(`/api/customers/${user.restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }),
        fetch(`/api/menu?restaurantId=${user.restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data || statsData);
      }

      if (customersResponse.ok) {
        const customersData = await customersResponse.json();
        if (customersData.success && Array.isArray(customersData.data)) {
          setCustomers(customersData.data);
        }
      }

      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        if (menuData.success && menuData.data) {
          if (menuData.data.items) {
            setMenuItems(menuData.data.items);
          }
          if (menuData.data.categories) {
            setCategories(menuData.data.categories);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error fetching static data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.restaurantId]);

  // Fetch orders with server-side filtering (date range + status=completed)
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;

    const token = localStorage.getItem('auth_token');
    if (!token) return;

    setOrdersLoading(true);

    try {
      // Use the restaurant-specific endpoint with server-side filtering
      // This endpoint supports: startDate, endDate, status, pagination
      const params = new URLSearchParams({
        startDate: dateRange.start,
        endDate: dateRange.end,
        status: 'completed',  // Reports only show completed orders
        limit: '10000',       // High limit to get all orders in range (paginated if needed)
        includeCompleted: 'true'
      });

      const ordersResponse = await fetch(
        `/api/orders/restaurant/${user.restaurantId}?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.data || []);
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  }, [user?.restaurantId, dateRange.start, dateRange.end]);

  // Fetch static data on mount (stats, customers, menu)
  useEffect(() => {
    fetchStaticData();
  }, [fetchStaticData]);

  // Fetch orders when date range changes (server-side filtered)
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  // Calculate peak times from real orders - memoized for performance
  const peakTimesData = useMemo(() => {
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

    return Object.entries(hourlySlots)
      .map(([time, stats]) => ({
        time,
        orders: stats.orders,
        revenue: Math.round(stats.revenue),
        efficiency: Math.min(100, Math.round((stats.orders / (filteredOrders.length / 24)) * 100))
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
  }, [filteredOrders]);

  // Get drilldown sales data grouped by year -> month -> day - memoized for performance
  // Uses restaurant timezone for correct date grouping
  const drilldownData = useMemo(() => {
    if (filteredOrders.length === 0) return {};

    const timezone = getRestaurantTimezone(operationSettings);
    const getOrderAmount = (order: any) => parseFloat(order.final_price || order.total_amount || order.total_price || 0);

    // Helper to get date parts in restaurant timezone
    const getDatePartsInTimezone = (date: Date | string) => {
      const d = new Date(date);
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      const dateStr = formatter.format(d); // YYYY-MM-DD
      const [year, month, day] = dateStr.split('-');
      return { year, month, day, dateStr };
    };

    const yearData: Record<string, any> = {};

    filteredOrders.forEach(order => {
      const orderDateValue = order.order_date || order.createdAt;
      const parts = getDatePartsInTimezone(orderDateValue);
      const year = parts.year;
      const month = `${parts.year}-${parts.month}`; // "2025-11"
      const day = parts.dateStr; // "2025-11-09"

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
  }, [filteredOrders, operationSettings]);

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
        // Last 365 days including today (today + 364 previous days)
        start = new Date(now);
        start.setDate(start.getDate() - 364);
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

  // What and Why: 통화 기호 없이 숫자만 반환 (CSV용)
  const formatNumber = (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals);
  };

  // What and Why: CSV 공통 헤더 생성
  const generateCSVHeader = useCallback((): string[] => {
    const timezone = getRestaurantTimezone(operationSettings);
    const periodLabel = getPeriodLabel(activePeriod, isCustomDateRange, dateRange.start, dateRange.end);
    const generatedAt = new Date().toLocaleString('en-US', { timeZone: timezone });
    const currencyCode = operationSettings?.currency || 'MYR';

    return [
      '═══════════════════════════════════════════════════════════════',
      'PURPLE POS - ANALYTICS REPORT',
      '═══════════════════════════════════════════════════════════════',
      '',
      `Report Type,${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`,
      `Period,${periodLabel}`,
      `Date Range,${dateRange.start} to ${dateRange.end}`,
      `Generated,${generatedAt}`,
      `Currency,${currencyCode}`,
      `Restaurant ID,${user?.restaurantId || 'N/A'}`,
      '',
    ];
  }, [operationSettings, activePeriod, isCustomDateRange, dateRange, activeTab, user?.restaurantId]);

  // What and Why: Sales Report 탭 CSV 생성
  const generateSalesCSV = useCallback((): string => {
    const header = generateCSVHeader();
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const completedOrders = filteredOrders.filter(o => o.status === 'completed').length;

    const lines = [
      ...header,
      '═══════════════════════════════════════════════════════════════',
      'SALES SUMMARY',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Metric,Value',
      `Total Revenue,${formatNumber(totalRevenue)}`,
      `Total Orders,${totalOrders}`,
      `Completed Orders,${completedOrders}`,
      `Completion Rate,${totalOrders > 0 ? formatNumber((completedOrders / totalOrders) * 100, 1) : 0}%`,
      `Average Order Value,${formatNumber(avgOrderValue)}`,
      '',
      '═══════════════════════════════════════════════════════════════',
      'REVENUE TREND',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Period,Revenue',
    ];

    // 기간별 매출 데이터
    salesData.forEach(item => {
      lines.push(`${escapeCSV(item.date)},${formatNumber(item.sales)}`);
    });

    // 카테고리별 매출
    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('SALES BY CATEGORY');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push('Category,Revenue,Percentage');

    categoryData.forEach(item => {
      lines.push(`${escapeCSV(item.name)},${formatNumber(item.sales || 0)},${item.value}%`);
    });

    // 시간대별 주문
    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('HOURLY ORDER DISTRIBUTION');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push('Hour,Orders');

    hourlyData.forEach(item => {
      lines.push(`${escapeCSV(item.hour)},${item.orders}`);
    });

    return lines.join('\n');
  }, [generateCSVHeader, filteredOrders, totalRevenue, salesData, categoryData, hourlyData]);

  // What and Why: Sales Details 탭 CSV 생성 (연/월/일 드릴다운)
  const generateDetailsCSV = useCallback((): string => {
    const header = generateCSVHeader();
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const lines = [
      ...header,
      '═══════════════════════════════════════════════════════════════',
      'DETAILED SALES BREAKDOWN',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Summary',
      `Total Revenue,${formatNumber(totalRevenue)}`,
      `Total Orders,${totalOrders}`,
      `Average Order Value,${formatNumber(avgOrderValue)}`,
      '',
      '═══════════════════════════════════════════════════════════════',
      'BREAKDOWN BY PERIOD',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Level,Period,Revenue,Orders,Avg Order Value',
    ];

    // 연 > 월 > 일 순서로 드릴다운 데이터 출력
    Object.keys(drilldownData).sort((a, b) => b.localeCompare(a)).forEach(year => {
      const yearInfo = drilldownData[year];
      const yearAvg = yearInfo.orders > 0 ? yearInfo.revenue / yearInfo.orders : 0;
      lines.push(`Year,${year},${formatNumber(yearInfo.revenue)},${yearInfo.orders},${formatNumber(yearAvg)}`);

      Object.keys(yearInfo.months).sort((a, b) => b.localeCompare(a)).forEach(month => {
        const monthInfo = yearInfo.months[month];
        const monthAvg = monthInfo.orders > 0 ? monthInfo.revenue / monthInfo.orders : 0;
        const monthName = new Date(month + '-01').toLocaleString('en-US', { year: 'numeric', month: 'long' });
        lines.push(`  Month,${monthName},${formatNumber(monthInfo.revenue)},${monthInfo.orders},${formatNumber(monthAvg)}`);

        Object.keys(monthInfo.days).sort((a, b) => b.localeCompare(a)).forEach(day => {
          const dayInfo = monthInfo.days[day];
          const dayAvg = dayInfo.orders > 0 ? dayInfo.revenue / dayInfo.orders : 0;
          const dayName = new Date(day).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
          lines.push(`    Day,${dayName},${formatNumber(dayInfo.revenue)},${dayInfo.orders},${formatNumber(dayAvg)}`);
        });
      });
    });

    return lines.join('\n');
  }, [generateCSVHeader, filteredOrders, totalRevenue, drilldownData]);

  // What and Why: Menu Analysis 탭 CSV 생성
  const generateMenuCSV = useCallback((): string => {
    const header = generateCSVHeader();
    const totalMenuRevenue = allMenuData.reduce((sum, item) => sum + item.revenue, 0);
    const totalMenuOrders = allMenuData.reduce((sum, item) => sum + item.orders, 0);

    const lines = [
      ...header,
      '═══════════════════════════════════════════════════════════════',
      'MENU PERFORMANCE ANALYSIS',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Summary',
      `Total Menu Items Sold,${allMenuData.length}`,
      `Total Revenue,${formatNumber(totalMenuRevenue)}`,
      `Total Orders,${totalMenuOrders}`,
      `Best Seller,${allMenuData[0]?.name || 'N/A'}`,
      '',
      '═══════════════════════════════════════════════════════════════',
      'COMPLETE MENU RANKING',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Rank,Item Name,Category,Unit Price,Quantity Sold,Total Revenue,Performance %',
    ];

    const maxOrders = allMenuData[0]?.orders || 1;
    allMenuData.forEach((item, index) => {
      const performance = Math.round((item.orders / maxOrders) * 100);
      lines.push(toCSVRow([
        index + 1,
        item.name,
        item.category,
        formatNumber(item.price),
        item.orders,
        formatNumber(item.revenue),
        `${performance}%`
      ]));
    });

    // 카테고리별 집계
    const categoryStats: Record<string, { orders: number; revenue: number }> = {};
    allMenuData.forEach(item => {
      if (!categoryStats[item.category]) {
        categoryStats[item.category] = { orders: 0, revenue: 0 };
      }
      categoryStats[item.category].orders += item.orders;
      categoryStats[item.category].revenue += item.revenue;
    });

    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('CATEGORY SUMMARY');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push('Category,Items,Total Orders,Total Revenue,Avg per Item');

    Object.entries(categoryStats)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .forEach(([category, stats]) => {
        const itemCount = allMenuData.filter(m => m.category === category).length;
        const avgPerItem = itemCount > 0 ? stats.revenue / itemCount : 0;
        lines.push(toCSVRow([category, itemCount, stats.orders, formatNumber(stats.revenue), formatNumber(avgPerItem)]));
      });

    return lines.join('\n');
  }, [generateCSVHeader, allMenuData]);

  // What and Why: Customer Insights 탭 CSV 생성
  const generateCustomersCSV = useCallback((): string => {
    const header = generateCSVHeader();
    const repeatCustomers = customers.filter((c: any) => c.total_orders > 1).length;
    const totalCustomerRevenue = customers.reduce((sum: number, c: any) => sum + parseFloat(c.total_spent || 0), 0);
    const avgSpentPerCustomer = customers.length > 0 ? totalCustomerRevenue / customers.length : 0;
    const memberCount = customers.filter((c: any) => c.customer?.type === 'member').length;
    const guestCount = customers.filter((c: any) => c.customer?.type === 'guest').length;

    const lines = [
      ...header,
      '═══════════════════════════════════════════════════════════════',
      'CUSTOMER INSIGHTS',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Summary',
      `Total Customers,${customers.length}`,
      `Members,${memberCount}`,
      `Guests,${guestCount}`,
      `Repeat Customers,${repeatCustomers}`,
      `Repeat Rate,${customers.length > 0 ? formatNumber((repeatCustomers / customers.length) * 100, 1) : 0}%`,
      `Total Revenue from Customers,${formatNumber(totalCustomerRevenue)}`,
      `Average Spent per Customer,${formatNumber(avgSpentPerCustomer)}`,
      '',
      '═══════════════════════════════════════════════════════════════',
      'TOP CUSTOMERS (by Total Spent)',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Rank,Customer Name,Phone,Type,Total Orders,Total Spent,Points,Tier',
    ];

    customers
      .sort((a: any, b: any) => parseFloat(b.total_spent || 0) - parseFloat(a.total_spent || 0))
      .forEach((customerData: any, index: number) => {
        lines.push(toCSVRow([
          index + 1,
          customerData.customer?.name || 'N/A',
          customerData.customer?.phone || 'N/A',
          customerData.customer?.type === 'member' ? 'Member' : 'Guest',
          customerData.total_orders || 0,
          formatNumber(parseFloat(customerData.total_spent || 0)),
          customerData.points || 0,
          customerData.loyalty_tier || 'Bronze'
        ]));
      });

    // 티어별 통계
    const tierStats: Record<string, { count: number; totalSpent: number; totalOrders: number }> = {};
    customers.forEach((c: any) => {
      const tier = c.loyalty_tier || 'Bronze';
      if (!tierStats[tier]) {
        tierStats[tier] = { count: 0, totalSpent: 0, totalOrders: 0 };
      }
      tierStats[tier].count++;
      tierStats[tier].totalSpent += parseFloat(c.total_spent || 0);
      tierStats[tier].totalOrders += c.total_orders || 0;
    });

    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('TIER BREAKDOWN');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push('Tier,Customer Count,Total Spent,Total Orders,Avg Spent');

    ['VIP', 'Gold', 'Silver', 'Bronze'].forEach(tier => {
      const stats = tierStats[tier];
      if (stats) {
        const avgSpent = stats.count > 0 ? stats.totalSpent / stats.count : 0;
        lines.push(toCSVRow([tier, stats.count, formatNumber(stats.totalSpent), stats.totalOrders, formatNumber(avgSpent)]));
      }
    });

    return lines.join('\n');
  }, [generateCSVHeader, customers]);

  // What and Why: Operations 탭 CSV 생성
  const generateOperationsCSV = useCallback((): string => {
    const header = generateCSVHeader();
    const totalOrders = filteredOrders.length;

    const lines = [
      ...header,
      '═══════════════════════════════════════════════════════════════',
      'OPERATIONS PERFORMANCE',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Summary',
      `Total Orders in Period,${totalOrders}`,
      `Peak Time Slots Analyzed,${peakTimesData.length}`,
      '',
      '═══════════════════════════════════════════════════════════════',
      'PEAK HOURS ANALYSIS (Top 5)',
      '═══════════════════════════════════════════════════════════════',
      '',
      'Rank,Time Slot,Orders,Revenue,Efficiency %',
    ];

    peakTimesData.forEach((item, index) => {
      lines.push(toCSVRow([
        index + 1,
        item.time,
        item.orders,
        formatNumber(item.revenue),
        `${item.efficiency}%`
      ]));
    });

    // 전체 시간대별 분석
    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('HOURLY BREAKDOWN (All Hours)');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push('Hour,Orders');

    hourlyData.forEach(item => {
      lines.push(`${escapeCSV(item.hour)},${item.orders}`);
    });

    return lines.join('\n');
  }, [generateCSVHeader, filteredOrders, peakTimesData, hourlyData]);

  // What and Why: 탭별 CSV 생성 및 다운로드 통합 함수
  const handleDownloadReport = useCallback(() => {
    let csvContent: string;

    switch (activeTab) {
      case 'sales':
        csvContent = generateSalesCSV();
        break;
      case 'details':
        csvContent = generateDetailsCSV();
        break;
      case 'menu':
        csvContent = generateMenuCSV();
        break;
      case 'customers':
        csvContent = generateCustomersCSV();
        break;
      case 'operations':
        csvContent = generateOperationsCSV();
        break;
      default:
        csvContent = generateSalesCSV();
    }

    const filename = generateFilename(
      `purplepos_${user?.restaurantId || 'report'}`,
      activeTab,
      activePeriod,
      isCustomDateRange,
      dateRange.start,
      dateRange.end
    );

    downloadCSV(csvContent, filename);
  }, [activeTab, activePeriod, isCustomDateRange, dateRange, user?.restaurantId, generateSalesCSV, generateDetailsCSV, generateMenuCSV, generateCustomersCSV, generateOperationsCSV]);


  // Handle date range change from filter component
  const handleDateRangeFieldChange = (field: 'start' | 'end', value: string) => {
    setDateRange({ ...dateRange, [field]: value });
    setIsCustomDateRange(true);
  };

  // Filter component using common DateRangeFilter
  const FilterComponent = () => (
    <DateRangeFilter
      activePeriod={activePeriod}
      dateRange={dateRange}
      isCustomDateRange={isCustomDateRange}
      onPeriodChange={handlePeriodChange}
      onDateRangeChange={handleDateRangeFieldChange}
      onDownload={handleDownloadReport}
      showDownload={true}
      timezone={operationSettings?.timeZone}
    />
  );

  return (
    <MainLayout>
      <ReportsContainer>
        <PageHeader title="Reports" />

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
              {loading || ordersLoading ? (
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
                      <StatValue>{formatCurrency(totalRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{filteredOrders.length} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>Total Orders</StatLabel>
                      <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                      <StatDescription>For selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>Average Order Value</StatLabel>
                      <StatValue>{formatCurrency(filteredOrders.length > 0 ? (totalRevenue / filteredOrders.length) : 0, operationSettings.currency)}</StatValue>
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
              {loading || ordersLoading ? (
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
                      <StatValue>{formatCurrency(totalRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{filteredOrders.length} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>Total Orders</StatLabel>
                      <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                      <StatDescription>{filteredOrders.filter(o => o.status === 'completed').length} completed</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>Average Order Value</StatLabel>
                      <StatValue>{formatCurrency(filteredOrders.length > 0 ? (totalRevenue / filteredOrders.length) : 0, operationSettings.currency)}</StatValue>
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
                  <StatDescription>{allMenuData[0]?.orders || 0} sold in selected period</StatDescription>
                </StatCard>
                <StatCard color="#10B981">
                  <StatLabel>Menu Items</StatLabel>
                  <StatValue>{allMenuData.length}</StatValue>
                  <StatDescription>Items with sales</StatDescription>
                </StatCard>
                <StatCard color="#3B82F6">
                  <StatLabel>Items Sold</StatLabel>
                  <StatValue>{allMenuData.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}</StatValue>
                  <StatDescription>Total quantity sold</StatDescription>
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
                      <TableHeader>Qty Sold</TableHeader>
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
              {loading || ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading customer data...</div>
              ) : filteredCustomers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No customers with orders in the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#635BFF">
                      <StatLabel>Active Customers</StatLabel>
                      <StatValue>{filteredCustomers.length.toLocaleString()}</StatValue>
                      <StatDescription>{filteredCustomers.filter((c: any) => c.customer?.type === 'member').length} members, {filteredCustomers.filter((c: any) => c.customer?.type === 'guest').length} guests</StatDescription>
                    </StatCard>
                    <StatCard color="#00D924">
                      <StatLabel>Repeat Customers</StatLabel>
                      <StatValue>{filteredCustomers.filter((c: any) => c.period_orders > 1).length}</StatValue>
                      <StatDescription>{filteredCustomers.length > 0 ? Math.round((filteredCustomers.filter((c: any) => c.period_orders > 1).length / filteredCustomers.length) * 100) : 0}% ordered multiple times</StatDescription>
                    </StatCard>
                    <StatCard color="#FFB800">
                      <StatLabel>Average Spent</StatLabel>
                      <StatValue>{formatCurrency(filteredCustomers.length > 0 ? (filteredCustomers.reduce((sum: number, c: any) => sum + (c.period_spent || 0), 0) / filteredCustomers.length) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>Per customer in period</StatDescription>
                    </StatCard>
                    <StatCard color="#8B5CF6">
                      <StatLabel>Period Revenue</StatLabel>
                      <StatValue>{formatCurrency(filteredCustomers.reduce((sum: number, c: any) => sum + (c.period_spent || 0), 0), operationSettings.currency)}</StatValue>
                      <StatDescription>From {filteredCustomers.length} customers</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Top Customers ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
                    <Table>
                      <thead>
                        <tr>
                          <TableHeader>Rank</TableHeader>
                          <TableHeader>Name</TableHeader>
                          <TableHeader>Phone</TableHeader>
                          <TableHeader>Type</TableHeader>
                          <TableHeader>Period Orders</TableHeader>
                          <TableHeader>Period Spent</TableHeader>
                          <TableHeader>Total Points</TableHeader>
                          <TableHeader>Tier</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers
                          .slice(0, 20)
                          .map((customerData: any, index: number) => (
                            <tr key={customerData.customer?.id || index} style={{
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
                              <TableCell style={{ fontWeight: 600 }}>{customerData.customer?.name || 'Guest'}</TableCell>
                              <TableCell>{customerData.customer?.phone || '-'}</TableCell>
                              <TableCell>
                                <span style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  backgroundColor: customerData.customer?.type === 'member' ? '#E0F2FE' : '#F3F4F6',
                                  color: customerData.customer?.type === 'member' ? '#0369A1' : '#6B7280'
                                }}>
                                  {customerData.customer?.type === 'member' ? 'Member' : 'Guest'}
                                </span>
                              </TableCell>
                              <TableCell>{customerData.period_orders || 0}</TableCell>
                              <TableCell>{formatCurrency(customerData.period_spent || 0, operationSettings.currency)}</TableCell>
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
              {loading || ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading operations data...</div>
              ) : filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#10B981">
                      <StatLabel>Completed Orders</StatLabel>
                      <StatValue>{filteredOrders.length.toLocaleString()}</StatValue>
                      <StatDescription>{operationsStats.completionRate}% fulfillment rate</StatDescription>
                    </StatCard>
                    <StatCard color="#F59E0B">
                      <StatLabel>Avg. Prep Time</StatLabel>
                      <StatValue>{operationsStats.avgPrepTime > 0 ? `${operationsStats.avgPrepTime} min` : 'N/A'}</StatValue>
                      <StatDescription>{operationsStats.avgPrepTime > 0 ? 'Order to served' : 'No timing data'}</StatDescription>
                    </StatCard>
                    <StatCard color="#EF4444">
                      <StatLabel>Peak Hour</StatLabel>
                      <StatValue>{operationsStats.peakHour}</StatValue>
                      <StatDescription>{operationsStats.peakHourOrders} orders in this slot</StatDescription>
                    </StatCard>
                    <StatCard color="#6366F1">
                      <StatLabel>Orders per Day</StatLabel>
                      <StatValue>{(() => {
                        const days = Math.max(1, Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) + 1);
                        return Math.round(filteredOrders.length / days);
                      })()}</StatValue>
                      <StatDescription>Average daily orders</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Peak Hours Performance ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
                    <Table>
                      <thead>
                        <tr>
                          <TableHeader>Time Slot</TableHeader>
                          <TableHeader>Orders</TableHeader>
                          <TableHeader>Revenue</TableHeader>
                          <TableHeader>Share</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {peakTimesData.length === 0 ? (
                          <tr>
                            <TableCell colSpan={4} style={{ textAlign: 'center', color: '#6B7C93' }}>
                              No peak hours data available
                            </TableCell>
                          </tr>
                        ) : (
                          peakTimesData.map((item, index) => (
                            <tr key={index} style={{
                              backgroundColor: index === 0 ? '#FEF3C7' : 'transparent'
                            }}>
                              <TableCell style={{ fontWeight: 600 }}>
                                {index === 0 && '🔥 '}{item.time}
                              </TableCell>
                              <TableCell>{item.orders}</TableCell>
                              <TableCell>{formatCurrency(item.revenue, operationSettings.currency)}</TableCell>
                              <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <ProgressBar percentage={filteredOrders.length > 0 ? (item.orders / filteredOrders.length) * 100 : 0} />
                                  <span style={{ fontSize: '12px', color: '#6B7C93' }}>
                                    {filteredOrders.length > 0 ? Math.round((item.orders / filteredOrders.length) * 100) : 0}%
                                  </span>
                                </div>
                              </TableCell>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </TableCard>

                  <ChartCard style={{ marginTop: '24px' }}>
                    <ChartTitle>Hourly Order Distribution</ChartTitle>
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
                        <Bar dataKey="orders" fill="#6366F1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              )}
          </div>

        </Content>
      </ReportsContainer>
    </MainLayout>
  );
};

export default ReportsPage;