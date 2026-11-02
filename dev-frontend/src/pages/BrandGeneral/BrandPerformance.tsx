import React, { useState, useEffect, useMemo } from 'react';
import { computeRestaurantMetrics, summarize, RestaurantPerformanceData } from '../../utils/brandPerformanceMath';
import { fetchWindow, previousPeriod, restaurantTimeZone, DEFAULT_TZ } from '../../utils/orderLocalTime';
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
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency as formatCurrencyUtil } from '../../utils/currency';
import { useTranslation } from 'react-i18next';


import { getAuthToken } from '../../utils/auth';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
const FilterControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

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
  border: 1px solid #C7CED6;
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
    border-color: #6B7280;
  }
`;

const DropdownMenu = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #C7CED6;
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
    background: #F1F4F8;
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
  color: #4B5563;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #4B5563;
  }
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const SortLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-right: 4px;
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
  border: 1px solid #C7CED6;
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
  color: #4B5563;
  background: #F1F4F8;
  padding: 4px 8px;
  border-radius: 4px;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F1F4F8;

  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  font-size: 13px;
  color: #4B5563;
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
  border: 1px solid #C7CED6;
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
  border-bottom: 1px solid #F1F4F8;

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
    return '#C7CED6';
  }};
  color: ${props => props.rank <= 3 ? 'white' : '#4B5563'};
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
  color: #4B5563;
`;

const RankStat = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
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
  branch_name?: string | null;
  brandId: number;
  brandName: string;
  brandCode: string;
  currency: string;
  timeZone: string;
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



