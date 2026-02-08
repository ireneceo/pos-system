import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 36px;
  width: auto;

  @media (max-width: 768px) {
    height: 28px;
  }
`;

const LogoText = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: #9CA3AF;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #0A2540;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
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
  color: #6B7280;
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
  color: ${props => props.active ? '#635BFF' : '#6B7C93'};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
    background: #F0F4FF;
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

const LoginButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 8px;
  transition: all 0.2s;
  margin-left: 8px;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
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
  margin-top: 16px;

  &:hover {
    background: #5A51E6;
  }
`;

interface LandingHeaderProps {
  logo?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ logo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const settings = await response.json();
          setBrandLogo(settings.brand_logo || settings.brandLogo || settings.logo || '');
        }
      } catch (error) {
        // Logo loading failed, will use text logo only
      }
    };
    loadLogo();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Header>
        <LogoSection onClick={() => handleNavigate('/')}>
          {(logo || brandLogo) && <LogoImage src={logo || brandLogo} alt="Logo" />}
          <LogoText>Everything You Need, All</LogoText>
        </LogoSection>

        <Nav>
          <NavLink active={isActive('/about')} onClick={() => handleNavigate('/about')}>
            About
          </NavLink>
          <NavLink active={isActive('/features')} onClick={() => handleNavigate('/features')}>
            Features
          </NavLink>
          <NavLink active={isActive('/pricing')} onClick={() => handleNavigate('/pricing')}>
            Pricing
          </NavLink>
          <NavLink active={isActive('/demo')} onClick={() => handleNavigate('/demo')}>
            Demo
          </NavLink>
          <NavLink active={isActive('/faq')} onClick={() => handleNavigate('/faq')}>
            FAQ
          </NavLink>
          <NavLink active={isActive('/blog')} onClick={() => handleNavigate('/blog')}>
            Blog
          </NavLink>
          <NavLink active={isActive('/contact')} onClick={() => handleNavigate('/contact')}>
            Contact
          </NavLink>
          <LoginButton onClick={() => handleNavigate(user ? '/pos' : '/login')}>
            POS System
          </LoginButton>
        </Nav>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Header>

      <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <MobileMenuLogo>Menu</MobileMenuLogo>
          <MobileMenuClose onClick={() => setMobileMenuOpen(false)}>×</MobileMenuClose>
        </MobileMenuHeader>
        <MobileMenuContent>
          <MobileNavLink active={isActive('/about')} onClick={() => handleNavigate('/about')}>
            About
          </MobileNavLink>
          <MobileNavLink active={isActive('/features')} onClick={() => handleNavigate('/features')}>
            Features
          </MobileNavLink>
          <MobileNavLink active={isActive('/pricing')} onClick={() => handleNavigate('/pricing')}>
            Pricing
          </MobileNavLink>
          <MobileNavLink active={isActive('/demo')} onClick={() => handleNavigate('/demo')}>
            Demo
          </MobileNavLink>
          <MobileNavLink active={isActive('/faq')} onClick={() => handleNavigate('/faq')}>
            FAQ
          </MobileNavLink>
          <MobileNavLink active={isActive('/blog')} onClick={() => handleNavigate('/blog')}>
            Blog
          </MobileNavLink>
          <MobileNavLink active={isActive('/contact')} onClick={() => handleNavigate('/contact')}>
            Contact
          </MobileNavLink>
          <MobileLoginButton onClick={() => handleNavigate(user ? '/pos' : '/login')}>
            POS System
          </MobileLoginButton>
        </MobileMenuContent>
      </MobileMenu>
    </>
  );
};

export default LandingHeader;
