import React from 'react';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
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

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CompanyName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`;

const AddressBlock = styled.div`
  background: #F8F9FB;
  border-left: 4px solid #635BFF;
  padding: 16px 20px;
  margin: 20px 0;
  border-radius: 4px;
`;

const AddressText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #0A2540;
  margin: 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const ContactLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  min-width: 60px;
`;

const ContactLink = styled.a`
  font-size: 15px;
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const ServiceCard = styled.div`
  background: #F8F9FB;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
`;

const ServiceTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #6B7C93;
  margin: 0;
`;

const CompanyPage: React.FC = () => {
  return (
    <LandingLayout>
      <SEOHead
        title="Company Information - GIT Consulting Sdn. Bhd."
        description="GIT Consulting Sdn. Bhd. operates PurpleHere, a cloud-based POS platform for restaurants, brands, and food courts based in Malaysia."
        keywords="GIT Consulting, PurpleHere company, Malaysia POS company, restaurant technology company"
        canonicalUrl="https://purplehere.com/company"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>About Our Company</HeroTitle>
          <HeroSubtitle>
            Technology commercialization through expert consulting and operational support
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>Company Information</SectionTitle>
            <CompanyName>GIT CONSULTING SDN. BHD.</CompanyName>
            <Paragraph>
              An official corporation registered in Malaysia, providing technology commercialization
              through technical advice, consulting, and operational support services.
            </Paragraph>
            <AddressBlock>
              <AddressText>
                P-02-06A, Tropicana Avenue, Persiaran Tropicana<br />
                Tropicana Golf & Country Resort<br />
                47410, Petaling Jaya, Selangor, Malaysia
              </AddressText>
              <ContactItem>
                <ContactLabel>Email:</ContactLabel>
                <ContactLink href="mailto:help@gitconsulting.group">
                  help@gitconsulting.group
                </ContactLink>
              </ContactItem>
            </AddressBlock>
          </Section>

          <Section>
            <SectionTitle>Our Expertise</SectionTitle>
            <Paragraph>
              We bridge the gap between traditional business consulting and technical implementation.
              While general consulting firms often lack technical expertise and focus solely on
              management consulting, GIT combines deep technical knowledge with practical operational
              support to deliver comprehensive solutions.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Core Services</SectionTitle>
            <ServiceGrid>
              <ServiceCard>
                <ServiceTitle>Consulting</ServiceTitle>
                <ServiceDescription>
                  IT consulting, startup guidance, management consulting, overseas expansion,
                  and business modeling expertise
                </ServiceDescription>
              </ServiceCard>
              <ServiceCard>
                <ServiceTitle>Technical Support</ServiceTitle>
                <ServiceDescription>
                  Expert matching, continuous technical analysis, and high-quality reporting
                  for technology projects
                </ServiceDescription>
              </ServiceCard>
              <ServiceCard>
                <ServiceTitle>Business Services</ServiceTitle>
                <ServiceDescription>
                  Branding, marketing, design, website development, and comprehensive startup
                  support services
                </ServiceDescription>
              </ServiceCard>
            </ServiceGrid>
          </Section>

          <Section>
            <SectionTitle>Our Approach</SectionTitle>
            <Paragraph>
              We provide end-to-end support combining strategic consulting with hands-on technical
              implementation. Our team of experts delivers continuous technical analysis, expert
              matching, and operational support to help businesses succeed in technology-driven markets.
            </Paragraph>
          </Section>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default CompanyPage;
