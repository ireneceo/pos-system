import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LanguageSelector from '../Common/LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* z-index above any in-page banner / hero / sticky content so language
     dropdown can pop OUT of the header onto whatever the next section is. */
  z-index: 1500;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* Defence: header never overflows viewport horizontally at any size.
     overflow-x:hidden would clip the language dropdown vertically too
     (CSS spec: overflow-x:hidden forces overflow-y to be a non-visible
     value), so we use width + min-width + max-width:100vw + box-sizing. */
  overflow: visible;
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;
  min-width: 0;

  @media (max-width: 1280px) {
    padding: 12px 20px;
    gap: 12px;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 8px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  min-width: 0;
  flex-shrink: 0;

  /* Mobile: stack tagline below logo */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;

const LogoImage = styled.img`
  height: 36px;
  width: auto;

  @media (max-width: 1280px) {
    height: 28px;
  }

  @media (max-width: 768px) {
    height: 26px;
  }
`;

const LogoText = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: #6B7280;
  letter-spacing: -0.3px;
  white-space: nowrap;

  @media (max-width: 1280px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 1.2;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  /* Allow nav to shrink and clip cleanly between 1281 and 1440. */
  overflow: hidden;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  min-width: 0;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #0A2540;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 1280px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;

  @media (max-width: 1280px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 9999;
  flex-direction: column;
  padding: 0;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;

  @media (max-width: 1280px) {
    display: flex;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #C7CED6;
`;

const MobileMenuLogo = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
`;

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #4B5563;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`;

const MobileMenuContent = styled.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const NavLink = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#635BFF' : '#4B5563'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
    background: #F0F4FF;
  }

  @media (min-width: 1440px) {
    font-size: 15px;
    padding: 10px 14px;
  }
`;

const MobileNavLink = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#F0F4FF' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#635BFF' : '#0A2540'};
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  padding: 16px 12px;
  border-radius: 12px;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
    background: #F0F4FF;
  }
`;

const SignUpButton = styled.button`
  background: white;
  color: #635BFF;
  border: 2px solid #635BFF;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 8px;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #F8F7FF;
    transform: translateY(-1px);
  }

  @media (max-width: 1280px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  @media (max-width: 1280px) {
    display: none;
  }
`;

const MobileSignUpButton = styled.button`
  background: white;
  color: #635BFF;
  border: 2px solid #635BFF;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 12px;
  transition: all 0.2s;
  text-align: center;
  margin-top: 16px;

  &:hover {
    background: #F8F7FF;
  }
`;

const MobileLoginButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 12px;
  transition: all 0.2s;
  text-align: center;
  margin-top: 8px;

  &:hover {
    background: #5A51E6;
  }
`;

const MobileLanguageWrapper = styled.div`
  padding: 16px 24px 0;
  display: flex;
  justify-content: center;
`;

interface LandingHeaderProps {
  logo?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ logo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brandLogo = '/uploads/logos/brand-logo.png';

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Header>
        <LogoSection onClick={() => handleNavigate('/')}>
          {(logo || brandLogo) && <LogoImage src={logo || brandLogo} alt="Logo" />}
          <LogoText>Solving Real F&amp;B Problems</LogoText>
        </LogoSection>

        <Nav>
          <NavLink active={isActive('/about')} onClick={() => handleNavigate('/about')}>
            {t('nav.about')}
          </NavLink>
          <NavLink active={isActive('/features')} onClick={() => handleNavigate('/features')}>
            {t('nav.features')}
          </NavLink>
          <NavLink active={isActive('/pricing')} onClick={() => handleNavigate('/pricing')}>
            {t('nav.pricing')}
          </NavLink>
          <NavLink active={isActive('/faq')} onClick={() => handleNavigate('/faq')}>
            {t('nav.faq')}
          </NavLink>
          <NavLink active={isActive('/referral-program')} onClick={() => handleNavigate('/referral-program')}>
            {t('nav.referral', 'Referral')}
          </NavLink>
          <NavLink active={isActive('/blog')} onClick={() => handleNavigate('/blog')}>
            {t('nav.blog')}
          </NavLink>
          <NavLink active={isActive('/news')} onClick={() => handleNavigate('/news')}>
            {t('nav.news')}
          </NavLink>
          <NavLink active={isActive('/contact')} onClick={() => handleNavigate('/contact')}>
            {t('nav.contact')}
          </NavLink>
        </Nav>

        <HeaderRight>
          <LanguageSelector variant="globe" />
          <SignUpButton onClick={() => handleNavigate('/demo')}>
            {t('nav.tryDemo')}
          </SignUpButton>
          <LoginButton onClick={() => window.open('/pos', '_blank')}>
            {t('nav.posSystem')}
          </LoginButton>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </HeaderRight>
      </Header>

      <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <MobileMenuLogo>Menu</MobileMenuLogo>
          <MobileMenuClose onClick={() => setMobileMenuOpen(false)}>×</MobileMenuClose>
        </MobileMenuHeader>
        <MobileMenuContent>
          <MobileNavLink active={isActive('/about')} onClick={() => handleNavigate('/about')}>
            {t('nav.about')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/features')} onClick={() => handleNavigate('/features')}>
            {t('nav.features')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/pricing')} onClick={() => handleNavigate('/pricing')}>
            {t('nav.pricing')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/faq')} onClick={() => handleNavigate('/faq')}>
            {t('nav.faq')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/referral-program')} onClick={() => handleNavigate('/referral-program')}>
            {t('nav.referral', 'Referral')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/blog')} onClick={() => handleNavigate('/blog')}>
            {t('nav.blog')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/news')} onClick={() => handleNavigate('/news')}>
            {t('nav.news')}
          </MobileNavLink>
          <MobileNavLink active={isActive('/contact')} onClick={() => handleNavigate('/contact')}>
            {t('nav.contact')}
          </MobileNavLink>
          <MobileSignUpButton onClick={() => handleNavigate('/demo')}>
            {t('nav.tryDemo')}
          </MobileSignUpButton>
          <MobileLoginButton onClick={() => window.open('/pos', '_blank')}>
            POS System
          </MobileLoginButton>
        </MobileMenuContent>
      </MobileMenu>
    </>
  );
};

export default LandingHeader;
