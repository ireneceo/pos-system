import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useCustomer } from '../../contexts/CustomerContext';
import { useMobileOrder } from '../contexts/MobileOrderContext';

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: 10;

  &:active {
    background: #F3F4F6;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #374151;
  }
`;

const Header = styled.div`
  text-align: center;
  margin: 60px 0 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0;
`;

const Form = styled.form`
  flex: 1;
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
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
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
    color: #9CA3AF;
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
  margin-bottom: 24px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #635BFF;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: auto;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E5E7EB;
  }

  span {
    padding: 0 16px;
    color: #9CA3AF;
    font-size: 14px;
  }
`;

const RegisterLink = styled.button`
  width: 100%;
  padding: 16px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { loginCustomer } = useCustomer();
  const { currentStore, setCurrentStore } = useMobileOrder();

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
                openingHours: result.data.opening_hours || {}
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

    if (!phone) {
      showAlert('error', 'Error', 'Please enter your phone number');
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
        body: JSON.stringify({ phone, password })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Login successful
        loginCustomer(result.data);
        showAlert('success', 'Welcome!', `Welcome back, ${result.data.name}!`);
        setTimeout(() => {
          navigate(`/mobile/${slug}/account`);
        }, 1500);
      } else {
        showAlert('error', 'Login Failed', result.message || 'Invalid phone number or password');
      }
    } catch (error) {
      showAlert('error', 'Error', 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(`/mobile/${slug}/account`)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </BackButton>

      <Header>
        <Title>Welcome Back</Title>
        <Subtitle>Login to your account</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Phone Number</InputLabel>
          <Input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
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

      <MobileAlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
      />
    </Container>
  );
};

export default LoginPage;
