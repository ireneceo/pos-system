import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import PhoneInput from '../components/common/PhoneInput';

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

const InfoMessage = styled.div`
  color: #0369A1;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 12px;
  background: #E0F2FE;
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
    background: #635BFF;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;

  &:active {
    background: #F9FAFB;
    border-color: #D1D5DB;
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

const TabContainer = styled.div`
  display: flex;
  background: #F3F4F6;
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
  color: ${props => props.active ? '#1F2937' : '#6B7280'};
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
`;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { currentStore, setCurrentStore } = useMobileOrder();

  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [foundEmail, setFoundEmail] = useState(''); // 전화번호로 찾은 마스킹된 이메일
  const [sentToEmail, setSentToEmail] = useState(''); // 실제 발송된 이메일 (마스킹)

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

  const handleForgotPassword = async (e: React.FormEvent) => {
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

  // 전화번호로 이메일 찾기 (Step 1)
  const handleFindEmailByPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFoundEmail('');

    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/customers/find-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() })
      });

      const result = await response.json();

      if (result.found === false) {
        setErrorMessage('No account found with this phone number.');
      } else {
        setFoundEmail(result.maskedEmail);
      }
    } catch (error) {
      setErrorMessage('Failed to find account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 전화번호로 찾은 이메일로 비밀번호 재설정 링크 발송 (Step 2)
  const handleSendResetToFoundEmail = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/customers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), slug })
      });

      const result = await response.json();

      if (result.success) {
        setSentToEmail(foundEmail);
        setIsEmailSent(true);
      } else {
        setErrorMessage(result.message || 'Failed to send reset email.');
      }
    } catch (error) {
      setErrorMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 이전 페이지로 돌아가기 (브라우저 히스토리 사용)
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/mobile/${slug}/menu`);
    }
  };

  if (isEmailSent) {
    // 발송된 이메일 표시 (이메일로 찾기: email, 전화번호로 찾기: sentToEmail)
    const displayEmail = activeTab === 'email' ? email : sentToEmail;

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
            We've sent a password reset link to <strong>{displayEmail}</strong>.
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
          Enter your email or phone number and we'll send you a link to reset your password.
        </Subtitle>

        <TabContainer>
          <Tab
            active={activeTab === 'email'}
            onClick={() => {
              setActiveTab('email');
              setErrorMessage('');
              setFoundEmail('');
            }}
          >
            By Email
          </Tab>
          <Tab
            active={activeTab === 'phone'}
            onClick={() => {
              setActiveTab('phone');
              setErrorMessage('');
            }}
          >
            By Phone
          </Tab>
        </TabContainer>

        {activeTab === 'email' ? (
          <Form onSubmit={handleForgotPassword}>
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
              Don't know your email?{' '}
              <span onClick={() => {
                setActiveTab('phone');
                setErrorMessage('');
              }}>Use phone number</span>
            </SignUpLink>
          </Form>
        ) : (
          <Form onSubmit={handleFindEmailByPhone}>
            <InputGroup>
              <InputLabel>Phone Number</InputLabel>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                defaultCountryCode={currentStore?.country}
                placeholder="Phone number"
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

            {foundEmail && (
              <InfoMessage>
                We found your account! Reset link will be sent to: <strong>{foundEmail}</strong>
              </InfoMessage>
            )}

            {!foundEmail ? (
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Find My Account'}
              </SubmitButton>
            ) : (
              <>
                <SubmitButton
                  type="button"
                  onClick={handleSendResetToFoundEmail}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </SubmitButton>
                <SecondaryButton
                  type="button"
                  onClick={() => navigate(`/mobile/${slug}/login`)}
                >
                  Back to Login
                </SecondaryButton>
              </>
            )}

            <SignUpLink>
              Remember your email?{' '}
              <span onClick={() => {
                setActiveTab('email');
                setErrorMessage('');
                setFoundEmail('');
              }}>Use email instead</span>
            </SignUpLink>
          </Form>
        )}
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
