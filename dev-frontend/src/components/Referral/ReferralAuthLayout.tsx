import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Shell = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #F9FAFB 0%, #F1F0FF 100%);
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  @media (max-width: 640px) {
    padding: 0 16px;
    height: 56px;
  }
`;

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 28px;
    width: auto;
    display: block;

    @media (max-width: 640px) {
      height: 24px;
    }
  }
`;

const TopRight = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 13px;
  color: #4B5563;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover { text-decoration: underline; }
`;

const Body = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px 48px;
`;

interface Props {
  children: React.ReactNode;
  topRight?: React.ReactNode;
}

const ReferralAuthLayout: React.FC<Props> = ({ children, topRight }) => {
  const { t } = useTranslation('referrals');
  return (
    <Shell>
      <TopBar>
        <Logo to="/referral/login">
          <img src="/images/purple-referral-logo-v2.svg" alt={t('layout.brand', 'Purple Referral')} />
        </Logo>
        <TopRight>{topRight}</TopRight>
      </TopBar>
      <Body>{children}</Body>
    </Shell>
  );
};

export default ReferralAuthLayout;
