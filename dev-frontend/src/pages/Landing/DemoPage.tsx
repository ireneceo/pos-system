import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

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

// Demo account credentials
const DEMO_ACCOUNTS = {
  brand_general: {
    email: 'demo-brand@purplehere.com',
    password: 'Demo@2024',
    role: 'Brand General',
    icon: '#',
    description: 'Manage multiple brands and restaurants from a single dashboard',
    features: [
      'Multi-brand dashboard',
      'Restaurant management',
      'Centralized inventory',
      'Performance reports',
      'Staff management'
    ]
  },
  restaurant_admin: {
    email: 'demo-restaurant@purplehere.com',
    password: 'Demo@2024',
    role: 'Restaurant Admin',
    icon: '%',
    description: 'Full restaurant management experience with all features',
    features: [
      'POS Terminal',
      'Kitchen Display',
      'Menu Management',
      'Reports & Analytics',
      'Customer Management'
    ]
  }
};

const DemoPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleDemoLogin = async (accountType: 'brand_general' | 'restaurant_admin') => {
    setLoading(accountType);
    setError('');

    const account = DEMO_ACCOUNTS[accountType];

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: account.email,
          password: account.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success && data.data && data.data.token) {
        // Store token and user info
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        // Call login from AuthContext
        await login(account.email, account.password);

        // Redirect based on role
        if (accountType === 'brand_general') {
          navigate('/pos/brand/general/dashboard');
        } else {
          const restaurantId = data.data.user?.restaurant_id || data.data.user?.restaurantId;
          navigate(`/restaurant/${restaurantId}/dashboard`);
        }
      } else {
        setError(data.message || data.error || 'Demo account login failed. Please contact support.');
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
            <DemoCard>
              <CardIcon>{DEMO_ACCOUNTS.brand_general.icon}</CardIcon>
              <CardTitle>{t('landing:demoPage.brandGeneral')}</CardTitle>
              <CardDescription>
                {DEMO_ACCOUNTS.brand_general.description}
              </CardDescription>
              <FeatureList>
                {DEMO_ACCOUNTS.brand_general.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
              <LoginButton
                onClick={() => handleDemoLogin('brand_general')}
                disabled={loading === 'brand_general'}
                isLoading={loading === 'brand_general'}
              >
                {loading === 'brand_general' ? 'Logging in...' : 'Login as Brand General'}
              </LoginButton>
            </DemoCard>

            <DemoCard>
              <CardIcon>{DEMO_ACCOUNTS.restaurant_admin.icon}</CardIcon>
              <CardTitle>{t('landing:demoPage.restaurantAdmin')}</CardTitle>
              <CardDescription>
                {DEMO_ACCOUNTS.restaurant_admin.description}
              </CardDescription>
              <FeatureList>
                {DEMO_ACCOUNTS.restaurant_admin.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
              <LoginButton
                onClick={() => handleDemoLogin('restaurant_admin')}
                disabled={loading === 'restaurant_admin'}
                isLoading={loading === 'restaurant_admin'}
              >
                {loading === 'restaurant_admin' ? 'Logging in...' : 'Login as Restaurant'}
              </LoginButton>
            </DemoCard>
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
