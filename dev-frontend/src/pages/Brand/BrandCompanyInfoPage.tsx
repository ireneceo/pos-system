import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COUNTRIES } from '../../constants/countries';
import PhoneInput from '../../components/Common/PhoneInput';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';

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

const SaveButton = styled.button<{ hasChanges: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: ${props => props.hasChanges ? '#635BFF' : '#E6EBF1'};
  color: ${props => props.hasChanges ? 'white' : '#8898AA'};

  &:hover {
    background: ${props => props.hasChanges ? '#5A51E6' : '#E6EBF1'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${props => props.type === 'success' ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.type === 'success' ? '#059669' : '#DC2626'};
  font-size: 14px;
`;

const BrandCompanyInfoPage: React.FC = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
    setHasChanges(true);
    setMessage(null);
  };

  const handleOperationSettingChange = (field: keyof OperationSettings, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      operationSettings: {
        ...prev.operationSettings,
        [field]: value
      }
    }));
    setHasChanges(true);
    setMessage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('auth_token');
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

      if (response.ok) {
        setMessage({ type: 'success', text: 'Company information saved successfully!' });
        setHasChanges(false);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save company information. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Company Information</Title>
          <SaveButton
            hasChanges={hasChanges}
            onClick={handleSave}
            disabled={!hasChanges || saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </Header>

        <Content>
          {message && (
            <StatusMessage type={message.type}>{message.text}</StatusMessage>
          )}

          <Section>
            <SectionTitle>Basic Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Company Name <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Registration No.</Label>
                <Input
                  type="text"
                  value={companyInfo.registrationNo}
                  onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                  placeholder="e.g., 202001234567"
                />
              </FormGroup>

              <FormGroup>
                <Label>Trade Name</Label>
                <Input
                  type="text"
                  value={companyInfo.tradeName}
                  onChange={(e) => handleInputChange('tradeName', e.target.value)}
                  placeholder="Trading as..."
                />
              </FormGroup>

              <FormGroup>
                <Label>Tax No. (SST/GST)</Label>
                <Input
                  type="text"
                  value={companyInfo.taxNo}
                  onChange={(e) => handleInputChange('taxNo', e.target.value)}
                  placeholder="e.g., W10-1234-56789012"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Address</SectionTitle>
            <FormGrid>
              <FormGroup fullWidth>
                <Label>Street Address <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter street address"
                />
              </FormGroup>

              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  value={companyInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="e.g., Kuala Lumpur"
                />
              </FormGroup>

              <FormGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  value={companyInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="e.g., Wilayah Persekutuan"
                />
              </FormGroup>

              <FormGroup>
                <Label>Postal Code</Label>
                <Input
                  type="text"
                  value={companyInfo.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="e.g., 50000"
                />
              </FormGroup>

              <FormGroup>
                <Label>Country <span>*</span></Label>
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
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Phone <span>*</span></Label>
                <PhoneInput
                  value={companyInfo.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  defaultCountry={companyInfo.country}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email <span>*</span></Label>
                <Input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="company@example.com"
                />
              </FormGroup>

              <FormGroup>
                <Label>Website</Label>
                <Input
                  type="url"
                  value={companyInfo.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.example.com"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Operation Settings</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  value={companyInfo.operationSettings.openingTime}
                  onChange={(e) => handleOperationSettingChange('openingTime', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  value={companyInfo.operationSettings.closingTime}
                  onChange={(e) => handleOperationSettingChange('closingTime', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Timezone</Label>
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
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Company Logo</SectionTitle>
            <ImageUploadDropzone
              value={companyInfo.logoUrl}
              onChange={(imageData: string) => handleInputChange('logoUrl', imageData)}
              imageAltText="Company Logo"
            />
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default BrandCompanyInfoPage;
