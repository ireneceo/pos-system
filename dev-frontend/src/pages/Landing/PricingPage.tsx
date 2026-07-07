import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Check, Minus } from 'lucide-react';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateBreadcrumbSchema, generateLocalBusinessSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  background: #F9FAFB;
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
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 0 8px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 8px;
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

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
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
  border: 2px solid ${props => props.active ? '#635BFF' : '#C7CED6'};
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

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;

const CurrencySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CurrencyLabel = styled.span`
  font-size: 14px;
  color: #4B5563;
`;

const CurrencySelect = styled.select`
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #C7CED6;
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
  border: 2px solid ${props => props.popular ? '#635BFF' : '#C7CED6'};
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


const PriceSection = styled.div`
  text-align: center;
  padding: 20px;
  background: #F1F4F8;
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
  color: #4B5563;
  margin-right: 4px;
`;

const PeriodText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #4B5563;
`;

const AnnualPrice = styled.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-top: 8px;
`;

const BillingNote = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 4px;
`;

const LimitsSection = styled.div`
  padding: 16px;
  background: #F1F4F8;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const LimitItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #C7CED6;

  &:last-child {
    border-bottom: none;
  }
`;

const LimitLabel = styled.span`
  font-size: 14px;
  color: #1F2937;
`;

const LimitValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const ModulesSection = styled.div`
  margin-bottom: 20px;
`;

const ModulesTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ModulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
`;

const ModuleItem = styled.li<{ included?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: ${props => props.included ? '#1F2937' : '#6B7280'};
  background: ${props => props.included ? '#F0FDF4' : 'transparent'};
`;

