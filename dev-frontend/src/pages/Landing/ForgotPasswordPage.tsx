import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { LandingLayout } from '../../components/Landing';
import { useTranslation } from 'react-i18next';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setIsSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <LandingLayout>
      <Helmet>
        <title>{t('landing:forgotPasswordPage.forgotPasswordPurplehere')}</title>
      </Helmet>

      <HeroSection>
        <HeroTitle>{t('landing:forgotPasswordPage.resetYourPassword')}</HeroTitle>
        <HeroSubtitle>{t('landing:forgotPasswordPage.wellSendYouALinkToResetYourPassword')}</HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <Card>
          {isSent ? (
            <SuccessState>
              <SuccessIcon>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </SuccessIcon>
              <SuccessTitle>{t('landing:forgotPasswordPage.checkYourEmail')}</SuccessTitle>
              <SuccessDescription>
                {t('landing:forgotPasswordPage.ifAnAccountExistsFor')}<strong>{email}</strong>, we've sent a password reset link.
                The link expires in 60 minutes.
              </SuccessDescription>
              <SuccessHint>
                {t('landing:forgotPasswordPage.didntReceiveTheEmailCheckYourSpamFolderO')}
              </SuccessHint>
              <ButtonRow>
                <SecondaryButton onClick={() => { setIsSent(false); setEmail(''); }}>
                  {t('landing:forgotPasswordPage.tryAnotherEmail')}
                </SecondaryButton>
                <PrimaryLink to="/pos">{t('landing:forgotPasswordPage.backToSignIn')}</PrimaryLink>
              </ButtonRow>
            </SuccessState>
          ) : (
            <>
              <CardIcon>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </CardIcon>
              <CardTitle>{t('landing:forgotPasswordPage.forgotYourPassword')}</CardTitle>
              <CardDescription>
                {t('landing:forgotPasswordPage.enterTheEmailAddressAssociatedWithYourAc')}
              </CardDescription>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>{t('landing:forgotPasswordPage.emailAddress')}</FormLabel>
                  <FormInput
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoFocus
                  />
                </FormGroup>
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </SubmitButton>
              </Form>

              <BackLink>
                <Link to="/pos">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  {t('landing:forgotPasswordPage.backToSignIn')}
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
  border: 1px solid #C7CED6;
  @media (max-width: 640px) { padding: 28px 24px; }
`;

const CardIcon = styled.div`
  text-align: center;
  margin-bottom: 20px;
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
  color: #4B5563;
  line-height: 1.5;
  margin: 0 0 24px;
  text-align: center;
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
  color: #4B5563;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #C7CED6;
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
  &::placeholder { color: #6B7280; }
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
    color: #4B5563;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    &:hover { color: #635BFF; }
  }
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
  color: #374151;
  line-height: 1.6;
  margin: 0 0 8px;

  strong { color: #0A2540; }
`;

const SuccessHint = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const SecondaryButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: white;
  color: #4B5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F1F4F8; border-color: #64748B; }
`;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  &:hover { background: #5A51E6; }
`;

export default ForgotPasswordPage;
