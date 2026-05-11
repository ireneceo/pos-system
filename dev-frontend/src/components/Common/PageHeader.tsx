import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    max-height: none;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  settingsHref?: string;       // 산업 표준 ⚙️ 단축 — 클릭 시 관련 Settings 페이지/탭으로 이동
  settingsLabel?: string;       // aria-label 및 tooltip (기본: 'Settings')
}

const SettingsIconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: #6B7280;
  text-decoration: none;
  transition: all 0.15s;
  &:hover { background: #F0EFFF; color: #635BFF; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
  svg { width: 18px; height: 18px; }
`;

// Stripe/Toast/Square 표준 ⚙️ 아이콘. 어디서든 단독 사용 가능.
export const PageSettingsLink: React.FC<{ to: string; label?: string }> = ({ to, label = 'Settings' }) => (
  <SettingsIconLink to={to} title={label} aria-label={label}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  </SettingsIconLink>
);

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children, settingsHref, settingsLabel }) => {
  return (
    <Header>
      <div>
        <HeaderTitle>{title}</HeaderTitle>
      </div>
      {(children || settingsHref) && (
        <HeaderActions>
          {children}
          {settingsHref && <PageSettingsLink to={settingsHref} label={settingsLabel} />}
        </HeaderActions>
      )}
    </Header>
  );
};

export default PageHeader;
export { Header, HeaderTitle, HeaderActions };
