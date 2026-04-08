import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Button,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription
} from '../../components/UI';
import { formatCurrency as formatCurrencyUtil } from '../../utils/currency';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useTranslation } from 'react-i18next';


const SortRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const SortLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #7C3AED;
  }
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const RestaurantCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const StatusBadge = styled.span<{ status?: string }>`
  font-size: 12px;
  color: ${props => props.status === 'active' ? '#059669' : '#6B7280'};
  background: ${props => props.status === 'active' ? '#ECFDF5' : '#F3F4F6'};
  padding: 4px 8px;
  border-radius: 4px;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const MetricValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const GrowthBadge = styled.span<{ positive?: boolean }>`
  font-size: 11px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${props => props.positive ? '#ECFDF5' : '#FEE2E2'};
`;

const RankingSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const RankNumber = styled.div<{ rank: number }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => {
    if (props.rank === 1) return '#FFD700';
    if (props.rank === 2) return '#C0C0C0';
    if (props.rank === 3) return '#CD7F32';
    return '#E5E7EB';
  }};
  color: ${props => props.rank <= 3 ? 'white' : '#6B7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;
`;

const RankInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RankRestaurant = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RankStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`;

const RankStat = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;


interface Restaurant {
  id: number;
  name: string;
  status: string;
  currency: string;
}

interface Order {
  id: number;
  restaurant_id: number;
  total_amount: string;
  subtotal?: string;
  status: string;
  order_date: string;
  createdAt: string;
  customer_id?: number;
  customer_name?: string;
  served_at?: string;
}

interface RestaurantPerformanceData {
  id: number;
  name: string;
  status: string;
  currency: string;
  totalOrders: number;
  completedOrders: number;
  sales: number;
  previousSales: number;
  growth: number;
  avgOrder: number;
  maxOrder: number;
  uniqueCustomers: number;
  avgServiceTime: number;
}

const OwnerPerformance: React.FC = () => {
  const { t } = useTranslation('owner');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('sales');

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants data
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch orders when date range or restaurants change
  useEffect(() => {
    if (restaurants.length > 0) {
      fetchOrdersData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants, dateRange.start, dateRange.end]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      const response = await fetch('/api/owner/restaurants', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const restaurantsData = data.data || data;
        const allRestaurants: Restaurant[] = (Array.isArray(restaurantsData) ? restaurantsData : []).map((r: any) => ({
          id: r.id,
          name: r.name,
          status: r.status || 'active',
          currency: r.currency || 'MYR'
        }));
        setRestaurants(allRestaurants);

        if (allRestaurants.length === 0) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchOrdersData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      if (restaurants.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch orders for all restaurants in the date range
      const ordersPromises = restaurants.map(async (restaurant) => {
        try {
          const response = await fetch(
            `/api/orders?restaurant_id=${restaurant.id}&start_date=${dateRange.start}&end_date=${dateRange.end}`,
            {
              headers: { 'Authorization': `Bearer ${token}` }
            }
          );
          if (response.ok) {
            const data = await response.json();
            let ordersArray: Order[] = [];
            if (Array.isArray(data)) {
              ordersArray = data;
            } else if (data.data && Array.isArray(data.data)) {
              ordersArray = data.data;
            } else if (data.orders && Array.isArray(data.orders)) {
              ordersArray = data.orders;
            }
            return ordersArray;
          }
          return [];
        } catch (err) {
          console.error(`Error fetching orders for restaurant ${restaurant.id}:`, err);
          return [];
        }
      });

      const allOrdersArrays = await Promise.all(ordersPromises);
      const allOrders = allOrdersArrays.flat();
      setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle period change
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  // Calculate previous period date range for growth comparison
  const getPreviousPeriodRange = useMemo(() => {
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const periodDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const prevEnd = new Date(startDate);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - periodDays);

    const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return {
      start: fmt(prevStart),
      end: fmt(prevEnd)
    };
  }, [dateRange.start, dateRange.end]);

  // Calculate performance data per restaurant
  const performanceData: RestaurantPerformanceData[] = useMemo(() => {
    if (restaurants.length === 0) return [];

    const startDate = new Date(dateRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    const prevStartDate = new Date(getPreviousPeriodRange.start);
    prevStartDate.setHours(0, 0, 0, 0);
    const prevEndDate = new Date(getPreviousPeriodRange.end);
    prevEndDate.setHours(23, 59, 59, 999);

    return restaurants.map(restaurant => {
      const restaurantOrders = orders.filter(order => Number(order.restaurant_id) === Number(restaurant.id));

      // Current period orders
      const currentPeriodOrders = restaurantOrders.filter(order => {
        const orderDate = new Date(order.order_date || order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });

      // Previous period orders (for growth calculation)
      const previousPeriodOrders = restaurantOrders.filter(order => {
        const orderDate = new Date(order.order_date || order.createdAt);
        return orderDate >= prevStartDate && orderDate <= prevEndDate;
      });

      // Calculate metrics
      const completedOrders = currentPeriodOrders.filter(o => o.status === 'completed');
      const prevCompletedOrders = previousPeriodOrders.filter(o => o.status === 'completed');

      const totalSales = completedOrders.reduce((sum, order) => {
        return sum + parseFloat(order.total_amount || '0');
      }, 0);

      const previousSales = prevCompletedOrders.reduce((sum, order) => {
        return sum + parseFloat(order.total_amount || '0');
      }, 0);

      const growth = previousSales > 0
        ? ((totalSales - previousSales) / previousSales) * 100
        : (totalSales > 0 ? 100 : 0);

      const avgOrder = completedOrders.length > 0
        ? totalSales / completedOrders.length
        : 0;

      // Max order value
      const maxOrder = completedOrders.reduce((max, order) => {
        const price = parseFloat(order.total_amount || '0');
        return price > max ? price : max;
      }, 0);

      // Unique customers count
      const customerIds = new Set(
        currentPeriodOrders
          .filter(o => o.customer_id)
          .map(o => o.customer_id)
      );
      const uniqueCustomers = customerIds.size;

      // Average fulfillment time (createdAt → served_at, in minutes)
      const ordersWithServedTime = completedOrders.filter(o => o.served_at && o.createdAt);
      const avgServiceTime = ordersWithServedTime.length > 0
        ? ordersWithServedTime.reduce((sum, o) => {
            const created = new Date(o.createdAt).getTime();
            const served = new Date(o.served_at!).getTime();
            const diffMin = (served - created) / (1000 * 60);
            return sum + (diffMin > 0 ? diffMin : 0);
          }, 0) / ordersWithServedTime.length
        : 0;

      return {
        id: restaurant.id,
        name: restaurant.name,
        status: restaurant.status,
        currency: restaurant.currency,
        totalOrders: currentPeriodOrders.length,
        completedOrders: completedOrders.length,
        sales: Math.round(totalSales * 100) / 100,
        previousSales: Math.round(previousSales * 100) / 100,
        growth: Math.round(growth * 10) / 10,
        avgOrder: Math.round(avgOrder * 100) / 100,
        maxOrder: Math.round(maxOrder * 100) / 100,
        uniqueCustomers,
        avgServiceTime: Math.round(avgServiceTime)
      };
    });
  }, [restaurants, orders, dateRange.start, dateRange.end, getPreviousPeriodRange]);

  // Sort restaurants by selected metric
  const sortedRestaurants = useMemo(() => {
    return [...performanceData].sort((a, b) => {
      switch (selectedMetric) {
        case 'sales': return b.sales - a.sales;
        case 'growth': return b.growth - a.growth;
        case 'orders': return b.completedOrders - a.completedOrders;
        case 'customers': return b.uniqueCustomers - a.uniqueCustomers;
        default: return b.sales - a.sales;
      }
    });
  }, [performanceData, selectedMetric]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalSales = performanceData.reduce((sum, r) => sum + r.sales, 0);
    const totalRestaurants = performanceData.length;
    const totalOrders = performanceData.reduce((sum, r) => sum + r.completedOrders, 0);
    const previousTotalSales = performanceData.reduce((sum, r) => sum + r.previousSales, 0);
    const totalCustomers = performanceData.reduce((sum, r) => sum + r.uniqueCustomers, 0);
    const maxOrderValue = Math.max(...performanceData.map(r => r.maxOrder), 0);

    const overallAvgOrder = totalOrders > 0 ? totalSales / totalOrders : 0;

    const restaurantsWithServiceTime = performanceData.filter(r => r.avgServiceTime > 0);
    const overallAvgServiceTime = restaurantsWithServiceTime.length > 0
      ? restaurantsWithServiceTime.reduce((sum, r) => sum + r.avgServiceTime, 0) / restaurantsWithServiceTime.length
      : 0;

    const overallGrowth = previousTotalSales > 0
      ? ((totalSales - previousTotalSales) / previousTotalSales) * 100
      : (totalSales > 0 ? 100 : 0);

    return {
      totalSales,
      totalRestaurants,
      totalOrders,
      totalCustomers,
      maxOrderValue,
      overallAvgOrder: Math.round(overallAvgOrder * 100) / 100,
      overallAvgServiceTime: Math.round(overallAvgServiceTime),
      overallGrowth: Math.round(overallGrowth * 10) / 10
    };
  }, [performanceData]);

  const formatCurrency = (amount: number, currency?: string) => {
    const currencyCode = currency || 'MYR';
    return formatCurrencyUtil(amount, currencyCode);
  };

  const periodLabel = isCustomDateRange ? `${dateRange.start} ~ ${dateRange.end}` : activePeriod;

  const handleExportReport = () => {
    if (sortedRestaurants.length === 0) return;

    const headers = ['Restaurant', 'Status', 'Revenue', 'Orders', 'Customers', 'Avg Order', 'Max Order', 'Avg Fulfillment', 'Growth %'];
    const rows = sortedRestaurants.map(r => [
      `"${r.name}"`,
      r.status,
      r.sales.toFixed(2),
      r.completedOrders,
      r.uniqueCustomers,
      r.avgOrder.toFixed(2),
      r.maxOrder.toFixed(2),
      r.avgServiceTime > 0 ? `${r.avgServiceTime} min` : 'N/A',
      `${r.growth}%`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `owner-performance-${dateRange.start}-to-${dateRange.end}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>{t('owner:ownerPerformance.performance')}</Title>
          </div>
          <ActionSection>
            <Button variant="primary" onClick={handleExportReport}>{t('owner:ownerPerformance.exportReport')}</Button>
          </ActionSection>
        </Header>

        <Content>
          {/* Filter Controls */}
          <DatePeriodFilter
            activePeriod={activePeriod}
            dateRange={dateRange}
            isCustomDateRange={isCustomDateRange}
            onPeriodChange={handlePeriodChange}
            onCalendarRangeSelect={handleCalendarRangeSelect}
          />

          <SortRow>
            <SortLabel>Sort by:</SortLabel>
            <FilterSelect
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="sales">{t('owner:ownerPerformance.revenue')}</option>
              <option value="growth">{t('owner:ownerPerformance.growth')}</option>
              <option value="orders">{t('owner:ownerPerformance.orders')}</option>
              <option value="customers">{t('owner:ownerPerformance.customers')}</option>
            </FilterSelect>
          </SortRow>

          {/* Stats Grid - Row 1 */}
          <StatsGrid>
            <StatCard color="#7C3AED">
              <StatValue>{formatCurrency(stats.totalSales)}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.totalRevenue')}</StatLabel>
              <StatDescription>{periodLabel}</StatDescription>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.totalOrders.toLocaleString()}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.totalOrders')}</StatLabel>
              <StatDescription>{t('owner:ownerPerformance.completedOrders')}</StatDescription>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.totalCustomers.toLocaleString()}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.customers')}</StatLabel>
              <StatDescription>{t('owner:ownerPerformance.uniqueCustomers')}</StatDescription>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{formatCurrency(stats.overallAvgOrder)}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.avgOrder')}</StatLabel>
              <StatDescription>{t('owner:ownerPerformance.perOrderValue')}</StatDescription>
            </StatCard>
          </StatsGrid>

          {/* Stats Grid - Row 2 */}
          <StatsGrid style={{ marginTop: '-16px' }}>
            <StatCard color="#EC4899">
              <StatValue>{formatCurrency(stats.maxOrderValue)}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.maxOrder')}</StatLabel>
              <StatDescription>{t('owner:ownerPerformance.highestOrderValue')}</StatDescription>
            </StatCard>
            <StatCard color="#06B6D4">
              <StatValue>{stats.overallAvgServiceTime > 0 ? `${stats.overallAvgServiceTime} min` : 'N/A'}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.avgFulfillment')}</StatLabel>
              <StatDescription>{t('owner:ownerPerformance.orderToServed')}</StatDescription>
            </StatCard>
            <StatCard color="#F97316">
              <StatValue>{stats.overallGrowth > 0 ? '+' : ''}{stats.overallGrowth}%</StatValue>
              <StatLabel>{t('owner:ownerPerformance.growth')}</StatLabel>
              <StatDescription>vs previous period</StatDescription>
            </StatCard>
            <StatCard color="#14B8A6">
              <StatValue>{stats.totalRestaurants}</StatValue>
              <StatLabel>{t('owner:ownerPerformance.restaurants')}</StatLabel>
              <StatDescription>{t('owner:ownerPerformance.yourRestaurants')}</StatDescription>
            </StatCard>
          </StatsGrid>

          {loading ? (
            <EmptyState>
              <p>{t('owner:ownerPerformance.loadingPerformanceData')}</p>
            </EmptyState>
          ) : sortedRestaurants.length === 0 ? (
            <EmptyState>
              <h3>{t('owner:ownerPerformance.noDataAvailable')}</h3>
              <p>{t('owner:ownerPerformance.noPerformanceDataFoundForTheSelectedPeriod')}</p>
            </EmptyState>
          ) : (
            <>
              <PerformanceGrid>
                {sortedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id}>
                    <RestaurantHeader>
                      <RestaurantName>{restaurant.name}</RestaurantName>
                      <StatusBadge status={restaurant.status}>
                        {restaurant.status === 'active' ? 'Active' : restaurant.status}
                      </StatusBadge>
                    </RestaurantHeader>
                    <MetricRow>
                      <MetricLabel>{t('owner:ownerPerformance.revenue')}</MetricLabel>
                      <MetricValue>
                        {formatCurrency(restaurant.sales, restaurant.currency)}
                        {restaurant.growth !== 0 && (
                          <GrowthBadge positive={restaurant.growth > 0}>
                            {restaurant.growth > 0 ? '+' : ''}{restaurant.growth}%
                          </GrowthBadge>
                        )}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('owner:ownerPerformance.orders')}</MetricLabel>
                      <MetricValue>{restaurant.completedOrders.toLocaleString()} completed</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('owner:ownerPerformance.customers')}</MetricLabel>
                      <MetricValue>{restaurant.uniqueCustomers.toLocaleString()} unique</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('owner:ownerPerformance.avgOrder')}</MetricLabel>
                      <MetricValue>
                        {restaurant.avgOrder > 0 ? formatCurrency(restaurant.avgOrder, restaurant.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('owner:ownerPerformance.maxOrder')}</MetricLabel>
                      <MetricValue>
                        {restaurant.maxOrder > 0 ? formatCurrency(restaurant.maxOrder, restaurant.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('owner:ownerPerformance.avgFulfillment')}</MetricLabel>
                      <MetricValue>
                        {restaurant.avgServiceTime > 0 ? `${restaurant.avgServiceTime} min` : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                  </RestaurantCard>
                ))}
              </PerformanceGrid>

              <RankingSection>
                <SectionTitle>Restaurant Ranking ({periodLabel})</SectionTitle>
                {sortedRestaurants.slice(0, 10).map((restaurant, index) => (
                  <RankingItem key={restaurant.id}>
                    <RankNumber rank={index + 1}>{index + 1}</RankNumber>
                    <RankInfo>
                      <RankRestaurant>{restaurant.name}</RankRestaurant>
                      <RankStats>
                        <RankStat>Revenue: {formatCurrency(restaurant.sales, restaurant.currency)}</RankStat>
                        <RankStat>Orders: {restaurant.completedOrders}</RankStat>
                        <RankStat>Customers: {restaurant.uniqueCustomers}</RankStat>
                        <RankStat>Growth: {restaurant.growth > 0 ? '+' : ''}{restaurant.growth}%</RankStat>
                      </RankStats>
                    </RankInfo>
                  </RankingItem>
                ))}
              </RankingSection>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default OwnerPerformance;
