import React from 'react';
import styled, { css } from 'styled-components';

// 2026-11-10 전 역할 통일(설계 .claude/fable-design-20261110-ui-unify-responsive.md R3):
// 카드 수만큼 한 줄(1~6장) — 3장이 4칸 격자에 들어가 빈칸이 생기거나, 3장이 2+1 로 떨어지던 것.
// 7장 이상은 4열. 600px 미만은 2열이고 홀수면 마지막 카드가 두 칸을 차지(구멍 없음).
const statGridColumns = css`
  &:has(> :nth-child(1):last-child) { grid-template-columns: minmax(0, 1fr); }
  &:has(> :nth-child(2):last-child) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  &:has(> :nth-child(3):last-child) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  &:has(> :nth-child(5):last-child) { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  &:has(> :nth-child(6):last-child) { grid-template-columns: repeat(6, minmax(0, 1fr)); }

  /* 7장: 4열이면 끝줄 3장 + 빈칸 → 마지막 카드가 두 칸 */
  &:has(> :nth-child(7):last-child) > :last-child { grid-column: span 2; }

  @media (max-width: 1024px) {
    &:has(> :nth-child(6):last-child) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    /* 5장: 3+2 로 놓되 아랫줄 2장이 넓게(6칸 격자에서 2칸·3칸) — 3열이면 끝줄에 빈칸이 생긴다 */
    &:has(> :nth-child(5):last-child) { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    &:has(> :nth-child(5):last-child) > * { grid-column: span 2; }
    &:has(> :nth-child(5):last-child) > :nth-child(n + 4) { grid-column: span 3; }
  }

  @media (max-width: 599px) {
    &&& { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    &&& > *,
    &&&:has(> :nth-child(5):last-child) > *,
    &&&:has(> :nth-child(7):last-child) > * { grid-column: auto; }
    &&& > :last-child:nth-child(odd) { grid-column: 1 / -1; }
  }
`;

// ============================================================================
// 일반 페이지용 통계 카드 컴포넌트들 (매니저 페이지, Plans 페이지 등)
// 폰트 크기: StatValue 24px (작은 크기)
// ============================================================================

// 통계 카드 그리드
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 24px;
  }
  ${statGridColumns}
`;

// 통계 카드
export const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #C7CED6;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 12px 14px;
  }
`;

// 통계 값
export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 2px;
  }
`;

// 통계 라벨
export const StatLabel = styled.div`
  font-size: 13px;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;

  /* 2026-11-10 R3: 1024 에서 카드 4장이 한 줄(186px)이라 라벨·설명이 두 줄로 접혀 카드가 105~120px 였다 */
  @media (max-width: 1024px) {
    font-size: 11px;
    letter-spacing: 0.3px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

// 통계 설명 (선택사항)
export const StatDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;

  @media (max-width: 1024px) {
    font-size: 11px;
    margin-top: 2px;
    line-height: 1.3;
  }

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
      default: return '#4B5563';
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }
  ${statGridColumns}
`;

export const DashboardStatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 12px 14px;
    border-radius: 10px;
  }
`;

export const DashboardStatLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    font-size: 11px;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }
`;

export const DashboardStatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    font-size: 22px;
    margin-bottom: 2px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1.2;
  }
`;

export const DashboardStatDescription = styled.div`
  font-size: 13px;
  color: #4B5563;

  /* 2026-11-10 R3: 1024 에서 3~4장 한 줄이면 설명이 두 줄로 접혀 카드가 106~107px 였다 */
  @media (max-width: 1024px) {
    font-size: 11px;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    font-size: 11px;
  }
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