import React from 'react';
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
  const { t } = useTranslation('landing');
  return (
    <LandingLayout>
      <SEOHead
        title="Privacy Policy - PurpleHere"
        description="PurpleHere's privacy policy. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, PurpleHere privacy"
        canonicalUrl="https://purplehere.com/privacy"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:privacyPolicyPage.privacyPolicy')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:privacyPolicyPage.howWeCollectUseAndProtectYourPersonalInf')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.introduction')}</SectionTitle>
            <Paragraph>
              GIT CONSULTING SDN. BHD. ("we", "us", "our", or "PurpleHere") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our PurpleHere POS system and related services.
            </Paragraph>
            <Paragraph>
              By using our services, you agree to the collection and use of information in accordance
              with this policy. If you do not agree with this policy, please do not use our services.
            </Paragraph>
            <LastUpdated>{t('landing:privacyPolicyPage.lastUpdatedFebruary2026')}</LastUpdated>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.informationWeCollect')}</SectionTitle>

            <SubSectionTitle>{t('landing:privacyPolicyPage.personalInformation')}</SubSectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.weMayCollectPersonallyIdentifiableInform')}
            </Paragraph>
            <List>
              <ListItem>{t('landing:privacyPolicyPage.nameEmailAddressAndPhoneNumber')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.businessNameAndAddress')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.paymentAndBillingInformation')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.accountCredentialsUsernameAndPassword')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.communicationPreferences')}</ListItem>
            </List>

            <SubSectionTitle>{t('landing:privacyPolicyPage.businessData')}</SubSectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.whenYouUseOurPosSystemWeCollectBusinessr')}
            </Paragraph>
            <List>
              <ListItem>{t('landing:privacyPolicyPage.transactionRecordsAndSalesData')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.inventoryAndMenuInformation')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.customerDataYouInputIntoTheSystem')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.staffInformationAndAccessLogs')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.reportsAndAnalyticsData')}</ListItem>
            </List>

            <SubSectionTitle>{t('landing:privacyPolicyPage.technicalInformation')}</SubSectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.weAutomaticallyCollectCertainTechnicalIn')}
            </Paragraph>
            <List>
              <ListItem>{t('landing:privacyPolicyPage.deviceInformationBrowserTypeOperatingSystem')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.ipAddressAndLocationData')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.usagePatternsAndFeatureInteractions')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.errorLogsAndDiagnosticData')}</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.howWeUseYourInformation')}</SectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.weUseTheInformationWeCollectForTheFollow')}
            </Paragraph>
            <List>
              <ListItem>{t('landing:privacyPolicyPage.toProvideOperateAndMaintainOurPosServices')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.toProcessTransactionsAndManageYourSubscription')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.toSendYouServicerelatedCommunicationsAndUpdates')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.toProvideCustomerSupportAndRespondToInquiries')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.toImproveOurServicesAndDevelopNewFeatures')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.toDetectPreventAndAddressTechnicalIssuesOrFraud')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.toComplyWithLegalObligations')}</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.dataSharingAndDisclosure')}</SectionTitle>
            <Paragraph>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information only in the following circumstances:
            </Paragraph>
            <List>
              <ListItem>
                <strong>{t('landing:privacyPolicyPage.serviceProviders')}</strong> With trusted third-party service providers who
                assist us in operating our services (e.g., payment processors, cloud hosting)
              </ListItem>
              <ListItem>
                <strong>{t('landing:privacyPolicyPage.legalRequirements')}</strong> When required by law, court order, or government
                authority
              </ListItem>
              <ListItem>
                <strong>{t('landing:privacyPolicyPage.businessTransfers')}</strong> In connection with a merger, acquisition, or sale
                of assets
              </ListItem>
              <ListItem>
                <strong>{t('landing:privacyPolicyPage.consent')}</strong> {t('landing:privacyPolicyPage.withYourExplicitConsentForSpecificPurpos')}
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.dataSecurity')}</SectionTitle>
            <Paragraph>
              We implement appropriate technical and organizational security measures to protect
              your personal information, including:
            </Paragraph>
            <List>
              <ListItem>{t('landing:privacyPolicyPage.ssltlsEncryptionForDataTransmission')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.encryptedStorageOfSensitiveData')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.regularSecurityAuditsAndVulnerabilityAssessments')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.accessControlsAndAuthenticationMechanisms')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.employeeTrainingOnDataProtection')}</ListItem>
            </List>
            <Paragraph>
              However, no method of transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.dataRetention')}</SectionTitle>
            <Paragraph>
              We retain your personal information for as long as necessary to provide our services
              and fulfill the purposes described in this policy. Specifically:
            </Paragraph>
            <List>
              <ListItem>{t('landing:privacyPolicyPage.accountInformationRetainedWhileYourAccou')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.transactionRecordsRetainedFor7YearsForLe')}</ListItem>
              <ListItem>{t('landing:privacyPolicyPage.technicalLogsRetainedForUpTo12Months')}</ListItem>
            </List>
            <Paragraph>
              You may request deletion of your data at any time, subject to our legal obligations
              to retain certain information.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.yourRights')}</SectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.dependingOnYourLocationYouMayHaveTheFoll')}
            </Paragraph>
            <List>
              <ListItem><strong>{t('landing:privacyPolicyPage.access')}</strong> {t('landing:privacyPolicyPage.requestACopyOfThePersonalDataWeHoldAbout')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.correction')}</strong> {t('landing:privacyPolicyPage.requestCorrectionOfInaccurateOrIncomplet')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.deletion')}</strong> {t('landing:privacyPolicyPage.requestDeletionOfYourPersonalData')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.portability')}</strong> {t('landing:privacyPolicyPage.requestTransferOfYourDataToAnotherServic')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.objection')}</strong> {t('landing:privacyPolicyPage.objectToCertainProcessingOfYourData')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.restriction')}</strong> {t('landing:privacyPolicyPage.requestRestrictionOfProcessingInCertainC')}</ListItem>
            </List>
            <Paragraph>
              {t('landing:privacyPolicyPage.toExerciseTheseRightsPleaseContactUsUsin')}
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.cookiesAndTracking')}</SectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.weUseCookiesAndSimilarTrackingTechnologi')}
            </Paragraph>
            <List>
              <ListItem><strong>{t('landing:privacyPolicyPage.essentialCookies')}</strong> {t('landing:privacyPolicyPage.requiredForBasicFunctionalityAndSecurity')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.analyticsCookies')}</strong> {t('landing:privacyPolicyPage.helpUsUnderstandHowUsersInteractWithOurS')}</ListItem>
              <ListItem><strong>{t('landing:privacyPolicyPage.preferenceCookies')}</strong> {t('landing:privacyPolicyPage.rememberYourSettingsAndPreferences')}</ListItem>
            </List>
            <Paragraph>
              You can manage cookie preferences through your browser settings. Note that disabling
              certain cookies may affect the functionality of our services.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.internationalDataTransfers')}</SectionTitle>
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
            <SectionTitle>{t('landing:privacyPolicyPage.childrensPrivacy')}</SectionTitle>
            <Paragraph>
              Our services are not intended for individuals under the age of 18. We do not knowingly
              collect personal information from children. If you believe we have collected information
              from a child, please contact us immediately.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.changesToThisPolicy')}</SectionTitle>
            <Paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the "Last Updated" date. We encourage
              you to review this policy periodically.
            </Paragraph>
            <Paragraph>
              {t('landing:privacyPolicyPage.continuedUseOfOurServicesAfterAnyChanges')}
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:privacyPolicyPage.contactUs')}</SectionTitle>
            <Paragraph>
              {t('landing:privacyPolicyPage.ifYouHaveAnyQuestionsAboutThisPrivacyPol')}
            </Paragraph>
            <ContactBlock>
              <ContactText>
                <strong>{t('landing:privacyPolicyPage.gitConsultingSdnBhd')}</strong><br />
                {t('landing:privacyPolicyPage.p0206aTropicanaAvenuePersiaranTropicana')}<br />
                {t('landing:privacyPolicyPage.tropicanaGolfCountryResort')}<br />
                47410, Petaling Jaya, Selangor, Malaysia<br /><br />
                {t('landing:privacyPolicyPage.email')}<ContactLink href="mailto:help@gitconsulting.group">help@gitconsulting.group</ContactLink><br />
                {t('landing:privacyPolicyPage.website')}<ContactLink href="https://purplehere.com">purplehere.com</ContactLink>
              </ContactText>
            </ContactBlock>
          </Section>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default PrivacyPolicyPage;
