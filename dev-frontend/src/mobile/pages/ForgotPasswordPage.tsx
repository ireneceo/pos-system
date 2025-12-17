import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useMobileOrder } from '../contexts/MobileOrderContext';

const ContentWrapper = styled.div`
  padding: 20px 0;
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
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
  text-align: center;
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
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #E5E7EB;
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
    color: #9CA3AF;
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 12px;
  background: #FEF2F2;
  border-radius: 8px;
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
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #6B7280;

  span {
    color: #635BFF;
    cursor: pointer;
    text-decoration: underline;
  }
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
  font-size: 22px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

const SuccessMessage = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { currentStore, setCurrentStore } = useMobileOrder();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/customers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), slug })
      });

      const result = await response.json();

      if (result.emailExists === false) {
        setErrorMessage('No account found with this email address.');
      } else {
        setIsEmailSent(true);
      }
    } catch (error) {
      setErrorMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 이전 페이지로 돌아가기 (브라우저 히스토리 사용)
  const handleBack = () => {
    // 이전 페이지가 같은 도메인이면 뒤로가기, 아니면 메뉴로
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/mobile/${slug}/menu`);
    }
  };

  if (isEmailSent) {
    return (
      <MobileLayout title="Password Reset" onBack={handleBack}>
        <SuccessContainer>
          <SuccessIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </SuccessIcon>

          <SuccessTitle>Check Your Email</SuccessTitle>
          <SuccessMessage>
            We've sent a password reset link to {email}.
            Please check your inbox and spam folder.
          </SuccessMessage>

          <SubmitButton onClick={handleBack}>
            Continue
          </SubmitButton>
        </SuccessContainer>

        <MobileAlertModal
          isOpen={alertModal.isOpen}
          onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
          type={alertModal.type}
          title={alertModal.title}
          message={alertModal.message}
        />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Forgot Password" onBack={handleBack}>
      <ContentWrapper>
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

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>Email Address</InputLabel>
            <Input
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Enter your email"
            />
          </InputGroup>

          {errorMessage && (
            <ErrorMessage>
              {errorMessage}
              {errorMessage.includes('No account') && (
                <>
                  {' '}
                  <span
                    onClick={() => navigate(`/mobile/${slug}/register`)}
                    style={{ color: '#635BFF', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Sign up here
                  </span>
                </>
              )}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </SubmitButton>

          <SignUpLink>
            Remember your password?{' '}
            <span onClick={() => navigate(`/mobile/${slug}/login`)}>Login</span>
          </SignUpLink>
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

export default ForgotPasswordPage;
