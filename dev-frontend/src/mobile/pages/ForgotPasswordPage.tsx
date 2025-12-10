import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileAlertModal from '../components/common/MobileAlertModal';
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

const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #635BFF;
  }
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
  line-height: 1.5;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
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

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.button`
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  color: #635BFF;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #DCFCE7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #16A34A;
  }
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

const SuccessMessage = styled.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { currentStore, setCurrentStore } = useMobileOrder();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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

    if (!email.trim()) {
      showAlert('error', 'Error', 'Please enter your email address');
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
      const response = await fetch('/api/customers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsEmailSent(true);
      } else {
        // Don't reveal if email exists or not for security
        // Always show success to prevent email enumeration
        setIsEmailSent(true);
      }
    } catch (error) {
      // Even on error, show success to prevent email enumeration
      setIsEmailSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <Container>
        <BackButton onClick={() => navigate(`/mobile/${slug}/login`)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </BackButton>

        <SuccessContainer>
          <SuccessIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </SuccessIcon>

          <SuccessTitle>Check Your Email</SuccessTitle>
          <SuccessMessage>
            If an account exists with {email}, we've sent a password reset link.
            Please check your inbox and spam folder.
          </SuccessMessage>

          <SubmitButton onClick={() => navigate(`/mobile/${slug}/login`)}>
            Back to Login
          </SubmitButton>
        </SuccessContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(`/mobile/${slug}/login`)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </BackButton>

      <Header>
        <IconCircle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </IconCircle>

        <Title>Forgot Password?</Title>
        <Subtitle>
          Enter your email address and we'll send you a link to reset your password.
        </Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Email Address</InputLabel>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </SubmitButton>

        <BackToLogin type="button" onClick={() => navigate(`/mobile/${slug}/login`)}>
          Back to Login
        </BackToLogin>
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

export default ForgotPasswordPage;
