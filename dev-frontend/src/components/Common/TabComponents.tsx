import React from 'react';
import styled from 'styled-components';

// Tab Container - horizontal tabs with bottom border
const TabsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #C7CED6;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F4F8;
  }

  &::-webkit-scrollbar-thumb {
    background: #64748B;
    border-radius: 3px;
  }

  /* 태블릿(≤1024): 가로 스크롤 대신 **줄바꿈**.
     탭이 많은 화면에서 폭이 좁으면 overflow-x:auto 가 끝 탭을 감춰 "탭이 없다"고 오인하게 하고,
     터치로 밀면 화면이 좌우로 흔들린다. 2026-06-15 LiveOrders StatusTabs 에서 검증된 패턴
     (메모리 reference_tablet_responsive_audit). 데스크톱은 종전대로 한 줄. */
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    overflow-x: visible;
    row-gap: 4px;
  }
`;

// Individual Tab - underline style (text width only)
const TabButton = styled.button<{ active?: boolean }>`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#4B5563'};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? '#635BFF' : 'transparent'};
    transition: all 0.15s;
  }
`;

// Tab Badge for counts
const TabBadge = styled.span<{ variant?: 'default' | 'warning' | 'danger' }>`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch (props.variant) {
      case 'danger': return '#DC2626';
      case 'warning': return '#F59E0B';
      default: return '#C7CED6';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'danger': return 'white';
      case 'warning': return 'white';
      default: return '#4B5563';
    }
  }};
`;

// Props interfaces
interface TabsProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TabProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

interface TabBadgeProps {
  count: number;
  variant?: 'default' | 'warning' | 'danger';
  showZero?: boolean;
}

// Export as React components
export const Tabs: React.FC<TabsProps> = ({ children, className, style }) => (
  <TabsContainer className={className} style={style}>
    {children}
  </TabsContainer>
);

export const Tab: React.FC<TabProps> = ({ active, onClick, children, className }) => (
  <TabButton active={active} onClick={onClick} className={className}>
    {children}
  </TabButton>
);

export const Badge: React.FC<TabBadgeProps> = ({ count, variant = 'default', showZero = false }) => {
  if (count === 0 && !showZero) return null;
  return <TabBadge variant={variant}>{count}</TabBadge>;
};

// Export styled components for direct use if needed
export { TabsContainer, TabButton, TabBadge };
