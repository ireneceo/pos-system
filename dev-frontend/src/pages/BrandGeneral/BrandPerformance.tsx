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

// Filter styles
const FilterControls = styled.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 0;
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

const BrandBadge = styled.span`
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

interface Restaurant {
  id: number;
  name: string;
  brandId: number;
  brandName: string;
  brandCode: string;
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
  preparation_time?: number;
  completed_at?: string;
}

interface RestaurantPerformanceData {
  id: number;
  name: string;
  brandId: number;
  brandName: string;
  brandCode: string;
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

type PeriodType = 'today' | 'week' | 'month' | 'year' | 'all';

const CARD_COLORS = ['#635BFF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch brands and restaurants data
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch orders when date range or restaurants change
  useEffect(() => {
    if (restaurants.length > 0) {
      fetchOrdersData();
    }
  }, [restaurants, dateRange.start, dateRange.end]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      // Fetch brands and restaurants in parallel
      const [brandsResponse, restaurantsResponse] = await Promise.all([
        fetch('/api/brands', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/restaurants', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      // Process brands
      let brandsData: Brand[] = [];
      if (brandsResponse.ok) {
        brandsData = await brandsResponse.json();
        setBrands(brandsData);
      }

      // Create brand lookup map
      const brandMap = new Map<number, Brand>();
      brandsData.forEach(brand => {
        brandMap.set(brand.id, brand);
      });

      // Process restaurants - get ALL restaurants user has access to
      if (restaurantsResponse.ok) {
        const restaurantsData = await restaurantsResponse.json();
        const allRestaurants: Restaurant[] = restaurantsData.map((r: any) => {
          const brand = r.brand_id ? brandMap.get(r.brand_id) : null;
          return {
            id: r.id,
            name: r.name,
            brandId: r.brand_id || 0,
            brandName: brand?.name || 'No Brand',
            brandCode: brand?.code || '-',
            currency: brand?.currency || r.currency || 'RM'
          };
        });
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
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(`[Performance] Restaurant ${restaurant.id} (${restaurant.name}) orders response:`, data);
            // Handle different API response formats
            let ordersArray: Order[] = [];
            if (Array.isArray(data)) {
              ordersArray = data;
            } else if (data.data && Array.isArray(data.data)) {
              ordersArray = data.data;
            } else if (data.orders && Array.isArray(data.orders)) {
              ordersArray = data.orders;
            }
            console.log(`[Performance] Restaurant ${restaurant.id} parsed orders:`, ordersArray.length, 'orders');
            return ordersArray;
          }
          return [];
        } catch (err) {
          console.error(`[Performance] Error fetching orders for restaurant ${restaurant.id}:`, err);
          return [];
        }
      });

      const allOrdersArrays = await Promise.all(ordersPromises);
      const allOrders = allOrdersArrays.flat();
      console.log('[Performance] Total orders fetched:', allOrders.length);
      console.log('[Performance] Sample orders:', allOrders.slice(0, 3));
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
      // Filter orders for this restaurant (compare as numbers to handle type mismatch)
      const restaurantOrders = orders.filter(order => Number(order.restaurant_id) === Number(restaurant.id));

      console.log(`[Performance] Restaurant ${restaurant.id} (${restaurant.name}):`, {
        totalOrdersInState: orders.length,
        restaurantOrders: restaurantOrders.length,
        sampleOrder: restaurantOrders[0]
      });

      // Current period orders
      const currentPeriodOrders = restaurantOrders.filter(order => {
        const orderDate = new Date(order.order_date || order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });

      console.log(`[Performance] Restaurant ${restaurant.id} date filter:`, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        currentPeriodOrders: currentPeriodOrders.length
      });

      // Previous period orders (for growth calculation)
      const previousPeriodOrders = restaurantOrders.filter(order => {
        const orderDate = new Date(order.order_date || order.createdAt);
        return orderDate >= prevStartDate && orderDate <= prevEndDate;
      });

      // Calculate metrics
      const completedOrders = currentPeriodOrders.filter(o => o.status === 'completed');
      const prevCompletedOrders = previousPeriodOrders.filter(o => o.status === 'completed');

      console.log(`[Performance] Restaurant ${restaurant.id} completed:`, {
        completedOrders: completedOrders.length,
        statuses: currentPeriodOrders.map(o => o.status).filter((v, i, a) => a.indexOf(v) === i)
      });

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

      // Average service/preparation time (in minutes)
      const ordersWithPrepTime = completedOrders.filter(o => o.preparation_time && o.preparation_time > 0);
      const avgServiceTime = ordersWithPrepTime.length > 0
        ? ordersWithPrepTime.reduce((sum, o) => sum + (o.preparation_time || 0), 0) / ordersWithPrepTime.length
        : 0;

      return {
        id: restaurant.id,
        name: restaurant.name,
        brandId: restaurant.brandId,
        brandName: restaurant.brandName,
        brandCode: restaurant.brandCode,
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

  // Filter by selected brand
  const filteredRestaurants = useMemo(() => {
    if (selectedBrandId === 'all') return performanceData;
    return performanceData.filter(r => r.brandId.toString() === selectedBrandId);
  }, [performanceData, selectedBrandId]);

  // Sort restaurants by selected metric
  const sortedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) => {
      switch (selectedMetric) {
        case 'sales': return b.sales - a.sales;
        case 'growth': return b.growth - a.growth;
        case 'orders': return b.completedOrders - a.completedOrders;
        case 'customers': return b.uniqueCustomers - a.uniqueCustomers;
        default: return b.sales - a.sales;
      }
    });
  }, [filteredRestaurants, selectedMetric]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalSales = filteredRestaurants.reduce((sum, r) => sum + r.sales, 0);
    const totalRestaurants = filteredRestaurants.length;
    const totalOrders = filteredRestaurants.reduce((sum, r) => sum + r.completedOrders, 0);
    const previousTotalSales = filteredRestaurants.reduce((sum, r) => sum + r.previousSales, 0);
    const totalCustomers = filteredRestaurants.reduce((sum, r) => sum + r.uniqueCustomers, 0);
    const maxOrderValue = Math.max(...filteredRestaurants.map(r => r.maxOrder), 0);

    // Calculate overall average order
    const overallAvgOrder = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Calculate overall average service time
    const restaurantsWithServiceTime = filteredRestaurants.filter(r => r.avgServiceTime > 0);
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
  }, [filteredRestaurants]);

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
            <Title>Performance</Title>
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
                <option value="customers">Customers</option>
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
              <StatValue>{stats.totalRestaurants}</StatValue>
              <StatLabel>Restaurants</StatLabel>
              <StatDescription>{selectedBrandId === 'all' ? 'All brands' : 'Selected brand'}</StatDescription>
            </StatCard>
          </StatsGrid>

          {loading ? (
            <EmptyState>
              <p>Loading performance data...</p>
            </EmptyState>
          ) : sortedRestaurants.length === 0 ? (
            <EmptyState>
              <h3>No Data Available</h3>
              <p>No performance data found for the selected period.</p>
            </EmptyState>
          ) : (
            <>
              <PerformanceGrid>
                {sortedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id}>
                    <RestaurantHeader>
                      <RestaurantName>{restaurant.name}</RestaurantName>
                      <BrandBadge>{restaurant.brandCode}</BrandBadge>
                    </RestaurantHeader>
                    <MetricRow>
                      <MetricLabel>Revenue</MetricLabel>
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
                      <MetricLabel>Orders</MetricLabel>
                      <MetricValue>{restaurant.completedOrders.toLocaleString()} completed</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Customers</MetricLabel>
                      <MetricValue>{restaurant.uniqueCustomers.toLocaleString()} unique</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Avg Order</MetricLabel>
                      <MetricValue>
                        {restaurant.avgOrder > 0 ? formatCurrency(restaurant.avgOrder, restaurant.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Max Order</MetricLabel>
                      <MetricValue>
                        {restaurant.maxOrder > 0 ? formatCurrency(restaurant.maxOrder, restaurant.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Avg Service Time</MetricLabel>
                      <MetricValue>
                        {restaurant.avgServiceTime > 0 ? `${restaurant.avgServiceTime} min` : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                  </RestaurantCard>
                ))}
              </PerformanceGrid>

              <RankingSection>
                <SectionTitle>Restaurant Ranking ({getPeriodLabel()})</SectionTitle>
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
    </MainLayout>
  );
};

export default BrandPerformance;
