import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
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
  padding: 80px 24px 88px;
  background: linear-gradient(120deg, #635BFF 0%, #8775FF 60%, #B49EFF 100%);
  color: white;

  @media (max-width: 640px) {
    padding: 56px 16px 64px;
  }
`;

const HeroBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 18px;
`;

const HeroTitle = styled.h1`
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -1px;
  margin: 0 0 18px;
  line-height: 1.15;
  max-width: 760px;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 640px) { font-size: 32px; }
`;

const HeroSubtitle = styled.p`
  font-size: 17px;
  max-width: 640px;
  margin: 0 auto 28px;
  opacity: 0.92;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 640px) { font-size: 15px; }
`;

const ContentSection = styled.section`
  max-width: 1080px;
  margin: 0 auto;
  padding: 72px 24px;

  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 56px 48px;
  margin-bottom: 28px;
  box-shadow: 0 6px 24px rgba(10, 37, 64, 0.04);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 16px;
  }
`;

const SectionEyebrow = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PainCard = styled.div`
  background: #FAFBFC;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid #EF4444;
`;

const PainTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px;
  line-height: 1.4;
`;

const PainDesc = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin: 0;
`;

const SolutionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
`;

const SolutionCard = styled.div<{ tinted?: boolean }>`
  background: ${p => p.tinted ? 'linear-gradient(135deg, #FAFBFF 0%, #F4F2FF 100%)' : 'white'};
  border: 1px solid #E6EBF1;
  border-radius: 16px;
  padding: 36px 40px;
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 16px;
  }
`;

const SolutionLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SolutionNumber = styled.div`
  font-size: 56px;
  font-weight: 800;
  color: #635BFF;
  line-height: 1;
  letter-spacing: -2px;
  opacity: 0.85;

  @media (max-width: 640px) { font-size: 40px; }
`;

const SolutionRole = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #635BFF;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

const SolutionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.3px;

  @media (max-width: 640px) { font-size: 19px; }
`;

const SolutionRight = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const SolutionBlock = styled.div<{ variant: 'pain' | 'win' }>`
  border-left: 3px solid ${p => p.variant === 'pain' ? '#EF4444' : '#10B981'};
  padding-left: 14px;
`;

const SolutionPainLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #EF4444;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
`;

const SolutionWinLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #10B981;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
`;

