import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { getRestaurantTimezone } from '../../utils/timezone';
import { downloadCSV, escapeCSV, toCSVRow, generateFilename } from '../../utils/csvDownload';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import PageHeader from '../../components/Common/PageHeader';
import DateRangeFilter, { PeriodType } from '../../components/Common/DateRangeFilter';

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

// Tabs and Tab components now imported from Common/TabComponents

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

  const [activeTab, handleTabChange] = useTabParam<TabType>('sales');

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
  const [, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [, setMenuItems] = useState<any[]>([]);
  const [, setCategories] = useState<any[]>([]);

  // What and Why: 서버 집계 데이터 - 10000개 주문 클라이언트 처리 대신 서버에서 집계된 요약 데이터 사용
  const [reportsSummary, setReportsSummary] = useState<any>(null);

  // Drilldown state for Sales Details tab
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // Re-initialize date range when operationSettings loads (to apply correct timezone)
  useEffect(() => {
    if (operationSettings && !isCustomDateRange) {
      handlePeriodChange(activePeriod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationSettings?.timeZone]);

  // What and Why: 서버 집계 데이터 사용 - 기존 클라이언트 계산 대신 서버에서 받은 데이터 활용
  // 서버에서 dailySales 배열로 제공되므로 그대로 사용하여 성능 최적화
  const salesData = useMemo(() => {
    if (!reportsSummary?.dailySales || reportsSummary.dailySales.length === 0) {
      return [];
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (activePeriod === 'today') {
      // 오늘은 시간대별로 표시 - hourlySales 사용
      if (reportsSummary.hourlySales) {
        return reportsSummary.hourlySales
          .filter((h: any) => h.orders > 0)
          .map((h: any) => {
            const hour = h.hour;
            const hourLabel = hour === 12 ? '12PM' : hour > 12 ? `${hour - 12}PM` : hour === 0 ? '12AM' : `${hour}AM`;
            return { date: hourLabel, sales: Math.round(h.revenue) };
          });
      }
      return [];
    } else if (activePeriod === 'week') {
      // 주간은 요일명으로 표시
      return reportsSummary.dailySales.map((d: any) => {
        const date = new Date(d.date);
        return {
          date: dayNames[date.getDay()],
          sales: Math.round(d.revenue)
        };
      });
    } else if (activePeriod === 'month') {
      // 월간은 MM/DD 형식으로 표시
      return reportsSummary.dailySales.map((d: any) => {
        const [, month, day] = d.date.split('-');
        return {
          date: `${month}/${day}`,
          sales: Math.round(d.revenue)
        };
      });
    } else {
      // 연간/전체는 월별로 그룹화
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyData: Record<string, number> = {};

      reportsSummary.dailySales.forEach((d: any) => {
        const month = parseInt(d.date.split('-')[1]) - 1;
        const monthName = monthNames[month];
        monthlyData[monthName] = (monthlyData[monthName] || 0) + d.revenue;
      });

      return monthNames.map(month => ({
        date: month,
        sales: Math.round(monthlyData[month] || 0)
      }));
    }
  }, [reportsSummary, activePeriod]);

  // What and Why: 서버 집계 데이터에서 총 매출 직접 사용
  const totalRevenue = useMemo(() => {
    return reportsSummary?.summary?.totalRevenue || 0;
  }, [reportsSummary]);

  // What and Why: 서버 집계 데이터에서 총 주문 수 직접 사용
  const totalOrders = useMemo(() => {
    return reportsSummary?.summary?.totalOrders || 0;
  }, [reportsSummary]);

  // What and Why: 서버 집계 데이터에서 카테고리별 매출 직접 사용
  const categoryData = useMemo(() => {
    if (!reportsSummary?.categorySales || reportsSummary.categorySales.length === 0) {
      return [{ name: 'No Data', value: 100, sales: 0 }];
    }

    const totalSales = reportsSummary.categorySales.reduce((sum: number, c: any) => sum + c.revenue, 0);

    return reportsSummary.categorySales.map((c: any) => ({
      name: c.category,
      value: totalSales > 0 ? Math.round((c.revenue / totalSales) * 100) : 0,
      sales: Math.round(c.revenue)
    }));
  }, [reportsSummary]);

  // What and Why: 서버 집계 데이터에서 메뉴 성능 직접 사용
  const allMenuData = useMemo(() => {
    if (!reportsSummary?.menuSales || reportsSummary.menuSales.length === 0) {
      return [];
    }

    const maxQuantity = reportsSummary.menuSales[0]?.quantity || 1;

    return reportsSummary.menuSales.map((item: any) => ({
      name: item.name,
      category: item.category,
      price: item.quantity > 0 ? item.revenue / item.quantity : 0,
      orders: item.quantity,
      revenue: Math.round(item.revenue),
      performance: Math.round((item.quantity / maxQuantity) * 100)
    }));
  }, [reportsSummary]);

  // What and Why: 서버 집계 데이터에서 시간대별 주문 분포 직접 사용
  const hourlyData = useMemo(() => {
    if (!reportsSummary?.hourlySales) return [];

    return reportsSummary.hourlySales
      .filter((h: any) => h.orders > 0)
      .map((h: any) => {
        const hour = h.hour;
        const hourLabel = hour === 0 ? '12AM' : hour === 12 ? '12PM' : hour > 12 ? `${hour - 12}PM` : `${hour}AM`;
        return { hour: hourLabel, orders: h.orders };
      });
  }, [reportsSummary]);

  // What and Why: Customer 탭은 현재 구현 유지 (서버 집계에서 customer별 데이터 미제공)
  // 향후 개선: 서버에서 customer별 집계 데이터 제공 시 최적화 가능
  const filteredCustomers = useMemo(() => {
    // Customer 탭은 기존 고객 목록 그대로 반환 (기간별 필터링 제외)
    // 서버 집계 API에서 customer별 데이터를 제공하지 않으므로 전체 고객 목록 표시
    return customers.map((c: any) => ({
      ...c,
      period_orders: c.total_orders || 0,
      period_spent: c.total_spent || 0
    })).sort((a: any, b: any) => b.period_spent - a.period_spent);
  }, [customers]);

  // What and Why: 서버 집계 데이터에서 운영 통계 계산
  const operationsStats = useMemo(() => {
    if (!reportsSummary?.hourlySales) {
      return {
        completionRate: 0,
        avgPrepTime: 0,
        peakHour: 'N/A',
        peakHourOrders: 0,
        totalOrdersInPeak: 0
      };
    }

    // 완료율: 서버에서 completed 주문만 가져오므로 100%
    const completionRate = 100;

    // 평균 조리 시간은 서버에서 제공하지 않으므로 0 (향후 API 확장 가능)
    const avgPrepTime = 0;

    // 피크 시간 찾기 (hourlySales에서)
    let peakHour = 12;
    let maxOrders = 0;

    reportsSummary.hourlySales.forEach((h: any) => {
      if (h.orders > maxOrders) {
        maxOrders = h.orders;
        peakHour = h.hour;
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
  }, [reportsSummary]);

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
        fetch(`/api/menu?restaurantId=${user.restaurantId}&excludeImage=true`, {
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

  // What and Why: 서버 집계 API 사용 - 10000개 주문 전송 대신 집계된 요약만 전송하여 성능 최적화
  // 기존: 클라이언트에서 10000개 주문 데이터 처리 → 느린 로딩, 많은 메모리 사용
  // 개선: 서버에서 집계 후 요약 데이터만 전송 → 빠른 로딩, 적은 데이터 전송
  const fetchReportsSummary = useCallback(async () => {
    if (!user?.restaurantId) return;

    const token = localStorage.getItem('auth_token');
    if (!token) return;

    setOrdersLoading(true);

    try {
      const params = new URLSearchParams({
        startDate: dateRange.start,
        endDate: dateRange.end
      });

      const response = await fetch(
        `/api/dashboard/restaurant/${user.restaurantId}/reports-summary?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReportsSummary(data.data);
          // orders는 이제 빈 배열 유지 (기존 호환성을 위해 최소 데이터만 설정)
          // drilldown과 customer 탭은 별도 처리 필요
          setOrders([]);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching reports summary:', error);
    } finally {
      setOrdersLoading(false);
    }
  }, [user?.restaurantId, dateRange.start, dateRange.end]);

  // Fetch static data on mount (stats, customers, menu)
  useEffect(() => {
    fetchStaticData();
  }, [fetchStaticData]);

  // Fetch reports summary when date range changes (server-side aggregated)
  useEffect(() => {
    fetchReportsSummary();
  }, [fetchReportsSummary]);


  // What and Why: 서버 집계 데이터에서 피크 타임 직접 계산
  const peakTimesData = useMemo(() => {
    if (!reportsSummary?.hourlySales) return [];

    const totalOrdersCount = reportsSummary.summary?.totalOrders || 1;

    return reportsSummary.hourlySales
      .filter((h: any) => h.orders > 0)
      .map((h: any) => {
        const hour = h.hour;
        const timeSlot = `${hour.toString().padStart(2, '0')}:00-${((hour + 1) % 24).toString().padStart(2, '0')}:00`;
        return {
          time: timeSlot,
          orders: h.orders,
          revenue: Math.round(h.revenue),
          efficiency: Math.min(100, Math.round((h.orders / (totalOrdersCount / 24)) * 100))
        };
      })
      .sort((a: any, b: any) => b.orders - a.orders)
      .slice(0, 5);
  }, [reportsSummary]);

  // What and Why: 서버 집계 데이터(dailySales)에서 drilldown 데이터 구성
  const drilldownData = useMemo(() => {
    if (!reportsSummary?.dailySales || reportsSummary.dailySales.length === 0) return {};

    const yearData: Record<string, any> = {};

    reportsSummary.dailySales.forEach((dayData: any) => {
      const [year, monthNum] = dayData.date.split('-');
      const month = `${year}-${monthNum}`; // "2025-11"
      const day = dayData.date; // "2025-11-09"

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

      const amount = dayData.revenue;
      const orders = dayData.orders;

      // Aggregate data
      yearData[year].revenue += amount;
      yearData[year].orders += orders;
      yearData[year].months[month].revenue += amount;
      yearData[year].months[month].orders += orders;
      yearData[year].months[month].days[day].revenue += amount;
      yearData[year].months[month].days[day].orders += orders;
    });

    return yearData;
  }, [reportsSummary]);

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
  }, [dateRange.start, dateRange.end, totalOrders]);

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
  const handlePeriodChange = async (period: PeriodType) => {
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
        // Fetch earliest order date from server
        try {
          const token = localStorage.getItem('auth_token');
          const res = await fetch(
            `/api/dashboard/restaurant/${user?.restaurantId}/earliest-order`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          const data = await res.json();
          if (data.success && data.data.earliestDate) {
            start = new Date(data.data.earliestDate);
          } else {
            start = new Date(now.getFullYear() - 5, 0, 1);
          }
        } catch {
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

  // What and Why: CSV 공통 헤더 생성 (간소화 - DB 스타일)

  // What and Why: Sales Report 탭 CSV 생성 (실무용 간단 형식)
  const generateSalesCSV = useCallback((): string => {
    // DB 스타일 - 컬럼 헤더 + 데이터 행
    const lines = [
      'Date,Revenue'
    ];

    // 기간별 매출 데이터
    salesData.forEach(item => {
      lines.push(`${escapeCSV(item.date)},${formatNumber(item.sales)}`);
    });

    return lines.join('\n');
  }, [salesData]);

  // What and Why: Sales Details 탭 CSV 생성 (일별 상세)
  const generateDetailsCSV = useCallback((): string => {
    // DB 스타일 - 날짜별 상세 데이터
    const lines = [
      'Date,Revenue,Orders,Avg_Order_Value'
    ];

    // 일별 데이터 출력 (최신순)
    Object.keys(drilldownData).sort((a, b) => b.localeCompare(a)).forEach(year => {
      const yearInfo = drilldownData[year];
      Object.keys(yearInfo.months).sort((a, b) => b.localeCompare(a)).forEach(month => {
        const monthInfo = yearInfo.months[month];
        Object.keys(monthInfo.days).sort((a, b) => b.localeCompare(a)).forEach(day => {
          const dayInfo = monthInfo.days[day];
          const dayAvg = dayInfo.orders > 0 ? dayInfo.revenue / dayInfo.orders : 0;
          lines.push(`${day},${formatNumber(dayInfo.revenue)},${dayInfo.orders},${formatNumber(dayAvg)}`);
        });
      });
    });

    return lines.join('\n');
  }, [drilldownData]);

  // What and Why: Menu Analysis 탭 CSV 생성 (실무용 간단 형식)
  const generateMenuCSV = useCallback((): string => {
    // DB 스타일 - 메뉴 아이템별 판매 데이터
    const lines = [
      'Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue'
    ];

    allMenuData.forEach((item, index) => {
      lines.push(toCSVRow([
        index + 1,
        item.name,
        item.category,
        formatNumber(item.price),
        item.orders,
        formatNumber(item.revenue)
      ]));
    });

    return lines.join('\n');
  }, [allMenuData]);

  // What and Why: Customer Insights 탭 CSV 생성 (실무용 간단 형식)
  const generateCustomersCSV = useCallback((): string => {
    // DB 스타일 - 고객별 데이터
    const lines = [
      'Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier'
    ];

    [...filteredCustomers]
      .sort((a: any, b: any) => (b.period_spent || 0) - (a.period_spent || 0))
      .forEach((customerData: any, index: number) => {
        lines.push(toCSVRow([
          index + 1,
          customerData.customer?.name || 'Guest',
          customerData.customer?.phone || '-',
          customerData.customer?.type === 'member' ? 'Member' : 'Guest',
          customerData.period_orders || 0,
          formatNumber(customerData.period_spent || 0),
          customerData.points || 0,
          customerData.loyalty_tier || 'Bronze'
        ]));
      });

    return lines.join('\n');
  }, [filteredCustomers]);

  // What and Why: Operations 탭 CSV 생성 (실무용 간단 형식)
  const generateOperationsCSV = useCallback((): string => {
    // DB 스타일 - 시간대별 주문 데이터
    const lines = [
      'Time_Slot,Orders,Revenue'
    ];

    peakTimesData.forEach(item => {
      lines.push(toCSVRow([
        item.time,
        item.orders,
        formatNumber(item.revenue)
      ]));
    });

    return lines.join('\n');
  }, [peakTimesData]);

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
    <>
      <ReportsContainer>
        <PageHeader title="Reports" />

        <Content>
          <Tabs>
            <Tab active={activeTab === 'sales'} onClick={() => handleTabChange('sales')}>
              Sales Report
            </Tab>
            <Tab active={activeTab === 'details'} onClick={() => handleTabChange('details')}>
              Sales Details
            </Tab>
            <Tab active={activeTab === 'menu'} onClick={() => handleTabChange('menu')}>
              Menu Analysis
            </Tab>
            <Tab active={activeTab === 'customers'} onClick={() => handleTabChange('customers')}>
              Customer Insights
            </Tab>
            <Tab active={activeTab === 'operations'} onClick={() => handleTabChange('operations')}>
              Operations
            </Tab>
          </Tabs>

          {/* Sales Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
          <div style={{ display: activeTab === 'sales' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading || ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>Total Revenue</StatLabel>
                      <StatValue>{formatCurrency(totalRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{totalOrders} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>Total Orders</StatLabel>
                      <StatValue>{totalOrders.toLocaleString()}</StatValue>
                      <StatDescription>For selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>Average Order Value</StatLabel>
                      <StatValue>{formatCurrency(totalOrders > 0 ? (totalRevenue / totalOrders) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>Per order</StatDescription>
                    </StatCard>
                    <StatCard color="#7C3AED">
                      <StatLabel>Completed Orders</StatLabel>
                      <StatValue>{totalOrders}</StatValue>
                      <StatDescription>100% completion rate</StatDescription>
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
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>Total Revenue</StatLabel>
                      <StatValue>{formatCurrency(totalRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{totalOrders} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>Total Orders</StatLabel>
                      <StatValue>{totalOrders.toLocaleString()}</StatValue>
                      <StatDescription>{totalOrders} completed</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>Average Order Value</StatLabel>
                      <StatValue>{formatCurrency(totalOrders > 0 ? (totalRevenue / totalOrders) : 0, operationSettings.currency)}</StatValue>
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
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#10B981">
                      <StatLabel>Completed Orders</StatLabel>
                      <StatValue>{totalOrders.toLocaleString()}</StatValue>
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
                        return Math.round(totalOrders / days);
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
                                  <ProgressBar percentage={totalOrders > 0 ? (item.orders / totalOrders) * 100 : 0} />
                                  <span style={{ fontSize: '12px', color: '#6B7C93' }}>
                                    {totalOrders > 0 ? Math.round((item.orders / totalOrders) * 100) : 0}%
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
    </>
  );
};

export default ReportsPage;