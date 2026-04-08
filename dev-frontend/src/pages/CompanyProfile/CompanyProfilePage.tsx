import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import PhoneInput from '../../components/Common/PhoneInput';
import { useTranslation } from 'react-i18next';

interface CompanyProfile {
  id: string;
  level: 'admin' | 'manager' | 'restaurant';
  companyName: string;
  registrationNo: string;
  tradeName?: string; // For restaurant brand name
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
  operationMode?: 'manager' | 'integrated'; // For manager level
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
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &:disabled {
    background: #F8FAFC;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
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

const LogoUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const LogoPreview = styled.div`
  width: 120px;
  height: 120px;
  border: 2px dashed #CBD5E1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
  
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 6px;
  }
  
  span {
    color: #9CA3AF;
    font-size: 12px;
  }
`;

const UploadButton = styled.label`
  padding: 8px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    border-color: #CBD5E1;
  }
  
  input {
    display: none;
  }
`;

const CompanyProfilePage: React.FC = () => {
  const { t } = useTranslation('settings');
  const { user } = useAuth();
  const [profile, setProfile] = useState<CompanyProfile>({
    id: '',
    level: user?.role as 'admin' | 'manager' | 'restaurant' || 'restaurant',
    companyName: '',
    registrationNo: '',
    tradeName: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Malaysia',
    phone: '',
    email: '',
    website: '',
    taxNo: '',
    bankName: '',
    bankAccount: '',
    bankAccountName: '',
    operationMode: 'manager',
    logoUrl: '',
    updatedAt: '',
    updatedBy: ''
  });

  const [originalProfile, setOriginalProfile] = useState<CompanyProfile>(profile);
  const [hasChanges, setHasChanges] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveCallbackRef = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    // Load existing profile data
    loadProfile();
  }, []);

  useEffect(() => {
    // Check if there are changes
    const changed = JSON.stringify(profile) !== JSON.stringify(originalProfile);
    setHasChanges(changed);
  }, [profile, originalProfile]);

  const loadProfile = () => {
    // TODO: Implement API call to fetch company profile
    const isManager = ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '');
    const level = user?.role === 'System Admin' ? 'admin' : isManager ? 'manager' : 'restaurant';

    const emptyData: CompanyProfile = {
      id: '',
      level: level,
      companyName: '',
      registrationNo: '',
      tradeName: '',
      address: '',
      city: '',
      state: '',
      postcode: '',
      country: 'Malaysia',
      phone: '',
      email: '',
      website: '',
      taxNo: '',
      bankName: '',
      bankAccount: '',
      bankAccountName: '',
      operationMode: 'manager',
      logoUrl: '',
      updatedAt: '',
      updatedBy: ''
    };

    setProfile(emptyData);
    setOriginalProfile(emptyData);
  };

  const markChanged = () => {
    setAutoSaveStatus('saving');
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      if (saveCallbackRef.current) saveCallbackRef.current();
    }, 2000);
  };

  const handleInputChange = (field: keyof CompanyProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
    markChanged();
  };

  const handleSave = () => {
    // In a real app, this would save to API
    console.log('Saving profile:', profile);
    setOriginalProfile(profile);
    setHasChanges(false);
    alert('Company profile saved successfully!');
  };

  saveCallbackRef.current = async () => {
    try {
      await handleSave();
      setAutoSaveStatus('saved');
    } catch (e) {
      setAutoSaveStatus('idle');
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to server
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          logoUrl: e.target?.result as string
        }));
        markChanged();
      };
      reader.readAsDataURL(file);
    }
  };

  const renderAdminFields = () => (
    <>
      <InfoBox>
        <p>
          This information will be used as the sender details for platform invoices sent to managers.
          Ensure all details are accurate for legal and tax purposes.
        </p>
      </InfoBox>
    </>
  );

  const renderManagerFields = () => (
    <>
      <Section>
        <SectionTitle>{t('settings:companyProfilePage.operationMode')}</SectionTitle>
        <InfoBox>
          <p>
            Select how your business operates. Manager mode is for managing multiple restaurants.
            Integrated mode is for single restaurant owners (Manager = Restaurant).
          </p>
        </InfoBox>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="operationMode"
              value="manager"
              checked={profile.operationMode === 'manager'}
              onChange={(e) => handleInputChange('operationMode', e.target.value)}
            />
            Manager Mode (Multiple Restaurants)
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="operationMode"
              value="integrated"
              checked={profile.operationMode === 'integrated'}
              onChange={(e) => handleInputChange('operationMode', e.target.value)}
            />
            Integrated Mode (Manager = Restaurant)
          </RadioLabel>
        </RadioGroup>
      </Section>
    </>
  );

  const renderRestaurantFields = () => (
    <>
      <FormGroup>
        <Label>{t('settings:companyProfilePage.tradeNameBrandName')}<span>*</span></Label>
        <Input
          type="text"
          value={profile.tradeName || ''}
          onChange={(e) => handleInputChange('tradeName', e.target.value)}
          placeholder="e.g., ABC Kitchen & Grill"
        />
      </FormGroup>
    </>
  );

  return (
    <>
      <Container>
        <Header>
          <Title>{t('settings:companyProfilePage.companyProfile')}</Title>
          <SaveButton
            hasChanges={hasChanges && autoSaveStatus !== 'saved'}
            onClick={handleSave}
            disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved' || !hasChanges}
          >
            {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '\u2713 Saved' : 'Save Changes'}
          </SaveButton>
        </Header>

        <Content>
          {user?.role === 'System Admin' && renderAdminFields()}
          {['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '') && renderManagerFields()}

          <Section>
            <SectionTitle>{t('settings:companyProfilePage.basicInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('settings:companyProfilePage.companyName')}<span>*</span></Label>
                <Input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Legal entity name"
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.registrationNumber')}<span>*</span></Label>
                <Input
                  type="text"
                  value={profile.registrationNo}
                  onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                  placeholder="e.g., 202401234567"
                />
              </FormGroup>

              {user?.role === 'Restaurant Admin' && renderRestaurantFields()}

              <FormGroup>
                <Label>{t('settings:companyProfilePage.taxNumberSstgst')}</Label>
                <Input
                  type="text"
                  value={profile.taxNo || ''}
                  onChange={(e) => handleInputChange('taxNo', e.target.value)}
                  placeholder="e.g., W10-1234-56789012"
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.website')}</Label>
                <Input
                  type="url"
                  value={profile.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.example.com"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('settings:companyProfilePage.contactInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup fullWidth>
                <Label>{t('settings:companyProfilePage.address')}<span>*</span></Label>
                <Input
                  type="text"
                  value={profile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address"
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.city')}<span>*</span></Label>
                <Input
                  type="text"
                  value={profile.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="e.g., Kuala Lumpur"
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.state')}<span>*</span></Label>
                <Select
                  value={profile.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                >
                  <option value="">{t('settings:companyProfilePage.selectState')}</option>
                  <option value="Wilayah Persekutuan">{t('settings:companyProfilePage.wilayahPersekutuan')}</option>
                  <option value="Selangor">{t('settings:companyProfilePage.selangor')}</option>
                  <option value="Penang">{t('settings:companyProfilePage.penang')}</option>
                  <option value="Johor">{t('settings:companyProfilePage.johor')}</option>
                  <option value="Perak">{t('settings:companyProfilePage.perak')}</option>
                  <option value="Kedah">{t('settings:companyProfilePage.kedah')}</option>
                  <option value="Kelantan">{t('settings:companyProfilePage.kelantan')}</option>
                  <option value="Melaka">{t('settings:companyProfilePage.melaka')}</option>
                  <option value="Negeri Sembilan">{t('settings:companyProfilePage.negeriSembilan')}</option>
                  <option value="Pahang">{t('settings:companyProfilePage.pahang')}</option>
                  <option value="Perlis">{t('settings:companyProfilePage.perlis')}</option>
                  <option value="Sabah">{t('settings:companyProfilePage.sabah')}</option>
                  <option value="Sarawak">{t('settings:companyProfilePage.sarawak')}</option>
                  <option value="Terengganu">{t('settings:companyProfilePage.terengganu')}</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.postcode')}<span>*</span></Label>
                <Input
                  type="text"
                  value={profile.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  placeholder="e.g., 50250"
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.country')}<span>*</span></Label>
                <Select
                  value={profile.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="Malaysia">{t('settings:companyProfilePage.malaysia')}</option>
                  <option value="Singapore">{t('settings:companyProfilePage.singapore')}</option>
                  <option value="Thailand">{t('settings:companyProfilePage.thailand')}</option>
                  <option value="Indonesia">{t('settings:companyProfilePage.indonesia')}</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.phone')}<span>*</span></Label>
                <PhoneInput
                  value={profile.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  defaultCountry={profile.country === 'Malaysia' ? 'MY' : profile.country === 'Singapore' ? 'SG' : 'MY'}
                />
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.email')}<span>*</span></Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@example.com"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('settings:companyProfilePage.bankingInformation')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('settings:companyProfilePage.bankName')}</Label>
                <Select
                  value={profile.bankName || ''}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                >
                  <option value="">{t('settings:companyProfilePage.selectBank')}</option>
                  <option value="Maybank">{t('settings:companyProfilePage.maybank')}</option>
                  <option value="CIMB Bank">{t('settings:companyProfilePage.cimbBank')}</option>
                  <option value="Public Bank">{t('settings:companyProfilePage.publicBank')}</option>
                  <option value="RHB Bank">{t('settings:companyProfilePage.rhbBank')}</option>
                  <option value="Hong Leong Bank">{t('settings:companyProfilePage.hongLeongBank')}</option>
                  <option value="AmBank">{t('settings:companyProfilePage.ambank')}</option>
                  <option value="UOB">{t('settings:companyProfilePage.uob')}</option>
                  <option value="OCBC Bank">{t('settings:companyProfilePage.ocbcBank')}</option>
                  <option value="HSBC">{t('settings:companyProfilePage.hsbc')}</option>
                  <option value="Standard Chartered">{t('settings:companyProfilePage.standardChartered')}</option>
                  <option value="Bank Islam">{t('settings:companyProfilePage.bankIslam')}</option>
                  <option value="Bank Rakyat">{t('settings:companyProfilePage.bankRakyat')}</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>{t('settings:companyProfilePage.accountNumber')}</Label>
                <Input
                  type="text"
                  value={profile.bankAccount || ''}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  placeholder="e.g., 514123456789"
                />
              </FormGroup>

              <FormGroup fullWidth>
                <Label>{t('settings:companyProfilePage.accountName')}</Label>
                <Input
                  type="text"
                  value={profile.bankAccountName || ''}
                  onChange={(e) => handleInputChange('bankAccountName', e.target.value)}
                  placeholder="Account holder name (must match company name)"
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('settings:companyProfilePage.companyLogo')}</SectionTitle>
            <LogoUpload>
              <LogoPreview>
                {profile.logoUrl ? (
                  <img src={profile.logoUrl} alt="Company Logo" />
                ) : (
                  <span>{t('settings:companyProfilePage.noLogo')}</span>
                )}
              </LogoPreview>
              <div>
                <UploadButton>
                  Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                </UploadButton>
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>
                  Recommended: 200x200px, PNG or JPG, max 2MB
                </p>
              </div>
            </LogoUpload>
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default CompanyProfilePage;