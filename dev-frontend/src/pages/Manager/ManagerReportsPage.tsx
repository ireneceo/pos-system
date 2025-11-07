import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';

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
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;


const DateRangeSelector = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background: #5A51E6;
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

const ManagerReportsPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [dateRange, setDateRange] = useState('today');
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
    const restaurantId = searchParams.get('restaurant');
    if (restaurantId) {
      setSelectedRestaurant(restaurantId);
    }
  }, [location]);

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
  }, [selectedRestaurant, dateRange]);

  const handleExportReport = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      restaurant: selectedRestaurant === 'all' ? 'All Restaurants' : restaurants.find(r => r.id === selectedRestaurant)?.name,
      dateRange: dateRange,
      manager: user?.name,
      summary: {
        totalRevenue: reportData.totalRevenue,
        totalOrders: reportData.totalOrders,
        averageOrderValue: reportData.averageOrderValue,
        customerCount: reportData.customerCount
      },
      topItems: reportData.topItems,
      staffPerformance: reportData.staffPerformance,
      hourlyAnalysis: reportData.hourlyData,
      customerAnalysis: reportData.customerAnalysis
    };

    const csvContent = generateCSV(exportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `manager-report-${selectedRestaurant}-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };


  const generateCSV = (data: any) => {
    let csv = `Manager Reports - ${data.restaurant}\n`;
    csv += `Generated: ${new Date().toLocaleString()}\n`;
    csv += `Period: ${data.dateRange}\n`;
    csv += `Manager: ${data.manager}\n\n`;

    csv += `SALES SUMMARY\n`;
    csv += `Total Revenue,RM ${data.summary.totalRevenue}\n`;
    csv += `Total Orders,${data.summary.totalOrders}\n`;
    csv += `Average Order Value,RM ${data.summary.averageOrderValue}\n`;
    csv += `Customer Count,${data.summary.customerCount}\n\n`;

    csv += `CUSTOMER ANALYSIS\n`;
    csv += `Total Customers,${data.customerAnalysis.totalCustomers}\n`;
    csv += `New Customers,${data.customerAnalysis.newCustomers}\n`;
    csv += `Returning Customers,${data.customerAnalysis.returningCustomers}\n`;
    csv += `VIP Customers,${data.customerAnalysis.vipCustomers}\n`;
    csv += `Average Orders per Customer,${data.customerAnalysis.averageOrdersPerCustomer}\n`;
    csv += `Customer Retention Rate,${data.customerAnalysis.customerRetentionRate}%\n`;
    csv += `Satisfaction Score,${data.customerAnalysis.satisfaction}/5.0\n\n`;

    csv += `TOP PERFORMING ITEMS\n`;
    csv += `Item Name,Quantity,Revenue\n`;
    data.topItems.forEach((item: any) => {
      csv += `${item.name},${item.quantity},RM ${item.revenue}\n`;
    });

    csv += `\nSTAFF PERFORMANCE\n`;
    csv += `Staff Name,Orders Handled,Efficiency\n`;
    data.staffPerformance.forEach((staff: any) => {
      csv += `${staff.name},${staff.orders},${staff.efficiency}%\n`;
    });

    csv += `\nHOURLY ANALYSIS\n`;
    csv += `Hour,Orders,Revenue\n`;
    data.hourlyAnalysis.forEach((hour: any) => {
      csv += `${hour.hour},${hour.orders},RM ${hour.revenue}\n`;
    });

    return csv;
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <HeaderContent>
            <PageTitle>
              {selectedRestaurant === 'all' 
                ? 'Reports Dashboard' 
                : `${restaurants.find(r => r.id === selectedRestaurant)?.name || 'Restaurant'} Reports`
              }
            </PageTitle>
          </HeaderContent>
        </Header>
        
        <Content>
          {/* Filter Controls */}
          <FilterBar>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Date Range:</span>
              <DateButton active={dateRange === 'today'} onClick={() => setDateRange('today')}>
                Today
              </DateButton>
              <DateButton active={dateRange === 'week'} onClick={() => setDateRange('week')}>
                Week
              </DateButton>
              <DateButton active={dateRange === 'month'} onClick={() => setDateRange('month')}>
                Month
              </DateButton>
              <DateButton active={dateRange === 'custom'} onClick={() => setDateRange('custom')}>
                Year
              </DateButton>
            </div>

            <FilterSelect
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="all">All Restaurants</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - {restaurant.location}
                </option>
              ))}
            </FilterSelect>

            <DownloadButton onClick={handleExportReport}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Report
            </DownloadButton>
          </FilterBar>

          {/* Sales Summary */}
          <StatsGrid>
            <StatCard>
              <StatValue>RM {reportData.totalRevenue.toLocaleString()}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
              <StatTrend trend="up">+18% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{reportData.totalOrders}</StatValue>
              <StatLabel>Total Orders</StatLabel>
              <StatTrend trend="up">+12% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>RM {reportData.averageOrderValue.toFixed(2)}</StatValue>
              <StatLabel>Average Order Value</StatLabel>
              <StatTrend trend="up">+5.3% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{reportData.customerCount}</StatValue>
              <StatLabel>Customer Count</StatLabel>
              <StatTrend trend="up">+24% vs yesterday</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{selectedRestaurant === 'all' ? restaurants.length : 1}</StatValue>
              <StatLabel>Active Restaurants</StatLabel>
              <StatTrend>All operational</StatTrend>
            </StatCard>
          </StatsGrid>

          {/* Order Analysis */}
          <ReportSection>
            <SectionTitle>Order Analysis</SectionTitle>
            <ReportGrid>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>Revenue Trend</h4>
                <ChartPlaceholder>
                  Revenue trend chart will be displayed here
                  <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                    Line chart showing revenue over time
                  </div>
                </ChartPlaceholder>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>Order Distribution</h4>
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
            <SectionTitle>Customer Analysis</SectionTitle>
            <StatsGrid style={{ marginBottom: '24px' }}>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.totalCustomers}</StatValue>
                <StatLabel>Total Customers</StatLabel>
                <StatTrend trend="up">Active across all restaurants</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.newCustomers}</StatValue>
                <StatLabel>New Customers</StatLabel>
                <StatTrend trend="up">+15% vs last period</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.vipCustomers}</StatValue>
                <StatLabel>VIP Customers</StatLabel>
                <StatTrend trend="up">{Math.round((reportData.customerAnalysis.vipCustomers/reportData.customerAnalysis.totalCustomers)*100)}% of total</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.averageOrdersPerCustomer}</StatValue>
                <StatLabel>Avg Orders per Customer</StatLabel>
                <StatTrend trend="up">+0.3 vs last period</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.customerRetentionRate}%</StatValue>
                <StatLabel>Customer Retention</StatLabel>
                <StatTrend trend="up">+2.1% vs last period</StatTrend>
              </StatCard>
              <StatCard>
                <StatValue>{reportData.customerAnalysis.satisfaction}/5.0</StatValue>
                <StatLabel>Satisfaction Score</StatLabel>
                <StatTrend trend="up">+0.2 vs last period</StatTrend>
              </StatCard>
            </StatsGrid>
            
            <ReportGrid>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>Customer Segmentation</h4>
                <ChartPlaceholder>
                  Customer tier distribution
                  <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                    Bronze, Silver, Gold, VIP breakdown
                  </div>
                </ChartPlaceholder>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>Customer Growth</h4>
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
            <SectionTitle>Popular Items</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Item Name</TableHeader>
                  <TableHeader>Quantity Sold</TableHeader>
                  <TableHeader>Revenue</TableHeader>
                  <TableHeader>Performance</TableHeader>
                </tr>
              </thead>
              <tbody>
                {reportData.topItems.map((item, index) => {
                  const maxQuantity = reportData.topItems[0]?.quantity || 1;
                  return (
                    <tr key={index}>
                      <TableCell style={{ fontWeight: '600' }}>
                        #{index + 1}
                        {index === 0 && ' 🥇'}
                        {index === 1 && ' 🥈'}
                        {index === 2 && ' 🥉'}
                      </TableCell>
                      <TableCell style={{ fontWeight: '600' }}>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>RM {item.revenue}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressBar percentage={(item.quantity / maxQuantity) * 100} />
                          <span style={{ fontSize: '12px', color: '#6B7C93', minWidth: '40px' }}>
                            {Math.round((item.quantity / maxQuantity) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ReportSection>

          {/* Hourly Analysis */}
          <ReportSection>
            <SectionTitle>Hourly Analysis</SectionTitle>
            <div style={{ marginBottom: '20px' }}>
              <ChartPlaceholder style={{ height: '250px' }}>
                Hourly orders and revenue bar chart
                <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                  Bar chart showing orders and revenue by hour
                </div>
              </ChartPlaceholder>
            </div>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Time Slot</TableHeader>
                  <TableHeader>Orders</TableHeader>
                  <TableHeader>Revenue</TableHeader>
                  <TableHeader>Avg Order Value</TableHeader>
                </tr>
              </thead>
              <tbody>
                {reportData.hourlyData.map((hourData, index) => (
                  <tr key={index}>
                    <TableCell style={{ fontWeight: '600' }}>{hourData.hour}</TableCell>
                    <TableCell>{hourData.orders}</TableCell>
                    <TableCell>RM {hourData.revenue}</TableCell>
                    <TableCell>RM {(hourData.revenue / hourData.orders).toFixed(2)}</TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ReportSection>

          {/* Staff Performance */}
          <ReportSection>
            <SectionTitle>Staff Performance</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Staff Name</TableHeader>
                  <TableHeader>Orders Handled</TableHeader>
                  <TableHeader>Efficiency</TableHeader>
                  <TableHeader>Performance</TableHeader>
                </tr>
              </thead>
              <tbody>
                {reportData.staffPerformance.map((staff, index) => (
                  <tr key={index}>
                    <TableCell style={{ fontWeight: '600' }}>{staff.name}</TableCell>
                    <TableCell>{staff.orders}</TableCell>
                    <TableCell>{staff.efficiency}%</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ProgressBar percentage={staff.efficiency} />
                        <span style={{ fontSize: '12px', color: '#6B7C93' }}>{staff.efficiency}%</span>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ReportSection>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default ManagerReportsPage;