const BrandPerformance: React.FC = () => {
  const { t } = useTranslation('brand');
  const { operationSettings } = useStore();
  const storeTimeZone = operationSettings?.timeZone;
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  // '오늘'/'어제' 는 브라우저 로컬이 아니라 매장 설정 타임존 기준이어야 한다 (CLAUDE.md 타임존 규칙).
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month', operationSettings?.timeZone || DEFAULT_TZ));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showRestaurantDropdown, setShowRestaurantDropdown] = useState(false);
  const [filteredBrandsList, setFilteredBrandsList] = useState<Brand[]>([]);
  const [filteredRestaurantsList, setFilteredRestaurantsList] = useState<Restaurant[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // «오늘» 의 기준 = 목록 첫 매장의 시간대(브랜드 사람은 자기 매장이 없다). 주문별 경계는 각자 매장 시간대.
  const reportTz = restaurants[0]?.timeZone || storeTimeZone || DEFAULT_TZ;
  useEffect(() => {
    if (isCustomDateRange) return;
    const next = calculatePeriodDateRange(activePeriod, reportTz);
    setDateRange(prev => (prev.start === next.start && prev.end === next.end ? prev : next));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportTz]);

  // Fetch brands and restaurants data
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
      const token = getAuthToken();

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
            id: Number(r.id),
            name: r.name,
            branch_name: r.branch_name || null,
            timeZone: restaurantTimeZone(r),
            brandId: r.brand_id || 0,
            brandName: brand?.name || 'No Brand',
            brandCode: brand?.code || '-',
            currency: brand?.currency || r.currency || 'MYR'
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
      const token = getAuthToken();

      if (restaurants.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch orders spanning the PREVIOUS period start → current end so growth can
      // be computed, and limit=0 (no cap) so revenue isn't truncated at 50 rows.
      //   서버는 날짜를 UTC 자정으로 자르므로(🔒 orders-crud) 앞뒤 하루 넓혀 받고, 매장 시간대로 화면에서 자른다.
      const win = fetchWindow(getPreviousPeriodRange.start, dateRange.end);
      const ordersPromises = restaurants.map(async (restaurant) => {
        try {
          const response = await fetch(
            `/api/orders?restaurant_id=${restaurant.id}&start_date=${win.start_date}&end_date=${win.end_date}&limit=0`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          if (response.ok) {
            const data = await response.json();
            // Handle different API response formats
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
          console.error(`[Performance] Error fetching orders for restaurant ${restaurant.id}:`, err);
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
    setDateRange(calculatePeriodDateRange(period, reportTz));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  // Brand search handler
  const handleBrandSearch = (query: string) => {
    setBrandSearchQuery(query);
    if (query.length === 0) {
      setFilteredBrandsList(brands.slice(0, 10));
    } else {
      setFilteredBrandsList(brands.filter(b => b.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10));
    }
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrandId(brand.id.toString());
    setBrandSearchQuery(brand.name);
    setShowBrandDropdown(false);
    // Reset restaurant filter when brand changes
    setSelectedRestaurantId('all');
    setRestaurantSearchQuery('');
  };

  const handleBrandClear = () => {
    setSelectedBrandId('all');
    setBrandSearchQuery('');
    setSelectedRestaurantId('all');
    setRestaurantSearchQuery('');
  };

  // Restaurant search handler
  const handleRestaurantSearch = (query: string) => {
    setRestaurantSearchQuery(query);
    let available = restaurants;
    if (selectedBrandId !== 'all') {
      available = restaurants.filter(r => r.brandId.toString() === selectedBrandId);
    }
    if (query.length === 0) {
      setFilteredRestaurantsList(available.slice(0, 10));
    } else {
      setFilteredRestaurantsList(available.filter(r => r.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10));
    }
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurantId(restaurant.id.toString());
    setRestaurantSearchQuery(restaurant.name);
    setShowRestaurantDropdown(false);
  };

  const handleRestaurantClear = () => {
    setSelectedRestaurantId('all');
    setRestaurantSearchQuery('');
  };

  // 이전 기간(같은 길이 바로 앞) — 날짜 키 산술만, 브라우저 시간대 무관
  const getPreviousPeriodRange = useMemo(() => previousPeriod(dateRange.start, dateRange.end), [dateRange.start, dateRange.end]);

  // 매장별 지표 — 계산은 utils/brandPerformanceMath 하나(주문 매장 시간대 · createdAt · isRevenueOrder)
  const performanceData: RestaurantPerformanceData[] = useMemo(
    () => (restaurants.length === 0 ? [] : computeRestaurantMetrics(restaurants, orders as any, dateRange)),
    [restaurants, orders, dateRange]
  );

  // Filter by selected brand and restaurant
  const filteredRestaurants = useMemo(() => {
    let result = performanceData;
    if (selectedBrandId !== 'all') {
      result = result.filter(r => r.brandId.toString() === selectedBrandId);
    }
    if (selectedRestaurantId !== 'all') {
      result = result.filter(r => r.id.toString() === selectedRestaurantId);
    }
    return result;
  }, [performanceData, selectedBrandId, selectedRestaurantId]);

  // Sort restaurants by selected metric
  const sortedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) => {
      switch (selectedMetric) {
        case 'sales': return b.sales - a.sales;
        case 'growth': return (b.growth ?? -Infinity) - (a.growth ?? -Infinity);
        case 'orders': return b.completedOrders - a.completedOrders;
        case 'customers': return b.uniqueCustomers - a.uniqueCustomers;
        default: return b.sales - a.sales;
      }
    });
  }, [filteredRestaurants, selectedMetric]);

  // 총계 — Customers 는 합집합 · 이행시간은 주문 가중 · Growth 는 이전 0 이면 null
  const stats = useMemo(() => summarize(filteredRestaurants), [filteredRestaurants]);

  const formatCurrency = (amount: number, currency?: string) => {
    const currencyCode = currency || selectedCurrency;
    return formatCurrencyUtil(amount, currencyCode);
  };

  const periodLabel = isCustomDateRange
    ? `${dateRange.start} ~ ${dateRange.end}`
    : ({
        today: t('brand:brandPerformance.periodToday', 'Today'),
        yesterday: t('brand:brandPerformance.periodYesterday', 'Yesterday'),
        week: t('brand:brandPerformance.periodLast7Days', 'Last 7 days'),
        month: t('brand:brandPerformance.periodLast30Days', 'Last 30 days'),
        year: t('brand:brandPerformance.periodLast365Days', 'Last 365 days'),
        all: t('brand:brandPerformance.periodAllTime', 'All time')
      } as Record<string, string>)[activePeriod] || activePeriod;

  const handleExportReport = () => {
    const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const header = ['Restaurant', 'Brand', 'Total Orders', 'Completed/Served', 'Sales', 'Growth %', 'Avg Order', 'Max Order', 'Unique Customers', 'Avg Service (min)'];
    const rows = sortedRestaurants.map(r => [r.branch_name ? `${r.name} (${r.branch_name})` : r.name, r.brandName, r.totalOrders, r.completedOrders, r.sales, r.growth ?? '', r.avgOrder, r.maxOrder, r.uniqueCustomers, r.avgServiceTime].map(esc).join(','));
    const csv = [header.map(esc).join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-${dateRange.start}_${dateRange.end}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>{t('brand:brandPerformance.performance')}</Title>
          </div>
          <ActionSection>
            <Button variant="primary" onClick={handleExportReport}>{t('brand:brandPerformance.exportReport')}</Button>
          </ActionSection>
        </Header>

        <Content>
          {/* Brand & Restaurant Filter */}
          <FilterControlsWrapper>
            <DropdownContainer>
              <DropdownInput
                type="text"
                placeholder="All Brands"
                value={brandSearchQuery}
                onChange={(e) => handleBrandSearch(e.target.value)}
                onFocus={() => {
                  setShowBrandDropdown(true);
                  if (brandSearchQuery.length === 0) setFilteredBrandsList(brands.slice(0, 10));
                }}
                onBlur={() => setTimeout(() => setShowBrandDropdown(false), 200)}
              />
              {selectedBrandId !== 'all' && brandSearchQuery && (
                <ClearButton onClick={handleBrandClear}>×</ClearButton>
              )}
              <DropdownMenu show={showBrandDropdown}>
                <DropdownItem onClick={() => { setSelectedBrandId('all'); setBrandSearchQuery(''); setShowBrandDropdown(false); setSelectedRestaurantId('all'); setRestaurantSearchQuery(''); }}>
                  <ItemName>{t('brand:brandPerformance.allBrands')}</ItemName>
                  <ItemDetails>{t('brand:brandPerformance.showAllBrandData')}</ItemDetails>
                </DropdownItem>
                {filteredBrandsList.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand)}>
                    <ItemName>{brand.name}</ItemName>
                    <ItemDetails>{brand.code} {brand.currency ? `• ${brand.currency}` : ''}</ItemDetails>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownContainer>

            <DropdownContainer>
              <DropdownInput
                type="text"
                placeholder="All Restaurants"
                value={restaurantSearchQuery}
                onChange={(e) => handleRestaurantSearch(e.target.value)}
                onFocus={() => {
                  setShowRestaurantDropdown(true);
                  let available = restaurants;
                  if (selectedBrandId !== 'all') {
                    available = restaurants.filter(r => r.brandId.toString() === selectedBrandId);
                  }
                  setFilteredRestaurantsList(available.slice(0, 10));
                }}
                onBlur={() => setTimeout(() => setShowRestaurantDropdown(false), 200)}
              />
              {selectedRestaurantId !== 'all' && restaurantSearchQuery && (
                <ClearButton onClick={handleRestaurantClear}>×</ClearButton>
              )}
              <DropdownMenu show={showRestaurantDropdown}>
                <DropdownItem onClick={() => { setSelectedRestaurantId('all'); setRestaurantSearchQuery(''); setShowRestaurantDropdown(false); }}>
                  <ItemName>{t('brand:brandPerformance.allRestaurants')}</ItemName>
                  <ItemDetails>{t('brand:brandPerformance.showAllRestaurantData')}</ItemDetails>
                </DropdownItem>
                {filteredRestaurantsList.map(restaurant => (
                  <DropdownItem key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant)}>
                    <ItemName>{getRestaurantDisplayName(restaurant)}</ItemName>
                    <ItemDetails>{restaurant.brandName || 'Independent'}</ItemDetails>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownContainer>
          </FilterControlsWrapper>

          {/* Date Filter + Sort by */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              <DatePeriodFilter
                activePeriod={activePeriod}
                dateRange={dateRange}
                isCustomDateRange={isCustomDateRange}
                onPeriodChange={handlePeriodChange}
                onCalendarRangeSelect={handleCalendarRangeSelect}
                includeToday
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <SortLabel>Sort by:</SortLabel>
              <SortSelect
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="sales">{t('brand:brandPerformance.revenue')}</option>
                <option value="growth">{t('brand:brandPerformance.growth')}</option>
                <option value="orders">{t('brand:brandPerformance.orders')}</option>
                <option value="customers">{t('brand:brandPerformance.customers')}</option>
              </SortSelect>
            </div>
          </div>

          {/* Stats Grid - Row 1 */}
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{formatCurrency(stats.totalSales)}</StatValue>
              <StatLabel>{t('brand:brandPerformance.totalRevenue')}</StatLabel>
              <StatDescription>{periodLabel}</StatDescription>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.totalOrders.toLocaleString()}</StatValue>
              <StatLabel>{t('brand:brandPerformance.totalOrders')}</StatLabel>
              <StatDescription>{t('brand:brandPerformance.completedOrders')}</StatDescription>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.totalCustomers.toLocaleString()}</StatValue>
              <StatLabel>{t('brand:brandPerformance.customers')}</StatLabel>
              <StatDescription>{t('brand:brandPerformance.uniqueCustomers')}</StatDescription>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{formatCurrency(stats.overallAvgOrder)}</StatValue>
              <StatLabel>{t('brand:brandPerformance.avgOrder')}</StatLabel>
              <StatDescription>{t('brand:brandPerformance.perOrderValue')}</StatDescription>
            </StatCard>
          </StatsGrid>

          {/* Stats Grid - Row 2 */}
          <StatsGrid style={{ marginTop: '-16px' }}>
            <StatCard color="#EC4899">
              <StatValue>{formatCurrency(stats.maxOrderValue)}</StatValue>
              <StatLabel>{t('brand:brandPerformance.maxOrder')}</StatLabel>
              <StatDescription>{t('brand:brandPerformance.highestOrderValue')}</StatDescription>
            </StatCard>
            <StatCard color="#06B6D4">
              <StatValue>{stats.overallAvgServiceTime > 0 ? `${stats.overallAvgServiceTime} min` : 'N/A'}</StatValue>
              <StatLabel>{t('brand:brandPerformance.avgFulfillmentTime')}</StatLabel>
              <StatDescription>{t('brand:brandPerformance.orderToServed')}</StatDescription>
            </StatCard>
            <StatCard color="#F97316">
              <StatValue>{stats.overallGrowth === null ? '—' : `${stats.overallGrowth > 0 ? '+' : ''}${stats.overallGrowth}%`}</StatValue>
              <StatLabel>{t('brand:brandPerformance.growth')}</StatLabel>
              <StatDescription>{stats.overallGrowth === null ? t('brand:brandPerformance.noPreviousData', 'No previous-period sales') : t('brand:brandPerformance.vsPreviousPeriod', 'vs previous period')}</StatDescription>
            </StatCard>
            <StatCard color="#14B8A6">
              <StatValue>{stats.totalRestaurants}</StatValue>
              <StatLabel>{t('brand:brandPerformance.restaurants')}</StatLabel>
              <StatDescription>{selectedBrandId === 'all' ? 'All brands' : 'Selected brand'}</StatDescription>
            </StatCard>
          </StatsGrid>

          {loading && sortedRestaurants.length === 0 ? (
            <EmptyState>
              <p>{t('brand:brandPerformance.loadingPerformanceData')}</p>
            </EmptyState>
          ) : sortedRestaurants.length === 0 ? (
            <EmptyState>
              <h3>{t('brand:brandPerformance.noDataAvailable')}</h3>
              <p>{t('brand:brandPerformance.noPerformanceDataFoundForTheSelectedPeriod')}</p>
            </EmptyState>
          ) : (
            <>
              <PerformanceGrid>
                {sortedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id}>
                    <RestaurantHeader>
                      <RestaurantName>{restaurant.name}{restaurant.branch_name && <span style={{ fontSize: '12px', fontWeight: 500, color: '#4B5563', marginLeft: '6px' }}>({restaurant.branch_name})</span>}</RestaurantName>
                      <BrandBadge>{restaurant.brandCode}</BrandBadge>
                    </RestaurantHeader>
                    <MetricRow>
                      <MetricLabel>{t('brand:brandPerformance.revenue')}</MetricLabel>
                      <MetricValue>
                        {formatCurrency(restaurant.sales, restaurant.currency)}
                        {restaurant.growth !== null && restaurant.growth !== 0 && (
                          <GrowthBadge positive={restaurant.growth > 0}>
                            {restaurant.growth > 0 ? '+' : ''}{restaurant.growth}%
                          </GrowthBadge>
                        )}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('brand:brandPerformance.orders')}</MetricLabel>
                      <MetricValue>{restaurant.completedOrders.toLocaleString()} completed</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('brand:brandPerformance.customers')}</MetricLabel>
                      <MetricValue>{restaurant.uniqueCustomers.toLocaleString()} unique</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('brand:brandPerformance.avgOrder')}</MetricLabel>
                      <MetricValue>
                        {restaurant.avgOrder > 0 ? formatCurrency(restaurant.avgOrder, restaurant.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('brand:brandPerformance.maxOrder')}</MetricLabel>
                      <MetricValue>
                        {restaurant.maxOrder > 0 ? formatCurrency(restaurant.maxOrder, restaurant.currency) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>{t('brand:brandPerformance.avgFulfillment')}</MetricLabel>
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
                      <RankRestaurant>{restaurant.name}{restaurant.branch_name ? ` (${restaurant.branch_name})` : ''}</RankRestaurant>
                      <RankStats>
                        <RankStat>Revenue: {formatCurrency(restaurant.sales, restaurant.currency)}</RankStat>
                        <RankStat>Orders: {restaurant.completedOrders}</RankStat>
                        <RankStat>Customers: {restaurant.uniqueCustomers}</RankStat>
                        <RankStat>Growth: {restaurant.growth === null ? '—' : `${restaurant.growth > 0 ? '+' : ''}${restaurant.growth}%`}</RankStat>
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

export default BrandPerformance;
