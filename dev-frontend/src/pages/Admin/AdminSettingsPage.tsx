import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COUNTRIES } from '../../constants/countries';
import PhoneInput from '../../components/Common/PhoneInput';
import AutoSaveField from '../../components/Common/AutoSaveField';
import { useTranslation } from 'react-i18next';

interface CompanySettings {
  companyName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  taxNumber: string;
  registrationNumber: string;
  brandLogo?: string; // Brand logo for site navigation/header
  companyLogo?: string; // Company logo for invoices/documents
  businessHours?: {
    weekdays: string;
    weekend: string;
  };
}


const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
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

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
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
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const LogoUpload = styled.div<{ isDragging?: boolean }>`
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.isDragging ? '#F0F4FF' : 'white'};
  min-height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #635BFF;
    background: #F8FAFC;
  }

  ${props => props.isDragging && `
    border-color: #635BFF;
    background: #F0F4FF;
  `}
`;

const LogoPreview = styled.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`;

const AdminSettingsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const [uploadError, setUploadError] = useState('');
  const [, setInitialSettings] = useState<CompanySettings | null>(null);

  const [settings, setSettings] = useState<CompanySettings>({
    companyName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'MY',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    taxNumber: '',
    registrationNumber: '',
    brandLogo: '',
    companyLogo: '',
    businessHours: {
      weekdays: '9:00 AM - 6:00 PM (GMT+8)',
      weekend: 'Closed'
    }
  });

  // Keep a ref to always have the latest settings for saveSettings
  const settingsRef = React.useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setInitialSettings(data);
      } else {
        console.error('Failed to load settings:', response.status);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setUploadError('');

    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settingsRef.current)
    });

    if (!response.ok) {
      throw new Error('Failed to save settings');
    }

    // Dispatch custom event to notify MainLayout to reload from API
    window.dispatchEvent(new Event('brandLogoUpdated'));

    setInitialSettings(settingsRef.current);
  };

  const handleInputChange = (field: keyof CompanySettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessHoursChange = (subField: 'weekdays' | 'weekend', value: string) => {
    setSettings(prev => ({
      ...prev,
      businessHours: { ...prev.businessHours!, [subField]: value }
    }));
  };

  const handleCompanyLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndUploadFile(file, 'company');
    }
  };

  const validateAndUploadFile = (file: File, logoType: 'brand' | 'company') => {
    setUploadError('');

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const logoData = e.target?.result as string;
      setSettings(prev => ({
        ...prev,
        [logoType === 'brand' ? 'brandLogo' : 'companyLogo']: logoData
      }));
      setUploadError('');
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <Container>
        <Header>
          <PageTitle>{t('admin:adminSettingsPage.companyInformation')}</PageTitle>
        </Header>
        <Content>

            <FormRow>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.companyLogo')}</FormLabel>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  Used on invoices and documents
                </div>
                <AutoSaveField onSave={saveSettings} type="image">
                  <LogoUpload
                    onClick={() => document.getElementById('company-logo-input')?.click()}
                    onChange={handleCompanyLogoUpload as any}
                  >
                    {settings.companyLogo ? (
                      <LogoPreview src={settings.companyLogo} alt="Company Logo" />
                    ) : (
                      <div>
                        <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500, marginBottom: '8px' }}>
                          Click to upload
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          PNG or JPG (Max 2MB)
                        </div>
                      </div>
                    )}
                  </LogoUpload>
                </AutoSaveField>
                <input
                  id="company-logo-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleCompanyLogoUpload}
                />
                {uploadError && (
                  <div style={{ fontSize: '13px', color: '#EF4444', marginTop: '8px' }}>{uploadError}</div>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Company Name *</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.registrationNumber')}</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="ROC/SSM Number"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>Address *</FormLabel>
              <AutoSaveField onSave={saveSettings}>
                <FormTextArea
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  rows={3}
                  required
                />
              </AutoSaveField>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel>City *</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <FormLabel>State *</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                    required
                  />
                </AutoSaveField>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Postal Code *</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="Enter postal code"
                    required
                  />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <FormLabel>Country *</FormLabel>
                <AutoSaveField onSave={saveSettings} type="select">
                  <FormSelect
                    value={settings.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    required
                  >
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </FormSelect>
                </AutoSaveField>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <PhoneInput
                    value={settings.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    defaultCountry={settings.country}
                  />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.whatsapp')}</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <PhoneInput
                    value={settings.whatsapp}
                    onChange={(value) => handleInputChange('whatsapp', value)}
                    defaultCountry={settings.country}
                  />
                </AutoSaveField>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  For Contact page and customer communication
                </div>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Email Address *</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="admin@company.com"
                    required
                  />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.website')}</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="url"
                    value={settings.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.company.com"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.taxNumber')}</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.taxNumber}
                    onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                    placeholder="GST/SST Registration Number"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.businessHoursWeekdays')}</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.businessHours?.weekdays || ''}
                    onChange={(e) => handleBusinessHoursChange('weekdays', e.target.value)}
                    placeholder="e.g., 9:00 AM - 6:00 PM (GMT+8)"
                  />
                </AutoSaveField>
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('admin:adminSettingsPage.businessHoursWeekend')}</FormLabel>
                <AutoSaveField onSave={saveSettings}>
                  <FormInput
                    type="text"
                    value={settings.businessHours?.weekend || ''}
                    onChange={(e) => handleBusinessHoursChange('weekend', e.target.value)}
                    placeholder="e.g., Closed or 10:00 AM - 2:00 PM"
                  />
                </AutoSaveField>
              </FormGroup>
            </FormRow>

        </Content>
      </Container>
    </>
  );
};

export default AdminSettingsPage;
