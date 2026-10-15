import React from 'react';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';

/**
 * 계정 삭제 요청 안내 (2026-10-12 Google Play 등록 · 설계 /var/www/.claude/fable-design-20261012-play-store.md D6)
 * Play Data safety 의 «삭제 요청 URL» 로 쓴다. 공개 페이지(로그인 없음).
 * 무엇이 남는지는 개인정보처리방침 «Data Retention» 절과 같은 내용이어야 한다(어긋나면 Play 거부 사유).
 */
const SUPPORT_EMAIL = 'help@gitconsulting.group'; // 개인정보처리방침 연락처와 같은 주소

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
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 12px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 17px;
  opacity: 0.92;
  max-width: 640px;
  margin: 0;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 16px 64px;
`;

const Section = styled.section`
  background: #fff;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #425466;
  margin: 0 0 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ol`
  margin: 0 0 12px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: #425466;
  margin-bottom: 6px;
`;

const MailLink = styled.a`
  color: #635BFF;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AccountDeletionPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const subject = encodeURIComponent('Account deletion request');
  return (
    <LandingLayout>
      <SEOHead
        title="Delete your account - PurpleHere"
        description="How to request deletion of your PurpleHere account and personal data, what is deleted and what is kept."
        keywords="delete account, account deletion, data deletion, PurpleHere"
        canonicalUrl="https://purplehere.com/account-deletion"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:accountDeletionPage.title', 'Delete your PurpleHere account')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:accountDeletionPage.subtitle', 'For PurpleHere and the Purple POS app (Android and Windows). Uninstalling the app does not delete your account.')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>{t('landing:accountDeletionPage.howTitle', 'How to request deletion')}</SectionTitle>
            <List>
              <ListItem>
                {t('landing:accountDeletionPage.step1', 'Send an email to')}{' '}
                <MailLink href={`mailto:${SUPPORT_EMAIL}?subject=${subject}`}>{SUPPORT_EMAIL}</MailLink>{' '}
                {t('landing:accountDeletionPage.step1b', 'from the email address you use to sign in.')}
              </ListItem>
              <ListItem>{t('landing:accountDeletionPage.step2', 'Write "Delete my account" and, if you have one, the name of your business or restaurant.')}</ListItem>
              <ListItem>{t('landing:accountDeletionPage.step3', 'We confirm the request with you by email before deleting anything.')}</ListItem>
            </List>
            <Paragraph>
              {t('landing:accountDeletionPage.ownerNote', 'If you are the owner of a business account, deleting it also closes the accounts of the staff under it.')}
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:accountDeletionPage.deletedTitle', 'What is deleted')}</SectionTitle>
            <Paragraph>
              {t('landing:accountDeletionPage.deletedBody', 'Your sign-in is disabled as soon as we confirm the request. Within 30 days we delete or anonymise your personal profile: name, email address, phone number, password and PIN, and your app settings.')}
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>{t('landing:accountDeletionPage.keptTitle', 'What is kept, and for how long')}</SectionTitle>
            <Paragraph>
              {t('landing:accountDeletionPage.keptBody', 'Some records must be kept by law and are used only for that purpose, as described in our Privacy Policy: transaction, sales and billing records for up to 7 years for legal and accounting purposes, and the account records needed for those obligations for up to 5 years after the account is closed. Technical logs are deleted within 12 months.')}
            </Paragraph>
            <Paragraph>
              {t('landing:accountDeletionPage.privacyLink', 'See the full Privacy Policy:')}{' '}
              <MailLink href="/privacy">purplehere.com/privacy</MailLink>
            </Paragraph>
          </Section>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default AccountDeletionPage;
