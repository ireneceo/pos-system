import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useMobileOrder } from '../contexts/MobileOrderContext';

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
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
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
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
  color: #1F2937;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #C7CED6;
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
    color: #6B7280;
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
  margin-top: 8px;

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #6B7280;
    cursor: not-allowed;
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
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

const SuccessMessage = styled.p`
  font-size: 15px;
  color: #4B5563;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const ErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #FEE2E2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #DC2626;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

const ErrorMessage = styled.p`
  font-size: 15px;
  color: #4B5563;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { currentStore, setCurrentStore } = useMobileOrder();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [tokenSlug, setTokenSlug] = useState<string | null>(null); // 토큰에서 받은 slug

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

  // Verify token on mount and get slug from token data
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch(`/api/customers/verify-reset-token?token=${token}`);
        const result = await response.json();
        setIsValidToken(response.ok && result.valid);
        // 토큰에서 slug 가져오기 (URL slug보다 우선)
        if (result.slug) {
          setTokenSlug(result.slug);
        }
      } catch (error) {
        setIsValidToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const showAlert = (type: 'error' | 'success' | 'warning' | 'info', title: string, message: string) => {
    setAlertModal({ isOpen: true, type, title, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      showAlert('error', 'Error', 'Please enter a new password');
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

    setIsLoading(true);

    try {
      const response = await fetch('/api/customers/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
      } else {
        showAlert('error', 'Error', result.message || 'Failed to reset password. The link may have expired.');
      }
    } catch (error) {
      showAlert('error', 'Error', 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isValidToken === null) {
    return (
      <Container>
        <Header>
          <IconCircle>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </IconCircle>
          <Title>Verifying...</Title>
          <Subtitle>Please wait while we verify your reset link.</Subtitle>
        </Header>
      </Container>
    );
  }

  // Invalid token
  if (isValidToken === false) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </ErrorIcon>

          <ErrorTitle>Invalid or Expired Link</ErrorTitle>
          <ErrorMessage>
            This password reset link is invalid or has expired.
            Please request a new one.
          </ErrorMessage>

          <SubmitButton onClick={() => navigate(`/mobile/${tokenSlug || slug}/forgot-password`)}>
            Request New Link
          </SubmitButton>
        </ErrorContainer>
      </Container>
    );
  }

  // 실제 사용할 slug (토큰에서 받은 slug 우선)
  const activeSlug = tokenSlug || slug;

  // Success state
  if (isSuccess) {
    return (
      <Container>
        <SuccessContainer>
          <SuccessIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </SuccessIcon>

          <SuccessTitle>Password Reset!</SuccessTitle>
          <SuccessMessage>
            Your password has been successfully reset.
            You can now login with your new password.
          </SuccessMessage>

          <SubmitButton onClick={() => navigate(`/mobile/${activeSlug}/login`)}>
            Login Now
          </SubmitButton>
        </SuccessContainer>
      </Container>
    );
  }

  // Reset form
  return (
    <Container>
      <Header>
        <IconCircle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </IconCircle>

        <Title>Reset Password</Title>
        <Subtitle>Enter your new password below.</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>New Password</InputLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password (min 6 characters)"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Confirm New Password</InputLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </SubmitButton>
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

export default ResetPasswordPage;
