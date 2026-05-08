import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { getPaymentMethodLabel } from '../../constants';
import { formatDateTime } from '../../utils/timezone';
import { downloadCSV, escapeCSV, toCSVRow, generateFilename } from '../../utils/csvDownload';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import PageHeader from '../../components/Common/PageHeader';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import DailySettlementPrint from './DailySettlementPrint';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// 스타일 컴포넌트
const ReportsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;


// Note: FilterControls, DateButton, DateRangeInput styles moved to DatePeriodFilter component


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

// Payment filter button style
const PaymentFilterBtn = styled.button<{ active?: boolean }>`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7C93'};

  &:hover {
    border-color: #635BFF;
    color: ${props => props.active ? 'white' : '#635BFF'};
  }
`;

const PaymentFilterRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const StaffMealBanner = styled.div`
  background: #FFF7ED;
  border: 1px solid #FDBA74;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

// 타입 정의
type TabType = 'sales' | 'details' | 'menu' | 'customers' | 'operations' | 'payment';
// PeriodType imported from DatePeriodFilter component

// 차트 색상
const COLORS = ['#635BFF', '#6FCF97', '#FF6B6B', '#FFB800', '#0EA5E9', '#8B5CF6'];

const ReportsPage: React.FC = () => {
  const { t } = useTranslation('reports');
  const { user } = useAuth();
  const { operationSettings, paymentSettings } = useStore();

  const [activeTab, handleTabChange] = useTabParam<TabType>('sales');

  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
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

  // Daily Settlement Print modal
  const [showSettlement, setShowSettlement] = useState(false);

  // Payment Analysis tab state
  const [cardTypeFilter, setCardTypeFilter] = useState<string>('all');

  // Drilldown state for Sales Details tab
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // Date range is now calculated by DatePeriodFilter without timezone dependency

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
      const token = getAuthToken();
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

    const token = getAuthToken();
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

  // Payment method label helper using restaurant payment settings
  const getLabel = (method: string) => getPaymentMethodLabel(method, paymentSettings || undefined);

  const CARD_TYPE_LABELS: Record<string, string> = {
    visa: 'Visa',
    master: 'Mastercard',
    amex: 'Amex',
    other: 'Other'
  };

  // Payment method data from API
  const paymentMethodData = useMemo(() => {
    if (!reportsSummary?.paymentMethodSales) return [];
    return reportsSummary.paymentMethodSales
      .sort((a: any, b: any) => b.revenue - a.revenue);
  }, [reportsSummary]);

  // Card type data filtered by selected type
  const cardTypeData = useMemo(() => {
    if (!reportsSummary?.cardTypeSales) return [];
    if (cardTypeFilter === 'all') return reportsSummary.cardTypeSales;
    return reportsSummary.cardTypeSales.filter((c: any) => c.type === cardTypeFilter);
  }, [reportsSummary, cardTypeFilter]);

  // Available card types from data
  const availableCardTypes = useMemo(() => {
    if (!reportsSummary?.cardTypeSales) return [];
    return reportsSummary.cardTypeSales.map((c: any) => c.type);
  }, [reportsSummary]);

  // Staff meal data
  const staffMealData = useMemo(() => {
    return reportsSummary?.staffMeal || { revenue: 0, orders: 0 };
  }, [reportsSummary]);

  // Total payment revenue (for percentage calculation)
  const totalPaymentRevenue = useMemo(() => {
    return paymentMethodData.reduce((sum: number, p: any) => sum + p.revenue, 0);
  }, [paymentMethodData]);

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
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period, operationSettings.timeZone));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
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

  // Payment Analysis 탭 CSV 생성
  const generatePaymentCSV = useCallback((): string => {
    const lines = [
      'Payment_Method,Orders,Revenue,Percentage'
    ];

    paymentMethodData.forEach((item: any) => {
      const pct = totalPaymentRevenue > 0 ? ((item.revenue / totalPaymentRevenue) * 100).toFixed(1) : '0.0';
      lines.push(toCSVRow([
        getLabel(item.method),
        item.orders,
        formatNumber(item.revenue),
        `${pct}%`
      ]));
    });

    if (cardTypeData.length > 0) {
      lines.push('');
      lines.push('Card_Type,Orders,Revenue');
      cardTypeData.forEach((item: any) => {
        lines.push(toCSVRow([
          CARD_TYPE_LABELS[item.type] || item.type,
          item.orders,
          formatNumber(item.revenue)
        ]));
      });
    }

    if (staffMealData.orders > 0) {
      lines.push('');
      lines.push('Staff_Meal,Orders,Amount');
      lines.push(toCSVRow(['Staff Meal (Excluded from revenue)', staffMealData.orders, formatNumber(staffMealData.revenue)]));
    }

    return lines.join('\n');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodData, cardTypeData, staffMealData, totalPaymentRevenue]);

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
      case 'payment':
        csvContent = generatePaymentCSV();
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
  }, [activeTab, activePeriod, isCustomDateRange, dateRange, user?.restaurantId, generateSalesCSV, generateDetailsCSV, generateMenuCSV, generateCustomersCSV, generateOperationsCSV, generatePaymentCSV]);


  // Filter component using common DatePeriodFilter
  const FilterComponent = () => (
    <DatePeriodFilter
      activePeriod={activePeriod}
      dateRange={dateRange}
      isCustomDateRange={isCustomDateRange}
      onPeriodChange={handlePeriodChange}
      onCalendarRangeSelect={handleCalendarRangeSelect}
    >
      <button
        onClick={handleDownloadReport}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', background: '#F6F9FC', color: '#0A2540',
          border: '1px solid #E6EBF1', borderRadius: '6px', cursor: 'pointer',
          fontSize: '14px', marginLeft: 'auto'
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download
      </button>
      <button
        onClick={() => setShowSettlement(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', background: '#F6F9FC', color: '#0A2540',
          border: '1px solid #E6EBF1', borderRadius: '6px', cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
          <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Daily Settlement
      </button>
    </DatePeriodFilter>
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
            <Tab active={activeTab === 'payment'} onClick={() => handleTabChange('payment')}>
              Payment Analysis
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
                <div style={{ textAlign: 'center', padding: '40px' }}>{t('reports:reportsPage.loading')}</div>
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>{t('reports:reportsPage.totalRevenue')}</StatLabel>
                      <StatValue>{formatCurrency(totalRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{totalOrders} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>{t('reports:reportsPage.totalOrders')}</StatLabel>
                      <StatValue>{totalOrders.toLocaleString()}</StatValue>
                      <StatDescription>{t('reports:reportsPage.forSelectedPeriod')}</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>{t('reports:reportsPage.averageOrderValue')}</StatLabel>
                      <StatValue>{formatCurrency(totalOrders > 0 ? (totalRevenue / totalOrders) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>{t('reports:reportsPage.perOrder')}</StatDescription>
                    </StatCard>
                    <StatCard color="#7C3AED">
                      <StatLabel>{t('reports:reportsPage.completedOrders')}</StatLabel>
                      <StatValue>{totalOrders}</StatValue>
                      <StatDescription>100% completion rate</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <ChartGrid>
                <ChartCard>
                  <ChartTitle>{t('reports:reportsPage.revenueTrend')}</ChartTitle>
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
                  <ChartTitle>{t('reports:reportsPage.salesByCategory')}</ChartTitle>
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
                <ChartTitle>{t('reports:reportsPage.hourlyOrdersDistribution')}</ChartTitle>
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
                <div style={{ textAlign: 'center', padding: '40px' }}>{t('reports:reportsPage.loading')}</div>
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>{t('reports:reportsPage.totalRevenue')}</StatLabel>
                      <StatValue>{formatCurrency(totalRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{totalOrders} orders in selected period</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>{t('reports:reportsPage.totalOrders')}</StatLabel>
                      <StatValue>{totalOrders.toLocaleString()}</StatValue>
                      <StatDescription>{totalOrders} completed</StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>{t('reports:reportsPage.averageOrderValue')}</StatLabel>
                      <StatValue>{formatCurrency(totalOrders > 0 ? (totalRevenue / totalOrders) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>{t('reports:reportsPage.perOrderAverage')}</StatDescription>
                    </StatCard>
                    <StatCard color="#7C3AED">
                      <StatLabel>{t('reports:reportsPage.period')}</StatLabel>
                      <StatValue>{isCustomDateRange ? getDateRangeDays() : activePeriod === 'today' ? '1' : activePeriod === 'week' ? '7' : activePeriod === 'month' ? '30' : activePeriod === 'year' ? '365' : getDateRangeDays()}</StatValue>
                      <StatDescription>{isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod === 'today' ? 'Day' : activePeriod === 'week' ? 'Days' : activePeriod === 'month' ? 'Days' : activePeriod === 'year' ? 'Days' : 'Days'}</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Detailed Sales Breakdown ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
                    <Table>
                      <thead>
                        <tr>
                          <TableHeader style={{ width: '40%' }}>{t('reports:reportsPage.period')}</TableHeader>
                          <TableHeader style={{ textAlign: 'right' }}>{t('reports:reportsPage.revenue')}</TableHeader>
                          <TableHeader style={{ textAlign: 'right' }}>{t('reports:reportsPage.orders')}</TableHeader>
                          <TableHeader style={{ textAlign: 'right' }}>{t('reports:reportsPage.avgOrderValue')}</TableHeader>
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
                                const monthName = formatDateTime(new Date(month + '-01'), operationSettings, { year: 'numeric', month: 'long', day: undefined, hour: undefined, minute: undefined, hour12: undefined });

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
                                      const dayName = formatDateTime(new Date(day), operationSettings, {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: undefined,
                                        minute: undefined,
                                        hour12: undefined
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
                  <StatLabel>{t('reports:reportsPage.bestSeller')}</StatLabel>
                  <StatValue>{allMenuData[0]?.name || 'N/A'}</StatValue>
                  <StatDescription>{allMenuData[0]?.orders || 0} sold in selected period</StatDescription>
                </StatCard>
                <StatCard color="#10B981">
                  <StatLabel>{t('reports:reportsPage.menuItems')}</StatLabel>
                  <StatValue>{allMenuData.length}</StatValue>
                  <StatDescription>{t('reports:reportsPage.itemsWithSales')}</StatDescription>
                </StatCard>
                <StatCard color="#3B82F6">
                  <StatLabel>{t('reports:reportsPage.itemsSold')}</StatLabel>
                  <StatValue>{allMenuData.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}</StatValue>
                  <StatDescription>{t('reports:reportsPage.totalQuantitySold')}</StatDescription>
                </StatCard>
                <StatCard color="#8B5CF6">
                  <StatLabel>{t('reports:reportsPage.totalRevenue')}</StatLabel>
                  <StatValue>{formatCurrency(allMenuData.reduce((sum, item) => sum + item.revenue, 0), operationSettings.currency)}</StatValue>
                  <StatDescription>{t('reports:reportsPage.forSelectedPeriod')}</StatDescription>
                </StatCard>
              </StatsRow>

              <TableCard>
                <ChartTitle>Complete Menu Performance Ranking ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
                <DataTable>
                  <DataTableHead>
                    <tr>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.rank')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.menuItem')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.category')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.price')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.qtySold')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.revenue')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="left">{t('reports:reportsPage.performance')}</DataTableHeaderCell>
                    </tr>
                  </DataTableHead>
                  <tbody>
                    {allMenuData.map((menu, index) => {
                      const maxOrders = allMenuData[0]?.orders || 1;
                      return (
                        <DataTableRow key={index} style={{
                          backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent'
                        }}>
                          <DataTableCell data-label={t('reports:reportsPage.rank')} style={{
                            fontWeight: 600,
                            color: index < 3 ? (index === 0 ? '#FFB800' : index === 1 ? '#0EA5E9' : '#6FCF97') : '#0A2540'
                          }}>
                            #{index + 1}
                            {index === 0 && ' 🥇'}
                            {index === 1 && ' 🥈'}
                            {index === 2 && ' 🥉'}
                          </DataTableCell>
                          <DataTableCell data-label={t('reports:reportsPage.menuItem')} style={{ fontWeight: 600 }}>{menu.name}</DataTableCell>
                          <DataTableCell data-label={t('reports:reportsPage.category')}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              backgroundColor: '#F3F4F6',
                              color: '#6B7280'
                            }}>
                              {menu.category}
                            </span>
                          </DataTableCell>
                          <DataTableCell data-label={t('reports:reportsPage.price')}>{formatCurrency(menu.price, operationSettings.currency)}</DataTableCell>
                          <DataTableCell data-label={t('reports:reportsPage.qtySold')}>{menu.orders.toLocaleString()}</DataTableCell>
                          <DataTableCell data-label={t('reports:reportsPage.revenue')}>{formatCurrency(menu.revenue, operationSettings.currency)}</DataTableCell>
                          <DataTableCell data-label={t('reports:reportsPage.performance')}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <ProgressBar percentage={(menu.orders / maxOrders) * 100} />
                              <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
                                {Math.round((menu.orders / maxOrders) * 100)}%
                              </span>
                            </div>
                          </DataTableCell>
                        </DataTableRow>
                      );
                    })}
                  </tbody>
                </DataTable>
              </TableCard>
          </div>

          {/* Customers Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
          <div style={{ display: activeTab === 'customers' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading || ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>{t('reports:reportsPage.loadingCustomerData')}</div>
              ) : filteredCustomers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No customers with orders in the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#635BFF">
                      <StatLabel>{t('reports:reportsPage.activeCustomers')}</StatLabel>
                      <StatValue>{filteredCustomers.length.toLocaleString()}</StatValue>
                      <StatDescription>{filteredCustomers.filter((c: any) => c.customer?.type === 'member').length} members, {filteredCustomers.filter((c: any) => c.customer?.type === 'guest').length} guests</StatDescription>
                    </StatCard>
                    <StatCard color="#6FCF97">
                      <StatLabel>{t('reports:reportsPage.repeatCustomers')}</StatLabel>
                      <StatValue>{filteredCustomers.filter((c: any) => c.period_orders > 1).length}</StatValue>
                      <StatDescription>{filteredCustomers.length > 0 ? Math.round((filteredCustomers.filter((c: any) => c.period_orders > 1).length / filteredCustomers.length) * 100) : 0}% ordered multiple times</StatDescription>
                    </StatCard>
                    <StatCard color="#FFB800">
                      <StatLabel>{t('reports:reportsPage.averageSpent')}</StatLabel>
                      <StatValue>{formatCurrency(filteredCustomers.length > 0 ? (filteredCustomers.reduce((sum: number, c: any) => sum + (c.period_spent || 0), 0) / filteredCustomers.length) : 0, operationSettings.currency)}</StatValue>
                      <StatDescription>{t('reports:reportsPage.perCustomerInPeriod')}</StatDescription>
                    </StatCard>
                    <StatCard color="#8B5CF6">
                      <StatLabel>{t('reports:reportsPage.periodRevenue')}</StatLabel>
                      <StatValue>{formatCurrency(filteredCustomers.reduce((sum: number, c: any) => sum + (c.period_spent || 0), 0), operationSettings.currency)}</StatValue>
                      <StatDescription>From {filteredCustomers.length} customers</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Top Customers ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
                    <DataTable>
                      <DataTableHead>
                        <tr>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.rank')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.name')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.phone')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.type')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.periodOrders')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.periodSpent')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.totalPoints')}</DataTableHeaderCell>
                          <DataTableHeaderCell align="left">{t('reports:reportsPage.tier')}</DataTableHeaderCell>
                        </tr>
                      </DataTableHead>
                      <tbody>
                        {filteredCustomers
                          .slice(0, 20)
                          .map((customerData: any, index: number) => (
                            <DataTableRow key={customerData.customer?.id || index} style={{
                              backgroundColor: index < 3 ? (index === 0 ? '#FFF9E6' : index === 1 ? '#F0F9FF' : '#F0FDF4') : 'transparent'
                            }}>
                              <DataTableCell data-label={t('reports:reportsPage.rank')} style={{
                                fontWeight: 600,
                                color: index < 3 ? (index === 0 ? '#FFB800' : index === 1 ? '#0EA5E9' : '#6FCF97') : '#0A2540'
                              }}>
                                #{index + 1}
                                {index === 0 && ' 🥇'}
                                {index === 1 && ' 🥈'}
                                {index === 2 && ' 🥉'}
                              </DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.name')} style={{ fontWeight: 600 }}>{customerData.customer?.name || 'Guest'}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.phone')}>{customerData.customer?.phone || '-'}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.type')}>
                                <span style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  backgroundColor: customerData.customer?.type === 'member' ? '#E0F2FE' : '#F3F4F6',
                                  color: customerData.customer?.type === 'member' ? '#0369A1' : '#6B7280'
                                }}>
                                  {customerData.customer?.type === 'member' ? 'Member' : 'Guest'}
                                </span>
                              </DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.periodOrders')}>{customerData.period_orders || 0}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.periodSpent')}>{formatCurrency(customerData.period_spent || 0, operationSettings.currency)}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.totalPoints')}>{customerData.points || 0}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.tier')}>
                                <span style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  backgroundColor: customerData.loyalty_tier === 'VIP' ? '#FEF3C7' : customerData.loyalty_tier === 'Gold' ? '#FEF9C3' : customerData.loyalty_tier === 'Silver' ? '#F3F4F6' : '#E5E7EB',
                                  color: customerData.loyalty_tier === 'VIP' ? '#92400E' : customerData.loyalty_tier === 'Gold' ? '#854D0E' : '#6B7280'
                                }}>
                                  {customerData.loyalty_tier || 'Bronze'}
                                </span>
                              </DataTableCell>
                            </DataTableRow>
                          ))}
                      </tbody>
                    </DataTable>
                  </TableCard>
                </div>
              )}
          </div>

          {/* Operations Tab - CSS로 숨기기 (탭 전환 시 state 유지) */}
          <div style={{ display: activeTab === 'operations' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading || ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>{t('reports:reportsPage.loadingOperationsData')}</div>
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  <StatsRow>
                    <StatCard color="#10B981">
                      <StatLabel>{t('reports:reportsPage.completedOrders')}</StatLabel>
                      <StatValue>{totalOrders.toLocaleString()}</StatValue>
                      <StatDescription>{operationsStats.completionRate}% fulfillment rate</StatDescription>
                    </StatCard>
                    <StatCard color="#F59E0B">
                      <StatLabel>{t('reports:reportsPage.avgPrepTime')}</StatLabel>
                      <StatValue>{operationsStats.avgPrepTime > 0 ? `${operationsStats.avgPrepTime} min` : 'N/A'}</StatValue>
                      <StatDescription>{operationsStats.avgPrepTime > 0 ? 'Order to served' : 'No timing data'}</StatDescription>
                    </StatCard>
                    <StatCard color="#EF4444">
                      <StatLabel>{t('reports:reportsPage.peakHour')}</StatLabel>
                      <StatValue>{operationsStats.peakHour}</StatValue>
                      <StatDescription>{operationsStats.peakHourOrders} orders in this slot</StatDescription>
                    </StatCard>
                    <StatCard color="#6366F1">
                      <StatLabel>{t('reports:reportsPage.ordersPerDay')}</StatLabel>
                      <StatValue>{(() => {
                        const days = Math.max(1, Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) + 1);
                        return Math.round(totalOrders / days);
                      })()}</StatValue>
                      <StatDescription>{t('reports:reportsPage.averageDailyOrders')}</StatDescription>
                    </StatCard>
                  </StatsRow>

                  <TableCard>
                    <ChartTitle>Peak Hours Performance ({isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod})</ChartTitle>
                    {peakTimesData.length === 0 ? (
                      <DataTableEmpty>No peak hours data available</DataTableEmpty>
                    ) : (
                      <DataTable>
                        <DataTableHead>
                          <tr>
                            <DataTableHeaderCell align="left">{t('reports:reportsPage.timeSlot')}</DataTableHeaderCell>
                            <DataTableHeaderCell align="left">{t('reports:reportsPage.orders')}</DataTableHeaderCell>
                            <DataTableHeaderCell align="left">{t('reports:reportsPage.revenue')}</DataTableHeaderCell>
                            <DataTableHeaderCell align="left">{t('reports:reportsPage.share')}</DataTableHeaderCell>
                          </tr>
                        </DataTableHead>
                        <tbody>
                          {peakTimesData.map((item, index) => (
                            <DataTableRow key={index} style={{
                              backgroundColor: index === 0 ? '#FEF3C7' : 'transparent'
                            }}>
                              <DataTableCell data-label={t('reports:reportsPage.timeSlot')} style={{ fontWeight: 600 }}>
                                {index === 0 && '🔥 '}{item.time}
                              </DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.orders')}>{item.orders}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.revenue')}>{formatCurrency(item.revenue, operationSettings.currency)}</DataTableCell>
                              <DataTableCell data-label={t('reports:reportsPage.share')}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <ProgressBar percentage={totalOrders > 0 ? (item.orders / totalOrders) * 100 : 0} />
                                  <span style={{ fontSize: '12px', color: '#6B7C93' }}>
                                    {totalOrders > 0 ? Math.round((item.orders / totalOrders) * 100) : 0}%
                                  </span>
                                </div>
                              </DataTableCell>
                            </DataTableRow>
                          ))}
                        </tbody>
                      </DataTable>
                    )}
                  </TableCard>

                  <ChartCard style={{ marginTop: '24px' }}>
                    <ChartTitle>{t('reports:reportsPage.hourlyOrderDistribution')}</ChartTitle>
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

          {/* Payment Analysis Tab */}
          <div style={{ display: activeTab === 'payment' ? 'block' : 'none' }}>
              <FilterComponent />
              {loading || ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>{t('reports:reportsPage.loadingPaymentData')}</div>
              ) : totalOrders === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  No order data available for the selected period
                </div>
              ) : (
                <div>
                  {/* Staff Meal Banner */}
                  {staffMealData.orders > 0 && (
                    <StaffMealBanner>
                      <div>
                        <div style={{ fontWeight: 600, color: '#9A3412', marginBottom: '4px' }}>
                          Staff Meal (Excluded from Revenue)
                        </div>
                        <div style={{ fontSize: '13px', color: '#C2410C' }}>
                          These orders are not included in the revenue figures below
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 700, color: '#9A3412' }}>{staffMealData.orders}</div>
                          <div style={{ fontSize: '11px', color: '#C2410C' }}>{t('reports:reportsPage.orders')}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 700, color: '#9A3412' }}>
                            {formatCurrency(staffMealData.revenue, operationSettings.currency)}
                          </div>
                          <div style={{ fontSize: '11px', color: '#C2410C' }}>{t('reports:reportsPage.amount')}</div>
                        </div>
                      </div>
                    </StaffMealBanner>
                  )}

                  {/* Payment Method Summary Stats */}
                  <StatsRow>
                    <StatCard color="#059669">
                      <StatLabel>{t('reports:reportsPage.totalRevenue')}</StatLabel>
                      <StatValue>{formatCurrency(totalPaymentRevenue, operationSettings.currency)}</StatValue>
                      <StatDescription>{paymentMethodData.reduce((s: number, p: any) => s + p.orders, 0)} orders</StatDescription>
                    </StatCard>
                    <StatCard color="#2563EB">
                      <StatLabel>{t('reports:reportsPage.paymentMethodsUsed')}</StatLabel>
                      <StatValue>{paymentMethodData.length}</StatValue>
                      <StatDescription>{t('reports:reportsPage.activeMethodsInPeriod')}</StatDescription>
                    </StatCard>
                    <StatCard color="#7C3AED">
                      <StatLabel>{t('reports:reportsPage.cardPayments')}</StatLabel>
                      <StatValue>
                        {formatCurrency(
                          paymentMethodData.find((p: any) => p.method === 'card')?.revenue || 0,
                          operationSettings.currency
                        )}
                      </StatValue>
                      <StatDescription>
                        {paymentMethodData.find((p: any) => p.method === 'card')?.orders || 0} orders
                      </StatDescription>
                    </StatCard>
                    <StatCard color="#DC2626">
                      <StatLabel>{t('reports:reportsPage.cashPayments')}</StatLabel>
                      <StatValue>
                        {formatCurrency(
                          paymentMethodData.find((p: any) => p.method === 'cash')?.revenue || 0,
                          operationSettings.currency
                        )}
                      </StatValue>
                      <StatDescription>
                        {paymentMethodData.find((p: any) => p.method === 'cash')?.orders || 0} orders
                      </StatDescription>
                    </StatCard>
                  </StatsRow>

                  {/* Payment Methods Table */}
                  <ChartGrid>
                    <TableCard>
                      <ChartTitle>{t('reports:reportsPage.paymentMethodsBreakdown')}</ChartTitle>
                      {paymentMethodData.length === 0 ? (
                        <DataTableEmpty>No payment data available</DataTableEmpty>
                      ) : (
                        <DataTable>
                          <DataTableHead>
                            <tr>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.paymentMethod')}</DataTableHeaderCell>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.orders')}</DataTableHeaderCell>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.revenue')}</DataTableHeaderCell>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.share')}</DataTableHeaderCell>
                            </tr>
                          </DataTableHead>
                          <tbody>
                            {paymentMethodData.map((item: any, index: number) => {
                              const pct = totalPaymentRevenue > 0 ? (item.revenue / totalPaymentRevenue) * 100 : 0;
                              return (
                                <DataTableRow key={item.method} style={{
                                  backgroundColor: index === 0 ? '#F0F9FF' : 'transparent'
                                }}>
                                  <DataTableCell data-label={t('reports:reportsPage.paymentMethod')} style={{ fontWeight: 600 }}>
                                    {getLabel(item.method)}
                                  </DataTableCell>
                                  <DataTableCell data-label={t('reports:reportsPage.orders')}>{item.orders}</DataTableCell>
                                  <DataTableCell data-label={t('reports:reportsPage.revenue')} style={{ fontWeight: 500 }}>
                                    {formatCurrency(item.revenue, operationSettings.currency)}
                                  </DataTableCell>
                                  <DataTableCell data-label={t('reports:reportsPage.share')}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <ProgressBar percentage={pct} />
                                      <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
                                        {pct.toFixed(1)}%
                                      </span>
                                    </div>
                                  </DataTableCell>
                                </DataTableRow>
                              );
                            })}
                          </tbody>
                        </DataTable>
                      )}
                    </TableCard>

                    {/* Payment Method Pie Chart */}
                    <ChartCard>
                      <ChartTitle>{t('reports:reportsPage.paymentDistribution')}</ChartTitle>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={paymentMethodData.map((item: any) => ({
                              name: getLabel(item.method),
                              value: Math.round(item.revenue)
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {paymentMethodData.map((_: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value), operationSettings.currency)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  </ChartGrid>

                  {/* Card Type Breakdown */}
                  {reportsSummary?.cardTypeSales && reportsSummary.cardTypeSales.length > 0 && (
                    <TableCard style={{ marginTop: '24px' }}>
                      <ChartTitle>{t('reports:reportsPage.cardTypeBreakdown')}</ChartTitle>
                      <PaymentFilterRow>
                        <PaymentFilterBtn
                          active={cardTypeFilter === 'all'}
                          onClick={() => setCardTypeFilter('all')}
                        >
                          All
                        </PaymentFilterBtn>
                        {['visa', 'master', 'amex', 'other'].map(type => (
                          availableCardTypes.includes(type) && (
                            <PaymentFilterBtn
                              key={type}
                              active={cardTypeFilter === type}
                              onClick={() => setCardTypeFilter(type)}
                            >
                              {CARD_TYPE_LABELS[type] || type}
                            </PaymentFilterBtn>
                          )
                        ))}
                      </PaymentFilterRow>
                      {cardTypeData.length === 0 ? (
                        <DataTableEmpty>No card type data for selected filter</DataTableEmpty>
                      ) : (
                        <DataTable>
                          <DataTableHead>
                            <tr>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.cardType')}</DataTableHeaderCell>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.orders')}</DataTableHeaderCell>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.revenue')}</DataTableHeaderCell>
                              <DataTableHeaderCell align="left">{t('reports:reportsPage.shareOfCardPayments')}</DataTableHeaderCell>
                            </tr>
                          </DataTableHead>
                          <tbody>
                            {cardTypeData.map((item: any, index: number) => {
                              const cardTotal = reportsSummary.cardTypeSales.reduce((s: number, c: any) => s + c.revenue, 0);
                              const pct = cardTotal > 0 ? (item.revenue / cardTotal) * 100 : 0;
                              return (
                                <DataTableRow key={item.type} style={{
                                  backgroundColor: index === 0 ? '#F5F3FF' : 'transparent'
                                }}>
                                  <DataTableCell data-label={t('reports:reportsPage.cardType')} style={{ fontWeight: 600 }}>
                                    {CARD_TYPE_LABELS[item.type] || item.type}
                                  </DataTableCell>
                                  <DataTableCell data-label={t('reports:reportsPage.orders')}>{item.orders}</DataTableCell>
                                  <DataTableCell data-label={t('reports:reportsPage.revenue')} style={{ fontWeight: 500 }}>
                                    {formatCurrency(item.revenue, operationSettings.currency)}
                                  </DataTableCell>
                                  <DataTableCell data-label={t('reports:reportsPage.shareOfCardPayments')}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <ProgressBar percentage={pct} />
                                      <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
                                        {pct.toFixed(1)}%
                                      </span>
                                    </div>
                                  </DataTableCell>
                                </DataTableRow>
                              );
                            })}
                          </tbody>
                        </DataTable>
                      )}
                    </TableCard>
                  )}
                </div>
              )}
          </div>

        </Content>
      </ReportsContainer>

      <DailySettlementPrint
        isOpen={showSettlement}
        onClose={() => setShowSettlement(false)}
      />
    </>
  );
};

export default ReportsPage;