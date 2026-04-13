import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSelector } from '../../components/Common';
import { useTranslation } from 'react-i18next';

// Demo accounts (always visible)
const DEMO_ACCOUNTS = [
  {
    role: 'Brand General',
    email: 'demo-brand@purplehere.com',
    password: 'Demo@2024',
    description: 'Manage multiple brands and restaurants from a single dashboard',
    color: '#059669'
  },
  {
    role: 'Restaurant Admin',
    email: 'demo-restaurant@purplehere.com',
    password: 'Demo@2024',
    description: 'Full restaurant management experience with all features',
    color: '#0891B2'
  }
];

// Test accounts (hidden by default)
const TEST_ACCOUNTS = [
  {
    role: 'Brand General',
    email: 'brand_general@orderhere.center',
    password: 'Test1234',
    description: 'Brand General Manager (Multi-Brand Management)',
    color: '#DC2626'
  },
  {
    role: 'Foodcourt General',
    email: 'foodcourt_general@orderhere.center',
    password: 'Test1234',
    description: 'Foodcourt General Manager (Overall Foodcourt Management)',
    color: '#EA580C'
  },
  {
    role: 'Restaurant Owner',
    email: 'owner@purplehere.com',
    password: 'Test1234',
    description: 'Restaurant Owner (Multi-Restaurant Financial Dashboard)',
    color: '#7C3AED'
  },
  {
    role: 'Restaurant Admin',
    email: 'admin@kdine.com',
    password: 'Restaurant1',
    description: 'K-DINE Restaurant Admin (300+ orders for testing)',
    color: '#0891B2'
  },
  {
    role: 'Staff',
    email: 'staff@kdine.com',
    password: 'Staff1234',
    description: 'Test Restaurant Updated - Staff (INACTIVE)',
    color: '#65A30D'
  }
];

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LanguageBar = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
  z-index: 10;
`;

const LoginBox = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1200px;
  display: flex;
  overflow: hidden;
  
  @media (max-width: 968px) {
    flex-direction: column;
    max-width: 500px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 60px;
  
  @media (max-width: 968px) {
    padding: 40px 30px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  background: #F8FAFC;
  padding: 60px;
  border-left: 1px solid #E6EBF1;
  
  @media (max-width: 968px) {
    padding: 40px 30px;
    border-left: none;
    border-top: 1px solid #E6EBF1;
  }
`;


const LogoImage = styled.img`
  max-width: 200px;
  max-height: 80px;
  object-fit: contain;
  object-position: left center;
  margin-bottom: 24px;
  display: block;
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
  
  &:hover {
    background: #5A51E6;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 91, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #FEE2E2;
`;

const TestAccountsTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;
`;

const TestAccountCard = styled.div<{ color: string }>`
  background: white;
  border: 2px solid #E6EBF1;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.color};
  }
  
  &:hover {
    border-color: ${props => props.color};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
  }
`;

const AccountRole = styled.div<{ color: string }>`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.color};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AccountInfo = styled.div`
  display: flex;
  gap: 20px;
  margin: 8px 0;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const AccountCredential = styled.div`
  font-size: 13px;
  color: #374151;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`;

const AccountDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #E6EBF1;
  margin: 30px 0;
`;

const QuickLoginHint = styled.div`
  background: #EFF6FF;
  border: 1px solid #DBEAFE;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: #1E40AF;
  margin-bottom: 20px;

  strong {
    font-weight: 600;
  }
`;

const DemoAccountsSection = styled.div`
  margin-bottom: 30px;
`;

const DemoTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🎯';
    font-size: 20px;
  }
`;

const DemoCard = styled.div<{ color: string }>`
  background: white;
  border: 2px solid ${props => props.color};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.color};
  }

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const TestAccountsToggle = styled.button`
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  cursor: pointer;
  transition: all 0.2s;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: #9CA3AF;
    background: #F9FAFB;
  }

  span {
    font-size: 10px;
    background: #F3F4F6;
    padding: 2px 8px;
    border-radius: 4px;
    color: #6B7280;
  }
