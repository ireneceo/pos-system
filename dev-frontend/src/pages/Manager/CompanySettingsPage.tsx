import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface CompanyInfo {
  id: string;
  companyName: string;
  brandName: string;
  registrationNo: string;
  taxNo: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  industry: string;
  foundedYear: number;
  employeeCount: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  businessHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    swiftCode: string;
  };
}

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  color: #6B7280;
  font-size: 16px;
  margin: 8px 0 0 0;
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 32px;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ColorInput = styled.input`
  width: 50px;
  height: 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

const ColorCode = styled.span`
  font-family: monospace;
  font-size: 14px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 8px 12px;
  border-radius: 6px;
`;

const BusinessHoursGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const BusinessHourRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr auto;
  gap: 12px;
  align-items: center;
`;

const DayLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  text-transform: capitalize;
`;

const TimeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const LogoUploadArea = styled.div`
  border: 2px dashed #E6EBF1;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    background: #F8FAFC;
  }
`;

const LogoPreview = styled.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    
    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #6B7280;
    border: 1px solid #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ManagerCompanySettingsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { user } = useAuth();
  const [activeTab, handleTabChange] = useTabParam<'company' | 'operations'>('company');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    id: 'comp-001',
    companyName: 'Sunway Food Court Management Sdn Bhd',
    brandName: 'Sunway Food Court',
    registrationNo: '202301234567',
    taxNo: 'W10-2023-45678901',
    address: '5, Jalan Lagoon Selatan',
    city: 'Bandar Sunway',
    state: 'Selangor',
    country: 'Malaysia',
    postalCode: '47500',
    phone: '+60 3-7491 8622',
    email: 'info@sunwayfoodcourt.com',
    website: 'www.sunwayfoodcourt.com',
    description: 'Leading food court management company operating multiple dining concepts across Malaysia.',
    industry: 'Food & Beverage Management',
    foundedYear: 2015,
    employeeCount: '50-100',
    logoUrl: '',
    primaryColor: '#635BFF',
    secondaryColor: '#059669',
    businessHours: {
      monday: { open: '10:00', close: '22:00', closed: false },
      tuesday: { open: '10:00', close: '22:00', closed: false },
      wednesday: { open: '10:00', close: '22:00', closed: false },
      thursday: { open: '10:00', close: '22:00', closed: false },
      friday: { open: '10:00', close: '22:00', closed: false },
      saturday: { open: '10:00', close: '22:30', closed: false },
      sunday: { open: '10:00', close: '22:30', closed: false }
    },
    socialMedia: {
      facebook: 'https://facebook.com/sunwayfoodcourt',
      instagram: 'https://instagram.com/sunwayfoodcourt',
      twitter: 'https://twitter.com/sunwayfoodcourt',
      linkedin: 'https://linkedin.com/company/sunway-food-court'
    },
    bankDetails: {
      bankName: 'Maybank',
      accountNumber: '514789123456',
      accountName: 'Sunway Food Court Management Sdn Bhd',
      swiftCode: 'MBBEMYKL'
    }
  });

  const handleInputChange = (field: string, value: any, section?: string) => {
    if (section) {
      setCompanyInfo(prev => {
        const sectionData = prev[section as keyof CompanyInfo];
        if (typeof sectionData === 'object' && sectionData !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionData,
              [field]: value
            }
          };
        }
        return prev;
      });
    } else {
      setCompanyInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleBusinessHoursChange = (day: string, field: string, value: any) => {
    setCompanyInfo(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving company info:', companyInfo);
    alert('Company settings saved successfully!');
  };

  const renderCompanyTab = () => (
    <FormGrid>
      <Section>
        <SectionTitle>{t('admin:companySettingsPage.basicInformation')}</SectionTitle>
        <FormRow>
          <FormGroup>
            <Label>Company Name *</Label>
            <Input
              value={companyInfo.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter company name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Brand Name *</Label>
            <Input
              value={companyInfo.brandName}
              onChange={(e) => handleInputChange('brandName', e.target.value)}
              placeholder="Enter brand name"
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Registration Number *</Label>
            <Input
              value={companyInfo.registrationNo}
              onChange={(e) => handleInputChange('registrationNo', e.target.value)}
              placeholder="Company registration number"
            />
          </FormGroup>
          <FormGroup>
            <Label>Tax Number (GST/SST) *</Label>
            <Input
              value={companyInfo.taxNo}
              onChange={(e) => handleInputChange('taxNo', e.target.value)}
              placeholder="Tax identification number"
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.industry')}</Label>
            <Select
              value={companyInfo.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
            >
              <option value="Food & Beverage Management">{t('admin:companySettingsPage.foodBeverageManagement')}</option>
              <option value="Restaurant Chain">{t('admin:companySettingsPage.restaurantChain')}</option>
              <option value="Franchise Management">{t('admin:companySettingsPage.franchiseManagement')}</option>
              <option value="Hospitality">{t('admin:companySettingsPage.hospitality')}</option>
              <option value="Other">{t('admin:companySettingsPage.other')}</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.foundedYear')}</Label>
            <Input
              type="number"
              value={companyInfo.foundedYear}
              onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value))}
              min="1900"
              max={new Date().getFullYear()}
            />
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label>{t('admin:companySettingsPage.companyDescription')}</Label>
          <TextArea
            value={companyInfo.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of your company..."
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>{t('admin:companySettingsPage.contactInformation')}</SectionTitle>
        <FormRow>
          <FormGroup>
            <Label>Address *</Label>
            <Input
              value={companyInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Street address"
            />
          </FormGroup>
          <FormGroup>
            <Label>City *</Label>
            <Input
              value={companyInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>State/Province *</Label>
            <Input
              value={companyInfo.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="State or province"
            />
          </FormGroup>
          <FormGroup>
            <Label>Postal Code *</Label>
            <Input
              value={companyInfo.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="Postal code"
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Phone Number *</Label>
            <Input
              value={companyInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+60 3-1234 5678"
            />
          </FormGroup>
          <FormGroup>
            <Label>Email Address *</Label>
            <Input
              type="email"
              value={companyInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="info@company.com"
            />
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label>{t('admin:companySettingsPage.website')}</Label>
          <Input
            value={companyInfo.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="www.company.com"
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>{t('admin:companySettingsPage.branding')}</SectionTitle>
        <FormGroup>
          <Label>{t('admin:companySettingsPage.companyLogo')}</Label>
          <LogoUploadArea>
            {companyInfo.logoUrl ? (
              <LogoPreview src={companyInfo.logoUrl} alt="Company Logo" />
            ) : (
              <div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>
                  Click to upload company logo
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px' }}>
                  PNG, JPG up to 2MB
                </div>
              </div>
            )}
          </LogoUploadArea>
        </FormGroup>
        <FormRow>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.primaryBrandColor')}</Label>
            <ColorPicker>
              <ColorInput
                type="color"
                value={companyInfo.primaryColor}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
              />
              <ColorCode>{companyInfo.primaryColor}</ColorCode>
            </ColorPicker>
          </FormGroup>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.secondaryBrandColor')}</Label>
            <ColorPicker>
              <ColorInput
                type="color"
                value={companyInfo.secondaryColor}
                onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
              />
              <ColorCode>{companyInfo.secondaryColor}</ColorCode>
            </ColorPicker>
          </FormGroup>
        </FormRow>
      </Section>
    </FormGrid>
  );

  const renderOperationsTab = () => (
    <FormGrid>
      <Section>
        <SectionTitle>{t('admin:companySettingsPage.businessHours')}</SectionTitle>
        <BusinessHoursGrid>
          {Object.entries(companyInfo.businessHours).map(([day, hours]) => (
            <BusinessHourRow key={day}>
              <DayLabel>{day}</DayLabel>
              <TimeInput
                type="time"
                value={hours.open}
                onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                disabled={hours.closed}
              />
              <TimeInput
                type="time"
                value={hours.close}
                onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                disabled={hours.closed}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox
                  type="checkbox"
                  checked={hours.closed}
                  onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)}
                />
                <Label style={{ margin: 0, fontSize: '12px' }}>{t('admin:companySettingsPage.closed')}</Label>
              </div>
            </BusinessHourRow>
          ))}
        </BusinessHoursGrid>
      </Section>

      <Section>
        <SectionTitle>{t('admin:companySettingsPage.socialMedia')}</SectionTitle>
        <FormRow>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.facebook')}</Label>
            <Input
              value={companyInfo.socialMedia.facebook}
              onChange={(e) => handleInputChange('facebook', e.target.value, 'socialMedia')}
              placeholder="https://facebook.com/yourcompany"
            />
          </FormGroup>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.instagram')}</Label>
            <Input
              value={companyInfo.socialMedia.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value, 'socialMedia')}
              placeholder="https://instagram.com/yourcompany"
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.twitter')}</Label>
            <Input
              value={companyInfo.socialMedia.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value, 'socialMedia')}
              placeholder="https://twitter.com/yourcompany"
            />
          </FormGroup>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.linkedin')}</Label>
            <Input
              value={companyInfo.socialMedia.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value, 'socialMedia')}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </FormGroup>
        </FormRow>
      </Section>

      <Section>
        <SectionTitle>{t('admin:companySettingsPage.bankDetails')}</SectionTitle>
        <FormRow>
          <FormGroup>
            <Label>Bank Name *</Label>
            <Input
              value={companyInfo.bankDetails.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value, 'bankDetails')}
              placeholder="Bank name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Account Number *</Label>
            <Input
              value={companyInfo.bankDetails.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value, 'bankDetails')}
              placeholder="Account number"
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Account Name *</Label>
            <Input
              value={companyInfo.bankDetails.accountName}
              onChange={(e) => handleInputChange('accountName', e.target.value, 'bankDetails')}
              placeholder="Account holder name"
            />
          </FormGroup>
          <FormGroup>
            <Label>{t('admin:companySettingsPage.swiftCode')}</Label>
            <Input
              value={companyInfo.bankDetails.swiftCode}
              onChange={(e) => handleInputChange('swiftCode', e.target.value, 'bankDetails')}
              placeholder="SWIFT/BIC code"
            />
          </FormGroup>
        </FormRow>
      </Section>
    </FormGrid>
  );

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:companySettingsPage.companySettings')}</Title>
          <Subtitle>{t('admin:companySettingsPage.manageYourCompanyInformationAndBrandSettings')}</Subtitle>
        </Header>
        
        <Content>
          <Tabs>
            <Tab active={activeTab === 'company'} onClick={() => handleTabChange('company')}>
              Company Information
            </Tab>
            <Tab active={activeTab === 'operations'} onClick={() => handleTabChange('operations')}>
              Operations & Social
            </Tab>
          </Tabs>

          {activeTab === 'company' && renderCompanyTab()}
          {activeTab === 'operations' && renderOperationsTab()}

          <ButtonGroup>
            <Button variant="secondary">{t('admin:companySettingsPage.cancel')}</Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </ButtonGroup>
        </Content>
      </Container>
    </>
  );
};

export default ManagerCompanySettingsPage;