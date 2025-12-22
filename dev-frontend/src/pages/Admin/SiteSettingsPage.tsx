import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { Modal, ModalButton } from '../../components/UI/Modal';
import { SaveButtonContainer, SaveButtonGroup, SaveButton, StatusMessage } from '../../components/UI';

interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

const Form = styled.form`
  /* No additional styling - uses Content background */
`;

const Section = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
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
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
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

  &::placeholder {
    color: #9CA3AF;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const HelpText = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`;

const LogoUpload = styled.div<{ isDragging?: boolean }>`
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.isDragging ? '#F0F4FF' : 'white'};
  min-height: 120px;
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

interface SiteSettings {
  site_name: string;
  favicon_url: string;
  brand_logo: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image_url: string;
}

const SiteSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: '',
    favicon_url: '',
    brand_logo: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image_url: ''
  });
  const [initialSettings, setInitialSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [isDraggingFavicon, setIsDraggingFavicon] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingOG, setIsDraggingOG] = useState(false);

  // Currency settings
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<string>('RM');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [tempSelectedCurrencies, setTempSelectedCurrencies] = useState<string[]>([]);

  useEffect(() => {
    fetchSettings();
    fetchCurrencySettings();
  }, []);

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

  const fetchCurrencySettings = async () => {
    try {
      // Fetch all currency config
      const configRes = await fetch('/api/currencies/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.success && configData.currencies) {
          setCurrencyConfig(configData.currencies);
          if (configData.defaultCurrency) {
            setDefaultCurrency(configData.defaultCurrency);
          }
        }
      }

      // Fetch supported currencies
      const supportedRes = await fetch('/api/currencies/supported');
      if (supportedRes.ok) {
        const supportedData = await supportedRes.json();
        if (supportedData.success && supportedData.data) {
          setSupportedCurrencies(supportedData.data.map((c: any) => c.code));
        }
      }
    } catch (error) {
      console.error('Error fetching currency settings:', error);
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
        setSuccessMessage('Default currency updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating default currency:', error);
      setErrorMessage('Failed to update default currency');
    }
  };

  const updateSupportedCurrencies = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/currencies/supported', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currencies: tempSelectedCurrencies })
      });

      if (response.ok) {
        setSupportedCurrencies(tempSelectedCurrencies);
        setShowCurrencyModal(false);
        setSuccessMessage('Supported currencies updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);

        // If default currency is not in supported list, update it
        if (!tempSelectedCurrencies.includes(defaultCurrency) && tempSelectedCurrencies.length > 0) {
          await updateDefaultCurrency(tempSelectedCurrencies[0]);
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to update currencies:', errorData);
        setErrorMessage(errorData.error || 'Failed to update supported currencies');
      }
    } catch (error) {
      console.error('Error updating supported currencies:', error);
      setErrorMessage('Failed to update supported currencies');
    }
  };

  const toggleCurrency = (code: string) => {
    setTempSelectedCurrencies(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        const loadedSettings = {
          site_name: data.site_name || '',
          favicon_url: data.favicon_url || '',
          brand_logo: data.brand_logo || '',
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          seo_keywords: data.seo_keywords || '',
          og_image_url: data.og_image_url || ''
        };
        setSettings(loadedSettings);
        setInitialSettings(loadedSettings);
        setHasChanges(false);
        setSavedSuccessfully(false);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setErrorMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateAndUploadFile = (file: File, field: string) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    // Check file size (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('File size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setSettings(prev => ({
        ...prev,
        [field]: base64
      }));
      setErrorMessage('');
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUploadFile(file, field);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, setDragging: (val: boolean) => void) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, setDragging: (val: boolean) => void) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, field: string, setDragging: (val: boolean) => void) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUploadFile(file, field);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSuccessMessage('Site settings saved successfully! SEO tags will be updated on next page load.');
        setInitialSettings(settings);
        setHasChanges(false);
        setSavedSuccessfully(true);

        // Trigger brand logo update event if logo changed
        if (settings.brand_logo) {
          window.dispatchEvent(new Event('brandLogoUpdated'));
        }

        // Update document title and meta tags immediately
        if (settings.seo_title) {
          document.title = settings.seo_title;
        }
        if (settings.favicon_url) {
          updateFavicon(settings.favicon_url);
        }
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('An error occurred while saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateFavicon = (url: string) => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url;
  };

  if (loading) {
    return (
      <MainLayout>
        <Container>
          <Header>
            <Title>Site Settings</Title>
          </Header>
          <Content>
            <p>Loading...</p>
          </Content>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Site Settings</Title>
        </Header>
        <Content>
          <Form onSubmit={handleSubmit}>
            {/* Basic Settings */}
            <Section>
              <SectionTitle>Basic Settings</SectionTitle>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    type="text"
                    id="site_name"
                    name="site_name"
                    value={settings.site_name}
                    onChange={handleInputChange}
                    placeholder="Purple Here POS"
                  />
                  <HelpText>The name of your site/solution</HelpText>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Favicon</Label>
                  <LogoUpload
                    isDragging={isDraggingFavicon}
                    onClick={() => document.getElementById('favicon-input')?.click()}
                    onDragOver={(e) => handleDragOver(e, setIsDraggingFavicon)}
                    onDragLeave={(e) => handleDragLeave(e, setIsDraggingFavicon)}
                    onDrop={(e) => handleDrop(e, 'favicon_url', setIsDraggingFavicon)}
                  >
                    {settings.favicon_url ? (
                      <LogoPreview src={settings.favicon_url} alt="Favicon" />
                    ) : (
                      <div>
                        <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500, marginBottom: '8px' }}>
                          Click to upload or drag and drop
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          PNG, JPG, or SVG (Max 2MB)
                        </div>
                      </div>
                    )}
                  </LogoUpload>
                  <input
                    id="favicon-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, 'favicon_url')}
                  />
                  <HelpText>16x16 or 32x32 px recommended</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>Brand Logo</Label>
                  <LogoUpload
                    isDragging={isDraggingLogo}
                    onClick={() => document.getElementById('brand-logo-input')?.click()}
                    onDragOver={(e) => handleDragOver(e, setIsDraggingLogo)}
                    onDragLeave={(e) => handleDragLeave(e, setIsDraggingLogo)}
                    onDrop={(e) => handleDrop(e, 'brand_logo', setIsDraggingLogo)}
                  >
                    {settings.brand_logo ? (
                      <LogoPreview src={settings.brand_logo} alt="Brand Logo" />
                    ) : (
                      <div>
                        <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500, marginBottom: '8px' }}>
                          Click to upload or drag and drop
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          PNG or JPG (Max 2MB)
                        </div>
                      </div>
                    )}
                  </LogoUpload>
                  <input
                    id="brand-logo-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, 'brand_logo')}
                  />
                  <HelpText>Will appear in sidebar and login page</HelpText>
                </FormGroup>
              </FormRow>
            </Section>

            {/* SEO Settings */}
            <Section>
              <SectionTitle>SEO Settings</SectionTitle>

              <FormGroup>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  type="text"
                  id="seo_title"
                  name="seo_title"
                  value={settings.seo_title}
                  onChange={handleInputChange}
                  placeholder="Purple Here - Restaurant POS System"
                  maxLength={60}
                />
                <HelpText>Page title for search engines (50-60 characters recommended)</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="seo_description">SEO Description</Label>
                <TextArea
                  id="seo_description"
                  name="seo_description"
                  value={settings.seo_description}
                  onChange={handleInputChange}
                  placeholder="Complete restaurant management solution with POS, ordering, and analytics"
                  maxLength={160}
                />
                <HelpText>Meta description for search engines (150-160 characters recommended)</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="seo_keywords">SEO Keywords</Label>
                <Input
                  type="text"
                  id="seo_keywords"
                  name="seo_keywords"
                  value={settings.seo_keywords}
                  onChange={handleInputChange}
                  placeholder="restaurant pos, food ordering, restaurant management, pos system"
                />
                <HelpText>Comma-separated keywords for search engines</HelpText>
              </FormGroup>

              <FormGroup>
                <Label>Open Graph Image</Label>
                <LogoUpload
                  isDragging={isDraggingOG}
                  onClick={() => document.getElementById('og-image-input')?.click()}
                  onDragOver={(e) => handleDragOver(e, setIsDraggingOG)}
                  onDragLeave={(e) => handleDragLeave(e, setIsDraggingOG)}
                  onDrop={(e) => handleDrop(e, 'og_image_url', setIsDraggingOG)}
                >
                  {settings.og_image_url ? (
                    <LogoPreview src={settings.og_image_url} alt="OG Image" />
                  ) : (
                    <div>
                      <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500, marginBottom: '8px' }}>
                        Click to upload or drag and drop
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        PNG or JPG (Max 2MB)
                      </div>
                    </div>
                  )}
                </LogoUpload>
                <input
                  id="og-image-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageUpload(e, 'og_image_url')}
                />
                <HelpText>Image for social media sharing (1200x630 px recommended)</HelpText>
              </FormGroup>
            </Section>

            {/* Currency Settings Section */}
            <Section>
              <SectionTitle>Currency Settings</SectionTitle>

              <FormRow>
                <FormGroup>
                  <Label>Default Currency</Label>
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
                  <HelpText>Used as default for new subscriptions and invoices</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>Supported Currencies</Label>
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
                  <HelpText>Currencies available for pricing plans and invoices</HelpText>
                </FormGroup>
              </FormRow>
            </Section>

            <SaveButtonContainer>
              <SaveButtonGroup>
                <SaveButton type="button" variant="secondary" onClick={fetchSettings} disabled={!hasChanges}>
                  Reset Changes
                </SaveButton>
                <SaveButton type="submit" disabled={!hasChanges || saving}>
                  {hasChanges ? (saving ? 'Saving...' : 'Save Changes') : 'Saved'}
                </SaveButton>
              </SaveButtonGroup>

              {(savedSuccessfully && !hasChanges) && (
                <StatusMessage type="success">
                  {successMessage || 'Your settings have been successfully updated.'}
                </StatusMessage>
              )}

              {errorMessage && (
                <StatusMessage type="error">
                  {errorMessage}
                </StatusMessage>
              )}
            </SaveButtonContainer>
          </Form>
        </Content>
      </Container>

      {/* Currency Selection Modal */}
      <Modal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title="Select Supported Currencies"
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => setShowCurrencyModal(false)}>
              Cancel
            </ModalButton>
            <ModalButton
              variant="primary"
              onClick={updateSupportedCurrencies}
              disabled={tempSelectedCurrencies.length === 0}
            >
              Save ({tempSelectedCurrencies.length} selected)
            </ModalButton>
          </>
        }
      >
        <p style={{ color: '#6B7280', marginBottom: '16px' }}>
          Select the currencies you want to support for subscription plans and invoices.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {Object.entries(currencyConfig).map(([code, config]) => (
            <label
              key={code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: `1px solid ${tempSelectedCurrencies.includes(code) ? '#635BFF' : '#E6EBF1'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                background: tempSelectedCurrencies.includes(code) ? '#F0F0FF' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input
                type="checkbox"
                checked={tempSelectedCurrencies.includes(code)}
                onChange={() => toggleCurrency(code)}
                style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
              />
              <div>
                <div style={{ fontWeight: 500 }}>
                  {config.symbol} {code}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {config.name}
                </div>
              </div>
            </label>
          ))}
        </div>
      </Modal>
    </MainLayout>
  );
};

export default SiteSettingsPage;
