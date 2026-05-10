import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/Landing';

interface PlanOption {
  id: number;
  display_name: string;
  base_price_monthly: number;
  base_price_annual: number | null;
  currency?: string;
}

const Hero = styled.section`
  background: linear-gradient(120deg, #635BFF 0%, #8775FF 60%, #B49EFF 100%);
  color: white;
  padding: 80px 24px 88px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 56px 16px 64px;
  }
`;

const HeroBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 18px;
`;

const HeroTitle = styled.h1`
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -1px;
  margin: 0 0 18px;
  line-height: 1.15;

  @media (max-width: 640px) { font-size: 32px; }
`;

const HeroSub = styled.p`
  font-size: 17px;
  max-width: 640px;
  margin: 0 auto 28px;
  opacity: 0.92;
  line-height: 1.6;

  @media (max-width: 640px) { font-size: 15px; }
`;

const CTA = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  &:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
`;

const SecondaryBtn = styled.button`
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.1); }
`;

const Section = styled.section`
  padding: 72px 24px;
  background: white;

  @media (max-width: 640px) { padding: 48px 16px; }
`;

const SectionAlt = styled(Section)`
  background: #FAFBFC;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 16px;
  letter-spacing: -0.5px;

  @media (max-width: 640px) { font-size: 24px; }
`;

const SectionSub = styled.p`
  font-size: 16px;
  color: #6B7C93;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1080px;
  margin: 0 auto;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Step = styled.div`
  text-align: center;
  padding: 24px;
`;

const StepNum = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #F1F0FF;
  color: #635BFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 18px;
  font-weight: 700;
`;

const StepTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px;
`;

const StepBody = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin: 0;
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 880px;
  margin: 0 auto;

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Benefit = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px 28px;
`;

const BenefitTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px;
`;

const BenefitBody = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin: 0;
`;

const SimWrap = styled.div`
  max-width: 640px;
  margin: 0 auto;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(10, 37, 64, 0.04);

  @media (max-width: 640px) { padding: 24px; }
`;

const SimRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

