import React from 'react';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';

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

const SubSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  margin: 16px 0;
  padding-left: 24px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LastUpdated = styled.p`
  font-size: 14px;
  color: #8898AA;
  margin-top: 8px;
`;

const ContactBlock = styled.div`
  background: #F8F9FB;
  border-left: 4px solid #635BFF;
  padding: 16px 20px;
  margin: 20px 0;
  border-radius: 4px;
`;

const ContactText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #0A2540;
  margin: 0;
`;

const ContactLink = styled.a`
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`;

const PrivacyPolicyPage: React.FC = () => {
  return (
    <LandingLayout>
      <PageContainer>
        <HeroSection>
          <HeroTitle>Privacy Policy</HeroTitle>
          <HeroSubtitle>
            How we collect, use, and protect your personal information
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>Introduction</SectionTitle>
            <Paragraph>
              GIT CONSULTING SDN. BHD. ("we", "us", "our", or "PurpleHere") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our PurpleHere POS system and related services.
            </Paragraph>
            <Paragraph>
              By using our services, you agree to the collection and use of information in accordance
              with this policy. If you do not agree with this policy, please do not use our services.
            </Paragraph>
            <LastUpdated>Last Updated: February 2026</LastUpdated>
          </Section>

          <Section>
            <SectionTitle>Information We Collect</SectionTitle>

            <SubSectionTitle>Personal Information</SubSectionTitle>
            <Paragraph>
              We may collect personally identifiable information that you voluntarily provide to us, including:
            </Paragraph>
            <List>
              <ListItem>Name, email address, and phone number</ListItem>
              <ListItem>Business name and address</ListItem>
              <ListItem>Payment and billing information</ListItem>
              <ListItem>Account credentials (username and password)</ListItem>
              <ListItem>Communication preferences</ListItem>
            </List>

            <SubSectionTitle>Business Data</SubSectionTitle>
            <Paragraph>
              When you use our POS system, we collect business-related data including:
            </Paragraph>
            <List>
              <ListItem>Transaction records and sales data</ListItem>
              <ListItem>Inventory and menu information</ListItem>
              <ListItem>Customer data you input into the system</ListItem>
              <ListItem>Staff information and access logs</ListItem>
              <ListItem>Reports and analytics data</ListItem>
            </List>

            <SubSectionTitle>Technical Information</SubSectionTitle>
            <Paragraph>
              We automatically collect certain technical information when you use our services:
            </Paragraph>
            <List>
              <ListItem>Device information (browser type, operating system)</ListItem>
              <ListItem>IP address and location data</ListItem>
              <ListItem>Usage patterns and feature interactions</ListItem>
              <ListItem>Error logs and diagnostic data</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>How We Use Your Information</SectionTitle>
            <Paragraph>
              We use the information we collect for the following purposes:
            </Paragraph>
            <List>
              <ListItem>To provide, operate, and maintain our POS services</ListItem>
              <ListItem>To process transactions and manage your subscription</ListItem>
              <ListItem>To send you service-related communications and updates</ListItem>
              <ListItem>To provide customer support and respond to inquiries</ListItem>
              <ListItem>To improve our services and develop new features</ListItem>
              <ListItem>To detect, prevent, and address technical issues or fraud</ListItem>
              <ListItem>To comply with legal obligations</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Data Sharing and Disclosure</SectionTitle>
            <Paragraph>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information only in the following circumstances:
            </Paragraph>
            <List>
              <ListItem>
                <strong>Service Providers:</strong> With trusted third-party service providers who
                assist us in operating our services (e.g., payment processors, cloud hosting)
              </ListItem>
              <ListItem>
                <strong>Legal Requirements:</strong> When required by law, court order, or government
                authority
              </ListItem>
              <ListItem>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale
                of assets
              </ListItem>
              <ListItem>
                <strong>Consent:</strong> With your explicit consent for specific purposes
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Data Security</SectionTitle>
            <Paragraph>
              We implement appropriate technical and organizational security measures to protect
              your personal information, including:
            </Paragraph>
            <List>
              <ListItem>SSL/TLS encryption for data transmission</ListItem>
              <ListItem>Encrypted storage of sensitive data</ListItem>
              <ListItem>Regular security audits and vulnerability assessments</ListItem>
              <ListItem>Access controls and authentication mechanisms</ListItem>
              <ListItem>Employee training on data protection</ListItem>
            </List>
            <Paragraph>
              However, no method of transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Data Retention</SectionTitle>
            <Paragraph>
              We retain your personal information for as long as necessary to provide our services
              and fulfill the purposes described in this policy. Specifically:
            </Paragraph>
            <List>
              <ListItem>Account information: Retained while your account is active and for 5 years after termination</ListItem>
              <ListItem>Transaction records: Retained for 7 years for legal and accounting purposes</ListItem>
              <ListItem>Technical logs: Retained for up to 12 months</ListItem>
            </List>
            <Paragraph>
              You may request deletion of your data at any time, subject to our legal obligations
              to retain certain information.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Your Rights</SectionTitle>
            <Paragraph>
              Depending on your location, you may have the following rights regarding your personal data:
            </Paragraph>
            <List>
              <ListItem><strong>Access:</strong> Request a copy of the personal data we hold about you</ListItem>
              <ListItem><strong>Correction:</strong> Request correction of inaccurate or incomplete data</ListItem>
              <ListItem><strong>Deletion:</strong> Request deletion of your personal data</ListItem>
              <ListItem><strong>Portability:</strong> Request transfer of your data to another service</ListItem>
              <ListItem><strong>Objection:</strong> Object to certain processing of your data</ListItem>
              <ListItem><strong>Restriction:</strong> Request restriction of processing in certain circumstances</ListItem>
            </List>
            <Paragraph>
              To exercise these rights, please contact us using the information provided below.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Cookies and Tracking</SectionTitle>
            <Paragraph>
              We use cookies and similar tracking technologies to enhance your experience:
            </Paragraph>
            <List>
              <ListItem><strong>Essential Cookies:</strong> Required for basic functionality and security</ListItem>
              <ListItem><strong>Analytics Cookies:</strong> Help us understand how users interact with our services</ListItem>
              <ListItem><strong>Preference Cookies:</strong> Remember your settings and preferences</ListItem>
            </List>
            <Paragraph>
              You can manage cookie preferences through your browser settings. Note that disabling
              certain cookies may affect the functionality of our services.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>International Data Transfers</SectionTitle>
            <Paragraph>
              Our services are hosted in Malaysia. If you access our services from outside Malaysia,
              your information may be transferred to, stored, and processed in Malaysia or other
              countries where our service providers are located.
            </Paragraph>
            <Paragraph>
              We ensure that any international transfers comply with applicable data protection laws
              and that appropriate safeguards are in place.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Children's Privacy</SectionTitle>
            <Paragraph>
              Our services are not intended for individuals under the age of 18. We do not knowingly
              collect personal information from children. If you believe we have collected information
              from a child, please contact us immediately.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Changes to This Policy</SectionTitle>
            <Paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the "Last Updated" date. We encourage
              you to review this policy periodically.
            </Paragraph>
            <Paragraph>
              Continued use of our services after any changes constitutes acceptance of the updated policy.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </Paragraph>
            <ContactBlock>
              <ContactText>
                <strong>GIT CONSULTING SDN. BHD.</strong><br />
                P-02-06A, Tropicana Avenue, Persiaran Tropicana<br />
                Tropicana Golf & Country Resort<br />
                47410, Petaling Jaya, Selangor, Malaysia<br /><br />
                Email: <ContactLink href="mailto:help@gitconsulting.group">help@gitconsulting.group</ContactLink><br />
                Website: <ContactLink href="https://purplehere.com">purplehere.com</ContactLink>
              </ContactText>
            </ContactBlock>
          </Section>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default PrivacyPolicyPage;
