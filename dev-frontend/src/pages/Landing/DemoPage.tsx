import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { setAuthToken } from '../../utils/auth';

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

const ContentSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DemoCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 500px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;

  &::before {
    content: '~';
    color: #10B981;
    font-weight: bold;
  }
`;

const LoginButton = styled.button<{ isLoading?: boolean }>`
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.isLoading ? '#5A51E6' : '#635BFF'};
  color: white;
  border: none;
  margin-top: auto;
  position: relative;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const NoticeBox = styled.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 12px;
  padding: 20px;
  margin-top: 40px;
  text-align: center;
`;

const NoticeTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
`;

const NoticeText = styled.p`
  font-size: 14px;
  color: #78350F;
  margin: 0;
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

const ErrorMessage = styled.div`
  background: #FEE2E2;
  color: #991B1B;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`;

// Demo account metadata — passwords are NOT shipped in the bundle.
// Server resolves the email by `key` via /api/auth/demo-login (gated by is_demo flag).
// Order: Restaurant Admin, Brand General, Foodcourt General, Multi-Restaurant Owner, Supplier Admin
const DEMO_ACCOUNTS_LIST = [
  {
    key: 'demo_restaurant_admin',
    role: 'Restaurant Admin',
    icon: 'R',
    color: '#0891B2',
    description: 'Full restaurant management — POS, kitchen, menu, reports',
    features: ['POS Terminal', 'Kitchen Display', 'Menu Management', 'Reports & Analytics', 'Customer Management']
  },
  {
    key: 'demo_brand_general',
    role: 'Brand General',
    icon: 'B',
    color: '#059669',
    description: 'Manage multiple brands and restaurants from a single dashboard',
    features: ['Multi-brand dashboard', 'Restaurant oversight', 'Centralized inventory', 'Performance reports', 'Staff management']
  },
  {
    key: 'demo_foodcourt_general',
    role: 'Foodcourt General',
    icon: 'F',
    color: '#EA580C',
    description: 'Operate a foodcourt — tenants, common products, contracts, invoicing',
    features: ['Tenant management', 'Common product catalog', 'Contract & invoicing', 'Floor plan', 'Foodcourt reports']
  },
  {
    key: 'demo_multi_owner',
    role: 'Multi-Restaurant Owner',
    icon: 'O',
    color: '#7C3AED',
    description: 'Financial dashboard across multiple restaurants you own',
    features: ['Multi-restaurant P&L', 'Cross-location reports', 'Operation inquiries', 'Subscription overview']
  },
  {
    key: 'demo_supplier_admin',
    role: 'Supplier Admin',
    icon: 'S',
    color: '#9333EA',
    description: 'B2B supplier portal — products, contracts, purchase orders, trade invoices',
    features: ['Product catalog', 'Restaurant contracts', 'Purchase orders', 'Trade invoices', 'SOA bundling']
  }
];

const DemoPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  /**
   * Default route per role — matches App.tsx role-based redirect.
   */
  function defaultRouteForUser(user: any): string {
    switch (user?.role) {
      case 'Brand General':
      case 'Brand Manager':
        return '/pos/brand/general/dashboard';
      case 'Foodcourt General':
      case 'Foodcourt Manager':
        return '/pos/foodcourt/general/dashboard';
      case 'Restaurant Owner':
        return '/pos/owner/dashboard';
      case 'Supplier Admin':
      case 'Supplier Staff':
        return '/pos/supplier/dashboard';
      case 'Restaurant Admin':
      case 'Staff': {
        const rid = user?.restaurant_id || user?.restaurantId;
        return rid ? `/restaurant/${rid}/dashboard` : '/';
      }
      default:
        return '/';
    }
  }

  const handleDemoLogin = async (account: typeof DEMO_ACCOUNTS_LIST[number]) => {
    setLoading(account.key);
    setError('');
    try {
      const response = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: account.key })
      });
      const data = await response.json();
      if (response.ok && data.success && data.data && data.data.token) {
        setAuthToken(data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        await loginAsDemo(account.key);
        navigate(defaultRouteForUser(data.data.user));
      } else {
        setError(data?.error?.message || data.message || 'Demo account login failed. Please contact support.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <LandingLayout>
      <SEOHead
        title="Try Demo - Experience PurpleHere POS"
        description="Try PurpleHere POS system live with our interactive demo. Explore features for restaurants, brands, and food courts - no signup required."
        keywords="POS demo, try POS system, restaurant POS demo, free POS trial"
        canonicalUrl="https://purplehere.com/demo"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:demoPage.tryPurpleherePos')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:demoPage.experienceOurSystemWithDemoAccountsNoSig')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <DemoGrid>
            {DEMO_ACCOUNTS_LIST.map(account => (
              <DemoCard key={account.key}>
                <CardIcon>{account.icon}</CardIcon>
                <CardTitle>{account.role}</CardTitle>
                <CardDescription>{account.description}</CardDescription>
                <FeatureList>
                  {account.features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
                <LoginButton
                  onClick={() => handleDemoLogin(account)}
                  disabled={loading === account.key}
                  isLoading={loading === account.key}
                >
                  {loading === account.key ? 'Logging in...' : `Login as ${account.role}`}
                </LoginButton>
              </DemoCard>
            ))}
          </DemoGrid>

          <NoticeBox>
            <NoticeTitle>{t('landing:demoPage.demoAccountNotice')}</NoticeTitle>
            <NoticeText>
              Demo accounts are reset daily at midnight (site timezone).
              Any changes you make will be restored to the default state.
            </NoticeText>
          </NoticeBox>
        </ContentSection>

        <CTASection>
          <CTATitle>{t('landing:demoPage.wantYourOwnAccount')}</CTATitle>
          <CTASubtitle>
            {t('landing:demoPage.contactOurSalesTeamToSetUpYourPersonaliz')}
          </CTASubtitle>
          <CTAButton onClick={() => navigate('/contact')}>
            {t('landing:demoPage.contactUs')}
          </CTAButton>
        </CTASection>
      </PageContainer>
    </LandingLayout>
  );
};

export default DemoPage;