const SolutionLine = styled.p`
  font-size: 15px;
  color: #4A5568;
  line-height: 1.65;
  margin: 0;
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WhyPoint = styled.div`
  padding: 24px 22px;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  background: linear-gradient(135deg, #FFFFFF 0%, #FAFBFF 100%);
`;

const WhyPointNumber = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #635BFF;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
`;

const WhyPointTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px;
  line-height: 1.4;
`;

const WhyPointDesc = styled.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin: 0;
  text-wrap: pretty;
  word-break: keep-all;
`;

const CTAButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
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
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 15px;
  padding-left: 28px;
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
    font-size: 18px;
  }

  strong {
    color: #0A2540;
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
  margin-top: 40px;
  border-radius: 16px;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' | 'tertiary' }>`
  background: ${p => p.variant === 'secondary' ? 'transparent' : p.variant === 'tertiary' ? 'transparent' : 'white'};
  color: ${p => p.variant === 'secondary' || p.variant === 'tertiary' ? 'white' : '#635BFF'};
  border: ${p => p.variant === 'secondary' ? '2px solid white' : p.variant === 'tertiary' ? 'none' : 'none'};
  padding: ${p => p.variant === 'tertiary' ? '10px 18px' : '14px 32px'};
  font-size: ${p => p.variant === 'tertiary' ? '14px' : '16px'};
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: ${p => p.variant === 'tertiary' ? 'underline' : 'none'};

  &:hover {
    transform: ${p => p.variant === 'tertiary' ? 'none' : 'translateY(-2px)'};
    box-shadow: ${p => p.variant === 'tertiary' ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.2)'};
    opacity: ${p => p.variant === 'tertiary' ? '0.85' : '1'};
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

const AboutPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  return (
    <LandingLayout>
      <SEOHead
        title={t('landing:aboutPage.seo.title')}
        description={t('landing:aboutPage.seo.description')}
        keywords="restaurant POS, cloud POS, brand chain POS, foodcourt POS, supplier POS, multi-outlet management, mobile ordering"
        canonicalUrl="https://purplehere.com/about"
      />
      <PageContainer>
        {/* HERO */}
        <HeroSection>
          <HeroBadge>{t('landing:aboutPage.hero.badge')}</HeroBadge>
          <HeroTitle>{t('landing:aboutPage.hero.title')}</HeroTitle>
          <HeroSubtitle>{t('landing:aboutPage.hero.subtitle')}</HeroSubtitle>
          <CTAButtonRow>
            <CTAButton onClick={() => navigate('/signup')}>
              {t('landing:aboutPage.hero.ctaPrimary')}
            </CTAButton>
            <CTAButton variant="secondary" onClick={() => navigate('/features')}>
              {t('landing:aboutPage.hero.ctaSecondary')}
            </CTAButton>
          </CTAButtonRow>
        </HeroSection>

        <ContentSection>
          {/* SECTION 1 — Problem */}
          <Section>
            <SectionEyebrow>{t('landing:aboutPage.problem.eyebrow')}</SectionEyebrow>
            <SectionTitle>{t('landing:aboutPage.problem.title')}</SectionTitle>
            <Paragraph>{t('landing:aboutPage.problem.lead')}</Paragraph>
            <CardGrid>
              {(['card1', 'card2', 'card3'] as const).map(key => (
                <PainCard key={key}>
                  <PainTitle>{t(`landing:aboutPage.problem.${key}.title`)}</PainTitle>
                  <PainDesc>{t(`landing:aboutPage.problem.${key}.desc`)}</PainDesc>
                </PainCard>
              ))}
            </CardGrid>
          </Section>

          {/* SECTION 2 — Solutions by role */}
          <Section>
            <SectionEyebrow>{t('landing:aboutPage.solutions.eyebrow')}</SectionEyebrow>
            <SectionTitle>{t('landing:aboutPage.solutions.title')}</SectionTitle>
            <Paragraph>{t('landing:aboutPage.solutions.lead')}</Paragraph>
            <SolutionStack>
              {(['singleStore', 'brand', 'foodcourt', 'owner', 'supplier'] as const).map((key, idx) => (
                <SolutionCard key={key} tinted={idx % 2 === 1}>
                  <SolutionLeft>
                    <SolutionNumber>{String(idx + 1).padStart(2, '0')}</SolutionNumber>
                    <SolutionRole>{t(`landing:aboutPage.solutions.${key}.role`)}</SolutionRole>
                    <SolutionTitle>{t(`landing:aboutPage.solutions.${key}.title`)}</SolutionTitle>
                  </SolutionLeft>
                  <SolutionRight>
                    <SolutionBlock variant="pain">
                      <SolutionPainLabel>{t('landing:aboutPage.solutions.painLabel')}</SolutionPainLabel>
                      <SolutionLine>{t(`landing:aboutPage.solutions.${key}.problem`)}</SolutionLine>
                    </SolutionBlock>
                    <SolutionBlock variant="win">
                      <SolutionWinLabel>{t('landing:aboutPage.solutions.winLabel')}</SolutionWinLabel>
                      <SolutionLine>{t(`landing:aboutPage.solutions.${key}.solution`)}</SolutionLine>
                    </SolutionBlock>
                  </SolutionRight>
                </SolutionCard>
              ))}
            </SolutionStack>
          </Section>

          {/* SECTION 3 — Why PurpleHere */}
          <Section>
            <SectionEyebrow>{t('landing:aboutPage.why.eyebrow')}</SectionEyebrow>
            <SectionTitle>{t('landing:aboutPage.why.title')}</SectionTitle>
            <Paragraph>{t('landing:aboutPage.why.lead')}</Paragraph>
            <WhyGrid>
              {(['point1', 'point2', 'point3', 'point4'] as const).map((key, idx) => (
                <WhyPoint key={key}>
                  <WhyPointNumber>0{idx + 1}</WhyPointNumber>
                  <WhyPointTitle>{t(`landing:aboutPage.why.${key}.title`)}</WhyPointTitle>
                  <WhyPointDesc>{t(`landing:aboutPage.why.${key}.desc`)}</WhyPointDesc>
                </WhyPoint>
              ))}
            </WhyGrid>
          </Section>

          {/* CTA */}
          <CTASection>
            <CTATitle>{t('landing:aboutPage.cta.title')}</CTATitle>
            <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
              {t('landing:aboutPage.cta.subtitle')}
            </Paragraph>
            <CTAButtonRow>
              <CTAButton onClick={() => navigate('/signup')}>
                {t('landing:aboutPage.cta.primary')}
              </CTAButton>
              <CTAButton variant="secondary" onClick={() => navigate('/features')}>
                {t('landing:aboutPage.cta.secondary')}
              </CTAButton>
              <CTAButton variant="tertiary" onClick={() => navigate('/contact')}>
                {t('landing:aboutPage.cta.tertiary')}
              </CTAButton>
            </CTAButtonRow>
          </CTASection>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default AboutPage;
