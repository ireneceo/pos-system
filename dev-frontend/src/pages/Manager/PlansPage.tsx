import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuthHeaders } from '../../utils/auth';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency, normalizeCurrencyCode, getPlanPrice } from '../../utils/currency';
import { Check } from 'lucide-react';
import { renderFeatureFlag } from '../../utils/featureFlagIcon';

interface Plan {
  id: string;
  name: string;
  type: 'basic' | 'professional' | 'enterprise';
  monthlyPrice: number;
  annualPrice: number;
  orderLimit: number;
  staffLimit: number;
  menuItemLimit: number;
  features: string[];
  recommended?: boolean;
}

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 32px;
  top: 32px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F4F8;
    color: #0A2540;
    border-color: #64748B;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #4B5563;
  margin: 0;
`;

const Content = styled.div`
  padding: 48px 32px;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

const BillingToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
`;

const BillingLabel = styled.span<{ active?: boolean }>`
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#0A2540' : '#4B5563'};
  transition: all 0.2s;
`;

const ToggleSwitch = styled.div`
  width: 56px;
  height: 32px;
  background: #635BFF;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
`;

const ToggleKnob = styled.div<{ annual: boolean }>`
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${props => props.annual ? '27px' : '3px'};
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SavingBadge = styled.span`
  padding: 4px 8px;
  background: #ECFDF5;
  color: #059669;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const PlanCard = styled.div<{ recommended?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: ${props => props.recommended ? '2px solid #635BFF' : '1px solid #C7CED6'};
  position: relative;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #635BFF;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
  text-transform: capitalize;
`;

const PlanPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #0A2540;
  margin: 16px 0;
  
  span {
    font-size: 18px;
    font-weight: 400;
    color: #4B5563;
  }
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 0;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
  color: #1F2937;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ECFDF5;
  color: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
`;

const SelectButton = styled.button<{ recommended?: boolean }>`
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.recommended ? `
    background: #635BFF;
    color: white;
    
    &:hover {
      background: #5A51E6;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #635BFF;
    border: 2px solid #635BFF;
    
    &:hover {
      background: #F8F9FF;
    }
  `}
`;

const ComparisonSection = styled.div`
  margin-top: 64px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin-bottom: 32px;
`;

const ComparisonTable = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #C7CED6;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: #F1F4F8;
  border-bottom: 1px solid #C7CED6;
`;

const TableHeaderCell = styled.div`
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  text-align: center;
  text-transform: capitalize;
  
  &:first-child {
    text-align: left;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid #F1F4F8;
  
  &:hover {
    background: #F9FAFB;
  }
`;

const TableCell = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #1F2937;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    text-align: left;
    justify-content: flex-start;
    font-weight: 500;
  }
`;

const CheckMark = styled.span`
  color: #059669;
  font-weight: bold;
  font-size: 18px;
`;

const CrossMark = styled.span`
  color: #DC2626;
  font-weight: bold;
  font-size: 18px;
