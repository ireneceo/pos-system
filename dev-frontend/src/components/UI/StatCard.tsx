import React from 'react';
import styled from 'styled-components';

// ============================================================================
// 일반 페이지용 통계 카드 컴포넌트들 (매니저 페이지, Plans 페이지 등)
// 폰트 크기: StatValue 24px (작은 크기)
// ============================================================================

// 통계 카드 그리드
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 24px;
  }
`;

// 통계 카드
export const StatCard = styled.div<{ color?: string }>`
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

  @media (max-width: 768px) {
    padding: 12px 14px;
  }
`;

// 통계 값
export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 2px;
  }
`;

// 통계 라벨
export const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

// 통계 설명 (선택사항)
export const StatDescription = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 10px;
    margin-top: 2px;
  }
`;

// 통계 트렌드 (선택사항)
export const StatTrend = styled.div<{ trend?: 'up' | 'down' | 'neutral' }>`
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  color: ${props => {
    switch (props.trend) {
      case 'up': return '#059669';
      case 'down': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

// ============================================================================
// 대시보드 전용 컴포넌트들 (시스템관리자, 레스토랑, 실제 대시보드 페이지)
// 폰트 크기: DashboardStatValue 32px (큰 크기)
// 사용처: AdminDashboard, RestaurantDashboard, DashboardContent만 사용
// ============================================================================

export const DashboardStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export const DashboardStatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const DashboardStatLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const DashboardStatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;

export const DashboardStatDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

// React 컴포넌트로도 사용 가능한 통계 카드
interface StatCardComponentProps {
  color?: string;
  value: string | number;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCardComponent: React.FC<StatCardComponentProps> = ({
  color,
  value,
  label,
  description,
  trend,
  trendText,
  onClick,
  className
}) => {
  return (
    <StatCard
      color={color}
      onClick={onClick}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
      {description && <StatDescription>{description}</StatDescription>}
      {trendText && <StatTrend trend={trend}>{trendText}</StatTrend>}
    </StatCard>
  );
};

// 다중 통계 카드를 표시하는 그리드 컴포넌트
interface StatsGridComponentProps {
  stats: Array<{
    color?: string;
    value: string | number;
    label: string;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendText?: string;
    onClick?: () => void;
  }>;
  className?: string;
}

export const StatsGridComponent: React.FC<StatsGridComponentProps> = ({
  stats,
  className
}) => {
  return (
    <StatsGrid className={className}>
      {stats.map((stat, index) => (
        <StatCardComponent
          key={index}
          {...stat}
        />
      ))}
    </StatsGrid>
  );
};

export default StatCardComponent;