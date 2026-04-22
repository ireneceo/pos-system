import React from 'react';
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

const FooterLink = styled.button`
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

const LegalLink = styled.button`
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

  return (
    <Footer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <LogoSection>
              <img src="/images/logo-white.svg" alt="PurpleHere" style={{ height: '32px', width: 'auto', display: 'block' }} />
              <Description>
                Smart store management starts here. Efficiently manage your food courts, brands, and restaurants with our powerful POS system.
              </Description>
            </LogoSection>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t('footer.product')}</SectionTitle>
            <LinkList>
              <li><FooterLink onClick={() => navigate('/features')}>{t('nav.features')}</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/pricing')}>{t('nav.pricing')}</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/demo')}>{t('footer.demo')}</FooterLink></li>
            </LinkList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t('footer.info')}</SectionTitle>
            <LinkList>
              <li><FooterLink onClick={() => navigate('/about')}>{t('nav.about')}</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/faq')}>{t('nav.faq')}</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/blog')}>{t('nav.blog')}</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/contact')}>{t('nav.contact')}</FooterLink></li>
            </LinkList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t('footer.company')}</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>{t('footer.companyName')}</ContactLabel>
                <span>GIT CONSULTING SDN. BHD.</span>
              </ContactItem>
              <ContactItem>
                <ContactLabel>SSM</ContactLabel>
                <span>202201012250(1457947-A)</span>
              </ContactItem>
              <ContactItem>
                <ContactLabel>{t('footer.web')}</ContactLabel>
                <ContactLink href="https://gitconsulting.group" target="_blank" rel="noopener noreferrer">
                  https://gitconsulting.group
                </ContactLink>
              </ContactItem>
              <ContactItem>
                <ContactLabel>{t('footer.email')}</ContactLabel>
                <ContactLink href="mailto:help@gitconsulting.group">
                  help@gitconsulting.group
                </ContactLink>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <Divider />

        <BottomSection>
          <Copyright>
            &copy; {currentYear} PurpleHere. {t('footer.allRightsReserved')}
          </Copyright>
          <LegalLinks>
            <LegalLink onClick={() => navigate('/privacy')}>{t('footer.privacyPolicy')}</LegalLink>
            <LegalLink onClick={() => navigate('/terms')}>{t('footer.termsOfService')}</LegalLink>
          </LegalLinks>
        </BottomSection>
      </FooterContent>
    </Footer>
  );
};

export default LandingFooter;
