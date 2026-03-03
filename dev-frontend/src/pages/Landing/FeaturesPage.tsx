import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateHowToSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const CategorySection = styled.div`
  margin-bottom: 60px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const CategorySubtitle = styled.p`
  font-size: 16px;
  color: #6B7C93;
  margin-bottom: 40px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    border-color: #635BFF;
  }
`;

const FeatureIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
  color: #D1D5DB;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const FeaturePoints = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeaturePoint = styled.li`
  font-size: 13px;
  color: #374151;
  padding: 6px 0;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
  margin-top: 60px;
  border-radius: 16px;
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

const BRAND_FEATURES = [
  {
    icon: '○',
    title: 'Multi-Brand Dashboard',
    description: 'Centralized control for all your brands and outlets',
    points: [
      'Real-time overview of all locations',
      'Performance comparison across brands',
      'Consolidated reporting and analytics',
      'Quick access to any brand or outlet'
    ]
  },
  {
    icon: '○',
    title: 'Centralized Menu Management',
    description: 'Manage menus across all outlets from one place',
    points: [
      'Global menu templates',
      'Push updates to selected outlets',
      'Price and item variations by location',
      'Category and modifier management'
    ]
  },
  {
    icon: '○',
    title: 'Advanced Analytics',
    description: 'Deep insights into brand performance',
    points: [
      'Sales trends and forecasting',
      'Best/worst performing items',
      'Peak hours analysis',
      'Customer behavior patterns'
    ]
  },
  {
    icon: '○',
    title: 'Inventory & Recipe Management',
    description: 'Track ingredients and recipes across locations',
    points: [
      'Centralized recipe database',
      'Ingredient cost tracking',
      'Stock level monitoring',
      'Automatic deductions on sales'
    ]
  },
  {
    icon: '○',
    title: 'Invoice & Billing',
    description: 'Automated invoice generation and management',
    points: [
      'Recurring invoice scheduling',
      'Multiple payment tracking',
      'Category-based organization',
      'Export reports for accounting'
    ]
  },
  {
    icon: '○',
    title: 'Staff Management',
    description: 'Manage staff across all outlets',
    points: [
      'Role-based access control',
      'Permission management',
      'Staff performance tracking',
      'Multi-outlet assignments'
    ]
  }
];

const RESTAURANT_FEATURES = [
  {
    icon: '○',
    title: 'POS Terminal',
    description: 'Fast and intuitive point-of-sale system',
    points: [
      'Quick order entry',
      'Split bill & multiple payments',
      'Discount and coupon application',
      'Receipt printing & email'
    ]
  },
  {
    icon: '○',
    title: 'Kitchen Display System (KDS)',
    description: 'Real-time order management for kitchen',
    points: [
      'Color-coded order priorities',
      'Preparation time tracking',
      'Order status updates',
      'Bump orders when complete'
    ]
  },
  {
    icon: '○',
    title: 'Mobile Ordering (QR Code)',
    description: 'Let customers order from their phones',
    points: [
      'QR code table ordering',
      'Digital menu with images',
      'Real-time order tracking',
      'Payment integration'
    ]
  },
  {
    icon: '○',
    title: 'Coupon & Promotions',
    description: 'Create and manage promotional campaigns',
    points: [
      'Percentage or fixed discounts',
      'Minimum order requirements',
      'Usage limits and expiry dates',
      'Track coupon performance'
    ]
  },
  {
    icon: '○',
    title: 'Sales Reports',
    description: 'Comprehensive sales and performance reports',
    points: [
      'Daily, weekly, monthly reports',
      'Sales by category and item',
      'Payment method breakdown',
      'Export to CSV/Excel'
    ]
  },
  {
    icon: '○',
    title: 'Customer Management',
    description: 'Build customer loyalty and track preferences',
    points: [
      'Customer database',
      'Order history tracking',
      'Loyalty points system',
      'Customer segmentation'
    ]
  }
];

const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <SEOHead
        title="Features - Powerful POS Tools for Every Business"
        description="Explore PurpleHere's powerful features: POS terminal, menu management, real-time analytics, multi-branch support, kitchen display, and more."
        keywords="POS features, restaurant management features, kitchen display, menu management, order management, analytics"
        canonicalUrl="https://purplehere.com/features"
        jsonLd={[
          generateHowToSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: 'https://purplehere.com' },
            { name: 'Features', url: 'https://purplehere.com/features' }
          ])
        ]}
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>Powerful Features for Every Need</HeroTitle>
          <HeroSubtitle>
            From multi-brand management to individual restaurant operations,
            we've got you covered with innovative solutions.
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <CategorySection>
            <CategoryTitle>
              Brand General Features
            </CategoryTitle>
            <CategorySubtitle>
              Comprehensive tools for managing multiple brands and outlets from a single dashboard
            </CategorySubtitle>
            <FeaturesGrid>
              {BRAND_FEATURES.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  <FeaturePoints>
                    {feature.points.map((point, idx) => (
                      <FeaturePoint key={idx}>{point}</FeaturePoint>
                    ))}
                  </FeaturePoints>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </CategorySection>

          <CategorySection>
            <CategoryTitle>
              Restaurant Admin Features
            </CategoryTitle>
            <CategorySubtitle>
              Essential tools for individual restaurant management and daily operations
            </CategorySubtitle>
            <FeaturesGrid>
              {RESTAURANT_FEATURES.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  <FeaturePoints>
                    {feature.points.map((point, idx) => (
                      <FeaturePoint key={idx}>{point}</FeaturePoint>
                    ))}
                  </FeaturePoints>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </CategorySection>

          <CTASection>
            <CTATitle>Ready to Transform Your Business?</CTATitle>
            <CTASubtitle>
              Try our demo accounts or contact us to get started with PurpleHere
            </CTASubtitle>
            <CTAButton onClick={() => navigate('/demo')}>
              Try Demo Now
            </CTAButton>
          </CTASection>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default FeaturesPage;
