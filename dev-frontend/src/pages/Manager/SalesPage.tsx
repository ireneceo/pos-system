import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI/StatCard';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useTranslation } from 'react-i18next';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import { getAuthHeaders } from '../../utils/auth';
// Chart libraries temporarily removed - will be added when needed

interface RestaurantSales {
  id: string;
  name: string;
  location: string;
  todaySales: number;
  yesterdaySales: number;
  weekSales: number;
  monthSales: number;
  todayOrders: number;
  averageOrderValue: number;
  topItems: Array<{ name: string; quantity: number; revenue: number }>;
  hourlyData: number[];
}

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
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

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;


const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #5A51E6;
  }
`;



const Content = styled.div`
  padding: 32px;
`;



const ChartsGrid = styled.div`
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
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

// Sales Table - HTML table 기반 (정렬 규칙 통일)
const SalesTableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`;

const SalesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const SalesTableHead = styled.thead`
  background: #F1F4F8;
  border-bottom: 1px solid #C7CED6;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #4B5563;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  th:nth-child(2), th:nth-child(3), th:nth-child(4), th:nth-child(5), th:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  th:nth-child(7) { text-align: right; } /* Action */
`;

const SalesTableRow = styled.tr`
  border-bottom: 1px solid #F1F4F8;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F8;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #C7CED6;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SalesTableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  &:nth-child(7) { text-align: right; } /* Action */

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F1F4F8;

      &:before {
        display: none;
      }
    }
  }
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestaurantName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const RestaurantLocation = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const ValueCell = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const ChangeCell = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 500;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  color: #4B5563;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`;

const ManagerSalesPage: React.FC = () => {
  const { t } = useTranslation('admin');
  // const { } = useAuth();
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [dateRangeValues, setDateRangeValues] = useState(() => calculatePeriodDateRange('today'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [restaurantSales, setRestaurantSales] = useState<RestaurantSales[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRangeValues(calculatePeriodDateRange(period));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRangeValues({ start, end });
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const restaurantsResponse = await fetch('/api/restaurants', { headers: getAuthHeaders() });
        if (!restaurantsResponse.ok) {
          console.error('Failed to fetch restaurants');
          return;
        }

        const restaurantsData = await restaurantsResponse.json();
        const restaurants = restaurantsData.data || restaurantsData;

        // For now, set empty data structure - would need orders API to calculate real sales
        const salesData: RestaurantSales[] = restaurants.map((restaurant: any) => ({
          id: restaurant.id.toString(),
          name: restaurant.name,
          location: restaurant.address || 'Unknown',
          todaySales: 0, // Would calculate from orders API
          yesterdaySales: 0, // Would calculate from orders API
          weekSales: 0, // Would calculate from orders API
          monthSales: 0, // Would calculate from orders API
          todayOrders: 0, // Would calculate from orders API
          averageOrderValue: 0, // Would calculate from orders API
          topItems: [], // Would calculate from orders API
          hourlyData: new Array(12).fill(0) // Would calculate from orders API
        }));

        setRestaurantSales(salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  // Calculate totals
  const totals = restaurantSales.reduce((acc, restaurant) => ({
    todaySales: acc.todaySales + restaurant.todaySales,
    yesterdaySales: acc.yesterdaySales + restaurant.yesterdaySales,
    weekSales: acc.weekSales + restaurant.weekSales,
    monthSales: acc.monthSales + restaurant.monthSales,
    todayOrders: acc.todayOrders + restaurant.todayOrders
  }), {
    todaySales: 0,
    yesterdaySales: 0,
    weekSales: 0,
    monthSales: 0,
    todayOrders: 0
  });

  const averageOrderValue = totals.todayOrders > 0 ? totals.todaySales / totals.todayOrders : 0;
  const salesChange = totals.yesterdaySales > 0 
    ? ((totals.todaySales - totals.yesterdaySales) / totals.yesterdaySales * 100)
    : 0;

  // Chart data will be implemented when chart libraries are added

  const handleExportData = () => {
    const exportData = {
      date: new Date().toISOString(),
      dateRange: dateRangeValues,
      totalSales: totals.todaySales,
      totalOrders: totals.todayOrders,
      averageOrderValue,
      restaurants: restaurantSales
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sales-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Container>
        <Header>
          <PageTitle>{t('admin:salesPage.sales')}</PageTitle>
        </Header>
        
        <Content>
          <div style={{ background: '#F9FAFB', padding: '24px 0', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <FilterSelect
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="all">{t('admin:salesPage.allRestaurants')}</option>
              {restaurantSales.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - {restaurant.location}
                </option>
              ))}
            </FilterSelect>
            
            <DatePeriodFilter
              activePeriod={activePeriod}
              dateRange={dateRangeValues}
              isCustomDateRange={isCustomDateRange}
              onPeriodChange={handlePeriodChange}
              onCalendarRangeSelect={handleCalendarRangeSelect}
              includeToday
            />
            
            <Button onClick={handleExportData} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export Report
            </Button>
          </div>
          
          <StatsGrid>
            <StatCard color="#059669">
              <StatLabel>{t('admin:salesPage.totalSales')}</StatLabel>
              <StatValue>{formatCurrency(totals.todaySales, selectedCurrency)}</StatValue>
              <StatTrend trend={salesChange > 0 ? 'up' : 'down'}>
                {salesChange > 0 ? '↑' : '↓'} {Math.abs(salesChange).toFixed(1)}% vs yesterday
              </StatTrend>
            </StatCard>
            <StatCard color="#2563EB">
              <StatLabel>{t('admin:salesPage.totalOrders')}</StatLabel>
              <StatValue>{totals.todayOrders}</StatValue>
              <StatTrend trend="up">
                ↑ 12% vs yesterday
              </StatTrend>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatLabel>{t('admin:salesPage.averageOrderValue')}</StatLabel>
              <StatValue>{formatCurrency(averageOrderValue, selectedCurrency)}</StatValue>
              <StatTrend trend="up">
                ↑ 5.3% vs yesterday
              </StatTrend>
            </StatCard>
            <StatCard color="#DC2626">
              <StatLabel>{t('admin:salesPage.activeRestaurants')}</StatLabel>
              <StatValue>{restaurantSales.length}</StatValue>
              <StatTrend trend="up">
                All operational
              </StatTrend>
            </StatCard>
          </StatsGrid>

          <ChartsGrid>
            <ChartCard>
              <ChartTitle>{t('admin:salesPage.salesTrendAllRestaurants')}</ChartTitle>
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4B5563',
                fontSize: '14px'
              }}>
                Chart visualization will be implemented
              </div>
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>{t('admin:salesPage.salesDistribution')}</ChartTitle>
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4B5563',
                fontSize: '14px'
              }}>
                🍰 Distribution chart will be implemented
              </div>
            </ChartCard>
          </ChartsGrid>

          <ChartCard>
            <ChartTitle>{t('admin:salesPage.dailyComparison')}</ChartTitle>
            <div style={{
              height: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4B5563',
              fontSize: '14px'
            }}>
              Bar chart comparison will be implemented
            </div>
          </ChartCard>

          <SalesTableContainer style={{ marginTop: '24px' }}>
            <SalesTable>
              <SalesTableHead>
                <tr>
                  <th>{t('admin:salesPage.restaurant')}</th>
                  <th>{t('admin:salesPage.todaysSales')}</th>
                  <th>{t('admin:salesPage.orders')}</th>
                  <th>{t('admin:salesPage.avgOrder')}</th>
                  <th>{t('admin:salesPage.weekTotal')}</th>
                  <th>{t('admin:salesPage.monthTotal')}</th>
                  <th>{t('admin:salesPage.action')}</th>
                </tr>
              </SalesTableHead>
              <tbody>
                {restaurantSales.map(restaurant => {
                  const change = restaurant.yesterdaySales > 0
                    ? ((restaurant.todaySales - restaurant.yesterdaySales) / restaurant.yesterdaySales * 100)
                    : 0;

                  return (
                    <SalesTableRow key={restaurant.id}>
                      <SalesTableCell data-label="Restaurant">
                        <RestaurantInfo>
                          <RestaurantName>{getRestaurantDisplayName(restaurant)}</RestaurantName>
                          <RestaurantLocation>{restaurant.location}</RestaurantLocation>
                        </RestaurantInfo>
                      </SalesTableCell>
                      <SalesTableCell data-label="Today's Sales">
                        <ValueCell>
                          {formatCurrency(restaurant.todaySales, selectedCurrency)}
                          <ChangeCell positive={change > 0}>
                            {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                          </ChangeCell>
                        </ValueCell>
                      </SalesTableCell>
                      <SalesTableCell data-label="Orders">
                        <ValueCell>{restaurant.todayOrders}</ValueCell>
                      </SalesTableCell>
                      <SalesTableCell data-label="Avg Order">
                        <ValueCell>{formatCurrency(restaurant.averageOrderValue, selectedCurrency)}</ValueCell>
                      </SalesTableCell>
                      <SalesTableCell data-label="Week Total">
                        <ValueCell>{formatCurrency(restaurant.weekSales, selectedCurrency)}</ValueCell>
                      </SalesTableCell>
                      <SalesTableCell data-label="Month Total">
                        <ValueCell>{formatCurrency(restaurant.monthSales, selectedCurrency)}</ValueCell>
                      </SalesTableCell>
                      <SalesTableCell data-label="">
                        <ActionButton>{t('admin:salesPage.viewDetails')}</ActionButton>
                      </SalesTableCell>
                    </SalesTableRow>
                  );
                })}
              </tbody>
            </SalesTable>
          </SalesTableContainer>
        </Content>
      </Container>
    </>
  );
};

export default ManagerSalesPage;