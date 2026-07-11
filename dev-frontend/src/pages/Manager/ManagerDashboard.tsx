import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RestaurantSubscription } from '../../interfaces/RestaurantSubscription';
import { StatsGrid, StatCard, StatLabel, StatValue } from '../../components/UI';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { getAuthHeaders } from '../../utils/auth';
import { useTranslation } from 'react-i18next';

// API base URL - replaced at build time
const API_BASE = process.env.REACT_APP_API_URL || '';

interface Restaurant {
  id: string;
  name: string;
  branchName: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  todaySales: number;
  todayOrders: number;
  staffCount: number;
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

const Content = styled.div`
  padding: 32px;
  background: #F9FAFB;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
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
  border: 1px solid #C7CED6;
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
  color: #4B5563;
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
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'inactive': return '#DC2626';
      case 'maintenance': return '#D97706';
      default: return '#4B5563';
    }
  }};
`;

const RestaurantStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #F1F4F8;
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
  color: #4B5563;
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
  border: 1px solid #C7CED6;
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
    fill: #4B5563;
    transition: fill 0.2s;
  }
`;

const QuickActionText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const ManagerDashboard: React.FC = () => {
  const { t } = useTranslation('admin');
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        // Real per-restaurant data, scoped to the logged-in manager by the server
        // (same source as the Manager Sales page). Sales/orders = completed+served
        // in each restaurant's own timezone; staff = Restaurant Admin + Staff.
        const response = await fetch(`${API_BASE}/api/manager/sales-summary`, { headers: getAuthHeaders() });
        if (!response.ok) {
          throw new Error('Failed to fetch sales summary');
        }
        const json = await response.json();
        const rows = json.data || [];

        const restaurantsData: Restaurant[] = rows.map((r: any) => ({
          id: String(r.id),
          name: r.name,
          branchName: r.branchName || '',
          location: r.location || 'No address',
          status: r.status === 'active' ? 'active' :
                  r.status === 'suspended' ? 'maintenance' : 'inactive',
          todaySales: r.todaySales || 0,
          todayOrders: r.todayOrders || 0,
          staffCount: r.staffCount || 0
        }));

        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('ManagerDashboard: Error fetching restaurants:', error);
        setRestaurants([]);
      }
    };

    fetchRestaurantsData();
  }, []);

  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalSales = restaurants.reduce((sum, r) => sum + r.todaySales, 0);
  const totalOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);
  const totalStaff = restaurants.reduce((sum, r) => sum + r.staffCount, 0);

  const handleRestaurantClick = (restaurantId: string) => {
    // Navigate to restaurant reports
    navigate(`/pos/manager/reports?restaurant=${restaurantId}`);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:managerDashboard.dashboard')}</Title>
        </Header>
        
        <Content>
          <StatsGrid>
          <StatCard color="#059669">
            <StatLabel>{t('admin:managerDashboard.todaysTotalSales')}</StatLabel>
            <StatValue>{formatCurrency(totalSales, selectedCurrency)}</StatValue>
          </StatCard>
          <StatCard color="#2563EB">
            <StatLabel>{t('admin:managerDashboard.totalOrders')}</StatLabel>
            <StatValue>{totalOrders}</StatValue>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatLabel>{t('admin:managerDashboard.activeRestaurants')}</StatLabel>
            <StatValue>{activeRestaurants}/{restaurants.length}</StatValue>
          </StatCard>
          <StatCard color="#D97706">
            <StatLabel>{t('admin:managerDashboard.totalStaff')}</StatLabel>
            <StatValue>{totalStaff}</StatValue>
          </StatCard>
        </StatsGrid>

        <SectionTitle>{t('admin:managerDashboard.quickActions')}</SectionTitle>
        <QuickActions>
          <QuickActionCard onClick={() => navigate('/pos/manager/reports')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>{t('admin:managerDashboard.viewReports')}</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/invoices')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                <path d="M9 15h6v-1H9v1zm0-3h6v-1H9v1zm0-3h6V8H9v1z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>{t('admin:managerDashboard.restaurantInvoices')}</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/sales')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.29 0-.84-.68-1.37-2.08-1.81-1.75-.55-3.28-1.3-3.28-3.4 0-1.68 1.19-2.84 2.8-3.18V5h2.67v1.61c1.73.34 2.76 1.6 2.85 3.16h-1.96c-.12-.78-.53-1.45-1.56-1.45-1.03 0-1.52.52-1.52 1.25 0 .74.66 1.21 2.02 1.63 1.88.6 3.36 1.36 3.36 3.56 0 1.84-1.21 3.05-3.08 3.33z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>{t('admin:managerDashboard.salesOverview')}</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/admins')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.98 2.98 0 0 0 17.05 6H16c-.8 0-1.54.37-2.01.96l-.94 1.21A1 1 0 0 0 13.96 10l.79 1.04c.39.51.97.86 1.61.96h.64v10h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5a2.5 2.5 0 0 0-5 0V15h1.5v7h2zm6.5-12c.83 0 1.5-.67 1.5-1.5S14.83 8 14 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>{t('admin:managerDashboard.restaurantAdmins')}</QuickActionText>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/pos/manager/subscriptions')}>
            <QuickActionIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </QuickActionIcon>
            <QuickActionText>{t('admin:managerDashboard.manageSubscriptions')}</QuickActionText>
          </QuickActionCard>
        </QuickActions>

        <SectionTitle>{t('admin:managerDashboard.yourRestaurants')}</SectionTitle>
        <RestaurantGrid>
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
              <RestaurantHeader>
                <RestaurantInfo>
                  <RestaurantName>{restaurant.name}{restaurant.branchName && <span style={{ fontSize: '12px', fontWeight: 500, color: '#4B5563', background: '#F1F4F8', padding: '1px 8px', borderRadius: '4px', marginLeft: '6px' }}>{restaurant.branchName}</span>}</RestaurantName>
                  <RestaurantLocation>{restaurant.location}</RestaurantLocation>
                </RestaurantInfo>
                <StatusBadge status={restaurant.status}>
                  {restaurant.status}
                </StatusBadge>
              </RestaurantHeader>
              
              <RestaurantStats>
                <RestaurantStat>
                  <RestaurantDashboardStatValue>
                    {formatCurrency(restaurant.todaySales, selectedCurrency)}
                  </RestaurantDashboardStatValue>
                  <RestaurantDashboardStatLabel>{t('admin:managerDashboard.todaysSales')}</RestaurantDashboardStatLabel>
                </RestaurantStat>
                <RestaurantStat>
                  <RestaurantDashboardStatValue>{restaurant.todayOrders}</RestaurantDashboardStatValue>
                  <RestaurantDashboardStatLabel>{t('admin:managerDashboard.orders')}</RestaurantDashboardStatLabel>
                </RestaurantStat>
                <RestaurantStat>
                  <RestaurantDashboardStatValue>{restaurant.staffCount}</RestaurantDashboardStatValue>
                  <RestaurantDashboardStatLabel>{t('admin:managerDashboard.staff')}</RestaurantDashboardStatLabel>
                </RestaurantStat>
              </RestaurantStats>

              <ActionButton>{t('admin:managerDashboard.viewDetails')}</ActionButton>
            </RestaurantCard>
          ))}
        </RestaurantGrid>
        </Content>
      </Container>
    </>
  );
};

export default ManagerDashboard;