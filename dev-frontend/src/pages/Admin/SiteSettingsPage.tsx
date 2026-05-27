import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import AutoSaveField, { AutoSaveHandle } from '../../components/Common/AutoSaveField';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
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
  border-bottom: 1px solid #C7CED6;

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
  border: 1px solid #C7CED6;
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
    color: #6B7280;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
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
    color: #6B7280;
  }
`;

const HelpText = styled.p`
  font-size: 13px;
  color: #4B5563;
  margin-top: 8px;
`;

const LogoUpload = styled.div<{ isDragging?: boolean }>`
  border: 2px dashed #C7CED6;
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
    background: #F1F4F8;
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
  border: 1px solid #C7CED6;
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
  const { t } = useTranslation('admin');
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
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDraggingFavicon, setIsDraggingFavicon] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingOG, setIsDraggingOG] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());

  const withCacheBust = (url: string) =>
    !url || url.startsWith('data:') ? url : `${url}${url.includes('?') ? '&' : '?'}v=${cacheBust}`;

  // Currency settings
  const [, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [, setSupportedCurrencies] = useState<string[]>([]);
  const [, setDefaultCurrency] = useState<string>('RM');

  // Refs for image AutoSaveField (triggered manually after FileReader completes)
  const faviconAutoSaveRef = useRef<AutoSaveHandle>(null);
  const brandLogoAutoSaveRef = useRef<AutoSaveHandle>(null);
  const ogImageAutoSaveRef = useRef<AutoSaveHandle>(null);

  // Keep a ref to always have the latest settings for saveSettings
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    fetchSettings();
    fetchCurrencySettings();
  }, []);

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
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setErrorMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setErrorMessage('');

    const token = getAuthToken();
    const response = await fetch('/api/site-settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settingsRef.current)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || data.error || 'Failed to save settings');
    }

    // Backend converts base64 → /uploads/...svg etc. State 가 base64 상태로 남으면
    // 다음 저장 시 다시 처리되어 deleteOldImages 가 잘못된 비교를 함. 응답으로 갱신.
    const json = await response.json().catch(() => null);
    const saved = json?.settings;
    if (saved) {
      setSettings(prev => ({
        ...prev,
        favicon_url: saved.favicon_url || '',
        brand_logo: saved.brand_logo || '',
        og_image_url: saved.og_image_url || prev.og_image_url
      }));
      // 동일 path 덮어쓰기 후 preview 갱신을 위한 cache-bust 토큰 증가
      setCacheBust(Date.now());
    }

    // Trigger brand logo update event if logo changed
    if (saved?.brand_logo || settingsRef.current.brand_logo) {
      window.dispatchEvent(new Event('brandLogoUpdated'));
    }

    // Update document title and meta tags immediately
    if (settingsRef.current.seo_title) {
      document.title = settingsRef.current.seo_title;
    }
    const newFaviconUrl = saved?.favicon_url || settingsRef.current.favicon_url;
    if (newFaviconUrl) {
      updateFavicon(newFaviconUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateAndUploadFile = (file: File, field: string, autoSaveRef: React.RefObject<AutoSaveHandle>) => {
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
      // Trigger save after state update settles
      setTimeout(() => autoSaveRef.current?.triggerSave(), 0);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string, autoSaveRef: React.RefObject<AutoSaveHandle>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUploadFile(file, field, autoSaveRef);
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, field: string, setDragging: (val: boolean) => void, autoSaveRef: React.RefObject<AutoSaveHandle>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUploadFile(file, field, autoSaveRef);
    }
  };

  const updateFavicon = (url: string) => {
    // Cache-bust 동일 파일명(favicon.svg 등) 덮어쓰기 후 브라우저 캐시 무효화
    const bustUrl = url.startsWith('data:')
      ? url
      : `${url}${url.includes('?') ? '&' : '?'}v=${Date.now()}`;
    document.querySelectorAll("link[rel~='icon']").forEach(el => {
      (el as HTMLLinkElement).href = bustUrl;
    });
    // apple-touch-icon 도 같이 갱신
    const apple = document.getElementById('apple-touch-icon') as HTMLLinkElement | null;
    if (apple) apple.href = bustUrl;
  };

  if (loading) {
  // useTranslation moved to component level

  return (
      <>
        <Container>
          <Header>
            <Title>{t('admin:siteSettingsPage.siteSettings')}</Title>
          </Header>
          <Content>
            <p>{t('admin:siteSettingsPage.loading')}</p>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:siteSettingsPage.siteSettings')}</Title>
        </Header>
        <Content>
          <div style={{
            margin: '0 0 20px',
            padding: '14px 16px',
            background: '#F1F0FF',
            border: '1px solid #D4D0FF',
            borderRadius: 10,
            fontSize: 13,
            color: '#374151',
            lineHeight: 1.6
          }}>
            <div style={{ fontWeight: 600, color: '#635BFF', marginBottom: 6 }}>Where these settings appear</div>
            <div style={{ fontSize: 12.5 }}>
              <strong>Site name</strong> — public landing pages, browser tab title, email subject lines.<br />
              <strong>Brand logo</strong> — landing header, all email notifications (sender header), invoice PDFs.<br />
              <strong>Favicon</strong> — browser tab icon for the public site.<br />
              <strong>Default currency</strong> — applied to <em>new</em> restaurants only. Existing restaurants keep their own currency.<br />
              <strong>Contact info</strong> — public footer + Contact page.
            </div>
          </div>
          <Form onSubmit={(e) => e.preventDefault()}>
            {/* Basic Settings */}
            <Section>
              <SectionTitle>{t('admin:siteSettingsPage.basicSettings')}</SectionTitle>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="site_name">{t('admin:siteSettingsPage.siteName')}</Label>
                  <AutoSaveField onSave={saveSettings}>
                    <Input
                      type="text"
                      id="site_name"
                      name="site_name"
                      value={settings.site_name}
                      onChange={handleInputChange}
                      placeholder="Purple Here POS"
                    />
                  </AutoSaveField>
                  <HelpText>{t('admin:siteSettingsPage.theNameOfYourSitesolution')}</HelpText>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>{t('admin:siteSettingsPage.favicon')}</Label>
                  <AutoSaveField ref={faviconAutoSaveRef} onSave={saveSettings} type="image">
                    <LogoUpload
                      isDragging={isDraggingFavicon}
                      onClick={() => document.getElementById('favicon-input')?.click()}
                      onDragOver={(e) => handleDragOver(e, setIsDraggingFavicon)}
                      onDragLeave={(e) => handleDragLeave(e, setIsDraggingFavicon)}
                      onDrop={(e) => handleDrop(e, 'favicon_url', setIsDraggingFavicon, faviconAutoSaveRef)}
                    >
                      {settings.favicon_url ? (
                        <LogoPreview src={withCacheBust(settings.favicon_url)} alt="Favicon" />
                      ) : (
                        <div>
                          <div style={{ fontSize: '14px', color: '#4B5563', fontWeight: 500, marginBottom: '8px' }}>
                            Click to upload or drag and drop
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>
                            PNG, JPG, or SVG (Max 2MB)
                          </div>
                        </div>
                      )}
                    </LogoUpload>
                  </AutoSaveField>
                  <input
                    id="favicon-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, 'favicon_url', faviconAutoSaveRef)}
                  />
                  <HelpText>16x16 or 32x32 px recommended</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('admin:siteSettingsPage.brandLogo')}</Label>
                  <AutoSaveField ref={brandLogoAutoSaveRef} onSave={saveSettings} type="image">
                    <LogoUpload
                      isDragging={isDraggingLogo}
                      onClick={() => document.getElementById('brand-logo-input')?.click()}
                      onDragOver={(e) => handleDragOver(e, setIsDraggingLogo)}
                      onDragLeave={(e) => handleDragLeave(e, setIsDraggingLogo)}
                      onDrop={(e) => handleDrop(e, 'brand_logo', setIsDraggingLogo, brandLogoAutoSaveRef)}
                    >
                      {settings.brand_logo ? (
                        <LogoPreview src={withCacheBust(settings.brand_logo)} alt="Brand Logo" />
                      ) : (
                        <div>
                          <div style={{ fontSize: '14px', color: '#4B5563', fontWeight: 500, marginBottom: '8px' }}>
                            Click to upload or drag and drop
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>
                            PNG or JPG (Max 2MB)
                          </div>
                        </div>
                      )}
                    </LogoUpload>
                  </AutoSaveField>
                  <input
                    id="brand-logo-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, 'brand_logo', brandLogoAutoSaveRef)}
                  />
                  <HelpText>{t('admin:siteSettingsPage.willAppearInSidebarAndLoginPage')}</HelpText>
                </FormGroup>
              </FormRow>
            </Section>

            {/* System Timezone */}
            <Section>
              <SectionTitle>{t('admin:siteSettingsPage.systemTimezone')}</SectionTitle>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="timezone">{t('admin:siteSettingsPage.timezone')}</Label>
                  <AutoSaveField onSave={saveSettings} type="select">
                    <select
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #C7CED6',
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
                  </AutoSaveField>
                  <HelpText>
                    All system dates/times (dashboards, reports, invoices) will use this timezone.
                    Current time: {new Date().toLocaleString('en-US', { timeZone: settings.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, year: 'numeric', month: 'short', day: 'numeric' })}
                  </HelpText>
                </FormGroup>
              </FormRow>
            </Section>

            {/* SEO Settings */}
            <Section>
              <SectionTitle>{t('admin:siteSettingsPage.seoSettings')}</SectionTitle>

              <FormGroup>
                <Label htmlFor="seo_title">{t('admin:siteSettingsPage.seoTitle')}</Label>
                <AutoSaveField onSave={saveSettings}>
                  <Input
                    type="text"
                    id="seo_title"
                    name="seo_title"
                    value={settings.seo_title}
                    onChange={handleInputChange}
                    placeholder="Purple Here - Restaurant POS System"
                    maxLength={60}
                  />
                </AutoSaveField>
                <HelpText>{t('admin:siteSettingsPage.pageTitleForSearchEngines5060CharactersRecommended')}</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="seo_description">{t('admin:siteSettingsPage.seoDescription')}</Label>
                <AutoSaveField onSave={saveSettings}>
                  <TextArea
                    id="seo_description"
                    name="seo_description"
                    value={settings.seo_description}
                    onChange={handleInputChange}
                    placeholder="Complete restaurant management solution with POS, ordering, and analytics"
                    maxLength={160}
                  />
                </AutoSaveField>
                <HelpText>{t('admin:siteSettingsPage.metaDescriptionForSearchEngines150160CharactersRecommended')}</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="seo_keywords">{t('admin:siteSettingsPage.seoKeywords')}</Label>
                <AutoSaveField onSave={saveSettings}>
                  <Input
                    type="text"
                    id="seo_keywords"
                    name="seo_keywords"
                    value={settings.seo_keywords}
                    onChange={handleInputChange}
                    placeholder="restaurant pos, food ordering, restaurant management, pos system"
                  />
                </AutoSaveField>
                <HelpText>{t('admin:siteSettingsPage.commaseparatedKeywordsForSearchEngines')}</HelpText>
              </FormGroup>

              <FormGroup>
                <Label>{t('admin:siteSettingsPage.openGraphImage')}</Label>
                <AutoSaveField ref={ogImageAutoSaveRef} onSave={saveSettings} type="image">
                  <LogoUpload
                    isDragging={isDraggingOG}
                    onClick={() => document.getElementById('og-image-input')?.click()}
                    onDragOver={(e) => handleDragOver(e, setIsDraggingOG)}
                    onDragLeave={(e) => handleDragLeave(e, setIsDraggingOG)}
                    onDrop={(e) => handleDrop(e, 'og_image_url', setIsDraggingOG, ogImageAutoSaveRef)}
                  >
                    {settings.og_image_url ? (
                      <LogoPreview src={withCacheBust(settings.og_image_url)} alt="OG Image" />
                    ) : (
                      <div>
                        <div style={{ fontSize: '14px', color: '#4B5563', fontWeight: 500, marginBottom: '8px' }}>
                          Click to upload or drag and drop
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          PNG or JPG (Max 2MB)
                        </div>
                      </div>
                    )}
                  </LogoUpload>
                </AutoSaveField>
                <input
                  id="og-image-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageUpload(e, 'og_image_url', ogImageAutoSaveRef)}
                />
                <HelpText>{t('admin:siteSettingsPage.imageForSocialMediaSharing1200x630PxRecommended')}</HelpText>
              </FormGroup>
            </Section>

            {errorMessage && (
              <div style={{ fontSize: '13px', color: '#EF4444', marginTop: '16px' }}>{errorMessage}</div>
            )}
          </Form>
        </Content>
      </Container>

    </>
  );
};

export default SiteSettingsPage;
