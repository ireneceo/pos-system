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
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
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
  background: #FAFBFC;
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
  const [, setRevenueData] = useState<RevenueData[]>([]);
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
        // TODO: Implement API call to fetch foodcourt manager data
        setTenants([]);
        setMetrics({
          assignedFoodcourt: '',
          totalStores: 0,
          monthlyRentRevenue: 0,
          cumulativeRevenue: 0,
          averageRevenuePerStore: 0,
          occupancyRate: 0,
          growthRate: 0,
          activeLeases: 0,
          pendingApplications: 0,
          maintenanceRequests: 0,
          totalTransactions: 0
        });
        setRevenueData([]);
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