import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
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
  timezone: string;
}

const TIMEZONE_OPTIONS = [
  { label: 'Malaysia (UTC+8)', value: 'Asia/Kuala_Lumpur' },
  { label: 'Singapore (UTC+8)', value: 'Asia/Singapore' },
  { label: 'South Korea (UTC+9)', value: 'Asia/Seoul' },
  { label: 'Japan (UTC+9)', value: 'Asia/Tokyo' },
  { label: 'China (UTC+8)', value: 'Asia/Shanghai' },
  { label: 'Thailand (UTC+7)', value: 'Asia/Bangkok' },
  { label: 'Vietnam (UTC+7)', value: 'Asia/Ho_Chi_Minh' },
  { label: 'Philippines (UTC+8)', value: 'Asia/Manila' },
  { label: 'Indonesia - Jakarta (UTC+7)', value: 'Asia/Jakarta' },
  { label: 'India (UTC+5:30)', value: 'Asia/Kolkata' },
  { label: 'Australia - Sydney (UTC+10/+11)', value: 'Australia/Sydney' },
  { label: 'United States - New York (UTC-5/-4)', value: 'America/New_York' },
  { label: 'United States - Los Angeles (UTC-8/-7)', value: 'America/Los_Angeles' },
  { label: 'United States - Chicago (UTC-6/-5)', value: 'America/Chicago' },
  { label: 'United Kingdom (UTC+0/+1)', value: 'Europe/London' },
  { label: 'Germany (UTC+1/+2)', value: 'Europe/Berlin' },
  { label: 'France (UTC+1/+2)', value: 'Europe/Paris' },
  { label: 'Dubai (UTC+4)', value: 'Asia/Dubai' },
  { label: 'Hong Kong (UTC+8)', value: 'Asia/Hong_Kong' },
  { label: 'Taiwan (UTC+8)', value: 'Asia/Taipei' },
];

const SiteSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: '',
    favicon_url: '',
    brand_logo: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image_url: '',
    timezone: 'Asia/Kuala_Lumpur'
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
  const [, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [, setSupportedCurrencies] = useState<string[]>([]);
  const [, setDefaultCurrency] = useState<string>('RM');

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



  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings?include=images');
      if (response.ok) {
        const data = await response.json();
        const loadedSettings = {
          site_name: data.site_name || '',
          favicon_url: data.favicon_url || '',
          brand_logo: data.brand_logo || '',
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          seo_keywords: data.seo_keywords || '',
          og_image_url: data.og_image_url || '',
          timezone: data.timezone || 'Asia/Kuala_Lumpur'
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
      <>
        <Container>
          <Header>
            <Title>Site Settings</Title>
          </Header>
          <Content>
            <p>Loading...</p>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
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

            {/* System Timezone */}
            <Section>
              <SectionTitle>System Timezone</SectionTitle>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E6EBF1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white',
                      cursor: 'pointer',
                      boxSizing: 'border-box' as const
                    }}
                  >
                    {TIMEZONE_OPTIONS.map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                  <HelpText>
                    All system dates/times (dashboards, reports, invoices) will use this timezone.
                    Current time: {new Date().toLocaleString('en-US', { timeZone: settings.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, year: 'numeric', month: 'short', day: 'numeric' })}
                  </HelpText>
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

    </>
  );
};

export default SiteSettingsPage;
