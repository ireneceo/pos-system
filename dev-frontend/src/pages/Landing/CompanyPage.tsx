import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
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
  color: #4B5563;
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
  color: #4B5563;
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
  border: 1px solid #C7CED6;
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
  color: #4B5563;
  margin: 0;
`;

const CompanyPage: React.FC = () => {
  const { t } = useTranslation('landing');
  // 회사 메일은 사이트 설정(/api/site-settings 의 email)이 단일 소스 — Contact 페이지·푸터와 같은 값.
  const [companyEmail, setCompanyEmail] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/site-settings')
      .then(res => (res.ok ? res.json() : null))
      .then(data => { if (alive && data?.email) setCompanyEmail(data.email); })
      .catch(() => { /* 못 읽으면 메일 줄을 숨긴다 */ });
    return () => { alive = false; };
  }, []);
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
          <HeroTitle>{t('landing:companyPage.aboutOurCompany')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:companyPage.technologyCommercializationThroughExpert')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>{t('landing:companyPage.companyInformation')}</SectionTitle>
            <CompanyName>{t('landing:companyPage.gitConsultingSdnBhd')}</CompanyName>
            <Paragraph>
{t('landing:companyPage.companyIntro')}
            </Paragraph>
            <AddressBlock>
              <AddressText>
                {t('landing:companyPage.p0206aTropicanaAvenuePersiaranTropicana')}<br />
                {t('landing:companyPage.tropicanaGolfCountryResort')}<br />
                47410, Petaling Jaya, Selangor, Malaysia
              </AddressText>
              {companyEmail && (
                <ContactItem>
                  <ContactLabel>{t('landing:companyPage.email')}</ContactLabel>
                  <ContactLink href={`mailto:${companyEmail}`}>
                    {companyEmail}
                  </ContactLink>
                </ContactItem>
              )}
            </AddressBlock>
          </Section>

          <Section>
            <SectionTitle>{t('landing:companyPage.ourExpertise')}</SectionTitle>
            <Paragraph>
{t('landing:companyPage.expertiseBody')}
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:companyPage.coreServices')}</SectionTitle>
            <ServiceGrid>
              <ServiceCard>
                <ServiceTitle>{t('landing:companyPage.consulting')}</ServiceTitle>
                <ServiceDescription>
{t('landing:companyPage.consultingBody')}
                </ServiceDescription>
              </ServiceCard>
              <ServiceCard>
                <ServiceTitle>{t('landing:companyPage.technicalSupport')}</ServiceTitle>
                <ServiceDescription>
{t('landing:companyPage.technicalSupportBody')}
                </ServiceDescription>
              </ServiceCard>
              <ServiceCard>
                <ServiceTitle>{t('landing:companyPage.businessServices')}</ServiceTitle>
                <ServiceDescription>
{t('landing:companyPage.businessServicesBody')}
                </ServiceDescription>
              </ServiceCard>
            </ServiceGrid>
          </Section>

          <Section>
            <SectionTitle>{t('landing:companyPage.ourApproach')}</SectionTitle>
            <Paragraph>
{t('landing:companyPage.approachBody')}
            </Paragraph>
          </Section>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default CompanyPage;
