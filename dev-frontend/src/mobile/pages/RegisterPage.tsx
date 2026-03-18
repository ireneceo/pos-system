import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useCustomer } from '../../contexts/CustomerContext';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import PhoneInput from '../components/common/PhoneInput';

const ContentWrapper = styled.div`
  padding: 20px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div<{ hasError?: boolean }>`
  margin-bottom: 16px;

  input, select {
    border-color: ${props => props.hasError ? '#DC2626' : '#E5E7EB'};
  }
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

const RequiredStar = styled.span`
  color: #DC2626;
  margin-left: 2px;
`;

const FieldError = styled.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
`;

const ErrorBox = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  color: #DC2626;
  font-size: 14px;

  a {
    color: #635BFF;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PasswordHint = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
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
  margin-top: 8px;

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

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
  padding: 14px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
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

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState('');

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

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    setGeneralError('');
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
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
          restaurantId: currentStore?.id
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Registration successful - auto login
        loginCustomer(result.data);
        setAlertModal({
          isOpen: true,
          type: 'success',
          title: 'Welcome!',
          message: 'Your account has been created successfully!',
          onConfirm: () => navigate(`/mobile/${slug}/account`)
        });
      } else {
        // Handle field-specific errors from backend
        if (result.field) {
          setFieldErrors({ [result.field]: result.message });
        } else {
          setGeneralError(result.message || 'Failed to create account. Please try again.');
        }
      }
    } catch (error) {
      setGeneralError('Failed to create account. Please check your connection and try again.');
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
    <MobileLayout title="Create Account" onBack={handleBack}>
      <ContentWrapper>
        <Header>
          <Title>Create Account</Title>
          <Subtitle>Join us for a better experience</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {generalError && (
            <ErrorBox>
              {generalError}
              {generalError.includes('already registered') && (
                <>
                  {' '}
                  <a href={`/mobile/${slug}/login`} onClick={(e) => { e.preventDefault(); navigate(`/mobile/${slug}/login`); }}>
                    Login here
                  </a>
                </>
              )}
            </ErrorBox>
          )}

          <InputGroup hasError={!!fieldErrors.name}>
            <InputLabel>
              Name<RequiredStar>*</RequiredStar>
            </InputLabel>
            <Input
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                clearFieldError('name');
              }}
              placeholder="Enter your name"
            />
            {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
          </InputGroup>

          <InputGroup hasError={!!fieldErrors.phone}>
            <InputLabel>
              Phone Number<RequiredStar>*</RequiredStar>
            </InputLabel>
            <PhoneInput
              value={phone}
              onChange={(value) => {
                setPhone(value);
                clearFieldError('phone');
              }}
              defaultCountryCode={currentStore?.country}
              placeholder="Phone number"
            />
            {fieldErrors.phone && <FieldError>{fieldErrors.phone}</FieldError>}
          </InputGroup>

          <InputGroup hasError={!!fieldErrors.email}>
            <InputLabel>
              Email<RequiredStar>*</RequiredStar>
            </InputLabel>
            <Input
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
              placeholder="Enter your email"
            />
            {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
          </InputGroup>

          <InputGroup hasError={!!fieldErrors.password}>
            <InputLabel>
              Password<RequiredStar>*</RequiredStar>
            </InputLabel>
            <Input
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                clearFieldError('password');
              }}
              placeholder="Create a password"
            />
            <PasswordHint>Minimum 6 characters</PasswordHint>
            {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
          </InputGroup>

          <InputGroup hasError={!!fieldErrors.confirmPassword}>
            <InputLabel>
              Confirm Password<RequiredStar>*</RequiredStar>
            </InputLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                clearFieldError('confirmPassword');
              }}
              placeholder="Confirm your password"
            />
            {fieldErrors.confirmPassword && <FieldError>{fieldErrors.confirmPassword}</FieldError>}
          </InputGroup>

          <TermsText>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </TermsText>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>

          <Divider>
            <span>Already have an account?</span>
          </Divider>

          <LoginLink type="button" onClick={() => navigate(`/mobile/${slug}/login`)}>
            Login
          </LoginLink>
        </Form>
      </ContentWrapper>

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
    </MobileLayout>
  );
};

export default RegisterPage;
