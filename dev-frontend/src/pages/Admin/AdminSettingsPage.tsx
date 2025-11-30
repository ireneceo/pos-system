import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { AlertMessage } from '../../components/UI';

interface CompanySettings {
  companyName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxNumber: string;
  registrationNumber: string;
  brandLogo?: string; // Brand logo for site navigation/header
  companyLogo?: string; // Company logo for invoices/documents
}

interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #E5E7EB'};
  background: ${props => props.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#6B7280'};

  &:hover {
    background: ${props => props.variant === 'primary' ? '#5A51E6' : '#F9FAFB'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// SaveStatusMessage는 표준 AlertMessage 컴포넌트로 대체됨

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
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [, ] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [initialSettings, setInitialSettings] = useState<CompanySettings | null>(null);

  // Currency settings
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<string>('MYR');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [tempSelectedCurrencies, setTempSelectedCurrencies] = useState<string[]>([]);

  const [settings, setSettings] = useState<CompanySettings>({
    companyName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Malaysia',
    phone: '',
    email: '',
    website: '',
    taxNumber: '',
    registrationNumber: '',
    brandLogo: '',
    companyLogo: ''
  });

  useEffect(() => {
    loadSettings();
    loadCurrencySettings();
  }, []);

  const loadCurrencySettings = async () => {
    try {
      // Load all available currencies
      const configResponse = await fetch('/api/currencies/config');
      if (configResponse.ok) {
        const data = await configResponse.json();
        setCurrencyConfig(data.currencies || {});
        setDefaultCurrency(data.defaultCurrency || 'MYR');
      }

      // Load supported currencies
      const token = localStorage.getItem('auth_token');
      const supportedResponse = await fetch('/api/currencies/supported', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (supportedResponse.ok) {
        const data = await supportedResponse.json();
        setSupportedCurrencies(data.currencies || []);
      }
    } catch (error) {
      console.error('Error loading currency settings:', error);
    }
  };

  const updateSupportedCurrencies = async (currencies: string[]) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/currencies/supported', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currencies })
      });
      if (response.ok) {
        setSupportedCurrencies(currencies);
      }
    } catch (error) {
      console.error('Error updating supported currencies:', error);
    }
  };

  const updateDefaultCurrency = async (currency: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/currencies/default', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ defaultCurrency: currency })
      });
      if (response.ok) {
        setDefaultCurrency(currency);
      }
    } catch (error) {
      console.error('Error updating default currency:', error);
    }
  };

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
    if (!hasChanges) return;

    setIsSaving(true);
    setUploadError('');
    setSaveMessage('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      // Dispatch custom event to notify MainLayout to reload from API
      window.dispatchEvent(new Event('brandLogoUpdated'));

      // Settings saved successfully
      setInitialSettings(settings);
      setHasChanges(false);
      setSavedSuccessfully(true);
      setSaveMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings to API:', error);
      setUploadError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (initialSettings) {
      setSettings(initialSettings);
      setHasChanges(false);
      setSavedSuccessfully(false);
      setUploadError('');
      setSaveMessage('');
    }
  };

  const handleInputChange = (field: keyof CompanySettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));

    if (!hasChanges) {
      setHasChanges(true);
      setSavedSuccessfully(false);
    }
  };

  // Detect changes
  useEffect(() => {
    if (initialSettings) {
      const hasChanged = JSON.stringify(settings) !== JSON.stringify(initialSettings);
      setHasChanges(hasChanged);

      if (hasChanged && savedSuccessfully) {
        setSavedSuccessfully(false);
      }
    }
  }, [settings, initialSettings, savedSuccessfully]);

  // const handleBrandLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     validateAndUploadFile(file, 'brand');
  //   }
  // };

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

      if (!hasChanges) {
        setHasChanges(true);
        setSavedSuccessfully(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  // };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   const file = e.dataTransfer.files?.[0];
  //   if (file) {
  //     validateAndUploadFile(file, 'brand'); // Drag & drop only for brand logo
  //   }
  // };

  return (
    <MainLayout>
      <Container>
        <Header>
          <PageTitle>Company Information</PageTitle>
        </Header>
        <Content>

            <FormRow>
              <FormGroup>
                <FormLabel>Company Logo</FormLabel>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  Used on invoices and documents
                </div>
                <LogoUpload
                  onClick={() => document.getElementById('company-logo-input')?.click()}
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
                <input
                  id="company-logo-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleCompanyLogoUpload}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Company Name *</FormLabel>
                <FormInput
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Registration Number</FormLabel>
                <FormInput
                  type="text"
                  value={settings.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="ROC/SSM Number"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>Address *</FormLabel>
              <FormTextArea
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter complete address"
                rows={3}
                required
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel>City *</FormLabel>
                <FormInput
                  type="text"
                  value={settings.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>State *</FormLabel>
                <FormInput
                  type="text"
                  value={settings.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Postal Code *</FormLabel>
                <FormInput
                  type="text"
                  value={settings.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="Enter postal code"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Country *</FormLabel>
                <FormInput
                  type="text"
                  value={settings.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Enter country"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <FormInput
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+60 3-1234 5678"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email Address *</FormLabel>
                <FormInput
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="admin@company.com"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Website</FormLabel>
                <FormInput
                  type="url"
                  value={settings.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.company.com"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Tax Number</FormLabel>
                <FormInput
                  type="text"
                  value={settings.taxNumber}
                  onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                  placeholder="GST/SST Registration Number"
                />
              </FormGroup>
            </FormRow>

            {/* Currency Settings Section */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #F3F4F6' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540', marginBottom: '20px' }}>
                Currency Settings
              </h3>

              <FormRow>
                <FormGroup>
                  <FormLabel>Default Currency</FormLabel>
                  <select
                    value={defaultCurrency}
                    onChange={(e) => updateDefaultCurrency(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E6EBF1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    {supportedCurrencies.map(code => (
                      <option key={code} value={code}>
                        {currencyConfig[code]?.symbol} {code} - {currencyConfig[code]?.name}
                      </option>
                    ))}
                  </select>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                    Used as default for new subscriptions and invoices
                  </div>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Supported Currencies</FormLabel>
                  <div
                    onClick={() => {
                      setTempSelectedCurrencies(supportedCurrencies);
                      setShowCurrencyModal(true);
                    }}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid #E6EBF1',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: 'pointer',
                      minHeight: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}
                  >
                    {supportedCurrencies.length > 0 ? (
                      supportedCurrencies.map(code => (
                        <span key={code} style={{
                          background: '#F3F4F6',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: 500
                        }}>
                          {currencyConfig[code]?.symbol} {code}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#9CA3AF' }}>Click to select currencies</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                    Currencies available for pricing plans and invoices
                  </div>
                </FormGroup>
              </FormRow>
            </div>

            {/* Currency Selection Modal */}
            {showCurrencyModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  width: '500px',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
                    Select Supported Currencies
                  </h3>
                  <div style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
                    {Object.entries(currencyConfig).map(([code, config]) => (
                      <label key={code} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        border: '1px solid #E6EBF1',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: tempSelectedCurrencies.includes(code) ? '#F0F4FF' : 'white'
                      }}>
                        <input
                          type="checkbox"
                          checked={tempSelectedCurrencies.includes(code)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTempSelectedCurrencies([...tempSelectedCurrencies, code]);
                            } else {
                              setTempSelectedCurrencies(tempSelectedCurrencies.filter(c => c !== code));
                            }
                          }}
                        />
                        <span style={{ fontWeight: 600, width: '40px' }}>{config.symbol}</span>
                        <span style={{ fontWeight: 500 }}>{code}</span>
                        <span style={{ color: '#6B7280' }}>- {config.name}</span>
                      </label>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" onClick={() => setShowCurrencyModal(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        updateSupportedCurrencies(tempSelectedCurrencies);
                        setShowCurrencyModal(false);
                      }}
                    >
                      Save Currencies
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #F3F4F6' }}>
              <ButtonContainer>
                <Button type="button" variant="secondary" onClick={handleReset} disabled={!hasChanges}>
                  Reset Changes
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={saveSettings}
                  disabled={!hasChanges || isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </ButtonContainer>

              <AlertMessage variant="success" show={savedSuccessfully && !hasChanges}>
                {saveMessage || 'Your settings have been successfully updated.'}
              </AlertMessage>

              <AlertMessage variant="error" show={!!uploadError}>
                {uploadError}
              </AlertMessage>
            </div>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default AdminSettingsPage;