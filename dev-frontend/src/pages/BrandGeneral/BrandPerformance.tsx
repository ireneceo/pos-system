import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Button,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

// Page-specific styled components
const Subtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const BrandCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const BrandHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const BrandName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const BrandCategory = styled.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const MetricValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const GrowthBadge = styled.span<{ positive?: boolean }>`
  font-size: 11px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${props => props.positive ? '#ECFDF5' : '#FEE2E2'};
`;

const RankingSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
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

const RankNumber = styled.div<{ rank: number }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => {
    if (props.rank === 1) return '#FFD700';
    if (props.rank === 2) return '#C0C0C0';
    if (props.rank === 3) return '#CD7F32';
    return '#E5E7EB';
  }};
  color: ${props => props.rank <= 3 ? 'white' : '#6B7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;
`;

const RankInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RankBrand = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RankStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`;

const RankStat = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
  }
`;

interface Brand {
  id: number;
  name: string;
  code: string;
  status: string;
  restaurants?: Array<{
    id: number;
    name: string;
    status: string;
  }>;
}

interface BrandPerformanceData {
  id: number;
  name: string;
  code: string;
  stores: number;
  sales: number;
  growth: number;
  avgOrder: number;
  satisfaction: number;
  category: string;
}

const BRAND_COLORS = ['#635BFF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

const BrandPerformance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState<BrandPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalStores: 0,
    avgGrowth: 0,
    avgSatisfaction: 0,
    topBrand: ''
  });

  useEffect(() => {
    fetchBrandsData();
  }, []);

  const fetchBrandsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/brands', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data: Brand[] = await response.json();

        // Transform brand data with performance metrics
        // In production, these would come from actual analytics API
        const performanceData: BrandPerformanceData[] = data.map((brand, index) => {
          const storeCount = brand.restaurants?.length || 0;
          // Generate realistic mock performance data based on store count
          const baseSales = storeCount * 50000; // RM 50k per store base
          const variance = Math.random() * 0.4 + 0.8; // 80-120% variance

          return {
            id: brand.id,
            name: brand.name,
            code: brand.code,
            stores: storeCount,
            sales: Math.round(baseSales * variance),
            growth: parseFloat((Math.random() * 30 - 5).toFixed(1)), // -5% to +25%
            avgOrder: Math.round(Math.random() * 30 + 25), // RM 25-55
            satisfaction: parseFloat((Math.random() * 1 + 4).toFixed(1)), // 4.0-5.0
            category: 'Restaurant'
          };
        });

        setBrands(performanceData);

        // Calculate summary stats
        if (performanceData.length > 0) {
          const totalSales = performanceData.reduce((sum, b) => sum + b.sales, 0);
          const totalStores = performanceData.reduce((sum, b) => sum + b.stores, 0);
          const avgGrowth = performanceData.reduce((sum, b) => sum + b.growth, 0) / performanceData.length;
          const avgSatisfaction = performanceData.reduce((sum, b) => sum + b.satisfaction, 0) / performanceData.length;
          const sortedBySales = [...performanceData].sort((a, b) => b.sales - a.sales);

          setStats({
            totalSales,
            totalStores,
            avgGrowth,
            avgSatisfaction,
            topBrand: sortedBySales[0]?.name || 'N/A'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBrands = [...filteredBrands].sort((a, b) => {
    switch (selectedMetric) {
      case 'sales': return b.sales - a.sales;
      case 'growth': return b.growth - a.growth;
      case 'satisfaction': return b.satisfaction - a.satisfaction;
      case 'stores': return b.stores - a.stores;
      default: return b.sales - a.sales;
    }
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `RM ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `RM ${(amount / 1000).toFixed(0)}K`;
    }
    return `RM ${amount.toLocaleString()}`;
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Brand Performance</Title>
            <Subtitle>Analyze brand performance metrics and growth trends</Subtitle>
          </div>
          <ActionSection>
            <Button variant="secondary" onClick={() => fetchBrandsData()}>Refresh</Button>
            <Button variant="primary">Export Report</Button>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{formatCurrency(stats.totalSales)}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
              <StatDescription>All brands combined</StatDescription>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>Total Stores</StatLabel>
              <StatDescription>Across {brands.length} brands</StatDescription>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.avgGrowth > 0 ? '+' : ''}{stats.avgGrowth.toFixed(1)}%</StatValue>
              <StatLabel>Avg Growth</StatLabel>
              <StatDescription>This period vs last</StatDescription>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{stats.avgSatisfaction.toFixed(1)}</StatValue>
              <StatLabel>Avg Rating</StatLabel>
              <StatDescription>Customer satisfaction</StatDescription>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <SearchInput
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </FilterSelect>
            <FilterSelect
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="sales">Sort by Revenue</option>
              <option value="growth">Sort by Growth</option>
              <option value="satisfaction">Sort by Rating</option>
              <option value="stores">Sort by Stores</option>
            </FilterSelect>
          </FilterBar>

          {loading ? (
            <EmptyState>
              <p>Loading brand performance data...</p>
            </EmptyState>
          ) : sortedBrands.length === 0 ? (
            <EmptyState>
              <h3>No Brands Found</h3>
              <p>No brands match your search criteria.</p>
            </EmptyState>
          ) : (
            <>
              <PerformanceGrid>
                {sortedBrands.map((brand, index) => (
                  <BrandCard key={brand.id} color={BRAND_COLORS[index % BRAND_COLORS.length]}>
                    <BrandHeader>
                      <BrandName>{brand.name}</BrandName>
                      <BrandCategory>{brand.code}</BrandCategory>
                    </BrandHeader>
                    <MetricRow>
                      <MetricLabel>Revenue</MetricLabel>
                      <MetricValue>
                        {formatCurrency(brand.sales)}
                        <GrowthBadge positive={brand.growth > 0}>
                          {brand.growth > 0 ? '+' : ''}{brand.growth}%
                        </GrowthBadge>
                      </MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Stores</MetricLabel>
                      <MetricValue>{brand.stores} locations</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Avg Order</MetricLabel>
                      <MetricValue>RM {brand.avgOrder}</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Rating</MetricLabel>
                      <MetricValue>⭐ {brand.satisfaction}/5.0</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Revenue/Store</MetricLabel>
                      <MetricValue>
                        {brand.stores > 0 ? formatCurrency(Math.round(brand.sales / brand.stores)) : 'N/A'}
                      </MetricValue>
                    </MetricRow>
                  </BrandCard>
                ))}
              </PerformanceGrid>

              <RankingSection>
                <SectionTitle>Performance Ranking</SectionTitle>
                {sortedBrands.slice(0, 5).map((brand, index) => (
                  <RankingItem key={brand.id}>
                    <RankNumber rank={index + 1}>{index + 1}</RankNumber>
                    <RankInfo>
                      <RankBrand>{brand.name}</RankBrand>
                      <RankStats>
                        <RankStat>💰 {formatCurrency(brand.sales)}</RankStat>
                        <RankStat>📈 {brand.growth > 0 ? '+' : ''}{brand.growth}%</RankStat>
                        <RankStat>🏪 {brand.stores} stores</RankStat>
                        <RankStat>⭐ {brand.satisfaction}</RankStat>
                      </RankStats>
                    </RankInfo>
                  </RankingItem>
                ))}
              </RankingSection>
            </>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandPerformance;
