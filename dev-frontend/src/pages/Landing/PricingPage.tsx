import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateBreadcrumbSchema, generateLocalBusinessSchema } from '../../components/Common/SEOHead';

const PageContainer = styled.div`
  background: #FAFBFC;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FreeTrialBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const PlanTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PlanTab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#425466'};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    ${props => !props.active && 'background: #F8F9FF;'}
  }
`;

const CurrencySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CurrencyLabel = styled.span`
  font-size: 14px;
  color: #6B7C93;
`;

const CurrencySelect = styled.select`
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 450px;
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
  display: flex;
  flex-direction: column;

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
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-align: center;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
  text-align: center;
  min-height: 40px;
`;

const PriceSection = styled.div`
  text-align: center;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 12px;
  margin-bottom: 24px;
`;

const MonthlyPrice = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`;

const CurrencySymbol = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #6B7280;
  margin-right: 4px;
`;

const PeriodText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #6B7280;
`;

const AnnualPrice = styled.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-top: 8px;
`;

const BillingNote = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const LimitsSection = styled.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const LimitItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`;

const LimitLabel = styled.span`
  font-size: 14px;
  color: #374151;
`;

const LimitValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const ModulesSection = styled.div`
  margin-bottom: 16px;
`;

const ModulesTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ModulesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ModuleTag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: #EEF2FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 12px;
  color: #4338CA;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
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
  margin-top: auto;

  &:hover {
    background: ${props => props.primary ? '#5A51E6' : '#F0F4FF'};
    transform: translateY(-1px);
  }
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

interface CurrencyPrices {
  [currency: string]: {
    monthly: number;
    annual: number;
  };
}

interface Plan {
  id: number;
  name: string;
  display_name: string;
  base_price_monthly: number;
  base_price_annual: number;
  features: string[];
  plan_target: 'restaurant' | 'brand' | 'foodcourt' | 'owner';
  order_limit: number;
  menu_item_limit: number;
  staff_limit: number;
  included_modules: string[];
  currency_prices?: CurrencyPrices;
}

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

// 모듈 코드 -> 표시 이름 매핑
const MODULE_NAMES: Record<string, string> = {
  pos_terminal: 'POS Terminal',
  menu_management: 'Menu Management',
  customer_management: 'Customer Management',
  reports_analytics: 'Reports & Analytics',
  invoice_management: 'Invoice Management',
  table_management: 'Table Management',
  kitchen_display: 'Kitchen Display',
  customer_display: 'Customer Display',
  staff_management: 'Staff Management',
  coupons: 'Coupons & Promotions',
  support_tickets: 'Support Tickets',
  activity_logs: 'Activity Logs',
  recipe_management: 'Recipe Management',
  mobile_ordering: 'Mobile Ordering',
  advanced_inventory: 'Advanced Inventory',
  operation_inquiry: 'Operation Inquiry',
  purchase_order: 'Purchase Order',
  ai_prediction: 'AI Prediction'
};

// 국가 코드 → 통화 매핑 (컴포넌트 외부에 정의)
const countryToCurrency: Record<string, string> = {
  'KR': 'KRW',  // 한국
  'MY': 'MYR',  // 말레이시아
  'SG': 'SGD',  // 싱가포르
  'JP': 'JPY',  // 일본
  'CN': 'CNY',  // 중국
  'TW': 'TWD',  // 대만
  'TH': 'THB',  // 태국
  'VN': 'VND',  // 베트남
  'PH': 'PHP',  // 필리핀
  'ID': 'IDR',  // 인도네시아
  'IN': 'INR',  // 인도
  'AU': 'AUD',  // 호주
  'GB': 'GBP',  // 영국
  'DE': 'EUR',  // 독일
  'FR': 'EUR',  // 프랑스
  'IT': 'EUR',  // 이탈리아
  'ES': 'EUR',  // 스페인
  'NL': 'EUR',  // 네덜란드
  'US': 'USD',  // 미국
  'CA': 'CAD',  // 캐나다
};

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'restaurant' | 'brand' | 'foodcourt' | 'owner'>('restaurant');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // 브라우저 언어 기반 통화 감지 (fallback용)
  const detectCurrencyFromBrowserLanguage = (): string => {
    try {
      const locale = navigator.language || 'en-US';
      const regionCode = locale.split('-')[1]?.toUpperCase() || '';
      return countryToCurrency[regionCode] || 'USD';
    } catch {
      return 'USD';
    }
  };

  // IP 기반 위치 감지로 통화 결정
  const detectCurrencyFromIP = async (): Promise<string> => {
    try {
      // ip-api.com 무료 API 사용 (HTTPS는 유료이므로 HTTP 사용, 또는 ipapi.co 사용)
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(3000) // 3초 타임아웃
      });

      if (!response.ok) {
        throw new Error('IP API request failed');
      }

      const data = await response.json();
      const countryCode = data.country_code?.toUpperCase();

      if (countryCode && countryToCurrency[countryCode]) {
        return countryToCurrency[countryCode];
      }

      // 매핑에 없는 국가는 USD 반환
      return 'USD';
    } catch (error) {
      console.warn('IP-based currency detection failed, using browser language fallback:', error);
      return detectCurrencyFromBrowserLanguage();
    }
  };

  useEffect(() => {
    loadPlans();
    loadCurrencies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPlans = async () => {
    try {
      const response = await fetch('/api/public/plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      }
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrencies = async () => {
    try {
      const response = await fetch('/api/currencies/supported');
      if (response.ok) {
        const data = await response.json();
        const loadedCurrencies = data.data || [];
        setCurrencies(loadedCurrencies);

        // IP 기반 위치 감지로 통화 설정 (비동기)
        const detectedCurrency = await detectCurrencyFromIP();
        const isSupported = loadedCurrencies.some((c: CurrencyInfo) => c.code === detectedCurrency);
        if (isSupported) {
          setSelectedCurrency(detectedCurrency);
        } else if (loadedCurrencies.length > 0) {
          // IP 감지 통화가 supported에 없으면 첫 번째 supported 통화를 기본값으로
          setSelectedCurrency(loadedCurrencies[0].code);
        }
      }
    } catch (error) {
      console.error('Failed to load currencies:', error);
      // 기본 통화 설정
      const defaultCurrencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
        { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
        { code: 'KRW', symbol: '₩', name: 'Korean Won', decimals: 0 }
      ];
      setCurrencies(defaultCurrencies);

      // IP 기반 위치 감지로 통화 설정 (비동기)
      const detectedCurrency = await detectCurrencyFromIP();
      const isSupported = defaultCurrencies.some(c => c.code === detectedCurrency);
      if (isSupported) {
        setSelectedCurrency(detectedCurrency);
      } else {
        setSelectedCurrency(defaultCurrencies[0].code);
      }
    }
  };

  // features/included_modules가 문자열로 올 수 있으므로 배열로 정규화
  const normalizedPlans = plans.map(plan => ({
    ...plan,
    features: Array.isArray(plan.features) ? plan.features :
      (typeof plan.features === 'string' ? (() => { try { return JSON.parse(plan.features); } catch { return []; } })() : []),
    included_modules: Array.isArray(plan.included_modules) ? plan.included_modules :
      (typeof plan.included_modules === 'string' ? (() => { try { return JSON.parse(plan.included_modules); } catch { return []; } })() : [])
  }));

  const filteredPlans = normalizedPlans.filter(plan => plan.plan_target === activeTab);

  const getPopularPlan = (planName: string) => {
    return planName.toLowerCase().includes('professional');
  };

  const getCurrencyInfo = (code: string): CurrencyInfo => {
    return currencies.find(c => c.code === code) || { code, symbol: code, name: code, decimals: 2 };
  };

  const formatPrice = (price: number, currencyCode: string) => {
    const currency = getCurrencyInfo(currencyCode);
    if (price === 0) return 'Contact Us';

    if (currency.decimals === 0) {
      return Math.round(price).toLocaleString();
    }
    return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getPlanPrice = (plan: Plan, type: 'monthly' | 'annual'): number => {
    // 선택된 통화의 가격이 있으면 사용
    if (plan.currency_prices && plan.currency_prices[selectedCurrency]) {
      return plan.currency_prices[selectedCurrency][type];
    }
    // 없으면 0 반환 (가격 미설정)
    return 0;
  };

  const formatLimit = (limit: number) => {
    if (limit === -1) return 'Unlimited';
    return limit.toLocaleString();
  };

  const getDescription = (planName: string): string => {
    if (planName.toLowerCase().includes('basic')) {
      return 'Perfect for small businesses starting their POS journey';
    }
    if (planName.toLowerCase().includes('professional')) {
      return 'Ideal for growing businesses with advanced needs';
    }
    if (planName.toLowerCase().includes('enterprise')) {
      return 'Comprehensive solution for large-scale operations';
    }
    return 'Subscription plan for your business';
  };

  // API에서 가져온 플랜 데이터 기반으로 탭 동적 생성
  const TAB_LABELS: Record<string, string> = {
    restaurant: 'Restaurant',
    brand: 'Brand',
    foodcourt: 'Foodcourt',
    owner: 'Owner'
  };
  const TAB_ORDER = ['restaurant', 'brand', 'foodcourt', 'owner'];
  const availableTabs = TAB_ORDER.filter(target =>
    normalizedPlans.some(plan => plan.plan_target === target)
  );

  const displayPlans = filteredPlans.length > 0 ? filteredPlans : [];
  const currencyInfo = getCurrencyInfo(selectedCurrency);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://purplehere.com' },
    { name: 'Pricing', url: 'https://purplehere.com/pricing' }
  ]);

  return (
    <LandingLayout>
      <SEOHead
        title="Pricing - Subscription Plans"
        description="Simple, transparent pricing for PurpleHere POS system. Choose from Basic, Professional, or Enterprise plans for restaurants, brands, and food courts. 7-day free trial available."
        keywords="POS pricing, restaurant POS cost, POS subscription, PurpleHere plans, free trial POS"
        canonicalUrl="https://purplehere.com/pricing"
        jsonLd={[breadcrumbSchema, generateLocalBusinessSchema()]}
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>Simple, Transparent Pricing</HeroTitle>
          <HeroSubtitle>
            Choose the plan that fits your business. No hidden fees, cancel anytime.
          </HeroSubtitle>
          <FreeTrialBadge>7 Days Free Trial - No Credit Card Required</FreeTrialBadge>
        </HeroSection>

        <ContentSection>
          <FilterBar>
            <PlanTabs>
              {availableTabs.map(tab => (
                <PlanTab
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                >
                  {TAB_LABELS[tab] || tab}
                </PlanTab>
              ))}
            </PlanTabs>

            <CurrencySelector>
              <CurrencyLabel>Currency:</CurrencyLabel>
              <CurrencySelect
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </option>
                ))}
              </CurrencySelect>
            </CurrencySelector>
          </FilterBar>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading plans...</div>
          ) : displayPlans.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
              No plans available for this category yet.
            </div>
          ) : (
            <PlansGrid>
              {displayPlans.map((plan) => {
                const monthlyPrice = getPlanPrice(plan, 'monthly');
                const annualPrice = getPlanPrice(plan, 'annual');
                const isPopular = getPopularPlan(plan.name);
                const annualSavings = monthlyPrice > 0 ? Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100) : 0;

                return (
                  <PlanCard key={plan.id} popular={isPopular}>
                    {isPopular && <PopularBadge>Most Popular</PopularBadge>}
                    <PlanName>{plan.display_name}</PlanName>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#635BFF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '24px', textAlign: 'center' }}>
                      {plan.plan_target === 'restaurant' ? 'Restaurant Plan' : plan.plan_target === 'brand' ? 'Brand Plan' : plan.plan_target === 'foodcourt' ? 'Foodcourt Plan' : 'Owner Plan'}
                    </div>

                    <PriceSection>
                      {monthlyPrice === 0 ? (
                        <MonthlyPrice>Contact Us</MonthlyPrice>
                      ) : (
                        <>
                          <MonthlyPrice>
                            <CurrencySymbol>{currencyInfo.symbol}</CurrencySymbol>
                            {formatPrice(monthlyPrice, selectedCurrency)}
                            <PeriodText>/month</PeriodText>
                          </MonthlyPrice>
                          {annualPrice > 0 && (
                            <AnnualPrice>
                              {currencyInfo.symbol} {formatPrice(annualPrice, selectedCurrency)}/year
                              {annualSavings > 0 && ` (Save ${annualSavings}%)`}
                            </AnnualPrice>
                          )}
                          <BillingNote>Billed monthly or annually</BillingNote>
                        </>
                      )}
                    </PriceSection>

                    <LimitsSection>
                      <LimitItem>
                        <LimitLabel>Staff Limit</LimitLabel>
                        <LimitValue>{formatLimit(plan.staff_limit)}</LimitValue>
                      </LimitItem>
                      <LimitItem>
                        <LimitLabel>Orders/month</LimitLabel>
                        <LimitValue>{formatLimit(plan.order_limit)}</LimitValue>
                      </LimitItem>
                      <LimitItem>
                        <LimitLabel>Menu Items</LimitLabel>
                        <LimitValue>{formatLimit(plan.menu_item_limit)}</LimitValue>
                      </LimitItem>
                    </LimitsSection>

                    {plan.included_modules && plan.included_modules.length > 0 && (
                      <ModulesSection>
                        <ModulesTitle>Included Modules ({plan.included_modules.length})</ModulesTitle>
                        <ModulesList>
                          {plan.included_modules.slice(0, 6).map((moduleCode, index) => (
                            <ModuleTag key={index}>
                              {MODULE_NAMES[moduleCode] || moduleCode}
                            </ModuleTag>
                          ))}
                          {plan.included_modules.length > 6 && (
                            <ModuleTag>+{plan.included_modules.length - 6} more</ModuleTag>
                          )}
                        </ModulesList>
                      </ModulesSection>
                    )}

                    {plan.features && plan.features.length > 0 && plan.features[0] !== '' && (
                      <FeaturesList>
                        {plan.features.filter(f => f && f.trim()).map((feature, index) => (
                          <FeatureItem key={index}>
                            <FeatureCheck>✓</FeatureCheck>
                            {feature}
                          </FeatureItem>
                        ))}
                      </FeaturesList>
                    )}

                    <ContactButton
                      primary={isPopular}
                      onClick={() => navigate('/contact', {
                        state: {
                          inquiry_type: 'free_trial',
                          interested_plan: `${activeTab}_${plan.name.toLowerCase()}`
                        }
                      })}
                    >
                      Start Free Trial
                    </ContactButton>
                  </PlanCard>
                );
              })}
            </PlansGrid>
          )}
        </ContentSection>

        <CTASection>
          <CTATitle>Ready to get started?</CTATitle>
          <CTASubtitle>
            Start your 7-day free trial today. No credit card required.
          </CTASubtitle>
          <CTAButton onClick={() => navigate('/contact')}>
            Start Free Trial
          </CTAButton>
        </CTASection>
      </PageContainer>
    </LandingLayout>
  );
};

export default PricingPage;
