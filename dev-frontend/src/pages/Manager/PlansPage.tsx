import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Plan {
  id: string;
  name: string;
  type: 'basic' | 'professional' | 'enterprise';
  monthlyPrice: number;
  annualPrice: number;
  orderLimit: number;
  features: string[];
  recommended?: boolean;
}

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
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
  color: #6B7280;
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
  color: ${props => props.active ? '#0A2540' : '#6B7280'};
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
  border: ${props => props.recommended ? '2px solid #635BFF' : '1px solid #E6EBF1'};
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
    color: #6B7280;
  }
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
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
  color: #374151;
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
  border: 1px solid #E6EBF1;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
`;

const TableHeaderCell = styled.div`
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-align: center;
  text-transform: capitalize;
  
  &:first-child {
    text-align: left;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid #F3F4F6;
  
  &:hover {
    background: #FAFBFC;
  }
`;

const TableCell = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #374151;
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

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      type: 'basic',
      monthlyPrice: 29,
      annualPrice: 290,
      orderLimit: 1000,
      features: [
        'Up to 1,000 orders/month',
        'Basic analytics dashboard',
        '5 staff accounts',
        'Email support',
        '10GB storage',
        'Standard POS features'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      type: 'professional',
      monthlyPrice: 99,
      annualPrice: 990,
      orderLimit: 10000,
      features: [
        'Up to 10,000 orders/month',
        'Advanced analytics & reports',
        'Unlimited staff accounts',
        'Priority email support',
        '50GB storage',
        'Advanced POS features',
        'Multi-location support',
        'Custom branding'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      type: 'enterprise',
      monthlyPrice: 199,
      annualPrice: 2190,
      orderLimit: -1,
      features: [
        'Unlimited orders',
        'Custom analytics & AI insights',
        'Unlimited staff accounts',
        '24/7 priority support',
        'Unlimited storage',
        'All POS features',
        'Unlimited locations',
        'White-label solution',
        'API access',
        'Dedicated account manager'
      ]
    }
  ];

  const comparisonFeatures = [
    { feature: 'Monthly Orders', basic: '1,000', professional: '10,000', enterprise: 'Unlimited' },
    { feature: 'Staff Accounts', basic: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Storage', basic: '10GB', professional: '50GB', enterprise: 'Unlimited' },
    { feature: 'Analytics', basic: '✓', professional: '✓', enterprise: '✓' },
    { feature: 'Advanced Reports', basic: '✗', professional: '✓', enterprise: '✓' },
    { feature: 'AI Insights', basic: '✗', professional: '✗', enterprise: '✓' },
    { feature: 'Multi-location', basic: '✗', professional: '✓', enterprise: '✓' },
    { feature: 'Custom Branding', basic: '✗', professional: '✓', enterprise: '✓' },
    { feature: 'White Label', basic: '✗', professional: '✗', enterprise: '✓' },
    { feature: 'API Access', basic: '✗', professional: '✗', enterprise: '✓' },
    { feature: 'Support', basic: 'Email', professional: 'Priority', enterprise: '24/7' },
    { feature: 'Account Manager', basic: '✗', professional: '✗', enterprise: '✓' }
  ];

  const handleSelectPlan = (planId: string) => {
    alert(`Selected plan: ${planId}. This would normally open a subscription form or payment page.`);
  };

  const formatPrice = (price: number) => {
    return `RM${price}`;
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
                      <CheckIcon>✓</CheckIcon>
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>

                <SelectButton 
                  recommended={plan.recommended}
                  onClick={() => handleSelectPlan(plan.id)}
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
                  <TableCell>
                    {item.basic === '✓' ? <CheckMark>✓</CheckMark> : 
                     item.basic === '✗' ? <CrossMark>✗</CrossMark> : 
                     item.basic}
                  </TableCell>
                  <TableCell>
                    {item.professional === '✓' ? <CheckMark>✓</CheckMark> : 
                     item.professional === '✗' ? <CrossMark>✗</CrossMark> : 
                     item.professional}
                  </TableCell>
                  <TableCell>
                    {item.enterprise === '✓' ? <CheckMark>✓</CheckMark> : 
                     item.enterprise === '✗' ? <CrossMark>✗</CrossMark> : 
                     item.enterprise}
                  </TableCell>
                </TableRow>
              ))}
            </ComparisonTable>
          </ComparisonSection>
        </Content>
      </Container>
    </>
  );
};

export default PlansPage;