import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
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
`;

const PerformanceChip = styled.span<{ level: 'excellent' | 'good' | 'average' | 'poor' }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.level) {
      case 'excellent':
        return 'background: #DCFCE7; color: #166534;';
      case 'good':
        return 'background: #DBEAFE; color: #1E40AF;';
      case 'average':
        return 'background: #FEF3C7; color: #92400E;';
      case 'poor':
        return 'background: #FEE2E2; color: #991B1B;';
      default:
        return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

interface StatsData {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface PerformerData {
  id: string;
  name: string;
  sales: number;
  occupancy: number;
  satisfaction: number;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

const FoodcourtStats: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [stats, setStats] = useState<StatsData[]>([]);
  const [performers, setPerformers] = useState<PerformerData[]>([]);

  useEffect(() => {
    // TODO: Implement API call to fetch foodcourt statistics
    setStats([]);
    setPerformers([]);
  }, [selectedPeriod, selectedLocation]);

  const getPerformanceText = (level: string) => {
    switch (level) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'average': return 'Average';
      case 'poor': return 'Needs Improvement';
      default: return level;
    }
  };

  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>Foodcourt Statistics & Analytics</Title>
            <Subtitle>Performance metrics and trend analysis for entire foodcourt network</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline">Export Report</ThemedButton>
            <ThemedButton variant="primary">Refresh Data</ThemedButton>
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
                <Label>Location Selection</Label>
                <Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="all">All Locations</option>
                  <option value="seoul">Seoul</option>
                  <option value="busan">Busan</option>
                  <option value="daegu">Daegu</option>
                  <option value="incheon">Incheon</option>
                </Select>
              </FilterGroup>
              <FilterGroup>
                <Label>&nbsp;</Label>
                <ThemedButton variant="primary">Apply Filters</ThemedButton>
              </FilterGroup>
            </FilterGrid>
          </FilterSection>

          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
                <StatTrend trend={stat.positive ? "up" : "down"}>
                  {stat.positive ? "+" : ""}{stat.change}
                </StatTrend>
              </StatCard>
            ))}
          </StatsGrid>

          <ChartSection>
            <ChartTitle>Monthly Revenue and Occupancy Trends</ChartTitle>
            <ChartPlaceholder>
              📊 Revenue and Occupancy Trend Chart (Development Planned)<br/>
              Data visualization using Chart.js or Recharts
            </ChartPlaceholder>
          </ChartSection>

          <TableSection>
            <ChartTitle>Performance Ranking by Foodcourt</ChartTitle>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Foodcourt Name</TableHeader>
                  <TableHeader>Monthly Revenue</TableHeader>
                  <TableHeader>Occupancy Rate</TableHeader>
                  <TableHeader>Satisfaction</TableHeader>
                  <TableHeader>Performance Grade</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {performers.map((performer, index) => (
                  <TableRow key={performer.id}>
                    <TableCell>
                      <strong>#{index + 1}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{performer.name}</strong>
                    </TableCell>
                    <TableCell>
                      RM {(performer.sales / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell>
                      {performer.occupancy}%
                    </TableCell>
                    <TableCell>
                      {performer.satisfaction}/5.0
                    </TableCell>
                    <TableCell>
                      <PerformanceChip level={performer.performance}>
                        {getPerformanceText(performer.performance)}
                      </PerformanceChip>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableSection>
        </Content>
      </Container>
    </>
  );
};

export default FoodcourtStats;