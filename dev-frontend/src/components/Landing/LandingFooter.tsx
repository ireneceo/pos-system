import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div``;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: white;
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
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState({
    email: 'support@purplehere.com',
    phone: '+60-XX-XXX-XXXX',
    hours: 'Mon-Fri 9AM-6PM (GMT+8)'
  });

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        const businessHours = data.business_hours?.weekdays || 'Mon-Fri 9AM-6PM (GMT+8)';
        setContactInfo({
          email: data.email || 'support@purplehere.com',
          phone: data.phone || '+60-XX-XXX-XXXX',
          hours: businessHours
        });
      })
      .catch(err => console.error('Failed to load company settings:', err));
  }, []);

  return (
    <Footer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <LogoSection>
              <LogoText>PurpleHere</LogoText>
              <Description>
                Smart store management starts here. Efficiently manage your food courts, brands, and restaurants with our powerful POS system.
              </Description>
            </LogoSection>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Product</SectionTitle>
            <LinkList>
              <li><FooterLink onClick={() => navigate('/pricing')}>Pricing</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/demo')}>Demo</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/service')}>Features</FooterLink></li>
            </LinkList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Info</SectionTitle>
            <LinkList>
              <li><FooterLink onClick={() => navigate('/about')}>About Us</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/company')}>Company</FooterLink></li>
              <li><FooterLink onClick={() => navigate('/contact')}>Contact</FooterLink></li>
            </LinkList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Contact</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>Email</ContactLabel>
                <ContactLink href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </ContactLink>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Phone</ContactLabel>
                <ContactLink href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`}>
                  {contactInfo.phone}
                </ContactLink>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Hours</ContactLabel>
                <span>{contactInfo.hours}</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <Divider />

        <BottomSection>
          <Copyright>
            &copy; {currentYear} PurpleHere. All rights reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink onClick={() => navigate('/privacy')}>Privacy Policy</LegalLink>
            <LegalLink onClick={() => navigate('/terms')}>Terms of Service</LegalLink>
          </LegalLinks>
        </BottomSection>
      </FooterContent>
    </Footer>
  );
};

export default LandingFooter;
