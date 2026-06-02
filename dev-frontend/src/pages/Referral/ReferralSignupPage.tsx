import React, { useEffect, useMemo, useState } from 'react';
import { getCurrencySymbol } from '../../utils/currency';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReferralAuthLayout from '../../components/Referral/ReferralAuthLayout';

// ─── Required indicator ───────────────────────────────────────
const Req = styled.span`
  color: #DC2626;
  margin-left: 2px;
  font-weight: 700;
`;

// ─── Inline field error ───────────────────────────────────────
const FieldErr = styled.div`
  font-size: 12px;
  color: #DC2626;
  margin-top: 4px;
`;

// ─── Password strength + checklist ────────────────────────────
const PwMeterWrap = styled.div`
  margin-top: 8px;
`;
const PwMeterBars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
`;
const PwMeterBar = styled.div<{ $filled: boolean; $score: number }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${({ $filled, $score }) => {
    if (!$filled) return '#C7CED6';
    if ($score <= 1) return '#DC2626';
    if ($score === 2) return '#F59E0B';
    if ($score === 3) return '#10B981';
    return '#059669';
  }};
  transition: background 0.2s;
`;
const PwReqList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 12px;
`;
const PwReqItem = styled.li<{ $met: boolean }>`
  font-size: 11.5px;
  color: ${({ $met }) => ($met ? '#059669' : '#6B7280')};
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: ${({ $met }) => ($met ? '"✓"' : '"○"')};
    font-weight: 700;
    font-size: 11px;
  }
`;
const MatchInd = styled.div<{ $match: boolean }>`
  font-size: 12px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ $match }) => ($match ? '#059669' : '#DC2626')};
  &::before {
    content: ${({ $match }) => ($match ? '"✓"' : '"✗"')};
    font-weight: 700;
  }
`;

interface PlanOption {
  id: number;
  display_name: string;
  base_price_monthly: number;
  base_price_annual: number | null;
  currency?: string;
}

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 36px;
  width: 100%;
  max-width: 920px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  border: 1px solid #C7CED6;
  box-shadow: 0 8px 24px rgba(10, 37, 64, 0.06);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 28px 22px;
    gap: 28px;
    max-width: 480px;
  }
`;

const Section = styled.div``;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 6px;
`;

const Sub = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 0 0 24px;
`;

const Field = styled.div`
  margin-bottom: 14px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 0 14px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#DC2626' : '#C7CED6')};
  border-radius: 8px;
  outline: none;
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#DC2626' : '#635BFF')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(220, 38, 38, 0.10)' : 'rgba(99, 91, 255, 0.10)')};
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
  margin-top: 6px;
  transition: background 0.15s;

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

const Notice = styled.div`
  font-size: 13px;
  color: #166534;
  background: #ECFDF5;
  border: 1px solid #BBF7D0;
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const Footer = styled.div`
  margin-top: 18px;
  font-size: 13px;
  color: #4B5563;
  line-height: 1.8;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
  }
  a:hover { text-decoration: underline; }
`;

const Sim = styled.div`
  background: linear-gradient(180deg, #F1F0FF 0%, #FFFFFF 100%);
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
`;

const SimTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px;
`;

const SimRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  gap: 12px;
`;