`;

const PlansPage: React.FC = () => {
  const { t } = useTranslation('admin');
  // const { } = useAuth();
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // 플랜과 가격은 서버(PlanTemplate + 통화별 PlanPrice)가 단일 소스다.
  // 예전엔 이 배열에 basic 29 / professional 99 / enterprise 199 가 박혀 있었고, 실제 값
  // (MYR 49 / 99 / 179)과 전부 달라 **매니저가 틀린 가격을 보고 있었다**.
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { defaultCurrency } = useBrandCurrency();
  // 서버 currency_prices 는 ISO 코드(MYR) 키인데 앱 통화는 기호(RM)로 온다 → 정규화 필수.
  const currency = normalizeCurrencyCode(defaultCurrency || 'MYR');

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch('/api/plans', { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Failed to load plans');
        const json = await res.json();
        const rows: any[] = Array.isArray(json) ? json : (json.data || []);

        const mapped: Plan[] = rows
          .filter((p) => p.plan_target === 'restaurant' && p.is_active)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          .map((p) => {
            let features = p.features;
            if (typeof features === 'string') { try { features = JSON.parse(features); } catch { features = []; } }
            return {
              id: String(p.id),
              name: p.display_name || p.name,
              type: (['basic', 'professional', 'enterprise'].includes(p.name) ? p.name : 'basic') as Plan['type'],
              monthlyPrice: getPlanPrice(p, currency, 'monthly'),
              annualPrice: getPlanPrice(p, currency, 'annual'),
              orderLimit: p.order_limit ?? -1,
              staffLimit: p.staff_limit ?? -1,
              menuItemLimit: p.menu_item_limit ?? -1,
              features: Array.isArray(features) ? features : [],
              recommended: p.name === 'professional',
            };
          });

        setPlans(mapped);
      } catch (err) {
        console.error('Error loading plans:', err);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, [currency]);

  // 통화는 브랜드 기본통화 — 가격과 같은 소스에서 온다(하드코딩 RM 금지)
  const formatPrice = (amount: number) => formatCurrency(amount, currency);

  // 비교표도 서버 플랜의 실제 한도에서 만든다. 예전엔 별도 하드코딩 표(주문 1,000/10,000/무제한)가
  // 있었고 DB 값(1000/5000/무제한)과 달랐다 — 진실이 두 개면 결국 하나는 오표시다.
  // 숫자 천단위 구분(날짜 아님) — 타임존 가드가 날짜용 toLocale* 와 헷갈리지 않도록 Intl 사용
  const numberFmt = new Intl.NumberFormat('en-US');
  const limitText = (v: number) => (v === -1 || v == null ? 'Unlimited' : numberFmt.format(v));
  const byType = (type: string) => plans.find((pl) => pl.type === type);
  const comparisonFeatures = [
    { feature: 'Monthly Orders', get: (pl?: Plan) => (pl ? limitText(pl.orderLimit) : '-') },
    { feature: 'Staff Accounts', get: (pl?: Plan) => (pl ? limitText(pl.staffLimit) : '-') },
    { feature: 'Menu Items', get: (pl?: Plan) => (pl ? limitText(pl.menuItemLimit) : '-') },
  ].map((row) => ({
    feature: row.feature,
    basic: row.get(byType('basic')),
    professional: row.get(byType('professional')),
    enterprise: row.get(byType('enterprise')),
  }));

  const renderFeatureFlag = (value: string) => {
    if (value === '✓') return <CheckMark>✓</CheckMark>;
    if (value === '✗') return <CrossMark>✗</CrossMark>;
    return value;
  };

  // 플랜 변경은 "어느 매장의 구독인가"가 필요하다 → 매장별 구독 화면에서 수행(서버가 프로레이션·
  // 한도·인보이스 처리). 예전엔 여기서 'Coming Soon' 모달만 띄웠다.
  const handleSelectPlan = () => {
    navigate('/pos/manager/subscriptions');
  };

  const getAnnualSaving = (monthlyPrice: number, annualPrice: number) => {
    const monthlyCost = monthlyPrice * 12;
    const saving = monthlyCost - annualPrice;
    const percentage = Math.round((saving / monthlyCost) * 100);
    return percentage;
  };
  return (
    <>
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/pos/manager/subscriptions')}>
            ← Back to Subscriptions
          </BackButton>
          <HeaderContent>
            <Title>{t('admin:plansPage.chooseThePerfectPlan')}</Title>
            <Subtitle>{t('admin:plansPage.scaleYourRestaurantOperationsWithFlexiblePricing')}</Subtitle>
          </HeaderContent>
        </Header>

        <Content>
          <BillingToggle>
            <BillingLabel active={!isAnnual}>{t('admin:plansPage.monthly')}</BillingLabel>
            <ToggleSwitch onClick={() => setIsAnnual(!isAnnual)}>
              <ToggleKnob annual={isAnnual} />
            </ToggleSwitch>
            <BillingLabel active={isAnnual}>{t('admin:plansPage.annual')}</BillingLabel>
            {isAnnual && plans.length > 0 && <SavingBadge>Save up to {Math.max(...plans.map(p => getAnnualSaving(p.monthlyPrice, p.annualPrice)))}%</SavingBadge>}
          </BillingToggle>

          <PlansGrid>
            {plans.map(plan => (
              <PlanCard key={plan.id} recommended={plan.recommended}>
                {plan.recommended && <RecommendedBadge>{t('admin:plansPage.mostPopular')}</RecommendedBadge>}
                
                <PlanHeader>
                  <PlanName>{plan.name}</PlanName>
                  <PlanPrice>
                    {formatPrice(isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice)}
                    <span>/{isAnnual ? 'month (billed annually)' : 'month'}</span>
                  </PlanPrice>
                  {isAnnual && (
                    <PlanDescription>
                      {formatPrice(plan.annualPrice)} billed annually
                      <br />
                      Save {getAnnualSaving(plan.monthlyPrice, plan.annualPrice)}%
                    </PlanDescription>
                  )}
                </PlanHeader>

                <FeaturesList>
                  {plan.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <CheckIcon><Check size={14} /></CheckIcon>
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>

                <SelectButton 
                  recommended={plan.recommended}
                  onClick={handleSelectPlan}
                >
                  {plan.recommended ? 'Get Started' : 'Select Plan'}
                </SelectButton>
              </PlanCard>
            ))}
          </PlansGrid>

          <ComparisonSection>
            <SectionTitle>{t('admin:plansPage.detailedFeatureComparison')}</SectionTitle>
            <ComparisonTable>
              <TableHeader>
                <TableHeaderCell>{t('admin:plansPage.features')}</TableHeaderCell>
                <TableHeaderCell>{t('admin:plansPage.basic')}</TableHeaderCell>
                <TableHeaderCell>{t('admin:plansPage.professional')}</TableHeaderCell>
                <TableHeaderCell>{t('admin:plansPage.enterprise')}</TableHeaderCell>
              </TableHeader>
              
              {comparisonFeatures.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feature}</TableCell>
                  <TableCell>{renderFeatureFlag(item.basic)}</TableCell>
                  <TableCell>{renderFeatureFlag(item.professional)}</TableCell>
                  <TableCell>{renderFeatureFlag(item.enterprise)}</TableCell>
                </TableRow>
              ))}
            </ComparisonTable>
          </ComparisonSection>
        </Content>
      </Container>
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default PlansPage;