const ModuleCheck = styled.span<{ included?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 11px;
  flex-shrink: 0;
  background: ${props => props.included ? '#10B981' : '#C7CED6'};
  color: ${props => props.included ? 'white' : '#6B7280'};
`;

const ModuleCategoryLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6B7280;
  margin: 10px 0 4px 0;
  &:first-child {
    margin-top: 0;
  }
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
  color: #1F2937;
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
  plan_target: 'restaurant' | 'brand' | 'foodcourt' | 'owner' | 'supplier';
  order_limit: number;
  menu_item_limit: number;
  staff_limit: number;
  restaurant_limit: number;
  manager_limit: number;
  included_modules: string[];
  currency_prices?: CurrencyPrices;
}

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

// 모듈 코드 -> 표시 이름 매핑 (DB AddonModule.name과 1:1 동기화)
const MODULE_NAMES: Record<string, string> = {
  // Restaurant
  dashboard: 'Dashboard',
  live_orders: 'Live Orders',
  pos_terminal: 'POS Terminal',
  kitchen_display: 'Kitchen Display',
  customer_display: 'Customer Display',
  menu_management: 'Menu Management',
  invoice_billing: 'Invoice & Billing',
  reports: 'Reports & Analytics',
  staff_management: 'Staff & Permission Management',
  customer_crm: 'Customer Management',
  coupons: 'Coupon Management',
  notices: 'Notices',
  membership: 'Membership',
  system_inquiry: 'System Inquiry',
  operation_inquiry: 'Operation Inquiry',
  activity_logs: 'Change History',
  floor_plan: 'Floor Plan & Table Management',
  mobile_ordering: 'Mobile Ordering',
  reservations: 'Reservations',
  recipe_management: 'Recipe Management',
  inventory_management: 'Inventory & Supplier Management',
  advanced_inventory: 'Advanced Inventory',
  ingredients: 'Ingredients',
  suppliers: 'Suppliers',
  work_manuals: 'Work Manuals',
  // Brand
  brand_dashboard: 'Dashboard',
  brand_management: 'Brand Management',
  brand_franchise: 'Franchise Management & Map',
  brand_restaurant_mgmt: 'Restaurant Management',
  brand_admin_staff: 'Admin & Staff Management',
  brand_manager_mgmt: 'Manager Management',
  brand_invoices: 'Invoice & Billing',
  brand_reports: 'Reports',
  brand_notices: 'Notice Management',
  brand_system_inquiry: 'System Inquiry',
  brand_operation_inquiry: 'Inquiry Management',
  brand_products: 'Product Management',
  brand_recipes: 'Recipe Management',
  brand_product_recipes: 'Product Recipe Management',
  brand_inventory: 'Inventory & Supplier Management',
  brand_ingredients: 'Ingredients',
  brand_suppliers: 'Suppliers',
  brand_performance: 'Performance Analytics',
  brand_plans: 'Subscription Plans',
  brand_subscriptions: 'Subscription Management',
  brand_payment_settings: 'Payment Settings',
  brand_work_manuals: 'Work Manuals',
  brand_activity_logs: 'Change History',
  // Foodcourt
  fc_dashboard: 'Dashboard',
  fc_management: 'Foodcourt Management',
  fc_branches: 'Branch Management & Unit Numbering',
  fc_tenancy: 'Tenancy Management & Map',
  fc_floor_plan: 'Floor Plan & Store Management',
  fc_restaurant_mgmt: 'Restaurant Management',
  fc_admin_staff: 'Admin & Staff Management',
  fc_manager_mgmt: 'Manager Management',
  fc_invoices: 'Invoice & Billing',
  fc_notices: 'Notice Management',
  fc_system_inquiry: 'System Inquiry',
  fc_operation_inquiry: 'Inquiry Management',
  fc_stats: 'Statistics & Analytics',
  fc_customers: 'Customer Management',
  fc_coupons: 'Coupon Management',
  fc_plans: 'Subscription Plans',
  fc_subscriptions: 'Subscription Management',
  fc_payment_settings: 'Payment Settings',
  fc_work_manuals: 'Work Manuals',
  fc_activity_logs: 'Change History',
  // Owner
  owner_dashboard: 'Dashboard',
  owner_restaurants: 'Restaurant Portfolio',
  owner_invoices: 'Invoice & Billing',
  owner_notices: 'Notices',
  owner_system_inquiry: 'System Inquiry',
  owner_operation_inquiry: 'Operation Inquiry',
  owner_performance: 'Performance Analytics',
  owner_reports: 'Financial Reports',
  owner_work_manuals: 'Work Manuals',
  owner_activity_logs: 'Change History',
  // Foodcourt — additional product/inventory modules
  fc_products: 'Product Management',
  fc_inventory: 'Inventory Management',
  // Supplier
  supplier_products: 'Product Management',
  supplier_inventory: 'Inventory Management',
  supplier_directory: 'Directory Listing',
  supplier_contracts: 'Contract Management',
  supplier_customers: 'Customer Management',
  supplier_orders: 'Order Management',
  supplier_shipping: 'Shipping & Delivery',
  supplier_trade_invoices: 'Trade Invoice',
  supplier_soa: 'Statement of Account',
  supplier_admin_staff: 'Admin & Staff Management',
  supplier_performance: 'Performance Analytics',
  supplier_activity_logs: 'Change History',
  supplier_multi_warehouse: 'Multi-Warehouse',
  // Buyer-side (shared B2B modules — Restaurant / Brand / Foodcourt all reuse)
  buyer_supplier_directory: 'Supplier Directory',
  buyer_supplier_contracts: 'Supplier Contracts',
  buyer_purchase_orders: 'Purchase Orders',
  buyer_purchase_invoices: 'Purchase Invoices',
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
  'AE': 'AED',  // 아랍에미리트
  'SA': 'SAR',  // 사우디아라비아
};

const PricingPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const VALID_TABS = ['restaurant', 'brand', 'foodcourt', 'owner', 'supplier'] as const;
  type TabKey = typeof VALID_TABS[number];
  const initialTab = (VALID_TABS.includes(searchParams.get('tab') as TabKey) ? searchParams.get('tab') : 'restaurant') as TabKey;
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  // Sync activeTab to URL ?tab= so each tab is shareable as a deep link
  useEffect(() => {
    const current = searchParams.get('tab');
    if (current !== activeTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', activeTab);
      setSearchParams(next, { replace: true });
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // React to back/forward navigation that changes the tab query
  useEffect(() => {
    const fromUrl = searchParams.get('tab') as TabKey | null;
    if (fromUrl && VALID_TABS.includes(fromUrl) && fromUrl !== activeTab) {
      setActiveTab(fromUrl);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [allModules, setAllModules] = useState<Array<{ module_code: string; name: string; category: string; target_user_type: string }>>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('MYR');

  // 브라우저 언어 기반 통화 감지 (fallback용)
  const detectCurrencyFromBrowserLanguage = (): string => {
    try {
      const locale = navigator.language || 'en-US';
      const regionCode = locale.split('-')[1]?.toUpperCase() || '';
      return countryToCurrency[regionCode] || 'MYR';
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
    loadModules();
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

  const loadModules = async () => {
    try {
      const response = await fetch('/api/addon-modules?active_only=true');
      if (response.ok) {
        const data = await response.json();
        const modules = Array.isArray(data) ? data : (data.data || data.modules || []);
        setAllModules(modules);
      }
    } catch (error) {
      console.error('Failed to load modules:', error);
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

  // API에서 가져온 플랜 데이터 기반으로 탭 동적 생성
  const TAB_LABELS: Record<string, string> = {
    restaurant: 'Restaurant',
    brand: 'Brand',
    foodcourt: 'Foodcourt',
    owner: 'Owner',
    supplier: 'Supplier'
  };
  const TAB_ORDER = ['restaurant', 'brand', 'foodcourt', 'owner', 'supplier'];
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
          <HeroTitle>{t('landing:pricingPage.simpleTransparentPricing')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:pricingPage.chooseThePlanThatFitsYourBusinessNoHidde')}
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
              <CurrencyLabel>{t('landing:pricingPage.currency')}</CurrencyLabel>
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
            <div style={{ textAlign: 'center', padding: '40px' }}>{t('landing:pricingPage.loadingPlans')}</div>
          ) : displayPlans.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
              {t('landing:pricingPage.noPlansAvailableForThisCategoryYet')}
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
                    {isPopular && <PopularBadge>{t('landing:pricingPage.mostPopular')}</PopularBadge>}
                    <PlanName>{plan.display_name}</PlanName>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#635BFF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '24px', textAlign: 'center' }}>
                      {plan.plan_target === 'restaurant' ? 'Restaurant Plan' : plan.plan_target === 'brand' ? 'Brand Plan' : plan.plan_target === 'foodcourt' ? 'Foodcourt Plan' : 'Owner Plan'}
                    </div>

                    <PriceSection>
                      {monthlyPrice === 0 ? (
                        <MonthlyPrice>{t('landing:pricingPage.contactUs')}</MonthlyPrice>
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
                          <BillingNote>{t('landing:pricingPage.billedMonthlyOrAnnually')}</BillingNote>
                        </>
                      )}
                    </PriceSection>

                    <LimitsSection>
                      {plan.plan_target === 'restaurant' && (
                        <>
                          <LimitItem>
                            <LimitLabel>{t('landing:pricingPage.staffLimit')}</LimitLabel>
                            <LimitValue>{formatLimit(plan.staff_limit)}</LimitValue>
                          </LimitItem>
                          <LimitItem>
                            <LimitLabel>{t('landing:pricingPage.ordersmonth')}</LimitLabel>
                            <LimitValue>{formatLimit(plan.order_limit)}</LimitValue>
                          </LimitItem>
                          <LimitItem>
                            <LimitLabel>{t('landing:pricingPage.menuItems')}</LimitLabel>
                            <LimitValue>{formatLimit(plan.menu_item_limit)}</LimitValue>
                          </LimitItem>
                        </>
                      )}
                      {(plan.plan_target === 'brand' || plan.plan_target === 'foodcourt') && (
                        <>
                          <LimitItem>
                            <LimitLabel>{t('landing:pricingPage.restaurants')}</LimitLabel>
                            <LimitValue>{formatLimit(plan.restaurant_limit)}</LimitValue>
                          </LimitItem>
                          <LimitItem>
                            <LimitLabel>{t('landing:pricingPage.managers')}</LimitLabel>
                            <LimitValue>{formatLimit(plan.manager_limit)}</LimitValue>
                          </LimitItem>
                        </>
                      )}
                      {plan.plan_target === 'owner' && (
                        <LimitItem>
                          <LimitLabel>{t('landing:pricingPage.restaurants')}</LimitLabel>
                          <LimitValue>{formatLimit(plan.restaurant_limit)}</LimitValue>
                        </LimitItem>
                      )}
                    </LimitsSection>

                    {(() => {
                      // Owner 는 매입을 하지 않으므로 buyer_* 4 모듈은 owner plan 에서 제외
                      const targetModules = allModules.filter(m => {
                        const matches = m.target_user_type === plan.plan_target || m.target_user_type === 'all';
                        if (!matches) return false;
                        if (plan.plan_target === 'owner' && m.module_code.startsWith('buyer_')) return false;
                        return true;
                      });
                      const basicMods = targetModules.filter(m => m.category === 'basic');
                      const advancedMods = targetModules.filter(m => m.category !== 'basic');
                      const includedSet = new Set(plan.included_modules || []);

                      if (targetModules.length === 0 && plan.included_modules?.length > 0) {
                        // Fallback: allModules not loaded yet, show included only
                        return (
                          <ModulesSection>
                            <ModulesTitle>Included Modules ({plan.included_modules.length})</ModulesTitle>
                            <ModulesList>
                              {plan.included_modules.map((code, i) => (
                                <ModuleItem key={i} included>
                                  <ModuleCheck included><Check size={14} /></ModuleCheck>
                                  {MODULE_NAMES[code] || code}
                                </ModuleItem>
                              ))}
                            </ModulesList>
                          </ModulesSection>
                        );
                      }

                      return targetModules.length > 0 ? (
                        <ModulesSection>
                          <ModulesTitle>{t('landing:pricingPage.modules')}</ModulesTitle>
                          <ModulesList>
                            {basicMods.length > 0 && (
                              <ModuleCategoryLabel>{t('landing:pricingPage.basic')}</ModuleCategoryLabel>
                            )}
                            {basicMods.map((m) => (
                              <ModuleItem key={m.module_code} included={includedSet.has(m.module_code)}>
                                <ModuleCheck included={includedSet.has(m.module_code)}>
                                  {includedSet.has(m.module_code) ? <Check size={14} /> : <Minus size={14} />}
                                </ModuleCheck>
                                {MODULE_NAMES[m.module_code] || m.name}
                              </ModuleItem>
                            ))}
                            {advancedMods.length > 0 && (
                              <ModuleCategoryLabel>{t('landing:pricingPage.advanced')}</ModuleCategoryLabel>
                            )}
                            {advancedMods.map((m) => (
                              <ModuleItem key={m.module_code} included={includedSet.has(m.module_code)}>
                                <ModuleCheck included={includedSet.has(m.module_code)}>
                                  {includedSet.has(m.module_code) ? <Check size={14} /> : <Minus size={14} />}
                                </ModuleCheck>
                                {MODULE_NAMES[m.module_code] || m.name}
                              </ModuleItem>
                            ))}
                          </ModulesList>
                        </ModulesSection>
                      ) : null;
                    })()}

                    {plan.features && plan.features.length > 0 && plan.features[0] !== '' && (
                      <FeaturesList>
                        {plan.features.filter(f => f && f.trim()).map((feature, index) => (
                          <FeatureItem key={index}>
                            <FeatureCheck><Check size={14} /></FeatureCheck>
                            {feature}
                          </FeatureItem>
                        ))}
                      </FeaturesList>
                    )}

                    <ContactButton
                      primary={isPopular}
                      onClick={() => navigate('/signup', {
                        state: {
                          plan_target: activeTab,
                          plan_id: plan.id
                        }
                      })}
                    >
                      {t('landing:pricingPage.startFreeTrial')}
                    </ContactButton>
                  </PlanCard>
                );
              })}
            </PlansGrid>
          )}
        </ContentSection>

        <CTASection>
          <CTATitle>{t('landing:pricingPage.needPosHardware')}</CTATitle>
          <CTASubtitle>
            {t('landing:pricingPage.chooseFromReadymadeHardwarePackagesWithE')}
          </CTASubtitle>
          <CTAButton onClick={() => navigate('/packages')}>
            {t('landing:pricingPage.viewHardwarePackages')}
          </CTAButton>
        </CTASection>
      </PageContainer>
    </LandingLayout>
  );
};

export default PricingPage;
