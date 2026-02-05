import React, { useState, useEffect } from 'react';
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
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
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    inquiry_type: '',
    interested_plan: '',
    preferred_username: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    email: 'support@purplehere.com',
    phone: '+60-XX-XXX-XXXX',
    whatsapp: '+60-XX-XXX-XXXX',
    business_hours: {
      weekdays: '9:00 AM - 6:00 PM (GMT+8)',
      weekend: 'Closed'
    }
  });

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
      <PageContainer>
        <HeroSection>
          <HeroTitle>Get in Touch</HeroTitle>
          <HeroSubtitle>
            Our team is here to help you get started with PurpleHere POS
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <ContactGrid>
            <FormSection>
              <FormTitle>Send us a message</FormTitle>

              {success ? (
                <SuccessMessage>
                  Thank you for your message! We'll get back to you within 24 hours.
                </SuccessMessage>
              ) : (
                <Form onSubmit={handleSubmit}>
                  {error && <ErrorMessage>{error}</ErrorMessage>}

                  <FormGroup>
                    <Label>Name<Required>*</Required></Label>
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
                    <Label>Email<Required>*</Required></Label>
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
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+60-XX-XXX-XXXX"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Company Name</Label>
                    <Input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Your company or restaurant name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Inquiry Type<Required>*</Required></Label>
                    <Select
                      name="inquiry_type"
                      value={formData.inquiry_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select inquiry type...</option>
                      <option value="free_trial">Start Free Trial (7 days free)</option>
                      <option value="pricing">Pricing Inquiry</option>
                      <option value="demo">Request Demo</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormGroup>

                  {formData.inquiry_type === 'free_trial' && (
                    <>
                      <FormGroup>
                        <Label>Interested Plan<Required>*</Required></Label>
                        <Select
                          name="interested_plan"
                          value={formData.interested_plan}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a plan...</option>
                          <option value="restaurant_basic">Restaurant - Basic</option>
                          <option value="restaurant_professional">Restaurant - Professional</option>
                          <option value="restaurant_enterprise">Restaurant - Enterprise</option>
                          <option value="brand_basic">Brand - Basic</option>
                          <option value="brand_professional">Brand - Professional</option>
                          <option value="brand_enterprise">Brand - Enterprise</option>
                          <option value="foodcourt_basic">Foodcourt - Basic</option>
                          <option value="foodcourt_professional">Foodcourt - Professional</option>
                          <option value="foodcourt_enterprise">Foodcourt - Enterprise</option>
                        </Select>
                      </FormGroup>

                      <FormGroup>
                        <Label>Preferred Username<Required>*</Required></Label>
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
                          This will be your login ID. Only letters, numbers, and underscores allowed.
                        </small>
                      </FormGroup>
                    </>
                  )}

                  {formData.inquiry_type && formData.inquiry_type !== 'free_trial' && (
                    <FormGroup>
                      <Label>Interested Plan</Label>
                      <Select
                        name="interested_plan"
                        value={formData.interested_plan}
                        onChange={handleChange}
                      >
                        <option value="">Select a plan...</option>
                        <option value="restaurant_basic">Restaurant - Basic</option>
                        <option value="restaurant_professional">Restaurant - Professional</option>
                        <option value="restaurant_enterprise">Restaurant - Enterprise</option>
                        <option value="brand_basic">Brand - Basic</option>
                        <option value="brand_professional">Brand - Professional</option>
                        <option value="brand_enterprise">Brand - Enterprise</option>
                        <option value="foodcourt_basic">Foodcourt - Basic</option>
                        <option value="foodcourt_professional">Foodcourt - Professional</option>
                        <option value="foodcourt_enterprise">Foodcourt - Enterprise</option>
                        <option value="other">Other / Not sure yet</option>
                      </Select>
                    </FormGroup>
                  )}

                  <FormGroup>
                    <Label>Message<Required>*</Required></Label>
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
                <InfoTitle>Contact Information</InfoTitle>
                <ContactItem>
                  <ContactIcon>@</ContactIcon>
                  <ContactDetails>
                    <ContactLabel>Email</ContactLabel>
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
                    <ContactLabel>Phone</ContactLabel>
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
                    <ContactLabel>WhatsApp</ContactLabel>
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
              </InfoCard>

              <InfoCard>
                <InfoTitle>Business Hours</InfoTitle>
                <ContactItem>
                  <ContactIcon>~</ContactIcon>
                  <ContactDetails>
                    <ContactLabel>Monday - Friday</ContactLabel>
                    <ContactValue>{companyInfo.business_hours?.weekdays || 'N/A'}</ContactValue>
                  </ContactDetails>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>~</ContactIcon>
                  <ContactDetails>
                    <ContactLabel>Saturday - Sunday</ContactLabel>
                    <ContactValue>{companyInfo.business_hours?.weekend || 'N/A'}</ContactValue>
                  </ContactDetails>
                </ContactItem>
              </InfoCard>

              <InfoCard>
                <InfoTitle>Free Trial</InfoTitle>
                <p style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.6', marginBottom: '12px' }}>
                  Try PurpleHere POS free for <strong style={{ color: '#635BFF' }}>7 days</strong> with full access to all features.
                  No credit card required.
                </p>
                <ul style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>Full feature access</li>
                  <li>Dedicated onboarding support</li>
                  <li>No commitment, cancel anytime</li>
                </ul>
              </InfoCard>

              <InfoCard>
                <InfoTitle>Response Time</InfoTitle>
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
