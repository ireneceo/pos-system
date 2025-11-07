import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

// Real database account information
const REAL_ACCOUNTS = [
  {
    role: 'System Admin',
    email: 'irene@irenewp.com',
    password: 'admin123',
    description: 'System Administrator (All Permissions)',
    color: '#DC2626'
  },
  {
    role: 'Foodcourt General',
    email: 'foodcourt_general@orderhere.center',
    password: 'test123',
    description: 'Foodcourt General Manager (Overall Foodcourt Management)',
    color: '#7C3AED'
  },
  {
    role: 'Brand General',
    email: 'brand_general@orderhere.center',
    password: 'test123',
    description: 'Brand General Manager (Overall Brand Management)',
    color: '#059669'
  },
  {
    role: 'Foodcourt Manager',
    email: 'foodcourt_manager1@orderhere.center',
    password: 'test123',
    description: 'Foodcourt Manager (Specific Foodcourt Management)',
    color: '#2563EB'
  },
  {
    role: 'Brand Manager',
    email: 'brand_manager1@orderhere.center',
    password: 'test123',
    description: 'Brand Manager (Specific Brand Management)',
    color: '#EA580C'
  },
  {
    role: 'Restaurant Admin',
    email: 'admin@kdine.com',
    password: 'restaurant123',
    description: 'Test Restaurant Updated - Restaurant Admin (INACTIVE)',
    color: '#0891B2'
  },
  {
    role: 'Staff',
    email: 'staff@kdine.com',
    password: 'staff123',
    description: 'Test Restaurant Updated - Staff (INACTIVE)',
    color: '#65A30D'
  }
];

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

const Logo = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 10px;
  
  span {
    color: #635BFF;
  }
`;

const Subtitle = styled.p`
  color: #6B7C93;
  font-size: 16px;
  margin-bottom: 40px;
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
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
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

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
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
          navigate('/pos/restaurant/dashboard', { replace: true });
          break;
        case 'Staff':
          navigate('/pos/basic', { replace: true });
          break;
        default:
          navigate('/pos/basic', { replace: true });
      }
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const handleQuickLogin = (account: typeof REAL_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginBox>
        <LeftSection>
          <Logo>
            Order<span>Here</span>
          </Logo>
          <Subtitle>Multi-tenant POS & Restaurant Management System</Subtitle>
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email or Username</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </InputGroup>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>
          
          <Divider />
          
          <div style={{ textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
            <p>POS System v2.0</p>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>
              Multi-tenant architecture with role-based access control
            </p>
          </div>
        </LeftSection>
        
        <RightSection>
          <TestAccountsTitle>Available Accounts</TestAccountsTitle>

          <QuickLoginHint>
            <strong>Quick Login:</strong> Click any account card below to auto-fill credentials
          </QuickLoginHint>

          {REAL_ACCOUNTS.map((account) => (
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
          
          <Divider />
          
          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
            <p><strong>Note:</strong> Using real database authentication.</p>
            <p>Enter the correct password for each account.</p>
          </div>
        </RightSection>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;