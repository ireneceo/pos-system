import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { FilterBar, FilterSelect } from '../../components/Common/FilterComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell } from '../../components/UI/DataTable';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
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
  customerCount: number;
  staffPerformance: Array<{ name: string; orders: number; efficiency: number }>;
  hourlyData: Array<{ hour: string; orders: number; revenue: number }>;
  customerAnalysis: {
    newCustomers: number;
    returningCustomers: number;
    satisfaction: number;
    totalCustomers: number;
    vipCustomers: number;
    averageOrdersPerCustomer: number;
    customerRetentionRate: number;
  };
}

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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




const StatTrend = styled.div<{ trend?: 'up' | 'down' }>`
  font-size: 12px;
  color: ${props => props.trend === 'up' ? '#059669' : props.trend === 'down' ? '#DC2626' : '#6B7280'};
  font-weight: 500;
`;

const ReportSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: #F8FAFC;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
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

  const [restaurants] = useState<Restaurant[]>([
    { id: 'rest-001', name: 'Nasi Lemak Corner', location: 'KLCC' },
    { id: 'rest-002', name: 'Char Kuey Teow King', location: 'Pavilion KL' },
    { id: 'rest-003', name: 'Roti Canai House', location: 'Mid Valley' },
    { id: 'rest-004', name: 'Satay House', location: 'Level 1, Unit 108' },
    { id: 'rest-005', name: 'Japanese Sushi Bar', location: 'Level 2, Unit 208' },
    { id: 'rest-006', name: 'Laksa Paradise', location: 'Level 2, Unit 210' }
  ]);

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
    totalRevenue: 13130,
    totalOrders: 222,
    averageOrderValue: 59.14,
    topItems: [
      { name: 'Nasi Lemak Special', quantity: 45, revenue: 450 },
      { name: 'CKT Special', quantity: 38, revenue: 570 },
      { name: 'Roti Canai', quantity: 85, revenue: 255 },
      { name: 'Rendang Set', quantity: 32, revenue: 480 },
      { name: 'Penang CKT', quantity: 29, revenue: 435 }
    ],
    customerCount: 856,
    staffPerformance: [
      { name: 'Ahmad Rahman', orders: 45, efficiency: 92 },
      { name: 'Siti Nurhaliza', orders: 38, efficiency: 88 },
      { name: 'Raj Kumar', orders: 42, efficiency: 90 },
      { name: 'Li Wei', orders: 35, efficiency: 85 },
      { name: 'Maria Santos', orders: 40, efficiency: 87 }
    ],
    hourlyData: [
      { hour: '11AM', orders: 25, revenue: 680 },
      { hour: '12PM', orders: 45, revenue: 1280 },
      { hour: '1PM', orders: 38, revenue: 940 },
      { hour: '2PM', orders: 22, revenue: 580 },
      { hour: '3PM', orders: 18, revenue: 420 },
      { hour: '4PM', orders: 15, revenue: 380 },
      { hour: '5PM', orders: 25, revenue: 650 },
      { hour: '6PM', orders: 42, revenue: 1120 },
      { hour: '7PM', orders: 35, revenue: 890 },
      { hour: '8PM', orders: 20, revenue: 520 }
    ],
    customerAnalysis: {
      newCustomers: 284,
      returningCustomers: 572,
      satisfaction: 4.7,
      totalCustomers: 856,
      vipCustomers: 128,
      averageOrdersPerCustomer: 4.2,
      customerRetentionRate: 78.5
    }
  });

  useEffect(() => {
    // Simulate data loading based on selected restaurant and date range
    const multiplier = selectedRestaurant === 'all' ? 1 : 0.33;
    const baseSales = 13130;
    const baseOrders = 222;

    setReportData(prev => ({
      ...prev,
      totalRevenue: Math.round(baseSales * multiplier * (0.8 + Math.random() * 0.4)),
      totalOrders: Math.round(baseOrders * multiplier * (0.8 + Math.random() * 0.4))
    }));
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

          {/* Sales Summary */}
          <StatsGrid>
            <StatCard>
              <StatValue>{formatCurrency(reportData.totalRevenue, selectedCurrency)}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.totalRevenue')}</StatLabel>
              <StatTrend trend="up">+18% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{reportData.totalOrders}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.totalOrders')}</StatLabel>
              <StatTrend trend="up">+12% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{formatCurrency(reportData.averageOrderValue, selectedCurrency)}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.averageOrderValue')}</StatLabel>
              <StatTrend trend="up">+5.3% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{reportData.customerCount}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.customerCount')}</StatLabel>
              <StatTrend trend="up">+24% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{selectedRestaurant === 'all' ? restaurants.length : 1}</StatValue>
              <StatLabel>{t('admin:managerReportsPage.activeRestaurants')}</StatLabel>
              <StatTrend>{t('admin:managerReportsPage.allOperational')}</StatTrend>
            </StatCard>
          </StatsGrid>

          {/* Order Analysis */}
          <ReportSection>
            <SectionTitle>{t('admin:managerReportsPage.orderAnalysis')}</SectionTitle>
            <ReportGrid>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>{t('admin:managerReportsPage.revenueTrend')}</h4>
                <ChartPlaceholder>
                  Revenue trend chart will be displayed here
                  <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                    Line chart showing revenue over time
                  </div>
                </ChartPlaceholder>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>{t('admin:managerReportsPage.orderDistribution')}</h4>
                <ChartPlaceholder>
                  🍰 Order distribution pie chart
                  <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                    Distribution by restaurant/category
                  </div>
                </ChartPlaceholder>
              </div>
            </ReportGrid>
          </ReportSection>

          {/* Customer Analysis - Enhanced */}
          <ReportSection>
            <SectionTitle>{t('admin:managerReportsPage.customerAnalysis')}</SectionTitle>
            <StatsGrid style={{ marginBottom: '24px' }}>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.totalCustomers}</StatValue>
                <StatLabel>{t('admin:managerReportsPage.totalCustomers')}</StatLabel>
                <StatTrend trend="up">{t('admin:managerReportsPage.activeAcrossAllRestaurants')}</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.newCustomers}</StatValue>
                <StatLabel>{t('admin:managerReportsPage.newCustomers')}</StatLabel>
                <StatTrend trend="up">+15% vs last period</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.vipCustomers}</StatValue>
                <StatLabel>{t('admin:managerReportsPage.vipCustomers')}</StatLabel>
                <StatTrend trend="up">{Math.round((reportData.customerAnalysis.vipCustomers/reportData.customerAnalysis.totalCustomers)*100)}% of total</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.averageOrdersPerCustomer}</StatValue>
                <StatLabel>{t('admin:managerReportsPage.avgOrdersPerCustomer')}</StatLabel>
                <StatTrend trend="up">+0.3 vs last period</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.customerRetentionRate}%</StatValue>
                <StatLabel>{t('admin:managerReportsPage.customerRetention')}</StatLabel>
                <StatTrend trend="up">+2.1% vs last period</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.satisfaction}/5.0</StatValue>
                <StatLabel>{t('admin:managerReportsPage.satisfactionScore')}</StatLabel>
                <StatTrend trend="up">+0.2 vs last period</StatTrend>
              </StatCard>
            </StatsGrid>
            
            <ReportGrid>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>{t('admin:managerReportsPage.customerSegmentation')}</h4>
                <ChartPlaceholder>
                  Customer tier distribution
                  <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                    Bronze, Silver, Gold, VIP breakdown
                  </div>
                </ChartPlaceholder>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>{t('admin:managerReportsPage.customerGrowth')}</h4>
                <ChartPlaceholder>
                  Customer acquisition trend
                  <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                    New vs returning customers over time
                  </div>
                </ChartPlaceholder>
              </div>
            </ReportGrid>
          </ReportSection>

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
                {reportData.topItems.map((item, index) => {
                  const maxQuantity = reportData.topItems[0]?.quantity || 1;
                  return (
                    <DataTableRow key={index}>
                      <DataTableCell data-label={t('admin:managerReportsPage.rank')} style={{ fontWeight: '600' }}>
                        #{index + 1}
                        {index === 0 && ' 🥇'}
                        {index === 1 && ' 🥈'}
                        {index === 2 && ' 🥉'}
                      </DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.itemName')} style={{ fontWeight: '600' }}>{item.name}</DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.quantitySold')}>{item.quantity}</DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.revenue')}>{formatCurrency(item.revenue, selectedCurrency)}</DataTableCell>
                      <DataTableCell data-label={t('admin:managerReportsPage.performance')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressBar percentage={(item.quantity / maxQuantity) * 100} />
                          <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
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

          {/* Hourly Analysis */}
          <ReportSection>
            <SectionTitle>{t('admin:managerReportsPage.hourlyAnalysis')}</SectionTitle>
            <div style={{ marginBottom: '20px' }}>
              <ChartPlaceholder style={{ height: '250px' }}>
                Hourly orders and revenue bar chart
                <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                  Bar chart showing orders and revenue by hour
                </div>
              </ChartPlaceholder>
            </div>
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
                {reportData.hourlyData.map((hourData, index) => (
                  <DataTableRow key={index}>
                    <DataTableCell data-label={t('admin:managerReportsPage.timeSlot')} style={{ fontWeight: '600' }}>{hourData.hour}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.orders')}>{hourData.orders}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.revenue')}>{formatCurrency(hourData.revenue, selectedCurrency)}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.avgOrderValue')}>{formatCurrency(hourData.revenue / hourData.orders, selectedCurrency)}</DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          </ReportSection>

          {/* Staff Performance */}
          <ReportSection>
            <SectionTitle>{t('admin:managerReportsPage.staffPerformance')}</SectionTitle>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.staffName')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.ordersHandled')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.efficiency')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:managerReportsPage.performance')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {reportData.staffPerformance.map((staff, index) => (
                  <DataTableRow key={index}>
                    <DataTableCell data-label={t('admin:managerReportsPage.staffName')} style={{ fontWeight: '600' }}>{staff.name}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.ordersHandled')}>{staff.orders}</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.efficiency')}>{staff.efficiency}%</DataTableCell>
                    <DataTableCell data-label={t('admin:managerReportsPage.performance')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ProgressBar percentage={staff.efficiency} />
                        <span style={{ fontSize: '12px', color: '#6B7C93' }}>{staff.efficiency}%</span>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          </ReportSection>
        </Content>
      </Container>
    </>
  );
};

export default ManagerReportsPage;