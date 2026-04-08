import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import { BaseButton } from '../../components/UI';
import SEOHead, { generateOrganizationSchema, generateSoftwareSchema, generateWebSiteSchema, generateLocalBusinessSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: calc(100vh - 80px);
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 20px 40px;
  color: white;
`;

const HeroImage = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto -200px;
  padding: 0 20px;
  position: relative;
  z-index: 2;

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 1024px) {
    margin-bottom: -150px;
  }

  @media (max-width: 768px) {
    width: 95%;
    margin-bottom: -100px;
    padding: 0 16px;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #667eea;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #5A51E6;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 80px 50px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  color: white;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
`;

const HomePage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();

  const jsonLdData = [
    generateOrganizationSchema(),
    generateSoftwareSchema(),
    generateWebSiteSchema(),
    generateLocalBusinessSchema()
  ];
  return (
    <LandingLayout>
      <SEOHead
        title="Cloud POS System for Restaurants"
        description="PurpleHere is a subscription-based cloud POS system for restaurants, brands, and food courts. Real-time order management, inventory tracking, multi-location support. Start your 7-day free trial today."
        keywords="POS system, restaurant POS, cloud POS, food court management, brand management, order management, inventory tracking"
        ogType="website"
        canonicalUrl="https://purplehere.com"
        jsonLd={jsonLdData}
      />
      <PageContainer>
        <Hero>
          <Title dangerouslySetInnerHTML={{ __html: t('landing:homePage.heroTitle') }} />
          <Subtitle dangerouslySetInnerHTML={{ __html: t('landing:homePage.heroSubtitle') }} />
          <ButtonGroup>
            <PrimaryButton onClick={() => navigate('/demo')}>
              {t('landing:homePage.tryDemo')}
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/pricing')}>
              {t('landing:homePage.viewPricing')}
            </SecondaryButton>
          </ButtonGroup>
        </Hero>

        <HeroImage>
          <img src="/images/hero-dashboard.webp" alt="PurpleHere POS Dashboard" />
        </HeroImage>

        <Features>
          <FeatureCard>
            <FeatureIcon aria-hidden="true">◎</FeatureIcon>
            <FeatureTitle>{t('landing:homePage.feature1Title')}</FeatureTitle>
            <FeatureDescription>
              {t('landing:homePage.feature1Desc')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon aria-hidden="true">☰</FeatureIcon>
            <FeatureTitle>{t('landing:homePage.feature2Title')}</FeatureTitle>
            <FeatureDescription>
              {t('landing:homePage.feature2Desc')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon aria-hidden="true">◈</FeatureIcon>
            <FeatureTitle>{t('landing:homePage.feature3Title')}</FeatureTitle>
            <FeatureDescription>
              {t('landing:homePage.feature3Desc')}
            </FeatureDescription>
          </FeatureCard>
        </Features>
      </PageContainer>
    </LandingLayout>
  );
};

export default HomePage;
