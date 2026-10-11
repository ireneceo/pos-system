import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Footer = styled.footer`
  background: #0A2540;
  color: white;
  padding: 60px 48px 30px;

  @media (max-width: 768px) {
    padding: 40px 20px 20px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 40px;

  /* Mobile: 2 columns. Logo(1st) and Company(4th) span full width.
     Product(2nd) + Info(3rd) share a single row side-by-side. */
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 28px 20px;

    > :nth-child(1) { grid-column: 1 / -1; }
    > :nth-child(4) { grid-column: 1 / -1; }
  }
`;

const FooterSection = styled.div``;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #8898AA;
  line-height: 1.6;
  max-width: 300px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #8898AA;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// <a href> — 크롤러가 따라갈 수 있는 링크(2026-09-21 SEO 검사 H4). 클릭은 SPA 이동 그대로.
const FooterLink = styled.a`
  display: inline-block;
  text-decoration: none;
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color 0.2s;

  &:hover {
    color: #635BFF;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactItem = styled.div`
  font-size: 14px;
  color: white;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const ContactLabel = styled.span`
  color: #8898AA;
  min-width: 60px;
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #635BFF;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #1E3A5F;
  margin: 0 0 20px 0;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Copyright = styled.p`
  font-size: 13px;
  color: #8898AA;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const LegalLink = styled.a`
  text-decoration: none;
  background: none;
  border: none;
  color: #8898AA;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const LandingFooter: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  // 회사 연락처는 사이트 설정(관리자 «회사 정보»)이 단일 소스 — Contact 페이지와 같은 /api/site-settings 의 email 을 쓴다.
  const [company, setCompany] = useState<{ name?: string; registration?: string; website?: string; email?: string } | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/site-settings')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!alive || !data) return;
        setCompany({
          name: data.company_name || undefined,
          registration: data.registration_number || undefined,
          website: data.website || undefined,
          email: data.email || undefined,
        });
      })
      .catch(() => { /* 연락처 줄은 설정을 못 읽으면 숨긴다 */ });
    return () => { alive = false; };
  }, []);
  const companyName = company?.name || 'GIT CONSULTING SDN. BHD.';
  const companyReg = company?.registration || '202201012250(1457947-A)';
  const companyWeb = company?.website || 'https://gitconsulting.group';

  return (
    <Footer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <LogoSection>
              <img src="/images/logo-white.svg" alt="PurpleHere" style={{ height: '32px', width: 'auto', display: 'block' }} />
              <Description>
                {t('footer.description', 'Smart store management starts here. Efficiently manage your food courts, brands, and restaurants with our powerful POS system.')}
              </Description>
            </LogoSection>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t('footer.product')}</SectionTitle>
            <LinkList>
              <li><FooterLink href="/features" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/features'); }}>{t('nav.features')}</FooterLink></li>
              <li><FooterLink href="/pricing" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/pricing'); }}>{t('nav.pricing')}</FooterLink></li>
              <li><FooterLink href="/demo" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/demo'); }}>{t('footer.demo')}</FooterLink></li>
              <li><FooterLink href="/referral-program" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/referral-program'); }}>{t('nav.referral', 'Referral')}</FooterLink></li>
            </LinkList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t('footer.info')}</SectionTitle>
            <LinkList>
              <li><FooterLink href="/about" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/about'); }}>{t('nav.about')}</FooterLink></li>
              <li><FooterLink href="/faq" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/faq'); }}>{t('nav.faq')}</FooterLink></li>
              <li><FooterLink href="/blog" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/blog'); }}>{t('nav.blog')}</FooterLink></li>
              <li><FooterLink href="/contact" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/contact'); }}>{t('nav.contact')}</FooterLink></li>
            </LinkList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t('footer.company')}</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>{t('footer.companyName')}</ContactLabel>
                <span>{companyName}</span>
              </ContactItem>
              <ContactItem>
                <ContactLabel>SSM</ContactLabel>
                <span>{companyReg}</span>
              </ContactItem>
              <ContactItem>
                <ContactLabel>{t('footer.web')}</ContactLabel>
                <ContactLink href={companyWeb} target="_blank" rel="noopener noreferrer">
                  {companyWeb}
                </ContactLink>
              </ContactItem>
              {company?.email && (
                <ContactItem>
                  <ContactLabel>{t('footer.email')}</ContactLabel>
                  <ContactLink href={`mailto:${company.email}`}>
                    {company.email}
                  </ContactLink>
                </ContactItem>
              )}
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <Divider />

        <BottomSection>
          <Copyright>
            &copy; {currentYear} PurpleHere. {t('footer.allRightsReserved')}
          </Copyright>
          <LegalLinks>
            <LegalLink href="/privacy" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/privacy'); }}>{t('footer.privacyPolicy')}</LegalLink>
            <LegalLink href="/terms" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/terms'); }}>{t('footer.termsOfService')}</LegalLink>
          </LegalLinks>
        </BottomSection>
      </FooterContent>
    </Footer>
  );
};

export default LandingFooter;
