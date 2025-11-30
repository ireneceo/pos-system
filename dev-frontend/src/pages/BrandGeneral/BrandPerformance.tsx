import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
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

// Page-specific styled components
const Subtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`;

// Filter styles (from ReportsPage)
const FilterControls = styled.div`
  background: white;
  padding: 20px 24px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
    width: 100%;
  }
`;

const FilterLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 14px;
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#5A51E6' : '#F8FAFC'};
  }
`;

const DateRangeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
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
    border-color: #635BFF;
  }
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const BrandCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const BrandHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const BrandName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const BrandCategory = styled.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
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

const RankBrand = styled.div`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
  }
`;

interface Brand {
  id: number;
  name: string;
  code: string;
  status: string;
  currency?: string;
  restaurants?: Array<{
    id: number;
    name: string;
    status: string;
  }>;
}

interface Order {
  id: number;
  restaurant_id: number;
  final_price: string;
  total_amount: string;
  status: string;
  order_date: string;
  createdAt: string;
  customer_id?: number;
  customer_name?: string;
  preparation_time?: number;
  completed_at?: string;
}

interface BrandPerformanceData {
  id: number;
  name: string;
  code: string;
  currency: string;
  stores: number;
  storeIds: number[];
  totalOrders: number;
  completedOrders: number;
  sales: number;
  previousSales: number;
  growth: number;
  avgOrder: number;
  maxOrder: number;
  uniqueCustomers: number;
  avgServiceTime: number;
  category: string;
}

type PeriodType = 'today' | 'week' | 'month' | 'year' | 'all';

