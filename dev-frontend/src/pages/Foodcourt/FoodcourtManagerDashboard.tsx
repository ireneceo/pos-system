import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';

interface FoodcourtMetrics {
  assignedFoodcourt: string;
  totalStores: number;
  monthlyRentRevenue: number;
  cumulativeRevenue: number;
  averageRevenuePerStore: number;
  occupancyRate: number;
  growthRate: number;
  maintenanceRequests: number;
  activeLeases: number;
  pendingApplications: number;
  totalTransactions: number;
}

interface RevenueData {
  period: string;
  revenue: number;
  storeCount: number;
}

interface TenantStore {
  id: string;
  name: string;
  category: string;
  storeSize: string;
  monthlyRent: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'expired' | 'pending';
  contactPerson: string;
  phone: string;
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

const Subtitle = styled.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const QuickStatsContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const QuickStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const QuickStatLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
`;

const QuickStatValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const TenantsList = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const TenantItem = styled.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563EB;
    background: #F0F4FF;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TenantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const TenantName = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const TenantStatus = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#059669';
      case 'expired': return '#DC2626';
      case 'pending': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const TenantInfo = styled.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`;

const PlaceholderChart = styled.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`;

const TimeFilter = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`;

const FoodcourtManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [tenants, setTenants] = useState<TenantStore[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [metrics, setMetrics] = useState<FoodcourtMetrics>({
    assignedFoodcourt: '',
    totalStores: 0,
    monthlyRentRevenue: 0,
    cumulativeRevenue: 0,
    averageRevenuePerStore: 0,
    occupancyRate: 0,
    growthRate: 0,
    maintenanceRequests: 0,
    activeLeases: 0,
    pendingApplications: 0,
    totalTransactions: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting foodcourt manager data fetch...');

        // Mock data for assigned foodcourt
        const assignedFoodcourt = 'Lion City Food Court';

        // Generate mock tenant stores data
        const mockTenants: TenantStore[] = [
          {
            id: '1',
            name: 'K-DINE Korean Restaurant',
            category: 'Korean',
            storeSize: '200㎡',
            monthlyRent: 8500,
            leaseStart: '2023-01-01',
            leaseEnd: '2025-12-31',
            status: 'active',
            contactPerson: 'Kim Chul-soo',
            phone: '010-1234-5678'
          },
          {
            id: '2',
            name: 'Italian Pasta',
            category: 'Western',
            storeSize: '150㎡',
            monthlyRent: 6800,
            leaseStart: '2023-03-15',
            leaseEnd: '2025-03-14',
            status: 'active',
            contactPerson: 'Lee Young-hee',
            phone: '010-2345-6789'
          },
          {
            id: '3',
            name: 'Burger King',
            category: 'Fast Food',
            storeSize: '180㎡',
            monthlyRent: 7200,
            leaseStart: '2022-06-01',
            leaseEnd: '2024-05-31',
            status: 'expired',
            contactPerson: 'Park Min-soo',
            phone: '010-3456-7890'
          },
          {
            id: '4',
            name: 'Caffe Bene',
            category: 'Cafe',
            storeSize: '120㎡',
            monthlyRent: 5500,
            leaseStart: '2024-01-01',
            leaseEnd: '2026-12-31',
            status: 'pending',
            contactPerson: 'Jung Ha-na',
            phone: '010-4567-8901'
          }
        ];

        setTenants(mockTenants);

        // Calculate metrics from tenant data
        const activeTenants = mockTenants.filter(t => t.status === 'active');
        const totalRent = activeTenants.reduce((sum, tenant) => sum + tenant.monthlyRent, 0);
        const totalSpaces = 25; // Mock total available spaces

        const newMetrics = {
          assignedFoodcourt,
          totalStores: activeTenants.length,
          monthlyRentRevenue: totalRent,
          cumulativeRevenue: totalRent * 12, // Annual estimate
          averageRevenuePerStore: activeTenants.length > 0 ? totalRent / activeTenants.length : 0,
          occupancyRate: (activeTenants.length / totalSpaces) * 100,
          growthRate: Math.random() * 15 + 5, // Mock: 5-20%
          activeLeases: activeTenants.length,
          pendingApplications: mockTenants.filter(t => t.status === 'pending').length,
          maintenanceRequests: Math.floor(Math.random() * 8) + 2,
          totalTransactions: Math.floor(Math.random() * 100) + 50
        };

        setMetrics(newMetrics);

        // Generate revenue data
        const periods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenueArray = periods.map(period => ({
          period,
          revenue: Math.floor(Math.random() * 30000) + 20000,
          storeCount: Math.floor(Math.random() * 5) + 15
        }));
        setRevenueData(revenueArray);

      } catch (error) {
        console.error('Error fetching foodcourt manager data:', error);
      }
    };

    fetchData();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Operating';
      case 'expired': return 'Contract Expired';
      case 'pending': return 'Pending Contract';
      default: return status;
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Foodcourt Manager Dashboard</Title>
          <Subtitle>{metrics.assignedFoodcourt} Operations Status</Subtitle>
        </Header>

        <Content>
          <TabContainer>
            <Tab
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Tab>
            <Tab
              active={activeTab === 'tenants'}
              onClick={() => setActiveTab('tenants')}
            >
              Tenants ({metrics.totalStores})
            </Tab>
          </TabContainer>

          {activeTab === 'overview' && (
            <>
              <DashboardStatsGrid>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.totalStores}</DashboardStatValue>
                  <DashboardStatLabel>Operating Stores</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>RM {(metrics.monthlyRentRevenue / 1000).toFixed(1)}K</DashboardStatValue>
                  <DashboardStatLabel>Monthly Rental Revenue</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.occupancyRate.toFixed(1)}%</DashboardStatValue>
                  <DashboardStatLabel>Occupancy Rate</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>RM {(metrics.averageRevenuePerStore / 1000).toFixed(1)}K</DashboardStatValue>
                  <DashboardStatLabel>Average Rental</DashboardStatLabel>
                </DashboardStatCard>
              </DashboardStatsGrid>

              <MainGrid>
                <ChartContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Monthly Rental Revenue Trend</h3>
                    <TimeFilter value={timePeriod} onChange={(e) => setTimePeriod(e.target.value as any)}>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">Quarter</option>
                      <option value="year">This Year</option>
                    </TimeFilter>
                  </div>
                  <PlaceholderChart>
                    📊 Monthly Rental Revenue Chart (Coming Soon)
                  </PlaceholderChart>
                </ChartContainer>

                <QuickStatsContainer>
                  <h3>Operations Status</h3>
                  <QuickStatItem>
                    <QuickStatLabel>Active Contracts</QuickStatLabel>
                    <QuickStatValue>{metrics.activeLeases}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Pending Contracts</QuickStatLabel>
                    <QuickStatValue>{metrics.pendingApplications}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Maintenance Requests</QuickStatLabel>
                    <QuickStatValue>{metrics.maintenanceRequests}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Growth Rate (vs Last Month)</QuickStatLabel>
                    <QuickStatValue>+{metrics.growthRate.toFixed(1)}%</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Monthly Transactions</QuickStatLabel>
                    <QuickStatValue>{metrics.totalTransactions}</QuickStatValue>
                  </QuickStatItem>
                </QuickStatsContainer>
              </MainGrid>
            </>
          )}

          {activeTab === 'tenants' && (
            <TenantsList>
              <h3>Tenant Status</h3>
              {tenants.length === 0 ? (
                <PlaceholderChart>
                  🏪 Loading tenant data...
                </PlaceholderChart>
              ) : (
                tenants.map((tenant) => (
                  <TenantItem key={tenant.id} onClick={() => navigate(`/foodcourt/tenant/${tenant.id}`)}>
                    <TenantHeader>
                      <TenantName>{tenant.name}</TenantName>
                      <TenantStatus status={tenant.status}>
                        {getStatusText(tenant.status)}
                      </TenantStatus>
                    </TenantHeader>
                    <TenantInfo>
                      <span>{tenant.category} • {tenant.storeSize}</span>
                      <span>RM {tenant.monthlyRent.toLocaleString()}/month</span>
                    </TenantInfo>
                    <TenantInfo style={{ marginTop: '4px' }}>
                      <span>{tenant.contactPerson} • {tenant.phone}</span>
                      <span>Contract: {tenant.leaseStart} ~ {tenant.leaseEnd}</span>
                    </TenantInfo>
                  </TenantItem>
                ))
              )}
            </TenantsList>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default FoodcourtManagerDashboard;