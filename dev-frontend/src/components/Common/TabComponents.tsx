import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Tab Container - horizontal tabs with bottom border
const TabsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #C7CED6;
  /* 2026-11-10 전 역할 통일(설계 .claude/fable-design-20261110-ui-unify-responsive.md R4):
     페이지 탭은 폭과 상관없이 **한 줄**. 안 들어가면 그 줄만 가로로 민다(스크롤 막대 숨김,
     밀어도 페이지는 안 흔들림). 06-15 의 «태블릿 줄바꿈»은 폰에서 2~3줄로 접히고 밑줄이
     어긋나 바꿨다. LiveOrders 상태 탭(StatusTabs)은 따로 만든 줄이라 그대로(승인된 결정). */
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 20px;
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

// 고른 탭이 줄 밖에 있으면 그 줄만 옆으로 밀어 보이게(페이지 세로 위치는 안 건드림)
export const keepTabInView = (el: HTMLElement | null) => {
  const strip = el?.parentElement;
  if (!el || !strip || strip.scrollWidth <= strip.clientWidth) return;
  const l = el.offsetLeft - strip.offsetLeft;
  if (l < strip.scrollLeft) strip.scrollLeft = Math.max(0, l - 16);
  else if (l + el.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = l + el.offsetWidth - strip.clientWidth + 16;
};

export const Tab: React.FC<TabProps> = ({ active, onClick, children, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (active) keepTabInView(ref.current); }, [active]);
  return (
    <TabButton ref={ref} active={active} onClick={onClick} className={className}>
      {children}
    </TabButton>
  );
};

export const Badge: React.FC<TabBadgeProps> = ({ count, variant = 'default', showZero = false }) => {
  if (count === 0 && !showZero) return null;
  return <TabBadge variant={variant}>{count}</TabBadge>;
};

// Export styled components for direct use if needed
export { TabsContainer, TabButton, TabBadge };
