import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';

const PageContainer = styled.div`
  background: #FAFBFC;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const PlanTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
`;

const PlanTab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7C93'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: ${props => props.active ? 'white' : '#635BFF'};
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const PlanCard = styled.div<{ popular?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${props => props.popular ? '#635BFF' : '#E6EBF1'};
  position: relative;
  transition: all 0.2s;

  ${props => props.popular && `
    box-shadow: 0 8px 24px rgba(99, 91, 255, 0.15);
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #635BFF;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const PlanName = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;

const PlanPrice = styled.div`
  margin-bottom: 24px;
`;

const Price = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: #0A2540;
`;

const Currency = styled.span`
  font-size: 16px;
  color: #6B7C93;
  margin-right: 4px;
`;

const Period = styled.span`
  font-size: 16px;
  color: #6B7C93;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 24px;
  min-height: 40px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`;

const FeatureCheck = styled.span`
  color: #10B981;
  font-weight: bold;
`;

const ContactButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.primary ? '#635BFF' : 'white'};
  color: ${props => props.primary ? 'white' : '#635BFF'};
  border: 2px solid #635BFF;

  &:hover {
    background: ${props => props.primary ? '#5A51E6' : '#F0F4FF'};
    transform: translateY(-1px);
  }
`;

const FAQSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const FAQTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin-bottom: 40px;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const FAQQuestion = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`;

const FAQAnswer = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const CTASubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
`;

const CTAButton = styled.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

interface Plan {
  id: number;
  name: string;
  display_name: string;
  base_price_monthly: number;
  base_price_annual: number;
  features: string[];
  plan_target: 'restaurant' | 'brand' | 'foodcourt';
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'restaurant' | 'brand' | 'foodcourt'>('restaurant');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await fetch('/api/public/plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      }
    } catch (error) {
      // Plans loading failed, fallback plans will be used
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter(plan => plan.plan_target === activeTab);

  const getPopularPlan = (planName: string) => {
    return planName.toLowerCase().includes('professional');
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Contact Us';
    return price.toLocaleString();
  };

  // Fallback plans if API fails
  const fallbackPlans: Record<string, Plan[]> = {
    restaurant: [
      {
        id: 1,
        name: 'basic',
        display_name: 'Basic',
        base_price_monthly: 99,
        base_price_annual: 990,
        plan_target: 'restaurant',
        features: [
          'POS Terminal',
          'Menu Management',
          'Kitchen Display (KDS)',
          'Customer Display',
          'Staff Management (up to 5)',
          'Basic Reports',
          'Email Support'
        ]
      },
      {
        id: 2,
        name: 'professional',
        display_name: 'Professional',
        base_price_monthly: 199,
        base_price_annual: 1990,
        plan_target: 'restaurant',
        features: [
          'All Basic features',
          'Mobile Ordering',
          'Recipe Management',
          'Advanced Inventory',
          'Customer Management',
          'Coupons & Promotions',
          'Staff Management (up to 15)',
          'Advanced Reports & Analytics',
          'Priority Support'
        ]
      },
      {
        id: 3,
        name: 'enterprise',
        display_name: 'Enterprise',
        base_price_monthly: 0,
        base_price_annual: 0,
        plan_target: 'restaurant',
        features: [
          'All Professional features',
          'Unlimited Staff',
          'Custom Integrations',
          'Dedicated Account Manager',
          'Custom Development',
          'SLA Guarantee',
          '24/7 Phone Support'
        ]
      }
    ],
    brand: [
      {
        id: 4,
        name: 'brand_basic',
        display_name: 'Brand Basic',
        base_price_monthly: 299,
        base_price_annual: 2990,
        plan_target: 'brand',
        features: [
          'Multi-brand Dashboard',
          'Restaurant Management (up to 5)',
          'Centralized Menu Management',
          'Basic Performance Reports',
          'Email Support'
        ]
      },
      {
        id: 5,
        name: 'brand_professional',
        display_name: 'Brand Professional',
        base_price_monthly: 599,
        base_price_annual: 5990,
        plan_target: 'brand',
        features: [
          'All Basic features',
          'Restaurant Management (up to 20)',
          'Recipe Management',
          'Centralized Inventory',
          'Advanced Analytics',
          'Invoice Management',
          'Priority Support'
        ]
      },
      {
        id: 6,
        name: 'brand_enterprise',
        display_name: 'Brand Enterprise',
        base_price_monthly: 0,
        base_price_annual: 0,
        plan_target: 'brand',
        features: [
          'All Professional features',
          'Unlimited Restaurants',
          'API Access',
          'Custom Development',
          'Dedicated Account Manager',
          '24/7 Support'
        ]
      }
    ],
    foodcourt: [
      {
        id: 7,
        name: 'foodcourt_basic',
        display_name: 'Foodcourt Basic',
        base_price_monthly: 399,
        base_price_annual: 3990,
        plan_target: 'foodcourt',
        features: [
          'Multi-outlet Dashboard',
          'Restaurant Management (up to 10)',
          'Centralized Customer Database',
          'Basic Statistics',
          'Email Support'
        ]
      },
      {
        id: 8,
        name: 'foodcourt_professional',
        display_name: 'Foodcourt Professional',
        base_price_monthly: 799,
        base_price_annual: 7990,
        plan_target: 'foodcourt',
        features: [
          'All Basic features',
          'Restaurant Management (up to 30)',
          'Coupon Management',
          'Advanced Analytics',
          'Customer Loyalty Program',
          'Priority Support'
        ]
      },
      {
        id: 9,
        name: 'foodcourt_enterprise',
        display_name: 'Foodcourt Enterprise',
        base_price_monthly: 0,
        base_price_annual: 0,
        plan_target: 'foodcourt',
        features: [
          'All Professional features',
          'Unlimited Restaurants',
          'API Access',
          'Custom Integrations',
          'Dedicated Account Manager',
          '24/7 Support'
        ]
      }
    ]
  };

  const displayPlans = filteredPlans.length > 0 ? filteredPlans : (fallbackPlans[activeTab] || []);

  return (
    <LandingLayout>
      <PageContainer>
        <HeroSection>
          <HeroTitle>Simple, Transparent Pricing</HeroTitle>
          <HeroSubtitle>
            Choose the plan that fits your business. All plans include a 7-day free trial.
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <PlanTabs>
            <PlanTab active={activeTab === 'restaurant'} onClick={() => setActiveTab('restaurant')}>
              Restaurant
            </PlanTab>
            <PlanTab active={activeTab === 'brand'} onClick={() => setActiveTab('brand')}>
              Brand
            </PlanTab>
            <PlanTab active={activeTab === 'foodcourt'} onClick={() => setActiveTab('foodcourt')}>
              Foodcourt
            </PlanTab>
          </PlanTabs>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading plans...</div>
          ) : (
            <PlansGrid>
              {displayPlans.map((plan) => (
                <PlanCard key={plan.id} popular={getPopularPlan(plan.name)}>
                  {getPopularPlan(plan.name) && <PopularBadge>Most Popular</PopularBadge>}
                  <PlanName>{plan.display_name}</PlanName>
                  <PlanPrice>
                    {plan.base_price_monthly === 0 ? (
                      <Price>Contact Us</Price>
                    ) : (
                      <>
                        <Currency>MYR</Currency>
                        <Price>{formatPrice(plan.base_price_monthly)}</Price>
                        <Period>/month</Period>
                      </>
                    )}
                  </PlanPrice>
                  <PlanDescription>
                    {plan.base_price_monthly === 0
                      ? 'Custom pricing for enterprise needs'
                      : `Billed annually: MYR ${formatPrice(plan.base_price_annual)}/year`}
                  </PlanDescription>
                  <FeatureList>
                    {plan.features.map((feature, index) => (
                      <FeatureItem key={index}>
                        <FeatureCheck>✓</FeatureCheck>
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeatureList>
                  <ContactButton
                    primary={getPopularPlan(plan.name)}
                    onClick={() => navigate('/contact')}
                  >
                    Contact Us
                  </ContactButton>
                </PlanCard>
              ))}
            </PlansGrid>
          )}
        </ContentSection>

        <FAQSection>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          <FAQList>
            <FAQItem>
              <FAQQuestion>How do I sign up?</FAQQuestion>
              <FAQAnswer>
                Contact our sales team through the contact form or email. We'll set up your account personally and guide you through the onboarding process.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Is there a free trial?</FAQQuestion>
              <FAQAnswer>
                Yes! We offer a 7-day free trial for all plans. You'll have full access to all features during the trial period.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>What payment methods do you accept?</FAQQuestion>
              <FAQAnswer>
                We currently accept bank transfers. Credit card and PayPal payments are coming soon.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Can I change my plan later?</FAQQuestion>
              <FAQAnswer>
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Do you offer custom plans?</FAQQuestion>
              <FAQAnswer>
                Yes! Our Enterprise plans are fully customizable to meet your specific business needs. Contact us for a custom quote.
              </FAQAnswer>
            </FAQItem>
          </FAQList>
        </FAQSection>

        <CTASection>
          <CTATitle>Ready to get started?</CTATitle>
          <CTASubtitle>
            Contact our sales team to set up your account and start your free trial today.
          </CTASubtitle>
          <CTAButton onClick={() => navigate('/contact')}>
            Contact Us
          </CTAButton>
        </CTASection>
      </PageContainer>
    </LandingLayout>
  );
};

export default PricingPage;
