import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { ThemedButton } from '../../components/Theme/ThemedButton';

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

const ActionBar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;


const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const ReportCard = styled.div`
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

const ReportTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
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

const TrendIndicator = styled.span<{ positive?: boolean }>`
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

const TableSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid #E6EBF1;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  &:hover {
    background: #F9FAFB;
  }
`;

const TableCell = styled.td`
  padding: 16px 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
`;

const PerformanceScore = styled.span<{ score: number }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    if (props.score >= 90) return 'background: #DCFCE7; color: #166534;';
    if (props.score >= 80) return 'background: #DBEAFE; color: #1E40AF;';
    if (props.score >= 70) return 'background: #FEF3C7; color: #92400E;';
    return 'background: #FEE2E2; color: #991B1B;';
  }}
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SummaryValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #635BFF;
  margin-bottom: 8px;
`;

const SummaryLabel = styled.div`
  font-size: 16px;
  color: #6B7280;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SummaryChange = styled.div<{ positive?: boolean }>`
  font-size: 14px;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &::before {
    content: ${props => props.positive ? '"↗"' : '"↘"'};
    font-size: 16px;
  }
`;

interface StoreReport {
  id: string;
  storeName: string;
  revenue: number;
  growth: number;
  orders: number;
  avgOrder: number;
  satisfaction: number;
  performance: number;
}

interface BrandSummary {
  totalRevenue: number;
  totalOrders: number;
  avgSatisfaction: number;
  avgPerformance: number;
  totalStores: number;
  monthlyGrowth: number;
}

const BrandReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedStore, setSelectedStore] = useState('all');
  const [storeReports, setStoreReports] = useState<StoreReport[]>([]);
  const [brandSummary, setBrandSummary] = useState<BrandSummary>({
    totalRevenue: 0,
    totalOrders: 0,
    avgSatisfaction: 0,
    avgPerformance: 0,
    totalStores: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // TODO: Implement API call to fetch store reports
        setStoreReports([]);
        setBrandSummary({
          totalRevenue: 0,
          totalOrders: 0,
          avgSatisfaction: 0,
          avgPerformance: 0,
          totalStores: 0,
          monthlyGrowth: 0
        });
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, [selectedPeriod, selectedStore]);

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Needs Improvement';
    return 'Poor';
  };

  const filteredReports = selectedStore === 'all'
    ? storeReports
    : storeReports.filter(store =>
        store.storeName.toLowerCase().includes(selectedStore.toLowerCase())
      );

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Brand Reports</Title>
            <Subtitle>Brand-specific store performance analysis and comprehensive reports</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline">Export Report</ThemedButton>
            <ThemedButton variant="primary">Generate Report</ThemedButton>
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
                <Label>Store Selection</Label>
                <Select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                  <option value="all">All Stores</option>
                  <option value="Gangnam">Gangnam Branch</option>
                  <option value="Hongdae">Hongdae Branch</option>
                  <option value="Myeongdong">Myeongdong Branch</option>
                  <option value="Jamsil">Jamsil Branch</option>
                </Select>
              </FilterGroup>
              <FilterGroup>
                <Label>&nbsp;</Label>
                <ThemedButton variant="primary">View Analysis</ThemedButton>
              </FilterGroup>
            </FilterGrid>
          </FilterSection>

          <ActionBar>
            <ThemedButton variant="primary">Download PDF</ThemedButton>
            <ThemedButton variant="outline">Export Excel</ThemedButton>
            <ThemedButton variant="outline">Send Email</ThemedButton>
            <ThemedButton variant="outline">Print Report</ThemedButton>
          </ActionBar>

          <SummaryGrid>
            <SummaryCard>
              <SummaryValue>RM {(brandSummary.totalRevenue / 1000000).toFixed(1)}M</SummaryValue>
              <SummaryLabel>Total Brand Revenue</SummaryLabel>
              <SummaryChange positive={brandSummary.monthlyGrowth > 0}>
                {brandSummary.monthlyGrowth.toFixed(1)}%
              </SummaryChange>
            </SummaryCard>
            <SummaryCard>
              <SummaryValue>{brandSummary.totalOrders.toLocaleString()}</SummaryValue>
              <SummaryLabel>Total Orders</SummaryLabel>
              <SummaryChange positive={true}>
                +12.5%
              </SummaryChange>
            </SummaryCard>
            <SummaryCard>
              <SummaryValue>{brandSummary.avgSatisfaction.toFixed(1)}</SummaryValue>
              <SummaryLabel>Average Customer Satisfaction</SummaryLabel>
              <SummaryChange positive={true}>
                +0.3 points
              </SummaryChange>
            </SummaryCard>
            <SummaryCard>
              <SummaryValue>{brandSummary.avgPerformance}</SummaryValue>
              <SummaryLabel>Average Performance Score</SummaryLabel>
              <SummaryChange positive={true}>
                +5 points
              </SummaryChange>
            </SummaryCard>
          </SummaryGrid>

          <ReportGrid>
            <ReportCard>
              <ReportTitle>매출 현황</ReportTitle>
              <MetricRow>
                <MetricLabel>이번 달 매출</MetricLabel>
                <MetricValue>
                  RM {(brandSummary.totalRevenue / 1000000).toFixed(1)}M
                  <TrendIndicator positive={brandSummary.monthlyGrowth > 0}>
                    {brandSummary.monthlyGrowth > 0 ? '+' : ''}{brandSummary.monthlyGrowth.toFixed(1)}%
                  </TrendIndicator>
                </MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>평균 객단가</MetricLabel>
                <MetricValue>RM {Math.round(brandSummary.totalRevenue / brandSummary.totalOrders).toLocaleString()}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>최고 매출 매장</MetricLabel>
                <MetricValue>{storeReports.length > 0 ? storeReports[0].storeName : 'N/A'}</MetricValue>
              </MetricRow>
            </ReportCard>

            <ReportCard>
              <ReportTitle>고객 만족도</ReportTitle>
              <MetricRow>
                <MetricLabel>전체 평균</MetricLabel>
                <MetricValue>
                  {brandSummary.avgSatisfaction.toFixed(1)}/5.0
                  <TrendIndicator positive={true}>+0.2</TrendIndicator>
                </MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>총 리뷰 수</MetricLabel>
                <MetricValue>2,847 items</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>재방문율</MetricLabel>
                <MetricValue>68.5%</MetricValue>
              </MetricRow>
            </ReportCard>

            <ReportCard>
              <ReportTitle>운영 효율성</ReportTitle>
              <MetricRow>
                <MetricLabel>Average Performance Score</MetricLabel>
                <MetricValue>
                  {brandSummary.avgPerformance} points
                  <TrendIndicator positive={true}>+5 points</TrendIndicator>
                </MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Excellent 매장</MetricLabel>
                <MetricValue>{storeReports.filter(s => s.performance >= 90).length} items</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel> items선 필요 매장</MetricLabel>
                <MetricValue>{storeReports.filter(s => s.performance < 80).length} items</MetricValue>
              </MetricRow>
            </ReportCard>

            <ReportCard>
              <ReportTitle>성장 지표</ReportTitle>
              <MetricRow>
                <MetricLabel>월 성장률</MetricLabel>
                <MetricValue>
                  {brandSummary.monthlyGrowth > 0 ? '+' : ''}{brandSummary.monthlyGrowth.toFixed(1)}%
                  <TrendIndicator positive={brandSummary.monthlyGrowth > 0}>
                    {brandSummary.monthlyGrowth > 5 ? 'Excellent' : 'Average'}
                  </TrendIndicator>
                </MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>신규 고객</MetricLabel>
                <MetricValue>1,234 customers</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>시장  points유율</MetricLabel>
                <MetricValue>15.2%</MetricValue>
              </MetricRow>
            </ReportCard>
          </ReportGrid>

          <ChartSection>
            <ChartTitle>월별 매출 및 성장률 추이</ChartTitle>
            <ChartPlaceholder>
              📊 월별 매출 추이 및 성장률 차트 ( items발 예정)<br/>
              Chart.js 또는 Recharts를 사용한 데이터 시각화
            </ChartPlaceholder>
          </ChartSection>

          <TableSection>
            <ChartTitle>매장별 상세 성과 분석</ChartTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader>순위</TableHeader>
                  <TableHeader>매장 customers</TableHeader>
                  <TableHeader>월매출</TableHeader>
                  <TableHeader>성장률</TableHeader>
                  <TableHeader>주문수</TableHeader>
                  <TableHeader>평균 객단가</TableHeader>
                  <TableHeader>고객만족도</TableHeader>
                  <TableHeader>성과  points수</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredReports
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((store, index) => (
                    <TableRow key={store.id}>
                      <TableCell>
                        <strong>#{index + 1}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{store.storeName}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>RM {(store.revenue / 1000000).toFixed(1)}M</strong>
                      </TableCell>
                      <TableCell>
                        <TrendIndicator positive={store.growth > 0}>
                          {store.growth > 0 ? '+' : ''}{store.growth.toFixed(1)}%
                        </TrendIndicator>
                      </TableCell>
                      <TableCell>{store.orders.toLocaleString()} orders</TableCell>
                      <TableCell>RM {store.avgOrder.toLocaleString()}</TableCell>
                      <TableCell>{store.satisfaction}/5.0</TableCell>
                      <TableCell>
                        <PerformanceScore score={store.performance}>
                          {store.performance} points ({getPerformanceLevel(store.performance)})
                        </PerformanceScore>
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
          </TableSection>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandReports;