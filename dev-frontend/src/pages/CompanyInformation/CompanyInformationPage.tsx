import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import PhoneInput from '../../components/Common/PhoneInput';
import { COUNTRIES } from '../../constants/countries';

interface CompanyInfo {
  id: string;
  companyName: string;
  registrationNo: string;
  tradeName?: string;
  address: string;
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
    transform: ${props => props.hasChanges ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.hasChanges ? '0 4px 12px rgba(99, 91, 255, 0.3)' : 'none'};
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
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    id: '',
    companyName: '',
    registrationNo: '',
    tradeName: '',
    address: '',
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

  const [originalInfo, setOriginalInfo] = useState<CompanyInfo>(companyInfo);
  const [hasChanges, setHasChanges] = useState(false);

  const requiredFields: (keyof CompanyInfo)[] = [
    'companyName', 'registrationNo', 'address', 'city', 'state', 'postcode', 'country', 'phone', 'email'
  ];
  const isRequiredFilled = requiredFields.every(f => companyInfo[f]?.trim());

  useEffect(() => {
    loadCompanyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(companyInfo) !== JSON.stringify(originalInfo);
    setHasChanges(changed);
  }, [companyInfo, originalInfo]);

  const loadCompanyInfo = async () => {
    try {
      const token = localStorage.getItem('auth_token');
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
          setOriginalInfo(info);
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
    try {
      const token = localStorage.getItem('auth_token');
      if (user?.restaurantId) {
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

        if (response.ok) {
          setOriginalInfo(companyInfo);
          setHasChanges(false);
        } else {
          const errorData = await response.json().catch(() => null);
          console.error('Save failed:', errorData?.message || response.statusText);
        }
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Company Information</Title>
          <SaveButton
            hasChanges={hasChanges && isRequiredFilled}
            onClick={handleSave}
            disabled={!hasChanges || !isRequiredFilled}
          >
            Save Changes
          </SaveButton>
        </Header>

        <Content>
          <InfoBox>
            <p>
              Manage your restaurant's official business information. This information will be used for invoicing, legal documents, and official communications.
            </p>
          </InfoBox>

          <Section>
            <SectionTitle>Basic Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Company Name <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Legal entity name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Registration Number <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.registrationNo}
                  onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                  placeholder="e.g., 202401234567"
                />
              </FormGroup>

              <FormGroup>
                <Label>Trade Name / Brand Name</Label>
                <Input
                  type="text"
                  value={companyInfo.tradeName || ''}
                  onChange={(e) => handleInputChange('tradeName', e.target.value)}
                  placeholder="e.g., ABC Kitchen & Grill"
                />
              </FormGroup>

              <FormGroup>
                <Label>Tax Number (SST/GST)</Label>
                <Input
                  type="text"
                  value={companyInfo.taxNo || ''}
                  onChange={(e) => handleInputChange('taxNo', e.target.value)}
                  placeholder="e.g., W10-1234-56789012"
                />
              </FormGroup>

              <FormGroup>
                <Label>Website</Label>
                <Input
                  type="url"
                  value={companyInfo.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.example.com"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <FormGrid>
              <FormGroup fullWidth>
                <Label>Address <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address"
                />
              </FormGroup>

              <FormGroup>
                <Label>City <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="e.g., Kuala Lumpur"
                />
              </FormGroup>

              <FormGroup>
                <Label>State <span>*</span></Label>
                <Select
                  value={companyInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                >
                  <option value="">Select State</option>
                  <option value="Wilayah Persekutuan">Wilayah Persekutuan</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Penang">Penang</option>
                  <option value="Johor">Johor</option>
                  <option value="Perak">Perak</option>
                  <option value="Kedah">Kedah</option>
                  <option value="Kelantan">Kelantan</option>
                  <option value="Melaka">Melaka</option>
                  <option value="Negeri Sembilan">Negeri Sembilan</option>
                  <option value="Pahang">Pahang</option>
                  <option value="Perlis">Perlis</option>
                  <option value="Sabah">Sabah</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Terengganu">Terengganu</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Postcode <span>*</span></Label>
                <Input
                  type="text"
                  value={companyInfo.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  placeholder="e.g., 50250"
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
                  placeholder="contact@example.com"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Banking Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Bank Name</Label>
                <Select
                  value={companyInfo.bankName || ''}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                >
                  <option value="">Select Bank</option>
                  <option value="Maybank">Maybank</option>
                  <option value="CIMB Bank">CIMB Bank</option>
                  <option value="Public Bank">Public Bank</option>
                  <option value="RHB Bank">RHB Bank</option>
                  <option value="Hong Leong Bank">Hong Leong Bank</option>
                  <option value="AmBank">AmBank</option>
                  <option value="UOB">UOB</option>
                  <option value="OCBC Bank">OCBC Bank</option>
                  <option value="HSBC">HSBC</option>
                  <option value="Standard Chartered">Standard Chartered</option>
                  <option value="Bank Islam">Bank Islam</option>
                  <option value="Bank Rakyat">Bank Rakyat</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Account Number</Label>
                <Input
                  type="text"
                  value={companyInfo.bankAccount || ''}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  placeholder="e.g., 514123456789"
                />
              </FormGroup>

              <FormGroup fullWidth>
                <Label>Account Name</Label>
                <Input
                  type="text"
                  value={companyInfo.bankAccountName || ''}
                  onChange={(e) => handleInputChange('bankAccountName', e.target.value)}
                  placeholder="Account holder name (must match company name)"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Company Logo</SectionTitle>
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
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default CompanyInformationPage;