`;

const TestAccountsSection = styled.div<{ show: boolean }>`
  max-height: ${props => props.show ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  opacity: ${props => props.show ? '1' : '0'};
  transition: opacity 0.3s ease-in-out, max-height 0.3s ease-in-out;
`;

const BottomLinks = styled.div`
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: #6B7C93;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #9CA3AF !important;
  font-size: 13px;
  font-weight: 400 !important;

  &:hover {
    color: #6B7C93 !important;
    text-decoration: none !important;
  }

  svg {
    flex-shrink: 0;
  }
`;

const LoginPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendingVerification, setResendingVerification] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const brandLogo = '/uploads/logos/brand-logo.png';
  const [showPassword, setShowPassword] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      // Check if there's a redirect path from location state
      const from = (location.state as any)?.from?.pathname;

      const fullScreenPages = ['/pos-terminal', '/kitchen', '/display', '/checkout-display'];
      const isFullScreen = from && fullScreenPages.some(p => from.includes(p));
      const isValidPath = from && from.startsWith('/') && !from.startsWith('//') && !from.includes('javascript:') // eslint-disable-line no-script-url -- security validation;
      if (isValidPath && from !== '/pos' && !isFullScreen) {
        // Redirect to the originally requested page
        navigate(from, { replace: true });
      } else {
        // Redirect to role-specific dashboard
        switch (user.role) {
          case 'System Admin':
            navigate('/pos/admin/dashboard', { replace: true });
            break;
          case 'Foodcourt General':
            navigate('/pos/foodcourt/general/dashboard', { replace: true });
            break;
          case 'Brand General':
            navigate('/pos/brand/general/dashboard', { replace: true });
            break;
          case 'Foodcourt Manager':
            navigate('/pos/foodcourt/dashboard', { replace: true });
            break;
          case 'Brand Manager':
            navigate('/pos/brand/dashboard', { replace: true });
            break;
          case 'Restaurant Admin':
            // Use user's restaurantId for the dashboard URL
            if (user.restaurantId) {
              navigate(`/restaurant/${user.restaurantId}/dashboard`, { replace: true });
            } else {
              navigate('/pos/restaurant/dashboard', { replace: true });
            }
            break;
          case 'Restaurant Owner':
            navigate('/pos/owner/dashboard', { replace: true });
            break;
          case 'Staff':
            if (user.restaurantId) {
              navigate(`/restaurant/${user.restaurantId}/dashboard`, { replace: true });
            } else {
              navigate('/pos/basic', { replace: true });
            }
            break;
          default:
            navigate('/pos/basic', { replace: true });
        }
      }
    }
  }, [authLoading, isAuthenticated, user, navigate, location]);

  const handleQuickLogin = (account: typeof DEMO_ACCOUNTS[0] | typeof TEST_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailNotVerified(false);
    setResendMessage('');
    setIsLoading(true);

    try {
      // Attempt login through real database
      const loginSuccess = await login(email, password);

      if (loginSuccess) {
        // User state is already set by AuthContext from server response
        // The useEffect above will handle navigation automatically
      } else {
        setError('Invalid email/username or password');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error?.code === 'EMAIL_NOT_VERIFIED') {
        setEmailNotVerified(true);
        setUnverifiedEmail(error.email || email);
      } else {
        setError(error?.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LanguageBar>
        <LanguageSelector />
      </LanguageBar>
      <LoginBox>
        <LeftSection>
          {brandLogo && (
            <LogoImage src={brandLogo} alt="Brand Logo" />
          )}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>{t('auth:loginPage.emailOrUsername')}</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>{t('auth:loginPage.password')}</Label>
              <PasswordWrapper>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </PasswordToggle>
              </PasswordWrapper>
            </InputGroup>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {emailNotVerified && (
              <div style={{ padding: '14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#92400E', fontWeight: 500 }}>
                  Please verify your email address
                </p>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#92400E' }}>
                  Check your inbox ({unverifiedEmail}) for the verification link.
                </p>
                {resendMessage && (
                  <p style={{ margin: '0 0 8px', fontSize: '13px', color: resendMessage.includes('sent') ? '#059669' : '#DC2626' }}>
                    {resendMessage}
                  </p>
                )}
                <button
                  type="button"
                  disabled={resendingVerification}
                  onClick={async () => {
                    setResendingVerification(true);
                    setResendMessage('');
                    try {
                      const response = await fetch('/api/auth/resend-verification', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: unverifiedEmail })
                      });
                      const data = await response.json();
                      if (response.ok) {
                        setResendMessage('Verification email sent. Please check your inbox.');
                      } else {
                        setResendMessage(data?.error?.message || data?.message || 'Failed to send. Please try again.');
                      }
                    } catch {
                      setResendMessage('Failed to send. Please try again.');
                    }
                    setResendingVerification(false);
                  }}
                  style={{
                    padding: '8px 16px', fontSize: '13px', fontWeight: 500,
                    border: '1px solid #D97706', borderRadius: '6px',
                    background: '#FEF3C7', color: '#92400E', cursor: 'pointer'
                  }}
                >
                  {resendingVerification ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>
          
          <Divider />

          <BottomLinks>
            <Link to="/forgot-password" className="forgot-link">{t('auth:loginPage.forgotYourPassword')}</Link>
            <span>{t('auth:loginPage.dontHaveAnAccount')}<Link to="/signup">{t('auth:loginPage.signUp')}</Link></span>
            <HomeLink to="/">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Home
            </HomeLink>
          </BottomLinks>
        </LeftSection>
        
        <RightSection>
          <TestAccountsTitle>{t('auth:loginPage.availableAccounts')}</TestAccountsTitle>

          <QuickLoginHint>
            <strong>Quick Login:</strong> Click any account card below to auto-fill credentials
          </QuickLoginHint>

          <DemoAccountsSection>
            <DemoTitle>{t('auth:loginPage.demoAccounts')}</DemoTitle>
            {DEMO_ACCOUNTS.map((account) => (
              <DemoCard
                key={account.email}
                color={account.color}
                onClick={() => handleQuickLogin(account)}
              >
                <AccountRole color={account.color}>
                  {account.role}
                </AccountRole>
                <AccountInfo>
                  <AccountCredential>
                    <strong>Email:</strong> {account.email}
                  </AccountCredential>
                  <AccountCredential>
                    <strong>Pass:</strong> {account.password}
                  </AccountCredential>
                </AccountInfo>
                <AccountDescription>
                  {account.description}
                </AccountDescription>
              </DemoCard>
            ))}
          </DemoAccountsSection>

          <TestAccountsToggle onClick={() => setShowTestAccounts(!showTestAccounts)}>
            {showTestAccounts ? '▲' : '▼'} <span>{t('auth:loginPage.test')}</span> Test Accounts
          </TestAccountsToggle>

          <TestAccountsSection show={showTestAccounts}>
            {TEST_ACCOUNTS.map((account) => (
              <TestAccountCard
                key={account.email}
                color={account.color}
                onClick={() => handleQuickLogin(account)}
              >
                <AccountRole color={account.color}>
                  {account.role}
                </AccountRole>
                <AccountInfo>
                  <AccountCredential>
                    <strong>Email:</strong> {account.email}
                  </AccountCredential>
                  <AccountCredential>
                    <strong>Pass:</strong> {account.password}
                  </AccountCredential>
                </AccountInfo>
                <AccountDescription>
                  {account.description}
                </AccountDescription>
              </TestAccountCard>
            ))}
          </TestAccountsSection>

          <Divider />

          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
            <p><strong>Note:</strong> Using real database authentication.</p>
            <p>Demo accounts are reset daily at midnight (GMT+8).</p>
          </div>
        </RightSection>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;