const BRAND_COLORS = ['#635BFF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

// Helper function to format date string
const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BrandPerformance: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return {
      start: formatDateString(monthAgo),
      end: formatDateString(today)
    };
  });
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState('sales');

  const [brands, setBrands] = useState<Brand[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch brands data
  useEffect(() => {
    fetchBrandsData();
  }, []);

  // Fetch orders when date range or brands change
  useEffect(() => {
    if (brands.length > 0) {
      fetchOrdersData();
    }
  }, [brands, dateRange.start, dateRange.end]);

  const fetchBrandsData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/brands', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data: Brand[] = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchOrdersData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      // Get all restaurant IDs from brands
      const allRestaurantIds = brands.flatMap(brand =>
        brand.restaurants?.map(r => r.id) || []
      );

      if (allRestaurantIds.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch orders for all restaurants in the date range
      const ordersPromises = allRestaurantIds.map(async (restaurantId) => {
        try {
          const response = await fetch(
            `/api/orders?restaurant_id=${restaurantId}&start_date=${dateRange.start}&end_date=${dateRange.end}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          if (response.ok) {
            const data = await response.json();
            return data.orders || data || [];
          }
          return [];
        } catch {
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

    const today = new Date();
    let start = new Date();

    switch (period) {
      case 'today':
        start = today;
        break;
      case 'week':
        start = new Date(today);
        start.setDate(start.getDate() - 6);
        break;
      case 'month':
        start = new Date(today);
        start.setMonth(start.getMonth() - 1);
        break;
      case 'year':
        start = new Date(today);
        start.setFullYear(start.getFullYear() - 1);
        break;
      case 'all':
        start = new Date('2020-01-01');
        break;
    }

    setDateRange({
      start: formatDateString(start),
      end: formatDateString(today)
    });
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

    return {
      start: formatDateString(prevStart),
      end: formatDateString(prevEnd)
    };
  }, [dateRange.start, dateRange.end]);

  // Calculate performance data from real orders
  const performanceData: BrandPerformanceData[] = useMemo(() => {
    if (brands.length === 0) return [];

    const startDate = new Date(dateRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    const prevStartDate = new Date(getPreviousPeriodRange.start);
    prevStartDate.setHours(0, 0, 0, 0);
    const prevEndDate = new Date(getPreviousPeriodRange.end);
    prevEndDate.setHours(23, 59, 59, 999);

    return brands.map(brand => {
      const storeIds = brand.restaurants?.map(r => r.id) || [];
      const storeCount = storeIds.length;

      // Filter orders for this brand's restaurants
      const brandOrders = orders.filter(order => {
        const orderRestaurantId = order.restaurant_id;
        return storeIds.includes(orderRestaurantId);
      });

      // Current period orders
      const currentPeriodOrders = brandOrders.filter(order => {
        const orderDate = new Date(order.order_date || order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });

      // Previous period orders (for growth calculation)
      const previousPeriodOrders = brandOrders.filter(order => {
        const orderDate = new Date(order.order_date || order.createdAt);
        return orderDate >= prevStartDate && orderDate <= prevEndDate;
      });

      // Calculate metrics
      const completedOrders = currentPeriodOrders.filter(o => o.status === 'completed');
      const prevCompletedOrders = previousPeriodOrders.filter(o => o.status === 'completed');

      const totalSales = completedOrders.reduce((sum, order) => {
        return sum + parseFloat(order.final_price || order.total_amount || '0');
      }, 0);

      const previousSales = prevCompletedOrders.reduce((sum, order) => {
        return sum + parseFloat(order.final_price || order.total_amount || '0');
      }, 0);

      const growth = previousSales > 0
        ? ((totalSales - previousSales) / previousSales) * 100
        : (totalSales > 0 ? 100 : 0);

      const avgOrder = completedOrders.length > 0
        ? totalSales / completedOrders.length
        : 0;

      // Max order value
      const maxOrder = completedOrders.reduce((max, order) => {
        const price = parseFloat(order.final_price || order.total_amount || '0');
        return price > max ? price : max;
      }, 0);

      // Unique customers count
      const customerIds = new Set(
        currentPeriodOrders
          .filter(o => o.customer_id)
          .map(o => o.customer_id)
      );
      const uniqueCustomers = customerIds.size;

      // Average service/preparation time (in minutes)
      const ordersWithPrepTime = completedOrders.filter(o => o.preparation_time && o.preparation_time > 0);
      const avgServiceTime = ordersWithPrepTime.length > 0
        ? ordersWithPrepTime.reduce((sum, o) => sum + (o.preparation_time || 0), 0) / ordersWithPrepTime.length
        : 0;

      return {
        id: brand.id,
        name: brand.name,
        code: brand.code,
        currency: brand.currency || 'RM',
        stores: storeCount,
        storeIds,
        totalOrders: currentPeriodOrders.length,
        completedOrders: completedOrders.length,
        sales: Math.round(totalSales * 100) / 100,
        previousSales: Math.round(previousSales * 100) / 100,
        growth: Math.round(growth * 10) / 10,
        avgOrder: Math.round(avgOrder * 100) / 100,
        maxOrder: Math.round(maxOrder * 100) / 100,
        uniqueCustomers,
        avgServiceTime: Math.round(avgServiceTime),
        category: 'Restaurant'
      };
    });
  }, [brands, orders, dateRange.start, dateRange.end, getPreviousPeriodRange]);

  // Filter by selected brand
  const filteredBrands = useMemo(() => {
    if (selectedBrandId === 'all') return performanceData;
    return performanceData.filter(b => b.id.toString() === selectedBrandId);
  }, [performanceData, selectedBrandId]);

  // Sort brands by selected metric
  const sortedBrands = useMemo(() => {
    return [...filteredBrands].sort((a, b) => {
      switch (selectedMetric) {
        case 'sales': return b.sales - a.sales;
        case 'growth': return b.growth - a.growth;
        case 'orders': return b.completedOrders - a.completedOrders;
        case 'stores': return b.stores - a.stores;
        default: return b.sales - a.sales;
      }
    });
  }, [filteredBrands, selectedMetric]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalSales = filteredBrands.reduce((sum, b) => sum + b.sales, 0);
    const totalStores = filteredBrands.reduce((sum, b) => sum + b.stores, 0);
    const totalOrders = filteredBrands.reduce((sum, b) => sum + b.completedOrders, 0);
    const previousTotalSales = filteredBrands.reduce((sum, b) => sum + b.previousSales, 0);
    const totalCustomers = filteredBrands.reduce((sum, b) => sum + b.uniqueCustomers, 0);
    const maxOrderValue = Math.max(...filteredBrands.map(b => b.maxOrder), 0);

    // Calculate overall average order
    const overallAvgOrder = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Calculate overall average service time
    const brandsWithServiceTime = filteredBrands.filter(b => b.avgServiceTime > 0);
    const overallAvgServiceTime = brandsWithServiceTime.length > 0
      ? brandsWithServiceTime.reduce((sum, b) => sum + b.avgServiceTime, 0) / brandsWithServiceTime.length
      : 0;

    const overallGrowth = previousTotalSales > 0
      ? ((totalSales - previousTotalSales) / previousTotalSales) * 100
      : (totalSales > 0 ? 100 : 0);

    return {
      totalSales,
      totalStores,
      totalOrders,
      totalCustomers,
      maxOrderValue,
      overallAvgOrder: Math.round(overallAvgOrder * 100) / 100,
      overallAvgServiceTime: Math.round(overallAvgServiceTime),
      overallGrowth: Math.round(overallGrowth * 10) / 10
    };
  }, [filteredBrands]);

  const formatCurrency = (amount: number, currency: string = 'RM') => {
    if (amount >= 1000000) {
      return `${currency} ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${currency} ${(amount / 1000).toFixed(1)}K`;
    }
    return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getPeriodLabel = () => {
    if (isCustomDateRange) return `${dateRange.start} to ${dateRange.end}`;
    switch (activePeriod) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      case 'all': return 'All Time';
      default: return '';
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Brand Performance</Title>
            <Subtitle>Analyze brand performance metrics and growth trends</Subtitle>
          </div>
          <ActionSection>
            <Button variant="secondary" onClick={() => fetchOrdersData()}>Refresh</Button>
            <Button variant="primary">Export Report</Button>
          </ActionSection>
        </Header>

        <Content>
          {/* Filter Controls */}
          <FilterControls>
            <FilterRow>
              <FilterLabel>Period:</FilterLabel>
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

            <FilterRow>
              <FilterLabel>Brand:</FilterLabel>
              <FilterSelect
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </option>
                ))}
              </FilterSelect>

              <FilterLabel style={{ marginLeft: '16px' }}>Sort by:</FilterLabel>
              <FilterSelect
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="sales">Revenue</option>
                <option value="growth">Growth</option>
                <option value="orders">Orders</option>
                <option value="stores">Stores</option>
              </FilterSelect>
            </FilterRow>
          </FilterControls>

          {/* Stats Grid - Row 1 */}
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{formatCurrency(stats.totalSales)}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
              <StatDescription>{getPeriodLabel()}</StatDescription>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.totalOrders.toLocaleString()}</StatValue>
              <StatLabel>Total Orders</StatLabel>
              <StatDescription>Completed orders</StatDescription>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.totalCustomers.toLocaleString()}</StatValue>
              <StatLabel>Customers</StatLabel>
              <StatDescription>Unique customers</StatDescription>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{formatCurrency(stats.overallAvgOrder)}</StatValue>
              <StatLabel>Avg Order</StatLabel>
              <StatDescription>Per order value</StatDescription>
            </StatCard>
          </StatsGrid>

          {/* Stats Grid - Row 2 */}
          <StatsGrid style={{ marginTop: '-16px' }}>
            <StatCard color="#EC4899">
              <StatValue>{formatCurrency(stats.maxOrderValue)}</StatValue>
              <StatLabel>Max Order</StatLabel>
              <StatDescription>Highest order value</StatDescription>
            </StatCard>
            <StatCard color="#06B6D4">
              <StatValue>{stats.overallAvgServiceTime > 0 ? `${stats.overallAvgServiceTime} min` : 'N/A'}</StatValue>
              <StatLabel>Avg Service Time</StatLabel>
              <StatDescription>Preparation time</StatDescription>
            </StatCard>
            <StatCard color="#F97316">
              <StatValue>{stats.overallGrowth > 0 ? '+' : ''}{stats.overallGrowth}%</StatValue>
              <StatLabel>Growth</StatLabel>
              <StatDescription>vs previous period</StatDescription>
            </StatCard>
            <StatCard color="#14B8A6">
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>Total Stores</StatLabel>
              <StatDescription>Across {filteredBrands.length} brands</StatDescription>
            </StatCard>
          </StatsGrid>

          {loading ? (
            <EmptyState>
              <p>Loading brand performance data...</p>
            </EmptyState>
          ) : sortedBrands.length === 0 ? (
            <EmptyState>
              <h3>No Data Available</h3>
              <p>No performance data found for the selected period.</p>
            </EmptyState>
          ) : (
            <>
              <PerformanceGrid>
                {sortedBrands.map((brand, index) => (
                  <BrandCard key={brand.id} color={BRAND_COLORS[index % BRAND_COLORS.length]}>
                    <BrandHeader>
                      <BrandName>{brand.name}</BrandName>
                      <BrandCategory>{brand.code}</BrandCategory>
                    </BrandHeader>
                    <MetricRow>
                      <MetricLabel>Revenue</MetricLabel>
                      <MetricValue>
                        {formatCurrency(brand.sales, brand.currency)}
                        {brand.growth !== 0 && (
                          <GrowthBadge positive={brand.growth > 0}>
                            {brand.growth > 0 ? '+' : ''}{brand.growth}%
                          </GrowthBadge>
                        )}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Orders</MetricLabel>
                      <MetricValue>{brand.completedOrders.toLocaleString()} completed</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Customers</MetricLabel>
                      <MetricValue>{brand.uniqueCustomers.toLocaleString()} unique</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Avg Order</MetricLabel>
                      <MetricValue>
                        {brand.avgOrder > 0 ? formatCurrency(brand.avgOrder, brand.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Max Order</MetricLabel>
                      <MetricValue>
                        {brand.maxOrder > 0 ? formatCurrency(brand.maxOrder, brand.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Avg Service Time</MetricLabel>
                      <MetricValue>
                        {brand.avgServiceTime > 0 ? `${brand.avgServiceTime} min` : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Stores</MetricLabel>
                      <MetricValue>{brand.stores} locations</MetricValue>
                    </MetricRow>
                  </BrandCard>
                ))}
              </PerformanceGrid>

              <RankingSection>
                <SectionTitle>Performance Ranking ({getPeriodLabel()})</SectionTitle>
                {sortedBrands.slice(0, 5).map((brand, index) => (
                  <RankingItem key={brand.id}>
                    <RankNumber rank={index + 1}>{index + 1}</RankNumber>
                    <RankInfo>
                      <RankBrand>{brand.name}</RankBrand>
                      <RankStats>
                        <RankStat>Revenue: {formatCurrency(brand.sales, brand.currency)}</RankStat>
                        <RankStat>Orders: {brand.completedOrders}</RankStat>
                        <RankStat>Customers: {brand.uniqueCustomers}</RankStat>
                        <RankStat>Avg: {formatCurrency(brand.avgOrder, brand.currency)}</RankStat>
                        <RankStat>Growth: {brand.growth > 0 ? '+' : ''}{brand.growth}%</RankStat>
                      </RankStats>
                    </RankInfo>
                  </RankingItem>
                ))}
              </RankingSection>
            </>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandPerformance;
