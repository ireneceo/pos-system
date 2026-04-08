import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import PhoneInput from '../../components/Common/PhoneInput';
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
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 0 8px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 8px;
  }
`;

const ContentSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
`;

const FormTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Required = styled.span`
  color: #EF4444;
  margin-left: 2px;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #B0BEC5;
    cursor: not-allowed;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #F0F4F8;

  &:last-child {
    border-bottom: none;
  }
`;

const ContactIcon = styled.span`
  font-size: 20px;
  width: 24px;
  text-align: center;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #8898AA;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const ContactValue = styled.div`
  font-size: 15px;
  color: #0A2540;
`;

const ClickableLink = styled.a`
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.div`
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 8px;
  padding: 16px;
  color: #065F46;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  padding: 16px;
  color: #991B1B;
  text-align: center;
`;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  inquiry_type: string;
  interested_plan: string;
  preferred_username: string;
  message: string;
}

interface CompanyInfo {
  email: string;
  phone: string;
  whatsapp: string;
  business_hours: {
    weekdays: string;
    weekend: string;
  } | null;
}

const ContactPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const location = useLocation();
  const navState = location.state as { inquiry_type?: string; interested_plan?: string } | null;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    inquiry_type: navState?.inquiry_type || '',
    interested_plan: navState?.interested_plan || '',
    preferred_username: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        setCompanyInfo({
          email: data.email || 'support@purplehere.com',
          phone: data.phone || '+60-XX-XXX-XXXX',
          whatsapp: data.whatsapp || data.phone || '+60-XX-XXX-XXXX',
          business_hours: data.business_hours || {
            weekdays: '9:00 AM - 6:00 PM (GMT+8)',
            weekend: 'Closed'
          }
        });
      })
      .catch(err => console.error('Failed to load company settings:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company_name: '',
          inquiry_type: '',
          interested_plan: '',
          preferred_username: '',
          message: ''
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <LandingLayout>
      <SEOHead
        title="Contact Us - Get Started with PurpleHere"
        description="Contact PurpleHere for a free trial, pricing inquiry, or technical support. We typically respond within 24 hours."
        keywords="contact PurpleHere, POS free trial, POS demo request, restaurant POS support"
        canonicalUrl="https://purplehere.com/contact"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:contactPage.getInTouch')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:contactPage.ourTeamIsHereToHelpYouGetStartedWithPurp')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <ContactGrid>
            <FormSection>
              <FormTitle>{t('landing:contactPage.sendUsAMessage')}</FormTitle>

              {success ? (
                <SuccessMessage>
                  {t('landing:contactPage.thankYouForYourMessageWellGetBackToYouWi')}
                </SuccessMessage>
              ) : (
                <Form onSubmit={handleSubmit}>
                  {error && <ErrorMessage>{error}</ErrorMessage>}

                  <FormGroup>
                    <Label>{t('landing:contactPage.name')}<Required>*</Required></Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>{t('landing:contactPage.email')}<Required>*</Required></Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>{t('landing:contactPage.phone')}</Label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>{t('landing:contactPage.companyName')}</Label>
                    <Input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Your company or restaurant name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>{t('landing:contactPage.inquiryType')}<Required>*</Required></Label>
                    <Select
                      name="inquiry_type"
                      value={formData.inquiry_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t('landing:contactPage.selectInquiryType')}</option>
                      <option value="free_trial">{t('landing:contactPage.startFreeTrial7DaysFree')}</option>
                      <option value="pricing">{t('landing:contactPage.pricingInquiry')}</option>
                      <option value="demo">{t('landing:contactPage.requestDemo')}</option>
                      <option value="support">{t('landing:contactPage.technicalSupport')}</option>
                      <option value="partnership">{t('landing:contactPage.partnership')}</option>
                      <option value="other">{t('landing:contactPage.other')}</option>
                    </Select>
                  </FormGroup>

                  {formData.inquiry_type === 'free_trial' && (
                    <>
                      <FormGroup>
                        <Label>{t('landing:contactPage.interestedPlan')}<Required>*</Required></Label>
                        <Select
                          name="interested_plan"
                          value={formData.interested_plan}
                          onChange={handleChange}
                          required
                        >
                          <option value="">{t('landing:contactPage.selectAPlan')}</option>
                          <option value="restaurant_basic">{t('landing:contactPage.restaurantBasic')}</option>
                          <option value="restaurant_professional">{t('landing:contactPage.restaurantProfessional')}</option>
                          <option value="restaurant_enterprise">{t('landing:contactPage.restaurantEnterprise')}</option>
                          <option value="brand_basic">{t('landing:contactPage.brandBasic')}</option>
                          <option value="brand_professional">{t('landing:contactPage.brandProfessional')}</option>
                          <option value="brand_enterprise">{t('landing:contactPage.brandEnterprise')}</option>
                          <option value="foodcourt_basic">{t('landing:contactPage.foodcourtBasic')}</option>
                          <option value="foodcourt_professional">{t('landing:contactPage.foodcourtProfessional')}</option>
                          <option value="foodcourt_enterprise">{t('landing:contactPage.foodcourtEnterprise')}</option>
                        </Select>
                      </FormGroup>

                      <FormGroup>
                        <Label>{t('landing:contactPage.preferredUsername')}<Required>*</Required></Label>
                        <Input
                          type="text"
                          name="preferred_username"
                          value={formData.preferred_username}
                          onChange={handleChange}
                          required
                          placeholder="e.g., myrestaurant (letters, numbers, underscore only)"
                          pattern="^[a-zA-Z0-9_]+$"
                        />
                        <small style={{ color: '#6B7C93', fontSize: '12px' }}>
                          {t('landing:contactPage.thisWillBeYourLoginIdOnlyLettersNumbersA')}
                        </small>
                      </FormGroup>
                    </>
                  )}

                  {formData.inquiry_type && formData.inquiry_type !== 'free_trial' && (
                    <FormGroup>
                      <Label>{t('landing:contactPage.interestedPlan')}</Label>
                      <Select
                        name="interested_plan"
                        value={formData.interested_plan}
                        onChange={handleChange}
                      >
                        <option value="">{t('landing:contactPage.selectAPlan')}</option>
                        <option value="restaurant_basic">{t('landing:contactPage.restaurantBasic')}</option>
                        <option value="restaurant_professional">{t('landing:contactPage.restaurantProfessional')}</option>
                        <option value="restaurant_enterprise">{t('landing:contactPage.restaurantEnterprise')}</option>
                        <option value="brand_basic">{t('landing:contactPage.brandBasic')}</option>
                        <option value="brand_professional">{t('landing:contactPage.brandProfessional')}</option>
                        <option value="brand_enterprise">{t('landing:contactPage.brandEnterprise')}</option>
                        <option value="foodcourt_basic">{t('landing:contactPage.foodcourtBasic')}</option>
                        <option value="foodcourt_professional">{t('landing:contactPage.foodcourtProfessional')}</option>
                        <option value="foodcourt_enterprise">{t('landing:contactPage.foodcourtEnterprise')}</option>
                        <option value="other">{t('landing:contactPage.otherNotSureYet')}</option>
                      </Select>
                    </FormGroup>
                  )}

                  <FormGroup>
                    <Label>{t('landing:contactPage.message')}<Required>*</Required></Label>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your business needs..."
                    />
                  </FormGroup>

                  <SubmitButton type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </SubmitButton>
                </Form>
              )}
            </FormSection>

            <InfoSection>
              <InfoCard>
                <InfoTitle>{t('landing:contactPage.contactInformation')}</InfoTitle>
                {companyInfo ? (
                  <>
                    <ContactItem>
                      <ContactIcon>@</ContactIcon>
                      <ContactDetails>
                        <ContactLabel>{t('landing:contactPage.email')}</ContactLabel>
                        <ContactValue>
                          <ClickableLink href={`mailto:${companyInfo.email}`}>
                            {companyInfo.email}
                          </ClickableLink>
                        </ContactValue>
                      </ContactDetails>
                    </ContactItem>
                    <ContactItem>
                      <ContactIcon>#</ContactIcon>
                      <ContactDetails>
                        <ContactLabel>{t('landing:contactPage.phone')}</ContactLabel>
                        <ContactValue>
                          <ClickableLink href={`tel:${companyInfo.phone.replace(/[^+\d]/g, '')}`}>
                            {companyInfo.phone}
                          </ClickableLink>
                        </ContactValue>
                      </ContactDetails>
                    </ContactItem>
                    <ContactItem>
                      <ContactIcon>W</ContactIcon>
                      <ContactDetails>
                        <ContactLabel>{t('landing:contactPage.whatsapp')}</ContactLabel>
                        <ContactValue>
                          <ClickableLink
                            href={`https://wa.me/${companyInfo.whatsapp.replace(/[^+\d]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {companyInfo.whatsapp}
                          </ClickableLink>
                        </ContactValue>
                      </ContactDetails>
                    </ContactItem>
                  </>
                ) : (
                  <ContactValue style={{ color: '#9CA3AF' }}>{t('landing:contactPage.loading')}</ContactValue>
                )}
              </InfoCard>

              <InfoCard>
                <InfoTitle>{t('landing:contactPage.businessHours')}</InfoTitle>
                {companyInfo ? (
                  <>
                    <ContactItem>
                      <ContactIcon>~</ContactIcon>
                      <ContactDetails>
                        <ContactLabel>{t('landing:contactPage.mondayFriday')}</ContactLabel>
                        <ContactValue>{companyInfo.business_hours?.weekdays || 'N/A'}</ContactValue>
                      </ContactDetails>
                    </ContactItem>
                    <ContactItem>
                      <ContactIcon>~</ContactIcon>
                      <ContactDetails>
                        <ContactLabel>{t('landing:contactPage.saturdaySunday')}</ContactLabel>
                        <ContactValue>{companyInfo.business_hours?.weekend || 'N/A'}</ContactValue>
                      </ContactDetails>
                    </ContactItem>
                  </>
                ) : (
                  <ContactValue style={{ color: '#9CA3AF' }}>{t('landing:contactPage.loading')}</ContactValue>
                )}
              </InfoCard>

              <InfoCard>
                <InfoTitle>{t('landing:contactPage.freeTrial')}</InfoTitle>
                <p style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.6', marginBottom: '12px' }}>
                  {t('landing:contactPage.tryPurpleherePosFreeFor')}<strong style={{ color: '#635BFF' }}>7 days</strong> with full access to all features.
                  No credit card required.
                </p>
                <ul style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>{t('landing:contactPage.fullFeatureAccess')}</li>
                  <li>{t('landing:contactPage.dedicatedOnboardingSupport')}</li>
                  <li>{t('landing:contactPage.noCommitmentCancelAnytime')}</li>
                </ul>
              </InfoCard>

              <InfoCard>
                <InfoTitle>{t('landing:contactPage.responseTime')}</InfoTitle>
                <p style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.6' }}>
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call us directly.
                </p>
              </InfoCard>
            </InfoSection>
          </ContactGrid>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default ContactPage;
