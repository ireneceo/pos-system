import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { clearAuthToken } from '../../utils/auth';

const Shell = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Logo = styled.img`
  height: 28px;
  width: auto;
  display: block;
  cursor: pointer;

  @media (max-width: 640px) {
    height: 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;

  &.active {
    color: #635BFF;
    background: #F1F0FF;
  }

  &:hover:not(.active) {
    color: #0A2540;
    background: #F5F7FA;
  }
`;

const RightBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserBadge = styled.span`
  font-size: 13px;
  color: #6B7C93;
  font-weight: 500;

  @media (max-width: 640px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: #F5F7FA;
    color: #0A2540;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #0A2540;
  font-size: 22px;
  line-height: 1;

  @media (max-width: 640px) {
    display: inline-flex;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${p => (p.$open ? 'flex' : 'none')};
  flex-direction: column;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 8px 16px 16px;
  gap: 4px;

  @media (min-width: 641px) {
    display: none;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  @media (max-width: 640px) {
    padding: 20px 16px 48px;
  }
`;

interface Props {
  children?: React.ReactNode;
}

const ReferralLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('referrals');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearAuthToken();
    navigate('/referral/login');
  };

  const close = () => setMobileOpen(false);

  return (
    <Shell>
      <TopBar>
        <LeftBlock>
          <Logo
            src="/images/purple-referral-logo.svg"
            alt={t('layout.brand', 'Purple Referral')}
            onClick={() => navigate('/referral/dashboard')}
          />
          <Nav>
            <NavItem to="/referral/dashboard">{t('layout.nav.dashboard', 'Dashboard')}</NavItem>
            <NavItem to="/referral/wallet">{t('layout.nav.wallet', 'Wallet')}</NavItem>
            <NavItem to="/referral/profile">{t('layout.nav.profile', 'Profile')}</NavItem>
          </Nav>
        </LeftBlock>
        <RightBlock>
          <UserBadge>{user?.full_name || user?.email}</UserBadge>
          <IconButton type="button" onClick={handleLogout}>{t('layout.logOut', 'Log out')}</IconButton>
          <MobileToggle
            type="button"
            aria-label={mobileOpen ? t('layout.closeMenu', 'Close menu') : t('layout.openMenu', 'Open menu')}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? '×' : '≡'}
          </MobileToggle>
        </RightBlock>
      </TopBar>
      <MobileMenu $open={mobileOpen}>
        <NavItem to="/referral/dashboard" onClick={close}>{t('layout.nav.dashboard', 'Dashboard')}</NavItem>
        <NavItem to="/referral/wallet" onClick={close}>{t('layout.nav.wallet', 'Wallet')}</NavItem>
        <NavItem to="/referral/profile" onClick={close}>{t('layout.nav.profile', 'Profile')}</NavItem>
      </MobileMenu>
      <Main>
        {children ?? <Outlet />}
      </Main>
    </Shell>
  );
};

export default ReferralLayout;