const Select = styled.select`
  height: 38px;
  padding: 0 12px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  outline: none;
  min-width: 160px;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const StepBtn = styled.button`
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  font-size: 16px;
  color: #0A2540;
  cursor: pointer;
  &:hover { background: #F5F7FA; }
  &:disabled { color: #C9CFD9; cursor: not-allowed; }
`;

const StepValue = styled.div`
  min-width: 48px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #0A2540;
  border-left: 1px solid #C7CED6;
  border-right: 1px solid #C7CED6;
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SimResult = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  border: 1px solid #C7CED6;
`;

const Big = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #635BFF;
  letter-spacing: -0.5px;
`;

const Small = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 2px;
`;

const Bullet = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.5;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #635BFF;
    margin-top: 7px;
    flex-shrink: 0;
  }
`;

function formatMoney(amount: number, currency: string) {
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${getCurrencySymbol(currency)} ${Math.round(amount).toLocaleString()}`;
  }
  return `${getCurrencySymbol(currency)} ${amount.toFixed(2)}`;
}

const ReferralSignupPage: React.FC = () => {
  const { t } = useTranslation(['referrals', 'landing']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralFromUrl = searchParams.get('ref') || '';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [referralCode, setReferralCode] = useState(referralFromUrl);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // ─── Realtime password feedback ───────────────────────────
  const pwReqs = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /\d/.test(password),
  };
  const pwScore = Object.values(pwReqs).filter(Boolean).length;
  const pwMatch = !!password && password === confirm;
  const pwMismatch = !!confirm && password !== confirm;

  const clearFieldError = (name: string) => {
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const focusField = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => el.focus({ preventScroll: true }), 250);
    }
  };

  // Simulator state
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [refCount, setRefCount] = useState(5);

  useEffect(() => {
    fetch('/api/plans')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        const raw = (Array.isArray(data) ? data : data?.data ?? []) as PlanOption[];
        if (Array.isArray(raw) && raw.length) {
          setPlans(raw);
          // Prefer the first non-zero monthly price plan as default
          const first = raw.find(p => Number(p.base_price_monthly) > 0) ?? raw[0];
          setSelectedPlanId(first.id);
        }
      })
      .catch(() => { /* simulator falls back to static numbers */ });
  }, []);

  const sim = useMemo(() => {
    const fallback: PlanOption = { id: 0, display_name: 'Professional', base_price_monthly: 89, base_price_annual: 1068, currency: 'MYR' };
    const p = plans.find(x => x.id === selectedPlanId) || fallback;
    const monthly = parseFloat(String(p.base_price_monthly)) || 0;
    const currency = p.currency || 'MYR';
    const monthlyEarn = monthly * 0.15 * refCount;
    return {
      plan: p,
      monthly,
      currency,
      monthlyEarn,
      yearlyEarn: monthlyEarn * 12
    };
  }, [plans, selectedPlanId, refCount]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const errs: Record<string, string> = {};
    let firstFocus: string | null = null;
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = t('signup.error.fullName', 'Please enter your full name.');
      firstFocus = firstFocus || 'rp-name';
    }
    if (!email.trim()) {
      errs.email = t('signup.error.email', 'Please enter your email.');
      firstFocus = firstFocus || 'rp-email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t('signup.error.emailFormat', 'Invalid email format.');
      firstFocus = firstFocus || 'rp-email';
    }
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      errs.username = t('signup.error.username', 'Username must be 3-30 characters (letters, numbers, underscore).');
      firstFocus = firstFocus || 'rp-username';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      errs.password = t('signup.error.password', 'Password must be at least 8 characters with uppercase, lowercase, and a number.');
      firstFocus = firstFocus || 'rp-password';
    }
    if (password !== confirm) {
      errs.confirm = t('signup.error.passwordMismatch', 'Passwords do not match.');
      firstFocus = firstFocus || 'rp-confirm';
    }
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      if (firstFocus) focusField(firstFocus);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/auth/referral-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          username: username.trim(),
          password,
          referral_code: referralCode.trim() || null
        })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.error?.message || body?.message || t('signup.error.signupFailed', 'Sign up failed.'));
        return;
      }
      setSuccess(t('signup.success', 'Account created. Check your inbox for the verification link, then log in.'));
      setTimeout(() => navigate('/referral/login', { replace: true }), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('signup.error.signupFailed', 'Sign up failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReferralAuthLayout
      topRight={<>{t('signup.topRight', 'Already a member?')} <Link to="/referral/login">{t('signup.topRightLink', 'Log in')}</Link></>}
    >
      <Card>
        <Section>
          <Title>{t('signup.title', 'Join the Referral Program')}</Title>
          <Sub>{t('signup.subtitle', 'Earn 15% recurring on every Purple POS subscription you bring in.')}</Sub>
          {error && <Error>{error}</Error>}
          {success && <Notice>{success}</Notice>}
          <form onSubmit={onSubmit} noValidate>
            <Field>
              <Label htmlFor="rp-name">{t('signup.field.fullName', 'Full Name')}<Req>*</Req></Label>
              <Input
                id="rp-name"
                type="text"
                value={fullName}
                onChange={e => { setFullName(e.target.value); clearFieldError('fullName'); }}
                onBlur={() => { if (!fullName.trim()) setFieldErrors(p => ({ ...p, fullName: t('signup.error.fullName', 'Please enter your full name.') })); }}
                $hasError={!!fieldErrors.fullName}
                required
              />
              {fieldErrors.fullName && <FieldErr>{fieldErrors.fullName}</FieldErr>}
            </Field>
            <Field>
              <Label htmlFor="rp-email">{t('signup.field.email', 'Email')}<Req>*</Req></Label>
              <Input
                id="rp-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); clearFieldError('email'); }}
                onBlur={() => {
                  if (!email.trim()) setFieldErrors(p => ({ ...p, email: t('signup.error.email', 'Please enter your email.') }));
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setFieldErrors(p => ({ ...p, email: t('signup.error.emailFormat', 'Invalid email format.') }));
                }}
                $hasError={!!fieldErrors.email}
                required
              />
              {fieldErrors.email && <FieldErr>{fieldErrors.email}</FieldErr>}
            </Field>
            <Field>
              <Label htmlFor="rp-username">{t('signup.field.username', 'Username')}<Req>*</Req></Label>
              <Input
                id="rp-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => { setUsername(e.target.value); clearFieldError('username'); }}
                onBlur={() => {
                  if (!username.trim()) setFieldErrors(p => ({ ...p, username: t('signup.error.username', 'Username must be 3-30 characters (letters, numbers, underscore).') }));
                  else if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) setFieldErrors(p => ({ ...p, username: t('signup.error.username', 'Username must be 3-30 characters (letters, numbers, underscore).') }));
                }}
                $hasError={!!fieldErrors.username}
                required
              />
              {fieldErrors.username && <FieldErr>{fieldErrors.username}</FieldErr>}
            </Field>
            <Field>
              <Label htmlFor="rp-password">{t('signup.field.password', 'Password')}<Req>*</Req></Label>
              <Input
                id="rp-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={e => { setPassword(e.target.value); clearFieldError('password'); }}
                $hasError={!!fieldErrors.password}
                required
              />
              {password && (
                <PwMeterWrap>
                  <PwMeterBars>
                    {[0, 1, 2, 3].map(i => (
                      <PwMeterBar key={i} $filled={pwScore > i} $score={pwScore} />
                    ))}
                  </PwMeterBars>
                  <PwReqList>
                    <PwReqItem $met={pwReqs.length}>{t('landing:signupPage.passwordReqLength')}</PwReqItem>
                    <PwReqItem $met={pwReqs.upper}>{t('landing:signupPage.passwordReqUpper')}</PwReqItem>
                    <PwReqItem $met={pwReqs.lower}>{t('landing:signupPage.passwordReqLower')}</PwReqItem>
                    <PwReqItem $met={pwReqs.digit}>{t('landing:signupPage.passwordReqDigit')}</PwReqItem>
                  </PwReqList>
                </PwMeterWrap>
              )}
              {fieldErrors.password && <FieldErr>{fieldErrors.password}</FieldErr>}
            </Field>
            <Field>
              <Label htmlFor="rp-confirm">{t('signup.field.confirmPassword', 'Confirm Password')}<Req>*</Req></Label>
              <Input
                id="rp-confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={e => { setConfirm(e.target.value); clearFieldError('confirm'); }}
                $hasError={!!fieldErrors.confirm || pwMismatch}
                required
              />
              {confirm && (
                <MatchInd $match={pwMatch}>
                  {pwMatch ? t('landing:signupPage.passwordsMatch') : t('landing:signupPage.passwordsDontMatch')}
                </MatchInd>
              )}
              {fieldErrors.confirm && <FieldErr>{fieldErrors.confirm}</FieldErr>}
            </Field>
            <Field>
              <Label htmlFor="rp-ref">{t('signup.field.referralCode', 'Referral Code (optional)')}</Label>
              <Input id="rp-ref" type="text" value={referralCode} onChange={e => setReferralCode(e.target.value.toUpperCase())} placeholder={t('signup.field.referralCodePlaceholder', 'PURPLE-XXXX')} />
            </Field>
            <Submit type="submit" disabled={loading}>
              {loading ? t('signup.submitting', 'Creating account…') : t('signup.submit', 'Create account')}
            </Submit>
          </form>
          <Footer>
            <Link to="/referral/login">{t('signup.footer.haveAccount', 'Already have an account? Log in')}</Link><br />
            <Link to="/signup">{t('signup.footer.useForPos', 'Want to use POS? Sign up here →')}</Link>
          </Footer>
        </Section>

        <Section>
          <Sim>
            <SimTitle>{t('signup.simulator.title', 'Earnings Calculator')}</SimTitle>
            <SimRow>
              <Label as="span">{t('signup.simulator.plan', 'Plan')}</Label>
              <Select
                value={selectedPlanId ?? ''}
                onChange={e => setSelectedPlanId(Number(e.target.value) || null)}
              >
                {plans.length === 0 && <option value="">Professional</option>}
                {plans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.display_name} {p.currency ? `(${getCurrencySymbol(p.currency)})` : ''}
                  </option>
                ))}
              </Select>
            </SimRow>
            <SimRow>
              <Label as="span">{t('signup.simulator.referrals', 'Referrals')}</Label>
              <Stepper>
                <StepBtn type="button" onClick={() => setRefCount(c => Math.max(0, c - 1))} disabled={refCount === 0}>−</StepBtn>
                <StepValue>{refCount}</StepValue>
                <StepBtn type="button" onClick={() => setRefCount(c => Math.min(99, c + 1))}>+</StepBtn>
              </Stepper>
            </SimRow>
            <SimResult>
              <Small>{t('signup.simulator.monthly', 'Estimated monthly earnings')}</Small>
              <Big>{formatMoney(sim.monthlyEarn, sim.currency)}</Big>
              <Small style={{ marginTop: 12 }}>{t('signup.simulator.yearly', 'Estimated yearly earnings')}</Small>
              <Big style={{ fontSize: 18 }}>{formatMoney(sim.yearlyEarn, sim.currency)}</Big>
              <Small style={{ marginTop: 10 }}>{t('signup.simulator.basis', 'Based on 15% recurring commission per referral.')}</Small>
            </SimResult>
            <div style={{ marginTop: 18 }}>
              <Bullet>{t('signup.simulator.bullet1', 'No subscription required to join')}</Bullet>
              <Bullet>{t('signup.simulator.bullet2', '15% recurring commission, paid as long as your referrals stay subscribed')}</Bullet>
              <Bullet>{t('signup.simulator.bullet3', 'Withdraw to your bank anytime above the minimum threshold')}</Bullet>
            </div>
          </Sim>
        </Section>
      </Card>
    </ReferralAuthLayout>
  );
};

export default ReferralSignupPage;
