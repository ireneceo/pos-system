import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// 공통 탭 컨테이너
export const TabContainer = styled.div`
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

// 공통 탭 버튼
export const Tab = styled.button<{ active?: boolean }>`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#4B5563'};
  background: none;
  border: none;
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

// React 컴포넌트로도 사용 가능한 탭
interface TabsProps {
  tabs: Array<{
    key: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }>;
  className?: string;
  // URL 파라미터로 탭 상태 관리 (옵션)
  useUrlParams?: boolean;
  defaultTab?: string;
  onTabChange?: (tabKey: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  className,
  useUrlParams = false,
  defaultTab,
  onTabChange
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTabKey, setActiveTabKey] = useState<string>(defaultTab || tabs[0]?.key || '');

  // URL 파라미터에서 탭 초기화
  useEffect(() => {
    if (useUrlParams) {
      const params = new URLSearchParams(location.search);
      const tabParam = params.get('tab');
      if (tabParam && tabs.some(t => t.key === tabParam)) {
        setActiveTabKey(tabParam);
      } else if (defaultTab) {
        setActiveTabKey(defaultTab);
      }
    }
  }, [location.search, useUrlParams, tabs, defaultTab]);

  const handleTabClick = (tab: typeof tabs[0]) => {
    // 커스텀 onClick이 있으면 사용
    if (tab.onClick) {
      tab.onClick();
      return;
    }

    // URL 파라미터 모드인 경우
    if (useUrlParams) {
      setActiveTabKey(tab.key);

      // URL에 탭 파라미터 업데이트
      const params = new URLSearchParams(location.search);
      params.set('tab', tab.key);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });

      // 외부 콜백 호출
      if (onTabChange) {
        onTabChange(tab.key);
      }
    }
  };

  const stripRef = useRef<HTMLDivElement>(null);
  const currentKey = useUrlParams ? activeTabKey : tabs.find(t => t.active)?.key;
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.querySelector<HTMLElement>('[data-active="true"]');
    if (!strip || !el || strip.scrollWidth <= strip.clientWidth) return;
    const l = el.offsetLeft - strip.offsetLeft;
    if (l < strip.scrollLeft) strip.scrollLeft = Math.max(0, l - 16);
    else if (l + el.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = l + el.offsetWidth - strip.clientWidth + 16;
  }, [currentKey]);

  return (
    <TabContainer className={className} ref={stripRef}>
      {tabs.map(tab => (
        <Tab
          key={tab.key}
          active={useUrlParams ? tab.key === activeTabKey : tab.active}
          data-active={(useUrlParams ? tab.key === activeTabKey : tab.active) ? 'true' : undefined}
          onClick={() => handleTabClick(tab)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default Tabs;