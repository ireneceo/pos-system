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

const HighlightBox = styled.div`
  background: #FFF8E1;
  border: 1px solid #FFE082;
  border-radius: 8px;
  padding: 16px 20px;
  margin: 20px 0;
`;

const HighlightText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #5D4037;
  margin: 0;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Th = styled.th`
  background: #F8F9FB;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #0A2540;
  border-bottom: 2px solid #E6EBF1;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #E6EBF1;
  color: #6B7C93;
`;

const TermsOfServicePage: React.FC = () => {
  return (
    <LandingLayout>
      <SEOHead
        title="Terms of Service - PurpleHere"
        description="PurpleHere's terms of service. Read our terms for using the PurpleHere POS platform and subscription services."
        keywords="terms of service, PurpleHere terms, POS subscription terms"
        canonicalUrl="https://purplehere.com/terms"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>Terms of Service</HeroTitle>
          <HeroSubtitle>
            Please read these terms carefully before using our services
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>1. Agreement to Terms</SectionTitle>
            <Paragraph>
              These Terms of Service ("Terms") constitute a legally binding agreement between you
              ("User", "you", "your") and GIT CONSULTING SDN. BHD. ("Company", "we", "us", "our")
              regarding your use of PurpleHere POS system and related services ("Services").
            </Paragraph>
            <Paragraph>
              By accessing or using our Services, you agree to be bound by these Terms. If you
              disagree with any part of these Terms, you may not access or use our Services.
            </Paragraph>
            <LastUpdated>Last Updated: February 2026</LastUpdated>
          </Section>

          <Section>
            <SectionTitle>2. Description of Services</SectionTitle>
            <Paragraph>
              PurpleHere provides a cloud-based Point of Sale (POS) system designed for restaurants,
              food courts, and food service businesses. Our Services include:
            </Paragraph>
            <List>
              <ListItem>Order management and processing</ListItem>
              <ListItem>Menu and inventory management</ListItem>
              <ListItem>Sales reporting and analytics</ListItem>
              <ListItem>Customer relationship management</ListItem>
              <ListItem>Staff management and scheduling</ListItem>
              <ListItem>Payment processing integration</ListItem>
              <ListItem>Mobile ordering capabilities</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. Subscription Plans and Pricing</SectionTitle>

            <SubSectionTitle>3.1 Free Trial</SubSectionTitle>
            <Paragraph>
              New users may be eligible for a 7-day free trial period. During the trial:
            </Paragraph>
            <List>
              <ListItem>Full access to all features is provided</ListItem>
              <ListItem>No credit card is required to start the trial</ListItem>
              <ListItem>Trial period begins upon account activation</ListItem>
              <ListItem>Trial is available only for first-time registrations</ListItem>
            </List>

            <SubSectionTitle>3.2 Paid Subscriptions</SubSectionTitle>
            <Paragraph>
              After the trial period, continued use requires a paid subscription. Subscription plans
              vary by features and pricing. All prices are exclusive of applicable taxes unless
              otherwise stated.
            </Paragraph>

            <SubSectionTitle>3.3 Payment Terms</SubSectionTitle>
            <Paragraph>
              Subscription fees are billed in advance on a monthly or annual basis, depending on your
              chosen plan. Payment is due on the billing date specified in your account.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>4. Payment and Billing Policy</SectionTitle>

            <SubSectionTitle>4.1 Payment Methods</SubSectionTitle>
            <Paragraph>
              We accept payment via credit card, debit card, bank transfer, and other payment methods
              as specified in your account settings. You are responsible for keeping your payment
              information current.
            </Paragraph>

            <SubSectionTitle>4.2 Automatic Renewal</SubSectionTitle>
            <Paragraph>
              Subscriptions automatically renew at the end of each billing period unless cancelled
              before the renewal date. You will be charged the then-current rate for your subscription
              plan.
            </Paragraph>

            <SubSectionTitle>4.3 Late Payment and Grace Period</SubSectionTitle>
            <HighlightBox>
              <HighlightText>
                <strong>Important:</strong> If payment is not received by the due date, a 7-day grace
                period will apply. During this period, you will receive payment reminders and your
                account will remain fully functional. If payment is not received within the grace period,
                your account will be suspended.
              </HighlightText>
            </HighlightBox>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Status</Th>
                    <Th>Duration</Th>
                    <Th>Account Access</Th>
                    <Th>Action Required</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td><strong>Active</strong></Td>
                    <Td>Payment up to date</Td>
                    <Td>Full access</Td>
                    <Td>None</Td>
                  </tr>
                  <tr>
                    <Td><strong>Unpaid (Grace Period)</strong></Td>
                    <Td>7 days after due date</Td>
                    <Td>Full access with warnings</Td>
                    <Td>Complete payment</Td>
                  </tr>
                  <tr>
                    <Td><strong>Suspended</strong></Td>
                    <Td>After grace period</Td>
                    <Td>Access blocked</Td>
                    <Td>Complete payment to restore</Td>
                  </tr>
                </tbody>
              </Table>
            </TableWrapper>

            <SubSectionTitle>4.4 Account Suspension</SubSectionTitle>
            <Paragraph>
              Suspended accounts cannot access POS features until payment is completed. Your data
              will be retained for 90 days after suspension. After 90 days, data may be permanently
              deleted.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>5. Refund Policy</SectionTitle>

            <SubSectionTitle>5.1 Subscription Refunds</SubSectionTitle>
            <Paragraph>
              We offer refunds under the following conditions:
            </Paragraph>
            <List>
              <ListItem>
                <strong>Within 14 days of initial purchase:</strong> Full refund if you are not
                satisfied with our Services. This applies only to first-time subscribers.
              </ListItem>
              <ListItem>
                <strong>Service outage:</strong> Pro-rated refund if our Services are unavailable
                for more than 24 consecutive hours due to issues on our end.
              </ListItem>
              <ListItem>
                <strong>Duplicate charges:</strong> Full refund for any erroneous duplicate billing.
              </ListItem>
            </List>

            <SubSectionTitle>5.2 Non-Refundable Items</SubSectionTitle>
            <Paragraph>
              The following are not eligible for refunds:
            </Paragraph>
            <List>
              <ListItem>Subscription fees after the 14-day satisfaction guarantee period</ListItem>
              <ListItem>Partial month usage after cancellation</ListItem>
              <ListItem>Custom development or setup fees</ListItem>
              <ListItem>Third-party service fees (payment processor fees, etc.)</ListItem>
            </List>

            <SubSectionTitle>5.3 Refund Process</SubSectionTitle>
            <Paragraph>
              To request a refund, contact our support team at help@gitconsulting.group with your
              account details and reason for the request. Refunds are typically processed within
              5-10 business days to the original payment method.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>6. Cancellation Policy</SectionTitle>

            <SubSectionTitle>6.1 How to Cancel</SubSectionTitle>
            <Paragraph>
              You may cancel your subscription at any time through your account settings or by
              contacting our support team. Cancellation takes effect at the end of the current
              billing period.
            </Paragraph>

            <SubSectionTitle>6.2 Effect of Cancellation</SubSectionTitle>
            <List>
              <ListItem>You retain access until the end of your paid billing period</ListItem>
              <ListItem>No refund for unused time in the current billing period</ListItem>
              <ListItem>Your data will be retained for 30 days after cancellation</ListItem>
              <ListItem>You may export your data before the retention period expires</ListItem>
            </List>

            <SubSectionTitle>6.3 Reactivation</SubSectionTitle>
            <Paragraph>
              If you wish to reactivate your account after cancellation, you may do so within 30
              days with your data intact. After 30 days, you may still reactivate but your previous
              data may not be available.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>7. User Responsibilities</SectionTitle>

            <SubSectionTitle>7.1 Account Security</SubSectionTitle>
            <Paragraph>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activities under your account. You must:
            </Paragraph>
            <List>
              <ListItem>Use strong, unique passwords</ListItem>
              <ListItem>Not share account credentials with unauthorized users</ListItem>
              <ListItem>Notify us immediately of any unauthorized access</ListItem>
              <ListItem>Log out from shared devices</ListItem>
            </List>

            <SubSectionTitle>7.2 Acceptable Use</SubSectionTitle>
            <Paragraph>
              You agree not to use our Services to:
            </Paragraph>
            <List>
              <ListItem>Violate any applicable laws or regulations</ListItem>
              <ListItem>Infringe on intellectual property rights</ListItem>
              <ListItem>Transmit malware or malicious code</ListItem>
              <ListItem>Attempt to gain unauthorized access to our systems</ListItem>
              <ListItem>Interfere with or disrupt our Services</ListItem>
              <ListItem>Use automated tools to access our Services without permission</ListItem>
            </List>

            <SubSectionTitle>7.3 Data Accuracy</SubSectionTitle>
            <Paragraph>
              You are responsible for the accuracy and legality of the data you input into our
              system, including menu items, pricing, customer information, and staff records.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>8. Intellectual Property</SectionTitle>

            <SubSectionTitle>8.1 Our Intellectual Property</SubSectionTitle>
            <Paragraph>
              PurpleHere, including its logo, software, design, and content, is owned by
              GIT CONSULTING SDN. BHD. and protected by intellectual property laws. You may not
              copy, modify, distribute, or create derivative works without our written permission.
            </Paragraph>

            <SubSectionTitle>8.2 Your Content</SubSectionTitle>
            <Paragraph>
              You retain ownership of the data and content you upload to our Services. By using
              our Services, you grant us a limited license to use, store, and process your content
              solely for the purpose of providing our Services.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>9. Service Availability and Modifications</SectionTitle>

            <SubSectionTitle>9.1 Service Availability</SubSectionTitle>
            <Paragraph>
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted service.
              Scheduled maintenance will be communicated in advance when possible.
            </Paragraph>

            <SubSectionTitle>9.2 Service Modifications</SubSectionTitle>
            <Paragraph>
              We reserve the right to modify, suspend, or discontinue any part of our Services
              at any time. We will provide reasonable notice for significant changes that affect
              your use of our Services.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>10. Limitation of Liability</SectionTitle>
            <Paragraph>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </Paragraph>
            <List>
              <ListItem>
                Our Services are provided "AS IS" without warranties of any kind, express or implied
              </ListItem>
              <ListItem>
                We are not liable for any indirect, incidental, special, consequential, or punitive
                damages arising from your use of our Services
              </ListItem>
              <ListItem>
                Our total liability shall not exceed the amount you paid for our Services in the
                12 months preceding the claim
              </ListItem>
              <ListItem>
                We are not responsible for any loss of data, revenue, or business opportunities
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>11. Indemnification</SectionTitle>
            <Paragraph>
              You agree to indemnify, defend, and hold harmless GIT CONSULTING SDN. BHD. and its
              officers, directors, employees, and agents from any claims, damages, losses, or
              expenses arising from your use of our Services, violation of these Terms, or
              infringement of any third-party rights.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>12. Dispute Resolution</SectionTitle>

            <SubSectionTitle>12.1 Governing Law</SubSectionTitle>
            <Paragraph>
              These Terms are governed by and construed in accordance with the laws of Malaysia,
              without regard to conflict of law principles.
            </Paragraph>

            <SubSectionTitle>12.2 Dispute Resolution Process</SubSectionTitle>
            <Paragraph>
              Any disputes arising from these Terms or our Services shall be resolved through:
            </Paragraph>
            <List>
              <ListItem><strong>Step 1:</strong> Good faith negotiation between the parties</ListItem>
              <ListItem><strong>Step 2:</strong> Mediation, if negotiation fails</ListItem>
              <ListItem><strong>Step 3:</strong> Binding arbitration in Kuala Lumpur, Malaysia</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>13. Changes to Terms</SectionTitle>
            <Paragraph>
              We may update these Terms from time to time. We will notify you of material changes
              via email or through our Services at least 30 days before the changes take effect.
              Continued use of our Services after the effective date constitutes acceptance of
              the updated Terms.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>14. General Provisions</SectionTitle>

            <SubSectionTitle>14.1 Entire Agreement</SubSectionTitle>
            <Paragraph>
              These Terms, together with our Privacy Policy, constitute the entire agreement
              between you and us regarding our Services.
            </Paragraph>

            <SubSectionTitle>14.2 Severability</SubSectionTitle>
            <Paragraph>
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </Paragraph>

            <SubSectionTitle>14.3 Waiver</SubSectionTitle>
            <Paragraph>
              Our failure to enforce any provision of these Terms does not constitute a waiver
              of that provision or any other provision.
            </Paragraph>

            <SubSectionTitle>14.4 Assignment</SubSectionTitle>
            <Paragraph>
              You may not assign or transfer your rights under these Terms without our written
              consent. We may assign our rights and obligations without restriction.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>15. Contact Information</SectionTitle>
            <Paragraph>
              For questions about these Terms or our Services, please contact us:
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

export default TermsOfServicePage;
