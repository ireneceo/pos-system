import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';

interface BrandMetrics {
  assignedBrand: string;
  assignedRegions: string[];
  totalStores: number;
  monthlyRevenue: number;
  cumulativeRevenue: number;
  averageRevenuePerStore: number;
  customerSatisfaction: number;
  marketShare: number;
  growthRate: number;
  activePromotions: number;
  newFranchises: number;
  totalTransactions: number;
}

interface RevenueData {
  period: string;
  revenue: number;
  storeCount: number;
}

interface FranchiseStore {
  id: string;
  name: string;
  location: string;
  storeSize: string;
  monthlyRevenue: number;
  openDate: string;
  franchiseeType: 'individual' | 'corporate';
  status: 'active' | 'underperforming' | 'expanding';
  manager: string;
  phone: string;
  performanceScore: number;
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

const FranchisesList = styled.div`
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

const FranchiseItem = styled.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #DC2626;
    background: #FEF2F2;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const FranchiseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const FranchiseName = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const FranchiseScore = styled.span<{ score: number }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${props => {
    if (props.score >= 90) return '#059669';
    if (props.score >= 75) return '#2563EB';
    if (props.score >= 60) return '#D97706';
    return '#DC2626';
  }};
`;

const FranchiseInfo = styled.div`
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

const BrandManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [franchises, setFranchises] = useState<FranchiseStore[]>([]);
  const [, setRevenueData] = useState<RevenueData[]>([]);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [metrics, setMetrics] = useState<BrandMetrics>({
    assignedBrand: '',
    assignedRegions: [],
    totalStores: 0,
    monthlyRevenue: 0,
    cumulativeRevenue: 0,
    averageRevenuePerStore: 0,
    customerSatisfaction: 0,
    marketShare: 0,
    growthRate: 0,
    activePromotions: 0,
    newFranchises: 0,
    totalTransactions: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting brand manager data fetch...');

        // Mock data for assigned brand and regions
        const assignedBrand = 'K-DINE Brand';
        const assignedRegions = ['Seoul', 'Busan'];

        // Generate mock franchise stores data
        const mockFranchises: FranchiseStore[] = [
          {
            id: '1',
            name: 'K-DINE Gangnam',
            location: 'Seoul Gangnam-gu',
            storeSize: '250㎡',
            monthlyRevenue: 85000,
            openDate: '2022-03-15',
            franchiseeType: 'corporate',
            status: 'active',
            manager: 'Kim Chul-soo',
            phone: '02-1234-5678',
            performanceScore: 92
          },
          {
            id: '2',
            name: 'K-DINE Hongdae',
            location: 'Seoul Mapo-gu',
            storeSize: '200㎡',
            monthlyRevenue: 72000,
            openDate: '2022-08-20',
            franchiseeType: 'individual',
            status: 'active',
            manager: 'Lee Young-hee',
            phone: '02-2345-6789',
            performanceScore: 87
          },
          {
            id: '3',
            name: 'K-DINE Haeundae',
            location: 'Busan Haeundae-gu',
            storeSize: '180㎡',
            monthlyRevenue: 58000,
            openDate: '2023-01-10',
            franchiseeType: 'individual',
            status: 'underperforming',
            manager: 'Park Min-soo',
            phone: '051-3456-7890',
            performanceScore: 68
          },
          {
            id: '4',
            name: 'K-DINE Seomyeon',
            location: 'Busan Busanjin-gu',
            storeSize: '220㎡',
            monthlyRevenue: 78000,
            openDate: '2023-05-01',
            franchiseeType: 'corporate',
            status: 'expanding',
            manager: 'Jung Ha-na',
            phone: '051-4567-8901',
            performanceScore: 81
          }
        ];

        setFranchises(mockFranchises);

        // Calculate metrics from franchise data
        const totalRevenue = mockFranchises.reduce((sum, franchise) => sum + franchise.monthlyRevenue, 0);
        const avgPerformance = mockFranchises.reduce((sum, f) => sum + f.performanceScore, 0) / mockFranchises.length;

        const newMetrics = {
          assignedBrand,
          assignedRegions,
          totalStores: mockFranchises.length,
          monthlyRevenue: totalRevenue,
          cumulativeRevenue: totalRevenue * 12, // Annual estimate
          averageRevenuePerStore: mockFranchises.length > 0 ? totalRevenue / mockFranchises.length : 0,
          customerSatisfaction: (avgPerformance / 100) * 5, // Convert to 5-point scale
          marketShare: Math.random() * 8 + 12, // Mock: 12-20%
          growthRate: Math.random() * 20 + 10, // Mock: 10-30%
          activePromotions: Math.floor(Math.random() * 8) + 3,
          newFranchises: Math.floor(Math.random() * 3) + 1,
          totalTransactions: Math.floor(Math.random() * 200) + 150
        };

        setMetrics(newMetrics);

        // Generate revenue data
        const periods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenueArray = periods.map(period => ({
          period,
          revenue: Math.floor(Math.random() * 50000) + 200000,
          storeCount: Math.floor(Math.random() * 2) + mockFranchises.length
        }));
        setRevenueData(revenueArray);

      } catch (error) {
        console.error('Error fetching brand manager data:', error);
      }
    };

    fetchData();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Operating';
      case 'underperforming': return 'Needs Improvement';
      case 'expanding': return 'Expanding';
      default: return status;
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Brand Manager Dashboard</Title>
          <Subtitle>
            {metrics.assignedBrand} • {metrics.assignedRegions.join(', ')} Region
          </Subtitle>
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
              active={activeTab === 'franchises'}
              onClick={() => setActiveTab('franchises')}
            >
              Franchises ({metrics.totalStores})
            </Tab>
          </TabContainer>

          {activeTab === 'overview' && (
            <>
              <DashboardStatsGrid>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.totalStores}</DashboardStatValue>
                  <DashboardStatLabel>Assigned Stores</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>RM {(metrics.monthlyRevenue / 1000).toFixed(0)}K</DashboardStatValue>
                  <DashboardStatLabel>Monthly Revenue</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.customerSatisfaction.toFixed(1)}/5.0</DashboardStatValue>
                  <DashboardStatLabel>Customer Satisfaction</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.marketShare.toFixed(1)}%</DashboardStatValue>
                  <DashboardStatLabel>Market Share</DashboardStatLabel>
                </DashboardStatCard>
              </DashboardStatsGrid>

              <MainGrid>
                <ChartContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Monthly Franchise Revenue Trend</h3>
                    <TimeFilter value={timePeriod} onChange={(e) => setTimePeriod(e.target.value as any)}>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">Quarter</option>
                      <option value="year">This Year</option>
                    </TimeFilter>
                  </div>
                  <PlaceholderChart>
                    📊 Monthly Franchise Revenue Chart (Coming Soon)
                  </PlaceholderChart>
                </ChartContainer>

                <QuickStatsContainer>
                  <h3>Brand Status</h3>
                  <QuickStatItem>
                    <QuickStatLabel>Active Promotions</QuickStatLabel>
                    <QuickStatValue>{metrics.activePromotions}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>New Franchises</QuickStatLabel>
                    <QuickStatValue>{metrics.newFranchises}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Avg Store Revenue</QuickStatLabel>
                    <QuickStatValue>RM {(metrics.averageRevenuePerStore / 1000).toFixed(0)}K</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Growth Rate (MoM)</QuickStatLabel>
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

          {activeTab === 'franchises' && (
            <FranchisesList>
              <h3>Franchise Status</h3>
              {franchises.length === 0 ? (
                <PlaceholderChart>
                  🏪 Loading franchise data...
                </PlaceholderChart>
              ) : (
                franchises.map((franchise) => (
                  <FranchiseItem key={franchise.id} onClick={() => navigate(`/brand/franchise/${franchise.id}`)}>
                    <FranchiseHeader>
                      <FranchiseName>{franchise.name}</FranchiseName>
                      <FranchiseScore score={franchise.performanceScore}>
                        {franchise.performanceScore}pts
                      </FranchiseScore>
                    </FranchiseHeader>
                    <FranchiseInfo>
                      <span>{franchise.location} • {franchise.storeSize}</span>
                      <span>RM {(franchise.monthlyRevenue / 1000).toFixed(0)}K/month</span>
                    </FranchiseInfo>
                    <FranchiseInfo style={{ marginTop: '4px' }}>
                      <span>{franchise.manager} • {franchise.phone}</span>
                      <span>Opened: {franchise.openDate} • {getStatusText(franchise.status)}</span>
                    </FranchiseInfo>
                  </FranchiseItem>
                ))
              )}
            </FranchisesList>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandManagerDashboard;