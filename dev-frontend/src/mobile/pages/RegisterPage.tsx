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
  margin: 60px 0 32px;
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
  margin-bottom: 16px;
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

const RequiredStar = styled.span`
  color: #DC2626;
  margin-left: 2px;
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
  margin: 24px 0;

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

const LoginLink = styled.button`
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

const TermsText = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  text-align: center;
  margin: 16px 0 0;
  line-height: 1.5;

  a {
    color: #635BFF;
    text-decoration: none;
  }
`;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { loginCustomer } = useCustomer();
  const { currentStore, setCurrentStore } = useMobileOrder();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: 'error' | 'success' | 'warning' | 'info';
    title: string;
    message: string;
    onConfirm?: () => void;
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

  const showAlert = (type: 'error' | 'success' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => {
    setAlertModal({ isOpen: true, type, title, message, onConfirm });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      showAlert('error', 'Error', 'Please enter your name');
      return;
    }
    if (!phone.trim()) {
      showAlert('error', 'Error', 'Please enter your phone number');
      return;
    }
    if (!email.trim()) {
      showAlert('error', 'Error', 'Please enter your email address');
      return;
    }
    if (!password) {
      showAlert('error', 'Error', 'Please enter a password');
      return;
    }
    if (password.length < 6) {
      showAlert('error', 'Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('error', 'Error', 'Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('error', 'Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password,
          restaurant_id: currentStore?.id
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Registration successful - auto login
        loginCustomer(result.data);
        showAlert('success', 'Welcome!', 'Your account has been created successfully!', () => {
          navigate(`/mobile/${slug}/account`);
        });
      } else {
        // Handle specific errors
        if (result.message?.includes('phone')) {
          showAlert('error', 'Phone Already Registered', 'This phone number is already registered. Please login instead.');
        } else if (result.message?.includes('email')) {
          showAlert('error', 'Email Already Registered', 'This email address is already registered. Please login instead.');
        } else {
          showAlert('error', 'Registration Failed', result.message || 'Failed to create account. Please try again.');
        }
      }
    } catch (error) {
      showAlert('error', 'Error', 'Failed to create account. Please try again.');
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
        <Title>Create Account</Title>
        <Subtitle>Join us for a better experience</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>
            Name<RequiredStar>*</RequiredStar>
          </InputLabel>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>
            Phone Number<RequiredStar>*</RequiredStar>
          </InputLabel>
          <Input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>
            Email<RequiredStar>*</RequiredStar>
          </InputLabel>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>
            Password<RequiredStar>*</RequiredStar>
          </InputLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a password (min 6 characters)"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>
            Confirm Password<RequiredStar>*</RequiredStar>
          </InputLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </InputGroup>

        <TermsText>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </TermsText>

        <SubmitButton type="submit" disabled={isLoading} style={{ marginTop: 24 }}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </SubmitButton>

        <Divider>
          <span>Already have an account?</span>
        </Divider>

        <LoginLink type="button" onClick={() => navigate(`/mobile/${slug}/login`)}>
          Login
        </LoginLink>
      </Form>

      <MobileAlertModal
        isOpen={alertModal.isOpen}
        onClose={() => {
          setAlertModal(prev => ({ ...prev, isOpen: false }));
          if (alertModal.onConfirm) alertModal.onConfirm();
        }}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
      />
    </Container>
  );
};

export default RegisterPage;
