import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COUNTRIES } from '../../constants/countries';
import PhoneInput from '../../components/Common/PhoneInput';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import AutoSaveField from '../../components/Common/AutoSaveField';
import { useTranslation } from 'react-i18next';

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
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxNo: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
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
  height: 56px;
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

const FoodcourtCompanyInfoPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: '',
    registrationNo: '',
    tradeName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'MY',
    phone: '',
    email: '',
    website: '',
    taxNo: '',
    bankName: '',
    bankAccount: '',
    bankAccountName: '',
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
      const token = localStorage.getItem('auth_token');
      // Foodcourt의 company info는 foodcourt 엔드포인트에서 가져옴
      const response = await fetch('/api/foodcourts/company-info', {
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
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postal_code || '',
            country: data.country || 'MY',
            phone: data.phone || '',
            email: data.email || '',
            website: data.website || '',
            taxNo: data.tax_no || '',
            bankName: data.bank_name || '',
            bankAccount: data.bank_account || '',
            bankAccountName: data.bank_account_name || '',
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
    const token = localStorage.getItem('auth_token');
    const response = await fetch('/api/foodcourts/company-info', {
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
        city: companyInfo.city,
        state: companyInfo.state,
        postal_code: companyInfo.postalCode,
        country: companyInfo.country,
        phone: companyInfo.phone,
        email: companyInfo.email,
        website: companyInfo.website,
        tax_no: companyInfo.taxNo,
        bank_name: companyInfo.bankName,
        bank_account: companyInfo.bankAccount,
        bank_account_name: companyInfo.bankAccountName,
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
          <Title>{t('common:foodcourtCompanyInfoPage.companyInformation')}</Title>
        </Header>

        <Content>
          <Section>
            <SectionTitle>{t('common:foodcourtCompanyInfoPage.basicInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.companyName')}<span>*</span></Label>
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
                <Label>{t('common:foodcourtCompanyInfoPage.registrationNo')}</Label>
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
                <Label>{t('common:foodcourtCompanyInfoPage.tradeName')}</Label>
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
                <Label>{t('common:foodcourtCompanyInfoPage.taxNoSstgst')}</Label>
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
            <SectionTitle>{t('common:foodcourtCompanyInfoPage.address')}</SectionTitle>
            <FormGrid>
              <FormGroup fullWidth>
                <Label>{t('common:foodcourtCompanyInfoPage.streetAddress')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter street address"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.city')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g., Kuala Lumpur"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.state')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="e.g., Wilayah Persekutuan"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.postalCode')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="e.g., 50000"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.country')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave} type="select">
                  <Select
                    value={companyInfo.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('common:foodcourtCompanyInfoPage.contactInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.phone')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <PhoneInput
                    value={companyInfo.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    defaultCountry={companyInfo.country}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.email')}<span>*</span></Label>
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
                <Label>{t('common:foodcourtCompanyInfoPage.website')}</Label>
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
            <SectionTitle>{t('common:foodcourtCompanyInfoPage.bankingInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.bankName')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    placeholder="e.g., Maybank"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.accountNumber')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.bankAccount}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    placeholder="e.g., 1234567890"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.accountName')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.bankAccountName}
                    onChange={(e) => handleInputChange('bankAccountName', e.target.value)}
                    placeholder="Account holder name"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('common:foodcourtCompanyInfoPage.operationSettings')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.openingTime')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="time"
                    value={companyInfo.operationSettings.openingTime}
                    onChange={(e) => handleOperationSettingChange('openingTime', e.target.value)}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.closingTime')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="time"
                    value={companyInfo.operationSettings.closingTime}
                    onChange={(e) => handleOperationSettingChange('closingTime', e.target.value)}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('common:foodcourtCompanyInfoPage.timezone')}</Label>
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
            <SectionTitle>{t('common:foodcourtCompanyInfoPage.companyLogo')}</SectionTitle>
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

export default FoodcourtCompanyInfoPage;
