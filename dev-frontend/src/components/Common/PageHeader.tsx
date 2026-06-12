import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  /* 10–11" tablets / small laptops: allow header to grow & actions to wrap */
  @media (max-width: 1180px) {
    height: auto;
    min-height: 80px;
    max-height: none;
    padding: 12px 20px;
    flex-wrap: wrap;
  }

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
    /* 2026-06-12: 좁은 화면에서 flex-shrink:0 고정 때문에 마지막 액션(⚙ 등)이
       화면 밖으로 16px 밀려 잘리던 것 — ≤768px 에서만 축소/줄바꿈 허용. */
    flex-shrink: 1;
    min-width: 0;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  settingsHref?: string;       // 산업 표준 ⚙️ 단축 — 클릭 시 관련 Settings 페이지/탭으로 이동
  settingsLabel?: string;       // aria-label 및 tooltip (기본: 'Settings')
  backHref?: string;           // 풀화면 페이지(Kitchen/Customer Display 등)에서 Dashboard 등으로 빠져나가는 단축
  backLabel?: string;          // 버튼 라벨 (기본: 'Dashboard' 또는 nav.dashboard)
}

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  padding: 6px 12px;
  color: #4B5563;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.15s;
  &:hover { background: #F0F4FF; color: #635BFF; border-color: #C7D2FE; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;

const SettingsIconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: #4B5563;
  text-decoration: none;
  transition: all 0.15s;
  &:hover { background: #F0EFFF; color: #635BFF; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
  svg { width: 18px; height: 18px; }
`;

// Stripe/Toast/Square 표준 ⚙️ 아이콘. 어디서든 단독 사용 가능.
// label 미지정 시 nav.settings 번역 키 사용 (4언어 지원).
export const PageSettingsLink: React.FC<{ to: string; label?: string }> = ({ to, label }) => {
  const { t } = useTranslation();
  const resolved = label || t('nav.settings', 'Settings');
  return (
    <SettingsIconLink to={to} title={resolved} aria-label={resolved}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </SettingsIconLink>
  );
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children, settingsHref, settingsLabel, backHref, backLabel }) => {
  const { t } = useTranslation();
  const resolvedBackLabel = backLabel || t('nav.dashboard', 'Dashboard');
  return (
    <Header>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <HeaderTitle>{title}</HeaderTitle>
        {backHref && (
          <BackButton to={backHref} title={t('common:backToDashboard', 'Back to Dashboard')}>
            ← {resolvedBackLabel}
          </BackButton>
        )}
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
