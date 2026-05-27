import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// 공통 탭 컨테이너
export const TabContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
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

  &::-webkit-scrollbar-thumb:hover {
    background: #64748B;
  }

  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 24px;
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

  return (
    <TabContainer className={className}>
      {tabs.map(tab => (
        <Tab
          key={tab.key}
          active={useUrlParams ? tab.key === activeTabKey : tab.active}
          onClick={() => handleTabClick(tab)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default Tabs;