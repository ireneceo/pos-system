import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { RestaurantSubscription } from '../../interfaces/RestaurantSubscription';
import { StatsGrid, StatCard, StatLabel, StatValue } from '../../components/UI';

// API base URL - replaced at build time
const API_BASE = process.env.REACT_APP_API_URL || '';

interface Restaurant {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  todaySales: number;
  todayOrders: number;
  staffCount: number;
  rating: number;
  subscription?: RestaurantSubscription;
}

const Container = styled.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;



const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const RestaurantCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`;

const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const RestaurantInfo = styled.div``;

const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RestaurantLocation = styled.p`
  font-size: 14px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'inactive': return '#FEF2F2';
      case 'maintenance': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'inactive': return '#DC2626';
      case 'maintenance': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const RestaurantStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #F3F4F6;
`;

const RestaurantStat = styled.div`
  text-align: center;
`;

const RestaurantDashboardStatValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RestaurantDashboardStatLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#FFC107' : '#E5E7EB'};
  font-size: 16px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  margin-top: 16px;
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

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const QuickActionCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    
    svg {
      fill: #635BFF;
    }
  }
`;

const QuickActionIcon = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  
  svg {
    width: 32px;
    height: 32px;
    fill: #6B7280;
    transition: fill 0.2s;
  }
`;

const QuickActionText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        console.log('🔄 ManagerDashboard: Fetching restaurants from API...');
        
        // Fetch restaurants for this manager
        const restaurantsResponse = await fetch(`${API_BASE}/api/restaurants`);
        if (!restaurantsResponse.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const allRestaurants = await restaurantsResponse.json();
        
        // Filter restaurants for current manager (manager_id = 2 for K-DINE manager)
        const managerRestaurants = allRestaurants.filter((restaurant: any) => 
          restaurant.manager_id === 2 // K-DINE manager ID
        );
        
        console.log('🏪 Found manager restaurants:', managerRestaurants);
        
        // Transform API data to Restaurant interface
        const restaurantsData: Restaurant[] = managerRestaurants.map((restaurant: any) => ({
          id: restaurant.id.toString(),
          name: restaurant.name,
          location: restaurant.address || restaurant.location || 'No address',
          status: restaurant.status === 'active' ? 'active' : 
                  restaurant.status === 'suspended' ? 'maintenance' : 'inactive',
          todaySales: Math.floor(Math.random() * 5000) + 2000, // Random sales data
          todayOrders: Math.floor(Math.random() * 150) + 50,   // Random orders data  
          staffCount: Math.floor(Math.random() * 10) + 5,      // Random staff count
          rating: Number((Math.random() * 1 + 4).toFixed(1))   // Random rating 4.0-5.0
        }));
        
        console.log('✅ ManagerDashboard: Loaded restaurants data:', restaurantsData);
        setRestaurants(restaurantsData);
        
      } catch (error) {
        console.error('❌ ManagerDashboard: Error fetching restaurants:', error);
        setRestaurants([]);
      }
    };
    
    fetchRestaurantsData();
  }, []);

  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalSales = restaurants.reduce((sum, r) => sum + r.todaySales, 0);
  const totalOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);
  const totalStaff = restaurants.reduce((sum, r) => sum + r.staffCount, 0);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      );
    }
    return stars;
  };

  const handleRestaurantClick = (restaurantId: string) => {
    // Navigate to restaurant reports
    navigate(`/manager/reports?restaurant=${restaurantId}`);
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Dashboard</Title>
        </Header>
        
        <Content>
          <StatsGrid>
          <StatCard color="#059669">
            <StatLabel>Today's Total Sales</StatLabel>
            <StatValue>RM {totalSales.toLocaleString()}</StatValue>
          </StatCard>
          <StatCard color="#2563EB">
            <StatLabel>Total Orders</StatLabel>
            <StatValue>{totalOrders}</StatValue>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatLabel>Active Restaurants</StatLabel>
            <StatValue>{activeRestaurants}/{restaurants.length}</StatValue>
          </StatCard>
          <StatCard color="#D97706">
            <StatLabel>Total Staff</StatLabel>
            <StatValue>{totalStaff}</StatValue>
          </StatCard>
        </StatsGrid>

        <SectionTitle>Quick Actions</SectionTitle>
        <QuickActions>
          <QuickActionCard onClick={() => navigate('/pos/manager/reports')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>View Reports</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/invoices')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                <path d="M9 15h6v-1H9v1zm0-3h6v-1H9v1zm0-3h6V8H9v1z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>Restaurant Invoices</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/sales')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.29 0-.84-.68-1.37-2.08-1.81-1.75-.55-3.28-1.3-3.28-3.4 0-1.68 1.19-2.84 2.8-3.18V5h2.67v1.61c1.73.34 2.76 1.6 2.85 3.16h-1.96c-.12-.78-.53-1.45-1.56-1.45-1.03 0-1.52.52-1.52 1.25 0 .74.66 1.21 2.02 1.63 1.88.6 3.36 1.36 3.36 3.56 0 1.84-1.21 3.05-3.08 3.33z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>Sales Overview</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/staff')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.98 2.98 0 0 0 17.05 6H16c-.8 0-1.54.37-2.01.96l-.94 1.21A1 1 0 0 0 13.96 10l.79 1.04c.39.51.97.86 1.61.96h.64v10h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5a2.5 2.5 0 0 0-5 0V15h1.5v7h2zm6.5-12c.83 0 1.5-.67 1.5-1.5S14.83 8 14 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>Staff Management</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/subscriptions')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>Manage Subscriptions</QuickActionText>
          </QuickActionCard>
        </QuickActions>

        <SectionTitle>Your Restaurants</SectionTitle>
        <RestaurantGrid>
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
              <RestaurantHeader>
                <RestaurantInfo>
                  <RestaurantName>{restaurant.name}</RestaurantName>
                  <RestaurantLocation>{restaurant.location}</RestaurantLocation>
                </RestaurantInfo>
                <StatusBadge status={restaurant.status}>
                  {restaurant.status}
                </StatusBadge>
              </RestaurantHeader>
              
              <RatingContainer>
                {renderStars(restaurant.rating)}
                <span style={{ fontSize: '14px', color: '#6B7280', marginLeft: '8px' }}>
                  {restaurant.rating}
                </span>
              </RatingContainer>

              <RestaurantStats>
                <RestaurantStat>
                  <RestaurantDashboardStatValue>
                    RM {restaurant.todaySales.toLocaleString()}
                  </RestaurantDashboardStatValue>
                  <RestaurantDashboardStatLabel>Today's Sales</RestaurantDashboardStatLabel>
                </RestaurantStat>
                <RestaurantStat>
                  <RestaurantDashboardStatValue>{restaurant.todayOrders}</RestaurantDashboardStatValue>
                  <RestaurantDashboardStatLabel>Orders</RestaurantDashboardStatLabel>
                </RestaurantStat>
                <RestaurantStat>
                  <RestaurantDashboardStatValue>{restaurant.staffCount}</RestaurantDashboardStatValue>
                  <RestaurantDashboardStatLabel>Staff</RestaurantDashboardStatLabel>
                </RestaurantStat>
              </RestaurantStats>

              <ActionButton>View Details</ActionButton>
            </RestaurantCard>
          ))}
        </RestaurantGrid>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default ManagerDashboard;