const Select = styled.select`
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  outline: none;
  min-width: 200px;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const StepBtn = styled.button`
  width: 38px;
  height: 38px;
  background: white;
  border: none;
  font-size: 16px;
  color: #0A2540;
  cursor: pointer;
  &:hover:not(:disabled) { background: #F5F7FA; }
  &:disabled { color: #C9CFD9; cursor: not-allowed; }
`;

const StepValue = styled.div`
  min-width: 56px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #0A2540;
  border-left: 1px solid #E6EBF1;
  border-right: 1px solid #E6EBF1;
  padding: 0 12px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Result = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ResultBox = styled.div`
  background: #F1F0FF;
  border-radius: 8px;
  padding: 16px;
`;

const ResultLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const ResultValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #635BFF;
  margin-top: 4px;
  letter-spacing: -0.4px;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 48px;
  font-size: 14px;
  color: #6B7C93;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
    margin-left: 6px;
    &:hover { text-decoration: underline; }
  }
`;

function fmt(amount: number, currency: string) {
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
  return `${currency} ${amount.toFixed(2)}`;
}

const ReferralLandingPage: React.FC = () => {
  const { t } = useTranslation('referrals');
  const navigate = useNavigate();
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
          const first = raw.find(p => Number(p.base_price_monthly) > 0) ?? raw[0];
          setSelectedPlanId(first.id);
        }
      })
      .catch(() => { /* fallback static numbers */ });
  }, []);

  const sim = useMemo(() => {
    const fallback: PlanOption = { id: 0, display_name: 'Professional', base_price_monthly: 89, base_price_annual: 1068, currency: 'MYR' };
    const p = plans.find(x => x.id === selectedPlanId) || fallback;
    const monthly = parseFloat(String(p.base_price_monthly)) || 0;
    const currency = p.currency || 'MYR';
    const monthlyEarn = monthly * 0.15 * refCount;
    return { plan: p, monthly, currency, monthlyEarn, yearlyEarn: monthlyEarn * 12 };
  }, [plans, selectedPlanId, refCount]);

  return (
    <LandingLayout>
      <Hero>
        <HeroBadge>{t('landing.heroBadge', 'REFER & EARN')}</HeroBadge>
        <HeroTitle>{t('landing.heroTitle', 'Earn 15% recurring on every referral.')}</HeroTitle>
        <HeroSub>
          {t('landing.heroSub', 'Tell other restaurant operators about Purple POS. They get 20% off their first month. You earn 15% commission every time they pay — for as long as they stay subscribed.')}
        </HeroSub>
        <CTA>
          <PrimaryBtn type="button" onClick={() => navigate('/referral/signup')}>{t('landing.cta.becomePartner', 'Become a partner')}</PrimaryBtn>
          <SecondaryBtn type="button" onClick={() => navigate('/referral/login')}>{t('landing.cta.alreadyPartner', 'Already a partner? Log in')}</SecondaryBtn>
        </CTA>
      </Hero>

      <Section>
        <SectionTitle>{t('landing.how.title', 'How it works')}</SectionTitle>
        <SectionSub>{t('landing.how.sub', 'From sign-up to your first commission in four steps. No subscription required.')}</SectionSub>
        <StepGrid>
          <Step>
            <StepNum>1</StepNum>
            <StepTitle>{t('landing.how.step1.title', 'Sign up')}</StepTitle>
            <StepBody>{t('landing.how.step1.body', 'Create a free Referral Partner account in under a minute. No POS subscription needed.')}</StepBody>
          </Step>
          <Step>
            <StepNum>2</StepNum>
            <StepTitle>{t('landing.how.step2.title', 'Share your code')}</StepTitle>
            <StepBody>{t('landing.how.step2.body', "You'll get a personal code (e.g. PURPLE-ABCD) and a shareable signup link.")}</StepBody>
          </Step>
          <Step>
            <StepNum>3</StepNum>
            <StepTitle>{t('landing.how.step3.title', 'They subscribe')}</StepTitle>
            <StepBody>{t('landing.how.step3.body', 'Friends sign up at 20% off. Your dashboard tracks every click and conversion in real time.')}</StepBody>
          </Step>
          <Step>
            <StepNum>4</StepNum>
            <StepTitle>{t('landing.how.step4.title', 'Get paid')}</StepTitle>
            <StepBody>{t('landing.how.step4.body', '15% of every paid invoice lands in your wallet. Withdraw to your bank — anytime, in any supported currency.')}</StepBody>
          </Step>
        </StepGrid>
      </Section>

      <SectionAlt>
        <SectionTitle>{t('landing.why.title', 'Why partners choose Purple')}</SectionTitle>
        <SectionSub>{t('landing.why.sub', 'Built for word-of-mouth that compounds.')}</SectionSub>
        <BenefitGrid>
          <Benefit>
            <BenefitTitle>{t('landing.why.recurring.title', 'Recurring, not one-off')}</BenefitTitle>
            <BenefitBody>{t('landing.why.recurring.body', '15% commission every month — for as long as your referral keeps paying. The longer they stay, the more you earn.')}</BenefitBody>
          </Benefit>
          <Benefit>
            <BenefitTitle>{t('landing.why.multicurrency.title', 'Multi-currency wallet')}</BenefitTitle>
            <BenefitBody>{t('landing.why.multicurrency.body', 'Refer customers in MYR, USD, KRW, SGD — your wallet keeps each currency separate. Apply credit to invoices or withdraw to your bank.')}</BenefitBody>
          </Benefit>
          <Benefit>
            <BenefitTitle>{t('landing.why.transparent.title', 'Transparent dashboard')}</BenefitTitle>
            <BenefitBody>{t('landing.why.transparent.body', 'See clicks, sign-ups, active referrals, and earnings broken down per partner — never wonder how your network is doing.')}</BenefitBody>
          </Benefit>
          <Benefit>
            <BenefitTitle>{t('landing.why.noSubscription.title', 'No subscription required')}</BenefitTitle>
            <BenefitBody>{t('landing.why.noSubscription.body', "You don't need to use Purple POS to refer it. Existing customers, consultants, and restaurant friends — anyone can earn.")}</BenefitBody>
          </Benefit>
        </BenefitGrid>
      </SectionAlt>

      <Section>
        <SectionTitle>{t('landing.calc.title', 'How much could you earn?')}</SectionTitle>
        <SectionSub>{t('landing.calc.sub', 'Pick a plan and your expected number of referrals — see your monthly recurring revenue.')}</SectionSub>
        <SimWrap>
          <SimRow>
            <Label>{t('landing.calc.plan', 'Plan')}</Label>
            <Select
              value={selectedPlanId ?? ''}
              onChange={e => setSelectedPlanId(Number(e.target.value) || null)}
            >
              {plans.length === 0 && <option value="">Professional</option>}
              {plans.map(p => (
                <option key={p.id} value={p.id}>
                  {p.display_name} {p.currency ? `(${p.currency})` : ''}
                </option>
              ))}
            </Select>
          </SimRow>
          <SimRow>
            <Label>{t('landing.calc.activeReferrals', 'Active referrals')}</Label>
            <Stepper>
              <StepBtn type="button" onClick={() => setRefCount(c => Math.max(0, c - 1))} disabled={refCount === 0}>−</StepBtn>
              <StepValue>{refCount}</StepValue>
              <StepBtn type="button" onClick={() => setRefCount(c => Math.min(99, c + 1))}>+</StepBtn>
            </Stepper>
          </SimRow>
          <Result>
            <ResultBox>
              <ResultLabel>{t('landing.calc.monthly', 'Monthly')}</ResultLabel>
              <ResultValue>{fmt(sim.monthlyEarn, sim.currency)}</ResultValue>
            </ResultBox>
            <ResultBox>
              <ResultLabel>{t('landing.calc.yearly', 'Yearly')}</ResultLabel>
              <ResultValue>{fmt(sim.yearlyEarn, sim.currency)}</ResultValue>
            </ResultBox>
          </Result>
        </SimWrap>
        <Footer>
          {t('landing.footer.alreadyUser', 'Already a Purple POS user?')}{' '}
          <a
            href="/referral/dashboard"
            onClick={(e) => { e.preventDefault(); navigate('/referral/dashboard'); }}
          >
            {t('landing.footer.openDashboard', 'Open your referral dashboard →')}
          </a>
        </Footer>
      </Section>
    </LandingLayout>
  );
};

export default ReferralLandingPage;
