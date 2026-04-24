import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import PhoneInput from '../../components/Common/PhoneInput';
import { COUNTRIES } from '../../constants/countries';
import AutoSaveField from '../../components/Common/AutoSaveField';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface CompanyInfo {
  id: string;
  companyName: string;
  registrationNo: string;
  tradeName?: string;
  address: string;
  address_line_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  taxNo?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  logoUrl?: string;
  updatedAt: string;
  updatedBy: string;
}

const Container = styled.div`
  background: #FAFBFC;
  min-height: 100vh;
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

  @media (max-width: 768px) {
    padding: 20px;
  }
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
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }
`;

const InfoBox = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;

  p {
    margin: 0;
    font-size: 14px;
    color: #075985;
    line-height: 1.5;
  }
`;

const CompanyInformationPage: React.FC = () => {
  const { t } = useTranslation('settings');
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    id: '',
    companyName: '',
    registrationNo: '',
    tradeName: '',
    address: '',
    address_line_2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'MY',
    phone: '',
    email: '',
    website: '',
    taxNo: '',
    bankName: '',
    bankAccount: '',
    bankAccountName: '',
    logoUrl: '',
    updatedAt: '',
    updatedBy: ''
  });

  useEffect(() => {
    loadCompanyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCompanyInfo = async () => {
    try {
      const token = getAuthToken();
      if (user?.restaurantId) {
        const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (response.ok) {
          const data = await response.json();
          const restaurant = data.data || data;

          const info: CompanyInfo = {
            id: restaurant.id?.toString() || '',
            companyName: restaurant.name || '',
            registrationNo: restaurant.business_registration || '',
            tradeName: restaurant.trade_name || '',
            address: restaurant.address || '',
            address_line_2: restaurant.address_line_2 || '',
            city: restaurant.city || '',
            state: restaurant.state || '',
            postcode: restaurant.postal_code || '',
            country: restaurant.country || 'MY',
            phone: restaurant.phone || '',
            email: restaurant.email || '',
            website: restaurant.website || '',
            taxNo: restaurant.tax_id || '',
            bankName: restaurant.bank_name || '',
            bankAccount: restaurant.bank_account || '',
            bankAccountName: restaurant.bank_account_name || '',
            logoUrl: restaurant.logo_url || '',
            updatedAt: restaurant.updatedAt || '',
            updatedBy: restaurant.updated_by || ''
          };

          setCompanyInfo(info);
        }
      }
    } catch (error) {
      console.error('Failed to load company information:', error);
    }
  };

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    const token = getAuthToken();
    if (!user?.restaurantId) return;

    const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        name: companyInfo.companyName,
        business_registration: companyInfo.registrationNo,
        trade_name: companyInfo.tradeName,
        address: companyInfo.address,
        address_line_2: companyInfo.address_line_2 || null,
        city: companyInfo.city,
        state: companyInfo.state,
        postal_code: companyInfo.postcode,
        country: companyInfo.country,
        phone: companyInfo.phone,
        email: companyInfo.email,
        website: companyInfo.website,
        tax_id: companyInfo.taxNo,
        bank_name: companyInfo.bankName,
        bank_account: companyInfo.bankAccount,
        bank_account_name: companyInfo.bankAccountName,
        logo_url: companyInfo.logoUrl
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || response.statusText);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('settings:companyInformationPage.companyInformation')}</Title>
        </Header>

        <Content>
          <InfoBox>
            <p>
              Manage your restaurant's official business information. This information will be used for invoicing, legal documents, and official communications.
            </p>
          </InfoBox>

          <Section>
            <SectionTitle>{t('settings:companyInformationPage.basicInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('settings:companyInformationPage.companyName')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Legal entity name"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.registrationNumber')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.registrationNo}
                    onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                    placeholder="e.g., 202401234567"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.tradeNameBrandName')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.tradeName || ''}
                    onChange={(e) => handleInputChange('tradeName', e.target.value)}
                    placeholder="e.g., ABC Kitchen & Grill"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.taxNumberSstgst')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.taxNo || ''}
                    onChange={(e) => handleInputChange('taxNo', e.target.value)}
                    placeholder="e.g., W10-1234-56789012"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.website')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="url"
                    value={companyInfo.website || ''}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.example.com"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('settings:companyInformationPage.contactInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup fullWidth>
                <Label>{t('settings:companyInformationPage.address')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value.replace(/[\r\n\t]+/g, ' '))}
                    placeholder="Street address"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup fullWidth>
                <Label>{t('common:address.line2', 'Address Line 2 (optional)')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.address_line_2 || ''}
                    onChange={(e) => handleInputChange('address_line_2', e.target.value.replace(/[\r\n\t]+/g, ' '))}
                    placeholder={t('common:address.line2Placeholder', 'Unit / Floor / Building name')}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.city')}<span>*</span></Label>
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
                <Label>{t('settings:companyInformationPage.state')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave} type="select">
                  <Select
                    value={companyInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  >
                    <option value="">{t('settings:companyInformationPage.selectState')}</option>
                    <option value="Wilayah Persekutuan">{t('settings:companyInformationPage.wilayahPersekutuan')}</option>
                    <option value="Selangor">{t('settings:companyInformationPage.selangor')}</option>
                    <option value="Penang">{t('settings:companyInformationPage.penang')}</option>
                    <option value="Johor">{t('settings:companyInformationPage.johor')}</option>
                    <option value="Perak">{t('settings:companyInformationPage.perak')}</option>
                    <option value="Kedah">{t('settings:companyInformationPage.kedah')}</option>
                    <option value="Kelantan">{t('settings:companyInformationPage.kelantan')}</option>
                    <option value="Melaka">{t('settings:companyInformationPage.melaka')}</option>
                    <option value="Negeri Sembilan">{t('settings:companyInformationPage.negeriSembilan')}</option>
                    <option value="Pahang">{t('settings:companyInformationPage.pahang')}</option>
                    <option value="Perlis">{t('settings:companyInformationPage.perlis')}</option>
                    <option value="Sabah">{t('settings:companyInformationPage.sabah')}</option>
                    <option value="Sarawak">{t('settings:companyInformationPage.sarawak')}</option>
                    <option value="Terengganu">{t('settings:companyInformationPage.terengganu')}</option>
                  </Select>
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.postcode')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.postcode}
                    onChange={(e) => handleInputChange('postcode', e.target.value)}
                    placeholder="e.g., 50250"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.country')}<span>*</span></Label>
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

              <FormGroup>
                <Label>{t('settings:companyInformationPage.phone')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <PhoneInput
                    value={companyInfo.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    defaultCountry={companyInfo.country}
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.email')}<span>*</span></Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@example.com"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('settings:companyInformationPage.bankingInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('settings:companyInformationPage.bankName')}</Label>
                <AutoSaveField onSave={handleSave} type="select">
                  <Select
                    value={companyInfo.bankName || ''}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                  >
                    <option value="">{t('settings:companyInformationPage.selectBank')}</option>
                    <option value="Maybank">{t('settings:companyInformationPage.maybank')}</option>
                    <option value="CIMB Bank">{t('settings:companyInformationPage.cimbBank')}</option>
                    <option value="Public Bank">{t('settings:companyInformationPage.publicBank')}</option>
                    <option value="RHB Bank">{t('settings:companyInformationPage.rhbBank')}</option>
                    <option value="Hong Leong Bank">{t('settings:companyInformationPage.hongLeongBank')}</option>
                    <option value="AmBank">{t('settings:companyInformationPage.ambank')}</option>
                    <option value="UOB">{t('settings:companyInformationPage.uob')}</option>
                    <option value="OCBC Bank">{t('settings:companyInformationPage.ocbcBank')}</option>
                    <option value="HSBC">{t('settings:companyInformationPage.hsbc')}</option>
                    <option value="Standard Chartered">{t('settings:companyInformationPage.standardChartered')}</option>
                    <option value="Bank Islam">{t('settings:companyInformationPage.bankIslam')}</option>
                    <option value="Bank Rakyat">{t('settings:companyInformationPage.bankRakyat')}</option>
                  </Select>
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyInformationPage.accountNumber')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.bankAccount || ''}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    placeholder="e.g., 514123456789"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup fullWidth>
                <Label>{t('settings:companyInformationPage.accountName')}</Label>
                <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companyInfo.bankAccountName || ''}
                    onChange={(e) => handleInputChange('bankAccountName', e.target.value)}
                    placeholder="Account holder name (must match company name)"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('settings:companyInformationPage.companyLogo')}</SectionTitle>
            <AutoSaveField onSave={handleSave} type="image">
              <ImageUploadDropzone
                value={companyInfo.logoUrl || ''}
                onChange={(base64) => {
                  setCompanyInfo(prev => ({
                    ...prev,
                    logoUrl: base64
                  }));
                }}
                label=""
                helpText="Upload your company logo for use in invoices and official documents"
              />
            </AutoSaveField>
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default CompanyInformationPage;
