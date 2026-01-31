import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import { BaseButton } from '../../components/UI';

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
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #E6EBF1;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIcon = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
`;

const ServiceTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #6B7C93;
  margin-bottom: 16px;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeature = styled.li`
  font-size: 14px;
  color: #374151;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '~';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
  }
`;

const CTASection = styled.section`
  background: white;
  padding: 48px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #E6EBF1;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 16px;
`;

const CTAText = styled.p`
  font-size: 16px;
  color: #6B7C93;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 24px;
`;

const CTAButton = styled(BaseButton)`
  background: #635BFF;
  color: white;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }
`;

const ServicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <PageContainer>
        <HeroSection>
          <HeroTitle>Our Services</HeroTitle>
          <HeroSubtitle>
            Complete POS solutions for food courts, brands, and restaurants
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <ServiceGrid>
            <ServiceCard>
              <ServiceIcon>*</ServiceIcon>
              <ServiceTitle>Food Court Management</ServiceTitle>
              <ServiceDescription>
                An integrated solution for efficiently managing food courts with multiple stores
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeature>Food court general manager hierarchy</ServiceFeature>
                <ServiceFeature>Rent and contract management</ServiceFeature>
                <ServiceFeature>Real-time monitoring of tenant stores</ServiceFeature>
                <ServiceFeature>Integrated sales analysis and reports</ServiceFeature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard>
              <ServiceIcon>#</ServiceIcon>
              <ServiceTitle>Brand Integration</ServiceTitle>
              <ServiceDescription>
                A centralized management system for brands operating multiple locations
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeature>Brand general manager authority system</ServiceFeature>
                <ServiceFeature>All-branch performance dashboard</ServiceFeature>
                <ServiceFeature>Unified menu and pricing management</ServiceFeature>
                <ServiceFeature>Branch-by-branch comparative analysis</ServiceFeature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard>
              <ServiceIcon>$</ServiceIcon>
              <ServiceTitle>POS System</ServiceTitle>
              <ServiceDescription>
                An all-in-one POS solution for intuitive and fast store operations
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeature>Touch-based intuitive UI</ServiceFeature>
                <ServiceFeature>Real-time order and kitchen display</ServiceFeature>
                <ServiceFeature>Multiple payment method support</ServiceFeature>
                <ServiceFeature>Menu, option, and category management</ServiceFeature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard>
              <ServiceIcon>@</ServiceIcon>
              <ServiceTitle>Mobile Ordering</ServiceTitle>
              <ServiceDescription>
                A convenient mobile ordering system via QR codes
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeature>Instant ordering via QR code scan</ServiceFeature>
                <ServiceFeature>Automatic table number recognition</ServiceFeature>
                <ServiceFeature>Real-time order notifications</ServiceFeature>
                <ServiceFeature>Mobile payment integration</ServiceFeature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard>
              <ServiceIcon>%</ServiceIcon>
              <ServiceTitle>Analytics & Reports</ServiceTitle>
              <ServiceDescription>
                Powerful analytics tools for data-driven decision making
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeature>Daily/weekly/monthly sales analysis</ServiceFeature>
                <ServiceFeature>Popular menu and trend analysis</ServiceFeature>
                <ServiceFeature>Time-based order pattern analysis</ServiceFeature>
                <ServiceFeature>Customizable reports</ServiceFeature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard>
              <ServiceIcon>&</ServiceIcon>
              <ServiceTitle>Unified Management</ServiceTitle>
              <ServiceDescription>
                Manage staff, customers, and invoices all in one place
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeature>Staff account and permission management</ServiceFeature>
                <ServiceFeature>Customer information and points</ServiceFeature>
                <ServiceFeature>Automatic invoice generation</ServiceFeature>
                <ServiceFeature>Promotion and discount management</ServiceFeature>
              </ServiceFeatures>
            </ServiceCard>
          </ServiceGrid>

          <CTASection>
            <CTATitle>Ready to Get Started?</CTATitle>
            <CTAText>
              View our pricing plans and find the perfect solution for your business.
              Try our demo to experience all features firsthand.
            </CTAText>
            <CTAButton onClick={() => navigate('/demo')}>
              Try Demo
            </CTAButton>
          </CTASection>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default ServicePage;
