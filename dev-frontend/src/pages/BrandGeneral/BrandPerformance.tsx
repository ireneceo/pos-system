import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
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

const FilterSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: end;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;


const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const BrandCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid #635BFF;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const BrandName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const MetricValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const GrowthIndicator = styled.span<{ positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${props => props.positive ? '#DCFCE7' : '#FEE2E2'};
`;

const ChartSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const ChartTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
  font-size: 16px;
`;

const RankingSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const RankNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-right: 16px;
`;

const RankInfo = styled.div`
  flex: 1;
`;

const RankBrand = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RankDetail = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const RankMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`;

const RankMetric = styled.span`
  font-size: 12px;
  color: #374151;
  background: #F9FAFB;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
`;

interface BrandPerformanceData {
  id: string;
  name: string;
  sales: number;
  growth: number;
  stores: number;
  avgOrder: number;
  satisfaction: number;
  category: string;
}

interface StatsSummary {
  totalSales: number;
  totalStores: number;
  avgGrowth: number;
  avgSatisfaction: number;
  bestPerformer: string;
  worstPerformer: string;
}

const BrandPerformance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [brands, setBrands] = useState<BrandPerformanceData[]>([]);
  const [stats, setStats] = useState<StatsSummary>({
    totalSales: 0,
    totalStores: 0,
    avgGrowth: 0,
    avgSatisfaction: 0,
    bestPerformer: '',
    worstPerformer: ''
  });

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const mockBrands: BrandPerformanceData[] = [
          {
            id: '1',
            name: 'K-DINE Korean Restaurant',
            sales: 450000000,
            growth: 15.2,
            stores: 25,
            avgOrder: 18500,
            satisfaction: 4.8,
            category: 'Korean Food'
          },
          {
            id: '2',
            name: 'Premium Burger',
            sales: 380000000,
            growth: 12.8,
            stores: 20,
            avgOrder: 22000,
            satisfaction: 4.7,
            category: 'Burger'
          },
          {
            id: '3',
            name: 'Tasty Chicken',
            sales: 320000000,
            growth: 8.5,
            stores: 18,
            avgOrder: 16200,
            satisfaction: 4.6,
            category: 'Chicken'
          },
          {
            id: '4',
            name: 'Cafe Break',
            sales: 275000000,
            growth: 5.1,
            stores: 15,
            avgOrder: 12800,
            satisfaction: 4.5,
            category: 'Cafe'
          },
          {
            id: '5',
            name: 'Healthy Salad',
            sales: 180000000,
            growth: -2.3,
            stores: 12,
            avgOrder: 14500,
            satisfaction: 4.4,
            category: 'Salad'
          },
          {
            id: '6',
            name: 'Asian Noodles',
            sales: 150000000,
            growth: 3.7,
            stores: 10,
            avgOrder: 13200,
            satisfaction: 4.3,
            category: 'Asian Cuisine'
          }
        ];

        setBrands(mockBrands);

        // Calculate summary stats
        const totalSales = mockBrands.reduce((sum, brand) => sum + brand.sales, 0);
        const totalStores = mockBrands.reduce((sum, brand) => sum + brand.stores, 0);
        const avgGrowth = mockBrands.reduce((sum, brand) => sum + brand.growth, 0) / mockBrands.length;
        const avgSatisfaction = mockBrands.reduce((sum, brand) => sum + brand.satisfaction, 0) / mockBrands.length;

        const sortedByGrowth = [...mockBrands].sort((a, b) => b.growth - a.growth);
        const bestPerformer = sortedByGrowth[0].name;
        const worstPerformer = sortedByGrowth[sortedByGrowth.length - 1].name;

        setStats({
          totalSales,
          totalStores,
          avgGrowth,
          avgSatisfaction,
          bestPerformer,
          worstPerformer
        });
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, [selectedPeriod, selectedMetric]);

  const sortedBrands = [...brands].sort((a, b) => {
    switch (selectedMetric) {
      case 'sales':
        return b.sales - a.sales;
      case 'growth':
        return b.growth - a.growth;
      case 'satisfaction':
        return b.satisfaction - a.satisfaction;
      case 'efficiency':
        return (b.sales / b.stores) - (a.sales / a.stores);
      default:
        return b.sales - a.sales;
    }
  });

  const getMetricValue = (brand: BrandPerformanceData) => {
    switch (selectedMetric) {
      case 'sales':
        return `RM ${(brand.sales / 1000000).toFixed(0)}M`;
      case 'growth':
        return `${brand.growth > 0 ? '+' : ''}${brand.growth.toFixed(1)}%`;
      case 'satisfaction':
        return `${brand.satisfaction}/5.0`;
      case 'efficiency':
        return `RM ${((brand.sales / brand.stores) / 1000000).toFixed(1)}M`;
      default:
        return `RM ${(brand.sales / 1000000).toFixed(0)}M`;
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Brand Performance Analysis</Title>
            <Subtitle>Portfolio optimization through brand-specific performance metrics and growth rate analysis</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline">Export Report</ThemedButton>
            <ThemedButton variant="primary">Refresh Analysis</ThemedButton>
          </ActionSection>
        </Header>

        <Content>
          <FilterSection>
            <FilterGrid>
              <FilterGroup>
                <Label>Analysis Period</Label>
                <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">Quarter</option>
                  <option value="year">This Year</option>
                </Select>
              </FilterGroup>
              <FilterGroup>
                <Label>Performance Metric</Label>
                <Select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                  <option value="sales">By Revenue</option>
                  <option value="growth">By Growth Rate</option>
                  <option value="satisfaction">By Customer Satisfaction</option>
                  <option value="efficiency">By Revenue per Store</option>
                </Select>
              </FilterGroup>
              <FilterGroup>
                <Label>&nbsp;</Label>
                <ThemedButton variant="primary">View Analysis</ThemedButton>
              </FilterGroup>
            </FilterGrid>
          </FilterSection>

          <StatsGrid>
            <StatCard>
              <StatValue>RM {(stats.totalSales / 1000000000).toFixed(1)}B</StatValue>
              <StatLabel>Total Brand Revenue</StatLabel>
              <StatTrend trend={stats.avgGrowth > 0 ? "up" : "down"}>
                {stats.avgGrowth > 0 ? "+" : ""}{stats.avgGrowth.toFixed(1)}% growth
              </StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>Total Stores</StatLabel>
              <StatTrend trend="up">
                All brand locations
              </StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.avgSatisfaction.toFixed(1)}</StatValue>
              <StatLabel>Average Customer Satisfaction</StatLabel>
              <StatTrend trend={stats.avgSatisfaction > 4.5 ? "up" : "down"}>
                Out of 5.0
              </StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.bestPerformer ? stats.bestPerformer.split(' ')[0] : 'N/A'}</StatValue>
              <StatLabel>Top Performing Brand</StatLabel>
              <StatTrend trend="up">
                Leading in growth
              </StatTrend>
            </StatCard>
          </StatsGrid>

          <PerformanceGrid>
            {sortedBrands.map((brand) => (
              <BrandCard key={brand.id}>
                <BrandName>{brand.name}</BrandName>
                <MetricRow>
                  <MetricLabel>Monthly Revenue</MetricLabel>
                  <MetricValue>
                    RM {(brand.sales / 1000000).toFixed(0)}M
                    <GrowthIndicator positive={brand.growth > 0}>
                      {brand.growth > 0 ? '+' : ''}{brand.growth.toFixed(1)}%
                    </GrowthIndicator>
                  </MetricValue>
                </MetricRow>
                <MetricRow>
                  <MetricLabel>Store Count</MetricLabel>
                  <MetricValue>{brand.stores} stores</MetricValue>
                </MetricRow>
                <MetricRow>
                  <MetricLabel>Average Order Value</MetricLabel>
                  <MetricValue>RM {brand.avgOrder.toLocaleString()}</MetricValue>
                </MetricRow>
                <MetricRow>
                  <MetricLabel>Customer Satisfaction</MetricLabel>
                  <MetricValue>{brand.satisfaction}/5.0</MetricValue>
                </MetricRow>
                <MetricRow>
                  <MetricLabel>Revenue per Store</MetricLabel>
                  <MetricValue>RM {((brand.sales / brand.stores) / 1000000).toFixed(1)}M</MetricValue>
                </MetricRow>
              </BrandCard>
            ))}
          </PerformanceGrid>

          <ChartSection>
            <ChartTitle>Brand Performance Trend Analysis</ChartTitle>
            <ChartPlaceholder>
              Brand revenue and growth rate comparison chart (Coming Soon)<br/>
              Multi-dimensional data visualization using Chart.js or Recharts
            </ChartPlaceholder>
          </ChartSection>

          <RankingSection>
            <ChartTitle>Brand Performance Ranking</ChartTitle>
            {sortedBrands.slice(0, 5).map((brand, index) => (
              <RankingItem key={brand.id}>
                <RankNumber>{index + 1}</RankNumber>
                <RankInfo>
                  <RankBrand>{brand.name}</RankBrand>
                  <RankDetail>
                    {getMetricValue(brand)} • {brand.stores} stores • {brand.category}
                  </RankDetail>
                  <RankMetrics>
                    <RankMetric>Revenue: RM {(brand.sales / 1000000).toFixed(0)}M</RankMetric>
                    <RankMetric>Growth: {brand.growth > 0 ? '+' : ''}{brand.growth.toFixed(1)}%</RankMetric>
                    <RankMetric>Satisfaction: {brand.satisfaction}/5.0</RankMetric>
                  </RankMetrics>
                </RankInfo>
              </RankingItem>
            ))}
          </RankingSection>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandPerformance;