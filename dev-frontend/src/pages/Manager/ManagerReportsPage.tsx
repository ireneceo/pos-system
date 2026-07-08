import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { FilterBar, FilterSelect } from '../../components/Common/FilterComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell } from '../../components/UI/DataTable';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { getAuthHeaders } from '../../utils/auth';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useTranslation } from 'react-i18next';

interface Restaurant {
  id: string;
  name: string;
  location: string;
}

interface ReportData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topItems: Array<{ name: string; quantity: number; revenue: number }>;
  hourlyData: Array<{ hour: string; orders: number; revenue: number }>;
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

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
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




const Content = styled.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;




const ReportSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 4px;
  background: #F1F4F8;
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

const ManagerReportsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  useAuth();
  const location = useLocation();
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Check if a specific restaurant was selected via URL parameter
    const searchParams = new URLSearchParams(location.search);
    const restaurantId = searchParams.get('restaurantId') || searchParams.get('restaurant');
    if (restaurantId) {
      setSelectedRestaurant(restaurantId);
    }
  }, [location]);

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setDateRange(calculatePeriodDateRange(period));
    setIsCustomDateRange(false);
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  const [reportData, setReportData] = useState<ReportData>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topItems: [],
    hourlyData: []
  });
  const [loading, setLoading] = useState(true);

  // Real aggregation from the manager's restaurants (revenue = completed + served),
  // filtered by the selected restaurant + date range. No mock/random data.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams({
          restaurantId: selectedRestaurant,
          start: dateRange.start,
          end: dateRange.end
        });
        const res = await fetch(`/api/manager/reports-summary?${qs.toString()}`, { headers: getAuthHeaders() });
        const json = await res.json();
        if (cancelled) return;
        const d = (json && json.data) || {};
        if (Array.isArray(d.restaurants)) setRestaurants(d.restaurants);
        setReportData({
          totalRevenue: d.totalRevenue || 0,
          totalOrders: d.totalOrders || 0,
          averageOrderValue: d.averageOrderValue || 0,
          topItems: Array.isArray(d.topItems) ? d.topItems : [],
          hourlyData: Array.isArray(d.hourlyData) ? d.hourlyData : []
        });
      } catch (e) {
        if (!cancelled) {
          console.error('Error loading manager reports:', e);
          setReportData({ totalRevenue: 0, totalOrders: 0, averageOrderValue: 0, topItems: [], hourlyData: [] });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [selectedRestaurant, dateRange.start, dateRange.end]);


  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <PageTitle>
              {selectedRestaurant === 'all' 
                ? 'Reports Dashboard' 
                : `${(() => { const r = restaurants.find(r => r.id === selectedRestaurant); return r ? getRestaurantDisplayName(r) : 'Restaurant'; })()} Reports`
              }
            </PageTitle>
          </HeaderContent>
        </Header>
        
        <Content>
          {/* Filter Controls */}
          <FilterBar>
            <DatePeriodFilter
              activePeriod={activePeriod}
              dateRange={dateRange}
              isCustomDateRange={isCustomDateRange}
              onPeriodChange={handlePeriodChange}
              onCalendarRangeSelect={handleCalendarRangeSelect}
            />

            <FilterSelect
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="all">{t('admin:managerReportsPage.allRestaurants')}</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {getRestaurantDisplayName(restaurant)} - {restaurant.location}
                </option>
              ))}
            </FilterSelect>
          </FilterBar>

          {/* Sales Summary — real aggregation (revenue = completed + served) */}
          <StatsGrid>
            <StatCard>
              <StatValue>{formatCurrency(reportData.totalRevenue, selectedCurrency)}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.totalRevenue')}</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{reportData.totalOrders}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.totalOrders')}</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{formatCurrency(reportData.averageOrderValue, selectedCurrency)}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.averageOrderValue')}</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{selectedRestaurant === 'all' ? restaurants.length : 1}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.activeRestaurants')}</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Popular Items */}
          <ReportSection>
            <SectionTitle>{t('admin:managerReportsPage.popularItems')}</SectionTitle>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.rank')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.itemName')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.quantitySold')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.revenue')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.performance')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {reportData.topItems.length === 0 && (
                  <DataTableRow>
                    <DataTableCell colSpan={5} style={{ textAlign: 'center', color: '#6B7280' }}>
                      {loading ? t('admin:managerReportsPage.loading', 'Loading…') : t('admin:managerReportsPage.noData', 'No sales in this period')}
                    </DataTableCell>
                  </DataTableRow>
                )}
                {reportData.topItems.map((item, index) => {
                  const maxQuantity = reportData.topItems[0]?.quantity || 1;
                  return (
                    <DataTableRow key={index}>
                      <DataTableCell data-label={t('admin:managerReportsPage.rank')} style={{ fontWeight: '600' }}>
                        #{index + 1}
                      </DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.itemName')} style={{ fontWeight: '600' }}>{item.name}</DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.quantitySold')}>{item.quantity}</DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.revenue')}>{formatCurrency(item.revenue, selectedCurrency)}</DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.performance')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressBar percentage={(item.quantity / maxQuantity) * 100} />
                          <span style={{ fontSize: '12px', color: '#4B5563', minWidth: '40px' }}>
                            {Math.round((item.quantity / maxQuantity) * 100)}%
                          </span>
                        </div>
                      </DataTableCell>
                    </DataTableRow>
                  );
                })}
              </tbody>
            </DataTable>
          </ReportSection>

          {/* Hourly Analysis — real orders/revenue by hour-of-day */}
          <ReportSection>
            <SectionTitle>{t('admin:managerReportsPage.hourlyAnalysis')}</SectionTitle>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.timeSlot')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.orders')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.revenue')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.avgOrderValue')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {reportData.hourlyData.length > 0 ? reportData.hourlyData.map((hourData, index) => (
                  <DataTableRow key={index}>
                    <DataTableCell data-label={t('admin:managerReportsPage.timeSlot')} style={{ fontWeight: '600' }}>{hourData.hour}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.orders')}>{hourData.orders}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.revenue')}>{formatCurrency(hourData.revenue, selectedCurrency)}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.avgOrderValue')}>{formatCurrency(hourData.orders > 0 ? hourData.revenue / hourData.orders : 0, selectedCurrency)}</DataTableCell>
                  </DataTableRow>
                )) : (
                  <DataTableRow>
                    <DataTableCell colSpan={4} style={{ textAlign: 'center', color: '#6B7280' }}>
                      {loading ? t('admin:managerReportsPage.loading', 'Loading…') : t('admin:managerReportsPage.noData', 'No sales in this period')}
                    </DataTableCell>
                  </DataTableRow>
                )}
              </tbody>
            </DataTable>
          </ReportSection>
        </Content>
      </Container>
    </>
  );
};

export default ManagerReportsPage;