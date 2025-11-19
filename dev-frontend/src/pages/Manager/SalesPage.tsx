import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
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
  background: #FAFBFC;
`;

const Header = styled.div`
  background: white;
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;


const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
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


const DateRangeSelector = styled.div`
  display: flex;
  gap: 8px;
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

const Content = styled.div`
  padding: 32px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatTrend = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 500;
  margin-top: 4px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
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
  border: 1px solid #E6EBF1;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

const RestaurantTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
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
  color: #6B7280;
`;

const ValueCell = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const ChangeCell = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 500;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
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
  // const { } = useAuth();
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [restaurantSales, setRestaurantSales] = useState<RestaurantSales[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch restaurants data first
        const restaurantsResponse = await fetch('/api/restaurants');
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
      dateRange,
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
    <MainLayout>
      <Container>
        <Header>
          <PageTitle>Sales</PageTitle>
        </Header>
        
        <Content>
          <div style={{ background: '#FAFBFC', padding: '24px 0', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <FilterSelect
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="all">All Restaurants</option>
              {restaurantSales.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - {restaurant.location}
                </option>
              ))}
            </FilterSelect>
            
            <DateRangeSelector>
              <DateButton active={dateRange === 'today'} onClick={() => setDateRange('today')}>
                Today
              </DateButton>
              <DateButton active={dateRange === 'yesterday'} onClick={() => setDateRange('yesterday')}>
                Yesterday
              </DateButton>
              <DateButton active={dateRange === 'week'} onClick={() => setDateRange('week')}>
                This Week
              </DateButton>
              <DateButton active={dateRange === 'month'} onClick={() => setDateRange('month')}>
                This Month
              </DateButton>
              <DateButton active={dateRange === 'custom'} onClick={() => setDateRange('custom')}>
                Custom Range
              </DateButton>
            </DateRangeSelector>
            
            <Button onClick={handleExportData} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export Report
            </Button>
          </div>
          
          <StatsGrid>
            <StatCard color="#059669">
              <StatLabel>Total Sales</StatLabel>
              <StatValue>RM {totals.todaySales.toLocaleString()}</StatValue>
              <StatTrend positive={salesChange > 0}>
                {salesChange > 0 ? '↑' : '↓'} {Math.abs(salesChange).toFixed(1)}% vs yesterday
              </StatTrend>
            </StatCard>
            <StatCard color="#2563EB">
              <StatLabel>Total Orders</StatLabel>
              <StatValue>{totals.todayOrders}</StatValue>
              <StatTrend positive>
                ↑ 12% vs yesterday
              </StatTrend>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatLabel>Average Order Value</StatLabel>
              <StatValue>RM {averageOrderValue.toFixed(2)}</StatValue>
              <StatTrend positive>
                ↑ 5.3% vs yesterday
              </StatTrend>
            </StatCard>
            <StatCard color="#DC2626">
              <StatLabel>Active Restaurants</StatLabel>
              <StatValue>{restaurantSales.length}</StatValue>
              <StatTrend positive>
                All operational
              </StatTrend>
            </StatCard>
          </StatsGrid>

          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Sales Trend - All Restaurants</ChartTitle>
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B7280',
                fontSize: '14px'
              }}>
                Chart visualization will be implemented
              </div>
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>Sales Distribution</ChartTitle>
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B7280',
                fontSize: '14px'
              }}>
                🍰 Distribution chart will be implemented
              </div>
            </ChartCard>
          </ChartsGrid>

          <ChartCard>
            <ChartTitle>Daily Comparison</ChartTitle>
            <div style={{
              height: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280',
              fontSize: '14px'
            }}>
              Bar chart comparison will be implemented
            </div>
          </ChartCard>

          <RestaurantTable style={{ marginTop: '24px' }}>
            <TableHeader>
              <span>Restaurant</span>
              <span>Today's Sales</span>
              <span>Orders</span>
              <span>Avg Order</span>
              <span>Week Total</span>
              <span>Month Total</span>
              <span>Action</span>
            </TableHeader>
            
            {restaurantSales.map(restaurant => {
              const change = restaurant.yesterdaySales > 0
                ? ((restaurant.todaySales - restaurant.yesterdaySales) / restaurant.yesterdaySales * 100)
                : 0;
                
              return (
                <TableRow key={restaurant.id}>
                  <RestaurantInfo>
                    <RestaurantName>{restaurant.name}</RestaurantName>
                    <RestaurantLocation>{restaurant.location}</RestaurantLocation>
                  </RestaurantInfo>
                  <ValueCell>
                    RM {restaurant.todaySales.toLocaleString()}
                    <ChangeCell positive={change > 0}>
                      {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                    </ChangeCell>
                  </ValueCell>
                  <ValueCell>{restaurant.todayOrders}</ValueCell>
                  <ValueCell>RM {restaurant.averageOrderValue.toFixed(2)}</ValueCell>
                  <ValueCell>RM {restaurant.weekSales.toLocaleString()}</ValueCell>
                  <ValueCell>RM {restaurant.monthSales.toLocaleString()}</ValueCell>
                  <ActionButton>View Details</ActionButton>
                </TableRow>
              );
            })}
          </RestaurantTable>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default ManagerSalesPage;