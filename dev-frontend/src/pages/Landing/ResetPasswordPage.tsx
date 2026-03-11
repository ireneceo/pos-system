import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { LandingLayout } from '../../components/Landing';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Invalid link state
  if (!token || !email) {
    return (
      <LandingLayout>
        <Helmet><title>Reset Password - PurpleHere</title></Helmet>
        <HeroSection>
          <HeroTitle>Reset Your Password</HeroTitle>
        </HeroSection>
        <ContentSection>
          <Card>
            <ErrorIcon>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </ErrorIcon>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or incomplete. Please request a new one.
            </CardDescription>
            <CenterLink to="/forgot-password">Request New Reset Link</CenterLink>
          </Card>
        </ContentSection>
      </LandingLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter a new password');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and number');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LandingLayout>
      <Helmet><title>Reset Password - PurpleHere</title></Helmet>

      <HeroSection>
        <HeroTitle>Reset Your Password</HeroTitle>
        <HeroSubtitle>Create a new password for your account</HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <Card>
          {isSuccess ? (
            <SuccessState>
              <SuccessIcon>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </SuccessIcon>
              <SuccessTitle>Password Reset Complete</SuccessTitle>
              <SuccessDescription>
                Your password has been updated successfully. You can now sign in with your new password.
              </SuccessDescription>
              <CenterLink to="/pos">Sign In</CenterLink>
            </SuccessState>
          ) : (
            <>
              <CardIcon>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </CardIcon>
              <CardTitle>Create new password</CardTitle>
              <CardDescription>
                Enter a new password for <strong>{email}</strong>
              </CardDescription>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>New Password</FormLabel>
                  <PasswordWrapper>
                    <FormInput
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 8 chars, upper, lower, number"
                      autoFocus
                    />
                    <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </PasswordToggle>
                  </PasswordWrapper>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormInput
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                  />
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </SubmitButton>
              </Form>

              <BackLink>
                <Link to="/pos">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back to Sign In
                </Link>
              </BackLink>
            </>
          )}
        </Card>
      </ContentSection>
    </LandingLayout>
  );
};

// ─── Styled Components ─────────────────────────────────────────

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  @media (max-width: 768px) { font-size: 26px; }
`;

const HeroSubtitle = styled.p`
  font-size: 15px;
  opacity: 0.9;
  margin: 6px 0 0;
`;

const ContentSection = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #E6EBF1;
  @media (max-width: 640px) { padding: 28px 24px; }
`;

const CardIcon = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorIcon = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0 0 24px;
  text-align: center;
  strong { color: #0A2540; }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div``;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  color: #0A2540;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6B7C93;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  &:hover { color: #635BFF; }
`;

const SubmitButton = styled.button`
  padding: 13px 24px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const BackLink = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #6B7C93;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    &:hover { color: #635BFF; }
  }
`;

const CenterLink = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  &:hover { background: #5A51E6; }
`;

// ─── Success State ──────────────────────────────────────────────

const SuccessState = styled.div`
  text-align: center;
`;

const SuccessIcon = styled.div`
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px;
`;

const SuccessDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0 0 24px;
`;

export default ResetPasswordPage;
