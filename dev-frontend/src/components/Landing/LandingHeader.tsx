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
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 18px;
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

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
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
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 14px 16px;
  border-radius: 8px;
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

const SecondaryButton = styled.button`
  background: transparent;
  color: #6B7C93;
  border: 1px solid #E6EBF1;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.2s;
  margin-left: 8px;

  &:hover {
    color: #0A2540;
    border-color: #0A2540;
  }
`;

const MobileLoginButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 8px;
  transition: all 0.2s;
  text-align: center;
  margin-top: 8px;

  &:hover {
    background: #5A51E6;
  }
`;

const MobileSecondaryButton = styled.button`
  background: transparent;
  color: #6B7C93;
  border: 1px solid #E6EBF1;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 8px;
  transition: all 0.2s;
  text-align: center;
  margin-top: 8px;

  &:hover {
    color: #0A2540;
    border-color: #0A2540;
  }
`;

interface LandingHeaderProps {
  logo?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ logo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

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
          <LogoText>PurpleHere</LogoText>
        </LogoSection>

        <Nav>
          <NavLink active={isActive('/about')} onClick={() => handleNavigate('/about')}>
            About
          </NavLink>
          <NavLink active={isActive('/pricing')} onClick={() => handleNavigate('/pricing')}>
            Pricing
          </NavLink>
          <NavLink active={isActive('/demo')} onClick={() => handleNavigate('/demo')}>
            Demo
          </NavLink>
          <NavLink active={isActive('/contact')} onClick={() => handleNavigate('/contact')}>
            Contact
          </NavLink>
          {user ? (
            <>
              <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
              <LoginButton onClick={() => handleNavigate('/pos')}>POS System</LoginButton>
            </>
          ) : (
            <LoginButton onClick={() => handleNavigate('/login')}>Login</LoginButton>
          )}
        </Nav>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Header>

      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLink active={isActive('/about')} onClick={() => handleNavigate('/about')}>
          About
        </MobileNavLink>
        <MobileNavLink active={isActive('/pricing')} onClick={() => handleNavigate('/pricing')}>
          Pricing
        </MobileNavLink>
        <MobileNavLink active={isActive('/demo')} onClick={() => handleNavigate('/demo')}>
          Demo
        </MobileNavLink>
        <MobileNavLink active={isActive('/contact')} onClick={() => handleNavigate('/contact')}>
          Contact
        </MobileNavLink>
        {user ? (
          <>
            <MobileSecondaryButton onClick={handleLogout}>Logout</MobileSecondaryButton>
            <MobileLoginButton onClick={() => handleNavigate('/pos')}>POS System</MobileLoginButton>
          </>
        ) : (
          <MobileLoginButton onClick={() => handleNavigate('/login')}>Login</MobileLoginButton>
        )}
      </MobileMenu>
    </>
  );
};

export default LandingHeader;
