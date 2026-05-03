import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import ReferralAuthLayout from '../../components/Referral/ReferralAuthLayout';

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(10, 37, 64, 0.06);
  border: 1px solid #E6EBF1;

  @media (max-width: 480px) {
    padding: 28px 22px;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 6px;
`;

const Sub = styled.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 0 14px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Submit = styled.button`
  width: 100%;
  box-sizing: border-box;
  height: 46px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 4px;

  &:hover:not(:disabled) { background: #5A51E6; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Error = styled.div`
  font-size: 13px;
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  margin-top: 22px;
  font-size: 13px;
  color: #6B7C93;
  text-align: center;
  line-height: 1.8;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
  }
  a:hover { text-decoration: underline; }
`;

const ReferralLoginPage: React.FC = () => {
  const { t } = useTranslation('referrals');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Already authenticated → straight to dashboard (POS users are also welcome)
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/referral/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError(t('login.error.required', 'Please enter your email and password.'));
      return;
    }
    setLoading(true);
    try {
      const ok = await login(email.trim(), password);
      if (!ok) {
        setError(t('login.error.invalid', 'Invalid email or password.'));
      } else {
        const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
        navigate(from && from.startsWith('/referral') ? from : '/referral/dashboard', { replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : t('login.error.failed', 'Login failed.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReferralAuthLayout
      topRight={<>{t('login.topRight', 'New here?')} <Link to="/referral/signup">{t('login.topRightLink', 'Sign up')}</Link></>}
    >
      <Card>
        <Title>{t('login.title', 'Welcome back')}</Title>
        <Sub>{t('login.subtitle', 'Log in to track your referrals and payouts.')}</Sub>
        {error && <Error>{error}</Error>}
        <form onSubmit={onSubmit} noValidate>
          <Field>
            <Label htmlFor="email">{t('login.field.email', 'Email')}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="password">{t('login.field.password', 'Password')}</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Field>
          <Submit type="submit" disabled={loading}>
            {loading ? t('login.submitting', 'Signing in…') : t('login.submit', 'Log in')}
          </Submit>
        </form>
        <Footer>
          <Link to="/referral/signup">{t('login.footer.noAccount', "Don't have an account? Sign up")}</Link><br />
          <Link to="/pos">{t('login.footer.posLogin', 'Looking for POS? Go to POS Login →')}</Link>
        </Footer>
      </Card>
    </ReferralAuthLayout>
  );
};

export default ReferralLoginPage;
