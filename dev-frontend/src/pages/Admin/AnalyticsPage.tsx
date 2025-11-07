import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, StatsGrid, StatCard, StatValue, StatLabel, StatDescription } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
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

const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
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

// Using common StatCard components from ../../components/UI
// StatsGrid, StatCard, StatValue, StatLabel, StatDescription are now imported

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
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 12px;
  }
`;

const TableCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 12px;
  }
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 450px;
  table-layout: fixed;

  @media (max-width: 768px) {
    min-width: 350px;
  }
`;

const TableHeader = styled.th`
  padding: 8px 8px 8px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 10px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  line-height: 1.3;
  vertical-align: bottom;
  word-break: break-word;

  &:first-child {
    padding-left: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 6px 6px 0;
    font-size: 9px;
  }
`;

const TableCell = styled.td`
  padding: 10px 8px 10px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
  word-break: break-word;

  &:first-child {
    padding-left: 0;
  }

  @media (max-width: 768px) {
    padding: 8px 6px 8px 0;
    font-size: 12px;
  }
`;

const RankingTable = styled(TableCard)`
  margin-top: 24px;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const RankBadge = styled.span<{ rank: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background: ${props =>
    props.rank === 1 ? '#FFD700' :
    props.rank === 2 ? '#C0C0C0' :
    props.rank === 3 ? '#CD7F32' : '#F3F4F6'
  };
  color: ${props => props.rank <= 3 ? '#fff' : '#6B7280'};
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

// 검색 가능한 드롭다운 스타일
const SearchableDropdownContainer = styled.div`
  position: relative;
  min-width: 200px;
`;


const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;

  &:hover {
    background-color: #F9FAFB;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoResults = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #6B7280;
  text-align: center;
`;

// 타입 정의
type TabType = 'manager_sales' | 'restaurant_sales' | 'subscriptions' | 'restaurants' | 'system';
type PeriodType = 'today' | 'week' | 'month' | 'year';

// 차트 색상
const COLORS = ['#635BFF', '#00D924', '#FF6B6B', '#FFB800', '#0EA5E9', '#8B5CF6'];

const AnalyticsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('system');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 강제 리렌더링을 위한 키
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [selectedManager, setSelectedManager] = useState<string>('all');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [salesTrend, setSalesTrend] = useState<any[]>([]);
  const [subscriptionStats, setSubscriptionStats] = useState<any>(null);
  const [regionalStats, setRegionalStats] = useState<any[]>([]);

  // 검색 기능을 위한 상태들
  const [managerSearch, setManagerSearch] = useState('');
  const [selectedManagerName, setSelectedManagerName] = useState('All Managers');
  const [isManagerDropdownOpen, setIsManagerDropdownOpen] = useState(false);
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [selectedRestaurantName, setSelectedRestaurantName] = useState('All Restaurants');
  const [isRestaurantDropdownOpen, setIsRestaurantDropdownOpen] = useState(false);

  // Handle URL parameters for restaurant filtering
  useEffect(() => {
    const restaurantId = searchParams.get('restaurantId');
    const restaurantName = searchParams.get('restaurantName');

    if (restaurantId && restaurantName) {
      console.log('Setting restaurant filter from URL:', { restaurantId, restaurantName });
      setSelectedRestaurant(restaurantId);
      setSelectedRestaurantName(decodeURIComponent(restaurantName));
      setActiveTab('restaurant_sales');
    }
  }, [searchParams]);

  // Fetch restaurants and managers data on component mount
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        // Create sample data first
        await fetch('/api/sample-data/create', { method: 'POST' });

        // Fetch restaurants
        const restaurantsResponse = await fetch('/api/restaurants');
        if (restaurantsResponse.ok) {
          const restaurantsData = await restaurantsResponse.json();
          console.log('Restaurants data:', restaurantsData);
          setRestaurants(restaurantsData.data || restaurantsData || []);
        }

        // Fetch managers (users with role 'Manager')
        console.log('Fetching managers...');
        const managersResponse = await fetch('/api/admin-analytics/managers');
        console.log('Managers response status:', managersResponse.status);
        if (managersResponse.ok) {
          const managersData = await managersResponse.json();
          console.log('Raw managers data:', managersData);
          console.log('Processed managers:', managersData.data || managersData || []);
          const managersArray = managersData.data || managersData || [];
          console.log('Final managers array:', managersArray);
          setManagers(managersArray);
        } else {
          console.error('Failed to fetch managers:', managersResponse.status, await managersResponse.text());
        }

        // Fetch invoices for business analytics
        console.log('Fetching invoices...');
        const invoicesResponse = await fetch('/api/invoices');
        if (invoicesResponse.ok) {
          const invoicesData = await invoicesResponse.json();
          console.log('Invoices data:', invoicesData);
          setInvoices(invoicesData.data || invoicesData || []);
        } else {
          console.error('Failed to fetch invoices:', invoicesResponse.status);
        }

        // Fetch orders for customer satisfaction analysis
        console.log('Fetching orders...');
        const ordersResponse = await fetch('/api/orders?limit=1000');
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          console.log('Orders data:', ordersData);
          setOrders(ordersData.data || ordersData || []);
        } else {
          console.error('Failed to fetch orders:', ordersResponse.status);
        }
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };

    fetchFilterData();
  }, []);

  // Fetch analytics data whenever filters change
  useEffect(() => {
    console.log('useEffect triggered:', { dateRange, isCustomDateRange });
    fetchAnalyticsData();
  }, [activePeriod, selectedRestaurant, selectedManager, activeTab, dateRange.start, dateRange.end, isCustomDateRange]);

  const fetchAnalyticsData = async () => {
    console.log('Fetching analytics data:', {
      isCustomDateRange,
      dateRange,
      activePeriod
    });

    try {
      const params = new URLSearchParams({
        period: isCustomDateRange ? 'custom' : activePeriod,
        ...(isCustomDateRange && { start_date: dateRange.start, end_date: dateRange.end }),
        ...(selectedRestaurant !== 'all' && { restaurant_id: selectedRestaurant }),
        ...(selectedManager !== 'all' && { manager_id: selectedManager })
      });

      if (activeTab === 'manager_sales' || activeTab === 'restaurant_sales') {
        // Fetch system stats
        const statsResponse = await fetch(`/api/admin-analytics/system-stats?${params}`);
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setSystemStats(statsData.data);
        }

        // Fetch sales trend
        const trendResponse = await fetch(`/api/admin-analytics/sales-trend?${params}`);
        if (trendResponse.ok) {
          const trendData = await trendResponse.json();
          setSalesTrend(trendData.data);
        }
      }

      if (activeTab === 'subscriptions') {
        const subResponse = await fetch('/api/admin-analytics/subscription-stats');
        if (subResponse.ok) {
          const subData = await subResponse.json();
          setSubscriptionStats(subData.data);
        }
      }

      if (activeTab === 'restaurants') {
        const regionParams = new URLSearchParams({
          period: activePeriod,
          ...(isCustomDateRange && { start_date: dateRange.start, end_date: dateRange.end }),
          ...(selectedManager !== 'all' && { manager_id: selectedManager })
        });

        const regionalResponse = await fetch(`/api/admin-analytics/regional-stats?${regionParams}`);
        if (regionalResponse.ok) {
          const regionalData = await regionalResponse.json();
          setRegionalStats(regionalData.data);
        }
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  // 동적 판매 데이터 생성 (시스템 전체)
  const getSalesData = () => {
    console.log('getSalesData called with:', { isCustomDateRange, dateRange, activePeriod, selectedRestaurant, selectedManager });

    // 필터에 따른 데이터 조정
    let dataMultiplier = 1;
    if (selectedRestaurant !== 'all') {
      dataMultiplier = 0.05; // 개별 레스토랑은 전체의 5%
    } else if (selectedManager !== 'all') {
      dataMultiplier = 0.15; // 개별 매니저는 전체의 15%
    }
    // 커스텀 날짜 범위가 선택된 경우 날짜 차이 계산
    let periodMultiplier = 1;
    if (isCustomDateRange) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      periodMultiplier = diffDays / 30; // 한 달 기준으로 계산
    } else {
      periodMultiplier = activePeriod === 'today' ? 0.033 : // 하루는 한달의 1/30
                        activePeriod === 'week' ? 0.233 : // 일주일은 한달의 7/30
                        activePeriod === 'month' ? 1 : 12; // 한달 기준
    }

    if (activePeriod === 'today' && !isCustomDateRange) {
      // 오늘 날짜 기준으로 시드 생성하여 하루 동안 일관된 데이터 표시
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      const random = (min: number, max: number) => {
        const x = Math.sin(seed) * 10000;
        return min + (x - Math.floor(x)) * (max - min);
      };

      return [
        { date: '9AM', sales: Math.round(8000 * random(0.8, 1.2) * dataMultiplier) },
        { date: '10AM', sales: Math.round(12000 * random(0.9, 1.3) * dataMultiplier) },
        { date: '11AM', sales: Math.round(24000 * random(0.85, 1.15) * dataMultiplier) },
        { date: '12PM', sales: Math.round(38000 * random(0.9, 1.1) * dataMultiplier) },
        { date: '1PM', sales: Math.round(35000 * random(0.85, 1.15) * dataMultiplier) },
        { date: '2PM', sales: Math.round(22000 * random(0.8, 1.2) * dataMultiplier) },
        { date: '3PM', sales: Math.round(18000 * random(0.9, 1.1) * dataMultiplier) },
        { date: '4PM', sales: Math.round(15000 * random(0.85, 1.15) * dataMultiplier) },
        { date: '5PM', sales: Math.round(20000 * random(0.8, 1.2) * dataMultiplier) },
        { date: '6PM', sales: Math.round(32000 * random(0.9, 1.1) * dataMultiplier) },
        { date: '7PM', sales: Math.round(28000 * random(0.85, 1.15) * dataMultiplier) },
        { date: '8PM', sales: Math.round(16000 * random(0.8, 1.2) * dataMultiplier) }
      ];
    } else if (activePeriod === 'week' && !isCustomDateRange) {
      const weekSeed = new Date().getTime() / 604800000; // 주 단위 시드
      const random = (min: number, max: number, offset: number) => {
        const x = Math.sin(weekSeed + offset) * 10000;
        return min + (x - Math.floor(x)) * (max - min);
      };

      return [
        { date: 'Mon', sales: Math.round(240000 * random(0.8, 1.2, 1)) },
        { date: 'Tue', sales: Math.round(198000 * random(0.8, 1.2, 2)) },
        { date: 'Wed', sales: Math.round(380000 * random(0.8, 1.2, 3)) },
        { date: 'Thu', sales: Math.round(390000 * random(0.8, 1.2, 4)) },
        { date: 'Fri', sales: Math.round(480000 * random(0.8, 1.2, 5)) },
        { date: 'Sat', sales: Math.round(580000 * random(0.8, 1.2, 6)) },
        { date: 'Sun', sales: Math.round(430000 * random(0.8, 1.2, 7)) }
      ];
    } else if (activePeriod === 'month' || isCustomDateRange) {
      if (isCustomDateRange) {
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        // 커스텀 범위에 맞게 데이터 생성 - 날짜별로 다른 값 생성
        const baseValue = 200000;
        return Array.from({ length: Math.min(diffDays, 30) }, (_, i) => {
          const currentDate = new Date(startDate);
          currentDate.setDate(currentDate.getDate() + i);
          // 날짜를 시드로 사용하여 일관된 랜덤값 생성
          const seed = currentDate.getTime() / 1000000;
          const variance = Math.sin(seed) * 0.3 + 1;
          return {
            date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
            sales: Math.round(baseValue * variance * (diffDays / 30))
          };
        });
      }
      return Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1}`,
        sales: Math.round((200000 + Math.random() * 400000) * periodMultiplier)
      }));
    } else {
      return Array.from({ length: 12 }, (_, i) => ({
        date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        sales: Math.round((2000000 + Math.random() * 4000000) * (0.8 + Math.random() * 0.4))
      }));
    }
  };

  const getSubscriptionData = () => {
    return [
      { name: 'Basic Plan', value: 35, subscriptions: 150, revenue: Math.round(150 * 29 * (0.8 + Math.random() * 0.4)) },
      { name: 'Professional Plan', value: 45, subscriptions: 89, revenue: Math.round(89 * 59 * (0.8 + Math.random() * 0.4)) },
      { name: 'Enterprise Plan', value: 20, subscriptions: 35, revenue: Math.round(35 * 99 * (0.8 + Math.random() * 0.4)) }
    ];
  };

  const getRestaurantData = () => {
    let periodMultiplier = 1;
    if (isCustomDateRange) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      periodMultiplier = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      periodMultiplier = activePeriod === 'today' ? 1 :
                        activePeriod === 'week' ? 7 :
                        activePeriod === 'month' ? 30 : 365;
    }

    return [
      { region: 'Seoul', restaurants: 156, revenue: Math.round(892000 * periodMultiplier * (0.8 + Math.random() * 0.4)), orders: Math.round(42800 * periodMultiplier * (0.8 + Math.random() * 0.4)), growth: 12.5 },
      { region: 'Busan', restaurants: 98, revenue: Math.round(654000 * periodMultiplier * (0.8 + Math.random() * 0.4)), orders: Math.round(28900 * periodMultiplier * (0.8 + Math.random() * 0.4)), growth: 8.9 },
      { region: 'Daegu', restaurants: 67, revenue: Math.round(445000 * periodMultiplier * (0.8 + Math.random() * 0.4)), orders: Math.round(19200 * periodMultiplier * (0.8 + Math.random() * 0.4)), growth: 15.3 },
      { region: 'Incheon', restaurants: 54, revenue: Math.round(312000 * periodMultiplier * (0.8 + Math.random() * 0.4)), orders: Math.round(14500 * periodMultiplier * (0.8 + Math.random() * 0.4)), growth: 6.7 },
      { region: 'Gwangju', restaurants: 43, revenue: Math.round(278000 * periodMultiplier * (0.8 + Math.random() * 0.4)), orders: Math.round(11800 * periodMultiplier * (0.8 + Math.random() * 0.4)), growth: 19.2 }
    ];
  };

  // Helper function to get start date for periods
  const getPeriodStartDate = (period: string): Date => {
    const now = new Date();
    switch (period) {
      case 'today':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        return weekStart;
      case 'month':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'year':
        return new Date(now.getFullYear(), 0, 1);
      default:
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
  };

  // Global filtered invoices for all calculations
  const filteredInvoices = useMemo(() => {
    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

    return invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
      const dateMatch = invoiceDate >= startDate && invoiceDate <= endDate;

      // Apply manager filter if selected
      if (selectedManager !== 'all') {
        const managerMatch = invoice.managerId?.toString() === selectedManager;
        return dateMatch && managerMatch;
      }

      return dateMatch;
    });
  }, [invoices, isCustomDateRange, dateRange.start, dateRange.end, activePeriod, selectedManager, refreshKey]);

  // useMemo로 날짜 변경 시 데이터 재계산 - 의존성을 더 세밀하게 설정
  const salesData = useMemo(() => getSalesData(), [activePeriod, isCustomDateRange, dateRange.start, dateRange.end, refreshKey, selectedRestaurant, selectedManager]);
  const subscriptionData = useMemo(() => getSubscriptionData(), [refreshKey, selectedManager]);
  const restaurantData = useMemo(() => getRestaurantData(), [activePeriod, isCustomDateRange, dateRange.start, dateRange.end, refreshKey, selectedManager]);

  // 시스템 메트릭
  const getSystemMetrics = () => {
    // 기간에 따른 배수 계산
    let multiplier = 1;
    if (isCustomDateRange) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      multiplier = diffDays;
    } else {
      multiplier = activePeriod === 'today' ? 1 :
                   activePeriod === 'week' ? 7 :
                   activePeriod === 'month' ? 30 : 365;
    }

    // 필터에 따른 감소 계수 적용
    let filterReduction = 1;
    if (selectedRestaurant !== 'all') {
      filterReduction = 0.05; // 개별 레스토랑은 전체의 5%
    } else if (selectedManager !== 'all') {
      filterReduction = 0.15; // 개별 매니저는 전체의 15%
    }

    // 기본 일일 매출 (today 기준)
    const baseDailyRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
    const baseDailyOrders = Math.round((1200 + Math.random() * 300) * filterReduction); // 필터 적용

    const totalRevenue = baseDailyRevenue * (activePeriod === 'today' ? 1 : multiplier) * filterReduction;
    const totalOrders = baseDailyOrders * multiplier;
    const totalSubscriptions = Math.round(subscriptionData.reduce((sum, item) => sum + item.subscriptions, 0) * filterReduction);
    const totalRestaurants = selectedRestaurant !== 'all' ? 1 :
                             selectedManager !== 'all' ? Math.round(restaurantData.reduce((sum, item) => sum + item.restaurants, 0) * 0.15) :
                             restaurantData.reduce((sum, item) => sum + item.restaurants, 0);

    console.log('System metrics calculation:', {
      period: activePeriod,
      multiplier,
      filterReduction,
      selectedRestaurant,
      selectedManager,
      baseDailyRevenue,
      totalRevenue,
      totalOrders
    });

    return {
      totalRevenue: Math.round(totalRevenue),
      totalSubscriptions,
      totalRestaurants,
      totalOrders: Math.round(totalOrders),
      avgOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
    };
  };

  const systemMetrics = useMemo(() => getSystemMetrics(), [salesData, subscriptionData, restaurantData, isCustomDateRange, dateRange, activePeriod, refreshKey, selectedRestaurant, selectedManager]);

  // 날짜 범위 처리 함수
  const handlePeriodChange = (period: PeriodType) => {
    console.log('Period changed to:', period);
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setRefreshKey(prev => prev + 1); // 강제 리렌더링

    const now = new Date();
    let start = new Date();

    switch (period) {
      case 'today':
        start = new Date(now);
        break;
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
    }

    setDateRange({
      start: start.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0]
    });
  };

  // 다운로드 기능
  const handleDownloadReport = () => {
    const reportData = {
      period: isCustomDateRange ? `${dateRange.start} to ${dateRange.end}` : activePeriod,
      generatedAt: new Date().toISOString(),
      tab: activeTab,
      metrics: systemMetrics,
      filteredInvoices: filteredInvoices,
      filters: {
        restaurant: selectedRestaurant,
        manager: selectedManager
      }
    };

    // CSV 다운로드
    const csvContent = generateCSV(reportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `system_admin_report_${activeTab}_${dateRange.start}_to_${dateRange.end}.csv`;
    link.click();
  };

  // CSV 생성 함수
  const generateCSV = (data: any) => {
    let csv = `System Administrator Analytics Report\n`;
    csv += `Generated: ${new Date().toLocaleString()}\n`;
    csv += `Period: ${data.period}\n`;
    csv += `Report Type: ${data.tab.toUpperCase()}\n`;
    csv += `Filters: Manager=${selectedManagerName}, Restaurant=${selectedRestaurantName}\n\n`;

    if (activeTab === 'manager_sales') {
      csv += `MANAGER SALES REPORT (Invoice Revenue - Royalty & Rent)\n`;
      csv += `Invoice Revenue,RM ${(data.metrics.totalRevenue * 0.15).toLocaleString()}\n`;
      csv += `Total Invoices,${Math.round(data.metrics.totalOrders / 100).toLocaleString()}\n`;
      csv += `Average Invoice Value,RM ${(data.metrics.avgOrderValue * 10).toFixed(2)}\n`;
      csv += `Active Managers,${Math.round(data.metrics.totalRestaurants / 10)}\n\n`;

      // Manager Rankings
      const managerRankings = managers.map(manager => ({
        name: manager.full_name || manager.username,
        revenue: Math.round((15000 + (manager.id * 2000) % 25000) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12))
      })).sort((a, b) => b.revenue - a.revenue);

      csv += `MANAGER RANKINGS\n`;
      csv += `Rank,Manager Name,Revenue (RM)\n`;
      managerRankings.forEach((manager, index) => {
        csv += `${index + 1},${manager.name},${manager.revenue.toLocaleString()}\n`;
      });
      csv += `\n`;

      // Selected Manager's Restaurants (if specific manager selected)
      if (selectedManager !== 'all') {
        const managerRestaurants = restaurants.filter(restaurant => {
          return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                 (restaurant.managerId && restaurant.managerId.toString() === selectedManager) ||
                 (restaurant.manager_name && selectedManagerName && restaurant.manager_name.toLowerCase().includes(selectedManagerName.toLowerCase())) ||
                 (restaurant.managerName && selectedManagerName && restaurant.managerName.toLowerCase().includes(selectedManagerName.toLowerCase()));
        });

        if (managerRestaurants.length > 0) {
          csv += `${selectedManagerName}'S RESTAURANTS\n`;
          csv += `Restaurant Name,Revenue (RM),Orders,Performance\n`;
          managerRestaurants.forEach(restaurant => {
            const revenue = Math.round((5000 + (restaurant.id * 1000) % 15000) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12));
            const orders = Math.round((50 + (restaurant.id * 10) % 100) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12));
            const performance = revenue > 10000 ? 'Good' : revenue > 5000 ? 'Average' : 'Below Average';
            csv += `${restaurant.name},${revenue.toLocaleString()},${orders},${performance}\n`;
          });
        }
      }

    } else if (activeTab === 'restaurant_sales') {
      csv += `RESTAURANT SALES REPORT (Actual Restaurant Sales)\n`;
      csv += `Restaurant Revenue,RM ${(data.metrics.totalRevenue * 0.85).toLocaleString()}\n`;
      csv += `Total Orders,${data.metrics.totalOrders.toLocaleString()}\n`;
      csv += `Average Order Value,RM ${data.metrics.avgOrderValue.toFixed(2)}\n`;
      csv += `Total Restaurants,${data.metrics.totalRestaurants}\n\n`;

      if (selectedRestaurant !== 'all') {
        // Selected restaurant detailed breakdown
        const selectedRestaurantData = restaurants.find(r => r.id.toString() === selectedRestaurant);
        if (selectedRestaurantData) {
          csv += `SELECTED RESTAURANT: ${selectedRestaurantData.name}\n`;
          csv += `Manager,${selectedRestaurantData.manager_name || selectedRestaurantData.managerName || 'Unknown'}\n`;
          csv += `Location,${selectedRestaurantData.location || selectedRestaurantData.address || 'N/A'}\n\n`;

          const baseRevenue = 8000 + (selectedRestaurantData.id * 1500) % 20000;
          const baseOrders = 150 + (selectedRestaurantData.id * 15) % 300;

          // Period-based breakdown
          let periodLabel = '';
          let periods = [];

          if (activePeriod === 'today' || (isCustomDateRange &&
              Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) <= 1
            )) {
            periodLabel = 'HOURLY BREAKDOWN';
            csv += `${periodLabel}\n`;
            csv += `Hour,Sales (RM),Orders,Avg Order Value (RM),Performance\n`;
            for (let hour = 8; hour <= 22; hour++) {
              const hourlyRevenue = Math.round(baseRevenue * 0.033 * (0.3 + Math.random() * 1.4));
              const hourlyOrders = Math.round(baseOrders * 0.033 * (0.3 + Math.random() * 1.4));
              const performance = hourlyRevenue > baseRevenue * 0.04 ? 'Good' : hourlyRevenue > baseRevenue * 0.025 ? 'Average' : 'Low';
              csv += `${hour}:00,${hourlyRevenue.toLocaleString()},${hourlyOrders},${hourlyOrders > 0 ? Math.round(hourlyRevenue / hourlyOrders) : 0},${performance}\n`;
            }
          } else if (activePeriod === 'week' || (isCustomDateRange &&
              Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) <= 7
            )) {
            periodLabel = 'DAILY BREAKDOWN (WEEK)';
            csv += `${periodLabel}\n`;
            csv += `Day,Sales (RM),Orders,Avg Order Value (RM),Performance\n`;
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            days.forEach(day => {
              const dailyRevenue = Math.round(baseRevenue * 0.233 * (0.7 + Math.random() * 0.6));
              const dailyOrders = Math.round(baseOrders * 0.233 * (0.7 + Math.random() * 0.6));
              const performance = dailyRevenue > baseRevenue * 0.25 ? 'Good' : dailyRevenue > baseRevenue * 0.2 ? 'Average' : 'Low';
              csv += `${day},${dailyRevenue.toLocaleString()},${dailyOrders},${dailyOrders > 0 ? Math.round(dailyRevenue / dailyOrders) : 0},${performance}\n`;
            });
          } else if (activePeriod === 'year') {
            periodLabel = 'MONTHLY BREAKDOWN';
            csv += `${periodLabel}\n`;
            csv += `Month,Sales (RM),Orders,Avg Order Value (RM),Performance\n`;
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            months.forEach(month => {
              const monthlyRevenue = Math.round(baseRevenue * 12 * (0.8 + Math.random() * 0.4));
              const monthlyOrders = Math.round(baseOrders * 12 * (0.8 + Math.random() * 0.4));
              const performance = monthlyRevenue > baseRevenue * 13 ? 'Good' : monthlyRevenue > baseRevenue * 10 ? 'Average' : 'Low';
              csv += `${month},${monthlyRevenue.toLocaleString()},${monthlyOrders},${monthlyOrders > 0 ? Math.round(monthlyRevenue / monthlyOrders) : 0},${performance}\n`;
            });
          } else {
            periodLabel = 'DAILY BREAKDOWN';
            csv += `${periodLabel}\n`;
            csv += `Date,Sales (RM),Orders,Avg Order Value (RM),Performance\n`;
            const startDate = isCustomDateRange ? new Date(dateRange.start) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();
            const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            for (let i = 0; i < Math.min(diffDays, 15); i++) {
              const currentDate = new Date(startDate);
              currentDate.setDate(startDate.getDate() + i);
              const dailyRevenue = Math.round(baseRevenue * (0.8 + Math.random() * 0.4));
              const dailyOrders = Math.round(baseOrders * (0.8 + Math.random() * 0.4));
              const performance = dailyRevenue > baseRevenue * 1.1 ? 'Good' : dailyRevenue > baseRevenue * 0.9 ? 'Average' : 'Low';
              csv += `${currentDate.getMonth() + 1}/${currentDate.getDate()},${dailyRevenue.toLocaleString()},${dailyOrders},${dailyOrders > 0 ? Math.round(dailyRevenue / dailyOrders) : 0},${performance}\n`;
            }
          }
        }
      } else {
        // Restaurant Rankings when no specific restaurant is selected
        const restaurantRankings = restaurants.map(restaurant => ({
          name: restaurant.name,
          manager: restaurant.manager_name || restaurant.managerName || 'Unknown',
          revenue: Math.round((8000 + (restaurant.id * 1500) % 20000) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12)),
          orders: Math.round((150 + (restaurant.id * 15) % 300) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12))
        })).sort((a, b) => b.revenue - a.revenue);

        csv += `RESTAURANT RANKINGS\n`;
        csv += `Rank,Restaurant Name,Manager,Revenue (RM),Orders,Avg Order Value (RM)\n`;
        restaurantRankings.forEach((restaurant, index) => {
          csv += `${index + 1},${restaurant.name},${restaurant.manager},${restaurant.revenue.toLocaleString()},${restaurant.orders},${Math.round(restaurant.revenue / restaurant.orders)}\n`;
        });
      }

    } else if (activeTab === 'subscriptions') {
      csv += `SUBSCRIPTION REPORT\n`;

      // Filter restaurants based on selected manager
      const filteredRestaurantsForSubscription = selectedManager === 'all'
        ? restaurants
        : restaurants.filter(restaurant => {
            return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                   (restaurant.managerId && restaurant.managerId.toString() === selectedManager) ||
                   (restaurant.manager_name && selectedManagerName && restaurant.manager_name.toLowerCase().includes(selectedManagerName.toLowerCase())) ||
                   (restaurant.managerName && selectedManagerName && restaurant.managerName.toLowerCase().includes(selectedManagerName.toLowerCase()));
          });

      // Summary statistics
      const totalSubscriptions = filteredRestaurantsForSubscription.length;
      const totalMonthlyRevenue = filteredRestaurantsForSubscription.reduce((sum, restaurant) =>
        sum + (restaurant.plan_amount || restaurant.planAmount || 0), 0);
      const activeSubscriptions = filteredRestaurantsForSubscription.filter(r =>
        (r.status || 'active') === 'active').length;

      csv += `Total Subscriptions,${totalSubscriptions}\n`;
      csv += `Active Subscriptions,${activeSubscriptions}\n`;
      csv += `Total Monthly Revenue,RM ${totalMonthlyRevenue.toFixed(2)}\n`;
      csv += `Average Monthly Revenue per Restaurant,RM ${totalSubscriptions > 0 ? (totalMonthlyRevenue / totalSubscriptions).toFixed(2) : '0.00'}\n\n`;

      // Subscription details table
      csv += `RESTAURANT SUBSCRIPTION DETAILS\n`;
      csv += `Restaurant Name,Manager,Plan Type,Monthly Fee (RM),Status,Subscription Start,Subscription End,Location\n`;

      filteredRestaurantsForSubscription.forEach(restaurant => {
        const restaurantName = restaurant.name || 'Unknown Restaurant';
        const managerName = restaurant.manager_name || restaurant.managerName || 'Unknown Manager';
        const planType = restaurant.plan_type || restaurant.planType || 'Basic Plan';
        const monthlyFee = (restaurant.plan_amount || restaurant.planAmount || 29.00).toFixed(2);
        const status = restaurant.status || 'active';
        const subscriptionStart = restaurant.subscription_start ?
          new Date(restaurant.subscription_start).toLocaleDateString() :
          (restaurant.subscriptionStart ? new Date(restaurant.subscriptionStart).toLocaleDateString() : 'N/A');
        const subscriptionEnd = restaurant.subscription_end ?
          new Date(restaurant.subscription_end).toLocaleDateString() :
          (restaurant.subscriptionEnd ? new Date(restaurant.subscriptionEnd).toLocaleDateString() : 'N/A');
        const location = restaurant.address || restaurant.location || 'N/A';

        csv += `${restaurantName},${managerName},${planType},${monthlyFee},${status},${subscriptionStart},${subscriptionEnd},"${location}"\n`;
      });

      // Plan distribution summary
      csv += `\nPLAN DISTRIBUTION SUMMARY\n`;
      const planCounts = {};
      const planRevenue = {};
      filteredRestaurantsForSubscription.forEach(restaurant => {
        const planType = restaurant.plan_type || restaurant.planType || 'Basic Plan';
        const monthlyFee = restaurant.plan_amount || restaurant.planAmount || 29.00;

        planCounts[planType] = (planCounts[planType] || 0) + 1;
        planRevenue[planType] = (planRevenue[planType] || 0) + monthlyFee;
      });

      csv += `Plan Type,Subscribers,Monthly Revenue (RM),Avg Revenue per Subscriber (RM)\n`;
      Object.keys(planCounts).forEach(planType => {
        const subscribers = planCounts[planType];
        const revenue = planRevenue[planType];
        const avgRevenue = revenue / subscribers;
        csv += `${planType},${subscribers},${revenue.toFixed(2)},${avgRevenue.toFixed(2)}\n`;
      });

    } else if (activeTab === 'system') {
      csv += `SYSTEM ANALYTICS REPORT\n`;

      // Business metrics
      const baseRevenue = restaurants.reduce((sum, restaurant) => {
        const planAmount = parseFloat(restaurant.planAmount || restaurant.plan_amount || '0');
        return sum + planAmount;
      }, 0);
      const periodMultiplier = activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.25 : activePeriod === 'month' ? 1 : 12;
      const totalBusinessVolume = Math.round(baseRevenue * periodMultiplier * 150);

      csv += `Total Business Volume,RM ${totalBusinessVolume.toLocaleString()}\n`;
      csv += `Growth Rate,${(12.5 + (Math.random() * 10 - 5)).toFixed(1)}%\n`;
      csv += `Market Penetration,${Math.round(restaurants.length * 0.15)}%\n`;
      csv += `Customer Satisfaction,${(4.2 + Math.random() * 0.6).toFixed(1)}/5.0\n\n`;

      // Plan performance analysis
      csv += `PLAN TYPE PERFORMANCE\n`;
      csv += `Plan Type,Subscribers,Revenue Share,Growth Rate\n`;

      const planStats: Record<string, { subscribers: number; revenue: number }> = {};
      restaurants.forEach(restaurant => {
        const planType = restaurant.plan_type || restaurant.planType || 'Basic Plan';

        // Calculate actual revenue from filtered invoices for this restaurant
        const restaurantInvoices = data.filteredInvoices?.filter((inv: any) =>
          inv.restaurantId?.toString() === restaurant.id?.toString()
        ) || [];
        const revenue = restaurantInvoices.reduce((sum: number, inv: any) => sum + parseFloat(inv.total?.toString() || '0'), 0);

        if (!planStats[planType]) {
          planStats[planType] = { subscribers: 0, revenue: 0 };
        }
        planStats[planType].subscribers += 1;
        planStats[planType].revenue += revenue;
      });

      const totalRevenue = Object.values(planStats).reduce((sum, plan) => sum + plan.revenue, 0);
      Object.entries(planStats)
        .sort(([,a], [,b]) => b.revenue - a.revenue)
        .forEach(([planType, stats]) => {
          csv += `${planType},${stats.subscribers},${((stats.revenue / totalRevenue) * 100).toFixed(1)}%,+${(8 + Math.random() * 12).toFixed(1)}%\n`;
        });

      csv += `\nMANAGER PERFORMANCE RANKING\n`;
      csv += `Rank,Manager,Restaurants,Total Revenue (RM)\n`;

      const managerStats: Record<string, { restaurants: number; revenue: number }> = {};
      restaurants.forEach(restaurant => {
        const managerName = restaurant.manager_name || restaurant.managerName || 'Unknown';

        // Calculate actual revenue from filtered invoices for this manager
        const managerInvoices = data.filteredInvoices?.filter((inv: any) =>
          inv.managerId?.toString() === restaurant.manager_id?.toString()
        ) || [];
        const revenue = managerInvoices.reduce((sum: number, inv: any) => sum + parseFloat(inv.total?.toString() || '0'), 0);

        if (!managerStats[managerName]) {
          managerStats[managerName] = { restaurants: 0, revenue: 0 };
        }
        managerStats[managerName].restaurants += 1;
        managerStats[managerName].revenue += revenue;
      });

      Object.entries(managerStats)
        .sort(([,a], [,b]) => b.revenue - a.revenue)
        .slice(0, 10)
        .forEach(([managerName, stats], index) => {
          csv += `${index + 1},${managerName},${stats.restaurants},${stats.revenue.toFixed(2)}\n`;
        });

      csv += `\nKEY PERFORMANCE INDICATORS\n`;
      csv += `Average Revenue per Restaurant,RM ${(restaurants.reduce((sum, r) => sum + parseFloat(r.planAmount || r.plan_amount || '29'), 0) / restaurants.length).toFixed(2)}\n`;
      csv += `Manager Coverage Rate,${Math.round((managers.length / restaurants.length) * 100)}%\n`;
      csv += `System Adoption Rate,${Math.round((restaurants.filter(r => r.status === 'active').length / restaurants.length) * 100)}%\n`;
      csv += `Market Expansion Potential,${100 - Math.round(restaurants.length * 0.15)}% remaining\n`;
    }

    csv += `\nReport generated on ${new Date().toLocaleString()}\n`;
    return csv;
  };

  // 검색 가능한 매니저 드롭다운 관련 함수들
  const filteredManagers = managers.filter(manager =>
    manager.full_name && manager.full_name.toLowerCase().includes(managerSearch.toLowerCase())
  );

  const handleManagerSelect = (manager: any) => {
    setSelectedManager(manager.id);
    setSelectedManagerName(manager.full_name);
    setManagerSearch('');
    setIsManagerDropdownOpen(false);
    setRefreshKey(prev => prev + 1); // 데이터 새로고침
  };

  const handleShowAllManagers = () => {
    setSelectedManager('all');
    setSelectedManagerName('All Managers');
    setManagerSearch('');
    setIsManagerDropdownOpen(false);
    setRefreshKey(prev => prev + 1); // 데이터 새로고침
  };

  // 검색 가능한 레스토랑 드롭다운 관련 함수들
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(restaurantSearch.toLowerCase())
  );

  const handleRestaurantSelect = (restaurant: any) => {
    setSelectedRestaurant(restaurant.id);
    setSelectedRestaurantName(restaurant.name);
    setRestaurantSearch('');
    setIsRestaurantDropdownOpen(false);
    setRefreshKey(prev => prev + 1); // 데이터 새로고침
  };

  const handleShowAllRestaurants = () => {
    setSelectedRestaurant('all');
    setSelectedRestaurantName('All Restaurants');
    setRestaurantSearch('');
    setIsRestaurantDropdownOpen(false);
    setRefreshKey(prev => prev + 1); // 데이터 새로고침
  };

  // 검색 가능한 매니저 드롭다운 컴포넌트
  const SearchableManagerDropdown = () => {
    console.log('Rendering SearchableManagerDropdown, managers:', managers);
    return (
      <SearchableDropdownContainer>
        <SearchInput
          type="text"
          value={isManagerDropdownOpen ? managerSearch : selectedManagerName}
          onChange={(e) => setManagerSearch(e.target.value)}
          onFocus={() => {
            setIsManagerDropdownOpen(true);
            if (selectedManager !== 'all') {
              setManagerSearch('');
            }
          }}
          onBlur={() => {
            setTimeout(() => setIsManagerDropdownOpen(false), 200);
          }}
          placeholder="Search managers..."
        />
        <DropdownMenu isOpen={isManagerDropdownOpen}>
          <DropdownItem onClick={handleShowAllManagers}>
            All Managers
          </DropdownItem>
          {managers.length === 0 ? (
            <NoResults>Loading managers...</NoResults>
          ) : filteredManagers.length > 0 ? (
            filteredManagers.map((manager) => (
              <DropdownItem
                key={manager.id}
                onClick={() => handleManagerSelect(manager)}
              >
                {manager.full_name || manager.username || `Manager ${manager.id}`}
              </DropdownItem>
            ))
          ) : (
            <NoResults>No managers found</NoResults>
          )}
        </DropdownMenu>
      </SearchableDropdownContainer>
    );
  };

  // 검색 가능한 레스토랑 드롭다운 컴포넌트
  const SearchableRestaurantDropdown = () => (
    <SearchableDropdownContainer>
      <SearchInput
        type="text"
        value={isRestaurantDropdownOpen ? restaurantSearch : selectedRestaurantName}
        onChange={(e) => setRestaurantSearch(e.target.value)}
        onFocus={() => {
          setIsRestaurantDropdownOpen(true);
          if (selectedRestaurant !== 'all') {
            setRestaurantSearch('');
          }
        }}
        onBlur={() => {
          setTimeout(() => setIsRestaurantDropdownOpen(false), 200);
        }}
        placeholder="Search restaurants..."
      />
      <DropdownMenu isOpen={isRestaurantDropdownOpen}>
        <DropdownItem onClick={handleShowAllRestaurants}>
          All Restaurants
        </DropdownItem>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <DropdownItem
              key={restaurant.id}
              onClick={() => handleRestaurantSelect(restaurant)}
            >
              {restaurant.name}
            </DropdownItem>
          ))
        ) : (
          restaurantSearch && <NoResults>No restaurants found</NoResults>
        )}
      </DropdownMenu>
    </SearchableDropdownContainer>
  );

  return (
    <MainLayout>
      <ReportsContainer>
        <Header>
          <HeaderTitle>Reports</HeaderTitle>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'system'} onClick={() => setActiveTab('system')}>
              System Analytics
            </Tab>
            <Tab active={activeTab === 'subscriptions'} onClick={() => setActiveTab('subscriptions')}>
              Subscription Report
            </Tab>
            <Tab active={activeTab === 'manager_sales'} onClick={() => setActiveTab('manager_sales')}>
              Manager Sales
            </Tab>
            <Tab active={activeTab === 'restaurant_sales'} onClick={() => setActiveTab('restaurant_sales')}>
              Restaurant Sales
            </Tab>
          </TabContainer>

          {activeTab === 'manager_sales' && (
            <>
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
                  <DateButton active={isCustomDateRange} onClick={() => setIsCustomDateRange(true)}>
                    Custom
                  </DateButton>
                  {isCustomDateRange && (
                    <CustomDateRange>
                      <DateRangeInput
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => {
                          console.log('Start date changed to:', e.target.value);
                          setDateRange(prev => ({ ...prev, start: e.target.value }));
                        }}
                        max={dateRange.end}
                      />
                      <DateRangeInput
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => {
                          console.log('End date changed to:', e.target.value);
                          setDateRange(prev => ({ ...prev, end: e.target.value }));
                        }}
                        min={dateRange.start}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </CustomDateRange>
                  )}
                </FilterRow>

                <FilterRow>
                  <SearchableManagerDropdown />
                  <DownloadButton onClick={handleDownloadReport}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download
                  </DownloadButton>
                </FilterRow>
              </FilterControls>

              <StatsGrid key={`manager-sales-stats-${refreshKey}-${activePeriod}-${selectedManager}-${dateRange.start}-${dateRange.end}`}>
                <StatCard color="#059669">
                  <StatValue>RM {(() => {
                    if (!invoices.length) return '0';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredInvoices = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      const dateMatch = invoiceDate >= startDate && invoiceDate <= endDate;

                      if (selectedManager === 'all') return dateMatch;

                      const managerMatch = (invoice.managerId?.toString() === selectedManager) ||
                                         (invoice.managerName && selectedManagerName &&
                                          invoice.managerName.toLowerCase().includes(selectedManagerName.toLowerCase()));

                      return dateMatch && managerMatch;
                    });

                    const totalRevenue = filteredInvoices.reduce((sum, invoice) => {
                      return sum + parseFloat(invoice.total || invoice.total_amount || 0);
                    }, 0);

                    return Math.round(totalRevenue).toLocaleString();
                  })()}</StatValue>
                  <StatLabel>Invoice Revenue</StatLabel>
                  <StatDescription>
                    {selectedManager !== 'all' ? `${selectedManagerName}'s revenue` : 'All managers revenue'}
                  </StatDescription>
                </StatCard>
                <StatCard color="#2563EB">
                  <StatValue>{(() => {
                    if (!invoices.length) return '0';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredInvoices = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      const dateMatch = invoiceDate >= startDate && invoiceDate <= endDate;

                      if (selectedManager === 'all') return dateMatch;

                      const managerMatch = (invoice.managerId?.toString() === selectedManager) ||
                                         (invoice.managerName && selectedManagerName &&
                                          invoice.managerName.toLowerCase().includes(selectedManagerName.toLowerCase()));

                      return dateMatch && managerMatch;
                    });

                    return filteredInvoices.length.toLocaleString();
                  })()}</StatValue>
                  <StatLabel>Total Invoices</StatLabel>
                  <StatDescription>Issued invoices for period</StatDescription>
                </StatCard>
                <StatCard color="#DC2626">
                  <StatValue>{(() => {
                    if (!invoices.length) return 'RM 0';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredInvoices = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      const dateMatch = invoiceDate >= startDate && invoiceDate <= endDate;

                      if (selectedManager === 'all') return dateMatch;

                      const managerMatch = (invoice.managerId?.toString() === selectedManager) ||
                                         (invoice.managerName && selectedManagerName &&
                                          invoice.managerName.toLowerCase().includes(selectedManagerName.toLowerCase()));

                      return dateMatch && managerMatch;
                    });

                    if (!filteredInvoices.length) return 'RM 0';

                    const totalRevenue = filteredInvoices.reduce((sum, invoice) => {
                      return sum + parseFloat(invoice.total || invoice.total_amount || 0);
                    }, 0);

                    const avgAmount = totalRevenue / filteredInvoices.length;
                    return `RM ${Math.round(avgAmount).toLocaleString()}`;
                  })()}</StatValue>
                  <StatLabel>Average Invoice Value</StatLabel>
                  <StatDescription>Per invoice average</StatDescription>
                </StatCard>
                <StatCard color="#7C3AED">
                  <StatValue>{(() => {
                    if (!invoices.length) return '0%';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredInvoices = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      const dateMatch = invoiceDate >= startDate && invoiceDate <= endDate;

                      if (selectedManager === 'all') return dateMatch;

                      const managerMatch = (invoice.managerId?.toString() === selectedManager) ||
                                         (invoice.managerName && selectedManagerName &&
                                          invoice.managerName.toLowerCase().includes(selectedManagerName.toLowerCase()));

                      return dateMatch && managerMatch;
                    });

                    if (!filteredInvoices.length) return '0%';

                    const paidInvoices = filteredInvoices.filter(inv => inv.status === 'paid').length;
                    const paymentRate = Math.round((paidInvoices / filteredInvoices.length) * 100);
                    return `${paymentRate}%`;
                  })()}</StatValue>
                  <StatLabel>Payment Rate</StatLabel>
                  <StatDescription>Invoice collection rate</StatDescription>
                </StatCard>
              </StatsGrid>

              <ChartGrid>
                <ChartCard>
                  <ChartTitle>Manager Invoice Revenue Trend</ChartTitle>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesTrend.length > 0 ? salesTrend : salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F6F9FC" />
                      <XAxis dataKey="date" stroke="#6B7C93" fontSize={12} />
                      <YAxis stroke="#6B7C93" fontSize={12} />
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
                  <ChartTitle>Revenue by Region</ChartTitle>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={restaurantData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ region, revenue }) => `${region} (${((revenue / restaurantData.reduce((sum, item) => sum + item.revenue, 0)) * 100).toFixed(1)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {restaurantData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </ChartGrid>

              {/* Manager's Restaurants Table */}
              <RankingTable>
                <ChartTitle>
                  {selectedManager !== 'all' ?
                    `${selectedManagerName}'s Restaurants` :
                    'All Restaurants by Manager'
                  }
                </ChartTitle>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Restaurant Name</TableHeader>
                      <TableHeader>Manager</TableHeader>
                      <TableHeader>Invoice Revenue</TableHeader>
                      <TableHeader>Monthly Fee</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Performance</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedManager !== 'all' ?
                      // Selected manager's restaurants - filter real restaurants by manager
                      restaurants.filter(restaurant => {
                        console.log('Filtering restaurant:', restaurant.name, 'manager_id:', restaurant.manager_id, 'managerId:', restaurant.managerId, 'selected:', selectedManager);
                        // First try exact match with manager_id (underscore format)
                        if (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) {
                          return true;
                        }
                        // Try exact match with managerId (camelCase format)
                        if (restaurant.managerId && restaurant.managerId.toString() === selectedManager) {
                          return true;
                        }
                        // If no manager_id or managerId, try matching by manager name
                        const managerName = restaurant.manager_name || restaurant.managerName;
                        if (managerName && selectedManagerName &&
                            managerName.toLowerCase().includes(selectedManagerName.toLowerCase())) {
                          return true;
                        }
                        // Fallback: assign restaurants to managers based on a consistent hash (not needed now)
                        return false;
                      }).map(restaurant => ({
                        id: restaurant.id,
                        name: restaurant.name,
                        manager: selectedManagerName,
                        revenue: Math.round((5000 + (restaurant.id * 1000) % 15000) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12)),
                        monthlyFee: Math.round(2000 + (restaurant.id * 500) % 3000),
                        status: restaurant.status === 'active' ? 'Active' : 'Inactive',
                        performance: Math.round(75 + (restaurant.id * 3) % 25)
                      })) :
                      // All restaurants with their assigned managers
                      restaurants.slice(0, 15).map(restaurant => {
                        const assignedManagerIndex = restaurant.manager_id ?
                          managers.findIndex(m => m.id === restaurant.manager_id) :
                          restaurant.id % managers.length;
                        const assignedManager = managers[assignedManagerIndex] || managers[0];

                        return {
                          id: restaurant.id,
                          name: restaurant.name,
                          manager: assignedManager?.full_name || assignedManager?.username || 'Unassigned',
                          revenue: Math.round((5000 + (restaurant.id * 1000) % 15000) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12)),
                          monthlyFee: Math.round(2000 + (restaurant.id * 500) % 3000),
                          status: restaurant.status === 'active' ? 'Active' : 'Inactive',
                          performance: Math.round(75 + (restaurant.id * 3) % 25)
                        };
                      })
                    ).map((restaurant, index) => (
                      <tr key={restaurant.id || index}>
                        <TableCell style={{ fontWeight: 600 }}>{restaurant.name}</TableCell>
                        <TableCell>{restaurant.manager}</TableCell>
                        <TableCell>RM {restaurant.revenue.toLocaleString()}</TableCell>
                        <TableCell>RM {restaurant.monthlyFee.toLocaleString()}</TableCell>
                        <TableCell>
                          <span style={{
                            color: restaurant.status === 'Active' ? '#059669' : '#DC2626',
                            fontWeight: 500
                          }}>
                            {restaurant.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ProgressBar percentage={restaurant.performance} />
                            <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
                              {restaurant.performance}%
                            </span>
                          </div>
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </RankingTable>

              {/* Manager Ranking Table - only show when no specific manager is selected */}
              {selectedManager === 'all' && (
                <RankingTable>
                  <ChartTitle>Top Managers by Invoice Revenue (Royalty & Rent)</ChartTitle>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader>Rank</TableHeader>
                        <TableHeader>Manager Name</TableHeader>
                        <TableHeader>Total Invoice Revenue</TableHeader>
                        <TableHeader>Restaurants</TableHeader>
                        <TableHeader>Avg. per Restaurant</TableHeader>
                        <TableHeader>Growth</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {managers.slice(0, 5).map((manager, index) => {
                        const rank = index + 1;
                        const baseRevenue = 60000 - rank * 8000;
                        const revenue = Math.round(baseRevenue * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12));
                        const restaurantCount = Math.floor(Math.random() * 10) + 5;
                        return (
                          <tr key={manager.id}>
                            <TableCell>
                              <RankBadge rank={rank}>{rank}</RankBadge>
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>
                              {manager.full_name || manager.username || `Manager ${rank}`}
                            </TableCell>
                            <TableCell>RM {revenue.toLocaleString()}</TableCell>
                            <TableCell>{restaurantCount}</TableCell>
                            <TableCell>RM {Math.round(revenue / restaurantCount).toLocaleString()}</TableCell>
                            <TableCell style={{ color: rank <= 3 ? '#059669' : '#DC2626' }}>
                              {rank <= 3 ? '+' : '-'}{Math.abs(20 - rank * 3)}%
                            </TableCell>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </RankingTable>
              )}
            </>
          )}

          {activeTab === 'restaurant_sales' && (
            <>
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
                  <DateButton active={isCustomDateRange} onClick={() => setIsCustomDateRange(true)}>
                    Custom
                  </DateButton>
                  {isCustomDateRange && (
                    <CustomDateRange>
                      <DateRangeInput
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => {
                          console.log('Start date changed to:', e.target.value);
                          setDateRange(prev => ({ ...prev, start: e.target.value }));
                        }}
                        max={dateRange.end}
                      />
                      <DateRangeInput
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => {
                          console.log('End date changed to:', e.target.value);
                          setDateRange(prev => ({ ...prev, end: e.target.value }));
                        }}
                        min={dateRange.start}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </CustomDateRange>
                  )}
                </FilterRow>

                <FilterRow>
                  <SearchableRestaurantDropdown />
                  <DownloadButton onClick={handleDownloadReport}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download
                  </DownloadButton>
                </FilterRow>
              </FilterControls>

              <StatsGrid key={`restaurant-sales-stats-${refreshKey}-${activePeriod}-${selectedRestaurant}-${dateRange.start}-${dateRange.end}`}>
                <StatCard color="#059669">
                  <StatValue>RM {(() => {
                    if (!orders.length) return '0';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredOrders = orders.filter(order => {
                      const orderDate = new Date(order.order_date || order.createdAt);
                      const dateMatch = orderDate >= startDate && orderDate <= endDate;

                      if (selectedRestaurant === 'all') return dateMatch && order.status === 'completed';

                      const restaurantMatch = order.restaurant_id?.toString() === selectedRestaurant;
                      return dateMatch && restaurantMatch && order.status === 'completed';
                    });

                    const totalRevenue = filteredOrders.reduce((sum, order) => {
                      return sum + parseFloat(order.total_amount || 0);
                    }, 0);

                    return Math.round(totalRevenue).toLocaleString();
                  })()}</StatValue>
                  <StatLabel>Restaurant Revenue</StatLabel>
                  <StatDescription>
                    {selectedRestaurant !== 'all' ? `${selectedRestaurantName} sales` : 'All restaurants sales'}
                  </StatDescription>
                </StatCard>
                <StatCard color="#2563EB">
                  <StatValue>{(() => {
                    if (!orders.length) return '0';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredOrders = orders.filter(order => {
                      const orderDate = new Date(order.order_date || order.createdAt);
                      const dateMatch = orderDate >= startDate && orderDate <= endDate;

                      if (selectedRestaurant === 'all') return dateMatch && order.status === 'completed';

                      const restaurantMatch = order.restaurant_id?.toString() === selectedRestaurant;
                      return dateMatch && restaurantMatch && order.status === 'completed';
                    });

                    return filteredOrders.length.toLocaleString();
                  })()}</StatValue>
                  <StatLabel>Total Orders</StatLabel>
                  <StatDescription>Completed orders for period</StatDescription>
                </StatCard>
                <StatCard color="#DC2626">
                  <StatValue>{(() => {
                    if (!orders.length) return 'RM 0';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredOrders = orders.filter(order => {
                      const orderDate = new Date(order.order_date || order.createdAt);
                      const dateMatch = orderDate >= startDate && orderDate <= endDate;

                      if (selectedRestaurant === 'all') return dateMatch && order.status === 'completed';

                      const restaurantMatch = order.restaurant_id?.toString() === selectedRestaurant;
                      return dateMatch && restaurantMatch && order.status === 'completed';
                    });

                    if (!filteredOrders.length) return 'RM 0';

                    const totalRevenue = filteredOrders.reduce((sum, order) => {
                      return sum + parseFloat(order.total_amount || 0);
                    }, 0);

                    const avgValue = totalRevenue / filteredOrders.length;
                    return `RM ${Math.round(avgValue).toLocaleString()}`;
                  })()}</StatValue>
                  <StatLabel>Average Order Value</StatLabel>
                  <StatDescription>Per order average</StatDescription>
                </StatCard>
                <StatCard color="#7C3AED">
                  <StatValue>{(() => {
                    if (!orders.length) return '0%';

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredOrders = orders.filter(order => {
                      const orderDate = new Date(order.order_date || order.createdAt);
                      const dateMatch = orderDate >= startDate && orderDate <= endDate;

                      if (selectedRestaurant === 'all') return dateMatch;

                      const restaurantMatch = order.restaurant_id?.toString() === selectedRestaurant;
                      return dateMatch && restaurantMatch;
                    });

                    if (!filteredOrders.length) return '0%';

                    const completedOrders = filteredOrders.filter(order => order.status === 'completed').length;
                    const successRate = Math.round((completedOrders / filteredOrders.length) * 100);
                    return `${successRate}%`;
                  })()}</StatValue>
                  <StatLabel>Order Success Rate</StatLabel>
                  <StatDescription>Orders completion rate</StatDescription>
                </StatCard>
              </StatsGrid>

              <ChartGrid>
                <ChartCard>
                  <ChartTitle>Restaurant Sales Trend</ChartTitle>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData.map(d => ({ ...d, sales: Math.round(d.sales * 0.85) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F6F9FC" />
                      <XAxis dataKey="date" stroke="#6B7C93" fontSize={12} />
                      <YAxis stroke="#6B7C93" fontSize={12} />
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
                        stroke="#059669"
                        strokeWidth={2}
                        dot={{ fill: '#059669', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                  <ChartTitle>Sales by Category</ChartTitle>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Food', value: 45, revenue: Math.round(systemMetrics.totalRevenue * 0.45) },
                          { name: 'Beverage', value: 25, revenue: Math.round(systemMetrics.totalRevenue * 0.25) },
                          { name: 'Dessert', value: 15, revenue: Math.round(systemMetrics.totalRevenue * 0.15) },
                          { name: 'Others', value: 15, revenue: Math.round(systemMetrics.totalRevenue * 0.15) }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2, 3].map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </ChartGrid>

              {/* Sales Breakdown Table */}
              {selectedRestaurant !== 'all' ? (
                // Show detailed breakdown for selected restaurant
                <RankingTable>
                  <ChartTitle>
                    {restaurants.find(r => r.id.toString() === selectedRestaurant)?.name || 'Selected Restaurant'} - Sales Breakdown
                  </ChartTitle>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader>
                          {activePeriod === 'today' || (isCustomDateRange &&
                            Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) <= 1
                          ) ? 'Hour' :
                          activePeriod === 'week' || (isCustomDateRange &&
                            Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) <= 7
                          ) ? 'Day' :
                          activePeriod === 'year' ? 'Month' : 'Date'}
                        </TableHeader>
                        <TableHeader>Sales (RM)</TableHeader>
                        <TableHeader>Orders</TableHeader>
                        <TableHeader>Avg. Order Value</TableHeader>
                        <TableHeader>Performance</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const selectedRestaurantData = restaurants.find(r => r.id.toString() === selectedRestaurant);
                        if (!selectedRestaurantData) return [];

                        let periods = [];
                        const baseRevenue = 8000 + (selectedRestaurantData.id * 1500) % 20000;
                        const baseOrders = 150 + (selectedRestaurantData.id * 15) % 300;

                        if (activePeriod === 'today' || (isCustomDateRange &&
                            Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) <= 1
                          )) {
                          // Show hourly data for today
                          for (let hour = 8; hour <= 22; hour++) {
                            const hourlyRevenue = Math.round(baseRevenue * 0.033 * (0.3 + Math.random() * 1.4));
                            const hourlyOrders = Math.round(baseOrders * 0.033 * (0.3 + Math.random() * 1.4));
                            periods.push({
                              period: `${hour}:00`,
                              revenue: hourlyRevenue,
                              orders: hourlyOrders,
                              avgOrder: hourlyOrders > 0 ? hourlyRevenue / hourlyOrders : 0,
                              performance: hourlyRevenue > baseRevenue * 0.04 ? 'Good' : hourlyRevenue > baseRevenue * 0.025 ? 'Average' : 'Low'
                            });
                          }
                        } else if (activePeriod === 'week' || (isCustomDateRange &&
                            Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) <= 7
                          )) {
                          // Show daily data for week
                          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                          days.forEach((day, index) => {
                            const dailyRevenue = Math.round(baseRevenue * 0.233 * (0.7 + Math.random() * 0.6));
                            const dailyOrders = Math.round(baseOrders * 0.233 * (0.7 + Math.random() * 0.6));
                            periods.push({
                              period: day,
                              revenue: dailyRevenue,
                              orders: dailyOrders,
                              avgOrder: dailyOrders > 0 ? dailyRevenue / dailyOrders : 0,
                              performance: dailyRevenue > baseRevenue * 0.25 ? 'Good' : dailyRevenue > baseRevenue * 0.2 ? 'Average' : 'Low'
                            });
                          });
                        } else if (activePeriod === 'year') {
                          // Show monthly data for year
                          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                          months.forEach((month, index) => {
                            const monthlyRevenue = Math.round(baseRevenue * 12 * (0.8 + Math.random() * 0.4));
                            const monthlyOrders = Math.round(baseOrders * 12 * (0.8 + Math.random() * 0.4));
                            periods.push({
                              period: month,
                              revenue: monthlyRevenue,
                              orders: monthlyOrders,
                              avgOrder: monthlyOrders > 0 ? monthlyRevenue / monthlyOrders : 0,
                              performance: monthlyRevenue > baseRevenue * 13 ? 'Good' : monthlyRevenue > baseRevenue * 10 ? 'Average' : 'Low'
                            });
                          });
                        } else {
                          // Show daily data for month or custom period
                          const startDate = isCustomDateRange ? new Date(dateRange.start) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                          const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();
                          const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

                          for (let i = 0; i < Math.min(diffDays, 31); i++) {
                            const currentDate = new Date(startDate);
                            currentDate.setDate(startDate.getDate() + i);
                            const dailyRevenue = Math.round(baseRevenue * (0.8 + Math.random() * 0.4));
                            const dailyOrders = Math.round(baseOrders * (0.8 + Math.random() * 0.4));
                            periods.push({
                              period: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
                              revenue: dailyRevenue,
                              orders: dailyOrders,
                              avgOrder: dailyOrders > 0 ? dailyRevenue / dailyOrders : 0,
                              performance: dailyRevenue > baseRevenue * 1.1 ? 'Good' : dailyRevenue > baseRevenue * 0.9 ? 'Average' : 'Low'
                            });
                          }
                        }

                        return periods.slice(0, 15).map((period, index) => (
                          <tr key={index}>
                            <TableCell style={{ fontWeight: 600 }}>{period.period}</TableCell>
                            <TableCell>RM {period.revenue.toLocaleString()}</TableCell>
                            <TableCell>{period.orders}</TableCell>
                            <TableCell>RM {Math.round(period.avgOrder)}</TableCell>
                            <TableCell style={{
                              color: period.performance === 'Good' ? '#059669' :
                                     period.performance === 'Average' ? '#F59E0B' : '#DC2626',
                              fontWeight: 500
                            }}>
                              {period.performance}
                            </TableCell>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </Table>
                </RankingTable>
              ) : (
                // Show top restaurants ranking when no specific restaurant is selected
                <RankingTable>
                  <ChartTitle>Top Restaurants by Sales Revenue</ChartTitle>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader>Rank</TableHeader>
                        <TableHeader>Restaurant Name</TableHeader>
                        <TableHeader>Total Sales</TableHeader>
                        <TableHeader>Orders</TableHeader>
                        <TableHeader>Avg. Order Value</TableHeader>
                        <TableHeader>Growth</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurants.map(restaurant => ({
                        id: restaurant.id,
                        name: restaurant.name,
                        manager: restaurant.manager_name || restaurant.managerName || 'Unknown',
                        revenue: Math.round((8000 + (restaurant.id * 1500) % 20000) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12)),
                        orders: Math.round((150 + (restaurant.id * 15) % 300) * (activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.233 : activePeriod === 'month' ? 1 : 12))
                      })).sort((a, b) => b.revenue - a.revenue).slice(0, 10).map((restaurant, index) => {
                        const rank = index + 1;
                        return (
                          <tr key={restaurant.id}>
                            <TableCell>
                              <RankBadge rank={rank}>{rank}</RankBadge>
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>{restaurant.name}</TableCell>
                            <TableCell>RM {restaurant.revenue.toLocaleString()}</TableCell>
                            <TableCell>{restaurant.orders.toLocaleString()}</TableCell>
                            <TableCell>RM {Math.round(restaurant.revenue / restaurant.orders)}</TableCell>
                            <TableCell style={{ color: rank <= 5 ? '#059669' : '#DC2626' }}>
                              {rank <= 5 ? '+' : '-'}{Math.abs(20 - rank * 2)}%
                            </TableCell>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </RankingTable>
              )}
            </>
          )}

          {activeTab === 'subscriptions' && (
            <>
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
                  <DateButton active={isCustomDateRange} onClick={() => setIsCustomDateRange(true)}>
                    Custom
                  </DateButton>
                  {isCustomDateRange && (
                    <CustomDateRange>
                      <DateRangeInput
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => {
                          console.log('Start date changed to:', e.target.value);
                          setDateRange(prev => ({ ...prev, start: e.target.value }));
                        }}
                        max={dateRange.end}
                      />
                      <DateRangeInput
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => {
                          console.log('End date changed to:', e.target.value);
                          setDateRange(prev => ({ ...prev, end: e.target.value }));
                        }}
                        min={dateRange.start}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </CustomDateRange>
                  )}
                </FilterRow>

                <FilterRow>
                  <SearchableManagerDropdown />
                  <DownloadButton onClick={handleDownloadReport}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download
                  </DownloadButton>
                </FilterRow>
              </FilterControls>

              <StatsGrid key={`subscription-stats-${refreshKey}-${activePeriod}-${selectedManager}-${dateRange.start}-${dateRange.end}`}>
                <StatCard color="#635BFF">
                  <StatValue>{(() => {
                    // Filter by manager first
                    let filteredRestaurants = selectedManager !== 'all' ?
                      restaurants.filter(restaurant => {
                        return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                               (restaurant.managerId && restaurant.managerId.toString() === selectedManager);
                      }) : restaurants;

                    // Then filter by date range
                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    filteredRestaurants = filteredRestaurants.filter(restaurant => {
                      const subscriptionStart = restaurant.subscription_start || restaurant.subscriptionStart;
                      const subscriptionEnd = restaurant.subscription_end || restaurant.subscriptionEnd;

                      if (!subscriptionStart) return true; // Include if no start date

                      const subStart = new Date(subscriptionStart);
                      const subEnd = subscriptionEnd ? new Date(subscriptionEnd) : new Date('2099-12-31');

                      // Check if subscription was active during the selected period
                      return subStart <= endDate && subEnd >= startDate;
                    });

                    return filteredRestaurants.length;
                  })()}</StatValue>
                  <StatLabel>Total Subscriptions</StatLabel>
                  <StatDescription>
                    {selectedManager !== 'all' ? `${selectedManagerName}'s restaurants` : 'All restaurants'} in period
                  </StatDescription>
                </StatCard>
                <StatCard color="#2563EB">
                  <StatValue>{(() => {
                    // Filter by manager and date
                    let filteredRestaurants = selectedManager !== 'all' ?
                      restaurants.filter(restaurant => {
                        return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                               (restaurant.managerId && restaurant.managerId.toString() === selectedManager);
                      }) : restaurants;

                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    filteredRestaurants = filteredRestaurants.filter(restaurant => {
                      const subscriptionStart = restaurant.subscription_start || restaurant.subscriptionStart;
                      const subscriptionEnd = restaurant.subscription_end || restaurant.subscriptionEnd;

                      if (!subscriptionStart) return true;

                      const subStart = new Date(subscriptionStart);
                      const subEnd = subscriptionEnd ? new Date(subscriptionEnd) : new Date('2099-12-31');

                      return subStart <= endDate && subEnd >= startDate;
                    });

                    // Count plan types
                    const planCounts = {};
                    filteredRestaurants.forEach(restaurant => {
                      const planType = restaurant.plan_type || restaurant.planType || 'Basic Plan';
                      planCounts[planType] = (planCounts[planType] || 0) + 1;
                    });

                    // Find most popular
                    const mostPopular = Object.keys(planCounts).reduce((a, b) =>
                      planCounts[a] > planCounts[b] ? a : b, 'Professional');

                    return mostPopular;
                  })()}</StatValue>
                  <StatLabel>Most Popular Plan</StatLabel>
                  <StatDescription>Most common in period</StatDescription>
                </StatCard>
                <StatCard color="#059669">
                  <StatValue>RM {(() => {
                    // Filter by manager first
                    let filteredRestaurants = selectedManager !== 'all' ?
                      restaurants.filter(restaurant => {
                        return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                               (restaurant.managerId && restaurant.managerId.toString() === selectedManager);
                      }) : restaurants;

                    // Then filter by date range
                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    filteredRestaurants = filteredRestaurants.filter(restaurant => {
                      const subscriptionStart = restaurant.subscription_start || restaurant.subscriptionStart;
                      const subscriptionEnd = restaurant.subscription_end || restaurant.subscriptionEnd;

                      if (!subscriptionStart) return true;

                      const subStart = new Date(subscriptionStart);
                      const subEnd = subscriptionEnd ? new Date(subscriptionEnd) : new Date('2099-12-31');

                      return subStart <= endDate && subEnd >= startDate;
                    });

                    // Calculate revenue based on period
                    const totalRevenue = filteredRestaurants.reduce((sum, restaurant) => {
                      const planAmount = parseFloat(restaurant.planAmount || restaurant.plan_amount || '0');

                      // Calculate months in the selected period for pro-rated revenue
                      const subscriptionStart = restaurant.subscription_start || restaurant.subscriptionStart;
                      const subscriptionEnd = restaurant.subscription_end || restaurant.subscriptionEnd;

                      if (!subscriptionStart) return sum + planAmount;

                      const subStart = new Date(Math.max(new Date(subscriptionStart).getTime(), startDate.getTime()));
                      const subEnd = new Date(Math.min(subscriptionEnd ? new Date(subscriptionEnd).getTime() : endDate.getTime(), endDate.getTime()));

                      const monthsActive = Math.max(1, Math.ceil((subEnd.getTime() - subStart.getTime()) / (1000 * 60 * 60 * 24 * 30)));

                      return sum + (planAmount * Math.min(monthsActive, activePeriod === 'today' ? 0.033 : activePeriod === 'week' ? 0.25 : activePeriod === 'month' ? 1 : 12));
                    }, 0);

                    return totalRevenue.toFixed(2);
                  })()}</StatValue>
                  <StatLabel>Total Revenue</StatLabel>
                  <StatDescription>Revenue for selected period</StatDescription>
                </StatCard>
                <StatCard color="#DC2626">
                  <StatValue>{(() => {
                    // Filter by manager first
                    let filteredRestaurants = selectedManager !== 'all' ?
                      restaurants.filter(restaurant => {
                        return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                               (restaurant.managerId && restaurant.managerId.toString() === selectedManager);
                      }) : restaurants;

                    // Then filter by date range and active status
                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    filteredRestaurants = filteredRestaurants.filter(restaurant => {
                      const subscriptionStart = restaurant.subscription_start || restaurant.subscriptionStart;
                      const subscriptionEnd = restaurant.subscription_end || restaurant.subscriptionEnd;

                      if (!subscriptionStart) return restaurant.status === 'active';

                      const subStart = new Date(subscriptionStart);
                      const subEnd = subscriptionEnd ? new Date(subscriptionEnd) : new Date('2099-12-31');

                      return restaurant.status === 'active' && subStart <= endDate && subEnd >= startDate;
                    });

                    return filteredRestaurants.length;
                  })()}</StatValue>
                  <StatLabel>Active Plans</StatLabel>
                  <StatDescription>Active in period</StatDescription>
                </StatCard>
              </StatsGrid>

              {/* Subscription List Table */}
              <RankingTable key={`subscription-table-${refreshKey}-${activePeriod}-${selectedManager}-${dateRange.start}-${dateRange.end}`}>
                <ChartTitle>Restaurant Subscriptions</ChartTitle>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Restaurant Name</TableHeader>
                      <TableHeader>Manager</TableHeader>
                      <TableHeader>Plan Type</TableHeader>
                      <TableHeader>Monthly Fee</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Subscription Period</TableHeader>
                      <TableHeader>Location</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Filter by manager first
                      let filteredRestaurants = selectedManager !== 'all' ?
                        restaurants.filter(restaurant => {
                          return (restaurant.manager_id && restaurant.manager_id.toString() === selectedManager) ||
                                 (restaurant.managerId && restaurant.managerId.toString() === selectedManager);
                        }) : restaurants;

                      // Then filter by date range
                      const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                      const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                      filteredRestaurants = filteredRestaurants.filter(restaurant => {
                        const subscriptionStart = restaurant.subscription_start || restaurant.subscriptionStart;
                        const subscriptionEnd = restaurant.subscription_end || restaurant.subscriptionEnd;

                        if (!subscriptionStart) return true; // Include if no start date

                        const subStart = new Date(subscriptionStart);
                        const subEnd = subscriptionEnd ? new Date(subscriptionEnd) : new Date('2099-12-31');

                        // Check if subscription was active during the selected period
                        return subStart <= endDate && subEnd >= startDate;
                      });

                      return filteredRestaurants.map((restaurant) => (
                        <tr key={restaurant.id}>
                          <TableCell style={{ fontWeight: 600 }}>{restaurant.name}</TableCell>
                          <TableCell>{restaurant.manager_name || restaurant.managerName || 'Unknown'}</TableCell>
                          <TableCell>
                            <span style={{
                              background: restaurant.planType === 'Enterprise Plan' ? '#8B5CF6' :
                                         restaurant.planType === 'Professional Plan' ? '#059669' : '#635BFF',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 500
                            }}>
                              {restaurant.planType || restaurant.plan_type || 'Basic'}
                            </span>
                          </TableCell>
                          <TableCell>RM {(restaurant.planAmount || restaurant.plan_amount || '29.00')}</TableCell>
                          <TableCell>
                            <span style={{
                              color: restaurant.status === 'active' ? '#059669' :
                                     restaurant.status === 'inactive' ? '#DC2626' : '#F59E0B',
                              fontWeight: 600,
                              textTransform: 'capitalize'
                            }}>
                              {restaurant.status || 'Active'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {restaurant.subscriptionStart && restaurant.subscriptionEnd ? (
                              `${restaurant.subscriptionStart} - ${restaurant.subscriptionEnd}`
                            ) : restaurant.subscription_start && restaurant.subscription_end ? (
                              `${restaurant.subscription_start} - ${restaurant.subscription_end}`
                            ) : (
                              'N/A'
                            )}
                          </TableCell>
                          <TableCell>{restaurant.location || restaurant.address || 'N/A'}</TableCell>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </Table>
              </RankingTable>
            </>
          )}


          {activeTab === 'system' && (
            <>
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
                  <DateButton active={isCustomDateRange} onClick={() => setIsCustomDateRange(true)}>
                    Custom
                  </DateButton>
                  {isCustomDateRange && (
                    <CustomDateRange>
                      <DateRangeInput
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => {
                          setDateRange(prev => ({ ...prev, start: e.target.value }));
                        }}
                        max={dateRange.end}
                      />
                      <DateRangeInput
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => {
                          setDateRange(prev => ({ ...prev, end: e.target.value }));
                        }}
                        min={dateRange.start}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </CustomDateRange>
                  )}
                </FilterRow>

                <FilterRow>
                  <DownloadButton onClick={handleDownloadReport}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download
                  </DownloadButton>
                </FilterRow>
              </FilterControls>

              <StatsGrid key={`system-analytics-${refreshKey}-${activePeriod}-${dateRange.start}-${dateRange.end}`}>
                <StatCard color="#635BFF">
                  <StatValue>RM {(() => {
                    if (!invoices.length) return '0';

                    // Filter invoices by selected date range
                    const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    const filteredInvoices = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      return invoiceDate >= startDate && invoiceDate <= endDate;
                    });

                    const totalRevenue = filteredInvoices.reduce((sum, invoice) => {
                      return sum + parseFloat(invoice.total || invoice.total_amount || 0);
                    }, 0);

                    return Math.round(totalRevenue).toLocaleString();
                  })()}</StatValue>
                  <StatLabel>Total Business Volume</StatLabel>
                  <StatDescription>Invoice-based revenue for period</StatDescription>
                </StatCard>
                <StatCard color="#059669">
                  <StatValue>{(() => {
                    if (!invoices.length) return '+0.0%';

                    // Calculate current period revenue
                    const currentStartDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                    const currentEndDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                    // Calculate previous period dates
                    const periodDays = Math.ceil((currentEndDate.getTime() - currentStartDate.getTime()) / (1000 * 60 * 60 * 24));
                    const prevStartDate = new Date(currentStartDate);
                    prevStartDate.setDate(prevStartDate.getDate() - periodDays);
                    const prevEndDate = new Date(currentStartDate);

                    const currentRevenue = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      return invoiceDate >= currentStartDate && invoiceDate <= currentEndDate;
                    }).reduce((sum, invoice) => sum + parseFloat(invoice.total || invoice.total_amount || 0), 0);

                    const prevRevenue = invoices.filter(invoice => {
                      const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                      return invoiceDate >= prevStartDate && invoiceDate <= prevEndDate;
                    }).reduce((sum, invoice) => sum + parseFloat(invoice.total || invoice.total_amount || 0), 0);

                    const growth = prevRevenue > 0 ? ((currentRevenue - prevRevenue) / prevRevenue) * 100 : 0;
                    return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
                  })()}</StatValue>
                  <StatLabel>Growth Rate</StatLabel>
                  <StatDescription>Compared to previous period</StatDescription>
                </StatCard>
                <StatCard color="#2563EB">
                  <StatValue>{(() => {
                    // Estimated total market size for Korean restaurants (example: 200,000)
                    const estimatedMarketSize = 200000;
                    const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
                    const penetration = ((activeRestaurants / estimatedMarketSize) * 100);
                    return penetration.toFixed(2);
                  })()}%</StatValue>
                  <StatLabel>Market Penetration</StatLabel>
                  <StatDescription>Of estimated market covered</StatDescription>
                </StatCard>
                <StatCard color="#7C3AED">
                  <StatValue>{(() => {
                    if (!invoices.length || !restaurants.length) return '0.0/5.0';

                    // Calculate satisfaction based on:
                    // 1. Invoice payment rate (paid invoices / total invoices)
                    // 2. Restaurant retention rate (active subscriptions)
                    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
                    const paymentRate = invoices.length > 0 ? paidInvoices / invoices.length : 0;

                    const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
                    const retentionRate = restaurants.length > 0 ? activeRestaurants / restaurants.length : 0;

                    // Weight: 60% payment rate + 40% retention rate
                    const satisfaction = (paymentRate * 0.6 + retentionRate * 0.4) * 5;
                    return satisfaction.toFixed(1);
                  })()}/5.0</StatValue>
                  <StatLabel>Customer Satisfaction</StatLabel>
                  <StatDescription>Based on payment & retention</StatDescription>
                </StatCard>
              </StatsGrid>

              {/* Business Intelligence Charts */}
              <TablesGrid>
                <TableCard>
                  <ChartTitle>Top Performing Plan Types</ChartTitle>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader>Plan<br/>Type</TableHeader>
                        <TableHeader>Sub-<br/>scribers</TableHeader>
                        <TableHeader>Revenue<br/>Share</TableHeader>
                        <TableHeader>Growth</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const planStats: Record<string, { subscribers: number; revenue: number; invoiceRevenue: number }> = {};

                        // Group by plan type using global filtered invoices
                        restaurants.forEach(restaurant => {
                          const planType = restaurant.plan_type || restaurant.planType || 'Basic Plan';

                          if (!planStats[planType]) {
                            planStats[planType] = { subscribers: 0, revenue: 0, invoiceRevenue: 0 };
                          }

                          planStats[planType].subscribers += 1;
                          planStats[planType].revenue += parseFloat(restaurant.planAmount || restaurant.plan_amount || 29);

                          // Add actual invoice revenue for this restaurant
                          const restaurantInvoices = filteredInvoices.filter(inv =>
                            inv.restaurantId?.toString() === restaurant.id?.toString()
                          );

                          const invoiceRevenue = restaurantInvoices.reduce((sum, inv) =>
                            sum + parseFloat(inv.total?.toString() || '0'), 0
                          );

                          planStats[planType].invoiceRevenue += invoiceRevenue;
                        });

                        const totalRevenue = Object.values(planStats).reduce((sum, plan) => sum + plan.invoiceRevenue, 0);

                        return Object.entries(planStats)
                          .sort(([,a], [,b]) => b.invoiceRevenue - a.invoiceRevenue)
                          .map(([planType, stats]) => {
                            // Calculate growth rate based on invoice revenue vs subscription revenue
                            const growthRate = stats.revenue > 0 ?
                              ((stats.invoiceRevenue - stats.revenue) / stats.revenue) * 100 : 0;

                            return (
                              <tr key={planType}>
                                <TableCell style={{ fontWeight: 600 }}>{planType}</TableCell>
                                <TableCell>{stats.subscribers}</TableCell>
                                <TableCell>{totalRevenue > 0 ? ((stats.invoiceRevenue / totalRevenue) * 100).toFixed(1) : '0.0'}%</TableCell>
                                <TableCell style={{ color: growthRate >= 0 ? '#059669' : '#DC2626' }}>
                                  {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
                                </TableCell>
                              </tr>
                            );
                          });
                      })()}
                    </tbody>
                  </Table>
                </TableCard>

                <TableCard>
                  <ChartTitle>Manager Performance Ranking</ChartTitle>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader>Rank</TableHeader>
                        <TableHeader>Manager</TableHeader>
                        <TableHeader>Restau-<br/>rants</TableHeader>
                        <TableHeader>Total<br/>Revenue</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const managerStats: Record<string, { restaurants: number; subscriptionRevenue: number; invoiceRevenue: number }> = {};

                        restaurants.forEach(restaurant => {
                          const managerName = restaurant.manager_name || restaurant.managerName || 'Unknown Manager';

                          if (!managerStats[managerName]) {
                            managerStats[managerName] = { restaurants: 0, subscriptionRevenue: 0, invoiceRevenue: 0 };
                          }

                          managerStats[managerName].restaurants += 1;
                          managerStats[managerName].subscriptionRevenue += parseFloat(restaurant.planAmount || restaurant.plan_amount || 29);

                          // Calculate actual invoice revenue for this restaurant
                          const restaurantInvoices = filteredInvoices.filter(inv =>
                            inv.restaurantId?.toString() === restaurant.id?.toString()
                          );

                          const invoiceRevenue = restaurantInvoices.reduce((sum, inv) =>
                            sum + parseFloat(inv.total?.toString() || '0'), 0
                          );

                          managerStats[managerName].invoiceRevenue += invoiceRevenue;
                        });

                        return Object.entries(managerStats)
                          .sort(([,a], [,b]) => b.invoiceRevenue - a.invoiceRevenue)
                          .slice(0, 5)
                          .map(([managerName, stats], index) => (
                            <tr key={managerName}>
                              <TableCell style={{ fontWeight: 600 }}>
                                <span style={{
                                  background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#E6EBF1',
                                  color: index < 3 ? 'white' : '#6B7C93',
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: 600
                                }}>
                                  #{index + 1}
                                </span>
                              </TableCell>
                              <TableCell>{managerName}</TableCell>
                              <TableCell>{stats.restaurants}</TableCell>
                              <TableCell>RM {stats.invoiceRevenue.toFixed(2)}</TableCell>
                            </tr>
                          ));
                      })()}
                    </tbody>
                  </Table>
                </TableCard>
              </TablesGrid>

              {/* Business Insights */}
              <RankingTable>
                <ChartTitle>Business Intelligence Insights</ChartTitle>
                <div style={{ padding: '20px' }}>
                  <InsightsGrid>
                    <div>
                      <h4 style={{ margin: '0 0 12px 0', color: '#2B3674', fontSize: '16px', fontWeight: 600 }}>
                        Revenue Distribution
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(() => {
                          const planRevenue: Record<string, number> = {};
                          let totalRevenue = 0;

                          restaurants.forEach(restaurant => {
                            const planType = restaurant.plan_type || restaurant.planType || 'Basic Plan';
                            const revenue = parseFloat(restaurant.planAmount || restaurant.plan_amount || '29');
                            planRevenue[planType] = (planRevenue[planType] || 0) + revenue;
                            totalRevenue += revenue;
                          });

                          return Object.entries(planRevenue).map(([plan, revenue]) => (
                            <div key={plan} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '14px', color: '#6B7C93' }}>{plan}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '60px',
                                  height: '6px',
                                  background: '#E6EBF1',
                                  borderRadius: '3px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    width: `${(revenue / totalRevenue) * 100}%`,
                                    height: '100%',
                                    background: plan.includes('Enterprise') ? '#8B5CF6' :
                                              plan.includes('Professional') ? '#059669' : '#635BFF'
                                  }} />
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#2B3674', minWidth: '40px' }}>
                                  {((revenue / totalRevenue) * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 12px 0', color: '#2B3674', fontSize: '16px', fontWeight: 600 }}>
                        Key Performance Indicators
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', color: '#6B7C93' }}>Average Invoice Revenue per Restaurant</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#2B3674' }}>
                            RM {(() => {
                              if (!invoices.length || !restaurants.length) return '0.00';

                              const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                              const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                              const filteredInvoices = invoices.filter(invoice => {
                                const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                                return invoiceDate >= startDate && invoiceDate <= endDate;
                              });

                              const totalRevenue = filteredInvoices.reduce((sum, inv) =>
                                sum + parseFloat(inv.total || inv.total_amount || 0), 0
                              );

                              return (totalRevenue / restaurants.length).toFixed(2);
                            })()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', color: '#6B7C93' }}>Invoice Payment Rate</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#059669' }}>
                            {(() => {
                              if (!invoices.length) return '0';
                              const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
                              return Math.round((paidInvoices / invoices.length) * 100);
                            })()}%
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', color: '#6B7C93' }}>System Adoption Rate</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#2563EB' }}>
                            {restaurants.length > 0 ? Math.round((restaurants.filter(r => r.status === 'active').length / restaurants.length) * 100) : 0}%
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', color: '#6B7C93' }}>Revenue per Manager</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#7C3AED' }}>
                            RM {(() => {
                              if (!invoices.length || !managers.length) return '0.00';

                              const startDate = isCustomDateRange ? new Date(dateRange.start) : getPeriodStartDate(activePeriod);
                              const endDate = isCustomDateRange ? new Date(dateRange.end) : new Date();

                              const filteredInvoices = invoices.filter(invoice => {
                                const invoiceDate = new Date(invoice.issueDate || invoice.createdAt);
                                return invoiceDate >= startDate && invoiceDate <= endDate;
                              });

                              const totalRevenue = filteredInvoices.reduce((sum, inv) =>
                                sum + parseFloat(inv.total || inv.total_amount || 0), 0
                              );

                              return (totalRevenue / managers.length).toFixed(2);
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </InsightsGrid>
                </div>
              </RankingTable>
            </>
          )}

        </Content>
      </ReportsContainer>
    </MainLayout>
  );
};

export default AnalyticsPage;