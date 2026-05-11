import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PhoneInput from '../../components/Common/PhoneInput';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import AutoSaveField from '../../components/Common/AutoSaveField';
import AutoSaveAddressFields from '../../components/Form/AutoSaveAddressFields';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface OperationSettings {
  openingTime: string;
  closingTime: string;
  timeZone: string;
}

interface CompanyInfo {
  companyName: string;
  registrationNo: string;
  tradeName: string;
  address: string;
  address_line_2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxNo: string;
  logoUrl: string;
  operationSettings: OperationSettings;
}

// Common timezones for F&B businesses
const TIMEZONES = [
  { value: 'Asia/Kuala_Lumpur', label: 'Malaysia (GMT+8)' },
  { value: 'Asia/Singapore', label: 'Singapore (GMT+8)' },
  { value: 'Asia/Bangkok', label: 'Thailand (GMT+7)' },
  { value: 'Asia/Jakarta', label: 'Indonesia - Jakarta (GMT+7)' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Vietnam (GMT+7)' },
  { value: 'Asia/Manila', label: 'Philippines (GMT+8)' },
  { value: 'Asia/Tokyo', label: 'Japan (GMT+9)' },
  { value: 'Asia/Seoul', label: 'South Korea (GMT+9)' },
  { value: 'Asia/Shanghai', label: 'China (GMT+8)' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (GMT+8)' },
  { value: 'Asia/Taipei', label: 'Taiwan (GMT+8)' },
  { value: 'Asia/Dubai', label: 'UAE (GMT+4)' },
  { value: 'Europe/London', label: 'UK (GMT+0/+1)' },
  { value: 'America/New_York', label: 'US Eastern (GMT-5/-4)' },
  { value: 'America/Los_Angeles', label: 'US Pacific (GMT-8/-7)' },
  { value: 'Australia/Sydney', label: 'Australia - Sydney (GMT+10/+11)' }
];

const Container = styled.div`
  background: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
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
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${props => props.fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const BrandCompanyInfoPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: '',
    registrationNo: '',
    tradeName: '',
    address: '',
    address_line_2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'MY',
    phone: '',
    email: '',
    website: '',
    taxNo: '',
    logoUrl: '',
    operationSettings: {
      openingTime: '09:00',
      closingTime: '22:00',
      timeZone: 'Asia/Kuala_Lumpur'
    }
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const token = getAuthToken();
      // Brand의 company info는 brand 테이블에서 가져옴
      const response = await fetch('/api/brands/company-info', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCompanyInfo({
            companyName: data.company_name || data.name || '',
            registrationNo: data.registration_no || '',
            tradeName: data.trade_name || '',
            address: data.address || '',
            address_line_2: data.address_line_2 || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postal_code || '',
            country: data.country || 'MY',
            phone: data.phone || '',
            email: data.email || '',
            website: data.website || '',
            taxNo: data.tax_no || '',
            logoUrl: data.logo_url || '',
            operationSettings: {
              openingTime: data.operation_settings?.openingTime || '09:00',
              closingTime: data.operation_settings?.closingTime || '22:00',
              timeZone: data.operation_settings?.timeZone || 'Asia/Kuala_Lumpur'
            }
          });
        }
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleOperationSettingChange = (field: keyof OperationSettings, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      operationSettings: {
        ...prev.operationSettings,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    const token = getAuthToken();
    const response = await fetch('/api/brands/company-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        company_name: companyInfo.companyName,
        registration_no: companyInfo.registrationNo,
        trade_name: companyInfo.tradeName,
        address: companyInfo.address,
        address_line_2: companyInfo.address_line_2 || null,
        city: companyInfo.city,
        state: companyInfo.state,
        postal_code: companyInfo.postalCode,
        country: companyInfo.country,
        phone: companyInfo.phone,
        email: companyInfo.email,
        website: companyInfo.website,
        tax_no: companyInfo.taxNo,
        logo_url: companyInfo.logoUrl,
        operation_settings: companyInfo.operationSettings
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save');
    }
  };
  return (
    <>
      <Container>
        <Header>
          <Title>{t('common:brandCompanyInfoPage.companyInformation')}</Title>
        </Header>

        <Content>
          <Section>
            <SectionTitle>{t('common:brandCompanyInfoPage.basicInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.companyName')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.registrationNo')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.registrationNo}
                    onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                    placeholder="e.g., 202001234567"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.tradeName')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.tradeName}
                    onChange={(e) => handleInputChange('tradeName', e.target.value)}
                    placeholder="Trading as..."
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.taxNoSstgst')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.taxNo}
                    onChange={(e) => handleInputChange('taxNo', e.target.value)}
                    placeholder="e.g., W10-1234-56789012"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('common:brandCompanyInfoPage.address')}</SectionTitle>
            <AutoSaveAddressFields
              value={{
                address: companyInfo.address,
                address_line_2: companyInfo.address_line_2,
                city: companyInfo.city,
                state: companyInfo.state,
                postal_code: companyInfo.postalCode,
                country: companyInfo.country
              }}
              onChange={(addr) => setCompanyInfo(prev => ({
                ...prev,
                address: addr.address || '',
                address_line_2: addr.address_line_2 || '',
                city: addr.city || '',
                state: addr.state || '',
                postalCode: addr.postal_code || '',
                country: (addr.country || '').toUpperCase()
              }))}
              onSave={handleSave}
              defaultCountry={companyInfo.country || 'MY'}
              required={['address', 'country']}
            />
          </Section>

          <Section>
            <SectionTitle>{t('common:brandCompanyInfoPage.contactInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.phone')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <PhoneInput
                    value={companyInfo.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    defaultCountry={companyInfo.country}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.email')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="company@example.com"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.website')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="url"
                    value={companyInfo.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.example.com"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('common:brandCompanyInfoPage.operationSettings')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.openingTime')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="time"
                    value={companyInfo.operationSettings.openingTime}
                    onChange={(e) => handleOperationSettingChange('openingTime', e.target.value)}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.closingTime')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="time"
                    value={companyInfo.operationSettings.closingTime}
                    onChange={(e) => handleOperationSettingChange('closingTime', e.target.value)}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:brandCompanyInfoPage.timezone')}</Label>
                <AutoSaveField onSave={handleSave} type="select">
                  <Select
                    value={companyInfo.operationSettings.timeZone}
                    onChange={(e) => handleOperationSettingChange('timeZone', e.target.value)}
                  >
                    {TIMEZONES.map(tz => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </Select>
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('common:brandCompanyInfoPage.companyLogo')}</SectionTitle>
            <AutoSaveField onSave={handleSave} type="image">
              <ImageUploadDropzone
                value={companyInfo.logoUrl}
                onChange={(imageData: string) => handleInputChange('logoUrl', imageData)}
                imageAltText="Company Logo"
              />
            </AutoSaveField>
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default BrandCompanyInfoPage;
