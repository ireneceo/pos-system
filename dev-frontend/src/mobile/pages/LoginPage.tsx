import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useCustomer, Customer } from '../../contexts/CustomerContext';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import PhoneInput from '../components/common/PhoneInput';
import { setMobileToken } from '../utils/mobileApi';

const ContentWrapper = styled.div`
  padding: 20px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-align: right;
  margin-top: -12px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #635BFF;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #6B7280;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #C7CED6;
  }

  span {
    padding: 0 16px;
    color: #6B7280;
    font-size: 14px;
  }
`;

const RegisterLink = styled.button`
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid #C7CED6;
  border-radius: 10px;
  color: #1F2937;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background: #F9FAFB;
    border-color: #6B7280;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: #F1F4F8;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#1F2937' : '#4B5563'};
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { setCurrentCustomer } = useCustomer();
  const { currentStore, setCurrentStore } = useMobileOrder();

  const [loginType, setLoginType] = useState<'email' | 'phone'>('phone');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: 'error' | 'success' | 'warning' | 'info';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'info', title: '', message: '' });

  // Load restaurant data from slug on mount
  useEffect(() => {
    const loadRestaurant = async () => {
      if (!currentStore && slug) {
        try {
          const response = await fetch(`/api/restaurants/slug/${slug}`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setCurrentStore({
                id: result.data.id.toString(),
                name: result.data.name,
                slug: result.data.slug,
                description: result.data.description || '',
                logo: result.data.logo || '',
                isOpen: result.data.is_open || true,
                openingHours: result.data.opening_hours || {},
                country: result.data.country
              });
            }
          }
        } catch (error) {
          console.error('Failed to load restaurant:', error);
        }
      }
    };
    loadRestaurant();
  }, [slug, currentStore, setCurrentStore]);

  const showAlert = (type: 'error' | 'success' | 'warning' | 'info', title: string, message: string) => {
    setAlertModal({ isOpen: true, type, title, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const identifier = loginType === 'email' ? email : phone;

    if (!identifier) {
      showAlert('error', 'Error', loginType === 'email'
        ? 'Please enter your email'
        : 'Please enter your phone number');
      return;
    }
    if (!password) {
      showAlert('error', 'Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/customers/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, restaurantId: currentStore?.id })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 모바일 고객 JWT 저장 (자가서비스 API 인증용)
        if (result.data.token) {
          setMobileToken(result.data.token);
        }
        // Login successful - set customer data directly
        const customerData: Customer = {
          id: result.data.id.toString(),
          type: result.data.type as 'guest' | 'member',
          name: result.data.name,
          phone: result.data.phone,
          email: result.data.email || '',
          points: result.data.points || 0,
          totalOrders: result.data.totalOrders || 0,
          totalSpent: result.data.totalSpent || 0,
          favoriteItems: [],
          addresses: [],
          joinDate: new Date().toISOString().split('T')[0],
          loyaltyTier: result.data.loyaltyTier || 'Bronze',
          isActive: true,
          couponsAvailable: result.data.couponsAvailable || 0,
          couponsUsed: result.data.couponsUsed || 0
        };
        setCurrentCustomer(customerData);
        // 바로 account 페이지로 이동
        navigate(`/mobile/${slug}/account`);
      } else {
        showAlert('error', 'Login Failed', result.message || 'Invalid email/phone or password');
      }
    } catch (error) {
      showAlert('error', 'Error', 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/mobile/${slug}/menu`);
    }
  };

  return (
    <MobileLayout title="Login" onBack={handleBack}>
      <ContentWrapper>
        <Header>
          <Title>Welcome Back</Title>
          <Subtitle>Login to your account</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <TabContainer>
            <Tab
              type="button"
              active={loginType === 'phone'}
              onClick={() => setLoginType('phone')}
            >
              Phone
            </Tab>
            <Tab
              type="button"
              active={loginType === 'email'}
              onClick={() => setLoginType('email')}
            >
              Email
            </Tab>
          </TabContainer>

          {loginType === 'email' ? (
            <InputGroup>
              <InputLabel>Email Address</InputLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </InputGroup>
          ) : (
            <InputGroup>
              <InputLabel>Phone Number</InputLabel>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                defaultCountryCode={currentStore?.country}
                placeholder="Phone number"
              />
            </InputGroup>
          )}

          <InputGroup>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </InputGroup>

          <ForgotPassword type="button" onClick={() => navigate(`/mobile/${slug}/forgot-password`)}>
            Forgot Password?
          </ForgotPassword>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </SubmitButton>

          <Divider>
            <span>New here?</span>
          </Divider>

          <RegisterLink type="button" onClick={() => navigate(`/mobile/${slug}/register`)}>
            Create Account
          </RegisterLink>
        </Form>
      </ContentWrapper>

      <MobileAlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
      />
    </MobileLayout>
  );
};

export default LoginPage;
